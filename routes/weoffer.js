var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var WeOffer = require("../models/weOffer");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");



router.get('/offers',middlewares.isLoggedIn,(req,res)=> {
	WeOffer.find({},(err,offers)=> {
	    if(err) res.status(501).json({err: "something went wrong"});
        res.render("./admin/weoffer",{offers :  offers[0]});
	})
})




router.get('/offers/new',middlewares.isLoggedIn,(req,res)=> {
	res.render('./admin/newoffer');
})

router.post('/offers/new',middlewares.isLoggedIn,async (req,res)=> {


	if(req.body){



	var serverURl = `${req.protocol}://${req.get('host')}`;
    var fileName =  'offer' + Math.floor(Math.random() * 10000);
	var link = serverURl;

	if (req.files) {
		imgPath = await UploadFile(req.files.img,fileName,'offers');
		link += imgPath;
	}



 req.body.img =  link;



 WeOffer.find({},(err,offers)=> {
		if(err) res.status(501).json({err: "something went wrong"});

	  WeOffer.findById(offers[0]._id,(err,offer)=>{
	  	if(err) res.status(501).json({err: "something went wrong"});
 			 offer.offers.push(req.body);
 			 offer.save((err)=>{
 			 	if(err) res.status(501).json({err: "something went wrong"});
       
					res.status(200).json({status: true})

 			 })

	  })
	    
	})

	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})





router.put('/offers',middlewares.isLoggedIn, (req,res) => {
	 
  if(req.body){

	WeOffer.find({},(err,data)=> {
		if(err) res.status(501).json({err: "something went wrong"});
	     
	     WeOffer.findOneAndUpdate(data[0],req.body,{new : true},(err,offer)=> {
	     	if(err) res.status(501).json({err: "something went wrong"});
	     	res.status(200).json({status :true})
	     })

	})


  }else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})




router.put("/offers/offer",middlewares.isLoggedIn, async (req,res)=> {

	if(req.body){ 

			  var serverURl = `${req.protocol}://${req.get('host')}`;
				var fileName =  'offer' + Math.floor(Math.random() * 10000);
				var link = serverURl;

				if (req.files) {
				  	imgPath = await UploadFile(req.files.img,fileName,'offers');
				  link += imgPath;
				}

		    var {oldData,...newData} =  req.body;


		   
		    if(req.files && deleteFile(getImgName(JSON.parse(oldData).img),'offers')){

		    	newData.img = link;
		    }else{
		    	newData.img  =  JSON.parse(oldData).img;
		    }



 
		    WeOffer.find({},(err,offers)=> {

			  if(err) res.status(501).json({err: "something went wrong"});
			   WeOffer.findById(offers[0]._id,(err,offer) => {

				     if(err) res.status(501).json({err: "something went wrong"});
				       
				     var offerIndex = offer.offers.findIndex(o => o.title === JSON.parse(oldData).title && o.img === JSON.parse(oldData).img);
					 
					   offer.offers[offerIndex] = newData;
					   offer.save((err,service)=> {
					   		if(err) res.status(501).json({err: "something went wrong"});
						      	res.status(200).json({status :  true,benefit : offer.offers[offerIndex]});
					   })
			   })

			})



		 }else{
		res.status(405).json({err: "Method Not Allowed"});
	}

})



router.delete('/offers/offer',middlewares.isLoggedIn,async (req,res)=> {

	if(req.body){

			  WeOffer.find({},(err,offers)=> {

		  if(err) res.status(501).json({err: "something went wrong"});


		   WeOffer.findById(offers[0]._id,(err,offer) => {
			     if(err) res.status(501).json({err: "something went wrong"});
			       
			     var offerIndex = offer.offers.findIndex(o => o.title === req.body.title && o.img === req.body.img);
				 
	        deleteFile(getImgName(req.body.img),'offers')
	  			offer.offers.splice(offerIndex,1)

				    offer.save((err,srvc)=> {
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

const getImgName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
