//Lecture 82.17 get the file system
const fs = require("fs");
//Lecture 82.6 Create file middlewares:imageUpload.js
module.exports = async function (req, res, next) {
  //Lecture 82.7 add try catch
  try {
    //Lecture 82.9 cl
    // console.log("welcome form middleware");
    // next();

    //Lecture 82.13 when there is no file
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files selected." });
    }
    //Lecture 82.14 get the files
    let files = Object.values(req.files).flat();
    //Lecture 82.15 for each
    files.forEach((file) => {
      //Lecture 82.16 if not image unsupported format
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp"
      ) {
        //Lecture 82.18 call remove temp
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format." });
      }
      //Lecture 82.19 check file size
      if (file.size > 1024 * 1024 * 5) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File size is too large." });
      }
    });
    //Lecture 83.0 Upload Images to Cloudinary part 2, call next()
    next();
  } catch (error) {
    //Lecture 82.8 return error message
    return res.status(500).json({ message: error.message });
  }
};

//Lecture 82.17 define removeTmp
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
