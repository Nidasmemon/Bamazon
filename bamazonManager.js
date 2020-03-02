var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    start();
})

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "menu"
        }
    ]).then(function (answers) {

        switch (answers.menu) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        }
    })
}


function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        connection.end();
    })
}


function viewInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        console.table(results);
        connection.end();
    })
}


function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the name of the product you would like to add more of:",
            name: "addProduct"
        },
        {
            type: "input",
            message: "How many would you like to add?:",
            name: "amountAdded",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function (input) {
        connection.query("SELECT product_name, stock_quantity FROM products WHERE ?", {
            product_name: input.addProduct
        }, function (err, results) {
            if (err) throw err;
            var stock = results[0].stock_quantity;
            stock = stock + parseInt(input.amountAdded);
            console.log("Stock is: " + stock)


            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: stock
                    },
                    {
                        product_name: input.addProduct
                    }
                ],
                function (err, results) {
                    if (err) throw err;
                    console.log("Product has been updated!");
                })
                connection.end();
        })
    })
}

function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the name of the product you would like to add:",
            name: "addNewItem"
        },
        {
            type: "input",
            message: "Please enter the department name:",
            name: "department",
        },
        {
            type: "input",
            message: "Please enter the price:",
            name: "priceNew",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            type: "input",
            message: "Please enter the quantity:",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function (input) {
        var newItem = input.addNewItem;
        var newDepartment = input.department;
        var newPrice = input.priceNew;
        var newStock = input.quantity;
        connection.query("INSERT INTO products SET ?",
            {
                product_name: newItem,
                department_name: newDepartment,
                price: newPrice,
                stock_quantity: newStock
            },
            function (err, results) {
                if (err) throw err;
                console.log("New product inserted!");
            }
        )
        connection.end();
    })
}