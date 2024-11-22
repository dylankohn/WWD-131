// Function to display stars (same as before)
function displayStars(rating) {
    const filledStars = Math.floor(rating); // Number of full stars
    const emptyStars = 5 - filledStars; // Number of empty stars

    let stars = '';
    
    // Add filled stars
    for (let i = 0; i < filledStars; i++) {
        stars += '★'; // Unicode for filled star
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆'; // Unicode for empty star
    }

    return stars;
}

// Import the recipes array from recipes.mjs
import recipes from './recipes.mjs';

// Select an HTML element where you want to display the recipes
const recipeContainer = document.querySelector('#recipeContainer');

// Function to display a random recipe
function displayRandomRecipe(recipes) {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    displayRecipes([randomRecipe]); // Display only the random recipe
}

// Function to display recipes on the page
function displayRecipes(recipes) {
    recipeContainer.innerHTML = ''; // Clear the container before displaying new recipes

    recipes.forEach(recipe => {
        // Create a recipe card
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        // Populate the recipe card
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

        // Append the recipe card to the container
        recipeContainer.appendChild(recipeCard);
    });
}

// Call the function to display one random recipe when the page loads
displayRandomRecipe(recipes);

// Set up a debounce function to handle search delay
let searchTimeout;
const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout); // Clear the previous timeout if user types quickly
    const query = searchInput.value.toLowerCase();
    searchTimeout = setTimeout(() => {
        if (query === '') {
            // If the search is cleared, show a random recipe again
            displayRandomRecipe(recipes);
        } else {
            // Filter the recipes based on the search query
            const filteredRecipes = recipes.filter(recipe => {
                const name = recipe.name.toLowerCase();
                const tagsText = recipe.tags.join(', ').toLowerCase(); // Join tags to make the search easier
                const tags = tagsText.split(',').map(tag => tag.trim()); // Convert tags text to an array

                // Match the query with name or tags
                return name.includes(query) || tags.some(tag => tag.includes(query));
            });

            // Display the filtered recipes after the search
            displayRecipes(filteredRecipes);
        }
    }, 300); // 300 ms delay before searching
});
