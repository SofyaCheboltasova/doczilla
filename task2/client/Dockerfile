FROM node:18
WORKDIR /app
COPY task2/client/package*.json /app/
RUN npm install
COPY task2/client /app
CMD ["npm", "start"]
