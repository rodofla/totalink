import { createAccount, login, getUser, updateProfile, uploadImage, getUserByHandle, searchByHandle } from '@/handlers';
import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '@/middleware/validation';
import { authenticate } from '@/middleware/auth';

const ROUTER = Router();


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


ROUTER.get('/user', authenticate, getUser)

ROUTER.patch('/user',
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    handleInputErrors,
    authenticate,
    updateProfile)

ROUTER.post('/user/image', authenticate, uploadImage)

ROUTER.get('/:handle', getUserByHandle)

ROUTER.post('/search',
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    handleInputErrors,
    searchByHandle
)

export default ROUTER;
