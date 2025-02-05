#!/bin/bash

#sudo chmod +x ubuntu_server_deploy.sh && ./ubuntu_server_deploy.sh

set -e
set +o history
unset HISTFILE
history -c
rm -f ~/.bash_history
sudo apt update -y

# Load .env
sudo apt install -y dos2unix
if sudo test -f ".env"; then
    sudo dos2unix .env
    sudo chmod 400 .env
    read -sp "Enter your decryption password: " ENC_PASSWORD
    sudo openssl enc -aes-256-cbc -salt -pbkdf2 -iter 100000 -in .env -out .env.enc -pass stdin <<< "$ENC_PASSWORD"
elif sudo test -f ".env.enc"; then
    read -sp "Enter your decryption password: " ENC_PASSWORD
    sudo openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -in .env.enc -out .env -pass stdin <<< "$ENC_PASSWORD"
    sudo chmod 400 .env
else
    echo "Error: .env nor .env.enc file found"
    exit 1
fi

export $(sudo grep -v '^#' .env | xargs) > /dev/null 2>&1

sudo chmod 700 /etc/ssl/private/
sudo chmod 755 /etc/ssl/certs/

# Get nginx SSL certificate
if sudo test ! -f "/etc/letsencrypt/live/${ALLOWED_HOST}/fullchain.pem" || sudo test ! -f "/etc/letsencrypt/live/${ALLOWED_HOST}/privkey.pem"; then
    sudo rm -rf "/etc/letsencrypt/live/${ALLOWED_HOST}"
    sudo apt purge -y nginx certbot python3-certbot-nginx
    sudo apt install -y nginx certbot python3-certbot-nginx
    sudo systemctl start nginx
    sudo certbot --nginx -d $ALLOWED_HOST --email $EMAIL_HOST_USER --agree-tos --no-eff-email
fi

# Generate CA Certificates
if sudo test ! -f /etc/ssl/certs/ca.crt || sudo test ! -f /etc/ssl/private/ca.key; then
    sudo rm -rf /etc/ssl/private/ca.key /etc/ssl/certs/ca.crt
    sudo openssl genpkey -algorithm RSA -aes256 -pass stdin <<< "$CA_SSL_PASSPHRASE" -out /etc/ssl/private/ca.key
    sudo openssl req -x509 -new -key /etc/ssl/private/ca.key -sha256 -days 3650 -out /etc/ssl/certs/ca.crt -subj "/C=ES/ST=Andalucia/L=Almeria/O=MyApp/CN=MyAppCA" -addext "basicConstraints=critical,CA:TRUE" -addext "keyUsage=critical,keyCertSign,cRLSign" -addext "subjectKeyIdentifier=hash" -addext "authorityKeyIdentifier=keyid:always,issuer" -passin stdin <<< "$CA_SSL_PASSPHRASE"
    sudo chmod 400 /etc/ssl/private/ca.key
    sudo chmod 644 /etc/ssl/certs/ca.crt
    sudo chown 999:999 /etc/ssl/private/ca.key
    sudo chown 999:999 /etc/ssl/certs/ca.crt
fi

# Get postgresql SSL certificate
if sudo test ! -f /etc/ssl/private/postgresdb.key || sudo test ! -f /etc/ssl/certs/postgresdb.crt; then
    sudo rm -rf /etc/ssl/private/postgresdb.key /etc/ssl/certs/postgresdb.crt
    sudo openssl genpkey -algorithm RSA -aes256 -pass stdin <<< "$POSTGRES_SSL_PASSPHRASE" -out /etc/ssl/private/postgresdb.key
    sudo openssl req -new -key /etc/ssl/private/postgresdb.key -out /etc/ssl/certs/postgresdb.csr -subj "/C=ES/ST=Andalucia/L=Almeria/O=MyApp/CN=db" -passin stdin <<< "$POSTGRES_SSL_PASSPHRASE"
    sudo openssl x509 -req -in /etc/ssl/certs/postgresdb.csr -CA /etc/ssl/certs/ca.crt -CAkey /etc/ssl/private/ca.key -CAcreateserial -out /etc/ssl/certs/postgresdb.crt -days 365 -sha256 -passin stdin <<< "$CA_SSL_PASSPHRASE"
    sudo rm -rf /etc/ssl/certs/postgresdb.csr
    sudo chmod 400 /etc/ssl/private/postgresdb.key
    sudo chmod 644 /etc/ssl/certs/postgresdb.crt
    sudo chown 999:999 /etc/ssl/private/postgresdb.key
    sudo chown 999:999 /etc/ssl/certs/postgresdb.crt
fi

# Get redis SSL certificate
if sudo test ! -f /etc/ssl/private/redis.key || sudo test ! -f /etc/ssl/certs/redis.crt; then
    sudo rm -rf /etc/ssl/private/redis.key /etc/ssl/certs/redis.crt
    sudo openssl genpkey -algorithm RSA -aes256 -pass stdin <<< "$REDIS_SSL_PASSPHRASE" -out /etc/ssl/private/redis.key
    sudo openssl req -new -key /etc/ssl/private/redis.key -out /etc/ssl/certs/redis.csr -subj "/C=ES/ST=Andalucia/L=Almeria/O=MyApp/CN=redis" -passin stdin <<< "$REDIS_SSL_PASSPHRASE"
    sudo openssl x509 -req -in /etc/ssl/certs/redis.csr -CA /etc/ssl/certs/ca.crt -CAkey /etc/ssl/private/ca.key -CAcreateserial -out /etc/ssl/certs/redis.crt -days 365 -sha256 -passin stdin <<< "$CA_SSL_PASSPHRASE"
    sudo rm -rf /etc/ssl/certs/redis.csr
    sudo chmod 400 /etc/ssl/private/redis.key
    sudo chmod 644 /etc/ssl/certs/redis.crt
    sudo chown 999:999 /etc/ssl/private/redis.key
    sudo chown 999:999 /etc/ssl/certs/redis.crt
fi

# Install Docker
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo apt autoremove -y

# Run Docker
sudo systemctl stop nginx
sudo sysctl vm.overcommit_memory=1
sudo service docker start
sudo docker compose down
sudo docker compose up -d --build
sudo rm -rf .env
