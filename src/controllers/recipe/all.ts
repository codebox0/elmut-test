import { Request, Response } from 'express';
import {getRecipes} from '../../services/recipe.service'

export const  getAllRecipes = async (req: Request, res: Response) => {
    const recipes = await getRecipes();
    res.status(200).json({data: recipes});
}
