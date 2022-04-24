const mongoose = require("mongoose");



const serviceSchema = new mongoose.Schema({
	img :  String,
	title :  String,
	description : String,
	show_content_first : {type: Boolean, default: false}
},{ _id : false })

const servicesSchema = new mongoose.Schema({
	title :  String,
	short_description :  String,
	srevices : [serviceSchema]
})

const Services = mongoose.model("Services",servicesSchema);

module.exports  = Services;