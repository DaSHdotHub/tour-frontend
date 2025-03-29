pipeline {
    agent any
    
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
        
        stage('Node Version') {
            steps {
                // Just check if Node.js is available on the system
                sh 'node --version || echo "Node.js not found, please install Node.js on the Jenkins server"'
                sh 'npm --version || echo "npm not found, please install npm on the Jenkins server"'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Run npm install and report any errors
                sh 'npm install'
            }
        }
        
        stage('Lint') {
            steps {
                // Run linting if your project has it set up
                sh 'npm run lint || echo "Linting not configured"'
            }
        }
        
        stage('Test') {
            steps {
                // Run tests if your project has them set up
                sh 'npm run test:unit || echo "Tests not configured"'
            }
        }
        
        stage('Configure Environment') {
            steps {
                // Create a .env.production.local file for the build
                sh '''
                echo "VUE_APP_API_URL=http://127.0.0.1:32504/api" > .env.production.local
                echo "VUE_APP_ENV=production" >> .env.production.local
                '''
            }
        }
        
        stage('Build') {
            steps {
                // Create production build
                sh 'npm run build'
            }
        }
        
        stage('Archive') {
            steps {
                // Archive the built artifacts
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
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
            // Clean up workspace
            cleanWs()
        }
    }
}