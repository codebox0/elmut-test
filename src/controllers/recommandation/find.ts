import {findRecommendation} from '../../services/recommandation.service'
import {Request, Response} from 'express'
import {SearchRecipeDto} from "../../dtos/input";

export const  find =  async  (req: Request, res: Response) => {
    const search  : SearchRecipeDto = req.body;

    console.log('search: ', search);
    const recommendation =  await findRecommendation(search);


    if (!recommendation) {
        return res.status(404).json({message: `Recommandation not found`});
    }

    return res.status(200).json({data: recommendation});
};
