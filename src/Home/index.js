import { Component } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { IoWater } from "react-icons/io5";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { LuWind } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { PiThermometerHotFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import "./index.css";

class Home extends Component {
  state = {
    lightMode: true,
    searchByCity: true,
    city: "",
    country: "",
    zipCode: "",
    weatherData: null,
    isLoading: false,
  };

  onClickLightMode = () => {
    this.setState({ lightMode: false });
  };

  onClickDarkMode = () => {
    this.setState({ lightMode: true });
  };

  onClickZip = () => {
    this.setState({ searchByCity: false });
  };

  onClickCity = () => {
    this.setState({ searchByCity: true });
  };

  onChangeCity = (e) => {
    this.setState({ city: e.target.value });
  };

  onChangeCountry = (e) => {
    this.setState({ country: e.target.value });
  };

  onChangeZip = (e) => {
    this.setState({ zipCode: e.target.value });
  };

  getDataByCity = async () => {
    const { city } = this.state;
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6a02b54f827d7181d2e0ad5bd1e49d78`
      )
      .then((res) => {
        console.log(res);
        this.setState({ weatherData: res.data, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
        alert(err.response.data.message);
      });
  };

  getDataByZip = async () => {
    const { zipCode, country } = this.state;
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${country}&units=metric&appid=6a02b54f827d7181d2e0ad5bd1e49d78`
      )
      .then((res) => {
        console.log(res);
        this.setState({ weatherData: res.data, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
        alert(err.response.data.message);
      });
  };

  onClickCitySearch = () => {
    const { city } = this.state;
    if (city.length > 0) {
      this.setState({ isLoading: true, weatherData: null }, this.getDataByCity);
    }
  };

  onClickZipSearch = () => {
    const { zipCode, country } = this.state;
    if (zipCode.length < 0 || country.length < 0) {
      alert("Please provide valid zipcode and country code");
    }
    if (country.length !== 2) {
      alert("please provide valid 2 letter country code (eg: IN)");
    } else {
      this.setState({ isLoading: true, weatherData: null }, this.getDataByZip);
    }
  };

  renderInputSection = () => {
    const { lightMode, searchByCity, city, country, zipCode } = this.state;

    return (
      <div>
        {searchByCity ? (
          <div className="input-container">
            <div className="input-container2">
              <label className="label" htmlFor="city">
                City Name:
              </label>
              <input
                value={city}
                onChange={this.onChangeCity}
                placeholder="Enter city name"
                id="city"
                className={lightMode ? "input-el" : `input-el input-dark`}
                type="search"
              />
            </div>
            <button onClick={this.onClickCitySearch} className="search-btn">
              Get Weather
            </button>
            <p>OR</p>
            <button className="search-btn" onClick={this.onClickZip}>
              Search By Zip Code
            </button>
          </div>
        ) : (
          <div className="input-container">
            <div className="input-container2 input-container-zip">
              <div className="input-container2">
                <label className="label-zip" htmlFor="zip-code">
                  Zip Code:
                </label>
                <input
                  value={zipCode}
                  onChange={this.onChangeZip}
                  placeholder="Enter zip code"
                  id="zip-code"
                  className={
                    lightMode
                      ? "input-el input-el-zip"
                      : `input-el input-el-zip input-dark`
                  }
                  type="search"
                />
              </div>
              <div className="input-container2">
                <label className="label-zip" htmlFor="country-code">
                  Country Code:
                </label>
                <input
                  value={country}
                  onChange={this.onChangeCountry}
                  placeholder="Enter country code"
                  id="country-code"
                  className={
                    lightMode
                      ? "input-el input-el-zip"
                      : `input-el input-el-zip input-dark`
                  }
                  type="search"
                />
              </div>
            </div>
            <button onClick={this.onClickZipSearch} className="search-btn">
              Get Weather
            </button>
            <p>OR</p>
            <button className="search-btn" onClick={this.onClickCity}>
              Search By City
            </button>
          </div>
        )}
      </div>
    );
  };

  render() {
    const { lightMode, isLoading, weatherData } = this.state;

    return (
      <div className={lightMode ? `bg-container light` : `bg-container dark`}>
        <div className="content">
          <div className="toggle-container">
            <h1 className="main-heading">Weather App</h1>
            {lightMode ? (
              <button className="toggle-button" onClick={this.onClickLightMode}>
                <div className="mode-icon-container">
                  <MdLightMode className="mode-icon" />
                </div>
                Light Mode
              </button>
            ) : (
              <button
                className="toggle-button dark-toggle-btn"
                onClick={this.onClickDarkMode}
              >
                Dark Mode
                <div className="mode-icon-container">
                  <MdDarkMode className="mode-icon" />
                </div>
              </button>
            )}
          </div>
          {this.renderInputSection()}
          <div className="weather-data-container">
            {isLoading && (
              <TailSpin
                height="55"
                width="55"
                color="#33b249"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
            {weatherData && (
              <div className="data-cards-container">
                <h1 className="city-name">
                  {weatherData.name} <FaLocationDot className="location-icon" />
                </h1>
                <p className="date-para">
                  Date and Time:{" "}
                  {new Date(weatherData.dt * 1000).toLocaleString()}
                </p>
                <p className="temp-para">Temperature:</p>
                <h2 className="temp">{weatherData.main.temp} °C</h2>
                <ul className="cards-list">
                  <li
                    className={
                      lightMode
                        ? `list-item-card`
                        : `list-item-card list-card-dark`
                    }
                  >
                    <PiThermometerHotFill className="icon" />
                    <p className="para2">Feels like</p>
                    <p className="para3">{weatherData.main.feels_like} °C</p>
                  </li>
                  <li
                    className={
                      lightMode
                        ? `list-item-card`
                        : `list-item-card list-card-dark`
                    }
                  >
                    <IoWater className="icon" />
                    <p className="para2">Humidity</p>
                    <p className="para3">{weatherData.main.humidity} %</p>
                  </li>
                  <li
                    className={
                      lightMode
                        ? `list-item-card`
                        : `list-item-card list-card-dark`
                    }
                  >
                    <LuWind className="icon" />
                    <p className="para2">Air Pressure</p>
                    <p className="para3">{weatherData.main.pressure} hpa</p>
                  </li>
                  <li
                    className={
                      lightMode
                        ? `list-item-card`
                        : `list-item-card list-card-dark`
                    }
                  >
                    <FaEye className="icon" />
                    <p className="para2">Visibility</p>
                    <p className="para3">
                      {Math.round(weatherData.visibility / 1000)} km
                    </p>
                  </li>
                  <li
                    className={
                      lightMode
                        ? `list-item-card`
                        : `list-item-card list-card-dark`
                    }
                  >
                    <BsFillSunriseFill className="icon" />
                    <p className="para2">Sunrise</p>
                    <p className="para3">
                      {new Date(
                        weatherData.sys.sunrise * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </li>
                  <li
                    className={
                      lightMode
                        ? `list-item-card`
                        : `list-item-card list-card-dark`
                    }
                  >
                    <BsFillSunsetFill className="icon" />
                    <p className="para2">Sunset</p>
                    <p className="para3">
                      {new Date(
                        weatherData.sys.sunset * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
