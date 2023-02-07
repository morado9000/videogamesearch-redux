import { configureStore } from '@reduxjs/toolkit';
import gamesearchReducer from '../features/search/videoGameSlice';

export const store = configureStore({
  reducer: {
    gamesearch: gamesearchReducer,
  },
});
