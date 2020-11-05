FROM node:12.19.0
WORKDIR /app
COPY . /app
RUN apt-get update && npm install
EXPOSE 80
CMD ["node", "src/index.js"]
