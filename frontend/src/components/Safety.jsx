import React, { useEffect } from 'react'
import "./Safety.scss";
import useRequstData from '../hooks/useRequstData';
import Loader from './Loader';
import Error from './Error';
const Safety = () => {
    const APIURL = import.meta.env.VITE_APP_API;
    const { makeRequest, isLoading, data, error } = useRequstData();

    useEffect(() => {
        makeRequest(`${APIURL}safety`, "GET");
    }, []);

    return (
        <section id="Safety">
            <h3>Safety</h3>

            {isLoading && <Loader />}
            {error && <Error />}
            {data &&
                <div className="item">
                    <h4>{data.title}</h4>
                    <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
            }
        </section>
    )
}

export default Safety