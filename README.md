# Reaktor preassignment for Summer 2021

https://www.reaktor.com/junior-dev-assignment/

The goal of this app was not to create the perfect solution for the problem. I just wanted to learn more about JavaScript promises, and how to solve a problem like this somewhat efficiently.

The front-end is really scuffed because I was more interested in solving the back-end issues and I had little interest in making the front-end or its code beautiful. It was mostly an afterthought, so please don't judge me too harshly based on it. I just quickly made something that works and gets the job done.

## The app is running here:

https://r-preassn.herokuapp.com/


### A few comments from me:
I could have made my own database and store the data there, but I think it could go against the spirit of the assignment. This would have been faster than using the provided slow legacy API.

I only use the provided API because I can't know how often the data there gets updated, and how often I would have to update my own database accordingly.

I thought of using a cache to store the data on client-side, but I considered that to be overengineering.

There is a unused file called "incomplete-solution-with-then-chain.js". That's where I tried to solve the problem with promises and .then() chaining, but I was not satisfied with the code. I then decided to create the solution with async/await which, in my opinion, is way prettier.

There are some minor details in the code that I could refactor to look prettier, but it's good to know when to put the pen down.