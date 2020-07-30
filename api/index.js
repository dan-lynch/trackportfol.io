const express = require("express")
const compression = require('compression')
const helmet = require('helmet')
const { postgraphile, makePluginHook } = require("postgraphile")
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const SubscriptionsPlugin = require("@graphile/subscriptions-lds");

const app = express()

app.use(helmet())

app.use(compression())

app.use(
  postgraphile(
    process.env.DATABASE_URL,
    "tp_public",
    {
    ownerConnectionString: process.env.ROOT_DATABASE_URL,
    appendPlugins: [ConnectionFilterPlugin, SubscriptionsPlugin.default],
    live: true,
    retryOnInitFail: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    graphiql: false, // only set to true for local development
    enhanceGraphiql: true,
    pgDefaultRole: process.env.DEFAULT_ROLE,
    jwtSecret: process.env.JWT_SECRET,
    jwtPgTypeIdentifier: 'tp_public.jwt_token',
    enableCors: 'true'
    }
  )
)

app.listen(process.env.PORT || 5433)