/**
 * --- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
 */

const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

// Map x/y values for numbers and symbols respectively
const mapData = (inputRaw) => {
  const data = inputRaw.split('\n');
  let result = [];
  let regex = /\d+|[^.]/g;

  data.forEach((row, idx) => {
    while (match = regex.exec(row)) {
      result.push({
        y: idx,
        x: match.index,
        val: (!isNaN(match)) ? Number(match) : match[0],
      });
    }
  });

  return result;
};

const checkSurroundings = (num, symbols) => {
  // First filter check if symbols are in row +/- 1
  // Second filter check if symbol is within +/- 1 x value
  symbols = symbols.filter(s => (Math.abs(s.y - num.y) <= 1))
    .filter(s => ((s.x <= num.x + ('' + num.val).length) && (s.x >= num.x - 1)));

  return (symbols.length > 0) ? true : false;
};

const findParts = () => {
  const data = mapData(input);
  const nums = data.filter(n => !isNaN(n.val));
  const symbols = data.filter(s => isNaN(s.val));
  let sum = 0;

  console.log(nums);
  console.log(symbols);
  for (num of nums) {
    sum += checkSurroundings(num, symbols) ? num.val : 0;
  }

  return sum;
}

console.log(findParts());

// Answer: 553079