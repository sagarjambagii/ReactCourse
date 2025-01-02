//Lecture 08.0 Let's setup the basic backend
////Lecture 08.0 cd .\backend\, npm init -y, npm i express,create server.js
const express = require("express");
//Lecture 10.0 Cors fully explained and setup with the server
//Lecture 10.0 npm i cors
const cors = require("cors");
//Lecture 14.0 Environment variables npm i dotenv, Create .env in Backend floder
const dotenv = require("dotenv");
dotenv.config();
//Lecture 16.1 npm i mongodb mongoose
const mongoose = require("mongoose");
//Lecture 12.6 dynamica routing
const { readdirSync } = require("fs");
//Lecture 82.11 npm i express-fileupload
const fileUpload = require("express-fileupload");

//Lecture 08.1 headers *,
const app = express();
//Lecture 18.0 Working with JSON and explaining HTTP response status codes
app.use(express.json());

//Lecture 10.2 - Optional
// const options = {
//   origin: "http://localhost:8000",
//   useSuccessStatus: 200,
// };
//Lecture 10.4 - Optional
// let allowed = ["http://localhost:8000", "other links"];
// function options(req, res) {
//   let tmp;
//   let origin = req.header();
//   if (allowed.indexOf(origin) > -1) {
//     tmp = {
//       origin: true,
//       optionSuccessStatus: 200,
//     };
//   } else {
//     tmp = {
//       origin: "stupid",
//     };
//   }
//   res(null, tmp);
// }
// app.use(cors(options));

//Lecture 10.1 Postman: Create a collection-facebook,add request: text cors get:http://localhost:8000, send request
app.use(cors());
//Lecture 10.2 - Optional
// app.use(cors(options));
//Lecture 82.12 app.use
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Lecture 08.3
//Lecture 12.0 Let's setup routes: Create Routes Folder: user.js
// app.get("/", (req, res) => {
//   res.send("welcome from home");
// });
//Lecture 08.3
//Lecture 12.0 Let's setup routes
// app.get("/books", (req, res) => {
//   res.send("hahahahahahahhahahaaiidhiagduogauodhguagdigaiduygiuagduagdiu");
// });

//Lecture 12.5
// const useRoutes = require("./routes/user");
// app.use("/", useRoutes);
//Lecture 12.6 dynamica routing
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//Lecture 16.2 Connect to mongodb
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

//Lecture 14.2
const PORT = process.env.PORT || 8000;
//Lecture 08.2 node server.js
//Lecture 08.4 npm i nodemon
// app.listen(8000, () => {
//   //Lecture 08.2
//   console.log("server is lestining...");
// });
//Lecture 14.2
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
