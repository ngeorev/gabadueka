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
    // Secret text credential: docker.io/<username>
    REGISTRY   = credentials('docker-registry')
    IMAGE_NAME = 'portfolio-app'

    // SSH credential ID for connecting to the web server
    SSH_CRED   = 'web-server-ssh'

    // Compose project directory on the server
    REMOTE_DIR = '/opt/portfolio_site'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Set Build Vars') {
      steps {
        script {
          env.COMMIT_HASH = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          env.IMAGE_TAG   = "${env.REGISTRY}/${env.IMAGE_NAME}:${env.COMMIT_HASH}"
          echo "IMAGE_TAG=${env.IMAGE_TAG}"
        }
      }
    }

    stage('Run Unit Tests') {
      agent {
        docker {
          image 'python:3.12-slim'
          args '-u root:root'
        }
      }
      steps {
        sh 'python -V'
        sh 'pip install -r app/requirements.txt pytest'
        sh 'PYTHONPATH="$WORKSPACE" pytest -q tests'
      }
    }

    stage('Build Image') {
      steps {
        // Use shell variables to avoid Groovy interpolation of secrets
        sh '''#!/bin/bash -e
          docker build -t "$IMAGE_TAG" -f app/Dockerfile app
        '''
      }
    }

    stage('Push Image') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-credentials',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''#!/bin/bash -e
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push "$IMAGE_TAG"
          '''
        }
      }
    }

    stage('Deploy') {
      steps {
        // No ssh-agent, no ssh-add, no libcrypto issues
        withCredentials([sshUserPrivateKey(
          credentialsId: 'web-server-ssh',
          keyFileVariable: 'SSH_KEY',
          usernameVariable: 'SSH_USER'
        )]) {
          sh '''#!/bin/bash -e
            ssh -i "$SSH_KEY" \
                -o StrictHostKeyChecking=no \
                "$SSH_USER@$SERVER_HOST" \
                "cd '$REMOTE_DIR' && git pull && docker compose pull && docker compose up -d"
          '''
        }
      }
    }
  }
}
