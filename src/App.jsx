import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import Auth from "./pages/Auth";
import AIMentor from "./pages/AIMentor";
import StudyPlan from "./pages/StudyPlan";
import Progress from "./pages/Progress";
import Practice from "./pages/Practice";
import SessionSummary from "./pages/SessionSummary";
import MistakeReview from "./pages/MistakeReview";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/ai-mentor" element={<AIMentor />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/study-plan" element={<StudyPlan />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/practice" element={<Practice />} />
<Route path="/session-summary" element={<SessionSummary />} />
<Route path="/mistakes" element={<MistakeReview />} />

    </Routes>
  );
}

export default App;
