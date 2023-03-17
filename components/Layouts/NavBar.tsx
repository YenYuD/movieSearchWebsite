import React from "react";
import Link from "next/link";

const NavBar = () => {
    return (
        <>
            <nav className="my-6 fixed w-full px-16 z-20 flex justify-between ">
                <div className="h-14 ">
                    <ul className="flex text-transparent justify-evenly bg-gradient-to-r from-sky-100 to-sky-200 bg-clip-text lg:text-2xl gap-32">
                        <li>
                            <Link href="/">HOMEPAGE</Link>
                        </li>
                        <li>
                            <Link href="/explore">EXPLORE</Link>
                        </li>
                        <li>
                            <Link href="/mywatchList">MY WATCHLIST</Link>
                        </li>
                        <li>
                            <Link href="/about">ABOUT</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className=" pt-[6px] text-transparent bg-gradient-to-r from-sky-100 to-sky-200 bg-clip-text lg: text-lg">
                        <li>
                            <Link href="/login">LOGIN</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
