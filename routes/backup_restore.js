var express = require("express");
var router = express.Router();
var Restore = require('../helpers/restore');
var Backup = require('../helpers/backup');
var middlewares = require('../middlewares/middleware')


router.get('/backup_restore',middlewares.isLoggedIn,async (req,res)=>{
	res.render('./admin/backup_restore')
})


router.get("/create-backup",middlewares.isLoggedIn,async (req,res)=> {
 var serverURl = `${req.protocol}://${req.get('host')}`;
 var link = serverURl;



 await Backup()
	 .then((data)=> {
	 
	try	{
	 
	    res.status(200).json({status : true,file: serverURl + data});

	}
	catch(err){
		if(err) res.status(501).json({err: "something went wrong"});
	}

 })

})



router.post('/restore',async (req,res)=> {
	if(req.files){
		

  await Restore(req.files.backupFile)
  .then((data)=> {
  	
  	res.status(200).json({status : true})
  })

	}
})




module.exports = router;



