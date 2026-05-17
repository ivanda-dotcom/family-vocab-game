import Layout from '../components/Layout';
import { useFamilyData } from '../hooks/useFamilyData';
import { VOCAB_BATTLES } from '../data/family';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { members, toggleCheckIn } = useFamilyData();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-[510] text-white">家庭學習中心</h1>
          <p className="text-[var(--text-secondary)]">今日目標與成員進度</p>
        </header>

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
              <div key={battle.id} className="linear-card p-4 flex justify-between items-center text-sm">
                <span>{battle.challenger} vs {battle.opponent}</span>
                <span className="text-[var(--text-tertiary)]">{battle.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
