FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY src/backend ./backend

COPY src/shared ./shared

WORKDIR /app/backend

RUN npm install --production

RUN npm run build

RUN mv dist/* /app/

RUN mv node_modules /app/

RUN rm -rf ./backend ./shared

WORKDIR /app

EXPOSE 80

CMD ["node", "./index.js"]
