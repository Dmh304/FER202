import React, { useEffect, useState, useCallback } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

const AppProvider = ({ children }) => {
  const [producers, setProduces] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [stars, setStars] = useState([]);
  const [movies, setMovies] = useState([]);

  const fetchMovies = useCallback(() => {
    axios
      .get("http://localhost:9999/movies")
      .then((res) => setMovies(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9999/producers")
      .then((res) => setProduces(res.data));

    axios
      .get("http://localhost:9999/directors")
      .then((res) => setDirectors(res.data));

    axios.get("http://localhost:9999/stars").then((res) => setStars(res.data));

    fetchMovies();
  }, [fetchMovies]);

  return (
    <AppContext.Provider
      value={{ producers, directors, stars, movies, fetchMovies }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
