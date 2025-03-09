-- Create restaurants table
create table if not exists public.restaurants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  address text,
  phone text,
  website text,
  logo_url text,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(owner_id)
);

-- Enable Row Level Security
alter table public.restaurants enable row level security;

-- Create RLS Policies
create policy "Restaurant owners can view their own restaurant"
  on public.restaurants for select
  to authenticated
  using (auth.uid() = owner_id);

create policy "Restaurant owners can update their own restaurant"
  on public.restaurants for update
  to authenticated
  using (auth.uid() = owner_id);

create policy "Restaurant owners can insert their own restaurant"
  on public.restaurants for insert
  to authenticated
  with check (auth.uid() = owner_id);

create policy "Restaurant owners can delete their own restaurant"
  on public.restaurants for delete
  to authenticated
  using (auth.uid() = owner_id);

-- Create trigger for updated_at
create trigger handle_updated_at
  before update on public.restaurants
  for each row
  execute function public.handle_updated_at();

-- Create function to associate menu items with restaurants
alter table public.menu_items add column if not exists restaurant_id uuid references public.restaurants(id) on delete cascade;

-- Update menu items policies to include restaurant ownership check
drop policy if exists "Menu items are viewable by all users" on public.menu_items;
create policy "Menu items are viewable by all users"
  on public.menu_items for select
  to authenticated
  using (true);

drop policy if exists "Only admins can modify menu items" on public.menu_items;
create policy "Restaurant owners can modify their menu items"
  on public.menu_items for all
  to authenticated
  using (
    exists (
      select 1 from public.restaurants
      where restaurants.id = menu_items.restaurant_id
      and restaurants.owner_id = auth.uid()
    )
  ); 