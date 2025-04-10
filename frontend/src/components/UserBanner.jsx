import React, { useContext } from 'react';
import "./UserBanner.scss";
import { LoginContext } from '../context/LoginContext';

const UserBanner = () => {
    const { user } = useContext(LoginContext);
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    return (
        <section id="UserBanner">
            <img src={`${APPSTORAGE}userbanner.jpg`} alt="" />
            <div className='banner-texts'>
                <h2 className="banner-title">Hi {user ? user.name : "user"}</h2>
            </div>
        </section>
    )
}

export default UserBanner;