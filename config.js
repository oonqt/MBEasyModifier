module.exports = {
    DashboardBackupPath: "E:\\EmbyData\\backups",
    ModificationSourcePath: "E:\\EmbyData\\ModificationHold",
    Profiles: [
        {
            Name: "Web (dashboard-ui)",
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
                PreModCommand: "apktool d C:\\Users\\Luke\\Desktop\\EmbyAndroidLab\\MediaBrowser.Mobile-google-armeabi-v7a-release.apk -o C:\\Users\\Luke\\Desktop\\EmbyAndroidLab\\MediaBrowser.Mobile -f",
                PostModCommand: "apktool b C:\\Users\\Luke\\Desktop\\EmbyAndroidLab\\MediaBrowser.Mobile\\ -o C:\\Users\\Luke\\Desktop\\EmbyAndroidLab\\MediaBrowser.Mobile.apk",
                DashboardBasePath: "C:\\Users\\Luke\\Desktop\\EmbyAndroidLab\\MediaBrowser.Mobile\\assets\\www",
                FindAndOverwrite: [
                    { source: "movies.js", dest: "movifrewes" },
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
                        destFile: "settings\\subtitle.js",
                        insertString: '<option value="#2cc900">Green</option>',
                        findString: '<option value="#ffffff">${White}</option>'
                    },
                    {
                        destFile: "settings\\subtitle.js",
                        insertString: '<option value="#0099ff">Blue</option>',
                        findString: '<option value="#ffffff">${White}</option>'
                    },
                    {
                        destFile: "index.html",
                        insertString: '<style>.scrollbuttoncontainer{backdrop-filter:blur(2px) saturate(2);opacity:.9}.innerCardFooter.fullInnerCardFooter{border-radius:25px}*{outline:0!important}.chkCardSelectContainer.cardOverlayButton>.checkboxLabel{outline:0!important}.scalableCard.activeSession.card.backdropCard.backdropCard-scalable.playingSession{cursor:auto}.raised.item-tag-button.nobackdropfilter.emby-button{backdrop-filter:saturate(1.8) blur(1.5em);background:rgba(85,85,85,.3)}.dialog>.emby-select-withcolor.emby-select{backdrop-filter:none!important}.mediaSource>div:nth-child(3){display:none!important}.emby-tab-button.emby-button{text-decoration:none!important}div.cardText{white-space:pre-wrap}.osdPoster-img{max-height:none!important}.infoBanner.betaInfoBanner{background:#eedc82;color:#000}.paperList>.listItem.listItem-border.emby-button{padding-top:7.5px;padding-bottom:7.5px}.focuscontainer.dialog.centeredDialog.formDialog{min-width:200px}.button-link.btnReadMore.flex-shrink-zero.secondaryText.emby-button{text-decoration:none}.button-link{text-decoration:none!important}.itemAction.textActionButton.cardTextActionButton{text-decoration:none}.cardOverlayContainer.itemAction{border-radius:4px;background:rgba(20,20,20,.5)!important;backdrop-filter:saturate(1.5)}.itemAction.cardContent-button.cardContent.cardImageContainer.cardContent-shadow.coveredImage{-webkit-box-shadow:none!important;box-shadow:none!important;background-color:transparent!important}</style>',
                        findString: `</style>`
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