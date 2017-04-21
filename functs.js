'use strict';
var config = require('./config'); //importing the config file
let firebase = require('firebase'); //importing the firebase module
let prompt = require('prompt'); //Importing the prompt module

firebase.initializeApp(config);
var database = firebase.database(); //creating an instance of firebase
var ref = database.ref("/users");


var getDataFromDataBase = {
  addToDataBase: function(firstName,lastName, phoneNumber){
    database.ref('/users').push ({        
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
  })
  return true;
  },

  fetchFromDataBase: function(){
    ref.on("value", function(snapshot) {
  var valx = snapshot.val();
  console.log(Object.values(valx));
  }, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
  },
 search: function(searchTerm){
    ref.on("value", function(snapshot) {
      var valx = snapshot.val();
      var data = Object.values(valx);
      var myArr = [];
  for(var i = 0; i < data.length; i++){
      if(searchTerm === data[i].firstName){
        myArr.push([data[i],data[i].lastName, 1]);
      }
      else if(searchTerm === data[i].lastName){
        myArr.push([data[i], data[i].firstName, 2]);
      }
    }
    if(myArr.length === 0){
      console.log("The name can not be found");
    }
    else if(myArr.length === 1){
      console.log("The number is: " + myArr[0][0].phoneNumber);
    }
    else{
      var mess = "Which " + searchTerm + "?";
      for(var j = 0; j < myArr.length; j++){
        mess = mess + "  " + "[" + (j+1).toString() + "]" + " " + myArr[j][1];
      }
    }
    console.log(mess);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

  
}
}

module.exports = getDataFromDataBase;