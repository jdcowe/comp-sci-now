const express = require("express");
const connectDB = require("./config/database");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Initialize Middleware

app.use(express.json({ extended: false }));

// Define Routes

app.use("/routes/episodes", require("./routes/episodes"));
app.use("/routes/auth", require("./routes/auth"));
app.use("/routes/users", require("./routes/users"));

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Assign Port and Start Server

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
