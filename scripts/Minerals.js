import { getState } from "./TransientState.js"

export const Minerals = async () => {
  const { selectedFacility, selectedFacilityName } = getState();

  const facilityMineralsResponse = await fetch("http://localhost:8088/facilityMinerals");
  const mineralsResponse = await fetch("http://localhost:8088/minerals");

  const facilityMinerals = await facilityMineralsResponse.json();
  const minerals = await mineralsResponse.json();

  const mineralMap = {};

  minerals.forEach(mineral => {
    mineralMap[mineral.id] = mineral.name;
  })
  const mineralsForFacility = facilityMinerals.filter(
    mineral => mineral.facilityId === selectedFacility
  );

  const mineralOptions = mineralsForFacility.map(mineral => {
    const mineralName = mineralMap[mineral.mineralId];
    return `
      <div class="mx-auto text-center">
          <input type="radio" id="mineral${mineral.mineralId}" name="mineralSelect" value="${mineral.mineralId}" />
          <label for="mineral${mineral.mineralId}">${mineral.quantity} tons of ${mineralName}</label>
      </div>
    `;
  }).join("");

 
  const headerText = selectedFacilityName ? `Facility Minerals for ${selectedFacilityName}` : "Facility Minerals";

  return `
    <h3 class="mx-auto mt-3">${headerText}</h3>
    ${mineralOptions}
  `;
}
