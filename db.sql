CREATE TABLE IF NOT EXISTS user_tbl(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    card_id INT ,
    user_password VARCHAR(30) 
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS customer_tbl(
    cus_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cus_name VARCHAR(30) ,
    cus_addr VARCHAR(100) 
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS typeitem_tbl(
    type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(30)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS size_tbl(
    size_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    size_name VARCHAR(30)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS pickin_tbl(
    pi_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prd_id INT ,
    pi_from VARCHAR(100) ,
    pi_date DATE ,
    user_id INT ,
    pi_price VARCHAR(100) ,
    FOREIGN KEY(user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY(prd_id) REFERENCES product_tbl(prd_id)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS price_product_tbl(
    price_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pi_id INT ,
    pi_price INT ,
    FOREIGN KEY(pi_id) REFERENCES pickin_tbl(pi_id),
    FOREIGN KEY(pi_price) REFERENCES pickin_tbl(pi_price)
)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS product_tbl(
    prd_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prd_name VARCHAR(30),
    type_id INT ,
    size_id INT ,
    prd_total INT ,
    prd_price FLOAT ,
    price_id INT ,
    FOREIGN KEY(type_id) REFERENCES typeitem_tbl(type_id),
    FOREIGN KEY(size_id) REFERENCES size_tbl(size_id),
    FOREIGN KEY(price_id) REFERENCES price_product_tbl(price_id)

)ENGINE = INNODB DEFAULT CHARSET UTF8MB4;

INSERT INTO user_tbl(card_id,user_password) VALUES
('1909802556165','0935920167');

INSERT INTO customer_tbl(cus_name,cus_addr) VALUES
('วงศธร นามผล','353 m.10');

INSERT INTO typeitem_tbl(type_name) VALUES
('เสื้อ');

INSERT INTO size_tbl(size_name) VALUES
('S','M','L');