let assert = require("assert");
let CountStream = require("./countstream");
let countStream = new CountStream("example");
let fs = require("fs");
let passed = 0;

countStream.on("total", (count) => {
	assert.equal(count, 1);
	passed ++;
});

fs.createReadStream(__filename).pipe(countStream);

process.on("exit", () => {
	console.log("Assertions passed:", passed);
} );
