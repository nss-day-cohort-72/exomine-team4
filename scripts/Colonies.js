import { getState } from "./TransientState.js"

export const ColonyInventory = async () => {
    try {
        console.log("Starting ColonyInventory function");

        const colonies = await getColoniesByGovernor();
        console.log("Fetched Colonies by Governor:", colonies);

        const state = getState();
        console.log("Current State:", state);

        const colonyMineralPromises = colonies.map(async (colony) => {
            console.log("what is the colon value inside the map of colonyMineralPromise", colony);
            console.log(`Fetching minerals for Colony ID: ${colony.id} - ${colony.name}`);
            const minerals = await getColonyMinerals(colony.id);
            console.log(`Fetched Minerals for Colony ID: ${colony.id}`, minerals);

            return `
            <ul>  Minerals of ${colony.name} 
            ${minerals.map(mineral => `

          <li> ${mineral.quantity} tons of ${mineral.mineral.name}</li>
            `).join("")}
            </ul>`;
        });

        // Wait for all colony HTML strings to be resolved
        const colonyMineralHTML = await Promise.all(colonyMineralPromises);
        console.log("Colony Mineral HTML:", colonyMineralHTML);

        // Return the joined HTML
        return colonyMineralHTML.join("");

    } catch (error) {
        console.error("Error in ColonyInventory:", error);
        return `<p>Error loading colonies and minerals</p>`;
    }
};




export const getColoniesByGovernor = async () => {

    // Get the current state and parse the selected governor ID
    const state = getState();
    const governorID = parseInt(state.selectedGovernor);

 // Fetch all governors
 const governorResponse = await fetch("http://localhost:8088/governors");
 const governorsData = await governorResponse.json();

 console.log("Fetched governors data:", governorsData);
 
 // Find the governor with the matching ID
 const selectedGovernor = governorsData.find(governor => parseInt(governor.id) === parseInt(governorID));

 // If the selected governor is found, get the associated colony ID
 if (selectedGovernor) {
     const colonyID = selectedGovernor.colonyId;

     // Fetch all colonies
     const coloniesResponse = await fetch("http://localhost:8088/colonies");
     const coloniesData = await coloniesResponse.json();

     console.log("Fetched colonies data:", coloniesData);

     // Find the colony with the matching ID
     const filteredColony = coloniesData.find(colony => parseInt(colony.id) === colonyID);

     // Return the colony data wrapped in an array (so it can be mapped)
     return filteredColony ? [filteredColony] : [];
 } else {
     // If no matching governor is found, return an empty array
     return [];
 }
};

export const getColonies = async () => {
    const response = await fetch("http://localhost:8088/colonies")  // Adjust the path to your database.json file
    const data = await response.json();
    return data;
};

export const getColonyMinerals = async (colonyId) => {

    console.log("Fetching colony minerals for Colony ID:", colonyId);

    // Fetch colonyMinerals data
    const colonyMineralsResponse = await fetch("http://localhost:8088/colonyMinerals");
    const colonyMineralsData = await colonyMineralsResponse.json();
    console.log("Fetched colonyMinerals data:", colonyMineralsData);

    // Fetch minerals data
    const mineralsResponse = await fetch("http://localhost:8088/minerals");
    const mineralsData = await mineralsResponse.json();
    console.log("Fetched minerals data:", mineralsData);

    const filteredMaterials = colonyMineralsData
    .filter(colonyMineral => {
        console.log("what is the colonyId which is the parameter for this within our filter", colonyId);
        const isMatchingColony = parseInt(colonyMineral.colonyId) === parseInt(colonyId);
        console.log("is matchingColony and also the colonyMineral", isMatchingColony, colonyMineral);
        console.log(`ColonyMineral: ${colonyMineral.colonyId}, Matching Colony: ${isMatchingColony}`);
    
        return isMatchingColony;  // This line returns true or false
    })

    .map(colonyMineral => {
        console.log("Matching colonyMineral.mineralId:", colonyMineral.mineralId);
    
        let mineral = mineralsData.find(mineral => {
            console.log("Checking mineral id:", mineral.id);
            return parseInt(mineral.id) === parseInt(colonyMineral.mineralId);
        });
    
        if (!mineral) {
            console.error(`Mineral with id ${colonyMineral.mineralId} not found`);
            return null;
        }
    
        let quantity = colonyMineral.quantity;
        console.log(`Found Mineral: ${mineral.name}, Quantity: ${quantity}`);
    
        return {
            mineral,
            quantity
        };
    })
    .filter(item => item !== null);  // Remove null entries
    
    console.log("Filtered materials for Colony ID:", colonyId, filteredMaterials);
    return filteredMaterials;

}

// document.addEventListener("change", (event) => {
//     if(event.target.id === "colonySelector") {
//         setColonyChoice(parseInt(event.target.value));
//     }
// })