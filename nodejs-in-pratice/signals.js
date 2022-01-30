process.stdin.resume();
process.on("SIGHUP", function(){
	console.log("Reloading configuration...");
});

console.log("PID: ", process.pid);
