import React from "react";

const Footer = () => {
    return (
        <>
            <div className="w-full px-8 text-xs translate-y-full lg:text-sm sm:absolute sm:bottom-0">
                <div className="flex w-full justify-evenly mb-8 align-center">
                    <div className="text-left tracking-wide">
                        All datas are provided by TMDB movie Database API.
                        <br /> This website is built using Next.js and deployed through Vercel. @author YenYu
                    </div>
                    {/* <div className="self-center">
                        <a href="#">instagram</a>
                    </div>
                    <div className="self-center">
                        <a href="#">facebook</a>
                    </div>
                    <div className="self-center">
                        <a href="#">github</a>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Footer;
