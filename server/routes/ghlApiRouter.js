const express = require("express");
const router = express.Router();
const mockGhlEngine = require("../services/mockGhlEngine");

/**
 * GET /api/ghl/contacts
 * Simulates GHL REST API v2 GET /contacts/ endpoint.
 */
router.get("/contacts", (req, res) => {
  const contacts = mockGhlEngine.getContacts();
  res.json({
    success: true,
    contacts,
    count: contacts.length
  });
});

/**
 * POST /api/ghl/contacts
 * Simulates GHL REST API v2 POST /contacts/ endpoint.
 */
router.post("/contacts", (req, res) => {
  const newContact = mockGhlEngine.createContact(req.body);
  res.status(201).json({
    success: true,
    message: "Contact created successfully in GHL",
    contact: newContact
  });
});

/**
 * GET /api/ghl/opportunities
 * Simulates GHL REST API v2 GET /opportunities/ search/pipeline endpoint.
 */
router.get("/opportunities", (req, res) => {
  const opportunities = mockGhlEngine.getOpportunities();
  res.json({
    success: true,
    opportunities,
    count: opportunities.length
  });
});

/**
 * POST /api/ghl/simulate-trigger
 * Triggers a mock webhook event (ContactCreated, OpportunityStageUpdate, FormSubmission)
 * to test live dashboard reactivity.
 */
router.post("/simulate-trigger", (req, res) => {
  const { type } = req.body;
  const logEntry = mockGhlEngine.simulateTrigger(type || "ContactCreated");
  res.json({
    success: true,
    message: `Simulated GHL trigger '${type || "ContactCreated"}' fired!`,
    logEntry
  });
});

module.exports = router;
