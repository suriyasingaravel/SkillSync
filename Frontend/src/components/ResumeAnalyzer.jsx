import React, { useState } from "react";
import axios from "axios";

const gradientBg =
  "bg-gradient-to-tr from-blue-400 via-fuchsia-200 to-purple-200 animate-gradient-x";

function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
  const [jd, setJD] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jd.trim()) {
      alert("Please upload a resume and paste the job description.");
      return;
    }
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd_text", jd);

    try {
      const res = await axios.post("http://localhost:8000/analyze/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResult(res.data);
    } catch (err) {
      alert("Upload failed: " + (err?.response?.data?.detail || err.message));
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen ${gradientBg} flex flex-col items-center justify-center px-2 py-10 relative overflow-x-hidden`}>
      {/* Animated background bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-purple-300 opacity-30 rounded-full mix-blend-multiply blur-2xl animate-pulse" style={{ top: "8%", left: "-10%" }} />
        <div className="absolute w-56 h-56 bg-blue-200 opacity-20 rounded-full mix-blend-multiply blur-2xl animate-pulse" style={{ top: "55%", right: "-12%" }} />
        <div className="absolute w-40 h-40 bg-fuchsia-300 opacity-30 rounded-full mix-blend-multiply blur-2xl animate-pulse" style={{ bottom: "5%", left: "60%" }} />
      </div>
      {/* Glassy Card */}
      <div className="z-10 w-full max-w-xl">
        <h1 className="text-4xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-fuchsia-600 drop-shadow-md">
         SkillSync <span className="block text-lg font-medium mt-1 tracking-widest">AI Career Advisor</span>
        </h1>
        <form
          className="bg-white bg-opacity-70 shadow-xl rounded-3xl px-8 py-7 flex flex-col gap-6 border-[1.5px] border-blue-100 backdrop-blur-md"
          onSubmit={handleSubmit}
        >
          <label className="font-medium text-blue-900">
            Resume (PDF)
            <div className="flex items-center gap-2 mt-1 bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl px-4 py-3 cursor-pointer hover:bg-blue-100 transition-all">
              <svg width="24" height="24" fill="none" className="text-blue-400">
                <path d="M12 16v-8m0 8-4-4m4 4 4-4M20 12.5A8.5 8.5 0 1 1 3.5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="file"
                accept="application/pdf"
                onChange={e => setResume(e.target.files[0])}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="w-full cursor-pointer">
                {resume ? <span className="text-blue-700 font-semibold">{resume.name}</span> : <span className="text-blue-400">Click or Drag PDF here</span>}
              </label>
            </div>
          </label>
          <label className="font-medium text-blue-900">
            Job Description
            <textarea
              rows={6}
              className="w-full border rounded-xl p-3 mt-1 shadow-inner focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="Paste the job description here..."
              value={jd}
              onChange={e => setJD(e.target.value)}
              required
            />
          </label>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg py-3 rounded-2xl shadow-md hover:scale-105 hover:shadow-xl transition-transform"
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></span>
                Analyzing...
              </span>
            ) : (
              "Analyze My Resume"
            )}
          </button>
        </form>

        {/* Results Section */}
        {result && (
          <div className="mt-10 mb-6 w-full animate-fade-in bg-white bg-opacity-85 p-7 rounded-3xl shadow-2xl border border-blue-100 z-20">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 flex items-center gap-2">
              <svg width="24" height="24" fill="none" className="text-purple-400">
                <path d="M13 5.055a7 7 0 1 1-2 0" stroke="currentColor" strokeWidth="2.2" />
                <path d="M12 3v10" stroke="currentColor" strokeWidth="2.2" />
              </svg>
              AI-Powered Resume Analysis
            </h2>

            {/* Animated Score (if present) */}
            {result.overall_score !== undefined && (
              <div className="mb-4">
                <div className="text-md mb-1 text-gray-600 flex justify-between">
                  <span>AI Resume Match Score</span>
                  <span className="font-bold text-blue-600">{result.overall_score}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-4 overflow-hidden">
                  <div className="h-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 rounded-full transition-all"
                    style={{ width: `${result.overall_score}%` }} />
                </div>
              </div>
            )}

            {/* Skill Gap */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1 text-purple-700">Skill Gap Analysis</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <b className="text-blue-600">Required Skills</b>
                  <ul className="mt-1 list-disc ml-5">
                    {result.skill_gap_analysis?.required_skills?.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <b className="text-green-700">Your Skills</b>
                  <ul className="mt-1 list-disc ml-5">
                    {result.skill_gap_analysis?.present_skills?.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <b className="text-red-600">Missing Skills</b>
                  <ul className="mt-1 list-disc ml-5">
                    {result.skill_gap_analysis?.missing_skills?.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-700 mb-1">Personalized Improvement Suggestions</h3>
              <ul className="list-disc ml-5 space-y-2">
                {result.improvement_suggestions?.map(sug =>
                  <li key={sug.skill}>
                    <span className="font-bold text-blue-700">{sug.skill}:</span> {sug.suggestion}
                    {sug.rag_example && (
                      <span className="block text-xs text-gray-400 mt-1">e.g. <i>{sug.rag_example}</i></span>
                    )}
                  </li>
                )}
              </ul>
            </div>

            {/* Formatting Feedback */}
            {result.formatting_feedback && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-purple-700 mb-1">Formatting & Structure Tips</h3>
                <div className="p-3 rounded-xl bg-blue-50 text-blue-900">{result.formatting_feedback}</div>
              </div>
            )}

            {/* Personalized Roadmap */}
            {result.personalized_roadmap && result.personalized_roadmap.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-1">Personalized Roadmap</h3>
                <ol className="list-decimal ml-6 space-y-1">
                  {result.personalized_roadmap.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Summary */}
            {result.summary && (
              <div className="mt-4 p-3 rounded-xl bg-green-50 text-green-800 border border-green-100 text-center text-lg font-medium shadow-sm">
                {result.summary}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Animation for Results Section */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: none;}
          }
          .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
          .animate-gradient-x {
            background-size: 400% 400%;
            animation: gradient-x 10s ease infinite;
          }
          @keyframes gradient-x {
            0%,100% {background-position:0% 50%}
            50% {background-position:100% 50%}
          }
        `}
      </style>
    </div>
  );
}

export default ResumeAnalyzer;
