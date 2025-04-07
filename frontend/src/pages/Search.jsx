import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Search.scss";

const Search = () => {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState(id || "");
    const navigate = useNavigate();

    useEffect(() => {
        setSearchTerm(id);
    }, [id])

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            navigate(`/search/${searchTerm}`);
        }
    };

    return (
        <div id="Search">
            <div className="SearchBox">
                <h3>Search for something</h3>
                <input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {id && id.length !== 0 &&
                <div className="Results">
                    <p>Results for: {id}</p>
                </div>
            }
        </div>
    );
};

export default Search;
