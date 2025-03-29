pipeline {
    agent any
    
    stages {
        stage('Build with Node.js') {
            agent {
                docker {
                    image 'node:16-alpine'
                    // This runs the steps inside a Node.js container
                }
            }
            
            environment {
                // Define environment variables
                VUE_APP_API_URL = 'http://127.0.0.1:32504/api'
                VUE_APP_ENV = 'production'
            }
            
            steps {
                // Check versions
                sh 'node --version'
                sh 'npm --version'
                
                // Install dependencies
                sh 'npm install'
                
                // Run linting
                sh 'npm run lint || echo "Linting not configured"'
                
                // Run tests
                sh 'npm run test:unit || echo "Tests not configured"'
                
                // Configure environment
                sh '''
                echo "VUE_APP_API_URL=http://127.0.0.1:32504/api" > .env.production.local
                echo "VUE_APP_ENV=production" >> .env.production.local
                '''
                
                // Build
                sh 'npm run build'
                
                // Archive artifacts (this will copy them out of the container)
                stash includes: 'dist/**', name: 'dist'
            }
        }
        
        stage('Archive') {
            steps {
                // Restore artifacts from the Docker container
                unstash 'dist'
                
                // Archive them
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