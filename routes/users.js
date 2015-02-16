//require my modules
var path = require("path");
var User = require(path.join(__dirname,"../models/models")).user;
var Twote = require(path.join(__dirname,"../models/models")).twote;


var users = {};

//gets list of all twotes and sorts by timestamp
users.list = function(req, res) {
	User.find().exec(function (err, users) {
		if (err) {
			return console.log ("Something broke");
		}
		else {
			res.render("users", {
				users: users
			})
		}
	})
};

//adding an ingredient to list
users.add = function (req, res) {
	var username = req.body.username;
	
	var userObj = new User({
		username: username
	});

	//save new user to databse
	userObj.save(function (err) {
    	if (err) {
    		console.log("Err: " + err);
    	}
    	else {
    		User.find().exec(function (err, users) {
    			if (err) {
    				console.log("Err: " + err);
    			}
    			else {
		    		res.render("partials/user-list", {
		    			users: users, 
		    			layout: false
		    		});
		    	}
		    });
    	}
    });
	
};

users.login = function (req, res) {
	res.render ("login")
};


module.exports = users;
