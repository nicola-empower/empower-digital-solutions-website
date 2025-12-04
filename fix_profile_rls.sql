-- Fix RLS Policies for User Profile Access
-- Ensure users can INSERT and UPDATE their own profile.

-- 1. Drop existing policies to be safe
drop policy if exists "Users insert own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Users view own profile" on public.profiles;

-- 2. Re-create policies
-- Allow users to view their own profile
create policy "Users view own profile" on public.profiles 
for select using (auth.uid() = id);

-- Allow users to insert their own profile (needed for upsert)
create policy "Users insert own profile" on public.profiles 
for insert with check (auth.uid() = id);

-- Allow users to update their own profile
create policy "Users update own profile" on public.profiles 
for update using (auth.uid() = id);

-- 3. Grant permissions just in case
grant all on public.profiles to authenticated;
grant all on public.profiles to service_role;
