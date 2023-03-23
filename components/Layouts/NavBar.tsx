import React from "react";
import Link from "next/link";
import Hamburger from "./Hamburger";

const NavBar = () => {
    return (
        <>
            <nav >
                <Hamburger />
                <div className="hidden my-6 fixed w-full px-16 z-20 justify-between sm:flex ">
                    <div className="h-14 w-full ">
                        <ul className="flex text-transparent justify-between gap-6 md:gap-2 lg:justify-between bg-gradient-to-r from-sky-100 to-sky-200 bg-clip-text sm:text-sm lg:text-2xl lg:gap-16">
                            <li>
                                <Link href="/">HOMEPAGE</Link>
                            </li>
                            <li>
                                <Link href="/explore">EXPLORE</Link>
                            </li>
                            <li>
                                <Link href="/mywatchList">WATCHLIST</Link>
                            </li>
                            {/* <li>
                                <Link href="/about">ABOUT</Link>
                            </li> */}
                            <li>
                                <Link href="/login">LOGIN</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default NavBar;
