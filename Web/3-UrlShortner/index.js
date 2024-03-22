const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const EXPIRY_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// In-memory storage for long URLs and their short codes
const urlMap = new Map();

// Middleware for parsing request body
app.use(express.json());

// Endpoint for shortening a URL
app.post("/api/shorten", (req, res) => {
  const { url, code: customCode } = req.body;

  // Validate the provided URL
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  // Check if the URL already exists in the map
  const existingCode = [...urlMap].find(([_, data]) => data.url === url)?.[0];
  if (existingCode) {
    return res.json({ code: existingCode });
  }

  let code;
  if (customCode) {
    // Check if the custom code is available
    if (urlMap.has(customCode)) {
      return res.status(400).json({ error: "Custom code already in use" });
    }
    code = customCode;
  } else {
    // Generate a new short code
    code = generateShortCode();
  }

  // Store the long URL and short code with expiration time
  const expiryTime = new Date(Date.now() + EXPIRY_DURATION);
  urlMap.set(code, { url, expiryTime });

  res.json({ code });
});

// Endpoint for redirecting to the original long URL
app.get("/:code", (req, res) => {
  const { code } = req.params;
  const data = urlMap.get(code);

  if (!data) {
    return res.status(404).json({ error: "URL not found" });
  }

  // Check if the short URL has expired
  if (data.expiryTime < new Date()) {
    urlMap.delete(code);
    return res.status(404).json({ error: "URL has expired" });
  }

  res.redirect(data.url);
});

// Helper function to validate a URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

// Helper function to generate a short code
function generateShortCode() {
  return crypto.randomBytes(3).toString("hex");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
