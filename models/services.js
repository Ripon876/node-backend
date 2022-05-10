const mongoose = require("mongoose");



const serviceSchema = new mongoose.Schema({
	img :  String,
	title :  String,
	description : String,
	full_description : String,
	link : String,
	keywords : String,
	moreDetails : {type: Boolean, default: false},
	show_content_first : {type: Boolean, default: false}
},{ _id : false })

const servicesSchema = new mongoose.Schema({
	title :  String,
	short_description :  String,
	services : [serviceSchema]
})

const Services = mongoose.model("Services",servicesSchema);

module.exports  = Services;