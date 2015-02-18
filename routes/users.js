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
	console.log(req.user)
	var username = (JSON.stringify (req.user.displayName)).replace(/\"/g, "");
	console.log("stringify displayName: "+username);
	// var username = req.body.username;
	// req.session.username=username;
	
	var userObj = new User({
		username: username
	});

	//save new user to databse
	userObj.save(function (err) {
    	if (err) {
    		console.log("Err: " + err);
    	}
    	else {
    		res.redirect("/")
   //  		User.find().exec(function (err, users) {
   //  			if (err) {
   //  				console.log("Err: " + err);
   //  			}
   //  			else {

			// 		// res.render("partials/user-list", {
		 //   //  			users: users, 
		 //   //  			layout: false
		 //   //  		});
   //  			}	
			// })	
	    }
    });
};

users.login = function (req, res) {
	res.render ("login")
};

users.logout = function (req, res) {
	req.logout();

	// if (req.session){
	// 	console.log (req.session.username);
	// 	req.session = null
	// }
	res.redirect('/');
}




// users.highlight=function(req, res) {
// 	var ID = req.body.ID;

// 	Twote.find({'username': ID}).exec(function (err, twotes) {
// 		if (err) {
// 			return console.log ("Something broke");
// 		}
// 		else {
// 			var twotesIDs =[];
// 			for (var i=0;i<twotes.length;i++) {
// 				twotesIDs[i] = twotes[i]._id;
// 			}
// 			res.send(twotesIDs);
// 		}
// 	})
// }


module.exports = users;


