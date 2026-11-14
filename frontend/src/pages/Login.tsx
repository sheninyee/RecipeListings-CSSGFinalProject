import { useState } from 'react'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) { // Update to handle auth information
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
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>

      {error && <p className="error">{error}</p>}
    </main>
  )
}

export default Login
