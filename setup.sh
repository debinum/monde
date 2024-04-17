#!/usr/bin/env bash

WHO=$(whoami)
PWD=$(pwd)

# Check if pkg is installed globally
if ! command -v pkg >/dev/null 2>&1; then
    echo "pkg is not installed. Installing..."
    echo ""
    npm i -g pkg
fi

# 1. Install dependencies using npm
npm install

# 2. Build the binary with the globally installed pkg command
npm run pkg

sudo cp -rf "$PWD/monde" "/usr/bin"

# 3. Create the system service file "/etc/systemd/system/monde.service"
sudo cat > /etc/systemd/system/monde.service << EOF
[Unit]
Description=monde

[Service]
ExecStart=/usr/bin/monde
Restart=always
User=$WHO
WorkingDirectory=/usr/bin

[Install]
WantedBy=multi-user.target
EOF

# 4. Enable the new monde.service
sudo systemctl enable monde.service

# 5. Reload the systemctl daemon
sudo systemctl daemon-reload

# 6. Start the monde.service
sudo systemctl start monde.service

# Check the status of the monde.service
systemctl status monde.service
