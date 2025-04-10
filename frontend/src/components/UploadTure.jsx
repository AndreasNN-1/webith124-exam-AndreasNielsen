import React, { useContext, useEffect, useRef, useState } from "react";
import "./UploadTure.scss";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import useRequstData from "../../hooks/useRequstData";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NotificationContext } from "../../context/NotificationContext";

const UploadTure = () => {
    const APIURL = import.meta.env.VITE_APP_API;
    const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;

    const navigate = useNavigate();

    const { RunNotification, RunConfirmation } = useContext(NotificationContext);
    const { id } = useParams();
    const [editData, setEditData] = useState({});
    const { makeRequest, isLoading, data, error } = useRequstData();
    const { makeRequest: makeRequestPUT, isLoading: isLoadingPUT, data: dataPUT, error: errorPUT } = useRequstData();
    const { makeRequest: makeRequestDELETE, isLoading: isLoadingDELETE, data: dataDELETE, error: errorDELETE } = useRequstData();

    useEffect(() => {
        makeRequest(`${APIURL}tours/${id}`, "GET");
    }, [id]);

    useEffect(() => {
        if (data) {
            const sanitizedContent = DOMPurify.sanitize(data.content);
            setEditData(prevData => ({
                ...prevData,
                ...data,
                spacelaunch: data.spacelaunch.split("T")[0],
                content: sanitizedContent,
            }));
        }
    }, [data]);

    const handleChange = (name, value) => {
        setEditData(prev => ({ ...prev, [name]: value }));
    };


    // update

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            editData.title?.trim() == "" ||
            editData.content?.trim() == "" ||
            editData.traveltime?.trim() == "" ||
            editData.distance?.trim() == "" ||
            editData.price?.trim() == "" ||
            editData.spacelaunch?.trim() == ""
        ) {
            RunNotification(
                400,
                "tomme felter",
                "Venligst udfyld alle felter i formen"
            );
            return;
        }
        const formData = new FormData();

        if (editData.title) formData.append("title", editData.title);
        if (editData.content) formData.append("content", editData.content);
        if (editData.traveltime) formData.append("traveltime", editData.traveltime);
        if (editData.distance) formData.append("distance", editData.distance);
        if (editData.price) formData.append("price", editData.price);
        if (editData.spacelaunch) formData.append("spacelaunch", editData.spacelaunch);
        if (editData.image1 instanceof File) formData.append("image1", editData.image1);
        if (editData.image2 instanceof File) formData.append("image2", editData.image2);

        makeRequestPUT(`${APIURL}tours/admin/${id}`, "PUT", formData);
        console.log(formData);
    };

    useEffect(() => {
        if (dataPUT) {
            RunNotification(
                200,
                "opdateret!",
                "Ture er du opdateret"
            );
            setEditData({});
            navigate("/admin/ture");
        }
        if (errorPUT) {
            RunNotification(
                400,
                "opdatering fejlet",
                "Der opstod en fejl under opdateringen af denne ture"
            );
        }
    }, [dataPUT, errorPUT]);

    // update end

    // delte

    const handleDelete = async (e) => {
        e.preventDefault();

        const okToDelete = await RunConfirmation(
            "Slet ture?",
            "Er du sikker på du vil slette denne ture?"
        );

        if (okToDelete) {
            makeRequestDELETE(`${APIURL}tours/admin/${id}`, "DELETE");
        }
    }

    useEffect(() => {
        if (dataDELETE) {
            RunNotification(
                200,
                "opdateret!",
                "Turen er nu slettet"
            );
            setEditData({});
            navigate("/admin/ture");
        }
        if (errorDELETE) {
            RunNotification(
                400,
                "opstået fejlet",
                "Der opstod en fejl under sletningen at denne ture"
            );
        }
    }, [dataDELETE, errorDELETE]);

    // delete end

    return (
        <section id="EditTureAdmin">
            <NavLink to="/admin/ture">Gå tilbage</NavLink>
            {isLoading && <Loader />}
            {error && <Error />}
            {editData &&
                <form className="Trip-form">
                    <div className="editer">
                        <div className="images">
                            <figure className="image">
                                <img
                                    src={editData.image1 instanceof File
                                        ? URL.createObjectURL(editData.image1)
                                        : `${APISTORAGE}tours/${editData.image1}`}
                                    alt="Image 1 Preview"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                                    onChange={(e) => handleChange('image1', e.target.files[0])}
                                />
                            </figure>

                            <figure className="image">
                                <img
                                    src={editData.image2 instanceof File
                                        ? URL.createObjectURL(editData.image2)
                                        : `${APISTORAGE}tours/${editData.image2}`}
                                    alt="Image 2 Preview"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                                    onChange={(e) => handleChange('image2', e.target.files[0])}
                                />
                            </figure>
                        </div>

                        <div className="info">

                            <label htmlFor="Title">
                                <span>Title: </span>
                                <input
                                    value={editData.title}
                                    disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                                    id="Title"
                                    type="text"
                                    className="text"
                                    onChange={(e) => handleChange('title', e.target.value)}
                                />
                            </label>


                            <label htmlFor="content">
                                <span>Text: </span>
                                <ReactQuill
                                    theme="snow"
                                    id="content"
                                    value={editData.content}
                                    disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                                    onChange={(value) => handleChange('content', value)}
                                />
                            </label>

                            <label htmlFor="Pris" className="price">
                                <span>Pris: </span>
                                <input
                                    value={editData.price}
                                    disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                                    id="Pris"
                                    type="text"
                                    onChange={(e) => handleChange('price', e.target.value)}
                                />
                            </label>

                            <label htmlFor="Dato">
                                <span>Dato: </span>
                                <input
                                    value={editData.spacelaunch}
                                    disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                                    id="Dato"
                                    type="date"
                                    onChange={(e) => handleChange('spacelaunch', e.target.value)}
                                />
                            </label>

                            <label htmlFor="traveltime">
                                <span>traveltime: </span>
                                <input
                                    value={editData.traveltime}
                                    disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                                    id="traveltime"
                                    type="text"
                                    className="text"
                                    onChange={(e) => handleChange('traveltime', e.target.value)}
                                />
                            </label>

                            <label htmlFor="destination">
                                <span>destination: </span>
                                <input
                                    value={editData.destination}
                                    disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                                    id="destination"
                                    type="text"
                                    className="text"
                                    onChange={(e) => handleChange('destination', e.target.value)}
                                />
                            </label>

                            <label htmlFor="distance">
                                <span>distance: </span>
                                <input
                                    value={editData.distance}
                                    disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                                    id="distance"
                                    type="text"
                                    className="text"
                                    onChange={(e) => handleChange('distance', e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="options">
                        <button
                            type="submit"
                            disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Gem ændringer
                        </button>
                        <button
                            type="reset"
                            className="slet"
                            disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                            onClick={(e) => handleDelete(e)}
                        >
                            Slet ture
                        </button>
                    </div>
                </form>
            }
        </section>
    );
};
export default UploadTure;
