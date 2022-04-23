const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
	title : String,
	description : String,
	color :  String,
	img : String,
	show_img_first : {type: Boolean,default : false}

},{ _id : false })
const slider = new mongoose.Schema({
	slides : [slideSchema],
	total_slides :  Number,
	slide_duration : Number,
	axis : String
})


const sk = new mongoose.Schema({
	name : String
})














const Slider = mongoose.model("Slider",slider);

module.exports = Slider;