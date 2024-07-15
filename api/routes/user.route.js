import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  uploadUserPhoto,
  resizeUserPhoto,
} from '../controllers/user.controller.js';

import {
  verifyToken,
  checkRole,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', verifyToken, checkRole, getUsers);
router.get('/:id', verifyToken, checkRole, getUser);
router.put(
  '/:id',
  verifyToken,
  uploadUserPhoto,
  resizeUserPhoto,
  updateUser
);
router.delete('/:id', verifyToken, checkRole, deleteUser);

export default router;
