## trackportfol.io

[Slack](https://join.slack.com/t/trackportfolio/shared_invite/zt-f9u10eup-d0uku08b85DKQRhCMOV_Kw)
| [JIRA](https://lynchy.atlassian.net/browse/PT)

### Made with

<img src="https://cdn.svgporn.com/logos/nextjs.svg" alt="Next.js" width="83" height="50">  <img src="https://cdn.svgporn.com/logos/graphql.svg" alt="Graph QL" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/postgresql.svg" alt="PostgreSQL" width="50" height="50"> <img src="https://cdn.svgporn.com/logos/docker-icon.svg" alt="Docker" width="50" height="50">

**Next.js** | **GraphQL** | **PostgreSQL** | **Docker**

### Setup Local Client

*Prerequisites:* **Git**, **Yarn**

1) *Clone repo:* `git clone https://github.com/dan-lynch/trackportfol.io.git`

2) *Install dependencies:* Run `yarn` inside of the client folder

3) *Choose one the following:*
- Dev mode (slowest, but has *live reload*): Run `yarn dev`
- Prod mode (fastest, but no *live reload*): Run `yarn build`, then `yarn start`

You can specify which **API** your local client uses by setting `NEXT_PUBLIC_SERVER_URL` in the appropriate environment file (`client/.env` for production builds, `client/.env.development` for development builds)
  - Local API (if you have one running, see below): `http://localhost:5433/graphql`
  - Production API: ` https://trackportfol.io/api`

### Setup Local API

*Prerequisites*: **Docker**, **docker-compose**

If you want a local **API** and **DB** running, you'll first need access to some protected files. Please message *Dan* on [Slack](https://join.slack.com/t/trackportfolio/shared_invite/zt-f9u10eup-d0uku08b85DKQRhCMOV_Kw) to get set up.

You'll then be able to start the backend services using Docker:

1) Run DB: `docker-compose -f docker-compose.db.yml up -d --build`
2) Run API: `docker-compose -f docker-compose.api.yml up -d --build`

- GraphiQL Tool: [http://localhost:5433/graphiql](http://localhost:5433/graphiql)
- GraphQL API: [http://localhost:5433/graphql](http://localhost:5433/graphql)


If you make changes to the database schema and need to re-initialise the database, run the following commands:
1) `docker-compose -f docker-compose.db.yml down`
2) `docker rmi db`
3) `docker volume prune`
4) `docker-compose -f docker-compose.db.yml up -d --build`

### Local Docker Client

Run one of the following commands for a local dockerised client:
- Dev mode (live reload): `docker-compose -f docker-compose.client.dev.yml up -d`
- Production mode (uses yarn build with an nginx server): `docker-compose -f docker-compose.client.prod.yml up -d`

3) View app at [http://localhost:3001/](http://localhost:3001/) (Dev) or [http://localhost:3000/](http://localhost:3000/) (Prod)
