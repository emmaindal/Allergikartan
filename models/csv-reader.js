const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("fast-csv");
const Restaurant = require("./restaurant.js");
// The model the csv i mapped on to

mongoose.connect(
  "mongodb://admin:admin@ds023373.mlab.com:23373/allergikartandb",
  function(error) {
    if (!error) {
      console.log("databas funkar");
      fileReader();
    }
  }
);


function fileReader() {
  let csvStream = csv.fromPath("Restauranter-excel.csv").on("data", function(record) {
    //the file you want to read from
    csvStream.pause();
    //stops stream after each row
    let stringToSplit = record[0];
    console.log(stringToSplit)


    splittedString = stringToSplit.split(",");


    Restaurant.create(
      //maps each value to the model. 
      {
        name: splittedString[0],
        address: splittedString[1],
        city: splittedString[2],
        gluten: splittedString[3],
        lactose: splittedString[4],
        nut: splittedString[5],
        lat: splittedString[6],
        lon: splittedString[7]
      },
      function(err, small) {
        if (err) {
          console.log(err);
        }

      }
    );
  csvStream.resume();
  //resumes stream with next row in csv-file.
  });
}
