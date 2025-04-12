import React, { useContext, useEffect, useRef, useState } from "react";
import "./EditRumfærgenAdmin.scss";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import useRequstData from "../../hooks/useRequstData";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { NotificationContext } from "../../context/NotificationContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./quill.scss";

const EditRumfærgenAdmin = () => {
    const { RunNotification } = useContext(NotificationContext);

    const APIURL = import.meta.env.VITE_APP_API;
    const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;

    const navigate = useNavigate();
    const [editData, setEditData] = useState({ title: "", image: null, content: "", });

    const { makeRequest, isLoading, data, error } = useRequstData();
    const { makeRequest: makeRequestPUT, isLoading: isLoadingPUT, data: dataPUT, error: errorPUT } = useRequstData();

    // quill editer
    const refQuillContainer = useRef();
    const refQuill = useRef();
    const quillOptions = {
        theme: "snow",
        modules: {
            toolbar: [
                [
                    "bold",
                    "italic",
                    "underline",
                    { list: "ordered" },
                    { list: "bullet" },
                    { list: "check" },
                ],
            ],
        },
    };



    // get data
    useEffect(() => {
        makeRequest(`${APIURL}spacecraft`, "GET");
    }, []);


    // run when data value updates the set data
    useEffect(() => {
        if (data) {
            setEditData(data);
        }
        // start quill in the div
        if (!refQuill.current && data) {
            refQuill.current = new Quill(refQuillContainer.current, quillOptions);
        }
    }, [data]);


    // set value using name
    const handleChange = (name, value) => {
        setEditData((prev) => ({ ...prev, [name]: value }));
    };



    // update
    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            // check for errors
            editData.title?.trim() == "" ||
            refQuill.current.editor.delta.ops[0]?.insert.replace("\n", " ").trim() == "" ||
            editData.image == null
        ) {
            RunNotification(400, "tomme felter", "Venligst udfyld alle felter i formen");
            return;
        }


        let formData = new FormData();

        // if data add to form
        if (editData.title) formData.append("title", editData.title);
        if (refQuill.current) formData.append("content", refQuill.current.getSemanticHTML().replace(/&nbsp;/g, " "));
        if (editData.image instanceof File) formData.append("image", editData.image);


        // send
        makeRequestPUT(`${APIURL}spacecraft/admin`, "PUT", formData);
    };



    // PUT response
    useEffect(() => {
        if (dataPUT) {
            RunNotification(200, "opdateret!", "Rumfærgen er nu opdateret");
            setEditData({ title: "", image: null, content: "" });
            navigate("/admin/rumfærgen");
        }
        if (errorPUT) {
            RunNotification(400, "opdatering fejlet", "Der opstod en fejl under opdateringen af Rumfærgen");
        }
    }, [dataPUT, errorPUT]);

    // update end


    return (
        <article id="EditRumfærgenAdmin">
            <NavLink to="/admin/rumfærgen">Gå tilbage</NavLink>
            {isLoading && <Loader />}
            {error && <Error />}
            {editData && (
                <form className="Rumfærgen-form">
                    <div className="editer">
                        <div className="images">
                            <figure className="image">
                                <img
                                    src={
                                        editData.image instanceof File
                                            ? URL.createObjectURL(editData.image)
                                            : `${APISTORAGE}spacecraft/${editData.image}`
                                    }
                                    alt="Image 1 Preview"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    disabled={isLoading || isLoadingPUT}
                                    onChange={(e) => handleChange("image", e.target.files[0])}
                                />
                            </figure>
                        </div>

                        <div className="info">
                            <label htmlFor="Title">
                                <span>Title: </span>
                                <input
                                    value={editData.title}
                                    disabled={isLoading || isLoadingPUT}
                                    id="Title"
                                    type="text"
                                    className="text"
                                    minLength={3}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                />
                            </label>

                            <label htmlFor="content">
                                <span>Text: </span>
                                <div ref={refQuillContainer}
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(data?.content),
                                    }}
                                ></div>
                            </label>
                        </div>
                    </div>
                    <div className="options">
                        {isLoadingPUT ?
                            (
                                <Loader />
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isLoading || isLoadingPUT}
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Gem ændringer
                                </button>
                            )
                        }
                    </div>
                </form>
            )
            }
        </article >
    );
};

export default EditRumfærgenAdmin;
