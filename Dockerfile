FROM nginx:latest
ADD ./dist /root/nuxt-demo
ADD ./nginx/conf.d /etc/nginx/conf.d
EXPOSE 80