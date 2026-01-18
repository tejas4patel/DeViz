#!/bin/bash

set -e

echo "Updating system..."
sudo apt update -y

echo "Installing required dependencies..."
sudo apt install -y curl wget gpg

echo "Adding Microsoft GPG key..."
curl -fsSL https://packages.microsoft.com/keys/microsoft.asc \
  | sudo gpg --dearmor -o /usr/share/keyrings/microsoft.gpg

echo "Adding Microsoft Edge repository..."
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/edge stable main" \
  | sudo tee /etc/apt/sources.list.d/microsoft-edge.list > /dev/null

echo "Updating package list..."
sudo apt update -y

echo "Installing Microsoft Edge (stable)..."
sudo apt install -y microsoft-edge-stable

echo "Microsoft Edge installation complete."
