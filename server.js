import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./DB/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
dotenv.config();

const app = express();

// Connect to the database
ConnectDB()
  .then(() => {
    console.log("Connected to the database");

    // Enable CORS
    app.use(cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }));

    // Parse JSON requests
    app.use(express.json());

    const port = process.env.PORT || 5000;
    
    // Routes
    app.use("/users", userRoutes);
    app.use("/products", productRoutes);
    app.use("/cart", cartRoutes);
    app.use("/orders", orderRoutes);
    app.use("/wishlist", wishlistRoutes);
    app.use("/checkout", checkoutRoutes);

    // Start the server
    app.listen(port, () => console.log("Server started on port 5000"));
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

export default app;