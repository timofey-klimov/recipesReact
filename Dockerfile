FROM node:15.13-alpine
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
