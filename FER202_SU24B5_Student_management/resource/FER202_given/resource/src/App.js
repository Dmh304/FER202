import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentManager from './StudentManager';
import Grade from "./Grade";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentManager></StudentManager>} />
        <Route path="/student" element={<StudentManager></StudentManager>} />
        <Route path="/student/:id" element={<Grade />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
