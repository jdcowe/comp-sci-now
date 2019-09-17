const express = require("express");
const connectDB = require("./config/database");

const app = express();

// Connect Database
connectDB();

// Initialize Middleware

app.use(express.json({ extended: false }));

// Define Routes

app.use("/routes/episodes", require("./routes/episodes"));
//app.use("/routes/auth", require("./routes/auth"));
app.use("/routes/users", require("./routes/users"));

// Assign Port and Start Server

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
