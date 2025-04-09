import React, { useEffect, useState } from 'react'
import "./LocalGallery.scss";
import Error from './Error';
import Loader from './Loader';
import Lightbox from './Lightbox';

const LocalGallery = () => {
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    const [data, setData] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [laoding, setLaoding] = useState(true);
    const NumberOfImages = 12;

    const makeData = () => {
        const images = Array.from({ length: NumberOfImages }, (_, index) => `${index + 1}.jpg`);
        setData(images);
        setLaoding(false);
    };

    useEffect(() => {
        makeData();
    }, [])

    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };


    return (
        <section id="LocalGallery">
            <h3>Rejsebilleder</h3>
            <div className="LocalGallery-con">
                {laoding && <Loader />}
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