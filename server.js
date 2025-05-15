import express from 'express';
import next from 'next';
import cors from 'cors'; // ✅ Import CORS
import connectDB from './src/server/db/connect.js';
import enquiryRoutes from './src/server/routes/enquiryRoutes.js';
import testimonialRoutes from './src/server/routes/testimonialRoutes.js';
import eventRoutes from './src/server/routes/eventRoutes.js';
import newsletterRoutes from './src/server/routes/newsletterRoutes.js';
import path from 'path'; // ✅ Import path for static file serving
import { fileURLToPath } from 'url'; // ✅ Import for converting module URL to path

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Get current directory path using import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
        process.exit(1); // Exit the process if DB connection fails
      });

    // Use the custom routes defined in 'enquiryRoutes.js'
    server.use('/api', enquiryRoutes);
    server.use('/api', testimonialRoutes);
    server.use('/api', eventRoutes); // All event-related routes
    server.use('/api', newsletterRoutes);

    // Serve images statically
    server.use('/images', express.static(path.join(__dirname, 'public/images')));

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
    process.exit(1); // Exit the process on failure
  });
