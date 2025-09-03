import { Webhook } from 'svix';
import User from '../models/User.js';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export const clerkWebhooks = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const payload = JSON.stringify(req.body);
  const headers = req.headers;

  // Create a new Webhook instance with your secret.
  const wh = new Webhook(webhookSecret);

  let msg;
  try {
    msg = wh.verify(payload, headers);
  } catch (err) {
    console.error('Error verifying webhook:', err.message);
    return res.status(400).json({ success: false, message: err.message });
  }

  // Handle the event
  const eventType = msg.type;

  try {
    switch (eventType) {
      case 'user.created':
        const { id, email_addresses, first_name, last_name, image_url } = msg.data;
        const newUser = new User({
          _id: id,
          name: `${first_name} ${last_name}`,
          email: email_addresses[0].email_address,
          imageUrl: image_url,
        });
        await newUser.save();
        console.log(`User created in DB: ${id}`);
        break;
      case 'user.updated':
        const { id: updatedId, email_addresses: updatedEmails, first_name: updatedFirst, last_name: updatedLast, image_url: updatedImage } = msg.data;
        await User.findByIdAndUpdate(updatedId, {
          name: `${updatedFirst} ${updatedLast}`,
          email: updatedEmails[0].email_address,
          imageUrl: updatedImage,
        });
        console.log(`User updated in DB: ${updatedId}`);
        break;
      case 'user.deleted':
        const { id: deletedId } = msg.data;
        await User.findByIdAndDelete(deletedId);
        console.log(`User deleted from DB: ${deletedId}`);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return res.status(200).json({ success: true });
  } catch (dbError) {
    console.error('Database operation error:', dbError);
    return res.status(500).json({ success: false, message: 'Database error' });
  }
}
