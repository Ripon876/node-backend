const mongoose = require("mongoose");



const benefitSchema = new mongoose.Schema({
	img :  String,
	title :  String,
	description : String
},{ _id : false })



const aboutSchema = new mongoose.Schema({
	title : String,
	short_description : String,
	long_descrition : String,
	img : String,
	keywords : String,
	benefits :  [benefitSchema]
})

const About = mongoose.model("About", aboutSchema);

module.exports = About;