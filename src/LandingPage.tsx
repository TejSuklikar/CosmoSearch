import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://images-api.nasa.gov/search", {
        params: {
          q: searchText,
          media_type: "image",
          year_start: startYear,
          year_end: endYear,
        },
      });

      return response.data.collection.items.map((item: any) => ({
        href: item.links?.[0]?.href || "",
        title: item.data?.[0]?.title || "Untitled",
        description: item.data?.[0]?.description || "No description available.",
        date_created: item.data?.[0]?.date_created || "Unknown date",
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim() || !startYear || !endYear) {
      setError("Please fill in all fields.");
      return;
    }

    if (
      parseInt(startYear) < 1920 ||
      parseInt(endYear) > 2025 ||
      parseInt(endYear) < parseInt(startYear)
    ) {
      setError("Please enter a valid year range (1920–2025).");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const images = await fetchData();
      if (images.length === 0) {
        setError("No results found. Please try again.");
      } else {
        navigate("/display", { state: { images } });
      }
    } catch {
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <h1 className="landing-title">NASA Image Search</h1>
      <input
        type="text"
        placeholder="Enter a phrase"
        value={searchText}
        onChange={(e) => {
          setError("");
          setSearchText(e.target.value);
        }}
        className="input-field"
        aria-label="Search phrase"
      />
      <div className="year-inputs">
        <label htmlFor="startYear" className="year-label">
          Select Year Range:
        </label>
        <input
          type="number"
          placeholder="1920"
          id="startYear"
          value={startYear}
          onChange={(e) => {
            setError("");
            setStartYear(e.target.value);
          }}
          className="year-input"
          aria-label="Start year"
        />
        <input
          type="number"
          placeholder="2025"
          id="endYear"
          value={endYear}
          onChange={(e) => {
            setError("");
            setEndYear(e.target.value);
          }}
          className="year-input"
          aria-label="End year"
        />
      </div>
      {error && <p className="error-text">{error}</p>}
      {isLoading && <p className="loading-text">Loading...</p>}
      <button onClick={handleSearch} className="search-button" disabled={isLoading}>
        Search!
      </button>
    </div>
  );
};

export default LandingPage;
