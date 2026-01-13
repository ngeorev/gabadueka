pipeline {
  agent any

  environment {
    // Docker Hub username stored as Secret Text credential (e.g. "nik0")
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
        sh '''#!/bin/bash -e
          docker build -t "$REGISTRY/$IMAGE_NAME:latest" .
        '''
      }
    }

    stage('Push Image') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-credentials',
          usernameVariable: 'DH_USER',
          passwordVariable: 'DH_PASS'
        )]) {
          sh '''#!/bin/bash -e
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
            docker push "$REGISTRY/$IMAGE_NAME:latest"
          '''
        }
      }
    }

    stage('Deploy') {
      steps {
        withFolderProperties {
          script {
            if (!env.SERVER_HOST?.trim()) {
              error("SERVER_HOST is empty. Set it in Folder Properties -> Property List (Name=SERVER_HOST).")
            }
            if (!env.REMOTE_DIR?.trim()) {
              error("REMOTE_DIR is empty. Set it in Folder Properties -> Property List (Name=REMOTE_DIR).")
            }
            echo "Deploy target: ${env.SERVER_HOST} | dir: ${env.REMOTE_DIR}"
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
