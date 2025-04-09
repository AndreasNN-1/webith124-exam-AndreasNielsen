import React from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import "./PageNotFound.scss";
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <article id="PageNotFound">
            <Header />
            <div className='PageNotFound-content'>
                <h5>404 - Side ikke fundet</h5>
                <p>Hvis Du oplever problemer eller denne side burde fandtes er du velkommen til at kontakte os</p>
                <NavLink to="/">Gå tilbage</NavLink>
            </div>
            <Footer />
        </article>
    )
}

export default PageNotFound