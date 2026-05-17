import Layout from '../components/Layout';
import GameCard from '../components/GameCard';

export default function GamePage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <GameCard />
        
        {/* Navigation Controls */}
        <div className="mt-8 flex gap-4">
          <button className="linear-button-ghost px-6 py-2 text-sm">Prev</button>
          <button className="linear-button-primary px-6 py-2 text-sm">Next Word</button>
        </div>
      </div>
    </Layout>
  );
}
