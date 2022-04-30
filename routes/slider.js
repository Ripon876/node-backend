var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Slider = require("../models/slides");
var Services = require("../models/services");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");




  //===================// 
 //    slider route   //
//___________________//

router.get('/slider',middlewares.isLoggedIn,(req,res) => {

	Slider.find({},(err,sliders) => {
       if(!err){
         res.render('./admin/slider',{slider: sliders[0]});
       }
	})

})

router.post('/slider',middlewares.isLoggedIn,(req,res) => {
	if(req.body){
		Slider.find({},(err,sliders)=> {
			if(err) res.status(501).json({err: "something went wrong"});

			Slider.findOneAndUpdate(sliders[0],req.body,{new : true},(err,slider) => {
				if(err) res.status(501).json({err: "something went wrong"});
				res.status(200).json({status :  true});
			})
			
		})
	}
})

router.get("/slider/new",middlewares.isLoggedIn,(req,res)=> {
	res.render('./admin/newslider')
})





router.post("/slider/slides",middlewares.isLoggedIn,async (req,res)=> {
	

	if(req.body){
		  var serverURl = `${req.protocol}://${req.get('host')}`;
			var fileName =  'slides' + Math.floor(Math.random() * 10000);
			var link = serverURl;

			if (req.files) {
				imgPath = await UploadFile(req.files.img,fileName,'slides');
			 link += imgPath;
			}
			var data = req.body;
			data.img = link;
			data.show_img_first === 'on' ? data.show_img_first  = true : data.show_img_first = false;

			Slider.find({},(err,sliders) => {
				if(err) res.status(501).json({err: "something went wrong"});

				 Slider.findById(String(sliders[0]._id),(err,slider) => {
				 	if(err) res.status(501).json({err: "something went wrong"});

			       slider.slides.push(data);
			       slider.total_slides++;

			       slider.save((err,sld)=> {
				       	if(err) res.status(501).json({err: "something went wrong"});
				       	res.status(200).json({status :  true});
				       	
			       })

				 })

			})
  }

})




router.put('/slider',middlewares.isLoggedIn,async (req,res) => {

		if(req.body){ 
			  var serverURl = `${req.protocol}://${req.get('host')}`;
				var fileName =  'slides' + Math.floor(Math.random() * 10000);
				var link = serverURl;

				   if (req.files) {
				  	imgPath = await UploadFile(req.files.img,fileName,'slides');
				  link += imgPath;
				}

		     var {oldData,...newData} =  req.body;


		    if(newData.show_img_first){
		     	newData.show_img_first = true;
		    }else{
		     	newData.show_img_first = false;
		    }

		    if(req.files && deleteFile(getImgName(JSON.parse(oldData).img),'slides')){

		    	newData.img = link;
		    }else{
		    
		    	newData.img  =  JSON.parse(oldData).img;
		    }

		  Slider.find({},(err,sliders)=> {

			  if(err) res.status(501).json({err: "something went wrong"});
			   Slider.findById(sliders[0]._id,(err,slider) => {
				     if(err) res.status(501).json({err: "something went wrong"});
				       
				     var slideIndex = slider.slides.findIndex(o => o.title === JSON.parse(oldData).title && o.img === JSON.parse(oldData).img);
					 
					   slider.slides[slideIndex] = newData;
					   slider.save((err,slide)=> {
					   		if(err) res.status(501).json({err: "something went wrong"});
						      	res.status(200).json({status :  true,slide : slider.slides[slideIndex]});
					   })

			    
			   })

		  })
		 }

})


router.delete('/slider',middlewares.isLoggedIn,(req,res)=> {

	if(req.body){
	  Slider.find({},(err,sliders)=> {

		  if(err) res.status(501).json({err: "something went wrong"});


		   Slider.findById(sliders[0]._id,(err,slider) => {
			     if(err) res.status(501).json({err: "something went wrong"});
			       
			     var slideIndex = slider.slides.findIndex(o => o.title === req.body.title && o.img === req.body.img);
				 
	        deleteFile(getImgName(req.body.img),'slides')
	  			slider.slides.splice(slideIndex,1)
	  			slider.total_slides--;

				    slider.save((err,slide)=> {
				   		if(err) res.status(501).json({err: "something went wrong"});
					       res.status(200).json({status : true,msg : 'Successfully deleted'})
				   })
		    
		   })
	   })
	}

})



module.exports = router;

const getImgName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
