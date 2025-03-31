# Step-by-Step Setup Guide for TOUR-FRONTEND

This document outlines all the steps we took to set up the CI/CD pipeline for the Vue.js frontend application.

## 1. Initial Project Setup

### Create Vue.js Project
```bash
npm install -g @vue/cli
vue create tour-frontend
cd tour-frontend
```

### Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Vue project setup"
git remote add origin https://github.com/yourusername/tour-frontend.git
git push -u origin main
```

## 2. Jenkins Setup

### Set up Jenkins in Docker
```bash
docker run -d -p 8080:8080 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkins/jenkins:lts
```

### Install Required Jenkins Plugins
- Pipeline
- Git
- NodeJS
- Docker Tools

### Configure Tools in Jenkins
1. Go to "Manage Jenkins" > "Global Tool Configuration"
2. Add NodeJS installation:
   - Name: "NodeJS"
   - Install automatically: Checked
   - Version: Select an LTS version
3. Add Docker installation:
   - Name: "Docker"
   - Installation root: `/usr/bin`

## 3. Create Required Files

### Jenkinsfile
Create a Jenkinsfile in the root of your repository:

```groovy
pipeline {
    agent any
    
    tools {
        nodejs "NodeJS"
        dockerTool "Docker"
    }
    
    environment {
        VUE_APP_API_URL = 'http://127.0.0.1:32504/api'
        VUE_APP_ENV = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Check Tools') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'docker --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
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
                sh 'docker build -t tour-frontend:latest .'
                sh 'docker stop tour-frontend || true'
                sh 'docker rm tour-frontend || true'
                sh 'docker run -d -p 32505:80 --name tour-frontend tour-frontend:latest'
                echo 'Deployed to webapp.idilia.dscloud.me:32505'
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
```

### Dockerfile
Create a Dockerfile in the root of your repository:

```dockerfile
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/

# Copy built files from dist to nginx html directory
COPY dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
Create an nginx.conf file in the root of your repository:

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # redirect server error pages to the static page /50x.html
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### Environment Files
Create environment configuration files:

`.env.development`:
```
VUE_APP_API_URL=http://localhost:8080/api
VUE_APP_ENV=development
```

`.env.production`:
```
VUE_APP_API_URL=http://localhost:8080/api
VUE_APP_ENV=production
```

## 4. Infrastructure Setup Steps

### Install Docker CLI in Jenkins Container
```bash
docker exec -it -u root jenkins bash

# Inside container
apt-get update
apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce-cli
```

### Fix Docker Socket Permissions
```bash
# On host: Find Docker group ID
stat -c '%g' /var/run/docker.sock

# Connect to Jenkins container as root
docker exec -it -u root jenkins bash

# Inside container: Add group with same GID (replace 998 with your GID)
groupadd -g 998 docker_host
usermod -aG docker_host jenkins

# Exit and restart Jenkins
exit
docker restart jenkins
```

### Set up Reverse Proxy (Nginx example)
On your host or proxy server:

```nginx
server {
    listen 443 ssl;
    server_name webapp.idilia.dscloud.me;
    
    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://192.168.178.157:32505;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Optional: HSTS header for improved security
    # add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

## 5. Create Jenkins Pipeline Job

1. Open Jenkins
2. Click "New Item"
3. Enter a name (e.g., "Tour-Frontend")
4. Select "Pipeline"
5. Click "OK"
6. In the configuration:
   - Under "Pipeline", select "Pipeline script from SCM"
   - Set SCM to "Git"
   - Enter repository URL
   - Set branch to "*/main"
   - Save

## 6. Run the Pipeline

1. Open the Jenkins job
2. Click "Build Now"
3. Monitor the build process
4. Once completed, access your application at https://webapp.idilia.dscloud.me

## Troubleshooting

### Common Issues:
1. **Permission denied for Docker socket**:
   - Check group ownership of /var/run/docker.sock
   - Verify Jenkins user is in the correct group

2. **npm/node command not found**:
   - Check NodeJS Tool configuration in Jenkins
   - Verify node installation path

3. **Build fails but no clear error**:
   - Check console output for specific error messages
   - Temporarily modify Jenkinsfile to add debug commands

4. **Container starts but application not accessible**:
   - Check Docker container logs: `docker logs tour-frontend`
   - Verify port mapping is correct
   - Check reverse proxy configuration