// CHANGING STRING ENCODINGS USING BUFFERS

let user = "jhonny";
let password = "c-bad";
let authString = user + ":" + password;
console.log(authString);
const buf = new Buffer(authString);
console.log(buf);
const encoded = buf.toString("base64");
console.log(encoded);