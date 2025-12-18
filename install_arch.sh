sudo pacman -Syu --noconfirm
sudo pacman -S --noconfirm npm
sudo pacman -S --noconfirm lm_sensors
sudo pacman -S --noconfirm kate
sudo pacman -S --noconfirm konsole
sudo pacman -S --noconfirm kdeconnect
sudo modprobe platform:drivetemp
echo drivetemp | sudo tee -a /etc/modules
echo drivetemp | sudo tee -a /etc/modules-load.d/drivetemp.conf
cd ./Codentricks/
npm install
sh ./install.sh
