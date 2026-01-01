const Message = require('../models/message.model');
const User = require('../models/user.model');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ sentAt: -1 })
      .populate('sender recipient', 'username email');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender recipient', 'username email');
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConversation = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, recipient: receiverId },
        { sender: receiverId, recipient: senderId },
      ]
    })
    .sort({ sentAt: 1 }) // orden cronológico ascendente
    .populate('sender recipient', 'username email');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMessage = async (req, res) => {
  const { sender, recipient, content } = req.body;
  if (!sender || !recipient || !content) {
    return res.status(400).json({ error: 'Sender, recipient, and content are required' });
  }
  try {
    const senderExists = await User.findById(sender);
    const recipientExists = await User.findById(recipient);

    if (!senderExists || !recipientExists) {
      return res.status(400).json({ error: 'Sender or recipient does not exist' });
    }

    const message = new Message({ sender, recipient, content });
    const savedMessage = await message.save();
    const populatedMessage = await savedMessage.populate('sender recipient', 'username email');
    res.status(201).json(populatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMessage = async (req, res) => {
  const updates = req.body;
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });

    if (updates.content !== undefined) message.content = updates.content;
    if (updates.read !== undefined) message.read = updates.read;

    await message.save();
    const populatedMessage = await message.populate('sender recipient', 'username email');
    res.json(populatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    ).populate('sender recipient', 'username email');

    if (!updatedMessage) return res.status(404).json({ error: 'Message not found' });
    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
