var naLog = {
    settings : {

    },
    view : function (logData) {
        naLog.data = logData;
        na.m.waitForCondition ('naLog.view() : na.m.desktopIdle()?', na.m.desktopIdle, function() {
            var dat = naLog.data;
            var html = '';
            for (var i=0; i<dat.length; i++) {
                var dit = dat[i];
                dit.msgProcessed = naLog.process_msg (dit.msg, dit);
                if (typeof dit.stacktrace=='string')
                    dit.stacktrace = '      <pre>'+dit.stacktrace.replace('\\n','\n')+'</pre>';
                for (var j=0; j<dit.ipinfo.length; j++) {
                    var jit = dit.ipinfo[j];
                    jit.ip_info = JSON.parse(jit.ip_info);
                }

                if (dit.info && !dit.info.naIsBot) {
                    dit.info.referrer = dit.referrer;
                    html +=
                        '<div class="naIPlog_entry '+dit.htmlClasses+'">';
                    if (typeof dit.msgProcessed=='string') {
                        var dt = new Date(parseInt(dit.millisecondsSinceEpoch)),
                        dt = dt.format("yyyy-mm-dd HH:MM:ss.l");
                        html +=
                            '<span class="naIPlog_header" onmouseover="$(\'.naIPlog_stacktrace\',$(this).parent()).show(\'slow\');" onmouseout="$(\'.naIPlog_stacktrace\',$(this).parent()).hide(\'normal\');">'
                                +'<span class="naIPlog_millisecondsSinceEpoch">'+dt
                                +'<span class="naIPlog_timezoneOffset">'+dit.dateTZ+'</span> '
                                +'<span class="naIPlog_address">'+dit.ip+'</span>'
                            +'</span><br>'
                            +'<span id="naIPlog_msg__'+dit.millisecondsSinceEpoch+'">'+dit.msg+'</span>'
                    } else if (dit.msgProcessed.onclickHTML) {
                        var dt = new Date(parseInt(dit.millisecondsSinceEpoch)),
                        dt = dt.format("yyyy-mm-dd HH:MM:ss.l");
                        html +=
                            '<span class="naIPlog_header" onmouseover="$(\'.naIPlog_stacktrace\',$(this).parent()).stop(true,true,false).show(\'slow\');" onmouseout="$(\'.naIPlog_stacktrace\',$(this).parent()).stop(true,true,false).hide(\'normal\');">'
                                +'<span class="naIPlog_millisecondsSinceEpoch">'+dt
                                +'<span class="naIPlog_timezoneOffset">'+dit.dateTZ+'</span> '
                                +'<span class="naIPlog_address">'+dit.ip+'</span>'
                                //+'<span class="naIPlog_referrer">referrer : '+dit.referrer+'</span> '
                            +'</span><br>'
                            +'<span id="naIPlog_msg__'+dit.millisecondsSinceEpoch+'" class="naIPlog_backgroundSetTo" onclick="'+dit.msgProcessed.onclickHTML+'">'+dit.msgProcessed.msg+'</span>'

                    } else {
                        var info3 = $.extend({}, dit.msgProcessed, dit.info);
                        html +=
                            '<span id="naIPlog_msg__'+dit.millisecondsSinceEpoch+'"></span>'
                                +'<script type="text/javascript" language="javascript">'
                                +'setTimeout(function() {'
                                    +'var hms_tst_js = { info : '+JSON.stringify(info3)+'};'
                                    +'hm (hms_tst_js, "<div class=\\"naIPlog_header\\">'+dit.msgProcessed.msg+' <span class=\\"naIPlog_address\\">'+dit.ip+'</span></div>", { htmlID : "naIPlog_msg__'+dit.millisecondsSinceEpoch+'", fastInit : true });'
                                +'},150);'
                                +'</script>';
                    }
                    html +=
                        '<pre class="naIPlog_stacktrace">'+dit.stacktrace+'</pre>'
                        +'</div>';

                }
            }
            $('#siteContent > .vividDialogContent').append(html);
            na.desktop.settings.visibleDivs.push ('#siteToolbarLeft');
            na.desktop.resize();
            //debugger;
        }, 100);
    },
    process_msg : function (msg, dit) {
        var r = '', prefix1 = 'Starting bootup process for ', prefix2 = /Background set to "(.*?)";\s(.*)/, m = [];
        if (msg.indexOf(prefix1)===0) {
            r = { msg : prefix1, documentLocation : JSON.parse(msg.replace(prefix1,'')), ipinfo : dit.ipinfo[0].ip_info, 'ipinfo count' : dit.ipinfo.length}
        } else if (m = msg.match(prefix2)) {
            r = { msg : msg, onclickHTML : na.site.displayWallpaper(m[2])};
        } else r = msg;
        return r;
    },
    reload : function (evt,begin,end) {
        var
        url = '/NicerAppWebOS/apps/NicerAppWebOS/applications/2D/logs/ajax_siteContent.php',
        dat = {

        },
        ac = {
            type : 'GET',
            url : url,
            data : dat,
            success : function (data, ts, xhr) {
                $('#siteContent .vividDialogContent').html(data);
            },
            error : function (xhr, textStatus, errorThrown) {
            }
        };
        $.ajax(ac);
    }
};
