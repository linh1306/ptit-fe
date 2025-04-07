import { IAccountInfo } from "@app/type/redux.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAccountInfo = {};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (_, action: PayloadAction<IAccountInfo>) => {
      return action.payload;
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

export const { loginUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;
