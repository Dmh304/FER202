
import './App.css';
import './shopping.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shopping from './Shopping.jsx';
import OrderHistory from './OrderHistory.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shopping />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
