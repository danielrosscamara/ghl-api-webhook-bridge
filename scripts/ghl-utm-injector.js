/**
 * GoHighLevel UTM & Query Parameter Auto-Injector
 * -------------------------------------------------------------------
 * INSTRUCTIONS FOR GHL FUNNEL BUILDER:
 * Paste this script in GHL Funnel -> Page Settings -> Tracking Code -> Header.
 *
 * HOW IT WORKS:
 * 1. Reads URL search query parameters (utm_source, utm_medium, utm_campaign, gclid, etc.).
 * 2. Scans the DOM for GHL Form inputs or hidden custom fields.
 * 3. Populates field values and fires change/input events so GHL captures attribution.
 */

(function () {
  "use strict";

  // List of standard marketing attribution query parameters to capture
  const TARGET_PARAMS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "affiliate_id"
  ];

  function injectUtmParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.toString()) return;

    console.log("[GHL UTM Injector]: Processing URL query parameters...");

    TARGET_PARAMS.forEach(function (param) {
      const paramValue = urlParams.get(param);
      if (!paramValue) return;

      // Find matching inputs in GHL forms by name, id, or data attribute
      const selectors = [
        `input[name="${param}"]`,
        `input[id="${param}"]`,
        `input[data-custom-field="${param}"]`,
        `input[placeholder*="${param}" i]`
      ];

      const inputElement = document.querySelector(selectors.join(", "));
      if (inputElement) {
        inputElement.value = paramValue;

        // Dispatch synthetic events so React/Vue/Angular state binding in GHL forms picks up the new value
        inputElement.dispatchEvent(new Event("input", { bubbles: true }));
        inputElement.dispatchEvent(new Event("change", { bubbles: true }));
        console.log(`[GHL UTM Injector]: Injected '${param}' = '${paramValue}'`);
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectUtmParameters);
  } else {
    injectUtmParameters();
  }
})();
