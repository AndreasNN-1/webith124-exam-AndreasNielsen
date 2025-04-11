import { useEffect } from "react";
import useRequstData from "../hooks/useRequstData";
import "./Team.scss";
import Loader from "./Loader";
import Error from "./Error";

const Team = () => {
  const APIURL = import.meta.env.VITE_APP_API;
  const APISTORAGE = import.meta.env.VITE_APP_API_STORAGE;

  const { makeRequest: makeRequest, isLoading: isLoading, data: data, error: error } = useRequstData();

  // get the good stuff ;)  [api stuff]
  useEffect(() => {
    makeRequest(`${APIURL}team`, "GET");
  }, []);

  return (
    <section className="Team">
      <h3>Vores team</h3>
      <div className="members">
        {isLoading && <Loader />}
        {error && <Error />}
        {data &&
          data.map((team, index) => (
            <div key={index} className="member">
              <div className="profile-img">
                <figure className="profile-con">
                  <img src={`${APISTORAGE}team/${team.image}`} alt="" />
                </figure>
              </div>
              <div className="member-info">
                <h5 className="name">{team.name}</h5>
                <p className="role">{team.role}</p>
                <p className="tlf">{team.phone}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Team;
