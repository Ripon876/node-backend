var AdmZip = require("adm-zip");
var path = require("path");
var clearFiles = require('../helpers/clearFiles');

const Restore = async (file)=> {
console.log(file)




await clearFiles();
await  file.mv(path.join('./public/backup/restore.zip'))

await restoreBackup();
await restoreBackup();

}


module.exports = Restore;



function  restoreBackup() {
  
  try {

    var zip = new AdmZip(path.join('./public/backup/restore.zip'));
    zip.extractAllTo("./public/uploads/", true);
   return true;
  }
  catch (err) {
      console.log(err)
      return false;
  }
}