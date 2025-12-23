pipeline {
    agent any

    environment {
        IMAGE_NAME = "yourdockerhubusername/jenkins-cicd-app"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/yourusername/jenkins-cicd-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKER_PASS')]) {
                    sh '''
                    docker login -u yourdockerhubusername -p $DOCKER_PASS
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
