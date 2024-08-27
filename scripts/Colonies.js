import { setColonyChoice } from "./TransientState.js"

export const ColonyInventory = async () => {

    const colonies = await getColonies();

}


export const getColonies = async () => {
    const response = await fetch("/localhost:8088/colonies")  // Adjust the path to your database.json file
    const data = await response.json();
    return data;
};

export const getColonyMinerals = async (colonyId) => {

const response = await fetch("/localhost:8088/colonyMinerals");
const data = await response.json();

const filteredMinerals = data.filter(mineral => mineral.colonyId === colonyId);

return filteredMinerals;

}

document.addEventListener("change", (event) => {
    if(event.target.id === "colonySelector") {
        setColonyChoice(parseInt(event.target.value));
    }
})