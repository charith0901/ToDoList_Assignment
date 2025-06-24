import { body, validationResult } from "express-validator";


export const updateValidator = [
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

export const handleUpdateValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: `Validation failed: ${errors.array().map(err => err.msg).join(', ')}`,
            errors: errors.array()
        });
    }
    next();
};
