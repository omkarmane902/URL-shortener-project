import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "./components/Analytics";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/analytics/:shortId"
          element={<Analytics />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;