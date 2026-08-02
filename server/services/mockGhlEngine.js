/**
 * Mock GHL Simulator Engine
 * Simulates GoHighLevel REST API v2 endpoints and Webhook payload events in memory.
 */

const sampleContacts = [
  {
    id: "ghl_cnt_101",
    locationId: "loc_demo_888",
    firstName: "Sarah",
    lastName: "Connor",
    email: "sarah@cyberdyne.io",
    phone: "+15550192834",
    tags: ["lead", "web-funnel", "vip"],
    dateAdded: new Date(Date.now() - 86400000 * 2).toISOString(),
    customFields: {
      budget: "$5,000 - $10,000",
      industry: "Technology"
    }
  },
  {
    id: "ghl_cnt_102",
    locationId: "loc_demo_888",
    firstName: "Marcus",
    lastName: "Vance",
    email: "marcus@vancemedia.com",
    phone: "+15550199988",
    tags: ["booked-call"],
    dateAdded: new Date(Date.now() - 86400000).toISOString(),
    customFields: {
      budget: "$10,000+",
      industry: "Real Estate"
    }
  }
];

const sampleOpportunities = [
  {
    id: "ghl_opp_501",
    name: "Sarah Connor - Custom Automation",
    pipelineId: "pipe_sales_01",
    pipelineStageId: "stage_discovery",
    stageName: "Discovery Call Requested",
    monetaryValue: 5000,
    contactId: "ghl_cnt_101",
    status: "open"
  },
  {
    id: "ghl_opp_502",
    name: "Marcus Vance - Enterprise GHL Setup",
    pipelineId: "pipe_sales_01",
    pipelineStageId: "stage_proposal",
    stageName: "Proposal Sent",
    monetaryValue: 12500,
    contactId: "ghl_cnt_102",
    status: "open"
  }
];

const webhookLogs = [];

class MockGhlEngine {
  getContacts() {
    return sampleContacts;
  }

  createContact(data) {
    const newContact = {
      id: `ghl_cnt_${Date.now()}`,
      locationId: data.locationId || "loc_demo_888",
      firstName: data.firstName || "New",
      lastName: data.lastName || "Lead",
      email: data.email || "",
      phone: data.phone || "",
      tags: data.tags || ["new-lead"],
      dateAdded: new Date().toISOString(),
      customFields: data.customFields || {}
    };
    sampleContacts.unshift(newContact);
    return newContact;
  }

  getOpportunities() {
    return sampleOpportunities;
  }

  logWebhook(payload) {
    const logEntry = {
      id: `wh_log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      event: payload.type || payload.event || "Custom Webhook Trigger",
      payload
    };
    webhookLogs.unshift(logEntry);
    if (webhookLogs.length > 50) webhookLogs.pop(); // Keep last 50 logs
    return logEntry;
  }

  getWebhookLogs() {
    return webhookLogs;
  }

  simulateTrigger(type) {
    let payload = {};
    if (type === "ContactCreated") {
      const contact = this.createContact({
        firstName: "TestLead",
        lastName: `Simulated_${Math.floor(Math.random() * 1000)}`,
        email: `simulated_${Date.now()}@example.com`,
        phone: "+15550001122",
        tags: ["webhook-trigger", "simulated"]
      });
      payload = {
        type: "ContactCreated",
        locationId: "loc_demo_888",
        contact
      };
    } else if (type === "OpportunityStageUpdate") {
      payload = {
        type: "OpportunityStageUpdate",
        locationId: "loc_demo_888",
        opportunityId: "ghl_opp_501",
        oldStage: "Discovery Call Requested",
        newStage: "Proposal Sent",
        updatedAt: new Date().toISOString()
      };
    } else {
      payload = {
        type: "FormSubmission",
        locationId: "loc_demo_888",
        formId: "form_optin_999",
        fields: {
          full_name: "Alex Rivera",
          email: "alex@agencygrowth.com",
          message: "Interested in GHL custom API integration"
        }
      };
    }

    return this.logWebhook(payload);
  }
}

module.exports = new MockGhlEngine();
