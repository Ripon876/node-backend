var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Site_settings = require("../models/settings");
var Slider = require("../models/slides");
var About = require("../models/about");
var Services = require("../models/services");
var Clients = require("../models/clients");
var WeOffer = require("../models/weOffer");
var Messages = require("../models/messages");
var Careers = require("../models/careers");
var Interns = require("../models/interns");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");






  //===================// 
 // settings api edit //
//___________________//


router.get('/settings',middlewares.isLoggedIn,(req,res) => {
	Site_settings.find({},(err,data)=> {
		if(err){
			res.status(501).send("something went wrong")
		}
		res.render('./admin/settings',{settings : data[0]});
	})
	
})

router.post('/settings',middlewares.isLoggedIn,async (req,res) => {

	if(req.body){ 

		var fileName = req.body.logo || 'Logo';
		var imgPath;
		var link;
		var newSettings = {
			social_links: {}
		}

		
		if (req.files) {

			imgPath = await UploadFile(req.files.img,fileName);
		 link = imgPath;
		}



		if(req.body){
			for (key in req.body) {
				if(key === 'fb' || key === 'twitter' || key === 'instagram'){
					newSettings.social_links[key] = req.body[key];
				}else{
					newSettings[key] = req.body[key]
				}
			}
			 
		if(link){
			newSettings.logo = link;
		}

		Site_settings.find({},(err,data)=> {
			if(err) res.status(501).json({err: "something went wrong"});

				Site_settings.findOneAndUpdate(data[0],newSettings,{new : true},(err,settings)=> {
					
					if(err)  res.status(501).json({err: "something went wrong"});
					// console.log(settings);
					res.status(200).json({status :  true});

				})

		})
		}
	}

})



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

router.post('/slider',(req,res) => {
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
				imgPath = await UploadFile(req.files.img,fileName);
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
				  	imgPath = await UploadFile(req.files.img,fileName);
				  link += imgPath;
				}

		     var {oldData,...newData} =  req.body;


		    if(newData.show_img_first){
		     	newData.show_img_first = true;
		    }else{
		     	newData.show_img_first = false;
		    }

		    if(req.files && deleteFile(getImgName(JSON.parse(oldData).img))){

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
				 
	        deleteFile(getImgName(req.body.img))
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



  //===================// 
 //  services route   //
//___________________//



router.get("/services",(req,res)=> {

	Services.find({},(err,services)=> {
		if(err) res.status(501).json({err: "something went wrong"});
   
   res.render('./admin/services',{service : services[0]})

	})

})


router.get("/services/new",(req,res)=> {
   res.render('./admin/newservice')

})


router.post('/services',async(req,res)=> {


	  var serverURl = `${req.protocol}://${req.get('host')}`;
		var fileName =  'service' + Math.floor(Math.random() * 10000);
		var link = serverURl;

		if (req.files) {
			imgPath = await UploadFile(req.files.img,fileName,'services');
			link += imgPath;
		}

   req.body.img =  link;
	if(req.body){
   if(req.body.show_content_first){
   	req.body.show_content_first = true
   }else{
   	req.body.show_content_first = false
   }


		// console.log(req.body)









 Services.find({},(err,services)=> {
		if(err) res.status(501).json({err: "something went wrong"});

	  Services.findById(services[0]._id,(err,services)=>{
	  	if(err) res.status(501).json({err: "something went wrong"});
 			 services.services.push(req.body);
 			 services.save((err)=>{
 			 	if(err) res.status(501).json({err: "something went wrong"});

					res.status(200).json({status: true})

 			 })

	  })
	    
	})







	}
})




module.exports = router;


const getImgName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
