pipeline {
    agent any

    environment {
        // Docker image name
        IMAGE_NAME = 'portfolio-app'
        // SSH credential ID for connecting to the web server
        SSH_CRED = 'web-server-ssh'
        // Compose project directory on the server
        REMOTE_DIR = '/opt/portfolio_site'
        // Docker registry credential ID (used with withCredentials)
        DOCKER_CRED = 'docker-credentials'
        // Docker registry (secret text)
        REGISTRY_CRED = 'docker-registry'
        // Host and user secrets
        SSH_HOST_CRED = 'host'
        SSH_USER_CRED = 'User'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare') {
            steps {
                script {
                    // Get the short commit hash
                    env.COMMIT_HASH = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    
                    // Get registry from Jenkins secret
                    env.REGISTRY = credentials('docker-registry')
                    
                    // Full image tag
                    env.IMAGE_TAG = "${env.REGISTRY}/${env.IMAGE_NAME}:${env.COMMIT_HASH}"
                }
            }
        }

        stage('Build Image') {
            steps {
                script {
                    sh """
                        docker build -t '${IMAGE_TAG}' -f Dockerfile .
                    """
                }
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_CRED, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push '${IMAGE_TAG}'"
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: SSH_HOST_CRED, variable: 'SSH_HOST'),
                    string(credentialsId: SSH_USER_CRED, variable: 'SSH_USER')
                ]) {
                    sshagent([SSH_CRED]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no \$SSH_USER@\$SSH_HOST \
                            'cd ${REMOTE_DIR} && docker-compose pull && docker-compose up -d'
                        """
                    }
                }
            }
        }
    }
}
