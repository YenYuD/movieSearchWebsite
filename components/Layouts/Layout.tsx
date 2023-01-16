import React from "react";
import NavBar from "./NavBar";

const Layout = (props: any) => {
    return (
        <>
            <NavBar />
            <main>{props.children}</main>
        </>
    );
};

export default Layout;
