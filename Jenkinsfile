// In the Deploy stage, change to:
stage('Deploy') {
    steps {
        sshagent(credentials: [SSH_CRED]) {
            sh """
            ssh -o StrictHostKeyChecking=no nik0@${SERVER_HOST} '
            cd ${REMOTE_DIR}
            
            # Check if nginx.conf exists, create if not
            if [ ! -f nginx.conf ]; then
                echo "Creating nginx.conf..."
                cat > nginx.conf << "NGINXCONF"
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    server {
        listen 80;
        server_name _;
        root /var/www/html;
        index index.html;
        
        location / {
            try_files \$uri \$uri/ =404;
        }
    }
}
NGINXCONF
            fi
            
            # Pull images and restart
            docker compose pull
            docker compose down
            docker compose up -d --build
            '
            """
        }
    }
}
