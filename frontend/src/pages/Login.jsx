import React, { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { Navigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.scss";

const Login = () => {
    const { signIn, user } = useContext(LoginContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    // if user is not null send to admin
    if (user) return <Navigate to="/admin/dashboard" replace />;


    const validate = async (email, password) => {

        // validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { valit: false, message: "Indtast gyldig e-mailadresse." };
        }
        // min length = 6
        if (password.length < 6) {
            return { valit: false, message: "Adgangskoden skal være mindst 6 tegn." };
        }
        

        return { valit: true };
    };


    // submit
    const submitLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");


        // wait for validate() ^^
        const validation = await validate(email, password);
        if (validation.valit === false) {
            setErrorMessage(validation.message);
        } else {
            signIn(email, password);
        }
    };

    return (
        <article id="Login">
            <form className="LoginForm" onSubmit={submitLogin}>
                <h1 className="logintitle">Login</h1>
                <div className="LoginBox">
                    <label className="LoginLabel" htmlFor="email">
                        <FaUser />
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="Email"
                    />
                </div>

                <div className="LoginBox">
                    <label className="LoginLabel" htmlFor="password">
                        <FaLock />
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                    />
                </div>
                {errorMessage && <p className="errorText">{errorMessage}</p>}
                <button className="loginButton" type="submit">Login</button>
            </form>
        </article>
    );
};

export default Login;
