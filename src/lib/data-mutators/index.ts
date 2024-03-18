import type {FlattenedOptions, Options, Row} from "@/schema";

import {OptionToOptionWithRow} from "@/data/_helpers";

export const flattenOptionsByRow = (
  OPTIONS: Options,
  rows: Row | Row[] | null,
): FlattenedOptions => {
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
  prevOptions,
}: {
  currentLetter?: FlattenedOptions[number];
  options: FlattenedOptions;
  prevOptions?: FlattenedOptions;
}): FlattenedOptions[number] => {
  options = prevOptions
    ? options.filter(
        (option) => !prevOptions.some((prevOption) => prevOption.romaji === option.romaji),
      )
    : options;
  const newLetter = randomOption(options);

  if (newLetter === currentLetter) {
    return randomLetterWithoutRepeat({currentLetter, options});
  }

  return newLetter;
};
