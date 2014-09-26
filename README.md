proj1
=====

Game of Life
My design for the program was essentially a large matrix of state machines, where
each cell has 2 states, on and off (0 and 1). Because each cell is dependent on all
its neighboring cells, I chose to keep two copies of the matrix of states. This way
changing one cell wouldn't affect the outcome of any neighbor that has yet to be
processed. Basically the live matrix that is used to draw updates based on the matrix
containing the previous state, then is copied over to the previous state matrix to
prepare for the next iteration. I chose to have random initial conditions because
it satisfies the requirement of using different start states, and at the same time
introduces cool new patterns every time the page is refreshed. To satisfy the
infinite requirement, I made the matrix wrap around because it is fairly easy to
follow as a user, and adds a more complete experience in my opinion. Admittedly my
aesthetic appeal could've been better, but I played around with several looks and
ended up with something better than what I started with. My testing was pretty basic,
ensuring that the step function worked. However I couldn't find a way to test the
graphic portion so I left it without tests. The random generator test simply ensures
that the correct matrix size is produced. Overall, I think my design was pretty good
engineering-wise with adequate testing, but not so much aesthetically. I will work
to improve that next week.

Notes on running: see lines 25-31
init(); runs the program
runTests(); runs the tests
Please don't run both at the same time

Also I'm sorry that everything is in one file. It sucks I know (especially
the tests) but that's what it said to do on Piazza so I'm just following
instructions. :P

Here are my github links to my line numbers you should look at:

Closure and its purpose:
https://github.com/6170-fa14/gjvargas_proj1/blob/master/life.js#L1-L4

Switch case with simplified logic
https://github.com/6170-fa14/gjvargas_proj1/blob/master/life.js#L86-L99

Timeout callback for consistency when updating automatically:
https://github.com/6170-fa14/gjvargas_proj1/blob/master/life.js#L144-L146

Could you provide feedback on this comment:
https://github.com/6170-fa14/gjvargas_proj1/blob/master/life.js#L69-L76


//////////////////////////
Final submission
So I added hexagonal functionality, and changed the conditions for more excitement.
Now a cell only lives if it has 3 or 5 neighbors, and is born if it has 2 neighbors.
I also add user input, start, stop and randomize. NOt much to say, much of this was leftover
code from the beta.

More links:

Hexagon css that I'm proud of
https://github.com/6170-fa14/gjvargas_proj1/blob/master/life.css#L12-23

Used functionals to create DOM just like in class :)
https://github.com/6170-fa14/gjvargas_proj1/blob/master/life.js#L16-45

New custom logic for hexagonal number of neighbors
https://github.com/6170-fa14/gjvargas_proj1/blob/master/life.js#L136-151

New survival/reproduction logic for optimal hexagonal excitement
https://github.com/6170-fa14/gjvargas_proj1/blob/master/life.js#L106-120

Note: to run tests, uncomment runtests button and click on html page. Output in console.
