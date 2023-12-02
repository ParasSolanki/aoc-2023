import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const sampleInput = await readFile(
  fileURLToPath(new URL("./input-1.txt", import.meta.url)),
  {
    encoding: "utf-8",
  }
);

function main() {
  let finalSum = 0;

  for (const lines of sampleInput.split("\n")) {
    let firstNum,
      secondNum = undefined;

    for (const value of lines.trimEnd().split("")) {
      const num = parseInt(value, 10);
      const isNumber = Number.isInteger(num);

      if (!firstNum && isNumber) firstNum = num;
      else if (firstNum !== undefined && isNumber) secondNum = num;
    }

    if (secondNum === undefined) secondNum = firstNum;

    finalSum += Number(`${firstNum}${secondNum}`);
  }

  console.log({ finalSum });
}

main();
