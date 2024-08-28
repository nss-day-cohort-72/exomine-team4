// Imports each module
import { Facilities } from "./Facilities.js";
import { GovernorSelector } from "./Governor.js";
import { Minerals } from "./Minerals.js";
import { SavePurchase } from "./PurchaseButton.js";
import { ColonyInventory } from "./Colonies.js";
import { SpaceCart } from "./SpaceCart.js";

// Main container for rendering the HTML
const mainContainer = document.querySelector("#container");

// Function to render the main HTML structure
const renderAllHTML = async () => {
    const facilityOptions = await Facilities();
    const governorOptions = await GovernorSelector();
    const colonyInventory = await ColonyInventory();

    const composeHTML = `
    <header class="mb-5 ms-5">
        <h1>Solar System Mining Marketplace</h1>
    </header>

    <div class="row mb-5">
        <div class="col-6">
            <section class="w-100 governorsList mb-2">
                <div class="d-flex justify-content-start ms-5 ps-3">
                    <p class="me-5 w-25 my-auto">Choose a governor</p>
                    ${governorOptions}
                </div>
            </section>
            <section class="w-100 facilitiesList">
                <div class="d-flex justify-content-start ms-5 ps-3">
                    <p class="me-5 w-25 my-auto">Choose a facility</p>
                    ${facilityOptions}
                </div>
            </section>
        </div>
        <div class="col-6">
            <section class="d-flex justify-content-center" id="colonyOutput">
                <!-- Colonies output will be inserted here after governor selection -->
            </section>
        </div>
    </div>
    <div class="row w-100 mx-auto">
        <section class="col-8 mx-auto card" id="mineralsSection">
            <div class="minerals mx-auto d-flex justify-content-center">
                <h3 class="mt-3">Facility Minerals</h3>
                <!-- Minerals will be dynamically injected here --></div>
        </section>
        <section class="col-3 spaceCart card me-5">
            <h3 class="mx-auto mt-3">Space Cart</h3>
            <div id="spaceCartContent">
                <!-- Space Cart content will be dynamically injected here -->
            </div>
            ${SavePurchase()}
        </section>
    </div>
    `;

    mainContainer.innerHTML = composeHTML;

    // Initial render of dynamic sections
    renderSpaceCart();
}

// Function to re-render the minerals section only
const renderMineralsSection = async () => {
    const mineralOptions = await Minerals(); // Fetch and render minerals based on selected facility
    const mineralsSection = document.querySelector("#mineralsSection");
    mineralsSection.innerHTML = `
        <div class="minerals mx-auto">
        ${mineralOptions}
    `;
}

const renderSpaceCart = async () => {
    const spaceCart = await SpaceCart();
    document.querySelector("#spaceCartContent").innerHTML = spaceCart;
};

document.addEventListener("stateChanged", () => {
    renderMineralsSection();
    renderSpaceCart();
});

renderAllHTML();
