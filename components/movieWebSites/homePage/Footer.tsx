import React from "react";

const Footer = () => {
    return (
        <>
            <div className="w-full absolute bottom-0">
                <div className="flex w-full justify-evenly mb-8 align-center">
                    <div className="text-center pb-8 tracking-wide">
                        All datas are provided by TMDB movie Database API.
                        <br /> This website is Owned by YenYu. Feel free to
                        check on my:
                    </div>
                    <div className="self-center">
                        <a href="#">instagram</a>
                    </div>
                    <div className="self-center">
                        <a href="#">facebook</a>
                    </div>
                    <div className="self-center">
                        <a href="#">twitter</a>
                    </div>
                    <div className="self-center">
                        <a href="#">github</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
