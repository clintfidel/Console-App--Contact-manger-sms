'use strict';

let vorpal = require('vorpal')();
const chalk = require('chalk');
let CLI = require('clui');
var Spinner  = CLI.Spinner;
var status = new Spinner('Fetching from database, please wait...');
console.log(chalk.bold.blue("\n"+ "WELCOME TO MY CONTACT MANAGER!!"))

console.log("An app that allows you add a contact to your database,"+ 
  "search for an existing contact, sends a text to a contact.\n")

console.log("Guide:\t")

console.log("Follow this guide and you are on your way "+
  " to exploring this great app.")

console.log("add -n " +chalk.bold.red("<name> -p <phoneNumber>:") + " "  + 
  "Adds contact to database" + "\n"+
" search <name>: searches for a contact " +"\n" +
" text <name> -m <message>: sends sms to specified contact");

let fireBase = require('./functs.js')
vorpal
  .command('add <name> -p <phoneNumber>', 'Add user datas')
  .option('-n, --name', "Adds full name e.g 'Andela Clinton' ")
  .option('-p, --phoneNumber', "Adds phone number e.g 080******** ")
  .description('Outputs "save".')
  .action(function(args, callback) {
    let new_number = args.phoneNumber; //Convert user input to a string so we can get the length
    let fullName = args.name;
    new_number = "0" + new_number.toString();
    let contactName = fullName.split(" "); //Splitting the names value to get first and last name
    if(fullName.length > 3 && new_number.length===11  && contactName[1] != undefined){ //Validate the length of user's input

      if (fireBase.addToDataBase(contactName[0], contactName[1], new_number)) {
        console.log("Added Successfully!")
      }

    }
    else if(contactName[1] === undefined){
      console.log(chalk.bold.red("Invalid name entered: use the add -n command to enter your 'firstname and lastname' "  ))
    }

    else {
      console.log(chalk.bold.red("Invalid details supplied!!/Enter a valid name and phonenumber"))
    }
       
    callback();
  });

vorpal
  .command('search <name>', 'searches for a users data')
  .option('search', "searchs for users firstname e.g 'Andela' ")
  .description('Outputs "search"')
  .action(function(args, callback) {
    var searchTerms = args.name;
      fireBase.searchContact(searchTerms)
    
  });

vorpal
   .command('text <name>', 'Sends sms to contact')
   .option('-m, --message', "Sends specified message to user")
   .description('Outputs "send sms"')
   .action(function(args, callback) {
    var name = fireBase.searchForSms(args.name);
    var new_message = args.message;
     name.then(fireBase.sendSms(name, new_message), console.log("error"))
    
     
    callback();
  });     

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