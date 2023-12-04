/**
 * --- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
 */

const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');
// const input = ['oneeightwoneightnineeighttwo']
// const input = ['onedcqlqcrzn66three',
//   '1fourjthreefc2gbtbdzsix',
//   'eight7two4258',
//   '4hmfzdzf',
//   '26dsmdzznm7',
//   'plckvxznnineh34eight2',
//   'dhrvd4eightgxznhqmh',
//   '5fxhhkghvm3nineshpcxhtwo6fourhrktpbq'
// ]
const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const numMap = new Map([
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9'],
]);

const buildDigit = (str) => {
  let firstNum = undefined;
  let lastNum;
  let strTrace = '';
  // onedcqlqcrzn66three
  str.split('').forEach((ch) => {
    if (!isNaN(ch)) {
      if (!firstNum) firstNum = ch;
      lastNum = ch;
      strTrace = '';
    } else {
      strTrace = strTrace + ch;
      // console.log(strTrace);

      nums.some(val => {
        if (strTrace.includes(val)) {
          // console.log('found', val);
          if (!firstNum) firstNum = numMap.get(val);
          lastNum = numMap.get(val);
          strTrace = strTrace[strTrace.length - 1];
          // strTrace = '';
          return true;
        }

        return false;
      })
    }
  });

  console.log(str);
  console.log(firstNum.concat(lastNum));
  return firstNum.concat(lastNum);
};

const answerTheQuestion = () => {
  const numbers = [];

  input.forEach((str) => {
    const adjustment = buildDigit(str);
    numbers.push(adjustment);
  });

  // console.log(numbers);

  return numbers.reduce((a, c) => {
    return Number(a) + Number(c);
  })
};

console.log(answerTheQuestion(input));

// Answer: 53340
