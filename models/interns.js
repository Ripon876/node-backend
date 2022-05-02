var mongoose = require("mongoose");



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
	projects : {type : Array, default: []}
},{ __v : false});

var Interns = mongoose.model("Interns",internSchema);

module.exports = Interns;