import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage clerk user with database
export const clerkWebhooks = async (req, res) => {
    try {
        // Validate environment variable
        if (!process.env.CLERK_WEBHOOK_SECRET) {
            return res.status(500).json({ success: false, message: 'CLERK_WEBHOOK_SECRET is not defined' });
        }

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        
        // Get the raw body (you need to configure Express to capture raw body)
        const payload = req.rawBody || req.body;
        
        // Verify webhook (synchronous - no await needed)
        whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        // Parse the data if payload is raw
        const { data, type } = typeof payload === 'string' ? JSON.parse(payload) : req.body;

        switch (type) {
            case 'user.created': {
                // Add null checks for safety
                if (!data.id || !data.email_addresses || data.email_addresses.length === 0) {
                    return res.status(400).json({ success: false, message: 'Invalid user data' });
                }

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Unknown User',
                    imageUrl: data.image_url || '',
                };

                await User.create(userData);
                res.status(200).json({ success: true });
                break;
            }

            case 'user.updated': {
                if (!data.id || !data.email_addresses || data.email_addresses.length === 0) {
                    return res.status(400).json({ success: false, message: 'Invalid user data' });
                }

                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Unknown User',
                    imageUrl: data.image_url || '',
                };

                await User.findByIdAndUpdate(data.id, userData);
                res.status(200).json({ success: true });
                break;
            }

            case 'user.deleted': {
                if (!data.id) {
                    return res.status(400).json({ success: false, message: 'Invalid user ID' });
                }

                await User.findByIdAndDelete(data.id);
                res.status(200).json({ success: true });
                break;
            }

            default:
                res.status(200).json({ success: true, message: 'Webhook received but not processed' });
                break;
        }

    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
