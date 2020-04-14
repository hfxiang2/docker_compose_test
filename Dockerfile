FROM nginx:latest
COPY ./dist/ /usr/share/nginx/html/
#COPY ./conf.d/conf.d /etc/nginx/conf.d