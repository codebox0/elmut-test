import {Request, Response} from 'express'
import {RecipeDto} from "../../dtos/recipe";
import {SearchRecipeDto} from "../../dtos/input";
import {filterRecipe, findRecipeById} from "../../services/recipe.service";
import {RecommendationDto} from "../../dtos/recommandation";

export const  get =  async  (req: Request, res: Response) => {
    const { id } = req.params;
    // get body data
    const searchDto : SearchRecipeDto = req.body;

    console.log('searchDto: ', searchDto);

    const recipes: RecipeDto | undefined = await findRecipeById(id);

    console.log('recipes: ', recipes);

    if (!recipes) {
        return res.status(404).json({message: `Recipes not found`});
    }

    return res.status(200).json({data: recipes});
};
