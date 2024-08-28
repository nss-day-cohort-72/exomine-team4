import { Facilities } from "./Facilities.js";
import { GovernorSelector } from "./Governor.js";
import { Minerals } from "./Minerals.js";
import { SavePurchase } from "./PurchaseButton.js";
import { ColonyInventory } from "./Colonies.js";
import { SpaceCart } from "./SpaceCart.js";
import { purchaseMineral } from "./TransientState.js";

const mainContainer = document.querySelector("#container");

const renderAllHTML = async () => {
    const governorOptions = await GovernorSelector();
    const facilityOptions = await Facilities();
    const colonyInventory = await ColonyInventory();
    const mineralsOptions = await Minerals();
    const spaceCartContent = await SpaceCart();
    const savePurchaseButton = SavePurchase();

    mainContainer.innerHTML = `
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
                ${colonyInventory}
            </section>
        </div>
    </div>
    <div class="row w-100 mx-auto">
        <section class="col-8 mx-auto card" id="mineralsSection">
            <div class="minerals mx-auto">
                <h3 class="mt-3">Facility Minerals</h3>
                ${mineralsOptions}
            </div>
        </section>
        <section class="col-3 spaceCart card me-5">
            <h3 class="mx-auto mt-3">Space Cart</h3>
            <div id="spaceCartContent">
                ${spaceCartContent}
            </div>
            ${savePurchaseButton}
        </section>
    </div>
    `;

    document.querySelector("#purchaseCart").addEventListener("click", purchaseMineral);
};

const renderSection = async (selector, renderFn) => {
    document.querySelector(selector).innerHTML = await renderFn();
};


document.addEventListener("stateChanged", () => {
    renderSection("#mineralsSection .minerals", Minerals);
    renderSection("#spaceCartContent", SpaceCart);
});

document.addEventListener("newPurchaseCreated", () => {
    renderSection("#colonyOutput", ColonyInventory);
    renderSection("#spaceCartContent", SpaceCart);
});

renderAllHTML();
