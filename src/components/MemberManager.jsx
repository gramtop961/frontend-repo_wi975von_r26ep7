import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function MemberManager() {
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [goal, setGoal] = useState('')
  const [loading, setLoading] = useState(false)

  const loadMembers = async () => {
    const res = await fetch(`${API_BASE}/api/members`)
    const data = await res.json()
    setMembers(data)
  }

  const addMember = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, goal })
      })
      if (!res.ok) throw new Error('Failed to create member')
      setName(''); setEmail(''); setGoal('')
      await loadMembers()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadMembers() }, [])

  return (
    <div className="space-y-6">
      <form onSubmit={addMember} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 grid sm:grid-cols-4 gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" required />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (optional)" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" />
        <input value={goal} onChange={e=>setGoal(e.target.value)} placeholder="Goal" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" />
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded px-4">Add</button>
      </form>

      <div className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/60 text-blue-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Goal</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id} className="border-t border-slate-700/60 text-blue-100">
                <td className="px-4 py-2">{m.name}</td>
                <td className="px-4 py-2">{m.email || '-'}</td>
                <td className="px-4 py-2">{m.goal || '-'}</td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan="3" className="px-4 py-6 text-center text-blue-200">No members yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MemberManager
