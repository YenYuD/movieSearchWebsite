import React, { useContext } from "react";
import NavBar from "./NavBar";
import Notification from "../UI/Notification";
import NotificationContext from "../../store/notification-context";

const Layout = (props: any) => {

    const notificationCtx = useContext(NotificationContext);

    const { title, message, status } = notificationCtx.notification ?? {}

    return (
        <>
            <NavBar />
            <main>{props.children}</main>
            <Notification title={title} message={message} status={status} />
        </>
    );
};

export default Layout;
