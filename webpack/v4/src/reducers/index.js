import {ADD_COUNT, SUB_COUNT} from '../action/index';

export const getCount = (state = 0, action = {}) => {
  if (action.type === ADD_COUNT) {
    console.log(`---add----`);
  }

  switch(action.type) {
    case ADD_COUNT:
      return state + 1;
    case SUB_COUNT:
      return state - 1;
    default:
      return state;
  }
}