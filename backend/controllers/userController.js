import ErrorHandler from '../utils/errorHandler.js';
import User from '../models/userModel.js';
import sendToken from '../utils/jwtToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';
import cloudinary from 'cloudinary';

// Register a User
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    const uploadedAvatar = await cloudinary.v2.uploader.upload(avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: uploadedAvatar.public_id,
        url: uploadedAvatar.secure_url,
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler('Please enter email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler('User not found with this email', 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is: \n\n${resetUrl}\n\nIf you did not request this, please ignore it.`;

    await sendEmail({
      email: user.email,
      subject: 'Ecommerce Password Recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler('Reset password token is invalid or expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler('Passwords do not match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Get User Details
export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Update User Password
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.comparePassword(req.body.oldPassword))) {
      return next(new ErrorHandler('Old password is incorrect', 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler('Passwords do not match', 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Update User Profile
export const updateProfile = async (req, res, next) => {
  try {
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar) {
      const user = await User.findById(req.user.id);

      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const uploadedAvatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale',
      });

      updatedData.avatar = {
        public_id: uploadedAvatar.public_id,
        url: uploadedAvatar.secure_url,
      };
    }

    await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Get All Users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

// Get Single User (Admin only)
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Update User Role (Admin only)
export const updateUserRole = async (req, res, next) => {
  try {
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Delete User (Admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 404));
    }

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    await user.remove();

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
