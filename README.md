## trackportfol.io

[Slack](https://lynchyworkspace.slack.com/)
| [Confluence](https://lynchy.atlassian.net/wiki/spaces/PT/overview/)
| [JIRA](https://lynchy.atlassian.net/browse/PT)

### Made with

<img src="https://cdn.svgporn.com/logos/react.svg" alt="React" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/typescript-icon.svg" alt="TypeScript" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/graphql.svg" alt="Graph QL" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/postgresql.svg" alt="PostgreSQL" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/docker-icon.svg" alt="Docker" width="50" height="50">

**React** | **TypeScript** | **GraphQL** | **PostgreSQL** | **Docker**

### Setup Local Frontend Environment

Prerequisites: **Git**, **Docker** and **docker-compose** (or **Yarn** if you prefer)

1) Clone Repo: `git clone https://github.com/LynchyNZ/trackportfol.io.git`

##### Using Docker
2) Run one of the following commands for a local dockerised client:
- Dev mode (live reload): `docker-compose -f docker-compose.client.dev.yml up -d`
- Production mode (uses yarn build with an nginx server): `docker-compose -f docker-compose.client.prod.yml up -d`

3) View app at [http://localhost:3001/](http://localhost:3001/) (Dev) or [http://localhost:1337/](http://localhost:1337/) (Prod)

##### Using Yarn
2) Run one of the following commands for a local client:
- Dev mode (live reload) `yarn start` in client folder

3) View at [http://localhost:3000](http://localhost:3000)

You can run `yarn build` in the `client` folder to build and bundle client for production. (optimised and minified for best performance)

### Configuring Frontend

You can specify which backend your local client uses by setting `NEXT_PUBLIC_SERVER_URL` in the appropriate environment file (`client/.env` for production builds, `client/.env.development` for development builds)
  - Local backend (if you have one running, see below): `http://localhost:5433/graphql`
  - Production backend: ` https://trackportfol.io/api`
  
### Testing

Run `yarn test` to start the test runner in interactive watch mode.

### Local Backend

If you want a local API running, you'll need to configure the .env file and decrypt the DB schema files *(Message Lynchy on [Slack](https://lynchyworkspace.slack.com/) for help with this)*

You'll then be able to run the backend using Docker, this will create two containers (one for DB, one for GraphQL):
`docker-compose -f docker-compose.backend.yml up -d`

- GraphiQL Tool: [http://localhost:5433/graphiql](http://localhost:5433/graphiql)
- GraphQL API: [http://localhost:5433/graphql](http://localhost:5433/graphql)


If you make changes to the database schema and need to re-initialise the database, run the following commands:
1) `docker-compose -f docker-compose.backend.yml down`
2) `docker rmi db`
3) `docker-compose -f docker-compose.backend.yml up -d`
