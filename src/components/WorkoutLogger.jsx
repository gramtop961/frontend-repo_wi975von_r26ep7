import { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function WorkoutLogger() {
  const [members, setMembers] = useState([])
  const [exercises, setExercises] = useState([])
  const [member_id, setMemberId] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [sets, setSets] = useState([])
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const [mRes, eRes] = await Promise.all([
      fetch(`${API_BASE}/api/members`),
      fetch(`${API_BASE}/api/exercises`)
    ])
    setMembers(await mRes.json())
    setExercises(await eRes.json())
  }

  useEffect(()=>{ load() }, [])

  const addSet = () => setSets(s => [...s, { exercise_id: exercises[0]?.id || '', reps: 8, weight: 0, notes: '' }])
  const removeSet = (i) => setSets(s => s.filter((_,idx)=> idx!==i))

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`${API_BASE}/api/workouts`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member_id, date, notes, sets })
      })
      if (!res.ok) throw new Error('Failed to save')
      setSets([]); setNotes('')
      alert('Workout saved')
    } catch (e) {
      alert(e.message)
    } finally { setSaving(false) }
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <select value={member_id} onChange={e=>setMemberId(e.target.value)} className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700">
          <option value="">Select member</option>
          {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700"/>
        <button onClick={addSet} className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4">Add Set</button>
      </div>

      <div className="space-y-3">
        {sets.map((s, idx) => (
          <div key={idx} className="grid sm:grid-cols-5 gap-3 bg-slate-800/60 border border-slate-700 rounded-xl p-3">
            <select value={s.exercise_id} onChange={e=> setSets(arr => arr.map((it,i)=> i===idx ? { ...it, exercise_id: e.target.value } : it))} className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700">
              {exercises.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
            <input type="number" value={s.reps} onChange={e=> setSets(arr => arr.map((it,i)=> i===idx ? { ...it, reps: Number(e.target.value) } : it))} className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Reps"/>
            <input type="number" value={s.weight} onChange={e=> setSets(arr => arr.map((it,i)=> i===idx ? { ...it, weight: Number(e.target.value) } : it))} className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Weight"/>
            <input value={s.notes} onChange={e=> setSets(arr => arr.map((it,i)=> i===idx ? { ...it, notes: e.target.value } : it))} className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Notes"/>
            <button onClick={()=>removeSet(idx)} className="bg-slate-700 hover:bg-slate-600 text-white rounded px-4">Remove</button>
          </div>
        ))}
        {sets.length === 0 && (
          <p className="text-blue-300">No sets yet. Add a set to start logging.</p>
        )}
      </div>

      <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Session notes (optional)" className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" />

      <button disabled={!member_id || sets.length===0 || saving} onClick={save} className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded px-4 py-2">Save Workout</button>
    </div>
  )
}

export default WorkoutLogger
