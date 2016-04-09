var request=require('request');
var fs=require('fs');
var open=require('open');
var http = require('http');
var Jacob=require('./FixThisJacob.js');

var x=process.argv[2];
var crappyWindows=new Jacob();
x=crappyWindows.fixURL(x);
//send the request
request(x,function(error,response,body){
	if(!error&&response.statusCode==200){
		// parse the body to JSON
		body=JSON.parse(body);
		// parse back in a format that will make it look nice
		body=JSON.stringify(body,null,4);
		// create the .html file with the results from the search
		fs.writeFile('message.html',body,(err) => {
			if (err) {
				console.log(err);}
		});
		// create a server that will serve the file
		http.createServer(function (request, response) {
		    response.writeHead(200, {'Content-Type': 'text/plain'});
		    response.end(body);
		}).listen(8080);
		// open the url that houses the file
		open('http://localhost:8080/');
	}
});

// get the data in a usable format
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd
} 
if(mm<10) {
    mm='0'+mm
} 
today = mm+'/'+dd+'/'+yyyy;

// create a variable for the log entry
var log = 'New Search: '+x+' - Date: '+today+'\n';

// add the log entry to the log.txt file
fs.appendFile('log.txt',log,(err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('It\'s saved!')
	}
  
});

