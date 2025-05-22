import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/admin.middleware.js';

const router = express.Router();

// Admin routes
router.get('/', auth, adminOnly, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, adminOnly, deleteUser);

export default router;