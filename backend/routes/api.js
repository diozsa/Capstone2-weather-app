const API_BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const { API_KEY } = require("../config");
const axios = require("axios");
const express = require("express");
const router = express.Router();


/** GET / {data} => {processed_data}
 * 
 * Gets data from external weather API
 * 
 * NO autho required
 */

router.get('/data', async function (req, res, next) {
  const location = req.query.location;
  console.log("THE QUERY IS ", req.query)
  // let q = `${API_BASE_URL}Phoenix?key=${API_KEY}`; //works hardcoded
  try {
    const response = await axios.get(`${API_BASE_URL}${location}?key=${API_KEY}`);
    // const response = await axios.get(`${ q }`); //works hardcoded
    const data = response.data;
    let { currentConditions } = data;
    console.log("Location in Express is ", location)
    console.log("Resolved Address in Express is ", data.resolvedAddress)

    res.send(data.resolvedAddress);    
  } catch (err) {
    return next(err);
  }
})

module.exports = router;