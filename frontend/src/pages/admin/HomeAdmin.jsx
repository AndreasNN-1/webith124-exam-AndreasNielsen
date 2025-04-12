import React from "react";
import "./HomeAdmin.scss";
import UserBanner from "../../components/UserBanner";
import NewsLetterAdmin from "../../components/NewsLetterAdmin";
import ContactAdmin from "../../components/ContactAdmin";

const HomeAdmin = () => {

  return (
    <div className="container">
      <UserBanner />
      <NewsLetterAdmin />
      <ContactAdmin />
    </div>
  );
};

export default HomeAdmin;
