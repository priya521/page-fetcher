const fs = require('fs');
const request = require('request');
const args = process.argv.slice(2);


request(args[0], (error, response, body) => {
  if (error) {
    console.log("Error - closing");
    return null;
  } if (response && response.statusCode < 200 || response && response.statusCode > 299) {
    console.log(`Error - ${response && response.statusCode}`);
    return null;
  }
  let buffer = new Buffer.from(body);

  fs.open(args[1], 'w', function(err, fd) {
    if (err) {
      console.log("Error");
    } else {
      fs.write(fd, buffer, function(err, bytes) {
        if (err) {
          console.log('Error');
        } else {
          console.log(`Downloaded and saved ${bytes} to ${args[1]}`);
        }
      });
    }
  });
});