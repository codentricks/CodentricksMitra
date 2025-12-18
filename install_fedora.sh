sudo dnf update -y
sudo dnf install -y npm
sudo dnf install -y lm_sensors
sudo dnf install -y kate
sudo dnf install -y konsole
sudo dnf install -y kdeconnect
sudo dnf install -y qdbus-qt5
sudo modprobe platform:drivetemp
echo drivetemp | sudo tee -a /etc/modules
echo drivetemp | sudo tee -a /etc/modules-load.d/drivetemp.conf
cd ./codentricks/
npm install
sh ./install.sh
