// HTML要素を取得する
const container = document.querySelector(".container");
//const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// 検索ボタンがクリックされたときの処理
const search = document.querySelector(".search-box button.fa-magnifying-glass");
search.addEventListener("click", async () => {
  // OpenWeatherMap APIのAPIキーと、検索ボックスの入力値を取得する
  const APIKey = "f3bbc5564a564ccb72954b80d1c19ec5";
  const city = document.querySelector(".search-box input").value;

  // 入力値が空の場合は処理を中断する
  if (city === "") return;

  // OpenWeatherMap APIを利用して、天気情報を取得する
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // 取得したJSONデータにエラーコードが含まれている場合
      if (json.cod === "404") {
        // エラー画面を表示する
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      // エラー画面を非表示にする
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      // HTML要素に天気情報を表示する
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // 天気によってアイコン画像を変更する
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
const now = new Date();
const hour = now.getHours();

if (hour >= 5 && hour < 12) {
  document.body.style.backgroundColor = "#F0E68C"; // 5時~11時,朝の色
} else if (hour >= 12 && hour < 16) {
  document.body.style.backgroundColor = "#87CEFA"; // 12時~15時,昼の色
} else if (hour >= 17 && hour < 19) {
  document.body.style.backgroundColor = "#FFA07A"; // 17時~18時,夕方の色
} else {
  document.body.style.backgroundColor = "#000000"; // 19時~4時,夜の色
}
