// App.jsx or App.js
import React, { useState } from "react";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import LandingPage from "./components/LandingPage";

export default function App() {
  const [page, setPage] = useState("landing");
  return (
    <>
      {page === "landing" ? (
        <LandingPage onGetStarted={() => setPage("analyze")} />
      ) : (
        <ResumeAnalyzer />
      )}
    </>
  );
}
