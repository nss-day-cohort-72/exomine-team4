import { getState } from "./TransientState.js";

// The SpaceCart function generates the HTML for the selected mineral in the cart
export const SpaceCart = async () => {
    // Get the current state from the transient state
    const state = getState();

    // Fetch facility minerals and minerals data from the JSON server
    const [facilityMineralsResponse, mineralsResponse] = await Promise.all([
        fetch("http://localhost:8088/facilityMinerals"),
        fetch("http://localhost:8088/minerals")
    ]);
    const facilityMinerals = await facilityMineralsResponse.json();
    const minerals = await mineralsResponse.json();

    // Get the selected facility, facility name, and selected mineral ID from the state
    const { selectedFacility, selectedFacilityName, selectedMineral } = state;

    // Find the selected mineral in the minerals array
    const selectedMineralData = minerals.find(mineral => mineral.id === selectedMineral);

    // Initialize the HTML string for the cart
    let cartHTML = "";

    // If a mineral is selected, generate the cart item description
    if (selectedMineralData) {
        cartHTML += `<p class="text-center">1 ton of ${selectedMineralData.name} from ${selectedFacilityName}</p>`;
    } else {
        cartHTML += ``; // No mineral selected, no cart item to display
    }

    // Return the generated HTML string
    return cartHTML;
};
