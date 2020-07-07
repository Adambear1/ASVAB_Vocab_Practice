require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require("axios");
const helmet = require("helmet");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./html-routes")(app);

app.listen(PORT, () => {
  `Listening on PORT ${PORT}`;
});

// const nodeMailer = require("nodeMailer");

// function sendEmail() {
//   //Set up email validation
//   var transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASS,
//     },
//   });
//   let mailOptions = {
//     from: process.env.EMAIL,
//     to: process.env.EMAIL,
//     subject: data,
//   };

//   //
//   var number = Math.floor(Math.random() * 10);
//   axios({
//     method: "GET",
//     url: "https://twinword-word-association-quiz.p.rapidapi.com/type1/",
//     headers: {
//       "content-type": "application/octet-stream",
//       "x-rapidapi-host": process.env.HOST,
//       "x-rapidapi-key": process.env.PASS,
//       useQueryString: true,
//     },
//     params: {
//       area: "sat",
//       level: JSON.stringify(number),
//     },
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
