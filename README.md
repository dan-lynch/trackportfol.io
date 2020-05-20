## trackportfol.io

### Project Links

- [Slack](https://lynchyworkspace.slack.com/)
- [Confluence](https://lynchy.atlassian.net/wiki/spaces/PT/overview/)
- [JIRA](https://lynchy.atlassian.net/browse/PT)
- [Support](https://lynchy.atlassian.net/servicedesk)
- [Status page](https://lynchy.statuspage.io/)

### Project Stack

- React (with TypeScript)
- GraphQL
- Postgraphile
- Docker

### Setup Local Environment

Prerequisites: Git and Docker or Yarn (if you don't want to run as Docker container)

1) Clone Repo:
- `git clone https://github.com/LynchyNZ/trackportfol.io.git`

Docker:
2) Docker: Run the following commands for a local dockerised client:
- Dev (live reload): `docker-compose -f docker-compose.client.dev.yml up -d`
- Production mode: `docker-compose -f docker-compose.client.dev.yml up -d`
(you need to install docker and docker-compose if you don't have these already installed)


3) View app at [http://localhost:3001/](http://localhost:3001/) (Dev) or [http://localhost:1337/](http://localhost:1337/) (Prod)

[OPTIONAL] If you want a local API running, you'll need to configure the .env file and message Lynchy on [Slack](https://lynchyworkspace.slack.com/)) for DB schemas. Otherwise, just point client to https://trackportfol.io/api and the graphiQL tool at
[http://localhost:5433/graphiql](http://localhost:5433/graphiql) (if you have a local API running)

Yarn:
- `yarn start`
  Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. (will auto reload)

- `yarn test`
  Launches the test runner in the interactive watch mode.

- `yarn build`
  Builds and bundles the app for production to the `build` folder. (optimised and minified for best performance)

You can specify which backend your local client uses by setting `REACT_APP_SERVER_URL` in the .env file
  - Local backend (if you have one running): `http://localhost:5433/graphql`
  - Production backend: ` https://trackportfol.io/api`

### Frontend-specific Docker instructions

You can run the React app in a Docker container:

- Dev:
  `docker-compose -f docker-compose.client.dev.yml up -d`

  Builds the client in development mode (npm start)<br>
  Open [http://localhost:3001/](http://localhost:3001/) to view it in the browser

- Prod:
  `docker-compose -f docker-compose.client.prod.yml up -d`

  Builds the client in production mode (npm run build with an nginx server)
  Open [http://localhost:1337/](http://localhost:1337/) to view it in the browser

### Backend-specific Docker instructions

You can run the backend in Docker containers (one for DB, one for GraphQL):
`docker-compose -f docker-compose.backend.yml up -d`

If you make changes to the database schema and need to re-initialise the database, run the following commands:
1) `docker-compose down`
2) `docker volume rm server_db`
3) `docker rmi server_db`
4) `docker-compose up -d`

or

`docker-compose down;docker volume rm db;docker rmi db;docker-compose up -d`
