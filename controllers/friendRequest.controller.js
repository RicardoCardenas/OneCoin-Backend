const FriendRequest = require("../models/friendRequest.model");

exports.sendRequest = async (req, res) => {
  const { userIdReceiver } = req.body;
  const userIdEmissor = req.user.id;

  if (userIdReceiver === userIdEmissor)
    return res.status(400).json({ error: "You cannot send a request to yourself" });

  try {
    const exists = await FriendRequest.findOne({ userIdEmissor, userIdReceiver });
    if (exists) return res.status(400).json({ error: "Request already sent" });

    const request = await FriendRequest.create({ userIdEmissor, userIdReceiver });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSentRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({ userIdEmissor: req.params.userId })
      .populate("userIdReceiver", "username");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({ userIdReceiver: req.params.userId })
      .populate("userIdEmissor", "username");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const request = await FriendRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });

    request.accepted = req.body.accepted;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
