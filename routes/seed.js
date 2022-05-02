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


const SEED = 'SeeD';








var sdfdsfdsfd = {
  clients : ["http://localhost:3000/img/c1.png",'http://localhost:3000/img/c1.png','http://localhost:3000/img/c1.png','http://localhost:3000/img/c1.png','http://localhost:3000/img/c1.png','http://localhost:3000/img/c1.png']
}

 // Clients.collection.drop();

//  Clients.create(sdfdsfdsfd,(err,ddfds) => {
//     if(err) console.log(err);
   
//     console.log(ddfds);
//  });


// Clients.find({},(err,dt) => { console.log(dt)})








/*var sdfd = {
	logo : "LOGO",
	social_links :  {
		fb : "fb",
		twitter : 'twitter',
		instagram : 'instagram'
	},
	description :  'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.',
	keywords : 'keyword 1 , keyword 2',
	favicon :  'favicon url',
	email :  'sample@gmail.com',
	number : '+1 5589 55488',
	address : '14-15 No. Yea Khaja Bhaban, 1 No. Super Market, Mirpur-1,Dhaka-1216'
}
*/


var sdfd = {
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
}




 // Site_settings.collection.drop();

 // Site_settings.create(sdfd,(err,ddfds) => {
 //    if(err) console.log(err);
   
 //    console.log(ddfds);
 // });


// Site_settings.find({},(err,dt) => { console.log(dt)})








/*var sliderseed = {
	slides : [
	{
	title : "sample title 1",
	description : 'Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta.',
	color :  '#000',
	img : 'http://localhost:3000/img/3.svg',
	show_img_first : false

    },
    {
	title : "sample title 2",
	description : 'Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta.',
	color :  '#000',
	img : 'http://localhost:3000/img/2.svg',
	show_img_first : true

    },
    {
	title : "sample title 3",
	description : 'Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta.',
	color :  '#000',
	img : 'http://localhost:3000/img/1.svg',
	show_img_first : false

    }

    ],
	total_slides :  3,
	slide_duration : 1500,
	axis : 'x'
}*/


var sliderseed = {
	slides : [],
	total_slides :  0,
	slide_duration : 1500,
	axis : 'x'
}



// Slider.collection.drop();

 // Slider.create(sliderseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });


// Slider.find({},(err,dt) => { console.log(dt)})

/*
var aboutseed = {
	title : 'About',
	short_description : 'Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus.',
	long_descrition : 'Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus.Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. <br><br> Proin eget tortor risus.Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus. <br><br> Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus.Pellentesque in ipsum id orci porta dapibus. Nulla quis  dapibus',
	img : 'http://localhost:3000/img/about.svg',
	benefits : [
	{
	  img: "http://localhost:3000/img/kickstart.svg",
	  title : 'Kick Start',
	  description : 'Proin eget tortor risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	},
	{
	  img: "http://localhost:3000/img/engineer.svg",
	  title : 'Top Quality Engineers',
	  description : 'Proin eget tortor risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	},
	{
	  img: "http://localhost:3000/img/managment.svg",
	  title : 'End to End Management',
	  description : 'Proin eget tortor risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	},
	{
	  img: "http://localhost:3000/img/setting.svg",
	  title : 'Operational Efficiency',
	  description : 'Proin eget tortor risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	}
	]
}*/




var aboutseed = {
	title : '',
	short_description : '',
	long_descrition : '',
	img : '',
	benefits : []
}

// About.collection.drop();

 // About.create(aboutseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });


// About.find({},(err,dt) => { console.log(dt)})






/*var servicesseed = {
	title :  'Services',
	short_description :  'Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus.',
	services : [
	{
	img :  'http://localhost:5000/uploads/services/mobile.svg',
	title :  'Mobile App Development',
	description : 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque',
	show_content_first : false
	},
	{
	img :  'http://localhost:5000/uploads/services/pc.svg',
	title :  'Software Development',
	description : 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque',
	show_content_first : true
	},
	{
	img :  'http://localhost:5000/uploads/services/marketing.svg',
	title :  'Digital Marketing',
	description : 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque',
	show_content_first : false
	},
	{
	img :  'http://localhost:5000/uploads/services/graphics.svg',
	title :  'Graphic Design',
	description : 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque',
	show_content_first : true
	}
	]
}
*/



var servicesseed = {
	title :  '',
	short_description :  '',
	services : []
}













// Services.collection.drop();

 // Services.create(servicesseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });


// Services.find({},(err,dt) => { console.log(dt)})





var weofferseed = {
	title :  'What We Offer',
	short_description :  'Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus.',
	offers : [
	{
	img :  'http://localhost:3000/img/programmer.svg',
	title :  'Qualified Engineers',
	description : 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque'
	},
	{
	img :  'http://localhost:3000/img/d-team.svg',
	title :  'Dedicated Team',
	description : 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque'
	},
	{
	img :  'http://localhost:3000/img/team-collaboration.svg',
	title :  'Collaborative Process',
	description : 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque'
	},
	{
	img :  'http://localhost:3000/img/supervision.svg',
	title :  'Continuous Supervision',
	description : 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque'
	}
	]
}



// WeOffer.collection.drop();

//  WeOffer.create(weofferseed,(err,ddfds) => {
//     if(err) console.log(err);
//     console.log(ddfds);
//  });


// WeOffer.find({},(err,dt) => { console.log(dt)})


/*
var careerseed = {
	title : 'JOIN US',
	description : 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Sed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id orci porta dapibus.',
	openings : [
  {
  title : 'Software Development Lead',
	designation : 'Engineering',
	description : '<div class="requirements"><div class="job-feature-title"><h5>Major Duties &amp; Responsibilities</h5></div><ul><li>Design, code, test and implement according to software design specifications following standard coding styles and practices.</li><li>Analyze the requirements and understand the deliverables.</li><li>Develop software solutions by studying information needs, systems flow, data usage, and work processes.</li><li>Document and demonstrate solutions by developing documentation, flowcharts, layouts, diagrams, charts, code comments and clear code.</li><li>Participate in code/design reviews after investigating current software development projects.</li><li>Seek out new technologies and ideas to add value to project.</li><li>Collaborate with team members and ensure knowledge transfer.</li></ul></div>',
	form_link : 'https://docs.google.com/forms/d/e/1FAIpQLSeI8_vYyaJgM7SJM4Y9AWfLq-tglWZh6yt7bEXEOJr_L-hV1A/viewform?formkey=dGx0b1ZrTnoyZDgtYXItMWVBdVlQQWc6MQ',
  link:'Software_Development_Lead_45334'
  },
  {
  title : 'Software Engineer',
	designation : 'Engineering',
	description : '<div class="requirements"><div class="job-feature-title"><h5>Major Duties &amp; Responsibilities</h5></div><ul><li>Design, code, test and implement according to software design specifications following standard coding styles and practices.</li><li>Analyze the requirements and understand the deliverables.</li><li>Develop software solutions by studying information needs, systems flow, data usage, and work processes.</li><li>Document and demonstrate solutions by developing documentation, flowcharts, layouts, diagrams, charts, code comments and clear code.</li><li>Participate in code/design reviews after investigating current software development projects.</li><li>Seek out new technologies and ideas to add value to project.</li><li>Collaborate with team members and ensure knowledge transfer.</li></ul></div>',
	form_link : '',
	link: 'Software_Engineer_34525'
  }
	]
}
*/

var careerseed = {
	title : '',
	description : '',
	openings : []
}


// Careers.collection.drop();

 // Careers.create(careerseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });


// Careers.find({},(err,dt) => { console.log(dt)})





var internseed = {
	name : "Jonson",
	position : "Backend Developer",
	description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, quos laborum quidem magnam rem quo ducimus veritatis. Iusto iure, dolorum similique qui quos nobis, adipisci enim ipsa possimus sapiente hic doloremque quae reiciendis. Ipsa incidunt nemo amet ipsum hic modi repudiandae recusandae odio voluptates cumque, totam sint ad similique laboriosam",
	duration : "Duration: 6 Month (September 2021-December 2021)",
	social_links : {
	  fb: "https://facebook.com",
		twitter : "https://twitter.com",
		instagram : "https://instagram.com",
		linkedIn : "",
  },
  img: "http://localhost:5000/uploads/interns/intern.png",
	projects : [
  {
  	title :  "A2 Series",
	  url : 'a2series.com'
  },
  {
  	title :  "Sourceround",
	  url : 'sourceround.com'
  }
	]
}

// Interns.collection.drop();

 // Interns.create(internseed,(err,ddfds) => {
 //    if(err) console.log(err);
 //    console.log(ddfds);
 // });


// Interns.find({},(err,dt) => { console.log(dt)})












// const s = () => { console.log("from the seed file") };
// s()

module.exports = SEED;






