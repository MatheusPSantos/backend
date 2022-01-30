const EventEmitter = require("events").EventEmitter;
function complexOperations() {
	let events = new EventEmitter();
	process.nextTick(function(){
		events.emit("success");
	});
	return events;
}

complexOperations().on("success", function() {
	console.log("succes!!!!");
});
