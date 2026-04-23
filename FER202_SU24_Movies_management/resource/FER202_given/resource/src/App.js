import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Movies from "./Movies";
import AddStars from "./AddStars";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/movie" replace />} />
        <Route path="/movie" element={<Movies></Movies>} />
        <Route path="/movie/:id/add-stars" element={<AddStars></AddStars>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
