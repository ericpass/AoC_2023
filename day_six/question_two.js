/**
 * --- Part Two ---
As the race is about to start, you realize the piece of paper with race times and record distances you got earlier actually just has very bad kerning. There's really only one race - ignore the spaces between the numbers on each line.

So, the example from before:

Time:      7  15   30
Distance:  9  40  200
...now instead means this:

Time:      71530
Distance:  940200
Now, you have to figure out how many ways there are to win this single race. In this example, the race lasts for 71530 milliseconds and the record distance you need to beat is 940200 millimeters. You could hold the button anywhere from 14 to 71516 milliseconds and beat the record, a total of 71503 ways!

How many ways can you beat the record in this one much longer race?
 */

const fs = require('fs');
const { input, testInput } = require('./input');

const partOne = () => {
  const lines = input.split('\n');

  const time = lines[0].split(':')[1].replace(/\s/g, '');
  const duration = lines[1].split(':')[1].replace(/\s/g, '');

  console.log(time);
  console.log(duration);

  let winningNums = 0;
  for (let i = 0; i < time; i++) {
    if ((i * (time - i)) > duration) {
      winningNums++;
    }
  }

  return winningNums;
}

console.log(partOne());

// Answer: 34123437