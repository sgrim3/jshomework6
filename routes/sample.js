//require my modules
var path = require("path");
var Order = require(path.join(__dirname,"../models/models")).order;
var Ingredient = require(path.join(__dirname,"../models/models")).ingredient;


var ingredients = {};

//gets list of available ingredients
ingredients.list = function(req, res) {
	Ingredient.find().exec(function (err, ingredients) {
		if (err) {
			return console.log ("Something broke");
		}
		else {
			res.render("ingredients", {
				ingredients: ingredients
			})
		}
	})
};

//adding an ingredient to list
ingredients.add = function(req, res) {

	//retrieving data from the form and making a new Ingredient
	var title = req.body.ingredientName;
	var price = req.body.ingredientPrice;

	// if (Ingredient.indexOf({ title: title })!== -1) {
	// 	console.log("No ingredient that exists yet");
	// }
	// else console.log("that ingredient already exists");

	//TODO- test to see if ingredient already exists
	ingredientObj = new Ingredient ({
		title: title,
		price: price,
		outOfStock: false
	});

	//saving ingredient to database
	ingredientObj.save(function (err) {
    	if (err) {
    		console.log("Err: " + err);
    	}
    	else {
    		Ingredient.find().exec(function (err, ingredients) {
    			if (err) {
    				console.log("Err: " + err);
    			}
    			else {
		    		res.render("partials/list", {
		    			ingredients: ingredients, 
		    			layout: false
		    		});
		    	}
		    });
    	}
	});
};

ingredients.edit = function (req, res) {
	name = req.body.title;
	price = req.body.price;
	origName = req.body.origName;

	Ingredient.findOne({ title: origName }, function (err, doc){
  		doc.title = name;
  		doc.price = price;
  		doc.outOfStock = false;
  		doc.save();
	});
}

ingredients.outOfStock = function (req, res) {
	ID = req.body.ID;
	Ingredient.findOne({ title: ID }, function (err, doc){
  		doc.outOfStock = true;
  		doc.save();
	});
}


module.exports = ingredients;
