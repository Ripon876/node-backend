const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Site_settings = require("../models/settings");
var About = require("../models/about");
var Services = require("../models/services");



/* Services.collection.drop();




var aboutsett = {
  title : "Services",
  short_description : 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',

 srevices : [
   {
   	icon :  'icon class',
	title :  'title 1',
	description : 'Curabitur non nulla sit amet nisl tempus convallis quis '
   },
   {
   	icon :  'icon class',
	title :  'title 1',
	description : 'Curabitur non nulla sit amet nisl tempus convallis quis '
   },
   {
   	icon :  'icon class',
	title :  'title 1',
	description : 'Curabitur non nulla sit amet nisl tempus convallis quis '
   },
   {
   	icon :  'icon class',
	title :  'title 1',
	description : 'Curabitur non nulla sit amet nisl tempus convallis quis '
   },
   {
   	icon :  'icon class',
	title :  'title 1',
	description : 'Curabitur non nulla sit amet nisl tempus convallis quis '
   },
   {
   	icon :  'icon class',
	title :  'title 1',
	description : 'Curabitur non nulla sit amet nisl tempus convallis quis '
   },
   {
   	icon :  'icon class',
	title :  'title 1',
	description : 'Curabitur non nulla sit amet nisl tempus convallis quis '
   }
 ]



  }


 Services.create(aboutsett,(err,siteSettings) => {
  if(err) console.log(err);
 


  console.log(siteSettings);
 })*/



router.get("/site_settings",(req,res) => {
	Site_settings.find({},(err,Settings) => {
		if(err) res.status(400).json({err: "something went wrong"});
               var newSettings =   Settings[0].toObject();
               delete newSettings._id;
               delete newSettings.__v;
               res.status(200).json(newSettings);

	})
	
});


router.get("/about",(req,res) => {
	About.find({},(err,data) => {
		if(err) res.status(400).json({err: "something went wrong"});
               var dataWithOutId =   data[0].toObject();
               delete dataWithOutId._id;
               delete dataWithOutId.__v;
               res.status(200).json({status : "success",data : dataWithOutId});

	})
})

router.get("/services",(req,res) => {
	Services.find({},(err,data) => {
		if(err) res.status(400).json({err: "something went wrong"});
               var dataWithOutId =   data[0].toObject();
               delete dataWithOutId._id;
               delete dataWithOutId.__v;
               res.status(200).json({status : "success",data : dataWithOutId});
	})
})






module.exports = router;


