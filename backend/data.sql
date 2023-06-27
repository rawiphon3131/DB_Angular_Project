DROP DATABASE project;
CREATE DATABASE IF NOT EXISTS project COLLATE utf8mb4_unicode_ci DEFAULT CHARSET UTF8MB4;
USE project;

CREATE TABLE IF NOT EXISTS user_tbl(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    card_id VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    user_password VARCHAR(100) NULL COLLATE utf8mb4_unicode_ci,
    user_fname VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    user_lname VARCHAR(100) NULL COLLATE utf8mb4_unicode_ci
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS customer_name_tbl(
    cus_name_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cus_name VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    cus_numtel VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    cus_credit FLOAT (10,3)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;;

CREATE TABLE IF NOT EXISTS customer_tbl(
    cus_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cus_name_id INT NOT NULL,
    cus_adddress VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    FOREIGN KEY (cus_name_id) REFERENCES customer_name_tbl(cus_name_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS state_tbl(
    state_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    state_name VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS type_tbl(
    type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS type_prd_tbl(
    type_prd_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_prd_name VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS size_tbl(
    size_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    size_name VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS product_tbl(
    prd_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prd_name VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    size_id INT NOT NULL,
    type_prd_id INT NOT NULL,
    type_id INT NOT NULL,
    prd_value INT,
    FOREIGN KEY (size_id) REFERENCES size_tbl (size_id),
    FOREIGN KEY (type_prd_id) REFERENCES type_prd_tbl (type_prd_id),
    FOREIGN KEY (type_id) REFERENCES type_tbl (type_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS product_price_tbl(
    prdp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prd_id INT NOT NULL,
    prd_price_pickin FLOAT (10,3),
    prd_sell FLOAT (10,3),
    FOREIGN KEY(prd_id) REFERENCES product_tbl(prd_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS order_type_tbl(
    order_type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_type_name VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS order_tbl(
    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cus_id INT NOT NULL,
    user_id INT NOT NULL,
    order_date DATE,
    order_type_id INT NOT NULL,
    state_id INT NOT NULL,
    FOREIGN KEY (cus_id) REFERENCES customer_tbl (cus_id),
    FOREIGN KEY (user_id) REFERENCES user_tbl (user_id),
    FOREIGN KEY (order_type_id) REFERENCES order_type_tbl (order_type_id),
    FOREIGN KEY (state_id) REFERENCES state_tbl (state_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS order_detail_tbl(
    ordd_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    prdp_id INT NOT NULL,
    order_values INT NOT NULL,
    order_sum FLOAT (10,3),
    FOREIGN KEY (order_id) REFERENCES order_tbl (order_id),
    FOREIGN KEY (prdp_id) REFERENCES product_price_tbl (prdp_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS pickin_tbl(
    prdin_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prd_id INT NOT NULL,
    user_id INT NOT NULL,
    prdin_mk VARCHAR(150) NOT NULL COLLATE utf8mb4_unicode_ci,
    prdin_values INT NOT NULL,
    prdin_date DATE,
    FOREIGN KEY(prd_id) REFERENCES product_tbl(prd_id),
    FOREIGN KEY(user_id) REFERENCES user_tbl(user_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

INSERT INTO user_tbl(card_id,user_password,user_fname,user_lname) VALUES
('1909802556165','2544','นายวงศธร','นามผล');

INSERT INTO customer_name_tbl(cus_name,cus_numtel,cus_credit) VALUES 
('วงศธร นามผล','0935920167',500000);

INSERT INTO customer_tbl(cus_name_id,cus_adddress) VALUES (1,'353 ม.10 ต.ทุ่งตำเสา 90110');

INSERT INTO type_tbl(type_name) VALUES
('นักศึกษา'),('บุคลากร');

INSERT INTO size_tbl(size_name) VALUES
('S'),('M'),('L'),('XL'),('XXL');

INSERT INTO type_prd_tbl(type_prd_name)VALUES
('เสื้อ');

INSERT INTO product_tbl(prd_name,size_id,type_id,type_prd_id,prd_value) VALUES
('เสื้อแดง',1,1,1,'150'),('เสื้อแดง',2,1,1,'150'),('เสื้อแดง',3,1,1,'150');

INSERT INTO product_price_tbl(prd_id,prd_price_pickin,prd_sell) VALUES
(1,150,250),(2,155,260),(3,170,290);

INSERT INTO state_tbl(state_name) VALUES
('รับเข้า'),('สร้างคำสั่งซื้อ'),('รอชำระเงิน'),('ชำระเงินแล้ว');

INSERT INTO order_type_tbl(order_type_name) VALUES ('จ่ายสด'),('เครดิต');