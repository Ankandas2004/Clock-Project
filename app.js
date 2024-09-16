                     /*NAVBAR JS*/

document.addEventListener("DOMContentLoaded", function() {
    showSection('stopwatch'); 
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}


                     /*STOPWATCH JS*/


let ms = 0, s = 0, m = 0, h = 0;
let timer;

let laps=document.getElementById("laps");
let display=document.getElementById("timer-display");

function start(){
    if(!timer){
        timer = setInterval(run, 10);
    }
}

function run(){
    display.innerHTML = getTimer();
    ms++;         
    if(ms == 100){
        ms = 0;
        s++;
    }
    if(s == 60){ 
        s = 0;
        m++;
    }
    if(m == 60){
        m = 0;
        h++;
    }
    
    if(h == 13){
        h = 1;
    } 
}

function getTimer(){
    return (h<10 ? "0" + h: h) + " : " + (m<10 ? "0" + m : m) + " : " + (s<10 ? "0" + s : s) + " : " + (ms<10 ? "0" + ms : ms); 
}

function pause(){
    stopTimer();
}

function stopTimer(){
    clearInterval(timer);
    timer = false ;
}

function reset(){
    stopTimer()
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    display.innerHTML = getTimer();
}

function restart(){
    if(timer){ 
        reset();
        start();
    }
    
}

function lap() {
    if(timer) {   
        let Li=document.createElement("li"); 
        Li.innerHTML = getTimer();
        laps.appendChild(Li);
    }
}

function resetlap(){
    laps.innerHTML="";
}


                         /*ALARM CLOCK JS*/
                        

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("o-sajni-re-arijit-singh-song-mobcup-vip-1-63259.mp3");


function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
           pe = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var week = ["Sunday", "Monday", "Tusday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname], months[mo], dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),pe];
        
        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`){
                //console.log("Alarm ringing...");
                ring.load();
                ring.play();
                document.querySelector("#stopAlarm").style.visibility= "visible";
            }
        }
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}


//Set Alarm section


for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//add alarm 


function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
    }

}

setAlarmBtn.addEventListener("click",setAlarm);

//delete alarm

function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}

function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}



//                      /*WORLD CLOCK JS*/


const countries = [
    { name: "New York", timeZone: "America/New_York" },
    { name: "London", timeZone: "Europe/London" },
    { name: "Tokyo", timeZone: "Asia/Tokyo" },
    { name: "Sydney", timeZone: "Australia/Sydney" },
    { name: "Dubai", timeZone: "Asia/Dubai" },
    { name: "Paris", timeZone: "Europe/Paris" },
    { name: "Moscow", timeZone: "Europe/Moscow" },
    { name: "Beijing", timeZone: "Asia/Shanghai" },
    { name: "Hong Kong", timeZone: "Asia/Hong_Kong" },
    { name: "Rio de Janeiro", timeZone: "America/Sao_Paulo" },
    { name: "Los Angeles", timeZone: "America/Los_Angeles" },
    { name: "Mexico City", timeZone: "America/Mexico_City" },
    { name: "Cairo", timeZone: "Africa/Cairo" },
    { name: "Istanbul", timeZone: "Europe/Istanbul" },
    { name: "Buenos Aires", timeZone: "America/Argentina/Buenos_Aires" },
    { name: "New Delhi", timeZone: "Asia/Kolkata" },
    { name: "Seoul", timeZone: "Asia/Seoul" },
    { name: "Singapore", timeZone: "Asia/Singapore" },
    { name: "Toronto", timeZone: "America/Toronto" },
    { name: "Berlin", timeZone: "Europe/Berlin" },
    { name: "Rome", timeZone: "Europe/Rome" },
    { name: "Athens", timeZone: "Europe/Athens" },
    { name: "Jerusalem", timeZone: "Asia/Jerusalem" },
    { name: "Jakarta", timeZone: "Asia/Jakarta" },
    { name: "Kuala Lumpur", timeZone: "Asia/Kuala_Lumpur" },
    { name: "Manila", timeZone: "Asia/Manila" },
    { name: "Lima", timeZone: "America/Lima" },
    { name: "Bogotá", timeZone: "America/Bogota" },
    { name: "Santiago", timeZone: "America/Santiago" },
    { name: "Wellington", timeZone: "Pacific/Auckland" },
    { name: "Auckland", timeZone: "Pacific/Auckland" },
    { name: "Honolulu", timeZone: "Pacific/Honolulu" },
    { name: "San Francisco", timeZone: "America/Los_Angeles" },
    { name: "Chicago", timeZone: "America/Chicago" },
    { name: "Houston", timeZone: "America/Chicago" },
    { name: "Denver", timeZone: "America/Denver" },
    { name: "Seattle", timeZone: "America/Los_Angeles" },
    { name: "Atlanta", timeZone: "America/New_York" },
    { name: "Philadelphia", timeZone: "America/New_York" },
    { name: "Dallas", timeZone: "America/Chicago" },
    { name: "Boston", timeZone: "America/New_York" },
    { name: "Washington, D.C.", timeZone: "America/New_York" },
    { name: "Montreal", timeZone: "America/Toronto" },
    { name: "Vancouver", timeZone: "America/Vancouver" },
    { name: "Cape Town", timeZone: "Africa/Johannesburg" },
    { name: "Nairobi", timeZone: "Africa/Nairobi" },
    { name: "Lagos", timeZone: "Africa/Lagos" },
    { name: "Accra", timeZone: "Africa/Accra" },
    { name: "Bangkok", timeZone: "Asia/Bangkok" },
    { name: "Karachi", timeZone: "Asia/Karachi" },
    { name: "Tehran", timeZone: "Asia/Tehran" },
    { name: "Baghdad", timeZone: "Asia/Baghdad" },
    { name: "Riyadh", timeZone: "Asia/Riyadh" },
    { name: "Hanoi", timeZone: "Asia/Bangkok" },
    { name: "Kathmandu", timeZone: "Asia/Kathmandu" },
    { name: "Rangoon", timeZone: "Asia/Yangon" },
    { name: "Kathmandu", timeZone: "Asia/Kathmandu" }
];

const selectElement = document.getElementById('countrySelect');
const clockDisplay = document.getElementById('clockDisplay');

countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.timeZone;
    option.textContent = country.name;
    selectElement.appendChild(option);
});

function updateTime() {
    const selectedTimeZone = selectElement.value;
    if (selectedTimeZone) {
        const now = new Date();
        const localTime = new Date(now.toLocaleString("en-US", { timeZone: selectedTimeZone }));
        const hours = localTime.getHours().toString().padStart(2, '0');
        const minutes = localTime.getMinutes().toString().padStart(2, '0');
        const seconds = localTime.getSeconds().toString().padStart(2, '0');

        clockDisplay.textContent = `Time: ${hours}:${minutes}:${seconds}`;
    } else {
        clockDisplay.textContent = '';
    }
}

setInterval(updateTime, 1000);

selectElement.addEventListener('change', updateTime);



                     /*COUNTDOWN TIMER JS*/

let countdownInterval;

document.getElementById('date-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const endDate = new Date(document.getElementById('end-date').value).getTime();
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => countdown(endDate), 1000);
});

const countdown = (endDate) => {
    const now = new Date().getTime();
    const gap = endDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(gap / day);
    const hours = Math.floor((gap % day) / hour);
    const minutes = Math.floor((gap % hour) / minute);
    const seconds = Math.floor((gap % minute) / second);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minute").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("second").innerText = seconds < 10 ? '0' + seconds : seconds;

    if (gap < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerText = '00';
        document.getElementById("hours").innerText = '00';
        document.getElementById("minute").innerText = '00';
        document.getElementById("second").innerText = '00';
        alert("Countdown has ended!");
    }
};