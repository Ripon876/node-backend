const fs = require('fs/promises');
const path = require("path");



const deleteFile  = (filename) => {
	var errMsg;
	fs.unlink(path.join(__dirname, '../public/uploads/', filename))
	.then((err) => {
      if(err) errMsg = err;
	})

if(errMsg != undefined){
	return false;
}else{
	return true;
}

}

module.exports = deleteFile;