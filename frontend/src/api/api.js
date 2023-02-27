import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// API Class

class WeatherApi {
  
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${WeatherApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);

      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // API backend routes

  /** Get token for login from username and password */

  static async login(data) {
    const res = await this.request('auth/token', data, 'post');

    return res.token;
  } 

  /** Signup user */

  static async signup(data) {
    const res = await this.request('auth/register', data, 'post');

    return res.token;
  }


  /** Get all addresses saved by user */

  static async getAddresses(username) {
    const res = await this.request(`addresses/${username}`);

    return res.addresses;
  }
}

// Token for username "user", password "password"
// ==== to be remove later =====

// WeatherApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2NzcxMTU4MTB9.Gct_4TKa9f6NZyBHRZfVC7tj2DuP8ClLnnxnkd71wtI";


export default WeatherApi;

//this could run outside of the class
//retrieving the external API results from backend
// getHours, getDays, getUnits

// export const getDays = async () => {
//   const res = await axios.get(`${BASE_URL}/****/`)

//   return res.data
// }