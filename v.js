// var prompt = require('prompt');

//   //
//   // Start the prompt
//   //
//   prompt.start();

//   //
//   // Get two properties from the user: username and email
//   //
//   prompt.get(['username', 'email'], function (err, result) {
//     //
//     // Log the results.
//     //
//     console.log('Command-line input received:');
//     console.log('  username: ' + result.username);
//     console.log('  email: ' + result.email);
//   });


// var stdin = process.openStdin();

// stdin.addListener("data", function(d) {
//     // note:  d is an object, and when converted to a string it will
//     // end with a linefeed.  so we (rather crudely) account for that  
//     // with toString() and then trim() 
//     console.log("you entered: [" + 
//         d.toString().trim() + "]");
//   });


  const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  console.log('Thank you for your valuable feedback:', answer);
  rl.close();
});