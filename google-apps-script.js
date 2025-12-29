// -------------------------------------------------------------------------------------------------
// GOOGLE APPS SCRIPT - FORM BACKEND
// -------------------------------------------------------------------------------------------------
// INSTRUCTIONS:
// 1. Create a new Google Sheet.
// 2. Go to Extensions > Apps Script.
// 3. Paste this code completely, replacing any existing code.
// 4. Run the 'setup()' function once to create the 'Submissions' sheet and set headers.
//    (You might need to authorize permissions).
// 5. Deploy as Web App:
//    - Click 'Deploy' > 'New deployment'.
//    - Select 'Web app'.
//    - Description: "Contact Form v1".
//    - Execute as: "Me" (your email).
//    - Who has access: "Anyone" (IMPORTANT).
// 6. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...).
// 7. Config: Set your notification email in the CONSTANTS section below.
// -------------------------------------------------------------------------------------------------

const CONFIG = {
    // The email address where notifications will be sent
    NOTIFICATION_EMAIL: "nicola@empowerdigitalsolutions.co.uk", // REPLACE THIS IF NEEDED

    // The subject line for the email notification
    EMAIL_SUBJECT: "🚀 New Website Enquiry",

    // The name of the sheet to store submissions
    SHEET_NAME: "Submissions"
};

/**
 * Setup function - Run this once to initialize the sheet
 */
function setup() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

    if (!sheet) {
        sheet = ss.insertSheet(CONFIG.SHEET_NAME);
        // Add headers
        sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Subject", "Message", "Source URL"]);
        // Freeze top row
        sheet.setFrozenRows(1);
        // Bold top row
        sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
        Logger.log("Sheet setup complete.");
    } else {
        Logger.log("Sheet already exists.");
    }
}

/**
 * Handle POST requests from the website form
 */
function doPost(e) {
    const lock = LockService.getScriptLock();
    // Wait up to 30 seconds for other processes to finish
    if (lock.tryLock(30000)) {
        try {
            // Parse the incoming data
            const data = JSON.parse(e.postData.contents);

            const doc = SpreadsheetApp.getActiveSpreadsheet();
            let sheet = doc.getSheetByName(CONFIG.SHEET_NAME);

            // Auto-create sheet if it doesn't exist (failsafe)
            if (!sheet) {
                setup();
                SpreadsheetApp.flush(); // Ensure changes are applied
                sheet = doc.getSheetByName(CONFIG.SHEET_NAME);
            }

            const timestamp = new Date();

            // Extract fields
            const name = data.name || "N/A";
            const email = data.email || "N/A";
            const phone = data.phone || "N/A";
            const subject = data.subject || "Website Enquiry";
            const message = data.message || "N/A";
            const sourceUrl = data.sourceUrl || "Unknown";

            // Collect all other data fields for context
            let extraDetails = [];
            let emailExtras = "";

            const standardKeys = ['name', 'email', 'phone', 'subject', 'message', 'sourceUrl'];

            for (const key in data) {
                if (!standardKeys.includes(key)) {
                    const value = data[key];
                    extraDetails.push(`${key}: ${value}`);
                    emailExtras += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`;
                }
            }

            const extraDetailsString = extraDetails.join("\n");

            // 1. Save to Google Sheet
            sheet.appendRow([
                timestamp,
                name,
                email,
                phone,
                subject,
                message,
                sourceUrl,
                extraDetailsString // New column for all extra context
            ]);

            // 2. Send Email Notification
            sendEmailNotification(name, email, phone, subject, message, sourceUrl, emailExtras);

            // Return JSON success, etc...
            return ContentService
                .createTextOutput(JSON.stringify({ "result": "success", "message": "Form submitted successfully." }))
                .setMimeType(ContentService.MimeType.JSON);

        } catch (error) {
            // ... existing error handling ...
            return ContentService
                .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
                .setMimeType(ContentService.MimeType.JSON);
        } finally {
            lock.releaseLock();
        }
    } else {
        return ContentService
            .createTextOutput(JSON.stringify({ "result": "error", "error": "Server busy, please try again." }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Send email notification to business owner
 */
function sendEmailNotification(name, email, phone, subject, message, sourceUrl, emailExtras) {
    const htmlBody = `
    <h2>🚀 New Website Enquiry</h2>
    <p>You have received a new message from your website.</p>
    <hr>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
    
    <h3>📋 Additional Details:</h3>
    ${emailExtras || "<p><em>No extra details provided.</em></p>"}
    
    <hr>
    <p><small>Source: ${sourceUrl}</small></p>
  `;

    MailApp.sendEmail({
        to: CONFIG.NOTIFICATION_EMAIL,
        subject: `${CONFIG.EMAIL_SUBJECT}: ${name}`,
        htmlBody: htmlBody
    });
}

/**
 * Handle CORS for OPTIONS requests (Pre-flight) (Optional but good practice)
 */
function doOptions(e) {
    return ContentService.createTextOutput("");
}
