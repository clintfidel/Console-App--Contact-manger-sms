#!/usr/bin/env node
'use strict'
// let commander = require('commander'); //importing the commander module

// program
//   .version('0.0.1')
//   .command('add -n <name> -p <phone number>')
//   .description('Add Contact Name and Phone Number')
//   .action(addToDatabase);
// program.parse(process.argv);

let firebase = require('firebase'); //importing the firebase module
// var app= new Firebase('https://contact-app-6b6bf.firebaseio.com/');
// var contact = app.child('contact');

// Initialize Firebase
let config = {
    apiKey: "AIzaSyARUZbjkSUM7EauigO2SUS6uP8SSJTywR8",
    authDomain: "contact-app-6b6bf.firebaseapp.com",
    databaseURL: "https://contact-app-6b6bf.firebaseio.com",
    projectId: "contact-app-6b6bf",
    storageBucket: "contact-app-6b6bf.appspot.com",
    messagingSenderId: "568467816603"
  };
firebase.initializeApp(config);

let database = firebase.database().ref(); //creating an instance of firebase


let addToDatabase = ( firstName,lastName, phoneNumber) =>{
 	database.push ({		
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
  });
}
	


 addToDatabase('clinton' , 'fidelis', 09091624937);


 

 //  let ref = firebase.app().database().ref();
	// ref.once('value')
 // .then(function(snap) {
 // console.log("snap.val()", snap.val());
 // });

// program
//   .version('0.0.1')
//   .command('add -n <name> -p <phone number>')
//   .description('Add Contact Name and Phone Number')
//  // .option('Search <name>','Search for contact name')
//  // .option('<name> -m <message>','Send SMS notification to contact')
//   .action('');
// program.parse(process.argv);