import React, { useContext } from "react";
import NavBar from "./NavBar";
import Notification from "../UI/Notification";
import NotificationContext from "../../store/notification-context";
import { useTranslation } from "next-i18next";

const Layout = (props: any) => {

    const { t } = useTranslation('Nav');

    const notificationCtx = useContext(NotificationContext);

    const { title, message, status } = notificationCtx.notification ?? {}

    return (
        <>
            <NavBar t={t} />
            <main>{props.children}</main>
            <Notification title={title} message={message} status={status} />
        </>
    );
};

export default Layout;
