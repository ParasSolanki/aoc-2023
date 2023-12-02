import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const sampleInput = await readFile(
  fileURLToPath(new URL("./input.txt", import.meta.url)),
  {
    encoding: "utf-8",
  }
);

const EXPECTED = {
  red: 12,
  green: 13,
  blue: 14,
};

function main() {
  let gameTotal = 0;

  for (const line of sampleInput.split("\n")) {
    let isPossible = true;
    const parsed = line.trimEnd().match(/^Game (?<game>\d+): (?<sets>.*)?$/);
    const gameNumber = Number(parsed?.groups.game);

    for (const set of parsed?.groups.sets?.split(";")) {
      for (const match of set.trim().matchAll(/(\d+) (red|blue|green)/g)) {
        if (Number(match[1]) > EXPECTED[match[2]]) {
          isPossible = false;
          break;
        }
      }
    }

    if (isPossible) {
      gameTotal += gameNumber;
    }
  }

  console.log({ gameTotal });
}

main();
