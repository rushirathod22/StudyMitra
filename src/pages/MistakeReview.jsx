import Navbar from "../components/Navbar";

export default function MistakeReview() {
  const mistakes = JSON.parse(localStorage.getItem("mistakes")) || [];

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#cbd5f5]">
      <Navbar />

      <section className="pt-32 max-w-3xl mx-auto px-6">
        <h1 className="text-2xl text-white">Mistake Review</h1>

        {mistakes.length === 0 ? (
          <p className="mt-4 text-slate-400">No mistakes 🎉</p>
        ) : (
          <div className="mt-6 space-y-4">
            {mistakes.map((q, i) => (
              <div key={i} className="bg-[#020617] border border-red-400/40 rounded-xl p-4">
                <p className="text-white">{q.question}</p>
                <p className="text-red-400 text-sm">Your answer: {q.userAnswer}</p>
                <p className="text-green-400 text-sm">Correct: {q.correct}</p>
                <p className="text-slate-400 text-sm mt-2">{q.explanation}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
