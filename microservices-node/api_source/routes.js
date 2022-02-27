const controller = require("./controller");

module.exports = function(weatherApp) {
	weatherApp.route("/about").get(controller.about);
	weatherApp.route("/weather").get(controller.getWeather);
};
