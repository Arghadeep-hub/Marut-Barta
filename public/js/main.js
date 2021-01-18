const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
let curDate = document.getElementById("date");
const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp");
const temp_fill = document.getElementById("temp_fill");
const temp_max = document.getElementById("temp_max");
const datahide = document.querySelector(".info");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = `Please type City name in search box`;
    // datahide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=ab589c2dd4abb4f0a7341483ea19fb30`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];

      city_name.innerText = ` ${arrData[0].name}, ${arrData[0].sys.country}`;
      temp.innerText = `${arrData[0].main.temp}`;
      temp_max.innerText = ` ${arrData[0].main.temp_max}`;
      temp_fill.innerText = ` ${arrData[0].main.feels_like}`;

      // Weather condition check
      const tempMood = arrData[0].weather[0].main;
      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color: #dfe4ff'></i>";
      } else if ((tempMood == "Rain", "Light rain")) {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-showers-heavy' style='color: #268bff'></i>";
      } else if ((tempMood == "Haze", "Mist")) {
        temp_status.innerHTML =
          "<i class='fab fa-cloudversify' style='color: #bfbfbf'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-sun' style='color: #f1f2f3'></i>";
      }

      // datahide.classList.remove("data_hide");
    } catch {
      city_name.innerText = `Please enter the city name properly`;
      // datahide.classList.add("data_hide");
    }
  }
};
// Date and Time manipulation
const getCurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  let getCurrentTime = new Date();
  let day = weekday[getCurrentTime.getDay()];
  return day;
};
const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let now = new Date();
  var month = months[now.getMonth()];
  var date = now.getDate();

  let hours = now.getHours();
  let mins = now.getMinutes();
  let periods = "AM";

  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${month} ${date} | ${hours}:${mins}${periods}`;
};
curDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();

submitBtn.addEventListener("click", getInfo);
