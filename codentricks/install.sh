#!/bin/bash
path=$(pwd)
appName="/codentricks.desktop"
shortName="/usr/share/applications"
iconName="/img/icon.png"
dPath=$path$appName
iconPath=$path$iconName
shortPath=$shortName$appName

# echo $dPath
if [ -f "$shortPath" ]; then
echo "$shortPath already exists."
else

cat > $shortPath <<EOF
[Desktop Entry]
Encoding=UTF-8
Exec=npm start --prefix $path
Icon= $iconPath
Type=Application
Terminal=false
Comment=Codentricks
Name=Codentricks
GenericName=Codentricks
StartupNotify=false
Categories=Development;IDE;TextEditor;
EOF

fi
