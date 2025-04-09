import { useEffect, useState, useMemo } from "react";
import "./DataPages.scss";
import datafile from "./sad.json";

const DataPages = () => {
  const itemNumberDefault = 20;
  const [itemNumber, setItemNumber] = useState(itemNumberDefault * 2);
  const [itemSort, setItemSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const filterItems = ["Newest", "Oldest", "Highest Rating", "Lowest Rating"];
  const filteredData = useMemo(() => {
    return datafile.filter(
      (item) =>
        item.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
        item.text.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
  }, [searchTerm]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (itemSort === filterItems[0]) return new Date(b.date) - new Date(a.date);
      if (itemSort === filterItems[1]) return new Date(a.date) - new Date(b.date);
      if (itemSort === filterItems[2]) return b.rating - a.rating || new Date(b.date) - new Date(a.date);
      if (itemSort === filterItems[3]) return a.rating - b.rating || new Date(b.date) - new Date(a.date);
      return 0;
    });
  }, [filteredData, itemSort]);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemNumber);
  const paginatedData = sortedData.slice((page - 1) * itemNumber, page * itemNumber);

  useEffect(() => setPage(1), [searchTerm, itemSort, itemNumber]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, page - 3);
    let end = Math.min(totalPages, page + 3);

    if (page <= 4) {
      start = 1;
      end = Math.min(7, totalPages);
    } else if (page >= totalPages - 3) {
      start = Math.max(1, totalPages - 6);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="DataPages">
      <div className="filters">
        <div>
          <label htmlFor="Search">Search for Item</label>
          <input
            name="Search"
            id="Search"
            type="search"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="itemNumber">Items per page</label>
          <select id="itemNumber" name="itemNumber" value={itemNumber} onChange={(e) => setItemNumber(Number(e.target.value))}>
            {[...Array(5)].map((_, index) => (
              <option key={index} value={(index + 1) * itemNumberDefault}>
                {(index + 1) * itemNumberDefault}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sortby">Sort by</label>
          <select id="sortby" name="sortby" value={itemSort} onChange={(e) => setItemSort(e.target.value)}>
            {filterItems.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="data-container">
        {paginatedData.length !== 0 ? paginatedData.map((item, index) => (
          <div key={index} className="data-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <p>Rating: {item.rating} Stars</p>
            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
          </div>
        )) : <p>no data sorry</p>}
      </div>

      <div className="page-controls">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Prev
        </button>

        <div className="pages">
          {getPageNumbers().map((num) => (
            <button key={num} onClick={() => setPage(num)} className={num === page ? "active" : ""}>
              {num}
            </button>
          ))}
        </div>

        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages || paginatedData.length === 0}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataPages;
