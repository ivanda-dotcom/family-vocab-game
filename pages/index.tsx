import Link from 'next/link';

export default function Home() {
  const cards = [
    { title: 'Family Battles', desc: 'Pick a matchup and race through a short word challenge.', href: '/battles', color: 'bg-indigo-500' },
    { title: 'Progress Center', desc: 'See scores, recent battles, and signs of improvement.', href: '/dashboard', color: 'bg-sky-500' },
    { title: 'Quick Practice', desc: 'A lighter solo mode is coming soon.', href: '#', color: 'bg-amber-500', disabled: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-indigo-50 px-4 py-8">
      <main className="mx-auto max-w-5xl">
        <header className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-indigo-950 sm:text-6xl">Family Vocab</h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-indigo-700/80">每天 5 分鐘的親子英文挑戰。和孩子一起聽、選、唸、複習，把英文單字變成家庭遊戲。</p>
          <div className="mx-auto flex max-w-sm flex-col gap-3">
            <Link href="/battles" className="flex min-h-[48px] items-center justify-center rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-md hover:bg-indigo-700">
              開始今日家庭挑戰
            </Link>
            <Link href="/dashboard" className="flex min-h-[48px] items-center justify-center rounded-2xl border border-indigo-100 bg-white px-8 py-4 font-bold text-indigo-700 hover:bg-indigo-50">
              查看家庭學習進度
            </Link>
          </div>
        </header>

        <section className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Link key={i} href={card.href} className={`rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-indigo-100/40 transition-all ${card.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-xl'}`}>
              <div className={`mb-4 h-12 w-12 ${card.color} rounded-2xl`} />
              <h3 className="mb-1 text-lg font-bold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </Link>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">How Family Vocab Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Choose a member', desc: 'Pick who is playing and start their personalized journey.' },
              { title: '5-min challenge', desc: 'Complete quick, fun word battles together.' },
              { title: 'Review & Grow', desc: 'Master missed words and keep your family streak alive.' }
            ].map((step, i) => (
              <div key={i} className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">{i + 1}</div>
                <h3 className="mb-2 font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}