#!/bin/bash

# Steps (to be executed only once):
# Start the Azure VM
# Connect via SSH (ssh azureuser@<VM IP>)
# In your Azure VM settings, go to Networking > Network settings and edit SSH inbound port rule (Service: Custom, Destination port range: 717, Protocol: TCP, Name: SSH)
# In yout Azure VM settings, go to Connect and and change the Port (change) to 717
# Copy and run this script in your VM via SSH (sudo chmod +x secure_ubuntu_server.sh && ./secure_ubuntu_server.sh)
# Connect via SSH (ssh user@<VM IP> -p 717)

set -e
sudo adduser --gecos "" user
sudo usermod -aG sudo user
sudo mkdir -p /home/user/.ssh
sudo cp /home/azureuser/.ssh/authorized_keys /home/user/.ssh/
sudo chown -R user:user /home/user/.ssh
sudo chmod 700 /home/user/.ssh
sudo chmod 600 /home/user/.ssh/authorized_keys
sudo apt update -y
sudo apt dist-upgrade -y
sudo apt install -y unattended-upgrades
sudo DEBIAN_FRONTEND=noninteractive dpkg-reconfigure --priority=low unattended-upgrades
sudo sed -i 's/^#Port 22/Port 717/' /etc/ssh/sshd_config
sudo sed -i 's/^#AddressFamily any/AddressFamily inet/' /etc/ssh/sshd_config
sudo sed -i 's/^#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh.service
sudo apt install -y ufw
sudo ufw allow 717
sudo ufw --force enable
sudo ufw status
sudo ss -tupln
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo sed -i '/# ok icmp codes for INPUT/a -A ufw-before-input -p icmp --icmp-type echo-request -j DROP' /etc/ufw/before.rules
sudo ufw reload
sudo reboot
