module.exports = {
    "DashboardBasePath": "C:\\Users\\Luke\\AppData\\Roaming\\Emby-Server\\system\\dashboard-ui",
    "DashboardBackupPath": "E:\\EmbyData\\backups",
    "FindAndOverwrite": [
        { source: "E:\\EmbyData\\ModificationHold\\movies.js", dest: "movies" },
        { source: "E:\\EmbyData\\ModificationHold\\music.js", dest: "music" },
        { source: "E:\\EmbyData\\ModificationHold\\tv.js", dest: "tv" },
        { source: "E:\\EmbyData\\ModificationHold\\qualityoptions.js", dest: "bower_components\\emby-webcomponents" },
        { source: "E:\\EmbyData\\ModificationHold\\favicon.ico", dest: "\\" },
        { source: "E:\\EmbyData\\ModificationHold\\touchicon.png", dest: "\\" },
        { source: "E:\\EmbyData\\ModificationHold\\touchicon72.png", dest: "\\" },
        { source: "E:\\EmbyData\\ModificationHold\\touchicon114.png", dest: "\\" },
        { source: "E:\\EmbyData\\ModificationHold\\touchicon144.png", dest: "\\" },
        { source: "E:\\EmbyData\\ModificationHold\\logowhite.png", dest: "modules\\logoscreensaver" },
        { source: "E:\\EmbyData\\ModificationHold\\logodark.png", dest: "modules\\themes" },
        { source: "E:\\EmbyData\\ModificationHold\\logowhite.png", dest: "modules\\themes" },
        { source: "E:\\EmbyData\\ModificationHold\\black-blue", dest: "modules\\themes" },
        { source: "E:\\EmbyData\\ModificationHold\\dark-blue", dest: "modules\\themes" },
        { source: "E:\\EmbyData\\ModificationHold\\blueradiance", dest: "modules\\themes" },
        { source: "E:\\EmbyData\\ModificationHold\\wmc", dest: "modules\\themes" },
    ],
    "FindAndInsert": [
        { findString: '{name:"Dark (red accent)",id:"dark-red"},', insertString: '{name:"Dark (blue accent)",id:"dark-blue"}', destFile: "modules\\skinmanager.js" },
        { findString: '{name:"Dark (red accent)",id:"dark-red"},', insertString: '{name:"Black (blue accent)",id:"black-blue"}', destFile: "modules\\skinmanager.js" },
        { 
            findString: 'view.querySelector(".btnPip").addEventListener("click",function(){playbackManager.togglePictureInPicture(currentPlayer)}),', 
            insertString: `nowPlayingVolumeSlider.addEventListener("wheel", function(e) {
                var step = localStorage.getItem("audioScrollStep") || 5;
            
                if(Math.sign(e.deltaY) === -1) {
                  this.stepUp(step);
                } else {
                  this.stepDown(step);
                }
            
                var bubble = document.querySelector(".videoOsdVolumeSliderWrapper > .videoOsdVolumeSliderWrapper2 > .sliderContainer > .sliderBubble > .sliderBubbleText");
                var sliderBubble = document.querySelector(".videoOsdVolumeSliderWrapper > .videoOsdVolumeSliderWrapper2 > .sliderContainer > .sliderBubble");
            
                bubble.textContent = this.value;
                sliderBubble.style.left = this.value+"%";
            
                playbackManager.setVolume(this.value, currentPlayer);
            }),`,
            destFile: "videoosd\\videoosd.js" 
        },
        { 
            findString: ',volumeSlider=elem.querySelector(".nowPlayingBarVolumeSlider"),',
            insertString: `volumeSlider.addEventListener("wheel", function(e) {
                    e.preventDefault(); // this stops scrolling when hovering over the scroller on the server dashboard, i should move this so it affects the whole bar but I'm too lazy to do that
                  
                    var step = localStorage.getItem("audioScrollStep") || 5;
                  
                    if(Math.sign(e.deltaY) === -1) {
                         this.stepUp(step);
                    } else {
                         this.stepDown(step);
                    }
                  
                    var bubble = document.querySelector(".sliderContainer.nowPlayingBarVolumeSliderContainer > .sliderBubble > .sliderBubbleText");
                    var sliderBubble = document.querySelector(".sliderContainer.nowPlayingBarVolumeSliderContainer > .sliderBubble");
                  
                    bubble.textContent = this.value;
                    sliderBubble.style.left = this.value+"%";
                  
                    playbackManager.setVolume(this.value, currentPlayer);
                  }),`,
            destFile: "modules\\nowplayingbar\\nowplayingbar.js" 
        }
    ]
}