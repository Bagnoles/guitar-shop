import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Guitar } from '../../types/guitar.type';
import { fetchGuitars, getGuitarInfoByID, createGuitar, updateGuitarInfo, deleteGuitar } from '../api-actions';

type GuitarInitialStateType = {
  guitars: {
    data: Guitar[];
    isLoading: boolean;
    isError: boolean;
  };
  guitarInfo: {
    data: Guitar | null;
    isLoading: boolean;
    isError: boolean;
  }
}

const initialState: GuitarInitialStateType = {
  guitars: {
    data: [],
    isLoading: false,
    isError: false
  },
  guitarInfo: {
    data: null,
    isLoading: false,
    isError: false
  }
}

export const guitarSlice = createSlice({
  name: NameSpace.Guitar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGuitars.pending, (state) => {
        state.guitars.isLoading = true;
        state.guitars.isError = false;
      })
      .addCase(fetchGuitars.fulfilled, (state, action) => {
        state.guitars.isLoading = false;
        state.guitars.data = action.payload;
      })
      .addCase(fetchGuitars.rejected, (state) => {
        state.guitars.isLoading = false;
        state.guitars.isError = true;
      })
      .addCase(getGuitarInfoByID.pending, (state) => {
        state.guitarInfo.isLoading = true;
        state.guitarInfo.isError = false;
      })
      .addCase(getGuitarInfoByID.fulfilled, (state, action) => {
        state.guitarInfo.isLoading = false;
        state.guitarInfo.data = action.payload;
      })
      .addCase(getGuitarInfoByID.rejected, (state) => {
        state.guitarInfo.isLoading = false;
        state.guitarInfo.isError = true;
      })
      .addCase(createGuitar.pending, (state) => {
        state.guitars.isLoading = true;
        state.guitars.isError = false;
      })
      .addCase(createGuitar.fulfilled, (state, action) => {
        state.guitars.isLoading = false;
        state.guitars.data.push(action.payload);
      })
      .addCase(createGuitar.rejected, (state) => {
        state.guitars.isLoading = false;
        state.guitars.isError = true;
      })
      .addCase(updateGuitarInfo.pending, (state) => {
        state.guitarInfo.isLoading = true;
        state.guitarInfo.isError = false;
      })
      .addCase(updateGuitarInfo.fulfilled, (state, action) => {
        state.guitarInfo.isLoading = false;
        state.guitarInfo.data = action.payload;
      })
      .addCase(updateGuitarInfo.rejected, (state) => {
        state.guitarInfo.isLoading = false;
        state.guitarInfo.isError = true;
      })
      .addCase(deleteGuitar.pending, (state) => {
        state.guitars.isLoading = true;
        state.guitars.isError = false;
      })
      .addCase(deleteGuitar.fulfilled, (state) => {
        state.guitars.isLoading = false;
      })
      .addCase(deleteGuitar.rejected, (state) => {
        state.guitars.isLoading = false;
        state.guitars.isError = true;
      })
  },
});
