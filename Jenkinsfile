pipeline {
    agent {
        docker {
            image 'node:16-alpine' // Use Node.js image for building Vue
            args '-p 3000:3000' // Map port for development server
        }
    }
    
    environment {
        // Define environment variables
        NODE_ENV = 'production'
        VUE_APP_API_URL = 'http://127.0.0.1:32504/api'
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Use npm ci for clean installs in CI environments
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm run test:unit'
            }
        }
        
        stage('Configure Environment') {
            steps {
                // Create a .env.production.local file that will override the default .env.production
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
                // Archive the built artifacts
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}