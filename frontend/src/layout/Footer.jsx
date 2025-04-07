import React, { useContext } from 'react'
import "./Footer.scss"
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaRegCopyright, FaTwitter, FaDirections } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { LoginContext } from '../context/LoginContext';
import { NavLink } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
const Footer = () => {
    const { user } = useContext(LoginContext);
    return (
        <footer>
            <menu>
                <div className='kontact'>
                    <h5>KONTAKT</h5>
                    <ul>
                        <li>
                            <a href="tel:+4586351003" target='_blank'>
                                <BsFillTelephoneFill />
                                <span>+45 86 35 10 03</span>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:info@spaceventure.dk" target='_blank'>
                                <IoMdMail />
                                <span>info@spaceventure.dk</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.google.pl/maps/search/Galaksevej+39,+8000+%C3%85rhus" target='_blank'>
                                <FaDirections />
                                <span>Galaksevej 39, 8000 Århus</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='links'>
                    <h5>HURTIG LINKS</h5>
                    <ul>
                        <li>
                            <GoDotFill />
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? "active" : "")}>
                                <span>Hjem</span>
                            </NavLink>
                        </li>
                        <li>
                            <GoDotFill />
                            <NavLink
                                to="/rumfærgen"
                                className={({ isActive }) => (isActive ? "active" : "")}>
                                <span>Rumfærgen</span>
                            </NavLink>
                        </li>
                        <li>
                            <GoDotFill />
                            <NavLink
                                to="/ture"
                                className={({ isActive }) => (isActive ? "active" : "")}>
                                <span>Ture</span>
                            </NavLink>
                        </li>
                        <li>
                            <GoDotFill />
                            <NavLink
                                to="/galleri"
                                className={({ isActive }) => (isActive ? "active" : "")}>
                                <span>Galleri</span>
                            </NavLink>
                        </li>
                        <li>
                            <GoDotFill />
                            <NavLink
                                to="/sikkerhed"
                                className={({ isActive }) => (isActive ? "active" : "")}>
                                <span>Sikkerhed</span>
                            </NavLink>
                        </li>
                        <li>
                            <GoDotFill />
                            <NavLink
                                to="/kontakt"
                                className={({ isActive }) => (isActive ? "active" : "")}>
                                <span>Kontakt</span>
                            </NavLink>
                        </li>
                        {user &&
                            <li>
                                <GoDotFill />
                                <NavLink
                                    to="/admin/dashboard"
                                    className={({ isActive }) => (isActive ? "active" : "")}>
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                        }
                    </ul>
                    <NavLink
                        to="/kontakt"
                        className={({ isActive }) => (isActive ? "active button" : "button")}>
                        <span>Kontakt</span>
                    </NavLink>
                </div>
            </menu>
            <div className="bottom">
                <div className='copyright'>
                    <FaRegCopyright />
                    <span>
                        Space Venture. All rights reserved.
                    </span>
                </div>
                <div className="socials">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://support.google.com/" target="_blank" rel="noopener noreferrer">
                        <FaGooglePlusG />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer