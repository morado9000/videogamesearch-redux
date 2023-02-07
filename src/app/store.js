import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gamesearchReducer from '../features/search/videoGameSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gamesearch: gamesearchReducer,
  },
});
