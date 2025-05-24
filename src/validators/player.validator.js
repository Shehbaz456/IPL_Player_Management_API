import Joi from 'joi';

const playerSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Player name should be a valid string.',
    'string.empty': 'Player name cannot be empty.',
    'any.required': 'Player name is required.'
  }),
  
  team: Joi.string().trim().required().messages({
    'string.base': 'Team must be a valid string.',
    'string.empty': 'Team name cannot be empty.',
    'any.required': 'Team name is required.'
  }),
  
  country: Joi.string().trim().required().messages({
    'string.base': 'Country should be a valid string.',
    'string.empty': 'Country cannot be empty.',
    'any.required': 'Country is required.'
  }),
  
  runs: Joi.number().integer().min(0).required().messages({
    'number.base': 'Runs must be a valid number.',
    'number.integer': 'Runs must be an integer value.',
    'number.min': 'Runs cannot be negative.',
    'any.required': 'Runs are required.'
  }),
  
  role: Joi.string().valid('Batsman', 'Bowler', 'All-rounder').required().messages({
    'any.only': 'Role must be either "Batsman", "Bowler", or "All-rounder".',
    'any.required': 'Player role is required.'
  }),
  
  salary: Joi.number().positive().required().messages({
    'number.base': 'Salary must be a valid number.',
    'number.positive': 'Salary must be greater than zero.',
    'any.required': 'Player salary is required.'
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