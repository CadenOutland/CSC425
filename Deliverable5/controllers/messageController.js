const Message = require('../models/Message');
const mongoose = require('mongoose');

// Helper function to send standardized responses
const sendResponse = (res, statusCode, success, data = null, error = null) => {
  const response = { success };

  if (success && data !== null) {
    response.data = data;
  }

  if (!success && error) {
    response.error = error;
  }

  return res.status(statusCode).json(response);
};

// POST /api/messages → Create a new message
const createMessage = async (req, res) => {
  try {
    const { author, text, isRead } = req.body || {};

    if (!author || !text) {
      return sendResponse(res, 400, false, null, 'author and text are required');
    }

    const message = await Message.create({ author, text, isRead });

    return sendResponse(res, 201, true, {
      message: 'Message created successfully',
      messageData: message
    });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to create message';
    return sendResponse(res, 500, false, null, msg);
  }
};

// GET /api/messages → Get all messages (supports optional ?limit & ?skip)
const getAllMessages = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '50', 10), 100);
    const skip = Math.max(parseInt(req.query.skip || '0', 10), 0);

    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const count = await Message.countDocuments();

    return sendResponse(res, 200, true, { messages, count });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to retrieve messages';
    return sendResponse(res, 500, false, null, msg);
  }
};

// GET /api/messages/:id → Get a specific message by ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, null, 'Message ID is required');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, 'Invalid message ID');
    }

    const message = await Message.findById(id).lean();

    if (!message) {
      return sendResponse(res, 404, false, null, 'Message not found');
    }

    return sendResponse(res, 200, true, { message });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to retrieve message';
    return sendResponse(res, 500, false, null, msg);
  }
};

// PUT /api/messages/:id → Update a message by ID
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body || {};

    if (!id) {
      return sendResponse(res, 400, false, null, 'Message ID is required');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, 'Invalid message ID');
    }

    const updated = await Message.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).lean();

    if (!updated) {
      return sendResponse(res, 404, false, null, 'Message not found');
    }

    return sendResponse(res, 200, true, {
      message: 'Message updated successfully',
      messageData: updated
    });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to update message';
    return sendResponse(res, 500, false, null, msg);
  }
};

// DELETE /api/messages/:id → Delete a message by ID
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, null, 'Message ID is required');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, 'Invalid message ID');
    }

    const deleted = await Message.findByIdAndDelete(id).lean();

    if (!deleted) {
      return sendResponse(res, 404, false, null, 'Message not found');
    }

    return sendResponse(res, 200, true, {
      message: `Message with ID ${id} deleted successfully`,
      deletedId: id
    });
  } catch (error) {
    const msg = error && error.message ? error.message : 'Failed to delete message';
    return sendResponse(res, 500, false, null, msg);
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};