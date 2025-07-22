import React from "react";

const features = [
  {
    icon: (
      <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 9V3H7v6M12 17v4m0 0l-2-2m2 2l2-2m7-3A9 9 0 11 3 12a9 9 0 0118 0z" />
      </svg>
    ),
    title: "AI-Powered Career Guidance",
    desc: "Receive personalized, actionable resume advice based on the latest industry needs.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M8 16v2a2 2 0 002 2h4a2 2 0 002-2v-2M12 12v8m-6-2a9 9 0 1118 0 9 9 0 01-18 0z" />
      </svg>
    ),
    title: "All Industries. All Roles.",
    desc: "From tech and design to healthcare, engineering, and business—SkillSync has you covered.",
  },
  {
    icon: (
      <svg className="w-10 h-10 text-fuchsia-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8c-1.656 0-3 .896-3 2s1.344 2 3 2 3-.896 3-2-1.344-2-3-2zm0 8c-3.314 0-6-2.014-6-4.5 0-1.445 1.045-2.717 2.655-3.484m6.69 0C16.955 9.783 18 11.055 18 12.5c0 2.486-2.686 4.5-6 4.5z" />
      </svg>
    ),
    title: "Close Your Skill Gaps",
    desc: "Spot missing skills instantly—then get rewrites and real-world examples for any job.",
  },
];

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-blue-400 via-fuchsia-200 to-purple-200 overflow-x-hidden">
      {/* Animated Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute w-96 h-96 bg-purple-300 opacity-30 rounded-full mix-blend-multiply blur-2xl animate-pulse"
          style={{ top: "-4rem", left: "-6rem" }} />
        <div className="absolute w-80 h-80 bg-blue-200 opacity-20 rounded-full mix-blend-multiply blur-2xl animate-pulse"
          style={{ top: "70%", left: "80%" }} />
        <div className="absolute w-64 h-64 bg-fuchsia-300 opacity-30 rounded-full mix-blend-multiply blur-2xl animate-pulse"
          style={{ bottom: "-3rem", left: "55%" }} />
      </div>

      {/* Header */}
      <header className="z-20 sticky top-0 flex justify-between items-center py-6 px-8 bg-white bg-opacity-80 backdrop-blur-xl shadow-md">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" fill="none" className="text-blue-600">
            <circle cx="16" cy="16" r="16" fill="#a5b4fc" />
            {/* S and S for SkillSync */}
            <text x="7" y="23" fontSize="16" fill="#312e81" fontFamily="sans-serif" fontWeight="bold">SS</text>
          </svg>
          <span className="text-2xl font-bold text-blue-900 tracking-widest">SkillSync</span>
        </div>
        <button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white font-bold py-2 px-7 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
        >
          Get Started
        </button>
      </header>

      {/* Hero */}
      <main className="z-10 relative flex flex-col items-center justify-center min-h-[80vh] px-4">
        <h1 className="mt-20 text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-fuchsia-600 to-purple-700 drop-shadow-2xl animate-fade-down">
          Sync Your Skills.<br className="hidden md:block" /> Unlock Every Opportunity.
        </h1>
        <p className="mt-8 mb-12 text-lg md:text-2xl text-center text-blue-900 max-w-2xl font-medium shadow-sm bg-white/70 p-4 rounded-xl backdrop-blur">
          Upload your resume, paste a job description, and let <span className="text-fuchsia-700 font-bold">SkillSync</span> <span className="text-fuchsia-700 font-semibold">analyze, compare, and elevate</span> your career profile in seconds. <br /> <span className="text-purple-700 font-bold">Actionable AI. For all professions.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 my-8 w-full max-w-5xl">
          {features.map((f, idx) => (
            <div key={f.title}
              className="bg-white/80 shadow-lg rounded-2xl px-7 py-8 flex flex-col items-center hover:scale-105 transition-transform animate-fade-in"
              style={{ animationDelay: `${0.2 + idx * 0.12}s` }}>
              <div className="mb-4">{f.icon}</div>
              <div className="text-xl font-bold mb-2 text-blue-800">{f.title}</div>
              <div className="text-gray-600 text-center">{f.desc}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onGetStarted}
          className="mt-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg py-4 px-10 rounded-2xl shadow-xl hover:scale-110 hover:shadow-2xl transition-all animate-bounce"
        >
          Start SkillSync Analysis
        </button>
      </main>

      {/* How it works */}
      <section className="max-w-4xl mx-auto bg-white bg-opacity-80 rounded-3xl shadow-2xl py-10 px-8 my-12 z-10 relative animate-fade-in">
        <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">How It Works</h2>
        <ol className="list-decimal ml-8 md:ml-12 text-lg text-gray-800 space-y-3">
          <li>Upload your current resume as a PDF.</li>
          <li>Paste the job description for your desired role.</li>
          <li>Click "Analyze" and let SkillSync’s AI instantly spot skill gaps, suggest rewrites, and chart your path.</li>
          <li>Get instant, actionable advice to align your skills and land more interviews!</li>
        </ol>
        <p className="mt-6 text-center text-blue-800 font-semibold">All careers. All industries. <br /> One intelligent platform.</p>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm z-10 bg-transparent">
        &copy; {new Date().getFullYear()} SkillSync &mdash; Empowered by AI, designed for your success.
      </footer>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: none;}
          }
          .animate-fade-in { animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both; }
          @keyframes fade-down {
            from { opacity: 0; transform: translateY(-50px);}
            to { opacity: 1; transform: none;}
          }
          .animate-fade-down { animation: fade-down 1.2s cubic-bezier(.4,0,.2,1) both; }
        `}
      </style>
    </div>
  );
}
