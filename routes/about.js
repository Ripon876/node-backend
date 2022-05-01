var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var About = require("../models/about");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");



router.get('/about',middlewares.isLoggedIn,(req,res)=> {
	About.find({},(err,about)=> {
		if(err) res.status(501).json({err: "something went wrong"});
   
     res.render('./admin/about',{about : about[0]})

	})
})






router.put('/about',middlewares.isLoggedIn,async (req,res) => {
	 
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


router.get('/about/benefits/new',middlewares.isLoggedIn,(req,res)=> {
	res.render('./admin/newbenefit');
})

router.post('/about/benefits/new',middlewares.isLoggedIn,async (req,res)=> {


	if(req.body){



	var serverURl = `${req.protocol}://${req.get('host')}`;
   var fileName =  'benefit' + Math.floor(Math.random() * 10000);
	var link = serverURl;

	if (req.files) {
		imgPath = await UploadFile(req.files.img,fileName,'benefits');
		link += imgPath;
	}



 req.body.img =  link;




 About.find({},(err,about)=> {
		if(err) res.status(501).json({err: "something went wrong"});

	  About.findById(about[0]._id,(err,about)=>{
	  	if(err) res.status(501).json({err: "something went wrong"});
 			 about.benefits.push(req.body);
 			 about.save((err)=>{
 			 	if(err) res.status(501).json({err: "something went wrong"});
       
					res.status(200).json({status: true})

 			 })

	  })
	    
	})

	}
})









router.put("/about/benefits",middlewares.isLoggedIn,async (req,res)=> {

	if(req.body){ 

			  var serverURl = `${req.protocol}://${req.get('host')}`;
				var fileName =  'benefit' + Math.floor(Math.random() * 10000);
				var link = serverURl;

				if (req.files) {
				  	imgPath = await UploadFile(req.files.img,fileName,'benefits');
				  link += imgPath;
				}

		    var {oldData,...newData} =  req.body;


		   
		    if(req.files && deleteFile(getImgName(JSON.parse(oldData).img),'benefits')){

		    	newData.img = link;
		    }else{
		    	newData.img  =  JSON.parse(oldData).img;
		    }



 
		    About.find({},(err,about)=> {

			  if(err) res.status(501).json({err: "something went wrong"});
			   About.findById(about[0]._id,(err,about) => {

				     if(err) res.status(501).json({err: "something went wrong"});
				       
				     var benefitIndex = about.benefits.findIndex(o => o.title === JSON.parse(oldData).title && o.img === JSON.parse(oldData).img);
					 
					   about.benefits[benefitIndex] = newData;
					   console.log(about.benefits[benefitIndex])
					   about.save((err,service)=> {
					   		if(err) res.status(501).json({err: "something went wrong"});
						      	res.status(200).json({status :  true,benefit : about.benefits[benefitIndex]});
					   })
			   })

			})



		 }

})




router.delete('/about/benefits',middlewares.isLoggedIn,async (req,res)=> {

	if(req.body){

			  About.find({},(err,about)=> {

		  if(err) res.status(501).json({err: "something went wrong"});


		   About.findById(about[0]._id,(err,about) => {
			     if(err) res.status(501).json({err: "something went wrong"});
			       
			     var benefitIndex = about.benefits.findIndex(o => o.title === req.body.title && o.img === req.body.img);
				 
	        deleteFile(getImgName(req.body.img),'benefits')
	  			about.benefits.splice(benefitIndex,1)

				    about.save((err,srvc)=> {
				   		if(err) res.status(501).json({err: "something went wrong"});
					       res.status(200).json({status : true,msg : 'Successfully deleted'})
				   })
		    
		   })
	   })

	}

})




module.exports = router;


const getImgName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
