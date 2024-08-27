import { getState } from "./TransientState.js";

export const Minerals = async () => {
  const { selectedFacility, selectedFacilityName } = getState()

  console.log("Selected Facility ID:", selectedFacility); // Debugging
  console.log("Selected Facility Name:", selectedFacilityName); // Debugging

  const response = await fetch("http://localhost:8088/facilityMinerals")
  const facilityMinerals = await response.json();

  console.log("Facility Minerals Data:", facilityMinerals); // Debugging

  const mineralsForFacility = facilityMinerals.filter(
    (mineral) => mineral.facilityId === Number(selectedFacility)
  );

  console.log("Filtered Minerals for Selected Facility:", mineralsForFacility); // Debugging

  const mineralOptions = mineralsForFacility
    .map((mineral) => {
      return `
        <div class="mx-auto text-center">
            <input type="radio" id="mineral${mineral.mineralId}" name="mineralSelect" value="${mineral.mineralId}" />
            <label for="mineral${mineral.mineralId}">${mineral.quantity} tons of Mineral ID ${mineral.mineralId}</label>
        </div>
        `
    })
    .join("");

  return `
    <h3 class="mx-auto mt-3">Facility Minerals for ${selectedFacilityName}</h3>
    <ul class="mx-auto">${mineralOptions}</ul>
  `
}
