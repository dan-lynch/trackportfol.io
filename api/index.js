const express = require("express")
const compression = require('compression')
const helmet = require('helmet')
const { postgraphile, makePluginHook } = require("postgraphile")
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const SubscriptionsPlugin = require("./SubscriptionsPlugin"); 
const { default: PgPubSub } = require("@graphile/pg-pubsub");

const app = express()

const pubSubHook = makePluginHook([PgPubSub]);

app.use(helmet())

app.use(compression())

app.use(
  postgraphile(
    process.env.DATABASE_URL,
    "public",
    {
    pubSubHook,
    appendPlugins: [ConnectionFilterPlugin, SubscriptionsPlugin],
    subscriptions: true,
    retryOnInitFail: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    graphiql: false, // only set to true for local development
    enhanceGraphiql: true,
    pgDefaultRole: process.env.DEFAULT_ROLE,
    jwtSecret: process.env.JWT_SECRET,
    jwtPgTypeIdentifier: 'public.jwt_token',
    enableCors: 'true'
    }
  )
)

app.listen(process.env.PORT || 5433)