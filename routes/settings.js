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
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");






  //===================// 
 // settings api edit //
//___________________//


router.get('/settings',middlewares.isLoggedIn,(req,res) => {
	Site_settings.find({},(err,data)=> {
		if(err){
			res.status(501).send("something went wrong")
		}
		res.render('./admin/settings',{settings : data[0]});
	})
	
})

router.post('/settings',middlewares.isLoggedIn,async (req,res) => {

	if(req.body){ 

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
	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}

})






















module.exports = router;


const getImgName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
