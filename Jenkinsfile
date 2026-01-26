pipeline {
    agent any

    environment {
        // Docker image name
        IMAGE_NAME = 'gabadueka'
        // SSH credential ID for connecting to the web server
        SSH_CRED = 'web-server-ssh'
        // Docker registry credential ID (used with withCredentials)
        DOCKER_CRED = 'docker-credentials'
        // Docker Hub registry (e.g., docker.io/<username>)
        REGISTRY = credentials('docker-registry')
        // Host and user secrets
        SSH_HOST_CRED = 'host'
        SSH_USER_CRED = 'User'
        // Tag for the image; using the Git commit SHA provides traceability
        COMMIT_HASH = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
        IMAGE_TAG = "${REGISTRY}/${IMAGE_NAME}:${COMMIT_HASH}"
        
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
                            'cd ${REMOTE_DIR} && git pull && docker-compose pull && docker-compose up -d'
                        """
                    }
                }
            }
        }
    }
}
