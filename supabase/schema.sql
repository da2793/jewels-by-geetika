-- ═══════════════════════════════════════════════
-- Jewels by Geetika — Database Schema
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)
-- ═══════════════════════════════════════════════

-- ── Profiles ─────────────────────────────────
-- Extends Supabase auth.users with customer details
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  address text,
  city text,
  state text,
  pincode text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Orders ───────────────────────────────────
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete set null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total numeric(10,2) not null,
  shipping_cost numeric(10,2) default 0,
  
  -- Shipping details (snapshot at time of order)
  shipping_name text,
  shipping_email text,
  shipping_phone text,
  shipping_address text,
  shipping_city text,
  shipping_state text,
  shipping_pincode text,
  
  -- Payment
  payment_id text,
  payment_status text default 'pending',
  
  -- Tracking
  tracking_number text,
  courier_partner text,
  
  items jsonb not null default '[]',
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.orders enable row level security;

-- Users can view their own orders
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Users can create orders (for themselves)
create policy "Users can create own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- ── Products (for future use — currently hardcoded) ──
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique,
  category text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  description text,
  details jsonb default '[]',
  images jsonb default '[]',
  badge text,
  is_new boolean default false,
  is_bestseller boolean default false,
  is_active boolean default true,
  stock integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Products are publicly readable
alter table public.products enable row level security;

create policy "Products are publicly readable"
  on public.products for select
  using (true);

-- ── Wishlist ─────────────────────────────────
create table if not exists public.wishlist (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  product_id uuid references public.products on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

alter table public.wishlist enable row level security;

create policy "Users can manage own wishlist"
  on public.wishlist for all
  using (auth.uid() = user_id);
