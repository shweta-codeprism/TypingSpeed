/* @flow */

const TIMER = Object.freeze({
  TIMER_START: 'START',
  TIMER_RESET: 'RESET',
  TIMER_COMPLETED: 'RESET',
});

type State = {
  timerStarted: boolean,
  timerCompleted: boolean,
};

const INITIAL_STATE = {
  timerStarted: false,
  timerCompleted: false,
};

type Action = {
  type: string,
  timerStarted: boolean,
};

export const startTimer = (timerStarted: boolean) => ({
  type: TIMER.TIMER_START,
  timerStarted,
});

export const resetTimer = () => ({
  type: TIMER.TIMER_RESET,
});

export const timerCompleted = () => ({
  type: TIMER.TIMER_COMPLETED,
});


export const timerReducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case TIMER.TIMER_START: {
      const newState = { timerStarted: action.timerStarted , timerCompleted: false};
      return { ...state, ...newState };
    }
    case TIMER.TIMER_COMPLETED: {
      const newState = { timerStarted: false, timerCompleted: true };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};
