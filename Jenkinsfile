/*
 * Jenkins declarative pipeline for building and deploying the portfolio web site.
 *
 * The pipeline includes stages for running unit tests, building the Docker image,
 * pushing the image to Docker Hub, and deploying to the web server via SSH.
 * Secrets such as Docker Hub credentials and SSH keys should be stored in the
 * Jenkins credentials store.  The pipeline uses environment variables defined
 * in the Jenkins job (e.g., REGISTRY, IMAGE_NAME, SERVER_HOST, SERVER_USER).
 */

pipeline {
    agent any

    environment {
        // Docker Hub registry (e.g., docker.io/<username>)
        REGISTRY = credentials('docker-registry')
        // Name of the Docker image (without tag)
        IMAGE_NAME = 'portfolio-app'
        // SSH credential ID for connecting to the web server
        SSH_CRED = 'web-server-ssh'
        // Compose project directory on the server
        REMOTE_DIR = '/opt/portfolio_site'
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

        stage('Run Unit Tests') {
            steps {
                // Use a Python container to install dependencies and run tests
                docker.image('python:3.12-slim').inside {
                    sh 'pip install -r app/requirements.txt pytest'
                    sh 'pytest -q tests'
                }
            }
        }

        stage('Build Image') {
            steps {
                script {
                    // Build the application image; the context is the app directory
                    sh "docker build -t ${IMAGE_TAG} -f app/Dockerfile app"
                }
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                // Use the SSH agent plugin to connect to the web server
                sshagent(credentials: [SSH_CRED]) {
                    sh "ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} 'cd ${REMOTE_DIR} && git pull && docker-compose pull && docker-compose up -d'"
                }
            }
        }
    }
}
