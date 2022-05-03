var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Messages = require("../models/messages");
var middlewares = require("../middlewares/middleware");








router.get("/messages/:id",middlewares.isLoggedIn,(req,res)=> {
	if(req.params.id){

		Messages.findById(req.params.id,(err,msg)=> {
			if(err) res.status(501).json({err: "something went wrong"});
			msg.read = true;
			msg.save((err,msg)=> {
			   if(err) res.status(501).json({err: "something went wrong"});
			   res.render('./admin/message',{msg : msg})
			})
            
		})
        
	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})




router.post('/messages/send',middlewares.isLoggedIn,(req,res)=> {
	if(req.body){
		res.status(200).json({status : true,msg :  'Message successfuly sent'});
	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})






module.exports = router;

