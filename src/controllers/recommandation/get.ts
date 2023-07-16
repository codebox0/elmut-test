import {findRecommendationById, getRecommendations} from '../../services/recommandation.service'
import {Request, Response} from 'express'
import {SearchRecipeDto} from "../../dtos/input";
import {RecommendationDto} from "../../dtos/recommandation";

export const  get =  async  (req: Request, res: Response) => {
    const id  = req.params.id;

    const recommendation: RecommendationDto<string> | undefined =  await findRecommendationById(id);

    if (!recommendation) {
        return res.status(404).json({message: `Recommendation not found`});
    }

    return res.status(200).json({data: recommendation});
};
