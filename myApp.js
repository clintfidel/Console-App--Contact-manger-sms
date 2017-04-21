'use strict';

let vorpal = require('vorpal')();
let fireBase = require('./functs.js');
 vorpal
   .command('add -n <name> <phoneNumber>', 'Add user datas')
   .option('-n, --name', "Adds full name e.g 'Andela Clinton' ")
   .option('-p, --phoneNumber', "Adds phone number e.g 080******** ")
   .description('Outputs "save".')
   .action(function(args, callback) {
    let new_number = args.phoneNumber; //Convert user input to a string so we can get the length
    let fullName = args.name;
    new_number = "0" + new_number.toString();
   	let contactName = fullName.split(" "); //Splitting the names value to get first and last name
   	//if(fullName.length > 3 && new_number.length===11){ //Validate the length of user's input
   	if(fireBase.addToDataBase(contactName[0], contactName[1], new_number)){
      fireBase.fetchFromDataBase();
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
    

    callback();
  });     




 vorpal
   .delimiter('Contact-App$')
   .show();

  // function checkName(name){
  // 	if(name.match(/[w_]/+)){
  // 		return true;
  // 	}
  // 	return false;
  // }

  // function checkNum(num){
  // 	if(num.match(/[\d]/)){
  // 		return true;
  // 	}
  // 	return false;
  // }