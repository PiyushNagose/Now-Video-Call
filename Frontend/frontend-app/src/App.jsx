import { useState } from "react";
import "./App.css";
import LandingPage from "./Page/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./Page/Athentication";
import { AuthProvider } from "./Contexts/AuthContext";
import VideoMeet from "./Page/VideoMeet";
import Home from "./Page/Home";
import History from "./Page/History";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/home" element={<Home />} />
            <Route path="/:url" element={<VideoMeet />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
