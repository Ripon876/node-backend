var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Careers = require("../models/careers");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");






router.get('/career',middlewares.isLoggedIn,(req,res)=> {
	Careers.find({},(err,career)=> {
	    if(err) res.status(501).json({err: "something went wrong"});
	    res.render("./admin/career",{career : career[0]})
	})
  
})


router.put('/career',middlewares.isLoggedIn,(req,res)=> {
 
 if(req.body){

 		Careers.find({},(err,data)=> {
		if(err) res.status(501).json({err: "something went wrong"});
	     
	     Careers.findOneAndUpdate(data[0],req.body,{new : true},(err,career)=> {
	     	if(err) res.status(501).json({err: "something went wrong"});
	     	res.status(200).json({status :true})
	     })


	})

 }else{
		res.status(405).json({err: "Method Not Allowed"});
	}
  
})



router.get('/career/openings/new',middlewares.isLoggedIn,(req,res)=> {
	res.render('./admin/newopening');
})


router.post('/career/openings/new',middlewares.isLoggedIn,(req,res)=> {
	if(req.body){

		var link =  req.body.title.replace(/ /g,'_');
		req.body.link = link;

		Careers.find({},(err,career)=> {
				if(err) res.status(501).json({err: "something went wrong"});

			Careers.findById(career[0]._id,(err,career)=>{
			  	if(err) res.status(501).json({err: "something went wrong"});
		 			career.openings.push(req.body);
		 			career.save((err) => {
		 			 	if(err) res.status(501).json({err: "something went wrong"});
		       
							res.status(200).json({status: true})
		 			 })

			})
			    
	    })

	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})




router.delete('/career/openings',middlewares.isLoggedIn,(req,res)=> {
	if(req.body){

		Careers.find({},(err,career)=> {

		  if(err) res.status(501).json({err: "something went wrong"});

		   Careers.findById(career[0]._id,(err,career) => {
			    if(err) res.status(501).json({err: "something went wrong"});
			       
			    var openingIndex = career.openings.findIndex(o => o.title === req.body.title && o.link === req.body.link);
				 
	  			career.openings.splice(openingIndex,1)

				    career.save((err,cr)=> {
				   		if(err) res.status(501).json({err: "something went wrong"});
					       res.status(200).json({status : true,msg : 'Successfully deleted'})
				   })
		    
		   })
	   })


	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})








module.exports = router;