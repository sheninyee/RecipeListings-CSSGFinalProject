import { useEffect, useState } from 'react'
import { getRecipes, createRecipe, type Recipe } from '../api'
import '../App.css'

function CreateRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [tools, setTools] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    try {
      const created = await createRecipe(title, description, ingredients, tools)
      setRecipes((prev) => [created, ...prev])
      setTitle('')
      setDescription('')
      setIngredients('')
      setTools('')
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <main className="app">
      <h1>Create a New Recipe</h1>

      <form onSubmit={handleSubmit} className="create-recipe-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New recipe name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="New recipe description"
        />
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients needed"
        />
        <textarea
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          placeholder="Tools needed"
        />

        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes yet. Add one now!</p>
      ) : (
        <ul className="example-list">
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default CreateRecipe
