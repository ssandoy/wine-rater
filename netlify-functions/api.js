import fetch from "node-fetch";
import dotenv from "dotenv";

const vinmonopoletBaseUrl = "https://apis.vinmonopolet.no";
const config = dotenv.config();
const REQUEST_TIMEOUT_MS = 10000;

const apiSubscriptionKey =
  process.env.VINMONOPOLET_API_SUBSCRIPTION_KEY ||
  process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY ||
  process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY2 ||
  config?.parsed?.["VINMONOPOLET_API_SUBSCRIPTION_KEY"] ||
  config?.parsed?.["REACT_APP_OCP_APIM_SUBSCRIPTION_KEY"];

const jsonResponse = (statusCode, body, additionalHeaders = {}) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    ...additionalHeaders
  },
  body: JSON.stringify(body)
});

const parseJsonResponse = async response => {
  const body = await response.text();
  if (!body) {
    throw new Error("Vinmonopolet returned an empty response");
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    throw new Error("Vinmonopolet returned invalid JSON");
  }
};

export const handler = async event => {
  if (event.httpMethod && event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "Method not allowed" }, { Allow: "GET" });
  }

  if (!apiSubscriptionKey) {
    console.error("Vinmonopolet API subscription key is not configured");
    return jsonResponse(500, { error: "Wine service is not configured" });
  }

  const query = new URLSearchParams(event.queryStringParameters || {});

  try {
    const response = await fetch(
      vinmonopoletBaseUrl +
        "/press-products/v1/details-normal?" +
        query.toString(),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Ocp-Apim-Subscription-Key": apiSubscriptionKey
        },
        timeout: REQUEST_TIMEOUT_MS
      }
    );

    if (!response.ok) {
      await response.text().catch(() => undefined);
      console.error("Vinmonopolet API request failed", {
        status: response.status,
        statusText: response.statusText
      });
      return jsonResponse(response.status, {
        error: "Vinmonopolet API request failed",
        upstreamStatus: response.status
      });
    }

    const data = await parseJsonResponse(response);
    return jsonResponse(200, data);
  } catch (err) {
    const timedOut = err?.type === "request-timeout";
    console.error("Vinmonopolet API request failed", {
      type: err?.type,
      message: err instanceof Error ? err.message : String(err)
    });
    return jsonResponse(timedOut ? 504 : 502, {
      error: timedOut
        ? "Wine service request timed out"
        : "Wine service is temporarily unavailable"
    });
  }
};
