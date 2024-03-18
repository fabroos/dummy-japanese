"use client";
import type {FlattenedOptions, Row} from "@/schema";

import React, {useCallback, useEffect, useState} from "react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {OPTIONS, flattenedRows} from "@/data/katakanas";
import {flattenOptionsByRow, randomLetterWithoutRepeat} from "@/lib/data-mutators";
import {useStatus} from "@/hooks/use-status";
import {useQueue} from "@/hooks/use-queue";

const TIME_TO_LOSE = 10;

const useGameControls = () => {
  const intervalRef = React.useRef<NodeJS.Timeout>();
  const [timer, setTimer] = useState(0);
  const [currentLetter, setCurrentLetter] = useState<FlattenedOptions[number]>();
  const [currentOptions, setCurrentOptions] = useState<FlattenedOptions>([]);
  const [configurationToGame, setConfigurationToGame] = useState({
    type: "katakana" as "katakana" | "hiragana",
    letters: null as Row[] | null,
  });
  const [score, setScore] = useState(0);
  const {state, ...stateControls} = useStatus();
  const {addItem, queue, setMaxItems, resetQueue} = useQueue<FlattenedOptions[number]>([], {
    maxItems: 5,
  });

  const startGame = () => {
    setTimer(0);
    const lettersToPlay = flattenOptionsByRow(OPTIONS, configurationToGame.letters);

    setCurrentLetter(
      randomLetterWithoutRepeat({
        options: lettersToPlay,
      }),
    );
    setCurrentOptions(lettersToPlay);
    intervalRef.current = setInterval(() => {
      setTimer((p) => p + 1);
    }, 1000);

    // set the max items to the half of the items to play
    setMaxItems(Math.floor(lettersToPlay.length / 2));
    stateControls.startGame();
  };

  const handleAnswer = (romaji: string) => {
    if (currentLetter && currentLetter.romaji === romaji) {
      setScore((p) => p + 1);
      setCurrentLetter(
        randomLetterWithoutRepeat({currentLetter, options: currentOptions, prevOptions: queue}),
      );
      setTimer(0);
      addItem(currentLetter);
    } else {
      clearInterval(intervalRef.current);
      loseGame();
    }
  };

  const loseGame = useCallback(() => {
    clearInterval(intervalRef.current);
    stateControls.loseGame();
    resetQueue();
  }, [stateControls, resetQueue]);

  const restartGame = () => {
    clearInterval(intervalRef.current);
    stateControls.resetGame();
    resetQueue();
  };

  useEffect(() => {
    if (timer >= TIME_TO_LOSE) {
      loseGame();
      setTimer(0);
    }
  }, [timer, loseGame]);

  console.log(queue);
  const game = {
    configurationToGame,
    setConfigurationToGame,
    startGame,
    handleAnswer,
    loseGame,
    state,
    score,
    timer,
    currentLetter,
    currentOptions,
    restartGame,
  };

  return game;
};

export function KatakanaGame() {
  const game = useGameControls();

  return (
    <div className="mx-auto flex max-w-screen-md flex-col items-center gap-4">
      <div className="text-center">
        <h2
          className={cn(
            "mb-2 flex flex-col items-center text-2xl font-medium",
            game.state === "playing" && "blur-sm",
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
      {game.state === "idle" && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                checked={game.configurationToGame.type === "hiragana"}
                id="hiragana"
                name="type"
                type="radio"
                onChange={(e) =>
                  e.target.checked &&
                  game.setConfigurationToGame((p) => ({
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
                checked={game.configurationToGame.type === "katakana"}
                id="katakana"
                name="type"
                type="radio"
                onChange={(e) =>
                  e.target.checked &&
                  game.setConfigurationToGame((p) => ({
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
                  game.configurationToGame.letters === null
                    ? "default"
                    : game.configurationToGame.letters.includes(row)
                      ? "default"
                      : "ghost"
                }
                onClick={() => {
                  game.setConfigurationToGame((p) => ({
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
          <Button type="button" onClick={game.startGame}>
            Start
          </Button>
        </div>
      )}
      {game.state === "playing" && game.currentLetter ? (
        <div className="flex flex-col items-center">
          <p className="text-gray-600">Score: {game.score}</p>
          <p className="text-gray-600">Time: {TIME_TO_LOSE - game.timer}</p>
          <p className="text-5xl font-bold">{game.currentLetter[game.configurationToGame.type]}</p>
          <div className="my-4 flex flex-wrap items-center justify-center gap-2">
            {game.currentOptions.map((option) => (
              <Button
                key={option.katakana}
                type="button"
                onClick={() => game.handleAnswer(option.romaji)}
              >
                {option.romaji}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
      {game.state === "lose" && (
        <div className="flex flex-col items-center gap-4">
          <p>Game over!</p>
          <p>Score: {game.score}</p>
          <div className="flex gap-2">
            <p>
              The correct answer was:{" "}
              <span className="font-bold">
                {game.currentLetter ? game.currentLetter.romaji : ""}
              </span>
            </p>
            <Button type="button" onClick={game.startGame}>
              Try again
            </Button>
            <Button type="button" variant="destructive" onClick={game.restartGame}>
              Back to menu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
