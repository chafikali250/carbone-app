FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Remplacer npm ci par npm install
RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
