if (typeof na!=='object') { var NicerApp_WebOS = nicerapp = na = {}; }
na.backgrounds = na.background = na.bg = {
    globals : { fadingSpeed : 1000 },
    settings : {
        useFading : true,
        fadingMaxTime : 10*1000
    },

    initialize (settings) {
        var t = this;
        t.settings = $.extend (na.bg.settings, settings);

        var
        url = '/domainConfig/ajax_backgrounds.php',
        ac = {
            type : 'GET',
            url : url,
            success : function (data, ts, xhr) {
                try {
                    t.data = JSON.parse(data);
                    /*
                    t.next ('#siteBackground', null, null, false, function() {
                        var
                        url2 = '/domainConfig/ajax_backgrounds_recursive.php',
                        ac2 = {
                            type : 'GET',
                            url : url2,
                            success : function (data, ts, xhr) {
                                try {
                                    t.recursive = JSON.parse(data);
                                } catch (err) {
                                    t.recursive = false;
                                }
                            },
                            error : function (xhr, textStatus, errorThrown) {

                            }
                        };
                        $.ajax(ac2);
                    });
                    */

                } catch (err) {
                    t.data = false;
                    t.recursive = false;
                }

            },
            error : function (xhr, textStatus, errorThrown) {
            }
        };
        $.ajax(ac);

        return this;
    },

    next : function (div, search, url, saveTheme, callback, callStack) {
        var t = na.background;
        var fncn = 'na.background.next()';//na.m.myName(t);
        na.m.waitForCondition (fncn+' : t.data?', function() {
            return t.data;
        }, function() {
            t.next_do (div, search, url, saveTheme, callback, callStack);
        }, 20);
    },

    next_do : function (div, search, url, saveTheme, callback, callStack) {
        var t = na.background;
        if (!div) div = '#siteBackground';
        if (saveTheme!==false) saveTheme = true;
        if (!callStack) callStack = '';
        if (!callback && saveTheme) callback = na.site.saveTheme;
        if (!search) search = t.settings.backgroundSearchKey;
        if (!search) {
            search = 'LWandscape';
        };
        t.settings.backgroundSearchKey = search;


        var oldBSK = na.site.globals.backgroundSearchKey;
        if (oldBSK==='' || oldBSK=='Landscape' || oldBSK=='Portrait') {
            if ( parseFloat($(window).width()) > parseFloat($(window).height()) )
                na.site.globals.backgroundSearchKey
                    = na.site.globals.backgroundSearchKey.replace ('Portrait', 'Landscape');
            else
                na.site.globals.backgroundSearchKey
                    = na.site.globals.backgroundSearchKey.replace ('Landscape', 'Portrait');
        }
        /*
        if (oldBSK !== '' && oldBSK != na.site.globals.backgroundSearchKey)
            na.backgrounds.next (
                '#siteBackground',
                na.site.globals.backgroundSearchKey,
                null,
                false
            );
        */


        var
        fncn = 'na.backgrounds.next(div,search,url,saveTheme,callback)',
        bgs = t.data,
        sk = search.split(/\s+/),
        hits = [];

        $('#siteBackground, #siteBackground img, #siteBackground div, #siteBackground iframe').css({
            position:'absolute',
            width : $(window).width(),
            height : $(window).height()
        });

        t.settings.lastMenuSelection = search;
        //debugger;

        var useRoot = true;
        if (typeof url !== 'string' || url === '') {
            for (var collectionIdx=0; collectionIdx<bgs.length; collectionIdx++) {
                if (!bgs[collectionIdx].files) continue;

                for (var i=0; i<bgs[collectionIdx].files.length; i++) {
                    var
                    bg = bgs[collectionIdx].files[i],
                    hit = true;

                    for (var bgk in bg) break;
                    var
                    bgSize = bg[bgk].split('x'),
                    w = parseInt(bgSize[0]),
                    h = parseInt(bgSize[1]);

                    for (var j=0; j<sk.length; j++) {
                        var re = new RegExp(sk[j], 'i');
                        if (sk[j].substr(0,1)==='-') {
                            if (bgk.match(re)) hit = false;
                        } else {
                            if (!bgk.match(re)) hit = false;
                        }
                    }

                    if (
                        !bgk.match(/Tiled/i)
                        && !bgk.match(/\.txt$/)
                        && (
                            $(window).width() > w
                            || $(window).height() > h
                        )
                    ) {
                        hit = false;
                    }


                    // pre-parsing; date-ranges & forbidden keywords
                    if (hit) {
                        if (!search.match('women') && bgk.match('women')) hit = false;
                    }



                    if (hit) {
                        if (useRoot)
                            hits[hits.length] = document.location.origin+'/'+bgs[collectionIdx].root+'/'+bgk;
                        else
                            hits[hits.length] = bgk;
                    }
                };
            }

            if (hits.length===0) return false;
            var url = hits[Math.floor(Math.random() * Math.floor(hits.length))];
        };
        na.m.log (10, fncn+' : url='+url, true);
        //debugger;
        t.settings.div = div;
        debugger;

        /*
        var
        ajaxCommand = {
            type : 'GET',
            url : url,
            success : function (data, ts, xhr) {
        */
                var
                currentTime = performance.timeOrigin + performance.now(),
                div = t.settings.div,
                bgf = $(div+' img.bg_first')[0],
                bgl = $(div+' img.bg_last')[0],
                bgDiv = $(div+'_bg')[0],
                bgDiv2 = $(div+'_bg2')[0];
                if (!bgl) debugger;
                //debugger;

                if (url.match('tiled')) {
                    if (na.bg.settings.useFading) {
                        $(bgf).add(bgl).fadeOut('slow');
                        $(bgDiv2).css ({
                            width: jQuery(window).width() * na.site.settings.current.scale,
                            height: jQuery(window).height() * na.site.settings.current.scale,
                            background : 'url("'+url+'") repeat'
                        });
                        setTimeout(function() {
                            $(bgDiv2).stop().fadeIn(na.bg.globals.fadingSpeed, 'swing', function () {
                                $(bgDiv).css ({
                                    display : 'block',
                                    width: jQuery(window).width() * na.site.settings.current.scale,
                                    height: jQuery(window).height() * na.site.settings.current.scale,
                                    background : 'url("'+url+'") repeat'
                                });
                                setTimeout(function(){
                                    $(bgDiv2).css ({display:'none'});
                                }, 50);

                                if (typeof callback == 'function') callback();
                            })
                        }, 50);
                    } else {
                        //$(bgf).add(bgl).hide();
                        $(bgDiv).css ({
                            display : 'block',
                            width: jQuery(window).width() * na.site.settings.current.scale,
                            height: jQuery(window).height() * na.site.settings.current.scale,
                            background : 'url("'+url+'") repeat'
                        });
                        if (typeof callback == 'function') callback();
                    }

                } else if (url.match('youtube')) {
                    $(bgDiv).add(bgDiv2).css({display:'none'});
                    $(bgf).add(bgl).stop().fadeOut(na.bg.globals.fadingSpeed);

                    var ac = {
                        type : 'GET',
                        url : url,
                        success : function (data, ts, xhr) {
                            var
                            outsideURL = data;

                            var vidID = /embed\/(.*)\?/.exec(outsideURL);
                            if (vidID) {
                                vidID = vidID[1];
                            } else {
                                vidID = /watch\?v\=(.*)\&/.exec(outsideURL);
                                if (vidID) vidID = vidID[1];
                            };

                            var html = 'var player; function onYouTubeIframeAPIReady() {  player = new YT.Player("siteBackground_iframe", { height: "100%", width: "100%", videoId: "'+vidID+'", playerVars: { "playsinline": 1 }, events: { "onReady": na.backgrounds.onPlayerReady, "onStateChange": na.backgrounds.onPlayerStateChange } }); }';
                            $('#siteBackground_iframe_js').html (html);

                            outsideURL = 'https://youtube.com/embed/'+vidID+'?autoplay=1&vq=hd2160&wmode=transparent&enablejsapi=1&html5=1&origin='+document.location.href;

                            $('#siteBackground_iframe').css({display:'block',width:'100%',height:'100%'});
                            $('#siteBackground_iframe')[0].src = outsideURL;
                            $(bgDiv).add(bgDiv2).add(bgl).add(bgf).css({display:'none'});

                            if (typeof callback == 'function') callback();
                        },
                        error : function (xhr, textStatus, errorThrown) {
                            na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
                        }
                    };
                    $.ajax(ac);

                } else {
                    if (na.bg.settings.useFading) {
                        bgf.src = bgl.src;
                        $(bgl).css({display:'none'});
                        bgl.onload = function (evt) {
                            $(this).fadeIn(na.bg.globals.fadingSpeed, 'swing', function () {
                                $('img.bg_last',$(this).parent()).css({display:'none'});
                            })

                        };
                        bgl.src = url;
                    } else {
                        bgl.src = url;
                        if (typeof callback == 'function') callback();
                    }
                };


                na.site.globals.backgroundSearchKey = search;
                na.site.globals.background = url;
                if (na.site.globals.debug_backgroundChanges) debugger;
                if (!$.cookie('cdb_loginName') || $.cookie('cdb_loginName')==naGlobals.domain.replace('.','_')+'___Guest') {
                    $.cookie('siteBackground_search', search, na.m.cookieOptions());
                    $.cookie('siteBackground_url', url, na.m.cookieOptions());
                }
                if (!url.match(/cracked-surface/)) {
                    na.m.addLogEntry ('Background set to "'+na.site.globals.backgroundSearchKey+'"; '+url, 'naStatus_backgroundChange');
                    if (saveTheme) na.site.saveTheme();
                };
/*
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
                //TODO: re-enable:
                //na.backgrounds.next (div, search, '', saveTheme, callback);
            }
        };
        //debugger;
        $.ajax(ajaxCommand);
*/
    },

    onPlayerReady : function (a,b,c,d,e,f,g) {
        debugger;
    },

    onPlayerStateChange : function (a,b,c,d,e,f,g) {
        debugger;
    }
}
