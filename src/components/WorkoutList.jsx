import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function WorkoutList() {
  const [memberId, setMemberId] = useState('')
  const [members, setMembers] = useState([])
  const [workouts, setWorkouts] = useState([])

  const load = async () => {
    const mRes = await fetch(`${API_BASE}/api/members`)
    const m = await mRes.json()
    setMembers(m)

    const wRes = await fetch(`${API_BASE}/api/workouts${memberId ? `?member_id=${memberId}` : ''}`)
    setWorkouts(await wRes.json())
  }

  useEffect(()=>{ load() }, [memberId])

  return (
    <div className="space-y-4">
      <select value={memberId} onChange={e=>setMemberId(e.target.value)} className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700">
        <option value="">All members</option>
        {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>

      <div className="space-y-3">
        {workouts.map(w => (
          <div key={w.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-300">{w.date}</p>
                <p className="text-lg font-semibold">Member: {w.member_id}</p>
              </div>
              {w.notes && <p className="text-sm max-w-sm">{w.notes}</p>}
            </div>
            <div className="mt-3 grid sm:grid-cols-2 gap-2">
              {w.sets?.map((s, idx) => (
                <div key={idx} className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
                  <p className="text-sm">Exercise: {s.exercise_id}</p>
                  <p className="text-sm">Reps: {s.reps} • Weight: {s.weight}</p>
                  {s.notes && <p className="text-xs text-blue-300">{s.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
        {workouts.length === 0 && (
          <p className="text-blue-300">No workouts found.</p>
        )}
      </div>
    </div>
  )
}

export default WorkoutList
