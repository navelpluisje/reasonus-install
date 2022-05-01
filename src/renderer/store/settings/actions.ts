import { createAsyncThunk } from '@reduxjs/toolkit';

import { SettingsActions } from './types';

export const fetchReaperPath = createAsyncThunk<string, void>(SettingsActions.GET_REAPER_PATH, async () => {
  const reaperPath = await window.reasonusAPI.getReaperPath();
  return reaperPath;
});