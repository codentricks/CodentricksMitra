// sudo journalctl --vacuum-time=7d
// du -sh /var/log/journal/*
const fs = require('fs');
const xamppPath = '/opt/lampp/';

function trashD(){
    const { exec } = require('child_process');
    var trashC= 'du -sm ~/.local/share/Trash/ | cut -f1';
    //console.log(totalSP);
    exec(trashC,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            if(stdout){
                //console.log(stdout);
                let trash=stdout.trim();
                document.getElementById("trash").innerHTML=""+trash+" <small>MiB</small>";
                if(trash>512){
                  document.getElementById("cTrash").style.color = "#ff7b88";
                }else{
                  document.getElementById("cTrash").style.color = "rgb(103 205 131)";
                }

            }else{
                document.getElementById("trash").innerHTML="NA";
            }
        }
    })
}

trashD();

function tempD(){
    const { exec } = require('child_process');
    var trashC= 'du -sm /tmp | cut -f1';
    //console.log(totalSP);
    exec(trashC,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            if(stdout){
                //console.log(stdout);
                let trash=stdout.trim();
                document.getElementById("temp").innerHTML=""+trash+" <small>MiB</small>";
                if(trash>512){
                    document.getElementById("cTemp").style.color = "#ff7b88";
                }else{
                    document.getElementById("cTemp").style.color = "rgb(103 205 131)";
                }

            }else{
                document.getElementById("temp").innerHTML="NA";
            }
        }
    })
}
tempD();


function cleanTrash(){
    //console.log("works");
    const { exec } = require('child_process');
    let cmd="rm -rf ~/.local/share/Trash/*";
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="Trash";
            let msg=`Hello ${user}, cleaned Trash folder.`;
            spNotify(sec,smiley, title, msg);
            trashD();
        }
    })

}

function cleanTemp(){
    //console.log("works");
    //sudo find /tmp -type d -empty -delete
    const { exec } = require('child_process');
    let cmd='konsole  -e sudo find /tmp -type d -empty -delete';
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="Clearing /Tmp/";
            let msg=`Hello ${user}, cleaned Temp folder.`;
            spNotify(sec,smiley, title, msg);
            tempD();
        }
    })

}

function firefoxD(){
    const { exec } = require('child_process');
    let distroID=document.getElementById("distroID").value;
    //console.log(distroID);
    //if()
    let cms='';
    if(distroID=="ubuntu" || distroID=="zorin" || distroID=="kubuntu" || distroID=="xubuntu"){
       cmd= 'du -sm ~/snap/firefox/common/.cache/mozilla/firefox/*.default*/cache2 | cut -f1';
    }else{
       cmd= 'du -sm ~/.cache/mozilla/firefox/*.default*/cache2 | cut -f1';
    }
    //var
    //console.log(totalSP);
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            if(stdout){
                //console.log(stdout);
                let trash=stdout.trim();
                document.getElementById("fCache").innerHTML=""+trash+" <small>MiB</small>";
                if(trash>1024){
                    document.getElementById("cfire").style.color = "#ff7b88";
                }else{
                    document.getElementById("cfire").style.color = "rgb(103 205 131)";
                }

            }else{
                document.getElementById("fCache").innerHTML="NA";
            }
        }
    })
}
firefoxD();

function firefoxDD(){
    const { exec } = require('child_process');
    var cmd= 'du -sm ~/.cache/mozilla/firefox/*.dev-edition-default*/cache2 | cut -f1';
    //console.log(totalSP);
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            if(stdout){
                //console.log(stdout);
                let trash=stdout.trim();
                document.getElementById("fdCache").innerHTML=""+trash+" <small>MiB</small>";
                if(trash>1024){
                    document.getElementById("cDfire").style.color = "#ff7b88";
                }else{
                    document.getElementById("cDfire").style.color = "rgb(103 205 131)";
                }

            }else{
                document.getElementById("fdCache").innerHTML="NA";
            }
        }
    })
}
firefoxDD();

function chromeD(){
    const { exec } = require('child_process');
    var cmd= 'du -sm ~/.cache/google-chrome/Default/Cache | cut -f1';
    //console.log(totalSP);
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            if(stdout){
                //console.log(stdout);
                let trash=stdout.trim();
                    document.getElementById("chromeCache").innerHTML=""+trash+" <small>MiB</small>";
                if(trash>1024){
                    document.getElementById("chromefire").style.color = "#ff7b88";
                }else{
                    document.getElementById("chromefire").style.color = "rgb(103 205 131)";
                }

            }else{
                document.getElementById("chromeCache").innerHTML="NA";
            }
        }
    })
}
chromeD();

function edgeD(){
    const { exec } = require('child_process');
    var cmd= 'du -sm ~/.cache/microsoft-edge/Default/Cache | cut -f1';
    //console.log(totalSP);
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            if(stdout){
                //console.log(stdout);
                let trash=stdout.trim();
                    document.getElementById("edgeCache").innerHTML=""+trash+" <small>MiB</small>";
                if(trash>1024){
                    document.getElementById("edgefire").style.color = "#ff7b88";
                }else{
                    document.getElementById("edgefire").style.color = "rgb(103 205 131)";
                }

            }else{
                document.getElementById("edgeCache").innerHTML="NA";
            }
        }
    })
}
edgeD();

function journalD(){
    const { exec } = require('child_process');
    var cmd= 'du -sm /var/log/journal/* | head -n1 | cut -f1';
    //console.log(totalSP);
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            if(stdout){
                //console.log(stdout);
                let trash=stdout.trim();
                document.getElementById("jCache").innerHTML=""+trash+" <small>MiB</small>";
                if(trash>1024){
                    document.getElementById("jfire").style.color = "#ff7b88";
                }else{
                    document.getElementById("jfire").style.color = "rgb(103 205 131)";
                }

            }else{
                document.getElementById("jCache").innerHTML="NA";
            }
        }
    })
}
journalD();

function cleanfCache(){
    const { exec } = require('child_process');
    let distroID=document.getElementById("distroID").value;
    let cms='';
    if(distroID=="ubuntu" || distroID=="zorin" || distroID=="kubuntu" || distroID=="xubuntu"){
        cmd= 'rm -rf ~/snap/firefox/common/.cache/mozilla/firefox/*.default*/cache2 | cut -f1';
    }else{
        cmd= 'rm -rf ~/.cache/mozilla/firefox/*.default*/cache2 | cut -f1';
    }
    //let cmd='rm -rf ~/.cache/mozilla/firefox/*.default*/cache2/*';
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{

            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="CODENTRICKS";
            let msg=`Hello ${user}, cleared Firefox cache.`;
            spNotify(sec,smiley, title, msg);
            firefoxD();
        }
    })

}

function cleanfdCache(){
    const { exec } = require('child_process');
    let cmd='rm -rf ~/.cache/mozilla/firefox/*.dev-edition-default*/cache2/*';
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{

            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="CODENTRICKS";
            let msg=`Hello ${user}, cleared Firefox Developer cache.`;
            spNotify(sec,smiley, title, msg);
            firefoxDD();
        }
    })
}

function cleanChromeCache(){
    const { exec } = require('child_process');
    let cmd='rm -rf ~/.cache/google-chrome/Default/Cache/*';
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{

            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="CODENTRICKS";
            let msg=`Hello ${user}, cleared Chrome cache.`;
            spNotify(sec,smiley, title, msg);
            chromeD();
        }
    })

}

function cleanEdgeCache(){
    const { exec } = require('child_process');
    let cmd='rm -rf ~/.cache/microsoft-edge/Default/Cache/*';
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{

            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="CODENTRICKS";
            let msg=`Hello ${user}, cleared Edge cache.`;
            spNotify(sec,smiley, title, msg);
            edgeD();
        }
    })

}

function cleanJCache(){
    //console.log("works");
    //sudo find /tmp -type d -empty -delete
    const { exec } = require('child_process');
    let cmd='konsole  -e sudo journalctl --vacuum-time=2d';
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{

            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="Clearing Journalctl";
            let msg=`Hello ${user}, cleared journalctl, Vacuum Time 2 day.`;
            spNotify(sec,smiley, title, msg);
            journalD();
        }
    })

}


function checkXampp(){
    let status;
    if (fs.existsSync(xamppPath)) {
        document.getElementById("xamppS").style.color = "rgb(103 205 131)";
         status=1;
    } else {
        document.getElementById("xamppS").style.color = "#ff7b88";
         status=1;
    }
    //console.log(status);
    return status;
}
checkXampp();

function xamppS(){

    const { spawn } = require('child_process');
    const child = spawn('pgrep /opt/lampp/bin', {shell: true});

    child.on('close', (code) => {
        //console.log(code);
        if(code==1){
            document.getElementById("xStatus").innerHTML='<span class="text-danger">Not Running</span>';
            document.getElementById("xAction").innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="rnXampp()"><i class="fa fa-play"></i>&nbsp; Start</a>';
        }else{
            //console.log("Started");
            document.getElementById("xStatus").innerHTML='<span class="text-success">Running</span> ';
            document.getElementById("xAction").innerHTML='&nbsp;&nbsp;<a onclick="sXampp()"><i class="fa fa-stop"></i>&nbsp;  Stop</a>&nbsp;&nbsp;<a onclick="rXampp()"><i class="fa fa-retweet"></i>&nbsp;  Restart</a> ';
        }
    });

}
xamppS();

function rnXampp(){
    //console.log("works");
    //sudo find /tmp -type d -empty -delete
    const { exec } = require('child_process');
    let cmd='konsole  -e sudo /opt/lampp/lampp start';
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="Xampp";
            let msg=`Hello ${user}, Xampp started`;
            spNotify(sec,smiley, title, msg);
            xamppS();
        }
    })

}

function sXampp(){
    //console.log("works");
    //sudo find /tmp -type d -empty -delete
    const { exec } = require('child_process');
    let cmd='konsole  -e sudo /opt/lampp/lampp stop';
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="Xampp";
            let msg=`Hello ${user}, Xampp stopped`;
            spNotify(sec,smiley, title, msg);
            xamppS();
        }
    })

}
function rXampp(){
    //console.log("works");
    //sudo find /tmp -type d -empty -delete
    const { exec } = require('child_process');
    let cmd='konsole  -e sudo /opt/lampp/lampp restart';
    exec(cmd,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{
            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            let sec=3000;
            let smiley="face-smile";
            let title="Xampp";
            let msg=`Hello ${user}, Xampp restarted`;
            spNotify(sec,smiley, title, msg);
            xamppS();
        }
    })

}


function usbDrive(){
    const { exec } =require('child_process');
    const cmd = "lsblk -J -o NAME,FSTYPE,SIZE,MOUNTPOINT,LABEL,MODEL,TRAN,RM";

    exec(cmd, (err, stdout, stderr) => {
        if(err){
           console.log(err);
            //document.getElementById("blueId").value="";
        }
      
        const data = JSON.parse(stdout);
        //console.log(data);
        const usbDevices = data.blockdevices.filter(d => d.tran === "usb" || d.rm);
        let i=1;
        let vSpace="";
        let count= usbDevices.length;

        if(count==0){
            document.getElementById("sdb").innerHTML="";
            document.getElementById("sdc").innerHTML="";
            document.getElementById("sdd").innerHTML="";
        }else{
        
            let sdb=0;
            let sdc=0;
            let sdd=0;
            usbDevices.forEach(dev => {

                let label = dev.children[0].label.slice(0, 6);

                let montT="";
                if(dev.children[0].mountpoint!=null){
                    //console.log(dev.children[0].mountpoint);
                    montT=' <i class="fa fa-folder-open"></i>';
                }else{
                    //console.log("null");
                    montT=' <i class="fa fa-folder"></i>';
                }
               
                document.getElementById(dev.name).innerHTML= label+" "+dev.size+" &nbsp;&nbsp; "+montT;
                
                if(dev.name=="sdb"){
                 sdb=1;
                }
                if(dev.name=="sdc"){
                 sdc=1;
                }
                if(dev.name=="sdd"){
                 sdd=1;
                }
                
                i++;
              //console.log(dev.children[0].mountpoint);
              //console.log(`${dev.name}: ${dev.model} (${dev.size}) mounted at ${dev.mountpoint || "Not mounted"}`);
            });
            
            if(sdb==0){
                document.getElementById("sdb").innerHTML= ""; 
            }
            if(sdc==0){
                document.getElementById("sdc").innerHTML= ""; 
            }
            if(sdd==0){
                document.getElementById("sdd").innerHTML= ""; 
            }
            //console.log(sdc);
            //console.log(sdd);

        }


    });



}
usbDrive();

function blueID(){
    const { exec } =require('child_process');
    let cmd='upower -e | grep "headset_dev"';

    exec(cmd,(err,stdout,stderr)=>{
        if(err){
            //console.log(err);
            document.getElementById("blueId").value="";
        }else{
            let devID=stdout.trim()
            //console.log(devID);
            document.getElementById("blueId").value=devID;
        }

    })
    //console.log(devID);
    //return devID;


}
blueID();

function blueDevice(){
    const { exec } =require('child_process');
    blueID();
    let devid=document.getElementById("blueId").value;
    //console.log(devid);
    if(devid){
        let bModel='upower -i '+devid+' | grep "model" | cut -d ":" -f2';
        //Model
        //console.log(bModel);
        exec(bModel,(err,stdout,stderr)=>{
            if(err){
                console.log(err);
            }else{
                let mName=stdout.trim();
                //console.log(mName);
                document.getElementById("bModel").innerHTML='&nbsp; <i class="fab fa-bluetooth"></i> '+mName;
            }

        })
        let bCharge='upower -i '+devid+' | grep "percentage" | cut -d ":" -f2';
        exec(bCharge,(err,stdout,stderr)=>{
            if(err){
                console.log(err);
            }else{
                let percentage=stdout.trim();
                //console.log(percentage);
                document.getElementById("bPercentage").innerHTML="&nbsp;<small>"+percentage+"</small>";
            }

        })
    }else{
        document.getElementById("bModel").innerHTML='';
        document.getElementById("bPercentage").innerHTML="";
    }
}


function laptopBattery(){
    //console.log("works");
    let sysT=document.getElementById("systemT").value;
    if(sysT=="laptop"){
        const { exec } = require('child_process');
        let cmd= `upower -i $(upower -e | grep BAT) | grep -E "state|percentage|capacity" \
        | awk -F: '{gsub(/^[ \\t]+|[ \\t]+$/, "", $2); gsub(/^[ \\t]+|[ \\t]+$/, "", $1); print "\\""$1"\\": \\""$2"\\","}' \
        | sed '$ s/,$//' | awk 'BEGIN{print "{"} {print} END{print "}"}'`;
        //console.log(cmd);
        exec(cmd,(err, stdout, stderr)=>{
            if(err){
                console.log(err);
            }else{
                //console.log(stdout);
                let bat=JSON.parse(stdout);
                //console.log(bat.state);
                let status="";
                if(bat.state=="charging"){
                   status= '<span class="text-green">'+bat.state+"</span>";
                }else{
                   status= '<span >'+bat.state+"</span>";
                }
                document.getElementById("systemC").style.display="block";
                document.getElementById("lbp").innerHTML=bat.percentage;
                document.getElementById("lcs").innerHTML=status;
                document.getElementById("lcc").innerHTML="<small>Health: "+bat.capacity+"</small>";
                //docume
                // let sec=3000;
                // let smiley="face-smile";
                // let title="Xampp";
                // let msg=`Hello ${user}, Xampp stopped`;
                // spNotify(sec,smiley, title, msg);
                // xamppS();
            }
        })
    }else{
        document.getElementById("systemC").style.display="none";
    }

}

laptopBattery();


setInterval(function(){
    trashD();
    firefoxD();
    firefoxDD();
    chromeD();
    edgeD();
    journalD();
    checkXampp();
    xamppS();
    blueID();
    blueDevice();
    laptopBattery();
    usbDrive();
}, 7000);
