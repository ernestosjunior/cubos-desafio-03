create database market_cubos;

create table if not exists usuarios(
    id serial primary key,
    nome text,
    nome_loja text,
    email text,
    senha text
);

create table if not exists produtos(
    id serial primary key,
    usuario_id int not null,
    nome text,
    estoque int,
    categoria text,
    preco int
    descricao text,
    imagem text,
    foreign key usuario_id references usuarios(id)
);