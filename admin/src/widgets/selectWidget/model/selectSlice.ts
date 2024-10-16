import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSpecialties } from '../api/selectApi';
import { initialState, Speciality } from './types';

export const loadSpecialties = createAsyncThunk<Speciality[]>(
  'select/loadSpecialties',
  async () => {
    return await fetchSpecialties();
  }
);

const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    setSelectedSpecialty(state, action) {
      state.selectedSpecialty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSpecialties.fulfilled, (state, action) => {
        state.specialties = action.payload;
      })
  },
});

export const { setSelectedSpecialty } = selectSlice.actions;
export default selectSlice.reducer;
