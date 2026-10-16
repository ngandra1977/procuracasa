create table if not exists public.properties (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 title text not null,
 property_type text not null default 'Apartamento' check (property_type in ('Apartamento','Moradia','Terreno','Loja','Escritório','Armazém','Outro')),
 location text not null,
 price numeric not null check (price > 0),
 bedrooms integer not null check (bedrooms >= 0),
 area numeric not null check (area > 0),
 operation text not null check (operation in ('Venda','Arrendamento')),
 status text not null default 'rascunho' check (status in ('disponivel','reservado','vendido','rascunho')),
 description text not null default '',
 photos jsonb not null default '[]'::jsonb,
 agency text not null default '',
 ami text not null default '',
 reference text not null default '',
 energy text not null default ''
);
alter table public.properties enable row level security;
-- Apenas o servidor pode ler/escrever; os clientes não acedem à tabela.
revoke all on table public.properties from anon, authenticated;
grant select, insert, update, delete on table public.properties to service_role;
create index if not exists properties_created_at_idx on public.properties (created_at desc);
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('property-images', 'property-images', true, 3145728, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
