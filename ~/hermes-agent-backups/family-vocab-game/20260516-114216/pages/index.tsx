import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="max-w-xl mx-auto pt-20">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-[510] tracking-[-1.056px] text-white mb-2">Family Vocab Game</h1>
          <p className="text-[var(--text-secondary)] text-lg font-[400]">
            Master your vocabulary through gamified challenges.
          </p>
        </div>

        {/* Action Section */}
        <div className="grid gap-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => router.push('/game')}
            className="w-full linear-button-primary py-3 text-lg shadow-[0_0_20px_rgba(94,106,210,0.2)]"
          >
            Start Learning
          </motion.button>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="linear-button-ghost py-3 text-sm font-[510]">
              Leaderboard
            </button>
            <button className="linear-button-ghost py-3 text-sm font-[510]">
              Settings
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
