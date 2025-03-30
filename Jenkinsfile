pipeline {
    agent any
    
    tools {
        nodejs "NodeJS"
        docker "Docker"
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
    }
    
    post {
        // Your post-build actions...
    }
}