import React, { useContext, useEffect, useState } from "react";
import useRequstData from "../../hooks/useRequstData";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import { NotificationContext } from "../../context/NotificationContext";
import "./HomeAdmin.scss";

const HomeAdmin = () => {
  const { RunNotification, RunConfirmation } = useContext(NotificationContext);
  const apiURL = import.meta.env.VITE_APP_API;
  const apiStorage = import.meta.env.VITE_APP_API_STORAGE;
  const {
    makeRequest: makeRequestGET,
    isLoading: isLoadingGET,
    data: dataGET,
    error: errorGET,
  } = useRequstData();
  const {
    makeRequest: makeRequestPUT,
    isLoading: isLoadingPUT,
    data: dataPUT,
    error: errorPUT,
  } = useRequstData();
  const {
    makeRequest: makeRequestPOST,
    isLoading: isLoadingPOST,
    data: dataPOST,
    error: errorPOST,
  } = useRequstData();
  const {
    makeRequest: makeRequestDELETE,
    isLoading: isLoadingDELETE,
    data: dataDELETE,
    error: errorDELETE,
  } = useRequstData();

  // useEffect(() => {
  //   makeRequestGET(`${apiURL}coffeerecipes`, "GET");
  // }, []);

  /* ============================
   Edit Form Start
   ============================ */

  const [editingItemId, setEditingItemId] = useState(null);
  const [PUTimgPreview, setPUTImgPreview] = useState(null);
  const [PUTformData, setPUTFormData] = useState({
    title: "",
    description: "",
    recipe: "",
    image: null,
  });
  const editItem = (ID) => {
    const formData = new FormData();
    console.log(editingItemId);
    console.log(PUTformData);

    if (PUTformData.title) {
      formData.append("title", PUTformData.title);
    }
    if (PUTformData.description) {
      formData.append("description", PUTformData.description);
    }
    if (PUTformData.recipe) {
      formData.append("recipe", PUTformData.recipe);
    }
    if (PUTformData.image) {
      formData.append("image", PUTformData.image);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    makeRequestPUT(
      `${apiURL}coffeerecipes/${ID}`,
      "PUT",
      formData
    );
  };
  useEffect(() => {
    if (editingItemId) {
      const itemToEdit = dataGET?.find((item) => item._id === editingItemId);
      if (itemToEdit) {
        setPUTImgPreview(null);
        setPUTFormData({
          title: itemToEdit.title,
          description: itemToEdit.description,
          recipe: itemToEdit.recipe,
          image: null,
        });
      }
    }
  }, [editingItemId, dataGET]);
  const handleAddToggle = () => {
    setIsAdding(!isAdding);
    setPOSTImgPreview(null);
    setPOSTFormData({
      title: "",
      description: "",
      recipe: "",
      image: null,
    });
  };
  useEffect(() => {
    if (dataPUT) {
      makeRequestGET(`${apiURL}coffeerecipes`, "GET");
      setEditingItemId(null);
      setPUTFormData({
        title: null,
        description: null,
        recipe: null,
        image: null,
      });
      RunNotification(200, "Updated", "Item was successfully edited!");
    }
    if (errorPUT) {
      RunNotification(
        400,
        "Error",
        `There was an error editing the item: ${errorPUT}`
      );
    }
  }, [dataPUT, errorPUT]);

  /* ============================
   Edit Form End
   ============================ */

  /* ============================
   upload form Start
   ============================ */

  const [isAdding, setIsAdding] = useState(false);
  const [POSTimgPreview, setPOSTImgPreview] = useState(null);
  const [POSTformData, setPOSTFormData] = useState({
    title: "",
    description: "",
    recipe: "",
    image: null,
  });
  const uploadItem = () => {
    if (
      POSTformData.title.trim() === "" ||
      POSTformData.description.trim() === "" ||
      POSTformData.recipe.trim() === "" ||
      POSTformData.image === null
    ) {
      RunNotification(
        400,
        "Missing Field",
        "All fields need to be filled out."
      );
    } else {
      const formData = new FormData();
      formData.append("title", POSTformData.title);
      formData.append("description", POSTformData.description);
      formData.append("recipe", POSTformData.recipe);

      if (POSTformData.image) {
        formData.append("image", POSTformData.image);
      }
      makeRequestPOST(`${apiURL}coffeerecipes`,
        "POST",
        formData
      );
    }
  };
  useEffect(() => {
    if (dataPOST) {
      makeRequestGET(`${apiURL}coffeerecipes`, "GET");
      setIsAdding(false);
      RunNotification(200, "Uploaded", "Item was uploaded successfully!");
    }
    if (errorPOST) {
      RunNotification(
        400,
        "Error",
        `There was an error uploading the item: ${errorPOST}`
      );
    }
  }, [dataPOST, errorPOST]);

  /* ============================
   upload form End
   ============================ */

  /* ============================
   Delete Start
   ============================ */

  const deleteItem = async (id) => {
    const YesToDelete = await RunConfirmation(
      "Delete item?",
      "Do you whot to delete this item?"
    );

    if (YesToDelete) {
      makeRequestDELETE(
        `${apiURL}coffeerecipes/${id}`,
        "DELETE"
      );
    }
  };
  useEffect(() => {
    if (dataDELETE) {
      makeRequestGET(`${apiURL}coffeerecipes`, "GET");
      RunNotification(200, "Deleted", "Item was deleted successfully!");
    }
    if (errorDELETE) {
      RunNotification(
        400,
        "Error",
        `There was an error deleting the item: ${errorDELETE}`
      );
    }
  }, [dataDELETE, errorDELETE]);

  /* ============================
   Delete End
   ============================ */

  return (
    <div className="container">
      {isLoadingGET && <Loader />}
      {errorGET && <Error />}
      {dataGET && (
        <>
          {dataGET.map((item) => (
            <div key={item._id} className="item">
              {editingItemId === item._id ? (
                <div className="item-edit">
                  <input
                    type="text"
                    name="title"
                    value={PUTformData.title || ""}
                    onChange={(e) =>
                      setPUTFormData({
                        ...PUTformData,
                        title: e.target.value,
                      })
                    }
                  />
                  <textarea
                    type="text"
                    name="description"
                    value={PUTformData.description || ""}
                    onChange={(e) =>
                      setPUTFormData({
                        ...PUTformData,
                        description: e.target.value,
                      })
                    }
                  />
                  <textarea
                    type="text"
                    name="recipe"
                    value={PUTformData.recipe || ""}
                    onChange={(e) =>
                      setPUTFormData({
                        ...PUTformData,
                        recipe: e.target.value,
                      })
                    }
                  />
                  {PUTimgPreview ? (
                    <img src={PUTimgPreview} alt="Preview" />
                  ) : (
                    <img
                      src={`http://127.0.0.1:5020/uploads/${item.image}`}
                      alt="Preview"
                    />
                  )}
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPUTFormData({
                          ...PUTformData,
                          image: file,
                        });
                        setPUTImgPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <div className="buttons">
                    <button
                      onClick={() => {
                        setEditingItemId(null);
                        setPUTFormData({
                          title: "",
                          description: "",
                          recipe: "",
                          image: null,
                        });
                      }}
                    >
                      Back
                    </button>
                    <button onClick={() => editItem(item._id)}>Save</button>
                  </div>
                </div>
              ) : (
                <div className="item-content">
                  <div className="buttons">
                    <button onClick={() => setEditingItemId(item._id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                  </div>
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                  <p>{item.recipe}</p>
                  <img
                    src={apiStorage + item.image}
                    alt="cool img"
                  />
                </div>
              )}
            </div>
          ))}
          <div className="item">
            {isAdding ? (
              <div className="item-edit">
                <input
                  onChange={(e) =>
                    setPOSTFormData({
                      ...POSTformData,
                      title: e.target.value,
                    })
                  }
                  value={POSTformData.title || ""}
                  name="title"
                  id="title"
                />
                <textarea
                  onChange={(e) =>
                    setPOSTFormData({
                      ...POSTformData,
                      description: e.target.value,
                    })
                  }
                  value={POSTformData.description || ""}
                  name="description"
                  id="description"
                />

                <textarea
                  onChange={(e) =>
                    setPOSTFormData({ ...POSTformData, recipe: e.target.value })
                  }
                  value={POSTformData.recipe || ""}
                  name="recipe"
                  id="recipe"
                />

                {POSTimgPreview && <img src={POSTimgPreview} alt="Preview" />}
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPOSTFormData({
                        ...POSTformData,
                        image: file,
                      });
                      setPOSTImgPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <div className="buttons">
                  <button onClick={() => handleAddToggle()}>Back</button>
                  <button onClick={() => uploadItem()}>Add</button>
                </div>
              </div>
            ) : (
              <button className="add-button" onClick={() => handleAddToggle()}>
                Add recipe
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeAdmin;
