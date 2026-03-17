const User = require("../models/User");

exports.getAllUsersAdmin = async (req, res) => {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
};



exports.updateUserAdmin = async (req, res) => {
    const { username, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.role = role ?? user.role;

    await user.save();
    res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    });
};



exports.deleteUserAdmin = async (req, res) => {
    // Prevents admin from deleting themselves
    if(req.user.id === req.params.id) {
        return res.status(400).json({ message: "You cannot delete your own account" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
};