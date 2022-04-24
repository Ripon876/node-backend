const mongoose  = require("mongoose");

var linkSchema = new mongoose.Schema({
	name :  String,
	link :  String
},{ _id : false })
var settingSchema = new mongoose.Schema({
	logo : String,
	social_links :  {
		fb : String,
		twitter : String,
		instagram : String
	},
	description :  String,
	keywords : {default : [], type: Array},
	favicon :  String,
	email :  String,
	number : String,
	address : String

})
 
const Site_settings = mongoose.model("Site_settings",settingSchema);
module.exports = Site_settings;