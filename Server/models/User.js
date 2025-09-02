import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true }, // Keep String if using Clerk user IDs
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true }, // Add unique constraint
        imageUrl: { type: String, required: false }, // Make optional with default
        enrolledCourses: [
            {
                type: String, // Changed to String to match your _id type
                ref: 'Course'
            }
        ],
    }, 
    { 
        timestamps: true,
        _id: false // Disable automatic ObjectId generation since using custom String _id
    }
);

const User = mongoose.model('User', userSchema);

export default User;
