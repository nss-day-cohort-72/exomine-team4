// Imports each module
import { GovernorSelector } from './Governor.js';


// Renders entire HTML and adds it to #container
const mainContainer = document.querySelector("#container");

const renderAllHTML = async () => {
    
const governorOptions = await GovernorSelector();
    const composeHTML = `
    <header class="mb-5 ms-5">
        <h1>Solar System Mining Marketplace</h1>
    </header>

    <div class="row">
        <div class="col-6">
            <section class="w-100 governorsList">
                <div class="d-flex justify-content-start ms-5 ps-3">
                    <p>Choose a governor</p>
                    ${governorOptions}
                </div>
            </section>
            <section class="w-100 facilitiesList">
                <div class="d-flex justify-content-start ms-5 ps-3">
                    <p>Choose a facility</p>
                    <!-- Facility Input goes here -->
                </div>
            </section>
        </div>
        <div class="col-6">
            <section class="d-flex justify-content-center">
                <!-- Colonies output goes here -->
            </section>
        </div>
    </div>
    <div class="row w-100 mx-auto">
        <section class="col-8 mx-auto card">
            <h3 class="mx-auto">Facility Minerals</h3>
            <!-- Facility mineral radio options displayed here -->
        </section>
        <section class="col-3 spaceCart card me-5">
            <h3 class="mx-auto">Space Cart</h3>
            <!-- Selected TransientState goes here -->
            <!-- Purchase Mineral Button goes here -->
        </section>
    </div>
    `;

    mainContainer.innerHTML = composeHTML;
};

document.addEventListener("newPurchaseCreated", renderAllHTML);

renderAllHTML();
