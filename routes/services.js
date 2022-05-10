var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Services = require("../models/services");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");




  //===================// 
 //  services route   //
//___________________//



router.get("/services",middlewares.isLoggedIn,(req,res)=> {

	Services.find({},(err,services)=> {
		if(err) res.status(501).json({err: "something went wrong"});
   
   res.render('./admin/services',{service : services[0]})

	})

})


router.get("/services/new",middlewares.isLoggedIn,(req,res)=> {
   res.render('./admin/newservice')

})


router.post('/services',async(req,res)=> {

if(req.body){



 




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


if(req.body.moreDetails){
	req.body.moreDetails = true;
	req.body.link = req.body.title.replace(/ /g,'_');
}else{
	req.body.moreDetails = false;
	req.body.link = '';
}



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

}else{
	res.status(405).json({err: "Method Not Allowed"});
}


})


router.put('/services',middlewares.isLoggedIn,(req,res)=> {
	if(req.body){
		Services.find({},(err,services)=>{
			if(err) res.status(501).json({err: "something went wrong"});
     
      Services.findOneAndUpdate(services[0]._id,req.body,{new: true},(err,newSrvc)=> {
      	if(err) res.status(501).json({err: "something went wrong"});
      	var {services,...rest} = newSrvc.toObject();
           res.status(200).json({status : true,services : rest})
      })

		})
	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})




router.put('/services/service',middlewares.isLoggedIn,async (req,res) => {

		if(req.body){ 
			  var serverURl = `${req.protocol}://${req.get('host')}`;
				var fileName =  'service' + Math.floor(Math.random() * 10000);
				var link = serverURl;

				   if (req.files) {
				  	imgPath = await UploadFile(req.files.img,fileName,'services');
				  link += imgPath;
				}

		    var {oldData,...newData} =  req.body;


		    if(newData.show_content_first){
		     	newData.show_content_first = true;
		    }else{
		     	newData.show_content_first = false;
		    }

		    if(newData.moreDetails){
		    	newData.moreDetails = true;
				newData.link = req.body.title.replace(/ /g,'_');
			}else{
				newData.moreDetails = false;
				newData.link = '';
			}

   
		    if(req.files && deleteFile(getImgName(JSON.parse(oldData).img),'services')){

		    	newData.img = link;
		    }else{
		    	newData.img  =  JSON.parse(oldData).img;
		    }



 
		    Services.find({},(err,sliders)=> {

			  if(err) res.status(501).json({err: "something went wrong"});
			   Services.findById(sliders[0]._id,(err,services) => {

				     if(err) res.status(501).json({err: "something went wrong"});
				       
				     var serviceIndex = services.services.findIndex(o => o.title === JSON.parse(oldData).title && o.img === JSON.parse(oldData).img);
					 
					   services.services[serviceIndex] = newData;
					   services.save((err,service)=> {
					   		if(err){
					   			res.status(501).json({err: "something went wrong"});
					   		}else{
					   			res.status(200).json({status :  true,service : services.services[serviceIndex]});
					   		} 
						      	
					   })
			   })

			})



		}else{
			res.status(405).json({err: "Method Not Allowed"});
	    }

})




router.delete('/services',middlewares.isLoggedIn,(req,res)=> {


	if(req.body){
	  Services.find({},(err,services)=> {

		  if(err) res.status(501).json({err: "something went wrong"});


		   Services.findById(services[0]._id,(err,service) => {
			     if(err) res.status(501).json({err: "something went wrong"});
			       
			     var serviceIndex = service.services.findIndex(o => o.title === req.body.title && o.img === req.body.img);
				 
	        deleteFile(getImgName(req.body.img),'services')
	  			service.services.splice(serviceIndex,1)

				    service.save((err,srvc)=> {
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
