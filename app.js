//import npm packages
var express = require('express');
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

var app = express();

//require my modules
var index = require("./routes/index");
var orders = require("./routes/orders");
var ingredients = require("./routes/ingredients");

//setup
var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";


app.engine("handlebars", exphbs({defaultLayout: "main.handlebars"}));
app.set("view engine", "handlebars");

//setting up npm packages
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes!
app.get('/', function(req, res){
  res.send("Welcome to Jessica's Burgers");
});

//the three pages people can go to
app.get('/ingredients', ingredients.list);
app.get('/order', orders.orderForm);
app.get('/kitchen', orders.show);

//hidden ones for AJAX
app.post("/ingredients/add", ingredients.add);
app.post("/order/add", orders.add);
app.post("/kitchen/delete", orders.remove);
app.post("/ingredients/edit", ingredients.edit);
app.post("/ingredients/outOfStock", ingredients.outOfStock);

//connect to mongoose
mongoose.connect(mongoURI);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});