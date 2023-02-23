const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("./todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("0.0.0.0:4000", grpc.credentials.createInsecure());
const text = process.argv[2];

client.createTodo({
  "id": -1,
  "text": text,
}, (err, res) => {
  console.log("Received from server: ", JSON.stringify(res));
});

// client.readTodos(null, (err, res) => {
//   console.log(`>>> ${JSON.stringify(res)}`);
// });

client.readTodosStream(null, (err, res) => {
  console.log(`read the todos from server ${JSON.stringify(res)}`);
  if(res.items) {
    res.items.forEach(a => console.log(a.text));
  }
});

const call = client.readTodosStream();
call.on('data', item => {
  console.log(`Received item from server `, JSON.stringify(item));
})
call.on('end', e => {
  console.log(`Server done.`);
  process.exit(0);
});