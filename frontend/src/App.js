import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Container from "react-bootstrap/Container";
import WeatherApi from "./api/api";
import NavBar from "./routes-nav/NavBar";
import HomePage from "./routes-nav/HomePage";

// import "./App.css";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./common/LoadingSpinner";
import { decodeToken } from "react-jwt";
import getGeoLocation from "./helper/getGeoLocation";

/**
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 * 
 * - currentUser: username - from token. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 */

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "weather-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [weatherData, setWeatherData] = useState(null);
  const [address, setAddress] = useState("");

  // Gets username from token. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function getUsername() {
    console.debug("App useEffect getUsername", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          console.log(token);
          let { username } = decodeToken(token);
          // puts token on the Api class so it can use it to call the API.
          WeatherApi.token = token;
          setCurrentUser(username);
        } catch (err) {
          console.error("App getUsername: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs;
    // once the data is fetched (or even if an error happens!),
    //this will be set back to false to control the spinner.

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs user in (set token) upon signup.
   *
   * Make sure to await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await WeatherApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }


  /** Handles site-wide login.
   *
   * Make sure to await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await WeatherApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }
  
  /** Load data for default location on mount */
  /** Using IP geo detection for default - IF NO BROWSER BLOCKER PRESENT*/

  useEffect(() => {
    async function getLocationOnMount() {
      try {
        const location = await getGeoLocation();
        await search(location);
      } catch (error) {
        console.log("Geolocation error:", error);
        await search("Delhi");
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getLocationOnMount();
  }, []);

// Search function used in the SearchForm

  async function search(location) {
    try {
      let data = await WeatherApi.getWeatherData(location);
      setWeatherData(data);
      console.log("Weather data in App", data)
      return { success: true };
    } catch (errors) {
      console.error("api failed", errors);
      // return { success: false, errors };
      return setWeatherData(null);
    }
 
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <Router>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, weatherData, setWeatherData }}>
        <NavBar logout={logout} login={login} signup={signup} search={search} />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage weatherData={weatherData} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </UserContext.Provider>
    </Router>
  );
}
export default App;
