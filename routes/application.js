var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Applications = require("../models/application");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");


router.get('/applications',middlewares.isLoggedIn,(req,res)=> {
	Applications.find({},(err,applications)=> {
		if(err) res.status(501).json({err: "something went wrong"});
		res.render('./admin/applications',{applications :  applications})
	})
})

module.exports = router;

