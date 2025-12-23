pipeline {
    agent any

    environment {
        IMAGE_NAME = "shaikh8828/jenkins-cicd-app"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKER_PASS')]) {
                    sh '''
                    docker login -u shaikh8828 -p $DOCKER_PASS
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
