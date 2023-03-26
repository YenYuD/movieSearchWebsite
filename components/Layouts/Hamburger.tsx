import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';

const Hamburger = () => {

    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <section className="sm:hidden z-50 pointer-events-none flex flex-col gap-10 fixed h-full w-full right-0 p-8 overflow-hidden" >
                <div className={`relative pointer-events-auto flex justify-end z-50 transition-opacity ${navOpen ? 'opacity-0' : ''}`} onClick={() => setNavOpen((prev) => !prev)}>
                    <MenuIcon />
                </div>
                <div className={`${navOpen ? '' : "opacity-0 translate-x-full"} p-8 w-max pointer-events-auto  h-full ease-in-out duration-300 z-20  bg-black  absolute top-0 right-0`}>
                    <div className="text-end mb-6" onClick={() => { setNavOpen(false) }}>
                        <ClearIcon />
                    </div>
                    <ul className="flex flex-col uppercase gap-8 text-transparent bg-gradient-to-r from-sky-100 to-sky-200 bg-clip-text sm:text-sm lg:text-2xl">
                        <li>
                            <Link href="/">HOMEPAGE</Link>
                        </li>
                        <li>
                            <Link href="/explore">EXPLORE</Link>
                        </li>
                        <li>
                            <Link href="/mywatchList">WATCHLIST(開發中)</Link>
                        </li>
                        {/* <li>
                            <Link href="/about">ABOUT(developing)</Link>
                        </li> */}
                        <li>
                            <Link href="/Login">LOGIN(開發中)</Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Hamburger