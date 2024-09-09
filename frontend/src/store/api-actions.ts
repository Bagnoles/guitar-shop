import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, store } from '.';
import { APIRoute } from '../const';
import { saveToken } from '../services/token';
import { Guitar, CreateGuitarDto, UpdateGuitarDto } from '../types/guitar.type';
import { CreateUserDto, LoginUserDto, UserInfo, UserToken } from '../types/user-info.type';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: State;
  dispatch: typeof store.dispatch;
  extra: AxiosInstance;
}>();

export const fetchGuitars = createAppAsyncThunk<Guitar[], undefined>('guitars/fetchGuitars',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
    return data;
  }
);

export const getGuitarInfoByID = createAppAsyncThunk<Guitar, string>('guitars/getGuitarInfo',
  async (id, {extra: api}) => {
    const {data} = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);
    return data;
  }
);

export const createGuitar = createAppAsyncThunk<Guitar, CreateGuitarDto>('guitars/createGuitar',
  async (dto, {extra: api}) => {
    const {data} = await api.post<Guitar>(APIRoute.Guitars, dto);
    return data;
  }
);

export const updateGuitarInfo = createAppAsyncThunk<Guitar, UpdateGuitarDto>('guitars/updateGuitarInfo',
  async (dto, {extra: api}) => {
    const {data} = await api.patch<Guitar>(`${APIRoute.Guitars}/${dto.id}`, dto);
    return data;
  }
);

export const deleteGuitar = createAppAsyncThunk<string, string>('guitars/deleteGuitar',
  async (id, {extra: api}) => {
    await api.delete<string>(`${APIRoute.Guitars}/${id}`);
    return id;
  }
);

export const loginAction = createAppAsyncThunk<UserToken, LoginUserDto>('user/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<UserToken>(`${APIRoute.Users}/login`, {email, password});
    saveToken(data.token);
    return data;
  }
);

export const checkAuthStatus = createAppAsyncThunk<UserInfo, undefined>('user/checkAuthStatus',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserInfo>(`${APIRoute.Users}/check`);
    return data;
  }
);

export const registerAction = createAppAsyncThunk<UserInfo, CreateUserDto>('user/register',
  async (dto, {extra: api}) => {
    const {data} = await api.post<UserInfo>(`${APIRoute.Users}/register`, dto);
    return data;
  }
);
