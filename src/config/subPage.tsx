import PChatSubScreen from "@app/module/subScreen/chat/subPage/chatPage";
import PSettingChatSubScreen from "@app/module/subScreen/chat/subPage/settingChatPage";

export const SUB_PAGE = {
    groupChat: PChatSubScreen,
    settingChat: PSettingChatSubScreen,
};

export type TKeySubPage = keyof typeof SUB_PAGE;