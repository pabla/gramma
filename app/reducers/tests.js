import {
  CHANGE_TEST,
  CLEAR_SKIPPED_TESTS,
} from '../actions/tests';

const initialState = {
  test: null,
  skippedIds: [],
};

export default function testsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TEST:
      return {
        ...state,
        test: action.test,
        skippedIds: [
          ...state.skippedIds,
          action.test.id,
        ],
      };

    case CLEAR_SKIPPED_TESTS:
      return {
        ...state,
        skippedIds: [],
      };

    default:
      return state;
  }
}
