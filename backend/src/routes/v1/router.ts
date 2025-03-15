import { createAccount, login, getUser, updateProfile, uploadImage } from '@/handlers';
import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '@/middleware/validation';
import { authenticate } from '@/middleware/auth';

const ROUTER = Router();

/** Autenticación y registro */
ROUTER.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('name').notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('email').isEmail().withMessage('E-mail no válido'),
    body('password').isLength({ min: 8 }).withMessage('El Password es muy corto, mínimo 8 caracteres'),
    handleInputErrors,
    createAccount)

ROUTER.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .notEmpty()
        .withMessage('El Password es obligatorio'),
    handleInputErrors,
    login
)

/** Private endpoint */
ROUTER.get('/user', authenticate, getUser)
ROUTER.patch('/user',
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('description').notEmpty().withMessage('La Descripción no puede ir vacia'),
    handleInputErrors,
    authenticate,
    updateProfile)
ROUTER.post('/user/image', authenticate, uploadImage)

export default ROUTER;
