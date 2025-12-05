-- Add order_index to tasks for custom sorting
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- Add last_viewed_at to projects for "Opened/Read" tracking
ALTER TABLE projects ADD COLUMN IF NOT EXISTS last_viewed_at TIMESTAMPTZ;

-- Add last_viewed_at to profiles if we want to track login time broadly (optional, but good for "Online" status)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ;

-- Add description to projects for the Brief UI
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description TEXT;

-- Add profile columns for Client Edit persistence (just in case they are missing)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;
