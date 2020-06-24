const { makeExtendSchemaPlugin, gql, embed } = require("graphile-utils");

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
      # This is populated by our resolver below
      user: User

      # This is returned directly from the PostgreSQL subscription payload (JSON object)
      event: String
    }

    extend type Subscription {
      """
      Triggered when the current user's data changes:

      - direct modifications to the user
      - when their organization membership changes
      """
      currentUserUpdated: UserSubscriptionPayload @pgSubscription(topic: ${embed(
        currentUserTopicFromContext
      )})
    }
  `,

  resolvers: {
    UserSubscriptionPayload: {
      // This method finds the user from the database based on the event
      // published by PostgreSQL.
      //
      // In a future release, we hope to enable you to replace this entire
      // method with a small schema directive above, should you so desire. It's
      // mostly boilerplate.
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
  },
}));