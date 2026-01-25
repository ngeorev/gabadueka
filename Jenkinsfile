pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build and Deploy') {
            steps {
                script {
                    // Build the image
                    sh 'docker build -t gabadueka/gabadueka:latest .'
                    
                    // Deploy (simplified - adjust for your setup)
                    sh '''
                        echo "Deploying application..."
                        docker compose down
                        docker compose up -d --build
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
