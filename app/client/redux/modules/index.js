import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

export const rootReducer = combineReducers({
});

// FIXME: HMR notworking with sagas see: https://github.com/redux-saga/redux-saga/issues/22
export const rootSaga = function* () {
  yield all([...Object.values()].map(fork));
};
