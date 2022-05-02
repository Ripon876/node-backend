var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Interns = require("../models/interns");
var UploadFile = require("../helpers/fileUpload");
var deleteFile = require("../helpers/deleteFile");
var middlewares = require("../middlewares/middleware");





router.get("/interns",middlewares.isLoggedIn,(req,res)=> {
	Interns.find({},(err,interns)=> {
		if(err) res.status(501).json({err: "something went wrong"});
		res.render('./admin/interns',{interns : interns});
	})
	
})


router.get('/interns/new',middlewares.isLoggedIn,(req,res)=> {
	res.render('./admin/newintern');
})


router.post('/interns/new',middlewares.isLoggedIn,async (req,res)=> {
	if(req.body){
		var months = Math.abs(req.body.e_date.split('-')[1] - req.body.s_date.split('-')[1]);
	    var sm = getMonth(req.body.s_date)
	    var em = getMonth(req.body.e_date)
	    var duration = `Duration: ${months} Month (${sm} - ${em})`;
	    var serverURl = `${req.protocol}://${req.get('host')}`;
        var fileName =  'intern' + Math.floor(Math.random() * 10000);
	    var link = serverURl;

	    
	    req.body.duration = duration;

	    req.body.social_links  = {
				fb: req.body.fb,
				twitter : req.body.twitter,
				instagram : req.body.instagram,
				linkedIn : req.body.linkedin,
	    }

	    req.body.projects =   req.body.projects.split(',');
			if (req.files) {
				imgPath = await UploadFile(req.files.img,fileName,'interns');
				link += imgPath;
			}
      req.body.img =  link;

	    delete req.body['s_date'];
	    delete req.body['e_date'];
	    delete req.body['fb'];
	    delete req.body['twitter'];
	    delete req.body['instagram'];
	    delete req.body['linkedin'];

		  Interns.create(req.body,(err,intern) => {

		    if(err) res.status(501).json({err: "something went wrong"});
		    console.log(intern)
		    res.status(200).json({status:  true})

		  });

	
		
	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}
})




router.delete("/interns",middlewares.isLoggedIn,(req,res)=> {

	if(req.body){
	Interns.findByIdAndDelete(req.body._id, function (err, docs) {
	     if(err) res.status(501).json({err: "something went wrong"});
	     if(deleteFile(getImgName(req.body.img),'interns')){
	     		res.status(200).json({status:  true})
	     }else{
	     		res.status(501).json({err: "something went wrong"});
	     }
	});

	}else{
		res.status(405).json({err: "Method Not Allowed"});
	}

})













module.exports = router;




const getImgName = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

const getMonth = (date)=> {
		const dt = new Date(date);

		const fullMonth = dt.toLocaleDateString('BD', {month: 'long'}) + ' ' + date.split('-')[0];
    return fullMonth;
}