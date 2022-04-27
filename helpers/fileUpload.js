var path = require("path");


const UploadFile  = function(file,name) {

   var status = false;
   var msg;

			if (file.size > 1048576) {
				return false;
			}else{
				var ext = file.name.split(".").reverse()[0];
            var fileName = name + '.' +  ext;

				file.mv(path.join(__dirname, '../public/uploads/', fileName))
			}
 

return `/uploads/${fileName}`;

}

module.exports = UploadFile;