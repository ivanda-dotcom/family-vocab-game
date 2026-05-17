import Layout from '../components/Layout';
import { useFamilyData } from '../hooks/useFamilyData';
import { VOCAB_BATTLES } from '../data/family';
import { motion } from 'framer-motion';
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
        console.error(`Error parsing ${key}`, e);
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-[510] text-white">家庭學習中心</h1>
          <p className="text-[var(--text-secondary)]">今日目標與成員進度</p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Best Score</p>
              <p className="text-3xl font-bold text-indigo-600">{stats?.max || 0}%</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Avg Score</p>
              <p className="text-3xl font-bold text-indigo-600">{stats?.avg || 0}%</p>
            </div>
          </div>
        </section>

        {/* 學習趨勢區塊 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Trend</h2>
          {stats ? (
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-indigo-50">
              <div className="flex items-end justify-between gap-3 h-40">
                {history.slice(0, 10).reverse().map((res, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group w-full">
                    <div 
                      className="w-full bg-indigo-500 rounded-lg group-hover:bg-indigo-600 transition-colors" 
                      style={{ height: `${res.score}%` }}
                    />
                    <span className="text-[10px] text-gray-400">{res.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-indigo-50 p-8 rounded-3xl text-center">
              <p className="text-indigo-800 mb-4">完成一場挑戰後，這裡會顯示你的學習趨勢。</p>
              <Link href="/battles" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold">Go Challenge</Link>
            </div>
          )}
        </section>

        {lastResult && (
          <div className="linear-card p-4 mb-6 border-indigo-500">
            <h3 className="font-[510] mb-1">最近一次戰績 ({lastResult.battleTitle})</h3>
            <p className="text-sm">分數: {lastResult.score}% ({lastResult.correctCount}/{lastResult.totalQuestions})</p>
          </div>
        )}
        
        <section className="mb-10">
          <h2 className="text-xl font-[510] mb-4">最近挑戰紀錄</h2>
          {history.length > 0 ? (
            <div className="grid gap-2">
              {history.slice(0, 5).map((res, i) => (
                <div key={i} className="text-sm p-3 border-b border-[rgba(255,255,255,0.1)] flex justify-between">
                  <div>
                    <span className="block font-medium">{res.battleTitle}</span>
                    <span className="text-xs text-[var(--text-tertiary)]">{res.memberName || '匿名'}</span>
                  </div>
                  <span className="font-bold text-indigo-400">{res.score}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-tertiary)] italic">尚無挑戰紀錄</p>
          )}
        </section>


        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {members.map((member) => (
            <div key={member.id} className="linear-card p-6 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-[510]">{member.name}</h3>
                <span className="text-[10px] uppercase tracking-wider bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">
                  {member.level}
                </span>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                <span>今日分數: {member.todayScore}</span>
                <span>連續天數: {member.streakDays} 🔥</span>
              </div>
              <div className="w-full bg-[rgba(255,255,255,0.05)] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[var(--brand-indigo)] h-full transition-all" 
                  style={{ width: `${Math.min((member.todayScore / member.dailyGoal) * 100, 100)}%` }}
                />
              </div>
              <button 
                onClick={() => toggleCheckIn(member.id)}
                className={`mt-2 w-full py-1 text-xs font-[510] transition ${member.checkedInToday ? 'bg-green-900/30 text-green-400 border border-green-800' : 'linear-button-ghost'}`}
              >
                {member.checkedInToday ? '已 Check-in ✅' : '執行 Check-in'}
              </button>
            </div>
          ))}
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-[510] mb-4">單詞競賽進行中</h2>
          <div className="grid gap-3">
            {VOCAB_BATTLES.map((battle) => (
              <Link 
                key={battle.id} 
                href="/battles"
                className="linear-card p-4 flex justify-between items-center text-sm hover:border-[var(--brand-indigo)] transition-colors"
              >
                <span>{battle.challenger} vs {battle.opponent}</span>
                <span className="text-[var(--text-tertiary)]">{battle.status}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
