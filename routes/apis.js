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
var Applications = require("../models/application");
var TeamMembers = require("../models/team_member");
var UploadFile = require("../helpers/fileUpload");



// site settings api
router.get("/site_settings",(req,res) => {
	Site_settings.find({},(err,Settings) => {
		if(err || Settings == []){
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
    if(err || slider == []){
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
		if(err || data == []){  
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
		if(err || data == []){
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
    if(err || data == []){
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
    if(err || data == []){
      res.status(400).json({err: "something went wrong"})
    }else{
     var dataWithOutId =   data[0].toObject();
     delete dataWithOutId._id;
     delete dataWithOutId.__v;
     res.status(200).json(dataWithOutId);      
    }

  })
})


// careers api
router.get("/careers",(req,res) => {
  Careers.find({},(err,data) => {
    if(data === []){
      console.log(" empty")
    }
    if(err || data === []){
      res.status(400).json({err: "something went wrong"});
      console.log(err)
    }else{
     var dataWithOutId =   data[0].toObject();
     delete dataWithOutId._id;
     delete dataWithOutId.__v;
     res.status(200).json(dataWithOutId);      
    }

  })
})


router.get('/careers/:link',(req,res) => {
  var link = req.params.link;
   
   if(link){
    Careers.find({},(err,data) => {
      if(err || data === []){
        res.status(400).json({err: "something went wrong"});
      }else{

    var opening =   data[0].openings.find((obj) => obj.link === link )
 
    res.status(200).json(opening)
      }
    })
   } 

})



router.post('/career/apply',async (req,res)=> {
  if(req.body){
  

      var  fullname = req.body.firstName + " " + req.body.lastName;
      var serverURl = `${req.protocol}://${req.get('host')}`;
      var fileName =  fullname.replace(/ /g,'_') + "_" + Math.floor(Math.random() * 10000);
      var link = serverURl;

      if (req.files) {
        var  filepath = await UploadFile(req.files.cv,fileName,'resume');
        link += filepath;
      }

      var application = {
          aplicant : {
          name : fullname,
          email : req.body.email,
          github_link : req.body.github,
          portfolio_link : req.body.portfolio,
          cv : link,
        },
        applied_for : req.body.opening
      }


  Applications.create(application,(err,data)=> {
      if(err) res.status(501).json({err: "something went wrong"});
      
      res.status(200).json({status :  true})

  })

  }else{
    res.status(405).json({err: "Method Not Allowed"});
  }
})




// interns api
router.get("/interns",(req,res) => {
  Interns.find({},(err,data) => {
    if(data === []){
      console.log(" empty")
    }
    if(err || data === []){
      res.status(400).json({err: "something went wrong"});
      console.log(err)
    }else{
     res.status(200).json(data);      
    }

  })
})


router.get("/interns/:id",(req,res) => {
   if(req.params.id){
      Interns.findById(req.params.id,(err,data) => {
        if(data === []){
          console.log(" empty")
        }
        if(err || data === []){
          res.status(400).json({err: "something went wrong"});
          console.log(err)
        }else{
         res.status(200).json(data);      
        }

      })
   }


})

// team route
router.get("/team",(req,res) => {
  TeamMembers.find({},(err,data) => {
    if(data === []){
      console.log(" empty")
    }
    if(err || data === []){
      res.status(400).json({err: "something went wrong"});
      console.log(err)
    }else{
     res.status(200).json(data);      
    }

  })
})


router.post('/contact',(req,res) => {

  if(req.body){

  var msg = {
    first_name  : req.body.firstName,
    last_name  : req.body.lastName,
    email : req.body.email,
    message : req.body.msg,
  }
  
   Messages.create(msg,(err,newMsg) => {
    
    if(err){
      res.status(400).json({err: "something went wrong"});
    }else{
     
      res.status(200).json({success : true,msg : 'Message sucessfully sent'})
    }

   })


  }else{
    res.status(405).json({err: "Method Not Allowed"});
  }
})

/*Applications.find({},(err,data)=> {
  console.log(data)
})*/




module.exports = router;


