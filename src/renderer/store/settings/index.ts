import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchReaperPath } from './actions';

export interface SettingsState {
  reaperPath: string | null,
}

const initialState: SettingsState = {
  reaperPath: null,
};

export const settingsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchReaperPath.fulfilled, (state, action) => {
      state.reaperPath = action.payload;
    });
  },
  initialState: initialState,
  name: 'settings',
  reducers: {
    setReaperPath(state, action: PayloadAction<string>) {
      state.reaperPath = action.payload;
    },
  },
});

export const { setReaperPath } = settingsSlice.actions;

export default settingsSlice.reducer;
