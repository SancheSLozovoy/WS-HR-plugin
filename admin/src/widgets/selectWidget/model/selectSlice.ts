import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSpecialties } from '../api/selectApi';
import { initialState, Speciality } from './types';

export const loadSpecialties = createAsyncThunk(
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
      .addCase(loadSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSpecialties.fulfilled, (state, action) => {
        state.specialties = action.payload;
        state.loading = false;
      })
      .addCase(loadSpecialties.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при загрузке специальностей';
        state.loading = false;
      });
  },
});

export const { setSelectedSpecialty } = selectSlice.actions;
export default selectSlice.reducer;
