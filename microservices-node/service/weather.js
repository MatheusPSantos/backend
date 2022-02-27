let request = require("request");
const apiKey = "";
const apiUrl ="";

let weather = {
	find: (req , res, next) => {
		request(apiUrl + apiKey + "/weather.json" + req.params.weather,
			function(error, response, body) {
				if(!error && response.statusCode === 200) {
					response = JSON.parse(body);
					res.send(response);
				}else {
					console.log(response.statusCode + response.body);
					res.send("An error occured, it could be from your api");
			}
		);
	},
};
