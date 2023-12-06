/**
 * --- Part Two ---
Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.

The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range. So, in the first line of the example above:

seeds: 79 14 55 13
This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.

Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.

In the above example, the lowest location number can be obtained from seed number 82, which corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and location 46. So, the lowest location number is 46.

Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?
 */

const fs = require('fs');
const { performanceWrapper } = require('../utils/utils');
const { input, testInput } = require('./input');

const partTwo = () => {
  const lines = input.split('\n');

  let seeds = [];
  let mapName = '';
  const maps = {};
  let currentNum;
  let minLocation = Infinity;

  // Original seeds
  seeds = lines.find((val) => val.includes('seeds')).match(/\d+/g).map(Number);

  // Create destination-source maps
  lines.forEach((line) => {
    if (line && !line.includes('seeds')) {
      if (line.includes('-to-')) {
        mapName = line.split(' ')[0];
        if (!maps[mapName]) maps[mapName] = [];
      } else {
        const [dest, source, range] = line.split(' ');
        maps[mapName].push({
          d: Number(dest),
          s: Number(source),
          r: Number(range),
        });
      }
    }
  });

  // Seed search
  seeds.forEach((seed, idx) => {
    if ((idx + 1) % 2 === 0) {
      for (let i = 0; i < seed; i++) {
        let destinationNum = currentNum;
        for (const map in maps) {
          for (let m of maps[map]) {
            let offset = -(m.d - m.s);

            if (destinationNum >= m.s && destinationNum <= m.s + m.r) {
              destinationNum = destinationNum - offset;
              break;
            }
          };
        }

        if (destinationNum < minLocation) minLocation = destinationNum;
        currentNum++;
      }
    } else {
      currentNum = seed;
    }
  });

  console.log(minLocation);
  return minLocation;
};

const solve = async () => {
  await performanceWrapper(partTwo);
}

solve();

// Answer: 108956227