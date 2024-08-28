import { getState } from "./TransientState.js";

export const ColonyInventory = async () => {
  try {
    const colonies = await getColoniesByGovernor();

    const state = getState();

    const colonyMineralPromises = colonies.map(async (colony) => {
      const minerals = await getColonyMinerals(colony.id);

      return `
            <h3 class="mx-auto text-center">${colony.name} Minerals <ul class="list-unstyled">
            ${minerals
              .map(
                (mineral) => `

          <li> ${mineral.quantity} tons of ${mineral.mineral.name}</li>
            `
              )
              .join("")}
            </ul></h3>`;
    });

    // Wait for all colony HTML strings to be resolved
    const colonyMineralHTML = await Promise.all(colonyMineralPromises);

    // Return the joined HTML
    return colonyMineralHTML.join("");
  } catch (error) {
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

  // Find the governor with the matching ID
  const selectedGovernor = governorsData.find(
    (governor) => parseInt(governor.id) === parseInt(governorID)
  );

  // If the selected governor is found, get the associated colony ID
  if (selectedGovernor) {
    const colonyID = selectedGovernor.colonyId;

    // Fetch all colonies
    const coloniesResponse = await fetch("http://localhost:8088/colonies");
    const coloniesData = await coloniesResponse.json();

    // Find the colony with the matching ID
    const filteredColony = coloniesData.find(
      (colony) => parseInt(colony.id) === colonyID
    );

    // Return the colony data wrapped in an array (so it can be mapped)
    return filteredColony ? [filteredColony] : [];
  } else {
    // If no matching governor is found, return an empty array
    return [];
  }
};

export const getColonies = async () => {
  const response = await fetch("http://localhost:8088/colonies"); // Adjust the path to your database.json file
  const data = await response.json();
  return data;
};

export const getColonyMinerals = async (colonyId) => {
  // Fetch colonyMinerals data
  const colonyMineralsResponse = await fetch(
    "http://localhost:8088/colonyMinerals"
  );
  const colonyMineralsData = await colonyMineralsResponse.json();

  // Fetch minerals data
  const mineralsResponse = await fetch("http://localhost:8088/minerals");
  const mineralsData = await mineralsResponse.json();

  const filteredMaterials = colonyMineralsData
    .filter((colonyMineral) => {
      const isMatchingColony =
        parseInt(colonyMineral.colonyId) === parseInt(colonyId);

      return isMatchingColony; // This line returns true or false
    })

    .map((colonyMineral) => {
      let mineral = mineralsData.find((mineral) => {
        return parseInt(mineral.id) === parseInt(colonyMineral.mineralId);
      });

      if (!mineral) {
        console.error(`Mineral with id ${colonyMineral.mineralId} not found`);
        return null;
      }

      let quantity = colonyMineral.quantity;

      return {
        mineral,
        quantity,
      };
    })
    .filter((item) => item !== null); // Remove null entries

  return filteredMaterials;
};

// document.addEventListener("change", (event) => {
//     if(event.target.id === "colonySelector") {
//         setColonyChoice(parseInt(event.target.value));
//     }
// })
