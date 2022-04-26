var mongoose = require("mongoose");

var project_Schema = new mongoose.Schema({
	title :  String,
	url : String
},{ _id : false});

var internSchema = new mongoose.Schema({
	name : String,
	position : String,
	description : String,
	duration : String,
	social_links : {
	fb: String,
	twitter : String,
	instagram : String,
	linkedIn : String,
	},
	img : String,
	projects : [project_Schema]
},{ __v : false});

var Interns = mongoose.model("Interns",internSchema);
module.exports = Interns;