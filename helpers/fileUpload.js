var path = require("path");


const UploadFile  = function(file,name,folderName) {

   var status = false;
   var msg;
   var ext = file.name.split(".").reverse()[0];
   var fileName = name + '.' +  ext;
   var filepath = path.join('./public/uploads/', fileName);
   if(folderName){
   	 filepath = path.join('./public/uploads/',folderName, fileName);
   }

			if (file.size > 10048576) {

				console.log('overflowed')
				return false;
			}else{
				

				file.mv(filepath)
			}
 
if(folderName){
	return `/uploads/${folderName}/${fileName}`;
}else{
	return `/uploads/${fileName}`;
}


}

module.exports = UploadFile;