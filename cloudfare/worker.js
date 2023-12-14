addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

// Function to handle OPTIONS request
// Reference: https://developers.cloudflare.com/workers/examples/cors-header-proxy
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400",
}

async function handleRequest(request) {

    const vinmonopoletBaseUrl = 'https://apis.vinmonopolet.no'
    const apiSubscriptionKey = "dbf4823d333849cf954a2c5bb46e7f18"// REACT_APP_OCP_APIM_SUBSCRIPTION_KEY2

    try {
        console.log('FETCHING RESPONSE')
        // Parse the request URL
        const url = new URL(request.url);


        const queryString = url.searchParams.toString()
        const response = await fetch(
            `${vinmonopoletBaseUrl}/press-products/v1/details-normal?${queryString}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Ocp-Apim-Subscription-Key': apiSubscriptionKey
                }
            }
        )
        console.log('FETCHED RESPONSE:', response)
        const data = await response.json()
        console.log('FETCHED DATA:', data)
        let respHeaders = {
            ...corsHeaders,
            // Allow all future content Request headers to go back to browser
            // such as Authorization (Bearer) or X-Client-Name-Version
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
        }
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                ...respHeaders
            },
        })
    } catch (err) {
        console.log('Error from wine-fetching: ', err)
        return new Response(JSON.stringify({ msg: err.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}