const express = require("express");
const weatherApp = express();

const port = 5000;

const routes = require("./api/routes");
routes(weatherApp);

weatherApp.listen(port, () => {
	console.log(`Server is running in port: ${port}`);
});
