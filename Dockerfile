FROM node:16.15-alpine As development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16.15-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000

CMD ["yarn", "docker:prod"]