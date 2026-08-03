# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Valores de build são placeholder; em produção o runtime (env.js + sed) prevalece.
ARG VITE_SITE_URL=__VITE_SITE_URL__
ENV VITE_SITE_URL=$VITE_SITE_URL

RUN npm run build

FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache gettext

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /docker/nginx.conf
COPY docker/env.template.js /docker/env.template.js
COPY docker/docker-entrypoint.sh /docker/docker-entrypoint.sh
COPY --from=build /app/dist /usr/share/nginx/html

RUN chmod +x /docker/docker-entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/api/health | grep -q ok || exit 1

ENTRYPOINT ["/docker/docker-entrypoint.sh"]
