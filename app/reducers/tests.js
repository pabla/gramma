import {
  CHANGE_TEST,
} from '../actions/tests';

const initialState = {
  test: null,
};

export default function testsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TEST:
      return {
        ...state,
        test: action.test,
      };

    default:
      return state;
  }
}
