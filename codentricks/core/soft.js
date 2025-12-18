function packageM(){
    const { exec } =require('child_process');
    let cmd='if command -v apt &> /dev/null; then echo "apt"; elif command -v dnf &> /dev/null; then echo "dnf"; elif command -v zypper &> /dev/null; then echo "zypper"; elif command -v pacman &> /dev/null; then echo "pacman"; else echo "unknown"; fi';

    exec(cmd,(err,stdout,stderr)=>{
        if(err){
            //console.log(err);
            document.getElementById("packageManager").value="";
        }else{
            let devID=stdout.trim()
            //console.log(devID);
            if(devID=="apt\n/usr/local/bin/apt"){
                devID="apt";

            }
            if(devID=="apt\n/usr/bin/apt"){
                devID="apt";

            }
            document.getElementById("packageManager").value=devID;
        }
    })
   
}
packageM();

function distroId(){
    const { exec } =require('child_process');
    let cmd='grep ^ID= /etc/os-release | cut -d "=" -f2';

    exec(cmd,(err,stdout,stderr)=>{
        if(err){
            //console.log(err);
            document.getElementById("distroID").value="";
        }else{
            let devID=stdout.trim()
            //nsole.log(devID);
            document.getElementById("distroID").value=devID;
        }
    })
}
distroId();


const games = ["supertux2", "supertuxkart","knights","gimp","inkscape"];
const internet = ["firefox", "chromium","thunderbird","kmail", "falkon","konqueror","ktorrent","kget"];
const devs = ["kate", "geany","codeblocks","git-cola","filezilla","putty",'labplot'];
const media = ["vlc",'amarok','kaffeine'];

const apps=[...games,...internet, ...devs,...media, ];

function nativeApp(){
    let count=apps.length;
    lines=apps;
    i=1;
    document.getElementById("nativeM").innerHTML='';
    lines.forEach(function(line) {
      //console.log(line);
      let str=line.toString();
      let app= str.replace(/[-_]/g, " ");
      let appID=line+"C";
      document.getElementById("nativeM").innerHTML+='<div class="col-md-3" id=""><div class="glassBox"><h5 class="d-flex align-items-center justify-content-center text-uppercase flath3">'+app+'</h5><div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1"><h3 class="mb-0 fw-bold appC"><img src="img/48/'+line+'.svg" width="42" onclick="installApp(this)" id="A'+line+'"/></h3></div><h3 class="smallh3 d-flex align-items-center justify-content-center flath3"><span id="'+appID+'"></span></h3></div></div>';
      //checkApp(line, appID);
      i++;
    });
}
nativeApp();


//console.log(apps);
function appStatus(apps){
    const app = [...apps];
    //console.log(app)
    app.forEach(function(line){
        let appID=line+"C";
        checkApp(line, appID);
    });
}
appStatus(apps);

// add flathub apps
const fkeys   = ['steam','sober','firefox','ulaa', 'google-chrome', 'visual-studio-code','podman-desktop',
'microsoft-edge','obs','stremio','fedora-media-writer','android-studio','arduino','zed','legacylauncher','bottles','onlyoffice',
'wps-office','rustdesk','shotcut','kdenlive','resources','mission-center','librepcb','coulomb','jamovi','kdiskmark'];

const fvalues = ['com.valvesoftware.Steam','org.vinegarhq.Sober','org.mozilla.firefox','com.ulaa.Ulaa', 'com.google.Chrome',
'com.visualstudio.code','io.podman_desktop.PodmanDesktop','com.microsoft.Edge','com.obsproject.Studio','com.stremio.Stremio'
,'org.fedoraproject.MediaWriter','com.google.AndroidStudio','cc.arduino.IDE2','dev.zed.Zed','ch.tlaun.TL','com.usebottles.bottles',
'org.onlyoffice.desktopeditors','com.wps.Office','com.rustdesk.RustDesk','org.shotcut.Shotcut','org.kde.kdenlive','net.nokyan.Resources',
'io.missioncenter.MissionCenter','org.librepcb.LibrePCB','io.github.hamza_algohary.Coulomb','org.jamovi.jamovi','io.github.jonmagon.kdiskmark'];

function flathub(){
    //let keys = ['ulaa', 'google-chrome', 'visual-studio-code'];
    //let values = ['com.ulaa.Ulaa', 'com.google.Chrome', 'com.visualstudio.code'];
    let keys=fkeys;
    let values= fvalues;
    let obj = {};
    let count=keys.length;
    document.getElementById("flatCount").innerHTML=" ("+count+") ";
    // Using loop to insert key-value pairs into the object
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = values[i];
    }

    // Printing object to the console
    let i=1;
    for (let key of Object.keys(obj)) {
         //console.log(key + " => " + obj[key]); 
         let str=key.toString();
         let app= str.replace(/[-_]/g, " ");
         let appID=key+"C";
         document.getElementById("flatpakM").innerHTML+='<div class="col-md-3" id=""><div class="glassBox"><h5 class="d-flex align-items-center justify-content-center text-uppercase flath3">'+app+'</h5><div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1"><h3 class="mb-0 fw-bold appC"><img src="img/48/'+key+'.svg" width="42" onclick="flatpakInstall(this)" id="A'+obj[key]+'"/></h3></div><h3 class="smallh3 d-flex align-items-center justify-content-center flath3"><span id="'+obj[key]+'C"></span></h3></div></div>';
        i++;
    }
   
}
flathub();


function flatHStatus(fvalues){
    const app = fvalues;
    //console.log(app)
    app.forEach(function(line){
        let appID=line+"C";
        // console.log(appID);
        // if(appID=="visual-studio-code"){
        //     appID="code";
        // }
        checkFlatpakApp(line, appID);
    });
}
flatHStatus(fvalues);

const tapps=["sublime-text","python3-pip"]
function thirstPartyApps(){
    let count=tapps.length;
    lines=tapps;
    i=1;
    document.getElementById("thirtpartyM").innerHTML='';
    lines.forEach(function(line) {
      //console.log(line);
      let str=line.toString();
      let app= str.replace(/[-_]/g, " ");
      let appID=line+"C";
      document.getElementById("thirtpartyM").innerHTML+='<div class="col-md-3" id=""><div class="glassBox"><h5 class="d-flex align-items-center justify-content-center text-uppercase flath3">'+app+'</h5><div class="d-flex align-items-center justify-content-center gap-2 my-2 py-1"><h3 class="mb-0 fw-bold appC"><img src="img/48/'+line+'.svg" width="42" onclick="thirdApp(this)" id="A'+line+'"/></h3></div><h3 class="smallh3 d-flex align-items-center justify-content-center flath3"><span id="'+appID+'"></span></h3></div></div>';
      checkApp(line, appID);
      i++;
    });
}
thirstPartyApps();




function installApp(element){
      const { exec } = require('child_process');
      let packageM=document.getElementById("packageManager").value;
      //console.log(packageM)
      let aid= element.id;
      let app=aid.slice(1);
      //console.log(app);
      let cmd="";
      if(packageM=="dnf"){
         cmd='konsole  -e sudo dnf install -y '+app;
      }
      if(packageM=="apt"){
         cmd='konsole  -e sudo apt install -y '+app;
      }
      if(packageM=="pacman"){
          cmd='konsole -e sudo pacman -S --noconfirm '+app;
      }
      if(packageM=="zypper"){
          cmd='konsole -e sudo zypper install -y '+app;
      }
      //console.log(cmd);
      if(cmd){
        exec(cmd,(err, stdout, stderr)=>{
            if(err){
                console.log(err);
            }else{

                let user=os.userInfo();
                user=user.username;
                user= user.toUpperCase();
                let sec=3000;
                let smiley="face-smile";
                let title="App ....";
                let msg=`Hello ${user}, installed app ${app} successfully`;
                spNotify(sec,smiley, title, msg);
                journalD();
            }
        })
      }
}


function thirdApp(element){
      const { exec } = require('child_process');
      let packageM=document.getElementById("packageManager").value;
      console.log(packageM)
      let aid= element.id;
      let app=aid.slice(1);
      console.log(app);
      let cmd="";
      if(packageM=="dnf"){
        if(app=="sublime-text"){
         cmd="konsole -e sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg && sudo dnf config-manager addrepo --from-repofile=https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo && sudo dnf install -y sublime-text";
        }else{
         cmd="konsole -e sudo dnf install "+app;  
        }
      }
      if(packageM=="apt"){
         if(app=="sublime-text"){
          cmd="konsole -e sudo wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo tee /etc/apt/keyrings/sublimehq-pub.asc > /dev/null && echo -e 'Types: deb\nURIs: https://download.sublimetext.com/\nSuites: apt/stable/\nSigned-By: /etc/apt/keyrings/sublimehq-pub.asc' | sudo tee /etc/apt/sources.list.d/sublime-text.sources > /dev/null && sudo apt-get update && sudo apt-get install -y sublime-text";
         }else{
             cmd="konsole -e sudo apt install -y "+app;  
         }
      }
      if(packageM=="pacman"){
         if(app=="sublime-text"){
          cmd="konsole -e sudo wget -qO sublimehq-pub.gpg https://download.sublimetext.com/sublimehq-pub.gpg | sudo pacman-key --add sublimehq-pub.gpg | sudo pacman-key --lsign-key 8A8F901A && rm sublimehq-pub.gpg && echo -e '\n[sublime-text]\nServer = https://download.sublimetext.com/arch/stable/x86_64' | sudo tee -a /etc/pacman.conf && sudo pacman -Syu sublime-text";
          }else{
             cmd="konsole -e sudo pacman -S --noconfirm  "+app;  
          }
      }
      if(packageM=="zypper"){
        if(app=="sublime-text"){
          cmd="konsole -e sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg && sudo zypper -y addrepo -g -f https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo && sudo zypper install -y sublime-text";
        }else{
          cmd="konsole -e sudo zypper install -y "+app;  
        }
      }
      //console.log(cmd);
      if(cmd){
        exec(cmd,(err, stdout, stderr)=>{
            if(err){
                console.log(err);
            }else{

                let user=os.userInfo();
                user=user.username;
                user= user.toUpperCase();
                let sec=3000;
                let smiley="face-smile";
                let title="App ....";
                let msg=`Hello ${user}, installed app ${app} successfully`;
                spNotify(sec,smiley, title, msg);
                //journalD();
            }
        })
      }
}


function flatpakInstall(element){
      const { exec } = require('child_process');
      let packageM=document.getElementById("packageManager").value;
      //console.log(packageM)
      let aid= element.id;
      let app=aid.slice(1);
      //console.log(app);
      let cmd="";
      
      cmd='konsole  -e flatpak install -y '+app;
     
      //console.log(cmd);
      if(cmd){
        exec(cmd,(err, stdout, stderr)=>{
            if(err){
                console.log(err);
            }else{

                let user=os.userInfo();
                user=user.username;
                user= user.toUpperCase();
                let sec=3000;
                let smiley="face-smile";
                let title="App ....";
                let msg=`Hello ${user}, installed app ${app} successfully`;
                spNotify(sec,smiley, title, msg);
                //journalD();
            }
        })
      }
}

function rpmFusion(){
    let packM=document.getElementById("packageManager").value;
    if(packM=="dnf"){
        document.getElementById("rpmFusion").style.display = "block";
        const { exec } = require('child_process');
        let cmd="if ! dnf repolist | grep rpmfusion &>/dev/null; then echo 'No'; else echo 'Yes'; fi";
        //console.log(appID);
        exec(cmd,(err, stdout, stderr)=>{
            
            //console.log(stdout);
            if(err){
                console.log(err);
            }else{
                stdout=stdout.trim();
                //console.log(appID);
                if(stdout=="Yes"){
                    document.getElementById("rpmFusionS").innerHTML='&nbsp;<i class="fa fa-check-circle text-green"></i>';
                }else{
                    document.getElementById("rpmFusionS").innerHTML='&nbsp;<i class="fa fa-times-circle text-red"></i>';
                }
                
            }
        });
    }else{
        document.getElementById("rpmFusion").style.display = "none";
    }
}
rpmFusion();

function flatpakStatus(){
   // let packM=document.getElementById("packageManager").value;
    const { exec } = require('child_process');
    let cmd='which flatpak';
        //console.log(appID);
        exec(cmd,(err, stdout, stderr)=>{

            //console.log(stdout);
            if(err){
                console.log(err);
            }else{
                stdout=stdout.trim();

                // if(stdout=="No\n/usr/bin/flatpak" || stdout=="/usr/bin/flatpak\nNo"){
                //     stdout="No";
                //
                // }
                //console.log(stderr);
                if(stdout==""){
                    document.getElementById("flatpakS").innerHTML='&nbsp; <i class="fa fa-times-circle text-red"></i>';
                }else{
                    document.getElementById("flatpakS").innerHTML='&nbsp; <i class="fa fa-check-circle text-green"></i>';

                }

            }
        });

}
flatpakStatus();

function codecInstall(){
    const { exec } = require('child_process');
    let packM=document.getElementById("packageManager").value;
    let distroID=document.getElementById("distroID").value;
    //console.log(distroID);
    let cmd='';
    if(packM=="apt"){
       if(distroID=="ubuntu" || distroID=="zorin" || distroID=="kubuntu" || distroID=="xubuntu"){
         cmd='konsole -e sudo apt install ubuntu-restricted-extras -y';
       }
       if(distroID=="linuxmint"){
         cmd='konsole -e sudo apt install mint-meta-codecs -y';
       }
       if(distroID=="debian"){
         cmd='konsole -e sudo apt update && sudo apt install deb-multimedia-keyring && echo "deb http://www.deb-multimedia.org bookworm main non-free" | sudo tee /etc/apt/sources.list.d/deb-multimedia.list && sudo apt update && sudo apt install deb-multimedia-codecs -y';
       }
    }
    if(packM=="dnf"){
            cmd='konsole -e sudo dnf5 install \
      https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
      https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm && \
    sudo dnf5 install gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugins-bad-freeworld \
      gstreamer1-plugins-ugly gstreamer1-libav lame ffmpeg vlc mpv';
    }

    if(packM=="pacman"){
        cmd='konsole -e sudo pacman -S gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav';
    }

    //console.log(packM+" "+cmd);
    exec(cmd,(err, stdout, stderr)=>{
            
            //console.log(stdout);
            if(err){
                console.log(err);
            }else{
                stdout=stdout.trim();
                
                let user=os.userInfo();
                user=user.username;
                user= user.toUpperCase();
                let sec=3000;
                let smiley="face-smile";
                let title="App ....";
                let msg=`Hello ${user}, installed multimedia codecs successfully`;
                spNotify(sec,smiley, title, msg);
                
            }
    });

}


function checkApp(appName, appID){
    const { exec } = require('child_process');
    let packageManager=document.getElementById("packageManager").value;
    if(appName=="sublime-text") appName="subl";
    if(appName=="python3-pip") appName="pip3";
    let cmd="command -v "+appName;
    exec(cmd,(err, stdout, stderr)=>{
        
        //console.log(stdout);
        if(err){
            //console.log(err);
             document.getElementById(appID).innerHTML='<i class="fa fa-times-circle text-red"></i>&nbsp; Not Installed';
        }else{
            //stdout=stdout.trim();

            document.getElementById(appID).innerHTML='<i class="fa fa-check-circle text-green"></i>&nbsp; Installed';

            
        }
    });

}

function checkFlatpakApp(appName, appID){
    const { exec } = require('child_process');
    
    let cmd="flatpak info "+appName;
    //console.log(appID);
    exec(cmd,(err, stdout, stderr)=>{
        
        //console.log(stdout);
        if(err){
            //console.log(err);
            document.getElementById(appID).innerHTML='<i class="fa fa-times-circle text-red"></i>&nbsp; Not Installed';
        }else{
            stdout=stdout.trim();
            //console.log(appID);

            document.getElementById(appID).innerHTML='<span flatID="'+appName+'" onclick="flatpakLaunch(event)" class="curSor"><i class="fa fa-play text-green"></i>&nbsp; Launch</span>&nbsp;&nbsp;&nbsp;<span flatuid="'+appName+'" onclick="flatpakUninstall(event)" class="curSor"><i class="fa fa-trash text-danger"></i> &nbsp; Uninstall</span>';

            
        }
    });

}

function flatpakLaunch(event){
    const { exec } = require('child_process');
    let appName = event.target.closest('span[flatid]');
    if (appName) {
        let flatid = appName.getAttribute('flatid');
        let cmd='flatpak run '+flatid;
        exec(cmd,(err, stdout, stderr)=>{
        
            //console.log(stdout);
            
        });
    }

}

function flatpakUninstall(event){
    const { exec } = require('child_process');
    let appName = event.target.closest('span[flatuid]');

    if (appName) {
        let flatid = appName.getAttribute('flatuid');
        
        let cmd='konsole -e  flatpak uninstall -y '+flatid;
        //console.log(cmd);
        exec(cmd,(err, stdout, stderr)=>{
        
            //console.log(stdout);
            
        });
    }

}


setInterval(function(){

   appStatus(apps);
   flatHStatus(fvalues);
   rpmFusion();
   //develop();
   //gaming();
}, 15000);
