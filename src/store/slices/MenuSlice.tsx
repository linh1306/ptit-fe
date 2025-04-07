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
    },
    toggleTab: (state) => {
      state.isOpenTab = !state.isOpenTab;
    },
    setSubScreen: (state, action: PayloadAction<Partial<IKeySubScreen>>) => {
      state.subScreen = action.payload;
    },
    addSubPages: (state, action: PayloadAction<ISubPage>) => {
      console.log(state.subPages);

      state.subPages.push(action.payload);
    },
    removeSubPages: (state) => {
      state.subPages.pop();
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
