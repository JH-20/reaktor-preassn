# Reaktor preassignment for Summer 2021

https://www.reaktor.com/junior-dev-assignment/

The goal of this app was not to create the best possible solution for the problem. I just wanted to learn more about JavaScript promises, and how to solve a problem like this somewhat efficiently. Now I'm really confident in my ability to code asynchronous JS.

The front-end is really scuffed because I was more interested in solving the back-end issues and I had little interest in making the front-end or its code beautiful. It was mostly an afterthought, so please don't judge me too harshly based on it. I just quickly made something that works and gets the job done.

I also wanted to keep things appropriately light for a simple task like this, so I decided to just use Deno and create a simple single-page-app.

## The app is running here:

https://r-preassn.herokuapp.com/


### A few comments from me:
The app fetches the data from Reaktors API every 5 minutes, since that's how often the cache gets refreshed there.

I decided to create my own API in /api/products to work around CORS. This was before I came up with my final solution, and is just a relic of the past now. I still decided to fetch the data in a client-side script from my own API as a little practise for myself.

There is a unused file called "incomplete-solution-with-then-chain.js". That's where I tried to solve the problem with promises and .then() chaining, but I was not satisfied with the code. I then decided to create the solution with async/await which, in my opinion, is way prettier.

There are some minor details in the code that I could refactor to look prettier, but it's good to know when to put the pen down.