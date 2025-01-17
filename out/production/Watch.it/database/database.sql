--
-- PostgreSQL database cluster dump
--

-- Started on 2025-01-12 15:18:06 CET

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE fra;
ALTER ROLE fra WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.6

-- Started on 2025-01-12 15:18:06 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-01-12 15:18:06 CET

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.6

-- Started on 2025-01-12 15:18:06 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-01-12 15:18:06 CET

--
-- PostgreSQL database dump complete
--

--
-- Database "watched-it" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.6

-- Started on 2025-01-12 15:18:06 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3433 (class 1262 OID 16385)
-- Name: watched-it; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "watched-it" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_GB.UTF-8';


ALTER DATABASE "watched-it" OWNER TO postgres;

\connect -reuse-previous=on "dbname='watched-it'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16425)
-- Name: commenti; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commenti (
    id_commento smallint NOT NULL,
    id_contenuto_api integer,
    is_serie_is_film boolean,
    contenuto character varying(255),
    voto integer,
    username_utente character varying,
    commento_risposto smallint NOT NULL
);


ALTER TABLE public.commenti OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16458)
-- Name: commenti_commento_risposto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.commenti_commento_risposto_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.commenti_commento_risposto_seq OWNER TO postgres;

--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 220
-- Name: commenti_commento_risposto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commenti_commento_risposto_seq OWNED BY public.commenti.commento_risposto;


--
-- TOC entry 218 (class 1259 OID 16424)
-- Name: commenti_id_commento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.commenti_id_commento_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.commenti_id_commento_seq OWNER TO postgres;

--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 218
-- Name: commenti_id_commento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commenti_id_commento_seq OWNED BY public.commenti.id_commento;


--
-- TOC entry 217 (class 1259 OID 16417)
-- Name: contenuto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contenuto (
    id_contenuto integer NOT NULL,
    is_serie_is_film boolean
);


ALTER TABLE public.contenuto OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16408)
-- Name: contenuto_utente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contenuto_utente (
    utente character varying NOT NULL,
    id integer NOT NULL,
    num_episodio integer,
    num_stagione integer,
    status integer
);


ALTER TABLE public.contenuto_utente OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16393)
-- Name: utente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utente (
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    img_profilo bytea,
    imgbackground bytea,
    admin boolean DEFAULT false
);


ALTER TABLE public.utente OWNER TO postgres;

--
-- TOC entry 3263 (class 2604 OID 16428)
-- Name: commenti id_commento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti ALTER COLUMN id_commento SET DEFAULT nextval('public.commenti_id_commento_seq'::regclass);


--
-- TOC entry 3264 (class 2604 OID 16459)
-- Name: commenti commento_risposto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti ALTER COLUMN commento_risposto SET DEFAULT nextval('public.commenti_commento_risposto_seq'::regclass);


--
-- TOC entry 3426 (class 0 OID 16425)
-- Dependencies: 219
-- Data for Name: commenti; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.commenti (id_commento, id_contenuto_api, is_serie_is_film, contenuto, voto, username_utente, commento_risposto) FROM stdin;
\.


--
-- TOC entry 3424 (class 0 OID 16417)
-- Dependencies: 217
-- Data for Name: contenuto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contenuto (id_contenuto, is_serie_is_film) FROM stdin;
\.


--
-- TOC entry 3423 (class 0 OID 16408)
-- Dependencies: 216
-- Data for Name: contenuto_utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contenuto_utente (utente, id, num_episodio, num_stagione, status) FROM stdin;
\.


--
-- TOC entry 3422 (class 0 OID 16393)
-- Dependencies: 215
-- Data for Name: utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utente (username, email, password, img_profilo, imgbackground, admin) FROM stdin;
\.


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 220
-- Name: commenti_commento_risposto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commenti_commento_risposto_seq', 1, false);


--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 218
-- Name: commenti_id_commento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commenti_id_commento_seq', 1, false);


--
-- TOC entry 3274 (class 2606 OID 16432)
-- Name: commenti commenti_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti
    ADD CONSTRAINT commenti_pk PRIMARY KEY (id_commento);


--
-- TOC entry 3272 (class 2606 OID 16421)
-- Name: contenuto contenuto_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenuto
    ADD CONSTRAINT contenuto_pk PRIMARY KEY (id_contenuto);


--
-- TOC entry 3270 (class 2606 OID 16444)
-- Name: contenuto_utente contenuto_utente_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenuto_utente
    ADD CONSTRAINT contenuto_utente_pk PRIMARY KEY (utente, id);


--
-- TOC entry 3266 (class 2606 OID 16400)
-- Name: utente utente_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pk PRIMARY KEY (username);


--
-- TOC entry 3268 (class 2606 OID 16402)
-- Name: utente utente_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_unique UNIQUE (email);


--
-- TOC entry 3277 (class 2606 OID 16466)
-- Name: commenti commenti_commenti_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti
    ADD CONSTRAINT commenti_commenti_fk FOREIGN KEY (id_commento) REFERENCES public.commenti(id_commento);


--
-- TOC entry 3278 (class 2606 OID 16433)
-- Name: commenti commenti_utente_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti
    ADD CONSTRAINT commenti_utente_fk FOREIGN KEY (username_utente) REFERENCES public.utente(username);


--
-- TOC entry 3275 (class 2606 OID 16451)
-- Name: contenuto_utente contenuto_utente_contenuto_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenuto_utente
    ADD CONSTRAINT contenuto_utente_contenuto_fk FOREIGN KEY (id) REFERENCES public.contenuto(id_contenuto);


--
-- TOC entry 3276 (class 2606 OID 16471)
-- Name: contenuto_utente contenuto_utente_utente_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenuto_utente
    ADD CONSTRAINT contenuto_utente_utente_fk FOREIGN KEY (utente) REFERENCES public.utente(username);


-- Completed on 2025-01-12 15:18:06 CET

--
-- PostgreSQL database dump complete
--

-- Completed on 2025-01-12 15:18:06 CET

--
-- PostgreSQL database cluster dump complete
--

