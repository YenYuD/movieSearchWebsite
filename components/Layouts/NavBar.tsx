import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Hamburger from "./Hamburger";
import { useTranslation } from 'next-i18next';
import SwitchLang from "../UI/SwitchLang";

const NavBar = (props: any) => {

    const { t } = useTranslation('Nav');

    const [showNav, setShowNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const nav = useRef(null);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {

            if (window.pageYOffset <= 0 || window.pageYOffset < lastScrollY) {
                setShowNav(true);
            }

            if (window.pageYOffset > 0 && window.pageYOffset > lastScrollY) { // if scroll down hide the navbar
                setShowNav(false);
            }


            // remember current page location to use in the next move
            setLastScrollY(window.pageYOffset);
        }
    };

    useEffect(() => {

        window.addEventListener('scroll', controlNavbar);

        return () => window.removeEventListener("scroll", controlNavbar);

    }, [lastScrollY, showNav])

    return (
        <>
            <nav >
                <Hamburger />
                <div ref={nav} className={`${showNav ? "" : '-translate-y-[200%]'} hidden my-6 fixed w-full px-16 z-20 justify-between sm:flex `}>
                    <ul className="flex w-full text-transparent justify-between gap-6 md:gap-2  bg-gradient-to-r from-sky-100 to-sky-200 bg-clip-text sm:text-sm lg:text-2xl lg:gap-16">
                        <li>
                            <Link href="/">{t('HomePage')}</Link>
                        </li>
                        <li>
                            <Link href="/explore">{t('Explore')}</Link>
                        </li>
                        <li>
                            <Link href="/mywatchList">{t('WatchList')}</Link>
                        </li>
                        <li>
                            <Link href="/Login">{t('Login')}</Link>
                        </li>
                        <li>
                            <SwitchLang />
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    );
};

export default NavBar;
