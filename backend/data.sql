DROP DATABASE project;
CREATE DATABASE IF NOT EXISTS project COLLATE utf8mb4_unicode_ci DEFAULT CHARSET UTF8MB4;
USE project;

CREATE TABLE IF NOT EXISTS user_tbl(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    card_id VARCHAR(13) NOT NULL COLLATE utf8mb4_unicode_ci,
    user_password VARCHAR(16) NOT NULL COLLATE utf8mb4_unicode_ci,
    user_fname VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    user_lname VARCHAR(100) NULL COLLATE utf8mb4_unicode_ci
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS customer_name_tbl(
    cus_name_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cus_name VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    cus_numtel VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    cus_credit FLOAT (10,3)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS customer_tbl(
    cus_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cus_name_id INT NOT NULL,
    cus_adddress VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    FOREIGN KEY (cus_name_id) REFERENCES customer_name_tbl(cus_name_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS company_tbl(
    cpn_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cpn_name VARCHAR(150) NOT NULL COLLATE utf8mb4_unicode_ci,
    cpn_numtel VARCHAR(150) NOT NULL COLLATE utf8mb4_unicode_ci,
    cpn_address VARCHAR(150) NOT NULL COLLATE utf8mb4_unicode_ci
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
    prd_name_id VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    prd_name VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    size_id INT NOT NULL,
    type_prd_id INT NOT NULL,
    type_id INT NOT NULL,
    prd_value INT,
    state_id INT,
    FOREIGN KEY (size_id) REFERENCES size_tbl (size_id),
    FOREIGN KEY (type_prd_id) REFERENCES type_prd_tbl (type_prd_id),
    FOREIGN KEY (type_id) REFERENCES type_tbl (type_id),
    FOREIGN KEY (state_id) REFERENCES state_tbl(state_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS product_price_tbl(
    prdp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prd_id INT NOT NULL,
    prd_price_pickin FLOAT (10,3),
    prd_sell FLOAT (10,3),
    prdp_date DATE,
    FOREIGN KEY(prd_id) REFERENCES product_tbl(prd_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS order_pre_tbl(
    ordp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ordp_bill_no VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    user_id INT NOT NULL,
    cpn_id INT NOT NULL,
    ordp_date DATE,
    state_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY (state_id) REFERENCES state_tbl(state_id),
    FOREIGN KEY (cpn_id) REFERENCES company_tbl(cpn_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS order_pre_detail(
    ordpd_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ordp_id INT NOT NULL,
    ordpd_valuse VARCHAR(100) NOT NULL COLLATE utf8mb4_unicode_ci,
    ordpd_price FLOAT (10,3),
    prdp_id INT NOT NULL,
    FOREIGN KEY (prdp_id) REFERENCES product_price_tbl(prdp_id)
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
    ordd_date DATE,
    FOREIGN KEY (order_id) REFERENCES order_tbl (order_id),
    FOREIGN KEY (prdp_id) REFERENCES product_price_tbl (prdp_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS pickin_tbl(
    prdin_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prdin_mk VARCHAR(150) NOT NULL COLLATE utf8mb4_unicode_ci,
    prdin_date DATE,
    ordp_id INT,
    FOREIGN KEY(user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY (ordp_id) REFERENCES order_pre_tbl(ordp_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS pickin_detail_tbl(
    prdind_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prdin_id INT NOT NULL,
    prdp_id INT NOT NULL,
    prdin_values INT NOT NULL,
    FOREIGN KEY(prdp_id) REFERENCES product_price_tbl(prdp_id),
    FOREIGN KEY (prdin_id) REFERENCES pickin_tbl(prdin_id)

)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS ods_tbl(
    ods_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cus_id INT NOT NULL,
    ods_values FLOAT (10,3),
    state_id INT,
    ods_date DATE,
    FOREIGN KEY(cus_id) REFERENCES customer_tbl(cus_id),
    FOREIGN KEY(state_id) REFERENCES state_tbl(state_id)
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


INSERT INTO state_tbl(state_name) VALUES
('รับเข้า'),('สร้างคำสั่งซื้อ'),('ตรวจรับยังไม่สมบูรณ์'),('ตรวจรับแล้ว'),('พร้อมใช้งาน'),('ไม่ำร้อมใช้งาน'),('ชำระแล้ว'),('ยังไม่ชำระ');

INSERT INTO order_type_tbl(order_type_name) VALUES ('จ่ายสด'),('เครดิต');