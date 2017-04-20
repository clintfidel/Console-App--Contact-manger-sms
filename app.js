const vorpal = require('vorpal')();
 
vorpal
  .command('add <Name> [phoneNumber]')
  .option('-n, --name ', 'Print full name required. Andela Clinton')
  .option('-p, --phoneNumber ', 'Print phone number.080********')
  .description('Outputs "save".')
  .action(function(args, callback) {
	if (args.name && args.phoneNumber) {
  	this.log(args)
  }
  else{
  	    this.log(invalid name || invalid phoneNumber);

  }
  });

    callback();
 
  vorpal
  .command('search <Name> [phoneNumber]')
  .description('Outputs "search".')
  .validate(function (args) {
    if (args.search === contact) {
      return phoneNumber;
    } 
    else if(name[1]===name){
      return 'which andela ?'+ 'james'+','+'hellen' + 'or' + 'joshua';
    }
    else{
    	return contact
    }
    }
  })
  .action(allowInside);

//   vorpal
//   .command('text <message> [phoneNumber]')
//   .option('-m, --name ', 'Print foobar instead.')
//   .option('-p, --phoneNumber ', 'Print foobar instead.')
//   .description('Outputs "save".')
//   .action(function(args, callback) {
// if (args.options.name) {
//   	this.log(args)
//   }
//     this.log('save');

//     callback();
//   });
 
vorpal
  .delimiter('contactsApp')
  .show();
module.exports