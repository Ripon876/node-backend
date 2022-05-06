var mongoose = require("mongoose");
var User = require("../models/user");
var Site_settings = require("../models/settings");
var Slider = require("../models/slides");
var About = require("../models/about");
var Services = require("../models/services");
var Clients = require("../models/clients");
var WeOffer = require("../models/weOffer");
var Messages = require("../models/messages");
var Careers = require("../models/careers");
var Interns = require("../models/interns");


const SEED = {

	clients : { clients : [] },
	settings : {
		logo : "",
		social_links :  {
			fb : "",
			twitter : '',
			instagram : ''
		},
		description :  '',
		keywords : '',
		favicon :  '',
		email :  '',
		number : '',
		address : ''
  },
  slider : {
		slides : [],
		total_slides :  0,
		slide_duration : 1500,
		axis : 'x'
  },
  services : {
		title :  '',
		short_description :  '',
		services : []
  },
  about : {
		title : '',
		short_description : '',
		long_descrition : '',
		img : '',
		benefits : []
  },
  weoffers : {
		title :  '',
		short_description :  '',
		offers : []
  },
  careers : {
		title : '',
		description : '',
		openings : []
  }


};

/*Site_settings.collection.drop();
Slider.collection.drop();
About.collection.drop();
Services.collection.drop();
Clients.collection.drop();
WeOffer.collection.drop();
Messages.collection.drop();
Careers.collection.drop();
Interns.collection.drop();
*/

/*(async () => {
	await Site_settings.create(SEED.settings);
	await Slider.create(SEED.slider);
	await About.create(SEED.about);
	await Services.create(SEED.services);
	await Clients.create(SEED.clients);
	await WeOffer.create(SEED.weoffers);
	await Careers.create(SEED.careers);
	console.log('initial schema added');
})();
*/




// (async () => {

// 	await initialSchema()
// })();

// Messages.collection.drop();



// var clientseed = {
//   clients : []
// };


 // Clients.create(clientseed,(err,ddfds) => {
 //    if(err) console.log(err);
   
 //    console.log(ddfds);
 // });

/*var settingsseed = {
	logo : "",
	social_links :  {
		fb : "",
		twitter : '',
		instagram : ''
	},
	description :  '',
	keywords : '',
	favicon :  '',
	email :  '',
	number : '',
	address : ''
}*/

 // Site_settings.create(sdfd,(err,ddfds) => {
 //    if(err) console.log(err);
   
 //    console.log(ddfds);
 // });


/*var sliderseed = {
	slides : [],
	total_slides :  0,
	slide_duration : 1500,
	axis : 'x'
}


*/


 // Slider.create(sliderseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });


/* */


 // About.create(aboutseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });



/*var servicesseed = {
	title :  '',
	short_description :  '',
	services : []
}*/



 // Services.create(servicesseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });




/*var weofferseed = {
	title :  '',
	short_description :  '',
	offers : []
}
*/

 // WeOffer.create(weofferseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });

/*
var careerseed = {
	title : '',
	description : '',
	openings : []
};
*/



 // Careers.create(careerseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });












// const initialSchema = async () => {

// }







module.exports = SEED;






