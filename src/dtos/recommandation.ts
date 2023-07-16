import Joi from 'Joi'

export interface RecommendationDto<T> {
    animal_type:          string    //   Code produit sur lequel s'applique le prix
    race:              	  string    //   Pays dans lequel s'applique le prix
    min_coef:             number    //   Devise du prix
    max_coef:             number    //   Montant
    recipes_slug: Array<T>           //   Recettes associées
}

export type recommandationInput<T> = {
    animal_type:          String    		//   Code produit sur lequel s'applique le prix
    race:              	  String    		//   Pays dans lequel s'applique le prix
    min_coef:             Number    		//   Devise du prix
    max_coef:             Number    		//   Montant
    recipes_slug: 		  Array<T>          //   Recettes associées
}

export const recommandationSchema = Joi.object({
    animal_type: Joi.string(),
    race: Joi.string(),
    min_coef: Joi.number(),
    max_coef: Joi.number(),
    // recipe_slug: Joi.string().required(),
});