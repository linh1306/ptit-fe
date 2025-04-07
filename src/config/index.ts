import { ENV } from "./env";
import { LOCALSTORATE } from "./localstorare";
import { PATHNAME } from "./pathname";
import { SUB_PAGE } from "./subPage";

const SOCKET = {
    CHAT: ENV.CHAT_URL,
    NOTIFICATION: ENV.NOTIFICATION_URL,
}

const Config = {
    ENV,
    SOCKET,
    PATHNAME,
    SUB_PAGE,
    LOCALSTORATE
}

export type KeySocket = keyof typeof SOCKET;
export default Config;