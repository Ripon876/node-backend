var mongoose = require("mongoose");

var applicationSchema = new mongoose.Schema({
	aplicant : {
		name : String,
		email : String,
		github_link : String,
		portfolio_link : String,
		cv : String
	},
	applied_for : String
});

var Applications = mongoose.model("Applications",applicationSchema);
module.exports = Applications;