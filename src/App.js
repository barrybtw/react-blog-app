import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>hi</h1>} />
      </Routes>
    </Router>
  );
};
