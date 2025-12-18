var os = require('os');
var osu = require('node-os-utils');
//var request = require('request');
var cpu = osu.cpu;


// Uptime
function getUptime() {
    var s =  os.uptime();
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    s=Math.floor(s);
    var up= "" +h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
    document.getElementById("upTime").innerHTML= up;
}


function cpuVendor(){
  const { exec } = require('child_process');
  var cpuTempC= "lscpu | grep 'Vendor ID' | awk '{print $3}'";

  exec(cpuTempC,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
    }else{
      if(stdout!=""){
        //var temp=stdout;
          let vendor = stdout.trim();
          if(vendor){
             document.getElementById("cpuVendor").value=vendor;
          }
      }else{
          document.getElementById("cpuVendor").value="NA";
      }
    }

  })
}

//cpuVendor();

// Cpu Temperature
function cpuTemp(){
   const { exec } = require('child_process');
   let cpuVendor=document.getElementById("cpuVendor").value;


    if(cpuVendor=='GenuineIntel'){
          //var cpuTempC= 'cat /sys/class/thermal/thermal_zone2/temp';
          var cpuTempC="sensors coretemp-isa-0000 | awk '/Package id 0:/ {print int($4)}'";
          //console.log(usedS);

          exec(cpuTempC,(err, stdout, stderr)=>{
            if(err){
              //console.log(err);
            }else{

              if(stdout){
                var temp=stdout.trim();
                //temp = parseInt(stdout/1000);
                if(temp>=75){
                  //document.getElementById("cpuTemp").innerHTML="<span class='danger'>"+temp+"<small>&#x2103;</small></span>";
                  document.getElementById("cpuSTemp").innerHTML="<span class='text-danger'>"+temp+"<small>&#x2103;</small></span>";
                }else if(temp>=55 && temp<75){
                  document.getElementById("cpuSTemp").innerHTML="<span class='text-warning'>"+temp+"<small>&#x2103;</small></span>";
                }else{

                  //document.getElementById("cpuTemp").innerHTML=""+temp+"<small>&#x2103;</small>";
                  document.getElementById("cpuSTemp").innerHTML=""+temp+"<small>&#x2103;</small>";
                }

              }else{
                //document.getElementById("cpuTemp").innerHTML="NA";
                document.getElementById("cpuSTemp").innerHTML="NA";
              }


            }
          })
    }

    if(cpuVendor=='AuthenticAMD'){
      var cpuTempC= "sensors k10temp-pci-00c3 | grep Tctl | awk '{print $2}'";

      exec(cpuTempC,(err, stdout, stderr)=>{
        if(err){
          console.log(err);
        }else{
          if(stdout){
            var temp=stdout.trim();

            temp=Math.round(parseFloat(temp.replace(/[^\d.-]/g, '')));
            //console.log(temp);
            //temp = stdout/1000;
                if(temp>=75){
                  //document.getElementById("cpuTemp").innerHTML="<span class='danger'>"+temp+"<small>&#x2103;</small></span>";
                  document.getElementById("cpuSTemp").innerHTML="<span class='text-danger'>"+temp+"<small>&#x2103;</small></span>";
                }else if(temp>=55 && temp<75){
                  document.getElementById("cpuSTemp").innerHTML="<span class='text-warning'>"+temp+"<small>&#x2103;</small></span>";
                }else{

                  //document.getElementById("cpuTemp").innerHTML=""+temp+"<small>&#x2103;</small>";
                  document.getElementById("cpuSTemp").innerHTML=""+temp+"<small>&#x2103;</small>";
                }

          }else{
            //document.getElementById("cpuTemp").innerHTML="NA";
            document.getElementById("cpuSTemp").innerHTML="NA";

          }
        }
      })
    }

}

let cpuChart = null;
let chartInterval = null;

// Initialize chart once
function initializeCPUChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    
    if (cpuChart) {
        cpuChart.destroy();
    }
    
    cpuChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "CPU Usages",
                data: [],
                pointRadius: 0,
                borderWidth: 1,
                fill: true,
                tension: 0.25,
                borderColor: '#72d1ee',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }]
        },
        options: {
            scales: {
                x: { display: false },
                y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            color: '#fff',
                            callback: function(value) {
                                return value + '%'; // Add percentage sign
                            },
                            stepSize: 10, // Show ticks at 0%, 20%, 40%, 60%, 80%, 100%
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        border: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                }
            },
            animation: false,
            plugins: {
                legend: {
                    labels: {
                        generateLabels: (chart) => {
                            return chart.data.datasets.map((dataset, i) => ({
                                text: dataset.label,
                                fillStyle: 'white',
                                strokeStyle: 'white',
                                fontColor: 'white',
                                hidden: !chart.isDatasetVisible(i),
                                datasetIndex: i
                            }));
                        }
                    }
                }
            }
        }
    });
}

function osCPU() {
    cpu.usage()
    .then(cpuPercentage => {
        cpuP = Math.round(cpuPercentage);
        
        // Update CPU usage display
        if (cpuP <= 40) {
            document.getElementById("cpuUsages").innerHTML = '<span class="success">' + cpuP + '<small>%</small></span>';
        } else if (cpuP > 40 && cpuP <= 80) {
            document.getElementById("cpuUsages").innerHTML = '<span class="warning">' + cpuP + '<small>%</small></span>';
        } else {
            document.getElementById("cpuUsages").innerHTML = '<span class="danger">' + cpuP + '<small>%</small></span>';
        }

        // Initialize chart if it doesn't exist
        if (!cpuChart) {
            initializeCPUChart();
        }

        // Update chart with new data point
        const now = new Date().toLocaleTimeString();
        cpuChart.data.labels.push(now);
        cpuChart.data.datasets[0].data.push(cpuP);
        
        // Keep only last 20 data points
        if (cpuChart.data.labels.length > 30) {
            cpuChart.data.labels.shift();
            cpuChart.data.datasets[0].data.shift();
        }
        
        cpuChart.update();

    })
    .catch(error => {
        console.error('Error getting CPU usage:', error);
    });
}

// Call osCPU periodically instead of creating multiple intervals
setInterval(osCPU, 1000);

// Initialize chart on page load
document.addEventListener('DOMContentLoaded', initializeCPUChart);

// core count command : grep -c ^processor /proc/cpuinfo
function core(){
  const { exec } = require('child_process');

  let core= "lscpu | grep 'Core(s) per socket' | awk '{print $4}'";
  exec(core,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
    }else{
      if(stdout){

        document.getElementById("core").innerHTML=stdout;

      }
    }
  })
}


function corethread(){
  const { exec } = require('child_process');
  core();
  let threadc= "lscpu | awk -F: '/Thread\\(s\\) per core/ {gsub(/ /,\"\",$2); print $2}'";
  exec(threadc,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
    }else{
      if(stdout){

        let cpuNo=document.getElementById("core").innerHTML;
        //console.log(cpuNo);

        if(cpuNo){
          cpuNo=parseInt(cpuNo);
          stdout=parseInt(stdout);
          let thread=cpuNo*stdout;
          //console.log(thread);
          document.getElementById("thread").innerHTML=thread;
        }
      }
    }
  })

}
// installed memory
function totalRam(){
  const { exec } = require('child_process');
  var totalM= "free -m | head -2 | tail -1|  awk '{print $2}'";
  exec(totalM,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
    }else{
      if(stdout){
        stdout=parseFloat(stdout);
        //console.log(stdout);
        var total=(stdout/1024).toFixed(2);
        //console.log(total);
        document.getElementById("totalM").innerHTML="/"+total+"<small>GiB</small>";
      }else{
        document.getElementById("totalM").innerHTML="NA";
      }
    }
  })
}

// used ram %
function usedRam(){
  const { exec } = require('child_process');
  //var usedM= "grep -P 'MemTotal|MemAvailable' /proc/meminfo | awk '{print $2/1024}' | paste -sd- - | bc";
  var usedM="awk '/MemTotal/{t=$2}/MemAvailable/{a=$2} END{print (t-a)/1024}' /proc/meminfo";
  exec(usedM,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
    }else{
      if(stdout){
        stdout=parseFloat(stdout);
        var totalMemory=os.totalmem();
        totalMemory=totalMemory /(1024*1024*1024);
        totalMemory=totalMemory.toFixed(2)
        //console.log(totalMemory);
        var used=(stdout/1024).toFixed(2);
        let usedRP=(used/totalMemory)*100;
        usedRP=Math.round(usedRP);
        //console.log(total);
        document.getElementById("usedM").innerHTML=used+"<small>GiB</small>";
        document.getElementById("memoryUsages").innerHTML=usedRP+"<small>%</small>";
      }else{
        document.getElementById("usedM").innerHTML="NA";
        document.getElementById("memoryUsages").innerHTML="NA";
      }
    }
  })
}

// Swap
function usedSwap(){
  const { exec } = require('child_process');
  var usedS= "free  | head -3 | tail -1";
  exec(usedS,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
    }else{
      if(stdout){
        //console.log(stdout);
        let str = stdout;
        let arr = str.trim().split(/\s+/);
        let totalS=arr[1];
        //totalS=totalS.slice(0, -1);
        totalS=totalS / (1024 ** 2);
        totalS=totalS.toFixed(2);

        let usedS=arr[2];
        //usedS=680000;

        usedS=usedS / (1024 ** 2);
        usedS=usedS.toFixed(2)
        //console.log(usedS);

      //usedS=300;
        let swapP=(usedS/totalS)*100;
        //console.log(swapP);
        swapP=Math.round(swapP);

        document.getElementById("usedS").innerHTML=usedS+"<small>GiB</small>";
        document.getElementById("totalS").innerHTML="/"+totalS+"<small>GiB</small>";
        document.getElementById("swapUsages").innerHTML=""+swapP+"<small>%</small>";

      }

    }
  })
}

//GPU vendor
function gpuVendor(){
  const { exec } = require('child_process');
  let cmd='lspci | grep -E "VGA|3D|Display" | grep -oE "Intel|NVIDIA|AMD|ATI"';

  exec(cmd,(err,stdout,stderr)=>{
    if(err){
      //console.log(err);
    }else{
     let output=stdout.trim();
     //console.log(output);
     if(stdout){
       document.getElementById("gpuV").value=output;
     }
    }

  });
}

//gpuVendor();

// GPU Details
function gpuD(){
  const { exec } = require('child_process');
  //let GPU= "glxinfo | grep \"OpenGL renderer\" | cut -d ':' -f2 | sed 's/^ //'";
  let GPU='lspci | grep -i vga | cut -d ":" -f3 | cut -d "(" -f1';
  exec(GPU,(err, stdout, stderr)=>{
    if(err){
      //console.log(err);
    }else{
      if(stdout != null){
        //console.log(stdout);
        document.getElementById("gpuD").innerHTML=stdout;
      }else{

      }
    }
  })
}

// GPU Details
function nvidiaV(){
  const { exec } = require('child_process');
  let gpu=document.getElementById("gpuV").value;
  if(gpu=="NVIDIA"){
    let GPU='nvidia-smi | grep "Driver Version" | cut -d " "  -f3';
    exec(GPU,(err, stdout, stderr)=>{
      if(err){
        console.log(err);
      }else{
        if(stdout){
          //stdout=parseFloat(stdout);
          document.getElementById("nvidiaV").innerHTML=stdout;
        }
      }
    })
  }

}

// GPU Details
function nvidiaT(){
  const { exec } = require('child_process');
  let gpu=document.getElementById("gpuV").value;
  if(gpu=="NVIDIA"){
    let GPU='nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader,nounits';
    exec(GPU,(err, stdout, stderr)=>{
      if(err){
        //console.log(err);
        //document.getElementById("gpuTM").style.display="none";
      }else{
        if(stdout){
          //stdout=parseFloat(stdout);
          //console.log(stdout);
          document.getElementById("gpuTM").style.display="block";
          //document.getElementById("nvidiaT").innerHTML=" Temp.: "+stdout+"&#x2103;";
          document.getElementById("gpuSTemp").innerHTML=" "+stdout.trim()+"<small>&#x2103;</small>";
        }
      }
    })
  }else{
    document.getElementById("gpuTM").style.display="none";
  }
}

// SSD Details
function ssdM(){
  const { exec } = require('child_process');

  let GPU='lsblk -no MODEL /dev/nvme0n1';
  exec(GPU,(err, stdout, stderr)=>{
    //console.log(err);
    if(err){
      //console.log(err);
      document.getElementById("nvmeD").style.display="none";
    }else{
      if(stdout){
         //console.log(stdout);
         document.getElementById("nvmeD").style.display="block";
         document.getElementById("ssd").innerHTML=stdout.trim();

      }
    }
  })
}

function ssdT(){
  const { exec } = require('child_process');

  let GPU="sensors | grep -A 5 nvme | awk '/Composite/ {gsub(/[+°C]/,\"\",$2); print int($2)}'";
  exec(GPU,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
    }else{
      if(stdout){
        //stdout=parseFloat(stdout);
        let temp=stdout.trim();
        if(temp>=55){
            document.getElementById("ssdSTemp").innerHTML="<span class='text-danger'>"+temp+"<small>&#x2103;</small></span>";
        }else if(temp>=45 && temp<55){
            document.getElementById("ssdSTemp").innerHTML="<span class='text-warning'>"+temp+"<small>&#x2103;</small></span>";
        }else{
            document.getElementById("ssdSTemp").innerHTML=""+temp+"<small>&#x2103;</small>";
        }
        //document.getElementById("ssdSTemp").innerHTML=stdout.trim()+"<small>&#x2103;</small>";
      }
    }
  })
}

//hdd details
function hddM(){
  const { exec } = require('child_process');
  //let GPU= "glxinfo | grep \"OpenGL renderer\" | cut -d ':' -f2 | sed 's/^ //'";
  let GPU='lsblk -no MODEL /dev/sda';
  exec(GPU,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
    }else{
      if(stdout){
        //stdout=parseFloat(stdout);
        document.getElementById("hdd").innerHTML=stdout.trim();
      }
    }
  })
}

function hddT(){
  const { exec } = require('child_process');

  let GPU=`sensors | grep -A 5 drivetemp | awk '/temp1/ {gsub(/[+°C]/,"",$2); print int($2)}'`;
  exec(GPU,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
      document.getElementById("hddD").style.display="none";
    }else{
      if(stdout){
        //stdout=parseFloat(stdout);
        document.getElementById("hddD").style.display="block";
        let temp=stdout.trim();
        if(temp>=50){
            document.getElementById("hddSTemp").innerHTML="<span class='text-danger'>"+temp+"<small>&#x2103;</small></span>";
        }else if(temp>=40 && temp<50){
            document.getElementById("hddSTemp").innerHTML="<span class='text-warning'>"+temp+"<small>&#x2103;</small></span>";
        }else{
            document.getElementById("hddSTemp").innerHTML=""+temp+"<small>&#x2103;</small>";
        }
        //document.getElementById("hddSTemp").innerHTML=stdout.trim()+"<small>&#x2103;</small>";
      }else{
        document.getElementById("hddD").style.display="none";
      }
    }
  })
}
// system tempreture
function sysT(){
  const { exec } = require('child_process');

  let GPU=`sensors | grep -A 5 acpitz-acpi-0 | awk '/temp1/ {gsub(/[+°C]/,"",$2); print int($2)}'`;
  exec(GPU,(err, stdout, stderr)=>{
    if(err){
      console.log(err);
    }else{
      if(stdout){
        //stdout=parseFloat(stdout);
        document.getElementById("acpitz").style.display="block";
        document.getElementById("sysTemp").innerHTML=stdout.trim()+"<small>&#x2103;</small>";
      }else{
        //acpitz
        document.getElementById("acpitz").style.display="none";
      }
    }
  })
}

// function systemT(){
//   const { exec } = require('child_process');

//   let GPU=`sensors | grep -A 5 acpitz-acpi-0 | awk '/temp1/ {gsub(/[+°C]/,"",$2); print int($2)}'`;
//   exec(GPU,(err, stdout, stderr)=>{
//     if(err){
//       console.log(err);
//     }else{
//       if(stdout){
//         //stdout=parseFloat(stdout);
//         document.getElementById("hddSTemp").innerHTML=stdout.trim()+"<small>&#x2103;</small>";
//       }
//     }
//   })
// }





// OS details
function osD(){

  const { exec } = require('child_process');
  exec('lsb_release -a | grep Description', (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    } else {
      //console.log(stdout);
      document.getElementById("osDetect").innerHTML=""+stdout.slice(12);//+""+os.arch()+"";
      //console.log(`stderr: ${stderr}`);
    }
  });

}

//boot time
function bootingTime(){
  const { exec } = require('child_process');
  var boot="systemd-analyze | head -n1 | tail -n1 | grep -o '=.*' |awk '{print $2 \" \" $3}'";
  exec(boot,(err,stdout,stderr)=>{
    if(stdout){

      document.getElementById("boottime").innerHTML='OS BOOT TIME : '+stdout;

    }
  });
}

// DE
function desktopEnvironment() {
  const { exec } = require('child_process');
  exec("echo $XDG_CURRENT_DESKTOP",(err, stdout, stderr)=>{
    if(stdout){
      document.getElementById("de").innerHTML="DE: "+stdout.trim();
    }
  })
}
// Graphical Interface
function graphicsEnvironment() {
  const { exec } = require('child_process');
  exec("echo $XDG_SESSION_TYPE",(err, stdout, stderr)=>{
    if(stdout){
      stdout=stdout.trim();
      document.getElementById("graphic_platform").innerHTML="("+stdout.toUpperCase()+")";
    }
  })
}
// Cache
function l1Cache() {
  const { exec } = require('child_process');
  exec("lscpu | grep \"L1i cache\" | awk '{print $3 $4}'",(err, stdout, stderr)=>{
    if(stdout){
      document.getElementById("l1cache").innerHTML="Cache: L1 - "+stdout.trim()+",";
    }
  })
}
function l2Cache() {
  const { exec } = require('child_process');
  exec("lscpu | grep \"L2 cache\" | awk '{print $3 $4}'",(err, stdout, stderr)=>{
    if(stdout){
      document.getElementById("l2cache").innerHTML="L2 - "+stdout.trim()+",";
    }
  })
}
function l3Cache() {
  const { exec } = require('child_process');
  exec("lscpu | grep \"L3 cache\" | awk '{print $3 $4}'",(err, stdout, stderr)=>{
    if(stdout){
      document.getElementById("l3cache").innerHTML="L3 - "+stdout.trim()+"";
    }
  })
}

// Virtualization
function virtaL() {
  const { exec } = require('child_process');
  exec("lscpu | grep \"Virtualization\" | awk '{print $2}'",(err, stdout, stderr)=>{
    if(stdout){
      //console.log(stdout);
      document.getElementById("virta").innerHTML="Virtualization: "+stdout;
    }
  })
}

// manufacturer
function manfact() {
  const { exec } = require('child_process');
  exec("cat /sys/class/dmi/id/sys_vendor",(err, stdout, stderr)=>{
    if(stdout){
      //console.log(stdout);
      document.getElementById("manfact").innerHTML=""+stdout.trim()+"";
    }
  })
}

// product
function product() {
  const { exec } = require('child_process');
  exec("cat /sys/class/dmi/id/product_name",(err, stdout, stderr)=>{
    if(stdout){
      //console.log(stdout);
      document.getElementById("product").innerHTML=" "+stdout+"";
    }
  })
}

// Screen Resolution
function screenR() {
  const { exec } = require('child_process');
  exec("xdpyinfo | grep dimensions | awk '{print $2}'",(err, stdout, stderr)=>{
    if(stdout){
      //console.log(stdout);
      document.getElementById("screen").innerHTML="Display: "+stdout.trim()+"<small>px</small>";
    }
  })
}

// Refresh rate
function refreshR() {
  const { exec } = require('child_process');
  exec("xrandr | grep '*' | awk '{print $2}'",(err, stdout, stderr)=>{
    if(stdout){
      //console.log(stdout);
      let str=stdout.trim();
      str=str.slice(0, -2);
      let snum=Math.round(str);
      document.getElementById("refresh").innerHTML=" @"+snum+"<small>Hz</small>";
    }
  })
}

// Monitor Model
function monitorM() {
  const { exec } = require('child_process');
  exec("wayland-info -i wl_output | grep 'model:' | awk -F': ' '{print $3}'",(err, stdout, stderr)=>{
    if(stdout){
      //console.log(stdout);
      let str=stdout.trim();
      str=str.slice(0, -1);
      document.getElementById("mmodel").innerHTML=" "+str+"";
    }
  })
}


// currency
function currency() {
    const api = "https://api.exchangerate-api.com/v4/latest/USD";

    fetch(api)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON data from response
    })
    .then(data => {
      //console.log('Fetched Data:', data);

      let rate=data['rates'];
      let inr=rate.INR;
      document.getElementById("inr").innerHTML="1$ = "+inr+"₹";
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });


}

function spNotify(sec,smiley, title, msg){
  let cmd=`notify-send -a  CODENTRICKS -t ${sec} -i ${smiley} "${title}" "${msg}"`;
  //console.log(cmd);
  const { exec } = require('child_process');
  exec(cmd,(err, stdout, stderr)=>{
    if(stdout){
      //console.log(stdout);
      let str=stdout.trim();
      str=str.slice(0, -1);
      document.getElementById("mmodel").innerHTML=" "+str+"";
    }
  })

}

function systemType(){
  const { exec } = require('child_process');
  let cmd='hostnamectl chassis';

  exec(cmd,(err,stdout,stderr)=>{
    if(err){
      console.log(err);
    }else{
      let output=stdout.trim();
      //console.log(output);
      if(stdout){
        document.getElementById("systemT").value=output;
      }
    }

  });
}



function eyeProtect(){
    let user=os.userInfo();
    user=user.username;
    user= user.toUpperCase();
    let sec=3000;
    let smiley="face-smile";
    let title="Eye Excercise";
    let msg=`${user} its time to take Rest and do some excercise like eye blinking, Wrist Excercise and Back Streching ...`;
    spNotify(sec,smiley, title, msg);
}
//eyeProtect();
//spNotify(3000,"face-smile", "hello", "how are u");

// onload display
window.onload = function() {
  var user=os.userInfo();
  var cpu=os.cpus();
  cpu = JSON.stringify(cpu);
  cpu =  JSON.parse(cpu);
  //console.log(user);
  document.getElementById("arch").innerHTML=" &nbsp;<small>"+os.arch()+"</small>";
  document.getElementById("user").innerHTML="User: "+user.username;
  document.getElementById("userShell").innerHTML="Shell: "+user.shell;
  document.getElementById("userUID").innerHTML="UID: "+user.uid;
  document.getElementById("homeDir").innerHTML="DIR: "+user.homedir;
  document.getElementById("cpuName").innerHTML=cpu[0].model;

  getUptime();
  cpuVendor();
  ssdM();
  hddM();
  cpuTemp();
  osCPU();
  core();
  corethread();
  totalRam();
  usedRam();
  usedSwap();
  gpuVendor();
  gpuD();
  osD();
  bootingTime();
  desktopEnvironment();
  graphicsEnvironment();
  l1Cache();
  l2Cache();
  l3Cache();
  //virtaL();
  manfact();
  product();
  screenR();
  refreshR();
  monitorM();
  nvidiaV();
  nvidiaT();
  sysT();
  systemType();
  currency();



}
setInterval(function(){
  getUptime();
  //gpuVendor();
}, 1000);

setInterval(function(){
    cpuTemp();
    sysT();
    osCPU();
    usedRam();
    usedSwap();
    nvidiaT();
    ssdT();
    hddT();
    corethread();
    systemType();
    //statusIcon();
}, 5000);

setInterval(function(){
  eyeProtect();
}, 20 * 60 * 1000);

