

const PORT = process.env.PORT || 8000; // Default to 5000 if undefined

// You'll need to modify your server.ts slightly:
// server.ts - Modified for Vercel
import { app } from "./app";
import { AppDataSource } from "./database/dbConnection";
import dotenv from "dotenv";
dotenv.config();

// ⚠️ Vercel runs as serverless - we don't need to use listen() explicitly
// but we'll keep it for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  AppDataSource.initialize()
    .then(() => {
      console.log("Connected to MongoDB using TypeORM.");
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
    });
} else {
  // For production (Vercel), just initialize the database connection
  AppDataSource.initialize()
    .then(() => {
      console.log("Connected to MongoDB using TypeORM in serverless mode.");
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
    });
}

// Export for serverless environment
export default app;