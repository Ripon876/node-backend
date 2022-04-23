const mongoose = require("mongoose");



const oferSchema = new mongoose.Schema({
	img :  String,
	title :  String,
	description : String
},{ _id : false })

const weofferSchema = new mongoose.Schema({
	title :  String,
	short_description :  String,
	offers : [oferSchema]
})

const WeOffer = mongoose.model("WeOffer",weofferSchema);

module.exports  = WeOffer;