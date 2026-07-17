const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Use Render's port

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "Public"))); // ✅ serve static files

// Admin username restriction
const ADMIN_USERNAME = "VaTapfunyi"; 

let messages = [];

// Starter trend list
let trends = [
  "Bhutsu yaGake Kwangova kupedza polish"
];

// ✅ Root route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Get all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Get all trends
app.get("/trends", (req, res) => {
  res.json(trends);
});

// Post messages or process admin commands
app.post("/messages", (req, res) => {
  const { text, user } = req.body;

  if (!text || !user || user.trim() === "" || user === "undefined" || user === "null") {
    return res.status(400).json({ error: "Valid username and message text are required." });
  }

  const trimmedUser = user.trim();

  // ADD TREND COMMAND
  if (text.startsWith("/trend ")) {
    if (trimmedUser === ADMIN_USERNAME) {
      const newTrend = text.replace("/trend ", "").trim();
      if (newTrend) {
        trends.unshift(newTrend);
        if (trends.length > 10) trends.pop();
        return res.json({ system: true, text: "Trend updated successfully!" });
      }
    } else {
      return rejectUnauthorized(trimmedUser, res);
    }
  }

  // REMOVE TREND COMMAND
  if (text.startsWith("/untrend ")) {
    if (trimmedUser === ADMIN_USERNAME) {
      const trendToRemove = text.replace("/untrend ", "").trim();
      const initialLength = trends.length;
      trends = trends.filter(t => t.toLowerCase() !== trendToRemove.toLowerCase());
      if (trends.length < initialLength) {
        return res.json({ system: true, text: "Trend removed successfully!" });
      } else {
        return res.json({ system: true, text: "Trend not found." });
      }
    } else {
      return rejectUnauthorized(trimmedUser, res);
    }
  }

  // Regular messages
  const time = new Date().toLocaleTimeString();
  const msg = { 
    id: Date.now().toString() + Math.random().toString(36).substr(2, 5), 
    user: trimmedUser, 
    text, 
    time,
    likedBy: [] 
  };
  
  messages.push(msg);
  res.json(msg);
});

function rejectUnauthorized(username, res) {
  const time = new Date().toLocaleTimeString();
  const warningMsg = { 
    id: Date.now().toString(), 
    user: "System", 
    text: `Unauthorized attempt by ${username} to change trends.`, 
    time,
    likedBy: [] 
  };
  messages.push(warningMsg);
  return res.json(warningMsg);
}

// Like route
app.post("/messages/:id/like", (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const message = messages.find(m => m.id === id);
  
  if (!message) {
    return res.status(404).json({ error: "Message not found" });
  }
  if (!user) {
    return res.status(400).json({ error: "User profile required" });
  }

  if (message.likedBy.includes(user)) {
    return res.status(400).json({ error: "Already liked" });
  }

  message.likedBy.push(user);
  res.json(message);
});

app.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});
