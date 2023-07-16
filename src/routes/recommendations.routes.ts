import {Router} from 'express'
import {getAllRecommendations} from '../controllers/recommandation/all'
import {validateParamSchemaData, validateSchema} from '../utils/jwt.utils'
import {recommandationSchema} from "../dtos/recommandation";
import {idSchema} from "../dtos/id";
import {find} from "../controllers/recommandation/find";
import {get} from "../controllers/recommandation/get";

const router = Router()

router.get('/', getAllRecommendations)
router.get('/:id', validateParamSchemaData(idSchema), get)
router.post('/find', validateParamSchemaData(recommandationSchema), find)

export default router