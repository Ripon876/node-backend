var dotenv = require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var mongoose = require("mongoose");
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
// var server = http.createServer(app);
// var {
//   Server
// } = require("socket.io");
// var io = new Server(server);
var port = process.env.PORT || 5000;
var ip = require('ip');


console.log(ip.address())




var mongoDbStr;
if (port === 5000) {
  mongoDbStr = "mongodb://localhost:27017/node-backend";
  console.log(mongoDbStr)
} else {
  mongoDbStr = process.env.MONGODB_URI;
}

mongoose.connect(mongoDbStr, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}); 

app.use(cors())
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(fileUpload());

var User = require("./models/user");
var Messages = require("./models/messages");
var admin  = require("./routes/admin");
var login  = require("./routes/login");
var apis  = require("./routes/apis");
var settings  = require("./routes/settings");
var slider  = require("./routes/slider");
var about  = require("./routes/about");
var services  = require("./routes/services");
var career  = require("./routes/career");
var interns  = require("./routes/interns");
var clients  = require("./routes/clients");
var weoffer  = require("./routes/weoffer");
var messages  = require("./routes/messages");
var applications  = require("./routes/application");
var backup_restore  = require("./routes/backup_restore");
var team  = require("./routes/team");



                
// mongoose.set('useFindAndModify', false);



// mongodb+srv://ripon876:Ripon876@a2series.oa8j7.mongodb.net/bangedb?retryWrites=true&w=majority


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

app.use((req,res,next)=> {

  
  if(req.isAuthenticated){

    Messages.find({}, function(err,messages) {
        if (err) console.log(err);
        res.locals.messages = messages;
        next();
      }); 
        
  }

})



app.use(admin);          // admin route
app.use(login);         // login route
app.use("/api", apis); // api routes
app.use(slider);      // slider route
app.use(about);      // about route
app.use(settings);  // settings route
app.use(services); // services route
app.use(career);  // career route
app.use(interns);             // interns route
app.use(clients);            // clients route
app.use(weoffer);           // what we offer route
app.use(messages);         // messages ( message from contact form) route
app.use(applications);    // applications route
app.use(backup_restore); // applications route
app.use(team); // applications route


app.get('/',(req,res) => {
	// res.render("index" , {title :  "MD Ripon islam"})
  res.redirect('/login')
})



app.listen(port, () => {
	console.log("server started ar port 5000")
} )

/*setInterval(function() {
    http.get("http://bange1.herokuapp.com/");
}, 300000); // every 5 minutes (300000)



*/