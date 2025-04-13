export const ENV = {
    API_URL: process.env.NEXT_PUBLIC_APP_URL || '',
    CHAT_URL: process.env.NEXT_PUBLIC_SOCKET_CHAT_URL || '',
    NOTIFICATION_URL: process.env.NEXT_PUBLIC_SOCKET_NOTIFICATION_URL || '',
    TIMEOUT: 60000,
};