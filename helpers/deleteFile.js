const fs = require('fs/promises');
const path = require("path");



const deleteFile  = (fileName,folderName) => {
	var errMsg;
	var filepath = path.join('./public/uploads/', fileName);
	if(folderName){
	   	 filepath = path.join('./public/uploads/',folderName, fileName);
	}



	fs.unlink(filepath)
	.then((err) => {
      if(err){
      	errMsg = err;
      	console.log(err)
      } 

	})

if(errMsg != undefined){
	return false;
}else{
	return true;
}

}

module.exports = deleteFile;