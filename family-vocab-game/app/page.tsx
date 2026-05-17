'use client';

import { useState, useMemo } from 'react';

const MEMBERS = [
  { name: "Doll", level: 1 },
  { name: "Eason", level: 2 },
  { name: "Chris", level: 2 },
  { name: "Ivan", level: 3 }
];

const QUESTIONS = [
  { word: "Happy", level: 1, phonetic: "/ˈhæpi/", options: ["快樂", "難過", "生氣", "無聊"], answer: "快樂", example: "I am so happy today!" },
  { word: "Big", level: 1, phonetic: "/bɪɡ/", options: ["大", "小", "高", "低"], answer: "大", example: "The house is big." },
  { word: "Challenge", level: 2, phonetic: "/ˈtʃælɪndʒ/", options: ["挑戰", "休息", "學習", "運動"], answer: "挑戰", example: "Learning English is a fun challenge." },
  { word: "Brilliant", level: 2, phonetic: "/ˈbrɪljənt/", options: ["聰明的", "黑暗的", "愚蠢的", "慢的"], answer: "聰明的", example: "He has a brilliant idea." },
  { word: "Magnificent", level: 3, phonetic: "/mæɡˈnɪfɪsnt/", options: ["壯麗的", "渺小的", "普通的", "醜陋的"], answer: "壯麗的", example: "The view from the top is magnificent." },
];

export default function Home() {
  const [user, setUser] = useState<typeof MEMBERS[0] | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameState, setGameState] = useState<'selecting' | 'playing'>('selecting');

  const questions = useMemo(() => {
    if (!user) return [];
    return QUESTIONS.filter(q => q.level === user.level).sort(() => Math.random() - 0.5);
  }, [user]);

  const q = questions[currentIdx];
  const shuffledOptions = useMemo(() => q ? [...q.options].sort(() => Math.random() - 0.5) : [], [q]);

  const handleAnswer = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    if (showResult) return;
    if (option === q.answer) {
      setScore(s => s + 100);
      setFeedback("✅ 正確！" + q.example);
    } else {
      setFeedback("❌ 錯了！正確答案是 " + q.answer + "。例句: " + q.example);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (!showResult) return;
    setShowResult(false);
    if (currentIdx + 1 >= questions.length) {
      alert("恭喜完成所有單字！");
      setGameState('selecting');
      setCurrentIdx(0);
      setScore(0);
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  if (gameState === 'selecting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
        <h1 className="text-4xl font-black mb-10 text-black">選擇你的身分</h1>
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {MEMBERS.map(m => (
            <button key={m.name} onClick={() => { setUser(m); setGameState('playing'); }} className="p-8 bg-white border-4 border-black rounded-2xl font-black text-xl hover:bg-yellow-300 transition text-black">
              {m.name}<div className="text-sm font-normal">等級: {m.level}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4" onClick={nextQuestion}>
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-8 font-black border-b-4 border-black pb-4 text-xl text-black">
          <span>{user?.name}</span><span>{score} 分</span>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-5xl font-black mb-2 text-black">{q.word}</h2>
        </div>
        {!showResult ? (
          <div className="grid grid-cols-1 gap-4">
            {shuffledOptions.map(opt => (
              <button key={opt} onClick={(e) => handleAnswer(e, opt)} className="p-5 bg-white border-4 border-black font-black text-xl rounded-xl hover:bg-indigo-300 transition text-black">{opt}</button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="font-black text-lg mb-4 text-black">{feedback}</div>
            <div className="text-sm text-gray-400 animate-pulse">點擊畫面任何一處繼續...</div>
          </div>
        )}
      </div>
    </div>
  );
}