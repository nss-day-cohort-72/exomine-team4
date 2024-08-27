import { setFacilityChoice } from "./TransientState.js";

export const Facilities = async () => {
    //Fetches the mining facilities data from the JSON server
    const response = await fetch("http://localhost:8088/miningFacilities")
    //Converts the response to a JSON object
    const facilities = await response.json()

    // Start creating the dropdown HTML
    let optionsHTML = `<select id="facilitySelect"><option value="">Choose a facility</option>`

    //Iterate through the facilities object and create an option for each facility
    //To only include facilities where status is true (active)
    const optionElements = facilities
        .filter(facility => facility.status === true)
        .map(facility => {
            return `<option value="${facility.id}">${facility.name}</option>`
        });

    //Join all the options and close the select element
    optionsHTML += optionElements.join("")
    optionsHTML += `</select>`

     //This will be used to update the transientState when a value is selected
     document.addEventListener("change", (event) => {
        if (event.target.id === "facilitySelect") {
            setFacilityChoice(parseInt(event.target.value))
        }
    })

    return optionsHTML
}
