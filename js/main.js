(async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        show(latitude, longitude);
      },
      function (err) {
        show(10.762622, 106.660172);
      }
    );
  } else {
    show(10.762622, 106.660172);
  }
})();

function isDayTime() {
  const now = new Date();
  const startNight = new Date();
  startNight.setHours(18);
  startNight.setMinutes(0);
  startNight.setSeconds(0);
  startNight.setMilliseconds(0);

  const endNight = new Date();
  endNight.setHours(6);
  endNight.setMinutes(0);
  endNight.setSeconds(0);
  endNight.setMilliseconds(0);

  return now < startNight || now >= endNight;
}
const formatHour = function () {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return timeString;
};
const container = document.querySelector(".container");
async function show(lat, lon) {
  container.innerHTML = "";
  container.insertAdjacentHTML("afterbegin", `<div class="loading"></div>`);
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${"26802e96d8e7dee3afae7cdcfad89a98"}`
  );
  const data = await res.json();
  container.innerHTML = "";
  if (isDayTime()) {
    container.dataset.theme = "dark";
  }
  container.style.background = "var(--bg)";
  const markup = `
    <div class="wrapper">
        <div class="app-top">
          <div class="top-left">
            <div class="circles">
              <div class="cirles-item"></div>
              <div class="cirles-item"></div>
              <div class="cirles-item"></div>
              <div class="cirles-item"></div>
              <div class="cirles-item"></div>
            </div>
            <svg
              id="Group_1"
              data-name="Group 1"
              xmlns="http://www.w3.org/2000/svg"
              width="14.946"
              height="11.362"
              viewBox="0 0 14.946 11.362"
            >
              <path
                id="Path_1"
                data-name="Path 1"
                d="M333.52,179.631a9.54,9.54,0,0,1,6.306,2.379L341,180.7a10.847,10.847,0,0,0-14.946-.007l1.17,1.313A9.526,9.526,0,0,1,333.52,179.631Z"
                transform="translate(-326.052 -177.709)"
                fill="#fff"
              />
              <path
                id="Path_2"
                data-name="Path 2"
                d="M338.115,190.54a5.79,5.79,0,0,1,3.791,1.41l1.239-1.388a7.488,7.488,0,0,0-10.057-.006l1.238,1.389A5.8,5.8,0,0,1,338.115,190.54Z"
                transform="translate(-330.647 -184.832)"
                fill="#fff"
              />
              <path
                id="Path_3"
                data-name="Path 3"
                d="M345.327,200.366a3.8,3.8,0,0,0-5.1,0l2.548,2.86Z"
                transform="translate(-335.308 -191.86)"
                fill="#fff"
              />
            </svg>
          </div>
          <div class="top-mid">${formatHour()}</div>
          <div class="top-right">
            100%
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30.516"
              height="11.833"
              viewBox="0 0 30.516 11.833"
            >
              <g
                id="Group_4"
                data-name="Group 4"
                transform="translate(-544.585 -177.709)"
              >
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M1291.409,188.475a2.206,2.206,0,0,1,0,4.36Z"
                  transform="translate(-718.177 -7.029)"
                  fill="#fff"
                  fill-rule="evenodd"
                />
                <path
                  id="Path_5"
                  data-name="Path 5"
                  d="M1235.025,178.332a1.247,1.247,0,0,1,1.246,1.245v8.1a1.247,1.247,0,0,1-1.246,1.245h-24.288a1.247,1.247,0,0,1-1.246-1.245v-8.1a1.247,1.247,0,0,1,1.246-1.245h24.288m0-.623h-24.288a1.869,1.869,0,0,0-1.868,1.868v8.1a1.869,1.869,0,0,0,1.868,1.868h24.288a1.869,1.869,0,0,0,1.868-1.868v-8.1a1.869,1.869,0,0,0-1.868-1.868Z"
                  transform="translate(-664.284 0)"
                  fill="#fff"
                />
                <path
                  id="Path_6"
                  data-name="Path 6"
                  d="M1213.7,181.3h23.042a1.245,1.245,0,0,1,1.245,1.246v6.85a1.245,1.245,0,0,1-1.245,1.246H1213.7a1.245,1.245,0,0,1-1.246-1.246v-6.85A1.245,1.245,0,0,1,1213.7,181.3Z"
                  transform="translate(-666.627 -2.343)"
                  fill="#fff"
                  fill-rule="evenodd"
                />
              </g>
            </svg>
          </div>
        </div>
        <div class="app-body">
          <div class="body-left">
            <div class="temp">
              <p>${Math.round(data.main.temp)}</p>
              <sup>°C</sup>
            </div>
            <p class="city-name">${data.name}</p>
          </div>
          <div class="body-right">
            <img src="${
              isDayTime() ? "./images/moon.png" : "./images/sunny.png"
            }" alt="" />
            <p>${isDayTime() ? "Moon" : "Sunny"}</p>
          </div>
        </div>
      </div>
      <h3 class="text-center">${
        isDayTime() ? "GOOD MORNING!" : "GOOD NIGHT!"
      }</h3>
      <div class="app-bottom">
        <div class="item">
          <img src="./images/humidity.png" alt="" />
          <p class="item-humidity">${data.main.humidity}%</p>
        </div>
        <div class="item">
          <img src="./images/temperature.png" alt="" />
          <p class="item-temp">${Math.round(data.main.temp_max)}°C ${Math.round(
    data.main.temp_min
  )}°C</p>
        </div>
        <div class="item">
          <img src="./images/wind.png" alt="" />
          <p class="item-wind">${data.wind.speed}m/s</p>
        </div>
      </div>`;

  container.insertAdjacentHTML("afterbegin", markup);

  //   document.querySelector(".city-name").textContent = data.name;
  //   document.querySelector(".item-humidity").textContent = `%`;
  //   document.querySelector(".item-temp").textContent = `°C °C`;
  //   document.querySelector(".item-wind").textContent = ` m/s`;
  //   document.querySelector(".temp p").textContent = ``;
  setInterval(() => {
    document.querySelector(".top-mid").textContent = formatHour();
  }, 1000);
}
