FROM nginx:alpine

# Copy site files to SAME path nginx.conf expects
COPY . /var/www/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
