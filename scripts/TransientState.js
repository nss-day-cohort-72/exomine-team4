const state = {
    selectedFacility: 0,
    selectedFacilityName: "",
    selectedGovernor: 0,
    selectedMineral: 0,
  }
  
  export const setFacilityChoice = (facilityId, facilityName) => {
    state.selectedFacility = facilityId
    state.selectedFacilityName = facilityName
    console.log("Facility selected:", state.selectedFacility)
    document.dispatchEvent(new CustomEvent("stateChanged"))
  }
  
  export const setGovernorChoice = (governorId) => {
    state.selectedGovernor = governorId;
    console.log("Governor selected:", state.selectedGovernor);
    document.dispatchEvent(new CustomEvent("stateChanged"));
  }
  
  export const setMineralChoice = (mineralId) => {
    state.selectedMineral = mineralId;
    console.log("Mineral selected:", state.selectedMineral);
    document.dispatchEvent(new CustomEvent("stateChanged"));
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
  
    // Sends the data to the server at /facilityMinerals
    const response = await fetch("http://localhost:8088/facilityMinerals", postOptions)
    await response.json()
  
    const customEvent = new CustomEvent("newPurchaseCreated")
    document.dispatchEvent(customEvent)
  }
  