var mongoose = require("mongoose");



var clientSchema = new mongoose.Schema({
	clients : {type : Array, default : [] }
})

var Clients = mongoose.model("Clients",clientSchema);

module.exports =  Clients;