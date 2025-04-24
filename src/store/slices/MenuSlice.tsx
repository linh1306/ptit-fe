import { IKeySubScreen } from "@app/route";
import { IMenuState, ISubPage } from "@app/type/redux.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IMenuState = {
  isOpenMenu: false,
  isOpenTab: false,
  subScreen: null,
  subPages: [],
};

const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isOpenMenu = true;
    },
    closeMenu: (state) => {
      state.isOpenMenu = false;
    },
    toggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },

    openTab: (state) => {
      state.isOpenTab = true;
    },
    closeTab: (state) => {
      state.isOpenTab = false;
      state.subPages = [];
      state.subScreen = null;
    },
    toggleTab: (state) => {
      state.isOpenTab = !state.isOpenTab;
      if (!state.isOpenTab) {
        state.subPages = [];
        state.subScreen = null;
      };
    },
    setSubScreen: (state, action: PayloadAction<Partial<IKeySubScreen>>) => {
      state.subScreen = action.payload;
    },
    addSubPages: (state, action: PayloadAction<ISubPage>) => {
      state.subPages.push(action.payload);
    },
    removeSubPages: (state) => {
      state.subPages.pop();
    },
    clearSubPages: (state) => {
      state.subPages = [];
      state.subScreen = null;
    },
  },
});

export const {
  openMenu,
  closeMenu,
  toggleMenu,
  openTab,
  closeTab,
  toggleTab,
  setSubScreen,
  addSubPages,
  removeSubPages,
} = MenuSlice.actions;

export default MenuSlice.reducer;
