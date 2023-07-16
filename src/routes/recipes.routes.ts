import {Router} from 'express'
import {getAllRecipes} from '../controllers/recipe/all'
import {get} from '../controllers/recipe/get'
import {validateParamSchemaData, validateSchema} from '../utils/jwt.utils'
import {searchSchema} from "../dtos/input";
import {find} from "../controllers/recipe/find";
import {idSchema} from "../dtos/id";


const router = Router()


router.get('/', getAllRecipes)
router.get('/:id', validateParamSchemaData(idSchema), get)
router.post('/find', validateSchema(searchSchema), find)

export default router