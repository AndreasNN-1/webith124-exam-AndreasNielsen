import React from 'react';
import SilderSmooth from './SilderSmooth';
import "./Banner.scss";

const Banner = ({ silder, custom }) => {
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    return (
        <div id="banner">
            {silder &&
                <div className="silder-con">
                    <SilderSmooth />
                </div>}
            {custom && (
                <div className="custom">
                    <img src={`${APPSTORAGE}${custom.img}`} alt={custom.img.slice(".")[0]} />
                    <div className='title'>
                        <h2>{custom.text}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Banner