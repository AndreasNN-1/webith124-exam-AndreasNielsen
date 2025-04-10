import React, { useContext, useEffect, useRef, useState } from "react";
import "./UploadTureAdmin.scss";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import useRequstData from "../../hooks/useRequstData";
import { NavLink, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./quill.scss";

const UploadTureAdmin = () => {
  const APIURL = import.meta.env.VITE_APP_API;
  const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;

  const refQuillContainerTwo = useRef();
  const refQuilltWO = useRef();
  const quillOptionss = {
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

  const navigate = useNavigate();

  const { RunNotification } = useContext(NotificationContext);
  const [editData, setEditData] = useState({
    title: "",
    image1: null,
    image2: null,
    traveltime: "",
    distance: "",
    destination: "",
    price: "",
    spacelaunch: "",
  });
  const { makeRequest, isLoading, data, error } = useRequstData();

  useEffect(() => {
    if (!refQuilltWO.current) {
      refQuilltWO.current = new Quill(
        refQuillContainerTwo.current,
        quillOptionss
      );
    }
  }, []);

  const handleChange = (name, value) => {
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // upload start

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      editData.title?.trim() == "" ||
      refQuilltWO.current == "" ||
      editData.traveltime?.trim() == "" ||
      editData.distance?.trim() == "" ||
      editData.destination?.trim() == "" ||
      editData.price?.trim() == "" ||
      editData.spacelaunch?.trim() == "" ||
      editData.image1 == null ||
      editData.image2 == null
    ) {
      RunNotification(
        400,
        "tomme felter",
        "Venligst udfyld alle felter i formen"
      );
      return;
    }
    let formData = new FormData();

    if (editData.title) formData.append("title", editData.title);
    if (refQuilltWO.current)
      formData.append(
        "content",
        refQuilltWO.current.getSemanticHTML().replace(/&nbsp;/g, " ")
      );
    if (editData.traveltime) formData.append("traveltime", editData.traveltime);
    if (editData.distance) formData.append("distance", editData.distance);
    if (editData.destination)
      formData.append("destination", editData.destination);
    if (editData.price) formData.append("price", editData.price);
    if (editData.spacelaunch)
      formData.append("spacelaunch", editData.spacelaunch);
    if (editData.image1 instanceof File)
      formData.append("image1", editData.image1);
    if (editData.image2 instanceof File)
      formData.append("image2", editData.image2);

    makeRequest(`${APIURL}tours/admin`, "POST", formData);
  };

  useEffect(() => {
    if (data) {
      RunNotification(200, "opdateret!", "Ture er du opdateret");
      setEditData({});
      navigate("/admin/ture");
    }
    if (error) {
      RunNotification(
        400,
        "opdatering fejlet",
        "Der opstod en fejl under opdateringen af denne ture"
      );
    }
  }, [data, error]);

  // upload end

  return (
    <section id="UploadTureAdmin">
      <NavLink to="/admin/ture">Gå tilbage</NavLink>
      {isLoading && <Loader />}
      {error && <Error />}
      {editData && (
        <form className="Trip-form">
          <div className="editer">
            <div className="images">
              <figure className="image">
                <img
                  src={
                    editData.image1 instanceof File
                      ? URL.createObjectURL(editData.image1)
                      : `${APPSTORAGE}PlaceholderImage.jpg`
                  }
                  alt="Image 1 Preview"
                />
                <input
                  type="file"
                  accept="image/*"
                  disabled={isLoading}
                  onChange={(e) => handleChange("image1", e.target.files[0])}
                />
              </figure>

              <figure className="image">
                <img
                  src={
                    editData.image2 instanceof File
                      ? URL.createObjectURL(editData.image2)
                      : `${APPSTORAGE}PlaceholderImage.jpg`
                  }
                  alt="Image 2 Preview"
                />
                <input
                  type="file"
                  accept="image/*"
                  disabled={isLoading}
                  onChange={(e) => handleChange("image2", e.target.files[0])}
                />
              </figure>
            </div>

            <div className="info">
              <label htmlFor="Title">
                <span>Title: </span>
                <input
                  placeholder="Title"
                  value={editData.title}
                  disabled={isLoading}
                  id="Title"
                  type="text"
                  className="text"
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </label>

              <label htmlFor="content">
                <span>Text: </span>
                <div ref={refQuillContainerTwo}></div>
              </label>

              <label htmlFor="Pris" className="price">
                <span>Pris: </span>
                <input
                  placeholder="pris"
                  value={editData.price}
                  disabled={isLoading}
                  id="Pris"
                  type="text"
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </label>

              <label htmlFor="Dato">
                <span>Dato: </span>
                <input
                  value={editData.spacelaunch}
                  disabled={isLoading}
                  id="Dato"
                  type="date"
                  onChange={(e) => handleChange("spacelaunch", e.target.value)}
                />
              </label>

              <label htmlFor="traveltime">
                <span>traveltime: </span>
                <input
                  value={editData.traveltime}
                  disabled={isLoading}
                  placeholder="traveltime"
                  id="traveltime"
                  type="text"
                  className="text"
                  onChange={(e) => handleChange("traveltime", e.target.value)}
                />
              </label>

              <label htmlFor="destination">
                <span>destination: </span>
                <input
                  value={editData.destination}
                  disabled={isLoading}
                  placeholder="destination"
                  id="destination"
                  type="text"
                  className="text"
                  onChange={(e) => handleChange("destination", e.target.value)}
                />
              </label>

              <label htmlFor="distance">
                <span>distance: </span>
                <input
                  value={editData.distance}
                  disabled={isLoading}
                  placeholder="distance"
                  id="distance"
                  type="text"
                  className="text"
                  onChange={(e) => handleChange("distance", e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="options">
            <button
              type="submit"
              disabled={isLoading}
              onClick={(e) => handleSubmit(e)}
            >
              Upload Ture
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default UploadTureAdmin;
