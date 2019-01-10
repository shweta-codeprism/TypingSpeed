/* @flow */

const TYPE_PROPERTIES = Object.freeze({
  TYPE_SPEED: 'SPEED',
  TYPE_WORDS: 'WORDS',
  TYPE_MISMATCH: 'MISMATCH',
});

type State = {
  wordsTyped: number,
  speed: number,
  mismatch: number,
};

const INITIAL_STATE = {
  wordsTyped: 0,
  speed: 0,
  mismatch: 0,
};

type Action = {
  type: string,
  wordsTyped?: number,
  speed?: number,
  mismatch?: number,
};

export const setWordsNo = (wordsTyped: number) => ({
  type: TYPE_PROPERTIES.TYPE_WORDS,
  wordsTyped,
});

export const setSpeed = (speed: number) => ({
  type: TYPE_PROPERTIES.TYPE_SPEED,
  speed,
});

export const setMismatch = (mismatch: number) => ({
  type: TYPE_PROPERTIES.TYPE_MISMATCH,
  mismatch,
});



export const typeReducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case TYPE_PROPERTIES.TYPE_SPEED: {
      const newState = { speed: action.speed };
      return { ...state, ...newState };
    }
    case TYPE_PROPERTIES.TYPE_MISMATCH: {
      const newState = { mismatch: action.mismatch };
      return { ...state, ...newState };
    }
    case TYPE_PROPERTIES.TYPE_WORDS: {
      const newState = { wordsTyped: action.wordsTyped };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};
