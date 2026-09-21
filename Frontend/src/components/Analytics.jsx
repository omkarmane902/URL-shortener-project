import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Analytics.css";

const API_URL = import.meta.env.VITE_API_URL;

const Analytics = () => {
  const { shortId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/url/analytics/${shortId}`
        );

        console.log("Analytics Data:", response.data);

        setData(response.data);

      } catch (error) {
        console.error("Analytics Error:", error);

        setError("Unable to load analytics");

      } finally {
        setLoading(false);
      }
    };

    getAnalytics();

  }, [shortId]);

  if (loading) {
    return (
      <div className="loading">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-error">
        {error}
      </div>
    );
  }

  return (
    <div className="analytics-container">

      <div className="analytics-wrapper">

        <Link to="/" className="back-button">
          ← Back to Home
        </Link>

        <div className="analytics-header">

          <h1>URL Analytics</h1>

          <p>
            Track your short URL performance
          </p>

        </div>

        <div className="stats-card">

          <div className="total-clicks-card">

            <h2>
              {data?.totalClicks || 0}
            </h2>

            <p>
              Total Clicks
            </p>

          </div>

        </div>

        <div className="history-card">

          <h2>
            Visit History
          </h2>

          {data?.analytics?.length === 0 ? (

            <div className="no-data">
              No clicks yet.
            </div>

          ) : (

            <table className="history-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Date & Time</th>
                </tr>

              </thead>

              <tbody>

                {data?.analytics?.map((item, index) => (

                  <tr key={index}>

                    <td>
                      <span className="click-number">
                        {index + 1}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        item.timestamp
                      ).toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
};

export default Analytics;