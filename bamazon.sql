DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NULL default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sporting Goods", 15.49, 20), 
("Curtains", "Home Decor", 12.99, 30),
("Jacket", "Clothing", 59.99, 15),
("Thermometer", "Personal Care", 6.97, 3),
("Phone Charger", "Electronics", 12.99, 50),
("Crayons", "School Supplies", .59, 100),
("Bicycle", "Sporting Goods", 149.99, 5),
("Rug", "Home Decor", 299.99, 4),
("Scissors", "School Supplies", 1.49, 35),
("T-Shirt", "Clothing", 9.99, 50)
