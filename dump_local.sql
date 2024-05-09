--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6

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
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agente; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.agente (
    num_seq_agente bigint NOT NULL,
    forma_participacao_num_seq_forma_participacao bigint NOT NULL,
    participacao_agente_num_seq_participacao_agente bigint,
    protesto_num_seq_protesto bigint
);


ALTER TABLE public.agente OWNER TO conflitosurbanos;

--
-- Name: agente_protesto_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.agente_protesto_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agente_protesto_increment OWNER TO conflitosurbanos;

--
-- Name: agente_protesto; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.agente_protesto (
    num_seq_agente_protesto integer DEFAULT nextval('public.agente_protesto_increment'::regclass) NOT NULL,
    agente_protesto character varying(100) NOT NULL,
    local_agente character varying(100),
    categoria_agente_num_seq_categoria_agente integer NOT NULL
);


ALTER TABLE public.agente_protesto OWNER TO conflitosurbanos;

--
-- Name: bairro_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.bairro_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bairro_increment OWNER TO conflitosurbanos;

--
-- Name: bairro; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.bairro (
    num_seq_bairro integer DEFAULT nextval('public.bairro_increment'::regclass) NOT NULL,
    bairro character varying(100) NOT NULL,
    cidade_num_seq_cidade integer
);


ALTER TABLE public.bairro OWNER TO conflitosurbanos;

--
-- Name: categoria_agente_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.categoria_agente_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categoria_agente_increment OWNER TO conflitosurbanos;

--
-- Name: categoria_agente; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.categoria_agente (
    num_seq_categoria_agente integer DEFAULT nextval('public.categoria_agente_increment'::regclass) NOT NULL,
    desc_categoria_agente character varying(100) NOT NULL
);


ALTER TABLE public.categoria_agente OWNER TO conflitosurbanos;

--
-- Name: categoria_objeto_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.categoria_objeto_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categoria_objeto_increment OWNER TO conflitosurbanos;

--
-- Name: categoria_objeto; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.categoria_objeto (
    num_seq_categoria_objeto integer DEFAULT nextval('public.categoria_objeto_increment'::regclass) NOT NULL,
    desc_categoria_objeto character varying(100) NOT NULL
);


ALTER TABLE public.categoria_objeto OWNER TO conflitosurbanos;

--
-- Name: cidade_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.cidade_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cidade_increment OWNER TO conflitosurbanos;

--
-- Name: cidade; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.cidade (
    num_seq_cidade integer DEFAULT nextval('public.cidade_increment'::regclass) NOT NULL,
    cidade character varying(100) NOT NULL
);


ALTER TABLE public.cidade OWNER TO conflitosurbanos;

--
-- Name: conflito_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.conflito_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.conflito_increment OWNER TO conflitosurbanos;

--
-- Name: conflito; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.conflito (
    num_seq_conflito integer DEFAULT nextval('public.conflito_increment'::regclass) NOT NULL,
    desc_conflito character varying(100),
    desc_detal_conflito text,
    ident_conflito character varying(100) NOT NULL
);


ALTER TABLE public.conflito OWNER TO conflitosurbanos;

--
-- Name: desdobramento_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.desdobramento_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.desdobramento_increment OWNER TO conflitosurbanos;

--
-- Name: desdobramento; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.desdobramento (
    num_seq_desdobramento integer DEFAULT nextval('public.desdobramento_increment'::regclass) NOT NULL,
    descritor_desdobramento text,
    desdobramento character varying(100) NOT NULL,
    fonte_desdobramento character varying(100),
    protesto_num_seq_protesto integer
);


ALTER TABLE public.desdobramento OWNER TO conflitosurbanos;

--
-- Name: documento; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.documento (
    num_seq_documento bigint NOT NULL,
    caminho_documento character varying(1000),
    mime_type character varying(100),
    nome_documento character varying(1000),
    protesto_num_seq_protesto bigint,
    byte_array bytea
);


ALTER TABLE public.documento OWNER TO conflitosurbanos;

--
-- Name: participacao_agente_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.participacao_agente_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.participacao_agente_increment OWNER TO conflitosurbanos;

--
-- Name: fonte; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.fonte (
    num_seq_fonte integer DEFAULT nextval('public.participacao_agente_increment'::regclass) NOT NULL,
    referencia text,
    fonte_protesto_num_seq_fonte_protesto integer,
    protesto_num_seq_protesto integer
);


ALTER TABLE public.fonte OWNER TO conflitosurbanos;

--
-- Name: fonte_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.fonte_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fonte_increment OWNER TO conflitosurbanos;

--
-- Name: fonte_protesto_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.fonte_protesto_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fonte_protesto_increment OWNER TO conflitosurbanos;

--
-- Name: fonte_protesto; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.fonte_protesto (
    num_seq_fonte_protesto integer DEFAULT nextval('public.fonte_protesto_increment'::regclass) NOT NULL,
    desc_fonte_protesto character varying(100) NOT NULL
);


ALTER TABLE public.fonte_protesto OWNER TO conflitosurbanos;

--
-- Name: forma_participacao_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.forma_participacao_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forma_participacao_increment OWNER TO conflitosurbanos;

--
-- Name: forma_participacao; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.forma_participacao (
    num_seq_forma_participacao integer DEFAULT nextval('public.forma_participacao_increment'::regclass) NOT NULL,
    desc_forma_participacao character varying(100) NOT NULL
);


ALTER TABLE public.forma_participacao OWNER TO conflitosurbanos;

--
-- Name: forma_protesto_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.forma_protesto_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forma_protesto_increment OWNER TO conflitosurbanos;

--
-- Name: forma_protesto; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.forma_protesto (
    num_seq_forma_protesto integer DEFAULT nextval('public.forma_protesto_increment'::regclass) NOT NULL,
    forma_protesto character varying(100) NOT NULL,
    protesto_num_seq_protesto integer,
    repertorio_acao_num_seq_repertorio_acao integer NOT NULL
);


ALTER TABLE public.forma_protesto OWNER TO conflitosurbanos;

--
-- Name: geolocalizacao_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.geolocalizacao_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.geolocalizacao_increment OWNER TO conflitosurbanos;

--
-- Name: geolocalizacao; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.geolocalizacao (
    num_seq_geolocalizacao integer DEFAULT nextval('public.geolocalizacao_increment'::regclass) NOT NULL,
    nivel_exatidao character varying(100) NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    protesto_num_seq_protesto integer,
    raio integer NOT NULL
);


ALTER TABLE public.geolocalizacao OWNER TO conflitosurbanos;

--
-- Name: grafico; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.grafico (
    num_seq_grafico bigint NOT NULL,
    ano integer,
    contador integer,
    variavel character varying(100)
);


ALTER TABLE public.grafico OWNER TO conflitosurbanos;

--
-- Name: grafico_limite; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.grafico_limite (
    num_seq_grafico_limite bigint NOT NULL,
    cod integer
);


ALTER TABLE public.grafico_limite OWNER TO conflitosurbanos;

--
-- Name: local_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.local_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.local_increment OWNER TO conflitosurbanos;

--
-- Name: local; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.local (
    num_seq_local integer DEFAULT nextval('public.local_increment'::regclass) NOT NULL,
    endereco character varying(100) NOT NULL,
    origem_manifestacao character varying(100),
    bairro_num_seq_bairro integer NOT NULL,
    cidade_num_seq_cidade integer NOT NULL,
    protesto_num_seq_protesto integer
);


ALTER TABLE public.local OWNER TO conflitosurbanos;

--
-- Name: objeto_protesto_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.objeto_protesto_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.objeto_protesto_increment OWNER TO conflitosurbanos;

--
-- Name: objeto_protesto; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.objeto_protesto (
    num_seq_objeto_protesto integer DEFAULT nextval('public.objeto_protesto_increment'::regclass) NOT NULL,
    descritor_objeto_protesto text,
    objeto_protesto character varying(100) NOT NULL,
    categoria_objeto_num_seq_categoria_objeto integer NOT NULL,
    protesto_num_seq_protesto integer
);


ALTER TABLE public.objeto_protesto OWNER TO conflitosurbanos;

--
-- Name: participacao_agente; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.participacao_agente (
    num_seq_participacao_agente integer DEFAULT nextval('public.participacao_agente_increment'::regclass) NOT NULL,
    agente_protesto_num_seq_agente_protesto integer NOT NULL,
    forma_participacao_num_seq_forma_participacao integer NOT NULL,
    protesto_num_seq_protesto integer
);


ALTER TABLE public.participacao_agente OWNER TO conflitosurbanos;

--
-- Name: perfil_participante; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.perfil_participante (
    num_seq_perfil_participante bigint NOT NULL,
    resposta9 character varying(100),
    resposta1 bigint NOT NULL,
    resposta10 bigint NOT NULL,
    resposta11 bigint NOT NULL,
    resposta12 bigint NOT NULL,
    resposta13 bigint NOT NULL,
    resposta14 bigint NOT NULL,
    resposta15 bigint NOT NULL,
    resposta16 bigint NOT NULL,
    resposta17 bigint NOT NULL,
    resposta18 bigint NOT NULL,
    resposta2 bigint NOT NULL,
    resposta3 bigint NOT NULL,
    resposta4 bigint NOT NULL,
    resposta5 bigint NOT NULL,
    resposta6 bigint NOT NULL,
    resposta7 bigint NOT NULL,
    resposta8 bigint NOT NULL,
    protesto_num_seq_protesto bigint
);


ALTER TABLE public.perfil_participante OWNER TO conflitosurbanos;

--
-- Name: perfil_resposta; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.perfil_resposta (
    num_seq_perfil_resposta bigint NOT NULL,
    desc_perfil_resposta character varying(100)
);


ALTER TABLE public.perfil_resposta OWNER TO conflitosurbanos;

--
-- Name: perfil_usuario; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.perfil_usuario (
    num_seq_perfil_usuario bigint NOT NULL,
    desc_perfil_usuario character varying(100) NOT NULL
);


ALTER TABLE public.perfil_usuario OWNER TO conflitosurbanos;

--
-- Name: protesto_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.protesto_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.protesto_increment OWNER TO conflitosurbanos;

--
-- Name: protesto; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.protesto (
    num_seq_protesto integer DEFAULT nextval('public.protesto_increment'::regclass) NOT NULL,
    data_protesto timestamp without time zone NOT NULL,
    desc_detal_protesto text,
    desc_protesto character varying(100),
    ident_protesto character varying(100),
    qtde_envolvidos_protesto integer,
    tema_protesto character varying(400) NOT NULL,
    conflito_num_seq_conflito integer,
    usuario_num_seq_usuario integer,
    status smallint DEFAULT 0 NOT NULL,
    CONSTRAINT protesto_qtde_envolvidos_protesto_check CHECK (((qtde_envolvidos_protesto >= 0) AND (qtde_envolvidos_protesto <= 999999)))
);


ALTER TABLE public.protesto OWNER TO conflitosurbanos;

--
-- Name: relatorio_geral; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.relatorio_geral (
    num_seq_relatorio_geral bigint NOT NULL,
    agente_protesto character varying(100),
    bairro character varying(100),
    cidade character varying(100),
    data_protesto timestamp without time zone,
    desc_categoria_objeto character varying(100),
    desc_detal_protesto text,
    desc_fonte_protesto character varying(100),
    desc_forma_participacao character varying(100),
    desc_protesto character varying(100),
    desc_repertorio_acao character varying(100),
    descritor_desdobramento text,
    descritor_objeto_protesto text,
    desdobramento character varying(100),
    endereco character varying(100),
    fonte_desdobramento character varying(100),
    forma_protesto character varying(100),
    num_seq_protesto bigint,
    objeto_protesto character varying(100),
    origem_manifestacao character varying(100),
    qtde_envolvidos_protesto integer,
    referencia text,
    tema_protesto character varying(100),
    verifica integer,
    latitude double precision,
    longitude double precision
);


ALTER TABLE public.relatorio_geral OWNER TO conflitosurbanos;

--
-- Name: relatorio_geral_contador; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.relatorio_geral_contador (
    num_seq_relatorio_geral_contador bigint NOT NULL,
    cont integer,
    num_seq_protesto bigint
);


ALTER TABLE public.relatorio_geral_contador OWNER TO conflitosurbanos;

--
-- Name: repertorio_acao_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.repertorio_acao_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.repertorio_acao_increment OWNER TO conflitosurbanos;

--
-- Name: repertorio_acao; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.repertorio_acao (
    num_seq_repertorio_acao integer DEFAULT nextval('public.repertorio_acao_increment'::regclass) NOT NULL,
    desc_repertorio_acao character varying(100) NOT NULL
);


ALTER TABLE public.repertorio_acao OWNER TO conflitosurbanos;

--
-- Name: screenshot; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.screenshot (
    id character varying(200) NOT NULL,
    id_protesto integer NOT NULL
);


ALTER TABLE public.screenshot OWNER TO conflitosurbanos;

--
-- Name: usuario_increment; Type: SEQUENCE; Schema: public; Owner: conflitosurbanos
--

CREATE SEQUENCE public.usuario_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_increment OWNER TO conflitosurbanos;

--
-- Name: usuario; Type: TABLE; Schema: public; Owner: conflitosurbanos
--

CREATE TABLE public.usuario (
    num_seq_usuario integer DEFAULT nextval('public.usuario_increment'::regclass) NOT NULL,
    usu_login character varying(50) NOT NULL,
    usu_senha character varying(200) NOT NULL,
    perfil_usuario_num_seq_perfil_usuario bigint
);


ALTER TABLE public.usuario OWNER TO conflitosurbanos;

--
-- Data for Name: agente; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.agente (num_seq_agente, forma_participacao_num_seq_forma_participacao, participacao_agente_num_seq_participacao_agente, protesto_num_seq_protesto) FROM stdin;
\.


--
-- Data for Name: agente_protesto; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.agente_protesto (num_seq_agente_protesto, agente_protesto, local_agente, categoria_agente_num_seq_categoria_agente) FROM stdin;
\.


--
-- Data for Name: bairro; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.bairro (num_seq_bairro, bairro, cidade_num_seq_cidade) FROM stdin;
\.


--
-- Data for Name: categoria_agente; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.categoria_agente (num_seq_categoria_agente, desc_categoria_agente) FROM stdin;
\.


--
-- Data for Name: categoria_objeto; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.categoria_objeto (num_seq_categoria_objeto, desc_categoria_objeto) FROM stdin;
\.


--
-- Data for Name: cidade; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.cidade (num_seq_cidade, cidade) FROM stdin;
\.


--
-- Data for Name: conflito; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.conflito (num_seq_conflito, desc_conflito, desc_detal_conflito, ident_conflito) FROM stdin;
\.


--
-- Data for Name: desdobramento; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.desdobramento (num_seq_desdobramento, descritor_desdobramento, desdobramento, fonte_desdobramento, protesto_num_seq_protesto) FROM stdin;
\.


--
-- Data for Name: documento; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.documento (num_seq_documento, caminho_documento, mime_type, nome_documento, protesto_num_seq_protesto, byte_array) FROM stdin;
\.


--
-- Data for Name: fonte; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.fonte (num_seq_fonte, referencia, fonte_protesto_num_seq_fonte_protesto, protesto_num_seq_protesto) FROM stdin;
\.


--
-- Data for Name: fonte_protesto; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.fonte_protesto (num_seq_fonte_protesto, desc_fonte_protesto) FROM stdin;
\.


--
-- Data for Name: forma_participacao; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.forma_participacao (num_seq_forma_participacao, desc_forma_participacao) FROM stdin;
\.


--
-- Data for Name: forma_protesto; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.forma_protesto (num_seq_forma_protesto, forma_protesto, protesto_num_seq_protesto, repertorio_acao_num_seq_repertorio_acao) FROM stdin;
\.


--
-- Data for Name: geolocalizacao; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.geolocalizacao (num_seq_geolocalizacao, nivel_exatidao, latitude, longitude, protesto_num_seq_protesto, raio) FROM stdin;
\.


--
-- Data for Name: grafico; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.grafico (num_seq_grafico, ano, contador, variavel) FROM stdin;
\.


--
-- Data for Name: grafico_limite; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.grafico_limite (num_seq_grafico_limite, cod) FROM stdin;
\.


--
-- Data for Name: local; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.local (num_seq_local, endereco, origem_manifestacao, bairro_num_seq_bairro, cidade_num_seq_cidade, protesto_num_seq_protesto) FROM stdin;
\.


--
-- Data for Name: objeto_protesto; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.objeto_protesto (num_seq_objeto_protesto, descritor_objeto_protesto, objeto_protesto, categoria_objeto_num_seq_categoria_objeto, protesto_num_seq_protesto) FROM stdin;
\.


--
-- Data for Name: participacao_agente; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.participacao_agente (num_seq_participacao_agente, agente_protesto_num_seq_agente_protesto, forma_participacao_num_seq_forma_participacao, protesto_num_seq_protesto) FROM stdin;
\.


--
-- Data for Name: perfil_participante; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.perfil_participante (num_seq_perfil_participante, resposta9, resposta1, resposta10, resposta11, resposta12, resposta13, resposta14, resposta15, resposta16, resposta17, resposta18, resposta2, resposta3, resposta4, resposta5, resposta6, resposta7, resposta8, protesto_num_seq_protesto) FROM stdin;
\.


--
-- Data for Name: perfil_resposta; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.perfil_resposta (num_seq_perfil_resposta, desc_perfil_resposta) FROM stdin;
\.


--
-- Data for Name: perfil_usuario; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.perfil_usuario (num_seq_perfil_usuario, desc_perfil_usuario) FROM stdin;
\.


--
-- Data for Name: protesto; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.protesto (num_seq_protesto, data_protesto, desc_detal_protesto, desc_protesto, ident_protesto, qtde_envolvidos_protesto, tema_protesto, conflito_num_seq_conflito, usuario_num_seq_usuario, status) FROM stdin;
\.


--
-- Data for Name: relatorio_geral; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.relatorio_geral (num_seq_relatorio_geral, agente_protesto, bairro, cidade, data_protesto, desc_categoria_objeto, desc_detal_protesto, desc_fonte_protesto, desc_forma_participacao, desc_protesto, desc_repertorio_acao, descritor_desdobramento, descritor_objeto_protesto, desdobramento, endereco, fonte_desdobramento, forma_protesto, num_seq_protesto, objeto_protesto, origem_manifestacao, qtde_envolvidos_protesto, referencia, tema_protesto, verifica, latitude, longitude) FROM stdin;
\.


--
-- Data for Name: relatorio_geral_contador; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.relatorio_geral_contador (num_seq_relatorio_geral_contador, cont, num_seq_protesto) FROM stdin;
\.


--
-- Data for Name: repertorio_acao; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.repertorio_acao (num_seq_repertorio_acao, desc_repertorio_acao) FROM stdin;
\.


--
-- Data for Name: screenshot; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.screenshot (id, id_protesto) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: conflitosurbanos
--

COPY public.usuario (num_seq_usuario, usu_login, usu_senha, perfil_usuario_num_seq_perfil_usuario) FROM stdin;
\.


--
-- Name: agente_protesto_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.agente_protesto_increment', 1, false);


--
-- Name: bairro_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.bairro_increment', 1, false);


--
-- Name: categoria_agente_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.categoria_agente_increment', 1, false);


--
-- Name: categoria_objeto_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.categoria_objeto_increment', 1, false);


--
-- Name: cidade_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.cidade_increment', 1, false);


--
-- Name: conflito_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.conflito_increment', 1, false);


--
-- Name: desdobramento_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.desdobramento_increment', 1, false);


--
-- Name: fonte_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.fonte_increment', 1, false);


--
-- Name: fonte_protesto_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.fonte_protesto_increment', 1, false);


--
-- Name: forma_participacao_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.forma_participacao_increment', 1, false);


--
-- Name: forma_protesto_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.forma_protesto_increment', 1, false);


--
-- Name: geolocalizacao_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.geolocalizacao_increment', 1, false);


--
-- Name: local_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.local_increment', 1, false);


--
-- Name: objeto_protesto_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.objeto_protesto_increment', 1, false);


--
-- Name: participacao_agente_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.participacao_agente_increment', 1849, true);


--
-- Name: protesto_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.protesto_increment', 930, true);


--
-- Name: repertorio_acao_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.repertorio_acao_increment', 1, false);


--
-- Name: usuario_increment; Type: SEQUENCE SET; Schema: public; Owner: conflitosurbanos
--

SELECT pg_catalog.setval('public.usuario_increment', 1, false);


--
-- Name: agente agente_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.agente
    ADD CONSTRAINT agente_pkey PRIMARY KEY (num_seq_agente);


--
-- Name: agente_protesto agente_protesto_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.agente_protesto
    ADD CONSTRAINT agente_protesto_pkey PRIMARY KEY (num_seq_agente_protesto);


--
-- Name: bairro bairro_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.bairro
    ADD CONSTRAINT bairro_pkey PRIMARY KEY (num_seq_bairro);


--
-- Name: categoria_agente categoria_agente_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.categoria_agente
    ADD CONSTRAINT categoria_agente_pkey PRIMARY KEY (num_seq_categoria_agente);


--
-- Name: categoria_objeto categoria_objeto_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.categoria_objeto
    ADD CONSTRAINT categoria_objeto_pkey PRIMARY KEY (num_seq_categoria_objeto);


--
-- Name: cidade cidade_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.cidade
    ADD CONSTRAINT cidade_pkey PRIMARY KEY (num_seq_cidade);


--
-- Name: conflito conflito_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.conflito
    ADD CONSTRAINT conflito_pkey PRIMARY KEY (num_seq_conflito);


--
-- Name: desdobramento desdobramento_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.desdobramento
    ADD CONSTRAINT desdobramento_pkey PRIMARY KEY (num_seq_desdobramento);


--
-- Name: documento documento_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.documento
    ADD CONSTRAINT documento_pkey PRIMARY KEY (num_seq_documento);


--
-- Name: fonte fonte_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.fonte
    ADD CONSTRAINT fonte_pkey PRIMARY KEY (num_seq_fonte);


--
-- Name: fonte_protesto fonte_protesto_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.fonte_protesto
    ADD CONSTRAINT fonte_protesto_pkey PRIMARY KEY (num_seq_fonte_protesto);


--
-- Name: forma_participacao forma_participacao_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.forma_participacao
    ADD CONSTRAINT forma_participacao_pkey PRIMARY KEY (num_seq_forma_participacao);


--
-- Name: forma_protesto forma_protesto_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.forma_protesto
    ADD CONSTRAINT forma_protesto_pkey PRIMARY KEY (num_seq_forma_protesto);


--
-- Name: geolocalizacao geolocalizacao_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.geolocalizacao
    ADD CONSTRAINT geolocalizacao_pkey PRIMARY KEY (num_seq_geolocalizacao);


--
-- Name: grafico_limite grafico_limite_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.grafico_limite
    ADD CONSTRAINT grafico_limite_pkey PRIMARY KEY (num_seq_grafico_limite);


--
-- Name: grafico grafico_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.grafico
    ADD CONSTRAINT grafico_pkey PRIMARY KEY (num_seq_grafico);


--
-- Name: local local_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.local
    ADD CONSTRAINT local_pkey PRIMARY KEY (num_seq_local);


--
-- Name: objeto_protesto objeto_protesto_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.objeto_protesto
    ADD CONSTRAINT objeto_protesto_pkey PRIMARY KEY (num_seq_objeto_protesto);


--
-- Name: participacao_agente participacao_agente_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.participacao_agente
    ADD CONSTRAINT participacao_agente_pkey PRIMARY KEY (num_seq_participacao_agente);


--
-- Name: perfil_participante perfil_participante_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT perfil_participante_pkey PRIMARY KEY (num_seq_perfil_participante);


--
-- Name: perfil_resposta perfil_resposta_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_resposta
    ADD CONSTRAINT perfil_resposta_pkey PRIMARY KEY (num_seq_perfil_resposta);


--
-- Name: perfil_usuario perfil_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_usuario
    ADD CONSTRAINT perfil_usuario_pkey PRIMARY KEY (num_seq_perfil_usuario);


--
-- Name: protesto protesto_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.protesto
    ADD CONSTRAINT protesto_pkey PRIMARY KEY (num_seq_protesto);


--
-- Name: relatorio_geral_contador relatorio_geral_contador_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.relatorio_geral_contador
    ADD CONSTRAINT relatorio_geral_contador_pkey PRIMARY KEY (num_seq_relatorio_geral_contador);


--
-- Name: relatorio_geral relatorio_geral_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.relatorio_geral
    ADD CONSTRAINT relatorio_geral_pkey PRIMARY KEY (num_seq_relatorio_geral);


--
-- Name: repertorio_acao repertorio_acao_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.repertorio_acao
    ADD CONSTRAINT repertorio_acao_pkey PRIMARY KEY (num_seq_repertorio_acao);


--
-- Name: screenshot screenshot_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.screenshot
    ADD CONSTRAINT screenshot_pkey PRIMARY KEY (id);


--
-- Name: usuario uk_8fjuatstg8t2v75ltdydhh1ki; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uk_8fjuatstg8t2v75ltdydhh1ki UNIQUE (usu_login);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (num_seq_usuario);


--
-- Name: perfil_participante fk_29u693jyqfbawkuo7tymr2ruf; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_29u693jyqfbawkuo7tymr2ruf FOREIGN KEY (resposta13) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: perfil_participante fk_2u381f1j4krc7hu1n86kth333; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_2u381f1j4krc7hu1n86kth333 FOREIGN KEY (resposta14) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: bairro fk_3obh4bj7p7pxor0ecs426ak83; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.bairro
    ADD CONSTRAINT fk_3obh4bj7p7pxor0ecs426ak83 FOREIGN KEY (cidade_num_seq_cidade) REFERENCES public.cidade(num_seq_cidade);


--
-- Name: protesto fk_4qqlt8gw1lo3hwrepga2tajtk; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.protesto
    ADD CONSTRAINT fk_4qqlt8gw1lo3hwrepga2tajtk FOREIGN KEY (usuario_num_seq_usuario) REFERENCES public.usuario(num_seq_usuario);


--
-- Name: perfil_participante fk_5092g6qd3mh0p9pb8xha35dbv; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_5092g6qd3mh0p9pb8xha35dbv FOREIGN KEY (resposta15) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: forma_protesto fk_50ds2joxi11c7i7ieyhln6b1a; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.forma_protesto
    ADD CONSTRAINT fk_50ds2joxi11c7i7ieyhln6b1a FOREIGN KEY (repertorio_acao_num_seq_repertorio_acao) REFERENCES public.repertorio_acao(num_seq_repertorio_acao);


--
-- Name: perfil_participante fk_5d03mq142p5r75yuimw52wtqq; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_5d03mq142p5r75yuimw52wtqq FOREIGN KEY (resposta12) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: perfil_participante fk_6354j8qki504mdwrtq3tbd1ug; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_6354j8qki504mdwrtq3tbd1ug FOREIGN KEY (resposta6) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: documento fk_6786j9pfw77wjr2mdo34qsfwe; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.documento
    ADD CONSTRAINT fk_6786j9pfw77wjr2mdo34qsfwe FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto);


--
-- Name: agente fk_6em2ejr0o8hhjxrtq4kbm4o25; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.agente
    ADD CONSTRAINT fk_6em2ejr0o8hhjxrtq4kbm4o25 FOREIGN KEY (participacao_agente_num_seq_participacao_agente) REFERENCES public.participacao_agente(num_seq_participacao_agente);


--
-- Name: perfil_participante fk_6m4cgen9akpjoxkri4x55jes7; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_6m4cgen9akpjoxkri4x55jes7 FOREIGN KEY (resposta10) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: local fk_71efmcu2dreqbq3c3pio139b; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.local
    ADD CONSTRAINT fk_71efmcu2dreqbq3c3pio139b FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto);


--
-- Name: perfil_participante fk_7mgxniwi4nwkjkwiijs35hcb7; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_7mgxniwi4nwkjkwiijs35hcb7 FOREIGN KEY (resposta4) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: perfil_participante fk_864r6go46k6qighguwvd4ddu3; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_864r6go46k6qighguwvd4ddu3 FOREIGN KEY (resposta11) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: perfil_participante fk_8lbg7ywftugtd75e256kmtnx9; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_8lbg7ywftugtd75e256kmtnx9 FOREIGN KEY (resposta3) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: perfil_participante fk_b86v4nfd13tp2p5qt6eubc7xo; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_b86v4nfd13tp2p5qt6eubc7xo FOREIGN KEY (resposta17) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: local fk_co37ta4f7xcotyeep00n3mjfa; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.local
    ADD CONSTRAINT fk_co37ta4f7xcotyeep00n3mjfa FOREIGN KEY (bairro_num_seq_bairro) REFERENCES public.bairro(num_seq_bairro);


--
-- Name: forma_protesto fk_d0yabbeu6ovmjfo3vk7nwv1ya; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.forma_protesto
    ADD CONSTRAINT fk_d0yabbeu6ovmjfo3vk7nwv1ya FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto);


--
-- Name: participacao_agente fk_djwi7vxup7n4d3huw42mds6iu; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.participacao_agente
    ADD CONSTRAINT fk_djwi7vxup7n4d3huw42mds6iu FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto);


--
-- Name: fonte fk_dwjpdjbmmdhtb6jda0iv6463d; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.fonte
    ADD CONSTRAINT fk_dwjpdjbmmdhtb6jda0iv6463d FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto) ON DELETE CASCADE;


--
-- Name: objeto_protesto fk_e6k7039w7f80by34t29sptd7x; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.objeto_protesto
    ADD CONSTRAINT fk_e6k7039w7f80by34t29sptd7x FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto);


--
-- Name: desdobramento fk_f1m6ia6ed30awqdwpcn8aqwlf; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.desdobramento
    ADD CONSTRAINT fk_f1m6ia6ed30awqdwpcn8aqwlf FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto);


--
-- Name: geolocalizacao fk_f9fgsyedymyy26tqs5qtuuiwe; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.geolocalizacao
    ADD CONSTRAINT fk_f9fgsyedymyy26tqs5qtuuiwe FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto);


--
-- Name: perfil_participante fk_gxpdou5x33xaae5kle5y4pdm2; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_gxpdou5x33xaae5kle5y4pdm2 FOREIGN KEY (resposta1) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: agente fk_hm1stgs0d7yi29ry1as4envq7; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.agente
    ADD CONSTRAINT fk_hm1stgs0d7yi29ry1as4envq7 FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto);


--
-- Name: perfil_participante fk_hwrf3sy41r6u40hn1k0723kip; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_hwrf3sy41r6u40hn1k0723kip FOREIGN KEY (resposta2) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: perfil_participante fk_i2bqsl0g48eqhhop4kjqccksl; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_i2bqsl0g48eqhhop4kjqccksl FOREIGN KEY (protesto_num_seq_protesto) REFERENCES public.protesto(num_seq_protesto);


--
-- Name: perfil_participante fk_ll3c8rkvogxxe588l909fkd7h; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_ll3c8rkvogxxe588l909fkd7h FOREIGN KEY (resposta18) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: perfil_participante fk_m3345hgxosjftpsujhidq5ym4; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_m3345hgxosjftpsujhidq5ym4 FOREIGN KEY (resposta5) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: participacao_agente fk_m6auofs5cl51gx55l77ldk3ev; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.participacao_agente
    ADD CONSTRAINT fk_m6auofs5cl51gx55l77ldk3ev FOREIGN KEY (forma_participacao_num_seq_forma_participacao) REFERENCES public.forma_participacao(num_seq_forma_participacao);


--
-- Name: participacao_agente fk_morh3c97cmt0969vrqkbqgat2; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.participacao_agente
    ADD CONSTRAINT fk_morh3c97cmt0969vrqkbqgat2 FOREIGN KEY (agente_protesto_num_seq_agente_protesto) REFERENCES public.agente_protesto(num_seq_agente_protesto);


--
-- Name: perfil_participante fk_n659gb6uknbxsyj196kvy1l1y; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_n659gb6uknbxsyj196kvy1l1y FOREIGN KEY (resposta8) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: objeto_protesto fk_nirqosm7ka9rfbxq9fofdrd57; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.objeto_protesto
    ADD CONSTRAINT fk_nirqosm7ka9rfbxq9fofdrd57 FOREIGN KEY (categoria_objeto_num_seq_categoria_objeto) REFERENCES public.categoria_objeto(num_seq_categoria_objeto);


--
-- Name: protesto fk_o5qfdumcje5tolpbms8apmjn; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.protesto
    ADD CONSTRAINT fk_o5qfdumcje5tolpbms8apmjn FOREIGN KEY (conflito_num_seq_conflito) REFERENCES public.conflito(num_seq_conflito);


--
-- Name: local fk_p90vsdlkv0ka0c3g0af7riefd; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.local
    ADD CONSTRAINT fk_p90vsdlkv0ka0c3g0af7riefd FOREIGN KEY (cidade_num_seq_cidade) REFERENCES public.cidade(num_seq_cidade);


--
-- Name: fonte fk_qcn6bmr0ft3w0jua43tbecqce; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.fonte
    ADD CONSTRAINT fk_qcn6bmr0ft3w0jua43tbecqce FOREIGN KEY (fonte_protesto_num_seq_fonte_protesto) REFERENCES public.fonte_protesto(num_seq_fonte_protesto) ON DELETE CASCADE;


--
-- Name: perfil_participante fk_r710f8fmcreft5myloyvbfy35; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_r710f8fmcreft5myloyvbfy35 FOREIGN KEY (resposta7) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: agente fk_r8twfmg6aopkyp6g1aeii8ghj; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.agente
    ADD CONSTRAINT fk_r8twfmg6aopkyp6g1aeii8ghj FOREIGN KEY (forma_participacao_num_seq_forma_participacao) REFERENCES public.forma_participacao(num_seq_forma_participacao);


--
-- Name: agente_protesto fk_sncxtqvw0l0s5lbqp838uxcmn; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.agente_protesto
    ADD CONSTRAINT fk_sncxtqvw0l0s5lbqp838uxcmn FOREIGN KEY (categoria_agente_num_seq_categoria_agente) REFERENCES public.categoria_agente(num_seq_categoria_agente);


--
-- Name: perfil_participante fk_svpfe6daqiosnpjev9288hx6; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.perfil_participante
    ADD CONSTRAINT fk_svpfe6daqiosnpjev9288hx6 FOREIGN KEY (resposta16) REFERENCES public.perfil_resposta(num_seq_perfil_resposta);


--
-- Name: usuario fk_taqxc6xa8buti1t6r49yo7gw5; Type: FK CONSTRAINT; Schema: public; Owner: conflitosurbanos
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_taqxc6xa8buti1t6r49yo7gw5 FOREIGN KEY (perfil_usuario_num_seq_perfil_usuario) REFERENCES public.perfil_usuario(num_seq_perfil_usuario);


--
-- PostgreSQL database dump complete
--

