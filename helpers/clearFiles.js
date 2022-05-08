var Filehound = require('filehound');
var path = require("path");
var fs = require('fs');



const  clearFiles = ()=> {

var folders = []
Filehound.create()
  .path(path.join(__dirname,'../public/uploads'))
  .directory()  
  .find()
  .then((directories) => {
  	directories.forEach((dir)=> {

  	 folders.push(dir.split('\\').reverse()[0]);

  	})
  })
  .then(()=> {
  	folders.forEach((folder)=> {

		var folder = path.join(__dirname , '../public/uploads/' + folder + '/');

		fs.readdir(folder, (err, files) => {

		  if (err) throw err;

		  for (const file of files) {

		      console.log(file + ' : File Deleted Successfully.');

		      fs.unlinkSync(folder+file);

		  }
		  
		});


  	})
  })

}

 
module.exports = clearFiles;