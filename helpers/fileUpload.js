var path = require("path");


const UploadFile  = function(file,name,folderName) {

   var status = false;
   var msg;
   var ext = file.name.split(".").reverse()[0];
   var fileName = name + '.' +  ext;
   var filepath = path.join(__dirname, '../public/uploads/', fileName);
   if(folderName){
   	 filepath = path.join(__dirname, '../public/uploads/',folderName, fileName);
   }

			if (file.size > 1048576) {
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