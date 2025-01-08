import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${searchText}&media_type=image&year_start=${startYear}&year_end=${endYear}`
      );
      const data = await response.json();
  
      console.log(data); 
  
    
      return data.collection.items.map((item: any) => ({
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
    if (
      parseInt(startYear) < 1920 ||
      parseInt(endYear) > 2024 ||
      parseInt(endYear) < parseInt(startYear)
    ) {
      setError("Please enter a valid year range (1920–2024).");
      return;
    }
  
    const images = await fetchData();
    if (images.length === 0) {
      setError("No results found. Please try again.");
      return;
    }
  
    setError(""); 
    navigate("/display", { state: { images } });
  };
  

  return (
    <div className="landing-page">
      <h1 className="landing-title">NASA Image Search</h1>
      <input
        type="text"
        placeholder="Enter in phrase"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="input-field"
      />
      <div className="year-inputs">
        <label htmlFor="startYear" className="year-label">Select Year Range:</label>
        <input
          type="number"
          placeholder="1920"
          id="startYear"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          className="year-input"
        />
        <input
          type="number"
          placeholder="2024"
          id="endYear"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          className="year-input"
        />
      </div>
      {error && <p className="error-text">{error}</p>}
      <button onClick={handleSearch} className="search-button">
        Search!
      </button>
    </div>
  );
};

export default LandingPage;
