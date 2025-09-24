document.addEventListener("DOMContentLoaded", () => {
  // Select all the interactive HTML elements
  const form = document.getElementById("calculator-form");
  const ovenSizeSelect = document.getElementById("oven-size");
  const temperatureSlider = document.getElementById("temperature");
  const tempDisplay = document.getElementById("temp-display");
  const cookingMethodSelect = document.getElementById("cooking-method");

  const topCoalsDisplay = document.getElementById("top-coals");
  const bottomCoalsDisplay = document.getElementById("bottom-coals");
  const totalCoalsDisplay = document.getElementById("total-coals");

  function calculateAndDisplay() {
    // 1. Get current values from the form
    const ovenSize = parseInt(ovenSizeSelect.value);
    const temperature = parseInt(temperatureSlider.value);
    const cookingMethod = cookingMethodSelect.value;

    // 2. Calculate the total number of briquettes needed
    // This is based on a common rule of thumb:
    // - Start with a baseline for 350°F (oven size * 2).
    // - Adjust by ~2 briquettes for every 25°F change (or ~12.5°F per briquette).
    const baselineCoals = ovenSize * 2;
    const tempDifference = temperature - 350;
    const adjustmentCoals = Math.round(tempDifference / 12.5);

    let totalCoals = baselineCoals + adjustmentCoals;

    // Ensure total is a positive, even number for easier splitting.
    totalCoals = Math.max(4, totalCoals); // Use a minimum of 4 coals
    if (totalCoals % 2 !== 0) {
      totalCoals++;
    }

    // 3. Distribute the briquettes based on the cooking method
    let topCoals = 0;
    let bottomCoals = 0;

    if (cookingMethod === "bake") {
      // For Baking/Roasting, put more heat on top (~2/3) to prevent burning the bottom.
      topCoals = Math.round(totalCoals * (2 / 3));
      bottomCoals = totalCoals - topCoals;
    } else if (cookingMethod === "stew") {
      // For Simmering/Stewing, put more heat on the bottom (~2/3).
      bottomCoals = Math.round(totalCoals * (2 / 3));
      topCoals = totalCoals - bottomCoals;
    }

    // 4. Update the results on the page
    topCoalsDisplay.textContent = topCoals;
    bottomCoalsDisplay.textContent = bottomCoals;
    totalCoalsDisplay.textContent = totalCoals;
  }

  // --- Event Listeners to make the calculator interactive ---

  // Update the temperature text and recalculate as the slider moves
  temperatureSlider.addEventListener("input", () => {
    tempDisplay.textContent = `${temperatureSlider.value}°F`;
    calculateAndDisplay();
  });

  // Recalculate when the oven size or cooking method is changed
  ovenSizeSelect.addEventListener("change", calculateAndDisplay);
  cookingMethodSelect.addEventListener("change", calculateAndDisplay);

  // Also handle form submission (e.g., if user presses Enter)
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the page from reloading
    calculateAndDisplay();
  });

  // Run the calculation once on page load to show initial results
  calculateAndDisplay();
});
