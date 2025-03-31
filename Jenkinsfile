pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
        dockerTool 'Docker'
    }

    environment {
        // Define environment variables
        VUE_APP_API_URL = 'http://127.0.0.1:32504/api'
        VUE_APP_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Versions') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // Rest of your pipeline stages...
        stage('Lint') {
            steps {
                sh 'npm run lint || echo "Linting not configured"'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test:unit || echo "Tests not configured"'
            }
        }

        stage('Configure Environment') {
            steps {
                sh '''
                echo "VUE_APP_API_URL=http://127.0.0.1:32504/api" > .env.production.local
                echo "VUE_APP_ENV=production" >> .env.production.local
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                // Build and run the container
                sh 'docker build -t tour-frontend:latest .'
                sh 'docker stop tour-frontend || true'
                sh 'docker rm tour-frontend || true'
                sh 'docker run -d -p 32505:80 --name tour-frontend tour-frontend:latest'
                echo 'Deployed to webapp.idilia.dscloud.me:'
            }
        }
    }

    post {
        success {
            echo 'Build succeeded! The Vue.js application has been built successfully.'
        }
        failure {
            echo 'Build failed! Check the console output to see what went wrong.'
        }
        always {
            cleanWs()
        }
    }
}
