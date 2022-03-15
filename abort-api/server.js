import { createServer } from 'http';

const result = {
  name: "UsersName",
  age: "23",
  profession: "software engineer",
};
const MAX_TIMEOUT = 20;
async function handler(request, response) {
  await setTimeout(() => {

    return response.end(JSON.stringify(result));
  }, MAX_TIMEOUT);
}


createServer(handler)
  .listen(3000)
  .on('listening', () => console.log("server listing 3000"));

