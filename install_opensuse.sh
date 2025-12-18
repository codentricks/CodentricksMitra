sudo zypper refresh -y
sudo zypper install -y indic-fonts
sudo zypper install -y npm
sudo zypper install -y lm_sensors
sudo zypper install -y kate
sudo zypper install -y konsole
sudo zypper install -y kdeconnect-kde
sudo modprobe platform:drivetemp
echo drivetemp | sudo tee -a /etc/modules
echo drivetemp | sudo tee -a /etc/modules-load.d/drivetemp.conf
cd ./Codentricks/
npm install
sh ./install.sh
