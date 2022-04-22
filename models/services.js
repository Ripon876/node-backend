const mongoose = require("mongoose");



const serviceSchema = new mongoose.Schema({
	icon :  String,
	title :  String,
	description : String
})

const servicesSchema = new mongoose.Schema({
	title :  String,
	short_description :  String,
	srevices : [serviceSchema]
})

const Services = mongoose.model("Srevices",servicesSchema);

module.exports  = Services;