pipeline {
    agent {
        docker {
            image 'node:16-alpine' // Use Node.js image for building Vue
            args '-p 3000:3000' // Map port for development server
        }
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