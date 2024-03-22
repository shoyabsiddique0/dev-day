const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const EXPIRY_DURATION = 24 * 60 * 60 * 1000;

const urlMap = new Map();

app.use(express.json());

app.post("/api/shorten", (req, res) => {
  const { url, code: customCode } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const existingCode = [...urlMap].find(([_, data]) => data.url === url)?.[0];
  if (existingCode) {
    return res.json({ code: existingCode });
  }

  let code;
  if (customCode) {
    if (urlMap.has(customCode)) {
      return res.status(400).json({ error: "Custom code already in use" });
    }
    code = customCode;
  } else {
    code = generateShortCode();
  }

  const expiryTime = new Date(Date.now() + EXPIRY_DURATION);
  urlMap.set(code, { url, expiryTime });

  res.json({ code });
});

app.get("/:code", (req, res) => {
  const { code } = req.params;
  const data = urlMap.get(code);

  if (!data) {
    return res.status(404).json({ error: "URL not found" });
  }

  if (data.expiryTime < new Date()) {
    urlMap.delete(code);
    return res.status(404).json({ error: "URL has expired" });
  }

  res.redirect(data.url);
});

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

function generateShortCode() {
  return crypto.randomBytes(3).toString("hex");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
