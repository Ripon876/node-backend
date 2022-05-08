const AdmZip = require("adm-zip");

async function Backup() {
  try {

    const zip = new AdmZip();
    const outputFile = "./public/backup/backup.zip";
    zip.addLocalFolder("./public/uploads");
    zip.writeZip(outputFile);
    console.log(`Created ${outputFile} successfully`);
    return '/backup/backup.zip';

  } catch (e) {

    console.log(`Something went wrong. ${e}`);
    return e;

  }
}
module.exports = Backup;