'use strict';
let vorpal = require('vorpal')();
let config = require('./config'); //importing the config file
let firebase = require('firebase'); //importing the firebase module
const chalk = require('chalk');
let Jusibe = require('jusibe');
let jusibe = new Jusibe("fa2b6a5fe2019548f05b34f17819d5a1", "8c5e94d8c3fe93c4da9d5c087ac32a9a");
firebase.initializeApp(config);
let database = firebase.database(); //creating an instance of firebase
let ref = database.ref("/users");
let stdin = process.openStdin();
const readline = require('readline');
let  getDataFromDataBase = {

  addToDataBase: function(firstName, lastName, phoneNumber) {
    database.ref('/users').push({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    })
    return true;
  },

  fetchFromDataBase: function() {
    ref.on("value", function(snapshot) {
        let valx = snapshot.val();
        console.log(Object.values(valx));
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

  },

  searchContact: function(searchTerm) {
    ref.on("value", function(snapshot) {
      var valx = snapshot.val();
      var data = Object.values(valx);
      var bool = false;
      var myArr = [];
      for (var i = 0; i < data.length; i++) {
        if (searchTerm === data[i].firstName) {
          myArr.push([data[i], data[i].lastName, 1]);
        } else if (searchTerm === data[i].lastName) {
          myArr.push([data[i], data[i].firstName, 2]);
        }
      }
      if (myArr.length === 0) {
        console.log("The name can not be found");
      } else if (myArr.length === 1) {
        console.log("The number is: " + myArr[0][0].phoneNumber);
      } else {
        var message = "Which " + searchTerm + "?";
        for (var j = 0; j < myArr.length; j++) {
          message = message + "  " + "[" + (j + 1).toString() + "]" + " " + myArr[j][1];
          bool = true;
        }
      }
      const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      if (bool) {
        readLine.question(message + " ", (answer) => {
          console.log("\n" + "The number is: " + "\n" + "------------------" + "\n" 
            + myArr[answer][0].phoneNumber + "\n" + "------------------ " + "\n"
            + "To successfully continue: " + chalk.bold.white("press CTRL + C"));
          // rl.close();
          return true;
        });

      }
    });
  },

  searchForSms: function(searchTerm) {
    ref.on("value", function(snapshot) {
      var valx = snapshot.val();
      var data = Object.values(valx);
      var bool = false;
      var myArr = [];
      for (var i = 0; i < data.length; i++) {
        if (searchTerm === data[i].firstName) {
          myArr.push([data[i], data[i].lastName, 1]);
        } else if (searchTerm === data[i].lastName) {
          myArr.push([data[i], data[i].firstName, 2]);
        }
      }
      if (myArr.length === 0) {
        console.log("The name can not be found");
        
      } else if (myArr.length === 1) {
        return(myArr[0][0].phoneNumber);

      } else {
        var message = "Which " + searchTerm + "?";
        for (var j = 0; j < myArr.length; j++) {
          message = message + "  " + "[" + (j + 1).toString() + "]" + " " + myArr[j][1];
          bool = true;
        }
      }
      const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      if (bool) {
        readLine.question(message + " ", (answer) => {
          return(myArr[answer][0].phoneNumber);
          // rl.close();
        });

      }
    });
  },


  sendSms: function(num, msg) {
    let payload = {
      to: num,
      from: 'Clintfidel',
      message: msg
    };

    jusibe.sendSMS(payload, function(err, res) {
      if (res.statusCode === 200)
        console.log(res.body);
      else
        console.log(err);
    });
  },

  // deleteContact: function(name, phoneNumber){
  //   ref.on("value", function(snapshot) {
  //       let valx = snapshot.val();
  // }

  // function(errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // }
}
module.exports = getDataFromDataBase;