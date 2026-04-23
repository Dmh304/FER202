import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    // const [carts, setCarts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:9999/products")
            .then((res) => setProducts(res.data));

        // axios.get("http://localhost:9999/carts").then((res) => seCarts(res.data));
    }, []);

    return (
        <AppContext.Provider value={{ products }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
