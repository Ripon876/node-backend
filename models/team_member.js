var mongoose = require("mongoose");



var team_membe_schema =  new mongoose.Schema({
    name : String,
	position : String,
	social_links : {
	fb: String,
	twitter : String,
	instagram : String,
	linkedIn : String,
	},
	img : String,
	isCeo : {type: Boolean, default : false},
	description : String
})



var TeamMembers = mongoose.model("TeamMembers",team_membe_schema);

module.exports = TeamMembers;