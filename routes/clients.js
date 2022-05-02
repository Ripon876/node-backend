var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Clients = require("../models/clients");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");







router.get('/clients',(req,res)=> {
	Clients.find({},(err,clients)=> {
		if(err) res.status(501).json({err: "something went wrong"});
		console.log(clients)
		res.render('./admin/clients',{clients : clients[0].clients})
	})
})



router.delete("/clients",(req,res)=> {
	if(req.body){
		Clients.find({},(err,clients)=> {

			if(err) res.status(501).json({err: "something went wrong"});
			
            var clientIndex = clients[0].clients.indexOf(req.body.img)
            clients[0].clients.splice(clientIndex,1);

            clients[0].save((err,clnt)=>{
				if(err) res.status(501).json({err: "something went wrong"});
				if(deleteFile(getImgName(req.body.img),'clients')){
					res.status(200).json({status: true})
				}else{
					res.status(501).json({err: "something went wrong"});
				}
            })

	    })
	}
})







module.exports = router;

const getImgName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
