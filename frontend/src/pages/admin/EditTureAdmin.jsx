import React, { useContext, useEffect, useRef, useState } from "react";
import "./EditTureAdmin.scss";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import useRequstData from "../../hooks/useRequstData";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { NotificationContext } from "../../context/NotificationContext";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./quill.scss";

const EditTureAdmin = () => {
  const { RunNotification, RunConfirmation } = useContext(NotificationContext);

  const APIURL = import.meta.env.VITE_APP_API;
  const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;

  const navigate = useNavigate();
  const { id } = useParams();
  const [editData, setEditData] = useState({ title: "", image1: null, image2: null, traveltime: "", distance: "", content: "", destination: "", price: "", spacelaunch: "" });

  const { makeRequest, isLoading, data, error } = useRequstData();
  const { makeRequest: makeRequestPUT, isLoading: isLoadingPUT, data: dataPUT, error: errorPUT } = useRequstData();
  const { makeRequest: makeRequestDELETE, isLoading: isLoadingDELETE, data: dataDELETE, error: errorDELETE } = useRequstData();

  // Quill stuff
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


  // get data with id when id
  useEffect(() => {
    makeRequest(`${APIURL}tours/${id}`, "GET");
  }, [id]);


  // check for data
  useEffect(() => {
    if (data) {
      // if data set data
      setEditData((prevData) => ({
        ...prevData,
        ...data,
        //                            remove all after T
        spacelaunch: data.spacelaunch.split("T")[0],
      }));
    }

    // if quill not started and data = start quill editer
    if (!refQuill.current && data) {
      refQuill.current = new Quill(refQuillContainer.current, quillOptions);
    }
  }, [data]);



  // checg value using name
  const handleChange = (name, value) => {
    setEditData((prev) => ({ ...prev, [name]: value }));
  };




  // update

  const handleSubmit = (e) => {
    e.preventDefault();


    // check for missing inputs
    if (
      editData.title?.trim() == "" ||
      refQuill.current == "" ||
      editData.traveltime?.trim() == "" ||
      editData.distance?.trim() == "" ||
      editData.price?.trim() == "" ||
      editData.spacelaunch?.trim() == ""
    ) {
      RunNotification(400, "tomme felter", "Venligst udfyld alle felter i formen");
      return;
    }


    let formData = new FormData();

    // if data add it to the Form
    if (editData.title) formData.append("title", editData.title);
    if (refQuill.current) formData.append("content", refQuill.current.getSemanticHTML().replace(/&nbsp;/g, " "));
    if (editData.traveltime) formData.append("traveltime", editData.traveltime);
    if (editData.distance) formData.append("distance", editData.distance);
    if (editData.price) formData.append("price", editData.price);
    if (editData.spacelaunch) formData.append("spacelaunch", editData.spacelaunch);

    //  instanceof File == if file
    if (editData.image1 instanceof File) formData.append("image1", editData.image1);
    if (editData.image2 instanceof File) formData.append("image2", editData.image2);


    // send
    makeRequestPUT(`${APIURL}tours/admin/${id}`, "PUT", formData);
  };




  // PUT response
  useEffect(() => {
    if (dataPUT) {
      RunNotification(200, "opdateret!", "Ture er nu opdateret");
      setEditData({ title: "", image1: null, image2: null, traveltime: "", distance: "", content: "", destination: "", price: "", spacelaunch: "" });
      navigate("/admin/ture");
    }
    if (errorPUT) {
      RunNotification(400, "opdatering fejlet", "Der opstod en fejl under opdateringen af denne ture"
      );
    }
  }, [dataPUT, errorPUT]);

  // update end



  // delte

  const handleDelete = async (e) => {
    e.preventDefault();


    // is it ok to delete?
    const okToDelete = await RunConfirmation(
      "Slet ture?",
      "Er du sikker på du vil slette denne ture?"
    );

    if (okToDelete) {
      makeRequestDELETE(`${APIURL}tours/admin/${id}`, "DELETE");
    }
  };


  // DELETE response
  useEffect(() => {
    if (dataDELETE) {
      RunNotification(200, "opdateret!", "Turen er nu slettet");
      setEditData({ title: "", image1: null, image2: null, traveltime: "", distance: "", destination: "", price: "", spacelaunch: "" });
      navigate("/admin/ture");
    }
    if (errorDELETE) {
      RunNotification(400, "opstået fejlet", "Der opstod en fejl under sletningen at denne ture");
    }
  }, [dataDELETE, errorDELETE]);

  // delete end

  return (
    <section id="EditTureAdmin">
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
                      : `${APISTORAGE}tours/${editData.image1}`
                  }
                  alt="Image 1 Preview"
                />
                <input
                  type="file"
                  accept="image/*"
                  disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                  onChange={(e) => handleChange("image1", e.target.files[0])}
                />
              </figure>

              <figure className="image">
                <img
                  src={
                    editData.image2 instanceof File
                      ? URL.createObjectURL(editData.image2)
                      : `${APISTORAGE}tours/${editData.image2}`
                  }
                  alt="Image 2 Preview"
                />
                <input
                  type="file"
                  accept="image/*"
                  disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                  onChange={(e) => handleChange("image2", e.target.files[0])}
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

              <label htmlFor="Pris" className="price">
                <span>Pris: </span>
                <input
                  value={editData.price}
                  disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                  id="Pris"
                  type="text"
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </label>

              <label htmlFor="Dato">
                <span>Dato: </span>
                <input
                  value={editData.spacelaunch}
                  disabled={isLoading || isLoadingDELETE || isLoadingPUT}
                  id="Dato"
                  type="date"
                  onChange={(e) => handleChange("spacelaunch", e.target.value)}
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
                  onChange={(e) => handleChange("traveltime", e.target.value)}
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
                  onChange={(e) => handleChange("destination", e.target.value)}
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
                  onChange={(e) => handleChange("distance", e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="options">
            {isLoadingDELETE || isLoadingPUT ?
              (
                <Loader />
              ) : (
                <>
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
                </>
              )
            }
          </div>
        </form>
      )}
    </section>
  );
};

export default EditTureAdmin;
