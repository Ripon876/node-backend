var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var About = require("../models/about");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");



router.get('/about',(req,res)=> {
	About.find({},(err,about)=> {
		if(err) res.status(501).json({err: "something went wrong"});
   
     res.render('./admin/about',{about : about[0]})

	})
})






router.put('/about',async (req,res) => {
	 
  if(req.body){

  	
    var serverURl = `${req.protocol}://${req.get('host')}`;
	var fileName =  'about';
	var link = serverURl;


	if (req.files) {
		var imgPath = await UploadFile(req.files.img,fileName);
		link += imgPath;
	} 
    
    if(req.files){
      	req.body.img = link;
    }

	About.find({},(err,data)=> {
		if(err) res.status(501).json({err: "something went wrong"});
	     
	     About.findOneAndUpdate(data[0],req.body,{new : true},(err,about)=> {
	     	if(err) res.status(501).json({err: "something went wrong"});
	     	res.status(200).json({status :true})
	     })


	})



  }
})


router.get('/about/benefits/new',(req,res)=> {
	res.render('./admin/newbenefit');
})

router.post('/about/benefits/new',(req,res)=> {
	if(req.body){
		console.log(req.body)
	}
})





module.exports = router;