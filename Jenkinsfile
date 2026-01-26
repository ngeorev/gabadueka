pipeline {
    agent any

    environment {
        IMAGE_NAME = 'gabadueka'
        SSH_CRED = 'web-server-ssh'
        REGISTRY = credentials('docker-registry')
        SSH_HOST_CRED = 'host'
        SSH_USER_CRED = 'User'
        REMOTE_DIR = '/opt/portfolio_site'
        // DOCKER_CRED is in Credentials Manager and will be used in withCredentials
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
                    COMMIT_HASH = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    IMAGE_TAG = "${REGISTRY}/${IMAGE_NAME}:${COMMIT_HASH}"
                    sh "docker build -t '${IMAGE_TAG}' -f Dockerfile ."
                }
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push '${IMAGE_TAG}'"
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'host', variable: 'SSH_HOST'),
                    string(credentialsId: 'User', variable: 'SSH_USER')
                ]) {
                    sshagent([SSH_CRED]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no \$SSH_USER@\$SSH_HOST \
                            'cd \${REMOTE_DIR} && git pull && docker-compose pull && docker-compose up -d'
                        """
                    }
                }
            }
        }
    }
}
