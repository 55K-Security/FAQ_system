FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY mock-server.ts ./

EXPOSE 3000

CMD ["npx", "tsx", "mock-server.ts"]
