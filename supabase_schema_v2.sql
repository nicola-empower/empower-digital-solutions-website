-- 1. Profiles (Extends Auth Users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  company_name text,
  address text not null, -- UK Format Address
  phone text not null, -- Contact Number
  legal_requirements text, -- Invoice details etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Projects (Enhanced)
drop table if exists public.projects; -- Resetting for V2
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.profiles(id), -- Link to profile, not just email
  name text not null, -- e.g. "Q4 Marketing Campaign"
  description text,
  status text default 'Pending', -- 'Active', 'Pending', 'Completed'
  progress integer default 0,
  workflow_type text, -- 'Social Media', 'Web Design', etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tasks (Action Plan & Requirements)
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  is_completed boolean default false,
  type text not null, -- 'admin_task' (My Action Plan) or 'client_task' (Client Requirements)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Documents (File Centre)
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  name text not null,
  url text not null,
  size text,
  uploaded_by uuid references auth.users(id), -- Who uploaded it?
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Activity Logs (Live Updates)
create table public.activity_logs (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  message text not null, -- e.g. "Emily uploaded 'Brand_Assets.zip'"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.documents enable row level security;
alter table public.activity_logs enable row level security;

-- Policies

-- Profiles: Users can view/edit their own. Admin can view all.
create policy "Users view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Admin view all profiles" on public.profiles for select using (auth.email() = 'nicola@empowerdigitalsolutions.co.uk');

-- Projects: Client views own. Admin views all.
create policy "Client view own project" on public.projects for select using (client_id = auth.uid());
create policy "Admin manage all projects" on public.projects for all using (auth.email() = 'nicola@empowerdigitalsolutions.co.uk');

-- Tasks: Client views own project tasks. Admin manages all.
create policy "Client view tasks" on public.tasks for select using (
  exists (select 1 from public.projects where id = tasks.project_id and client_id = auth.uid())
);
create policy "Client update tasks" on public.tasks for update using (
  exists (select 1 from public.projects where id = tasks.project_id and client_id = auth.uid())
);
create policy "Admin manage tasks" on public.tasks for all using (auth.email() = 'nicola@empowerdigitalsolutions.co.uk');

-- Documents: Client views own. Admin manages all.
create policy "Client view docs" on public.documents for select using (
  exists (select 1 from public.projects where id = documents.project_id and client_id = auth.uid())
);
create policy "Client insert docs" on public.documents for insert with check (
  exists (select 1 from public.projects where id = documents.project_id and client_id = auth.uid())
);
create policy "Admin manage docs" on public.documents for all using (auth.email() = 'nicola@empowerdigitalsolutions.co.uk');

-- Activity Logs: Client views/inserts own. Admin manages all.
create policy "Client view logs" on public.activity_logs for select using (
  exists (select 1 from public.projects where id = activity_logs.project_id and client_id = auth.uid())
);
create policy "Client insert logs" on public.activity_logs for insert with check (
  exists (select 1 from public.projects where id = activity_logs.project_id and client_id = auth.uid())
);
create policy "Admin manage logs" on public.activity_logs for all using (auth.email() = 'nicola@empowerdigitalsolutions.co.uk');

-- Storage Policies (You need to create a bucket named 'portal-files' in Supabase Dashboard first!)
-- Policy for 'portal-files' bucket:
-- INSERT: Authenticated users can upload
-- SELECT: Authenticated users can download
