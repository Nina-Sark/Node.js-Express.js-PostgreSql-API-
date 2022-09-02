CREATE DATABASE "online-store"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE users
(
    user_id SERIAL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    
    CONSTRAINT PK_users_user_id PRIMARY KEY (user_id),
    CONSTRAINT CHK_users_role CHECK (role = 'user' OR role = 'admin')
);

CREATE TABLE baskets
(
    basket_id SERIAL,
    user_id SERIAL,
    
    CONSTRAINT PK_baskets_basket_id PRIMARY KEY (basket_id),
    CONSTRAINT FK_baskets_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE types
(
    type_id SERIAL,
    name VARCHAR(200) NOT NULL,
    
    CONSTRAINT PK_types_type_id PRIMARY KEY (type_id)
);

CREATE TABLE brands
(
    brand_id SERIAL,
    name VARCHAR(200) NOT NULL,
    
    CONSTRAINT PK_brands_brand_id PRIMARY KEY (brand_id)
);

CREATE TABLE devices
(
    device_id SERIAL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL NOT NULL,
    rating DECIMAL DEFAULT 0,
    img TEXT NOT NULL,
    type_id SERIAL,
    brand_id SERIAL,
    
    CONSTRAINT PK_devices_device_id PRIMARY KEY (device_id),
    CONSTRAINT FK_devices_type_id FOREIGN KEY (type_id) REFERENCES types (type_id),
    CONSTRAINT FK_devices_brand_id FOREIGN KEY (brand_id) REFERENCES brands (brand_id)
);

CREATE TABLE devices_info
(
    device_info_id SERIAL,
    device_id SERIAL,
    title VARCHAR (100) NOT NULL,
    description VARCHAR(150) NOT NULL,
    
    CONSTRAINT PK_devices_info_device_info_id PRIMARY KEY (device_info_id),
    CONSTRAINT FK_devices_info_device_id FOREIGN KEY (device_id) REFERENCES devices (device_id)
);

CREATE TABLE basket_devices
(
    basket_devices_id SERIAL,
    basket_devices_device_id SERIAL,
    basket_devices_basket_id SERIAL,
    
    CONSTRAINT PK_basket_devices_id PRIMARY KEY (basket_devices_id),
    CONSTRAINT FK_basket_devices_device_id FOREIGN KEY (basket_devices_device_id) REFERENCES devices (device_id),
    CONSTRAINT FK_basket_devices_basket_id FOREIGN KEY (basket_devices_basket_id) REFERENCES baskets (basket_id)
);

CREATE TABLE ratings
(
    rating_id SERIAL,
    user_id SERIAL,
    device_id SERIAL,
    rate DECIMAL DEFAULT 0,
    
    CONSTRAINT PK_ratings_rating_id PRIMARY KEY (rating_id),
    CONSTRAINT FK_ratings_user_id FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT FK_ratings_device_id FOREIGN KEY (device_id) REFERENCES devices (device_id)
);

ALTER TABLE types
ADD CONSTRAINT UNIK_type_name UNIQUE (name);