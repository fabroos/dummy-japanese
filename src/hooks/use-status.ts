import {useState} from "react";

export const STATES = {
  IDLE: "idle",
  PLAYING: "playing",
  LOSE: "lose",
} as const;

export type State = (typeof STATES)[keyof typeof STATES];

export function useStatus() {
  const [state, setState] = useState<State>(STATES.IDLE);

  const startGame = () => {
    setState(STATES.PLAYING);
  };

  const loseGame = () => {
    setState(STATES.LOSE);
  };

  const resetGame = () => {
    setState(STATES.IDLE);
  };

  return {
    state,

    startGame,
    loseGame,
    resetGame,
  };
}
