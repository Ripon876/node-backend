var mongoose = require("mongoose");

var openingSchema =  new mongoose.Schema({
	title : String,
	designation : String,
	description : String,
	form_link : String
},{ _id : false })

var careerSchema = new mongoose.Schema({
	title : String,
	description : String,
	openingsTitle : String,
	openings : [openingSchema]
})


var Careers = mongoose.model("Careers",careerSchema);
module.exports = Careers;