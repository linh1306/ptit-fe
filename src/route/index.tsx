import {
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import PChat from "@app/module/subScreen/chat";
import PNotification from "@app/module/subScreen/notification";
import PProfile from "@app/module/subScreen/profile";
import PSetting from "@app/module/subScreen/setting";

export const route = {};
export type IKeySubScreen = keyof typeof subScreen;

export interface ISubScreen {
  [key: string]: {
    key: IKeySubScreen;
    component: React.ReactNode;
    icon: React.ReactNode;
  };
}

export const subScreen: ISubScreen = {
  CHAT: {
    key: "CHAT",
    component: <PChat />,
    icon: <WechatWorkOutlined />,
  },
  NOTIFICATION: {
    key: "NOTIFICATION",
    component: <PNotification />,
    icon: <BellOutlined />,
  },
  PROFILE: {
    key: "PROFILE",
    component: <PProfile />,
    icon: <UserOutlined />,
  },
  SETTING: {
    key: "SETTING",
    component: <PSetting />,
    icon: <SettingOutlined />,
  },
};
