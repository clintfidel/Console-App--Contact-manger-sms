'use strict';
var config = require('./config');
let firebase = require('firebase'); //importing the firebase module

firebase.initializeApp(config);
var database = firebase.database(); //creating an instance of firebase

module.exports = {
  addToDataBase: function(firstName,lastName, phoneNumber){
    database.ref('/users').push ({        
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
  })
  return true;
  },

  fetchFromDataBase: function(){
    let childData = [];
    let dbRef = firebase.database().ref();
    let dataRef=dbRef.child('users')
    dataRef.limitToLast(6).once('value').then( function(snapshot){
      var snapVal = snapshot.val();
      snapVal.forEach(function(childSnapshot){
       childData.push(childSnapshot.firstName);
       let childData = childSnapshot.val();
      });
    })
      
  },

  search: function(item) {

    return firebase.database.ref().child('users')
                          .orderBy('firstName')
                          .equalTo(item);
  }
}
