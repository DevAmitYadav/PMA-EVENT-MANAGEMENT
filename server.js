import express from 'express';
import next from 'next';
import cors from 'cors'; // ✅ Import CORS
import connectDB from './src/server/db/connect.js';
import enquiryRoutes from './src/server/routes/enquiryRoutes.js';
import testimonialRoutes from './src/server/routes/testimonialRoutes.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // ✅ Enable CORS before any routes
    server.use(cors({
      origin: 'http://localhost:3000',
      credentials: true // optional, only if using cookies/auth headers
    }));

    // Logging middleware for every request
    server.use((req, res, next) => {
      console.log(`Request Path: ${req.path}`);
      next();
    });

    // Middleware to parse JSON bodies
    server.use(express.json());

    // Connect to MongoDB before handling any API request
    connectDB()
      .then(() => {
        console.log('MongoDB connected successfully!');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
      });

    // Use the custom routes defined in 'enquiryRoutes.js'
    server.use('/api', enquiryRoutes);

    server.use('/api', testimonialRoutes);

    // Fallback: Let Next.js handle all remaining routes
    server.all(/.*/, (req, res) => {
      return handle(req, res);
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during app preparation:', err);
    process.exit(1);
  });
