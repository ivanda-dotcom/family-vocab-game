import { useState } from 'react';
import { VOCAB_BATTLES, INITIAL_FAMILY_DATA } from '../data/family';
import { VOCAB_DATA } from '../data/vocabulary';
import Link from 'next/link';

const shuffle = (array: any[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function Battles() {
  const [battle, setBattle] = useState<typeof VOCAB_BATTLES[0] | null>(null);
  const [questions, setQuestions] = useState<typeof VOCAB_DATA>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedMember, setSelectedMember] = useState(INITIAL_FAMILY_DATA[0]);
  const [feedback, setFeedback] = useState<{type: 'correct' | 'incorrect', msg: string} | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const startBattle = (b: typeof VOCAB_BATTLES[0]) => {
    const pool = VOCAB_DATA.filter(v => v.level === selectedMember.level).length >= 3 ? VOCAB_DATA.filter(v => v.level === selectedMember.level) : VOCAB_DATA;
    setQuestions(shuffle(pool).slice(0, 5));
    setBattle(b);
    setCurrentIdx(0);
    setScore(0);
    setFinished(false);
    setFeedback(null);
  };

  const handleAnswer = (isCorrect: boolean, optIdx: number) => {
    setSelectedOpt(optIdx);
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback({type: 'correct', msg: 'Correct! You mastered this word.'});
    } else {
      setFeedback({type: 'incorrect', msg: `Nice try — the answer is: ${questions[currentIdx].definition}`});
    }
  };

  const nextStep = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(c => c + 1);
      setFeedback(null);
      setSelectedOpt(null);
    } else {
      const finalScore = Math.round((score / questions.length) * 100);
      setFinished(true);
      if (battle) {
        const result = {
          battleId: battle.id,
          battleTitle: `${battle.challenger} vs ${battle.opponent}`,
          memberName: selectedMember.name,
          score: finalScore,
          correctCount: score,
          totalQuestions: questions.length,
          completedAt: new Date().toISOString()
        };
        localStorage.setItem('lastBattleResult', JSON.stringify(result));
        const history = JSON.parse(localStorage.getItem('battleHistory') || '[]');
        localStorage.setItem('battleHistory', JSON.stringify([result, ...history].slice(0, 10)));
      }
    }
  };

  const performance = score / questions.length;
  const getRating = () => {
    if (performance >= 0.8) return "Excellent! Your family is on a roll.";
    if (performance >= 0.5) return "Good job! A little more practice and you’ll master it.";
    return "Keep going! Every challenge makes you stronger.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-indigo-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {!battle ? (
          <div className="mx-auto max-w-md">
            <h1 className="text-3xl font-bold text-indigo-950 mb-6">Choose Your Matchup</h1>
            <div className="mb-8 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-indigo-100/40">
              <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-400">Playing today</label>
              <div className="grid grid-cols-2 gap-2">
                {INITIAL_FAMILY_DATA.map(m => (
                  <button key={m.id} onClick={() => setSelectedMember(m)} className={`rounded-2xl py-3 text-sm font-bold transition ${selectedMember.id === m.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {VOCAB_BATTLES.map(b => (
                <div key={b.id} className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-indigo-100/40">
                  <h3 className="text-lg font-bold text-gray-900">{b.challenger} vs {b.opponent}</h3>
                  <p className="mb-4 text-sm text-gray-500">5 Words • {selectedMember.level}</p>
                  <button onClick={() => startBattle(b)} className="min-h-[48px] w-full rounded-2xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-md hover:bg-indigo-700">Start Match</button>
                </div>
              ))}
            </div>
          </div>
        ) : finished ? (
          <div className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 text-center shadow-lg">
            <h2 className="mb-2 text-3xl font-bold text-indigo-950">Challenge Complete!</h2>
            <p className="mb-6 text-5xl font-bold text-indigo-600">{Math.round((score / questions.length) * 100)}%</p>
            <p className="mb-8 text-gray-600">{score} of {questions.length} words mastered</p>
            <p className="mb-8 font-medium italic text-indigo-800">{getRating()}</p>
            <div className="grid gap-3">
              <button onClick={() => setBattle(null)} className="min-h-[48px] rounded-2xl border border-indigo-100 bg-white px-5 py-3 font-bold text-indigo-700 hover:bg-indigo-50">Choose Another Challenge</button>
              <Link href="/dashboard" className="min-h-[48px] rounded-2xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700">Back to Progress</Link>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-md">
            <div className="mb-6 flex justify-between font-bold text-gray-400">
              <span className="text-sm">Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-sm">{Math.round((score / questions.length) * 100)}%</span>
            </div>
            <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full bg-indigo-500 transition-all" style={{ width: `${(currentIdx / questions.length) * 100}%` }} />
            </div>
            <div className="mb-8 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg shadow-indigo-100/40">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-400">Vocabulary</p>
              <h2 className="text-4xl font-bold text-gray-900">{questions[currentIdx].word}</h2>
            </div>
            <div className="grid gap-3">
              {[true, false].map((isCorrect, i) => (
                <button key={i} disabled={!!feedback} onClick={() => handleAnswer(isCorrect, i)} className={`min-h-[48px] rounded-2xl border-2 p-5 text-left font-bold transition ${selectedOpt === i ? (isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-orange-200 bg-orange-50 text-orange-800') : 'border-indigo-100 bg-white hover:border-indigo-400'}`}>
                  {isCorrect ? questions[currentIdx].definition : VOCAB_DATA[(currentIdx + 1) % VOCAB_DATA.length].definition}
                </button>
              ))}
            </div>
            {feedback && (
              <div className={`mt-6 rounded-2xl border-2 p-4 text-center font-bold ${feedback.type === 'correct' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-orange-200 bg-orange-50 text-orange-800'}`}>
                {feedback.msg}
                <button onClick={nextStep} className="mt-4 block w-full rounded-2xl bg-indigo-600 py-3 text-white">Next Question</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}