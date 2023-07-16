import { Request, Response } from 'express';
import {getRecommendations} from '../../services/recommandation.service'

export const  getAllRecommendations = async (req: Request, res: Response) => {
    const recommendations = await getRecommendations();
    res.status(200).json({data: recommendations});
}
