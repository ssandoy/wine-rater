const vinmonopoletBaseUrl = "https://apis.vinmonopolet.no";
const REQUEST_TIMEOUT_MS = 10_000;

const getApiSubscriptionKey = (): string | undefined =>
  process.env.VINMONOPOLET_API_SUBSCRIPTION_KEY2 ||
  process.env.VINMONOPOLET_API_SUBSCRIPTION_KEY ||
  process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY ||
  process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY2;

const jsonResponse = (
  status: number,
  body: unknown,
  additionalHeaders: HeadersInit = {}
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...Object.fromEntries(new Headers(additionalHeaders)),
    },
  });

const parseJsonResponse = async (response: Response): Promise<unknown> => {
  const body = await response.text();
  if (!body) {
    throw new Error("Vinmonopolet returned an empty response");
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new Error("Vinmonopolet returned invalid JSON");
  }
};

export default async (request: Request): Promise<Response> => {
  if (request.method !== "GET") {
    return jsonResponse(405, { error: "Method not allowed" }, { Allow: "GET" });
  }

  const apiSubscriptionKey = getApiSubscriptionKey();
  if (!apiSubscriptionKey) {
    console.error("Vinmonopolet API subscription key is not configured");
    return jsonResponse(500, { error: "Wine service is not configured" });
  }

  const query = new URL(request.url).searchParams;

  try {
    const response = await fetch(
      `${vinmonopoletBaseUrl}/press-products/v1/details-normal?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Ocp-Apim-Subscription-Key": apiSubscriptionKey,
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      }
    );

    if (!response.ok) {
      await response.body?.cancel().catch(() => undefined);
      console.error("Vinmonopolet API request failed", {
        status: response.status,
        statusText: response.statusText,
      });
      return jsonResponse(response.status, {
        error: "Vinmonopolet API request failed",
        upstreamStatus: response.status,
      });
    }

    return jsonResponse(200, await parseJsonResponse(response));
  } catch (error) {
    const timedOut =
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");
    console.error("Vinmonopolet API request failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
    });
    return jsonResponse(timedOut ? 504 : 502, {
      error: timedOut
        ? "Wine service request timed out"
        : "Wine service is temporarily unavailable",
    });
  }
};
