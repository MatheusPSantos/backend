// tell the stream we are ready to start reading.
process.stdin.resume();
process.stdin.setEncoding("utf-8");
// this callback transform the data in chunks
// when they are available
process.stdin.on("data", function(text) {
	process.stdout.write(text.toUpperCase());
});

