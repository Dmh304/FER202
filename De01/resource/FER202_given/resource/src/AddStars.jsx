import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useProvider } from "./useProvider";

const AddStars = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, stars, fetchMovies } = useProvider();
  const [movie, setMovie] = useState(null);
  const [selectedStars, setSelectedStars] = useState([]);

  useEffect(() => {
    const foundMovie = movies?.find((m) => m.id === parseInt(id));
    setMovie(foundMovie);
    setSelectedStars(foundMovie?.stars || []);
  }, [id, movies]);

  const handleStarChange = (starId) => {
    setSelectedStars((prev) =>
      prev.includes(starId)
        ? prev.filter((s) => s !== starId)
        : [...prev, starId],
    );
  };

  const handleAddStars = async () => {
    try {
      const response = await fetch(`http://localhost:9999/movies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars: selectedStars }),
      });

      if (response.ok) {
        await fetchMovies();
        alert("Add the Stars successfully");
        navigate("/movie");
      }
    } catch (error) {
      alert("Error adding stars: " + error.message);
    }
  };

  return (
    <Container style={{ padding: "20px" }}>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Add stars to the movie
      </h2>
      <hr />
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      >
        <h4>Movie title</h4>
        <p>{movie?.title}</p>
      </div>

      <div>
        <h4>Stars</h4>
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {stars?.map((star) => (
            <label
              key={star.id}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="checkbox"
                checked={selectedStars.includes(star.id)}
                onChange={() => handleStarChange(star.id)}
              />
              {star.fullname}
            </label>
          ))}
        </div>
      </div>

      <Button
        onClick={handleAddStars}
        style={{
          backgroundColor: "#28a745",
          border: "none",
          marginBottom: "20px",
        }}
      >
        Add Stars
      </Button>
    </Container>
  );
};

export default AddStars;
