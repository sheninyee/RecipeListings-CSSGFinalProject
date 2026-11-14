import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  async function handleSubmit(e: React.FormEvent) { // Update to handle auth information
    e.preventDefault()
    try {
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <main className="app">
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit} className="user-login-form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </main>
  )
}

export default App
