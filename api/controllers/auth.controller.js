import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const verifyToken = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError('Not Authenticated!', 401));
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    async (err, payload) => {
      if (err) {
        return next(new AppError('Token is not Valid!', 403));
      }
      req.isAdmin = payload.isAdmin;
      req.userId = payload.id;
    }
  );
  next();
});

export const checkRole = catchAsync(async (req, res, next) => {
  if (!req.isAdmin) {
    return next(new AppError('Not Authorized!', 403));
  }
  next();
});

export const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new AppError('Inputs required!', 400));
  }

  // HASH THE PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);
  // CREATE A NEW USER AND SAVE TO DB
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    message: 'User created successfully',
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('Inputs required!', 400));
  }

  // CHECK IF THE USER EXISTS
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) return next(new AppError('Invalid Credentials', 401));

  // CHECK IF THE PASSWORD IS CORRECT
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );
  if (!isPasswordValid)
    return next(new AppError('Invalid Credentials', 401));

  // GENERATE COOKIE TOKEN AND SEND TO THE USER
  const age = 1000 * 60 * 60 * 24 * 7;

  const token = jwt.sign(
    {
      id: user.id,
      isAdmin: true,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: age }
  );

  const { password: userPassword, ...userInfo } = user;

  res
    .cookie('token', token, {
      httpOnly: true,
      maxAge: age,
      // secure: true,
    })
    .status(200)
    .json({
      message: 'Login Successful',
      data: userInfo,
    });
});

export const logout = (req, res, next) => {
  res
    .clearCookie('token')
    .status(200)
    .json({ message: 'Logout Successful!' });
};
