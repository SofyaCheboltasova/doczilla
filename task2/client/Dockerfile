FROM node:18
WORKDIR /app
COPY client/package*.json /app/
RUN npm install
COPY client /app
EXPOSE 3000
CMD ["npm", "start"]
