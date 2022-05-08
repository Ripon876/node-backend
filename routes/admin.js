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
var Applications = require("../models/application");
var TeamMembers = require("../models/team_member");
var middlewares = require("../middlewares/middleware");
var clearFiles = require('../helpers/clearFiles');
var SEED  = require("./seed");






router.get('/admin',middlewares.isLoggedIn,async(req,res) => {
	var sliders = await  Slider.find({});
	var services = await  Services.find({});
	var careers = await  Careers.find({});
	var interns = await  Interns.find({});
	var clients = await  Clients.find({});
	var applications = await  Applications.find({});
	var settings = await  Site_settings.find({});
    



settings[0].logo = getName(settings[0].logo).split('.')[0]


var adminData = {
	settings : settings[0],
	data : [
    
      [ 'slides' , sliders[0].slides.length ] ,
      [ 'services' , services[0].services.length],
      [ 'careers' , careers[0].openings.length],
      [ 'interns' , interns.length],
      [ 'applications', applications.length],
      [ 'clients' , clients[0].clients.length]

	]
}


	res.render("./admin/admin",{data : adminData})
})





router.get('/admin/reset',middlewares.isLoggedIn, async (req,res)=> {
	await Site_settings.collection.drop();
	await Slider.collection.drop();
	await About.collection.drop();
	await Services.collection.drop();
	await Clients.collection.drop();
	await WeOffer.collection.drop();
	await Careers.collection.drop();
	await Messages.create({});
	await Messages.collection.drop();
	await Interns.create({});
	await Interns.collection.drop();
	await Applications.create({});
	await Applications.collection.drop();
	await TeamMembers.create({});
	await TeamMembers.collection.drop();
	// console.log('db cleared')
	await Site_settings.create(SEED.settings);
	await Slider.create(SEED.slider);
	await About.create(SEED.about);
	await Services.create(SEED.services);
	await Clients.create(SEED.clients);
	await WeOffer.create(SEED.weoffers);
	await Careers.create(SEED.careers);

	
	


	await clearFiles();
	// console.log('initial schema added');
	res.json({status : true})
})








module.exports = router;


const getName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

