import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserInfo } from '../../types/user-info.type';
import { checkAuthStatus, loginAction, registerAction } from '../api-actions';

type UserInitialStateType = {
  authorizationStatus: AuthorizationStatus;
  isAuthError: boolean;
  userInfo: UserInfo | null;
}

const initialState: UserInitialStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthError: false,
  userInfo: null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isAuthError = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isAuthError = true;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isAuthError = false;
        state.userInfo = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(registerAction.rejected, (state) => {
        state.isAuthError = true;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
  }
});
