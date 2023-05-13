const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createAuthorsValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('surname').notEmpty().withMessage('Surname cannot be empty'),
  body('birthdate').notEmpty().withMessage('Birthdate cannot be empty'),
  body('biography').notEmpty().withMessage('biography cannot be empty'),
  validFields,
];
