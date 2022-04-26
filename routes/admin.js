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

const path = require("path");



router.get('/settings',(req,res) => {
	res.render('./admin/settings')
})



router.post('/settings',(req,res) => {
	if(req.body){
		console.log(req.body)
	}
	if (req.files) {
		 console.log(req.files.img)
	}
})




module.exports = router;


