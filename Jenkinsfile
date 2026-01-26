pipeline {
    agent any

    environment {
        IMAGE_NAME = 'gabadueka'
        SSH_CRED = 'web-server-ssh'
        SSH_HOST_CRED = 'host'
        SSH_USER_CRED = 'User'
        REMOTE_DIR = "${env.REMOTE_DIR}" // use the pipeline environment variable
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
                    // Short commit hash
                    env.COMMIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                }
            }
        }

        stage('Build & Push Image') {
            steps {
                withCredentials([
                    string(credentialsId: 'docker-registry', variable: 'REGISTRY'),
                    usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
                ]) {
                    script {
                        env.IMAGE_TAG = "${REGISTRY}/${IMAGE_NAME}:${COMMIT_HASH}"

                        // Build Docker image
                        sh "docker build -t '${IMAGE_TAG}' -f Dockerfile ."

                        // Login & push to Docker Hub
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh "docker push '${IMAGE_TAG}'"
                    }
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
                            'cd \$REMOTE_DIR && docker-compose pull && docker-compose up -d'
                        """
                    }
                }
            }
        }
    }
}
