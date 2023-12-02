import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const sampleInput = await readFile(
  fileURLToPath(new URL("./input.txt", import.meta.url)),
  {
    encoding: "utf-8",
  }
);

const NUMBER_MAP = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function main() {
  let finalSum = 0;
  for (const lines of sampleInput.split("\n")) {
    let firstNum, secondNum;
    const matches = lines
      .trimEnd()
      .matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/gi);

    for (const match of matches) {
      let number;
      const value = match[1];
      if (!value) return;

      const parsedValue = parseInt(value, 10);

      if (value in NUMBER_MAP) number = NUMBER_MAP[value];
      else if (Number.isInteger(parsedValue)) number = parsedValue;

      if (!firstNum && number) firstNum = number;
      else if (firstNum && number) secondNum = number;
    }

    if (secondNum === undefined) secondNum = firstNum;

    finalSum += Number(`${firstNum}${secondNum}`);
  }

  console.log({ finalSum });
}

main();
