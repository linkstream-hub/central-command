# Sentinel Health — APT Central Command
# Lightweight Node process that pings the DashboardAPI every 5 minutes and
# POSTs a heartbeat/alert to a webhook if the endpoint goes down.

FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY index.js .
CMD ["node", "index.js"]
