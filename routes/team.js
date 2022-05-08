var express = require("express");
var router = express.Router();
var TeamMembers = require("../models/team_member");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");



router.get("/team",middlewares.isLoggedIn,(req,res)=> {
	TeamMembers.find({},(err,members)=> {
		  if(err) res.status(501).json({err: "something went wrong"});

res.render("./admin/team",{members : members});

	})
	
})


router.get("/team/new",middlewares.isLoggedIn,(req,res)=> {
	res.render("./admin/newmember");
})


router.post("/team",middlewares.isLoggedIn,async (req, res)=> {
	if(req.body){
        var serverURl = `${req.protocol}://${req.get('host')}`;
        var fileName =  'team_member' + Math.floor(Math.random() * 10000);
	    var link = serverURl;

	    
	
	    req.body.social_links  = {
				fb: req.body.fb,
				twitter : req.body.twitter,
				instagram : req.body.instagram,
				linkedIn : req.body.linkedin,
	    }
       
	  
			if (req.files) {
				imgPath = await UploadFile(req.files.img,fileName,'members');
				link += imgPath;
			}
        req.body.img =  link;

     if(req.body.isCeo){
     	req.body.isCeo = true;
     }else{
     	req.body.isCeo = false;
     }



	    delete req.body['fb'];
	    delete req.body['twitter'];
	    delete req.body['instagram'];
	    delete req.body['linkedin'];




		  TeamMembers.create(req.body,(err,member) => {

		    if(err){

		        res.status(501).json({err: "something went wrong"})
			}else{
			 	res.status(200).json({status:  true})
			}
			    
		   

		  });

	
		
	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})






router.put("/team",middlewares.isLoggedIn,async (req,res)=> {

  if(req.body){



	   req.body.social_links  = {
				fb: req.body.fb,
				twitter : req.body.twitter,
				instagram : req.body.instagram,
				linkedIn : req.body.linkedin,
	    }
 

    var serverURl = `${req.protocol}://${req.get('host')}`;
    var fileName =  'team_member' + Math.floor(Math.random() * 10000);
	var link = serverURl;
    var id = JSON.parse(req.body.oldData)._id;

	if (req.files) {
		var imgPath = await UploadFile(req.files.img,fileName,'members');
		link += imgPath;
	} 
    
    if(req.files && deleteFile(getImgName(JSON.parse(req.body.oldData).img),'members')){
      	req.body.img = link;
    }


	    delete req.body['fb'];
	    delete req.body['twitter'];
	    delete req.body['instagram'];
	    delete req.body['linkedin'];
	    delete req.body['oldData'];


	TeamMembers.findByIdAndUpdate(id,req.body,{new : true},(err,member)=> {
		if(err) res.status(501).json({err: "something went wrong"});
	
		res.status(200).json({status:  true,member: member})
	})



  }else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})






router.delete('/team',middlewares.isLoggedIn,async (req,res)=> {
	if(req.body){
  
        
        TeamMembers.findByIdAndDelete(req.body._id,(err,memer)=>{

        	if(!err && deleteFile(getImgName( req.body.img),'members')){
                 res.status(200).json({status:  true })
        	}else{
        		res.status(501).json({err: "something went wrong"});
        	}

        })



        
	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})













module.exports = router;


const getImgName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
