let CountStream = require("./countstream.js");
let countStream = new CountStream("Book");

let http = require("http");

http.get("http://www.manning.com", function (res) {
	console.log("res: ",res); 
	res.pipe(countStream);
});

countStream.on("total", function (count) {
	console.log("Total matches: ", count);
});
