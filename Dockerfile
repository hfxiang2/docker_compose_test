FROM nginx:latest
COPY ./dist/ /usr/share/nginx/html/
COPY ./nginx/conf.d /etc/nginx/conf.d