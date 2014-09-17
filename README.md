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

Here are my github links to my line numbers:
