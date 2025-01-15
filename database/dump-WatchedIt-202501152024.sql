--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2025-01-15 20:24:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4830 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 32884)
-- Name: commenti; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commenti (
    id_commento smallint NOT NULL,
    id_contenuto_api integer NOT NULL,
    is_serie boolean NOT NULL,
    contenuto character varying(255),
    voto integer,
    username_utente character varying NOT NULL,
    commento_risposto integer
);


ALTER TABLE public.commenti OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 32889)
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
-- TOC entry 4831 (class 0 OID 0)
-- Dependencies: 218
-- Name: commenti_commento_risposto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commenti_commento_risposto_seq OWNED BY public.commenti.commento_risposto;


--
-- TOC entry 219 (class 1259 OID 32890)
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
-- TOC entry 4832 (class 0 OID 0)
-- Dependencies: 219
-- Name: commenti_id_commento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commenti_id_commento_seq OWNED BY public.commenti.id_commento;


--
-- TOC entry 221 (class 1259 OID 32892)
-- Name: contenuto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contenuto (
    id_contenuto integer NOT NULL,
    is_serie boolean NOT NULL,
    id smallint NOT NULL
);


ALTER TABLE public.contenuto OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 32891)
-- Name: contenuto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contenuto_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contenuto_id_seq OWNER TO postgres;

--
-- TOC entry 4833 (class 0 OID 0)
-- Dependencies: 220
-- Name: contenuto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contenuto_id_seq OWNED BY public.contenuto.id;


--
-- TOC entry 222 (class 1259 OID 32896)
-- Name: contenuto_utente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contenuto_utente (
    utente character varying NOT NULL,
    id_contenuto integer NOT NULL,
    id_api integer NOT NULL,
    num_episodio integer NOT NULL,
    num_stagione integer NOT NULL,
    status integer,
    valutazione integer
);


ALTER TABLE public.contenuto_utente OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 32901)
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
-- TOC entry 4655 (class 2604 OID 32907)
-- Name: commenti id_commento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti ALTER COLUMN id_commento SET DEFAULT nextval('public.commenti_id_commento_seq'::regclass);


--
-- TOC entry 4656 (class 2604 OID 32908)
-- Name: commenti commento_risposto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti ALTER COLUMN commento_risposto SET DEFAULT nextval('public.commenti_commento_risposto_seq'::regclass);


--
-- TOC entry 4657 (class 2604 OID 32895)
-- Name: contenuto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenuto ALTER COLUMN id SET DEFAULT nextval('public.contenuto_id_seq'::regclass);


--
-- TOC entry 4818 (class 0 OID 32884)
-- Dependencies: 217
-- Data for Name: commenti; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.commenti (id_commento, id_contenuto_api, is_serie, contenuto, voto, username_utente, commento_risposto) FROM stdin;
1	9502	f	Suca	3	giorgio	0
2	9502	f	palle	2	giorgio	1
0	9502	f	palle	2	giorgio	1
3	9502	f	palle	2	giorgio	1
\.


--
-- TOC entry 4822 (class 0 OID 32892)
-- Dependencies: 221
-- Data for Name: contenuto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contenuto (id_contenuto, is_serie, id) FROM stdin;
9502	f	1
46260	t	2
\.


--
-- TOC entry 4823 (class 0 OID 32896)
-- Dependencies: 222
-- Data for Name: contenuto_utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contenuto_utente (utente, id_contenuto, id_api, num_episodio, num_stagione, status, valutazione) FROM stdin;
giorgio	1	9502	0	0	1	0
giorgio	2	46260	5	1	0	0
\.


--
-- TOC entry 4824 (class 0 OID 32901)
-- Dependencies: 223
-- Data for Name: utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utente (username, email, password, img_profilo, imgbackground, admin) FROM stdin;
giorgio	giorgio@mail.com	password	\N	\N	f
\.


--
-- TOC entry 4834 (class 0 OID 0)
-- Dependencies: 218
-- Name: commenti_commento_risposto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commenti_commento_risposto_seq', 3, true);


--
-- TOC entry 4835 (class 0 OID 0)
-- Dependencies: 219
-- Name: commenti_id_commento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commenti_id_commento_seq', 3, true);


--
-- TOC entry 4836 (class 0 OID 0)
-- Dependencies: 220
-- Name: contenuto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contenuto_id_seq', 7, true);


--
-- TOC entry 4660 (class 2606 OID 32910)
-- Name: commenti commenti_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti
    ADD CONSTRAINT commenti_pk PRIMARY KEY (id_commento);


--
-- TOC entry 4662 (class 2606 OID 32912)
-- Name: contenuto contenuto_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenuto
    ADD CONSTRAINT contenuto_pk PRIMARY KEY (id);


--
-- TOC entry 4664 (class 2606 OID 32914)
-- Name: contenuto_utente contenuto_utente_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenuto_utente
    ADD CONSTRAINT contenuto_utente_pk PRIMARY KEY (utente, id_contenuto);


--
-- TOC entry 4666 (class 2606 OID 32916)
-- Name: utente utente_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pk PRIMARY KEY (username);


--
-- TOC entry 4668 (class 2606 OID 32918)
-- Name: utente utente_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_unique UNIQUE (email);


--
-- TOC entry 4669 (class 2606 OID 32919)
-- Name: commenti commenti_commenti_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti
    ADD CONSTRAINT commenti_commenti_fk FOREIGN KEY (id_commento) REFERENCES public.commenti(id_commento);


--
-- TOC entry 4670 (class 2606 OID 32924)
-- Name: commenti commenti_utente_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commenti
    ADD CONSTRAINT commenti_utente_fk FOREIGN KEY (username_utente) REFERENCES public.utente(username);


--
-- TOC entry 4671 (class 2606 OID 32929)
-- Name: contenuto_utente contenuto_utente_contenuto_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenuto_utente
    ADD CONSTRAINT contenuto_utente_contenuto_fk FOREIGN KEY (id_contenuto) REFERENCES public.contenuto(id);


--
-- TOC entry 4672 (class 2606 OID 32934)
-- Name: contenuto_utente contenuto_utente_utente_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contenuto_utente
    ADD CONSTRAINT contenuto_utente_utente_fk FOREIGN KEY (utente) REFERENCES public.utente(username);


-- Completed on 2025-01-15 20:24:02

--
-- PostgreSQL database dump complete
--

