import React from "react";
import { useEffect, useState } from "react";
import SevaCard from "../components/SevaCard/SevaCard";
import styles from "./Home.module.css";
import axios from "axios";

const Home = () => {
  const [sevas, setSevas] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchSevas = async () => {
    try {
      const res = await axios.get(
        `https://devaseva-backend.onrender.com/api/sevas`
      );
      const allSevas = res.data;
      const paginated = allSevas.slice(0, page * 10);
      setSevas(paginated);
      if (paginated.length >= allSevas.length) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching sevas:", err);
    }
  };
  useEffect(() => {
    fetchSevas();
  }, [page]);

  const handleViewMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <h2>DevaSeva</h2>
      <p>India’s most trusted platform for live Pujas</p>
      <div className={styles.grid}>
        {sevas.map((seva, index) => (
          <SevaCard key={index} seva={seva} />
        ))}
      </div>
      {hasMore && (
        <button className={styles.viewMore} onClick={handleViewMore}>
          View More
        </button>
      )}
    </div>
  );
};

export default Home;
