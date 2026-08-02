const express = require("express");
const cors = require("cors");
require("dotenv").config();

const webhookRouter = require("./routes/webhookRouter");
const ghlApiRouter = require("./routes/ghlApiRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/webhooks", webhookRouter);
app.use("/api/ghl", ghlApiRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "GoHighLevel Practice Middleware & Mock Simulator",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 GHL Middleware Server running on http://localhost:${PORT}`);
  console.log(`   - Webhook Receiver: POST http://localhost:${PORT}/api/webhooks/ghl`);
  console.log(`   - Contacts API: GET/POST http://localhost:${PORT}/api/ghl/contacts`);
  console.log(`   - Opportunities API: GET http://localhost:${PORT}/api/ghl/opportunities\n`);
});
