import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { guitarSlice } from './guitar/guitar-slice';
import { userSlice } from './user/user-slice';

export const rootReducer = combineReducers({
  [NameSpace.Guitar]: guitarSlice.reducer,
  [NameSpace.User]: userSlice.reducer
});
