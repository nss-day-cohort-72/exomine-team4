// Initial state object to keep track of selections
const state = {
  selectedFacility: 0,
  selectedFacilityName: "",
  selectedGovernor: 0,
  selectedMineral: 0,
};


//functions to set the selected item and update the state
export const setFacilityChoice = (facilityId, facilityName) => {
  Object.assign(state, { selectedFacility: facilityId, selectedFacilityName: facilityName });
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setGovernorChoice = (governorId) => {
  state.selectedGovernor = governorId;
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setMineralChoice = (mineralId) => {
  state.selectedMineral = mineralId;
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

// Function to get a copy of the current state
export const getState = () => ({ ...state });


// Function to handle purchasing a mineral and updating the server
export const purchaseMineral = async () => {
  const { selectedGovernor, selectedMineral } = getState();
  const colonyId = await getColonyByGovernor(selectedGovernor);

  const colonyMinerals = await (await fetch("http://localhost:8088/colonyMinerals")).json();
  let colonyMineral = colonyMinerals.find(cm => cm.colonyId === colonyId && cm.mineralId === selectedMineral);

  //send the data to the serve
  const options = {
    method: colonyMineral ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      colonyMineral
        ? { ...colonyMineral, quantity: colonyMineral.quantity + 1 }
        : { colonyId, mineralId: selectedMineral, quantity: 1 }
    ),
  };

  const url = colonyMineral
    ? `http://localhost:8088/colonyMinerals/${colonyMineral.id}`
    : "http://localhost:8088/colonyMinerals";

  const response = await fetch(url, options);
  response.ok ? document.dispatchEvent(new CustomEvent("newPurchaseCreated")) : console.error("Purchase failed");
};

// Function to get the colony ID associated with a governor
const getColonyByGovernor = async (governorId) => {
  const governor = await (await fetch(`http://localhost:8088/governors/${governorId}`)).json();
   // Return the colony ID
  return governor.colonyId;
};
