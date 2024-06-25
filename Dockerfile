FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY .env* ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
