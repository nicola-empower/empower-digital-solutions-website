-- 1. Create the 'leads' table
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  message text,
  source text,
  status text default 'new'
);

-- 2. Enable Row Level Security (RLS)
alter table public.leads enable row level security;

-- 3. Create Policies
-- Allow anyone (anon) to insert leads (for the contact form)
create policy "Allow public inserts" 
on public.leads 
for insert 
with check (true);

-- Allow authenticated users (you/admin) to view leads
create policy "Allow auth users to view" 
on public.leads 
for select 
using (auth.role() = 'authenticated');

-- 4. Create a dummy client project (Optional, for Portal testing)
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  client_email text not null,
  status text default 'Development',
  next_milestone text,
  milestone_date date
);

alter table public.projects enable row level security;

create policy "Allow clients to view their own project"
on public.projects
for select
using (auth.jwt() ->> 'email' = client_email);
