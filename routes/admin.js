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




router.get('/settings',(req,res) => {
	res.render('./admin/settings')
})



router.post('/settings',async (req,res) => {

	var fileName;

	if(req.body){
	 fileName = req.body.logo || 'Logo';
		console.log(req.body)
	}
	if (req.files) {

	 var uploadImg =  UploadFile(req.files.img,fileName);

		if(uploadImg){
			console.log('done')
		}
	}
})




module.exports = router;


