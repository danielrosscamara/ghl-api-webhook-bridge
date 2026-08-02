const express = require("express");
const router = express.Router();
const mockGhlEngine = require("../services/mockGhlEngine");

/**
 * POST /api/webhooks/ghl
 * Receives outgoing HTTP POST webhooks triggered by GHL Workflows.
 */
router.post("/ghl", (req, res) => {
  const payload = req.body;
  console.log("[GHL WEBHOOK RECEIVED]:", JSON.stringify(payload, null, 2));

  // Record payload in simulator log
  const logEntry = mockGhlEngine.logWebhook(payload);

  res.status(200).json({
    success: true,
    message: "GHL Webhook received successfully",
    logId: logEntry.id
  });
});

/**
 * GET /api/webhooks/logs
 * Fetches recent webhook logs for the React Dashboard UI.
 */
router.get("/logs", (req, res) => {
  res.json({
    success: true,
    logs: mockGhlEngine.getWebhookLogs()
  });
});

module.exports = router;
