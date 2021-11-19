--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.4

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
-- Name: account_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.account_type AS ENUM (
    'Admin',
    'Employee',
    'Collaborator'
);


ALTER TYPE public.account_type OWNER TO postgres;

--
-- Name: accounts_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.accounts_type_enum AS ENUM (
    'Admin',
    'Employee',
    'Collaborator'
);


ALTER TYPE public.accounts_type_enum OWNER TO postgres;

--
-- Name: property_history_notes_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.property_history_notes_type_enum AS ENUM (
    'Deleted',
    'Approve',
    'Reject',
    'OnSubmit',
    'Submitted',
    'Other'
);


ALTER TYPE public.property_history_notes_type_enum OWNER TO postgres;

--
-- Name: reset_tokens_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.reset_tokens_status_enum AS ENUM (
    'New',
    'Expired',
    'Success'
);


ALTER TYPE public.reset_tokens_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account_account_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_account_groups (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    account_group_id integer,
    account_id integer,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.account_account_groups OWNER TO postgres;

--
-- Name: account_account_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_account_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_account_groups_id_seq OWNER TO postgres;

--
-- Name: account_account_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_account_groups_id_seq OWNED BY public.account_account_groups.id;


--
-- Name: account_group_features; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_group_features (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    feature_id integer NOT NULL,
    account_group_id integer,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.account_group_features OWNER TO postgres;

--
-- Name: account_group_features_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_group_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_group_features_id_seq OWNER TO postgres;

--
-- Name: account_group_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_group_features_id_seq OWNED BY public.account_group_features.id;


--
-- Name: account_group_resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_group_resources (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    resource_id integer NOT NULL,
    account_group_id integer,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.account_group_resources OWNER TO postgres;

--
-- Name: account_group_resources_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_group_resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_group_resources_id_seq OWNER TO postgres;

--
-- Name: account_group_resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_group_resources_id_seq OWNED BY public.account_group_resources.id;


--
-- Name: account_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_groups (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    code character varying NOT NULL,
    name character varying NOT NULL,
    description character varying DEFAULT ''::character varying,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.account_groups OWNER TO postgres;

--
-- Name: account_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_groups_id_seq OWNER TO postgres;

--
-- Name: account_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_groups_id_seq OWNED BY public.account_groups.id;


--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    employee_id integer,
    collaborator_id integer,
    identity_name character varying NOT NULL,
    hash character varying,
    code character varying,
    display_name character varying NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    last_login_at timestamp without time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    type public.accounts_type_enum DEFAULT 'Collaborator'::public.accounts_type_enum NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: advantage_levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.advantage_levels (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inspection_statement_id integer,
    level double precision NOT NULL,
    note character varying DEFAULT ''::character varying NOT NULL,
    group_id integer NOT NULL,
    type_id integer NOT NULL
);


ALTER TABLE public.advantage_levels OWNER TO postgres;

--
-- Name: advantage_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.advantage_levels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.advantage_levels_id_seq OWNER TO postgres;

--
-- Name: advantage_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.advantage_levels_id_seq OWNED BY public.advantage_levels.id;


--
-- Name: appraisal_audit_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appraisal_audit_details (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    appraisal_statement_id integer,
    inspection_statement_id integer NOT NULL,
    property_id integer NOT NULL,
    type character varying(128),
    created_by integer,
    updated_by integer,
    property_info jsonb,
    use_right_certificate jsonb,
    construction jsonb,
    address character varying,
    total_adjustment double precision,
    advantage_levels jsonb,
    disadvantage_levels jsonb,
    market_land_unit_price double precision,
    total_levels_advantage double precision,
    total_levels_disadvantage double precision,
    adjustments jsonb
);


ALTER TABLE public.appraisal_audit_details OWNER TO postgres;

--
-- Name: appraisal_audit_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appraisal_audit_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appraisal_audit_details_id_seq OWNER TO postgres;

--
-- Name: appraisal_audit_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appraisal_audit_details_id_seq OWNED BY public.appraisal_audit_details.id;


--
-- Name: appraisal_statement_notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appraisal_statement_notes (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    note_id character varying,
    note_type character varying(128) DEFAULT 'Hiện trạng'::character varying,
    execution_date timestamp without time zone,
    assignee_id integer,
    company_id integer,
    instructor_id integer,
    status character varying(128) DEFAULT 'Nháp'::character varying,
    is_deleted boolean DEFAULT false NOT NULL,
    rejection_note character varying DEFAULT ''::character varying NOT NULL,
    property_id integer,
    created_by integer,
    updated_by integer,
    approved_by integer,
    street_number character varying(64),
    district_id integer,
    street_id integer,
    approved_at timestamp without time zone,
    comments jsonb,
    result_audit_ppss jsonb,
    result_audit_ppdg jsonb,
    city_id integer,
    ward_id integer,
    completed_at timestamp without time zone,
    completed_by integer,
    execution_by integer,
    inspection_statement_id integer,
    address character varying,
    rejected_at timestamp without time zone,
    general_info_ppdg jsonb,
    adjust_control_ppdg jsonb,
    rejected_by integer,
    land_unit_price_ppss double precision,
    property_unit_price_ppss double precision,
    land_unit_price_ppdg double precision,
    property_unit_price_ppdg double precision
);


ALTER TABLE public.appraisal_statement_notes OWNER TO postgres;

--
-- Name: appraisal_statement_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appraisal_statement_notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appraisal_statement_notes_id_seq OWNER TO postgres;

--
-- Name: appraisal_statement_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appraisal_statement_notes_id_seq OWNED BY public.appraisal_statement_notes.id;


--
-- Name: casbin_rule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.casbin_rule (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    ptype character varying DEFAULT ''::character varying NOT NULL,
    v0 character varying DEFAULT ''::character varying NOT NULL,
    v1 character varying DEFAULT ''::character varying NOT NULL,
    v2 character varying DEFAULT ''::character varying NOT NULL,
    v3 character varying DEFAULT ''::character varying NOT NULL,
    v4 character varying DEFAULT ''::character varying NOT NULL,
    v5 character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.casbin_rule OWNER TO postgres;

--
-- Name: casbin_rule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.casbin_rule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.casbin_rule_id_seq OWNER TO postgres;

--
-- Name: casbin_rule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.casbin_rule_id_seq OWNED BY public.casbin_rule.id;


--
-- Name: chat_sockets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_sockets (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    account_id integer NOT NULL,
    identity_name character varying NOT NULL,
    socket_id character varying NOT NULL,
    session_id integer NOT NULL
);


ALTER TABLE public.chat_sockets OWNER TO postgres;

--
-- Name: chat_sockets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_sockets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_sockets_id_seq OWNER TO postgres;

--
-- Name: chat_sockets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_sockets_id_seq OWNED BY public.chat_sockets.id;


--
-- Name: collaborators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collaborators (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    full_name character varying NOT NULL,
    birthday date NOT NULL,
    joined_date date NOT NULL,
    phone character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    company_id integer,
    collaborator_type_id integer,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.collaborators OWNER TO postgres;

--
-- Name: collaborators_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collaborators_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collaborators_id_seq OWNER TO postgres;

--
-- Name: collaborators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.collaborators_id_seq OWNED BY public.collaborators.id;


--
-- Name: conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversations (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    snapshot character varying(255) DEFAULT ''::character varying NOT NULL,
    created_by integer,
    updated_by integer,
    last_message_id integer
);


ALTER TABLE public.conversations OWNER TO postgres;

--
-- Name: conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conversations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.conversations_id_seq OWNER TO postgres;

--
-- Name: conversations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conversations_id_seq OWNED BY public.conversations.id;


--
-- Name: disadvantage_levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.disadvantage_levels (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inspection_statement_id integer,
    level double precision NOT NULL,
    note character varying DEFAULT ''::character varying NOT NULL,
    group_id integer NOT NULL,
    type_id integer NOT NULL
);


ALTER TABLE public.disadvantage_levels OWNER TO postgres;

--
-- Name: disadvantage_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.disadvantage_levels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.disadvantage_levels_id_seq OWNER TO postgres;

--
-- Name: disadvantage_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.disadvantage_levels_id_seq OWNED BY public.disadvantage_levels.id;


--
-- Name: employee_limits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_limits (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    type_id integer NOT NULL,
    employee_id integer,
    value double precision NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.employee_limits OWNER TO postgres;

--
-- Name: employee_limits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_limits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_limits_id_seq OWNER TO postgres;

--
-- Name: employee_limits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_limits_id_seq OWNED BY public.employee_limits.id;


--
-- Name: employee_regions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_regions (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    city_id integer,
    ward_id integer,
    employee_id integer,
    created_by integer,
    updated_by integer,
    district_id integer
);


ALTER TABLE public.employee_regions OWNER TO postgres;

--
-- Name: employee_regions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_regions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_regions_id_seq OWNER TO postgres;

--
-- Name: employee_regions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_regions_id_seq OWNED BY public.employee_regions.id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    code character varying NOT NULL,
    full_name character varying NOT NULL,
    birthday date NOT NULL,
    joined_date date NOT NULL,
    phone character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    department_id integer,
    title_id integer,
    manager_id integer,
    status_id integer,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_id_seq OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: features; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.features (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    action character varying NOT NULL,
    name character varying NOT NULL,
    description character varying DEFAULT ''::character varying,
    resource_id integer,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.features OWNER TO postgres;

--
-- Name: features_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.features_id_seq OWNER TO postgres;

--
-- Name: features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.features_id_seq OWNED BY public.features.id;


--
-- Name: group_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_values (
    id integer NOT NULL,
    code character varying NOT NULL,
    name character varying NOT NULL,
    parent_id integer,
    is_active boolean DEFAULT true NOT NULL,
    created_by integer,
    updated_by integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.group_values OWNER TO postgres;

--
-- Name: group_values_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.group_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_values_id_seq OWNER TO postgres;

--
-- Name: group_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.group_values_id_seq OWNED BY public.group_values.id;


--
-- Name: inspection_statement_notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspection_statement_notes (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    note_id character varying,
    note_type character varying,
    execution_date timestamp without time zone,
    assignee_id integer,
    company_id integer,
    instructor_id integer,
    status character varying,
    is_deleted boolean DEFAULT false NOT NULL,
    rejection_note character varying DEFAULT ''::character varying NOT NULL,
    property_id integer,
    created_by integer,
    updated_by integer,
    approved_by integer,
    street_number character varying(64),
    city_id integer,
    ward_id integer,
    district_id integer,
    street_id integer,
    street_group_id integer,
    position_group_id integer,
    address character varying DEFAULT ''::character varying NOT NULL,
    other_address boolean DEFAULT false NOT NULL,
    location_description character varying DEFAULT ''::character varying NOT NULL,
    closed_deal_value integer,
    transaction_date date,
    broker_id integer,
    approved_at timestamp without time zone,
    land_use_rights jsonb,
    construction jsonb,
    total_adjustment double precision,
    market_land_unit_price integer,
    total_advantage_level double precision,
    total_disadvantage_level double precision,
    rejected_at timestamp without time zone,
    rejected_by integer
);


ALTER TABLE public.inspection_statement_notes OWNER TO postgres;

--
-- Name: inspection_statement_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspection_statement_notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inspection_statement_notes_id_seq OWNER TO postgres;

--
-- Name: inspection_statement_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspection_statement_notes_id_seq OWNED BY public.inspection_statement_notes.id;


--
-- Name: master_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.master_values (
    id integer NOT NULL,
    group_id integer,
    group_code character varying NOT NULL,
    group_name character varying NOT NULL,
    value_code character varying DEFAULT ''::character varying NOT NULL,
    parent_id integer,
    is_active boolean DEFAULT true NOT NULL,
    created_by integer,
    updated_by integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    value_name character varying DEFAULT ''::character varying NOT NULL,
    custom_data json
);


ALTER TABLE public.master_values OWNER TO postgres;

--
-- Name: master_values_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.master_values_id_seq OWNER TO postgres;

--
-- Name: master_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.master_values_id_seq OWNED BY public.master_values.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    content text NOT NULL,
    status character varying(20) DEFAULT 'Sent'::character varying NOT NULL,
    conversation_id integer NOT NULL,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participants (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    conversation_id integer NOT NULL,
    account_id integer NOT NULL,
    last_seen_id integer
);


ALTER TABLE public.participants OWNER TO postgres;

--
-- Name: participants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.participants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.participants_id_seq OWNER TO postgres;

--
-- Name: participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.participants_id_seq OWNED BY public.participants.id;


--
-- Name: properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.properties (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    general_note text,
    price integer NOT NULL,
    longitude double precision,
    latitude double precision,
    city_id integer NOT NULL,
    ward_id integer NOT NULL,
    district_id integer NOT NULL,
    street_id integer NOT NULL,
    location_type_id integer,
    urgent_level_id integer NOT NULL,
    attachments text,
    land_plot character varying(64),
    map character varying(64),
    horizontal_front integer,
    horizontal_back integer,
    height1 integer,
    height2 integer,
    property_type_id integer,
    property_period_id integer,
    property_using_id integer,
    recognized_area integer,
    unrecognized_area integer,
    recognized_planning_area integer,
    ground_floors integer,
    mezzanines integer,
    basements integer,
    roofs integer,
    structure text,
    recognized_floor_area integer,
    unrecognized_floor_area integer,
    construction_note text,
    deal_stage character varying(128) DEFAULT 'Đang giao dịch'::character varying,
    business_status character varying(128) DEFAULT 'Không có'::character varying,
    transaction_date date,
    closed_deal_value integer,
    status character varying(128) DEFAULT 'Nháp'::character varying NOT NULL,
    created_by integer,
    updated_by integer,
    construction_current_stage character varying(128) DEFAULT 'Không có công trình'::character varying,
    street_number character varying(64) NOT NULL,
    source_id integer NOT NULL,
    broker character varying(256),
    code character varying(64) NOT NULL,
    description text,
    approved_at timestamp without time zone,
    approved_by integer
);


ALTER TABLE public.properties OWNER TO postgres;

--
-- Name: properties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.properties_id_seq OWNER TO postgres;

--
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.properties_id_seq OWNED BY public.properties.id;


--
-- Name: property_bookmarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_bookmarks (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    property_id integer NOT NULL,
    bookmarker_id integer,
    bookmark_date timestamp without time zone,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.property_bookmarks OWNER TO postgres;

--
-- Name: property_bookmarks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.property_bookmarks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.property_bookmarks_id_seq OWNER TO postgres;

--
-- Name: property_bookmarks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_bookmarks_id_seq OWNED BY public.property_bookmarks.id;


--
-- Name: property_history_notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_history_notes (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    property_id integer NOT NULL,
    type public.property_history_notes_type_enum DEFAULT 'Other'::public.property_history_notes_type_enum,
    reason_id integer,
    notes character varying,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.property_history_notes OWNER TO postgres;

--
-- Name: property_history_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.property_history_notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.property_history_notes_id_seq OWNER TO postgres;

--
-- Name: property_history_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_history_notes_id_seq OWNED BY public.property_history_notes.id;


--
-- Name: reset_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reset_tokens (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    account_id integer NOT NULL,
    email character varying NOT NULL,
    hash character varying NOT NULL,
    expired_at timestamp without time zone NOT NULL,
    status public.reset_tokens_status_enum DEFAULT 'New'::public.reset_tokens_status_enum NOT NULL,
    created_by integer,
    updated_by integer,
    identity_name character varying NOT NULL
);


ALTER TABLE public.reset_tokens OWNER TO postgres;

--
-- Name: reset_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reset_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reset_tokens_id_seq OWNER TO postgres;

--
-- Name: reset_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reset_tokens_id_seq OWNED BY public.reset_tokens.id;


--
-- Name: resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resources (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    path character varying NOT NULL,
    name character varying NOT NULL,
    description character varying DEFAULT ''::character varying,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.resources OWNER TO postgres;

--
-- Name: resources_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.resources_id_seq OWNER TO postgres;

--
-- Name: resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resources_id_seq OWNED BY public.resources.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    account_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    token character varying NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: account_account_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_account_groups ALTER COLUMN id SET DEFAULT nextval('public.account_account_groups_id_seq'::regclass);


--
-- Name: account_group_features id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_features ALTER COLUMN id SET DEFAULT nextval('public.account_group_features_id_seq'::regclass);


--
-- Name: account_group_resources id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_resources ALTER COLUMN id SET DEFAULT nextval('public.account_group_resources_id_seq'::regclass);


--
-- Name: account_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_groups ALTER COLUMN id SET DEFAULT nextval('public.account_groups_id_seq'::regclass);


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: advantage_levels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advantage_levels ALTER COLUMN id SET DEFAULT nextval('public.advantage_levels_id_seq'::regclass);


--
-- Name: appraisal_audit_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_audit_details ALTER COLUMN id SET DEFAULT nextval('public.appraisal_audit_details_id_seq'::regclass);


--
-- Name: appraisal_statement_notes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes ALTER COLUMN id SET DEFAULT nextval('public.appraisal_statement_notes_id_seq'::regclass);


--
-- Name: casbin_rule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.casbin_rule ALTER COLUMN id SET DEFAULT nextval('public.casbin_rule_id_seq'::regclass);


--
-- Name: chat_sockets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_sockets ALTER COLUMN id SET DEFAULT nextval('public.chat_sockets_id_seq'::regclass);


--
-- Name: collaborators id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborators ALTER COLUMN id SET DEFAULT nextval('public.collaborators_id_seq'::regclass);


--
-- Name: conversations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations ALTER COLUMN id SET DEFAULT nextval('public.conversations_id_seq'::regclass);


--
-- Name: disadvantage_levels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disadvantage_levels ALTER COLUMN id SET DEFAULT nextval('public.disadvantage_levels_id_seq'::regclass);


--
-- Name: employee_limits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_limits ALTER COLUMN id SET DEFAULT nextval('public.employee_limits_id_seq'::regclass);


--
-- Name: employee_regions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_regions ALTER COLUMN id SET DEFAULT nextval('public.employee_regions_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: features id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.features ALTER COLUMN id SET DEFAULT nextval('public.features_id_seq'::regclass);


--
-- Name: group_values id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_values ALTER COLUMN id SET DEFAULT nextval('public.group_values_id_seq'::regclass);


--
-- Name: inspection_statement_notes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes ALTER COLUMN id SET DEFAULT nextval('public.inspection_statement_notes_id_seq'::regclass);


--
-- Name: master_values id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_values ALTER COLUMN id SET DEFAULT nextval('public.master_values_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: participants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants ALTER COLUMN id SET DEFAULT nextval('public.participants_id_seq'::regclass);


--
-- Name: properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties ALTER COLUMN id SET DEFAULT nextval('public.properties_id_seq'::regclass);


--
-- Name: property_bookmarks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_bookmarks ALTER COLUMN id SET DEFAULT nextval('public.property_bookmarks_id_seq'::regclass);


--
-- Name: property_history_notes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_history_notes ALTER COLUMN id SET DEFAULT nextval('public.property_history_notes_id_seq'::regclass);


--
-- Name: reset_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_tokens ALTER COLUMN id SET DEFAULT nextval('public.reset_tokens_id_seq'::regclass);


--
-- Name: resources id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources ALTER COLUMN id SET DEFAULT nextval('public.resources_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Data for Name: account_account_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_account_groups (id, created_at, updated_at, account_group_id, account_id, created_by, updated_by) FROM stdin;
71	2020-10-26 08:11:06.62392	2020-10-26 08:11:06.62392	3	58	2	2
73	2020-10-27 03:18:23.64228	2020-10-27 03:18:23.64228	1	26	38	38
74	2020-10-27 03:18:23.64228	2020-10-27 03:18:23.64228	2	26	38	38
75	2020-10-27 03:19:31.311959	2020-10-27 03:19:31.311959	1	31	38	38
76	2020-10-27 03:41:34.156149	2020-10-27 03:41:34.156149	1	55	2	2
22	2020-10-16 09:06:15.006161	2020-10-16 09:06:15.006161	1	24	2	2
77	2020-10-27 03:41:46.268439	2020-10-27 03:41:46.268439	1	42	2	2
25	2020-10-19 07:56:52.470207	2020-10-19 07:56:52.470207	3	29	2	2
26	2020-10-19 08:04:15.928811	2020-10-19 08:04:15.928811	1	30	2	2
28	2020-10-20 09:45:26.307951	2020-10-20 09:45:26.307951	1	33	2	2
36	2020-10-22 04:11:00.625965	2020-10-22 04:11:00.625965	3	43	39	39
37	2020-10-22 04:11:00.625965	2020-10-22 04:11:00.625965	6	43	39	39
38	2020-10-22 04:11:00.625965	2020-10-22 04:11:00.625965	2	43	39	39
39	2020-10-22 04:11:00.625965	2020-10-22 04:11:00.625965	7	43	39	39
40	2020-10-22 04:21:53.259637	2020-10-22 04:21:53.259637	3	45	39	39
41	2020-10-22 04:48:43.986633	2020-10-22 04:48:43.986633	1	47	2	2
42	2020-10-22 10:14:21.217879	2020-10-22 10:14:21.217879	8	48	2	2
43	2020-10-22 10:41:37.522537	2020-10-22 10:41:37.522537	1	49	2	2
44	2020-10-23 07:01:08.353752	2020-10-23 07:01:08.353752	2	53	38	38
78	2020-10-27 03:41:46.268439	2020-10-27 03:41:46.268439	2	42	2	2
79	2020-10-27 03:41:46.268439	2020-10-27 03:41:46.268439	3	42	2	2
80	2020-10-27 03:41:46.268439	2020-10-27 03:41:46.268439	6	42	2	2
81	2020-10-27 03:41:46.268439	2020-10-27 03:41:46.268439	7	42	2	2
82	2020-10-27 03:41:46.268439	2020-10-27 03:41:46.268439	9	42	2	2
83	2020-10-27 03:41:46.268439	2020-10-27 03:41:46.268439	11	42	2	2
84	2020-10-27 03:42:06.968782	2020-10-27 03:42:06.968782	1	28	2	2
85	2020-10-30 10:26:45.959748	2020-10-30 10:26:45.959748	3	59	2	2
86	2020-11-05 04:02:30.423831	2020-11-05 04:02:30.423831	3	67	66	66
87	2020-11-05 04:04:05.740853	2020-11-05 04:04:05.740853	3	68	66	66
88	2020-11-05 06:38:12.384851	2020-11-05 06:38:12.384851	17	56	2	2
89	2020-11-05 08:21:04.283937	2020-11-05 08:21:04.283937	16	69	56	56
90	2020-11-06 04:58:47.291529	2020-11-06 04:58:47.291529	17	70	2	2
58	2020-10-23 11:11:27.096831	2020-10-23 11:11:27.096831	1	54	38	38
59	2020-10-23 11:11:27.096831	2020-10-23 11:11:27.096831	2	54	38	38
\.


--
-- Data for Name: account_group_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_group_features (id, created_at, updated_at, feature_id, account_group_id, created_by, updated_by) FROM stdin;
41	2020-09-25 06:48:46.654524	2020-09-25 06:48:46.654524	15	11	2	2
42	2020-09-25 07:08:48.738053	2020-09-25 07:08:48.738053	2	4	2	2
43	2020-09-25 07:08:48.738053	2020-09-25 07:08:48.738053	3	4	2	2
44	2020-09-28 07:16:32.518599	2020-09-28 07:16:32.518599	2	1	2	2
45	2020-09-28 07:16:32.518599	2020-09-28 07:16:32.518599	1	1	2	2
46	2020-09-28 07:16:59.343021	2020-09-28 07:16:59.343021	1	13	2	2
47	2020-10-16 02:37:43.090304	2020-10-16 02:37:43.090304	15	5	2	2
34	2020-09-24 03:40:50.425762	2020-09-24 03:40:50.425762	6	3	2	2
17	2020-09-23 05:55:47.092465	2020-09-24 03:40:50.425762	8	3	\N	2
48	2020-10-16 02:37:43.090304	2020-10-16 02:37:43.090304	16	5	2	2
49	2020-10-16 02:37:43.090304	2020-10-16 02:37:43.090304	2	5	2	2
50	2020-10-16 02:37:43.090304	2020-10-16 02:37:43.090304	3	5	2	2
28	2020-09-23 06:16:46.69106	2020-10-16 02:37:43.090304	14	5	\N	2
24	2020-09-23 06:12:57.090618	2020-09-24 03:54:27.137808	9	4	\N	2
25	2020-09-23 06:12:57.090618	2020-09-24 03:54:27.137808	10	4	\N	2
26	2020-09-23 06:12:57.090618	2020-09-24 03:54:27.137808	11	4	\N	2
40	2020-09-24 06:35:51.722701	2020-09-24 06:35:51.722701	3	7	2	2
29	2020-09-23 08:13:11.326787	2020-09-24 06:35:51.722701	8	7	\N	2
30	2020-09-23 08:22:29.90822	2020-09-24 06:35:51.722701	5	7	\N	2
31	2020-09-23 08:22:29.90822	2020-09-24 06:35:51.722701	2	7	\N	2
6	2020-09-22 06:35:20.93874	2020-09-24 06:38:18.39914	5	1	\N	2
7	2020-09-22 06:35:36.440025	2020-09-24 06:38:18.39914	8	1	\N	2
13	2020-09-22 07:43:59.767485	2020-09-24 06:38:18.39914	6	1	\N	2
14	2020-09-22 07:44:34.127324	2020-09-24 06:38:18.39914	7	1	\N	2
1	2020-09-22 03:52:38.623627	2020-09-24 06:39:40.189058	1	2	\N	2
2	2020-09-22 03:52:38.623627	2020-09-24 06:39:40.189058	3	2	\N	2
3	2020-09-22 03:52:38.623627	2020-09-24 06:39:40.189058	2	2	\N	2
4	2020-09-22 06:28:01.014127	2020-09-24 06:39:40.189058	9	2	\N	2
5	2020-09-22 06:28:36.475924	2020-09-24 06:39:40.189058	10	2	\N	2
8	2020-09-22 07:41:06.604605	2020-09-24 06:39:40.189058	4	2	\N	2
9	2020-09-22 07:41:47.435466	2020-09-24 06:39:40.189058	12	2	\N	2
10	2020-09-22 07:41:59.34845	2020-09-24 06:39:40.189058	11	2	\N	2
15	2020-09-22 07:48:47.183156	2020-09-24 06:39:40.189058	8	2	\N	2
16	2020-09-22 07:49:26.886665	2020-09-24 06:39:40.189058	6	2	\N	2
51	2020-10-28 15:25:03.376464	2020-10-28 15:25:03.376464	1	15	38	38
52	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	2	16	2	2
53	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	4	16	2	2
54	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	1	16	2	2
55	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	3	16	2	2
56	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	16	16	2	2
57	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	14	16	2	2
58	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	13	16	2	2
59	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	15	16	2	2
60	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	2	17	2	2
61	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	4	17	2	2
62	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	1	17	2	2
63	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	3	17	2	2
64	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	16	17	2	2
65	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	14	17	2	2
66	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	13	17	2	2
67	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	15	17	2	2
\.


--
-- Data for Name: account_group_resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_group_resources (id, created_at, updated_at, resource_id, account_group_id, created_by, updated_by) FROM stdin;
10	2020-09-23 06:16:46.69106	2020-09-23 09:01:27.305238	4	5	\N	2
7	2020-09-23 05:55:47.092465	2020-09-24 03:40:50.425762	2	3	\N	2
9	2020-09-23 06:12:57.090618	2020-09-24 03:54:27.137808	3	4	\N	2
11	2020-09-23 08:13:11.326787	2020-09-24 06:35:51.722701	2	7	\N	2
12	2020-09-23 08:22:29.90822	2020-09-24 06:35:51.722701	1	7	\N	2
16	2020-09-24 06:38:39.195246	2020-09-24 06:38:39.195246	2	6	2	2
6	2020-09-22 07:48:47.183156	2020-09-24 06:39:40.189058	2	2	\N	2
17	2020-09-24 06:59:41.626915	2020-09-24 06:59:41.626915	2	8	2	2
18	2020-09-25 06:48:30.849991	2020-09-25 06:48:46.654524	4	11	2	2
19	2020-09-25 06:49:19.892836	2020-09-25 06:49:19.892836	4	9	2	2
20	2020-09-25 06:50:45.36982	2020-09-25 06:53:00.999261	1	9	2	2
21	2020-09-25 07:08:48.738053	2020-09-25 07:08:48.738053	1	4	2	2
22	2020-09-28 07:16:32.518599	2020-09-28 07:16:32.518599	1	1	2	2
23	2020-09-28 07:16:32.518599	2020-09-28 07:16:32.518599	2	1	2	2
24	2020-09-28 07:16:59.343021	2020-09-28 07:16:59.343021	1	13	2	2
25	2020-10-16 02:37:43.090304	2020-10-16 02:37:43.090304	1	5	2	2
26	2020-10-16 08:30:28.778925	2020-10-16 08:30:28.778925	2	14	2	2
27	2020-10-27 03:37:11.781405	2020-10-27 03:37:11.781405	4	7	2	2
28	2020-10-28 15:25:03.376464	2020-10-28 15:25:03.376464	1	15	38	38
29	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	1	16	2	2
30	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	4	16	2	2
31	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	1	17	2	2
32	2020-11-05 05:01:06.234756	2020-11-05 05:01:06.234756	4	17	2	2
\.


--
-- Data for Name: account_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_groups (id, created_at, updated_at, is_active, code, name, description, created_by, updated_by) FROM stdin;
3	2020-09-22 07:49:27.422702	2020-09-24 03:40:50.425762	t	CTV-03	CTV		\N	2
4	2020-09-23 06:12:09.805485	2020-09-24 03:54:27.137808	f	son 1	son 1		\N	2
6	2020-09-23 08:09:58.816347	2020-09-24 06:38:39.195246	t	CTV-02	Test 02		\N	2
2	2020-09-22 03:52:38.623627	2020-09-24 06:39:40.189058	t	CTV-01	Test 03	testt	\N	2
9	2020-09-24 07:02:29.731096	2020-09-24 07:02:29.731096	t	TL01	Test Luong 01	test positive 	2	2
10	2020-09-24 07:19:42.563185	2020-09-24 07:20:47.073822	f	TL@.02	TL02	TEST	\N	2
11	2020-09-24 07:25:38.341741	2020-09-24 07:25:38.341741	t	TL03 & Func	tl03 		2	2
12	2020-09-26 03:37:17.98705	2020-09-26 03:37:17.98705	t	TEST555	555		2	2
8	2020-09-23 10:05:58.364635	2020-09-27 06:29:55.6	t	SON TEST 1	Son Test 1		\N	2
13	2020-09-28 07:16:59.343021	2020-09-28 07:16:59.343021	t	KNG	Khánh		2	2
5	2020-09-23 06:16:46.69106	2020-10-16 02:37:43.054	f	GROUP 1001	GROUP Admin 1001	test	\N	2
14	2020-10-16 08:30:28.778925	2020-10-16 08:31:04.258	f	TEST NEW GRP ACCN	TEST NEW GRP ACCN	TEST NEW GRP ACCN	2	2
1	2020-09-22 03:25:11.564124	2020-10-27 03:36:31.163	t	ADMIN	Administrator	Administrator	\N	2
7	2020-09-23 08:13:11.326787	2020-10-27 03:37:11.754	t	CTV-04	Test		\N	2
15	2020-10-28 15:25:03.376464	2020-10-28 15:25:03.376464	t	TT54554	4554	5454	38	38
16	2020-11-03 09:28:13.696279	2020-11-03 09:28:13.696279	t	MG01	Môi giới	Nhân viên môi giới BDS	2	2
17	2020-11-05 05:01:06.234756	2020-11-05 06:38:36.576	t	BROKER_L1	Brokers	Nhân viên phụ trách tạo BDS	2	2
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, employee_id, collaborator_id, identity_name, hash, code, display_name, is_active, last_login_at, created_by, updated_by, created_at, updated_at, type) FROM stdin;
56	21	\N	01.np	$2b$10$f8I6cGZliO/CxYxI3ynSJu/NrOl8ePmi/3NzO4OuD2TiiYFYVYYCC	01.np	kinhdoanh-01.np	t	2020-11-06 09:46:09.446	\N	2	2020-10-23 10:19:41.396776	2020-11-06 09:46:09.453491	Employee
69	\N	80	092020110501	$2b$10$CFIIEllIIPsqJvbwP7OaKe/CfIcnIqzbyiQxm1htWtHSZIWsMshs2	01.cn	Cong ty-01.cn	t	\N	56	56	2020-11-05 08:21:04.283937	2020-11-05 08:21:04.283937	Collaborator
60	22	\N	02.np	$2b$10$Mu1f2CKRP.8fQnAaT7gPXuOunlAUJwvLSno9TadiuisuDP.YG.oJi	02.np	kinhdoanh-02.np	t	2020-11-06 06:44:45.12	\N	60	2020-10-26 10:25:35.591343	2020-11-06 06:44:45.12659	Employee
2	14	\N	admin	$2b$10$pDv/vSjnsxQMhfHlf9jPDeLPGAt9TUhXutD/Li.9N9VNm7m21lsK6	admin	admin	t	2020-11-06 15:15:09.919	\N	2	2020-09-18 08:36:39.0063	2020-11-06 15:15:09.929301	Admin
52	19	\N	phát.n	$2b$10$neEChkujUapUxpwoCaODe.9uAeQWIWYgZxjBf4emoPrqqm9gxWv/u	phát.n	kinhdoanh-phát.n	t	\N	\N	\N	2020-10-23 04:23:17.434733	2020-10-23 04:23:17.434733	Employee
25	\N	46	0354220015	$2b$10$IzqhukLmgLcmn0yktI7lbuNHbZAEvpzvb.8lQDzGV3FSxEhXCjEGO	duy.cq.02	Cong ty-duy.cq.02	t	\N	2	2	2020-10-16 09:08:18.307098	2020-10-16 09:08:18.307098	Collaborator
58	\N	74	090000001	$2b$10$9egN9twTEbCS5GTMrYOoNushc3fmIB11W0K20YMc04fQrByx7YguS	khanh1.nxb	TPP-khanh1.nxb	t	\N	2	2	2020-10-26 08:11:06.62392	2020-10-26 08:11:06.62392	Collaborator
59	\N	75	090000002	$2b$10$dCvN3JQbeHNnjkuaBLx2Cev68nxvhBual2iCqKW.qtGb3XMftYeJa	khanh2.nxb	TPP-khanh2.nxb	t	2020-10-26 08:34:10.216	2	2	2020-10-26 08:13:05.483737	2020-10-30 10:26:46.268639	Collaborator
43	\N	63	0368888331	$2b$10$tJklD1UGn3sQMA5QF21PFeVRKNqf/mxfKuzr20VkwrkEqu6Gqx4uS	hà.nn	Công ty 2-hà.nn	t	\N	39	39	2020-10-22 04:11:00.625965	2020-10-22 04:11:00.625965	Collaborator
44	\N	64	0368812833	$2b$10$quwam.ocPFNvEYsNqfPmXO/86VyskbFVE7wxpSOZv6iN39Y6gvEvy	mai.nt	Công ty 2-mai.nt	t	\N	39	39	2020-10-22 04:17:58.73482	2020-10-22 04:17:58.73482	Collaborator
34	15	\N	hl1.nv	$2b$10$luwW1VJB60f/4Vmqwvx.kek/.l4SqaDocubGvAhTDfLkFOAkUcHlu	hl1.nv	kinhdoanh-hl1.nv	t	\N	\N	\N	2020-10-21 04:38:29.577293	2020-10-21 04:38:29.577293	Employee
45	\N	65	0987654321	$2b$10$9XA3CSihL1dx86CgAC7sPur5W8MgZ1JmrnzEE3umbY7kgSdgNqbRC	khôi.tn	Cty 3-khôi.tn	t	\N	39	39	2020-10-22 04:21:53.259637	2020-10-22 04:21:53.259637	Collaborator
51	\N	70	0912345678	$2b$10$h1fdychF2/wXYoCkDVeTmeQzdxLM0/4/lxc0OQgWyzwLGNlX/kVSu	thienhoang	VAR-thienhoang	t	\N	2	2	2020-10-23 04:09:37.690763	2020-10-23 04:09:37.690763	Collaborator
32	\N	\N	admin.n	$2b$10$8BTzNkhyPpnBf8UvsYL7/ebgQm2OcAwjWqtQ6slG0xSN.yPyKqA8W	admin.n	kinhdoanh-admin.n	t	2020-10-23 09:09:36.823	\N	\N	2020-10-20 04:46:16.748935	2020-10-23 09:09:36.848149	Employee
29	\N	51	+1 (988) 399-9124	$2b$10$pz0ouGdaKoaQkZYPkjW/kuUXcjMev5ffc3YxxjDnZfeGpWGkCfawq	vega.n	Cty-vega.n	t	\N	2	2	2020-10-19 07:56:52.470207	2020-10-19 07:56:52.470207	Collaborator
35	\N	55	0368888678	$2b$10$7/sqy6M/ntrhe/tbIMjOI.TP9FZbwFKVGGK.M4i7f9QwJcDAc4x5m	nv1.h	Cty-nv1.h	t	\N	2	2	2020-10-21 08:06:25.560596	2020-10-21 08:06:25.560596	Collaborator
46	\N	66	0989898998	$2b$10$jTno6jl55iS0jpTNyPcMX.TORJg/gPcWyiJpg3HfvpY6Klk6Bw9/a	long.tnh	Cty 3-long.tnh	t	\N	2	2	2020-10-22 04:24:53.455808	2020-10-22 04:24:53.455808	Collaborator
36	\N	57	0368888679	$2b$10$RxWbiF54mU2Weukf39p7iuqBkKfR713.jEddqmteSM.voNlcKk.jy	nv1.h.01	Cty-nv1.h.01	t	\N	2	2	2020-10-21 08:09:50.863584	2020-10-21 08:09:50.863584	Collaborator
22	\N	42	0354220013	$2b$10$LuKY.nRiBlqvQ4tP2jpaFeXfSOqqe/2gVs2pX8qrndD8Z38zpPo8O	duy.cq	Cong ty-duy.cq	t	\N	2	2	2020-10-16 08:54:42.235088	2020-10-26 02:30:47.821	Collaborator
30	\N	52	+1 (678) 929-1193	$2b$10$russLdBF5YhjMP1BxHI9Q.DQzzxLrJWqa2lDYXF52FSQwNuLTgARO	giles.e	Cty-giles.e	t	2020-10-20 07:41:35.748	2	30	2020-10-19 08:04:15.928811	2020-10-20 07:41:35.772115	Collaborator
40	\N	60	036888833	$2b$10$o07WmAMKEqBx9MENeFZv7./fDePi4Cu7HydFrSLUhHwqRT.r4j9Sa	010.o	Cong ty-010.o	t	\N	39	39	2020-10-21 09:23:22.156128	2020-10-21 09:23:22.156128	Collaborator
53	\N	71	0123456789	$2b$10$e0fN2Pw7BYqk/YaJSjDGsuVwGGrO0YMIRZ2MfgznIZgPA7vdnaDjm	01.lnh	VAR-01.lnh	t	\N	38	38	2020-10-23 07:01:08.353752	2020-10-23 07:01:08.353752	Collaborator
33	\N	\N	0999999998	$2b$10$hOGJWyA8h/Wpr1J/7/hwC.WpQvF8pBgS7oMfw2l1lQvhBFV9T0c4S	2.na	Cty-2.na	t	\N	2	2	2020-10-20 09:45:26.307951	2020-10-20 09:45:26.307951	Employee
47	\N	67	0368888337	$2b$10$EClxjGdROt06Kg7sCj.IW.6DWIt5WsTExDM03IuTQSekWyg/UIzh6	quang.th	Công ty 2-quang.th	t	\N	2	2	2020-10-22 04:48:43.986633	2020-10-22 04:48:43.986633	Collaborator
24	\N	44	0904200601	$2b$10$pj.sZMUEg9nrVHRXbGtFSO8bJwnnbsxoTXpPHZVUtsWEDi6yqgAzS	trinh.h	Công ty 2-trinh.h	t	2020-10-20 10:26:31.14	2	2	2020-10-16 09:06:15.006161	2020-10-20 10:26:31.164944	Collaborator
48	\N	68	+1 (274) 706-5002	$2b$10$jV9pWI9aD9YIzAwe/wnQNOCIvRudpOjf.2H3wTH56T0tx.ttU8rRC	neal.k	Cty A-neal.k	t	2020-10-22 10:34:58.827	2	48	2020-10-22 10:14:21.217879	2020-10-22 10:34:58.854653	Collaborator
37	\N	59	03687588679	$2b$10$R8qq1KM7l4mwywrCk2.O.OmJUvkBjfhJPBLVyZJ3elJh7bqLxle.C	nv1.h.02	Cty-nv1.h.02	t	2020-10-23 10:40:25.447	2	37	2020-10-21 08:10:52.835334	2020-10-23 10:40:25.473474	Collaborator
26	\N	47	0983705478	$2b$10$h3w/QhWSym.4pHSDUixxYuHU6P0KRUdAhIPofplsfN3ecy1uvvZ5y	luong.nh.01	Công ty 1-luong.nh.01	f	2020-10-20 10:35:26.153	2	38	2020-10-16 09:08:53.936145	2020-10-27 03:18:23.873005	Collaborator
50	18	\N	batadomoz	$2b$10$eewsy8li6ydSv6V.GAxT2eZmR/wLRxbVcnqY9i.Vwle6bqOn8vzVG	batadomoz	kinhdoanh-batadomoz	t	\N	\N	\N	2020-10-23 03:23:26.952842	2020-10-23 03:23:26.952842	Employee
49	\N	69	+1 (616) 966-2831	$2b$10$bN2qem0YTd6lrlcT6LFmXuWRf7QBG1LnFYEqdN.GR27qkiotKzRN6	mayer.m	Cong ty-mayer.m	t	2020-10-23 10:41:27.564	2	49	2020-10-22 10:41:37.522537	2020-10-23 10:41:27.58898	Collaborator
54	20	\N	edit.nb1	$2b$10$q4ln7Gfqt/5PgF1OY.28nOxxbQNvrT1xlOn9UoogpUUAIh9gu867.	edit.nb1	kinhdoanh-edit.nb1	f	\N	\N	38	2020-10-23 07:06:39.248966	2020-10-23 11:11:27.067	Employee
55	\N	72	0909090909	$2b$10$B7aEdqLqvGBi1aEvsmpdguW71YCQmejEIAbt10gyOt/CG8sBY3NaK	1.uzue	Cong ty-1.uzue	t	\N	38	2	2020-10-23 07:57:11.483203	2020-10-27 03:41:34.368037	Collaborator
39	17	\N	nv2.h	$2b$10$ikwFYRdApZJkQYEElBrHV.tZhaGlJaYsK4yMyh6xkd.oUPLXvAibu	nv2.h	kinhdoanh-nv2.h	t	2020-10-23 04:55:04.019	\N	\N	2020-10-21 08:19:06.186132	2020-10-29 03:36:11.978316	Employee
57	\N	73	0368888303	$2b$10$6ehEs/TycG0eKpFFCu9CoOxeDas0Mxuav73o.enjcu1TYmY1IXNvS	.nhl	Cty A-.nhl	t	\N	38	38	2020-10-26 03:00:43.318973	2020-10-27 02:42:45.964645	Collaborator
41	\N	61	0368881333	$2b$10$Kybfp3Adj8ja6CbiixhC6.Q0JM4MZaQvdWGdrukRoAScCCyaHZyE2	long.nt	Cong ty-long.nt	t	2020-10-26 02:54:42.053	39	2	2020-10-21 09:57:15.298597	2020-10-27 03:41:56.658123	Collaborator
61	\N	76	0989898899	$2b$10$XEz5hw4jJMEx3bp8WDAhauH7UvjRi7uxKBEhFMT.F/eJuPnbwBIz6	le.hm	Cong ty-le.hm	t	2020-10-27 03:05:08.652	38	2	2020-10-27 02:48:59.722411	2020-10-29 03:39:26.761926	Collaborator
31	\N	53	+1 (572) 753-9335	$2b$10$JhQtsN85wOs0J44jiUa2a.Rr1Oi8UgEfHb4iub9DeNyNeDp38y1fi	moon.l	Cty-moon.l	t	\N	2	38	2020-10-19 08:05:26.0588	2020-10-27 03:19:31.52962	Collaborator
42	\N	62	0368888333	$2b$10$2scFW98gD8oQHYJLCF0jSeIwqpZho8yrZbHQ7TOouAXybo6IzGrTq	an.nh	Công ty 1-an.nh	t	\N	39	2	2020-10-22 04:05:56.577447	2020-10-27 03:41:46.501433	Collaborator
28	\N	49	0943687946	$2b$10$tvMpzDXE6Fzlg9RWV6ykpedNxXoe.0j8w8tRIgD1am.yKoiD3.Tv.	tke	Công ty 1-tke	f	\N	2	2	2020-10-19 04:14:29.51542	2020-10-27 03:42:07.200798	Collaborator
27	\N	48	0909090901	$2b$10$gtIRiP4K7D23oWrYS6yKhObySBW7VsmzBRN8E5LipjIuA2oJV46KC	3.hnh	TPP-3.hnh	t	2020-10-21 09:24:59.832	2	62	2020-10-16 10:30:48.898822	2020-10-27 04:35:47.704319	Collaborator
23	\N	43	0123567894	$2b$10$EYOhDFNlW6TCwIM5kvA/JexIcIrkaNCXVk3ZmFTwjNaPJ3c4jAXBq	hà.hn.01	TPP-hà.hn.01	t	\N	2	62	2020-10-16 09:05:35.967321	2020-10-27 04:45:43.86489	Collaborator
62	23	\N	sang.h	$2b$10$2EYgGPYL64lNAJd61mWoPeL/kQg1aDy6xo0SsCUANU4JhfRKw/5Y6	sang.h	kinhdoanh-sang.h	t	2020-10-29 03:45:21.095	\N	2	2020-10-27 04:19:21.090212	2020-10-29 03:53:14.528054	Employee
63	\N	77	016542200131	$2b$10$RcARfRW4h0TDZNBLfkTlaOaCvuwEvJ7Ey3ns4t6ulxniAd18dOcwK	duy.cq.03	Cong ty-duy.cq.03	t	\N	2	2	2020-10-29 03:55:18.488713	2020-10-30 07:01:20.026259	Collaborator
65	25	\N	duy.cq.04	$2b$10$9/VQ5.4ya70pmL3NmYt9t.Xs2R2RQF3Zp4kU7OF6tYTxyF8NygSf6	duy.cq.04	kinhdoanh-duy.cq.04	t	\N	\N	\N	2020-10-30 07:21:13.475523	2020-10-30 07:21:13.475523	Employee
67	\N	78	0906347817	$2b$10$.9M8sBkiOM.0uAVxu.hFQuj2OYX5rEZRBjRu/h9Xr5id33VSg4qAC	ctv1.kng	Công ty 1-ctv1.kng	t	2020-11-05 04:18:26.617	66	67	2020-11-05 04:02:30.423831	2020-11-05 04:18:26.631047	Collaborator
68	\N	79	0906347827	$2b$10$fMcpU.EDA.vc92LEfnTnpe2vmiYLARFEjwrmybuPpKX72CiFEyKNe	ctv2.kng	Công ty 2-ctv2.kng	t	2020-11-05 04:20:56.273	66	68	2020-11-05 04:04:05.740853	2020-11-05 04:20:56.287289	Collaborator
64	24	\N	jamyqapaqe	$2b$10$KdF5lqjACRBi0x7ewHlAZ.xz7/uORCu.ss6ySLyldM4zuydyx1j/W	jamyqapaqe	kinhdoanh-jamyqapaqe	t	2020-11-06 06:26:36.147	\N	64	2020-10-29 11:41:29.521481	2020-11-06 06:26:36.153305	Employee
70	27	\N	03.np	$2b$10$k3NzjC9QvzUq2yB6ccQMZuqHUszbTWSNtG1MsykNVxloZIEmUMlim	03.np	HLT-03.np	t	\N	\N	2	2020-11-06 04:57:46.705177	2020-11-06 06:30:30.966957	Employee
66	26	\N	khanh.nxb	$2b$10$LyKxNNDrU4gH7BYKRHebsODFYa.K58LWo3ISfIb/t9cQHWgXQfovu	khanh.nxb	HLT-khanh.nxb	t	2020-11-06 09:11:48.751	\N	66	2020-11-04 07:17:20.984494	2020-11-06 09:11:48.755219	Employee
38	16	\N	son.pt	$2b$10$p6p4armmN2SKXt67d1t8KOAcapYhZM30jMSNaFLTPudpCOWaZMNae	son.pt	kinhdoanh-son.pt	t	2020-11-06 09:28:52.26	\N	38	2020-10-21 08:14:03.357134	2020-11-06 09:31:10.638837	Employee
\.


--
-- Data for Name: advantage_levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.advantage_levels (id, created_at, updated_at, inspection_statement_id, level, note, group_id, type_id) FROM stdin;
1	2020-11-04 07:21:44.782673	2020-11-04 07:21:44.782673	4	0.16		145	151
2	2020-11-04 07:21:51.880284	2020-11-04 07:21:51.880284	5	0.16		145	151
3	2020-11-04 07:24:33.261217	2020-11-04 07:24:33.261217	6	0.12		145	151
4	2020-11-04 07:24:40.224032	2020-11-04 07:24:40.224032	7	0.12	12	145	151
10	2020-11-04 08:43:57.420304	2020-11-04 08:43:57.420304	9	0.12	 	146	153
11	2020-11-04 08:43:57.420304	2020-11-04 08:43:57.420304	9	0.12	 	145	151
12	2020-11-04 08:43:57.420304	2020-11-04 08:43:57.420304	9	0.12	 	145	152
21	2020-11-05 09:45:49.316801	2020-11-05 09:45:49.316801	15	0.05	 haha	145	151
22	2020-11-05 09:45:49.316801	2020-11-05 09:45:49.316801	15	0.05	 44	146	153
28	2020-11-05 10:12:13.992352	2020-11-05 10:12:13.992352	20	0.2	 	145	151
29	2020-11-05 10:17:42.130404	2020-11-05 10:17:42.130404	19	0.1	 	145	151
30	2020-11-05 10:17:42.130404	2020-11-05 10:17:42.130404	19	0.1	 	147	156
32	2020-11-06 04:10:01.219406	2020-11-06 04:10:01.219406	22	0.06	 	146	153
34	2020-11-06 07:45:47.155218	2020-11-06 07:45:47.155218	11	0.1	 	145	152
39	2020-11-06 09:54:00.121696	2020-11-06 09:54:00.121696	24	0.03	 TTT	146	154
40	2020-11-06 09:54:00.121696	2020-11-06 09:54:00.121696	24	0.05	 RRR	147	155
41	2020-11-06 10:11:47.379309	2020-11-06 10:11:47.379309	8	0.22	 	146	153
43	2020-11-06 10:41:52.403247	2020-11-06 10:41:52.403247	26	0.1	 	146	154
44	2020-11-06 15:00:08.442741	2020-11-06 15:00:08.442741	27	0.1	 test	145	151
\.


--
-- Data for Name: appraisal_audit_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appraisal_audit_details (id, created_at, updated_at, is_active, appraisal_statement_id, inspection_statement_id, property_id, type, created_by, updated_by, property_info, use_right_certificate, construction, address, total_adjustment, advantage_levels, disadvantage_levels, market_land_unit_price, total_levels_advantage, total_levels_disadvantage, adjustments) FROM stdin;
1	2020-11-05 06:49:04.341511	2020-11-05 06:49:04.341511	t	5	2	80	Địa chỉ 1	2	2	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Thành", "value": 69}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "746, 74, Bến Thành, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-le.hm", "value": 61}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "Molestiae enim est e", "THDGDDGD9": 0}	{"THT10": "Inventore quis occae", "THHSVT1": 1, "THNSM16": 99, "THNTM15": 21, "THTBD11": "Qui facilis velit vo", "THCD1M17": 65, "THCD2M18": 61, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 17, "THDTKCN20": 47, "THDTVT1M2": 80, "THDTKVM223": 64, "THHSDGDKCN": 9.05, "THHSDGDCNBQH": 1.01, "THDTCNBQHM221": 1.01, "THDTCNKQHM222": 3, "THTLDTCNBQHDTCN": 0.8235294117647058, "THTLDTKCNDTKV20": 0.734375}	{"THHT25": 9, "THKT28": "Beatae repellendus ", "THLT26": 28, "THSTT27": 664, "THTNT24": 81, "THCLCL29": 0.9, "THDGXMM236": 70, "THDTXDM230": 81, "THGTCTXD37": 10521, "THDTSCNM231": 55, "THDTSDPSM234": 42, "THDTSDTTM235": 167, "THDTSKCNM232": 70, "THTDTSTGCNM233": 125}	746, 74, Bến Thành, Quận 1, Hồ Chí Minh, 	0	[]	[]	\N	\N	\N	\N
2	2020-11-05 06:49:04.341511	2020-11-05 06:49:04.341511	t	5	1	80	Địa chỉ 2	2	2	{"THD5": {}, "THP4": {"label": "Phuong Test HL", "value": 121}, "THQ3": {"label": "Quận 2", "value": 63}, "THDC1": "746, 74, Phuong Test HL, Quận 2, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-le.hm", "value": 61}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "Temporibus harum con", "THDGDDGD9": 0}	{"THT10": "Inventore quis occae", "THHSVT1": 1, "THNSM16": 29, "THNTM15": 17, "THTBD11": "Qui facilis velit vo", "THCD1M17": 42, "THCD2M18": 52, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 200, "THDTKCN20": 67, "THDTVT1M2": 52, "THDTKVM223": 267, "THHSDGDKCN": 0.17, "THHSDGDCNBQH": 3.99, "THDTCNBQHM221": 3.99, "THDTCNKQHM222": 172, "THTLDTCNBQHDTCN": 0.14, "THTLDTKCNDTKV20": 0.250936329588015}	{"THHT25": 7, "THKT28": "Officia ullamco ipsa", "THLT26": 5, "THSTT27": 1, "THTNT24": 17, "THCLCL29": 0.63, "THDGXMM236": 30, "THDTXDM230": 89, "THGTCTXD37": 1852.2, "THDTSCNM231": 45, "THDTSDPSM234": 3, "THDTSDTTM235": 98, "THDTSKCNM232": 50, "THTDTSTGCNM233": 95}	746, 74, Phuong Test HL, Quận 2, Hồ Chí Minh, 	0	[]	[]	\N	\N	\N	\N
3	2020-11-06 02:12:44.291511	2020-11-06 02:12:44.291511	t	9	15	89	Khảo sát thẩm định	2	2	{"THD5": {"label": "Lê Văn Sỹ  1", "value": 122}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "223 address aaa", "THNT8": {"label": "Cong ty-duy.cq.02", "value": 25}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "Test", "THDGDDGD9": 0}	{"THT10": "5", "THHSVT1": 1, "THNSM16": 5, "THNTM15": 5, "THTBD11": "167", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 100, "THDTKCN20": 25, "THDTVT1M2": 20, "THDTKVM223": 0, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.8, "THDTCNBQHM221": 0.8, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 0, "THTLDTKCNDTKV20": 0}	{"THHT25": 2, "THKT28": "haha", "THLT26": 2, "THSTT27": 2, "THTNT24": 2, "THCLCL29": 0.9, "THDGXMM236": 300000, "THDTXDM230": 300, "THGTCTXD37": 0, "THDTSCNM231": 250, "THDTSDPSM234": 30, "THDTSDTTM235": 0, "THDTSKCNM232": 45, "THTDTSTGCNM233": 0}	223 address aaa	0.02	[{"note": " haha", "level": 0.05, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}, {"note": " 44", "level": 0.05, "typeId": 153, "groupId": 146, "typeName": "Loại ưu 2.1", "groupName": "Ưu điểm 02"}]	[]	0	0.1	0	\N
5	2020-11-06 02:42:09.772992	2020-11-06 02:42:09.772992	t	6	3	78	Địa chỉ 1	2	2	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "kinhdoanh-02.np", "value": 60}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "1", "THHSVT1": 1, "THNSM16": 1, "THNTM15": 1, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, 	1	[]	[]	1	0	0	\N
6	2020-11-06 02:42:09.772992	2020-11-06 02:42:09.772992	t	6	7	47	Địa chỉ 2	2	2	{"THD5": {"label": "Cách Mạng Tháng Tám 1", "value": 73}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "admin", "value": 2}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "91", "THHSVT1": 1, "THNSM16": 91, "THNTM15": 91, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, 	0.12	[{"note": "12", "level": 0.12, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}]	[]	1	0.12	0	\N
7	2020-11-06 02:42:09.772992	2020-11-06 02:42:09.772992	t	6	21	89	Địa chỉ 3	2	2	{"THD5": {"label": "Lê Văn Sỹ  1", "value": 122}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-duy.cq.02", "value": 25}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "haha", "THDGDDGD9": 0}	{"THT10": "5", "THHSVT1": 1, "THNSM16": 5, "THNTM15": 5, "THTBD11": "167", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 100, "THDTKCN20": 25, "THDTVT1M2": 10, "THDTKVM223": 125, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.9, "THDTCNBQHM221": 90, "THDTCNKQHM222": 10, "THTLDTCNBQHDTCN": 0.9, "THTLDTKCNDTKV20": 0.2}	{"THHT25": 2, "THKT28": "haha", "THLT26": 2, "THSTT27": 2, "THTNT24": 2, "THCLCL29": 0.95, "THDGXMM236": 400000, "THDTXDM230": 100, "THGTCTXD37": 129200000, "THDTSCNM231": 250, "THDTSDPSM234": 40, "THDTSDTTM235": 340, "THDTSKCNM232": 50, "THTDTSTGCNM233": 300}	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	0	[]	[]	0	0	0	\N
8	2020-11-06 02:42:09.772992	2020-11-06 02:42:09.772992	t	6	21	89	Khảo sát thẩm định	2	2	{"THD5": {"label": "Lê Văn Sỹ  1"}, "THP4": {"label": "Bến Nghé"}, "THQ3": {"label": "Quận 1"}, "THDC1": "302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-duy.cq.02"}, "THTT2": {"label": "Hồ Chí Minh"}, "THNVT43": {}, "THTDGD7": null, "THMTVT42": "haha", "THDGDDGD9": 0}	{"THT10": "5", "THHSVT1": 1, "THNSM16": 5, "THNTM15": 5, "THTBD11": "167", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116"}, "THTHSD13": {"label": "115"}, "THDTCNM19": 100, "THDTKCN20": 25, "THDTVT1M2": 10, "THDTKVM223": 125, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.9, "THDTCNBQHM221": 90, "THDTCNKQHM222": 10, "THTLDTCNBQHDTCN": 0.9, "THTLDTKCNDTKV20": 0.2}	{"THHT25": 2, "THKT28": "haha", "THLT26": 2, "THSTT27": 2, "THTNT24": 2, "THCLCL29": 0.95, "THDGXMM236": 400000, "THDTXDM230": 100, "THGTCTXD37": 129200000, "THDTSCNM231": 250, "THDTSDPSM234": 40, "THDTSDTTM235": 340, "THDTSKCNM232": 50, "THTDTSTGCNM233": 300}	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	0	[]	[]	0	0	0	\N
9	2020-11-06 02:42:49.460955	2020-11-06 02:42:49.460955	t	10	7	47	Địa chỉ 1	2	2	{"THD5": {"label": "Cách Mạng Tháng Tám 1", "value": 73}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "admin", "value": 2}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "91", "THHSVT1": 1, "THNSM16": 91, "THNTM15": 91, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, 	0.12	[{"note": "12", "level": 0.12, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}]	[]	1	0.12	0	\N
10	2020-11-06 02:42:49.460955	2020-11-06 02:42:49.460955	t	10	15	89	Địa chỉ 2	2	2	{"THD5": {"label": "Lê Văn Sỹ  1", "value": 122}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "223 address aaa", "THNT8": {"label": "Cong ty-duy.cq.02", "value": 25}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "Test", "THDGDDGD9": 0}	{"THT10": "5", "THHSVT1": 1, "THNSM16": 5, "THNTM15": 5, "THTBD11": "167", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 100, "THDTKCN20": 25, "THDTVT1M2": 20, "THDTKVM223": 0, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.8, "THDTCNBQHM221": 0.8, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 0, "THTLDTKCNDTKV20": 0}	{"THHT25": 2, "THKT28": "haha", "THLT26": 2, "THSTT27": 2, "THTNT24": 2, "THCLCL29": 0.9, "THDGXMM236": 300000, "THDTXDM230": 300, "THGTCTXD37": 0, "THDTSCNM231": 250, "THDTSDPSM234": 30, "THDTSDTTM235": 0, "THDTSKCNM232": 45, "THTDTSTGCNM233": 0}	223 address aaa	0.02	[{"note": " haha", "level": 0.05, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}, {"note": " 44", "level": 0.05, "typeId": 153, "groupId": 146, "typeName": "Loại ưu 2.1", "groupName": "Ưu điểm 02"}]	[]	0	0.1	0	\N
11	2020-11-06 02:42:49.460955	2020-11-06 02:42:49.460955	t	10	21	89	Địa chỉ 3	2	2	{"THD5": {"label": "Lê Văn Sỹ  1", "value": 122}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-duy.cq.02", "value": 25}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "haha", "THDGDDGD9": 0}	{"THT10": "5", "THHSVT1": 1, "THNSM16": 5, "THNTM15": 5, "THTBD11": "167", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 100, "THDTKCN20": 25, "THDTVT1M2": 10, "THDTKVM223": 125, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.9, "THDTCNBQHM221": 90, "THDTCNKQHM222": 10, "THTLDTCNBQHDTCN": 0.9, "THTLDTKCNDTKV20": 0.2}	{"THHT25": 2, "THKT28": "haha", "THLT26": 2, "THSTT27": 2, "THTNT24": 2, "THCLCL29": 0.95, "THDGXMM236": 400000, "THDTXDM230": 100, "THGTCTXD37": 129200000, "THDTSCNM231": 250, "THDTSDPSM234": 40, "THDTSDTTM235": 340, "THDTSKCNM232": 50, "THTDTSTGCNM233": 300}	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	0	[]	[]	0	0	0	\N
12	2020-11-06 02:42:49.460955	2020-11-06 02:42:49.460955	t	10	3	78	Khảo sát thẩm định	2	2	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "kinhdoanh-02.np", "value": 60}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "1", "THHSVT1": 1, "THNSM16": 1, "THNTM15": 1, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, 	1	[]	[]	1	0	0	\N
13	2020-11-06 02:53:56.005676	2020-11-06 02:53:56.005676	t	3	15	89	Khảo sát thẩm định	38	38	{"THD5": {"label": "Lê Văn Sỹ  1", "value": 122}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "223 address aaa", "THNT8": {"label": "Cong ty-duy.cq.02", "value": 25}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "Test", "THDGDDGD9": 0}	{"THT10": "5", "THHSVT1": 1, "THNSM16": 5, "THNTM15": 5, "THTBD11": "167", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 100, "THDTKCN20": 25, "THDTVT1M2": 20, "THDTKVM223": 0, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.8, "THDTCNBQHM221": 0.8, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 0, "THTLDTKCNDTKV20": 0}	{"THHT25": 2, "THKT28": "haha", "THLT26": 2, "THSTT27": 2, "THTNT24": 2, "THCLCL29": 0.9, "THDGXMM236": 300000, "THDTXDM230": 300, "THGTCTXD37": 0, "THDTSCNM231": 250, "THDTSDPSM234": 30, "THDTSDTTM235": 0, "THDTSKCNM232": 45, "THTDTSTGCNM233": 0}	223 address aaa	0.02	[{"note": " haha", "level": 0.05, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}, {"note": " 44", "level": 0.05, "typeId": 153, "groupId": 146, "typeName": "Loại ưu 2.1", "groupName": "Ưu điểm 02"}]	[]	0	0.1	0	\N
14	2020-11-06 03:50:06.958924	2020-11-06 03:50:06.958924	t	11	7	47	Địa chỉ 1	66	66	{"THD5": {"label": "Cách Mạng Tháng Tám 1", "value": 73}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "admin", "value": 2}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "91", "THHSVT1": 1, "THNSM16": 91, "THNTM15": 91, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, 	0.12	[{"note": "12", "level": 0.12, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}]	[]	1	0.12	0	\N
15	2020-11-06 03:50:06.958924	2020-11-06 03:50:06.958924	t	11	21	89	Khảo sát thẩm định	66	66	{"THD5": {"label": "Lê Văn Sỹ  1", "value": 122}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-duy.cq.02", "value": 25}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "haha", "THDGDDGD9": 0}	{"THT10": "5", "THHSVT1": 1, "THNSM16": 5, "THNTM15": 5, "THTBD11": "167", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 100, "THDTKCN20": 25, "THDTVT1M2": 10, "THDTKVM223": 125, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.9, "THDTCNBQHM221": 90, "THDTCNKQHM222": 10, "THTLDTCNBQHDTCN": 0.9, "THTLDTKCNDTKV20": 0.2}	{"THHT25": 2, "THKT28": "haha", "THLT26": 2, "THSTT27": 2, "THTNT24": 2, "THCLCL29": 0.95, "THDGXMM236": 400000, "THDTXDM230": 100, "THGTCTXD37": 129200000, "THDTSCNM231": 250, "THDTSDPSM234": 40, "THDTSDTTM235": 340, "THDTSKCNM232": 50, "THTDTSTGCNM233": 300}	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	0	[]	[]	0	0	0	\N
22	2020-11-06 07:00:11.779253	2020-11-06 07:00:11.779253	t	12	22	92	Khảo sát thẩm định	66	66	{"THD5": {"label": "Lê Văn Sỹ  1"}, "THP4": {"label": "Bến Nghé"}, "THQ3": {"label": "Quận 1"}, "THDC1": "412, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Công ty 2-ctv2.kng"}, "THTT2": {"label": "Hồ Chí Minh"}, "THNVT43": {}, "THTDGD7": null, "THMTVT42": "Test", "THDGDDGD9": 1}	{"THT10": "45", "THHSVT1": 1, "THNSM16": 6, "THNTM15": 5, "THTBD11": "128", "THCD1M17": 25, "THCD2M18": 26, "THHTSD14": {"label": "116"}, "THTHSD13": {"label": "115"}, "THDTCNM19": 120, "THDTKCN20": 15, "THDTVT1M2": 5, "THDTKVM223": 135, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 1, "THDTCNBQHM221": 100, "THDTCNKQHM222": 20, "THTLDTCNBQHDTCN": 0.8333333333333334, "THTLDTKCNDTKV20": 0.1111111111111111}	{"THHT25": 1, "THKT28": "haha", "THLT26": 0, "THSTT27": 1, "THTNT24": 3, "THCLCL29": 0.95, "THDGXMM236": 100000, "THDTXDM230": 125, "THGTCTXD37": 41800000, "THDTSCNM231": 300, "THDTSDPSM234": 20, "THDTSDTTM235": 440, "THDTSKCNM232": 120, "THTDTSTGCNM233": 420}	412, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	0.04	[{"note": " ", "level": 0.06, "typeId": 153, "groupId": 146}]	[{"note": " ", "level": 0.02, "typeId": 168, "groupId": 163}]	1	0.06	0.02	\N
27	2020-11-06 07:52:53.653517	2020-11-06 07:52:53.653517	t	16	19	80	Địa chỉ 1	38	38	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Thành", "value": 69}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-le.hm", "value": 61}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "Aute et voluptatem a", "THDGDDGD9": 0}	{"THT10": "Inventore quis occae", "THHSVT1": 1, "THNSM16": 12, "THNTM15": 12, "THTBD11": "Qui facilis velit vo", "THCD1M17": 12, "THCD2M18": 12, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 155, "THDTKCN20": 55, "THDTVT1M2": 30, "THDTKVM223": 210, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.45, "THDTCNBQHM221": 15, "THDTCNKQHM222": 140, "THTLDTCNBQHDTCN": 0.0967741935483871, "THTLDTKCNDTKV20": 0.2619047619047619}	{"THHT25": 1, "THKT28": "Fugiat doloremque v", "THLT26": 1, "THSTT27": 1, "THTNT24": 5, "THCLCL29": 0.9, "THDGXMM236": 35, "THDTXDM230": 100, "THGTCTXD37": 8347.5, "THDTSCNM231": 200, "THDTSDPSM234": 55, "THDTSDTTM235": 265, "THDTSKCNM232": 10, "THTDTSTGCNM233": 210}	746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, 	0.14	[{"note": " ", "level": 0.1, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}, {"note": " ", "level": 0.1, "typeId": 156, "groupId": 147, "typeName": "Loại ưu 3.2", "groupName": "Ưu điểm 03"}]	[{"note": "asd", "level": 0.02, "typeId": 170, "groupId": 164, "typeName": "Loại kém 2.1", "groupName": "Nhược điểm 02"}, {"note": " asdas", "level": 0.04, "typeId": 175, "groupId": 166, "typeName": "Loại kém 4.2", "groupName": "Nhược điểm 04"}]	0	0.2	0.06	\N
28	2020-11-06 07:52:53.653517	2020-11-06 07:52:53.653517	t	16	7	47	Địa chỉ 2	38	38	{"THD5": {"label": "Cách Mạng Tháng Tám 1", "value": 73}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "admin", "value": 2}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "91", "THHSVT1": 1, "THNSM16": 91, "THNTM15": 91, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, 	0.12	[{"note": "12", "level": 0.12, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}]	[]	1	0.12	0	\N
29	2020-11-06 07:52:53.653517	2020-11-06 07:52:53.653517	t	16	21	89	Địa chỉ 3	38	38	{"THD5": {"label": "Lê Văn Sỹ  1", "value": 122}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-duy.cq.02", "value": 25}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "haha", "THDGDDGD9": 0}	{"THT10": "5", "THHSVT1": 1, "THNSM16": 5, "THNTM15": 5, "THTBD11": "167", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 100, "THDTKCN20": 25, "THDTVT1M2": 10, "THDTKVM223": 125, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.9, "THDTCNBQHM221": 90, "THDTCNKQHM222": 10, "THTLDTCNBQHDTCN": 0.9, "THTLDTKCNDTKV20": 0.2}	{"THHT25": 2, "THKT28": "haha", "THLT26": 2, "THSTT27": 2, "THTNT24": 2, "THCLCL29": 0.95, "THDGXMM236": 400000, "THDTXDM230": 100, "THGTCTXD37": 129200000, "THDTSCNM231": 250, "THDTSDPSM234": 40, "THDTSDTTM235": 340, "THDTSKCNM232": 50, "THTDTSTGCNM233": 300}	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	0	[]	[]	0	0	0	\N
30	2020-11-06 07:52:53.653517	2020-11-06 07:52:53.653517	t	16	19	80	Khảo sát thẩm định	38	38	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Thành", "value": 69}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-le.hm", "value": 61}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "Aute et voluptatem a", "THDGDDGD9": 0}	{"THT10": "Inventore quis occae", "THHSVT1": 1, "THNSM16": 12, "THNTM15": 12, "THTBD11": "Qui facilis velit vo", "THCD1M17": 12, "THCD2M18": 12, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 155, "THDTKCN20": 55, "THDTVT1M2": 30, "THDTKVM223": 210, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.45, "THDTCNBQHM221": 15, "THDTCNKQHM222": 140, "THTLDTCNBQHDTCN": 0.0967741935483871, "THTLDTKCNDTKV20": 0.2619047619047619}	{"THHT25": 1, "THKT28": "Fugiat doloremque v", "THLT26": 1, "THSTT27": 1, "THTNT24": 5, "THCLCL29": 0.9, "THDGXMM236": 35, "THDTXDM230": 100, "THGTCTXD37": 8347.5, "THDTSCNM231": 200, "THDTSDPSM234": 55, "THDTSDTTM235": 265, "THDTSKCNM232": 10, "THTDTSTGCNM233": 210}	746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, 	0.14	[{"note": " ", "level": 0.1, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}, {"note": " ", "level": 0.1, "typeId": 156, "groupId": 147, "typeName": "Loại ưu 3.2", "groupName": "Ưu điểm 03"}]	[{"note": "asd", "level": 0.02, "typeId": 170, "groupId": 164, "typeName": "Loại kém 2.1", "groupName": "Nhược điểm 02"}, {"note": " asdas", "level": 0.04, "typeId": 175, "groupId": 166, "typeName": "Loại kém 4.2", "groupName": "Nhược điểm 04"}]	0	0.2	0.06	\N
31	2020-11-06 08:02:12.468229	2020-11-06 08:02:12.468229	t	13	21	89	Địa chỉ 1	66	66	{"THD5": {"label": "Lê Văn Sỹ  1"}, "THP4": {"label": "Bến Nghé"}, "THQ3": {"label": "Quận 1"}, "THDC1": "302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-duy.cq.02"}, "THTT2": {"label": "Hồ Chí Minh"}, "THNVT43": {}, "THTDGD7": null, "THMTVT42": "haha", "THDGDDGD9": 0}	{"THT10": "5", "THHSVT1": 1, "THNSM16": 5, "THNTM15": 5, "THTBD11": "167", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116"}, "THTHSD13": {"label": "115"}, "THDTCNM19": 100, "THDTKCN20": 25, "THDTVT1M2": 10, "THDTKVM223": 125, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.9, "THDTCNBQHM221": 90, "THDTCNKQHM222": 10, "THTLDTCNBQHDTCN": 0.9, "THTLDTKCNDTKV20": 0.2}	{"THHT25": 2, "THKT28": "haha", "THLT26": 2, "THSTT27": 2, "THTNT24": 2, "THCLCL29": 0.95, "THDGXMM236": 400000, "THDTXDM230": 100, "THGTCTXD37": 129200000, "THDTSCNM231": 250, "THDTSDPSM234": 40, "THDTSDTTM235": 340, "THDTSKCNM232": 50, "THTDTSTGCNM233": 300}	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	0	[]	[]	0	0	0	\N
32	2020-11-06 08:02:12.468229	2020-11-06 08:02:12.468229	t	13	22	92	Khảo sát thẩm định	66	66	{"THD5": {"label": "Lê Văn Sỹ  1"}, "THP4": {"label": "Bến Nghé"}, "THQ3": {"label": "Quận 1"}, "THDC1": "412, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Công ty 2-ctv2.kng"}, "THTT2": {"label": "Hồ Chí Minh"}, "THNVT43": {}, "THTDGD7": null, "THMTVT42": "Test", "THDGDDGD9": 1}	{"THT10": "45", "THHSVT1": 1, "THNSM16": 6, "THNTM15": 5, "THTBD11": "128", "THCD1M17": 25, "THCD2M18": 26, "THHTSD14": {"label": "116"}, "THTHSD13": {"label": "115"}, "THDTCNM19": 120, "THDTKCN20": 15, "THDTVT1M2": 5, "THDTKVM223": 135, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 1, "THDTCNBQHM221": 100, "THDTCNKQHM222": 20, "THTLDTCNBQHDTCN": 0.8333333333333334, "THTLDTKCNDTKV20": 0.1111111111111111}	{"THHT25": 1, "THKT28": "haha", "THLT26": 0, "THSTT27": 1, "THTNT24": 3, "THCLCL29": 0.95, "THDGXMM236": 100000, "THDTXDM230": 125, "THGTCTXD37": 41800000, "THDTSCNM231": 300, "THDTSDPSM234": 20, "THDTSDTTM235": 440, "THDTSKCNM232": 120, "THTDTSTGCNM233": 420}	412, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	0.04	[{"note": " ", "level": 0.06, "typeId": 153, "groupId": 146}]	[{"note": " ", "level": 0.02, "typeId": 168, "groupId": 163}]	1	0.06	0.02	\N
33	2020-11-06 08:40:26.385045	2020-11-06 08:40:26.385045	t	17	19	80	Khảo sát thẩm định	38	38	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Thành", "value": 69}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-le.hm", "value": 61}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "Aute et voluptatem a", "THDGDDGD9": 0}	{"THT10": "Inventore quis occae", "THHSVT1": 1, "THNSM16": 12, "THNTM15": 12, "THTBD11": "Qui facilis velit vo", "THCD1M17": 12, "THCD2M18": 12, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 155, "THDTKCN20": 55, "THDTVT1M2": 30, "THDTKVM223": 210, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.45, "THDTCNBQHM221": 15, "THDTCNKQHM222": 140, "THTLDTCNBQHDTCN": 0.0967741935483871, "THTLDTKCNDTKV20": 0.2619047619047619}	{"THHT25": 1, "THKT28": "Fugiat doloremque v", "THLT26": 1, "THSTT27": 1, "THTNT24": 5, "THCLCL29": 0.9, "THDGXMM236": 35, "THDTXDM230": 100, "THGTCTXD37": 8347.5, "THDTSCNM231": 200, "THDTSDPSM234": 55, "THDTSDTTM235": 265, "THDTSKCNM232": 10, "THTDTSTGCNM233": 210}	746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, 	0.14	[{"note": " ", "level": 0.1, "typeId": 151, "groupId": 145, "typeName": "Loại ưu 1.1", "groupName": "Ưu điểm 01"}, {"note": " ", "level": 0.1, "typeId": 156, "groupId": 147, "typeName": "Loại ưu 3.2", "groupName": "Ưu điểm 03"}]	[{"note": "asd", "level": 0.02, "typeId": 170, "groupId": 164, "typeName": "Loại kém 2.1", "groupName": "Nhược điểm 02"}, {"note": " asdas", "level": 0.04, "typeId": 175, "groupId": 166, "typeName": "Loại kém 4.2", "groupName": "Nhược điểm 04"}]	0	0.2	0.06	\N
36	2020-11-06 09:42:55.597769	2020-11-06 09:42:55.597769	t	19	19	80	Khảo sát thẩm định	38	38	{"THD5": {"label": "Trần Hưng Đạo"}, "THP4": {"label": "Bến Thành"}, "THQ3": {"label": "Quận 1"}, "THDC1": "746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "Cong ty-le.hm"}, "THTT2": {"label": "Hồ Chí Minh"}, "THNVT43": {}, "THTDGD7": null, "THMTVT42": "Aute et voluptatem a", "THDGDDGD9": 0}	{"THT10": "Inventore quis occae", "THHSVT1": 1, "THNSM16": 12, "THNTM15": 12, "THTBD11": "Qui facilis velit vo", "THCD1M17": 12, "THCD2M18": 12, "THHTSD14": {"label": "116"}, "THTHSD13": {"label": "115"}, "THDTCNM19": 155, "THDTKCN20": 55, "THDTVT1M2": 30, "THDTKVM223": 210, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.45, "THDTCNBQHM221": 15, "THDTCNKQHM222": 140, "THTLDTCNBQHDTCN": 0.0967741935483871, "THTLDTKCNDTKV20": 0.2619047619047619}	{"THHT25": 1, "THKT28": "Fugiat doloremque v", "THLT26": 1, "THSTT27": 1, "THTNT24": 5, "THCLCL29": 0.9, "THDGXMM236": 35, "THDTXDM230": 100, "THGTCTXD37": 8347.5, "THDTSCNM231": 200, "THDTSDPSM234": 55, "THDTSDTTM235": 265, "THDTSKCNM232": 10, "THTDTSTGCNM233": 210}	746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, 	0.14	[{"note": " ", "level": 0.1, "typeId": 151, "groupId": 145}, {"note": " ", "level": 0.1, "typeId": 156, "groupId": 147}]	[{"note": "asd", "level": 0.02, "typeId": 170, "groupId": 164}, {"note": " asdas", "level": 0.04, "typeId": 175, "groupId": 166}]	0	0.2	0.06	{"THTMDC": 70, "THDCYTK8": {"label": "123", "value": 0.1}, "THDGDTT1": 0, "THDCYTGT3": {"label": "123", "value": 0.1}, "THDCYTKV6": {"label": "123", "value": 0.1}, "THDCYTQC5": {"label": "123", "value": 0.1}, "THDCYTTT7": {"label": "123", "value": 0.1}, "THHSDCMTH2": {"label": "123", "value": 0.1}, "THDCYTMDSU4": {"label": "123", "value": 0.1}}
37	2020-11-06 10:08:56.179825	2020-11-06 10:08:56.179825	t	20	3	78	Địa chỉ 1	38	38	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "kinhdoanh-02.np", "value": 60}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "1", "THHSVT1": 1, "THNSM16": 1, "THNTM15": 1, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, 	1	[]	[]	1	0	0	{"THTMDC": 70, "THDCYTK8": {"label": "123", "value": 0.1}, "THDGDTT1": 1, "THDCYTGT3": {"label": "123", "value": 0.1}, "THDCYTKV6": {"label": "123", "value": 0.1}, "THDCYTQC5": {"label": "123", "value": 0.1}, "THDCYTTT7": {"label": "123", "value": 0.1}, "THDGDTTSDC": 0.17, "THHSDCMTH2": {"label": "123", "value": 0.1}, "THDCYTMDSU4": {"label": "123", "value": 0.1}}
38	2020-11-06 10:08:56.179825	2020-11-06 10:08:56.179825	t	20	3	78	Địa chỉ 2	38	38	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "kinhdoanh-02.np", "value": 60}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "1", "THHSVT1": 1, "THNSM16": 1, "THNTM15": 1, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, 	1	[]	[]	1	0	0	{"THTMDC": 70, "THDCYTK8": {"label": "123", "value": 0.1}, "THDGDTT1": 1, "THDCYTGT3": {"label": "123", "value": 0.1}, "THDCYTKV6": {"label": "123", "value": 0.1}, "THDCYTQC5": {"label": "123", "value": 0.1}, "THDCYTTT7": {"label": "123", "value": 0.1}, "THDGDTTSDC": 0.17, "THHSDCMTH2": {"label": "123", "value": 0.1}, "THDCYTMDSU4": {"label": "123", "value": 0.1}}
39	2020-11-06 10:08:56.179825	2020-11-06 10:08:56.179825	t	20	3	78	Địa chỉ 3	38	38	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "kinhdoanh-02.np", "value": 60}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "1", "THHSVT1": 1, "THNSM16": 1, "THNTM15": 1, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, 	1	[]	[]	1	0	0	{"THTMDC": 70, "THDCYTK8": {"label": "123", "value": 0.1}, "THDGDTT1": 1, "THDCYTGT3": {"label": "2312", "value": 0.1}, "THDCYTKV6": {"label": "123", "value": 0.1}, "THDCYTQC5": {"label": "123", "value": 0.1}, "THDCYTTT7": {"label": "123", "value": 0.1}, "THDGDTTSDC": 0.17, "THHSDCMTH2": {"label": "112", "value": 0.1}, "THDCYTMDSU4": {"label": "123", "value": 0.1}}
40	2020-11-06 10:08:56.179825	2020-11-06 10:08:56.179825	t	20	3	78	Khảo sát thẩm định	38	38	{"THD5": {"label": "Trần Hưng Đạo", "value": 74}, "THP4": {"label": "Bến Nghé", "value": 68}, "THQ3": {"label": "Quận 1", "value": 62}, "THDC1": "29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, ", "THNT8": {"label": "kinhdoanh-02.np", "value": 60}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "", "THDGDDGD9": 1}	{"THT10": "1", "THHSVT1": 1, "THNSM16": 1, "THNTM15": 1, "THTBD11": "1", "THCD1M17": 1, "THCD2M18": 1, "THHTSD14": {"label": "114", "value": 114}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 1, "THDTKCN20": 1, "THDTKVM223": 2, "THHSDGDKCN": 0.3, "THDTCNKQHM222": 0, "THTLDTCNBQHDTCN": 1, "THTLDTKCNDTKV20": 0.5}	{"THGTCTXD37": 0, "THDTSDTTM235": 0, "THTDTSTGCNM233": 0}	29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, 	1	[]	[]	1	0	0	{"THTMDC": 70, "THDCYTK8": {"label": "123", "value": 0.1}, "THDGDTT1": 1, "THDCYTGT3": {"label": "123", "value": 0.1}, "THDCYTKV6": {"label": "123", "value": 0.1}, "THDCYTQC5": {"label": "123", "value": 0.1}, "THDCYTTT7": {"label": "123", "value": 0.1}, "THHSDCMTH2": {"label": "123", "value": 0.1}, "THDCYTMDSU4": {"label": "123", "value": 0.1}}
41	2020-11-06 10:19:28.289244	2020-11-06 10:19:28.289244	t	21	24	96	Khảo sát thẩm định	66	66	{"THD5": {"label": "Cách Mạng Tháng Tám", "value": 82}, "THP4": {"label": "Phường 3", "value": 232}, "THQ3": {"label": "Quận 3", "value": 64}, "THDC1": "611/Q3, Cách Mạng Tháng Tám, Phường 3, Quận 3, Hồ Chí Minh, ", "THNT8": {"label": "Công ty 2-ctv2.kng", "value": 68}, "THTT2": {"label": "Hồ Chí Minh", "value": 61}, "THNVT43": {}, "THTDGD7": null, "THHATL38": [], "THMTVT42": "Test", "THDGDDGD9": 0}	{"THT10": "25", "THHSVT1": 1, "THNSM16": 4, "THNTM15": 4, "THTBD11": "50", "THCD1M17": 25, "THCD2M18": 25, "THHTSD14": {"label": "116", "value": 116}, "THTHSD13": {"label": "115", "value": 115}, "THDTCNM19": 100, "THDTKCN20": 0, "THDTVT1M2": 80, "THDTKVM223": 100, "THHSDGDKCN": 0.3, "THHSDGDCNBQH": 0.6, "THDTCNBQHM221": 0, "THDTCNKQHM222": 100, "THTLDTCNBQHDTCN": 0, "THTLDTKCNDTKV20": 0}	{"THHT25": 0, "THKT28": "haha", "THLT26": 0, "THSTT27": 1, "THTNT24": 4, "THCLCL29": 0.98, "THDGXMM236": 100000, "THDTXDM230": 110, "THGTCTXD37": 45080000, "THDTSCNM231": 400, "THDTSDPSM234": 20, "THDTSDTTM235": 460, "THDTSKCNM232": 40, "THTDTSTGCNM233": 440}	611/Q3, Cách Mạng Tháng Tám, Phường 3, Quận 3, Hồ Chí Minh, 	0.04	[{"note": " TTT", "level": 0.03, "typeId": 154, "groupId": 146, "typeName": "Loại ưu 2.2", "groupName": "Ưu điểm 02"}, {"note": " RRR", "level": 0.05, "typeId": 155, "groupId": 147, "typeName": "Loại ưu 3.1", "groupName": "Ưu điểm 03"}]	[{"note": " EEE", "level": 0.02, "typeId": 169, "groupId": 163, "typeName": "Loại kém 1.2", "groupName": "Nhược điểm 01"}, {"note": " DDD", "level": 0.02, "typeId": 174, "groupId": 166, "typeName": "Loại kém 4.1", "groupName": "Nhược điểm 04"}]	0	0.08	0.04	{"THTMDC": 6, "THDCYTK8": {}, "THDGDTT1": 0, "THDCYTGT3": {"value": 0.01}, "THDCYTKV6": {}, "THDCYTQC5": {"value": 0.01}, "THDCYTTT7": {}, "THHSDCMTH2": {"value": 0.02}, "THDCYTMDSU4": {"value": 0.02}}
\.


--
-- Data for Name: appraisal_statement_notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appraisal_statement_notes (id, created_at, updated_at, note_id, note_type, execution_date, assignee_id, company_id, instructor_id, status, is_deleted, rejection_note, property_id, created_by, updated_by, approved_by, street_number, district_id, street_id, approved_at, comments, result_audit_ppss, result_audit_ppdg, city_id, ward_id, completed_at, completed_by, execution_by, inspection_statement_id, address, rejected_at, general_info_ppdg, adjust_control_ppdg, rejected_by, land_unit_price_ppss, property_unit_price_ppss, land_unit_price_ppdg, property_unit_price_ppdg) FROM stdin;
1	2020-11-03 10:43:38.472759	2020-11-03 10:43:38.472759	TH200001	Hiện trạng	2020-11-03 00:00:00	32	\N	\N	Nháp	f		\N	2	2	\N	\N	\N	\N	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
4	2020-11-05 05:09:28.793785	2020-11-05 05:09:28.793785	TH200004	Hiện trạng	2020-11-03 00:00:00	32	\N	\N	Nháp	f		\N	2	2	\N	\N	\N	\N	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{}	{}	\N	\N	\N	\N	\N	\N	\N	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	\N	\N	\N
3	2020-11-05 01:33:51.176971	2020-11-06 02:54:46.310022	TH20q1004503	Hiện trạng	2020-11-05 00:00:00	32	\N	\N	Đã duyệt	f		89	2	38	38	303	62	122	2020-11-06 02:54:46.295	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{}	{}	61	68	2020-11-06 02:54:07.774	38	\N	15	223 address aaa	\N	{"THDGDDG": 1000001}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	1	\N	1
2	2020-11-04 07:59:07.188653	2020-11-05 05:33:15.745609	TH20q1003601	Hiện trạng	2020-11-03 00:00:00	32	\N	\N	Hoàn thành	f		80	66	2	\N	746	62	74	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{}	{}	61	69	2020-11-05 05:33:15.74	2	\N	2	746, 74, Bến Thành, Quận 1, Hồ Chí Minh, 	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	\N	\N	\N
5	2020-11-05 06:49:04.341511	2020-11-05 06:49:04.341511	TH200005	Hiện trạng	2020-11-05 00:00:00	33	\N	\N	Nháp	f		\N	2	2	\N	\N	\N	\N	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{"THGTCTXD": 0, "THGTDPPSS": null, "THTLDCCTDV": 43, "THDGDBQPPSS": 0, "THDGDTDPPSS": 0, "THGTTSTDPPSS": 0}	{"THGTCTXD": 0, "THDGDPPDG": 0, "THGTDPPDG": null, "THHSDCTSTD": 0, "THTLDCCTDV": 54, "THDGDTDPPDG": 0, "THGTTSTDPPDG": 0}	\N	\N	\N	\N	\N	\N	\N	\N	{"THND": "2020-11-05T06:48:42.287Z", "THDTC": 0, "THDGDDG": 45}	{"THTMDC": 0, "THDCYTK7": {"label": "54"}, "THDCYTGT2": {"label": "54"}, "THDCYTKV5": {"label": "54"}, "THDCYTQC4": {"label": "45"}, "THDCYTTT6": {"label": "54"}, "THHSDCMTH1": {"label": "54", "value": 5.4}, "THDCYTMDSU3": {"label": "45"}}	\N	\N	\N	\N	\N
10	2020-11-06 02:42:49.460955	2020-11-06 02:42:49.460955	TH20q1003401	Hiện trạng	2020-11-03 00:00:00	33	\N	\N	Nháp	f		78	2	2	\N	29/10/02	62	74	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{}	{}	61	68	\N	\N	\N	3	29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, 	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	1	\N	1
9	2020-11-06 02:12:44.291511	2020-11-06 02:14:45.373791	TH20q1004501	Hiện trạng	2020-11-06 00:00:00	32	\N	\N	Đã duyệt	f		89	2	2	2	303	62	122	2020-11-06 02:14:45.365	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{}	{}	61	68	2020-11-06 02:14:04.259	2	\N	15	223 address aaa	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	1	\N	1
6	2020-11-05 08:19:35.702816	2020-11-06 02:53:07.894562	TH20q1004502	Hiện trạng	2020-11-05 00:00:00	\N	\N	\N	Hoàn thành	f		89	2	38	\N	302	62	122	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{}	{}	61	68	2020-11-06 02:53:07.88	38	\N	21	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	1	\N	1
12	2020-11-06 04:24:15.451031	2020-11-06 07:01:03.190994	TH20q1004801	Hiện trạng	2020-11-06 00:00:00	\N	\N	\N	Đã duyệt	f	Thiếu thông tin 1	92	66	66	66	412	62	122	2020-11-06 07:01:03.182	[{"type": "Người thẩm định", "comment": "45"}, {"type": "Người kiểm soát", "comment": "5454"}, {"type": "Hội đồng thẩm định", "comment": "45"}]	{}	{}	61	68	2020-11-06 07:00:24.358	66	\N	22	412, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	2020-11-06 06:59:40.674	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	66	0	1	0	1
11	2020-11-06 03:50:06.958924	2020-11-06 04:22:32.890328	TH20q1004504	Hiện trạng	2020-11-06 00:00:00	\N	\N	\N	Đã duyệt	f		89	66	38	38	302	62	122	2020-11-06 04:22:32.889	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{"THGTCTXD": 0, "THGTDPPSS": null, "THHSDCTSTD": 0, "THDGDBQPPSS": 0, "THDGDTDPPSS": 0, "THGTTSTDPPSS": 0}	{}	61	68	2020-11-06 04:21:57.787	38	\N	21	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	\N	{"THDGDDG": 1000001}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	0	1	\N	1
14	2020-11-06 06:42:31.897792	2020-11-06 06:42:31.897792	TH200012	Hiện trạng	2020-11-06 00:00:00	\N	\N	\N	Nháp	f		\N	66	66	\N	\N	\N	\N	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{}	{}	\N	\N	\N	\N	\N	\N	\N	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	1	\N	1
15	2020-11-06 07:44:32.82616	2020-11-06 07:44:32.82616	TH200013	Hiện trạng	2020-11-06 00:00:00	38	\N	\N	Nháp	f		\N	38	38	\N	\N	\N	\N	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{"THHSDCTSTD": null}	{}	\N	\N	\N	\N	\N	\N	\N	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	1	\N	1
16	2020-11-06 07:52:53.653517	2020-11-06 07:52:53.653517	TH20q1003602	Hiện trạng	2020-11-02 00:00:00	38	\N	\N	Nháp	f		80	38	38	\N	746	62	74	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{"THGTCTXD": 8347.5, "THGTDPPSS": null, "THHSDCTSTD": 14.000000000000002, "THTLDCCTDV": 1106, "THDGDBQPPSS": 0, "THDGDTDPPSS": 0, "THGTTSTDPPSS": null}	{"THGTCTXD": 0, "THDGDPPDG": 16818.164999999997, "THGTDPPDG": null, "THHSDCTSTD": 12.649999999999999, "THTLDCCTDV": 1111, "THDGDTDPPDG": 229567.95224999994, "THGTTSTDPPDG": null}	61	69	\N	\N	\N	19	746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, 	\N	{"THND": "2020-11-03T07:52:12.055Z", "THDTC": 1, "THDGDDG": 111}	{"THTMDC": 12.649999999999999, "THDCYTK7": {"label": "qew", "value": 0.1}, "THDCYTGT2": {"label": "1wqw", "value": 1.1}, "THDCYTKV5": {"label": "qwe", "value": 0.1}, "THDCYTQC4": {"label": "qwe", "value": 0.1}, "THDCYTTT6": {"label": "qew", "value": 0.1}, "THHSDCMTH1": {"label": "qwe", "value": 11.1}, "THDCYTMDSU3": {"label": "qewqweew", "value": 0.05}}	\N	0	1	229567.95224999994	1
19	2020-11-06 09:06:59.918794	2020-11-06 09:42:55.597769	TH20q1003604	Hiện trạng	2020-11-06 00:00:00	38	\N	\N	Nháp	f		80	38	38	\N	746	62	74	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{"THGTCTXD": 8347.5, "THGTDPPSS": null, "THHSDCTSTD": 14.000000000000002, "THDGDBQPPSS": 0, "THDGDTDPPSS": 0, "THGTTSTDPPSS": null}	{}	61	69	\N	\N	\N	19	746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, 	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	0	1	\N	1
20	2020-11-06 10:08:56.179825	2020-11-06 10:08:56.179825	TH20q1003402	Hiện trạng	2020-11-01 00:00:00	38	\N	\N	Nháp	f		78	38	38	\N	29/10/02	62	74	\N	[{"type": "Người thẩm định", "comment": "123"}, {"type": "Người kiểm soát", "comment": "123"}, {"type": "Hội đồng thẩm định", "comment": "12321313123"}]	{"THGTCTXD": 0, "THGTDPPSS": null, "THHSDCTSTD": 100, "THTLDCCTDV": 1, "THDGDBQPPSS": 0, "THDGDTDPPSS": 0, "THGTTSTDPPSS": null}	{"THGTCTXD": 0, "THDGDPPDG": 20.91, "THGTDPPDG": null, "THHSDCTSTD": 0.7, "THTLDCCTDV": 1, "THDGDTDPPDG": 35.547, "THGTTSTDPPDG": null}	61	68	\N	\N	\N	3	29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, 	\N	{"THND": "2020-11-02T10:08:11.617Z", "THDTC": 123, "THDGDDG": 123}	{"THTMDC": 0.7, "THDCYTK7": {"label": "123", "value": 0.1}, "THDCYTGT2": {"label": "123", "value": 0.1}, "THDCYTKV5": {"label": "123", "value": 0.1}, "THDCYTQC4": {"label": "123", "value": 0.1}, "THDCYTTT6": {"label": "123", "value": 0.1}, "THHSDCMTH1": {"label": "123", "value": 0.1}, "THDCYTMDSU3": {"label": "123", "value": 0.1}}	\N	0	1	35.547	1
17	2020-11-06 08:40:26.385045	2020-11-06 08:40:26.385045	TH20q1003603	Hiện trạng	2020-11-06 00:00:00	\N	\N	\N	Nháp	f		80	38	38	\N	746	62	74	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{"THGTCTXD": 8347.5, "THGTDPPSS": null, "THHSDCTSTD": 14.000000000000002, "THDGDBQPPSS": 0, "THDGDTDPPSS": 0, "THGTTSTDPPSS": null}	{}	61	69	\N	\N	\N	19	746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, 	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	0	1	\N	1
18	2020-11-06 08:42:05.86162	2020-11-06 08:42:05.86162	TH200016	Hiện trạng	2020-11-06 00:00:00	\N	\N	\N	Nháp	f		\N	38	38	\N	\N	\N	\N	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{"THHSDCTSTD": null}	{}	\N	\N	\N	\N	\N	\N	\N	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	1	\N	1
13	2020-11-06 06:34:35.852634	2020-11-06 10:51:10.469153	TH20q1004802	Hiện trạng	2020-11-06 00:00:00	\N	\N	\N	Từ chối	f	Thiếu thông tin 1	92	66	66	\N	412	62	122	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{}	{}	61	68	2020-11-06 08:02:21.381	66	\N	22	412, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	2020-11-06 10:51:10.457	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	66	0	1	0	1
21	2020-11-06 10:19:28.289244	2020-11-06 10:36:33.045651	TH20q3000201	Hiện trạng	2020-11-06 00:00:00	66	\N	\N	Đã duyệt	f		96	66	66	66	611/Q3	64	82	2020-11-06 10:36:33.043	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{"THGTCTXD": 45080000, "THGTDPPSS": null, "THHSDCTSTD": 4, "THTLDCCTDV": 3, "THDGDBQPPSS": 0, "THDGDTDPPSS": 0, "THGTTSTDPPSS": null}	{"THGTCTXD": 45080000, "THDGDPPDG": 10400.010400000001, "THGTDPPDG": null, "THHSDCTSTD": 0.04, "THTLDCCTDV": 1, "THDGDTDPPDG": 10816.010816000002, "THGTTSTDPPDG": null}	61	232	2020-11-06 10:35:58.741	66	\N	24	611/Q3, Cách Mạng Tháng Tám, Phường 3, Quận 3, Hồ Chí Minh, 	\N	{"THND": "2020-11-05T10:18:40.445Z", "THDTC": 100, "THDGDDG": 1000001}	{"THTMDC": 0.04, "THDCYTK7": {}, "THDCYTGT2": {"value": 0.01}, "THDCYTKV5": {"value": 0.01}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {"value": 0.01}, "THDCYTMDSU3": {"value": 0.01}}	\N	0	1	10816.010816000002	1
22	2020-11-06 15:02:52.637496	2020-11-06 15:02:52.637496	TH200020	Hiện trạng	2020-11-06 00:00:00	56	\N	\N	Nháp	f		\N	56	56	\N	\N	\N	\N	\N	[{"type": "Người thẩm định"}, {"type": "Người kiểm soát"}, {"type": "Hội đồng thẩm định"}]	{"THHSDCTSTD": null}	{}	\N	\N	\N	\N	\N	\N	\N	\N	{}	{"THDCYTK7": {}, "THDCYTGT2": {}, "THDCYTKV5": {}, "THDCYTQC4": {}, "THDCYTTT6": {}, "THHSDCMTH1": {}, "THDCYTMDSU3": {}}	\N	\N	1	\N	1
\.


--
-- Data for Name: casbin_rule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.casbin_rule (id, created_at, updated_at, ptype, v0, v1, v2, v3, v4, v5) FROM stdin;
\.


--
-- Data for Name: chat_sockets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_sockets (id, created_at, updated_at, account_id, identity_name, socket_id, session_id) FROM stdin;
1069	2020-11-03 03:16:14.421739	2020-11-03 03:16:14.421739	2	admin	5gsOZ62O0ME8Sj1dAAcq	522
1070	2020-11-03 03:40:54.040092	2020-11-03 03:40:54.040092	2	admin	dSk1JnvDIeDll2c3AAAA	522
1071	2020-11-03 03:55:40.916365	2020-11-03 03:55:40.916365	2	admin	xgfYoKSSmV3TpTasAAAA	522
1072	2020-11-03 03:57:49.073676	2020-11-03 03:57:49.073676	2	admin	aHYvCdMUz6ARKBzIAAAB	522
800	2020-10-29 03:37:07.194723	2020-10-29 03:37:07.194723	2	admin	Rf8eMxFbRv-r61YfAAAV	503
801	2020-10-29 03:37:07.409985	2020-10-29 03:37:07.409985	2	admin	L7yLndUWnvpr_ky5AAAW	503
224	2020-10-23 09:24:30.821593	2020-10-23 09:24:30.821593	38	son.pt	xw5Dq2pi8z3dJC8TAAcz	427
1088	2020-11-03 08:13:29.139796	2020-11-03 08:13:29.139796	2	admin	LBu9nYQbdXWDGMVDAAwP	522
236	2020-10-23 10:04:46.840674	2020-10-23 10:04:46.840674	49	+1 (616) 966-2831	VpXLBaxYTcAZHPNPAAc_	384
242	2020-10-23 10:08:37.18313	2020-10-23 10:08:37.18313	2	admin	Sly-Q7EzUER_JHdZAAdF	449
243	2020-10-23 10:08:44.397055	2020-10-23 10:08:44.397055	2	admin	DLOruuhpRNRmch77AAdG	449
548	2020-10-26 02:43:11.435296	2020-10-26 02:43:11.435296	2	admin	FF3H3iHQHJxJnzEpAAAA	463
549	2020-10-26 02:43:11.597143	2020-10-26 02:43:11.597143	2	admin	QsMDJf_LLtGUz7gnAAAB	463
1100	2020-11-04 09:32:47.763214	2020-11-04 09:32:47.763214	2	admin	R55XDVrRrJoHGe-_AAmF	522
556	2020-10-26 02:55:58.632441	2020-10-26 02:55:58.632441	2	admin	aIPR5wUc5e_1-2kDAAAv	466
557	2020-10-26 02:55:58.73874	2020-10-26 02:55:58.73874	2	admin	RFdPpFxCA4VP5iatAAAw	466
558	2020-10-26 02:57:29.816982	2020-10-26 02:57:29.816982	38	son.pt	I1CXmaDOYWDvY63nAAAy	467
205	2020-10-23 08:55:08.034476	2020-10-23 08:55:08.034476	38	son.pt	EqaA_J9vo-eHbZl8AAce	439
206	2020-10-23 08:55:12.104762	2020-10-23 08:55:12.104762	38	son.pt	UWD3bQKRplF4wnE-AAcf	439
1048	2020-11-02 03:07:16.625579	2020-11-02 03:07:16.625579	38	son.pt	_1M_aRastPk65SbMAAAB	427
565	2020-10-26 03:02:24.54375	2020-10-26 03:02:24.54375	38	son.pt	kIeJvwuMIBSZUpFBAAA4	467
782	2020-10-28 03:21:22.588389	2020-10-28 03:21:22.588389	2	admin	yunpK-fyknS_MELlAAAE	493
567	2020-10-26 03:02:33.072302	2020-10-26 03:02:33.072302	38	son.pt	aA4UpvRFrFKJ_db_AAA6	467
569	2020-10-26 03:11:03.03455	2020-10-26 03:11:03.03455	2	admin	ABRgGwjTTmN6_6EfAAA8	459
570	2020-10-26 03:22:29.396598	2020-10-26 03:22:29.396598	2	admin	z_0ZOQ-bKh2_JyYUAAA9	411
571	2020-10-26 03:22:54.924255	2020-10-26 03:22:54.924255	2	admin	DTKN-TUx_gBxcWPIAAA-	314
1050	2020-11-02 03:57:41.466054	2020-11-02 03:57:41.466054	2	admin	gNOjIYvMMsHCdU3yAADj	521
1051	2020-11-02 03:57:41.714329	2020-11-02 03:57:41.714329	2	admin	0YqXwtwfA-BQO7OTAADk	521
838	2020-10-30 03:29:24.35033	2020-10-30 03:29:24.35033	60	02.np	IavTqljsTUMDE_uyAAK2	512
839	2020-10-30 04:26:33.233756	2020-10-30 04:26:33.233756	2	admin	s3vFcahQI4AqAU9FAARK	314
1055	2020-11-02 05:02:51.046917	2020-11-02 05:02:51.046917	2	admin	10MLjwH5P7uPKRBaAASr	522
1168	2020-11-06 04:30:21.873196	2020-11-06 04:30:21.873196	2	admin	6lqX92wbUEjGe7XxAAZW	522
1058	2020-11-02 05:29:52.529048	2020-11-02 05:29:52.529048	2	admin	8mjJYRekYqkC3gSDAAAA	522
1169	2020-11-06 08:04:20.953727	2020-11-06 08:04:20.953727	2	admin	tW-yMGXp8v0fQXXfAAAC	522
1170	2020-11-06 09:04:19.969165	2020-11-06 09:04:19.969165	2	admin	CetnVPBk1DrYxG_xAAAA	522
1061	2020-11-02 07:30:32.554181	2020-11-02 07:30:32.554181	2	admin	hcq4hCviRpq56ubLAAZ_	522
1063	2020-11-02 09:55:41.542448	2020-11-02 09:55:41.542448	2	admin	wxveJrauUvt5dDv7ABO0	525
1065	2020-11-02 10:28:29.888159	2020-11-02 10:28:29.888159	2	admin	apREb_0AA8UMPMrLABaf	522
\.


--
-- Data for Name: collaborators; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collaborators (id, created_at, updated_at, full_name, birthday, joined_date, phone, email, company_id, collaborator_type_id, created_by, updated_by) FROM stdin;
48	2020-10-16 10:30:48.696872	2020-10-27 04:35:47.64	Hồ Ngọc Hà 3	2020-10-13	2020-09-27	0909090901	hnh@tpptechnology.com	139	126	2	62
43	2020-10-16 09:05:35.819384	2020-10-27 04:45:43.779	Hồ Ngọc Hà	2020-10-02	2020-10-30	0123567894	caoduy1295@gmail.com	139	126	2	62
76	2020-10-27 02:48:59.50119	2020-10-29 03:39:26.692	Hà Mỹ Lệ 	2020-09-25	2020-10-04	0989898899	hml@tpptechnology.com	124	126	38	2
74	2020-10-26 08:11:06.373311	2020-10-26 08:11:06.373311	Nguyen Xuab Bao Khanh1	2020-10-04	2020-10-08	090000001	kn.forworks@gmail.com	139	132	2	2
73	2020-10-26 03:00:43.095081	2020-10-27 02:42:45.891	Nguyen Hien Luong 	2020-10-03	2020-10-29	0368888303	luong1@gmail.com	128	127	38	38
47	2020-10-16 09:08:53.668497	2020-10-27 03:18:23.81	Nguyen Hien Luong	2020-10-08	2020-10-24	0983705478	luong.nguyen@tpptechnology.com	129	127	2	38
53	2020-10-19 08:05:25.838299	2020-10-27 03:19:31.458	Lane Moon	2010-10-02	2020-10-18	+1 (572) 753-9335	pagexaf466@ngo1.com	128	127	2	38
72	2020-10-23 07:57:11.321709	2020-10-27 03:41:34.315	UI ZỜI UI edit 1	1990-12-29	2019-12-29	0909090909	uizoi@tpptechnology.com	124	132	38	2
62	2020-10-22 04:05:56.363344	2020-10-27 03:41:46.446	Nguyen Hoang An	2020-10-07	2020-10-14	0368888333	nha@tpptechnology.com	129	127	39	2
61	2020-10-21 09:57:15.080721	2020-10-27 03:41:56.609	Nguyen Thanh Long	2020-10-23	2020-10-21	0368881333	ntl@tpptechnology.com	124	127	39	2
49	2020-10-19 04:14:29.314855	2020-10-27 03:42:07.147	TKE	2020-10-14	2020-10-08	0943687946	tk3@tpptechnology.COM	129	132	2	2
77	2020-10-29 03:55:18.287825	2020-10-30 07:01:19.955	Cao Quang Duy	1993-01-31	2020-09-27	016542200131	caoduy1293@gmail.com	124	127	2	2
75	2020-10-26 08:13:05.291422	2020-10-30 10:26:46.208	Nguyen Xuab Bao Khanh2	2020-10-12	2020-10-10	090000002	huy.trinh@tpptechnology.com	139	131	2	2
78	2020-11-05 04:02:30.184031	2020-11-05 04:02:30.184031	K n g CTV1	2020-11-01	2020-11-04	0906347817	kn.forworks+CTV1@gmail.com	129	132	66	66
79	2020-11-05 04:04:05.555461	2020-11-05 04:04:05.555461	K n g CTV2	2020-11-01	2020-11-04	0906347827	kn.forworks+CTV2@gmail.com	130	131	66	66
80	2020-11-05 08:21:04.050407	2020-11-05 08:21:04.050407	CTV np 01	1999-02-28	2018-11-14	092020110501	cvtnp01@mail.com	124	132	56	56
42	2020-10-16 08:54:42.040246	2020-10-16 08:54:42.040246	Cao Quang Duy	2020-10-01	2020-10-01	0354220013	caoduy1293@gmail.com	124	126	2	2
44	2020-10-16 09:06:14.790238	2020-10-16 09:06:14.790238	Huy Trinh	1989-12-15	2020-10-16	0904200601	huy.trinh@tpptechnology.com	130	127	2	2
46	2020-10-16 09:08:17.973926	2020-10-16 09:08:17.973926	Cao Quang Duy	2020-10-01	2020-10-01	0354220015	caoduy1299@gmail.com	124	126	2	2
51	2020-10-19 07:56:52.240026	2020-10-19 07:56:52.240026	Nehru Vega	2009-10-12	2020-10-19	+1 (988) 399-9124	procrean@stormenra.ga	128	127	2	2
52	2020-10-19 08:04:15.756694	2020-10-20 04:05:32.102154	Erasmus Giles	2020-09-02	2020-10-19	+1 (678) 929-1193	procrean@stormenra.ga	128	127	2	30
54	2020-10-20 09:45:26.100173	2020-10-20 09:45:26.100173	Nguyen Admin 2	2020-10-20	2020-10-22	0999999998	luongnguyenhien94@tpptechnology.com	128	131	2	2
55	2020-10-21 08:06:25.337006	2020-10-21 08:06:25.337006	halato nv1	2020-10-14	2020-10-23	0368888678	halato1@mailnesia.com	128	126	2	2
57	2020-10-21 08:09:50.698241	2020-10-21 08:09:50.698241	halato nv1	2020-10-14	2020-10-23	0368888679	sang.huynh@tpptechnology.com	128	126	2	2
59	2020-10-21 08:10:52.650394	2020-10-21 08:10:52.650394	halato nv1	2020-10-14	2020-10-23	03687588679	sang.huynh@tpptechnology.com	128	126	2	2
60	2020-10-21 09:23:21.973242	2020-10-21 09:23:21.973242	Order 010	2020-10-14	2020-10-22	036888833	nguyen@gmail.com	124	126	39	39
63	2020-10-22 04:11:00.432989	2020-10-22 04:11:00.432989	Nguyễn Ngọc Hà	1991-09-29	2020-10-02	0368888331	nguyenhienluong2@gmail.com	130	132	39	39
64	2020-10-22 04:17:58.566228	2020-10-22 04:17:58.566228	Nguyễn Thanh Mai	2012-09-26	2020-10-24	0368812833	nguyenhienluong3@gmail.com	130	127	39	39
65	2020-10-22 04:21:53.084006	2020-10-22 04:21:53.084006	Trần Nguyên Khôi	2020-09-28	2020-10-31	0987654321	khoitran@gmail.com	134	127	39	39
66	2020-10-22 04:24:53.269798	2020-10-22 04:24:53.269798	Trần Nguyễn Hạ Long	2020-10-05	2020-10-30	0989898998	halongtran@gmail.com	134	127	2	2
67	2020-10-22 04:48:43.814157	2020-10-22 04:48:43.814157	Tran Huynh Quang	1992-10-22	2020-10-23	0368888337	quang.huynh@tpptechnology.com	130	126	2	2
68	2020-10-22 10:14:20.988374	2020-10-22 10:14:20.988374	Kiara Neal	2006-10-25	2020-10-22	+1 (274) 706-5002	pagexaf312@glenwoodave.com	128	127	2	2
70	2020-10-23 04:09:37.332787	2020-10-23 04:09:37.332787	thienhoang	2020-10-23	2020-10-30	0912345678	thienhoangntp@gmail.com	138	131	2	2
71	2020-10-23 07:01:08.1059	2020-10-23 07:01:08.1059	Luong Nguyen Hien 01	2020-10-05	2020-10-24	0123456789	luong1@tpptechnology.com	138	127	38	38
69	2020-10-22 10:41:37.337137	2020-10-23 10:06:18.779383	Maxwell Mayer	1997-10-23	2020-10-22	+1 (616) 966-2831	piyot91881@ngo1.com	124	127	2	49
\.


--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversations (id, created_at, updated_at, snapshot, created_by, updated_by, last_message_id) FROM stdin;
1	2020-10-22 10:16:19.708188	2020-10-22 10:16:19.708188		48	48	\N
6	2020-10-23 03:26:39.497787	2020-10-23 10:41:41.056375	Jdkd	38	38	207
13	2020-10-23 06:06:41.858968	2020-10-23 06:06:41.858968		32	32	\N
3	2020-10-22 10:35:24.02609	2020-10-22 10:35:24.02609		48	48	\N
17	2020-10-26 02:54:52.252371	2020-10-26 02:56:49.203942	hello 2	41	2	221
15	2020-10-23 07:10:35.711814	2020-10-26 02:57:44.287453	hi there	41	38	223
14	2020-10-23 06:09:09.200056	2020-10-26 05:38:43.719577	Huhu	37	37	224
16	2020-10-26 02:44:21.147116	2020-10-26 05:38:43.799674	He	37	37	227
18	2020-10-26 08:15:43.194635	2020-10-26 08:20:18.740807	kaka	59	2	234
19	2020-10-27 07:45:43.525208	2020-10-27 07:45:46.515574	Hi	61	61	235
20	2020-10-30 02:24:11.016686	2020-10-30 02:24:11.016686		60	60	\N
11	2020-10-23 04:25:39.554052	2020-10-23 04:26:17.627461	test	2	2	37
9	2020-10-23 03:57:02.519046	2020-10-23 04:26:23.177125	test	2	2	38
8	2020-10-23 03:49:30.119533	2020-10-23 04:27:36.809427	test chat	2	2	43
10	2020-10-23 04:01:57.314436	2020-10-23 04:27:47.557374	test 231020 11h27	39	2	45
7	2020-10-23 03:27:48.629665	2020-10-23 04:34:13.591959	hbhg	38	38	49
2	2020-10-22 10:22:02.424062	2020-10-23 04:34:27.253185	uyuuyuyuyuyuyuyu	48	38	50
12	2020-10-23 04:54:23.90362	2020-10-23 06:04:32.684194	klkkl	37	32	52
5	2020-10-22 10:52:39.71271	2020-10-23 10:28:27.120594	Some time chat nt work	49	49	198
4	2020-10-22 10:50:05.773046	2020-10-23 10:39:20.319323	Hi admin	2	49	202
\.


--
-- Data for Name: disadvantage_levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.disadvantage_levels (id, created_at, updated_at, inspection_statement_id, level, note, group_id, type_id) FROM stdin;
17	2020-11-05 10:12:13.992352	2020-11-05 10:12:13.992352	20	0.15	 	164	171
18	2020-11-05 10:17:42.130404	2020-11-05 10:17:42.130404	19	0.02	asd	164	170
19	2020-11-05 10:17:42.130404	2020-11-05 10:17:42.130404	19	0.04	 asdas	166	175
21	2020-11-06 04:10:01.219406	2020-11-06 04:10:01.219406	22	0.02	 	163	168
24	2020-11-06 09:45:38.137092	2020-11-06 09:45:38.137092	2	0.11	asdasd 	164	170
27	2020-11-06 09:54:00.121696	2020-11-06 09:54:00.121696	24	0.02	 EEE	163	169
28	2020-11-06 09:54:00.121696	2020-11-06 09:54:00.121696	24	0.02	 DDD	166	174
30	2020-11-06 15:00:08.442741	2020-11-06 15:00:08.442741	27	0.1	 test2	163	168
\.


--
-- Data for Name: employee_limits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_limits (id, created_at, updated_at, is_active, type_id, employee_id, value, created_by, updated_by) FROM stdin;
108	2020-10-23 03:23:26.85681	2020-10-23 03:23:26.85681	t	106	18	12	2	2
196	2020-11-06 03:42:34.363123	2020-11-06 03:42:34.363123	t	142	26	40	66	66
197	2020-11-06 03:42:34.363123	2020-11-06 03:42:34.363123	t	143	26	60	66	66
223	2020-11-06 06:31:24.601599	2020-11-06 06:31:24.601599	t	144	21	100	2	2
45	2020-10-15 07:13:32.082772	2020-10-15 07:13:32.082772	t	104	11	3	2	2
46	2020-10-15 07:13:32.082772	2020-10-15 07:13:32.082772	f	105	11	4	2	2
224	2020-11-06 06:31:24.601599	2020-11-06 06:31:24.601599	t	140	21	10	2	2
225	2020-11-06 06:31:24.601599	2020-11-06 06:31:24.601599	t	141	21	20	2	2
226	2020-11-06 06:31:24.601599	2020-11-06 06:31:24.601599	t	142	21	50	2	2
85	2020-10-20 09:35:18.725336	2020-10-20 09:35:18.725336	t	103	13	4	2	2
86	2020-10-20 09:35:18.725336	2020-10-20 09:35:18.725336	t	104	13	50	2	2
87	2020-10-20 09:35:18.725336	2020-10-20 09:35:18.725336	t	105	13	6	2	2
88	2020-10-20 09:35:18.725336	2020-10-20 09:35:18.725336	t	106	13	800	2	2
89	2020-10-20 09:35:18.725336	2020-10-20 09:35:18.725336	f	107	13	10	2	2
227	2020-11-06 06:31:24.601599	2020-11-06 06:31:24.601599	t	143	21	80	2	2
127	2020-10-23 11:10:26.253672	2020-10-23 11:10:26.253672	f	103	20	1	38	38
128	2020-10-23 11:10:26.253672	2020-10-23 11:10:26.253672	f	104	20	100	38	38
90	2020-10-21 04:38:29.465017	2020-10-21 04:38:29.465017	f	103	15	1	27	27
91	2020-10-21 04:38:29.465017	2020-10-21 04:38:29.465017	f	104	15	10	27	27
92	2020-10-21 04:38:29.465017	2020-10-21 04:38:29.465017	f	107	15	2	27	27
167	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	105	17	3	2	2
168	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	106	17	4	2	2
169	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	107	17	5	2	2
170	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	104	17	1000	2	2
134	2020-10-26 08:25:26.294173	2020-10-26 08:25:26.294173	t	104	14	100	2	2
135	2020-10-26 08:25:26.294173	2020-10-26 08:25:26.294173	t	103	14	1	2	2
136	2020-10-26 08:25:26.294173	2020-10-26 08:25:26.294173	t	105	14	10	2	2
137	2020-10-26 08:25:26.294173	2020-10-26 08:25:26.294173	t	107	14	2	2	2
171	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	103	17	10	2	2
213	2020-11-06 06:30:30.817754	2020-11-06 06:30:30.817754	t	140	27	5	2	2
214	2020-11-06 06:30:30.817754	2020-11-06 06:30:30.817754	t	141	27	3	2	2
215	2020-11-06 06:30:30.817754	2020-11-06 06:30:30.817754	t	142	27	30	2	2
216	2020-11-06 06:30:30.817754	2020-11-06 06:30:30.817754	t	143	27	50	2	2
217	2020-11-06 06:30:30.817754	2020-11-06 06:30:30.817754	t	144	27	80	2	2
230	2020-11-06 09:31:10.527081	2020-11-06 09:31:10.527081	t	142	16	1	38	38
231	2020-11-06 09:31:10.527081	2020-11-06 09:31:10.527081	t	143	16	2	38	38
218	2020-11-06 06:30:56.909758	2020-11-06 06:30:56.909758	t	141	22	5	2	2
219	2020-11-06 06:30:56.909758	2020-11-06 06:30:56.909758	t	144	22	50	2	2
220	2020-11-06 06:30:56.909758	2020-11-06 06:30:56.909758	t	140	22	10	2	2
221	2020-11-06 06:30:56.909758	2020-11-06 06:30:56.909758	t	143	22	20	2	2
222	2020-11-06 06:30:56.909758	2020-11-06 06:30:56.909758	t	142	22	10	2	2
\.


--
-- Data for Name: employee_regions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_regions (id, created_at, updated_at, is_active, city_id, ward_id, employee_id, created_by, updated_by, district_id) FROM stdin;
163	2020-11-06 09:31:10.527081	2020-11-06 09:31:10.527081	f	61	\N	16	38	38	65
38	2020-10-15 07:13:32.082772	2020-10-15 07:13:32.082772	t	61	62	11	2	2	62
39	2020-10-15 07:13:32.082772	2020-10-15 07:13:32.082772	f	61	64	11	2	2	64
72	2020-10-20 09:35:18.725336	2020-10-20 09:35:18.725336	t	61	62	13	2	2	62
73	2020-10-20 09:35:18.725336	2020-10-20 09:35:18.725336	t	61	64	13	2	2	64
74	2020-10-20 09:35:18.725336	2020-10-20 09:35:18.725336	t	61	66	13	2	2	66
75	2020-10-20 09:35:18.725336	2020-10-20 09:35:18.725336	f	61	67	13	2	2	67
76	2020-10-21 04:38:29.465017	2020-10-21 04:38:29.465017	f	61	62	15	27	27	62
77	2020-10-21 04:38:29.465017	2020-10-21 04:38:29.465017	f	61	63	15	27	27	63
78	2020-10-21 04:38:29.465017	2020-10-21 04:38:29.465017	f	61	64	15	27	27	64
79	2020-10-21 04:38:29.465017	2020-10-21 04:38:29.465017	f	61	65	15	27	27	65
96	2020-10-23 03:23:26.85681	2020-10-23 03:23:26.85681	t	61	62	18	2	2	62
97	2020-10-23 04:23:17.347614	2020-10-23 04:23:17.347614	f	61	62	19	2	2	62
109	2020-10-23 11:10:26.253672	2020-10-23 11:10:26.253672	t	61	62	20	38	38	62
110	2020-10-23 11:10:26.253672	2020-10-23 11:10:26.253672	t	61	63	20	38	38	63
114	2020-10-26 08:25:26.294173	2020-10-26 08:25:26.294173	t	61	62	14	2	2	62
115	2020-10-26 08:25:26.294173	2020-10-26 08:25:26.294173	f	61	63	14	2	2	63
132	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	61	62	17	2	2	62
133	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	61	63	17	2	2	63
134	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	61	64	17	2	2	64
135	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	61	65	17	2	2	65
136	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	61	66	17	2	2	66
137	2020-10-29 03:36:11.801751	2020-10-29 03:36:11.801751	t	61	67	17	2	2	67
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, created_at, updated_at, code, full_name, birthday, joined_date, phone, email, department_id, title_id, manager_id, status_id, created_by, updated_by) FROM stdin;
24	2020-10-29 11:41:29.314246	2020-11-02 08:45:19.037	Facere quo recusanda	jamyqapaqe	2002-10-20	2020-10-26	+1 (628) 655-3844	vojad73089@llubed.com	99	100	8	102	2	2
18	2020-10-23 03:23:26.85681	2020-10-23 03:23:26.85681	Nesciunt ea at ex i	batadomoz	1994-11-20	2020-10-23	+1 (632) 318-5535	wiwab@mailinator.com	99	100	8	102	2	2
19	2020-10-23 04:23:17.347614	2020-10-23 04:23:17.347614	H-PN01	Nguyễn Phát	2020-10-22	2020-10-23	0912345678	thienhoangntp@gmail.com	99	101	\N	102	2	2
9	2020-10-13 00:39:05.021905	2020-10-13 00:39:05.021905	344334	Phạm Văn BB	2020-10-13	2020-10-06	0987176431	test4@gmail.com	99	100	8	102	2	2
8	2020-10-09 05:35:55.253043	2020-10-13 00:39:45.055	EmP-01	Phạm Văn A	1900-10-06	2020-10-08	0987176433	test@gmail.com	99	101	\N	102	2	2
10	2020-10-13 09:48:34.347485	2020-10-13 09:48:34.347485	34443343	Phạm Văn CC	2020-10-13	2020-10-18	0987176445	test44@gmail.com	99	101	8	102	2	2
12	2020-10-15 03:37:42.629216	2020-10-15 03:37:42.629216	NVC	Nguyen Van C	1880-09-29	2020-10-14	0999999999	C@gmail.com	99	100	8	102	2	2
26	2020-11-04 07:17:20.857567	2020-11-06 03:42:34.342	TPP002	Nguyễn Xuân Bảo Khánh	2020-10-26	2020-11-08	09000000	khanh.nguyen@tpptechnology.com	99	101	\N	102	2	66
11	2020-10-13 09:51:41.41398	2020-10-15 07:13:32.045	NV12	NV 12	2020-10-13	2020-10-14	02839974546	NV1@gmail.com	99	101	9	102	2	2
27	2020-11-06 04:57:46.516491	2020-11-06 06:30:30.803	NP_003	Ngan Pham 03	1990-09-08	2019-01-14	0906397313	ngan.pham@tpptechnology.com	99	100	21	102	2	2
20	2020-10-23 07:06:39.140546	2020-10-23 11:10:26.222	NB1023	Noi bo 1023 edit	1970-11-03	2020-10-22	0101010101	noibo2@gmail.com	99	101	9	102	38	38
22	2020-10-26 10:25:35.445577	2020-11-06 06:30:56.896	NP_002	Ngan Pham 02	2000-01-15	2020-06-07	0906397313	02.np@mail.com	99	125	21	102	2	2
14	2020-10-20 04:46:16.660242	2020-10-26 08:25:26.276	NA01	Nguyen Admin	1994-08-30	2019-10-04	09090909909	luong.nguyen@tpptechnology.com	99	101	9	102	2	2
21	2020-10-23 10:19:41.24646	2020-11-06 06:31:24.589	NP_001	Ngan Pham 01	1970-01-24	2018-07-24	0906397313	01.np@gmail.com	99	101	14	102	2	2
13	2020-10-15 07:12:30.017401	2020-10-20 09:35:18.693	NVAd2	Nguyen Admin 2	2020-10-05	2020-10-21	0999999998	luongnguyenhien94@tpptechnology.com	99	101	8	102	2	2
15	2020-10-21 04:38:29.465017	2020-10-21 04:38:29.465017	hl1	Nhân Viên HL1	2020-10-14	2020-10-23	0986878787	pagexaf466@ngo1.com	99	100	8	102	27	27
16	2020-10-21 08:14:03.215314	2020-11-06 09:31:10.515	EmP-09	Pham The Son	2010-09-25	2020-10-07	0987176431	son.pham@tpptechnology.com	99	100	8	102	2	38
17	2020-10-21 08:19:06.102111	2020-10-29 03:36:11.778	NHL	Nguyen Hien Luong	2013-09-28	2020-09-26	0999999979	nguyenhienluong1234@gmail.com	99	125	8	102	2	2
23	2020-10-27 04:19:20.970764	2020-10-29 03:53:14.058	huy.sang01	Huỳnh Sang	2020-09-23	2020-10-12	0999999991	sang.huynh@tpptechnology.com	99	101	8	102	2	62
25	2020-10-30 07:21:13.328301	2020-10-30 07:21:13.328301	Duy_CAO1	Cao Quang Duy	2020-10-01	2020-10-02	01654220013	caoduy1293@gmail.com	99	100	\N	102	2	2
\.


--
-- Data for Name: features; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.features (id, created_at, updated_at, is_active, action, name, description, resource_id, created_by, updated_by) FROM stdin;
1	2020-09-22 03:47:14.770686	2020-09-22 03:47:14.770686	t	update	update	test update	1	2	2
2	2020-09-22 03:47:14.770686	2020-09-22 03:47:14.770686	t	add	add	test add	1	2	2
3	2020-09-22 03:47:14.770686	2020-09-22 03:47:14.770686	t	delete	delete	test delete	1	2	2
4	2020-09-22 03:47:14.770686	2020-09-22 03:47:14.770686	t	list	list	test list	1	2	2
5	2020-09-22 03:51:36.119517	2020-09-22 03:51:36.119517	t	update	update	test update	2	2	2
6	2020-09-22 03:51:36.119517	2020-09-22 03:51:36.119517	t	add	add	test add	2	2	2
7	2020-09-22 03:51:36.119517	2020-09-22 03:51:36.119517	t	delete	delete	test delete	2	2	2
8	2020-09-22 03:51:36.119517	2020-09-22 03:51:36.119517	t	list	list	test list	2	2	2
9	2020-09-22 04:05:19.204388	2020-09-22 04:05:19.204388	t	update	update	test update	3	2	2
10	2020-09-22 04:05:19.204388	2020-09-22 04:05:19.204388	t	add	add	test add	3	2	2
11	2020-09-22 04:05:19.204388	2020-09-22 04:05:19.204388	t	delete	delete	test delete	3	2	2
12	2020-09-22 04:05:19.204388	2020-09-22 04:05:19.204388	t	list	list	test list	3	2	2
13	2020-09-22 04:05:36.150139	2020-09-22 04:05:36.150139	t	update	update	test update	4	2	2
14	2020-09-22 04:05:36.150139	2020-09-22 04:05:36.150139	t	add	add	test add	4	2	2
15	2020-09-22 04:05:36.150139	2020-09-22 04:05:36.150139	t	delete	delete	test delete	4	2	2
16	2020-09-22 04:05:36.150139	2020-09-22 04:05:36.150139	t	list	list	test list	4	2	2
\.


--
-- Data for Name: group_values; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.group_values (id, code, name, parent_id, is_active, created_by, updated_by, created_at, updated_at) FROM stdin;
60	MD.EMPQUOTA	Hạn mức	\N	t	2	2	2020-10-30 08:52:12.652216	2020-10-30 08:52:12.652216
36	MD.DISTRICT	Quận	35	t	2	2	2020-10-09 04:45:22.856764	2020-10-09 04:45:56.93
61	MD.PROSGROUP	Nhóm ưu điểm	\N	t	2	2	2020-11-04 04:38:11.885835	2020-11-04 04:41:17.129
39	MD.STREETGROUP	Đoạn đường	38	t	2	2	2020-10-09 04:51:04.213249	2020-10-09 04:51:04.213249
41	MD.LOCATIONTYPE	Vị trí bđs	\N	t	2	2	2020-10-09 05:25:23.783969	2020-10-09 05:26:40.167
40	MD.URGENT	Mức độ bán	\N	t	2	2	2020-10-09 05:19:05.694157	2020-10-09 05:27:48.212
43	MD.EMPTITLE	Cấp bậc	\N	t	2	2	2020-10-09 05:29:49.704292	2020-10-09 05:29:49.704292
44	MD.EMPSTATUS	Tình trạng nhân viên	\N	t	2	2	2020-10-09 05:32:00.719037	2020-10-09 05:32:00.719037
63	MD.CONSGROUP	Nhóm nhược điểm	\N	t	2	2	2020-11-04 04:46:04.926412	2020-11-04 04:46:04.926412
62	MD.PROSTYPE	Loại ưu điểm	61	t	2	2	2020-11-04 04:45:33.057164	2020-11-04 04:46:38.922
64	MD.CONSTYPE	Loại nhược điểm	63	t	2	2	2020-11-04 04:47:24.814206	2020-11-04 04:47:24.814206
65	MD.POSITIONGROUP	Nhóm vị trí	\N	t	66	66	2020-11-05 06:33:22.958229	2020-11-05 06:33:22.958229
48	MD.PROPERTYTYPe	Loại đất	\N	t	2	2	2020-10-09 06:39:11.351456	2020-10-09 06:39:11.351456
49	MD.PROPERTYUSING	Hình thức sử dụng	\N	t	2	2	2020-10-09 06:40:07.629212	2020-10-09 06:40:07.629212
50	MD.PROPERTYPERIOD	Thời gian sử dụng	\N	t	2	2	2020-10-09 06:40:40.447046	2020-10-09 06:40:40.447046
66	MD.PRICEPOINT	Đơn giá đất điểm giá	39	t	66	66	2020-11-05 07:31:09.878723	2020-11-05 07:31:09.878723
45	MD.EMPQUOTA.SLQT	Hạn mức quan tâm	\N	t	2	2	2020-10-09 05:33:28.471955	2020-10-09 07:02:19.516
47	MD.EMPQUOTA.PKT	Hạn mức phân khúc từ	\N	t	2	2	2020-10-09 05:44:48.635856	2020-10-09 07:03:44.195
46	MD.EMPQUOTA.SLBDS	Hạn mức bất động sản	\N	t	2	2	2020-10-09 05:39:38.018541	2020-10-09 07:03:50.783
52	MD.EMPQUOTA.PKD	Hạn mức phân khúc đến	\N	t	2	2	2020-10-09 07:04:19.896799	2020-10-09 07:04:32.213
53	MD.EMPQUOTA.THM	Hạn mức tổng	\N	t	2	2	2020-10-09 07:05:12.685713	2020-10-09 07:05:12.685713
54	MD.EMPQUOTA-UNIT.TT	ĐVT Thông tin	\N	t	2	2	2020-10-09 07:13:02.880925	2020-10-09 07:23:42.112
51	MD.REJECT	Lý do từ chối	\N	t	2	2	2020-10-09 06:51:28.796253	2020-10-09 08:10:56.609
42	MD.DEPARTMENT	Phòng ban	\N	t	2	2	2020-10-09 05:28:59.245029	2020-10-09 10:18:09.137
79	COOWNER	Chung	49	f	56	56	2020-11-05 09:10:48.984415	2020-11-06 02:47:23.896
78	ALLEY	Hẻm	41	f	56	56	2020-11-05 08:48:29.949275	2020-11-06 02:47:34.554
55	MD.EMPQUOTA-UNIT.TD	ĐVT Tỷ đồng	\N	t	2	2	2020-10-09 07:16:17.331756	2020-10-14 09:30:27.945
35	MD.CITY	Thành phố	\N	t	2	2	2020-10-09 04:44:53.821779	2020-10-14 09:44:04.863
38	MD.STREET	Đường	36	t	2	2	2020-10-09 04:48:22.382867	2020-10-14 09:45:06.474
77	PNK	Đất phi nông nghiệp khác	48	f	56	56	2020-11-05 08:39:47.306007	2020-11-06 02:48:32.181
37	MD.WARD	Phường	36	t	2	2	2020-10-09 04:46:34.044448	2020-10-15 03:57:50.638
76	SKC	Đất cơ sở sản xuất phi nông nghiệp	48	f	56	56	2020-11-05 08:38:50.398429	2020-11-06 02:48:42.377
75	SKK	Đất khu công nghiệp	48	f	56	56	2020-11-05 08:38:02.563367	2020-11-06 02:48:51.747
56	MD.TEST	 Test	\N	f	2	2	2020-10-15 04:03:40.349484	2020-10-15 04:06:41.421
57	MD.COMPANYLIST	Tên Công Ty	\N	t	2	2	2020-10-15 10:37:12.733505	2020-10-15 10:37:12.733505
58	MD.COLLABTYPE	Cấp bậc cộng tác	\N	t	2	2	2020-10-15 10:39:28.363746	2020-10-15 10:39:28.363746
74	ONT	Đất ở tại nông thôn	48	f	56	56	2020-11-05 08:37:22.079847	2020-11-06 02:49:01.393
73	DCH	Đất chợ	48	f	56	56	2020-11-05 08:36:27.93386	2020-11-06 02:49:07.304
72	TMD	Đất thương mại, dịch vụ	48	f	56	56	2020-11-05 08:31:38.108539	2020-11-06 02:49:12.694
59	TESTSON	TESTSON_DEACTIVE	\N	f	2	2	2020-10-16 10:37:16.980488	2020-10-20 08:25:54.177
71	ODT	Đất ở tại đô thị	48	f	56	56	2020-11-05 08:31:06.165851	2020-11-06 02:49:19.222
70	COLD	Thấp	40	t	56	56	2020-11-05 08:29:26.188882	2020-11-06 02:49:24.188
69	HOT	Cao	40	f	56	56	2020-11-05 08:29:09.735072	2020-11-06 02:49:41.914
68	URGENT	Gấp	40	f	56	56	2020-11-05 08:28:44.234808	2020-11-06 02:54:05.539
67	MTT01	Mặt tiền thụt	41	f	56	56	2020-11-05 08:27:51.401756	2020-11-06 02:54:15.048
\.


--
-- Data for Name: inspection_statement_notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspection_statement_notes (id, created_at, updated_at, note_id, note_type, execution_date, assignee_id, company_id, instructor_id, status, is_deleted, rejection_note, property_id, created_by, updated_by, approved_by, street_number, city_id, ward_id, district_id, street_id, street_group_id, position_group_id, address, other_address, location_description, closed_deal_value, transaction_date, broker_id, approved_at, land_use_rights, construction, total_adjustment, market_land_unit_price, total_advantage_level, total_disadvantage_level, rejected_at, rejected_by) FROM stdin;
4	2020-11-04 07:21:44.782673	2020-11-04 07:21:44.782673	KH20q1003301	\N	\N	64	\N	\N	Nháp	f		77	64	64	\N	2910	61	68	62	73	\N	\N	2910, 73, Bến Nghé, Quận 1, Hồ Chí Minh, 	f		1	\N	62	\N	{"KHT10": "1", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 1, "KHNT14": 1, "KHTL21": 0.5, "KHCD116": 1, "KHCD217": 1, "KHTBD11": "1", "KHDTCN19": 1, "KHDTCN26": 0, "KHDTKV27": 2, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 1, "KHDTVT3485": 0, "KHHSVT1482": 1, "KHTLDTCN24": 1}	{"KHHT28": {"label": "true", "value": true}, "KHTDTS38": 0, "KHDTSDTT40": 0, "KHGTCTXD42": 0, "attachments": []}	0.16	0	\N	\N	\N	\N
5	2020-11-04 07:21:51.880284	2020-11-04 07:21:51.880284	KH20q1003302	\N	\N	64	\N	\N	Nháp	f		77	64	64	\N	2910	61	68	62	73	\N	\N	2910, 73, Bến Nghé, Quận 1, Hồ Chí Minh, 	f		1	\N	62	\N	{"KHT10": "1", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 1, "KHNT14": 1, "KHTL21": 0.5, "KHCD116": 1, "KHCD217": 1, "KHTBD11": "1", "KHDTCN19": 1, "KHDTCN26": 0, "KHDTKV27": 2, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 1, "KHDTVT3485": 0, "KHHSVT1482": 1, "KHTLDTCN24": 1}	{"KHHT28": {"label": "true", "value": true}, "KHTDTS38": 0, "KHDTSDTT40": 0, "KHGTCTXD42": 0, "attachments": []}	0.16	0	\N	\N	\N	\N
6	2020-11-04 07:24:33.261217	2020-11-04 07:24:33.261217	KH20q1000401	\N	\N	64	\N	\N	Nháp	f		47	64	64	\N	91	61	68	62	73	\N	\N	91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, 	f		91	\N	2	\N	{"KHT10": "91", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 91, "KHNT14": 91, "KHTL21": 0.5, "KHCD116": 1, "KHCD217": 1, "KHTBD11": "1", "KHDTCN19": 1, "KHDTCN26": 0, "KHDTKV27": 2, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 1, "KHDTVT3485": 0, "KHHSVT1482": 1, "KHTLDTCN24": 1}	{"KHHT28": {"label": "true", "value": true}, "KHTDTS38": 0, "KHDTSDTT40": 0, "KHGTCTXD42": 0, "attachments": []}	0.12	0	\N	\N	\N	\N
2	2020-11-04 02:52:33.674435	2020-11-06 09:45:38.137092	KH20q1003602	\N	2020-11-06 09:44:14.331	64	\N	61	Nháp	f		80	64	64	\N	746	61	69	62	122	\N	\N	746, Lê Văn Sỹ  1, Bến Thành, Quận 1, Hồ Chí Minh, 	f	Molestiae enim est e	141	\N	61	\N	{"KHT10": "Inventore quis occae", "KHHS22": 9.05, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 99, "KHNT14": 21, "KHTL21": 0.734375, "KHCD116": 65, "KHCD217": 61, "KHTBD11": "Qui facilis velit vo", "KHDTCN19": 17, "KHDTCN26": 15.99, "KHDTKV27": 64, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 47, "KHHSDCN25": 1.01, "KHDTCNQH23": 1.01, "KHDTVT1481": 80, "KHDTVT2483": 40, "KHDTVT3485": -103, "KHHSVT1482": 1, "KHHSVT2484": 0.63, "KHHSVT3486": 0.41, "KHTLDTCN24": 0.05941176470588235}	{"KHH30": 9, "KHL31": 28, "KHHT28": {"label": "true", "value": true}, "KHKC33": "Beatae repellendus ", "KHST32": 664, "KHTN29": 81, "KHCLCL34": 0.9, "KHDGXM41": 70, "KHDTXL35": 81, "KHTDTS38": 125, "KHDTSCN36": 55, "KHDTSDPS39": 42, "KHDTSDTT40": 167, "KHDTSKCN37": 70, "KHGTCTXD42": 10521, "attachments": []}	-0.11	-16	\N	\N	\N	\N
1	2020-11-03 10:12:47.691534	2020-11-06 09:14:23.137948	KH20q1001601	Hiện trạng	2020-11-06 09:08:34.635	64	\N	61	Chờ duyệt	f		59	64	64	\N	123 son	61	68	62	74	94	179	123 son, Trần Hưng Đạo, Bến Nghé, Quận 1, Hồ Chí Minh, 	t	Temporibus harum con	5454	\N	2	\N	{"KHT10": "5445", "KHHS22": 0.17, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 545, "KHNT14": 545, "KHTL21": 0.5449640287769785, "KHCD116": 5454, "KHCD217": 5454, "KHTBD11": "5454", "KHDTCN19": 4554, "KHDTCN26": -900, "KHDTKV27": 10008, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "117", "value": 117}, "KHDTKCN20": 5454, "KHHSDCN25": 3.99, "KHDTCNQH23": 5454, "KHDTVT1481": 52, "KHDTVT2483": 100, "KHDTVT3485": 4402, "KHHSVT1482": 1, "KHHSVT2484": 0.71, "KHHSVT3486": 0.63, "KHTLDTCN24": 1.1976284584980237}	{"KHH30": 7, "KHL31": 5, "KHHT28": {"label": "true", "value": true}, "KHKC33": "Officia ullamco ipsa", "KHST32": 1, "KHTN29": 17, "KHCLCL34": 0.63, "KHDGXM41": 30, "KHDTXL35": 89, "KHTDTS38": 95, "KHDTSCN36": 45, "KHDTSDPS39": 3, "KHDTSDTT40": 98, "KHDTSKCN37": 50, "KHGTCTXD42": 1852.2, "attachments": []}	0	0	\N	\N	\N	\N
9	2020-11-04 07:35:07.880519	2020-11-04 08:43:57.420304	KH20q1004501	\N	\N	64	\N	25	Nháp	f		77	66	64	\N	2910	61	68	62	73	\N	\N		f		1	\N	62	\N	{"KHT10": "1", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 1, "KHNT14": 1, "KHTL21": 0, "KHCD116": 1, "KHCD217": 1, "KHTBD11": "1", "KHDTCN19": 1, "KHDTCN26": 0, "KHDTKV27": 0, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 1, "KHHSDCN25": 0.3, "KHDTCNQH23": 0.3, "KHDTVT3485": 0, "KHHSVT1482": 1, "KHTLDTCN24": 0}	{"KHH30": 1, "KHL31": 1, "KHHT28": {"label": "true", "value": true}, "KHKC33": "asdasd", "KHST32": 1, "KHTN29": 12, "KHCLCL34": 0.9, "KHDGXM41": 45, "KHDTXL35": 100, "KHTDTS38": 620, "KHDTSCN36": 500, "KHDTSDPS39": 90, "KHDTSDTT40": 710, "KHDTSKCN37": 120, "KHGTCTXD42": 28755, "attachments": []}	0.36	0	\N	\N	\N	\N
11	2020-11-04 10:05:48.018951	2020-11-06 07:45:47.155218	KH20q1002301	Hiện trạng	2020-11-06 07:44:03.948	66	128	\N	Nháp	f		67	64	66	\N	001DEMo	61	232	64	82	90	179	001DEMo, Cách Mạng Tháng Tám, Phường 3, Quận 3, Hồ Chí Minh, 	t	asdasd	15	\N	2	\N	{"KHT10": "3", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 5, "KHNT14": 5, "KHTL21": 0.2, "KHCD116": 20, "KHCD217": 20, "KHTBD11": "15", "KHDTCN19": 80, "KHDTCN26": 0, "KHDTKV27": 100, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 20, "KHHSDCN25": 0.8, "KHDTCNQH23": 80, "KHDTVT1481": 35, "KHDTVT2483": 35, "KHDTVT3485": 10, "KHHSVT1482": 1, "KHHSVT2484": 0.22, "KHHSVT3486": 0.1, "KHTLDTCN24": 1}	{"KHH30": 1, "KHL31": 1, "KHHT28": {"label": "true", "value": true}, "KHKC33": "Fugiat doloremque v", "KHST32": 1, "KHTN29": 12, "KHCLCL34": 0.9, "KHDGXM41": 35, "KHDTXL35": 100, "KHTDTS38": 300, "KHDTSCN36": 200, "KHDTSDPS39": 25, "KHDTSDTT40": 325, "KHDTSKCN37": 100, "KHGTCTXD42": 10237.5, "attachments": []}	0.1	2	\N	\N	\N	\N
10	2020-11-04 08:44:45.109488	2020-11-05 10:46:59.339832	KH20q1004502	\N	2020-11-05 10:46:33.68	64	\N	25	Nháp	f		89	64	64	\N	302	61	68	62	122	\N	\N	302, 122, Bến Nghé, Quận 1, Hồ Chí Minh, 	f		12	\N	25	\N	{"KHT10": "5", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 5, "KHNT14": 5, "KHTL21": 0.2, "KHCD116": 25, "KHCD217": 25, "KHTBD11": "167", "KHDTCN19": 100, "KHDTCN26": 100, "KHDTKV27": 125, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 25, "KHHSDCN25": 0.9, "KHDTCNQH23": 0, "KHDTVT3485": 0, "KHHSVT1482": 1, "KHTLDTCN24": 0}	{"KHH30": 0, "KHL31": 0, "KHHT28": {"label": "true", "value": true}, "KHKC33": "asdasd", "KHST32": 0, "KHTN29": 5, "KHCLCL34": 1, "KHDGXM41": 10, "KHDTXL35": 100, "KHTDTS38": 150, "KHDTSCN36": 150, "KHDTSDPS39": 0, "KHDTSDTT40": 150, "KHDTSKCN37": 0, "KHGTCTXD42": 1500, "attachments": [{"key": "1604573208855", "url": "https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604573208855", "size": "13395", "mimeType": "image/jpeg"}, {"key": "1604573215575", "url": "https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604573215575", "size": "13452", "mimeType": "application/pdf"}]}	0	0	\N	\N	\N	\N
12	2020-11-05 06:34:55.023445	2020-11-06 10:09:20.237099	KH20q1004503	Hiện trạng	2020-11-06 10:08:21.138	64	\N	25	Nháp	f		89	66	64	\N	302	61	68	62	122	178	180	302, 122, Bến Nghé, Quận 1, Hồ Chí Minh, 	t		12	\N	25	\N	{"KHT10": "5", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 10, "KHNT14": 5, "KHTL21": 0.1111111111111111, "KHCD116": 25, "KHCD217": 25, "KHTBD11": "167", "KHDTCN19": 200, "KHDTCN26": 145, "KHDTKV27": 225, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 25, "KHDTCNQH23": 55, "KHDTVT1481": 30, "KHDTVT2483": 30, "KHDTVT3485": 85, "KHHSVT1482": 1, "KHHSVT2484": 0.2, "KHHSVT3486": 0.2, "KHTLDTCN24": 0.275}	{"KHHT28": {"label": "true", "value": true}, "KHTDTS38": 0, "KHDTSDTT40": 0, "KHGTCTXD42": 0, "attachments": []}	0	0	\N	\N	\N	\N
20	2020-11-05 09:02:24.08543	2020-11-06 07:29:44.675991	KH20q1003603	Hiện trạng	2020-11-05 10:11:46.291	64	128	61	Từ chối	f	Thiếu thông tin 1	80	64	64	\N	746	61	69	62	74	94	179	746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, 	f	Ea voluptatem Volup	141	\N	61	\N	{"KHT10": "Inventore quis occae", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 12, "KHNT14": 12, "KHTL21": 0.5, "KHCD116": 12, "KHCD217": 12, "KHTBD11": "Qui facilis velit vo", "KHDTCN19": 55, "KHDTCN26": 45, "KHDTKV27": 110, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 55, "KHHSDCN25": 0.1, "KHDTCNQH23": 10, "KHDTVT1481": 55, "KHDTVT2483": 31, "KHDTVT3485": -31, "KHHSVT1482": 1, "KHHSVT2484": 0.7, "KHHSVT3486": 0.3, "KHTLDTCN24": 0.18181818181818182}	{"KHHT28": {"label": "false", "value": false}, "attachments": []}	0.05	7	\N	\N	2020-11-06 07:29:44.661	64
18	2020-11-05 07:44:26.122583	2020-11-06 07:43:24.453949	KH20q1004506	Hiện trạng	2020-11-06 07:40:10.813	64	128	25	Từ chối	f	tao thích	89	64	64	\N	302	61	68	62	122	94	179	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	t	Labore quam elit ne	12	\N	25	\N	{"KHT10": "5", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 5, "KHNT14": 5, "KHTL21": 0.2, "KHCD116": 25, "KHCD217": 25, "KHTBD11": "167", "KHDTCN19": 100, "KHDTCN26": 10, "KHDTKV27": 125, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 25, "KHHSDCN25": 0.1, "KHDTCNQH23": 90, "KHDTVT1481": 55, "KHDTVT2483": 33, "KHDTVT3485": 12, "KHHSVT1482": 1, "KHHSVT2484": 0.12, "KHHSVT3486": 0.12, "KHTLDTCN24": 0.9}	{"KHHT28": {"label": "false", "value": false}, "KHTDTS38": 0, "KHDTSDTT40": 0, "KHGTCTXD42": 0, "attachments": []}	0	0	\N	\N	2020-11-06 07:43:24.442	64
3	2020-11-04 07:11:56.409348	2020-11-05 09:14:08.867595	KH20q1003401	Hiện trạng	2020-10-09 05:03:25.241	64	\N	69	Đã duyệt	f		78	64	2	2	29/10/02	61	68	62	74	74	74	29/10/02, 74, Bến Nghé, Quận 1, Hồ Chí Minh, 	f		2	\N	60	2020-11-05 09:14:08.867	{"KHT10": "1", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 1, "KHNT14": 1, "KHTL21": 0.5, "KHCD116": 1, "KHCD217": 1, "KHTBD11": "1", "KHDTCN19": 1, "KHDTCN26": 0, "KHDTKV27": 2, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 1, "KHDTVT3485": 0, "KHHSVT1482": 1, "KHTLDTCN24": 1}	{"KHHT28": {"label": "true", "value": true}, "KHTDTS38": 0, "KHDTSDTT40": 0, "KHGTCTXD42": 0, "attachments": []}	1	1	\N	\N	\N	\N
17	2020-11-05 07:33:03.856292	2020-11-06 10:41:32.461014	KH20q1003303	Hiện trạng	2020-11-06 10:40:57.795	56	128	\N	Nháp	f		73	64	56	\N	43	61	232	64	82	90	179	43, Cách Mạng Tháng Tám, Phường 3, Quận 3, Hồ Chí Minh, 	t	asdasd	23	\N	2	\N	{"KHT10": "2", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 4, "KHNT14": 4, "KHTL21": 0.5454545454545454, "KHCD116": 4, "KHCD217": 4, "KHTBD11": "3", "KHDTCN19": 5, "KHDTCN26": 4.78, "KHDTKV27": 11, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 6, "KHHSDCN25": 0.22, "KHDTCNQH23": 0.22, "KHDTVT1481": 33, "KHDTVT2483": 33, "KHDTVT3485": -61, "KHHSVT1482": 1, "KHHSVT2484": 0.25, "KHHSVT3486": 0.12, "KHTLDTCN24": 0.044}	{"KHHT28": {"label": "false", "value": false}, "KHTDTS38": 0, "KHDTSDTT40": 0, "KHGTCTXD42": 0, "attachments": []}	0	0	\N	\N	\N	\N
7	2020-11-04 07:24:40.224032	2020-11-05 09:33:04.445834	KH20q1000402	Hiện trạng	2020-11-04 07:24:40.224	64	\N	69	Đã duyệt	f		47	64	2	2	91	61	68	62	73	73	73	91, 73, Bến Nghé, Quận 1, Hồ Chí Minh, 	f		91	\N	2	2020-11-05 09:33:04.447	{"KHT10": "91", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 91, "KHNT14": 91, "KHTL21": 0.5, "KHCD116": 1, "KHCD217": 1, "KHTBD11": "1", "KHDTCN19": 1, "KHDTCN26": 0, "KHDTKV27": 2, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 1, "KHDTVT3485": 0, "KHHSVT1482": 1, "KHTLDTCN24": 1}	{"KHHT28": {"label": "true", "value": true}, "KHTDTS38": 0, "KHDTSDTT40": 0, "KHGTCTXD42": 0, "attachments": []}	0.12	1	\N	\N	\N	\N
8	2020-11-04 07:26:37.734464	2020-11-06 10:11:47.379309	KH20q1000403	Hiện trạng	2020-11-06 10:10:05.628	64	\N	\N	Nháp	f		47	64	64	\N	91	61	68	62	122	178	179	91, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	f	Aute et voluptatem a	91	\N	2	\N	{"KHT10": "91", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 5, "KHNT14": 5, "KHTL21": 0.18032786885245902, "KHCD116": 12, "KHCD217": 12, "KHTBD11": "1", "KHDTCN19": 100, "KHDTCN26": 65, "KHDTKV27": 122, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 22, "KHHSDCN25": 0.55, "KHDTCNQH23": 35, "KHDTVT1481": 12, "KHDTVT2483": 12, "KHDTVT3485": 41, "KHHSVT1482": 1, "KHHSVT2484": 0.7, "KHHSVT3486": 0.6, "KHTLDTCN24": 0.35}	{"KHHT28": {"label": "true", "value": true}, "KHTDTS38": 0, "KHDTSDTT40": 0, "KHGTCTXD42": 0, "attachments": []}	0.22	20	\N	\N	\N	\N
15	2020-11-05 07:16:18.737185	2020-11-05 09:46:07.253069	KH20q1004504	Hiện trạng	2020-11-05 09:38:19.51	64	128	25	Đã duyệt	f		89	66	2	2	303	61	68	62	122	178	180	223 address aaa	t	Test	12	\N	25	2020-11-05 09:46:07.247	{"KHT10": "5", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 5, "KHNT14": 5, "KHTL21": 0, "KHCD116": 25, "KHCD217": 25, "KHTBD11": "167", "KHDTCN19": 100, "KHDTCN26": 0, "KHDTKV27": 0, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 25, "KHHSDCN25": 0.8, "KHDTCNQH23": 0.8, "KHDTVT1481": 20, "KHDTVT2483": 25, "KHDTVT3485": 0, "KHHSVT1482": 1, "KHHSVT2484": 0.8, "KHHSVT3486": 0.5, "KHTLDTCN24": 0}	{"KHH30": 2, "KHL31": 2, "KHHT28": {"label": "true", "value": true}, "KHKC33": "haha", "KHST32": 2, "KHTN29": 2, "KHCLCL34": 0.9, "KHDGXM41": 300000, "KHDTXL35": 300, "KHTDTS38": 0, "KHDTSCN36": 250, "KHDTSDPS39": 30, "KHDTSDTT40": 0, "KHDTSKCN37": 45, "KHGTCTXD42": 0, "attachments": []}	0.02	0	\N	\N	\N	\N
26	2020-11-06 10:34:47.173138	2020-11-06 10:41:52.403247	KH20q1003202	Hiện trạng	\N	64	128	\N	Nháp	f		76	64	64	\N	2910N1	61	68	62	74	94	179	2910N1, Trần Hưng Đạo, Bến Nghé, Quận 1, Hồ Chí Minh, 	f	Labore quam elit ne	\N	\N	60	\N	{"KHT10": null, "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 40, "KHNT14": 35, "KHTL21": 0.06666666666666667, "KHCD116": 20, "KHCD217": 30, "KHTBD11": null, "KHDTCN19": 700, "KHDTCN26": 0, "KHDTKV27": 750, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 50, "KHHSDCN25": 0.46, "KHDTCNQH23": null, "KHDTVT1481": 100, "KHDTVT2483": 100, "KHDTVT3485": -200, "KHHSVT1482": 1, "KHHSVT2484": 0.5, "KHHSVT3486": 0.5, "KHTLDTCN24": 0}	{"KHHT28": {"label": "true", "value": true}, "KHTDTS38": 420, "KHDTSCN36": 300, "KHDTSDPS39": 12, "KHDTSDTT40": 432, "KHDTSKCN37": 120, "KHGTCTXD42": 0, "attachments": []}	0.1	0	\N	\N	\N	\N
19	2020-11-05 08:04:34.421712	2020-11-05 11:11:19.063063	KH20q1003604	Hiện trạng	2020-11-05 10:15:08.304	64	128	61	Đã duyệt	f		80	66	64	64	746	61	69	62	74	94	180	746, Trần Hưng Đạo, Bến Thành, Quận 1, Hồ Chí Minh, 	f	Aute et voluptatem a	141	\N	61	2020-11-05 11:11:19.044	{"KHT10": "Inventore quis occae", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 12, "KHNT14": 12, "KHTL21": 0.2619047619047619, "KHCD116": 12, "KHCD217": 12, "KHTBD11": "Qui facilis velit vo", "KHDTCN19": 155, "KHDTCN26": 140, "KHDTKV27": 210, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 55, "KHHSDCN25": 0.45, "KHDTCNQH23": 15, "KHDTVT1481": 30, "KHDTVT2483": 30, "KHDTVT3485": 95, "KHHSVT1482": 1, "KHHSVT2484": 0.33, "KHHSVT3486": 0.45, "KHTLDTCN24": 0.0967741935483871}	{"KHH30": 1, "KHL31": 1, "KHHT28": {"label": "true", "value": true}, "KHKC33": "Fugiat doloremque v", "KHST32": 1, "KHTN29": 5, "KHCLCL34": 0.9, "KHDGXM41": 35, "KHDTXL35": 100, "KHTDTS38": 210, "KHDTSCN36": 200, "KHDTSDPS39": 55, "KHDTSDTT40": 265, "KHDTSKCN37": 10, "KHGTCTXD42": 8347.5, "attachments": []}	0.14	0	\N	\N	\N	\N
21	2020-11-05 15:35:20.377393	2020-11-05 15:36:33.415785	KH20q1004505	Hiện trạng	2020-11-03 15:32:53.106	66	128	25	Đã duyệt	f		89	66	66	66	302	61	68	62	122	178	179	302, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	f	haha	12	\N	25	2020-11-05 15:36:33.398	{"KHT10": "5", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 5, "KHNT14": 5, "KHTL21": 0.2, "KHCD116": 25, "KHCD217": 25, "KHTBD11": "167", "KHDTCN19": 100, "KHDTCN26": 10, "KHDTKV27": 125, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 25, "KHHSDCN25": 0.9, "KHDTCNQH23": 90, "KHDTVT1481": 10, "KHDTVT2483": 5, "KHDTVT3485": 85, "KHHSVT1482": 1, "KHHSVT2484": 0.8, "KHHSVT3486": 0.45, "KHTLDTCN24": 0.9}	{"KHH30": 2, "KHL31": 2, "KHHT28": {"label": "true", "value": true}, "KHKC33": "haha", "KHST32": 2, "KHTN29": 2, "KHCLCL34": 0.95, "KHDGXM41": 400000, "KHDTXL35": 100, "KHTDTS38": 300, "KHDTSCN36": 250, "KHDTSDPS39": 40, "KHDTSDTT40": 340, "KHDTSKCN37": 50, "KHGTCTXD42": 129200000, "attachments": []}	0	0	\N	\N	\N	\N
27	2020-11-06 15:00:08.442741	2020-11-06 15:00:08.442741	KH20q1004001	Hiện trạng	2020-11-06 14:59:02.292	56	128	27	Nháp	f		84	56	56	\N	44444	61	68	62	73	94	179	44444, Cách Mạng Tháng Tám 1, Bến Nghé, Quận 1, Hồ Chí Minh, 	f	13334	\N	\N	\N	\N	{"KHT10": "45", "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 5, "KHNT14": 5, "KHTL21": 0.5, "KHCD116": 54, "KHCD217": 54, "KHTBD11": "54", "KHDTCN19": 45, "KHDTCN26": -9, "KHDTKV27": 90, "KHHTSD18": {"label": "114", "value": 114}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 45, "KHDTCNQH23": 54, "KHDTVT1481": 2, "KHDTVT2483": 3, "KHDTVT3485": -14, "KHHSVT1482": 1, "KHHSVT2484": 0.4, "KHHSVT3486": 0.5, "KHTLDTCN24": 1.2}	{"KHHT28": {"label": "false", "value": false}, "attachments": []}	0	0	\N	\N	\N	\N
25	2020-11-06 10:21:56.522163	2020-11-06 10:28:40.979758	KH20q1003201	Hiện trạng	2020-11-05 10:27:27.492	64	128	\N	Nháp	f		76	64	64	\N	2910N1	61	68	62	74	94	179	2910N1, Trần Hưng Đạo, Bến Nghé, Quận 1, Hồ Chí Minh, 	f	Labore quam elit ne	7	\N	60	\N	{"KHT10": null, "KHHS22": 0.3, "KHLD12": {"label": "113", "value": 113}, "KHNS15": 40, "KHNT14": 35, "KHTL21": 0.06666666666666667, "KHCD116": 20, "KHCD217": 30, "KHTBD11": null, "KHDTCN19": 700, "KHDTCN26": 550, "KHDTKV27": 750, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 50, "KHHSDCN25": 0.5, "KHDTCNQH23": 150, "KHDTVT3485": 0, "KHHSVT1482": 1, "KHTLDTCN24": 0.21428571428571427}	{"KHH30": 3, "KHL31": 3, "KHHT28": {"label": "true", "value": true}, "KHST32": 3, "KHTN29": 12, "KHDTXL35": 70, "KHTDTS38": 570, "KHDTSCN36": 300, "KHDTSDPS39": 20, "KHDTSDTT40": 590, "KHDTSKCN37": 270, "KHGTCTXD42": 0, "attachments": []}	0	0	\N	\N	\N	\N
22	2020-11-06 04:09:16.907636	2020-11-06 04:15:20.648405	KH20q1004801	Hiện trạng	2020-11-06 04:09:13.232	66	128	68	Đã duyệt	f		92	66	66	66	412	61	68	62	122	178	179	412, Lê Văn Sỹ  1, Bến Nghé, Quận 1, Hồ Chí Minh, 	t	Test	16	\N	68	2020-11-06 04:15:20.643	{"KHT10": "45", "KHHS22": 0.3, "KHLD12": {"label": "194", "value": 194}, "KHNS15": 6, "KHNT14": 5, "KHTL21": 0.1111111111111111, "KHCD116": 25, "KHCD217": 26, "KHTBD11": "128", "KHDTCN19": 120, "KHDTCN26": 20, "KHDTKV27": 135, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 15, "KHHSDCN25": 1, "KHDTCNQH23": 100, "KHDTVT1481": 5, "KHDTVT2483": 3, "KHDTVT3485": 112, "KHHSVT1482": 1, "KHHSVT2484": 0.57, "KHHSVT3486": 0.6, "KHTLDTCN24": 0.8333333333333334}	{"KHH30": 1, "KHL31": 0, "KHHT28": {"label": "true", "value": true}, "KHKC33": "haha", "KHST32": 1, "KHTN29": 3, "KHCLCL34": 0.95, "KHDGXM41": 100000, "KHDTXL35": 125, "KHTDTS38": 420, "KHDTSCN36": 300, "KHDTSDPS39": 20, "KHDTSDTT40": 440, "KHDTSKCN37": 120, "KHGTCTXD42": 41800000, "attachments": []}	0.04	1	\N	\N	\N	\N
23	2020-11-06 07:50:54.125499	2020-11-06 07:55:06.402995	KH200020	Hiện trạng	\N	66	128	\N	Nháp	f		47	66	2	\N	\N	\N	\N	\N	\N	\N	\N		f		0	\N	\N	\N	{"KHHS22": 0.3, "KHLD12": {"label": "undefined"}, "KHHTSD18": {"label": "undefined"}, "KHTHSD13": {"label": "undefined"}, "KHHSVT1482": 1}	{"KHHT28": {"label": "undefined"}, "attachments": []}	0	0	\N	\N	\N	\N
24	2020-11-06 09:36:41.870616	2020-11-06 09:55:38.765235	KH20q3000201	Hiện trạng	2020-11-06 09:50:38.483	66	128	68	Đã duyệt	f		96	66	66	66	611/Q3	61	232	64	82	178	179	611/Q3, Cách Mạng Tháng Tám, Phường 3, Quận 3, Hồ Chí Minh, 	f	Test	15	\N	68	2020-11-06 09:55:38.756	{"KHT10": "25", "KHHS22": 0.3, "KHLD12": {"label": "194", "value": 194}, "KHNS15": 4, "KHNT14": 4, "KHTL21": 0, "KHCD116": 25, "KHCD217": 25, "KHTBD11": "50", "KHDTCN19": 100, "KHDTCN26": 100, "KHDTKV27": 100, "KHHTSD18": {"label": "116", "value": 116}, "KHTHSD13": {"label": "115", "value": 115}, "KHDTKCN20": 0, "KHHSDCN25": 0.6, "KHDTCNQH23": 0, "KHDTVT1481": 80, "KHDTVT2483": 10, "KHDTVT3485": 10, "KHHSVT1482": 1, "KHHSVT2484": 0.8, "KHHSVT3486": 0.7, "KHTLDTCN24": 0}	{"KHH30": 0, "KHL31": 0, "KHHT28": {"label": "true", "value": true}, "KHKC33": "haha", "KHST32": 1, "KHTN29": 4, "KHCLCL34": 0.98, "KHDGXM41": 100000, "KHDTXL35": 110, "KHTDTS38": 440, "KHDTSCN36": 400, "KHDTSDPS39": 20, "KHDTSDTT40": 460, "KHDTSKCN37": 40, "KHGTCTXD42": 45080000, "attachments": []}	0.04	0	\N	\N	\N	\N
\.


--
-- Data for Name: master_values; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.master_values (id, group_id, group_code, group_name, value_code, parent_id, is_active, created_by, updated_by, created_at, updated_at, value_name, custom_data) FROM stdin;
61	35	MD.CITY	Thành phố	hcm	\N	t	2	2	2020-10-09 04:52:36.595608	2020-10-09 04:52:36.595608	Hồ Chí Minh	\N
62	36	MD.DISTRICT	Quận	q1	61	t	2	2	2020-10-09 04:52:57.875902	2020-10-09 04:52:57.875902	Quận 1	\N
63	36	MD.DISTRICT	Quận	q2	61	t	2	2	2020-10-09 04:53:11.631608	2020-10-09 04:53:11.631608	Quận 2	\N
64	36	MD.DISTRICT	Quận	q3	61	t	2	2	2020-10-09 04:53:25.447491	2020-10-09 04:53:25.447491	Quận 3	\N
65	36	MD.DISTRICT	Quận	q4	61	t	2	2	2020-10-09 04:53:42.824236	2020-10-09 04:53:42.824236	Quận 4	\N
66	36	MD.DISTRICT	Quận	q5	61	t	2	2	2020-10-09 04:53:59.947414	2020-10-09 04:53:59.947414	Quận 5	\N
67	36	MD.DISTRICT	Quận	qtanbinh	61	t	2	2	2020-10-09 04:54:20.404663	2020-10-09 04:54:20.404663	Quận Tân Bình	\N
68	37	MD.WARD	Phường	bennghe	62	t	2	2	2020-10-09 04:55:10.870874	2020-10-09 04:55:10.870874	Bến Nghé	\N
69	37	MD.WARD	Phường	benthanh	62	t	2	2	2020-10-09 04:55:26.694259	2020-10-09 04:55:26.694259	Bến Thành	\N
70	37	MD.WARD	Phường	caukho	62	t	2	2	2020-10-09 04:55:47.462924	2020-10-09 04:55:47.462924	Cầu Kho	\N
71	37	MD.WARD	Phường	cauonglanh	62	t	2	2	2020-10-09 04:56:04.988729	2020-10-09 04:56:04.988729	Cầu Ông Lãnh	\N
72	37	MD.WARD	Phường	cogiang	62	t	2	2	2020-10-09 04:56:22.419786	2020-10-09 04:56:22.419786	Cô Giang	\N
73	38	MD.STREET	Đường	cmt8	62	t	2	2	2020-10-09 04:58:30.951615	2020-10-14 07:47:21.948	Cách Mạng Tháng Tám 1	\N
75	38	MD.STREET	Đường	buivien	62	t	2	2	2020-10-09 05:03:49.935218	2020-10-09 05:03:49.935218	Bùi Viện	\N
76	38	MD.STREET	Đường	calmette	62	t	2	2	2020-10-09 05:04:11.558713	2020-10-09 05:04:11.558713	Calmette	\N
77	38	MD.STREET	Đường	congquynh	62	t	2	2	2020-10-09 05:04:32.086834	2020-10-09 05:04:32.086834	Cống Quỳnh	\N
78	38	MD.STREET	Đường	dienbienphu	62	t	2	2	2020-10-09 05:04:56.511604	2020-10-09 05:04:56.511604	Điện Biên Phủ	\N
79	38	MD.STREET	Đường	anphu	63	t	2	2	2020-10-09 05:05:28.905045	2020-10-09 05:05:28.905045	An Phú	\N
80	38	MD.STREET	Đường	nguyenthidinh	63	t	2	2	2020-10-09 05:05:51.231865	2020-10-09 05:05:51.231865	Nguyễn Thị Định	\N
82	38	MD.STREET	Đường	cmt8	64	t	2	2	2020-10-09 05:06:51.224353	2020-10-09 05:06:51.224353	Cách Mạng Tháng Tám	\N
83	38	MD.STREET	Đường	dbp	64	t	2	2	2020-10-09 05:07:12.983513	2020-10-09 05:07:12.983513	Điện Biên Phủ	\N
84	38	MD.STREET	Đường	vt6	64	t	2	2	2020-10-09 05:07:37.95582	2020-10-09 05:07:37.95582	Võ Thị Sáu	\N
85	38	MD.STREET	Đường	bvđ	65	t	2	2	2020-10-09 05:08:14.694898	2020-10-09 05:08:14.694898	Bến Vân Đồn	\N
86	38	MD.STREET	Đường	vh	65	t	2	2	2020-10-09 05:08:37.090466	2020-10-09 05:08:37.090466	Vĩnh Hội	\N
88	38	MD.STREET	Đường	htlo	66	t	2	2	2020-10-09 05:09:34.424787	2020-10-09 05:09:34.424787	Hải Thượng Lãn Ông	\N
74	38	MD.STREET	Đường	thđao	62	t	2	2	2020-10-09 05:03:25.241038	2020-10-09 05:10:17.752	Trần Hưng Đạo	\N
89	39	MD.STREETGROUP	Đoạn đường	thd-dt	75	t	2	2	2020-10-09 05:11:38.490884	2020-10-09 05:11:38.490884	Trần Hưng Đạo - Đề Thám	\N
90	39	MD.STREETGROUP	Đoạn đường	ntmk-sna	82	t	2	2	2020-10-09 05:12:14.229495	2020-10-09 05:12:14.229495	Nguyễn Thị Minh Khai	\N
91	39	MD.STREETGROUP	Đoạn đường	hamthuthiem-nguyenthidinh	81	t	2	2	2020-10-09 05:13:15.500951	2020-10-09 05:13:15.500951	Hầm Thủ Thiêm - Nguyễn Thị Định	\N
92	39	MD.STREETGROUP	Đoạn đường	hbt-tquyen	78	t	2	2	2020-10-09 05:14:07.629638	2020-10-09 05:14:07.629638	Hai Bà Trưng - Trương Quyền	\N
93	39	MD.STREETGROUP	Đoạn đường	cauonglanh-caucalmette	85	t	2	2	2020-10-09 05:15:18.175806	2020-10-09 05:15:18.175806	Cầu Ông Lãnh - Cầu Calmette	\N
94	39	MD.STREETGROUP	Đoạn đường	tqp-nquyen	74	t	2	2	2020-10-09 05:16:04.378475	2020-10-09 05:16:04.378475	Triệu Quang Phục - Ngô Quyền	\N
95	38	MD.STREET	Đường	lvsỹ	67	t	2	2	2020-10-09 05:16:49.093296	2020-10-09 05:16:49.093296	Lê Văn Sỹ	\N
96	39	MD.STREETGROUP	Đoạn đường	pv2-hvcake	95	t	2	2	2020-10-09 05:17:16.573302	2020-10-09 05:17:16.573302	Phạm Văn Hai - Huỳnh Văn Bánh	\N
97	40	MD.URGENt	Mức độ bán	bt	\N	t	2	2	2020-10-09 05:23:52.590173	2020-10-09 05:23:52.590173	Bình Thường	\N
98	41	MD.LOCATIONTYPe	Vị trí bđs	mt	\N	t	2	2	2020-10-09 05:25:40.100825	2020-10-09 05:25:40.100825	Mặt tiền	\N
99	42	MD.DEPARTMENT	Phòng ban	kinhdoanh	\N	t	2	2	2020-10-09 05:29:17.56227	2020-10-09 05:29:17.56227	Phòng kinh doanh	\N
100	43	MD.EMPTITLE	Cấp bậc	nv	\N	t	2	2	2020-10-09 05:30:09.924165	2020-10-09 05:30:09.924165	Nhân viên	\N
101	43	MD.EMPTITLE	Cấp bậc	Manager	\N	t	2	2	2020-10-09 05:30:27.766386	2020-10-09 05:30:27.766386	Manager	\N
102	44	MD.EMPSTATUS	Tình trạng nhân viên	doing	\N	t	2	2	2020-10-09 05:32:28.436565	2020-10-09 05:32:28.436565	Chưa bị đuổi	\N
103	47	MD.EMPQUOTA.PKT	Hạn mức phân khúc từ	pkfrom	\N	f	2	2	2020-10-09 05:35:45.124553	2020-10-30 08:56:38.53	Phân khúc từ	{"unit":{"name":"Tỷ Đồng"}}
113	48	MD.PROPERTYTYPe	Loại đất	ĐNN	\N	t	2	2	2020-10-09 06:41:21.041006	2020-10-09 06:41:21.041006	Đất nông nghiệp	\N
81	38	MD.STREET	Đường	maichitho	63	t	2	2	2020-10-09 05:06:07.946293	2020-10-09 06:16:37.516	Mai Chí Thọ	\N
114	49	MD.PROPERTYUSING	Hình thức sử dụng	Chung	\N	t	2	2	2020-10-09 06:41:37.774211	2020-10-09 06:43:48.785	Chung	\N
116	49	MD.PROPERTYUSING	Hình thức sử dụng	Riêng	\N	t	2	2	2020-10-09 06:44:05.407545	2020-10-09 06:44:05.407545	Riêng	\N
115	50	MD.PROPERTYPERIOD	Thời gian sử dụng	Lau dai	\N	t	2	2	2020-10-09 06:42:04.080376	2020-10-09 06:44:25.936	Lâu dài	\N
117	50	MD.PROPERTYPERIOD	Thời gian sử dụng	1 nam	\N	t	2	2	2020-10-09 06:44:44.769012	2020-10-09 06:44:44.769012	1 năm	\N
105	46	MD.EMPQUOTA.SLBDS	Hạn mức bất động sản	slbđs	\N	f	2	2	2020-10-09 05:37:26.756179	2020-10-30 08:55:48.169	Số lượng bất động sản	{"unit":{"name":"Thông tin"}}
118	51	MD.Reject	Từ chối	TTT	\N	t	2	2	2020-10-09 06:52:07.326085	2020-10-09 06:52:07.326085	Thiếu thông tin 1	\N
119	51	MD.Reject	Từ chối	MD.REJECT.OTHER	\N	t	2	2	2020-10-09 06:52:24.629182	2020-10-09 07:15:02.565	Lý do khác	\N
106	53	MD.EMPQUOTA.THM	Hạn mức tổng	summary	\N	f	2	2	2020-10-09 05:37:43.030654	2020-10-30 08:55:39.119	Tổng hạn mức	{"unit":{"name":"Tỷ Đồng"}}
120	55	MD.EMPQUOTA-UNIT.TD	ĐVT Tỷ đồng	tydong	\N	f	2	2	2020-10-09 07:17:28.662343	2020-10-09 08:07:17.494	Tỷ đồng	\N
108	54	MD.EMPQUOTA-UNIT.TT	ĐVT Thông tin	thongtin	\N	f	2	2	2020-10-09 05:38:53.367758	2020-10-09 08:07:26.333	Thông tin	\N
87	38	MD.STREET	Đường	thđ	66	t	2	2	2020-10-09 05:09:10.162734	2020-10-14 07:48:31.565	Trần Hưng Đạo 5	\N
112	46	MD.EMPQUOTA.SLBDS	Hạn mức bất động sản	so	\N	f	2	2	2020-10-09 05:41:28.217326	2020-10-30 08:54:47.923	Số lượng	\N
132	58	MD.COLLABTYPE	Cấp bậc cộng tác	CT01	\N	t	2	66	2020-10-16 06:51:35.926967	2020-11-05 03:55:25.561	CTV Bậc 1	\N
111	46	MD.EMPQUOTA.SLBDS	Hạn mức bất động sản	dong	\N	f	2	2	2020-10-09 05:41:06.624965	2020-10-30 08:54:57.722	Đồng	\N
110	46	MD.EMPQUOTA.SLBDS	Hạn mức bất động sản	percent	\N	f	2	2	2020-10-09 05:40:47.550851	2020-10-30 08:55:12.033	%	\N
107	45	MD.EMPQUOTA.SLQT	Hạn mức quan tâm	follow	\N	f	2	2	2020-10-09 05:38:21.733087	2020-10-30 08:55:30.578	BĐS quan tâm	{"unit":{"name":"Thông tin"}}
121	37	MD.WARD	Phường	pt	63	t	2	2	2020-10-12 06:56:33.979794	2020-10-14 08:03:01.91	Phuong Test HL	\N
157	62	MD.PROSTYPE	Loại ưu điểm	RT07	148	t	2	2	2020-11-04 06:26:59.975543	2020-11-04 06:26:59.975543	Loại ưu 4.1	\N
122	38	MD.STREET	Đường	LVS	62	t	2	2	2020-10-12 07:45:10.782849	2020-10-14 08:03:43.112	Lê Văn Sỹ  1	\N
123	56	MD.TEST	 Test	TEST	\N	t	2	2	2020-10-15 04:08:05.714982	2020-10-15 04:08:05.714982	TEST	\N
124	57	MD.COMPANYLIST	Tên Công Ty	Cong ty	\N	t	2	2	2020-10-15 10:37:40.314045	2020-10-15 10:37:40.314045	Công Ty A	\N
125	43	MD.EMPTITLE	Cấp bậc	Cap bac	\N	t	2	2	2020-10-15 10:39:54.255014	2020-10-15 10:40:49.07	Nhân viên	\N
129	57	MD.COMPANYLIST	Tên Công Ty	Công ty 1	\N	t	2	2	2020-10-16 06:50:25.100212	2020-10-16 06:50:25.100212	Công ty 1	\N
130	57	MD.COMPANYLIST	Tên Công Ty	Công ty 2	\N	t	2	2	2020-10-16 06:50:42.93546	2020-10-16 06:50:42.93546	Công ty 2	\N
133	35	MD.CITY	Thành phố	Cty	\N	t	2	2	2020-10-16 06:53:25.65131	2020-10-16 06:53:25.65131	test 2	\N
134	57	MD.COMPANYLIST	Tên Công Ty	Cty 3	\N	t	2	2	2020-10-16 07:05:33.138507	2020-10-16 07:05:33.138507	Công Ty B	\N
135	58	MD.COLLABTYPE	Cấp bậc cộng tác	Quan ly A	133	t	2	2	2020-10-21 07:31:46.718517	2020-10-21 07:31:46.718517	Quan ly A	\N
136	57	MD.COMPANYLIST	Tên Công Ty	Cty 	\N	t	2	2	2020-10-22 04:26:14.395383	2020-10-22 04:26:14.395383	Công ty B	\N
137	57	MD.COMPANYLIST	Tên Công Ty	Cty B	\N	t	2	2	2020-10-22 04:27:51.287233	2020-10-22 04:27:51.287233	Công Ty B	\N
128	57	MD.COMPANYLIST	Tên Công Ty	Cty A	\N	t	2	2	2020-10-16 06:48:00.475535	2020-10-22 04:35:31.677	Cong Ty TNHH ABC	\N
138	57	MD.COMPANYLIST	Tên Công Ty	VAR	\N	t	2	2	2020-10-23 04:08:28.497856	2020-10-23 04:08:28.497856	Vạn An Real	\N
139	57	MD.COMPANYLIST	Tên Công Ty	TPP	\N	t	2	2	2020-10-26 06:11:33.740008	2020-10-26 06:11:33.740008	TP&P Technology	\N
158	62	MD.PROSTYPE	Loại ưu điểm	RT08	148	t	2	2	2020-11-04 06:27:52.228991	2020-11-04 06:27:52.228991	Loại ưu 4.2	\N
109	46	MD.EMPQUOTA.SLBDS	Hạn mức bất động sản	tydong	\N	f	2	2	2020-10-09 05:40:25.572824	2020-10-30 08:55:22.281	Tỷ đồng	\N
104	52	MD.EMPQUOTA.PKD	Hạn mức phân khúc đến	pkto	\N	f	2	2	2020-10-09 05:36:02.55726	2020-10-30 08:55:59.083	Phân khúc đến	{"unit":{"name":"Tỷ Đồng"}}
159	62	MD.PROSTYPE	Loại ưu điểm	RT09	149	t	2	2	2020-11-04 06:28:41.196096	2020-11-04 06:28:41.196096	Loại ưu 5.1	\N
160	62	MD.PROSTYPE	Loại ưu điểm	RT10	149	t	2	2	2020-11-04 06:29:15.737274	2020-11-04 06:29:15.737274	Loại ưu 5.2	\N
140	60	MD.EMPQUOTA	Hạn mức	MD.EMPQUOTA.SLQT	\N	t	2	2	2020-10-30 08:53:17.987501	2020-11-03 10:12:16.321	Số lượng BDS quan tâm	{"unit":{"name":"Thông tin"}}
141	60	MD.EMPQUOTA	Hạn mức	MD.EMPQUOTA.SLBDS	\N	t	2	2	2020-10-30 08:54:17.008153	2020-11-03 10:13:29.69	Số lượng BDS thực hiện	{"unit":{"name":"Thông tin"}}
142	60	MD.EMPQUOTA	Hạn mức	MD.EMPQUOTA.PKT	\N	t	2	2	2020-10-30 08:58:26.328136	2020-11-03 10:14:24.922	Phân khúc giá trị BDS từ	{"unit":{"name":"Tỷ Đồng"}}
143	60	MD.EMPQUOTA	Hạn mức	MD.EMPQUOTA.PKD	\N	t	2	2	2020-10-30 08:59:01.863172	2020-11-03 10:14:44.352	Phân khúc giá trị BDS đến	{"unit":{"name":"Tỷ Đồng"}}
144	60	MD.EMPQUOTA	Hạn mức	MD.EMPQUOTA.THM	\N	t	2	2	2020-10-30 09:00:26.119817	2020-11-03 10:15:30.396	Tổng hạn mức giá trị BDS	{"unit":{"name":"Tỷ Đồng"}}
151	62	MD.PROSTYPE	Loại ưu điểm	RT01	145	t	2	2	2020-11-04 04:48:28.274621	2020-11-04 04:48:28.274621	Loại ưu 1.1	\N
152	62	MD.PROSTYPE	Loại ưu điểm	RT02	145	t	2	2	2020-11-04 04:49:00.277251	2020-11-04 04:49:00.277251	Loại ưu 1.2	\N
153	62	MD.PROSTYPE	Loại ưu điểm	RT03	146	t	2	2	2020-11-04 04:50:00.623191	2020-11-04 04:51:09.826	Loại ưu 2.1	\N
154	62	MD.PROSTYPE	Loại ưu điểm	RT04	146	t	2	2	2020-11-04 04:50:45.979008	2020-11-04 04:51:19.722	Loại ưu 2.2	\N
155	62	MD.PROSTYPE	Loại ưu điểm	RT05	147	t	2	2	2020-11-04 04:53:12.761775	2020-11-04 04:53:12.761775	Loại ưu 3.1	\N
156	62	MD.PROSTYPE	Loại ưu điểm	RT06	147	t	2	2	2020-11-04 06:26:03.78161	2020-11-04 06:26:03.78161	Loại ưu 3.2	\N
161	62	MD.PROSTYPE	Loại ưu điểm	RT11	150	t	2	2	2020-11-04 06:29:56.041427	2020-11-04 06:29:56.041427	Loại ưu 6.1	\N
162	62	MD.PROSTYPE	Loại ưu điểm	RT12	150	t	2	2	2020-11-04 06:30:21.960765	2020-11-04 06:30:21.960765	Loại ưu 6.2	\N
163	63	MD.CONSGROUP	Nhóm nhược điểm	OG01	\N	t	2	2	2020-11-04 06:35:02.78268	2020-11-04 06:35:02.78268	Nhược điểm 01	\N
145	61	MD.PROSGROUP	Nhóm ưu điểm	RG01	\N	t	2	2	2020-11-04 04:40:07.001062	2020-11-04 06:35:30.183	Ưu điểm 01	\N
146	61	MD.PROSGROUP	Nhóm ưu điểm	RG02	\N	t	2	2	2020-11-04 04:41:59.789642	2020-11-04 06:35:40.041	Ưu điểm 02	\N
147	61	MD.PROSGROUP	Nhóm ưu điểm	RG03	\N	t	2	2	2020-11-04 04:42:24.884812	2020-11-04 06:35:57.19	Ưu điểm 03	\N
148	61	MD.PROSGROUP	Nhóm ưu điểm	RG04	\N	t	2	2	2020-11-04 04:42:40.569375	2020-11-04 06:36:07.506	Ưu điểm 04	\N
149	61	MD.PROSGROUP	Nhóm ưu điểm	RG05	\N	t	2	2	2020-11-04 04:43:02.584506	2020-11-04 06:36:16.957	Ưu điểm 05	\N
150	61	MD.PROSGROUP	Nhóm ưu điểm	RG06	\N	t	2	2	2020-11-04 04:43:18.167949	2020-11-04 06:36:25.168	Ưu điểm 06	\N
164	63	MD.CONSGROUP	Nhóm nhược điểm	OG02	\N	t	2	2	2020-11-04 06:38:01.158003	2020-11-04 06:38:19.173	Nhược điểm 02	\N
165	63	MD.CONSGROUP	Nhóm nhược điểm	OG03	\N	t	2	2	2020-11-04 06:38:48.730455	2020-11-04 06:38:48.730455	Nhược điểm 03	\N
166	63	MD.CONSGROUP	Nhóm nhược điểm	OG04	\N	t	2	2	2020-11-04 06:40:11.15593	2020-11-04 06:40:39.641	Nhược điểm 04	\N
167	63	MD.CONSGROUP	Nhóm nhược điểm	OG05	\N	t	2	2	2020-11-04 06:41:30.35445	2020-11-04 06:41:30.35445	Nhược điểm 05	\N
168	64	MD.CONSTYPE	Loại nhược điểm	OT01	163	t	2	2	2020-11-04 06:42:42.558456	2020-11-04 06:42:42.558456	Loại kém 1.1	\N
169	64	MD.CONSTYPE	Loại nhược điểm	OT02	163	t	2	2	2020-11-04 06:43:06.818249	2020-11-04 06:43:06.818249	Loại kém 1.2	\N
170	64	MD.CONSTYPE	Loại nhược điểm	OT03	164	t	2	2	2020-11-04 06:43:43.809789	2020-11-04 06:43:43.809789	Loại kém 2.1	\N
171	64	MD.CONSTYPE	Loại nhược điểm	OT04	164	t	2	2	2020-11-04 06:44:11.791248	2020-11-04 06:44:11.791248	Loại kém 2.2	\N
172	64	MD.CONSTYPE	Loại nhược điểm	OT05	165	t	2	2	2020-11-04 06:44:32.983738	2020-11-04 06:44:32.983738	Loại kém 3.1	\N
173	64	MD.CONSTYPE	Loại nhược điểm	OT06	165	t	2	2	2020-11-04 06:44:54.823544	2020-11-04 06:44:54.823544	Loại kém 3.2	\N
174	64	MD.CONSTYPE	Loại nhược điểm	OT07	166	t	2	2	2020-11-04 06:45:15.385685	2020-11-04 06:45:15.385685	Loại kém 4.1	\N
175	64	MD.CONSTYPE	Loại nhược điểm	OT08	166	t	2	2	2020-11-04 06:45:33.072978	2020-11-04 06:45:33.072978	Loại kém 4.2	\N
176	64	MD.CONSTYPE	Loại nhược điểm	OT09	167	t	2	2	2020-11-04 06:45:49.681631	2020-11-04 06:45:49.681631	Loại kém 5.1	\N
177	64	MD.CONSTYPE	Loại nhược điểm	OT10	167	t	2	2	2020-11-04 06:45:59.738123	2020-11-04 06:45:59.738123	Loại kém 5.2	\N
131	58	MD.COLLABTYPE	Cấp bậc cộng tác	CT02	\N	t	2	66	2020-10-16 06:51:17.014065	2020-11-05 03:55:48.454	CTV Bậc 2	\N
127	58	MD.COLLABTYPE	Cấp bậc cộng tác	CT03	\N	t	2	66	2020-10-16 06:47:34.583479	2020-11-05 03:56:11.889	CTV Bậc 3	\N
126	58	MD.COLLABTYPE	Cấp bậc cộng tác	CT04	\N	t	2	66	2020-10-15 10:44:24.293201	2020-11-05 03:56:35.889	CTV Bậc 4	\N
178	39	MD.STREETGROUP	Đoạn đường	SG011	122	t	66	66	2020-11-05 06:29:40.064165	2020-11-05 06:29:40.064165	Đoạn Quận 1	\N
179	65	MD.POSITIONGROUP	Nhóm vị trí	PG001	\N	t	66	66	2020-11-05 06:34:05.964434	2020-11-05 06:34:05.964434	Nhóm vị trí 1	\N
180	65	MD.POSITIONGROUP	Nhóm vị trí	PG002	\N	t	66	66	2020-11-05 06:34:33.806447	2020-11-05 06:34:33.806447	Nhóm vị trí 2	\N
186	66	MD.PRICEPOINT	Đơn giá đất điểm giá	RP06	92	t	66	66	2020-11-05 07:35:54.8742	2020-11-05 08:08:45.377	1000006	\N
185	66	MD.PRICEPOINT	Đơn giá đất điểm giá	RP05	91	t	66	66	2020-11-05 07:35:40.326985	2020-11-05 08:08:53.088	1000005	\N
184	66	MD.PRICEPOINT	Đơn giá đất điểm giá	RP04	91	t	66	66	2020-11-05 07:35:26.21233	2020-11-05 08:09:03.356	1000004	\N
183	66	MD.PRICEPOINT	Đơn giá đất điểm giá	RP03	90	t	66	66	2020-11-05 07:33:49.682567	2020-11-05 08:09:20.476	1000003	\N
182	66	MD.PRICEPOINT	Đơn giá đất điểm giá	RP02	89	t	66	66	2020-11-05 07:33:36.183957	2020-11-05 08:09:40.793	1000002	\N
181	66	MD.PRICEPOINT	Đơn giá đất điểm giá	RP01	178	t	66	66	2020-11-05 07:33:19.085916	2020-11-05 08:09:51.204	1000001	\N
187	48	MD.PROPERTYTYPe	Loại đất	PNK	\N	t	56	56	2020-11-06 03:19:37.793799	2020-11-06 03:19:37.793799	Đất phi nông nghiệp khác	\N
188	48	MD.PROPERTYTYPe	Loại đất	SKC	\N	t	56	56	2020-11-06 03:20:17.285322	2020-11-06 03:20:17.285322	Đất cơ sở sản xuất phi nông nghiệp	\N
189	48	MD.PROPERTYTYPe	Loại đất	SKK	\N	t	56	56	2020-11-06 03:21:01.381724	2020-11-06 03:21:01.381724	Đất khu công nghiệp	\N
190	40	MD.URGENT	Mức độ bán	HOT	\N	t	56	56	2020-11-06 03:22:42.103201	2020-11-06 03:22:42.103201	Cao	\N
191	40	MD.URGENT	Mức độ bán	COLD	\N	t	56	56	2020-11-06 03:23:18.203113	2020-11-06 03:23:18.203113	Thấp	\N
192	40	MD.URGENT	Mức độ bán	URGENT	\N	t	56	56	2020-11-06 03:23:36.112357	2020-11-06 03:23:36.112357	Gấp	\N
193	48	MD.PROPERTYTYPe	Loại đất	ONT	\N	t	56	56	2020-11-06 03:24:04.802416	2020-11-06 03:24:04.802416	Đất ở tại nông thôn	\N
194	48	MD.PROPERTYTYPe	Loại đất	ODT	\N	t	56	56	2020-11-06 03:24:28.309454	2020-11-06 03:24:28.309454	Đất ở tại đô thị	\N
195	48	MD.PROPERTYTYPe	Loại đất	DCH	\N	t	56	56	2020-11-06 03:26:04.086706	2020-11-06 03:26:04.086706	Đất chợ	\N
196	48	MD.PROPERTYTYPe	Loại đất	TMD	\N	t	56	56	2020-11-06 03:36:51.957859	2020-11-06 03:36:51.957859	Đất thương mại, dịch vụ	\N
197	41	MD.LOCATIONTYPE	Vị trí bđs	ALLEY1	\N	t	56	56	2020-11-06 03:43:08.386976	2020-11-06 03:43:08.386976	Hẻm rộng hơn 5m	\N
198	41	MD.LOCATIONTYPE	Vị trí bđs	ALLEY2	\N	t	56	56	2020-11-06 03:43:33.725686	2020-11-06 03:43:33.725686	Hẻm rộng 3m-5m	\N
199	41	MD.LOCATIONTYPE	Vị trí bđs	ALLEY3	\N	t	56	56	2020-11-06 03:46:05.210816	2020-11-06 03:46:05.210816	Hẻm rộng 2m-3m	\N
200	41	MD.LOCATIONTYPE	Vị trí bđs	ALLEY4	\N	t	56	56	2020-11-06 03:46:35.469473	2020-11-06 03:46:35.469473	Hẻm rộng dưới 2m	\N
217	37	MD.WARD	Phường	ND	202	t	56	56	2020-11-06 04:01:53.90582	2020-11-06 06:36:28.436	Nam Dương	\N
201	35	MD.CITY	Thành phố	DN	\N	t	56	56	2020-11-06 03:47:24.571134	2020-11-06 06:35:36.308	Đà Nẵng	\N
202	36	MD.DISTRICT	Quận	01	201	t	56	56	2020-11-06 03:51:45.971483	2020-11-06 06:35:47.528	Hải Châu	\N
210	37	MD.WARD	Phường	HC1	202	t	56	56	2020-11-06 03:58:05.075365	2020-11-06 06:36:00.905	Hải Châu 1	\N
231	36	MD.DISTRICT	Quận	CG	61	t	2	2	2020-11-06 06:19:58.493739	2020-11-06 06:19:58.493739	Cần Giờ	\N
230	38	MD.STREET	Đường	08	202	f	56	2	2020-11-06 04:08:47.176041	2020-11-06 06:21:01.541	Tiểu La	\N
229	38	MD.STREET	Đường	07	202	f	56	2	2020-11-06 04:08:17.583354	2020-11-06 06:21:10.645	Phan Châu Trinh	\N
227	38	MD.STREET	Đường	05	202	f	56	2	2020-11-06 04:07:39.341822	2020-11-06 06:21:28.196	3 Tháng 2	\N
226	38	MD.STREET	Đường	04	202	f	56	2	2020-11-06 04:06:53.865846	2020-11-06 06:21:36.354	Lê Lợi	\N
225	38	MD.STREET	Đường	03	202	f	56	2	2020-11-06 04:06:30.493602	2020-11-06 06:21:44.794	Hùng Vương	\N
224	38	MD.STREET	Đường	02	202	f	56	2	2020-11-06 04:06:12.090966	2020-11-06 06:22:01.229	Lê Đình Lý	\N
222	37	MD.WARD	Phường	HCB	202	f	56	2	2020-11-06 04:03:59.354052	2020-11-06 06:22:28.357	Hòa Cường Bắc	\N
221	37	MD.WARD	Phường	HCN	202	f	56	2	2020-11-06 04:03:40.795072	2020-11-06 06:22:40.642	Hòa Cường Nam	\N
220	37	MD.WARD	Phường	BH	202	f	56	2	2020-11-06 04:03:10.828162	2020-11-06 06:22:47.909	Bình Hiên	\N
219	37	MD.WARD	Phường	BT	202	f	56	2	2020-11-06 04:02:50.409555	2020-11-06 06:22:55.632	Bình Thuận	\N
218	37	MD.WARD	Phường	PN	202	f	56	2	2020-11-06 04:02:31.851043	2020-11-06 06:23:02.553	Phước Ninh	\N
216	37	MD.WARD	Phường	HTD	202	f	56	2	2020-11-06 04:01:08.320903	2020-11-06 06:23:22.845	Hoà Thuận Đông	\N
215	37	MD.WARD	Phường	HTT	202	f	56	2	2020-11-06 04:00:33.355763	2020-11-06 06:23:35.56	Hoà Thuận Tây	\N
214	37	MD.WARD	Phường	TP	202	f	56	2	2020-11-06 03:59:57.819814	2020-11-06 06:23:43.76	Thuận Phước	\N
213	37	MD.WARD	Phường	TB	202	f	56	2	2020-11-06 03:59:19.453504	2020-11-06 06:23:50.861	Thanh Bình	\N
212	37	MD.WARD	Phường	TT	202	f	56	2	2020-11-06 03:58:52.13648	2020-11-06 06:23:59.908	Thạch Thang	\N
223	38	MD.STREET	Đường	01	202	t	56	56	2020-11-06 04:05:52.228169	2020-11-06 06:36:38.837	Cao Thắng	\N
228	38	MD.STREET	Đường	06	202	t	56	56	2020-11-06 04:07:58.43494	2020-11-06 06:36:58.005	Nguyễn Chí Thanh	\N
209	36	MD.DISTRICT	Quận	08	201	f	56	2	2020-11-06 03:57:10.058631	2020-11-06 06:24:45.814	Hoàng Sa	\N
208	36	MD.DISTRICT	Quận	07	201	f	56	2	2020-11-06 03:54:43.630141	2020-11-06 06:25:29.321	Cẩm Lệ	\N
207	36	MD.DISTRICT	Quận	06	201	f	56	2	2020-11-06 03:54:22.14454	2020-11-06 06:25:37.773	Hoà Vang	\N
206	36	MD.DISTRICT	Quận	05	201	f	56	2	2020-11-06 03:53:57.498621	2020-11-06 06:26:08.998	Liên Chiểu	\N
205	36	MD.DISTRICT	Quận	04	201	f	56	2	2020-11-06 03:52:49.74759	2020-11-06 06:26:19.097	Ngũ Hành Sơn	\N
204	36	MD.DISTRICT	Quận	03	201	f	56	2	2020-11-06 03:52:23.182983	2020-11-06 06:26:26.075	Sơn Trà	\N
203	36	MD.DISTRICT	Quận	02	201	f	56	2	2020-11-06 03:52:03.621385	2020-11-06 06:26:35.304	Thanh Khê	\N
232	37	MD.WARD	Phường	P03	64	t	66	66	2020-11-06 07:42:11.433068	2020-11-06 07:42:11.433068	Phường 3	\N
211	37	MD.WARD	Phường	HC2	202	t	56	56	2020-11-06 03:58:26.038122	2020-11-06 06:36:13.324	Hải Châu 2	\N
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, created_at, updated_at, content, status, conversation_id, created_by, updated_by) FROM stdin;
3	2020-10-22 10:32:09.147244	2020-10-22 10:32:09.147244	are you okay	Sent	2	38	38
173	2020-10-23 08:09:24.273566	2020-10-26 02:57:52.497373	2113123131	Seen	15	38	41
2	2020-10-22 10:32:04.748628	2020-10-22 10:32:11.853043	hi user	Seen	2	38	48
49	2020-10-23 04:34:13.586362	2020-10-23 04:34:13.586362	hbhg	Sent	7	38	38
9	2020-10-22 11:11:38.421341	2020-10-23 04:34:18.016052	Wowowiw	Seen	5	49	38
14	2020-10-22 11:15:37.269479	2020-10-23 04:34:18.016052	Are you a live	Seen	5	49	38
22	2020-10-22 11:51:50.667352	2020-10-23 04:34:18.016052	Heart beat	Seen	5	49	38
50	2020-10-23 04:34:27.239415	2020-10-23 04:34:27.239415	uyuuyuyuyuyuyuyu	Sent	2	38	38
1	2020-10-22 10:31:52.184328	2020-10-23 04:34:27.277302	Abc	Seen	2	48	38
226	2020-10-26 05:38:43.745	2020-10-26 08:43:52.264663	Hello	Seen	16	37	2
214	2020-10-26 02:51:28.906301	2020-10-26 08:43:52.264663	Hi Frim ctv	Seen	16	37	2
210	2020-10-26 02:49:33.488166	2020-10-26 05:38:43.863018	hi from admin	Seen	16	2	37
139	2020-10-23 06:48:22.432352	2020-10-26 05:38:43.75619	Huhu	Seen	14	38	37
42	2020-10-23 04:27:32.44536	2020-10-23 04:27:32.44536	test account	Sent	8	2	2
43	2020-10-23 04:27:36.805772	2020-10-23 04:27:36.805772	test chat	Sent	8	2	2
136	2020-10-23 06:47:30.58267	2020-10-26 05:38:43.75619	Hey	Seen	14	38	37
37	2020-10-23 04:26:17.623591	2020-10-23 04:26:17.623591	test	Sent	11	2	2
230	2020-10-26 08:18:57.371623	2020-10-26 08:20:19.278557	Test	Seen	18	2	59
38	2020-10-23 04:26:23.173153	2020-10-23 04:26:23.173153	test	Sent	9	2	2
174	2020-10-23 08:09:26.958554	2020-10-26 05:38:43.75619	24234324	Seen	14	38	37
222	2020-10-26 02:57:14.137246	2020-10-26 02:57:44.297884	Hi	Seen	15	41	38
28	2020-10-23 03:27:47.533867	2020-10-23 03:27:47.533867	Sxxx	Sent	5	49	49
179	2020-10-23 08:37:46.807709	2020-10-26 02:57:44.297884	Ghkll	Seen	15	41	38
184	2020-10-23 08:43:49.956552	2020-10-26 02:57:44.297884	Gh	Seen	15	41	38
201	2020-10-23 10:33:42.743429	2020-10-23 10:33:42.743429	Ghnm	Sent	14	37	37
48	2020-10-23 04:30:34.851394	2020-10-26 02:44:30.810482	hello	Seen	6	38	2
83	2020-10-23 06:28:08.516056	2020-10-26 02:44:30.810482	dqweq	Seen	6	38	2
46	2020-10-23 04:28:07.345998	2020-10-26 02:44:40.721302	Fghh	Seen	4	49	2
40	2020-10-23 04:27:01.538996	2020-10-26 02:44:40.721302	Llkl	Seen	4	49	2
36	2020-10-23 04:25:52.04032	2020-10-26 02:44:40.721302	Ola	Seen	4	49	2
207	2020-10-23 10:41:41.051915	2020-10-23 10:41:41.051915	Jdkd	Sent	6	38	38
202	2020-10-23 10:39:20.315157	2020-10-23 10:39:20.315157	Hi admin	Sent	4	49	49
34	2020-10-23 04:24:22.476656	2020-10-23 04:24:22.476656	asdqwe	Sent	10	2	2
196	2020-10-23 10:17:41.663699	2020-10-26 02:57:44.297884	Hello	Seen	15	41	38
153	2020-10-23 06:50:32.215931	2020-10-23 10:41:41.067916	123	Seen	6	2	38
188	2020-10-23 08:45:46.045362	2020-10-23 10:34:00.186282	Huhu	Seen	14	37	38
175	2020-10-23 08:26:42.227401	2020-10-23 10:34:00.186282	Dgjj	Seen	14	37	38
104	2020-10-23 06:34:41.990239	2020-10-23 10:34:00.186282	Nè	Seen	14	37	38
106	2020-10-23 06:35:44.791972	2020-10-23 10:34:00.186282	(::	Seen	14	37	38
75	2020-10-23 06:23:51.694606	2020-10-23 10:34:00.186282	Nnn	Seen	14	37	38
140	2020-10-23 06:48:33.057086	2020-10-23 10:34:00.186282	Haha	Seen	14	37	38
79	2020-10-23 06:25:58.671624	2020-10-23 10:41:41.067916	abc	Seen	6	2	38
74	2020-10-23 06:23:25.918313	2020-10-23 10:34:00.186282	Bcd	Seen	14	37	38
73	2020-10-23 06:23:16.41539	2020-10-23 10:34:00.186282	Abc	Seen	14	37	38
72	2020-10-23 06:22:13.068451	2020-10-23 10:34:00.186282	Hello	Seen	14	37	38
69	2020-10-23 06:21:14.612106	2020-10-23 10:34:00.186282	Hello son 1	Seen	14	37	38
52	2020-10-23 06:04:32.677007	2020-10-23 06:04:32.677007	klkkl	Sent	12	32	32
80	2020-10-23 06:25:59.907894	2020-10-23 10:41:41.067916	aa	Seen	6	2	38
81	2020-10-23 06:26:01.940727	2020-10-23 10:41:41.067916	aa	Seen	6	2	38
30	2020-10-23 04:03:51.967903	2020-10-26 02:44:40.721302	Co thay j ko	Seen	4	49	2
45	2020-10-23 04:27:47.550846	2020-10-23 04:27:47.550846	test 231020 11h27	Sent	10	2	2
33	2020-10-23 04:24:20.266518	2020-10-23 04:27:47.566816	ádqe	Seen	10	39	2
82	2020-10-23 06:26:03.890591	2020-10-23 10:41:41.067916	awq	Seen	6	2	38
31	2020-10-23 04:06:13.673459	2020-10-26 02:44:40.721302	Ala	Seen	4	49	2
100	2020-10-23 06:32:10.312084	2020-10-26 05:38:43.75619	có	Seen	14	38	37
41	2020-10-23 04:27:06.901118	2020-10-23 10:39:20.329994	alo alo	Seen	4	2	49
27	2020-10-23 03:27:32.441977	2020-10-23 10:39:20.329994	hello from admin	Seen	4	2	49
24	2020-10-22 11:52:09.672528	2020-10-23 10:39:20.329994	test	Seen	4	2	49
78	2020-10-23 06:25:52.697959	2020-10-23 10:41:41.067916	ry	Seen	6	2	38
131	2020-10-23 06:46:25.384702	2020-10-23 10:41:41.067916	qưe	Seen	6	2	38
19	2020-10-22 11:18:28.040105	2020-10-23 10:39:20.329994	owowowo	Seen	4	2	49
132	2020-10-23 06:46:27.899572	2020-10-23 10:41:41.067916	ssadasd	Seen	6	2	38
133	2020-10-23 06:46:35.618635	2020-10-26 05:38:43.75619	Q TV	Seen	14	38	37
18	2020-10-22 11:18:23.4508	2020-10-23 10:39:20.329994	can you see me	Seen	4	2	49
16	2020-10-22 11:15:53.809836	2020-10-23 10:39:20.329994	why ?	Seen	4	2	49
12	2020-10-22 11:12:44.818042	2020-10-23 10:39:20.329994	oopse si	Seen	4	2	49
11	2020-10-22 11:12:26.264177	2020-10-23 10:39:20.329994	kakaak	Seen	4	2	49
10	2020-10-22 11:12:24.538272	2020-10-23 10:39:20.329994	kakaka	Seen	4	2	49
6	2020-10-22 10:52:25.165797	2020-10-23 10:39:20.329994	adsdfsdfsd	Seen	4	2	49
4	2020-10-22 10:51:10.947833	2020-10-23 10:39:20.329994	Hi user	Seen	4	2	49
5	2020-10-22 10:51:15.775705	2020-10-23 10:39:20.329994	asda	Seen	4	2	49
26	2020-10-23 03:22:26.264397	2020-10-26 02:44:40.721302	How are you admin	Seen	4	49	2
7	2020-10-22 11:08:10.705503	2020-10-26 02:44:40.721302	ABC 123 456	Seen	4	49	2
8	2020-10-22 11:11:25.278137	2020-10-26 02:44:40.721302	Hi hahaha	Seen	4	49	2
51	2020-10-23 04:39:24.823213	2020-10-26 02:44:40.721302	Helloing	Seen	4	49	2
13	2020-10-22 11:15:22.096935	2020-10-26 02:44:40.721302	Can you chat	Seen	4	49	2
64	2020-10-23 06:10:03.210079	2020-10-23 10:41:41.067916	asdasd	Seen	6	2	38
54	2020-10-23 06:06:39.189735	2020-10-23 10:41:41.067916	dasdadasdddasdasd	Seen	6	2	38
39	2020-10-23 04:26:29.154966	2020-10-23 10:41:41.067916	test	Seen	6	2	38
53	2020-10-23 06:06:27.931067	2020-10-23 10:41:41.067916	ẻt	Seen	6	2	38
17	2020-10-22 11:15:59.490036	2020-10-26 02:44:40.721302	Hxhxjxjdu	Seen	4	49	2
20	2020-10-22 11:51:35.656581	2020-10-26 02:44:40.721302	Kakak	Seen	4	49	2
21	2020-10-22 11:51:42.198411	2020-10-26 02:44:40.721302	Oooooooo	Seen	4	49	2
32	2020-10-23 04:08:20.980999	2020-10-26 02:44:40.721302	Ola	Seen	4	49	2
68	2020-10-23 06:14:36.232411	2020-10-23 10:34:00.186282	ㅇ호ㅓㅐㅣ	Seen	14	37	38
203	2020-10-23 10:40:33.909505	2020-10-23 10:40:33.909505	Hi	Sent	14	37	37
156	2020-10-23 07:24:38.597377	2020-10-23 10:41:41.067916	qwe	Seen	6	2	38
157	2020-10-23 07:24:44.845903	2020-10-23 10:41:41.067916	qweqew	Seen	6	2	38
57	2020-10-23 06:10:00.149159	2020-10-23 10:41:41.067916	asdqwe	Seen	6	2	38
141	2020-10-23 06:49:28.084288	2020-10-23 10:41:41.067916	dâ	Seen	6	2	38
142	2020-10-23 06:49:30.023446	2020-10-23 10:41:41.067916	jkj	Seen	6	2	38
204	2020-10-23 10:40:40.367226	2020-10-23 10:40:40.367226	Alooo	Sent	14	37	37
143	2020-10-23 06:49:31.228423	2020-10-23 10:41:41.067916	kkk	Seen	6	2	38
144	2020-10-23 06:49:32.446747	2020-10-23 10:41:41.067916	ll;	Seen	6	2	38
145	2020-10-23 06:49:34.427338	2020-10-23 10:41:41.067916	klhyu	Seen	6	2	38
146	2020-10-23 06:49:36.933083	2020-10-23 10:41:41.067916	jhjgvbn	Seen	6	2	38
147	2020-10-23 06:49:39.556367	2020-10-23 10:41:41.067916	mnmnmiu	Seen	6	2	38
205	2020-10-23 10:40:49.705011	2020-10-23 10:40:49.705011	Wow	Sent	14	37	37
148	2020-10-23 06:49:41.473584	2020-10-23 10:41:41.067916	nbjhjh	Seen	6	2	38
149	2020-10-23 06:49:42.517058	2020-10-23 10:41:41.067916	hjhjhj	Seen	6	2	38
134	2020-10-23 06:46:47.372666	2020-10-23 10:41:41.067916	qưeqwe	Seen	6	2	38
223	2020-10-26 02:57:44.282929	2020-10-26 02:57:44.282929	hi there	Sent	15	38	38
76	2020-10-23 06:25:46.838518	2020-10-23 10:41:41.067916	qưeqw	Seen	6	2	38
193	2020-10-23 08:55:33.054944	2020-10-26 02:57:44.297884	Tesssssss	Seen	15	41	38
180	2020-10-23 08:38:09.025743	2020-10-26 02:57:44.297884	Dfghjkk	Seen	15	41	38
177	2020-10-23 08:29:47.139943	2020-10-26 02:57:44.297884	Thjl	Seen	15	41	38
160	2020-10-23 07:34:42.875916	2020-10-26 02:57:44.297884	Binh	Seen	15	41	38
176	2020-10-23 08:29:36.732797	2020-10-26 02:57:44.297884	Fgjll	Seen	15	41	38
84	2020-10-23 06:28:09.292318	2020-10-26 02:44:30.810482	deqwe	Seen	6	38	2
99	2020-10-23 06:32:06.810328	2020-10-23 10:34:00.186282	Nghe ko	Seen	14	37	38
67	2020-10-23 06:14:16.2724	2020-10-23 10:34:00.186282	ㄹ호ㅓ	Seen	14	37	38
192	2020-10-23 08:55:26.051424	2020-10-26 02:57:44.297884	Fghjk	Seen	15	41	38
163	2020-10-23 08:07:30.998082	2020-10-26 05:38:43.75619	hulle	Seen	14	38	37
66	2020-10-23 06:13:54.639971	2020-10-23 10:34:00.186282	Ne	Seen	14	37	38
185	2020-10-23 08:44:28.776056	2020-10-23 10:34:00.186282	Hi	Seen	14	37	38
137	2020-10-23 06:47:46.647878	2020-10-26 05:38:43.75619	Ggghh	Seen	14	38	37
65	2020-10-23 06:12:03.352418	2020-10-23 10:34:00.186282	Chat again	Seen	14	37	38
103	2020-10-23 06:33:05.071603	2020-10-26 05:38:43.75619	nhắn sao cho duplicate đc c	Seen	14	38	37
101	2020-10-23 06:32:25.034053	2020-10-26 05:38:43.75619	bên này nó lên 1 chữ à	Seen	14	38	37
85	2020-10-23 06:28:10.152254	2020-10-26 02:44:30.810482	asdqwe	Seen	6	38	2
86	2020-10-23 06:28:11.229542	2020-10-26 02:44:30.810482	cvfgg	Seen	6	38	2
162	2020-10-23 08:07:19.777088	2020-10-23 10:34:00.186282	Hellu	Seen	14	37	38
123	2020-10-23 06:38:35.567166	2020-10-23 10:34:00.186282	Ẻtuufgghhjkk	Seen	14	37	38
121	2020-10-23 06:38:22.5487	2020-10-23 10:34:00.186282	Ghn	Seen	14	37	38
115	2020-10-23 06:38:07.260446	2020-10-23 10:34:00.186282	Bbcahh	Seen	14	37	38
116	2020-10-23 06:38:08.060681	2020-10-23 10:34:00.186282	Bhc	Seen	14	37	38
117	2020-10-23 06:38:08.931089	2020-10-23 10:34:00.186282	Ha	Seen	14	37	38
118	2020-10-23 06:38:09.779191	2020-10-23 10:34:00.186282	Ạ	Seen	14	37	38
119	2020-10-23 06:38:11.223885	2020-10-23 10:34:00.186282	Hư	Seen	14	37	38
120	2020-10-23 06:38:12.111039	2020-10-23 10:34:00.186282	Kk	Seen	14	37	38
109	2020-10-23 06:37:39.602741	2020-10-23 10:34:00.186282	Luong	Seen	14	37	38
107	2020-10-23 06:36:19.71902	2020-10-23 10:34:00.186282	Đgh	Seen	14	37	38
70	2020-10-23 06:21:29.212001	2020-10-23 10:34:00.186282	Hello son 2	Seen	14	37	38
71	2020-10-23 06:21:39.459263	2020-10-23 10:34:00.186282	Hello	Seen	14	37	38
197	2020-10-23 10:21:12.031489	2020-10-23 10:34:00.186282	Absbcccccc	Seen	14	37	38
98	2020-10-23 06:31:34.636335	2020-10-23 10:34:00.186282	Em	Seen	14	37	38
105	2020-10-23 06:34:59.623602	2020-10-23 10:34:00.186282	Mà 1	Seen	14	37	38
138	2020-10-23 06:47:58.000959	2020-10-23 10:34:00.186282	Nghe	Seen	14	37	38
29	2020-10-23 04:01:57.744639	2020-10-26 02:44:40.721302	Alo	Seen	4	49	2
35	2020-10-23 04:24:50.937845	2020-10-26 02:44:40.721302	Hello na	Seen	4	49	2
135	2020-10-23 06:46:51.750414	2020-10-26 05:38:43.75619	Hhjj	Seen	14	38	37
227	2020-10-26 05:38:43.752726	2020-10-26 05:38:43.752726	He	Sent	16	37	37
211	2020-10-26 02:49:49.900755	2020-10-26 05:38:43.863018	hi from admin	Seen	16	2	37
215	2020-10-26 02:54:59.839004	2020-10-26 02:56:49.214722	ctv	Seen	17	41	2
231	2020-10-26 08:19:32.798161	2020-10-26 08:20:18.751363	Duc khoe khong	Seen	18	59	2
232	2020-10-26 08:19:42.629861	2020-10-26 08:20:19.278557	khoe	Seen	18	2	59
154	2020-10-23 07:15:26.952236	2020-10-23 10:41:41.067916	11	Seen	6	2	38
55	2020-10-23 06:09:54.492987	2020-10-23 10:41:41.067916	ert	Seen	6	2	38
56	2020-10-23 06:09:57.975092	2020-10-23 10:41:41.067916	dgf	Seen	6	2	38
87	2020-10-23 06:29:22.063591	2020-10-23 10:41:41.067916	fdgdj	Seen	6	2	38
88	2020-10-23 06:31:17.953681	2020-10-23 10:41:41.067916	gre	Seen	6	2	38
89	2020-10-23 06:31:21.906154	2020-10-23 10:41:41.067916	chung toiassd	Seen	6	2	38
90	2020-10-23 06:31:24.032832	2020-10-23 10:41:41.067916	qưe	Seen	6	2	38
91	2020-10-23 06:31:24.710637	2020-10-23 10:41:41.067916	dqew	Seen	6	2	38
92	2020-10-23 06:31:24.995514	2020-10-23 10:41:41.067916	ád	Seen	6	2	38
93	2020-10-23 06:31:25.309562	2020-10-23 10:41:41.067916	qư	Seen	6	2	38
94	2020-10-23 06:31:25.458635	2020-10-23 10:41:41.067916	e	Seen	6	2	38
95	2020-10-23 06:31:26.741092	2020-10-23 10:41:41.067916	12	Seen	6	2	38
96	2020-10-23 06:31:26.868708	2020-10-23 10:41:41.067916	3	Seen	6	2	38
97	2020-10-23 06:31:29.955871	2020-10-23 10:41:41.067916	!@$#%$*(&%$%	Seen	6	2	38
130	2020-10-23 06:46:18.57396	2020-10-23 10:41:41.067916	qưe	Seen	6	2	38
150	2020-10-23 06:50:16.814599	2020-10-23 10:41:41.067916	555	Seen	6	2	38
151	2020-10-23 06:50:19.15222	2020-10-23 10:41:41.067916	111	Seen	6	2	38
152	2020-10-23 06:50:22.461214	2020-10-23 10:41:41.067916	32123	Seen	6	2	38
161	2020-10-23 07:45:57.981088	2020-10-23 10:41:41.067916	asdqwe	Seen	6	2	38
155	2020-10-23 07:15:36.277337	2020-10-23 10:41:41.067916	123	Seen	6	2	38
206	2020-10-23 10:41:11.615976	2020-10-26 02:44:30.810482	😃	Seen	6	38	2
199	2020-10-23 10:28:48.670359	2020-10-26 02:44:40.721302	Chat not work	Seen	4	49	2
15	2020-10-22 11:15:48.3558	2020-10-23 10:39:20.329994	kakaka	Seen	4	2	49
23	2020-10-22 11:52:07.427106	2020-10-23 10:39:20.329994	chat 	Seen	4	2	49
25	2020-10-22 11:52:16.577691	2020-10-23 10:39:20.329994	teststataksdhalkfaf	Seen	4	2	49
47	2020-10-23 04:28:29.549284	2020-10-23 10:39:20.329994	seen	Seen	4	2	49
198	2020-10-23 10:28:27.115647	2020-10-23 10:28:27.115647	Some time chat nt work	Sent	5	49	49
189	2020-10-23 08:46:21.873595	2020-10-23 10:34:00.186282	Hạha	Seen	14	37	38
102	2020-10-23 06:32:40.149192	2020-10-23 10:34:00.186282	Ừa c cũng thấy v	Seen	14	37	38
165	2020-10-23 08:07:59.403301	2020-10-23 10:34:00.186282	Ngon lành	Seen	14	37	38
108	2020-10-23 06:37:20.702939	2020-10-23 10:34:00.186282	Gggggggggggggg	Seen	14	37	38
186	2020-10-23 08:44:40.843586	2020-10-23 10:34:00.186282	Hi	Seen	14	37	38
110	2020-10-23 06:37:48.934502	2020-10-23 10:34:00.186282	Jjjj	Seen	14	37	38
111	2020-10-23 06:37:53.436113	2020-10-23 10:34:00.186282	Hggggggg	Seen	14	37	38
112	2020-10-23 06:37:56.979543	2020-10-23 10:34:00.186282	Uuyhhj	Seen	14	37	38
125	2020-10-23 06:39:59.030495	2020-10-23 10:34:00.186282	Test	Seen	14	37	38
124	2020-10-23 06:39:18.298058	2020-10-23 10:34:00.186282	Ctv	Seen	14	37	38
113	2020-10-23 06:38:00.46294	2020-10-23 10:34:00.186282	Nh	Seen	14	37	38
114	2020-10-23 06:38:05.549969	2020-10-23 10:34:00.186282	Yyata	Seen	14	37	38
122	2020-10-23 06:38:28.801986	2020-10-23 10:34:00.186282	Chnl	Seen	14	37	38
126	2020-10-23 06:40:18.590838	2020-10-23 10:34:00.186282	Test2	Seen	14	37	38
127	2020-10-23 06:40:36.351174	2020-10-23 10:34:00.186282	3	Seen	14	37	38
190	2020-10-23 08:46:30.412817	2020-10-23 10:34:00.186282	Hihi	Seen	14	37	38
181	2020-10-23 08:42:38.135247	2020-10-26 02:57:44.297884	Dfjlo	Seen	15	41	38
182	2020-10-23 08:42:45.286381	2020-10-26 02:57:44.297884	Te	Seen	15	41	38
194	2020-10-23 08:56:06.277612	2020-10-26 02:57:44.297884	5ttttt	Seen	15	41	38
219	2020-10-26 02:56:26.223306	2020-10-26 02:57:50.416129	hi	Seen	17	2	41
218	2020-10-26 02:56:12.12605	2020-10-26 02:57:50.416129	hi	Seen	17	2	41
216	2020-10-26 02:56:04.981656	2020-10-26 02:57:50.416129	hi	Seen	17	2	41
217	2020-10-26 02:56:08.741949	2020-10-26 02:57:50.416129	hi	Seen	17	2	41
220	2020-10-26 02:56:38.460268	2020-10-26 02:57:50.416129	hello ctv	Seen	17	2	41
159	2020-10-23 07:32:00.139705	2020-10-26 02:57:52.497373	Ss	Seen	15	38	41
158	2020-10-23 07:31:56.043423	2020-10-26 02:57:52.497373	Ha	Seen	15	38	41
164	2020-10-23 08:07:50.32954	2020-10-26 02:57:52.497373	Luong nè	Seen	15	38	41
224	2020-10-26 05:38:43.608743	2020-10-26 05:38:43.608743	Huhu	Sent	14	37	37
128	2020-10-23 06:45:01.425114	2020-10-26 05:38:43.75619	Test admin	Seen	14	38	37
129	2020-10-23 06:45:37.630443	2020-10-26 05:38:43.75619	Dcc	Seen	14	38	37
166	2020-10-23 08:08:04.107319	2020-10-26 05:38:43.75619	ừ	Seen	14	38	37
208	2020-10-26 02:45:28.728932	2020-10-26 05:38:43.863018	hi	Seen	16	2	37
212	2020-10-26 02:50:08.990982	2020-10-26 05:38:43.863018	hi from admin	Seen	16	2	37
234	2020-10-26 08:20:18.736707	2020-10-26 08:20:18.736707	kaka	Sent	18	2	2
228	2020-10-26 08:18:32.17495	2020-10-26 08:20:18.751363	Test	Seen	18	59	2
233	2020-10-26 08:20:02.885488	2020-10-26 08:20:18.751363	hehe	Seen	18	59	2
200	2020-10-23 10:30:27.262135	2020-10-23 10:39:20.329994	353543	Seen	4	2	49
77	2020-10-23 06:25:51.141759	2020-10-23 10:41:41.067916	rty	Seen	6	2	38
58	2020-10-23 06:10:01.283145	2020-10-23 10:41:41.067916	zxcasdq	Seen	6	2	38
59	2020-10-23 06:10:01.637048	2020-10-23 10:41:41.067916	we	Seen	6	2	38
171	2020-10-23 08:09:15.251557	2020-10-23 10:34:00.186282	Dhnmvxxnmn	Seen	14	37	38
169	2020-10-23 08:09:03.456955	2020-10-23 10:34:00.186282	Fgjjjfdghhv	Seen	14	37	38
167	2020-10-23 08:08:56.020182	2020-10-23 10:34:00.186282	Vhhjjjuuugjjjgffjj	Seen	14	37	38
187	2020-10-23 08:44:53.749264	2020-10-23 10:34:00.186282	Hu	Seen	14	37	38
60	2020-10-23 06:10:01.946623	2020-10-23 10:41:41.067916	rt	Seen	6	2	38
61	2020-10-23 06:10:02.260444	2020-10-23 10:41:41.067916	rtr	Seen	6	2	38
62	2020-10-23 06:10:02.509112	2020-10-23 10:41:41.067916	tr	Seen	6	2	38
172	2020-10-23 08:09:15.311961	2020-10-26 02:57:44.297884	Kgaadhhsd	Seen	15	41	38
170	2020-10-23 08:09:03.527766	2020-10-26 02:57:44.297884	Uyresghtdg	Seen	15	41	38
168	2020-10-23 08:08:57.874002	2020-10-26 02:57:44.297884	Ffgggffghdd	Seen	15	41	38
63	2020-10-23 06:10:02.857551	2020-10-23 10:41:41.067916	e	Seen	6	2	38
44	2020-10-23 04:27:44.754693	2020-10-26 02:44:40.721302	Dung co xem nha	Seen	4	49	2
183	2020-10-23 08:43:23.373566	2020-10-26 02:57:44.297884	Te	Seen	15	41	38
221	2020-10-26 02:56:49.199479	2020-10-26 02:56:49.199479	hello 2	Sent	17	2	2
195	2020-10-23 08:56:17.742202	2020-10-26 02:57:44.297884	Qqwwee	Seen	15	41	38
191	2020-10-23 08:46:35.835205	2020-10-26 05:38:43.75619	yutuy	Seen	14	38	37
178	2020-10-23 08:33:22.480264	2020-10-26 05:38:43.75619	hjgjh	Seen	14	38	37
213	2020-10-26 02:50:36.102588	2020-10-26 05:38:43.863018	hi from admin	Seen	16	2	37
209	2020-10-26 02:45:43.858204	2020-10-26 05:38:43.863018	hi 2	Seen	16	2	37
229	2020-10-26 08:18:32.181519	2020-10-26 08:20:18.751363	test	Seen	18	59	2
225	2020-10-26 05:38:43.739969	2020-10-26 08:43:52.264663	Huhu	Seen	16	37	2
235	2020-10-27 07:45:46.507719	2020-10-27 07:45:46.507719	Hi	Sent	19	61	61
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1600317431216	Init1600317431216
2	1600412378300	UpdateSchema1600412378300
3	1600568008656	AccountGroup1600568008656
4	1600617515059	AccountGroupRelations1600617515059
5	1600682277049	UniqueAccountGroupCode1600682277049
6	1600357861470	Values1600357861470
7	1600802470353	Employee1600802470353
8	1600847762477	UpdateRelationNull1600847762477
9	1600844048352	MasterGroupValueCustomFields1600844048352
10	1600947300643	CustomDataForMasterValue1600947300643
11	1601613549645	Property1601613549645
12	1601627613264	UpdatePropertyConstructionStage1601627613264
13	1601681775437	UpdateStreetNumber1601681775437
14	1601771827080	AllowLongLatOptional1601771827080
15	1601772217012	AllowAttrachmentsNull1601772217012
16	1601773176684	RecoginzedAreaRequired1601773176684
17	1601788247249	PropertySourceConstraint1601788247249
18	1601819383012	CasbinRule1601819383012
19	1601882349216	RecognizedAreaCanBeNull1601882349216
20	1602002165004	PropertyHistoryNote1602002165004
21	1602053086285	PropertyCode1602053086285
22	1602063633705	PropertyDescription1602063633705
23	1602087707195	AccountRelations1602087707195
24	1602448131235	Collaborator1602448131235
25	1602733470981	CollaboratorConstrainUnique1602733470981
26	1602832748712	ChatSocket1602832748712
27	1602991841313	PropertyBookmark1602991841313
28	1603104339648	ConversationMessage1603104339648
29	1603162919373	UpdateColumnsForParticipants1603162919373
30	1603263364798	ResetToken1603263364798
31	1603449822770	IdentityNameForResetToken1603449822770
32	1603724078276	UpdateTypeForPropertyHistortyNote1603724078276
33	1603789040047	AddInspectionStatementNotesTable1603789040047
34	1603869575932	NoteIdCanBeNull1603869575932
35	1603871758173	AddAppraisalStatementNotedTable1603871758173
36	1603936035686	AddColumnsCommentsForTableAppraisalStatement1603936035686
37	1603963342376	InspectionStatementPropertyColumns1603963342376
38	1604033248631	AddAppraisalAuditDetailsTable1604033248631
39	1604037526825	AddColumnsAddressForAppraisalStatementsTable1604037526825
40	1604042109625	ChangeWardToDistrictInEmployeeRegion1604042109625
41	1604045940765	ChangeApprovedAtColumnToDate1604045940765
42	1604046805730	AddColumnsApprovedForPropertyTable1604046805730
43	1604153218347	addUpdateColumnsLandPropertyPriceForAppraisalStatementTable1604153218347
44	1604244699911	updateColumnsTypeJsonbForAppraisalStatmentTable1604244699911
45	1604258780090	InspectionStatementAddLandUseRightsColumn1604258780090
46	1604290289418	addColumnsCityWardCompletedForAppraisalStatmentTable1604290289418
47	1604300951534	InspectionStatementLevelRelationCanBeNull1604300951534
48	1604328996696	chanageColumnsAdjustPricesForAppraisalStatementTable1604328996696
49	1604390048450	InspectionStatementLevelRenameMasterValueColumn1604390048450
50	1604401357757	InspectionStatementAddRejectedTime1604401357757
51	1604391864101	addColumnsTotalLevelsForAppraisalAuditDetailTable1604391864101
52	1604626988261	ChangeTypeFloatForAppraisalStatementTable1604626988261
53	1604654307186	AddColumnsAdjustmentsForAppraisalAuditDetailsTable1604654307186
\.


--
-- Data for Name: participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.participants (id, created_at, updated_at, conversation_id, account_id, last_seen_id) FROM stdin;
1	2020-10-22 10:16:19.708188	2020-10-22 10:16:19.708188	1	48	\N
2	2020-10-22 10:16:19.708188	2020-10-22 10:16:19.708188	1	32	\N
32	2020-10-26 02:44:21.147116	2020-10-26 08:43:52.260008	16	2	227
15	2020-10-23 03:49:30.119533	2020-10-23 04:27:36.817136	8	2	43
9	2020-10-22 10:52:39.71271	2020-10-23 10:28:27.129099	5	49	198
3	2020-10-22 10:22:02.424062	2020-10-22 10:32:11.85051	2	48	3
5	2020-10-22 10:35:24.02609	2020-10-22 10:35:24.02609	3	48	\N
6	2020-10-22 10:35:24.02609	2020-10-22 10:35:24.02609	3	48	\N
20	2020-10-23 04:01:57.314436	2020-10-23 04:27:47.564619	10	2	45
37	2020-10-27 07:45:43.525208	2020-10-27 07:45:46.527602	19	61	235
39	2020-10-30 02:24:11.016686	2020-10-30 02:24:11.016686	20	60	\N
40	2020-10-30 02:24:11.016686	2020-10-30 02:24:11.016686	20	2	\N
28	2020-10-23 06:09:09.200056	2020-10-23 10:34:00.183769	14	38	201
13	2020-10-23 03:27:48.629665	2020-10-23 04:34:13.60196	7	38	49
10	2020-10-22 10:52:39.71271	2020-10-23 04:34:18.013403	5	38	28
4	2020-10-22 10:22:02.424062	2020-10-23 04:34:27.272643	2	38	50
38	2020-10-27 07:45:43.525208	2020-10-30 06:35:46.490706	19	2	235
24	2020-10-23 04:54:23.90362	2020-10-23 06:04:32.695581	12	32	52
8	2020-10-22 10:50:05.773046	2020-10-23 10:39:20.326828	4	49	202
25	2020-10-23 06:06:41.858968	2020-10-23 06:06:41.858968	13	32	\N
26	2020-10-23 06:06:41.858968	2020-10-23 06:06:41.858968	13	25	\N
11	2020-10-23 03:26:39.497787	2020-10-23 10:41:41.064723	6	38	207
12	2020-10-23 03:26:39.497787	2020-10-26 02:44:30.805978	6	2	207
7	2020-10-22 10:50:05.773046	2020-10-26 02:44:40.718768	4	2	202
14	2020-10-23 03:27:48.629665	2020-10-23 03:27:48.629665	7	22	\N
16	2020-10-23 03:49:30.119533	2020-10-23 03:49:30.119533	8	25	\N
18	2020-10-23 03:57:02.519046	2020-10-23 03:57:02.519046	9	24	\N
23	2020-10-23 04:54:23.90362	2020-10-23 06:11:48.851361	12	37	52
19	2020-10-23 04:01:57.314436	2020-10-23 04:24:20.277511	10	39	33
22	2020-10-23 04:25:39.554052	2020-10-23 04:25:39.554052	11	29	\N
21	2020-10-23 04:25:39.554052	2020-10-23 04:26:17.636005	11	2	37
17	2020-10-23 03:57:02.519046	2020-10-23 04:26:23.1864	9	2	38
34	2020-10-26 02:54:52.252371	2020-10-26 02:56:49.212073	17	2	221
30	2020-10-23 07:10:35.711814	2020-10-26 02:57:44.295223	15	38	223
33	2020-10-26 02:54:52.252371	2020-10-26 02:57:50.413454	17	41	221
29	2020-10-23 07:10:35.711814	2020-10-26 02:57:52.495014	15	41	223
27	2020-10-23 06:09:09.200056	2020-10-26 05:38:43.747125	14	37	224
31	2020-10-26 02:44:21.147116	2020-10-26 05:38:43.847953	16	37	227
36	2020-10-26 08:15:43.194635	2020-10-26 08:20:18.748833	18	2	234
35	2020-10-26 08:15:43.194635	2020-10-26 08:20:19.27614	18	59	234
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.properties (id, created_at, updated_at, is_active, general_note, price, longitude, latitude, city_id, ward_id, district_id, street_id, location_type_id, urgent_level_id, attachments, land_plot, map, horizontal_front, horizontal_back, height1, height2, property_type_id, property_period_id, property_using_id, recognized_area, unrecognized_area, recognized_planning_area, ground_floors, mezzanines, basements, roofs, structure, recognized_floor_area, unrecognized_floor_area, construction_note, deal_stage, business_status, transaction_date, closed_deal_value, status, created_by, updated_by, construction_current_stage, street_number, source_id, broker, code, description, approved_at, approved_by) FROM stdin;
71	2020-10-15 04:48:23.102123	2020-10-15 07:08:29.101227	t	15/2	2	0	0	61	68	62	74	98	97	[]	1	1	1	1	1	1	113	115	114	1	1	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	15/1	2	\N	BDS20q10027	1	\N	\N
87	2020-11-02 08:44:31.165634	2020-11-02 08:44:31.165634	t	Bbbnnnnn	5	106.6859616	10.756892	61	69	62	74	98	97	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Nháp	64	64	Không có công trình	567	64	\N	BDS20q10043	\N	\N	\N
56	2020-10-10 16:11:03.423162	2020-10-10 16:22:41.654495	t	10 ghi chu	10	\N	\N	61	68	62	74	98	97	[]	10	10	10	10	10	10	113	115	116	10	10	10	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	10	2	\N	BDS20q10013	10 mota	\N	\N
65	2020-10-12 06:45:58.244289	2020-10-23 10:28:51.931048	t	Ghh	5	0	0	61	72	62	74	98	97	[{"key":"1602669420858","mimeType":"image/jpeg","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602669420858"},{"key":"1602669438160","mimeType":"image/jpeg","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602669438160"},{"key":"1602669449238","mimeType":"image/jpeg","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602669449238"},{"key":"1602669469111","mimeType":"text/csv","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602669469111"}]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Nháp	2	37	Không có công trình	121:1	2	\N	BDS20q10022	\N	\N	\N
59	2020-10-11 05:00:36.16459	2020-10-11 09:13:47.427992	t	\N	5454	106.62118445289065	10.774223879470428	61	68	62	73	98	97	[]	5445	5454	545	545	5454	5454	113	117	114	4554	5454	5454	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã duyệt	2	2	Không có công trình	123 son	2	\N	BDS20q10016	454	\N	\N
78	2020-10-29 07:44:50.041397	2020-11-04 07:11:56.427787	t	\N	2	\N	\N	61	68	62	74	98	97	[]	1	1	1	1	1	1	113	115	114	1	1	1	1	1	1	1	1	1	1	1	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	60	64	Có công trình	29/10/02	60	\N	BDS20q10034	test	\N	\N
74	2020-10-23 10:29:45.295434	2020-10-26 08:29:34.798105	t	\N	12	0	0	61	72	62	76	98	97	[{"key":"1603448849206","mimeType":"image/png","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1603448849206"},{"key":"1603448865950","mimeType":"application/pdf","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1603448865950"}]	12	121	4	7	12	10	113	115	116	48	23	12	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Chờ duyệt	2	59	Không có công trình	174 KBNH	2	\N	BDS20q10030	nhà cũ, không ở, cho thuê mặt bằng	\N	\N
62	2020-10-11 09:57:32.909417	2020-10-27 10:51:44.978882	t	Ghi chú 1\nNote 1\nE	15	106.7004213	10.7664848	61	72	62	78	98	97	[{"key":"1603449490910","mimeType":"image/jpeg","fileName":"1603449490910","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1603449490910","size":"0"}]	\N	\N	6	6	20	20	113	115	116	100	20	80	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Chờ duyệt	2	2	Không có công trình	002KNG	2	\N	BDS20q10019	ha ha hi hi	\N	\N
68	2020-10-12 07:47:19.428236	2020-10-12 07:48:00.935871	t		15	0	0	61	70	62	76	98	97	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	001DEMO	2	\N	BDS20q10024	\N	\N	\N
44	2020-10-09 06:50:03.872794	2020-10-28 03:52:32.396227	t	test 91	91	\N	\N	61	68	62	73	98	97	[{"key":"1602226117768","mimeType":"image/png","fileName":"1602226117768","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226117768","size":"117236"},{"key":"1602226121641","mimeType":"image/png","fileName":"1602226121641","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226121641","size":"117236"},{"key":"1602226124012","mimeType":"image/png","fileName":"1602226124012","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226124012","size":"115556"},{"key":"1602226126389","mimeType":"image/png","fileName":"1602226126389","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226126389","size":"117236"},{"key":"1602226129281","mimeType":"image/png","fileName":"1602226129281","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226129281","size":"33754"},{"key":"1602226132587","mimeType":"image/png","fileName":"1602226132587","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226132587","size":"225981"},{"key":"1602226134967","mimeType":"image/png","fileName":"1602226134967","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226134967","size":"33754"},{"key":"1602226137387","mimeType":"image/png","fileName":"1602226137387","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226137387","size":"115556"},{"key":"1602226139756","mimeType":"image/png","fileName":"1602226139756","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226139756","size":"115556"},{"key":"1602226142370","mimeType":"image/png","fileName":"1602226142370","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226142370","size":"115556"},{"key":"1602226144761","mimeType":"image/png","fileName":"1602226144761","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226144761","size":"115556"},{"key":"1602226147128","mimeType":"image/png","fileName":"1602226147128","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226147128","size":"115556"},{"key":"1602226151838","mimeType":"image/png","fileName":"1602226151838","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226151838","size":"120673"},{"key":"1602226155395","mimeType":"image/png","fileName":"1602226155395","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226155395","size":"225981"},{"key":"1602226162876","mimeType":"image/png","fileName":"1602226162876","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226162876","size":"111058"},{"key":"1602226165401","mimeType":"image/png","fileName":"1602226165401","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226165401","size":"129776"},{"key":"1602226167899","mimeType":"image/png","fileName":"1602226167899","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226167899","size":"120673"},{"key":"1602226188328","mimeType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","fileName":"1602226188328","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226188328","size":"1312125"},{"key":"1602226547213","mimeType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","fileName":"demo.docx","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226547213","size":"1312125"},{"key":"1602226582992","mimeType":"image/png","fileName":"2020-10-07_133836.png","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602226582992","size":"173824"}]	91	91	91	91	91	91	113	115	114	91	91	91	9	9	9	9	9	9	9	91 note 	Đang giao dịch	Chờ tiếp nhận	\N	\N	Đã duyệt	2	2	Có công trình	09/1	2	\N	BDS20q10001	09/1 mota	\N	\N
90	2020-11-05 06:23:50.085375	2020-11-05 06:23:50.085375	t	\N	15	\N	\N	61	68	62	122	98	97	[]	4	222	5	5	25	25	113	115	116	100	25	90	3	1	0	1	hihi	300	100	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	66	66	Có công trình	302	67	\N	BDS20q10046	hehe	\N	\N
81	2020-11-02 06:45:47.561887	2020-11-02 06:45:47.561887	t	3	3	\N	\N	61	68	62	73	98	97	[]	54	45	54	54	45	45	113	115	114	45	54	54	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Chờ duyệt	2	2	Không có công trình	212	2	\N	BDS20q10037	123	\N	\N
96	2020-11-06 09:25:07.72581	2020-11-06 09:27:42.251352	t	\N	15	106.6933271	10.7720737	61	232	64	82	197	97	[]	25	50	4	4	25	25	194	115	116	100	0	0	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã duyệt	66	66	Không có công trình	611/Q3	68	\N	BDS20q30002	CTV2	2020-11-06 09:27:42.249	66
93	2020-11-06 04:30:26.657456	2020-11-06 06:44:07.341976	t	\N	23	\N	\N	201	210	202	223	197	190	[{"key":"1604636791826","mimeType":"image/jpeg","fileName":"1604636791826","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604636791826","size":"56664"},{"key":"1604636822112","mimeType":"image/jpeg","fileName":"1604636822112","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604636822112","size":"34411"},{"key":"1604636883532","mimeType":"application/pdf","fileName":"1604636883532","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604636883532","size":"140871"},{"key":"1604644452887","mimeType":"image/jpeg","fileName":"1604644452887","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604644452887","size":"74496"}]	13	12345	20	20	30	30	194	115	116	550	50	\N	2	1	0	0	bê tông	150	50	\N	Đang giao dịch	Không có	\N	\N	Đã duyệt	56	56	Có công trình	174	22	\N	BDS20010001	mini villa có vườn rộng	2020-11-06 06:44:07.337	56
84	2020-11-02 06:59:04.763542	2020-11-06 15:00:08.483004	t	45	54	\N	\N	61	68	62	73	98	97	[]	45	54	5	5	54	54	113	115	114	45	45	54	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	2	56	Không có công trình	44444	27	\N	BDS20q10040	445	2020-11-06 14:58:45.215	56
57	2020-10-10 16:12:14.704958	2020-10-10 16:12:14.704958	t	\N	10	\N	\N	61	68	62	74	98	97	[]	10	10	10	10	10	10	113	115	116	1	1	1	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	10	2	\N	BDS20q10014	10 dup adress	\N	\N
60	2020-10-11 06:18:04.933104	2020-10-11 06:18:04.933104	t	\N	3	\N	\N	61	68	62	73	98	97	[]	4	4	4	4	4	4	113	115	114	4	4	4	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	123 son	2	\N	BDS20q10017	13	\N	\N
75	2020-10-24 03:28:56.742524	2020-10-24 03:29:26.279778	t		30	0	0	61	68	62	73	98	97	[{"key":"1603510112960","mimeType":"image/jpeg","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1603510112960"},{"key":"1603510131414","mimeType":"application/pdf","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1603510131414"}]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Chờ duyệt	2	2	Không có công trình	H0001	2	\N	BDS20q10031	\N	\N	\N
82	2020-11-02 06:47:31.503886	2020-11-02 06:47:31.503886	t	334	3434	\N	\N	61	69	62	74	98	97	[]	34343	343	43434	43434	34	34	113	115	114	34	34	43	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Chờ duyệt	2	2	Không có công trình	33333	2	\N	BDS20q10038	34	\N	\N
69	2020-10-14 08:19:14.983258	2020-10-14 08:19:56.075989	t	\N	2	\N	\N	61	72	62	76	98	97	[]	1	4	2	2	3	3	113	115	114	234	23	34	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	1412	2	\N	BDS20q10025	2	\N	\N
85	2020-11-02 08:29:09.057453	2020-11-02 08:29:09.057453	t	Abc	12	106.692207	10.766455	61	68	62	74	98	97	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Nháp	64	64	Không có công trình	123	64	\N	BDS20q10041	\N	\N	\N
76	2020-10-29 06:44:00.197532	2020-11-05 07:44:26.139849	t	test hạn mức 	7	\N	\N	61	68	62	74	98	97	[{"key":"1603952640201","mimeType":"application/pdf","fileName":"BusinessOverView_diagram.pdf","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1603952640201","size":"140871"}]	\N	\N	35	40	20	30	113	115	116	700	50	150	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	60	64	Không có công trình	2910N1	60	\N	BDS20q10032	1 trệt, 1 lửng, sân vườn rộng	\N	\N
66	2020-10-12 06:56:47.157486	2020-10-14 09:50:14.757181	t		5	0	0	61	121	63	79	98	97	[{"key":"1602668869181","mimeType":"image/jpeg","fileName":"1602668869181","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602668869181","size":"0"},{"key":"1602668881227","mimeType":"image/jpeg","fileName":"1602668881227","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602668881227","size":"0"},{"key":"1602668874162","mimeType":"application/msword","fileName":"1602668874162","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602668874162","size":"0"}]	1	1	1	1	1	1	113	115	114	1	1	1	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	122	2	\N	BDS20q20001	1	\N	\N
88	2020-11-03 06:56:03.994013	2020-11-03 06:56:03.994013	t	\N	4	\N	\N	61	68	62	73	98	97	[{"key":"1604377132867","mimeType":"image/jpeg","fileName":"house2.jfif","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604377132867","size":"11684"},{"key":"1604377151394","mimeType":"image/jpeg","fileName":"gate2.jfif","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604377151394","size":"12934"},{"key":"1604377166319","mimeType":"image/jpeg","fileName":"yard7.jfif","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604377166319","size":"14515"}]	\N	\N	30	30	60	60	113	115	116	1000	800	\N	2	0	1	1	bê tông cách âm cách nhiệt	250	100	\N	Đang giao dịch	Không có	\N	\N	Chờ duyệt	60	60	Có công trình	02np201103001	22	\N	BDS20q10044	test lung tung	\N	\N
72	2020-10-15 04:49:06.354388	2020-10-20 09:16:13.646106	t	Abcdèghklmnop	66	0	0	61	68	62	74	98	97	[{"key":"1602737329995","mimeType":"image/jpeg","fileName":"1602737329995","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602737329995","size":"0"}]	1	1	1	1	1	1	113	115	114	1	1	1	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	2345	2	\N	BDS20q10028	1	\N	\N
63	2020-10-12 06:19:07.777897	2020-11-04 07:55:28.863758	t	12 ghi chu	12	0	0	61	69	62	74	98	97	[{"key":"1603449648492","mimeType":"image/jpeg","fileName":"1603449648492","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1603449648492","size":"0"}]	12	12	12	12	12	12	113	115	114	23	34	12	12	12	12	12	12	12	12	12 ghi chu	Đang giao dịch	Không có	\N	\N	Đã duyệt	2	2	Không có công trình	93	27	\N	BDS20q10020	12 dup	2020-11-04 07:55:28.862	2
91	2020-11-05 07:30:15.773532	2020-11-05 07:30:15.773532	t	\N	12	106.63982870029899	10.799361022629792	61	68	62	73	98	97	[{"key":"1604561384234","mimeType":"image/jpeg","fileName":"HOT JOB 2.jpg","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604561384234","size":"185932"}]	d1234	123ewrew	1	1	1	11	113	115	114	1	1	1	1	1	1	1	1	1	1	ádqweqwe	Đang giao dịch	Không có	\N	\N	Chờ duyệt	38	38	Có công trình	12	25	\N	BDS20q10047	ban nha	\N	\N
79	2020-10-29 07:50:44.877385	2020-11-06 07:37:19.29368	t	test	7	\N	\N	61	72	62	74	98	97	[{"key":"1603957723346","mimeType":"image/jpeg","fileName":"1603957723346","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1603957723346","size":"12632"},{"key":"1603957735641","mimeType":"application/pdf","fileName":"1603957735641","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1603957735641","size":"140871"},{"key":"1604648228676","mimeType":"image/jpeg","fileName":"gate4.jpg","url":"https://hspace-storage-qa.s3.ap-southeast-1.amazonaws.com/1604648228676","size":"199084"}]	\N	\N	30	40	20	35	113	115	116	1200	300	200	1	1	1	1	nhà trệt, mái ngói, sân vườn	200	0	\N	Đang giao dịch	Không có	\N	\N	Chờ duyệt	60	60	Có công trình	2910N02	60	\N	BDS20q10035	nhà vườn	\N	\N
94	2020-11-06 08:39:33.790132	2020-11-06 08:39:33.790132	t	\N	20	106.6775003	10.7712124	61	232	64	83	197	97	[]	45	168	6	6	30	30	194	115	116	150	30	12	3	1	0	1	GGG	450	30	\N	Đang giao dịch	Không có	\N	\N	Chờ duyệt	66	66	Có công trình	511	67	\N	BDS20q30001	ggg	\N	\N
95	2020-11-06 09:22:43.291847	2020-11-06 09:36:41.89366	t	\N	12	106.681471	10.786629	61	68	62	122	98	97	[]	34	68	5	6	20	20	194	115	116	110	10	10	4	1	0	1	TTT	400	50	GG	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	66	66	Có công trình	611/Q1	67	\N	BDS20q10049	CTV1	2020-11-06 09:27:37.605	66
89	2020-11-04 07:23:37.560694	2020-11-04 07:35:07.896693	t	\N	12	\N	\N	61	68	62	122	98	97	[]	5	167	5	5	25	25	113	115	116	100	25	90	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	66	66	Không có công trình	302	25	\N	BDS20q10045	Hahaha	2020-11-04 07:24:04.855	66
54	2020-10-09 10:49:33.653631	2020-10-10 16:43:04.803701	t		5	106.6965748	10.7698062	61	69	62	74	98	97	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	12	2	\N	BDS20q10011	\N	\N	\N
52	2020-10-09 10:46:35.668272	2020-10-12 06:41:02.13498	t		1	0	0	61	69	62	74	98	97	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	55	2	\N	BDS20q10009	\N	\N	\N
50	2020-10-09 10:01:04.555439	2020-10-10 16:21:44.161474	t		1	0	0	61	69	62	73	98	97	[]	\N	\N	1	1	1	1	113	115	114	23	22	33	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	123	2	\N	BDS20q10007	Sam cảnh cáo nếu những lỗ hổng này bị các hacker khác tận dụng, Apple sẽ phải đối mặt với một scandal rò rỉ dữ liệu lớn nhất trong lịch sử, khi những kẻ tấn công sẽ có quyền truy cập vào các công cụ nội bộ được sử dụng để quản lý thông tin người dùng và cũng có thể thay đổi hệ thống xung quanh để hoạt động như ý định của hacker.	\N	\N
61	2020-10-11 09:24:35.788143	2020-10-11 09:41:35.692036	t	Khanh check	35	106.6899454	10.7655402	61	72	62	77	98	97	[{"key":"1602408741573","mimeType":"image/png","fileName":"1602408741573","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602408741573","size":"177451"}]	3	4	5	5	20	20	113	115	116	80	20	80	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã duyệt	2	2	Không có công trình	001KNG	2	\N	BDS20q10018	Giá thuê không có	\N	\N
49	2020-10-09 09:19:57.428218	2020-10-10 16:25:17.682472	t	\N	1	0	0	61	71	62	74	98	97	[]	1	1	1	1	1	1	113	115	114	1	1	1	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	167	2	\N	BDS20q10006	1	\N	\N
64	2020-10-12 06:20:09.629987	2020-10-12 06:20:09.629987	t	\N	12	\N	\N	61	68	62	73	98	97	[]	1	1	1	1	1	1	113	117	114	1	1	1	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	12	2	\N	BDS20q10021	12 dup 2	\N	\N
58	2020-10-10 16:35:38.703275	2020-10-10 16:42:22.011219	t		6	0	0	61	69	62	74	98	97	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	12	2	\N	BDS20q10015	\N	\N	\N
70	2020-10-14 08:23:57.915638	2020-10-14 08:24:18.127514	t	\N	3	\N	\N	61	69	62	77	98	97	[]	3	3	3	3	3	3	113	115	114	452	23	22	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	1413	2	\N	BDS20q10026	3	\N	\N
55	2020-10-09 10:50:31.690049	2020-10-28 01:56:46.759192	t		2	0	0	61	69	62	73	98	97	[]	\N	\N	5	5	10	10	113	115	114	45	5	40	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Đã tiếp nhận	\N	\N	Đã duyệt	2	2	Không có công trình	124	2	\N	BDS20q10012	Mật dộ tốt	\N	\N
45	2020-10-09 07:04:00.164028	2020-10-15 07:05:53.993612	t	\N	92	\N	\N	61	69	62	74	98	97	[]	\N	92	93	93	92	92	113	115	114	92	92	92	92	92	92	92	92	92	92	92 note	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	93	2	\N	BDS20q10002	92 mota	\N	\N
83	2020-11-02 06:55:29.00941	2020-11-02 06:55:29.00941	t	\N	5	\N	\N	61	68	62	73	98	97	[]	54	45	54	54	545	545	113	115	114	54	54	54	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Chờ duyệt	2	2	Không có công trình	4444	2	\N	BDS20q10039	4	\N	\N
48	2020-10-09 08:41:53.631863	2020-10-22 02:51:28.728115	t	Y	2	106.6880353	10.7585714	61	68	62	74	98	97	[]	111	222	333	44	555	666	113	115	114	4	77	88	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Đã tồn tại	2	2	Không có công trình	15/1	2	\N	BDS20q10005	4	\N	\N
73	2020-10-22 02:51:05.89639	2020-10-28 06:56:03.319209	t	23	23	106.66003990120605	10.764603533817782	61	68	62	73	98	97	[]	2	3	4	4	4	4	113	115	114	5	6	4	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Chờ tiếp nhận	\N	\N	Đã duyệt	2	2	Không có công trình	43	2	\N	BDS20q10029	23	\N	\N
46	2020-10-09 08:10:42.479173	2020-10-27 02:45:26.986284	t	Bác	5	106.69931396842003	10.770676955259516	61	69	62	78	98	97	[{"key":"1602231029648","mimeType":"image/jpeg","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602231029648"},{"key":"1602645490116","mimeType":"image/png","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602645490116"},{"key":"1602646104068","mimeType":"image/jpeg","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602646104068"},{"key":"1602646501693","mimeType":"image/jpeg","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602646501693"}]	\N	\N	5	5	20	20	113	115	116	100	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Nháp	2	37	Không có công trình	Nv1 h1 02	2	\N	BDS20q10003	Mo ta	\N	\N
86	2020-11-02 08:31:26.195781	2020-11-02 08:31:26.195781	t	Soluta dolorem ipsum	12	\N	\N	61	69	62	74	98	97	[]	Consequatur Et magn	Numquam irure dolore	12	12	12	12	113	117	114	100	22	23	4	1	1	1	asdasd	120	0	asdasd	Đang giao dịch	Không có	\N	\N	Chờ duyệt	64	64	Có công trình	107	64	\N	BDS20q10042	Molestiae in tempori	\N	\N
80	2020-10-30 11:28:31.947606	2020-11-03 07:34:37.851845	t	Sapiente rerum ipsa	141	106.6924518	10.7649719	61	69	62	74	98	97	[]	Inventore quis occae	Qui facilis velit vo	12	12	12	12	113	115	116	55	55	0	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	61	64	Không có công trình	746	61	\N	BDS20q10036	Aut qui quia est mag	\N	\N
67	2020-10-12 07:36:22.232815	2020-11-04 10:05:48.04155	t		15	106.68056044408054	10.777656964232719	61	70	62	76	98	97	[{"key":"1602488174278","mimeType":"image/jpeg","fileName":"1602488174278","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602488174278","size":"0"},{"key":"1602489007495","mimeType":"image/png","fileName":"Untitled.png","url":"https://hspace-storage-qa.s3.ap-east-1.amazonaws.com/1602489007495","size":"20146"}]	3	15	5	5	20	20	113	115	116	80	20	75	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	2	64	Không có công trình	001DEMO	2	\N	BDS20q10023	Mô tả	\N	\N
77	2020-10-29 07:38:50.119464	2020-11-04 07:21:44.801925	t	\N	1	\N	\N	61	68	62	73	98	97	[]	1	1	1	1	1	1	113	115	114	1	1	1	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	62	64	Không có công trình	2910	62	\N	BDS20q10033	test	\N	\N
47	2020-10-09 08:27:51.214956	2020-11-04 07:24:33.271595	t	\N	91	\N	\N	61	68	62	73	98	97	[]	91	1	91	91	1	1	113	115	114	1	1	1	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	2	64	Không có công trình	91	2	\N	BDS20q10004	dup	\N	\N
92	2020-11-06 03:56:39.798699	2020-11-06 04:09:16.921911	t	\N	16	106.6737932	10.7898896	61	68	62	122	197	97	[]	45	128	5	6	25	26	194	115	116	120	15	100	3	1	1	1	Bê tông	300	120	Không có	Đang giao dịch	Đang thẩm định	\N	\N	Đã duyệt	66	66	Có công trình	411	68	\N	BDS20q10048	Khanh Test	2020-11-06 03:57:11.931	66
51	2020-10-09 10:02:51.089048	2020-10-09 10:02:51.089048	t		2	0	0	61	69	62	73	98	97	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Nháp	2	2	Không có công trình	12	2	\N	BDS20q10008	\N	\N	\N
53	2020-10-09 10:48:26.954593	2020-10-09 10:48:26.954593	t		2	0	0	61	69	62	73	98	97	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Đang giao dịch	Không có	\N	\N	Nháp	2	2	Không có công trình	3	2	\N	BDS20q10010	\N	\N	\N
\.


--
-- Data for Name: property_bookmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_bookmarks (id, created_at, updated_at, is_active, property_id, bookmarker_id, bookmark_date, created_by, updated_by) FROM stdin;
7	2020-10-26 08:25:54.280694	2020-10-26 08:25:54.280694	t	47	2	2020-10-26 08:25:54.275	2	2
8	2020-10-26 08:25:58.422257	2020-10-26 08:25:58.422257	t	73	2	2020-10-26 08:25:58.416	2	2
10	2020-11-06 06:45:06.846185	2020-11-06 06:45:06.846185	t	93	60	2020-11-06 06:45:06.837	60	60
\.


--
-- Data for Name: property_history_notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_history_notes (id, created_at, updated_at, is_active, property_id, type, reason_id, notes, created_by, updated_by) FROM stdin;
15	2020-10-09 07:19:56.037158	2020-10-09 07:19:56.037158	t	44	Approve	\N	\N	2	2
16	2020-10-09 08:42:35.32927	2020-10-09 08:42:35.32927	t	48	Other	\N	Submit	2	2
17	2020-10-09 11:43:20.371835	2020-10-09 11:43:20.371835	t	50	Other	\N	Submit	2	2
18	2020-10-10 02:57:24.829104	2020-10-10 02:57:24.829104	t	47	Approve	\N	\N	2	2
19	2020-10-10 02:57:53.845179	2020-10-10 02:57:53.845179	t	49	Other	119	344	2	2
20	2020-10-10 16:19:44.31642	2020-10-10 16:19:44.31642	t	56	Other	119	tesst ~!@#$%^&*()_++_|}{[]\\":;'?><,./ 1234567890	2	2
21	2020-10-10 16:20:52.436164	2020-10-10 16:20:52.436164	t	50	Other	118	\N	2	2
22	2020-10-10 16:21:44.174752	2020-10-10 16:21:44.174752	t	50	Other	\N	Submit	2	2
23	2020-10-10 16:22:41.667649	2020-10-10 16:22:41.667649	t	56	Other	\N	Submit	2	2
24	2020-10-10 16:25:17.686731	2020-10-10 16:25:17.686731	t	49	Other	\N	Submit	2	2
25	2020-10-10 16:42:22.016026	2020-10-10 16:42:22.016026	t	58	Other	\N	Submit	2	2
26	2020-10-10 16:43:04.815876	2020-10-10 16:43:04.815876	t	54	Other	\N	Submit	2	2
27	2020-10-11 09:13:47.434506	2020-10-11 09:13:47.434506	t	59	Approve	\N	\N	2	2
28	2020-10-11 09:27:17.473022	2020-10-11 09:27:17.473022	t	61	Other	\N	Submit	2	2
29	2020-10-11 09:27:37.4838	2020-10-11 09:27:37.4838	t	61	Other	119	test	2	2
30	2020-10-11 09:28:45.27537	2020-10-11 09:28:45.27537	t	61	Other	\N	Submit	2	2
31	2020-10-11 09:41:35.69607	2020-10-11 09:41:35.69607	t	61	Approve	\N	\N	2	2
32	2020-10-11 09:57:55.763909	2020-10-11 09:57:55.763909	t	62	Other	118	\N	2	2
33	2020-10-11 09:59:33.279906	2020-10-11 09:59:33.279906	t	62	Other	\N	Submit	2	2
34	2020-10-12 06:39:36.079931	2020-10-12 06:39:36.079931	t	46	Other	\N	Submit	2	2
35	2020-10-12 06:41:02.140287	2020-10-12 06:41:02.140287	t	52	Other	\N	Submit	2	2
36	2020-10-12 07:23:27.296229	2020-10-12 07:23:27.296229	t	48	Other	118	\N	2	2
37	2020-10-12 07:37:25.055418	2020-10-12 07:37:25.055418	t	67	Other	\N	Submit	2	2
38	2020-10-12 07:37:56.004574	2020-10-12 07:37:56.004574	t	67	Other	118	\N	2	2
39	2020-10-12 07:38:30.545615	2020-10-12 07:38:30.545615	t	67	Other	\N	Submit	2	2
40	2020-10-12 07:48:00.943396	2020-10-12 07:48:00.943396	t	68	Other	\N	Submit	2	2
41	2020-10-12 07:51:32.408328	2020-10-12 07:51:32.408328	t	67	Other	118	\N	2	2
42	2020-10-12 07:52:10.389877	2020-10-12 07:52:10.389877	t	67	Other	\N	Submit	2	2
43	2020-10-12 07:52:37.999526	2020-10-12 07:52:37.999526	t	67	Approve	\N	\N	2	2
44	2020-10-14 03:22:55.404661	2020-10-14 03:22:55.404661	t	46	Other	118	\N	2	2
45	2020-10-14 03:23:42.83061	2020-10-14 03:23:42.83061	t	46	Other	\N	Submit	2	2
46	2020-10-14 03:27:36.031577	2020-10-14 03:27:36.031577	t	46	Other	118	\N	2	2
47	2020-10-14 03:29:24.212573	2020-10-14 03:29:24.212573	t	46	Other	\N	Submit	2	2
48	2020-10-14 03:31:08.550112	2020-10-14 03:31:08.550112	t	46	Other	118	\N	2	2
49	2020-10-14 03:35:12.365623	2020-10-14 03:35:12.365623	t	46	Other	\N	Submit	2	2
50	2020-10-14 09:48:12.518617	2020-10-14 09:48:12.518617	t	66	Other	\N	Submit	2	2
51	2020-10-14 09:58:19.975466	2020-10-14 09:58:19.975466	t	65	Other	\N	Submit	2	2
52	2020-10-15 04:46:04.499973	2020-10-15 04:46:04.499973	t	48	Other	\N	Submit	2	2
53	2020-10-15 04:48:34.959802	2020-10-15 04:48:34.959802	t	71	Other	\N	Submit	2	2
54	2020-10-15 04:49:33.724105	2020-10-15 04:49:33.724105	t	72	Other	\N	Submit	2	2
55	2020-10-22 06:36:08.105874	2020-10-22 06:36:08.105874	t	46	Reject	118	\N	2	2
56	2020-10-23 03:38:09.132952	2020-10-23 03:38:09.132952	t	65	Reject	119	\N	2	2
57	2020-10-23 03:58:13.39877	2020-10-23 03:58:13.39877	t	73	Approve	\N	\N	2	2
58	2020-10-23 04:33:53.311884	2020-10-23 04:33:53.311884	t	63	Reject	119	3w434343	2	2
59	2020-10-23 07:28:10.11293	2020-10-23 07:28:10.11293	t	62	Reject	119	test	38	38
60	2020-10-23 07:55:25.020125	2020-10-23 07:55:25.020125	t	55	Other	\N	Submit	37	37
61	2020-10-23 10:40:13.597846	2020-10-23 10:40:13.597846	t	62	Other	\N	Submit	37	37
62	2020-10-23 10:41:04.280504	2020-10-23 10:41:04.280504	t	63	Other	\N	Submit	37	37
63	2020-10-23 10:41:45.520635	2020-10-23 10:41:45.520635	t	62	Reject	119	cập nhật thêm hình ảnh	38	38
64	2020-10-23 10:44:50.168861	2020-10-23 10:44:50.168861	t	62	Other	\N	Submit	37	37
65	2020-10-24 03:29:26.282728	2020-10-24 03:29:26.282728	t	75	Other	\N	Submit	2	2
66	2020-10-26 08:23:01.488828	2020-10-26 08:23:01.488828	t	55	Approve	\N	\N	2	2
67	2020-10-26 08:26:39.484849	2020-10-26 08:26:39.484849	t	74	Reject	119	Demo	2	2
68	2020-10-26 08:29:34.801249	2020-10-26 08:29:34.801249	t	74	Other	\N	Submit	59	59
69	2020-10-28 01:56:02.374191	2020-10-28 01:56:02.374191	t	55	OnSubmit	\N	\N	2	2
70	2020-10-28 01:56:46.789977	2020-10-28 01:56:46.789977	t	55	Submitted	\N	\N	2	2
71	2020-10-28 03:52:32.469885	2020-10-28 03:52:32.469885	t	44	OnSubmit	\N	\N	2	2
72	2020-10-28 06:30:51.854628	2020-10-28 06:30:51.854628	t	67	OnSubmit	\N	\N	2	2
73	2020-10-28 06:31:00.165634	2020-10-28 06:31:00.165634	t	67	Submitted	\N	\N	2	2
74	2020-10-28 06:53:07.683956	2020-10-28 06:53:07.683956	t	47	OnSubmit	\N	\N	2	2
75	2020-10-28 06:56:03.430035	2020-10-28 06:56:03.430035	t	73	OnSubmit	\N	\N	2	2
76	2020-10-28 06:59:04.843717	2020-10-28 06:59:04.843717	t	47	Submitted	\N	\N	2	2
77	2020-10-30 11:23:57.486204	2020-10-30 11:23:57.486204	t	77	Approve	\N	\N	64	64
78	2020-10-30 11:24:17.551491	2020-10-30 11:24:17.551491	t	76	Approve	\N	\N	64	64
79	2020-10-30 11:24:30.614157	2020-10-30 11:24:30.614157	t	78	Approve	\N	\N	64	64
80	2020-10-30 11:28:54.964232	2020-10-30 11:28:54.964232	t	80	Other	\N	Submit	61	61
81	2020-10-30 11:45:55.87484	2020-10-30 11:45:55.87484	t	80	Approve	\N	\N	2	2
82	2020-11-04 07:24:04.896126	2020-11-04 07:24:04.896126	t	89	Approve	\N	\N	66	66
83	2020-11-04 07:55:28.900424	2020-11-04 07:55:28.900424	t	63	Approve	\N	\N	2	2
84	2020-11-06 03:57:12.017263	2020-11-06 03:57:12.017263	t	92	Approve	\N	\N	66	66
85	2020-11-06 06:44:07.369845	2020-11-06 06:44:07.369845	t	93	Approve	\N	\N	56	56
86	2020-11-06 09:27:37.651523	2020-11-06 09:27:37.651523	t	95	Approve	\N	\N	66	66
87	2020-11-06 09:27:42.286705	2020-11-06 09:27:42.286705	t	96	Approve	\N	\N	66	66
88	2020-11-06 14:58:45.319565	2020-11-06 14:58:45.319565	t	84	Approve	\N	\N	56	56
\.


--
-- Data for Name: reset_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reset_tokens (id, created_at, updated_at, is_active, account_id, email, hash, expired_at, status, created_by, updated_by, identity_name) FROM stdin;
34	2020-10-27 03:45:46.760665	2020-10-27 03:46:29.193878	t	2	luong.nguyen@tpptechnology.com	$2b$10$rKXhWw8zuRWv.uol/WqlIu6AtuLlnzdivSmQpZ3w9Qfjzl97H0pvy	2020-10-27 03:50:46.67	Success	2	2	admin
35	2020-10-27 03:47:13.362422	2020-10-27 03:53:06.200339	t	2	luong.nguyen@tpptechnology.com	$2b$10$zb/rR1QXzb7fPInpZX8dwezOc.zAPX9ioA0/noXSjEa2hD4UipNN6	2020-10-27 03:52:13.255	Expired	2	2	admin
36	2020-10-27 03:53:06.205291	2020-10-27 03:53:38.185088	t	2	luong.nguyen@tpptechnology.com	$2b$10$NoMEyI4Y4kJCfhkTRH6KjuWX0WY2a1SdE9NI6dseMbcYALML4/K/i	2020-10-27 03:58:06.009	Success	2	2	admin
37	2020-10-27 07:24:32.620946	2020-10-27 07:24:32.620946	t	2	luong.nguyen@tpptechnology.com	$2b$10$BJpYG1G15RUIAGBfs5/ZpOOq1I2KbN8uUjueTLfKyYO3j17jY75fi	2020-10-27 07:29:32.534	New	2	2	admin
31	2020-10-26 10:29:08.722924	2020-10-29 05:53:11.48399	t	60	ngan.pham@tpptechnology.com	$2b$10$yMz4rIIWQv5hriQd6EA.y.oQwX8jWJwcbVPzxSwA8w4m2v00Zszam	2020-10-26 10:34:08.629	Expired	60	60	02.np
38	2020-10-29 05:53:11.487138	2020-10-29 05:53:57.345446	t	60	ngan.pham@tpptechnology.com	$2b$10$2vhLT0/6vQ2vRSuzwSxa8Oal58Wh14bJctYgl1lvqsdFmYlwAqfau	2020-10-29 05:58:11.406	Success	60	60	02.np
39	2020-10-29 05:55:16.499629	2020-10-29 05:56:57.561354	t	56	argentlotus@gmail.com	$2b$10$uokU0FUq6ZxvPSzdJF8nfO8eQCoKnXH6m.ygGUofEnVyFgqjAdm2a	2020-10-29 06:00:16.416	Success	56	56	01.np
28	2020-10-26 05:08:55.512928	2020-10-26 06:06:06.914643	t	2	luong.nguyen@tpptechnology.com	$2b$10$u6D6Y5B/ulyCxl8vysNkp.IDTIBdo3LPqcgrzFIf/1Gtp6z7DM6sq	2020-10-26 05:13:55.417	Expired	2	2	admin
30	2020-10-26 08:10:19.517902	2020-10-26 08:10:39.175701	t	38	son.pham@tpptechnology.com	$2b$10$0Q..M3JCliIiIb1lISgf/uyU8vrRtJ4OPDNCk7ZYa2/TpTPoGON9S	2020-10-26 08:15:19.422	Success	38	38	son.pt
32	2020-10-27 03:21:11.208973	2020-10-27 03:21:11.208973	t	38	son.pham@tpptechnology.com	$2b$10$IoGF00LJ.0JYj59i4Si2d.LsvcEBAbe1D08MTGpjNwwSZj.xNIob6	2020-10-27 03:26:11.105	New	38	38	son.pt
29	2020-10-26 06:06:06.918201	2020-10-27 03:43:41.128011	t	2	luong.nguyen@tpptechnology.com	$2b$10$kEprHBc9YV3f1mPTY7n1zuJgvd30DW/nvb.LB12ILlTLdfMYPKZJ2	2020-10-26 06:11:06.84	Expired	2	2	admin
33	2020-10-27 03:43:41.131529	2020-10-27 03:44:36.368549	t	2	luong.nguyen@tpptechnology.com	$2b$10$GkLpBk9tsz0m4HWPXIkrSuPn9Qos.2nIubcTLmgEIOM0c/MeYCGEu	2020-10-27 03:48:41.038	Success	2	2	admin
\.


--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resources (id, created_at, updated_at, is_active, path, name, description, created_by, updated_by) FROM stdin;
1	2020-09-22 03:47:14.770686	2020-09-22 03:47:14.770686	t	/home	Home page	Home page test	2	2
2	2020-09-22 03:51:36.119517	2020-09-22 03:51:36.119517	t	/account	Account page	Account page test	2	2
3	2020-09-22 04:05:19.204388	2020-09-22 04:05:19.204388	t	/group	Group page	Group page test	2	2
4	2020-09-22 04:05:36.150139	2020-09-22 04:05:36.150139	t	/properties	Properties page	Properties page test	2	2
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, is_active, account_id, created_at, updated_at, token) FROM stdin;
1	t	2	2020-09-21 02:59:30.385285	2020-09-21 02:59:30.385285	08543497-5f1b-4d9d-82b8-11aa0ff23117
2	f	2	2020-09-21 06:55:11.187467	2020-09-21 06:55:27.49409	04e32d71-21ee-4551-bac4-dc533ac0f39c
3	f	2	2020-09-21 07:05:37.708902	2020-09-21 07:06:22.078923	e26f7b84-9477-4c2b-947e-70b877234c0b
4	f	2	2020-09-21 07:06:54.192064	2020-09-21 07:07:00.313202	9898f968-9734-4880-ab52-a3b3b36c8d99
5	t	2	2020-09-21 07:07:22.189483	2020-09-21 07:07:22.189483	fce94c91-f66d-4363-9efa-8abc724d7fe5
6	f	2	2020-09-21 07:10:02.988363	2020-09-21 07:10:32.3763	f0a49a4f-b82b-4cc5-b416-6a45ab711fe6
7	f	2	2020-09-21 07:17:00.260936	2020-09-21 07:17:09.343578	68409a86-8331-4f0f-9142-7298c20c81e4
8	t	2	2020-09-21 09:48:44.794125	2020-09-21 09:48:44.794125	04e43557-2230-4ea2-b32c-535688029f8a
9	t	2	2020-09-21 09:49:18.065139	2020-09-21 09:49:18.065139	881cefa6-b4b6-42d5-b11a-b7f2067a2ab4
10	t	2	2020-09-21 09:49:27.958669	2020-09-21 09:49:27.958669	b38e20c5-544c-436a-918b-2a50be60293e
11	t	2	2020-09-21 09:51:36.181413	2020-09-21 09:51:36.181413	2c35fc20-960b-4314-a98d-0940d07ec520
12	f	2	2020-09-21 09:52:35.834569	2020-09-21 09:52:46.118842	0ee2eed5-1b03-412f-b8e7-8b8e4847cb08
13	t	2	2020-09-21 09:52:46.708178	2020-09-21 09:52:46.708178	d27f36fb-87d9-42b3-87e9-0b6766b128b8
14	t	2	2020-09-21 09:53:00.339054	2020-09-21 09:53:00.339054	66bd5a3f-a66e-4a80-8589-0424e8a45f4c
15	t	2	2020-09-21 09:53:41.968695	2020-09-21 09:53:41.968695	bdb835ff-d5a4-4760-bc1d-4cd0183e2d0b
16	t	2	2020-09-21 09:53:44.227079	2020-09-21 09:53:44.227079	7bb5fd9e-f3b0-4c48-9ca7-ead842037a38
17	t	2	2020-09-21 09:53:48.192688	2020-09-21 09:53:48.192688	4e18e7fa-12af-48de-89c6-90ad7cc9e4c5
18	t	2	2020-09-21 09:54:08.323312	2020-09-21 09:54:08.323312	1170edd2-3c67-482d-9bf8-5c34011fa71d
19	t	2	2020-09-21 09:54:46.562521	2020-09-21 09:54:46.562521	39a5c2a9-c729-4df0-a8e9-0dbf8abe84ec
20	t	2	2020-09-21 09:55:15.431882	2020-09-21 09:55:15.431882	efc3892f-86cf-4171-aaeb-391fa78def82
21	t	2	2020-09-21 09:56:30.188269	2020-09-21 09:56:30.188269	ac040273-ac48-492b-b6f4-ab9298a25bdf
23	f	2	2020-09-21 09:59:17.645853	2020-09-21 10:00:47.960078	99f44deb-f52b-4524-af83-1d5755fecfd3
24	t	2	2020-09-21 10:02:00.502814	2020-09-21 10:02:00.502814	ac08a488-e918-47e0-ab83-64ef0e3ee325
25	t	2	2020-09-21 10:02:02.885518	2020-09-21 10:02:02.885518	5abfb57a-4c0d-4a75-a9e9-0b929d739ee4
26	t	2	2020-09-21 10:03:13.502034	2020-09-21 10:03:13.502034	b845d0cc-e9f5-4238-a065-b5ebcde3ef6d
27	t	2	2020-09-21 10:06:14.924963	2020-09-21 10:06:14.924963	1ee9e655-1ab9-4c92-ac49-0d9661e993ec
28	t	2	2020-09-21 10:12:14.27271	2020-09-21 10:12:14.27271	f7e6f7b2-2b41-41b3-8316-1c3d4d278e19
22	f	2	2020-09-21 09:58:28.185649	2020-09-21 10:12:39.67114	c428745b-3769-434b-92e2-eade9e6f4d4e
29	t	2	2020-09-21 10:13:15.166724	2020-09-21 10:13:15.166724	b5c389be-e805-41a0-8c70-162ed28a78cf
30	t	2	2020-09-21 10:21:29.967779	2020-09-21 10:21:29.967779	6870a250-d15f-4706-a888-a0196fb272e5
33	f	2	2020-09-22 03:23:55.818935	2020-09-22 03:37:36.024586	55d5d990-fb83-44ca-b676-b891b2705dcb
34	f	2	2020-09-22 03:37:45.736201	2020-09-22 03:37:48.688332	951dd0c3-ead5-4a10-8dce-0d825457ca42
35	f	2	2020-09-22 03:37:57.277045	2020-09-22 03:38:19.383732	14b26fc0-c1e0-4c23-8c12-ff803f3de5c6
36	f	2	2020-09-22 03:38:32.590964	2020-09-22 03:38:43.921851	f3ff4a7e-091c-4361-99b1-f4d50f0bbf2a
32	f	2	2020-09-22 02:21:49.122881	2020-09-22 03:39:20.968708	7e2e6d80-1e2b-4e9e-bd43-c9ede2a9a5fa
38	f	2	2020-09-22 03:40:02.269354	2020-09-22 03:40:05.109296	db5f06d3-2f7e-4d32-b31a-69f7825bb9cb
37	f	2	2020-09-22 03:39:53.089277	2020-09-22 03:40:15.580502	d1e6fc61-6c74-4224-8dbd-7a394a771e25
39	f	2	2020-09-22 03:40:13.876707	2020-09-22 03:40:18.525931	50c79fb2-db2b-401d-a65a-381579dfc755
40	f	2	2020-09-22 03:40:56.489592	2020-09-22 03:41:51.009214	54c759ae-fb6e-4973-bb9d-43bf1119089b
42	t	2	2020-09-22 03:46:31.215266	2020-09-22 03:46:31.215266	7371e548-efa4-4248-a2b4-6c0df68f8ec6
43	f	2	2020-09-22 04:06:16.625232	2020-09-22 04:10:28.511989	95f1d6ea-593d-42af-baee-24c1bac5ef66
44	t	2	2020-09-22 04:12:37.938722	2020-09-22 04:12:37.938722	a25d4d45-c710-47b9-8aec-267ed889cf22
41	f	2	2020-09-22 03:42:01.806019	2020-09-22 04:12:57.712611	786cc422-9e10-4145-ac17-2674ed7db4c0
46	f	2	2020-09-22 04:18:32.468494	2020-09-22 04:18:44.423817	5f91020e-e3c0-4530-9bcf-dc50546fa3d7
47	f	2	2020-09-22 04:18:59.838357	2020-09-22 04:19:09.820935	0d1211d9-280b-4d85-9bbe-16770aeb0afd
48	f	2	2020-09-22 04:19:26.69673	2020-09-22 04:19:31.441967	f7def275-55be-4add-b993-36b86e9fb2f5
49	f	2	2020-09-22 04:19:53.088702	2020-09-22 04:19:56.394552	11f48a99-bdb9-44d1-aeb8-38e769221844
50	f	2	2020-09-22 04:24:17.608976	2020-09-22 04:24:21.780508	f6df8fa4-895a-4f28-8029-7a993cc20dba
52	t	2	2020-09-22 04:47:37.438039	2020-09-22 04:47:37.438039	7d1ea84d-e452-4992-b0e3-d3b884b4eb0d
45	f	2	2020-09-22 04:12:58.304141	2020-09-22 07:06:09.679148	3e4997b4-0f8e-41b7-9bc9-2ac5e4af3a45
54	t	2	2020-09-22 07:07:49.529832	2020-09-22 07:07:49.529832	0eac8966-cde6-426f-bd9d-4d341610007d
53	f	2	2020-09-22 05:34:49.416051	2020-09-22 07:21:56.4788	a6713500-e3ba-4ca8-a3b6-b16e3b00f93c
55	f	2	2020-09-22 07:14:51.357135	2020-09-22 07:25:58.214564	67fc2e68-0d37-451d-918a-8f890ab83440
57	f	2	2020-09-22 09:58:06.403085	2020-09-22 09:58:12.84318	62369d90-0ede-4236-a790-9f78116d1b31
58	f	2	2020-09-22 10:01:21.720377	2020-09-22 10:01:24.100208	d234d64d-db6e-4f11-ad00-0742be1a8acc
59	f	2	2020-09-22 10:01:28.778714	2020-09-22 10:01:34.093118	2f436c9f-c9b1-4fdb-a1b1-fd5de6b565b5
56	f	2	2020-09-22 07:23:16.843581	2020-09-22 10:06:03.369057	09516b0a-1737-4ff5-8dfb-dd620e9bd2c5
61	f	2	2020-09-22 10:06:07.165808	2020-09-22 10:06:10.385281	dc18e3e3-33f2-4d2c-b55d-afe40d8c5170
62	f	2	2020-09-22 10:07:41.160901	2020-09-22 10:08:12.357859	222c4200-925e-4461-a297-354c9d481c39
63	t	2	2020-09-23 03:34:26.949445	2020-09-23 03:34:26.949445	95241095-26ff-4f42-b195-e79d98679636
64	t	2	2020-09-23 03:37:03.327764	2020-09-23 03:37:03.327764	8746f48d-5483-46bb-86bf-dde9747aeb9c
65	t	2	2020-09-23 03:38:06.372648	2020-09-23 03:38:06.372648	35c10bc1-7097-46d0-9637-3f8d3d2a4a01
66	t	2	2020-09-23 03:40:19.788271	2020-09-23 03:40:19.788271	d7ef12a1-3c51-43b1-8926-3381b8049a7a
67	t	2	2020-09-23 03:43:40.442292	2020-09-23 03:43:40.442292	ba9740cb-477d-452b-95c1-ec394ccef6d4
60	f	2	2020-09-22 10:03:36.84626	2020-09-23 04:19:11.021533	cc688595-cc26-4442-bc1d-93429ee98a22
68	t	2	2020-09-23 04:19:13.822975	2020-09-23 04:19:13.822975	19867946-a372-44e6-8e49-6b651fa8ae91
51	f	2	2020-09-22 04:37:28.01308	2020-09-23 04:21:54.050111	22a64f01-efd7-4a74-8009-4355a3e38d82
69	f	2	2020-09-23 04:20:48.90911	2020-09-23 06:20:20.357898	d1d66c76-0bf0-4ede-9034-e1da312964f0
71	f	2	2020-09-23 06:20:43.896307	2020-09-23 06:20:50.461166	dcc0aaff-9f68-445c-b367-6fa12c39da46
72	f	2	2020-09-23 06:20:54.578664	2020-09-23 06:21:02.834921	625673b5-69d9-4a6a-95ec-1b58abb6e0e0
74	f	2	2020-09-23 09:14:57.546196	2020-09-23 09:15:02.293015	b7132b96-7a6d-467b-9509-e2bf4cd7342f
70	f	2	2020-09-23 04:22:10.141264	2020-09-23 09:45:34.051486	676bff3d-4b21-445b-b4fc-2ec4d15e1a55
75	f	2	2020-09-23 09:45:37.44613	2020-09-23 10:04:08.324846	62d24614-2e33-436d-b822-b46967011d29
76	t	2	2020-09-23 10:05:12.851499	2020-09-23 10:05:12.851499	d215204f-2fcd-4e24-88cb-2ab3ad804fa2
73	f	2	2020-09-23 06:21:07.778428	2020-09-23 10:25:30.428577	5c181faf-d5ad-475f-bf30-b9876e07aacb
77	t	2	2020-09-24 02:52:59.697327	2020-09-24 02:52:59.697327	e9f3a9c4-dd32-440b-b03e-cd9d7e3012dc
79	f	2	2020-09-24 06:24:08.066616	2020-09-24 06:27:17.314727	5ffa075d-6469-416d-9303-09dda1da8ff8
31	f	2	2020-09-21 16:22:12.285554	2020-09-27 03:11:35.322274	66419b52-45de-47ae-8a98-5c766045263d
80	t	2	2020-09-24 06:27:23.630256	2020-09-24 06:27:23.630256	da8c2f20-92b3-4eac-8364-8e8e840ec12e
81	t	2	2020-09-24 07:26:50.872461	2020-09-24 07:26:50.872461	d23a861e-da64-4260-b807-30cbb2df0bb6
82	t	2	2020-09-24 07:27:00.663712	2020-09-24 07:27:00.663712	f212184e-4ffa-4f39-916b-ad24692b44e2
83	t	2	2020-09-24 07:32:49.781718	2020-09-24 07:32:49.781718	9d0a4209-e5e8-40ab-b4e2-ebf2f31606f8
84	t	2	2020-09-24 07:44:17.621019	2020-09-24 07:44:17.621019	ef089f2c-5628-4708-9e0e-803b15acefc0
78	f	2	2020-09-24 03:39:44.806572	2020-09-24 08:02:56.8733	d46d1721-7363-4ff3-a52c-d1644caf664b
86	f	2	2020-09-24 08:55:23.769972	2020-09-24 08:57:47.972709	c655242d-e285-44cd-b671-4f580ef572b5
87	t	2	2020-09-25 01:34:44.189754	2020-09-25 01:34:44.189754	b9d17b2c-ce27-4ef3-a0af-5eaeeccbf61e
88	t	2	2020-09-25 03:37:41.504742	2020-09-25 03:37:41.504742	83a31cfb-dfd9-4e78-b2d8-b94ecca4cfdd
89	t	2	2020-09-25 04:45:28.29498	2020-09-25 04:45:28.29498	c4b3377f-fe22-43c2-b4ff-7b30d281ac0d
90	f	2	2020-09-25 06:52:45.616028	2020-09-25 06:59:20.046852	f2221827-72bf-4277-80ef-ce9dcfa44c34
91	f	2	2020-09-25 06:59:31.464734	2020-09-25 06:59:36.074849	cace1951-26aa-4bc0-9dd0-aab5e90b39ae
92	f	2	2020-09-25 06:59:58.466927	2020-09-25 07:00:01.091831	7efd6041-e13a-4ec5-8e14-7af51817e67a
93	f	2	2020-09-25 07:00:14.269721	2020-09-25 07:00:16.053798	c5ecd133-e758-4a7b-bafe-2e2770ddb8f2
94	f	2	2020-09-25 07:00:24.159542	2020-09-25 07:00:25.871941	fd010aaf-a834-4a78-8c50-d450bac26580
95	f	2	2020-09-25 07:01:32.955025	2020-09-25 07:01:34.889018	56f00e4f-2714-46cc-9caa-c56d78055e69
96	f	2	2020-09-25 07:01:42.268049	2020-09-25 07:01:44.861949	fd0c26d7-0e56-4ae3-932d-df3941c4e25e
97	f	2	2020-09-25 07:02:02.657146	2020-09-25 07:02:16.183994	1028439c-8d32-4a1e-ac29-30515a7d2df7
98	t	2	2020-09-25 07:03:43.743919	2020-09-25 07:03:43.743919	9e31510d-8600-4320-a3ea-59c2bcb10a5f
100	t	2	2020-09-25 07:19:45.443112	2020-09-25 07:19:45.443112	f932769b-14f5-46b4-ad18-dbf4bdb09fe7
101	t	2	2020-09-25 08:01:29.966414	2020-09-25 08:01:29.966414	e7029b03-ac6f-4c60-9d3f-3b21d03594ae
102	t	2	2020-09-25 08:26:45.162987	2020-09-25 08:26:45.162987	7625ec70-4f2b-4ed5-96e4-a06492eea429
103	t	2	2020-09-25 08:41:07.954254	2020-09-25 08:41:07.954254	bc8e997a-1724-43ff-8523-16caead27367
104	t	2	2020-09-25 09:33:52.914138	2020-09-25 09:33:52.914138	0c1589b1-5256-4801-97ff-d3d2d486c171
105	t	2	2020-09-25 09:48:34.77016	2020-09-25 09:48:34.77016	20fbef23-98cb-4133-8ca7-e7c828ec8ae4
85	f	2	2020-09-24 08:21:33.586547	2020-09-25 10:15:15.046934	2fbfd4a4-9d4a-46a6-9fbf-7cfbf56c0dca
106	t	2	2020-09-26 02:23:27.195698	2020-09-26 02:23:27.195698	49697e8b-2f7d-4f1a-af39-6fd8d8ce7c8a
107	t	2	2020-09-27 02:11:33.537798	2020-09-27 02:11:33.537798	230d6e77-0111-460f-ae4a-e3bc6fc83541
108	t	2	2020-09-27 02:32:56.442668	2020-09-27 02:32:56.442668	476b4ec4-221f-4d89-99bf-0a50db3aa52d
109	t	2	2020-09-27 02:33:31.274579	2020-09-27 02:33:31.274579	fc445d7a-32cc-4058-a28a-7732ee354df4
110	t	2	2020-09-27 02:34:18.471672	2020-09-27 02:34:18.471672	634fa065-0f60-4196-a053-0393698e1eb4
111	t	2	2020-09-27 02:36:47.407415	2020-09-27 02:36:47.407415	da7023c7-b53d-4bd3-8328-a74eaeaf1138
112	t	2	2020-09-27 03:02:09.486153	2020-09-27 03:02:09.486153	8431f06e-c5a8-4f1b-89e4-ff09d9c9bf9a
113	t	2	2020-09-27 03:06:22.270048	2020-09-27 03:06:22.270048	3ba7e1e8-e797-4bf4-9d2a-4823b63fe06b
114	t	2	2020-09-27 03:07:06.633565	2020-09-27 03:07:06.633565	d57bd2a0-ce41-45ce-8e7b-dcc1eb0ef3d5
115	t	2	2020-09-27 03:08:16.592234	2020-09-27 03:08:16.592234	84ff3d55-1086-4e76-82fc-82827ceba434
99	f	2	2020-09-25 07:08:05.303792	2020-09-27 03:09:14.526263	46b24387-12f2-4141-9975-6c0479e2cd66
116	t	2	2020-09-27 03:09:17.9584	2020-09-27 03:09:17.9584	59f78688-da5f-4581-ab09-49edb59fc8ec
117	t	2	2020-09-27 03:09:38.32146	2020-09-27 03:09:38.32146	40f6ce0a-063e-44a4-9a7a-0fc2c9540a7e
118	t	2	2020-09-27 03:11:30.645475	2020-09-27 03:11:30.645475	1034f5bb-b3a8-48a7-ba28-f1a2541a84d2
119	t	2	2020-09-27 03:11:38.980719	2020-09-27 03:11:38.980719	4944360e-332e-4d4e-8ca4-d0db4af0140f
120	t	2	2020-09-27 03:12:47.08686	2020-09-27 03:12:47.08686	ad01a652-e06c-4a48-9464-880be2ae2c34
121	t	2	2020-09-27 03:12:57.848131	2020-09-27 03:12:57.848131	4a3a42ea-49ea-477a-a990-46cbd455c349
122	t	2	2020-09-27 03:12:59.976468	2020-09-27 03:12:59.976468	f5f8f1db-9ebf-4211-901e-cee9d24cfe6c
123	t	2	2020-09-27 03:13:06.36336	2020-09-27 03:13:06.36336	b630f2a8-8343-49aa-abc1-768b4e58a755
124	t	2	2020-09-27 03:18:32.978799	2020-09-27 03:18:32.978799	f88c0d73-a5a1-4537-9299-b3531ecee6d5
125	t	2	2020-09-27 03:20:54.616582	2020-09-27 03:20:54.616582	e292f372-d240-40c4-b4d7-481c59bc759a
126	t	2	2020-09-27 03:21:56.908698	2020-09-27 03:21:56.908698	491dd164-4950-4c47-ae7e-49f74617ac25
127	t	2	2020-09-27 03:22:58.234573	2020-09-27 03:22:58.234573	85815ff5-8c0b-4812-8287-066dc8d25ed0
128	t	2	2020-09-27 03:24:43.655065	2020-09-27 03:24:43.655065	17e33c2d-1e61-40ae-97f5-c68b954ee34b
129	t	2	2020-09-27 03:27:06.974504	2020-09-27 03:27:06.974504	e82941d0-02cc-4d67-bbe2-f747ee43f132
130	t	2	2020-09-27 03:27:31.822144	2020-09-27 03:27:31.822144	16259ae3-4954-497a-a19d-b1014cdd5e55
131	t	2	2020-09-27 03:29:54.425554	2020-09-27 03:29:54.425554	6374be36-d148-4220-b0ca-ddde341a80d4
132	t	2	2020-09-27 03:39:27.875895	2020-09-27 03:39:27.875895	9763b28b-e5e2-4c33-8e74-2dbcc58283ff
133	t	2	2020-09-27 03:44:03.272847	2020-09-27 03:44:03.272847	d017dc39-30a6-4c6e-ac78-48a9af3077d8
134	t	2	2020-09-27 03:54:58.168995	2020-09-27 03:54:58.168995	c8c5122a-7168-4be2-ab31-6e6fe6875e99
135	t	2	2020-09-27 04:02:31.098679	2020-09-27 04:02:31.098679	ba01224e-7b88-41e0-80e4-004476983680
136	t	2	2020-09-27 04:02:42.739748	2020-09-27 04:02:42.739748	841f090e-c568-4be0-ab95-5e7bdef9243b
137	t	2	2020-09-27 04:06:51.844372	2020-09-27 04:06:51.844372	397e8512-3709-456f-ac5c-eef6cf108f0f
138	t	2	2020-09-27 04:08:28.617952	2020-09-27 04:08:28.617952	8b3a511e-772b-48bf-abb4-cd30faa292de
140	t	2	2020-09-27 04:18:12.516062	2020-09-27 04:18:12.516062	14c713d0-22ec-4e1b-9816-d134df835f37
141	t	2	2020-09-27 04:19:54.029991	2020-09-27 04:19:54.029991	57c07fa3-5739-4778-88bc-a3e666e65702
142	t	2	2020-09-27 04:21:17.238091	2020-09-27 04:21:17.238091	26fe17bf-f2b6-4cdc-89fe-033a2e29a661
143	t	2	2020-09-27 04:22:23.313919	2020-09-27 04:22:23.313919	0e98d468-428e-426a-83e3-efc6ef9ac639
139	f	2	2020-09-27 04:08:38.947198	2020-09-27 04:31:58.919129	63d45493-c6ad-4d7e-be19-35f00930718d
144	t	2	2020-09-27 04:32:00.85689	2020-09-27 04:32:00.85689	756719d3-3478-4d9b-8509-24f96d17cb47
145	t	2	2020-09-27 05:01:16.090624	2020-09-27 05:01:16.090624	3d4d5017-f5f4-4355-afa2-4116c1ee7776
146	t	2	2020-09-27 05:03:38.766337	2020-09-27 05:03:38.766337	b0549913-2166-4483-be48-d1d073b71682
147	t	2	2020-09-27 05:03:54.566673	2020-09-27 05:03:54.566673	64ff3170-9918-450f-9271-3673ac367930
149	t	2	2020-09-27 05:08:38.145867	2020-09-27 05:08:38.145867	9f6795b3-b04e-41d6-8442-1251375671f9
150	t	2	2020-09-27 05:09:10.457958	2020-09-27 05:09:10.457958	72391316-1a89-4a7f-b1d1-9a2e3a7539a0
151	t	2	2020-09-27 05:09:24.889681	2020-09-27 05:09:24.889681	0e3f72fd-2615-447e-8ace-2e877072907a
148	f	2	2020-09-27 05:07:25.285008	2020-09-27 05:09:56.475797	855854dc-2e03-4e7e-98ae-c62d4d0dfe4f
152	t	2	2020-09-27 05:09:59.677811	2020-09-27 05:09:59.677811	39347448-7ae7-46b1-92fb-b2ef4f6462f4
153	t	2	2020-09-27 05:10:12.960568	2020-09-27 05:10:12.960568	178b57b2-21bf-4dc4-b80f-7255b6f1dbc9
154	t	2	2020-09-27 05:10:22.870391	2020-09-27 05:10:22.870391	3bbd338a-a725-4d45-87e0-409b87aba4c6
156	t	2	2020-09-27 05:10:57.576175	2020-09-27 05:10:57.576175	274790b4-2644-47b1-847e-22db7a7d571e
155	f	2	2020-09-27 05:10:55.050755	2020-09-27 05:11:26.085741	68ff52d9-418b-4524-9433-a8418de4def7
157	t	2	2020-09-27 05:11:30.904306	2020-09-27 05:11:30.904306	fa512a2d-7d60-4878-97e5-92cd88466b53
158	t	2	2020-09-27 05:12:07.059801	2020-09-27 05:12:07.059801	d90f519d-650f-4685-a7e1-31009c5620ea
159	t	2	2020-09-27 05:12:38.406579	2020-09-27 05:12:38.406579	9f1c2efb-4cf8-4a35-9705-22464b6e4985
161	t	2	2020-09-27 15:24:36.241721	2020-09-27 15:24:36.241721	59ecb0f7-551c-47a7-b8bf-956f3349b27b
162	t	2	2020-09-27 15:24:59.965887	2020-09-27 15:24:59.965887	644adedd-db11-46fd-8c2e-e6029541430f
163	t	2	2020-09-27 15:25:06.860847	2020-09-27 15:25:06.860847	49d4f729-36f3-4b3b-9461-840706873430
164	f	2	2020-09-28 03:34:09.837553	2020-09-28 06:56:27.208817	0997a00c-28a6-4931-95c8-d005d6bf76d5
165	f	2	2020-09-28 06:56:57.618678	2020-09-28 07:10:16.589993	a5207108-7d31-43fd-88d6-67a25510608d
166	f	2	2020-09-28 07:10:58.585498	2020-09-28 07:11:10.713972	034eb4f2-9de4-424b-83c9-843c45efd14d
167	t	2	2020-09-28 09:59:07.605278	2020-09-28 09:59:07.605278	45056e95-404c-4b8a-b701-36700a84958e
160	f	2	2020-09-27 06:31:52.367091	2020-09-30 02:56:43.866618	61ebcd4c-22b0-4506-8380-238c0698fcc6
168	t	2	2020-09-30 03:06:45.103648	2020-09-30 03:06:45.103648	5980b1f4-e695-4c8b-9f90-7f601d5901cd
169	t	2	2020-10-02 02:58:35.623441	2020-10-02 02:58:35.623441	d92b2d37-7820-4cc4-a6ea-74293c9eb49e
170	t	2	2020-10-05 06:44:31.64307	2020-10-05 06:44:31.64307	9c3d288b-5993-4a5a-8f3e-25bf35d9a948
171	t	2	2020-10-05 07:48:39.612321	2020-10-05 07:48:39.612321	728eca5b-0edb-4b21-b09b-0b27efec67ac
172	t	2	2020-10-05 11:24:34.400505	2020-10-05 11:24:34.400505	506a16fb-c673-4481-a0cb-b2deb15986b7
173	t	2	2020-10-06 07:49:39.84427	2020-10-06 07:49:39.84427	c751b558-2c81-4a3d-9134-999ecea6ef3d
174	t	2	2020-10-06 09:29:43.816951	2020-10-06 09:29:43.816951	3d65da9e-4355-4850-b642-a6f507c5e1fe
175	t	2	2020-10-06 09:58:49.51568	2020-10-06 09:58:49.51568	37f513aa-a9f5-4da2-8584-239d74c6a388
176	t	2	2020-10-07 02:55:02.22651	2020-10-07 02:55:02.22651	2b58b029-1598-45c9-a6da-a0a3d88d92a1
177	t	2	2020-10-07 03:03:34.55982	2020-10-07 03:03:34.55982	e049b05f-ad68-45b8-84d8-9bce8d958991
178	t	2	2020-10-07 03:59:31.392786	2020-10-07 03:59:31.392786	b3bfb220-f471-4992-b4a7-412e8827f929
179	t	2	2020-10-07 04:05:34.997967	2020-10-07 04:05:34.997967	25853aee-ae4a-4e68-b061-9d763f5ff056
180	t	2	2020-10-07 06:09:14.116423	2020-10-07 06:09:14.116423	c0e6e781-d190-4d6a-9650-add050bdefe3
181	t	2	2020-10-07 07:45:56.434798	2020-10-07 07:45:56.434798	cb37acb9-3c4c-4c9a-a737-561b5f2959f8
182	t	2	2020-10-07 08:44:20.742252	2020-10-07 08:44:20.742252	3d76d34f-9215-4dc5-ae14-e90fbb6bb2fc
183	t	2	2020-10-07 09:56:18.735627	2020-10-07 09:56:18.735627	949d7f00-fd50-4aba-8993-327f387d8e99
184	t	2	2020-10-07 11:03:46.143768	2020-10-07 11:03:46.143768	2705a18b-3491-4f86-b481-975818dafb07
185	t	2	2020-10-08 03:21:24.604958	2020-10-08 03:21:24.604958	eb07b833-5c6c-40e7-ba88-0ac56b396bcf
186	t	2	2020-10-08 03:30:21.067255	2020-10-08 03:30:21.067255	7c510ecf-d1b3-436e-bfe9-730087fd8554
187	t	2	2020-10-08 04:31:11.368754	2020-10-08 04:31:11.368754	1df67b2e-dc5e-4cac-8c21-05a3ad3e8794
188	t	2	2020-10-08 04:32:35.936557	2020-10-08 04:32:35.936557	4dcaa2f5-1d9e-4bde-8ce8-b377bcf215e5
189	t	2	2020-10-08 04:41:27.919322	2020-10-08 04:41:27.919322	8bae0874-dc47-4140-98ed-f012cd78160e
190	t	2	2020-10-08 07:28:32.522404	2020-10-08 07:28:32.522404	e4754d32-a1d7-4548-b912-254c1ffcb01e
191	t	2	2020-10-08 07:28:37.396012	2020-10-08 07:28:37.396012	682d4d16-bd4e-4050-b978-c112afbb70e0
192	t	2	2020-10-08 07:30:41.583515	2020-10-08 07:30:41.583515	bb5d64c3-7fc4-4bab-9976-724d1e6aa35d
193	t	2	2020-10-08 07:30:48.77854	2020-10-08 07:30:48.77854	b1482e16-0298-4eb8-a5c8-a8290b23c687
194	t	2	2020-10-08 07:31:07.696489	2020-10-08 07:31:07.696489	4c1bd776-03c5-493e-b343-60613141e440
195	t	2	2020-10-08 07:31:14.822914	2020-10-08 07:31:14.822914	8be809bb-9793-4c5a-bc5b-87453a31c706
196	t	2	2020-10-08 07:32:42.173876	2020-10-08 07:32:42.173876	d33f70fe-19a4-4b01-a8b0-947c01c23f4b
197	t	2	2020-10-08 07:35:15.761775	2020-10-08 07:35:15.761775	f608eabb-c01b-4be2-b2ca-08acfd0120c1
198	t	2	2020-10-08 07:35:21.215425	2020-10-08 07:35:21.215425	9badd8f8-136b-4278-b04e-88c596da8334
199	t	2	2020-10-08 07:37:49.250072	2020-10-08 07:37:49.250072	81e9cb1c-fc53-4583-8cc0-eac726fae6b2
200	t	2	2020-10-08 07:37:56.028314	2020-10-08 07:37:56.028314	84f47d8b-362a-4ab5-83d4-0b93576703b6
201	t	2	2020-10-08 07:38:06.045371	2020-10-08 07:38:06.045371	ffde7737-6ddd-45f7-af5b-1d69c82c4784
202	t	2	2020-10-08 07:38:12.684392	2020-10-08 07:38:12.684392	cfeb4a21-bcc8-413e-b385-b5f3210971a3
203	t	2	2020-10-08 07:38:17.027869	2020-10-08 07:38:17.027869	3ad9f8c0-cadc-481d-af40-d398cd141285
204	t	2	2020-10-08 07:38:24.309973	2020-10-08 07:38:24.309973	4b289b38-633e-46fe-b25c-f2b58597c7cc
205	t	2	2020-10-08 07:38:44.955527	2020-10-08 07:38:44.955527	65023c26-5e11-4ff5-a879-dd4aff8304ac
206	t	2	2020-10-08 07:40:05.18037	2020-10-08 07:40:05.18037	ea5b3f1a-22c4-4cc3-a2c1-1fb59adbd1d9
207	t	2	2020-10-08 07:40:07.73004	2020-10-08 07:40:07.73004	c25ea57f-4700-4537-9ae3-e4f5be15dea4
208	t	2	2020-10-08 07:45:58.429264	2020-10-08 07:45:58.429264	f64a838f-81a8-4692-9636-1e96761633ff
209	t	2	2020-10-08 07:46:04.248034	2020-10-08 07:46:04.248034	99b096bc-c58f-4452-bbd4-04d0dc94c51e
211	t	2	2020-10-08 07:48:32.166783	2020-10-08 07:48:32.166783	974f87f7-6055-4edf-b12c-e9386757f250
212	t	2	2020-10-08 07:53:37.203788	2020-10-08 07:53:37.203788	3257acbf-a426-4fa5-b93c-b00c2c51c7ec
213	t	2	2020-10-08 08:17:59.935168	2020-10-08 08:17:59.935168	49c013a2-f7e0-4eca-ad57-ab1c331302d4
214	t	2	2020-10-08 08:49:08.089017	2020-10-08 08:49:08.089017	e9de607d-925a-4a6f-88e6-a88e60405030
215	t	2	2020-10-08 09:13:35.123303	2020-10-08 09:13:35.123303	eaf48700-a971-46e7-9f86-969d1e33a36e
216	t	2	2020-10-08 09:49:25.6258	2020-10-08 09:49:25.6258	3b20150c-b40d-44c9-b16d-97edb89e7430
217	t	2	2020-10-08 09:55:27.847316	2020-10-08 09:55:27.847316	10cd3109-574f-41b6-8dcd-f4d9bf8fd019
218	t	2	2020-10-08 10:03:20.938087	2020-10-08 10:03:20.938087	0dfabaef-b87e-4c87-b95b-772abe0472a9
219	t	2	2020-10-08 10:05:50.392931	2020-10-08 10:05:50.392931	6f99fc8c-745d-4bfe-b400-eaa263effa07
220	t	2	2020-10-08 10:11:17.520381	2020-10-08 10:11:17.520381	723552d3-bf65-48e9-b5ac-9893d623d7df
221	t	2	2020-10-08 10:20:33.756388	2020-10-08 10:20:33.756388	985ae488-f1f7-41bf-b543-551f02d27a4b
222	t	2	2020-10-09 03:46:41.962485	2020-10-09 03:46:41.962485	70dfbaed-67fc-43b4-9414-b9d922b35044
223	t	2	2020-10-09 04:14:49.20312	2020-10-09 04:14:49.20312	a5f6f23a-551f-4609-b677-7ae42a6ed23b
224	t	2	2020-10-09 05:17:17.022265	2020-10-09 05:17:17.022265	f5f70707-88a9-4468-8b24-110bfe61980e
225	t	2	2020-10-09 07:52:18.691431	2020-10-09 07:52:18.691431	2586c8bd-3690-457c-8d50-bd012689971c
226	t	2	2020-10-09 08:25:55.926118	2020-10-09 08:25:55.926118	33a5fe62-cd1f-4222-ad46-b37deaa23075
227	t	2	2020-10-09 09:16:53.619707	2020-10-09 09:16:53.619707	d1fe058e-38cc-4812-b363-f8ccf2cb77cf
228	t	2	2020-10-09 09:43:05.252846	2020-10-09 09:43:05.252846	82e83d65-dcee-4dd3-bb1e-b7a61d009057
229	t	2	2020-10-09 10:15:50.806836	2020-10-09 10:15:50.806836	16e601e4-a09c-4479-97fa-605fc760a50e
230	t	2	2020-10-10 03:40:46.775548	2020-10-10 03:40:46.775548	43a1ccc0-20d8-4c45-99f5-aa3143ebba14
231	t	2	2020-10-10 16:08:12.077811	2020-10-10 16:08:12.077811	dc9e6048-eba5-456b-b7f4-9240c79ccf32
232	t	2	2020-10-11 04:57:29.078312	2020-10-11 04:57:29.078312	12d52271-da0e-4dc0-a867-b314340095cd
233	f	2	2020-10-11 09:08:52.507318	2020-10-11 10:16:20.151221	5c3f54c1-c7c6-4328-94db-4df5c6a00b7d
234	t	2	2020-10-12 02:12:48.001992	2020-10-12 02:12:48.001992	1bcb61b9-03b0-4581-99a8-a004984b1582
235	t	2	2020-10-12 02:12:56.274557	2020-10-12 02:12:56.274557	3aec72fa-483d-4387-91a2-5416fc2259ff
236	t	2	2020-10-12 02:15:27.792847	2020-10-12 02:15:27.792847	4704605a-7708-452a-be5c-6a81522c1e70
237	t	2	2020-10-12 05:26:07.265875	2020-10-12 05:26:07.265875	4906bf6d-e1a2-4d8f-811a-d37a90b54852
238	t	2	2020-10-12 05:26:14.478605	2020-10-12 05:26:14.478605	7830be7d-c1f7-4df8-b8f5-4ea466d1a963
240	f	2	2020-10-12 05:47:10.179712	2020-10-13 03:27:40.741044	bd6d61e4-1df5-4fba-a6ac-dfe2540ddc3a
239	f	2	2020-10-12 05:32:01.42581	2020-10-19 02:32:38.649514	10573eb7-b37e-41b8-b902-abc585d52e0d
241	t	2	2020-10-12 06:17:33.580701	2020-10-12 06:17:33.580701	5525ac55-aab6-4cd0-aa36-ddb9d73b6859
210	f	2	2020-10-08 07:46:05.061563	2020-10-12 07:08:48.152805	970bfd16-5f02-45db-9478-2d32c23fdd20
244	t	2	2020-10-13 06:26:40.334289	2020-10-13 06:26:40.334289	ec2c4250-1274-43c8-b1e9-efe14bf600d2
245	t	2	2020-10-13 06:58:37.250017	2020-10-13 06:58:37.250017	0ea4e59e-2e02-4e0d-a9eb-7e92ff5ccc78
246	t	2	2020-10-13 09:05:43.32204	2020-10-13 09:05:43.32204	2c5977d5-59c2-48c5-b645-fa6d1a6dff9b
248	t	2	2020-10-14 03:22:09.109991	2020-10-14 03:22:09.109991	a9e5e5be-6f8b-4803-8e0c-d360a567fc34
249	t	2	2020-10-14 05:39:05.740002	2020-10-14 05:39:05.740002	ce06ff62-9288-4db0-85dd-df8683695122
250	t	2	2020-10-14 05:39:25.125441	2020-10-14 05:39:25.125441	8b014330-d0d2-4cd7-8b16-2ed5137dc982
243	f	2	2020-10-13 03:27:54.016742	2020-10-14 07:15:03.709031	a7015859-ce8a-43ef-bc12-2d300c1e421f
252	t	2	2020-10-14 07:53:52.46602	2020-10-14 07:53:52.46602	f02bc075-01ca-44d8-9dc3-cec15e972283
253	t	2	2020-10-14 07:54:13.076818	2020-10-14 07:54:13.076818	fcd288d0-e72c-4951-ac70-fb79c60a9c53
254	t	2	2020-10-14 07:57:27.022042	2020-10-14 07:57:27.022042	e8da8018-dc3d-4204-add5-5321944e6902
255	t	2	2020-10-14 07:58:04.146071	2020-10-14 07:58:04.146071	7779abcd-c86c-4a41-adcd-2cc0247bbfe6
256	t	2	2020-10-14 09:17:13.718566	2020-10-14 09:17:13.718566	b0099888-d5c4-4240-bcae-baa405d04ccf
257	t	2	2020-10-14 09:56:44.12761	2020-10-14 09:56:44.12761	24ee394e-879e-49e9-935a-189f3b6c8caf
251	f	2	2020-10-14 07:25:27.949045	2020-10-15 06:11:31.333012	134ad731-b918-455a-844a-ac2204aeac61
258	t	2	2020-10-15 06:11:34.640101	2020-10-15 06:11:34.640101	6277f0e1-852a-4eeb-8d37-c0203601e85b
259	f	2	2020-10-15 06:22:19.8844	2020-10-15 06:29:01.017254	df83a41a-4b45-4bbc-93a6-711a7c2e95b0
260	t	2	2020-10-15 06:29:17.578701	2020-10-15 06:29:17.578701	9362a037-1457-4bcd-a676-842a90214eca
261	f	2	2020-10-15 08:03:18.176108	2020-10-15 08:22:56.869229	e959170f-3dd0-4885-a504-4d348f190df7
247	f	2	2020-10-13 10:35:45.063892	2020-10-16 08:46:07.547206	3ab132db-7a0a-4670-a59a-dc360e41a048
264	t	2	2020-10-16 08:54:18.886859	2020-10-16 08:54:18.886859	cac0c35b-8093-4b4f-9707-d0e05e2fc737
242	f	2	2020-10-12 07:08:51.383444	2020-10-16 09:06:42.273425	db6637c1-2b28-47ac-85c1-fa11286808e9
262	f	2	2020-10-15 08:23:04.170622	2020-10-16 09:14:12.319978	8c61b556-6b6c-4335-b509-a72f8053a2ff
266	t	26	2020-10-16 09:14:22.521097	2020-10-16 09:14:22.521097	aef450f2-adbc-460a-b5e0-47d04a92ddcf
267	t	26	2020-10-16 09:14:28.570466	2020-10-16 09:14:28.570466	ee970999-a66a-4d8b-9dde-86d8264616ad
268	t	26	2020-10-16 09:14:37.276136	2020-10-16 09:14:37.276136	7890b50e-92ae-403a-9303-d3430664dff9
269	t	26	2020-10-16 10:04:34.209984	2020-10-16 10:04:34.209984	13302b18-150b-4b46-8bfb-e9422bd4de61
270	t	2	2020-10-16 10:18:09.397944	2020-10-16 10:18:09.397944	ac592a02-4a62-4d59-b06a-f58b27a53d86
272	t	2	2020-10-19 03:11:52.805639	2020-10-19 03:11:52.805639	1c19685a-22fb-4f74-ab6c-5e685ec4e49b
273	t	2	2020-10-19 07:03:20.032039	2020-10-19 07:03:20.032039	f79274d2-76c3-419f-9ace-8f1ef1ff6fed
274	t	2	2020-10-19 07:04:40.823974	2020-10-19 07:04:40.823974	c7b68a93-c5a8-42b1-8d95-67829b219a6a
276	t	2	2020-10-19 07:50:49.38445	2020-10-19 07:50:49.38445	94d856d7-3b36-416c-b63b-dec10ebdd3ec
275	f	2	2020-10-19 07:46:57.132144	2020-10-19 08:06:24.750554	7d527526-5936-4c64-94f1-5153973774ba
277	f	30	2020-10-19 08:06:59.723354	2020-10-19 08:09:24.06755	409c798f-f426-46a0-86b8-30d3adef0558
280	t	2	2020-10-19 08:41:05.396666	2020-10-19 08:41:05.396666	4baf6264-b675-4f47-9181-f258dc86d5af
281	t	2	2020-10-19 08:41:14.907296	2020-10-19 08:41:14.907296	2a95920c-0d5a-4e80-a192-5bc16c65c8c7
265	f	24	2020-10-16 09:06:48.485628	2020-10-20 02:50:54.023937	1b6d5063-847e-4c2c-a442-17cb5f78f7b7
282	f	30	2020-10-19 08:52:53.059822	2020-10-20 03:35:21.084312	680b2a87-7d2a-43fb-b533-b16fd3a1268f
284	f	30	2020-10-20 03:37:54.806448	2020-10-20 03:43:55.971897	d7fdd12b-01ff-44b0-b63c-e6c75c4a25a1
285	f	30	2020-10-20 03:45:07.788351	2020-10-20 03:46:08.888445	faff9c3f-42f0-404c-934f-3d95f1cec416
286	f	30	2020-10-20 03:46:48.034975	2020-10-20 03:48:07.368813	84630a92-152b-478a-ae3b-dea80e302cda
278	f	30	2020-10-19 08:09:46.688489	2020-10-20 04:07:57.972094	410196d2-c0b8-438d-a3de-81b3547f4404
287	f	30	2020-10-20 03:48:36.58356	2020-10-20 07:39:36.025131	6083ce0e-edcb-4fcd-aac5-d72e53d76806
283	f	2	2020-10-20 02:50:57.376864	2020-10-20 08:37:22.291503	ea69313d-0c66-422f-840b-e4265fa5fa28
292	t	2	2020-10-20 09:48:16.815756	2020-10-20 09:48:16.815756	6b9c7352-5d81-41ee-a3b7-dce3ae570384
290	f	30	2020-10-20 07:41:35.776948	2020-10-20 10:23:02.23582	cddb6e45-2cb2-40bc-8808-c382173fd230
291	f	2	2020-10-20 08:37:27.130911	2020-10-20 10:26:27.093325	bdb10782-8dc9-424a-99db-cd9faf621467
294	f	24	2020-10-20 10:26:31.169563	2020-10-20 10:27:58.236107	f9c872b4-c88f-4cac-b9a7-78e52e264a17
295	t	2	2020-10-20 10:28:01.689298	2020-10-20 10:28:01.689298	a09d4bc4-1682-45ba-a702-2f79fba4425d
289	f	2	2020-10-20 04:12:21.580317	2020-10-20 10:34:07.858757	912cb856-0259-4d59-ac1f-d1570c3843c6
296	t	26	2020-10-20 10:34:13.762974	2020-10-20 10:34:13.762974	3519e3bd-d8c9-4c90-8d45-94b34f15bc07
297	f	32	2020-10-20 10:34:30.525079	2020-10-20 10:34:54.673164	9efdbe70-cc15-4292-bf27-a9478f432179
298	f	27	2020-10-20 10:35:11.086083	2020-10-20 10:35:20.966785	110d199a-d2d9-4aa9-92d3-7876ae8ba656
299	t	26	2020-10-20 10:35:26.181112	2020-10-20 10:35:26.181112	6be5f0be-14c0-4728-93cf-2856062441ce
300	f	2	2020-10-21 03:40:25.583179	2020-10-21 03:40:54.633872	460c5595-d85b-4c35-83a9-47e59b2565c0
302	t	2	2020-10-21 03:44:36.269556	2020-10-21 03:44:36.269556	9b8cd5cd-d6af-4a70-954a-75d1228a7f23
301	f	27	2020-10-21 03:41:04.140678	2020-10-21 06:34:03.351332	bdb7aec6-d55a-4fe4-ae6a-70d733dcb613
303	f	2	2020-10-21 06:34:06.259203	2020-10-21 06:42:29.379711	d19acd9d-ac11-44c5-9661-b2059696a8fc
304	f	27	2020-10-21 06:42:32.547646	2020-10-21 06:51:42.613556	8cad918f-4f55-4177-85a1-7b866ec445e9
306	t	27	2020-10-21 08:08:43.342542	2020-10-21 08:08:43.342542	987c8f75-148f-4659-abde-c5752da2b67f
271	f	2	2020-10-19 02:32:44.798943	2020-10-21 08:14:42.922323	3bf6af90-6f31-44a1-95b3-70fa3a143619
305	f	2	2020-10-21 06:51:45.665057	2020-10-21 08:19:26.233554	e1db7d92-75bc-40e4-9849-5dd417a27f96
293	f	32	2020-10-20 10:23:39.935365	2020-10-21 08:20:52.877809	3e1b367f-4e43-4f97-89c1-539cbdf115b9
279	f	2	2020-10-19 08:17:13.467236	2020-10-21 09:24:39.642976	f55f595f-a97d-4492-a8b5-a005b21494a2
310	f	27	2020-10-21 09:24:59.863165	2020-10-21 09:25:14.930182	2dc94770-3d04-403c-88c0-ebe4eaee5ab7
308	f	39	2020-10-21 08:19:48.280011	2020-10-21 09:26:00.10779	dcf6db49-f987-40ca-ae70-232267c70b45
311	f	2	2020-10-21 09:26:05.71247	2020-10-21 09:26:51.070371	4d064ed2-a670-44a4-9a67-e552ce9e7146
314	t	2	2020-10-21 12:02:57.70565	2020-10-21 12:02:57.70565	541fa18b-cdae-4494-9c06-3b9721bd8209
315	t	2	2020-10-21 14:16:52.847987	2020-10-21 14:16:52.847987	a82a92a4-f275-4238-99e1-d63b3abee049
307	f	38	2020-10-21 08:17:26.981859	2020-10-21 14:18:08.936191	b02315e7-fa49-4f8e-a0e4-d83fb473895e
316	t	38	2020-10-21 14:18:16.241125	2020-10-21 14:18:16.241125	ed5c4e8c-9071-49e5-92ca-8b338e0b7f4f
318	t	2	2020-10-22 02:46:31.785264	2020-10-22 02:46:31.785264	441b99a5-14af-42ac-847f-6df1bb704f9c
313	f	39	2020-10-21 09:30:05.609602	2020-10-22 04:22:40.043099	029a1919-ee77-4776-af00-791b38cfffbc
317	f	38	2020-10-22 02:36:29.821076	2020-10-22 05:05:25.036601	47e4f588-805c-4770-857c-17d241d11218
319	f	2	2020-10-22 04:22:42.903718	2020-10-22 05:08:46.606265	e4270833-9af2-4884-a603-f42163e33b96
309	f	39	2020-10-21 08:21:58.143939	2020-10-22 10:09:54.477634	ab454528-f33b-4863-a8fb-2c26fc1b12ac
288	f	30	2020-10-20 04:09:22.038584	2020-10-22 10:58:00.291078	4aa0a8e5-3912-4d41-97e8-cee8932d63e3
312	f	39	2020-10-21 09:27:02.535494	2020-10-23 03:26:12.34274	28a32fa4-f876-408e-a0e0-60860083155b
320	f	2	2020-10-22 04:23:46.703634	2020-10-22 04:24:41.84468	28d444ad-a807-42a3-9eb6-929355038cb3
321	f	41	2020-10-22 04:25:08.759133	2020-10-22 04:25:36.856007	a6f7d25f-9f6e-4756-8fdf-cf5431631abe
322	t	41	2020-10-22 04:29:09.319488	2020-10-22 04:29:09.319488	8a606db6-582a-4df6-b020-db9407dba418
323	t	41	2020-10-22 04:29:54.298555	2020-10-22 04:29:54.298555	92a27967-2adf-4ae2-ad39-1ae4b088dd7b
324	t	41	2020-10-22 04:35:04.825983	2020-10-22 04:35:04.825983	2c41dca4-6bd0-41d1-8392-9a1442f1eb9a
325	t	41	2020-10-22 04:35:43.717568	2020-10-22 04:35:43.717568	ca31eea5-ba01-435c-969f-c819914e75ca
326	t	41	2020-10-22 04:36:18.246459	2020-10-22 04:36:18.246459	f20cee59-0e1b-4a89-8a0a-52f86531fa88
327	t	41	2020-10-22 04:37:05.28222	2020-10-22 04:37:05.28222	30460338-185b-4792-ada2-a0a6efe5428a
328	t	41	2020-10-22 04:37:13.375431	2020-10-22 04:37:13.375431	96a25dfd-c5fd-40db-8648-752f022f87f7
329	t	41	2020-10-22 04:38:37.102333	2020-10-22 04:38:37.102333	74613952-4b2c-49d5-b97b-8b563819cbfc
330	t	41	2020-10-22 04:39:03.358922	2020-10-22 04:39:03.358922	3596b5fb-e965-4824-b43f-9d7367d7819d
331	f	41	2020-10-22 04:41:03.713578	2020-10-22 04:41:11.700057	f7606368-f93a-4fd7-93f0-de2f08bf6c9e
332	f	41	2020-10-22 04:41:50.715142	2020-10-22 04:42:01.128572	18b2e8b8-be1e-4498-b578-2880f6d16d79
333	f	41	2020-10-22 04:44:43.740426	2020-10-22 04:45:01.253419	2c5f751c-b1e0-4208-b60d-1779433f3369
334	t	41	2020-10-22 04:45:53.847997	2020-10-22 04:45:53.847997	97b16248-6598-4494-9f7b-674c548445f5
335	t	41	2020-10-22 04:46:25.204493	2020-10-22 04:46:25.204493	01f541d6-70e7-4876-ae97-c5c23ff49982
336	t	41	2020-10-22 04:46:44.959261	2020-10-22 04:46:44.959261	f4a30596-bfb9-46f7-998b-f1489903d731
337	t	41	2020-10-22 04:47:57.631427	2020-10-22 04:47:57.631427	6ef7f5ce-2a0e-4c90-a2f3-c05cc3fef6ac
338	f	2	2020-10-22 04:50:23.063915	2020-10-22 04:50:47.908844	ec84d2a5-0cf5-4b9a-befd-779ef791c96c
339	f	2	2020-10-22 04:51:10.879992	2020-10-22 04:51:23.224991	a0206545-91b1-4979-8c7e-be136fa4b163
340	t	41	2020-10-22 04:51:30.691078	2020-10-22 04:51:30.691078	7e843010-68c2-4dc7-b5a5-7e70a4e84559
341	t	41	2020-10-22 04:52:21.059848	2020-10-22 04:52:21.059848	7b85b909-9a29-4f72-8b76-4a74b637e3a4
342	t	41	2020-10-22 04:52:32.303185	2020-10-22 04:52:32.303185	c481d542-b434-4e4a-a279-31eef3509e63
343	t	41	2020-10-22 04:54:00.325932	2020-10-22 04:54:00.325932	8b07cf36-501c-492d-957b-d96d72640697
344	t	41	2020-10-22 04:54:29.791618	2020-10-22 04:54:29.791618	e817f269-360e-4f97-8181-c31383b2d9f3
345	t	41	2020-10-22 04:54:59.885169	2020-10-22 04:54:59.885169	b9089d41-f097-439a-b823-4b42c64fa3f5
346	t	41	2020-10-22 04:55:15.861047	2020-10-22 04:55:15.861047	8b15d7ce-8358-479a-9513-39b546d94e61
347	t	41	2020-10-22 04:55:19.478971	2020-10-22 04:55:19.478971	d6aae74c-928c-4764-a490-501aa4788bda
348	t	41	2020-10-22 04:55:22.461186	2020-10-22 04:55:22.461186	bbd3a649-4f92-4350-a324-9e5a3e5a8183
349	t	41	2020-10-22 04:55:37.965577	2020-10-22 04:55:37.965577	5cf43c13-72f5-49ce-8eed-107118eea111
350	t	41	2020-10-22 04:56:43.540226	2020-10-22 04:56:43.540226	10dd2e1d-6d8e-40b9-a562-f936f5e1eccc
351	t	41	2020-10-22 04:57:18.917138	2020-10-22 04:57:18.917138	cd9218e6-d807-4c22-8d61-06d471db0ce8
352	t	41	2020-10-22 04:57:51.048635	2020-10-22 04:57:51.048635	0a77e4ea-d3ae-4e39-9f53-84da448731f7
353	t	41	2020-10-22 04:58:55.854152	2020-10-22 04:58:55.854152	d40571e1-5311-4d86-8e85-791bd910f1e0
354	t	41	2020-10-22 04:58:59.667098	2020-10-22 04:58:59.667098	fa72b5ad-be76-4b41-99d8-aaa47e8b84ce
355	t	41	2020-10-22 04:59:04.735827	2020-10-22 04:59:04.735827	1b3e3282-5369-4473-8987-3758bf6ca6fc
356	t	41	2020-10-22 04:59:29.520837	2020-10-22 04:59:29.520837	a12ad868-1dcb-4132-b7c9-fd56dd4969d2
357	t	41	2020-10-22 05:01:16.462902	2020-10-22 05:01:16.462902	c7ce0df1-e406-42be-a56a-fafce39cd3c1
358	f	2	2020-10-22 05:02:09.17163	2020-10-22 05:02:11.955975	439beee1-ba5e-41ca-80dc-ec7e9ca316f8
361	f	2	2020-10-22 05:09:11.128019	2020-10-22 05:11:20.134339	7b2262e1-2065-4536-98dd-75eb4766f5a7
362	t	2	2020-10-22 05:11:23.266532	2020-10-22 05:11:23.266532	a619aabe-b832-44b7-a366-b009e3b246fa
359	f	2	2020-10-22 05:02:14.216994	2020-10-22 05:12:04.325142	27736f00-bafc-4db7-baa0-169e16113c60
363	f	2	2020-10-22 05:12:06.115696	2020-10-22 05:22:01.921799	36b4eed8-480d-45f0-a441-29cceb8e4092
364	t	41	2020-10-22 05:22:05.063888	2020-10-22 05:22:05.063888	219bc593-5901-4291-9a69-74bf0ab0dd5a
365	t	41	2020-10-22 05:22:14.298635	2020-10-22 05:22:14.298635	6134602d-04af-4ee1-a573-8f4f75277e23
366	t	41	2020-10-22 05:23:27.905761	2020-10-22 05:23:27.905761	4ad5cebd-f5f6-4cdb-b2d8-d352fb9fbecb
367	t	41	2020-10-22 05:23:34.020401	2020-10-22 05:23:34.020401	a13b834e-83e7-4e7f-b945-c8efd1117a86
368	t	41	2020-10-22 05:23:51.892463	2020-10-22 05:23:51.892463	374f3627-2b42-463a-a6be-8006c2c32a0f
369	f	2	2020-10-22 05:23:56.386517	2020-10-22 05:23:58.901301	a587c495-0162-4f14-a86c-d2e70ac29d62
370	f	2	2020-10-22 05:24:01.050572	2020-10-22 05:24:07.487454	b6b68b5f-2655-4e18-9c3e-d253df5c6805
371	t	38	2020-10-22 05:24:41.385241	2020-10-22 05:24:41.385241	eee3f1b0-8662-4db1-ae38-9405e96ea3b2
373	t	48	2020-10-22 10:18:36.040459	2020-10-22 10:18:36.040459	9d8d2894-4ea3-4adc-bd17-81dc6bd5ca43
360	f	2	2020-10-22 05:05:27.959997	2020-10-22 10:20:35.275187	c3d754a5-69e0-43cc-b710-650a0f61ea46
375	t	38	2020-10-22 10:21:08.192617	2020-10-22 10:21:08.192617	912070d7-2931-48ec-985c-4f4cf4f92e67
376	t	2	2020-10-22 10:32:48.770476	2020-10-22 10:32:48.770476	555613f1-ad28-4586-ba41-123335e10e76
377	t	48	2020-10-22 10:34:58.858733	2020-10-22 10:34:58.858733	304b07c8-0d30-456e-84fd-fc4b9fcc517e
372	f	48	2020-10-22 10:15:28.020279	2020-10-22 10:39:16.967314	8773d95a-2d4c-4d39-9344-20ba14671ff6
379	t	49	2020-10-22 10:49:16.629658	2020-10-22 10:49:16.629658	ddbb657d-e6fb-4158-b494-2743ba9c017e
380	t	2	2020-10-22 10:49:43.562093	2020-10-22 10:49:43.562093	0c06c2ce-e6e3-4088-a974-fee3f74f0074
381	t	49	2020-10-22 10:58:35.856055	2020-10-22 10:58:35.856055	22138da5-07ed-41ef-94b6-605598558f2e
382	t	49	2020-10-22 11:07:50.572565	2020-10-22 11:07:50.572565	4309a753-0104-4e44-806b-55ea3f584dc0
383	t	49	2020-10-22 11:11:13.646859	2020-10-22 11:11:13.646859	35ef0678-baff-42c0-9bf0-f3cba59e6c32
385	f	38	2020-10-22 14:08:27.021974	2020-10-22 14:08:32.425484	e0e01c31-027c-46d7-b6cb-69c85338f0ab
386	t	38	2020-10-22 14:25:23.269522	2020-10-22 14:25:23.269522	9a3f7175-7af5-48d0-970f-3863c515b32e
387	f	2	2020-10-22 14:35:11.930736	2020-10-22 14:35:14.294255	2b8a27b4-4b44-4c16-a7e4-84a5be6fcc89
374	f	38	2020-10-22 10:20:42.367747	2020-10-23 02:38:03.29619	1d52ae3d-59dd-46af-8c56-390b86fc96fe
388	t	38	2020-10-23 02:41:04.04219	2020-10-23 02:41:04.04219	de1feb26-4216-4ac6-838d-3aab690f2804
390	t	2	2020-10-23 03:26:35.833324	2020-10-23 03:26:35.833324	12123e73-f568-4f18-a7b5-b17947a24a68
391	t	2	2020-10-23 03:27:01.51332	2020-10-23 03:27:01.51332	6442321f-be64-4f8f-93b3-e081d962163e
393	t	2	2020-10-23 04:15:34.662044	2020-10-23 04:15:34.662044	c84515ff-6c4a-43a7-af02-942bbf250c09
394	t	2	2020-10-23 04:16:13.178345	2020-10-23 04:16:13.178345	8c291064-1546-444a-a671-1d444e2ba945
395	t	2	2020-10-23 04:16:59.869354	2020-10-23 04:16:59.869354	14022d87-56c7-4c18-99c1-bcd0a6050c1f
396	t	2	2020-10-23 04:17:08.471511	2020-10-23 04:17:08.471511	cf9cb13d-6341-47ff-a4ef-5d602360be3c
397	t	2	2020-10-23 04:17:09.136512	2020-10-23 04:17:09.136512	d4dc414e-eb05-4fcd-a617-f4e52cb3bab5
398	t	2	2020-10-23 04:17:50.512535	2020-10-23 04:17:50.512535	8029f455-03f1-4b0e-9f34-101b1b3f2b80
399	t	2	2020-10-23 04:18:43.849987	2020-10-23 04:18:43.849987	52146385-719e-4c42-92e5-55be75524b8c
400	t	2	2020-10-23 04:19:30.949901	2020-10-23 04:19:30.949901	5ab7b5da-7a9c-4f09-afb5-0b0091675343
389	f	2	2020-10-23 03:26:17.126337	2020-10-23 08:45:55.166656	a1f0f2c3-b9cd-488b-a597-151371a9bc6a
384	f	49	2020-10-22 11:15:11.599799	2020-10-23 10:29:16.656129	535ba177-1974-4e08-8823-d80ab338ba33
392	f	39	2020-10-23 04:01:50.874541	2020-10-23 04:28:56.467795	bb7fd6e6-7d68-4a86-b142-d95123b6dea8
403	t	38	2020-10-23 04:30:19.182973	2020-10-23 04:30:19.182973	926fc4d8-9bc7-44eb-add8-c4bca10a48db
402	f	2	2020-10-23 04:24:15.241717	2020-10-23 04:30:49.33718	18ab849c-d270-4c71-81df-f748e0783c4d
404	f	2	2020-10-23 04:32:59.639713	2020-10-23 04:33:32.645744	1d301fff-16d9-4c90-9c42-658e9b5fa03f
406	t	2	2020-10-23 04:35:28.678921	2020-10-23 04:35:28.678921	8312549b-4adb-491b-9ace-cb2c1d37da9e
407	t	2	2020-10-23 04:40:27.973577	2020-10-23 04:40:27.973577	9f973af8-7d87-4ca4-9583-7e65c30f59f9
405	f	2	2020-10-23 04:33:34.654793	2020-10-23 04:40:48.534358	977d99e8-5dce-4c4e-99ee-41cf5b54743a
408	f	2	2020-10-23 04:40:50.762824	2020-10-23 04:41:43.221427	2089da3a-81fe-463d-96e3-2fe307a3bea9
409	f	2	2020-10-23 04:42:02.358237	2020-10-23 04:42:17.512391	3a6da2af-7f51-4ce6-b2a4-c91902e74916
411	t	2	2020-10-23 04:49:51.635463	2020-10-23 04:49:51.635463	4eef9995-9f30-4e3c-ae30-32ec77e4d75c
378	f	49	2020-10-22 10:48:27.327437	2020-10-23 04:52:44.367291	9980087c-7d01-4dfe-8735-b0a45aab1f7f
401	f	2	2020-10-23 04:20:19.830389	2020-10-23 04:54:56.270817	07c62f7f-1f3b-486e-b3e2-06d794c2d099
413	f	39	2020-10-23 04:55:04.045996	2020-10-23 04:55:06.146152	3650e9de-cea7-40e1-afd0-00daaf3099b3
415	t	2	2020-10-23 04:59:25.225278	2020-10-23 04:59:25.225278	7d82a6d2-2629-4dc3-b4bf-eed408916b27
416	t	2	2020-10-23 05:00:10.319134	2020-10-23 05:00:10.319134	e852bb1f-ca23-4f8e-bd06-18cc4a4ac743
419	f	32	2020-10-23 06:04:19.716325	2020-10-23 06:05:25.960357	d250a374-25a5-4b1c-97d4-02000912212f
420	t	38	2020-10-23 06:06:08.592395	2020-10-23 06:06:08.592395	f7bddb70-e283-4d51-94c4-27945b85f5dd
414	f	32	2020-10-23 04:55:28.703075	2020-10-23 06:07:35.866471	ced52bcd-a899-4cf1-8ea4-09bf504dc35a
422	f	2	2020-10-23 06:07:42.083106	2020-10-23 06:07:55.398788	1d4ee019-6b6b-4906-a480-849d411fd5c8
423	t	38	2020-10-23 06:08:02.319486	2020-10-23 06:08:02.319486	f35f5e98-f282-4d46-a555-856c939a1043
418	f	32	2020-10-23 06:00:30.585544	2020-10-23 06:08:23.296577	0ddce8d0-1a92-4e88-a5b1-5d21f20043a0
424	t	38	2020-10-23 06:08:37.266386	2020-10-23 06:08:37.266386	5fd3cce6-3d5c-4bcf-b042-8bf4a395c78f
425	t	38	2020-10-23 06:20:35.717061	2020-10-23 06:20:35.717061	28c351e2-c153-4314-8856-e2fb14bce79e
417	f	2	2020-10-23 05:42:04.060303	2020-10-23 06:21:47.167656	74e3a248-1348-4fa7-ba08-2c71fd2ec098
421	f	2	2020-10-23 06:06:56.135118	2020-10-23 06:33:54.140844	db5cf868-77b3-430b-ad95-505c86c0cf21
426	f	38	2020-10-23 06:34:09.679657	2020-10-23 06:37:08.915817	f4aed0ec-de35-449e-9264-b5183e6184cd
428	t	38	2020-10-23 06:39:47.322848	2020-10-23 06:39:47.322848	0e33a614-3e30-444a-863c-a4c9bad78a24
429	t	38	2020-10-23 06:48:47.088255	2020-10-23 06:48:47.088255	eac6d7ee-310f-447a-a434-1445aa633c1b
430	f	2	2020-10-23 06:53:10.162132	2020-10-23 06:54:20.773518	ba5b6c50-6627-4831-927d-06a31493a098
431	t	41	2020-10-23 06:55:06.589701	2020-10-23 06:55:06.589701	89c22567-19b7-4cc2-8d66-6c00ee2f1fb9
433	t	2	2020-10-23 07:03:53.173891	2020-10-23 07:03:53.173891	f742fb8a-e743-413e-8799-aec81de7edd9
434	f	49	2020-10-23 07:16:15.078992	2020-10-23 07:16:44.202876	d6ffb9e6-1265-4b5a-831b-ed5b8df9666a
410	f	2	2020-10-23 04:47:30.931621	2020-10-23 07:20:45.565648	b3098f0b-6620-4ef3-9273-cf205f424a72
432	f	38	2020-10-23 06:59:38.698132	2020-10-23 08:00:52.166054	ce8cce9f-d9ab-4818-b8bc-b77066a9bdb7
437	f	2	2020-10-23 08:00:55.1972	2020-10-23 08:07:09.738081	f0672606-15e9-4cac-82f5-55607bee486c
438	t	38	2020-10-23 08:07:12.804557	2020-10-23 08:07:12.804557	e9c5f1ab-f603-4027-8833-53d403f25488
436	f	2	2020-10-23 07:25:41.942445	2020-10-23 08:41:37.318399	7afae99d-7cdc-4328-8dee-cc152a9f7da2
440	t	38	2020-10-23 08:46:05.842484	2020-10-23 08:46:05.842484	4168a2f9-0c36-4200-bb4d-6ef6f8f92fa4
441	t	38	2020-10-23 08:55:57.635303	2020-10-23 08:55:57.635303	da5098fe-0608-42bf-9d48-8813cfd64111
439	f	38	2020-10-23 08:35:57.399401	2020-10-23 09:02:28.639656	90d9258c-242f-4c32-88ae-d19e752018ca
442	f	32	2020-10-23 09:09:36.852596	2020-10-23 09:09:48.456645	3bfc1cda-addd-443f-9ff1-ed86d9a70a71
443	f	38	2020-10-23 09:09:57.561907	2020-10-23 09:10:05.640579	cc0c7601-f1fa-4b98-8b39-d7d4fde67870
444	f	38	2020-10-23 09:12:43.7467	2020-10-23 09:12:47.455712	2b7bb880-e7f5-4fa2-bfb8-94b9521baf4c
446	f	38	2020-10-23 09:16:09.115799	2020-10-23 09:24:59.062716	305982fa-3c53-4b49-9a40-523efc1517b8
447	f	38	2020-10-23 09:26:40.332008	2020-10-23 09:56:52.717794	6b252523-0a18-4c44-b06e-58f710241426
448	f	38	2020-10-23 10:02:07.285257	2020-10-23 10:02:09.891562	85b35bfc-e501-4654-9317-78ccda90be42
435	f	41	2020-10-23 07:23:50.576878	2020-10-23 10:18:06.856663	13e8a94e-6e93-4fdb-ae93-09048d76e734
450	f	37	2020-10-23 10:18:46.784976	2020-10-23 10:21:29.700218	05c2721a-84b0-4710-8164-6851025833fb
445	f	2	2020-10-23 09:14:03.477622	2020-10-23 10:33:06.886569	23a8ebac-626a-4710-809b-33690e561516
449	f	2	2020-10-23 10:02:13.734722	2020-10-23 10:33:47.120319	62559241-dd08-44d3-8f9d-314bab76951d
454	f	37	2020-10-23 10:36:56.219805	2020-10-23 10:38:23.900582	a19e2344-1ace-44a5-a91d-ac4600ba95ee
455	f	49	2020-10-23 10:39:10.06476	2020-10-23 10:39:32.0283	72a2b193-bd73-4429-b838-17a41ea2050d
456	f	37	2020-10-23 10:40:25.478674	2020-10-23 10:41:02.773848	81e3019d-d0bf-4452-8b19-6342274c9f3a
453	f	38	2020-10-23 10:33:52.933831	2020-10-23 11:12:26.241831	1f5b21f8-67ff-4d8b-980a-f7554049f4cb
458	t	2	2020-10-23 11:12:29.461843	2020-10-23 11:12:29.461843	6084c144-1269-4c4b-a365-5db4ac9696c1
459	t	2	2020-10-23 13:19:58.428354	2020-10-23 13:19:58.428354	da24dad3-ba7d-42b0-a770-f949dd978597
460	f	2	2020-10-26 02:06:28.840066	2020-10-26 02:27:28.999697	da2915cb-9b6f-40d0-8f29-4f9c8b6554e6
461	f	2	2020-10-26 02:29:58.180343	2020-10-26 02:36:38.813212	fea3a15c-d530-4dc1-b628-d32c7852e745
462	f	2	2020-10-26 02:37:13.783335	2020-10-26 02:41:34.471256	bfb3c544-47e8-447b-99a3-cea463af0cc5
412	f	37	2020-10-23 04:54:08.440738	2020-10-26 02:52:55.891446	4566d7e0-147e-44ee-b8a4-da23ec091023
463	f	2	2020-10-26 02:43:11.216411	2020-10-26 02:53:17.058913	5bd27394-1303-4b55-82b3-e6380bde346c
465	t	41	2020-10-26 02:54:42.067848	2020-10-26 02:54:42.067848	c60f5ad9-f803-40db-953c-f1ea4b5b764a
466	f	2	2020-10-26 02:55:58.463811	2020-10-26 02:57:18.259534	4a225ac7-379b-4cdb-9e6a-9aaf5d8e5203
464	f	2	2020-10-26 02:52:05.868615	2020-10-26 05:08:51.31948	c1a11c48-41eb-4363-9ab9-da20758e8c10
452	f	2	2020-10-23 10:33:21.390061	2020-10-26 06:06:35.931111	ff2b381d-494e-4bf6-a720-50fee75520eb
457	f	49	2020-10-23 10:41:27.593874	2020-10-26 08:07:50.165578	d5d1b841-5a1f-4d1c-b22f-b5898c167dae
469	f	2	2020-10-26 06:08:30.180683	2020-10-26 08:10:11.934015	68346517-429c-4dbd-a240-4b77f3e5ecfe
471	f	38	2020-10-26 08:10:45.901794	2020-10-26 08:10:48.08842	4048e91b-aceb-4056-a3fe-d96a66199dbc
472	f	59	2020-10-26 08:15:22.467006	2020-10-26 08:32:06.419559	05e241f7-d3b1-4d28-ad05-a69caba58a8c
473	f	59	2020-10-26 08:32:54.063826	2020-10-26 08:33:42.149872	837f38b8-efc1-49ee-80ec-b0117d1177f5
474	f	59	2020-10-26 08:34:10.226253	2020-10-26 08:47:23.276478	474f8e1a-120b-424c-8fac-6fcfae186cdb
470	f	2	2020-10-26 06:14:47.309019	2020-10-26 10:26:32.354554	f9127969-ae6e-445c-8f56-0c7d444e9dc8
475	f	2	2020-10-26 10:27:52.490854	2020-10-26 10:28:46.260726	244a9a9d-d57f-445b-a954-19300823d8b9
451	f	37	2020-10-23 10:27:33.11627	2020-10-27 02:45:37.134874	3e114622-faa3-4532-b7b8-091eb5422ead
477	t	61	2020-10-27 03:05:08.68186	2020-10-27 03:05:08.68186	6827f0dc-ebba-4476-8d18-2bd6f72c6e56
476	f	38	2020-10-26 10:43:03.322275	2020-10-27 09:23:01.417163	64344fd2-e0e8-4b99-9efc-f0ac2e8a2762
427	f	38	2020-10-23 06:37:12.429658	2020-11-02 03:57:37.920792	076d9d1b-cc18-48d4-948e-6a4484eae15b
468	f	2	2020-10-26 03:32:16.149767	2020-11-04 07:17:45.860409	760512f5-0e3a-410a-bf24-e93028b58ac3
467	f	38	2020-10-26 02:57:29.561201	2020-10-27 03:21:05.320986	462226a1-b5b0-49eb-9481-6049a7e99f52
478	f	38	2020-10-27 03:22:12.837	2020-10-27 03:29:56.994402	31c3d67b-5f98-48c2-8154-67da93d13287
479	f	2	2020-10-27 03:30:00.305905	2020-10-27 03:36:51.671253	a45b0f58-8e56-4314-bb64-6696c432207a
480	f	2	2020-10-27 03:36:56.106487	2020-10-27 03:43:34.699855	a586140d-8fef-49be-80a2-05f394796cb8
481	f	2	2020-10-27 03:44:47.138039	2020-10-27 03:44:50.304665	63ec652e-e3a3-4419-87ec-7571145f19b2
482	f	2	2020-10-27 03:46:46.997372	2020-10-27 03:46:50.05725	42c5541e-366c-4ca1-ba74-960340cb0470
483	f	2	2020-10-27 03:49:15.097272	2020-10-27 03:49:17.640093	adf1fdc5-2b57-4317-b49f-7a9723e4db9a
484	f	2	2020-10-27 03:52:48.151661	2020-10-27 03:52:50.884391	cfeaeba6-b4b4-442b-b548-9d822009e86a
485	f	2	2020-10-27 03:53:43.312174	2020-10-27 04:28:11.19651	ec5953bf-1800-4c41-9062-fa26b0832df9
486	t	62	2020-10-27 04:28:28.70103	2020-10-27 04:28:28.70103	089e4b22-7f7c-43ac-9119-3c3bd8d01b7b
487	t	2	2020-10-27 04:40:07.437331	2020-10-27 04:40:07.437331	01c93607-76c6-46a8-ba0f-5d739246a439
488	t	62	2020-10-27 04:59:09.791818	2020-10-27 04:59:09.791818	7c03c489-504b-4fff-8e9f-563b50744e7e
489	t	62	2020-10-27 04:59:13.152562	2020-10-27 04:59:13.152562	fb347c2a-73a6-4d25-82da-477b4fe476c3
490	t	62	2020-10-27 04:59:19.219744	2020-10-27 04:59:19.219744	3b363453-69e7-48de-a461-f50a35616b96
491	t	62	2020-10-27 04:59:24.716011	2020-10-27 04:59:24.716011	1c0d75e2-c4f2-4e95-8943-c272a653fc01
492	f	2	2020-10-27 05:03:37.228877	2020-10-27 07:09:03.000694	659bbd57-297d-47b5-b126-61f4f9fe7e62
493	t	2	2020-10-27 07:45:18.707546	2020-10-27 07:45:18.707546	e19aef5e-db02-4fad-9580-8ce445dac8c8
495	t	2	2020-10-28 01:55:30.943541	2020-10-28 01:55:30.943541	df8ac9a5-e06a-4c39-b350-063a1b684db6
497	t	2	2020-10-28 03:51:28.575815	2020-10-28 03:51:28.575815	829c3b1e-3c0e-446d-aa49-6129455b70ae
498	t	2	2020-10-28 03:52:22.744473	2020-10-28 03:52:22.744473	332276b9-ceb1-4959-996b-7d51dd7645e5
499	t	2	2020-10-28 03:54:16.833513	2020-10-28 03:54:16.833513	1b57da5e-0dca-4755-bf12-f94acd59ea7c
496	f	2	2020-10-28 03:19:55.665149	2020-10-28 04:34:04.286883	74400afa-17a3-462e-8262-a422c486ac0a
501	t	2	2020-10-28 06:29:51.716288	2020-10-28 06:29:51.716288	e574d993-36bf-47ba-8bf7-44cdd4d6f8d6
502	f	2	2020-10-29 02:37:21.859978	2020-10-29 02:40:01.572549	f6d5ace6-06dd-4b83-aec9-9acf0ae6544e
503	f	2	2020-10-29 03:37:06.982478	2020-10-29 03:45:17.649345	c70243bb-b3cf-417d-be5e-4318e6342321
494	f	38	2020-10-27 09:54:24.168459	2020-10-29 03:49:05.83684	556bf782-87b8-4f1b-aa62-6cad37a7c014
506	f	2	2020-10-29 05:50:55.995217	2020-10-29 05:53:01.209741	69f60890-3c28-4e0a-b4ed-df440884f58d
507	f	60	2020-10-29 05:54:11.150517	2020-10-29 05:54:28.488253	fc3c1cb6-355c-44b7-bec9-a7bbfae92446
508	f	2	2020-10-29 05:54:34.960331	2020-10-29 05:54:55.322356	2dd607c8-4b47-49d8-b0f3-9cdebb3e2bff
509	f	2	2020-10-29 05:57:04.664332	2020-10-29 06:00:25.193151	54a1879c-6120-40ab-b415-42f06c49d503
510	f	60	2020-10-29 06:00:32.477183	2020-10-29 07:21:11.599228	69182734-97ed-47d5-9307-e99970a6257f
504	f	62	2020-10-29 03:45:21.113778	2020-10-29 07:40:46.673321	db20d91e-f8b8-4209-89d6-5994bd13eedd
511	f	2	2020-10-29 07:42:26.182872	2020-10-29 07:42:30.376073	1b8af291-3e81-4c9d-be22-4ce6fae24a93
512	t	60	2020-10-29 07:43:49.689161	2020-10-29 07:43:49.689161	ee3a0c2b-c026-4254-b3fd-158e27d4b2b5
514	f	2	2020-10-29 11:40:23.025555	2020-10-29 11:42:29.926108	0b7e0e73-3f7f-40af-b09f-c748defbcacf
515	t	64	2020-10-29 11:42:44.574949	2020-10-29 11:42:44.574949	a57d32e6-69fd-4242-9f41-fc52bc68eed7
516	t	64	2020-10-30 07:38:45.98462	2020-10-30 07:38:45.98462	4dd5c626-d780-480e-a1ee-bbba52988b85
517	f	2	2020-10-30 10:23:47.224064	2020-10-30 10:24:25.843861	a7595b42-7c51-495c-9177-8dc64d58ed05
518	t	2	2020-10-30 10:24:38.584549	2020-10-30 10:24:38.584549	2d96d9ce-7173-4b8e-8056-32867350e30e
519	t	2	2020-10-30 11:31:47.80155	2020-10-30 11:31:47.80155	aee798b1-5233-49ff-93d0-f2ee3fc09658
521	t	2	2020-11-02 03:57:41.182715	2020-11-02 03:57:41.182715	9624fc37-2c9b-4bbe-b11f-414a07610b28
522	t	2	2020-11-02 03:58:04.656323	2020-11-02 03:58:04.656323	35da1582-c58b-4c55-839e-9ea481925878
523	t	2	2020-11-02 05:19:32.352834	2020-11-02 05:19:32.352834	7d24516a-124a-492f-b8f6-d0e4183912d4
524	t	2	2020-11-02 06:44:59.646526	2020-11-02 06:44:59.646526	209d29cd-b829-4d3f-bb6c-bb4da781c110
525	t	2	2020-11-02 06:58:37.267417	2020-11-02 06:58:37.267417	959c8ed1-4935-41f9-90ce-948e858a56fd
526	t	2	2020-11-02 06:59:43.890473	2020-11-02 06:59:43.890473	df894680-b6a3-452d-8be4-f8cdc146ef71
520	f	64	2020-10-31 11:08:24.444371	2020-11-02 08:35:36.047554	84f965f4-e3fe-4e34-a66b-f16850f55291
529	f	2	2020-11-02 08:35:45.45827	2020-11-02 08:45:26.069801	84bed4b8-b1a6-4108-986f-0fd0681c73cc
530	t	64	2020-11-02 08:45:44.11965	2020-11-02 08:45:44.11965	bc3c6798-c42f-4431-8f18-7897f352f3d0
531	t	2	2020-11-03 04:30:43.292317	2020-11-03 04:30:43.292317	255816c5-fcb7-4203-aba6-1057e9ac0a4b
513	f	60	2020-10-29 07:46:03.677373	2020-11-03 09:24:13.72574	daee24d8-f3b8-4e1c-94d6-ebe084987c8f
532	f	2	2020-11-03 09:24:17.389394	2020-11-03 09:39:31.467327	94a60c60-0d42-465e-8fef-881128afc733
533	t	2	2020-11-03 09:42:34.86063	2020-11-03 09:42:34.86063	9468a2fe-1ef2-42da-86ba-20602a6fd8dd
534	t	2	2020-11-03 10:12:09.425513	2020-11-03 10:12:09.425513	da934302-d19f-45e3-8516-b934c5aa4ca0
536	t	2	2020-11-04 06:32:30.382945	2020-11-04 06:32:30.382945	70c5eca6-3854-4c4c-bfff-ba18c7929562
528	f	2	2020-11-02 08:32:39.160394	2020-11-04 06:32:33.194935	a4e120bb-accc-4e0a-871b-12e1b30d5e49
537	t	64	2020-11-04 06:32:46.799004	2020-11-04 06:32:46.799004	b7c80946-d374-4b07-a666-2ee44389cbfc
538	t	66	2020-11-04 07:18:00.9899	2020-11-04 07:18:00.9899	f974e4e5-a3c2-4845-80bc-6347aca1bed4
540	t	2	2020-11-04 09:33:55.993239	2020-11-04 09:33:55.993239	67cd9d6e-813c-4d4a-a098-4e653f2f5595
541	t	64	2020-11-04 09:43:52.327149	2020-11-04 09:43:52.327149	c5aa168d-2440-4ef6-b9ff-abf88d19387f
542	t	2	2020-11-04 10:32:59.27222	2020-11-04 10:32:59.27222	38dafbcd-7bf5-488c-bbd2-33f260f4ed55
543	t	2	2020-11-04 15:03:22.31299	2020-11-04 15:03:22.31299	b9c26f72-e76b-446a-9347-c4dc38ec5ce7
544	t	2	2020-11-05 03:27:31.513598	2020-11-05 03:27:31.513598	b013a3e9-d231-4c6d-b646-0ff1ceb6785f
545	f	67	2020-11-05 04:10:27.391536	2020-11-05 04:10:42.852756	d58bd547-bd81-40e3-8cea-696a5424c868
546	f	67	2020-11-05 04:11:09.853745	2020-11-05 04:18:04.257584	9c1265fd-1fa4-4b3d-92ee-5dc1306101ab
547	f	67	2020-11-05 04:18:26.635815	2020-11-05 04:18:33.391431	85ab8a7f-2e4b-4518-ae8c-fd33184b368f
548	f	68	2020-11-05 04:19:51.929498	2020-11-05 04:20:36.930812	7cb94ef4-7a5c-49de-bc7c-cd4f0c55675e
539	f	66	2020-11-04 07:22:52.3013	2020-11-05 04:22:07.288754	6050ff56-b7d6-4631-85b0-a04ec6ac3265
551	t	64	2020-11-05 04:23:43.979171	2020-11-05 04:23:43.979171	54f618db-ebc8-4a2e-9b4c-0aee25a37e9a
552	t	38	2020-11-05 06:47:03.291464	2020-11-05 06:47:03.291464	a25be912-583d-4be4-8f62-cc53d326bda0
553	t	38	2020-11-05 07:25:08.907067	2020-11-05 07:25:08.907067	4ade1210-5629-4eb9-ac90-1d367a592b88
554	t	66	2020-11-05 08:06:40.154609	2020-11-05 08:06:40.154609	7efb293f-07f2-4053-b0ca-1d62d033e05a
535	f	2	2020-11-03 10:24:38.808703	2020-11-05 08:14:04.818799	4f79aa37-0c91-4f03-a850-cc928d397226
556	t	2	2020-11-05 08:15:35.25668	2020-11-05 08:15:35.25668	c1efb7a8-f36a-4063-9bd8-a0476c3b255e
555	f	56	2020-11-05 08:14:12.364529	2020-11-06 02:12:22.609747	d0ae95b0-6b69-4d38-b3fc-2727f049c5e9
550	f	66	2020-11-05 04:22:32.885345	2020-11-06 03:32:15.031719	f6b1b688-6acc-4475-9957-fa4e3543924e
527	f	64	2020-11-02 08:28:26.406098	2020-11-06 04:32:32.041659	32f95de3-f15c-418b-b7ad-a3b9769dd3d7
549	f	68	2020-11-05 04:20:56.29344	2020-11-06 04:47:58.657853	ed65afaa-01b9-47ac-af4d-ede63b0ad69e
500	f	2	2020-10-28 06:29:49.714487	2020-11-06 06:07:19.238656	d7cc604e-8681-4194-a1e2-fbd169d0b8bf
557	t	2	2020-11-05 08:17:09.759687	2020-11-05 08:17:09.759687	e39d5ecd-2826-49fa-85fe-0117d1403d13
558	t	38	2020-11-05 08:57:31.159844	2020-11-05 08:57:31.159844	0175e04d-bd37-4193-a5b4-9aee53e33c34
559	t	38	2020-11-05 08:58:07.932453	2020-11-05 08:58:07.932453	9f487322-8b68-4cca-8cdb-984e76e3461b
560	t	2	2020-11-05 09:02:06.449668	2020-11-05 09:02:06.449668	ab92bc90-e4e7-4bc8-8509-42dde633e177
561	t	2	2020-11-05 09:26:46.507994	2020-11-05 09:26:46.507994	15c636f3-4833-427a-a078-1459305ac54b
562	t	64	2020-11-05 11:53:14.56603	2020-11-05 11:53:14.56603	77d56bee-4318-4a2a-93cc-2a3e97325896
563	t	38	2020-11-05 14:56:52.795839	2020-11-05 14:56:52.795839	874b2ef8-7082-4ddf-b8d6-097248591620
505	f	2	2020-10-29 03:49:09.114585	2020-11-06 01:32:14.260346	2ed285ba-c5fc-421e-b288-78d80dc347db
565	f	60	2020-11-06 02:12:26.776912	2020-11-06 02:17:11.860377	575c24aa-068b-4915-97c7-2511b2daa10a
567	t	38	2020-11-06 02:22:14.027659	2020-11-06 02:22:14.027659	733bc6ea-866f-40a3-994f-1410cf582651
566	f	2	2020-11-06 02:17:15.640908	2020-11-06 02:45:33.980916	a179eb6e-9d80-48bf-82e8-dbf9e24c3b53
569	t	66	2020-11-06 03:32:18.615797	2020-11-06 03:32:18.615797	dd9982fd-8884-4322-8ec6-ee185b3c0f47
570	f	66	2020-11-06 03:33:12.5348	2020-11-06 03:33:43.899876	b7a8479a-2389-42cb-a6f2-ea747ba25d34
571	f	66	2020-11-06 03:33:49.956298	2020-11-06 03:35:04.355059	92e20589-15c3-4d7d-a5f9-55b46d9fd6bb
572	f	66	2020-11-06 03:35:08.406883	2020-11-06 03:39:35.122738	de329840-3754-46ab-af7c-4eb97733dcfa
573	f	66	2020-11-06 03:39:38.012155	2020-11-06 03:40:35.127576	71a1e251-068e-41b2-85b1-fbafda15e1bf
574	f	66	2020-11-06 03:40:38.190683	2020-11-06 03:41:57.139175	ed6b04d2-7dd7-4eb5-a0ac-97fa5af8365c
576	f	38	2020-11-06 04:34:12.500083	2020-11-06 04:36:08.435973	70eb4004-9d0a-42cc-a231-f28d3d064207
577	t	38	2020-11-06 04:36:54.787747	2020-11-06 04:36:54.787747	6c695688-264f-474a-b858-3186dd88d49c
568	f	56	2020-11-06 02:45:39.439059	2020-11-06 04:39:54.507161	00f6409f-57b7-4cea-a1ad-3f394316bf02
579	t	38	2020-11-06 06:07:25.951134	2020-11-06 06:07:25.951134	9381ccf5-446d-4f9a-be8d-3bea42d20b21
580	t	64	2020-11-06 06:26:36.159897	2020-11-06 06:26:36.159897	a4ee3aca-fd7b-4283-a637-cc254d28760b
578	f	2	2020-11-06 04:39:57.738506	2020-11-06 06:31:29.215693	81ebf110-90af-4f6c-884c-7a250a70dbfa
581	f	56	2020-11-06 06:31:33.203336	2020-11-06 06:44:41.776608	31bb69f5-1a3b-4c37-858a-c603a76e0d6a
582	t	60	2020-11-06 06:44:45.13103	2020-11-06 06:44:45.13103	13eca83c-b84f-4d94-b6a8-d9375560cd95
583	t	2	2020-11-06 07:51:53.871699	2020-11-06 07:51:53.871699	1bf97dea-8bf0-4be2-845d-bcd380a84106
584	t	2	2020-11-06 08:06:30.119649	2020-11-06 08:06:30.119649	7504a7d4-a324-4303-b5c2-5c801ff56d94
585	t	2	2020-11-06 08:17:26.627242	2020-11-06 08:17:26.627242	6ece1dba-bc32-4f98-839e-c484a6ee5f18
575	f	66	2020-11-06 03:42:00.75356	2020-11-06 09:11:44.962294	963a61fc-10fe-4d1c-85d5-3de64e331778
586	t	66	2020-11-06 09:11:48.760241	2020-11-06 09:11:48.760241	3c7346c1-1ac2-4587-b1a5-381aeb6cc084
564	f	2	2020-11-06 01:32:17.245819	2020-11-06 09:28:49.057745	b3389acf-4bb3-491b-9802-88c4dfac3ca8
587	f	38	2020-11-06 09:28:52.268598	2020-11-06 09:46:03.105689	5b932f6f-8818-4417-b85c-134679c119c9
588	f	56	2020-11-06 09:46:09.45953	2020-11-06 15:15:06.132413	c8ac4e18-d2a4-4c61-8e05-3416e74e2646
589	t	2	2020-11-06 15:15:09.934164	2020-11-06 15:15:09.934164	a43bc547-7742-4767-9c00-be15fa354aab
\.


--
-- Name: account_account_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_account_groups_id_seq', 90, true);


--
-- Name: account_group_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_group_features_id_seq', 71, true);


--
-- Name: account_group_resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_group_resources_id_seq', 33, true);


--
-- Name: account_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_groups_id_seq', 17, true);


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_id_seq', 70, true);


--
-- Name: advantage_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.advantage_levels_id_seq', 44, true);


--
-- Name: appraisal_audit_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appraisal_audit_details_id_seq', 41, true);


--
-- Name: appraisal_statement_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appraisal_statement_notes_id_seq', 22, true);


--
-- Name: casbin_rule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.casbin_rule_id_seq', 1, false);


--
-- Name: chat_sockets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_sockets_id_seq', 1192, true);


--
-- Name: collaborators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collaborators_id_seq', 80, true);


--
-- Name: conversations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversations_id_seq', 20, true);


--
-- Name: disadvantage_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.disadvantage_levels_id_seq', 30, true);


--
-- Name: employee_limits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_limits_id_seq', 231, true);


--
-- Name: employee_regions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_regions_id_seq', 163, true);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 27, true);


--
-- Name: features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.features_id_seq', 16, true);


--
-- Name: group_values_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_values_id_seq', 79, true);


--
-- Name: inspection_statement_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspection_statement_notes_id_seq', 27, true);


--
-- Name: master_values_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_values_id_seq', 232, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 235, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 53, true);


--
-- Name: participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participants_id_seq', 40, true);


--
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.properties_id_seq', 96, true);


--
-- Name: property_bookmarks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_bookmarks_id_seq', 10, true);


--
-- Name: property_history_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_history_notes_id_seq', 88, true);


--
-- Name: reset_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reset_tokens_id_seq', 39, true);


--
-- Name: resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resources_id_seq', 4, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 589, true);


--
-- Name: employee_limits PK_13759155a8a08c21f8051f8eccf; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_limits
    ADD CONSTRAINT "PK_13759155a8a08c21f8051f8eccf" PRIMARY KEY (id);


--
-- Name: advantage_levels PK_15f069a9c36db10c2955208315a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advantage_levels
    ADD CONSTRAINT "PK_15f069a9c36db10c2955208315a" PRIMARY KEY (id);


--
-- Name: messages PK_18325f38ae6de43878487eff986; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY (id);


--
-- Name: employee_regions PK_190dc2a2f5d8ed8f5a703872140; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_regions
    ADD CONSTRAINT "PK_190dc2a2f5d8ed8f5a703872140" PRIMARY KEY (id);


--
-- Name: participants PK_1cda06c31eec1c95b3365a0283f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY (id);


--
-- Name: group_values PK_222027d98916d3ed61a0ffbb2bb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_values
    ADD CONSTRAINT "PK_222027d98916d3ed61a0ffbb2bb" PRIMARY KEY (id);


--
-- Name: account_groups PK_297ac55323f43dcee271a4b10a1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_groups
    ADD CONSTRAINT "PK_297ac55323f43dcee271a4b10a1" PRIMARY KEY (id);


--
-- Name: properties PK_2d83bfa0b9fcd45dee1785af44d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY (id);


--
-- Name: appraisal_audit_details PK_2e6a69fcd768b1a2ad98b9e320e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_audit_details
    ADD CONSTRAINT "PK_2e6a69fcd768b1a2ad98b9e320e" PRIMARY KEY (id);


--
-- Name: sessions PK_3238ef96f18b355b671619111bc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY (id);


--
-- Name: master_values PK_339e06b23c50e24e0641630f6eb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_values
    ADD CONSTRAINT "PK_339e06b23c50e24e0641630f6eb" PRIMARY KEY (id);


--
-- Name: property_bookmarks PK_3aa4dc42c2bcafddc9eb054d16e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_bookmarks
    ADD CONSTRAINT "PK_3aa4dc42c2bcafddc9eb054d16e" PRIMARY KEY (id);


--
-- Name: appraisal_statement_notes PK_4ee334813cc46169e30fd5a97ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "PK_4ee334813cc46169e30fd5a97ca" PRIMARY KEY (id);


--
-- Name: chat_sockets PK_554bd1a30e2bc55dbfc36083096; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_sockets
    ADD CONSTRAINT "PK_554bd1a30e2bc55dbfc36083096" PRIMARY KEY (id);


--
-- Name: accounts PK_5a7a02c20412299d198e097a8fe; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY (id);


--
-- Name: features PK_5c1e336df2f4a7051e5bf08a941; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.features
    ADD CONSTRAINT "PK_5c1e336df2f4a7051e5bf08a941" PRIMARY KEY (id);


--
-- Name: resources PK_632484ab9dff41bba94f9b7c85e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: account_group_resources PK_9c9cfd12a7f0dbe558e9aedbcc3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_resources
    ADD CONSTRAINT "PK_9c9cfd12a7f0dbe558e9aedbcc3" PRIMARY KEY (id);


--
-- Name: account_account_groups PK_9f0d2962f1615dc58c7a0996373; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_account_groups
    ADD CONSTRAINT "PK_9f0d2962f1615dc58c7a0996373" PRIMARY KEY (id);


--
-- Name: account_group_features PK_a5d94cea6fb86834624c1acf5a3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_features
    ADD CONSTRAINT "PK_a5d94cea6fb86834624c1acf5a3" PRIMARY KEY (id);


--
-- Name: reset_tokens PK_acd6ec48b54150b1736d0b454b9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_tokens
    ADD CONSTRAINT "PK_acd6ec48b54150b1736d0b454b9" PRIMARY KEY (id);


--
-- Name: inspection_statement_notes PK_b0a38f022e7c3468c503a8b26f5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "PK_b0a38f022e7c3468c503a8b26f5" PRIMARY KEY (id);


--
-- Name: property_history_notes PK_b91bfa17cf675e14bd8f52ae9f6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_history_notes
    ADD CONSTRAINT "PK_b91bfa17cf675e14bd8f52ae9f6" PRIMARY KEY (id);


--
-- Name: employees PK_b9535a98350d5b26e7eb0c26af4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY (id);


--
-- Name: disadvantage_levels PK_d15a5bbde613cc7e17ced6fa286; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disadvantage_levels
    ADD CONSTRAINT "PK_d15a5bbde613cc7e17ced6fa286" PRIMARY KEY (id);


--
-- Name: casbin_rule PK_e147354d31e2748a3a5da5e3060; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.casbin_rule
    ADD CONSTRAINT "PK_e147354d31e2748a3a5da5e3060" PRIMARY KEY (id);


--
-- Name: conversations PK_ee34f4f7ced4ec8681f26bf04ef; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY (id);


--
-- Name: collaborators PK_f579a5df9d66287f400806ad875; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT "PK_f579a5df9d66287f400806ad875" PRIMARY KEY (id);


--
-- Name: accounts REL_15989853f2059dfa196b125e3a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "REL_15989853f2059dfa196b125e3a" UNIQUE (collaborator_id);


--
-- Name: accounts REL_58a822e2173fc944aa584d1ee4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "REL_58a822e2173fc944aa584d1ee4" UNIQUE (employee_id);


--
-- Name: appraisal_statement_notes UNIQUE_APPRAISAL_STATEMENT_NOTE_ID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "UNIQUE_APPRAISAL_STATEMENT_NOTE_ID" UNIQUE (note_id);


--
-- Name: chat_sockets UNIQUE_CHAT_SOCKET; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_sockets
    ADD CONSTRAINT "UNIQUE_CHAT_SOCKET" UNIQUE (socket_id);


--
-- Name: inspection_statement_notes UNIQUE_NOTE_ID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "UNIQUE_NOTE_ID" UNIQUE (note_id);


--
-- Name: accounts UQ_0d65dc1818407acf2611160bec3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "UQ_0d65dc1818407acf2611160bec3" UNIQUE (identity_name);


--
-- Name: properties UQ_220d2c2f64cf6d6eeb6816b84a8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "UQ_220d2c2f64cf6d6eeb6816b84a8" UNIQUE (code);


--
-- Name: employees UQ_2f88c4dff473076e55ca2568d51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "UQ_2f88c4dff473076e55ca2568d51" UNIQUE (code);


--
-- Name: account_groups UQ_bcbc2c59c6b8787d5aa463fa19e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_groups
    ADD CONSTRAINT "UQ_bcbc2c59c6b8787d5aa463fa19e" UNIQUE (code);


--
-- Name: collaborators UQ_e7e847fc999bc8504ee34789338; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT "UQ_e7e847fc999bc8504ee34789338" UNIQUE (phone);


--
-- Name: property_history_notes FK_025e855ffe476be1cb1bd2b8745; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_history_notes
    ADD CONSTRAINT "FK_025e855ffe476be1cb1bd2b8745" FOREIGN KEY (reason_id) REFERENCES public.master_values(id);


--
-- Name: appraisal_statement_notes FK_02988166a518849e42cbe0f1573; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_02988166a518849e42cbe0f1573" FOREIGN KEY (street_id) REFERENCES public.master_values(id);


--
-- Name: appraisal_statement_notes FK_03ab55b7ca56a7107e1dabe5a43; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_03ab55b7ca56a7107e1dabe5a43" FOREIGN KEY (approved_by) REFERENCES public.accounts(id);


--
-- Name: employees FK_0ab5290751972652ae2786f4bc3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_0ab5290751972652ae2786f4bc3" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: employees FK_0c02e079dfeacd744061891c420; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_0c02e079dfeacd744061891c420" FOREIGN KEY (title_id) REFERENCES public.master_values(id);


--
-- Name: group_values FK_0c05ea46960ed2be26c95627511; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_values
    ADD CONSTRAINT "FK_0c05ea46960ed2be26c95627511" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: accounts FK_0dbe5e3689179dacc7c44c46d99; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "FK_0dbe5e3689179dacc7c44c46d99" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_1591d2ca6e710a34efe8846182d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_1591d2ca6e710a34efe8846182d" FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- Name: accounts FK_15989853f2059dfa196b125e3ad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "FK_15989853f2059dfa196b125e3ad" FOREIGN KEY (collaborator_id) REFERENCES public.collaborators(id);


--
-- Name: master_values FK_17264f533257e1c69600a1276b6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_values
    ADD CONSTRAINT "FK_17264f533257e1c69600a1276b6" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_17bfa65e396a03b9d03c308e49a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_17bfa65e396a03b9d03c308e49a" FOREIGN KEY (street_id) REFERENCES public.master_values(id);


--
-- Name: resources FK_18b3ac444710d4288aca3defb4c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT "FK_18b3ac444710d4288aca3defb4c" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: account_account_groups FK_1b463dec857c192a36ca6d2d111; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_account_groups
    ADD CONSTRAINT "FK_1b463dec857c192a36ca6d2d111" FOREIGN KEY (account_id) REFERENCES public.accounts(id);


--
-- Name: advantage_levels FK_1e06e5803c5047d8e4fa63c430f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advantage_levels
    ADD CONSTRAINT "FK_1e06e5803c5047d8e4fa63c430f" FOREIGN KEY (group_id) REFERENCES public.master_values(id);


--
-- Name: properties FK_21050016bee57be0b28e2c7ad97; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_21050016bee57be0b28e2c7ad97" FOREIGN KEY (property_type_id) REFERENCES public.master_values(id);


--
-- Name: collaborators FK_24415aaa8dc6e5fe107d29ecdb5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT "FK_24415aaa8dc6e5fe107d29ecdb5" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: participants FK_24dacc750cee81145fd072ad402; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "FK_24dacc750cee81145fd072ad402" FOREIGN KEY (last_seen_id) REFERENCES public.messages(id);


--
-- Name: property_bookmarks FK_279d4394b366ea68d5124c7584b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_bookmarks
    ADD CONSTRAINT "FK_279d4394b366ea68d5124c7584b" FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- Name: appraisal_statement_notes FK_294c8d280936fe76b26218a9184; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_294c8d280936fe76b26218a9184" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: employee_limits FK_2aa4139f95956b00572031e64c2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_limits
    ADD CONSTRAINT "FK_2aa4139f95956b00572031e64c2" FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: employee_regions FK_2b1d33155f9b075b4f23e9a5f36; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_regions
    ADD CONSTRAINT "FK_2b1d33155f9b075b4f23e9a5f36" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_2bf89f57b07bc7c24f4082a4a30; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_2bf89f57b07bc7c24f4082a4a30" FOREIGN KEY (street_group_id) REFERENCES public.master_values(id);


--
-- Name: employee_regions FK_2cb570210778638846613ad1b8a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_regions
    ADD CONSTRAINT "FK_2cb570210778638846613ad1b8a" FOREIGN KEY (ward_id) REFERENCES public.master_values(id);


--
-- Name: master_values FK_2e1ca1a84da8a0798b4a9882cac; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_values
    ADD CONSTRAINT "FK_2e1ca1a84da8a0798b4a9882cac" FOREIGN KEY (group_id) REFERENCES public.group_values(id);


--
-- Name: properties FK_32f6fdc2b760448a623d1bfa3e4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_32f6fdc2b760448a623d1bfa3e4" FOREIGN KEY (property_using_id) REFERENCES public.master_values(id);


--
-- Name: messages FK_3bc55a7c3f9ed54b520bb5cfe23; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23" FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);


--
-- Name: properties FK_400a4bc1a6b72686c88c527928e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_400a4bc1a6b72686c88c527928e" FOREIGN KEY (property_period_id) REFERENCES public.master_values(id);


--
-- Name: account_account_groups FK_41c1762a81152b084f7891b5542; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_account_groups
    ADD CONSTRAINT "FK_41c1762a81152b084f7891b5542" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: employees FK_43d76ca7eecf9373241e2e890fb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_43d76ca7eecf9373241e2e890fb" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: properties FK_43dd46ae9ceea39dcd1795f82e7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_43dd46ae9ceea39dcd1795f82e7" FOREIGN KEY (urgent_level_id) REFERENCES public.master_values(id);


--
-- Name: property_history_notes FK_484b6cd682de5c5e9cc0a39fa53; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_history_notes
    ADD CONSTRAINT "FK_484b6cd682de5c5e9cc0a39fa53" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: account_account_groups FK_4aba453f9b592e700a009883173; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_account_groups
    ADD CONSTRAINT "FK_4aba453f9b592e700a009883173" FOREIGN KEY (account_group_id) REFERENCES public.account_groups(id);


--
-- Name: employee_regions FK_4c46b094d7169473e37f6902e7d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_regions
    ADD CONSTRAINT "FK_4c46b094d7169473e37f6902e7d" FOREIGN KEY (city_id) REFERENCES public.master_values(id);


--
-- Name: messages FK_4d025b3431171ff016586ba81ad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_4d025b3431171ff016586ba81ad" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: properties FK_50ef874d78e1463a4925c88b7d8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_50ef874d78e1463a4925c88b7d8" FOREIGN KEY (ward_id) REFERENCES public.master_values(id);


--
-- Name: inspection_statement_notes FK_5208bd94c9e4c43075034f6c5c5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_5208bd94c9e4c43075034f6c5c5" FOREIGN KEY (instructor_id) REFERENCES public.accounts(id);


--
-- Name: appraisal_statement_notes FK_54033e1b5a581c9a4ca782bc69c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_54033e1b5a581c9a4ca782bc69c" FOREIGN KEY (company_id) REFERENCES public.master_values(id);


--
-- Name: appraisal_statement_notes FK_573531627060a6f191e98e30427; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_573531627060a6f191e98e30427" FOREIGN KEY (city_id) REFERENCES public.master_values(id);


--
-- Name: accounts FK_58a822e2173fc944aa584d1ee44; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "FK_58a822e2173fc944aa584d1ee44" FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: participants FK_5bbc467af441253dc9216386d8b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "FK_5bbc467af441253dc9216386d8b" FOREIGN KEY (account_id) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_5e0a9529ee0ea2426d623cb5b97; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_5e0a9529ee0ea2426d623cb5b97" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_5e64c5062b0e2942304ad07c1ba; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_5e64c5062b0e2942304ad07c1ba" FOREIGN KEY (broker_id) REFERENCES public.accounts(id);


--
-- Name: account_group_resources FK_60ffcaf93e16b0444ecde137904; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_resources
    ADD CONSTRAINT "FK_60ffcaf93e16b0444ecde137904" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: conversations FK_61ba6fe3fb80ea3012866880bf9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT "FK_61ba6fe3fb80ea3012866880bf9" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: properties FK_626629e699c43803798e6bed714; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_626629e699c43803798e6bed714" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: group_values FK_6358c723640928072ec28218c58; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_values
    ADD CONSTRAINT "FK_6358c723640928072ec28218c58" FOREIGN KEY (parent_id) REFERENCES public.group_values(id);


--
-- Name: chat_sockets FK_643b7540acdf92ebcad561dc870; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_sockets
    ADD CONSTRAINT "FK_643b7540acdf92ebcad561dc870" FOREIGN KEY (account_id) REFERENCES public.accounts(id);


--
-- Name: employees FK_678a3540f843823784b0fe4a4f2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY (department_id) REFERENCES public.master_values(id);


--
-- Name: features FK_67c0e874b8456ab2a5b0949cd7d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.features
    ADD CONSTRAINT "FK_67c0e874b8456ab2a5b0949cd7d" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_6979bbf5dc3fe211d5182902a30; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_6979bbf5dc3fe211d5182902a30" FOREIGN KEY (assignee_id) REFERENCES public.accounts(id);


--
-- Name: properties FK_6af846307bbf10b17d7de6d0c66; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_6af846307bbf10b17d7de6d0c66" FOREIGN KEY (street_id) REFERENCES public.master_values(id);


--
-- Name: inspection_statement_notes FK_6b0efa5125a7a3f92a9085d3d3f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_6b0efa5125a7a3f92a9085d3d3f" FOREIGN KEY (approved_by) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_6c4d9071bed4d40011feaf778d7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_6c4d9071bed4d40011feaf778d7" FOREIGN KEY (district_id) REFERENCES public.master_values(id);


--
-- Name: reset_tokens FK_6c715d809f06df75651aee62b3b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_tokens
    ADD CONSTRAINT "FK_6c715d809f06df75651aee62b3b" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: master_values FK_6c75bc45315e7c686b6984d3f9b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_values
    ADD CONSTRAINT "FK_6c75bc45315e7c686b6984d3f9b" FOREIGN KEY (parent_id) REFERENCES public.master_values(id);


--
-- Name: accounts FK_6ce484b7743042752cdecc41c99; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "FK_6ce484b7743042752cdecc41c99" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: property_history_notes FK_6fde7bb70228eb7371a24842b11; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_history_notes
    ADD CONSTRAINT "FK_6fde7bb70228eb7371a24842b11" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: appraisal_statement_notes FK_706169fd1147802394f34d73900; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_706169fd1147802394f34d73900" FOREIGN KEY (assignee_id) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_76a505bc88dc60ba3e8c9922065; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_76a505bc88dc60ba3e8c9922065" FOREIGN KEY (rejected_by) REFERENCES public.accounts(id);


--
-- Name: account_group_resources FK_79744d23eee03592941f539567c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_resources
    ADD CONSTRAINT "FK_79744d23eee03592941f539567c" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: property_bookmarks FK_7abb1feae0cb34abfe08cc7d38c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_bookmarks
    ADD CONSTRAINT "FK_7abb1feae0cb34abfe08cc7d38c" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: advantage_levels FK_7b2abadde4f2b1e3d1d8f1119e3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advantage_levels
    ADD CONSTRAINT "FK_7b2abadde4f2b1e3d1d8f1119e3" FOREIGN KEY (type_id) REFERENCES public.master_values(id);


--
-- Name: properties FK_7b75ab8ed3890360a27298b5bb8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_7b75ab8ed3890360a27298b5bb8" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: property_history_notes FK_7cf8207fd17543ac14f60234f97; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_history_notes
    ADD CONSTRAINT "FK_7cf8207fd17543ac14f60234f97" FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- Name: account_group_features FK_7d53023e31ed71c1da9d1f3d6a6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_features
    ADD CONSTRAINT "FK_7d53023e31ed71c1da9d1f3d6a6" FOREIGN KEY (feature_id) REFERENCES public.features(id);


--
-- Name: appraisal_audit_details FK_7f3e4172dd5307fcb7b036f03c7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_audit_details
    ADD CONSTRAINT "FK_7f3e4172dd5307fcb7b036f03c7" FOREIGN KEY (appraisal_statement_id) REFERENCES public.appraisal_statement_notes(id);


--
-- Name: disadvantage_levels FK_80db44884234087a0d638deaae7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disadvantage_levels
    ADD CONSTRAINT "FK_80db44884234087a0d638deaae7" FOREIGN KEY (type_id) REFERENCES public.master_values(id);


--
-- Name: conversations FK_81d92d15c62b3fff79c617c9043; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT "FK_81d92d15c62b3fff79c617c9043" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: appraisal_audit_details FK_81eb74601cfeffe33cd30f4b38d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_audit_details
    ADD CONSTRAINT "FK_81eb74601cfeffe33cd30f4b38d" FOREIGN KEY (inspection_statement_id) REFERENCES public.inspection_statement_notes(id);


--
-- Name: account_group_resources FK_835c92badef9f5303cd248c1869; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_resources
    ADD CONSTRAINT "FK_835c92badef9f5303cd248c1869" FOREIGN KEY (account_group_id) REFERENCES public.account_groups(id);


--
-- Name: appraisal_audit_details FK_8a0626ce8a3e64a80eec211e61d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_audit_details
    ADD CONSTRAINT "FK_8a0626ce8a3e64a80eec211e61d" FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- Name: inspection_statement_notes FK_8cb2219bfbaeb52fa72b66977c4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_8cb2219bfbaeb52fa72b66977c4" FOREIGN KEY (company_id) REFERENCES public.master_values(id);


--
-- Name: chat_sockets FK_8f671fabf4c87f8a858426ee968; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_sockets
    ADD CONSTRAINT "FK_8f671fabf4c87f8a858426ee968" FOREIGN KEY (session_id) REFERENCES public.sessions(id);


--
-- Name: features FK_929b48fded34ee7814af2b4adeb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.features
    ADD CONSTRAINT "FK_929b48fded34ee7814af2b4adeb" FOREIGN KEY (resource_id) REFERENCES public.resources(id);


--
-- Name: collaborators FK_93a7f8d818b1970701eb4230d5d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT "FK_93a7f8d818b1970701eb4230d5d" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: appraisal_statement_notes FK_9419e728ba26daeb0ee99a5677f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_9419e728ba26daeb0ee99a5677f" FOREIGN KEY (completed_by) REFERENCES public.accounts(id);


--
-- Name: account_groups FK_952a06d88b2b42cf68f09cb2322; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_groups
    ADD CONSTRAINT "FK_952a06d88b2b42cf68f09cb2322" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: employee_limits FK_9941600a57aa3d50717093146f6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_limits
    ADD CONSTRAINT "FK_9941600a57aa3d50717093146f6" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: appraisal_statement_notes FK_9b913aa831f4be70aab5ad233b6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_9b913aa831f4be70aab5ad233b6" FOREIGN KEY (rejected_by) REFERENCES public.accounts(id);


--
-- Name: collaborators FK_a29feb8c921ee69156ee37a1d24; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT "FK_a29feb8c921ee69156ee37a1d24" FOREIGN KEY (company_id) REFERENCES public.master_values(id);


--
-- Name: appraisal_statement_notes FK_a3d4e3c23b62ba110fe0b29d488; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_a3d4e3c23b62ba110fe0b29d488" FOREIGN KEY (district_id) REFERENCES public.master_values(id);


--
-- Name: conversations FK_a53679287450d522a3f700088e9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT "FK_a53679287450d522a3f700088e9" FOREIGN KEY (last_message_id) REFERENCES public.messages(id);


--
-- Name: features FK_a8886c56ef3a5f19c35fb3b39c4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.features
    ADD CONSTRAINT "FK_a8886c56ef3a5f19c35fb3b39c4" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: property_bookmarks FK_ac2399ec7db0daaf5889c0dbf09; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_bookmarks
    ADD CONSTRAINT "FK_ac2399ec7db0daaf5889c0dbf09" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: employee_regions FK_af6acf9f2c28d64672afb7ab951; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_regions
    ADD CONSTRAINT "FK_af6acf9f2c28d64672afb7ab951" FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: reset_tokens FK_b081a0137a2ccb5f1978b683b42; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_tokens
    ADD CONSTRAINT "FK_b081a0137a2ccb5f1978b683b42" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: account_account_groups FK_b547839735830a82f8257558821; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_account_groups
    ADD CONSTRAINT "FK_b547839735830a82f8257558821" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: properties FK_b61dcfd1fe20c84397b07551564; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_b61dcfd1fe20c84397b07551564" FOREIGN KEY (district_id) REFERENCES public.master_values(id);


--
-- Name: employee_regions FK_b7c5e81c46d8821604971a4d8fe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_regions
    ADD CONSTRAINT "FK_b7c5e81c46d8821604971a4d8fe" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_b8becf4ef619dc9ec81af5dc3c2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_b8becf4ef619dc9ec81af5dc3c2" FOREIGN KEY (position_group_id) REFERENCES public.master_values(id);


--
-- Name: properties FK_b9ea018c1a4d3712f24f6811da8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_b9ea018c1a4d3712f24f6811da8" FOREIGN KEY (approved_by) REFERENCES public.accounts(id);


--
-- Name: employees FK_bcdf921072a19dd2758a628c5c0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_bcdf921072a19dd2758a628c5c0" FOREIGN KEY (manager_id) REFERENCES public.employees(id);


--
-- Name: messages FK_bd66b84a312d9bf0e64b2e81902; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_bd66b84a312d9bf0e64b2e81902" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: appraisal_audit_details FK_be6c2f1f92312f10e5053ce9b21; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_audit_details
    ADD CONSTRAINT "FK_be6c2f1f92312f10e5053ce9b21" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: account_group_features FK_bf304c7fcf49aeb34f0696710a6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_features
    ADD CONSTRAINT "FK_bf304c7fcf49aeb34f0696710a6" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: appraisal_statement_notes FK_c0d4be9aece0d5e6d3061908861; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_c0d4be9aece0d5e6d3061908861" FOREIGN KEY (property_id) REFERENCES public.properties(id);


--
-- Name: employees FK_c4a614082e4e5c9ee4ce0808538; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_c4a614082e4e5c9ee4ce0808538" FOREIGN KEY (status_id) REFERENCES public.master_values(id);


--
-- Name: master_values FK_c4e8956d9f171283aac311fd2fc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.master_values
    ADD CONSTRAINT "FK_c4e8956d9f171283aac311fd2fc" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: employee_regions FK_c506d6dd7db93068d8499e76949; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_regions
    ADD CONSTRAINT "FK_c506d6dd7db93068d8499e76949" FOREIGN KEY (district_id) REFERENCES public.master_values(id);


--
-- Name: appraisal_statement_notes FK_c5d6f03b0e28a39feb39ee62965; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_c5d6f03b0e28a39feb39ee62965" FOREIGN KEY (instructor_id) REFERENCES public.accounts(id);


--
-- Name: disadvantage_levels FK_cc62d032b1a00e7ca062d441eb8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disadvantage_levels
    ADD CONSTRAINT "FK_cc62d032b1a00e7ca062d441eb8" FOREIGN KEY (inspection_statement_id) REFERENCES public.inspection_statement_notes(id);


--
-- Name: appraisal_statement_notes FK_ccae8406ca45e0a4a892f0631e3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_ccae8406ca45e0a4a892f0631e3" FOREIGN KEY (execution_by) REFERENCES public.accounts(id);


--
-- Name: employee_limits FK_cd6cc27a5135d789fe18ffef2c4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_limits
    ADD CONSTRAINT "FK_cd6cc27a5135d789fe18ffef2c4" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: employee_limits FK_d199a6730d8656afad29711d48d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_limits
    ADD CONSTRAINT "FK_d199a6730d8656afad29711d48d" FOREIGN KEY (type_id) REFERENCES public.master_values(id);


--
-- Name: account_group_resources FK_d514e7c34a1c3732c87fc9f03ae; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_resources
    ADD CONSTRAINT "FK_d514e7c34a1c3732c87fc9f03ae" FOREIGN KEY (resource_id) REFERENCES public.resources(id);


--
-- Name: account_group_features FK_d5e75aa31ff4051986284b1b342; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_features
    ADD CONSTRAINT "FK_d5e75aa31ff4051986284b1b342" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: sessions FK_da0cf19646ff5c6e3c0284468e5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "FK_da0cf19646ff5c6e3c0284468e5" FOREIGN KEY (account_id) REFERENCES public.accounts(id);


--
-- Name: appraisal_audit_details FK_dd1fa898835c4f06287bb3504ec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_audit_details
    ADD CONSTRAINT "FK_dd1fa898835c4f06287bb3504ec" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: participants FK_de8978490834e2e9cb3c3fc8066; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "FK_de8978490834e2e9cb3c3fc8066" FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);


--
-- Name: advantage_levels FK_dfc704e0d064f5ca14fb65485c4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advantage_levels
    ADD CONSTRAINT "FK_dfc704e0d064f5ca14fb65485c4" FOREIGN KEY (inspection_statement_id) REFERENCES public.inspection_statement_notes(id);


--
-- Name: appraisal_statement_notes FK_e0a687a82bd18e152c00bf3ef80; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_e0a687a82bd18e152c00bf3ef80" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: disadvantage_levels FK_e15d756cd47156e61279e23967d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.disadvantage_levels
    ADD CONSTRAINT "FK_e15d756cd47156e61279e23967d" FOREIGN KEY (group_id) REFERENCES public.master_values(id);


--
-- Name: account_group_features FK_e19bad8d66915fcc714b165fbf8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_group_features
    ADD CONSTRAINT "FK_e19bad8d66915fcc714b165fbf8" FOREIGN KEY (account_group_id) REFERENCES public.account_groups(id);


--
-- Name: resources FK_e53ebff79b93bd89fbe2b54a75f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT "FK_e53ebff79b93bd89fbe2b54a75f" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: properties FK_e84dd96eca02f3de6007a22f7fb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_e84dd96eca02f3de6007a22f7fb" FOREIGN KEY (city_id) REFERENCES public.master_values(id);


--
-- Name: collaborators FK_ec2c5315fae0d0fe46d29c013e3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborators
    ADD CONSTRAINT "FK_ec2c5315fae0d0fe46d29c013e3" FOREIGN KEY (collaborator_type_id) REFERENCES public.master_values(id);


--
-- Name: property_bookmarks FK_ed6da026d9d0138ad5d847540c3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_bookmarks
    ADD CONSTRAINT "FK_ed6da026d9d0138ad5d847540c3" FOREIGN KEY (bookmarker_id) REFERENCES public.accounts(id);


--
-- Name: reset_tokens FK_f12a44bc5ad732b046f8d01726e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_tokens
    ADD CONSTRAINT "FK_f12a44bc5ad732b046f8d01726e" FOREIGN KEY (account_id) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_f2d62795b7b1aa815893f089635; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_f2d62795b7b1aa815893f089635" FOREIGN KEY (city_id) REFERENCES public.master_values(id);


--
-- Name: properties FK_f57f86891a8eb2d6076f4f43893; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_f57f86891a8eb2d6076f4f43893" FOREIGN KEY (location_type_id) REFERENCES public.master_values(id);


--
-- Name: group_values FK_f591bb3cd36c629eaea2df99a7b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_values
    ADD CONSTRAINT "FK_f591bb3cd36c629eaea2df99a7b" FOREIGN KEY (updated_by) REFERENCES public.accounts(id);


--
-- Name: appraisal_statement_notes FK_f5a65f0d30cdc96fa9405c2ecb6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_f5a65f0d30cdc96fa9405c2ecb6" FOREIGN KEY (inspection_statement_id) REFERENCES public.inspection_statement_notes(id);


--
-- Name: appraisal_statement_notes FK_f628e911c65084cbd98141c6bf5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appraisal_statement_notes
    ADD CONSTRAINT "FK_f628e911c65084cbd98141c6bf5" FOREIGN KEY (ward_id) REFERENCES public.master_values(id);


--
-- Name: inspection_statement_notes FK_f68afd0878f39bc8b14a93d8c7c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_f68afd0878f39bc8b14a93d8c7c" FOREIGN KEY (ward_id) REFERENCES public.master_values(id);


--
-- Name: account_groups FK_f8b3e92de1c96dde69d145be9e9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_groups
    ADD CONSTRAINT "FK_f8b3e92de1c96dde69d145be9e9" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: properties FK_fa4424bead12871fccdc8eb76c6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT "FK_fa4424bead12871fccdc8eb76c6" FOREIGN KEY (source_id) REFERENCES public.accounts(id);


--
-- Name: inspection_statement_notes FK_fb499f168a7779a6b7d83462e97; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspection_statement_notes
    ADD CONSTRAINT "FK_fb499f168a7779a6b7d83462e97" FOREIGN KEY (created_by) REFERENCES public.accounts(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

