pipeline {
    agent any

    stages {
        stage('Build, Push and Deploy') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-pass',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                        IMAGE_NAME="$DOCKER_USER/jenkins-cicd-app"

                        echo "Using image: $IMAGE_NAME"

                        docker build -t $IMAGE_NAME:latest .
                        docker login -u $DOCKER_USER -p $DOCKER_PASS
                        docker push $IMAGE_NAME:latest

                        docker stop cicd-app || true
                        docker rm cicd-app || true
                        docker run -d -p 3000:3000 --name cicd-app $IMAGE_NAME:latest
                    '''
                }
            }
        }
    }
}
