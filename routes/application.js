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



router.delete("/applications",(req,res)=> {
	if(req.body){
		

	

   Applications.findByIdAndDelete(req.body._id,(err,application)=> {
   	   if(err) res.status(501).json({err: "something went wrong"});
	   	   if(application && deleteFile(getFileName(req.body.aplicant.cv),'resume')){
	   	   	    res.status(200).json({status : true})
	   	   }else{
	   	     	res.status(501).json({err: "something went wrong"});
	   	   }
   })



	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})











module.exports = router;


const getFileName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
