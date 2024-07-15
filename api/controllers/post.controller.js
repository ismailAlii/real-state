// multer => uplaod files
import multer from 'multer';
// sharp => edit files for example resize image
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import crypto from 'crypto';

import prisma from '../lib/prisma.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

function deleteFiles(filePaths) {
  filePaths.forEach((filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${filePath}`, err);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  });
}

// save image to memory
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Not an image! Please upload only images.', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadTourImages = upload.fields([
  {
    name: 'images',
    maxCount: 4,
  },
]);

export const resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.images) {
    return next();
  }

  if (!req.params.imgId && req.method === 'POST') {
    const postId = crypto.randomUUID();
    req.imgId = postId;
  }

  const imgId = req.imgId || req.params.imgId;

  const directoryPath = 'public/img/posts';
  const files = fs.readdirSync(directoryPath);
  const filesToDelete = files
    .filter((file) => {
      return file.split('--')[1] === imgId;
    })
    .map((file) => {
      return `${directoryPath}/${file}`;
    });
  req.filesToDelete = filesToDelete;

  // 2) Images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `post--${imgId}--${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        // .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/posts/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

export const getPosts = catchAsync(async (req, res, next) => {
  const query = req.query;
  const posts = await prisma.post.findMany({
    where: {
      city: query.city || undefined,
      type: query.type || undefined,
      property: query.property || undefined,
      bedroom: parseInt(query.bedroom) || undefined,
      price: {
        gte: parseInt(query.minPrice) || undefined,
        lte: parseInt(query.maxPrice) || undefined,
      },
    },
  });
  res.status(200).json({
    status: 'success',
    results: posts.length,
    posts,
  });
});

export const getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id } });
  res.status(200).json({
    status: 'success',
    post,
  });
});

export const addPost = catchAsync(async (req, res, next) => {
  req.body.imgId = req.imgId;
  req.body.price = parseInt(req.body.price);
  req.body.bedroom = parseInt(req.body.bedroom);
  req.body.bathroom = parseInt(req.body.bathroom);
  req.body.latitude = parseFloat(req.body.latitude);
  req.body.longitude = parseFloat(req.body.longitude);
  const data = req.body;
  const tokenUserId = req.userId;
  const newPost = await prisma.post.create({
    ...data,
    userId: tokenUserId,
  });

  res.status(201).json({
    status: 'success',
    message: 'Post created successfully',
    post: newPost,
  });
});

export const updatePost = catchAsync(async (req, res, next) => {
  const { imgId } = req.params;
  const post = await prisma.post.findFirst({ where: { imgId } });
  if (post.userId !== req.userId) {
    return next(new AppError('Not Authorized!', 403));
  }

  if (req.body.price) {
    req.body.price = parseInt(req.body.price);
  }
  if (req.body.bedroom) {
    req.body.bedroom = parseInt(req.body.bedroom);
  }
  if (req.body.bathroom) {
    req.body.bathroom = parseInt(req.body.bathroom);
  }
  if (req.body.latitude) {
    req.body.latitude = parseFloat(req.body.latitude);
  }
  if (req.body.longitude) {
    req.body.longitude = parseFloat(req.body.longitude);
  }

  const data = req.body;
  const udpatedPost = await prisma.post.update({
    where: { id: post.id },
    data,
  });

  // Delete old images
  if (req.filesToDelete) deleteFiles(req.filesToDelete);

  res.status(201).json({
    status: 'success',
    message: 'Post Updated successfully',
    post: udpatedPost,
  });
});

export const deletePost = catchAsync(async (req, res, next) => {
  const { imgId } = req.params;
  const post = await prisma.post.findFirst({ where: { imgId } });
  if (post.userId !== req.userId) {
    return next(new AppError('Not Authorized!', 403));
  }
  const directoryPath = 'public/img/posts';
  const filesToDelete = post.images.map((file) => {
    return `${directoryPath}/${file}`;
  });

  await prisma.post.delete({ where: { id: post.id } });

  if (filesToDelete) deleteFiles(filesToDelete);

  res.status(201).json({
    status: 'success',
    message: 'Post Deleted successfully',
  });
});
