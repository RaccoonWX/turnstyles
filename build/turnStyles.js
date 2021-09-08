!function(){var t,e,n=(t=function(t,e){t.exports={version:"9.9.9"}},function(n){return e||t(e={exports:{},parent:n},e.exports),e.exports});const s=(t,e)=>{let n=document.createElement("link");return n.id=t,n.type="text/css",n.rel="stylesheet",n.href=e,n},i=t=>{let e=document.createElement("style");return e.id="ts_css",e.type="text/css",e.innerHTML=t,e};const o=t=>Math.log(t/100)/Math.LN2+4,a=t=>{let e=t||window.util.getSetting("volume");return 100*Math.pow(2,e-4)},l=()=>o(a());let r={};var d;(d=r).$User=()=>window.turntable.user,d.$View=()=>window.turntable.topViewController,d.$Room=()=>window.turntable.topViewController.roomData,d.$Name=t=>{if(!t)return"Unknown";let e=window.turntable.topViewController.userMap[t];if(e)return e.attributes.name;if(window.turntable.buddyList.pmWindows){let e=window.turntable.buddyList.pmWindows[t];if(e)return e.otherUser.attributes.name}return"Someone"},d.pinged=t=>{if(!t)return!1;let e="@"+d.$User().attributes.name;return t.toLowerCase().indexOf(e.toLowerCase())>-1},d.classes=(t,e)=>{let n=$("body").hasClass(t);e&&!n&&$("body").addClass(t),n&&!e&&$("body").removeClass(t)},d.fixMusic=()=>{let t=window.youtube,e=window.soundcloudplayer;e.song&&(e.songTime=e.player.currentTime()/1e3,e.previewStartTime=Date.now()-1e3,e.resumeSong(e.song)),t.song&&(t.songTime=t.player[0].getCurrentTime(),t.previewStartTime=Date.now()-3e3,t.resumeSong(t.song)),$("#turnStyles").removeClass("active")},(t=>{t.on=function(t,...e){this.events||(this.events={}),Array.isArray(t)||(t=[t]);for(let n of t){this.events[n]||(this.events[n]=[]);for(let t of e)this.events[n].push(t.bind(this))}},t.Emit=function(t,...e){let n=this.events[t];if(n)for(let s of n)s(...e)},t.listen=function(t){t.command&&(t.$ping=this.pinged(t.text),t.$name=this.$Name(t.userid),t.$from=this.$Name(t.senderid),t.$self=t.userid==this.$User().id,this.Emit(t.command,t))},t.on("attach",(function(){new(window.MutationObserver||window.WebKitMutationObserver)((function(e){for(let n of e){let e=n.target;"songs"==e.className&&t.Emit("playlist"),"TITLE"==e.nodeName&&e.baseURI.indexOf("profile/")>-1&&t.Emit("profile",e.baseURI.split("profile/")[1])}})).observe(document,{subtree:!0,childList:!0})}))})(r),(t=>{t.Log=function(t){let n=(new Date).toLocaleTimeString("en-us");console.info(`[${n}] turnStyles :: ${t}`),this.logbook||(this.logbook=[]),t=e(t),this.logbook.push(`[tS - ${n}] <span>${t}</span>`),this.logbook.length>50&&this.logbook.shift();let s=$("#tsLogs")[0];s&&(s.innerHTML=this.logbook.reverse().join("<br>"),s.scrollTop=s.scrollHeight)},t.on("attach",(function(){$("#tsLogs").remove(),$(".room-info-nav").after('<div id="tsLogs"></div>')})),t.on("registered",(function(t){for(let e of t.user)this.Log(`[${e.name}](${e.userid}) joined.`)})),t.on("deregistered",(function(t){for(let e of t.user)this.Log(`[${e.name}](${e.userid}) left.`)})),t.on("update_votes",(function(t){let e=t.room.metadata.votelog,n=e[e.length-1];this.Log(`[${this.$Name(n[0])}] voted: ${n[1]}`)})),t.on("add_dj",(function(t){let e=t.user[0].userid;this.Log(`add dj: [${this.$Name(e)}](${e})`)})),t.on("rem_dj",(function(t){let e=t.user[0].userid;this.Log(`rem dj: [${this.$Name(e)}](${e})`)}));const e=t=>{if(t.indexOf("inserted:")<0)return t;let e=t.split("/");return"inserted: "+e[e.length-1]}})(r),(t=>{t.delay=function(t,e,n){if(this.holding||(this.holding={}),this.holding[n])return;let s=1e3*e;this.holding[n]=setTimeout((()=>{delete this.holding[n]}).bind(this),s),t&&t()},t.beat=function(){this.config.beats=parseInt(this.config.beats)+1,this.Emit("heartbeat",this.config.beats)},t.on("attach",(function(){this.holding={},this.heart=setInterval(t.beat.bind(this),6e4)}))})(r),(t=>{t.Post=function(t){let{head:e,body:n,type:s}=t;$(".chat .messages").append(`\n      <div class="message ${s}"><em>\n        <span class="subject">${e}</span>\n        <span class="text">${n}</span>\n      </em></div>\n    `),this.$View().updateChatScroll()},t.Speak=function(t){let e=this.$View().roomId,n=this.$View().section;window.turntable.sendMessage({text:t,api:"room.speak",roomid:e,section:n})},t.Notify=function(t){if(!this.canNotify()||document.hasFocus())return;let{head:e,body:n,type:s}=t,i=this.__logo,o=()=>{let t=new Notification(e,{icon:i,body:n});t.onclick=()=>{window.focus(),t.close()}};return s?this.delay(o,5,s):o()},t.canNotify=function(){let t=this.config;return!(!(t.ping_pm||t.ping_song||t.ping_chat)||!("Notification"in window)||"denied"===Notification.permission||"default"===Notification.permission&&(this.Log("requesting notifications"),Notification.requestPermission(),1))},t.on(["attach","update"],t.canNotify)})(r),(t=>{t.default={logging:!1,played:!1,theme:"dark",style:"",autobop:!0,nextdj:!1,auto_q:!1,q_ping:"Hey @user - it's your turn!",has_vol:!1,no_aud:!1,no_vid:!1,no_bub:!1,ping_pm:!1,ping_song:!1,ping_chat:!1,hot_words:"",chat_song:!1,chat_spun:!1,chat_snag:!1,chat_join:!1,chat_left:!1,is_afk:!1,afk_ping:"I'm AFK - Back in a sec!",beats:0,remind:0,reminder:"Today's theme is: Cool.",user_css:""},t.options={theme:{dark:"Dark Mode",night:"Night Mode",cosmic:"Cosmic",midnight:"Midnight"},style:{blue:"Blue",pink:"Pink",purple:"Purple",teal:"Teal"},remind:{0:"Don't Remind",15:"Every 15m",30:"Every 30m",60:"Every 1h",120:"Every 2h"}}})(r),(t=>{t.cacheDJ=function(t,e){let n=t.user?t.user[0].userid:t;this.current_djs[n]||(this.current_djs[n]={spun:e&&e.spun?e.spun:0,love:e&&e.love?e.love:0,hate:e&&e.hate?e.hate:0,snag:e&&e.snag?e.snag:0})},t.clearDJ=function(t){let n=t.user[0].name,s=t.user[0].userid,i=this.current_djs[s],o=e(i);delete this.current_djs[s],this.Emit("dropped",n,o)},t.cacheSong=function(t){let n=t&&t.room?t.room.metadata.current_song:t,s=t&&t.upvoters?t.upvoters.length:0,i=!!n&&n.djid,o={...this.now_playing},a={love:s,hate:0,snag:0,dj:i};this.now_playing=n?{...n.metadata,...a}:{},this.last_played=o,o.song&&this.current_djs[o.dj]&&(this.current_djs[o.dj].spun+=1,this.current_djs[o.dj].love+=o.love,this.current_djs[o.dj].hate+=o.hate,this.current_djs[o.dj].snag+=o.snag),this.Log("new song: "+(this.now_playing.song||"none")),this.Emit("tracked",e(o))},t.on("add_dj",t.cacheDJ),t.on("rem_dj",t.clearDJ),t.on("nosong",t.cacheSong),t.on("newsong",t.cacheSong),t.on("snagged",(function(){this.now_playing.snag+=1})),t.on("update_votes",(function(t){this.now_playing.love=t.room.metadata.upvotes,this.now_playing.hate=t.room.metadata.downvotes})),t.on("attach",(function(t){this.current_djs={},this.now_playing={},this.last_played={};for(let e of t.djids)this.cacheDJ(e);this.cacheSong(t.currentSong)}));const e=t=>{let e="";return t&&"love"in t&&(e+=t.love+"\u2764\ufe0f"),t&&"hate"in t&&(e+=t.hate+"\ud83d\udc94"),t&&"snag"in t&&(e+=t.snag+"\ud83d\udc96"),t&&"spun"in t&&(e+=t.spun+"\u25b6\ufe0f"),e||!1}})(r),(t=>{t.getConfig=function(){if(this.__base)return;this.__base=window.tsBase||"https://ts.pixelcrsis.co/build",this.__logo=this.__base+"/images/icon128.png";let t=window.localStorage.getItem("tsdb"),e=t?JSON.parse(t):{},s=n({}).version;this.config={...this.default,...e,version:s,is_afk:!1},this.Emit("loaded",this.config)},t.saveConfig=function(t){let e=t.target.dataset.for,n="checkbox"==t.target.type?t.target.checked:t.target.value;0===e.indexOf("ts_")&&(n=$("#"+e).val(),e=e.split("ts_").join("")),this.setConfig(e,n),!["style","theme","user_css"].includes(e)&&this.lobby||this.Emit("update",e,n)},t.setConfig=function(t,e){this.config[t]=e;let n=JSON.stringify(this.config);window.localStorage.setItem("tsdb",n);let s="boolean"==typeof e;$(`*[data-for="${t}"]`).prop(s?"checked":"value",e)}})(r),(t=>{const e={speak:{conf:"ping_chat",case:"$ping",head:"[$room] @$name"},pmmed:{conf:"ping_pm",head:"New PM from: $from"},snagged:{conf:"chat_snag",head:"$whom",body:"has snagged this track!",post:!0},registered:{conf:"chat_join",head:"$user",body:"joined.",post:!0},deregistered:{conf:"chat_left",head:"$user",body:"left.",post:!0}};t.Parse=function(t,e){let n=[];for(let s of e.user)s.name&&n.push(s.name);return(t=(t=(t=(t=t.split("$whom").join(e.$name||"Someone")).split("$from").join(e.$from||"Someone")).split("$name").join(e.name||"Someone")).split("$room").join(this.$Room().name)).split("$user").join(n.join(", "))},t.on("attach",(function(){for(let n in e){let s=e[n];t.on(n,(function(t){if(!this.config[s.conf])return;if(s.case&&!t[s.case])return;let e=this.Parse(s.head,t),n=s.body?this.Parse(s.body,t):t.text;s.post?this.Post({head:e,body:n}):this.Notify({head:e,body:n,type:s.conf})}))}})),t.on("speak",(function(t){let e=this.config.hot_words.split(",");for(let n of e)if(t.text.toLowerCase().indexOf(n.trim().toLowerCase())>-1)return $(".messages .message:last-child").addClass("mention"),this.Notify({head:`[${this.$Room()}] Match: ${n}`,body:t.text,type:"matched"})}))})(r),(t=>{t.on("loaded",(function(t){$("#ts_core").remove(),$("#ts_themes").remove(),$("#ts_styles").remove(),$("#ts_css").remove(),this.insert("turnStyles"),this.insert(t.theme,"themes"),this.insert(t.style,"styles"),this.inject(t.user_css),this.classes("no_bub",t.no_bub),this.classes("no_vid",t.no_vid),this.classes("no_aud",t.no_aud)})),t.on("update",(function(t,e){"theme"==t&&this.insert(e,"themes"),"style"==t&&this.insert(e,"styles"),"user_css"==t&&this.inject(e),"no_bub"==t&&this.classes("no_bub",e),"no_vid"==t&&this.classes("no_vid",e),"no_aud"==t&&this.classes("no_aud",e)})),t.insert=function(t,e){let n="ts_"+(e||"core"),i=$("#"+n),o=`${this.__base}${e?"/"+e:""}`,a=t?`${o}/${t}.css`:"#";if(i.length?i.attr("href",a):document.head.append(s(n,a)),"#"!=a&&this.Log("inserted: "+a),"themes"==e){this.classes("th-none",!t);let e=$("body").data("theme");e&&$("body").removeClass("th-"+e),t&&($("body").data("theme",t),$("body").addClass("th-"+t))}},t.inject=function(t){let e=$("#ts_css");e.length?e[0].innerHTML=t:document.head.append(i(t)),t&&this.Log("injected: "+t)}})(r),(t=>{t.loadVolume=function(){let t=this.config.has_vol,e=$("body").hasClass("ts_vol");this.classes("ts_vol",t);let n=window.turntablePlayer.realVolume;this.realVolume||(this.realVolume=n),t&&!e&&this.addVolume(),e&&!t&&this.remVolume()},t.addVolume=function(){$(".header-content").append(`\n\t\t\t<div id="tsVolume">\n\t\t\t\t<span id="tsMute"></span>\n\t\t\t\t<input id="tsSlider" type="range" \n\t\t\t\t\tmin="0" max="100" value="${a()}">\n\t\t\t\t</input>\n\t\t\t\t<em id="tsMuted">Muted For One Song</em>\n\t\t\t</div>\n\t\t`),$("#tsMute").on("click",this.muteVolume.bind(this)),$("#tsSlider").on("input",this.saveVolume.bind(this)),$("#tsSlider").on("DOMMouseScroll mousewheel",this.rollVolume.bind(this))},t.remVolume=function(){$("#tsVolume").remove(),window.turntablePlayer.realVolume=this.realVolume},t.saveVolume=function(t){let e=(t=t.target?t.target.value:t)>0?o(t):-3,n=e<7?a:this.realVolume;window.turntablePlayer.realVolume=n,window.turntablePlayer.setVolume(e),window.util.setSetting("volume",e)},t.rollVolume=function(t){let e=a(),n=t.originalEvent.deltaY>0,s=t.originalEvent.shiftKey?1:5,i=n?e-s:e+s;return i=i<0?0:i>100?100:i,$("#tsSlider")[0].value=i,this.saveVolume(i),!1},t.muteVolume=function(){this.muted=!this.muted,this.classes("ts_muted",this.muted);let t=this.muted?-3:l();window.turntablePlayer.setVolume(t),this.Log("turned mute "+(this.muted?"on":"off"))},t.checkMuted=function(){this.muted&&this.muteVolume()},t.on("attach",t.loadVolume),t.on("update",t.loadVolume),t.on("nosong",t.checkMuted),t.on("newsong",t.checkMuted)})(r),(t=>{t.on("profile",(function(t){$(".profile.modal .statslink").length||($(".profile.modal .section.web-links").show(),$(".profile.modal .website").append(`\n      <a target="_blank"\n        class="statslink"\n        onclick="$('.modal .close-x')[0].click()"\n        href="https://thompsn.com/turntable/leaderboard/thing/?id=${t}">\n        Leaderboard\n      </a>\n    `))}))})(r),(t=>{t.countPlaylist=function(){let t=$("#playlist-header .text")[0],e=window.playlist.fileids.length,n=t.innerHTML.split("<em>")[0];t.innerHTML=`${n} <em>${e}</em>`},t.orderPlaylist=function(){window.playlist.isFiltering&&window.playlist.clearSearchBar(),$("#queue-header").removeClass("normal").addClass("edit"),window.playlist.queue.batchEditMode()},t.checkPlaylist=function(t){t&&(this.songlog=t);let e=window.playlist.fileids;$(".song.ts_played").removeClass("ts_played");for(let n=0;n<e.length;n++){let t=e[n];for(let e of this.songlog)e._id==t&&$(`#queue .songs .song:nth-child(${n+1})`).addClass("ts_played")}},t.on("attach",(function(t){this.countPlaylist(),this.checkPlaylist(t.roomData.metadata.songlog),this.classes("played",this.config.played),$("#upload-button").after('<div id="tsUpload"></div>'),$("#tsUpload").on("click",this.orderPlaylist)})),t.on(["newsong","nosong"],(function(t){this.checkPlaylist(t.room.metadata.songlog)})),t.on("playlist",t.countPlaylist,t.checkPlaylist),t.on("update",(function(t,e){"played"==t&&this.classes("played",e)}))})(r),(t=>{t.addPanel=function(){$("#tsPanel").remove(),$(".header-bar").append(this.Panel()),$("#tsPanel h1").on("click",()=>$("#tsPanel").toggleClass("active")),$(".ts-tab").on("click",(function(t){$(".ts-tab.active, .ts-tabbed.active").removeClass("active"),$(`*[data-tab="${t.target.dataset.tab}"]`).addClass("active")})),$(".ts-button").on("click",this.saveConfig.bind(this)),$(".ts-switch").on("change",this.saveConfig.bind(this))},t.Panel=function(){return`\n      <div id="tsPanel">\n        <div id="tsBar">\n          <h1></h1>\n          ${this._toggle("is_afk","AFK")}\n          ${this._toggle("autobop","Autobop")}\n          ${this._toggle("nextdj","Next DJ")}\n          ${this._toggle("auto_q","AutoQueue")}\n        </div>\n        <div id="tsFull">\n          <div class="ts-row">\n            <h1>\u2716</h1>\n            <span class="ts-tab active" data-tab="general">General</span>\n            <span class="ts-tab" data-tab="visual">Visual</span>\n            <span class="ts-tab" data-tab="css">CSS</span>\n            <span class="ts-tab" data-tab="alerts">Alerts</span>\n            <span class="ts-tab" data-tab="about">About</span>\n          </div>\n\n          <div class="ts-tabbed active" data-tab="general">\n            ${this._toggle("autobop","Autobop")}\n            ${this._toggle("nextdj","Next DJ Spot")}\n            ${this._toggle("has_vol","Control Volume")}\n            \n            <div class="break"></div>\n            <p class="full">Paste your bot's queue message below to take the decks automatically when you're called.</p>\n            ${this._toggle("auto_q","Enable Auto Queue")}\n            ${this._inputs("q_ping")}\n            ${this._button("q_ping","Save Queue Ping")}\n            \n            <div class="break"></div>\n            <p class="full">Sends the response when you go AFK, and if you get pinged while gone.</p>\n            ${this._toggle("is_afk","Go AFK")} \n            ${this._inputs("afk_ping")}\n            ${this._button("afk_ping","Save AFK Response")}\n          </div>\n\n          <div class="ts-tabbed" data-tab="visual">\n            <p class="full">Turntable Theme & Style</p>\n            ${this._select("theme")}\n            ${this._select("style")}\n            \n            <div class="break"></div>\n            <p class="full">Hide Various Elements Around Turntable</p>\n            ${this._toggle("no_bub","Hide Chat Bubbles")}\n            ${this._toggle("no_aud","Hide Audience")}\n            ${this._toggle("no_vid","Hide Player")}\n\n            <div class="break"></div>\n            <p class="full">Add A Red Glow To Songs Played Recently In Room</p>\n            ${this._toggle("played","Highlight Recently Played Songs")}\n            \n          </div>\n\n          <div class="ts-tabbed" data-tab="css">\n            <p class="full">Add your own custom CSS snippets to turntable!</p>\n            <textarea id="ts_user_css" rows="10">\n              ${this.config.user_css}\n            </textarea>\n            <div class="break"></div>\n            ${this._button("user_css","Save And Apply Styles")}\n          </div>\n\n          <div class="ts-tabbed" data-tab="alerts">\n            <p class="full">Info Posted In Chat (Just For You To See)</p>\n            ${this._toggle("chat_song","Last Song Stats")}\n            ${this._toggle("chat_spun","Dropped DJ Stats")}\n            ${this._toggle("chat_snag","User Snags")}\n            ${this._toggle("chat_join","User Joins")}\n            ${this._toggle("chat_left","User Leaves")}\n            \n            <div class="break"></div>\n            <p class="full">Send Desktop Notifications</p>\n            ${this._toggle("ping_pm","On DMs")}\n            ${this._toggle("ping_chat","On Mentions")}\n            ${this._toggle("ping_song","On New Songs")}\n\n            <div class="break"></div>\n            <p class="full">Notifies / highlights word match in chat. Use multiple words in a comma separated list.</p>\n            ${this._inputs("hot_words")}\n            ${this._button("hot_words","Save Hot Words")}\n          </div>\n\n          <div class="ts-tabbed" data-tab="about">\n            ${this._toggle("logging","Show Logs In Room Tab")} \n            ${this._doFunc("reloadMusic","Fix Glitched Players")}\n            ${this._doFunc("reload","Reload turnStyles")}\n\n            <div class="break"></div>\n            <p class="full">turnStyles v${this.config.version}</p>\n            <a class="ts_link" href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" target="_blank">Chrome Store</a>\n            <a class="ts_link" href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" target="_blank">Firefox Addon</a>\n            <a class="ts_link" href="https://ts.pixelcrisis.co" target="_blank">Bookmarklet</a>\n\n            <div class="break"></div>\n            <p class="full">Support On Discord</p>\n            <a class="ts_link" href="https://discord.gg/wqmAVvgSbE" target="_blank">turnStyles Discord</a>\n            <a class="ts_link" href="https://discord.gg/jnRs4WnPjM" target="_blank">Turntable.fm Discord</a>\n\n            <div class="break"></div>\n            <p class="full">On Github</p>\n            <a class="ts_link" href="https://github.com/pixelcrisis/turnstyles" target="_blank">turnStyles</a>\n            <a class="ts_link" href=""https://github.com/fluteds/ttscripts target="_blank">ttscripts (themes + more)</a>\n\n            <div class="break"></div>\n            <p class="full">The Developer</p>\n            <strong>Turntable: <em>@crisis</em></strong>&nbsp;-&nbsp;\n            <strong>Discord: <em>@crisis</em></strong>\n          </div>\n          </div>\n        </div>\n      </div>\n    `},t._toggle=function(t,e){return`\n      <label>\n        <input class="ts-switch" type="checkbox"\n          data-for="${t}" ${this.config[t]?"checked":""}> \n        <span class="ts-icon"></span> ${e}\n      </label>\n    `},t._select=function(t,e){return`\n      <select data-for="${t}" class="ts-switch">\n        ${e?"":(n=t,`<option value="">No ${s=n,s[0].toUpperCase()+s.substring(1)}</option>`)}\n        ${Object.keys(this.options[t]).map(e=>`\n          <option value="${e}" ${this.config[t]==e?"selected":""}>\n            ${this.options[t][e]}\n          </option>\n        `).join("")}\n      </select>\n    `;var n,s},t._inputs=function(t){return`\n      <input type="text" \n        id="ts_${t}" value="${this.config[t]}">\n      </input> \n    `},t._button=function(t,e){return`\n      <button class="ts-button" data-for="ts_${t}">${e}</button>\n    `},t._doFunc=function(t,e){return`\n      <button onclick="$tS.${t}()">${e}</button>\n    `},t.on("attach",t.addPanel)})(r),(t=>{t.attach=function(){this.getConfig();const e=window.turntable;if(!e)return this.Log("no room");const n=window.turntable.user;if(this.lobby=$("#turntable #topBG").length,this.lobby)return this.addPanel();const s=()=>setTimeout(t.attach.bind(this),150),i=(t,e)=>{for(let n in t){let s=t[n];if(null!=s&&s[e])return s}};if(!n)return s();let o=i(e,"roomId");return o&&i(o,"roomData")?(this.listener=this.listen.bind(this),window.turntable.addEventListener("message",this.listener),this.Emit("attach",o),void this.Log("loaded room")):s()},t.reload=function(){clearInterval(this.heart),window.turntable.removeEventListener("message",this.listener),$('script[src*="turnStyles.js"]').remove();const t=document.createElement("script");t.src=`${this.__base}/turnStyles.js?${Math.random()}`,t.type="text/javascript",this.Log("reloading"),document.body.append(t)}})(r),(t=>{t.on("speak",(function(t){let{is_afk:e,afk_ping:n}=this.config;e&&n&&(t.$self?t.text!=n&&(this.setConfig("is_afk",!1),this.Post({head:"Welcome Back!",body:"You're no longer AFK!"})):this.Speak(n))})),t.on("update",(function(t,e){if("is_afk"!=t)return;let n=this.config.afk_ping;e&&n&&this.Speak(n)}))})(r),(t=>{t.on(["attach","newsong"],(function(){if(this.bop&&clearTimeout(this.bop),!this.config.autoBop)return;const t=7*Math.random()*100;this.bop=setTimeout(()=>{$(window).focus();const t={bubbles:!0,cancelable:!0,view:window},e=document.querySelectorAll(".awesome-button")[0],n=new MouseEvent("click",t);return!e.dispatchEvent(n)},t)})),t.on(["attach","update","rem_dj"],(function(){if(this.config.nextdj)return $(".become-dj").length?(this.Log("nextdj: jumping on decks"),void this.$View().becomeDj()):this.Log("nextdj: no spot")})),t.on("add_dj",(function(t){if(!this.config.nextdj)return;if(this.$User().id!=t.user[0].userid)return;this.setConfig("nextdj",!1);const e="You've hopped on deck!",n="NextDJ is now disabled.";this.Notify({head:e,body:n}),this.Post({head:e,body:n})})),t.on("speak",(function(t){this.config.auto_q&&this.config.q_ping==t.text&&this.$View().becomeDj()})),t.on("heartbeat",(function(t){if(!this.config.reminder)return;let e=parseInt(this.config.remind),n=`[${this.$Room().name}] ${this.config.reminder}`;t%e==0&&this.config.reminder&&this.Speak(n)}))})(r),(t=>{t.on("tracked",(function(t){let e=this.now_playing,n=this.last_played;if(e.song&&this.config.ping_song){let n="Now Playing: "+e.song,s=t||"By: "+e.artist;this.Notify({head:n,body:s})}if(t&&this.config.chat_song){let e=`${n.song} by ${n.artist}`;this.Post({head:t,body:e,type:"stat"})}})),t.on("dropped",(function(t,e){if(!this.config.chat_spun)return;let n=`${t} - ${e}`;this.Post({head:n,body:" - is done spinning!",type:"stat"})}))})(r),r.attach()}();