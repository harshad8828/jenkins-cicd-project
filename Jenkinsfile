pipeline {
    agent any

    environment {
        IMAGE_NAME = "${DOCKER_USER}/jenkins-cicd-app"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-pass', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        docker login -u $DOCKER_USER -p $DOCKER_PASS
                        docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker stop cicd-app || true
                    docker rm cicd-app || true
                    docker run -d -p 3000:3000 --name cicd-app $IMAGE_NAME:latest
                '''
            }
        }
    }
}
