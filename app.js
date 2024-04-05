// Get UI 
const getaudioscreen = document.getElementById("audioscreen");
const playbtn = document.getElementById('play'),
    prevbtn = document.getElementById('prev'),
    nextbtn = document.getElementById('next'),
    stopbtn = document.getElementById('stop');
const getprogress = document.getElementById('progress'),
    getprogressbar = document.getElementById('progress-bar');
const getvolumeprogress = document.getElementById('volumeprogress');
const getdisplaytime = document.getElementById('displaytime');

const audios = ['sample1','sample2','sample3'];

let curridx = 0;
// console.log(audios[curridx]);

// loadaudio(audios[curridx]);

function loadaudio(audios){
    getaudioscreen.src = `./source/${audios}.mp3`;
}

function playaudio(){

    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');


    getaudioscreen.play();//default function
}

function pauseaudio(){

    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');


    getaudioscreen.pause();//default function
}





function playandpauseaudio(){

    

    // paused = default keuwork for audio/video 
    if(getaudioscreen.paused){
        getaudioscreen.play();
    }else{
        getaudioscreen.pause();
    }
}

function nextaudio(){
    curridx++;

    if(curridx > audios.length-1){
        curridx = 0;
    }
    console.log(curridx);

        loadaudio(audios[curridx]);
        playaudio();
}

function previousaudio(){
    curridx--;

    if(curridx < 0){
        curridx =  audios.length-1;
    }
    console.log(curridx);

        loadaudio(audios[curridx]);
        playaudio();
}

function updateprogress(e){
    // console.log(e.trget);

    // console.log(e.target.duration);
    // console.log(e.target.currentTime);

    // const getduration = e.target.duration;
    // const getcurrenttime = e.target.currentTime;
    // console.log(getduration,getcurrenttime);

    
    // const {duration,currentTime} = e.target;
    // console.log(duration,currentTime);

    const {duration} = e.target;
    const {currentTime} = e.target;
    // console.log(duration,currentTime);

    if(currentTime === 0){
        getprogressbar.style.width = "0%";
    }else{
        const getprogresspercent = (currentTime/duration)*100;
        // console.log(getprogresspercent);

        getprogressbar.style.width = `${getprogresspercent}%`;
    }
    // forward 
    // const mins = Math.floor((currentTime)/60);
    // const secs = Math.floor((currentTime)%60);


    // backward 
    const mins = Math.floor((duration-currentTime)/60);
    const secs = Math.floor((duration-currentTime)%60);
    // console.log(typeof mins);

    const minsvalue = mins.toString().padStart(2,'0'); //if you use padStart() concat number must be string
    const secsvalue = secs.toString().padStart(2,'0'); //if you use padStart() concat number must be string


    getdisplaytime.innerText = `${minsvalue}:${secsvalue}`;
}

function stopaudio(){
    getaudioscreen.currentTime = 0;
    getprogressbar.style.width = `${getaudioscreen.currentTime}%`;
    pauseaudio();
}

function volumecontrol(){
    // console.log(getvolumeprogress.value);
    // console.log(getaudioscreen.volume);

    // volume is default key from audio/video
    getaudioscreen.volume = getvolumeprogress.value/100;


    // 1 is default (100%)
    // 0.5 half volume (50%)
    // 0 mute (0%)
}

function progressaudioclick(e){
    // console.log(this);
    // console.log(e.target);

    const width = this.clientWidth;
    console.log(width);

    const clickx = e.offsetX;
    console.log(clickx);

    const getduration = getaudioscreen.duration;
    console.log(getduration);

    getaudioscreen.currentTime = (clickx/width) * getduration;
    console.log(getaudioscreen.curentTime);
}


getaudioscreen.addEventListener('timeupdate',updateprogress);
getaudioscreen.addEventListener('play',playaudio);
getaudioscreen.addEventListener('pause',pauseaudio);


playbtn.addEventListener('click',playandpauseaudio);
nextbtn.addEventListener('click',nextaudio);  //0 1 2 0 1 2
prevbtn.addEventListener('click',previousaudio); //2 1 0 2 1 0
stopbtn.addEventListener('click',stopaudio);
getvolumeprogress.addEventListener('change',volumecontrol);
getprogress.addEventListener('click',progressaudioclick);










