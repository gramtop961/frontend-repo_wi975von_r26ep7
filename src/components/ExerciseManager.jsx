import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ExerciseManager() {
  const [exercises, setExercises] = useState([])
  const [name, setName] = useState('')
  const [muscle_group, setMuscle] = useState('')
  const [equipment, setEquipment] = useState('')

  const load = async () => {
    const res = await fetch(`${API_BASE}/api/exercises`)
    const data = await res.json()
    setExercises(data)
  }

  const add = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_BASE}/api/exercises`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, muscle_group, equipment })
    })
    if (res.ok) { setName(''); setMuscle(''); setEquipment(''); load() }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 grid sm:grid-cols-4 gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" required />
        <input value={muscle_group} onChange={e=>setMuscle(e.target.value)} placeholder="Muscle group" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" />
        <input value={equipment} onChange={e=>setEquipment(e.target.value)} placeholder="Equipment" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" />
        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4">Add</button>
      </form>

      <div className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/60 text-blue-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Muscle</th>
              <th className="px-4 py-2">Equipment</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map(x => (
              <tr key={x.id} className="border-t border-slate-700/60 text-blue-100">
                <td className="px-4 py-2">{x.name}</td>
                <td className="px-4 py-2">{x.muscle_group || '-'}</td>
                <td className="px-4 py-2">{x.equipment || '-'}</td>
              </tr>
            ))}
            {exercises.length === 0 && (
              <tr><td colSpan="3" className="px-4 py-6 text-center text-blue-200">No exercises yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExerciseManager
