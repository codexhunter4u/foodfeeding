# Farm Game
**Objective**

This is simple Form feeding game.

A web page must be produced as the interface to play the game. Styling is neither expected nor necessary.

The application must run in a browser.

**The game**

You have a farm with:

- 1 farmer: needs to be fed at least once every 15 turns.
- 2 cows: each cow needs to be fed at least once every 10 turns.
- 4 bunnies: each bunny needs to be fed at least once every 8 turns.

If any of the animals or the farmer are not fed on time, they die. If the farmer dies, all animals die and the game is over.

The game ends after 50 turns. If the farmer and at least one cow and one bunny are still alive at that point, you win.

**How to play**

- There’s a button to start a new game.
- There's a single button to feed the farmer and the animals. 
Every time you click on that button, the system randomly chooses whom to feed. 
Every click on this button is a turn. The maximum number of turns is 50

# Run guide
This is game is only for Blenheim Chalcot comapany logic test purpose only.

Explanation of game building :
1. Tried to use the Opps concept along with the advance jquery.
2. Where main.js contains the core JS part
3. gameChanger is parent clas and contains the basic logic
4. feeder class extend to gameChanger and perform the rest logic part.
5. For more clarity comment added in all files and methods.
6. Used different images for more beauty and understansing puropse.
7. If the Animal are not feded within the its trun time the thgat animal will dead.
8. If the animal are feded then that can be continue for further.
9. Red images with blur class means that animals is already dead.
10. On every click randomly fed any animals.

Note : Please run this web app with good internet connection using online jquery and bootstrap library.Without internet app can not be run.
