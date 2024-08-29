import { setGovernorChoice } from "./TransientState.js"
import { ColonyInventory } from "./Colonies.js"

// The GovernorSelector function fetches governors and populates a dropdown
export const GovernorSelector = async () => {
    // Fetches the governors data from the JSON server
    const response = await fetch("http://localhost:8088/governors");
    const governors = await response.json();

    // Start creating the dropdown HTML
    let optionsHTML = `<select id="governorSelector"><option value="0">Choose a governor...</option>`

    // Iterates through the governors array and creates an option for each governor
    const optionElements = governors.map((gov) => {
        return `<option value="${gov.id}">${gov.name}</option>`
    });

    // Joins all the options and closes the select element
    optionsHTML += optionElements.join("")
    optionsHTML += `</select>`

    // This will be used to update the transientState when a governor is selected
    document.addEventListener("change", async (event) => {
        if (event.target.id === "governorSelector") {
            // Updates the transient state with the selected governor's ID
            setGovernorChoice(parseInt(event.target.value));

            // Fetch and display colonies and their minerals associated with the selected governor
            const colonyHTML = await ColonyInventory();
            document.querySelector("#colonyOutput").innerHTML = colonyHTML;
        }
    })

    return optionsHTML;
}
