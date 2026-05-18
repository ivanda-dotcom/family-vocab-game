import { useFamilyData } from '../hooks/useFamilyData';
import { VOCAB_BATTLES, getReviewQueue } from '../data/family';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { members, toggleCheckIn } = useFamilyData();
  const [lastResult, setLastResult] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const safeParse = (key: string) => {
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : null;
      } catch (e) {
        return null;
      }
    };
    setLastResult(safeParse('lastBattleResult'));
    const hist = safeParse('battleHistory');
    if (Array.isArray(hist)) setHistory(hist);
  }, []);

  const stats = history.length > 0 ? {
    avg: Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / history.length),
    max: Math.max(...history.map(h => h.score)),
    count: history.length
  } : null;

  const reviewWords = getReviewQueue(history);
  const recentlyMastered = Array.from(new Set(history.flatMap(h => h.masteredWords || []))).slice(0, 5);

  const plan = reviewWords.length > 0 ? "Review your trouble words to level up!" : "Keep the streak alive!";

  const resetProgress = () => {
    if (confirm("Are you sure? This will clear all your learning history.")) {
      localStorage.removeItem('battleHistory');
      localStorage.removeItem('lastBattleResult');
      setHistory([]);
      setLastResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-indigo-50 px-4 py-8">
      <main className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Track your family's growth.</p>
          </div>
          <Link href="/" className="rounded-xl border border-gray-200 px-4 py-2 font-bold text-gray-600 hover:bg-gray-50">Home</Link>
        </header>

        <section className="mb-10 rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-indigo-900">Today's Family Plan</h2>
          <p className="text-indigo-800 text-lg">
            {plan}
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Review Queue</h2>
            {reviewWords.length > 0 ? (
                <div className="grid gap-3">{reviewWords.map(w => <div key={w} className="p-4 bg-orange-50 border border-orange-100 rounded-2xl font-bold text-orange-900">{w}</div>)}</div>
            ) : <p className="text-gray-400 italic">No words need review! Great job.</p>}
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Recently Mastered</h2>
            {recentlyMastered.length > 0 ? (
                <div className="grid gap-3">{recentlyMastered.map(w => <div key={w} className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl font-bold text-emerald-900">{w}</div>)}</div>
            ) : <p className="text-gray-400 italic">Finish your first challenge to see mastered words.</p>}
          </section>
        </div>

        <section className="mt-16 rounded-3xl border border-red-100 bg-red-50 p-8 shadow-sm">
          <h2 className="mb-2 text-xl font-bold text-red-900">Parent Controls</h2>
          <button onClick={resetProgress} className="rounded-xl bg-red-600 px-6 py-2 font-bold text-white shadow-sm hover:bg-red-700">Reset Progress</button>
        </section>
      </main>
    </div>
  );
}
