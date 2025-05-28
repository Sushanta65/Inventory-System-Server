const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Mock database (replace with actual database logic)
const db = {
  insertOne: async (user) => ({ insertedId: "123abc", ...user }),
  find: () => ({
    toArray: async () => [{ name: "John Doe" }, { name: "Jane Doe" }],
  }),
  findOne: async (query) => ({ _id: query._id, name: "John Doe" }),
};

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Your App is Running Properly.");
});

// Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const user = req.body;
    const result = await db.insertOne(user);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await db.find().toArray();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Error fetching users", error });
  }
});

// Get a user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.findOne({ _id: id });
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Error fetching user", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
