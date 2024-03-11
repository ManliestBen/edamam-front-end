import { useState } from "react"
import { NavLink } from "react-router-dom"
import * as recipeService from '../../services/recipeService'
import styles from './RecipeSearch.module.css'

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
      setResults(data)
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
      {
        results.length ?
        <div className={styles.resultContainer}>
          {results.map(recipe =>
            <NavLink to={`/recipes/${recipe.recipe.uri.replace(`http://www.edamam.com/ontologies/edamam.owl#recipe_`, '')}`} key={recipe.recipe.uri} >
              {/* http://www.edamam.com/ontologies/edamam.owl#recipe_ */}
              <div className={styles.recipeCard}>
                <img src={recipe.recipe.image} alt="" />
                <h3>{recipe.recipe.label}</h3>
              </div>  
            </NavLink>
          )}
        </div>
        :
        <h2>Search for a recipe!</h2>
      }
    </>
  )
}

export default RecipeSearch