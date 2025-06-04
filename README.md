# unleash-demo-app

This project is used as a demo app that is runtime-controlled (feature toggled) by [Unleash](https://www.getunleash.io/).

## Development

Get started with the following [yarn](https://yarnpkg.com/) commands:

```bash
# Install dependencies for frontend and backend
yarn
yarn install:backend

# Start frontend development server only
yarn dev

# Start backend development server only
yarn dev:backend

# Start both frontend and backend development servers
yarn dev:full
```

Alternatively, use a different package manager like `npm` or `pnpm`.

## Production

To build and run the application for production:

```bash
# Build both frontend and backend
yarn build:full

# Start the production server
yarn start
```

The backend will serve the static frontend files from the `dist` directory and provide API endpoints at `/api/*`.

## Uses

- [Vite](https://vitejs.dev/guide/) - [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [SWC](https://swc.rs/)
- [Tailwind CSS](https://tailwindcss.com/docs/guides/vite)
- [Unleash Proxy Client (React)](https://github.com/Unleash/proxy-client-react)
