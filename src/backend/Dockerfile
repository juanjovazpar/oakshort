FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .
COPY ../shared /app/src/shared

# RUN npm run build

EXPOSE ${PORT_BE}

ENV NODE_ENV=production

CMD ["npm", "start"]
