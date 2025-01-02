//Lecture 83.1 npm i cloudinary
const cloudinary = require("cloudinary");
//Lecture 83.1 get the file system
const fs = require("fs");
//Lecture 83.1 cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//Lecture 82.2 create controllers:upload.js
exports.uploadImages = async (req, res) => {
  //Lecture 82.3 adding trycatch
  try {
    //Lecture 82.5 json response, postman: localhost:3000/uploadimage : in body: formdata, type file
    // res.json("welcome from image upload");

    //Lecture 83.2 get the path
    const { path } = req.body;
    //Lecture 83.3 get the files
    let files = Object.values(req.files).flat();
    //Lecture 83.4 def images array
    let images = [];
    for (const file of files) {
      //Lecture 83.5 upload img get url
      const url = await uploadToCloudinary(file, path);
      //Lecture 83.6 push url
      images.push(url);
      //Lecture 83.17 removeTmp
      removeTmp(file.tempFilePath);
    }
    //Lecture 83.7 return images
    res.json(images);
  } catch (error) {
    //Lecture 82.4 return error message
    return res.status(500).json({ message: error.message });
  }
};

//Lecture 98.8 create listImages fn
exports.listImages = async (req, res) => {
  //Lecture 98.9 get data from body
  const { path, sort, max } = req.body;

  //Lecture 98.10 search in cloudinary
  cloudinary.v2.search
    .expression(`${path}`)
    .sort_by("created_at", `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      //Lecture 98.11 return the result
      res.json(result);
    })
    .catch((err) => {
      //Lecture 98.12 catch the error , postman :get : http://localhost:8000/listImages, raw:json, {"path":"sagarjambagi/post_images","sort":"desc","max":30}
      console.log(err.error.message);
    });
};

//Lecture 83.8 def uploadToCloudinary
const uploadToCloudinary = async (file, path) => {
  //Lecture 83.9 return promise
  return new Promise((resolve) => {
    //Lecture 83.10 cloudinary upload
    cloudinary.v2.uploader.upload(
      //Lecture 83.11 file wanted to upload
      file.tempFilePath,
      {
        //Lecture 83.12 path to upload
        folder: path,
      },
      (err, res) => {
        //Lecture 83.13 if we have error
        if (err) {
          //Lecture 83.15 removeTmp and return err
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "Upload image failed." });
        }
        //Lecture 83.16 if no error resolve url
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

//Lecture 83.14 define removeTmp
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
