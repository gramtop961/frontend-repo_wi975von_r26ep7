import { useState } from 'react'

function Header({ currentTab, onChange }) {
  const tabs = [
    { key: 'members', label: 'Members' },
    { key: 'exercises', label: 'Exercises' },
    { key: 'log', label: 'Log Workout' },
    { key: 'workouts', label: 'Workouts' },
  ]

  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-slate-700/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" className="w-8 h-8" alt="logo" />
          <h1 className="text-white font-semibold text-lg">Gym Tracker</h1>
        </div>
        <nav className="flex items-center gap-2">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                currentTab === t.key ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
