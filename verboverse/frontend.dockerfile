FROM --platform=linux/amd64 node:lts-slim as build

RUN mkdir -p /app
WORKDIR /app
COPY ./frontend /app
COPY ./package*.json /app
# COPY ./package-lock.json /app
# COPY ./.env /app
RUN apt-get update && \
    apt-get install -y libssl-dev
RUN npm install -g npm@latest
RUN npm install --silent
RUN npm cache clean --force
RUN npm run-script build --silent

FROM --platform=linux/amd64 node:lts-slim as main
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
CMD ["npm","start"]
