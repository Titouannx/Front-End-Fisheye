function displayRecipes() {
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      console.log(`Recette ${i + 1}:`);
      console.log(`Nom: ${recipe.name}`);
      console.log(`Ingrédients:`);
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j];
        const quantity = ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : '';
        console.log(`- ${ingredient.ingredient} ${quantity}`);
      }
      console.log(`Temps de préparation: ${recipe.time} minutes`);
      console.log(`Description: ${recipe.description}`);
      console.log(`Appareil: ${recipe.appliance}`);
      console.log(`Ustensiles: ${recipe.ustensils.join(', ')}`);
      console.log('------------------------------');
    }
  }
  
async function init() {
    // Appel de la fonction pour afficher les recettes dans la console
  displayRecipes();
}

init();