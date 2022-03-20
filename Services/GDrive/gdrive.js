const fs = require("fs");
const Jimp = require("jimp");
const gDriverAuth = require("./gdrive-auth");
const { google } = require('googleapis');

function imageUpload(base64img) {
    return new Promise((resolve, reject) => {
        gDriverAuth(async (auth) => {
            try{
                const newFile = Date.now() + '.jpg';
                const buffer = Buffer.from(base64img, "base64");
                const image = await Jimp.read(buffer);
                // Resize the image to width 150 and auto height.
                await image.resize(300, Jimp.AUTO);

                // Save and overwrite the image
                await image.quality(60).writeAsync(newFile);

                uploadToGDrive(newFile, auth)
                    .then(async (info) => {
                        console.log("Part 1");
                        fs.unlink("./" + newFile, (err) => {
                            if (err) {
                                console.log("./" + newFile, ' not deleted');
                                console.log(err);
                            } else {
                                console.log("./" + newFile, ' was deleted');
                            }
                            resolve(info);
                        });
                    })
                    .catch(error => {
                        reject(error)
                    })                   
            } catch(e) {
                console.log(e);
                reject(e)
            }
        })
    })
}


async function uploadToGDrive(fileName, auth){
    return new Promise((resolve, reject) => {
        var folderId = '1qEuomrL7x-mPTYfUVDF_kwMhca-T868i';
        const fileMetadata = {
            name: fileName,
            parents: [folderId]
        };

        const media = {
            mimeType: "image/jpeg",
            body: fs.createReadStream('./'+fileName)
        }

        const drive = google.drive({ version: 'v3', auth });
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
                reject(err);
            } else {
                console.log("file.data.id");
                console.log(file.data.id);
                resolve(file.data.id);
            }
        });  
    })     
  
}
module.exports = { imageUpload };