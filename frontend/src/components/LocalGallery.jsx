import React, { useEffect, useState } from 'react'
import "./LocalGallery.scss";
import Error from './Error';
import Loader from './Loader';
import Lightbox from './Lightbox';

const LocalGallery = () => {
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    const [data, setData] = useState(["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg"]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);


    // open lightbox commpont
    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };


    return (
        <section id="LocalGallery">
            <h3>Rejsebilleder</h3>
            <div className="LocalGallery-con">
                {data ? data.map((_, index) => (
                    <div key={index} className="item" onClick={() => handleImageClick(index)}>
                        <img src={`${APPSTORAGE}galleri/${index + 1}.jpg`} alt={`Image ${index}`} />
                    </div>
                )) :
                    <Error />
                }
            </div>
            {lightboxOpen && (
                <Lightbox
                    data={data}
                    starter={currentIndex}
                    onclose={() => setLightboxOpen(false)}
                />
            )}
        </section>
    )
}

export default LocalGallery;