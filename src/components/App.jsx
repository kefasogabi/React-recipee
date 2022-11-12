import React, { useState, useEffect } from 'react'; 
import RecipeList from "./RecipeList";
import '../css/App.css';
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from './RecipeEdit';
export const RecipeContext = React.createContext();

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  let handleRecipeChange = (id, recipe) => {
      const newRecipes = [...recipes]
      const index = newRecipes.findIndex(r => r.id === id);
      newRecipes[index] = recipe;
      setRecipes(newRecipes)
  }

  let handleRecipeSelect = (id) => {
    setSelectedRecipeId(id)
  }

  let handleRecipeAdd = () => {
    const newRecipe = {
      id:uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instruction: '',
      ingredients: [
        {
          id:uuidv4(),
          name:"",
          amount: ''
        }
      ]
    }
  
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  let handleRecipeDelete = (id) => {
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  const  LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

 
  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  );

  
}

const sampleRecipes = [
  {
    id:1,
    name: 'Plain Chicken',
    servings:3,
    cookTime:'1:45',
    instruction: "1. Put Salt on Chicken\n2. Put Chicken in Oven\n3. Eat chicken",
    ingredients: [
      {
        id:1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id:2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id:2,
    name: 'Plain Pork',
    servings:5,
    cookTime:'0:45',
    instruction: "1. Put paprika on Pork\n2. Put pork in Oven\n3. Eat pork",
    ingredients: [
      {
        id:1,
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id:2,
        name: 'Peprika',
        amount: '2 Tbs'
      }
    ]
  }
]

export default App;
