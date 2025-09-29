const User = require('../models/User');
const mongoose = require('mongoose');

const sendResponse = (res, statusCode, success, data = null, error = null) => {
  const response = { success };
  if (success && data !== null) response.data = data;
  if (!success && error) response.error = error;
  return res.status(statusCode).json(response);
};

const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body || {};
    if (!name || !email) return sendResponse(res, 400, false, null, 'name and email are required');
    const user = await User.create({ name, email, role });
    return sendResponse(res, 201, true, { message: 'User created', user });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to create user';
    return sendResponse(res, 500, false, null, msg);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    const count = await User.countDocuments();
    return sendResponse(res, 200, true, { users, count });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to retrieve users';
    return sendResponse(res, 500, false, null, msg);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendResponse(res, 400, false, null, 'User ID is required');
    if (!mongoose.Types.ObjectId.isValid(id)) return sendResponse(res, 400, false, null, 'Invalid user ID');
    const user = await User.findById(id).lean();
    if (!user) return sendResponse(res, 404, false, null, 'User not found');
    return sendResponse(res, 200, true, { user });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to retrieve user';
    return sendResponse(res, 500, false, null, msg);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body || {};
    if (!id) return sendResponse(res, 400, false, null, 'User ID is required');
    if (!mongoose.Types.ObjectId.isValid(id)) return sendResponse(res, 400, false, null, 'Invalid user ID');
    const updated = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
    if (!updated) return sendResponse(res, 404, false, null, 'User not found');
    return sendResponse(res, 200, true, { message: 'User updated', user: updated });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to update user';
    return sendResponse(res, 500, false, null, msg);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendResponse(res, 400, false, null, 'User ID is required');
    if (!mongoose.Types.ObjectId.isValid(id)) return sendResponse(res, 400, false, null, 'Invalid user ID');
    const deleted = await User.findByIdAndDelete(id).lean();
    if (!deleted) return sendResponse(res, 404, false, null, 'User not found');
    return sendResponse(res, 200, true, { message: `User ${id} deleted`, deletedId: id });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to delete user';
    return sendResponse(res, 500, false, null, msg);
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
