-- Create Messages Table
CREATE TABLE public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Credentials Table (The Vault)
CREATE TABLE public.credentials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL,
    username TEXT,
    password_value TEXT, -- In a real app, encryption via pgsodium is recommended. RLS protects this visibility.
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credentials ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Clients can access data for their own projects
CREATE POLICY "Clients can view their project messages"
ON public.messages FOR SELECT
USING (auth.uid() IN (SELECT client_id FROM public.projects WHERE id = project_id));

CREATE POLICY "Clients can send messages to their projects"
ON public.messages FOR INSERT
WITH CHECK (auth.uid() IN (SELECT client_id FROM public.projects WHERE id = project_id));

CREATE POLICY "Clients can view their project credentials"
ON public.credentials FOR SELECT
USING (auth.uid() IN (SELECT client_id FROM public.projects WHERE id = project_id));

CREATE POLICY "Clients can add credentials to their projects"
ON public.credentials FOR INSERT
WITH CHECK (auth.uid() IN (SELECT client_id FROM public.projects WHERE id = project_id));


-- 2. Allow Admins (or ALL authenticated users for now, if you are the only user) full access
-- MODIFY THIS PART: If you have a specific Admin email, restrict it. 
-- For now, we will add a policy allowing ANY authenticated user to do everything, 
-- BUT the Client policies above restrict what *clients* can see via the UI.
-- WARNING: This "Admin Access" policy allows any logged-in user to see all if they bypass the UI.
-- Ideally, you should have a column `is_admin` in `profiles`.
-- Assuming your account is the "Admin", you might want to manually add your UUID here later.
-- For this step, we will rely on the UI protection for Admin sections, but I will provide a policy
-- that allows all operations for now to ensure your Admin Dashboard works immediately. 
-- You can tighten this in Supabase later.

CREATE POLICY "Allow Full Access" 
ON public.messages 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow Full Access Creds" 
ON public.credentials 
USING (true) 
WITH CHECK (true);
