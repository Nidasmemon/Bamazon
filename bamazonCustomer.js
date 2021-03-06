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
    connection.query("SELECT item_id, product_name, price FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        menu();
    });
}

function menu() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the product you would like to buy:",
            name: "id",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },

        {
            type: "input",
            message: "How many would you like to buy?",
            name: "amount",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (input) {

            var productID = input.id;
            var quantity = parseInt(input.amount);

            connection.query("SELECT item_id, stock_quantity, price FROM products WHERE ?",
                {
                    Item_id: productID
                },
                function (err, results) {
                    if (err) throw err;
                    var cost = results[0].price;
                    checkStock(quantity, results[0].stock_quantity, cost, productID);
                })

        })
}

function checkStock(quantity, stock, cost, productID) {
    if (quantity > stock) {
        console.log("Insufficient quantity!");
        connection.end();
    }
    else {
        var total = quantity * cost;
        var newStock = stock - quantity;
        connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: newStock
                },
                {
                    item_id: productID
                }
            ],
            function (err, response) {
                if (err) throw err;
            })
        console.log("Your order has been processed. Your total is: " + total);
        connection.end();
    }
}
