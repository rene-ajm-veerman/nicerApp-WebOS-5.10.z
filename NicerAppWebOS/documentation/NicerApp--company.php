<?php
    global $naWebOS;
    require_once ($naWebOS->webPath.'/../domains/'.$naWebOS->domainFolder.'/domainConfig/pageHeader.php');
    $fp = $naWebOS->basePath.'/NicerAppWebOS/businessLogic/class.NicerAppWebOS.diaries.php';
    require_once ($fp);
    $diaries = new naDiaries();
?>
<!--<script type="text/javascript" src="/NicerAppWebOS/3rd-party/jQuery/jquery-3.7.0.min.js?c=20250817_120652"></script>
<script type="text/javascript" src="/NicerAppWebOS/3rd-party/jQuery/cookie/jquery.cookie.js?c=20250817_120652"></script>
-->
<div style="background:rgba(0,0,50,0.007)">
    <style>
        p {
            display : block;
        }
    </style>
    <link type="text/css" rel="StyleSheet" href="/NicerAppWebOS/documentation/NicerEnterprises--company--base.css?c=NOW">
    <link type="text/css" rel="StyleSheet" href="/NicerAppWebOS/documentation/NicerEnterprises--company--moods-screen.css?c=NOW">

    <h2 class="contentSectionTitle2" style="width:fit-content;padding:10px;">Company overview</h2>
    <div>
        <p class="backdropped" style="width:25%;background:rgba(0,0,0,0.4);padding:10px;margin:10px;border-radius:10px;">
            <a href="https://nicer.app" target="naHP">https://nicer.app</a>, <a href="https://said.by" target="sbHP">https://said.by</a>, <a href="https://zoned.at" target="zAt">https://zoned.at</a>, <a href="https://github.com/Rene-AJM-Veerman" target="githubNicerEnterprises">https://github.com/Rene-AJM-Veerman</a>, <br/>in addition to ALL of the content listed at the social media URLs below, <br/>are ENTIRELY
            Copyrighted (C) 2002-2025 and are 100% Owned by <a href="mailto:rene.veerman.netherlands@gmail.com" target="_new" class="nomod noPushState">Rene A.J.M. Veerman &lt;rene.veerman.netherlands@gmail.com&gt;</a>, <a href="https://x.com/ReneVeerman1977" class="nomod noPushState" target="_new">https://x.com/ReneVeerman1977</a>, <a href="https://facebook.com/rene.veerman.90" class="nomod noPushState" target="_new">https://facebook.com/rene.veerman.90</a>.<br/>
            a.k.a. <a href="https://www.youtube.com/@cheetahKungFu" class="nomod noPushState" target="gavan">Gavan</a> <a href="https://www.google.com/search?q=peacefan+site%3Ausmessageboard.com" class="nomod noPushState" target="peacefan">Peacefan</a> Unifying Revenger Angelicus Divinicus Hoverswell.<br/>
        </p>

        <p class="backdropped" style="width:25%;background:rgba(0,0,0,0.4);padding:10px;margin:10px;border-radius:10px;">
        Should I unexpectedly die for some strange reason, for instance by long standing "dissident" disputes (I'm an assertive peace activist who is NOT without the ability to look at his own ranks with criticism!) suddenly becoming lethal in some way, I want my belongings donated to my parents initially, and to the Amsterdam.NL stedelijk museum after their eventual death, who may all do with it all as they please, on condition of keeping copies of https://nicer.app plus https://said.by up and running.<br/>
        My protective custody agent's details are well engraved in medical records at https://mentrum.nl<br/>
        </p>

        <h2>Executives</h2>

        <p class="backdropped" style="width:25%;background:rgba(0,0,0,0.4);padding:10px;margin:10px;border-radius:10px;">
        CEO, CTO, COO : Rene A.J.M. Veerman [ rene.veerman.netherlands@gmail.com ]<br/>
        CFO : Jaap I.M. Veerman (to be contacted through the CEO's email address only).<br/>
        </p>

        <?php //echo $diaries->getDiary('siteOwner');?>

    </div>
</div>
<script type="text/javascript">
    $('.naDiaryWebPage p').addClass('backdropped');
    $('.naDiaryDaySegmentHeader').each(function(idx,el){
        var fp = $('.naFilePath',$(el).parent()).html();
        $(el).attr('title', fp);
    });
    $('.naDiaryEntryHeader').each(function(idx,el){
        var fp = $('.naFilePath',$(el).parent()).html();
        $(el).attr('title', fp);
    });
    $('.naDiaryDayHeader')
        .on('click', function (evt) {
            var pn = $(evt.currentTarget).next()[0];
            debugger;
            while ($(pn).is('.naDiaryEntry,.naDiaryDay,.naDiaryDaySegment')) {
                if (!$(evt.currentTarget).is('.shown')) {
                    $('.naFilePath,ol,ul,.naDiaryEntry,.naDiaryDay,.naDiaryDaySegment',pn).add(pn).hide('slow');
                } else {
                    $('.naFilePath,ol,ul,.naDiaryEntry,.naDiaryDay,.naDiaryDaySegment',pn).add(pn).show('slow');
                }
                pn = $(pn).next()[0];
            }
            if ($(evt.currentTarget).is('.shown')) {
                $(evt.currentTarget).removeClass('shown');
            } else {
                $(evt.currentTarget).addClass('shown');
            }
        });
    $('.naDiaryDaySegmentHeader')
        .on('click', function (evt) {
            var pn = $(evt.currentTarget).next()[0];
            debugger;
            while ($(pn).is('.naDiaryEntry,.naDiaryDay,.naDiaryDaySegment')) {
                if (!$(evt.currentTarget).is('.shown')) {
                    $('.naFilePath,ol,ul,.naDiaryEntry,.naDiaryDay,.naDiaryDaySegment',pn).add(pn).hide('slow');
                } else {
                    $('.naFilePath,ol,ul,.naDiaryEntry,.naDiaryDay,.naDiaryDaySegment',pn).add(pn).show('slow');
                }
                pn = $(pn).next()[0];
            }
            if ($(evt.currentTarget).is('.shown')) {
                $(evt.currentTarget).removeClass('shown');
            } else {
                $(evt.currentTarget).addClass('shown');
            }
        });
    $('.naDiaryDaySegmentHeader, .naDiaryDayHeader').css({cursor:'hand'}).removeClass('todoList').removeClass('active').addClass('shown');
    $('.naDiaryDaySegment, .naDiaryEntry').hide();
</script>
