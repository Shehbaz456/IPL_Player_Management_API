import Joi from 'joi';

const playerSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'any.required': 'Name is required.'
  }),
  team: Joi.string().trim().required().messages({
    'string.base': 'Team name must be a string.',
    'string.empty': 'Team name cannot be empty.',
    'any.required': 'Team name is required.'
  }),
  country: Joi.string().trim().required().messages({
    'string.base': 'Country must be a string.',
    'string.empty': 'Country cannot be empty.',
    'any.required': 'Country is required.'
  }),
  runs: Joi.number().integer().min(0).required().messages({
    'number.base': 'Runs must be a number.',
    'number.min': 'Runs must be a positive number.',
    'any.required': 'Runs are required.'
  }),
  role: Joi.string().valid('Batsman', 'Bowler', 'All-rounder').required().messages({
    'any.only': 'Role must be one of Batsman, Bowler, or All-rounder.',
    'any.required': 'Role is required.'
  }),
  salary: Joi.number().positive().required().messages({
    'number.base': 'Salary must be a number.',
    'number.positive': 'Salary must be a positive number.',
    'any.required': 'Salary is required.'
  })
});

export const validatePlayer = (req, res, next) => {
  const { error } = playerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};
export default validatePlayer;