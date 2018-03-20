const url = require("url");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const buildUrl = require("build-url");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Restaurant = require("./models/restaurant.js");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.static(path.join(__dirname, "/node_modules/")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/", function(req, res) {
  var dict = req.body;
  var lactose = dict.lactose; // if chkd = true, else undefined
  var nut = dict.nut; // if chkd = true, else undefined
  var gluten = dict.gluten; // if chkd = true, else undefined
  var egg = dict.egg; // if chkd = true, else undefined
  Restaurant.find(
    {
      $or: [
        { lactose: lactose },
        { nut: nut },
        { gluten: gluten },
        { egg: egg }
      ]
    },
    { name: 1, lat: 1, lon: 1, _id: 0 },
    function(err, data) {
      res.send(data);
    }
  );
});

app.get("/tipsa", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/tipsa.html"));
});

app.get("/om", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/kontakt.html"));
});

app.post("/om", function(req, res) {
  var FName = req.body.first_name; //input from first_name
  var LName = req.body.last_name; //input from last_name
  var Email = req.body.email; // input from email
  var MailText = req.body.mail_text;

  var auth = {
    type: "oauth2",
    user: "Allergikartan@gmail.com", // Email address to auth
    clientId:
      "901695997643-qhgqk643jd3th72dqqr7u19rjhitmi5c.apps.googleusercontent.com", // Client ID from Google API center
    clientSecret: "BfzXQVv469R62L_ef8wZCSEf", // Client secret from google API center
    refreshToken: "1/dG3ZAIH02K6E_HYj_sbHAYcu1MQROdQ77zdznku-XTs" // refreshes the tokens, OAUTH playground google, this is not secured, we need to make it only go to allergikartan when the server is live.
  };

  var mailOptions = {
    from: "Allergikartan@gmail.com",
    to: "Allergikartan@gmail.com",
    subject: "KONTAKT",
    text: `${MailText}`,
    html: `<p> <strong>Från:</strong> ${FName} ${LName} </p>
	<p> ===========================================</p>
	<p> <strong>Email:</strong> ${Email} </p>
	<p> ===========================================</p>
	<p> <strong>Mailtext:</strong> <br>${MailText}</p>
	<p> ============================================</p>`
  };
  // Creates a transport protocoll for gmail
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: auth
  });
  // Sends the mail through the transporter
  transporter.sendMail(mailOptions, err => {
    if (err) {
      // Here we should enter a "mail was not sent" page
      console.log(err);
    } else {
      // "mail was sent page"
      res.redirect("/om/skickat");
    }
  });
});

app.get("/om/skickat", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/kontakt_sent.html"));
});

app.post("/tipsa", function(req, res) {
  var FName = req.body.first_name; //input from first_name :::: NOT USED RIGHT NOW ::::
  var LName = req.body.last_name; //input from last_name :::: NOT USED RIGHT NOW ::::
  var Email = req.body.email; // input from email
  var Restaurant = req.body.restaurant; //input from restaurant
  var Lat = req.body.lat;
  var Lng = req.body.lng;
  var Allergy = req.body.allergy; // Value från allergy.children
  var addURL = buildUrl("http://localhost:8080", {
    path: "tipsa/add",
    queryParams: {
      restaurant: Restaurant,
      lat: Lat,
      lng: Lng,
      allergy: Allergy
    }
  });

  var auth = {
    type: "oauth2",
    user: "Allergikartan@gmail.com", // Email address to auth
    clientId:
      "901695997643-qhgqk643jd3th72dqqr7u19rjhitmi5c.apps.googleusercontent.com", // Client ID from Google API center
    clientSecret: "BfzXQVv469R62L_ef8wZCSEf", // Client secret from google API center
    refreshToken: "1/dG3ZAIH02K6E_HYj_sbHAYcu1MQROdQ77zdznku-XTs" // refreshes the tokens, OAUTH playground google, this is not secured, we need to make it only go to allergikartan when the server is live.
  };

  var mailOptions = {
    from: "Allergikartan@gmail.com",
    to: "Allergikartan@gmail.com",
    subject: "Tips på restaurang",
    text: `${Restaurant}`,
    html: `<p> <strong>Tipsarens email:</strong> ${Email} </p>
	<p> ===========================================</p>
	<p> <strong>Tips på restaurang:</strong> ${Restaurant}</p>
	<p> ============================================</p>
	<p> <strong>Latitud:</strong> ${Lat}</p>
	<p> ============================================</p>
	<p> <strong>Longitud:</strong> ${Lng}</p>
	<p> ============================================</p>
	<p> <strong>Allergi på restaurang:</strong> ${Allergy}</p>
	<p> ============================================</p>
	<p> <strong>URL:</strong> <a href='${addURL}'>${addURL}</a></p>`
  };
  // Creates a transport protocoll for gmail
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: auth
  });
  // Sends the mail through the transporter
  transporter.sendMail(mailOptions, err => {
    if (err) {
      // Here we should enter a "mail was not sent" page
      console.log(err);
    } else {
      // Here we should render a "mail was sent page"
      res.redirect("/tipsa/skickat");
    }
  });
});

app.get("/tipsa/skickat", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/tips_sent.html"));
});

app.get("/tipsa/add", (req, res) => {
  var restaurantName = req.query.restaurant;
  var gluten;
  var lactose;
  var nut;
  var egg;
  var Allergy = req.query.allergy;

  allergyList = Allergy.split(",");
  for (i = 0; i < allergyList.length; i++) {
    if (allergyList[i] == "glutenfritt") {
      gluten = true;
    } else if (allergyList[i] == "laktosfritt") {
      lactose = true;
    } else if (allergyList[i] == "nötfritt") {
      nut = true;
    } else if (allergyList[i] == "äggfritt") {
      egg = true;
    }
  }
  var Lat = req.query.lat;
  var Lng = req.query.lng;
  Restaurant.create(
    //maps each value to the model.
    {
      name: restaurantName,
      address: "",
      city: "",
      gluten: gluten,
      lactose: lactose,
      nut: nut,
      lat: Lat,
      lon: Lng,
      egg: egg
    },
    function(err, small) {
      if (err) {
        console.log(err);
	  }
	  else{
		res.write('<h1>I databasen</h1>');
	  }
    }
  );

});

app.use(function(req, res, next) {
  // 404 error handling. KEEP IN BOTTOM OF EXPRESS
  res.status(404).sendFile(path.join(__dirname, "/public/404.html"));
});

app.listen(8080, () => {
  console.log("Allergikartan listening on port 8080");
  mongoose.connect(
    "mongodb://admin:admin@ds023373.mlab.com:23373/allergikartandb",
    function(error) {
      if (!error) {
        console.log("Databas startad");
      } else {
        console.log("======");
        console.log("Error starting db");
        console.log("======");
        console.log(error);
      }
    }
  );
});
