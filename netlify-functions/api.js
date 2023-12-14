import fetch from "node-fetch";
const dotenv = require("dotenv");

const vinmonopoletBaseUrl = "https://apis.vinmonopolet.no";
const config = dotenv.config();

// todo TS
const apiSubscriptionKey =
  config?.parsed?.["REACT_APP_OCP_APIM_SUBSCRIPTION_KEY"] ||
  process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY2;

// "event" has information about the path, body, headers, etc. of the request
// "context" has information about the lambda environment and user details
// The "callback" ends the execution of the function and returns a response back to the caller
export const handler = async (event, context, callback) => {
  try {
    console.log("event", event);
    console.log("FETCHING RESPONSE");
    const response = await fetch(
      vinmonopoletBaseUrl +
        "/press-products/v1/details-normal?" +
        new URLSearchParams(event.queryStringParameters).toString(),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Ocp-Apim-Subscription-Key": apiSubscriptionKey
        }
      }
    );
    console.log("FETCHED RESPONSE:", response);
    const data = await response.json();
    console.log("FETCHED DATA:", data);
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log("Error from wine-fetching: ", err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
