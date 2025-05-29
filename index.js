const apiKey = "98f097d0f20de8da85b03c1f23c310ff";
const baseUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=";
const app_id = "92bb7fff";
const userId = "DarlaDivya";

let searchInput = document.getElementById("search_input");
let searchButton = document.getElementById("search_btn");
let resultContainer = document.getElementById("Future_data");

async function fetchRecipes(query) {
    try {
        let response = await fetch(`${baseUrl}${query}&app_id=${app_id}&app_key=${apiKey}`, {
            headers: {
                "Edamam-Account-User": userId
            }
        });

        let data = await response.json();
        displayRecipes(data.hits);
        console.log(data)
    } catch (error) {
        alert("Failed to fetch food recipe data. Please check the recipe name.");
        console.error(error);
    }
}

function displayRecipes(recipes) {
    resultContainer.innerHTML = "";

    if (recipes.length === 0) {
        resultContainer.innerHTML = "<p class='text-center text-primary'>No recipes found.</p>";
        return;
    }

    recipes.forEach((item) => {
        let recipe = item.recipe;
        let card = document.createElement("div");
        card.classList.add("col-3","recipe-card-container");

        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.label}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.label}</h5>
                    <p class="card-text">Calories: ${Math.round(recipe.calories)}</p>
                    <p class="card-text">CuisineType: ${recipe.cuisineType}</p>
                    <a href="${recipe.url}" target="_blank" class="btn btn-primary btn-sm">View Recipe</a>
                </div>
            </div>
        `;

        resultContainer.appendChild(card);
    });
}

searchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let query = searchInput.value.trim();
    if (!query) {
        alert("Please enter a recipe name");
        return;
    }
    await fetchRecipes(query);
});