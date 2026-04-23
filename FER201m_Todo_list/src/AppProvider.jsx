import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

const AppProvider = ({ children }) => {
  const [todo, setTodo] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/todo")
      .then((res) => setTodo(res.data));

    axios.get("http://localhost:9999/user").then((res) => setUser(res.data));
  }, []);

  return (
    <AppContext.Provider value={{ user, todo }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
