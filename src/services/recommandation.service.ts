import {SearchRecipeDto} from "../dtos/input";
import {RecommendationDto} from "../dtos/recommandation";
import {filterRecipe} from "./recipe.service";
import {RecipeDto} from "../dtos/recipe";
import Recommendations from "../assets/recommandations.json";
import Recipes from "../assets/recipes.json";

const findRecommendation = (searchInput: SearchRecipeDto ): RecommendationDto<RecipeDto> | null  => {
    return filterRecipe(searchInput);
}

const findRecommendationById = async (id: string): Promise<RecommendationDto<string>| undefined> => {
    return Recommendations.find((recommendation) =>
        recommendation.id === id );
}

const filterRecommendation = (searchInput: SearchRecipeDto): RecommendationDto<RecipeDto>[] => {
    const recommendations: Array<RecommendationDto<string>> = Recommendations.filter((recommendation: RecommendationDto<string>) => {
        let isAvailable =!searchInput.animal_type || recommendation.animal_type.includes(searchInput.animal_type);
        isAvailable = isAvailable && (!searchInput.race || recommendation.race.includes(searchInput.race) );
        isAvailable = isAvailable && (!searchInput.min_coef || recommendation.min_coef >= searchInput.min_coef);
        isAvailable = isAvailable && (!searchInput.max_coef || recommendation.max_coef <= searchInput.max_coef);
        return isAvailable;
    }) || []

    return recommendations.map((recommendation: RecommendationDto<string>) => {
        const recipes = Recipes.filter((recipe: RecipeDto) => {
            return recommendation.recipes_slug.includes(recipe.slug);
        }) || []
        return {
            ...recommendation,
            recipes_slug: recipes
        }
    }) || []
}

const getRecommendations = async () => {
    return Recommendations;
}

export {
    findRecommendation,
    getRecommendations,
    filterRecommendation,
    findRecommendationById
}