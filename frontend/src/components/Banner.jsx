import React from 'react';
import SilderSmooth from './SilderSmooth';
import "./Banner.scss";

const Banner = ({ silder, custom }) => {
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    return (
        <section id="banner">
            {silder &&
                <SilderSmooth />
            }
            {custom && (
                <div className="custom">
                    <img src={`${APPSTORAGE}${custom.img}`} alt={custom.img.slice(".")[0]} />
                    <div className='title'>
                        <h1>{custom.text}</h1>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Banner