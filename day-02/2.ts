import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const sampleInput = await readFile(
  fileURLToPath(new URL("./input.txt", import.meta.url)),
  {
    encoding: "utf-8",
  }
);

function main() {
  let total = 0;

  for (const line of sampleInput.split("\n")) {
    let maxRed = 1,
      maxBlue = 1,
      maxGreen = 1;
    const parsed = line.trimEnd().match(/^Game (?<game>\d+): (?<sets>.*)?$/);

    for (const set of parsed?.groups.sets?.split(";")) {
      for (const match of set.trim().matchAll(/(\d+) (red|blue|green)/g)) {
        const cubes = Number(match[1]);
        if (match[2] === "red") maxRed = Math.max(maxRed, cubes);
        if (match[2] === "blue") maxBlue = Math.max(maxBlue, cubes);
        if (match[2] === "green") maxGreen = Math.max(maxGreen, cubes);
      }
    }

    total += maxBlue * maxGreen * maxRed;
  }

  console.log({ total });
}

main();
