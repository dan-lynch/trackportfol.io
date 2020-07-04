# build environment
FROM node:14.5.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
COPY index.js ./
RUN yarn install --frozen-lockfile --silent
EXPOSE 5433
CMD ["node", "index.js"]