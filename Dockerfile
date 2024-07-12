# Build stage
FROM node:18-alpine AS build-stage
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env* ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
COPY . .

# Development stage
FROM build-stage AS development-stage
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production stage
FROM node:18-alpine AS production-stage
WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/app ./
EXPOSE 3000
CMD ["node", "src/index.js"]
