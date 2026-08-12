# Wine Rater

## Local development

Use Node.js 22, install dependencies, and copy `.env.example` to `.env`. Replace
the placeholder with your Vinmonopolet subscription key.

```sh
npm install
npm run dev
```

The application is available at <http://localhost:3000>. Netlify's Vite plugin
serves functions, redirects, and local environment variables through the Vite
development server.

## Production build

```sh
npm run build
```

Netlify bundles functions directly from `netlify-functions` during deployment.
