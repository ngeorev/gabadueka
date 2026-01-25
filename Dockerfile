# Use official Nginx image
FROM nginx:alpine

# Copy website files to Nginx's html directory
COPY . /usr/share/nginx/html

# Create a directory for the quiz PHP file (if you want to handle it differently)
RUN mkdir -p /usr/share/nginx/html

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
