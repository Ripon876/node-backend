const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var Site_settings = require("../models/settings");
var Slider = require("../models/slides");
var About = require("../models/about");
var Services = require("../models/services");
var Clients = require("../models/clients");
var WeOffer = require("../models/weOffer");
var Messages = require("../models/messages");




// site settings api
router.get("/site_settings",(req,res) => {
	Site_settings.find({},(err,Settings) => {
		if(err){
      res.status(400).json({err: "something went wrong"})
    }else{
      var newSettings =   Settings[0].toObject();
      delete newSettings._id;
      delete newSettings.__v;
      res.status(200).json(newSettings);
    }
              

	})
	
});


// slider api
router.get('/slides',(req,res) => {

  Slider.find({},(err,slider) => {
    if(err){
      res.status(400).json({err: "something went wrong"})
     }else{
   
      var sliders =   slider[0].toObject();
      delete sliders._id;
      delete sliders.__v;
      res.status(200).json(sliders);
       
  }  

  })

})

// about section api
router.get("/about",(req,res) => {
	About.find({},(err,data) => {
		if(err){  
      res.status(400).json({err: "something went wrong"});
    }else{
        var dataWithOutId =   data[0].toObject();
               delete dataWithOutId._id;
               delete dataWithOutId.__v;
               res.status(200).json(dataWithOutId);
    }
              

	})
})


// services api
router.get("/services",(req,res) => {
	Services.find({},(err,data) => {
		if(err){
     res.status(400).json({err: "something went wrong"}) 
   }else{
    var dataWithOutId =   data[0].toObject();
    delete dataWithOutId._id;
    delete dataWithOutId.__v;
    res.status(200).json(dataWithOutId);
   }
               
	})
})


// our clients api
router.get("/clients",(req,res) => {
  Clients.find({},(err,data) => {
    if(err){
      res.status(400).json({err: "something went wrong"})
    }else{
     var dataWithOutId =   data[0].toObject();
     delete dataWithOutId._id;
     delete dataWithOutId.__v;
     res.status(200).json(dataWithOutId);      
    }

  })
})


// what we offer api
router.get("/what_we_offer",(req,res) => {
  WeOffer.find({},(err,data) => {
    if(err){
      res.status(400).json({err: "something went wrong"})
    }else{
     var dataWithOutId =   data[0].toObject();
     delete dataWithOutId._id;
     delete dataWithOutId.__v;
     res.status(200).json(dataWithOutId);      
    }

  })
})


router.post('/contact',(req,res) => {
  var msg = {
    first_name  : req.body.firstName,
    last_name  : req.body.lastName,
    email : req.body.email,
    message : req.body.msg,
  }
  if(req.body){

   Messages.create(msg,(err,newMsg) => {
    
    if(err){
      res.status(400).json({err: "something went wrong"});
    }else{
      console.log(newMsg);
      res.status(200).json({success : true,msg : 'Message sucessfully sent'})
    }

   })


  }
})






 // Clients.collection.drop();


var set = {
  clients : ["http://localhost:3000/img/c1.png",'http://localhost:3000/img/c1.png','http://localhost:3000/img/c1.png','http://localhost:3000/img/c1.png','http://localhost:3000/img/c1.png','http://localhost:3000/img/c1.png']
}


 // Clients.create(set,(err,ddfds) => {
 //    if(err) console.log(err);
   
 //    console.log(ddfds);
 // });


// Clients.find({},(err,dt) => { console.log(dt)})


module.exports = router;


