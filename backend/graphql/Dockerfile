FROM node:alpine
LABEL description="GraphQL API for PostgreSQL database"

RUN npm install -g postgraphile
RUN npm install -g postgraphile-plugin-connection-filter

EXPOSE 5433
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]