-- 1. Create the function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, address, phone)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'full_name', 'New Client'), 
    '', 
    ''
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Create the trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Backfill profiles for existing users who are missing them
insert into public.profiles (id, email, full_name, address, phone)
select id, email, coalesce(raw_user_meta_data->>'full_name', 'New Client'), '', ''
from auth.users
where id not in (select id from public.profiles);
