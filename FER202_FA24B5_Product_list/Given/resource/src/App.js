import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList></ProductList>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
