## trackportfol.io

[Slack](https://lynchyworkspace.slack.com/)
| [Confluence](https://lynchy.atlassian.net/wiki/spaces/PT/overview/)
| [JIRA](https://lynchy.atlassian.net/browse/PT)
| [Support](https://lynchy.atlassian.net/servicedesk)
| [Status page](https://lynchy.statuspage.io/)

### Made with

<img src="https://cdn.svgporn.com/logos/react.svg" alt="React" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/typescript-icon.svg" alt="TypeScript" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/graphql.svg" alt="Graph QL" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/postgresql.svg" alt="PostgreSQL" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/docker-icon.svg" alt="Docker" width="50" height="50">

React | TypeScript | GraphQL | PostgreSQL | Docker

### Setup Local Environment

Prerequisites: Git, Docker and docker-compose (or Yarn if you prefer)

1) Clone Repo: `git clone https://github.com/LynchyNZ/trackportfol.io.git`

##### Using Docker
2) Run one of the following commands for a local dockerised client:
- Dev mode (live reload): `docker-compose -f docker-compose.client.dev.yml up -d`
- Production mode (uses yarn build with an nginx server): `docker-compose -f docker-compose.client.prod.yml up -d`

3) View app at [http://localhost:3001/](http://localhost:3001/) (Dev) or [http://localhost:1337/](http://localhost:1337/) (Prod)

##### Using Yarn
2) Run `yarn start` in client folder (Runs the app in development mode, will auto reload) 

3) View at [http://localhost:3000](http://localhost:3000)

### Testing

Run `yarn test` to start test runner in interactive watch mode.

### Non-Docker Build
Use `yarn build` in client folder to build and bundle client for production to the `build` folder. (optimised and minified for best performance)

### Configuring Frontend

You can specify which backend your local client uses by setting `REACT_APP_SERVER_URL` in the appropriate environment file.

In the client folder, you will find `.env` for production builds and `.env.development` for development builds
  - Local backend (if you have one running): `http://localhost:5433/graphql`
  - Production backend: ` https://trackportfol.io/api`

### Local Backend

If you want a local API running, you'll need to configure the .env file and decrypt the DB schema files (Message Lynchy on [Slack](https://lynchyworkspace.slack.com/) for help with this)

You can run the backend using Docker, this will create two containers (one for DB, one for GraphQL):
`docker-compose -f docker-compose.backend.yml up -d`

- GraphiQL Tool: [http://localhost:5433/graphiql](http://localhost:5433/graphiql)
- GraphQL API: [http://localhost:5433/graphql](http://localhost:5433/graphql)


If you make changes to the database schema and need to re-initialise the database, run the following commands:
1) `docker-compose down`
2) `docker volume rm db`
3) `docker rmi db`
4) `docker-compose up -d`

  (or `docker-compose down;docker volume rm db;docker rmi db;docker-compose up -d`)
