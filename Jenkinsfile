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
                        sh 'cat /usr/src/app/index.js'
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
        stage('DeployToServer') {
            when {
                branch 'main'
            }
            steps {
                input 'Deploy to Production?'
                milestone(1)
                sshagent(credentials: ['AWS_NODE_1']) {
                    script{
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@$IP_NODE_1 \"docker pull fouzo09/crud-node-api:${env.BUILD_NUMBER}\""
                        try {
                            sh "ssh -o StrictHostKeyChecking=no ubuntu@$IP_NODE_1 \"docker stop crud-node-api\""
                            sh "ssh -o StrictHostKeyChecking=no ubuntu@$IP_NODE_1 \"docker rm crud-node-api\""
                        } catch (err) {
                            echo: 'caught error: $err'
                        }
                        sh "ssh -o StrictHostKeyChecking=no ubuntu@$IP_NODE_1 \"docker run --restart always --name crud-node-api -p 4040:4040 -d fouzo09/crud-node-api:${env.BUILD_NUMBER}\""
                    }
                    
                }
            }
        }
    }   
}
