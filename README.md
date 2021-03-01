# Reaktor preassignment for Summer 2021

https://www.reaktor.com/junior-dev-assignment/

The goal of this app was not to create the best possible solution for the problem. I just wanted to learn more about JavaScript promises, and how to solve a problem like this somewhat efficiently. Now I'm really confident in my ability to code asynchronous JS.

The front-end is really scuffed because I was more interested in solving the back-end issues and I had little interest in making the front-end or its code beautiful. It was mostly an afterthought, so please don't judge me too harshly based on it. I just quickly made something that works and gets the job done.

I also wanted to keep things appropriately light for a simple task like this, so I decided to just use Deno and create a simple single-page-app.

It takes a while for the server to start up, because it loads the data from Reaktors API which can take anywhere from 10 to 60 seconds before the legacy API answers properly.

NOTE: After submitting this assignment on 28.2. I then tried my app again the next day. The legacy API had a new bug where it would send an empty body as a response to the API call. Previously the only bug I encountered was when the API returned an object like this {code: 200, response: '[]'} instead of the correct data. I then updated my app to not crash no matter what the /v2/availability API sends me.

## The app is running here:

https://r-preassn.herokuapp.com/


### A few comments from me:
The server fetches the data from Reaktors API every 5 minutes, since that's how often the cache gets refreshed there. It can then be retrieved from my own API.

I decided to create my own API in /api/products to work around CORS. This was before I came up with my final solution, and is just a relic of the past now. I still decided to fetch the data in a client-side script from my own API as a little practise for myself, and to make the page just a bit faster to load.

Initially I didn't want to store the provided data locally, as I thought that would go against the spirit of the problem, but I then decided to do so anyway after I realised how awfully slow the provided API is.

There is a unused file called "incomplete-solution-with-then-chain.js". That's where I tried to solve the problem with .then() chaining, but I was not satisfied with the code. I then decided to create the solution with async/await which, in my opinion, is way prettier.

There are some minor details in the code that I could refactor to look prettier, but it's good to know when to put the pen down.