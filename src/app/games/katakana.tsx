"use client";
import type {FlattenedOptions, Row} from "@/schema";

import React, {useState} from "react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {OPTIONS, flattenedRows} from "@/data/katakanas";
import {flattenOptionsByRow, randomLetterWithoutRepeat, randomOption} from "@/lib/data-mutators";
import {useStatus} from "@/hooks/use-status";

const TIME_TO_LOSE = 10;

export function KatakanaGame() {
  const {state, ...stateControls} = useStatus();
  const [score, setScore] = useState(0);

  const [currentLetter, setCurrentLetter] = useState<FlattenedOptions[number] | null>(null);
  const [configurationToGame, setConfigurationToGame] = useState<{
    letters: Row[] | null;
    type: "hiragana" | "katakana";
  }>({
    letters: null,
    type: "katakana",
  });

  const [currentOptions, setCurrentOptions] = useState<FlattenedOptions | null>(null);
  const [timer, setTimer] = useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout>();
  const startGame = () => {
    stateControls.startGame();
    setScore(0);
    setCurrentLetter(randomOption(flattenOptionsByRow(OPTIONS, configurationToGame.letters)));
    setTimer(0);
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    setCurrentOptions(flattenOptionsByRow(OPTIONS, configurationToGame.letters));
  };

  React.useEffect(() => {
    if (timer >= TIME_TO_LOSE) {
      stateControls.loseGame();
      clearInterval(intervalRef.current);
    }
  }, [timer, stateControls]);

  const handleAnswer = (answer: string) => {
    if (currentLetter?.romaji === answer) {
      setScore(score + 1);
      setCurrentLetter(
        randomLetterWithoutRepeat({
          options: currentOptions ?? [],
          currentLetter,
        }),
      );
      setTimer(0);
      intervalRef.current && clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);

      return;
    } else {
      stateControls.loseGame();
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-md flex-col items-center gap-4">
      <div className="text-center">
        <h2
          className={cn(
            "mb-2 flex flex-col items-center text-2xl font-medium",
            state === "playing" && "blur-sm",
          )}
        >
          <span>Japanusi Game</span>

          <span className="text-jp">カタカナ ゲーム</span>
        </h2>
        <span className="text-xs">
          By{" "}
          <a className="text-green-400" href="https://fabroos.com">
            Fabroos
          </a>
        </span>
      </div>
      {state === "idle" && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                checked={configurationToGame.type === "hiragana"}
                id="hiragana"
                name="type"
                type="radio"
                onChange={(e) =>
                  e.target.checked &&
                  setConfigurationToGame((p) => ({
                    ...p,
                    type: "hiragana",
                  }))
                }
              />
              {/* japanese */}
              <label htmlFor="hiragana">ひらがな</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                checked={configurationToGame.type === "katakana"}
                id="katakana"
                name="type"
                type="radio"
                onChange={(e) =>
                  e.target.checked &&
                  setConfigurationToGame((p) => ({
                    ...p,
                    type: "katakana",
                  }))
                }
              />
              {/* japanese */}
              <label htmlFor="katakana">カタカナ</label>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {flattenedRows.map((row) => (
              <Button
                key={row}
                type="button"
                variant={
                  configurationToGame.letters === null
                    ? "default"
                    : configurationToGame.letters.includes(row)
                      ? "default"
                      : "ghost"
                }
                onClick={() => {
                  setConfigurationToGame((p) => ({
                    ...p,
                    letters:
                      p.letters === null
                        ? [row]
                        : p.letters.includes(row)
                          ? p.letters.filter((r) => r !== row)
                          : p.letters.concat(row),
                  }));
                }}
              >
                {row}
              </Button>
            ))}
          </div>
          <Button type="button" onClick={startGame}>
            Start
          </Button>
        </div>
      )}
      {state === "playing" && (
        <div className="flex flex-col items-center">
          <p className="text-gray-600">Score: {score}</p>
          <p className="text-gray-600">Time: {TIME_TO_LOSE - timer}</p>
          <p className="text-5xl font-bold">{currentLetter?.katakana}</p>
          <div className="my-4 flex flex-wrap items-center justify-center gap-2">
            {currentOptions?.map((option) => (
              <Button
                key={option.katakana}
                type="button"
                onClick={() => handleAnswer(option.romaji)}
              >
                {option.romaji}
              </Button>
            ))}
          </div>
        </div>
      )}
      {state === "lose" && (
        <div className="flex flex-col items-center gap-4">
          <p>Game over!</p>
          <p>Score: {score}</p>
          <div className="flex gap-2">
            <Button type="button" onClick={startGame}>
              Try again
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                stateControls.resetGame();
                clearInterval(intervalRef.current);
              }}
            >
              Back to menu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
