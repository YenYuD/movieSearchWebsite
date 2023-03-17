import { createContext, useState } from "react";

interface NotificationDataType {
    title: string;
    message: string;
    status: number;
}

const NotificationContext = createContext<{
    notification: NotificationDataType | null;
    showNotification: (data: NotificationDataType) => void;
    hideNotification: () => void;
}>({
    notification: null,
    showNotification: function (data: NotificationDataType) { },
    hideNotification: function () { },
});

export function NotificationContextProvider(props: any) {
    const [activeNotification, setActiveNotification] =
        useState<NotificationDataType | null>(null);

    function showNotificationHandler(data: NotificationDataType) {
        setActiveNotification(data);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    };

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;
