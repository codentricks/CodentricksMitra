// check kdeconnect existance
function kdeCS(){
    const { exec } = require('child_process');
    let cmd= 'command -v kdeconnect-cli';

    exec(cmd,(err, stdout, stderr)=>{
        let res=0;
        //console.log(stdout);
        if(err){
            console.log(err);
        }else{
            if(stdout.trim()=="/usr/bin/kdeconnect-cli"){
                //console.log("W");
                res=1;
                document.getElementById("kdeS").value = res;
            }else{
                //console.log("NW");
                res=0;
                document.getElementById("kdeS").value = res;
            }
        }

        //return res;
    });
}

function statusIcon(){
    let status=document.getElementById("kdeS").value;
    //console.log("hello");
    if(status==1){
        document.getElementById("kStatus").innerHTML=' <i class="fa fa-check-circle text-green"></i>';
    }else{
        document.getElementById("kStatus").innerHTML=' <i class="fa fa-times-circle text-red"></i>';
    }
}
kdeCS();

function conDeviceID(){
    const { exec } = require('child_process');
    let cmd="kdeconnect-cli -a --id-only";
    exec(cmd,(err, stdout, stderr)=>{
        let res=0;
        //console.log(stdout);
        if(err){
            console.log(err);
        }else{
            stdout=stdout.trim();
            let dev=stdout.split('\n');
            //let devJ = JSON.stringify({ text: dev });
            document.querySelectorAll('.kdeCount').forEach(el => {
                el.style.display = 'block';
            });
            document.getElementById("conD").innerHTML=dev.length;
            document.getElementById("devID").value=dev;
            //console.log(dev);
        }

        //return res;
    });
}

function deviceList(){
    const { exec } = require('child_process');
    let cmd="kdeconnect-cli --list-devices";

    exec(cmd,(err, stdout, stderr)=>{
        let res=0;
        //console.log(stdout);
        if(err){
            console.log(err);
        }else{
            stdout=stdout.trim();
            let lines=stdout.split("\n");
            //console.log(lines);

            let count=lines.length;
            //console.log(count);
            let i=1;
            if(i<=count){
                lines.forEach(function(line) {
                    let dev=line.split(" ");
                    //console.log(dev[3]);
                    if(dev[3]=="(paired"){
                        let devN=dev[1].slice(0, -1);
                        //console.log(dev[1]);
                        let devId=dev[2];
                        let pairS="";
                        let per="";

                        pairS=' <i class="fa fa-check-circle text-green"></i>';
                        per=batteryP(devId,i);
                        chargeS=batteryC(devId,i);
                        //console.log(chargeS);
                        let perC="";
                        if(per===undefined){

                        }else{
                            perC=per;
                        }

                        let charge="";

                        if(chargeS===undefined){

                        }else{
                            charge=chargeS;
                        }
                        //chargeS="dgsdhg";
                            //console.log(devN+" "+perC+ " "+ charge+" "+devId);
                            document.getElementById("device"+i).innerHTML='<div class="smallh15"><i class="fas fa-mobile"></i> &nbsp;'+devN+'<br/> &nbsp; &nbsp; &nbsp;<span id="bat'+i+'">'+perC+'</span>&nbsp; &nbsp;<span id="batC'+i+'">'+charge+'</span><br/> &nbsp; &nbsp; &nbsp;<span id="f'+devId+'" onclick="findPhone(this)"><i class="far fa-bell" title="Find Phone"></i></span>&nbsp;&nbsp;&nbsp;<span id="p'+devId+'" onclick="pingPhone(this)"><i class="fa fa-mobile-alt" title="Ping""></i></span>&nbsp;&nbsp;&nbsp;<span id="s'+devId+'" onclick="showDevice(this)" data-bs-toggle="modal" data-bs-target="#sendSMS" dname="'+devN+'" ><i class="fas fa-comment-alt" title="SMS"></i></span></div>';
                            i++;



                    }



                });
           }else{
             document.getElementById('deviceS').innerHTML="";
           }
        }

        //return res;
    });
}

function batteryP(devid,i){
    let packM=document.getElementById("packageManager").value;
    //console.log(packM);
    let dBus='qdbus';
    if(packM=="zypper") dBus='qdbus6';
    if(packM=="pacman") dBus='qdbus6';
    if(packM=="dnf") dBus='qdbus-qt6';
    let batteryQ1=dBus+' org.kde.kdeconnect /modules/kdeconnect/devices/'+devid+'/battery org.kde.kdeconnect.device.battery.charge';
    //console.log(batteryQ1);
    const { exec } = require('child_process');
    //console.log(i);
    //Percentangae
    exec(batteryQ1,(err, stdout, stderr)=>{
        //console.log(err+" "+stdout +" "+stderr);
        if(stdout){
            let str = stdout;
            str=str.substring(0, 5);
            //console.log(str);
            let battP=parseInt(str.trim());
            //console.log(battP);
            if(battP==-1){
              document.getElementById("bat"+i).innerHTML="AC";
            }else{
              document.getElementById("bat"+i).innerHTML=str.trim()+"<small>%</small>";
            }
          //if(str!=undefined){

          //}
        }

    })

}
find(event);

function batteryC(devid,i){
    let packM=document.getElementById("packageManager").value;
    let dBus='qdbus';
    if(packM=="zypper") dBus='qdbus6';
    if(packM=="pacman") dBus='qdbus6';
    if(packM=="dnf") dBus='qdbus-qt6';
    var batteryQ1=dBus+'  org.kde.kdeconnect /modules/kdeconnect/devices/'+devid+'/battery org.kde.kdeconnect.device.battery.isCharging';
    const { exec } = require('child_process');
    //Percentangae
    exec(batteryQ1,(err, stdout, stderr)=>{
        //console.log(err+" "+stdout +" "+stderr);
        if(stdout){
                let str = stdout;
                //console.log(str);
                str=str.substring(0, 5);

                if(str=="Error"){
                    chargeCh="";
                }else{

                    if(stdout.trim()=="true"){
                        chargeCh='<i class="fas fa-plug"></i>';
                    }else{
                        chargeCh='';
                    }
                }

            document.getElementById("batC"+i).innerHTML=chargeCh;
        }

    })

}

function findPhone(element) {
    //console.log(element.id);  // Outputs: "btn1"
    let str=element.id;
    let devID=str.slice(1);

    const { exec } = require('child_process');
    let cmd="kdeconnect-cli -d "+devID.trim()+" --ring";
    //console.log(cmd);
    exec(cmd,(err, stdout, stderr)=>{


    })
}

function pingPhone(element) {
    //console.log(element.id);  // Outputs: "btn1"
    let str=element.id;
    let devID=str.slice(1);
    //console.log(devID);
    const { exec } = require('child_process');
    let cmd="kdeconnect-cli -d "+devID.trim()+" --ping";
    exec(cmd,(err, stdout, stderr)=>{


    })
}

function showDevice(element) {
    //console.log(element.id);  // Outputs: "btn1"
    let str=element.getAttribute("dname");
    document.getElementById("deviceS").innerHTML=" ( "+str+" )";

    let dID=element.id;
    let devID=dID.slice(1);
    document.getElementById("smsDevideID").value=devID;


}

function sendSMS() {
    //console.log(element.id);  // Outputs: "btn1"
    const { exec } = require('child_process');
    let deviceID=document.getElementById("smsDevideID").value;
    let mobile_no=document.getElementById("mobile_no").value;
    let message_text= document.getElementById("smsContent").value;

    //console.log(deviceID +" "+mobile_no+" "+message_text);
    var command="kdeconnect-cli -d "+deviceID.trim()+" --destination "+mobile_no+" --send-sms '"+message_text+"'";
    exec(command,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{

            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            var title="Codentricks";
            var message="SMS sent  ...";

            let sec=3000;
            let smiley="face-smile";
            //let title="Codentricks";
            let msg=`Hello ${user}, Message sent to No. ${mobile_no}`;
            spNotify(sec,smiley, title, msg);

            //sendMessage(title, message);

        }
    })

}

function sendDevice(element) {
    //console.log(element.id);  // Outputs: "btn1"
    let str=element.getAttribute("dn");
    document.getElementById("deviceSF").innerHTML=" ( "+str+" )";

    let dID=element.id;
    let devID=dID.slice(1);
    document.getElementById("sendDevideID").value=devID;


}



document.getElementById("sfile").addEventListener("change", (e) => {
    const { exec } = require('child_process');
    var deviceID=document.getElementById("sendDevideID").value;
    const filePath =  window.fileApi.selectFile();
    if (filePath) {
        consol.log(filePath);
        //console.log('Selected file path:', filePath);
    }


    var sendCommand="kdeconnect-cli -d "+deviceID+" --share '"+file.name+"'";
    console.log(sendCommand);
    exec(sendCommand,(err, stdout, stderr)=>{
        if(err){
            console.log(err);
        }else{

            let user=os.userInfo();
            user=user.username;
            user= user.toUpperCase();
            var title="Codentricks";
            var message="SMS sent  ...";

            let sec=3000;
            let smiley="face-smile";
            //let title="Codentricks";
            let msg=`Hello ${user}, file transfer started ...`;
            spNotify(sec,smiley, title, msg);

        }
    });

});




// launch apps
function launch(element) {
    //console.log(element.id);  // Outputs: "btn1"
    let devID=element.id;
    let cmd=devID;
    //console.log(devID);

    const { exec } = require('child_process');
    //cmd="kdeconnect-cli -d "+devID.trim()+" --ping";
    exec(cmd,(err, stdout, stderr)=>{


    })
}


// wi fi details
function wiFi() {

    const { exec } = require('child_process');
    cmd="nmcli connection show --active | grep wifi | awk '{print $1 }'";
    exec(cmd,(err, stdout, stderr)=>{
        if(stdout){
            //console.log(stdout);
            let str=stdout.trim();
            document.getElementById("ssid").innerHTML='SSID: '+str;
        }

    })
}

// active
function activeInt(){
    const { exec } = require('child_process');
    let cmd= "ip route get 1.1.1.1 | grep -oP 'dev \\K\\w+'";
    //console.log(cmd);
    exec(cmd,(err, stdout, stderr)=>{
        if(stdout){
            //console.log(stdout);
            let str=stdout.trim();
            //console.log(str);
            document.getElementById("activeIn").value=str;
            document.getElementById("activeI").innerHTML="Active Interface: "+str;


        }
    })

}
activeInt();


//network usages
function networkUsage(){
    const { exec } = require('child_process');
    var network = require('network');
    var download;
    var upload;
    var linkQuality;
    let actI=document.getElementById("activeIn").value;
    //console.log(actI);

    //network.get_active_interface(function(err, obj) {
        //console.log(obj.name);
        //obj.name (ACTIVE INTERFACE)
        if(actI!=undefined){
            download="ip -s -c link show "+actI+" | head -4 |tail -1 | awk '{print $1}'";
            upload ="ip -s -c link show wlan0 | tail -n1 | awk '{print $1}'";
            linkQuality ='iwconfig '+actI+' | head -6 | tail -1 | cut -d "=" -f2 |cut -d " " -f1 | cut -d "/" -f1';

            exec(download, (err, stdout, stderr) => {
                if (err) {
                    console.error(err)
                } else {
                    var det=stdout;
                    var downl=det/(1024*1024);
                    downl=downl.toFixed(2);
                    //console.log(downl);
                    document.getElementById("downloaded").innerHTML="Download: "+downl+" MiB";
                }
            });
            exec(upload, (err, stdout, stderr) => {
                if (err) {
                    console.error(err)
                } else {
                    var det=stdout;
                    var downl=det/(1024*1024);
                    downl=downl.toFixed(2);
                    //console.log(stdout);
                    document.getElementById("uploaded").innerHTML="Upload: "+downl+" MiB";
                }
            });
            // exec(linkQuality, (err, stdout, stderr) => {
            exec("nmcli dev wifi | head -2 |  tail -1  | cut -d \"/\" -f2 | awk '{print $2}'", (err, stdout, stderr) => {
                if (err) {
                    console.error(err)
                } else {
                    //console.log(stdout);

                    document.getElementById("linkQuality").innerHTML='Signal Quality: '+stdout.trim()+'<small>%</small> </span>';

                }
            });

        }

        var user=os.userInfo();
        var freeSP="df -h / | awk 'NR==2 {print $4}' | cut -d 'G' -f1";
        var totalSP= "df -h  /| awk 'NR==2 {print $2}' | cut -d 'G' -f1";
        //console.log(totalSP);
        exec(freeSP,(err, stdout, stderr)=>{
            if(err){
                console.log(err);
            }else{
                if(stdout){
                    //console.log(stdout);
                    document.getElementById("homeDirSizeU").innerHTML=stdout.trim();
                }else{
                    document.getElementById("homeDirSizeU").innerHTML="";
                }
            }
        })
        // exec(totalSP,(err, stdout, stderr)=>{
        exec(totalSP,(err, stdout, stderr)=>{
            if(err){
                console.log(err);
            }else{
                if(stdout){
                    //console.log(stdout);
                    document.getElementById("homeDirSize").innerHTML=stdout.trim();
                }else{
                    document.getElementById("homeDirSize").innerHTML="";
                }
            }
        })


        let freeS=document.getElementById("homeDirSizeU").innerHTML;
        let totalS=document.getElementById("homeDirSize").innerHTML;
        let usedS=totalS-freeS;

        let perS=parseInt((usedS/totalS)*100);
        //perS=91;

        let progressBar = document.getElementById('progress-bar');
        let progressBarIn = document.getElementById('progress-barIn');
        progressBar.setAttribute('aria-valuenow', perS);
        progressBarIn.style.width = perS+'%';
        progressBarIn.classList.remove('old-class');

        document.getElementById("storage1u").classList.remove("hideElement");
        document.getElementById("storage2u").classList.remove("hideElement");




        if(perS>90){
            progressBarIn.classList.remove('bg-warning');
            progressBarIn.classList.remove('bg-success');
            progressBarIn.classList.add('bg-danger');
        }else if(perS>=70 && perS<=90){
            progressBarIn.classList.remove('bg-danger');
            progressBarIn.classList.remove('bg-success');
            progressBarIn.classList.add('bg-warning');
        }else{
            progressBarIn.classList.remove('bg-danger');
            progressBarIn.classList.remove('bg-warning');
            progressBarIn.classList.add('bg-success');
        }

    //});


    //lsb_release -a | grep Description

}



deviceList();
setInterval(function(){
    statusIcon();
    //activeInterface();
    wiFi();
    networkUsage();
    //conDeviceID();
    //activeInt();

}, 10000);

setInterval(function(){
    deviceList();
    activeInt();

}, 10000);


