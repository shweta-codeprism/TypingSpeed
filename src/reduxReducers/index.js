import { combineReducers } from 'redux';
import { typeReducer } from './typeReducer';
import { timerReducer } from './timerReducer';
const reducer = combineReducers({
  TypeProperties: typeReducer,
  Timer: timerReducer,
});

export default reducer;
