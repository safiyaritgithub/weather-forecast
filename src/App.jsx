import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/home";
import Weather from "./components/pages/Weather";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:loc" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
