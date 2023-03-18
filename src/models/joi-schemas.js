import Joi from "joi";

export const UserSpec = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const CategorySpec = {
    title: Joi.string().required(),
};

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const OghamSpec = {
    title: Joi.string().required(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
    county: Joi.string().required(),
    translation: Joi.string().allow("").optional(),
};
