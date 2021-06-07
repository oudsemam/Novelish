FROM nginx:alpine
RUN mkdir /var/www
COPY dist/Novelish/* /var/www/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]