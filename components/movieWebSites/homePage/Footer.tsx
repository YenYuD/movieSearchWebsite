import React from "react";

const Footer = () => {
    return (
        <>
            <div className=" text-xs lg:text-sm ">
                <div className="flex justify-center w-full mb-8 align-center absolute bottom-0">
                    <div className="px-6 scale-75 text-left tracking-wide ">
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
