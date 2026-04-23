import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./Movies";
import Booking from "./Booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movies" element={<Movies></Movies>} />
        <Route path="/booking/create" element={<Booking></Booking>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
