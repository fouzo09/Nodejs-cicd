pipeline {
    agent any
    stages {
        
        stage('Build Docker Image') {
            when {
                branch 'main'
            }
            steps {
                script {
                    app = docker.build("fouzo09/crud-node-api")
                    app.inside {
                        sh 'echo $(curl localhost:4040)'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_HUB') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
    }   
}