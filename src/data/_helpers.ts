import type {Letter, OptionWithRow, Row} from "@/schema";

export const OptionToOptionWithRow = (row: Row, option: Letter): OptionWithRow => {
  return {
    ...option,
    row,
  };
};
