function displayStars(rating) {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;

    let stars = '';
    
    // Add filled stars
    for (let i = 0; i < filledStars; i++) {
        stars += '★';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }

    return stars;
}

import recipes from './recipes.mjs';

const recipeContainer = document.querySelector('#recipeContainer');

function displayRandomRecipe(recipes) {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    displayRecipes([randomRecipe]);
}

function displayRecipes(recipes) {
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <img class="recipe-img" src="${recipe.image}" alt="${recipe.name}">
            <div class="information">
                <div class="type">
                    <h2>${recipe.name}</h2>
                </div>
                <h2>${recipe.author}</h2>
                <span class="rating" role="img" aria-label="Rating: ${recipe.rating} stars">
                    ${displayStars(recipe.rating)}
                </span>
                <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
                <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
                <p><strong>Tags:</strong> ${recipe.tags.join(', ')}</p>
                <p class="description">${recipe.description}</p>
                <p><strong>Ingredients:</strong><br> ${recipe.recipeIngredient.join('<br>')}</p>
                <p><strong>Instructions:</strong><br> ${recipe.recipeInstructions.join(' ')}</p>
                <p><strong>Recipe Yield:</strong> ${recipe.recipeYield}</p>
                <p><strong>Date Published:</strong> ${recipe.datePublished}</p>
                <p><strong>Is Based On:</strong> ${recipe.isBasedOn}</p>
                <p><strong>URL:</strong> ${recipe.url}</p>
            </div>
        `;

        recipeContainer.appendChild(recipeCard);
    });
}

displayRandomRecipe(recipes);

let searchTimeout;
const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const query = searchInput.value.toLowerCase();
    searchTimeout = setTimeout(() => {
        if (query === '') {

            displayRandomRecipe(recipes);
        } else {

            const filteredRecipes = recipes.filter(recipe => {
                const name = recipe.name.toLowerCase();
                const tagsText = recipe.tags.join(', ').toLowerCase();
                const tags = tagsText.split(',').map(tag => tag.trim());

                return name.includes(query) || tags.some(tag => tag.includes(query));
            });

            displayRecipes(filteredRecipes);
        }
    }, 300);
});
