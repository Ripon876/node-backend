const mongoose = require("mongoose");


const aboutSchema = new mongoose.Schema({
	title : String,
	short_description : String,
	long_descrition : String,
	img : String
})

const About = mongoose.model("About", aboutSchema);

module.exports = About;