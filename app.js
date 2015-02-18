//import npm packages
var express = require('express');
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

//require my modules
var config = require('./oauth.js')

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
app.use(passport.initialize());
app.use(passport.session());

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

// serialize and deserialize
passport.serializeUser(function(user, done) {
done(null, user);
});
passport.deserializeUser(function(obj, done) {
done(null, obj);
});

// config
passport.use(new FacebookStrategy({
 clientID: config.facebook.clientID,
 clientSecret: config.facebook.clientSecret,
 callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
 process.nextTick(function () {
   return done(null, profile);
 });
}
));

//routes!
app.get('/login',users.login);

app.get('/', ensureAuthenticated,twotes.list);


//hidden ones for AJAX and forms and stuff
app.post("/twotes/add", twotes.add);
app.post("/twotes/delete", twotes.remove);
app.get("/users/add", passport.authenticate('facebook'));
app.post("/logout", users.logout);


//OAUTH Stuff
app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login' }),
users.add);

app.get('/logout', users.logout);

//connect to mongoose
mongoose.connect(mongoURI);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});

function ensureAuthenticated(req, res, next) {
if (req.isAuthenticated()) { return next(); }
res.redirect('/login')
}