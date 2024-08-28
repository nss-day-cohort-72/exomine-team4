import { getState } from "./TransientState.js";

export const SpaceCart = async () => {
    const state = getState();

    const facilityMineralsResponse = await fetch("http://localhost:8088/facilityMinerals");
    const mineralsResponse = await fetch("http://localhost:8088/minerals");

    const facilityMinerals = await facilityMineralsResponse.json();
    const minerals = await mineralsResponse.json();

    const selectedFacility = state.selectedFacility;
    const selectedFacilityName = state.selectedFacilityName;
    const selectedMineralId = state.selectedMineral;

    const selectedMineral = minerals.find(mineral => mineral.id === selectedMineralId);

    let cartHTML = "";
    if (selectedMineral) {
        cartHTML += `<p class ="text-center">1 ton of ${selectedMineral.name} from ${selectedFacilityName}</p>`;
    } else {
        cartHTML += ``;
    }

    return cartHTML;
};
