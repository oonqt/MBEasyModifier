module.exports = {
    DashboardBackupPath: "E:\\EmbyData\\backups",
    ModificationSourcePath: "E:\\EmbyData\\ModificationHold",
    Profiles: [
        {
            Name: "Web",
            Profile: {
                Backup: true,
                PreModCommand: "taskkill /IM EmbyServer.exe /IM EmbyTray.exe /F",
                PostModCommand: "C:\\Users\\Luke\\AppData\\Roaming\\Emby-Server\\system\\EmbyServer.exe",
                DashboardBasePath: "C:\\Users\\Luke\\AppData\\Roaming\\Emby-Server\\system\\dashboard-ui",
                FindAndOverwrite: [
                    { source: "movies.js", dest: "movies" },
                    { source: "music.js", dest: "music" },
                    { source: "tv.js", dest: "tv" },
                    { source: "qualityoptions.js", dest: "bower_components\\emby-webcomponents" },
                    { source: "favicon.ico", dest: "\\" },
                    { source: "touchicon.png", dest: "\\" },
                    { source: "touchicon72.png", dest: "\\" },
                    { source: "touchicon114.png", dest: "\\" },
                    { source: "touchicon144.png", dest: "\\" },
                    { source: "logowhite.png", dest: "modules\\logoscreensaver" },
                    { source: "logodark.png", dest: "modules\\themes" },
                    { source: "logowhite.png", dest: "modules\\themes" },
                    { source: "black-blue", dest: "modules\\themes" },
                    { source: "dark-blue", dest: "modules\\themes" },
                    { source: "blueradiance", dest: "modules\\themes" },
                    { source: "wmc", dest: "modules\\themes" },
                ],
                FindAndInsert: [
                    { 
                        findString: '{name:"Dark",id:"dark"},', 
                        insertString: '{name:"Dark (blue accent)",id:"dark-blue",isDefault:"dark"===defaultTheme},', 
                        destFile: "modules\\skinmanager.js" 
                    },
                    { 
                        findString: '{name:"Black",id:"black"},', 
                        insertString: '{name:"Black (blue accent)",id:"black-blue",isDefault:"black"===defaultTheme},', 
                        destFile: "modules\\skinmanager.js" 
                    },
                    {
                        destFile: "settings\\subtitle.html",
                        insertString: '<option value="#2cc900">Green</option>',
                        findString: '<option value="#ffffff">${White}</option>'
                    },
                    {
                        destFile: "settings\\subtitle.html",
                        insertString: '<option value="#0099ff">Blue</option>',
                        findString: '<option value="#ffffff">${White}</option>'
                    },
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
                ],
                FindAndReplace: [
                    {
                        findString: '{name:"Black",id:"black",isDefault:"black"===defaultTheme}',
                        replaceString: '{name:"Black",id:"black"}',
                        destFile: 'modules\\skinmanager.js' 
                    },
                    {
                        findString: '{name:"Dark",id:"dark",isDefault:"dark"===defaultTheme}',
                        replaceString: '{name:"Dark",id:"dark"}',
                        destFile: 'modules\\skinmanager.js'
                    }
                ]
            }
        },
        {
            Name: "Android",
            Profile: {
                Backup: false,
                PreModCommand: "cd C:\\Users\\Luke\\Desktop\\EmbyAndroidLab && apktool d MediaBrowser.Mobile-google-armeabi-v7a-release.apk -o MediaBrowser.Mobile",
                PostModCommand: "cd C:\\Users\\Luke\\Desktop\\EmbyAndroidLab && apktool b MediaBrowser.Mobile\\ -o MediaBrowser.Mobile.apk",
                DashboardBasePath: "C:\\Users\\Luke\\Desktop\\EmbyAndroidLab\\MediaBrowser.Mobile\\assets\\www",
                FindAndOverwrite: [
                    { source: "movies.js", dest: "movies" },
                    { source: "music.js", dest: "music" },
                    { source: "tv.js", dest: "tv" },
                    { source: "qualityoptions.js", dest: "bower_components\\emby-webcomponents" },
                    { source: "favicon.ico", dest: "\\" },
                    { source: "touchicon.png", dest: "\\" },
                    { source: "touchicon72.png", dest: "\\" },
                    { source: "touchicon114.png", dest: "\\" },
                    { source: "touchicon144.png", dest: "\\" },
                    { source: "logowhite.png", dest: "modules\\logoscreensaver" },
                    { source: "logodark.png", dest: "modules\\themes" },
                    { source: "logowhite.png", dest: "modules\\themes" },
                    { source: "black-blue", dest: "modules\\themes" },
                    { source: "dark-blue", dest: "modules\\themes" },
                    { source: "blueradiance", dest: "modules\\themes" },
                    { source: "wmc", dest: "modules\\themes" },
                ],
                FindAndInsert: [
                    { 
                        findString: '{name:"Dark",id:"dark"},', 
                        insertString: '{name:"Dark (blue accent)",id:"dark-blue",isDefault:"dark"===defaultTheme},', 
                        destFile: "modules\\skinmanager.js" 
                    },
                    { 
                        findString: '{name:"Black",id:"black"},', 
                        insertString: '{name:"Black (blue accent)",id:"black-blue",isDefault:"black"===defaultTheme},', 
                        destFile: "modules\\skinmanager.js" 
                    },
                    {
                        destFile: "settings\\subtitle.html",
                        insertString: '<option value="#2cc900">Green</option>',
                        findString: '<option value="#ffffff">${White}</option>'
                    },
                    {
                        destFile: "settings\\subtitle.html",
                        insertString: '<option value="#0099ff">Blue</option>',
                        findString: '<option value="#ffffff">${White}</option>'
                    }
                ],
                FindAndReplace: [
                    {
                        findString: '{name:"Black",id:"black",isDefault:"black"===defaultTheme}',
                        replaceString: '{name:"Black",id:"black"}',
                        destFile: 'modules\\skinmanager.js' 
                    },
                    {
                        findString: '{name:"Dark",id:"dark",isDefault:"dark"===defaultTheme}',
                        replaceString: '{name:"Dark",id:"dark"}',
                        destFile: 'modules\\skinmanager.js'
                    }
                ]
            }
        }
    ]
}