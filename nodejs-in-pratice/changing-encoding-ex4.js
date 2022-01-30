// CHANGING STRING ENCODINGS USING BUFFERS
const mime = "image/png";
const encoding = "base64";
let uri = "data:"+mime+";"+encoding+",";
const fs = require("fs");
const data = fs.readFileSync("./monkey.png").toString(encoding);
console.log("data >> ", data);
uri = uri + data;
console.log("\n\n");
console.log("uri >> ", uri);

const recovData = uri.split(",")[1];
console.log("recovData >> ", recovData);
const buf = Buffer.from(recovData, "base64");
fs.writeFileSync("./recovMonkey.png", buf);