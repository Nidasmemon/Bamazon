DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    Item_id INT NOT NULL AUTO_INCREMENT,
    Product_name VARCHAR (100) NOT NULL,
    Department_name VARCHAR(100) NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock_quantity INT NULL default 0,
    PRIMARY KEY (Item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sporting Goods", 15.49, 20), 
("Curtains", "Home Decor", 12.99, 30),
("Jacket", "Clothing", 59.99, 15),
("Thermometer", "Personal Care", 6.97, 40),
("Phone Charger", "Electronics", 12.99, 50),
("Crayons", "School Supplies", .59, 100),
("Bicycle", "Sporting Goods", 149.99, 5),
("Rug", "Home Decor", 299.99, 5),
("Scissors", "School Supplies", 1.49, 35),
("T-Shirt", "Clothing", 9.99, 50)
