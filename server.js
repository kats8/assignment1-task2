const bodyParser = require('body-parser');
var express = require("express");
var port = process.env.PORT || 8080;
var nodemailer = require('nodemailer');

//creates transporter for emailing service (provides gmail account and password for authorisation)
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'SIT725.heartbreakers@gmail.com',
    pass: 'sit725hb'
  }
});

//creates express application
app = express();

//required for using bodyparser to extract body from incoming request stream
app.use(bodyParser.json());

//for serving static webpage/files (in public folder)
app.use(express.static(__dirname + '/public'));

app.post('/sendMessage', (req, res) => {
  //sets default "from" and "subject"; extracts "to" address and message content from incoming request body
  let mailOptions = {
    from: 'SIT725.heartbreakers@gmail.com',
    to: String(req.body.toAddress),
    subject: 'You have a new match!',
    text: String(req.body.message)
  };
  //send mail using transporter
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

app.listen(port);
console.log("Listening on port ", port);