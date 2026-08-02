/**
 * GoHighLevel Interactive Funnel Calculator & Custom Field Populator
 * -------------------------------------------------------------------
 * INSTRUCTIONS FOR GHL FUNNEL BUILDER:
 * 1. Add interactive inputs (sliders, radios, quantity inputs) to your funnel section.
 * 2. Add hidden GHL Custom Fields (`#custom_field_estimated_total`, `#custom_field_tier`).
 * 3. Paste this script in GHL Funnel -> Page Settings -> Tracking Code -> Footer.
 *
 * HOW IT WORKS:
 * Listens to dynamic user inputs in real-time, calculates total pricing, updates UI badges,
 * and writes the result into GHL hidden fields before the user submits the form.
 */

(function () {
  "use strict";

  // Tier pricing configuration
  const PRICING = {
    starter: 499,
    pro: 1299,
    enterprise: 2999,
    perSubAccount: 99
  };

  function initCalculator() {
    const tierSelect = document.querySelector("#calc_tier_select");
    const subAccountsInput = document.querySelector("#calc_subaccounts_input");
    const displayTotal = document.querySelector("#calc_display_total");

    // Hidden GHL Custom Fields (matched by GHL form field IDs)
    const hiddenTotalField = document.querySelector('input[name="estimated_budget"], #estimated_budget');
    const hiddenTierField = document.querySelector('input[name="selected_tier"], #selected_tier');

    if (!tierSelect && !subAccountsInput) {
      // Create fallback demo elements if page doesn't have custom HTML inputs
      console.log("[GHL Calculator]: Initialized in standby mode (listening for form elements)");
      return;
    }

    function calculateTotal() {
      const selectedTier = tierSelect ? tierSelect.value : "pro";
      const subAccountCount = subAccountsInput ? parseInt(subAccountsInput.value, 10) || 0 : 1;

      const basePrice = PRICING[selectedTier] || PRICING.pro;
      const addOnPrice = subAccountCount * PRICING.perSubAccount;
      const totalAmount = basePrice + addOnPrice;

      // Update visible DOM badge
      if (displayTotal) {
        displayTotal.innerText = `$${totalAmount.toLocaleString()}`;
      }

      // Populate hidden GHL Form fields
      if (hiddenTotalField) {
        hiddenTotalField.value = `$${totalAmount}`;
        hiddenTotalField.dispatchEvent(new Event("input", { bubbles: true }));
      }
      if (hiddenTierField) {
        hiddenTierField.value = selectedTier.toUpperCase();
        hiddenTierField.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    // Attach real-time event listeners
    if (tierSelect) tierSelect.addEventListener("change", calculateTotal);
    if (subAccountsInput) subAccountsInput.addEventListener("input", calculateTotal);

    // Initial calculation run
    calculateTotal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCalculator);
  } else {
    initCalculator();
  }
})();
