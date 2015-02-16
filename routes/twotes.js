//require my modules
var path = require("path");
var User = require(path.join(__dirname,"../models/models")).user;
var Twote = require(path.join(__dirname,"../models/models")).twote;


var twotes = {};

//gets list of all twotes and sorts by timestamp
twotes.list = function(req, res) {
	Twote.find().sort("time").exec(function (err, twotes) {
		if (err) {
			return console.log ("Something broke");
		}
		else {
			User.find().exec(function (err, users) {
				if (err) {
					return console.log("Something broke");
				}
				else {
					res.render("twotes", {
						twotes: twotes,
						users: users
					})
				}
			});			
		}
	})
};

//adding an ingredient to list
twotes.add = function (req, res) {
	var content = req.body.twoteContent;
	console.log(content)

	var twoteObj = new Twote({
		username: "username",
    	content: content
	});

	//save new twote to databse
	twoteObj.save(function (err) {
    	if (err) {
    		console.log("Err: " + err);
    	}
    	else {
    		Twote.find().exec(function (err, twotes) {
    			if (err) {
    				console.log("Err: " + err);
    			}
    			else {
		    		res.render("partials/twote-list", {
		    			twotes: twotes, 
		    			layout: false
		    		});
		    	}
		    });
    	}
    });
	
};


twotes.remove = function (req, res) {

	//find one with the time passed from twotes.js and remove it
	var ID = req.body.ID;
	Twote.findOneAndRemove({'_id' : ID}, 
		function (err,twotes) {
			if (err) {
				return console.error(err)
			}
			else {
	    		Twote.find().exec(function (err, twotes) {
	    			if (err) {
	    				console.log("Err: " + err);
	    			}
	    			else {
			    		res.render("partials/twote-list", {
			    			twotes: twotes, 
			    			layout: false
			    		});
			    	}
			    });
    		}
		}
	)
};


module.exports = twotes;
