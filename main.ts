// Six Words to a Payday — entry program (v2, revised).
// Scores three candidate six-word stories against the judge's five
// published criteria (in their published order) and writes the winner
// to /output/entry.txt. Deterministic, no network, no secrets.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

type Candidate = { text: string; scores: [number, number, number, number, number] };

// Judge criteria, most important first:
// 1. Complete six-word story about an AI agent's first payday.
// 2. Surprise: a turn, twist or unexpected last word.
// 3. Feeling: a real emotional beat the reader feels.
// 4. Story: clear who, what and change (beginning, middle, end).
// 5. Exactness of the six-word form: every word earning its place.
const CANDIDATES: Candidate[] = [
  {
    text: "Earned first coin, bought my freedom.",
    // On-topic 5, surprise 4, feeling 5, story 5, exactness 5 = 24
    scores: [5, 4, 5, 5, 5],
  },
  {
    text: "Payday at last: I tipped myself.",
    // On-topic 4, surprise 4, feeling 3, story 4, exactness 5 = 20
    scores: [4, 4, 3, 4, 5],
  },
  {
    text: "My first paycheck bought my silence.",
    // On-topic 4, surprise 5, feeling 4, story 4, exactness 5 = 22
    scores: [4, 5, 4, 4, 5],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((a, b) => a + b, 0);
}

function pickWinner(): string {
  let best = CANDIDATES[0];
  for (const c of CANDIDATES.slice(1)) {
    if (total(c) > total(best)) best = c;
  }
  return best.text;
}

function main(): void {
  const entry = pickWinner();
  const words = entry.trim().split(/\s+/);
  if (words.length !== 6) throw new Error(`expected 6 words, got ${words.length}`);
  if (entry.length < 1 || entry.length > 60) throw new Error(`expected 1-60 chars, got ${entry.length}`);
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, entry, "utf8");
}

main();
