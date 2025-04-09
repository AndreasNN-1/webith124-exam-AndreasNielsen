import React, { useEffect, useState } from 'react'
import useRequstData from '../hooks/useRequstData';
import Loader from './Loader';
import Error from './Error';
import "./Gallery.scss";

const Gallery = () => {
    const APIURL = import.meta.env.VITE_APP_API;
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const {
        makeRequest: makeRequest,
        isLoading: isLoading,
        data: data,
        error: error,
    } = useRequstData();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 767);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        makeRequest(`${APIURL}Gallery`, "GET");
    }, []);

    return (
        <section id="Gallery">
            <h3>Galleri</h3>
            <div className="Gallery-con">
                {isMobile ? (
                    <>
                        <div className='item-con'>
                            {isLoading && <Loader />}
                            {error && <Error />}
                            {data &&
                                data.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`item ${currentIndex == index ? "active" : ""}`}
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        <img
                                            src={`${APPSTORAGE}${slide.image}`}
                                            className="img"
                                            alt={`slide-${index}`}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        {Array.isArray(data) && (
                            <div className="dots-con">
                                {data.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {isLoading && <Loader />}
                        {error && <Error />}
                        {data && data.map((item, index) => (
                            <div key={index} className="item">
                                <img src={`${APPSTORAGE}${item.image}`} alt={item.imagetext} />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default Gallery;