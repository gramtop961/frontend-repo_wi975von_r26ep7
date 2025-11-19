import { useState } from 'react'
import Header from './components/Header'
import MemberManager from './components/MemberManager'
import ExerciseManager from './components/ExerciseManager'
import WorkoutLogger from './components/WorkoutLogger'
import WorkoutList from './components/WorkoutList'

function App() {
  const [tab, setTab] = useState('members')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header currentTab={tab} onChange={setTab} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'members' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Members</h2>
            <p className="text-blue-200">Add and view gym members.</p>
            <MemberManager />
          </section>
        )}

        {tab === 'exercises' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Exercises</h2>
            <p className="text-blue-200">Maintain your exercise catalog.</p>
            <ExerciseManager />
          </section>
        )}

        {tab === 'log' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Log Workout</h2>
            <p className="text-blue-200">Record sets performed in a session.</p>
            <WorkoutLogger />
          </section>
        )}

        {tab === 'workouts' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Workouts</h2>
            <p className="text-blue-200">Browse logged workouts.</p>
            <WorkoutList />
          </section>
        )}
      </main>
    </div>
  )
}

export default App
