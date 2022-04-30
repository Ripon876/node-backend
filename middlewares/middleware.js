

var middlewares = {
	isLoggedIn : function(req,res,next){     // 
		if(req.isAuthenticated()){          //   this function used for preventing   
			return next();                 //   a logged out user to visite   
		}else{                            //   the secreat pages
	                                     //
	    // req.flash('loginFirst', 'Please Login First');        
			res.redirect("/login");             
		}
    },
    isLoggedOut : function(req,res,next){    //                       
		if(!req.isAuthenticated()){         //  this function used for preventing       
			return next();                 //  a logged in user to visite       
		}else{                            //  the login and registaion page
			res.redirect("/admin");      //           
		}
    }

}

module.exports = middlewares;