import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRoutes from './educatorroutes.js'

// Initialize Express
const app = express();

// Connect to Database
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API WORKING"));
app.post('/clerk', express.json(), clerkWebhooks);

// Educator routes
app.use('/api/educator', educatorRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
