import { Imenutore, ITheme } from "@app/type/redux.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Imenutore = {};

const SettingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setting: (_, action: PayloadAction<Imenutore>) => {
      return action.payload;
    },
    setTheme: (state, action: PayloadAction<ITheme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setting, setTheme } = SettingSlice.actions;

export default SettingSlice.reducer;
