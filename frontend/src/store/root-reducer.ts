import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { guitarSlice } from './guitar/guitar-slice';

export const rootReducer = combineReducers({
  [NameSpace.Guitar]: guitarSlice.reducer
});
