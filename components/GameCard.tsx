import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VOCAB_DATA } from '../data/vocabulary';

export default function GameCard() {
  const [index, setIndex] = useState(0);
  const item = VOCAB_DATA[index];

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(item.word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="linear-card p-8 flex flex-col gap-6"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-[510] tracking-widest uppercase text-[var(--text-tertiary)] bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">
              Level: {item.level}
            </span>
            <button 
              onClick={speak}
              className="linear-button-ghost p-2 rounded-full"
            >
              🔊
            </button>
          </div>

          <div>
            <h2 className="text-5xl font-[510] tracking-[-1.5px] mb-2">{item.word}</h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{item.definition}</p>
          </div>

          <div className="border-t border-[var(--border-subtle)] pt-6">
            <h4 className="text-[12px] font-[510] text-[var(--text-tertiary)] uppercase mb-3">Example</h4>
            <p className="text-sm text-[var(--text-secondary)] font-mono opacity-80 italic">
              — {item.familyExample}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
