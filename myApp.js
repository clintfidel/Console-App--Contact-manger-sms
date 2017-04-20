'use strict';

let vorpal = require('vorpal')();
let fireBaseAdd = require('./functs.js');
 vorpal
   .command('add <name> [phoneNumber]', 'Add user datas')
   .option('-n, --name', "Adds full name e.g 'Andela Clinton' ")
   .option('-p, --phoneNumber', "Adds phone number e.g '080********' ")
   .description('Outputs "save".')
   .action(function(args, callback) {
    let fullName = args.name;
   	let contactName = fullName.split(" "); //Splitting the names value to get first and last name
    let new_number = "0" + args.phoneNumber ; //Convert user input to a string so we can get the length
   	//if(fullName.length > 3 && new_number.length===11){ //Validate the length of user's input
   		if(fireBaseAdd.addToDataBase(contactName[0], contactName[1], new_number)){
      // console.log(fireBaseAdd.fetchFromDataBase())
      console.log(new_number);
   		console.log("Added Successfully!")
   	}
   	// else{
   	// 	console.log("Invalid Details supplied!")
   	// }
      
     callback();
   });

   vorpal
   .command('search <name> [phoneNumber]', 'searches for a users data')
   // .option('search', "searchs for users firstname e.g 'Andela' ")
   // .description('Outputs "search"')
   .action(function(args, callback) {
    var searchTerm = args.name;
    //var contactList; //fetch 
    var searchResult = search(searchTerm);

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