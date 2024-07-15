import express from 'express';
import multer from 'multer';
import {
  addPost,
  getPost,
  deletePost,
  getPosts,
  updatePost,
  resizeTourImages,
  uploadTourImages,
} from '../controllers/post.controller.js';

import {
  verifyToken,
  checkRole,
} from '../controllers/auth.controller.js';

const upload = multer();

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post(
  '/',
  verifyToken,
  uploadTourImages,
  resizeTourImages,
  addPost
);
router.put(
  '/:imgId',
  verifyToken,
  uploadTourImages,
  resizeTourImages,
  updatePost
);
router.delete('/:imgId', verifyToken, deletePost);

export default router;
