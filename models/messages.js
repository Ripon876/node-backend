var mongoose = require("mongoose");


var messageScheam = new mongoose.Schema({
	first_name  : String,
	last_name  : String,
	email : String,
	message : String,
	read : {type : Boolean, default : false}
})

var Messages = mongoose.model("Messages",messageScheam);
module.exports = Messages;