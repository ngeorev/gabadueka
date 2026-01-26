pipeline {
  agent any

  environment {
    // Docker Hub username (Secret Text credential)
    REGISTRY   = credentials('docker-registry')
    IMAGE_NAME = 'gabadueka'
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
          env.COMMIT_HASH = sh(
            script: 'git rev-parse --short HEAD',
            returnStdout: true
          ).trim()

          env.IMAGE_TAG = "${REGISTRY}/${IMAGE_NAME}:${COMMIT_HASH}"

          sh '''#!/bin/bash -e
            docker build -t "$IMAGE_TAG" .
          '''
        }
      }
    }

    stage('Push Image') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'docker-credentials',
          usernameVariable: 'DH_USER',
          passwordVariable: 'DH_PASS'
        )]) {
          sh '''#!/bin/bash -e
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
            docker push "$IMAGE_TAG"
          '''
        }
      }
    }

    stage('Deploy') {
      steps {
        withFolderProperties {

          script {
            if (!env.SERVER_HOST?.trim()) {
              error("SERVER_HOST is missing (Folder Properties)")
            }
            if (!env.REMOTE_DIR?.trim()) {
              error("REMOTE_DIR is missing (Folder Properties)")
            }
            echo "Deploying to ${env.SERVER_HOST}:${env.REMOTE_DIR}"
          }

          withCredentials([sshUserPrivateKey(
            credentialsId: 'web-server-ssh',
            keyFileVariable: 'SSH_KEY',
            usernameVariable: 'SSH_USER'
          )]) {

            sh '''#!/bin/bash -e
              ssh -i "$SSH_KEY" \
                -o BatchMode=yes \
                -o StrictHostKeyChecking=no \
                -o UserKnownHostsFile=/dev/null \
                "$SSH_USER@$SERVER_HOST" \
                "cd '$REMOTE_DIR' && docker compose pull && docker compose up -d"
            '''
          }
        }
      }
    }
  }
}
