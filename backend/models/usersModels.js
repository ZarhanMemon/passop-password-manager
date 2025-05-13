import mongoose from "mongoose";


const passwordSchema = new mongoose.Schema({
    site: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
}); // Prevent auto-generation of _id for subdocuments if not needed

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastSeen: { type: Date,default: null},

    passwords: [passwordSchema], // Array of password entries
}, {
    timestamps: true // adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);
export default User;
