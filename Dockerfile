# Dockerfile
FROM nginx:alpine

# Install PHP and necessary extensions
RUN apk add --no-cache \
    php81 \
    php81-fpm \
    php81-mysqli \
    php81-pdo \
    php81-pdo_mysql \
    php81-session \
    php81-mbstring \
    php81-json \
    php81-openssl \
    php81-tokenizer \
    php81-xml \
    supervisor

# Create necessary directories
RUN mkdir -p /run/php && \
    mkdir -p /var/log/supervisor

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy PHP-FPM configuration
RUN echo 'listen = 127.0.0.1:9000' >> /etc/php81/php-fpm.d/www.conf && \
    echo 'clear_env = no' >> /etc/php81/php-fpm.d/www.conf

# Copy supervisord configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy website files
COPY . /usr/share/nginx/html/

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
