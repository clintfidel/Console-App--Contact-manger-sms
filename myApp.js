'use strict';

let vorpal = require('vorpal')();
console.log("WELCOME TO MY CONTACT MANAGER!!")
console.log("An app that allows you add a contact to your database, search for an existing contact,,sends a text to a contact.\n")
console.log("Guide:\t")
console.log("Follow this guide and you are on your way to exploring this great app.")
console.log(' add -n "name" -p "phoneNumber " : "adds a contact " ', 'search "name": searches for a contact name and returns the number\n, text (name) -m: sends a message to a contact')

let fireBase = require('./functs.js')
vorpal
  .command('add <name> <phoneNumber>', 'Add user datas')
  .option('-n, --name', "Adds full name e.g 'Andela Clinton' ")
  .option('-p, --phoneNumber', "Adds phone number e.g 080******** ")
  .description('Outputs "save".')
  .action(function(args, callback) {
    let new_number = args.phoneNumber; //Convert user input to a string so we can get the length
    let fullName = args.name;
    new_number = "0" + new_number.toString();
    let contactName = fullName.split(" "); //Splitting the names value to get first and last name
    //if(fullName.length > 3 && new_number.length===11){ //Validate the length of user's input
    if (fireBase.addToDataBase(contactName[0], contactName[1], new_number)) {

      console.log("Added Successfully!")
    }

    callback();
  });

vorpal
  .command('search <name>', 'searches for a users data')
  .option('search', "searchs for users firstname e.g 'Andela' ")
  .description('Outputs "search"')
  .action(function(args, callback) {
    var searchTerms = args.name;
    fireBase.search(searchTerms);
    // var arrayOfSameName = fireBase.search(searchTerms)
    callback();
  });

// vorpal
//    .command('text <name>', 'Sends sms to contact')
//    .option('-m,--text <message>', "Sends specified message to user")
//    .description('Outputs "search"')
//    .action(function(args, callback) {
//     var new_num= args.name;
//     var new_message= args.text
//      fireBase.sendSms(07038399928, new_message);
//      // if(fireBase.sendSms===search)
//      console.log("text successfully sent")
//     callback();
//   });     

vorpal
  .delimiter('Contact-App$')
  .show();

// function checkName(name){
//  if(name.match(/[w_]/+)){
//    return true;
//  }
//  return false;
// }

// function checkNum(num){
//  if(num.match(/[\d]/)){
//    return true;
//  }
//  return false;
// }