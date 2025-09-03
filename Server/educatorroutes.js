// C:\front_back_end proj_lms\edulearn_pro\Server\routes\educatorroutes.js
import { Router } from 'express';
import { requireAuth } from '@clerk/express'; // Clerk Express middleware
import mongoose from 'mongoose';

const router = Router();

// This middleware would protect routes, ensuring the user is logged in via Clerk
// and their Clerk user ID is available in req.auth.userId
router.use(requireAuth());

// Educator model (using User model for now, can create separate Educator model later)
const educatorSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  bio: { type: String },
  subjects: [{ type: String }],
  experience: { type: String },
  qualifications: [{ type: String }],
  rating: { type: Number, default: 0 },
  totalStudents: { type: Number, default: 0 },
  totalCourses: { type: Number, default: 0 }
}, { timestamps: true });

const Educator = mongoose.model('Educator', educatorSchema);

// Example: Get educator profile data
router.get('/profile', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId; // Get Clerk user ID from auth middleware

    if (!clerkUserId) {
      return res.status(401).json({ message: 'Unauthorized: No Clerk user ID' });
    }

    const educator = await Educator.findOne({ clerkUserId: clerkUserId });

    if (!educator) {
      return res.status(404).json({ message: 'Educator profile not found' });
    }

    res.status(200).json(educator);
  } catch (error) {
    console.error('Error fetching educator profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Example: Create/Update educator profile (e.g., after initial signup or when updating details)
router.post('/profile', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId; // Get Clerk user ID from auth middleware
    const { bio, subjects, experience, qualifications, ...otherProfileData } = req.body; // Data from frontend

    if (!clerkUserId) {
      return res.status(401).json({ message: 'Unauthorized: No Clerk user ID' });
    }

    const updateData = {
      clerkUserId: clerkUserId,
      bio: bio,
      subjects: subjects,
      experience: experience,
      qualifications: qualifications,
      ...otherProfileData,
    };

    const educator = await Educator.findOneAndUpdate(
      { clerkUserId: clerkUserId },
      updateData,
      { 
        new: true, // Return the updated document
        upsert: true, // Create if doesn't exist
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json({ message: 'Educator profile saved successfully', educator });
  } catch (error) {
    console.error('Error saving educator profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;