import { useState } from 'react';
import { RecipeListPage } from './pages/RecipeListPage';
import { RecipeDetailsPage } from './components/ui/RecipeDetailsPage';

export const App = () => {
  // Your state code here
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div>
      {selectedRecipe ? (
        <RecipeDetailsPage recipe={selectedRecipe} onGoBack={() => setSelectedRecipe(null)} />
      ) : ( 
        <RecipeListPage onRecipeSelect={setSelectedRecipe} />
      )}
    </div>
  );
};
