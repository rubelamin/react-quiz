import React, { useMemo } from "react";
import image from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import classes from "../styles/Summery.module.css";

export default function Summery({ score, noq }) {
  const getKeyword = useMemo(() => {
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  }, [score, noq]);
  const photoUrl = `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`;
  const { loading, error, result } = useFetch(photoUrl, "GET", {
    Authorization: process.env.REACT_APP_PEXELS_API_KEY,
  });

  const img = result ? result?.photos[0].src.medium : image;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={classes.badge}>Loading badge...</div>}
      {error && <div className={classes.badge}>Error happaned</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={img} alt="Success" />
        </div>
      )}
    </div>
  );
}
