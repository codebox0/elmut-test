import Joi from 'Joi'

export interface RecipeDto {
    id: string,                    	// Recipe id
    slug: string,                  	// Recipe slug
    animal: string,               	// Animal type (dog / cat)
    name: string,                  	// Recipe name (pork / fish / turkey / chicken)
    coefficient: number,    			// Coefficient calorifique
}

export type recipeInput = {
    slug: String,                  	// Recipe slug
    animal: String,               	// Animal type (dog / cat)
    name: String,                  	// Recipe name (pork / fish / turkey / chicken)
    coefficient: Number,    			// Coefficient calorifique
}

export const recipeSchema = Joi.object({
    slug: Joi.string().required(),
    animal: Joi.string().required(),
    name: Joi.string().required(),
    coefficient: Joi.number().required()
});

export const recipeSchemaValid = Joi.object({
    slug: Joi.string().required(),
    animal: Joi.string().required(),
    name: Joi.string().required(),
    coefficient: Joi.number().required()
});

