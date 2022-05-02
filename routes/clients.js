var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Clients = require("../models/clients");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");







router.get('/clients',middlewares.isLoggedIn,(req,res)=> {
	Clients.find({},(err,clients)=> {
		if(err) res.status(501).json({err: "something went wrong"});
		res.render('./admin/clients',{clients : clients[0].clients})
	})
})


router.post('/clients',middlewares.isLoggedIn,async(req,res)=> {
	if(req.body){
    	var serverURl = `${req.protocol}://${req.get('host')}`;
        var fileName =  'client' + Math.floor(Math.random() * 10000);
	    var link = serverURl;

	    if(req.files){

			if (req.files) {
				imgPath = await UploadFile(req.files.img,fileName,'clients');
				link += imgPath;
			}

	    }

		Clients.find({},(err,clients)=> {

			if(err) res.status(501).json({err: "something went wrong"});
			
            
            clients[0].clients.push(link)

            clients[0].save((err,clnt)=>{
				if(err) res.status(501).json({err: "something went wrong"});
				
					res.status(200).json({status: true,client : clnt.clients[clnt.clients.length-1]})
				
            })

	    })

	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
  
})




router.delete("/clients",middlewares.isLoggedIn,(req,res)=> {
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
	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
  
})







module.exports = router;

const getImgName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
