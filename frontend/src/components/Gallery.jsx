import React, { useEffect } from 'react'
import useRequstData from '../hooks/useRequstData';
import Loader from './Loader';
import Error from './Error';
import "./Gallery.scss";

const Gallery = () => {
    const APIURL = import.meta.env.VITE_APP_API;
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    const {
        makeRequest: makeRequest,
        isLoading: isLoading,
        data: data,
        error: error,
    } = useRequstData();

    useEffect(() => {
        makeRequest(`${APIURL}Gallery`, "GET");
    }, []);
    return (
        <div id="Gallery">
            <h3>Galleri</h3>
            <div className="Gallery-con">
                {isLoading && <Loader />}
                {error && <Error />}
                {data && data.map((item, index) => (
                    <div key={index} className='item'>
                        <img src={`${APPSTORAGE}${item.image}`} alt={`${item.imagetext}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery