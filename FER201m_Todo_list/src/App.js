import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index></Index>} />
        {/* <Route path="/" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;