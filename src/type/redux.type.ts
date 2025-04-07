import { IKeySubScreen } from "./../route/index";
import { IUser } from "./schema.type";
import { TKeySubPage } from '@app/config/subPage';

export type ITheme = "light" | "dark";

export interface IAccountInfo {
  user?: IUser;
  token?: string;
}

export interface ISubPage {
  key: TKeySubPage;
  props: {
    [key: string]: any;
  };
}

export interface IMenuState {
  isOpenMenu: boolean;
  isOpenTab: boolean;
  subScreen: IKeySubScreen | null;
  subPages: ISubPage[];
}
export interface Imenutore {
  theme?: ITheme;
}
