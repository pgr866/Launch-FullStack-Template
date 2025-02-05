# 🚀 Full Stack Landing Page Template

## 🌟 Introduction
Welcome to the **Full Stack Landing Page Template** project! This is a production-ready web application designed with a modern tech stack and deployed on an **Ubuntu Server in Azure**. It includes **frontend, backend, authentication, caching, and database services**.

### 🛠️ Technologies Used
- ⚛️ **Frontend**: React (Vite + TypeScript) with ShadCN UI components (Responsive)
- 🐍 **Backend**: Django Rest Framework
- 🐘 **Database**: PostgreSQL
- 🔥 **Cache**: Redis
- 🌐 **Server**: Nginx
- 🐳 **Containerization**: Docker
- 🔐 **User Authentication**: JWT, Google OAuth, GitHub OAuth, Email Verification Code
- 🔒 **Security**: SSL/TSL Communication

## 📸 Screenshots
![Home Screenshot](https://i.postimg.cc/D0GnRnp5/home.png)
![Login Screenshot](https://i.postimg.cc/wxRq1QxJ/login.png)
![Portal Screenshot](https://i.postimg.cc/8PhTHk6z/portal.png)
![Settings Screenshot](https://i.postimg.cc/hPFSTQhY/settings.png)

## 🚀 Quick Start
### 1️⃣ Prerequisites
- Ensure [**Docker**](https://www.docker.com/) is installed on your system.

### 2️⃣ Setup Environment Variables
This project uses a `.env` file in the root folder of the project, which **is included in .gitignore** (you must create your own). Below is a template with explanations for each variable:

#### 📝 `.env` Template
```env
# General settings
# Generate a secure SECRET_KEY at https://djecrety.ir
# Set DEBUG to True for development
DEBUG=False
SECRET_KEY='your-secure-django-secret-key'
ALLOWED_HOST=your-domain.com
VITE_ENV_PATH=https://your-domain.com

# Database settings
DB_NAME=api_db
DB_USER=admin
DB_PASSWORD=your-random-secure-db-password

# Django superuser credentials
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_PASSWORD=your-random-secure-admin-password

# SSL/TLS Passphrases
CA_SSL_PASSPHRASE=your-random-secure-ca-ssl-passphrase
POSTGRES_SSL_PASSPHRASE=your-random-secure-postgres-ssl-passphrase
REDIS_SSL_PASSPHRASE=your-random-secure-redis-ssl-passphrase

# Redis configuration
REDIS_PASSWORD=your-random-secure-redis-password

# OAuth Credentials
# Get your Google OAuth App following https://youtu.be/D8DMj2lQMwo
# Get your GitHub OAuth App following https://youtu.be/HE7TUz7uYHc
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Gmail configuration
# Generate Google App Password at https://myaccount.google.com/apppasswords
EMAIL_HOST_USER=example@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
```

## 🏗️ Deployment Guide
### 🛠️ For Production (Ubuntu Server on Azure)
- Set **DEBUG=False** in .env
- Ensure these lines in **docker-compose.yml** are commented out:
  ```yaml
  frontend:
  ...
  #ports: ["8000:8000"]
  #develop: { watch: [ { action: sync, path: ./backend, target: /app, ignore: [venv/] } ] }
  ...
  backend:
  ...
  #ports: ["5173:5173"]
  #develop: { watch: [ { action: sync, path: ./frontend, target: /app, ignore: [node_modules/] } ] }
  ...
  ```
- **Secure Ubuntu Server Steps** (to be executed **only once**):
  - Start the Azure VM.
  - Connect via SSH:
    ```shell
    ssh azureuser@<VM IP>
    ```
  - In your **Azure VM settings**, go to **Networking > Network settings** and edit **SSH inbound port rule** (Service: **Custom**, Destination port range: **717**, Protocol: **TCP**, Name: **SSH**).
  - In your Azure VM settings, go to Connect and and change the **Port (change)** to **717**.
  - Copy and run this script in your VM via SSH. Choose a secure password for the new user:
    ```bash
    sudo chmod +x secure_ubuntu_server.sh && ./secure_ubuntu_server.sh
    ```
  - Connect via SSH:
    ```shell
    ssh user@<VM IP> -p 717
    ```
- To deploy the project, run this command and choose a secure password for .env encryption:
  ```bash
  sudo chmod +x ubuntu_server_deploy.sh && ./ubuntu_server_deploy.sh
  ```

### 👨‍💻 For Development
- Set **DEBUG=True** in .env
- Uncomment these lines in **docker-compose.yml**:
  ```yaml
  frontend:
  ...
  ports: ["8000:8000"]
  develop: { watch: [ { action: sync, path: ./backend, target: /app, ignore: [venv/] } ] }
  ...
  backend:
  ...
  ports: ["5173:5173"]
  develop: { watch: [ { action: sync, path: ./frontend, target: /app, ignore: [node_modules/] } ] }
  ...
  ```
- Run the project using (use **sudo** on Linux/MacOS):
  ```shell
  docker compose up --build --watch
  ```

## 🛠️ Contributing
Feel free to fork, submit issues, or suggest improvements! 🚀

## 📜 License
This project is MIT Licensed. Enjoy coding! 😃
