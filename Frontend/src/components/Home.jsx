import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setShortId("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/url`,
        {
          url: url,
        }
      );

      console.log("Response:", response.data);

      setShortId(response.data.id);
      setUrl("");

    } catch (error) {
      console.error("Axios Error:", error);

      if (error.response) {
        setError(
          error.response.data?.message ||
          error.response.data?.Message ||
          "Something went wrong"
        );
      } else {
        setError("Cannot connect to backend.");
      }

    } finally {
      setLoading(false);
    }
  };

  const shortUrl = shortId
    ? `${import.meta.env.VITE_API_URL}/url/${shortId}`
    : "";

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-container">

      <div className="url-card">

        <h1>URL Shortener</h1>

        <p className="subtitle">
          Create short URLs quickly and easily
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="url"
            placeholder="Enter your long URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading
              ? "Generating..."
              : "Generate Short URL"}
          </button>

        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {shortId && (
          <div className="result-box">

            <h3>Your Short URL</h3>

            <div className="short-url">

              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
              >
                {shortUrl}
              </a>

            </div>

            <div className="actions">

              <button onClick={copyUrl}>
                Copy URL
              </button>

              <Link
                to={`/analytics/${shortId}`}
                className="analytics-btn"
              >
                View Analytics
              </Link>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Home;