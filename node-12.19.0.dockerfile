FROM node:12-slim
WORKDIR /app
COPY ./ /app/
RUN apt-get update && \
    npm install && \
    apt-get clean && \
    rm -rf /var/lib/apt/list/*
RUN npm run build && \
    rm -rf src
EXPOSE 3000
CMD [ "node", "dist/index.js" ]
