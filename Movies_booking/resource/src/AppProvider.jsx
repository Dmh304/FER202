import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/movies")
      .then((res) => setMovies(res.data));

    axios.get("http://localhost:9999/users").then((res) => setUser(res.data));
  }, []);

  return (
    <AppContext.Provider value={{ user, movies }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
