var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    start();
})

function start() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // console.log(results);
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + "\t" + results[i].product_name + " --- $" + results[i].price);
        }
        menu();
        // connection.end();
    });
}

function menu() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the product you would like to buy:",
            name: "id",
            validate: function(value) {
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
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
            
        }
    ])
    .then(function(input) {

        var productID = input.id;
        var quantity = parseInt(input.amount);

        connection.query("SELECT item_id, stock_quantity, price FROM products WHERE ?", 
        {
            Item_id: productID
        },
        function(err, results) {
            if (err) throw err;
            var cost = results[0].price;
            // console.log(results);
            // console.log("Quantity is: " + quantity);
            // console.log("Cost is: " + cost);
            checkStock(quantity, results[0].stock_quantity, cost);
        })
        
    })
}

function checkStock(quantity, stock, cost) {
    if (quantity > stock) {
        console.log("Insufficient quantity!");
        connection.end();
    }
    else {
        var total = quantity * cost;
        console.log("Your order has been processed. Your total is: ", total);
    }
}