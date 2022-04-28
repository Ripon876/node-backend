var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Site_settings = require("../models/settings");
var Slider = require("../models/slides");
var About = require("../models/about");
var Services = require("../models/services");
var Clients = require("../models/clients");
var WeOffer = require("../models/weOffer");
var Messages = require("../models/messages");
var Careers = require("../models/careers");
var Interns = require("../models/interns");
var UploadFile = require("../helpers/fileUpload");
var middlewares = require("../middlewares/middleware");


//settings api edit
router.get('/settings',middlewares.isLoggedIn,(req,res) => {
	Site_settings.find({},(err,data)=> {
		if(err){
			res.status(501).send("something went wrong")
		}
		res.render('./admin/settings',{settings : data[0]});
	})
	
})

router.post('/settings',middlewares.isLoggedIn,async (req,res) => {

	var fileName = req.body.logo || 'Logo';
	var imgPath;
	var link;
	var newSettings = {
		social_links: {}
	}

	
	if (req.files) {

		imgPath = await UploadFile(req.files.img,fileName);
	 link = imgPath;
	}



	if(req.body){
		for (key in req.body) {
			if(key === 'fb' || key === 'twitter' || key === 'instagram'){
				newSettings.social_links[key] = req.body[key];
			}else{
				newSettings[key] = req.body[key]
			}
		}
		 
	if(link){
		newSettings.logo = link;
	}

	Site_settings.find({},(err,data)=> {
		if(err) res.status(501).json({err: "something went wrong"});

			Site_settings.findOneAndUpdate(data[0],newSettings,{new : true},(err,settings)=> {
				
				if(err)  res.status(501).json({err: "something went wrong"});
				// console.log(settings);
				res.status(200).json({status :  true});

			})

	})
	}


})




// new slider route

router.get('/slider',(req,res) => {

	Slider.find({},(err,sliders) => {
       if(!err){
         res.render('./admin/slider',{slider: sliders[0]});
       }
	})

})

router.post('/slider',(req,res) => {
	if(req.body){
		Slider.find({},(err,sliders)=> {
			if(err) res.status(501).json({err: "something went wrong"});

			Slider.findOneAndUpdate(sliders[0],req.body,{new : true},(err,slider) => {
				if(err) res.status(501).json({err: "something went wrong"});
				res.status(200).json({status :  true});
			})
			
		})
	}
})

router.get("/slider/new",(req,res)=> {
	res.render('./admin/newslider')
})





router.post("/slider/slides",async (req,res)=> {
	    var serverURl = `${req.protocol}://${req.get('host')}`;
		var fileName =  'slides' + Math.floor(Math.random() * 10000);
		var link = serverURl;

		if (req.files) {
			imgPath = await UploadFile(req.files.img,fileName);
		 link += imgPath;
		}
var data = req.body;
data.img = link;
data.show_img_first === 'on' ? data.show_img_first  = true : data.show_img_first = false;

Slider.find({},(err,sliders) => {
	if(err) res.status(501).json({err: "something went wrong"});

	 Slider.findById(String(sliders[0]._id),(err,slider) => {
	 	if(err) res.status(501).json({err: "something went wrong"});

       slider.slides.push(data);
       slider.total_slides++;

       slider.save((err,sld)=> {
	       	if(err) res.status(501).json({err: "something went wrong"});
	       	res.status(200).json({status :  true});
	       	
       })

	 })

})


})












module.exports = router;


