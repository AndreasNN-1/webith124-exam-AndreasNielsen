import React from 'react'
import useRequstData from '../hooks/useRequstData';

const Gallery = () => {
    const APIURL = import.meta.env.VITE_APP_API;
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

        </div>
    )
}

export default Gallery