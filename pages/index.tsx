import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  const cards = [
    { title: 'Family Battles', desc: '與家人挑戰對戰', href: '/battles', color: 'bg-indigo-500' },
    { title: 'Progress Tracking', desc: '查看學習成長', href: '/dashboard', color: 'bg-sky-500' },
    { title: 'Vocabulary Practice', desc: '快速練習 (Coming Soon)', href: '#', color: 'bg-amber-500', disabled: true },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-amber-50 pt-16 px-4 pb-20">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-indigo-950 mb-4 tracking-tight">Family Vocab</h1>
          <p className="text-xl text-indigo-700/80 mb-8 max-w-sm mx-auto">讓英文單字成為家庭樂趣，與家人一起挑戰成長。</p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Link href="/battles" className="bg-indigo-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-200 active:scale-95 transition-transform">
              Start Family Challenge
            </Link>
            <Link href="/dashboard" className="bg-white text-indigo-700 font-semibold py-4 px-8 rounded-2xl border border-indigo-100 shadow-sm">
              View Progress
            </Link>
          </div>
        </header>

        <div className="grid gap-6 max-w-sm mx-auto">
          {cards.map((card, i) => (
            <Link key={i} href={card.href} className={`p-6 rounded-3xl ${card.disabled ? 'opacity-60 cursor-not-allowed' : 'bg-white shadow-xl shadow-indigo-50/50 hover:-translate-y-1 transition-all'}`}>
              <div className={`w-12 h-12 ${card.color} rounded-2xl mb-4`} />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{card.title}</h3>
              <p className="text-gray-500">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
