// multer => uplaod files
import multer from 'multer';
// sharp => edit files for example resize image
import sharp from 'sharp';

import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

/* this saves image to memory (best practice) saves actual image to buffer */
const multerStorage = multer.memoryStorage();

// make sure the file is an image
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

export const uploadUserPhoto = upload.single('avatar');

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.userId}-${Date.now()}.jpeg`;

  // width 500 height 500
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    status: 'success',
    users,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json({
    status: 'success',
    user,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tokenUserId = req.userId;
  if (req.file) {
    const serverUrl = `${req.protocol}://${req.get('host')}`;
    req.body.avatar = `${serverUrl}/img/users/${req.file.filename}`;
  }
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return next(new AppError('Not Authorized!', 405));
  }

  let updatedPassword = null;

  if (password) {
    updatedPassword = await bcrypt.hash(password, 10);
  }

  const updateUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...inputs,
      ...(updatedPassword && { password: updatedPassword }),
      ...(avatar && { avatar }),
    },
  });
  res.status(201).json({
    status: 'success',
    message: 'User Updated Successfully!',
    user: updateUser,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id },
  });

  res.status(200).json({
    status: 'success',
    message: 'User Deleted Successfully!',
  });
});
