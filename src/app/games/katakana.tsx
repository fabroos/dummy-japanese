"use client";
import React, {useState} from "react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface Letter {
  hiragana: string;
  katakana: string;
  romaji: string;
}

type Options = Record<string, Letter[]>;

const OPTIONS: Options = Object.entries({
  a: [
    {
      hiragana: "あ",
      katakana: "ア",
      romaji: "a",
    },
    {
      hiragana: "い",
      katakana: "イ",
      romaji: "i",
    },
    {
      hiragana: "う",
      katakana: "ウ",
      romaji: "u",
    },
    {
      hiragana: "え",
      katakana: "エ",
      romaji: "e",
    },
    {
      hiragana: "お",
      katakana: "オ",
      romaji: "o",
    },
  ],
  ka: [
    {
      hiragana: "か",
      katakana: "カ",
      romaji: "ka",
    },
    {
      hiragana: "き",
      katakana: "キ",
      romaji: "ki",
    },
    {
      hiragana: "く",
      katakana: "ク",
      romaji: "ku",
    },
    {
      hiragana: "け",
      katakana: "ケ",
      romaji: "ke",
    },
    {
      hiragana: "こ",
      katakana: "コ",
      romaji: "ko",
    },
  ],
  sa: [
    {
      hiragana: "さ",
      katakana: "サ",
      romaji: "sa",
    },
    {
      hiragana: "し",
      katakana: "シ",
      romaji: "shi",
    },
    {
      hiragana: "す",
      katakana: "ス",
      romaji: "su",
    },
    {
      hiragana: "せ",
      katakana: "セ",
      romaji: "se",
    },
    {
      hiragana: "そ",
      katakana: "ソ",
      romaji: "so",
    },
  ],
  ta: [
    {
      hiragana: "た",
      katakana: "タ",
      romaji: "ta",
    },
    {
      hiragana: "ち",
      katakana: "チ",
      romaji: "chi",
    },
    {
      hiragana: "つ",
      katakana: "ツ",
      romaji: "tsu",
    },
    {
      hiragana: "て",
      katakana: "テ",
      romaji: "te",
    },
    {
      hiragana: "と",
      katakana: "ト",
      romaji: "to",
    },
  ],
  na: [
    {
      hiragana: "な",
      katakana: "ナ",
      romaji: "na",
    },
    {
      hiragana: "に",
      katakana: "ニ",
      romaji: "ni",
    },
    {
      hiragana: "ぬ",
      katakana: "ヌ",
      romaji: "nu",
    },
    {
      hiragana: "ね",
      katakana: "ネ",
      romaji: "ne",
    },
    {
      hiragana: "の",
      katakana: "ノ",
      romaji: "no",
    },
    {
      hiragana: "ん",
      katakana: "ン",
      romaji: "n",
    },
    {
      hiragana: "む",
      katakana: "ム",
      romaji: "mu",
    },
    {
      hiragana: "め",
      katakana: "メ",
      romaji: "me",
    },
    {
      hiragana: "も",
      katakana: "モ",
      romaji: "mo",
    },
    {
      hiragana: "や",
      katakana: "ヤ",
      romaji: "ya",
    },
    {
      hiragana: "ゆ",
      katakana: "ユ",
      romaji: "yu",
    },
    {
      hiragana: "よ",
      katakana: "ヨ",
      romaji: "yo",
    },
    {
      hiragana: "ら",
      katakana: "ラ",
      romaji: "ra",
    },
    {
      hiragana: "り",
      katakana: "リ",
      romaji: "ri",
    },
    {
      hiragana: "る",
      katakana: "ル",
      romaji: "ru",
    },
    {
      hiragana: "れ",
      katakana: "レ",
      romaji: "re",
    },
    {
      hiragana: "ろ",
      katakana: "ロ",
      romaji: "ro",
    },
    {
      hiragana: "わ",
      katakana: "ワ",
      romaji: "wa",
    },
    {
      hiragana: "を",
      katakana: "ヲ",
      romaji: "wo",
    },
    {
      hiragana: "が",
      katakana: "ガ",
      romaji: "ga",
    },
    {
      hiragana: "ぎ",
      katakana: "ギ",
      romaji: "gi",
    },
    {
      hiragana: "ぐ",
      katakana: "グ",
      romaji: "gu",
    },
    {
      hiragana: "げ",
      katakana: "ゲ",
      romaji: "ge",
    },
    {
      hiragana: "ご",
      katakana: "ゴ",
      romaji: "go",
    },
    {
      hiragana: "ざ",
      katakana: "ザ",
      romaji: "za",
    },
    {
      hiragana: "じ",
      katakana: "ジ",
      romaji: "ji",
    },
    {
      hiragana: "ず",
      katakana: "ズ",
      romaji: "zu",
    },
    {
      hiragana: "ぜ",
      katakana: "ゼ",
      romaji: "ze",
    },
    {
      hiragana: "ぞ",
      katakana: "ゾ",
      romaji: "zo",
    },
    {
      hiragana: "だ",
      katakana: "ダ",
      romaji: "da",
    },
  ],
  ha: [
    {
      hiragana: "は",
      katakana: "ハ",
      romaji: "ha",
    },
    {
      hiragana: "ひ",
      katakana: "ヒ",
      romaji: "hi",
    },
    {
      hiragana: "ふ",
      katakana: "フ",
      romaji: "fu",
    },
    {
      hiragana: "へ",
      katakana: "ヘ",
      romaji: "he",
    },
    {
      hiragana: "ほ",
      katakana: "ホ",
      romaji: "ho",
    },
  ],
  ma: [
    {
      hiragana: "ま",
      katakana: "マ",
      romaji: "ma",
    },
    {
      hiragana: "み",
      katakana: "ミ",
      romaji: "mi",
    },
    {
      hiragana: "む",
      katakana: "ム",
      romaji: "mu",
    },
    {
      hiragana: "め",
      katakana: "メ",
      romaji: "me",
    },
    {
      hiragana: "も",
      katakana: "モ",
      romaji: "mo",
    },
  ],
  ya: [
    {
      hiragana: "や",
      katakana: "ヤ",
      romaji: "ya",
    },
  ],
  ra: [
    {
      hiragana: "ら",
      katakana: "ラ",
      romaji: "ra",
    },
    {
      hiragana: "り",
      katakana: "リ",
      romaji: "ri",
    },
    {
      hiragana: "る",
      katakana: "ル",
      romaji: "ru",
    },
    {
      hiragana: "れ",
      katakana: "レ",
      romaji: "re",
    },
    {
      hiragana: "ろ",
      katakana: "ロ",
      romaji: "ro",
    },
  ],
  wa: [
    {
      hiragana: "わ",
      katakana: "ワ",
      romaji: "wa",
    },
  ],
  n: [
    {
      hiragana: "ん",
      katakana: "ン",
      romaji: "n",
    },
  ],
  ga: [
    {
      hiragana: "が",
      katakana: "ガ",
      romaji: "ga",
    },
    {
      hiragana: "ぎ",
      katakana: "ギ",
      romaji: "gi",
    },
    {
      hiragana: "ぐ",
      katakana: "グ",
      romaji: "gu",
    },
    {
      hiragana: "げ",
      katakana: "ゲ",
      romaji: "ge",
    },
    {
      hiragana: "ご",
      katakana: "ゴ",
      romaji: "go",
    },
  ],
  za: [
    {
      hiragana: "ざ",
      katakana: "ザ",
      romaji: "za",
    },
    {
      hiragana: "じ",
      katakana: "ジ",
      romaji: "ji",
    },
    {
      hiragana: "ず",
      katakana: "ズ",
      romaji: "zu",
    },
    {
      hiragana: "ぜ",
      katakana: "ゼ",
      romaji: "ze",
    },
    {
      hiragana: "ぞ",
      katakana: "ゾ",
      romaji: "zo",
    },
  ],
  da: [
    {
      hiragana: "だ",
      katakana: "ダ",
      romaji: "da",
    },
  ],
  ba: [
    {
      hiragana: "ば",
      katakana: "バ",
      romaji: "ba",
    },
    {
      hiragana: "び",
      katakana: "ビ",
      romaji: "bi",
    },
    {
      hiragana: "ぶ",
      katakana: "ブ",
      romaji: "bu",
    },
    {
      hiragana: "べ",
      katakana: "ベ",
      romaji: "be",
    },
    {
      hiragana: "ぼ",
      katakana: "ボ",
      romaji: "bo",
    },
  ],
  pa: [
    {
      hiragana: "ぱ",
      katakana: "パ",
      romaji: "pa",
    },
    {
      hiragana: "ぴ",
      katakana: "ピ",
      romaji: "pi",
    },
    {
      hiragana: "ぷ",
      katakana: "プ",
      romaji: "pu",
    },
    {
      hiragana: "ぺ",
      katakana: "ペ",
      romaji: "pe",
    },
    {
      hiragana: "ぽ",
      katakana: "ポ",
      romaji: "po",
    },
  ],
  kya: [
    {
      hiragana: "きゃ",
      katakana: "キャ",
      romaji: "kya",
    },
  ],
  sha: [
    {
      hiragana: "しゃ",
      katakana: "シャ",
      romaji: "sha",
    },
  ],
  cha: [
    {
      hiragana: "ちゃ",
      katakana: "チャ",
      romaji: "cha",
    },
  ],
  nya: [
    {
      hiragana: "にゃ",
      katakana: "ニャ",
      romaji: "nya",
    },
  ],
  hya: [
    {
      hiragana: "ひゃ",
      katakana: "ヒャ",
      romaji: "hya",
    },
  ],
  mya: [
    {
      hiragana: "みゃ",
      katakana: "ミャ",
      romaji: "mya",
    },
  ],
  rya: [
    {
      hiragana: "りゃ",
      katakana: "リャ",
      romaji: "rya",
    },
  ],
  gya: [
    {
      hiragana: "ぎゃ",
      katakana: "ギャ",
      romaji: "gya",
    },
  ],
  ja: [
    {
      hiragana: "じゃ",
      katakana: "ジャ",
      romaji: "ja",
    },
  ],
  bya: [
    {
      hiragana: "びゃ",
      katakana: "ビャ",
      romaji: "bya",
    },
  ],
  pya: [
    {
      hiragana: "ぴゃ",
      katakana: "ピャ",
      romaji: "pya",
    },
  ],
  kyu: [
    {
      hiragana: "きゅ",
      katakana: "キュ",
      romaji: "kyu",
    },
  ],
  shu: [
    {
      hiragana: "しゅ",
      katakana: "シュ",
      romaji: "shu",
    },
  ],
  chu: [
    {
      hiragana: "ちゅ",
      katakana: "チュ",
      romaji: "chu",
    },
  ],
  nyu: [
    {
      hiragana: "にゅ",
      katakana: "ニュ",
      romaji: "nyu",
    },
  ],
  hyu: [
    {
      hiragana: "ひゅ",
      katakana: "ヒュ",
      romaji: "hyu",
    },
  ],
  myu: [
    {
      hiragana: "みゅ",
      katakana: "ミュ",
      romaji: "myu",
    },
  ],
  ryu: [
    {
      hiragana: "りゅ",
      katakana: "リュ",
      romaji: "ryu",
    },
  ],
  gyu: [
    {
      hiragana: "ぎゅ",
      katakana: "ギュ",
      romaji: "gyu",
    },
  ],
  ju: [
    {
      hiragana: "じゅ",
      katakana: "ジュ",
      romaji: "ju",
    },
  ],
  byu: [
    {
      hiragana: "びゅ",
      katakana: "ビュ",
      romaji: "byu",
    },
  ],
  pyu: [
    {
      hiragana: "ぴゅ",
      katakana: "ピュ",
      romaji: "pyu",
    },
  ],
  kyo: [
    {
      hiragana: "きょ",
      katakana: "キョ",
      romaji: "kyo",
    },
  ],
  sho: [
    {
      hiragana: "しょ",
      katakana: "ショ",
      romaji: "sho",
    },
  ],
  cho: [
    {
      hiragana: "ちょ",
      katakana: "チョ",
      romaji: "cho",
    },
  ],
  nyo: [
    {
      hiragana: "にょ",
      katakana: "ニョ",
      romaji: "nyo",
    },
  ],
  hyo: [
    {
      hiragana: "ひょ",
      katakana: "ヒョ",
      romaji: "hyo",
    },
  ],
  myo: [
    {
      hiragana: "みょ",
      katakana: "ミョ",
      romaji: "myo",
    },
  ],
  ryo: [
    {
      hiragana: "りょ",
      katakana: "リョ",
      romaji: "ryo",
    },
  ],
  gyo: [
    {
      hiragana: "ぎょ",
      katakana: "ギョ",
      romaji: "gyo",
    },
  ],
  jo: [
    {
      hiragana: "じょ",
      katakana: "ジョ",
      romaji: "jo",
    },
  ],
  byo: [
    {
      hiragana: "びょ",
      katakana: "ビョ",
      romaji: "byo",
    },
  ],
  pyo: [
    {
      hiragana: "ぴょ",
      katakana: "ピョ",
      romaji: "pyo",
    },
  ],
}) // if options is of 1 lenght we insert it in an array of 'others'
  .reduce<Options>(
    (acc, [key, value]) => {
      if (value.length === 1) {
        return {
          others: [...acc.others, value[0]],
          ...acc,
        };
      }

      return {
        ...acc,
        [key]: value,
      };
    },
    {others: []},
  );

type OptionWithRow = {
  row: Row;
} & Letter;

type FlattenedOptions = OptionWithRow[];

export const OptionToOptionWithRow = (row: Row, option: Letter): OptionWithRow => {
  return {
    ...option,
    row,
  };
};

type Row = keyof Options;

export const flattenOptionsByRow = (rows: Row | Row[] | null): FlattenedOptions => {
  if (rows === null) {
    return Object.entries(OPTIONS)
      .map(([row, options]) => options.map((option) => OptionToOptionWithRow(row, option)))
      .flat();
  }
  if (typeof rows === "string") {
    return OPTIONS[rows].map((option) => OptionToOptionWithRow(rows, option));
  }

  return Object.entries(OPTIONS).reduce<FlattenedOptions>((acc, [row, options]) => {
    if (rows.includes(row)) {
      return acc.concat(options.map((option) => OptionToOptionWithRow(row, option)));
    }

    return acc;
  }, []);
};

export const randomOption = (options: FlattenedOptions): FlattenedOptions[number] => {
  return options[Math.floor(Math.random() * options.length)];
};

export const randomLetterWithoutRepeat = ({
  currentLetter,
  options,
}: {
  currentLetter?: FlattenedOptions[number];
  options: FlattenedOptions;
}): FlattenedOptions[number] => {
  const newLetter = randomOption(options);

  if (newLetter === currentLetter) {
    return randomLetterWithoutRepeat({currentLetter, options});
  }

  return newLetter;
};

export const flattenedRows = Object.keys(OPTIONS);

const STATES = {
  IDLE: "idle",
  PLAYING: "playing",
  LOSE: "lose",
} as const;

type State = (typeof STATES)[keyof typeof STATES];

const TIME_TO_LOSE = 10;

export function KatakanaGame() {
  const [state, setState] = useState<State>("idle");
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
    setState("playing");
    setScore(0);
    setCurrentLetter(randomOption(flattenOptionsByRow(configurationToGame.letters)));
    setTimer(0);
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    setCurrentOptions(flattenOptionsByRow(configurationToGame.letters));
  };

  React.useEffect(() => {
    if (timer >= TIME_TO_LOSE) {
      setState("lose");
      clearInterval(intervalRef.current);
    }
  }, [timer]);

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
      setState("lose");
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
                setState("idle");
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
