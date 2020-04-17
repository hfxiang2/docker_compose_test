FROM node:latest
COPY . /app
WORKDIR /app
RUN yarn
EXPOSE 3000
CMD yarn build && yarn start
