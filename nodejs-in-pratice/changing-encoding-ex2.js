let fs = require("fs");
fs.readFile("names.txt", function (error, buf) {
    console.log(buf.toString());
    // console.log(buf.toString("ascii"));
    console.log("\n", buf.toString("hex"));
});