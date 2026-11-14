import { useEffect, useState } from 'react'
import { getExamples, createExample, type Example } from '../api'
import './App.css'

function App() {
  const [examples, setExamples] = useState<Example[]>([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getExamples()
      .then(setExamples)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    try {
      const created = await createExample(title)
      setExamples((prev) => [created, ...prev])
      setTitle('')
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <main className="app">
      <h1>Create a New Recipe</h1>

      <form onSubmit={handleSubmit} className="recipe-name">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New recipe name"
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : examples.length === 0 ? (
        <p>No recipes yet. Add one above!</p>
      ) : (
        <ul className="example-list">
          {examples.map((ex) => (
            <li key={ex.id}>{ex.title}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
