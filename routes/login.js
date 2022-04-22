var express = require("express");
var router  = express.Router();
var passport  = require("passport");
var mongoose = require("mongoose");
var User     = require("../models/user");
var localStrategy  = require("passport-local");
var middlewares    = require("../middlewares/middleware");


  User.collection.drop();

  var newUser = new User({username: process.env.ADMIN_USERNAME,name: process.env.ADMIN_NAME});
 User.register(newUser,process.env.ADMIN_PWD,function(err,user){
 	  if(err){
 	  	console.log(err)
 	  	
 	  }else{
 	  	console.log("user created",user)
 	  }
 })



router.get("/login",middlewares.isLoggedOut,(req,res) => {
	res.render("login");
})




router.post("/login",passport.authenticate("local",{successRedirect: "/admin",failureRedirect: "/login"}),function(req,res){
});


router.get("/logout",function(req,res){

	req.logout();
	res.redirect("/login");
});


module.exports = router;