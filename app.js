//import npm packages
var express = require('express');
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var session = require('express-session')

var app = express();

//require my modules
var twotes = require("./routes/twotes");
var users = require ("./routes/users");

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
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ username: req.session.username }, function(err, user) {
      if (user) {
        req.user = user;
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

//routes!
app.get('/', users.login);

//the three pages people can go to
app.get('/twotes', twotes.list);


//hidden ones for AJAX and forms and stuff
app.post("/twotes/add", twotes.add);
app.post("/twotes/delete", twotes.remove);
app.post("/users/add", users.add);
app.post("/logout", users.logout);
// app.post("/userhighlight", users.highlight);

//connect to mongoose
mongoose.connect(mongoURI);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});