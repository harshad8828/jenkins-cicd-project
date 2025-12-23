pipeline {
    agent any

    stages {
        stage('Build, Push and Deploy') {
            steps {
                sh '''
                    IMAGE_NAME="shaikh8828/jenkins-cicd-app"

                    docker build -t $IMAGE_NAME:latest .
                    docker push $IMAGE_NAME:latest

                    docker stop cicd-app || true
                    docker rm cicd-app || true
                    docker run -d -p 3000:3000 --name cicd-app $IMAGE_NAME:latest
                '''
            }
        }
    }
}
