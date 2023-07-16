import { Router } from 'express';
import recipesRoutes from "./recipes.routes";
import recommendationsRoutes from "./recommendations.routes";

const router = Router();

router.use('/recipes', recipesRoutes);
router.use('/recommandations', recommendationsRoutes);

export default router;
