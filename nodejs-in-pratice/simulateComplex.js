function monitor() {
	console.log(process.memoryUsage());
}

let id = setInterval(monitor, 12000);
id.unref();

setTimeout(function () {
	console.log("Done!");
}, 500);
