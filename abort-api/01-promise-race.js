const url = "http://localhost:3000";

import assert from "assert";

async function race(request, limitTimeout) {
  const limiter = new Promise((r, rej) => setTimeout(rej, limitTimeout))
  Promise.race([
    request,
    limiter
  ])
}

const limitTimeout = 500;
try {

  const fetchResult = await race(fetch(url), limitTimeout);
  console.log(await fetchResult.json());
} catch (error) {
  console.log('Error:', error)
}
