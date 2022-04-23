var dotenv = require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var mongoose = require("mongoose");
var User = require("./models/user");
// var Exam = require("./models/exam");
// var Exam = require("./models/exam");
// var Answer = require("./models/answer");
// var Notice = require("./models/notice");

var middlewares = require("./middlewares/middleware");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var nodemailer = require("nodemailer");
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var fileUpload = require('express-fileupload');
var flash = require('connect-flash');
var cron = require("node-cron");
var socket = require("socket.io");
var fs = require('fs');
var path = require('path');
var app = express();
var http = require('http');
var cors = require('cors');
var https = require('https');
var server = http.createServer(app);
var {
  Server
} = require("socket.io");
var io = new Server(server);
var port = process.env.PORT || 5000;
var login  = require("./routes/login");
var apis  = require("./routes/apis");

var mongoDbStr;

app.use(cors())

app.set("view engine", "ejs");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


/*
if (port === 3000) {
  mongoDbStr = "mongodb://localhost:27017/node-backend";
  console.log(mongoDbStr)
} else {
  mongoDbStr = process.env.MONGODB_CON_STR;
}
*/
mongoose.connect('mongodb://localhost:27017/node-backend', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
// mongoose.set('useFindAndModify', false);






  // ======================
 // passport configuration
// ========================

app.use(require('express-session')({
  secret: "My name is MD Ripon Islam",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});





app.use(login);
app.use("/api", apis);


app.get('/',(req,res) => {
	res.render("index" , {title :  "MD Ripon islam"})
})

app.get('/admin',middlewares.isLoggedIn,(req,res) => {
	res.render("admin/admin-das" , {title :  "MD Ripon islam"})
})

/*app.get('/login',(req,res) => {
	res.render("login" , {title :  "MD Ripon islam"})
})
*/

app.listen(port, () => {
	console.log("server started ar port 5000")
} )





