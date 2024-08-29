import { getState, setMineralChoice } from "./TransientState.js";

// Fetches minerals for the selected facility and displays them as radio buttons
export const Minerals = async () => {
    // Get the selected facility from the transient state
    const { selectedFacility, selectedFacilityName } = getState();

    // Fetch facility minerals and minerals data from the JSON server
    const [facilityMineralsResponse, mineralsResponse] = await Promise.all([
        fetch("http://localhost:8088/facilityMinerals"),
        fetch("http://localhost:8088/minerals")
    ]);
    const facilityMinerals = await facilityMineralsResponse.json();
    const minerals = await mineralsResponse.json();

    // Filter minerals by the selected facility and map mineral names by ID
    const mineralsForFacility = facilityMinerals.filter(mineral => mineral.facilityId === selectedFacility);
    const mineralMap = minerals.reduce((map, mineral) => {
        map[mineral.id] = mineral.name;
        return map;
    }, {});

    // Create radio button options for each mineral
    const mineralOptions = mineralsForFacility.map(mineral => {
        return `
            <div class="mx-auto text-center">
                <input type="radio" id="mineral${mineral.mineralId}" name="mineralSelect" value="${mineral.mineralId}" />
                <label for="mineral${mineral.mineralId}">${mineral.quantity} tons of ${mineralMap[mineral.mineralId]}</label>
            </div>
        `;
    }).join("");

    // Header text based on the selected facility's name
    const headerText = selectedFacilityName ? `Facility Minerals for ${selectedFacilityName}` : "Facility Minerals";

    // Updates the transient state when a mineral is selected
    document.addEventListener("change", (event) => {
        if (event.target.name === "mineralSelect") {
            setMineralChoice(parseInt(event.target.value));
        }
    });

    // Returns the header and mineral options to be rendered
    return `
        <h3 class="mx-auto mt-3">${headerText}</h3>
        ${mineralOptions}
    `;
};
