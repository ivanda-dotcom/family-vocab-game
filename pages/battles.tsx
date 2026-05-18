import { VOCAB_BATTLES, INITIAL_FAMILY_DATA, getReviewQueue } from '../data/family';
import { VOCAB_DATA, VocabItem } from '../data/vocabulary';
import { useState } from 'react';
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
  const [questions, setQuestions] = useState<(VocabItem & { mastered?: boolean })[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedMember, setSelectedMember] = useState(INITIAL_FAMILY_DATA[0]);
  const [feedback, setFeedback] = useState<{type: 'correct' | 'incorrect', msg: string, tip: string} | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [speechErr, setSpeechErr] = useState(false);

  const speakWord = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // 取消當前正在發音的內容
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      utter.rate = 0.8; // 稍微調慢語速，聽起來比較溫和
      utter.pitch = 1.0;
      utter.volume = 1;
      
      // 嘗試找比較自然的語音
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'));
      if (preferredVoice) utter.voice = preferredVoice;

      window.speechSynthesis.speak(utter);
    } else {
      setSpeechErr(true);
      setTimeout(() => setSpeechErr(false), 3000);
    }
  };

  const startBattle = (b: typeof VOCAB_BATTLES[0]) => {
    const filtered = VOCAB_DATA.filter(v => v.level === selectedMember.level);
    const pool = filtered.length >= 3 ? filtered : VOCAB_DATA;
    setQuestions(shuffle(pool).slice(0, 5).map(q => ({ ...q, mastered: false })));
    setBattle(b);
    setCurrentIdx(0);
    setScore(0);
    setFinished(false);
    setFeedback(null);
    localStorage.removeItem('tempResults');
  };

  const handleAnswer = (isCorrect: boolean, optIdx: number) => {
    setSelectedOpt(optIdx);
    const resultItem = {
      word: questions[currentIdx].word,
      selectedAnswer: isCorrect ? questions[currentIdx].definition : VOCAB_DATA[(currentIdx + 1) % VOCAB_DATA.length].definition,
      correctAnswer: questions[currentIdx].definition,
      isCorrect,
      category: questions[currentIdx].category,
      zhHint: questions[currentIdx].zhHint,
      familyExample: questions[currentIdx].familyExample
    };
    
    const currentResults = JSON.parse(localStorage.getItem('tempResults') || '[]');
    localStorage.setItem('tempResults', JSON.stringify([...currentResults, resultItem]));

    const updated = [...questions];
    updated[currentIdx].mastered = isCorrect;
    setQuestions(updated);
    
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback({type: 'correct', msg: 'Correct! Great job.', tip: `Try saying it together: ${questions[currentIdx].word}`});
    } else {
      setFeedback({type: 'incorrect', msg: 'Almost there!', tip: `The answer is ${questions[currentIdx].definition}. Example: ${questions[currentIdx].familyExample}`});
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
      const perQuestionResults = JSON.parse(localStorage.getItem('tempResults') || '[]');
      
      if (battle) {
        const result = {
          attemptId: Date.now().toString(),
          completedAt: new Date().toISOString(),
          participant: selectedMember.name,
          totalQuestions: questions.length,
          correctCount: score,
          score: finalScore,
          perQuestionResults,
          masteredWords: perQuestionResults.filter((r:any) => r.isCorrect).map((r:any) => r.word),
          reviewNeededWords: perQuestionResults.filter((r:any) => !r.isCorrect).map((r:any) => r.word)
        };
        localStorage.setItem('lastBattleResult', JSON.stringify(result));
        const history = JSON.parse(localStorage.getItem('battleHistory') || '[]');
        localStorage.setItem('battleHistory', JSON.stringify([result, ...history].slice(0, 10)));
        localStorage.removeItem('tempResults');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-indigo-50 px-4 py-8">
      <div className="mx-auto max-w-xl">
        {!battle ? (
          <div>
            <h1 className="mb-8 text-center text-3xl font-extrabold text-indigo-950">Pick Your Matchup</h1>
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
            {VOCAB_BATTLES.map(b => (
              <div key={b.id} className="mb-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900">{b.challenger} vs {b.opponent}</h3>
                <p className="mb-4 text-sm text-gray-500">5 Words • {selectedMember.level}</p>
                <button onClick={() => startBattle(b)} className="min-h-[48px] w-full rounded-2xl bg-indigo-600 font-bold text-white shadow-md">Start Match</button>
              </div>
            ))}
          </div>
        ) : finished ? (
          <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-2xl">
            <h2 className="mb-6 text-center text-3xl font-extrabold text-indigo-950">Challenge Complete!</h2>
            <div className="mb-6 text-center text-6xl font-bold text-indigo-600">{Math.round((score / questions.length) * 100)}%</div>
            <p className="mb-8 text-center text-gray-600 font-bold">{score >= 4 ? 'Great teamwork!' : 'Good effort!'}</p>
            <div className="mb-8 space-y-3">
              {questions.map((q, i) => (
                <div key={i} className={`p-4 rounded-xl border ${q.mastered ? 'border-emerald-100 bg-emerald-50' : 'border-orange-100 bg-orange-50'}`}>
                  <p className="font-bold">{q.word} - {q.zhHint}</p>
                  <p className="text-sm text-gray-600">{q.familyExample}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3">
              <button onClick={() => setBattle(null)} className="min-h-[48px] rounded-2xl border border-indigo-100 bg-white font-bold text-indigo-700">Choose Another Challenge</button>
              <Link href="/dashboard" className="min-h-[48px] rounded-2xl bg-indigo-600 font-bold text-white text-center py-3">Back to Progress</Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-between text-sm font-bold text-gray-400">
              <span>{currentIdx + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="mb-8 h-2 w-full rounded-full bg-gray-200"><div className="h-full bg-indigo-500 transition-all" style={{ width: `${(currentIdx / questions.length) * 100}%` }} /></div>
            
            <div className="mb-8 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg text-center">
              <button onClick={() => speakWord(questions[currentIdx].word)} className="mb-4 text-indigo-400 text-2xl">🔊</button>
              {speechErr && <p className="mb-2 text-xs text-indigo-500">Read this word together with a parent.</p>}
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{questions[currentIdx].word}</h2>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{questions[currentIdx].category}</p>
            </div>

            <div className="grid gap-3 mb-6">
              {[true, false].map((isCorrect, i) => (
                <button 
                  key={i} 
                  disabled={!!feedback} 
                  onClick={() => handleAnswer(isCorrect, i)} 
                  className={`min-h-[64px] p-6 rounded-2xl border-2 font-bold text-left transition ${
                    selectedOpt === i 
                      ? (isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-orange-500 bg-orange-50 text-orange-900') 
                      : 'border-gray-300 bg-white text-gray-900 hover:border-indigo-500 hover:shadow-md'
                  }`}
                >
                  {isCorrect ? questions[currentIdx].definition : VOCAB_DATA[(currentIdx + 1) % VOCAB_DATA.length].definition}
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`p-6 rounded-2xl border-2 ${feedback.type === 'correct' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-orange-200 bg-orange-50 text-orange-800'}`}>
                <p className="font-bold mb-2">{feedback.msg}</p>
                <p className="text-sm mb-4">{feedback.tip}</p>
                <button onClick={nextStep} className="w-full bg-indigo-600 text-white rounded-xl py-3 font-bold">
                  {currentIdx + 1 < questions.length ? 'Next Question' : 'See Results'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}