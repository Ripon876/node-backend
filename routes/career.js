var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Careers = require("../models/careers");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");






router.get('/career',(req,res)=> {
	Careers.find({},(err,career)=> {
	    if(err) res.status(501).json({err: "something went wrong"});
	    res.render("./admin/career",{career : career[0]})
	})
  
})


router.put('/career',(req,res)=> {
 
 if(req.body){

 		Careers.find({},(err,data)=> {
		if(err) res.status(501).json({err: "something went wrong"});
	     
	     Careers.findOneAndUpdate(data[0],req.body,{new : true},(err,career)=> {
	     	if(err) res.status(501).json({err: "something went wrong"});
	     	res.status(200).json({status :true})
	     })


	})

 }
  
})




module.exports = router;