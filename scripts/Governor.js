import { setGovernorChoice } from "./TransientState.js"

export const GovernorSelector = async () => {
  const governors = await getGovernors();

  console.log("Fetched Governors", governors)

  const optionsHTML = `
    <select id="governorSelector">
        <option value="0">Choose a governor...</option>
        ${governors
          .map((gov) => `<option value="${gov.id}">${gov.name}</option>`)
          .join("")}
    </select>`

  document.addEventListener("change", (event) => {
    if (event.target.id === "governorSelector") {
      setGovernorChoice(parseInt(event.target.value));
    }
  })

  return optionsHTML;
}

export const getGovernors = async () => {
  try {
    const response = await fetch("http://localhost:8088/governors"); // Full URL
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json();
    console.log(
      "ok what ist he data we get back in getGovernors before data.governors",
      data
    )

    console.log("Fetched Governors:", data); // Log the fetched data
    return data;
  } catch (error) {
    console.error("Failed to fetch governors:", error)
    return []
  }
}
