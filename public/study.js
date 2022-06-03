//Pomodoro Timer 
  var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#start').onclick = function(e){
      
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(e){
                 self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(e){
       
        self.startLongBreak.apply(self);
      };
      document.querySelector('#stop').onclick = function(e){
       
        self.stopTimer.apply(self);
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      document.getElementById("onComplete").play();
      alert("Timer Complete!");
    }
  
  };
  window.onload = function(){
  pomodoro.init();
  };
  
  
  //Music Player Javascript
  var audioList = ['song1','song2','song3','song4','song5']
  var coverImg = document.getElementById("cover")
  var player= document.getElementById("audio");
  var progress = document.getElementById("progress")
  var progressContainer = document.getElementById("progress-container")
  var title = document.getElementById("title")

  var actvieAudio = 0;
  player.src = "audio/"+audioList[actvieAudio]+".mp3";
  cover.setAttribute("src","songimg/"+audioList[actvieAudio]+".jpg")
  
  playbt = document.getElementById("play")
  prevbt = document.getElementById("prev")
  nextbt = document.getElementById("next")
  
  playbt.addEventListener('click',function(){
  if (player.paused) {
  player.play()
  playbt.querySelector(".fas").classList.remove("fa-play");
  playbt.querySelector(".fas").classList.add("fa-pause")
  }else{
   player.pause();
   playbt.querySelector(".fas").classList.remove("fa-pause")
    playbt.querySelector(".fas").classList.add("fa-play");
  }
  })
  
  player.addEventListener("ended",function(){
   playbt.querySelector(".fas").classList.remove("fa-pause")
    playbt.querySelector(".fas").classList.add("fa-play");
  })
  
  nextbt.addEventListener("click",function(){
   if(prevbt.disabled){
    prevbt.disabled = false;
  }
   actvieAudio ++;
    if(actvieAudio == audioList.length-1){
      actvieAudio --;
      nextbt.setAttribute("disabled",true)
    }
    else{
   if (!player.paused) {
  player.pause()
  playbt.querySelector(".fas").classList.remove("fa-pause")
    playbt.querySelector(".fas").classList.add("fa-play");
  }
  
  player.src = "audio/"+audioList[actvieAudio]+".mp3";
  cover.setAttribute("src","songimg/"+audioList[actvieAudio]+".jpg")
  player.play()
  playbt.querySelector(".fas").classList.remove("fa-play");
  playbt.querySelector(".fas").classList.add("fa-pause")
  }
  })
  
  prevbt.addEventListener("click",function(){
  if(nextbt.disabled){
    nextbt.disabled = false;
  }
    actvieAudio --;
  if(actvieAudio < 0){
      actvieAudio ++;
      prevbt.setAttribute("disabled",true)
    }
  
   if (!player.paused) {
  player.pause()
  playbt.querySelector(".fas").classList.remove("fa-pause")
    playbt.querySelector(".fas").classList.add("fa-play");
  }
  
  player.src = "audio/"+audioList[actvieAudio]+".mp3";
  cover.setAttribute("src","songimg/"+audioList[actvieAudio]+".jpg")
  player.play()
  playbt.querySelector(".fas").classList.remove("fa-play");
  playbt.querySelector(".fas").classList.add("fa-pause")
  })