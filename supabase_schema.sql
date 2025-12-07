-- Table for Music Tracks
create table songs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  artist text not null,
  album text,
  mp3_url text not null,
  cover_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table for Reviews (One-to-One with Songs)
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  song_id uuid references songs(id) on delete cascade,
  content text, -- Your review text
  rating int, -- Optional: 1-5 stars
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table songs enable row level security;
alter table reviews enable row level security;

-- Policies: Everyone can read, only Authenticated (Admin) can insert/update/delete
create policy "Public can view songs" on songs for select using (true);
create policy "Public can view reviews" on reviews for select using (true);
create policy "Admin can insert songs" on songs for insert to authenticated with check (true);
create policy "Admin can update reviews" on reviews for update to authenticated using (true);
create policy "Admin can update songs" on songs for update to authenticated using (true);
create policy "Admin can delete songs" on songs for delete to authenticated using (true);
create policy "Admin can delete reviews" on reviews for delete to authenticated using (true);
