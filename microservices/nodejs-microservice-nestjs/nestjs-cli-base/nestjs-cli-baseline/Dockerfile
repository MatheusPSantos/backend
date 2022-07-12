FROM node:12-buster-slim
AGR GITLAB_ACCESS_TOKEN
WORKDIR /app
COPY package.json package-lock.json /app
COPY .npmrc /app/.npmrc
RUN npm install && \
    rm -rf /tmp/* /var/tmp/*
COPY ./docker-utils/entrypoint/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY ./app
RUN npm run build
EXPOSE 3000
USER node
