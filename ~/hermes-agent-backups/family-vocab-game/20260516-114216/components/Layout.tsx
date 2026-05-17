import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-marketing)] text-[var(--text-primary)]">
      {/* Navigation - Linear Style */}
      <nav className="border-b border-[var(--border-subtle)] px-8 py-4 flex justify-between items-center bg-[var(--bg-panel)]/50 backdrop-blur-md sticky top-0">
        <span className="font-[510] text-sm tracking-tight">FAMILY VOCAB</span>
        <div className="flex gap-4">
          <span className="text-xs text-[var(--text-tertiary)] hover:text-white cursor-pointer transition">Progress</span>
          <span className="text-xs text-[var(--text-tertiary)] hover:text-white cursor-pointer transition">Account</span>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  );
}
