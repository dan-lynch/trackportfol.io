const { makeExtendSchemaPlugin, gql, embed } = require("graphile-utils");
const { PubSub } = require("graphql-subscriptions");

const pubSub = new PubSub();
let count = 0;
function emit() {
  count++;
  console.log('emit called');
  pubSub.publish('eventName', count);
  setTimeout(() => {
    emit();
  }, 1000);
}
emit();

const currentUserTopicFromContext = (_args, context, _resolveInfo) => {
  if (context.jwtClaims.user_id) {
    return `graphql:user:${context.jwtClaims.user_id}`;
  } else {
    throw new Error("You're not logged in");
  }
};

module.exports = makeExtendSchemaPlugin(({ pgSql: sql }) => ({
  typeDefs: gql`
    type UserSubscriptionPayload {
      user: User
      event: String
    }

    extend type Subscription {
      currentUserUpdated: UserSubscriptionPayload @pgSubscription(topic: ${embed(
        currentUserTopicFromContext
      )})
    }

    extend type Subscription {
      testSubscription: Int
    }
  `,

  resolvers: {
    UserSubscriptionPayload: {
      async user(
        event,
        _args,
        _context,
        { graphile: { selectGraphQLResultFromTable } }
      ) {
        const rows = await selectGraphQLResultFromTable(
          sql.fragment`public.user`,
          (tableAlias, sqlBuilder) => {
            sqlBuilder.where(
              sql.fragment`${tableAlias}.id = ${sql.value(event.subject)}`
            );
          }
        );
        return rows[0];
      },
    },
    Subscription: {
      testSubscription: {
        subscribe: () => pubSub.asyncIterator('eventName'),
        resolve: d => {
          console.log(d);
          return d;
        },
      },
      currentUserUpdated: {
        subscribe: (event) => pubSub.asyncIterator('eventName'),
        resolve: d => {
          console.log(d);
          return d;
        },
      },
    },
  },
}));