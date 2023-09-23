


        document.addEventListener("DOMContentLoaded", function () {
            fetch("https://restcountries.com/v3.1/all")
                .then(response => response.json())
                .then(countries => {
                    countries.forEach(country => {
                        const countryCard = createCountryCard(country);
                        document.getElementById("country-info").appendChild(countryCard);
                    });
                })
                .catch(error => console.error("Error fetching country data:", error));
        });

        function createCountryCard(country) {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4");

            card.innerHTML = `
                   <div class="card text-center" style="width:15rem">
                   <div class="card-header" >
                         <h5 class="card-title">${country.name.common}</h5>
                         </div>
                        
                       <div class="card-body">
                
                    <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common}">
                    
                        
                        <p class="card-text">Capital: ${country.capital}</p>
                        <p class="card-text">Region: ${country.region}</p>
                        
                        <p class="card-text">Country Code: ${country.cca2}</p>
                         
  <button type="button" class="btn btn-primary" onclick="fetchWeather('${country.name.common}')">Click for weather</button>
                        <p class="card-text">Latlng: ${country.latlng.join(", ")}</p>
                        <div id="${country.name.common}-weather"></div>
                    </div>
                </div>
            `;

            return card;
        }

        function fetchWeather(countryName) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=YOUR_OPENWEATHERMAP_API_KEY`)
                .then(response => response.json())
                .then(weatherData => {
                    const weatherDiv = document.getElementById(`${countryName}-weather`);
                    weatherDiv.innerHTML = `
                        <p>Weather: ${weatherData.weather[0].description}</p>
                        <p>Temperature: ${weatherData.main.temp}°C</p>
                        <p>Humidity: ${weatherData.main.humidity}%</p>
                    `;
                })
                .catch(error => console.error("Error fetching weather data:", error));
        }
    
