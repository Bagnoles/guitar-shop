import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, store } from '.';
import { APIRoute } from '../const';
//import { dropToken, saveToken } from '../services/token';
import { Guitar, CreateGuitarDto, UpdateGuitarDto } from '../types/guitar.type';

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
  async (_arg, {extra: api}) => {
    const {data} = await api.post<Guitar>(APIRoute.Guitars);
    return data;
  }
);

export const updateGuitarInfo = createAppAsyncThunk<Guitar, UpdateGuitarDto>('guitars/updateGuitarInfo',
  async (id, {extra: api}) => {
    const {data} = await api.patch<Guitar>(`${APIRoute.Guitars}/${id}`);
    return data;
  }
);

export const deleteGuitar = createAppAsyncThunk<void, string>('guitars/deleteGuitar',
  async (id, {extra: api}) => {
    const {data} = await api.delete<void>(`${APIRoute.Guitars}/${id}`);
    return data;
  }
);
