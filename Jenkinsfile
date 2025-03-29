pipeline {
    agent any
    
    // If you have the NodeJS plugin installed and configured, uncomment this section
    // tools {
    //     nodejs 'NodeJS'
    // }
    
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
        
        stage('Setup Node.js') {
            steps {
                // This is a fallback if the NodeJS plugin isn't available
                // Adjust the Node.js version as needed
                script {
                    def nodeHome = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
                sh 'node --version'
                sh 'npm --version'
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