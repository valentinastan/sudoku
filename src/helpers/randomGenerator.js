export function getRandomIntInclusive(min, max) {
  const nums = new Set();
  min = Math.ceil(min);
  max = Math.floor(max);

  while (nums.size < 9) {
    nums.add(Math.floor(Math.random() * (max - min + 1) + min));
  }

  console.log([...nums]);
  return [...nums];
}

export function getRandomNextLine(prev = [[]]) {
  const nums = new Set();
  let min = 1;
  let max = 9;
  min = Math.ceil(min);
  max = Math.floor(max);

  while (nums.size < 9) {
    let generated = Math.floor(Math.random() * (max - min + 1) + min);
    prev?.map(prevLine => {
      if (prevLine[nums.size] !== generated) {
        nums.add(generated);
      }
    });
  }
  return [...nums];
}

export function getAllLines(first) {
  // console.log('FIRST', first)
  let lines = [];
  lines.push(first);
  console.log("FIRST", [first], lines[0]);
  // let nums = generate(lin);
  // const nums = new Set();
  // let min = 1;
  // let max = 9;
  // min = Math.ceil(min);
  // max = Math.floor(max);

  // while (nums.size < 9) {
  //   let generated = Math.floor(Math.random() * (max - min + 1) + min);
  //   prev?.map(prevLine => {
  //     if (prevLine[nums.size] !== generated) {
  //       nums.add(generated);
  //     }
  //   });
  // }
  [1, 2].map(el => {
    console.log(el, "xxx-apelez generate cu ", lines);
    let nums = generate(lines);
    lines.push([...nums]);
  });

  // while (lines.length < 9) {
  //   // console.log('in while', lines.length, lines)
  //   console.log('apelez generate cu ', lines)
  //   // let nums = generate(lines);
  //   lines.push(1);
  // }
  console.log("lines:", lines, lines.length);
  return lines;
}

function generate(prev) {
  // console.log('PREV', prev)
  const nums = new Set();
  let min = 1;
  let max = 9;
  min = Math.ceil(min);
  max = Math.floor(max);
  // let comparedArray = prev.map(line => {
  //   console.log("line,", line)
  //   console.log('line de size', line[nums.size], nums.size)
  //   return line[nums.size];
  // });
  // console.log('compared array', comparedArray)
  console.log("size", nums.size);
  while (nums.size < 8) {
    let generated = Math.floor(Math.random() * (max - min + 1) + min);
    let comparedArray = prev.map(line => {
      console.log("line,", line);
      console.log("line de size", line[nums.size], nums.size);
      return line[nums.size];
    });
    console.log("compared array", comparedArray, generated);
    // comparedArray.map(el => {
      // console.log('PREV LINE', prevLine,nums.size, prevLine[nums.size], generated)
      if (comparedArray.indexOf(generated) === -1) {
      // if (el !== generated) {
        nums.add(generated);
        console.log("nums", nums);
      } else {
      }
    // });
  }
  return [...nums];
}
