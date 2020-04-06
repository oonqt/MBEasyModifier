module.exports = {
    DashboardBackupPath: "E:\\EmbyData\\backups",
    ModificationSourcePath: "E:\\EmbyData\\ModificationHold",
    Profiles: [
        {
            Name: "Web",
            Backup: true,
            Profile: {
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
                        findString: '{name:"Dark (red accent)",id:"dark-red"},', 
                        insertString: '{name:"Dark (blue accent)",id:"dark-blue"},', 
                        destFile: "modules\\skinmanager.js" 
                    },
                    { 
                        findString: '{name:"Dark (red accent)",id:"dark-red"},', 
                        insertString: '{name:"Black (blue accent)",id:"black-blue"},', 
                        destFile: "modules\\skinmanager.js" 
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
                ]
            }
        },
        {
            Name: "Android",
            Backup: false,
            Profile: {
                DashboardBasePath: "C:\\Users\\Luke\\Desktop\\MBAndroid\\assets\\www",
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
                        findString: '{name:"Dark (red accent)",id:"dark-red"},', 
                        insertString: '{name:"Dark (blue accent)",id:"dark-blue"},', 
                        destFile: "modules\\skinmanager.js" 
                    },
                    { 
                        findString: '{name:"Dark (red accent)",id:"dark-red"},', 
                        insertString: '{name:"Black (blue accent)",id:"black-blue"},', 
                        destFile: "modules\\skinmanager.js" 
                    },
                    {
                        findString: "</style>",
                        insertString: `<style>/* transparency and blur on horizontalscroll */
                        .scrollbuttoncontainer {
                            backdrop-filter: blur(2px) saturate(2);
                            opacity: 0.9;
                        }
                        
                        .innerCardFooter.fullInnerCardFooter {
                             border-radius: 25px;
                        }
                        
                        .scalableCard.activeSession.card.backdropCard.backdropCard-scalable.playingSession {
                            cursor: auto;
                        }
                        
                        /* recent updates pushed a weird outline  on elemnts and its ugly */
                        * {
                            outline: none !important;
                        }
                        
                        /* remove unnecessary blur, SIGNIFICANTLY improves performance */
                        .dialog > .emby-select-withcolor.emby-select {
                            backdrop-filter: none !important;
                        }
                        
                        /* blur tags */ 
                        .raised.item-tag-button.nobackdropfilter.emby-button {
                            backdrop-filter: saturate(1.8) blur(1.5em);
                            background: rgba(85, 85, 85, 0.3);
                        }
                        
                        /* hide path */
                        .mediaSource > div:nth-child(3) {
                            display:none !important;
                        }
                        
                        /* remove underline on tabs */ 
                        .emby-tab-button.emby-button {
                            text-decoration: none !important;
                        }
                        
                        /* remove random outlines */
                        .chkCardSelectContainer.cardOverlayButton > .checkboxLabel {
                            outline: none !important;
                        }
                        
                        /* make cover art take up full container space */ 
                        .osdPoster-img {
                            max-height: none !important;
                        }
                        
                        /* make beta banner yellow */
                        .infoBanner.betaInfoBanner {
                            background: #eedc82;
                            color: black;
                        }
                        
                        .paperList > .listItem.listItem-border.emby-button {
                        padding-top: 7.5px;
                            padding-bottom: 7.5px;
                        }
                        
                        .focuscontainer.dialog.centeredDialog.formDialog {
                           min-width: 200px;
                        }
                        
                        .button-link.btnReadMore.flex-shrink-zero.secondaryText.emby-button {
                           text-decoration: none;
                        }
                        
                        .button-link {
                           text-decoration: none !important;
                        }
                        
                        .itemAction.textActionButton.cardTextActionButton {
                           text-decoration: none;
                        }
                        
                        .cardOverlayContainer.itemAction {
                            border-radius: 4px;
                            background: rgba(20,20,20,0.6) !important;
                        }
                        
                        /* .itemAction.cardContent-button.cardContent.cardImageContainer.cardContent-shadow {
                            background-color: transparent;
                        } */
                        
                        .itemAction.cardContent-button.cardContent.cardImageContainer.cardContent-shadow.coveredImage {
                            -webkit-box-shadow: none !important;
                            box-shadow: none !important;
                            background-color: transparent !important;
                        }</style>`,
                        destFile: "index.html"
                    }
                ]
            }
        }
    ]
}