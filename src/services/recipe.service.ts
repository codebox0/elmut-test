import {SearchRecipeDto} from "../dtos/input";
import Recipes from "../assets/recipes.json";
import {RecipeDto} from "../dtos/recipe";
import {RecommendationDto} from "../dtos/recommandation";

const getRecipe = async (id: string) => {
    return Recipes;
}

const filterRecipe = (searchInput: SearchRecipeDto): RecommendationDto<RecipeDto> => {
    const RecipeList: RecipeDto[] = Recipes;

    const recipeList: RecommendationDto<RecipeDto> = {
        race: searchInput.race,
        animal_type: searchInput.animal_type,
        min_coef: searchInput.min_coef,
        max_coef: searchInput.max_coef,
        recipes_slug: (RecipeList as Array<RecipeDto> )?.filter((recipe: RecipeDto) => {
            let isAvailable =!searchInput.race || recipe.animal.includes(searchInput.animal_type);
            // isAvailable =isAvailable && (!searchInput.animal_type || recipe.name.includes(searchInput.animal_type));
            isAvailable = isAvailable && (!searchInput.min_coef || recipe.coefficient >= searchInput.min_coef);
            isAvailable = isAvailable && (!searchInput.max_coef || recipe.coefficient <= searchInput.max_coef);
            return isAvailable;
        }) || []
    };

    return recipeList || null;
}

const findRecipeById = async (id: string): Promise<RecipeDto | undefined> => {
    return Recipes.find((recipe) => recipe.id === id );
}

const getRecipes = async () => {
    return Recipes;
}

export {
    getRecipes,
    filterRecipe,
    getRecipe,
    findRecipeById
}