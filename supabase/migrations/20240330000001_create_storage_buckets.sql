-- Create storage bucket for restaurant logos
insert into storage.buckets (id, name, public)
values ('restaurant-logos', 'restaurant-logos', true)
on conflict (id) do nothing;

-- Set up storage policies for restaurant logos
create policy "Restaurant owners can upload their own logos"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'restaurant-logos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Restaurant owners can update their own logos"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'restaurant-logos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Restaurant owners can delete their own logos"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'restaurant-logos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Anyone can view restaurant logos"
  on storage.objects
  for select
  to public
  using (bucket_id = 'restaurant-logos'); 