import User from "../models/usersModels.js";

// Add a new password
export const addPassword = async (req, res) => {
    const { _id: id, site: newSite, username: newUsername, password: newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);  // Find the user by their ID

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!newSite) {
            return res.status(400).json({ message: "Site is required" });
        }

        if (!newUsername) {
            return res.status(400).json({ message: "Username is required" });
        }

        if (!newPassword) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Check if the site already exists in the user's passwords array
        const siteExists = user.passwords.some(password => password.site === newSite);

        if (siteExists) {
            return res.status(400).json({ message: "Site already exists" });
        }

        // If no existing site, you can proceed to add the new password
        user.passwords.push({
            _id: id,
            site: newSite,
            username: newUsername,
            password: newPassword
        });

        await user.save(); // Save the updated user document
        return res.status(200).json({ message: "Password added successfully" });

    } catch (error) {
        console.error("Error adding password:", error);
        return res.status(500).json({ message: "Failed to add password" });
    }
};


// Get all passwords
export const getPasswords = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.passwords);
    } catch (error) {
        console.error("Error fetching passwords:", error);
        res.status(500).json({ message: "Failed to fetch passwords" });
    }
};

// Delete a password by index
export const deletePassword = async (req, res) => {
    const { id: passwordId } = req.params;

    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });


        user.passwords = user.passwords.filter(pw => pw._id.toString() !== passwordId);  // Remove the password at that index
        await user.save();

        res.status(200).json({ deleted_passwords: user.passwords });
    } catch (error) {
        console.error("Error deleting password:", error);
        res.status(500).json({ message: "Failed to delete password" });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { site, username, password } = req.body;
        const { id: passwordId } = req.params;

        // Find the user
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if (!site && !username && !password) {
            return res.status(400).json({ message: "No fields to update provided." });
        }


        // Find the password entry by _id
        const passwordIndex = user.passwords.findIndex(
            pw => pw._id.toString() === passwordId
        );

        // If not found, return error
        if (passwordIndex === -1) {
            return res.status(404).json({ message: "Password entry not found" });
        }

        // Update only the fields that were provided
        if (site) user.passwords[passwordIndex].site = site;
        if (username) user.passwords[passwordIndex].username = username;
        if (password) user.passwords[passwordIndex].password = password;

        // Save the updated user
        await user.save();

        res.status(200).json({
            updatedPassword: user.passwords[passwordIndex],
        });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
