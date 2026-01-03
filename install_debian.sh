sudo apt update -y
sudo apt install -y npm
sudo apt install -y lm-sensors
sudo apt install -y kate
sudo apt install -y konsole
sudo apt install -y kdeconnect
sudo apt install -y qdbus-qt5
sudo modprobe platform:drivetemp
echo drivetemp | sudo tee -a /etc/modules
echo drivetemp | sudo tee -a /etc/modules-load.d/drivetemp.conf
cd ./codentricks/
npm install
sh ./install.sh
sudo chown root:root ./node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 ./node_modules/electron/dist/chrome-sandbox
