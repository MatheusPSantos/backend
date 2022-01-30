let fs = require("fs");
fs.readFile("names.txt", function (error, buf) {
    let validation = Buffer.isBuffer(buf);
    console.log(validation);
});