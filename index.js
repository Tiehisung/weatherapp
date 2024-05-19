const dataSection = document.getElementById("data-section");
const temperatureTD = document.getElementById("temperature-td");
const timeTD = document.getElementById("time-td");
const windSpeedTD = document.getElementById("wind-speed-td");

// search inputs
const longitude = document.querySelector("#longitude");
const latitude = document.querySelector("#latitude");

async function getWeatherInfo(e) {
  e.preventDefault();
  if (!longitude.value) {
    return alert("You did not enter a longitude!");
  } else if (!latitude.value) {
    return alert("You did not enter a latitude!");
  }
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  const response = await fetch(url);
  const result = await response.json();
  console.log("Result", result);
  const weatherTable = `
   <table id="weather-table" style="font-size: small">
        <tbody>
          <tr>
            <td>Temperature:</td>
            <td class="value-td">${
              result.current.temperature_2m +
              result.current_units.temperature_2m
            }</td>
          </tr>
          <tr>
            <td>Wind speed:</td>
            <td class="value-td">${
              result.current.wind_speed_10m +
              result.current_units.wind_speed_10m
            }</td>
          </tr>
          <tr>
            <td>Record Time:</td>
            <td class="value-td">${
              result.current.time + result.current_units.time
            }</td>
          </tr>
          <tr>
            <td>Time Zone:</td>
            <td class="value-td">${result.timezone}</td>
          </tr>
          <tr>
            <td>Latitude:</td>
            <td class="value-td">${result.latitude}</td>
          </tr>
          <tr>
            <td>Longitude:</td>
            <td class="value-td">${result.longitude}</td>
          </tr>
        </tbody>
      </table>
  `;
  dataSection.innerHTML += weatherTable;
}
const form = document.getElementById("my-form");
form.addEventListener("submit", (e) => getWeatherInfo(e));

const modalEl=document.querySelector("#modal")
const modalContentCta=document.querySelector("#modal-content-cta")


//Show modal
const showHelp = () => {
    modalEl.style.visibility = "visible";
};
const help = document.getElementById("help");
help.addEventListener("click", () => showHelp());

//Hide modal
const hideHelp = () => {
    modalEl.style.visibility = "hidden";
};
modalEl.addEventListener("click",hideHelp)