FROM --platform=linux/amd64 node:lts-slim as build

RUN mkdir -p /app
WORKDIR /app

RUN apt-get update \
    && apt-get install -y memcached \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 11211

CMD ["memcached","-u","memcache","-vv"]