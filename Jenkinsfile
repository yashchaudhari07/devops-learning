pipeline {
    agent any

    environment {
        EC2_IP = "3.110.122.250"    // Replace with your EC2 IP
        SSH_KEY = "98908277"        // Jenkins SSH credentials ID
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/yashchaudhari07/devops-learning.git'
            }
        }

        stage('Build React App') {
            steps {
                dir('react-app') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy HTML') {
            steps {
                sshagent([env.SSH_KEY]) {
                    bat '''
                    ssh -o StrictHostKeyChecking=no ec2-user=%EC2_IP% "sudo mkdir -p /var/www/html/html-site"
                    scp -o StrictHostKeyChecking=no -r html-site/* ec2-user@%EC2_IP%:/var/www/html/html-site/
                    '''
                }
            }
        }

        stage('Deploy React Build') {
            steps {
                sshagent([env.SSH_KEY]) {
                    bat '''
                    ssh -o StrictHostKeyChecking=no ec2-user=%EC2_IP% "sudo mkdir -p /var/www/html/react-app"
                    scp -o StrictHostKeyChecking=no -r react-app/build/* ec2-user@%EC2_IP%:/var/www/html/react-app/
                    '''
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sshagent([env.SSH_KEY]) {
                    bat '''
                    ssh -o StrictHostKeyChecking=no ec2-user=%EC2_IP% "mkdir -p /home/ec2-user/backend"
                    scp -o StrictHostKeyChecking=no -r backend/* ec2-user@%EC2_IP%:/home/ec2-user/backend/
                    ssh -o StrictHostKeyChecking=no ec2-user@%EC2_IP% "
                        cd /home/ec2-user/backend &&
                        npm install &&
                        pm2 restart all || pm2 start index.js --name backend-api
                    "
                    '''
                }
            }
        }
    }
}
