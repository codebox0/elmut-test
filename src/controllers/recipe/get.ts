import {Request, Response} from 'express'
import {RecipeDto} from "../../dtos/recipe";
import {findRecipeById} from "../../services/recipe.service";

export const  get =  async  (req: Request, res: Response) => {
    const { id } = req.params;
    const recipes: RecipeDto | undefined = await findRecipeById(id);

    if (!recipes) {
        return res.status(404).json({error: `Recipe not found`});
    }

    return res.status(200).json({data: recipes});
};
