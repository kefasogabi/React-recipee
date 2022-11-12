import React, { useContext } from "react";
import RecipeIngredientsEdit from "./RecipeIngredientsEdit";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from 'uuid';

export default function RecipeEdit({recipe}) {
const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)
  
let handleChange = (changes) => {
  handleRecipeChange(recipe.id, { ...recipe, ...changes })
}

let handleIngredientChange = (id, ingredient) => {
  const newIngredients = [...recipe.ingredients]
  const index = newIngredients.findIndex(i => i.id === id);
  newIngredients[index] = ingredient;
  handleChange({ingredients: newIngredients})
}

let handleIngredientAdd = () => {
  const newIngredient = {
    id:uuidv4(),
    name:'',
    amount:''
  }

  handleChange({ ingredients: [...recipe.ingredients, newIngredient]})
}

let handleIngredientDelete = (id) => {
  handleChange({ingredients: recipe.ingredients.filter( i => i.id !== id)})
}

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button className="btn recipe-edit__remove-button" onClick={() => handleRecipeSelect(undefined)} >&times;</button>
      </div>
      <div className="recipe-edit__details-grid">
        <label 
          htmlFor="name" 
          className="recipe-edit__label">
          Name:
        </label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          className="recipe-edit__input" 
          value={recipe.name} 
          onChange={e => handleChange({name:e.target.value})} />
        <label 
          htmlFor="cookTime" 
          className="recipe-edit__label">
          Cook Time:
          </label>
        <input 
          type="text" 
          name="cookTime" 
          id="cookTime" 
          className="recipe-edit__input" 
          value={recipe.cookTime} 
          onChange={e => handleChange({cookTime:e.target.value})} />
        <label 
          htmlFor="servings" 
          className="recipe-edit__label">
          Servings:
          </label>
        <input 
          type="number" 
          min="1" 
          name="servings" 
          id="servings" 
          className="recipe-edit__input" 
          value={recipe.servings} onChange={e => handleChange({servings: parseInt(e.target.value) || ''})} />
        <label 
          htmlFor="instructions" 
          className="recipe-edit__label">
          Instructions:
          </label>
        <textarea 
          name="instructions" 
          id="instructions" 
          onChange={e => handleChange({instruction:e.target.value})} 
          value={recipe.instruction}
          className="recipe-edit__input" />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map(ingredient => (
          <RecipeIngredientsEdit 
            key={ingredient.id} 
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            ingredient={ingredient} />
        ))}
        
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button className="btn btn--primary" onClick={() => handleIngredientAdd()}>Add Ingredients</button>
      </div>
    </div>
  );
}
