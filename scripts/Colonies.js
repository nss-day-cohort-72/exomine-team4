

export const ColonyInventory = () => {

    const colonies = getColonies();

}


export const getColonies = async () => {
    const response = await fetch("/localhost:8088/colonies")  // Adjust the path to your database.json file
    const data = await response.json();
    return data.colonies;
};

export const getColonyMinerals = async (colonyId) => {

const response = await fetch("/localhost:8088/colonyMinerals");
const data = await response.json();

const filteredMinerals = data.filter(mineral => mineral.colonyId === colonyId);

return filteredMinerals;

}