var path = require('path');

function Jacob(){
	this.fixURL=function(url){
		var returnString = url.toLowerCase();
		    if(url.search("https:\\\\") != -1){
		    	returnString=url.substring(6, url.length);}
		    if(path.sep === '\\')
		    {   returnString = returnString.replace(/\\/g, '/');   }
		    return "https:/"+returnString;
		    console.log(returnString);}}


module.exports = Jacob;