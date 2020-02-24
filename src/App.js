import React, {useState} from 'react';
const api = {
    key: "d7d6819647fe2dc031cbbfb1683763c6",
    base: "https://api.openweathermap.org/data/2.5/"
};
function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
      }  
    };
    const dateBuilder = (d) => {
        let months = ["Janurary", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let day = days[d.getDay()]; //returns 1-7 or 0-6
        let date = d.getDate(); //returns number between 1-31
        let month = months[d.getMonth()]; //returns number between 0 - 11
        let year = d.getFullYear(); //returns the full year

        return `${day}, ${month} ${date}, ${year}`;
    };
  return (
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 50) ? 'app sunset' : 'app') : 'app'}>
        <main>
            <div className="search-box">
                  <input type="text" className="search-bar" placeholder="Search..." onChange = {e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
              </div>
              {(typeof weather.main != "undefined") ? (
                  <div>
                    <div className="location-box">
                        <div className="location">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{dateBuilder(new Date())}</div>
                    </div>
                    <div className="weather-box">
                        <div className="temp">
                            {Math.round(weather.main.temp)}&deg;F
                        </div>
                        <div className="weather">
                            {weather.weather[0].main}
                        </div>
                    </div>
                  </div>
              ):('')}
        </main>
    </div>
  );
}

export default App;
