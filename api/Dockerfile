# build environment
FROM node:14.4.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN yarn install --frozen-lockfile --silent
EXPOSE 5433
CMD ["node", "index.js"]