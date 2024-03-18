export interface Letter {
  hiragana: string;
  katakana: string;
  romaji: string;
}

export type Options = Record<string, Letter[]>;

export type OptionWithRow = {
  row: Row;
} & Letter;

export type FlattenedOptions = OptionWithRow[];

export type Row = keyof Options;
