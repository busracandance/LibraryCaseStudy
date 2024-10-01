--DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public.books_id_seq;

CREATE SEQUENCE public.books_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.transactions_id_seq;

CREATE SEQUENCE public.transactions_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.users_id_seq;

CREATE SEQUENCE public.users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.books definition

-- Drop table

-- DROP TABLE public.books;

CREATE TABLE public.books (
	id serial4 NOT NULL,
	"name" varchar(128) NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT books_pkey PRIMARY KEY (id)
);


-- public.transactions definition

-- Drop table

-- DROP TABLE public.transactions;

CREATE TABLE public.transactions (
	id serial4 NOT NULL,
	"userId" int4 NOT NULL,
	"bookId" int4 NOT NULL,
	"borrowedAt" timestamptz NOT NULL,
	"returnedAt" timestamptz NULL,
	score int4 NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT transactions_pkey PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" varchar(128) NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"userId" int4 NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.transactions foreign keys

ALTER TABLE public.transactions ADD CONSTRAINT "transactions_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES public.books(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.transactions ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;


-- public.users foreign keys

ALTER TABLE public.users ADD CONSTRAINT "users_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.transactions(id) ON DELETE SET NULL ON UPDATE CASCADE;