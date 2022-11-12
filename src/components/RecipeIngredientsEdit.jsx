import React from 'react'

export default function RecipeIngredientsEdit(props) {
  const { ingredient, handleIngredientChange, handleIngredientDelete } = props;

  let handleChange = (changes) => {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
  }
  return (
    <>
        <input 
          className="recipe-edit__input" 
          value={ingredient.name} 
          onChange={e => handleChange({name:e.target.value})} 
          type="text" />
        <input 
          className="recipe-edit__input" 
          value={ingredient.amount} 
          onChange={e => handleChange({amount:e.target.value})} 
          type="text" />
        <button className="btn btn--danger" onClick={() => handleIngredientDelete(ingredient.id)}>&times;</button>
    </>
  )  
}
