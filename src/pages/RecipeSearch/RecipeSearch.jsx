import { useState } from "react"
import * as recipeService from '../../services/recipeService'

const RecipeSearch = () => {
  const [formData, setFormData] = useState({
    query: ''
  })
  const [results, setResults] = useState([])
  
  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const data = await recipeService.recipeSearch(formData)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    // MAKE API CALL USING STATE
    // SET RESULTS WITH RETURNED DATA
  }

  return (
    <>
      <h1>Recipe Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" onChange={handleChange}/>
        <button type="submit">Search</button>
      </form>
    </>
  )
}

export default RecipeSearch