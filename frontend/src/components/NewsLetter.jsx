import React, { useContext, useState } from "react";
import "./NewsLetter.scss";
import { NotificationContext } from "../context/NotificationContext";

const NewsLetter = () => {
  const { RunNotification } = useContext(NotificationContext);
  const joined = sessionStorage.getItem("NewsLetter");
  const [Form, setForm] = useState({
    email: "",
    name: "",
  });

  const Submit = (e) => {
    e.preventDefault();

    const trimmedEmail = Form.email.trim();
    const trimmedName = Form.name.trim();

    if (trimmedEmail === "" || trimmedName === "") {
      RunNotification(
        400,
        "Missing Inputs",
        "Please fill out the email and name fields to join the newsletter"
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      RunNotification(400, "Invalid Email", "Please enter a valid email");
      return;
    }

    sessionStorage.setItem("NewsLetter", true);
    RunNotification(
      200,
      "Joined!",
      "You have successfully joined our newsletter for the latest news"
    );
    setForm({
      email: "",
      name: "",
    });
  };

  return (
    <div id="NewsLetter">
      <h4>Join our Newsletter</h4>
      {joined ? (
        <div className="joined">
          <p>Thanks for joining our News letter</p>
        </div>
      ) : (
        <form onSubmit={Submit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={Form.email}
            onChange={(e) => setForm({ ...Form, email: e.target.value })}
            required
            minLength={5}
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={Form.name}
            onChange={(e) => setForm({ ...Form, name: e.target.value })}
            required
            minLength={2}
          />
          <button type="submit">Join Newsletter</button>
        </form>
      )}
    </div>
  );
};

export default NewsLetter;
