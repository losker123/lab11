PGDMP         !                 |         
   Isaksystem    15.3    15.3 "               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    19674 
   Isaksystem    DATABASE     �   CREATE DATABASE "Isaksystem" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "Isaksystem";
                postgres    false            �            1259    19715    Installations    TABLE     �  CREATE TABLE public."Installations" (
    id integer NOT NULL,
    operation_type character varying(255) NOT NULL,
    system_type character varying(255) NOT NULL,
    date_time timestamp with time zone NOT NULL,
    address character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "PersonId" integer
);
 #   DROP TABLE public."Installations";
       public         heap    postgres    false            �            1259    19714    Installations_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Installations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Installations_id_seq";
       public          postgres    false    219                       0    0    Installations_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Installations_id_seq" OWNED BY public."Installations".id;
          public          postgres    false    218            �            1259    19706    People    TABLE     ]  CREATE TABLE public."People" (
    id integer NOT NULL,
    years_of_experience integer NOT NULL,
    full_name character varying(255) NOT NULL,
    contact_information character varying(255) NOT NULL,
    photo character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."People";
       public         heap    postgres    false            �            1259    19705    People_id_seq    SEQUENCE     �   CREATE SEQUENCE public."People_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."People_id_seq";
       public          postgres    false    217                        0    0    People_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."People_id_seq" OWNED BY public."People".id;
          public          postgres    false    216            �            1259    19676    Reviews    TABLE     �   CREATE TABLE public."Reviews" (
    id integer NOT NULL,
    text character varying(255) NOT NULL,
    rating integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Reviews";
       public         heap    postgres    false            �            1259    19675    Reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Reviews_id_seq";
       public          postgres    false    215            !           0    0    Reviews_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Reviews_id_seq" OWNED BY public."Reviews".id;
          public          postgres    false    214            �            1259    19729    Users    TABLE     U  CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    bio text,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    location character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    19728    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    221            "           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    220            v           2604    19718    Installations id    DEFAULT     x   ALTER TABLE ONLY public."Installations" ALTER COLUMN id SET DEFAULT nextval('public."Installations_id_seq"'::regclass);
 A   ALTER TABLE public."Installations" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            u           2604    19709 	   People id    DEFAULT     j   ALTER TABLE ONLY public."People" ALTER COLUMN id SET DEFAULT nextval('public."People_id_seq"'::regclass);
 :   ALTER TABLE public."People" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            t           2604    19679 
   Reviews id    DEFAULT     l   ALTER TABLE ONLY public."Reviews" ALTER COLUMN id SET DEFAULT nextval('public."Reviews_id_seq"'::regclass);
 ;   ALTER TABLE public."Reviews" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            w           2604    19732    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221                      0    19715    Installations 
   TABLE DATA           �   COPY public."Installations" (id, operation_type, system_type, date_time, address, "createdAt", "updatedAt", "PersonId") FROM stdin;
    public          postgres    false    219   �'                 0    19706    People 
   TABLE DATA           |   COPY public."People" (id, years_of_experience, full_name, contact_information, photo, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   \)                 0    19676    Reviews 
   TABLE DATA           O   COPY public."Reviews" (id, text, rating, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   f+                 0    19729    Users 
   TABLE DATA           e   COPY public."Users" (id, name, bio, email, password, location, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   "-       #           0    0    Installations_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Installations_id_seq"', 34, true);
          public          postgres    false    218            $           0    0    People_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."People_id_seq"', 27, true);
          public          postgres    false    216            %           0    0    Reviews_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Reviews_id_seq"', 18, true);
          public          postgres    false    214            &           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);
          public          postgres    false    220            }           2606    19722     Installations Installations_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Installations"
    ADD CONSTRAINT "Installations_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Installations" DROP CONSTRAINT "Installations_pkey";
       public            postgres    false    219            {           2606    19713    People People_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."People"
    ADD CONSTRAINT "People_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."People" DROP CONSTRAINT "People_pkey";
       public            postgres    false    217            y           2606    19681    Reviews Reviews_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "Reviews_pkey";
       public            postgres    false    215                       2606    19738    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            postgres    false    221            �           2606    19736    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    221            �           2606    19723 )   Installations Installations_PersonId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Installations"
    ADD CONSTRAINT "Installations_PersonId_fkey" FOREIGN KEY ("PersonId") REFERENCES public."People"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 W   ALTER TABLE ONLY public."Installations" DROP CONSTRAINT "Installations_PersonId_fkey";
       public          postgres    false    217    219    3195               �  x���Qk�0�g�S��,s�-��[iG)�#�cc�ս&"�4$Őo?9si�l��ۓ��?��%����Y�賎�$"�'sO�ޏd�'�'�i�I�%��[�7Xfa�����EO��,`E�|�����Xq\��Qa[�E-�e=���(��n����$�:���:����M|�J��o�s��A�m�f��J��ӑ^ﵿ7�^�#���`B;frT��d�y���Y�!�"�r�B[�xƾ�W��d�7ֺ1IG�oI�����~�#Ϸ�K.��y��:���\��ލ.�;���Ɗ��X��9BY#o�.����ǈ�)�U+��̧X�Sm4���wp��\��h7��i׀M+s8�0l��QY�����F�,�Jg1S�SıP�X����_~�ϵw�e+ScSTes.=)-�ׂ1�Au7�         �  x�ՓO��0��Χ�2��M.�ڪ�R��*��7�F��m>}�f��i/9U1��{zX"�w��).�K-^w�ݓe��F+�� ���y�؜ ��*��XN'�A������̬��y1�q����N�v��jl]q��)��A$��rA�(�����N)��z�t��&_~-ť�A�Fh�����c<��,��3�gb�&ƃgi����fƻ%Q����\p*.�D%3⛻8C'�����8D�o���sn]�;�a�p��Mc��T�rw7�"�?N�&��C\�x�t��3�W�L/����^��i��f�ę�qM-��j)�4u%���妪�6�K>O���ǥ�t��۝��&�GL�4���G�Ɛ0����,���X�)���,rJ��	a��JF�Ò���n�����f�|���:��G���*hp��l�Ss�X�/S�k&*'��Θ��Y��ґ�1M�.�����}�E��2w��Yn6��f�         �  x��SKR�@]ON1�թd �,n= +�E���� ��!��o��	�J���|���M���=��'N����hCO4�<�>e�6`u TAk��4�M��̀N1�jg�G�OTKY�F�~p:�(L"�tmw��~���g="�����C��8���!���x
8��J�Q�QBEψW#͝6��kGA�)�)�-?�%�9� [�\�p�8L&ۅ5rIyl�(F�XS�%sL
�3o�|���[��;��g>����r��l��V��HEZ������+0��+�׎jX����+���`�����[�Z�rKsd?��a딪x��̝�%�g��k�����>�0M[�X�.h&1_�!���KzmP�[Z�Km�a�&��XuyՓ�w��'�j��v�Ǧ��+qb��F&�[��x������         �   x�}�=
�0�g��C���4�ԃd��B38���U(dh�C�'�>��I�u8Fj�!��UO��`�{�22�QP �N��(�G����B��{�eoD���uN�1{����|1�I���so�t;�     