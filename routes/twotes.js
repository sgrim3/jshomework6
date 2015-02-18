//require my modules
var path = require("path");
var User = require(path.join(__dirname,"../models/models")).user;
var Twote = require(path.join(__dirname,"../models/models")).twote;


var twotes = {};

//gets list of all twotes and sorts by timestamp
twotes.list = function(req, res) {
	// var currentUser = req.session.username;
	var currentUser = (JSON.stringify (req.user.displayName)).replace(/\"/g, "");
	console.log(currentUser)

	Twote.find().sort({"time": -1}).populate('username').exec(function (err, twotes) {
		if (err) {
			return console.log ("Something broke");
		}
		else {
			for (var i=0; i<twotes.length; i++) {

				if (twotes[i].username.username ===currentUser) {
					twotes[i].notDeletable = false;
				}
				else {
					twotes[i].notDeletable = true;
				}
			}
			User.find().exec(function (err, users) {
				if (err) {
					return console.log("Something broke");
				}
				else {
					res.render("twotes", {
						currentUser: currentUser,
						twotes: twotes,
						users: users
					})
				}
			});			
		}
	})
};

//adding a twote to list
twotes.add = function (req, res) {
	// var currentUser = req.session.username;
	var currentUser = (JSON.stringify (req.user.displayName)).replace(/\"/g, "");
	var content = req.body.twoteContent;
	var user = (JSON.stringify (req.user.displayName)).replace(/\"/g, "");
	if (!user) {
		res.end();
	}

	else{
		User.findOne({"username": user}).exec(function (err, users) {
			users.save (function (err) {
				if (err) {
					console.log("err: " +err);
				}
				else {
					var twoteObj = new Twote({
						username: users._id,
		    			content: content,
		    			notDeletable: true,
					});

					//save new twote to databse
					twoteObj.save(function (err) {
				    	if (err) {
				    		console.log("Err: " + err);
				    	}
				    	else {
				    		Twote.find().sort({"time":-1}).populate('username').exec(function (err, twotes) {
				    			if (err) {
				    				console.log("Err: " + err);
				    			}
				    			else {
				    				for (var i=0; i<twotes.length; i++) {

										if (twotes[i].username.username ===currentUser) {
											twotes[i].notDeletable = false;
										}
										else {
											twotes[i].notDeletable = true;
											console.log(twotes[i].username.username);
										}
									}
										Twote
										.findOne({ content: content })
										.populate('username') // <--
										.exec(function (err, twote) {
									 		 if (err) {
									 		 	console.log ("err: " + err);
									 		 }
										});
						    		res.render("partials/twote-list", {
						    			twotes: twotes, 
						    			layout: false
						    		});
						    	}
						    });
				    	}
				    });
				}
			})
		})
	}	
};


twotes.remove = function (req, res) {
	var currentUser = (JSON.stringify (req.user.displayName)).replace(/\"/g, "");

	//find one with the time passed from twotes.js and remove it
	var ID = req.body.ID;
	Twote.findOneAndRemove({'_id' : ID}).populate('username').exec( 
		function (err,twotes) {
			if (err) {
				return console.error(err)
			}
			else {
	    		Twote.find().sort({"time":-1}).populate('username').exec(function (err, twotes) {
	    			if (err) {
	    				console.log("Err: " + err);
	    			}
	    			else {
	    				for (var i=0; i<twotes.length; i++) {
							if (twotes[i].username.username ===currentUser) {
								twotes[i].notDeletable = false;
							}
							else {
								twotes[i].notDeletable = true;
								console.log(twotes[i].username);
							}
						}
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
