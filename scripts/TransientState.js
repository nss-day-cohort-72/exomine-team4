const state = {
  selectedFacility: 0,
  selectedGovernor: 0,
  selectedMineral: 0,
}

export const setFacilityChoice = (facilityId) => {
  state.selectedFacility = facilityId;
  console.log(state);
}

export const setGovernorChoice = (governorId) => {
  state.selectedGovernor = governorId;
  console.log(state);
}

export const setMineralChoice = (mineralId) => {
  state.selectedMineral = mineralId;
  console.log(state);
}

export const getState = () => {
    return { ...state };
  }

export const purchaseMineral = async () => {
  const postOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  }

  //sends the data to the server at /purchases
  const response = await fetch("http://localhost:8088/facilityMinerals", postOptions)
  await response.json()

  const customEvent = new CustomEvent("newPurchaseCreated")
  document.dispatchEvent(customEvent)
}
