const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
	title : String,
	description : String,
	color :  String,
	img : String

})
const sliderSchema = new mongoose.Schema({
	slides : [slideSchema],
	total_slides :  Number,
	slide_duration : Number,
	axis : String
})

const Slider = mongoose.model("Slider",slideSchema);

module.exports = Slider;