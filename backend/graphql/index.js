const express = require("express")
const compression = require('compression')
const helmet = require('helmet')
const { postgraphile } = require("postgraphile")
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");

const app = express()

app.use(helmet())

app.use(compression())

app.use(
  postgraphile(
    process.env.DATABASE_URL,
    "public",
    {
    appendPlugins: [ConnectionFilterPlugin],
    subscriptions: true,
    retryOnInitFail: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    graphiql: true,
    enhanceGraphiql: true,
    pgDefaultRole: process.env.DEFAULT_ROLE,
    jwtSecret: process.env.JWT_SECRET,
    jwtPgTypeIdentifier: 'public.jwt_token',
    enableCors: 'true'
    }
  )
)

app.listen(process.env.PORT || 5433)