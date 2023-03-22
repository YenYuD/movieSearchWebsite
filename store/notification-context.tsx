import { createContext, useEffect, useState } from "react";

interface NotificationDataType {
    title: string;
    message: string;
    status: string;
}

export const NotificationStatusType = {
    error: 'error',
    pending: 'pending',
    success: 'success'
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


    useEffect(() => {
        if (activeNotification && activeNotification.status === NotificationStatusType.error || activeNotification?.status === NotificationStatusType.success) {
            const timer = setTimeout(() => { setActiveNotification(null); }, 3000)
            return (() => { clearTimeout(timer) })
        }
    }, [activeNotification])

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
