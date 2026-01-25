FROM nginx:alpine

RUN apk add --no-cache php php-fpm php-mysqli php-json

RUN mkdir -p /run/nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /var/www/html

RUN sed -i 's|;listen = 127.0.0.1:9000|listen = 9000|' /etc/php*/php-fpm.d/www.conf

EXPOSE 80

CMD php-fpm & nginx -g "daemon off;"
