import Joi from 'Joi'

export interface SearchRecipeDto {
    animal_type:          string
    race:              	  string
    min_coef:             number
    max_coef:             number
}

export type SearchInput = {
    animal_type:          String
    race:              	  String
    min_coef:             Number
    max_coef:             Number
}

export const searchSchema = Joi.object({
    animal_type: Joi.string().min(0).max(60),
    race: Joi.string().min(0).max(60),
    min_coef: Joi.number().min(0),
    max_coef: Joi.string().min(0),
}).or("animal_type", "race");

export const searchRecipeSchema = Joi.object({
    animal_type: Joi.string().min(0).max(60),
    race: Joi.string().min(0).max(60),
    min_coef: Joi.number().min(0),
    max_coef: Joi.string().min(0),
}).or("animal_type", "race");
