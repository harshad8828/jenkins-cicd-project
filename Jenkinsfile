pipeline {
    agent any

    stages {

        stage('Build, Push and Deploy Docker Image') {
            steps {
                // Get Docker Hub credentials
                withCredentials([usernamePassword(credentialsId: 'dockerhub-pass', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        // Set image name dynamically
                        IMAGE_NAME = "${DOCKER_USER}/jenkins-cicd-app"

                        // Build Docker image
                        sh "docker build -t $IMAGE_NAME:latest ."

                        // Login to Docker Hub
                        sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"

                        // Push image to Docker Hub
                        sh "docker push $IMAGE_NAME:latest"

                        // Stop and remove old container if exists
                        sh "docker stop cicd-app || true"
                        sh "docker rm cicd-app || true"

                        // Run new container
                        sh "docker run -d -p 3000:3000 --name cicd-app $IMAGE_NAME:latest"
                    }
                }
            }
        }
    }
}
