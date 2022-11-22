FROM node:15.13-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --production
CMD ["npm", "start"]
