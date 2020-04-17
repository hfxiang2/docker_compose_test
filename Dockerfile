FROM node:latest
COPY . /app
WORKDIR /app
RUN yarn
EXPOSE 3000