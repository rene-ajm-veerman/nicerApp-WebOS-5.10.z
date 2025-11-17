<?php
    require_once (dirname(__FILE__).'/../../NicerAppWebOS/boot.php');
    global $naWebOS;
    global $naDate;
    require_once ($naWebOS->basePath.'/NicerAppWebOS/logic.business/class.NicerAppWebOS.diaries.php');
    $diaries = new naDiaries();
?>
<script type="text/javascript" src="/NicerAppWebOS/3rd-party/jQuery/jquery-3.7.0.min.js?c=20250817_120652"></script>
<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
<div style="background:rgba(0,0,50,0.007)">
    <style>
    body {
        background : url(/NicerAppWebOS/siteMedia/backgrounds/tiled/grey/background.jpg);
    }
    </style>
    <link type="text/css" rel="StyleSheet" href="NicerEnterprises--company--base.css?c=NOW">
    <link type="text/css" rel="StyleSheet" href="NicerEnterprises--company--moods-print.css?c=NOW">


    <h1 class="contentSectionTitle2"><span class="contentSectionTitle2_span">Nicer Enterprises - company overview</span></h1><p>Date : <?php echo $naDate;?></p>


    <div class="naDiaryWebPage">
        <p class="backdropped" style="width:25%;background:rgba(0,0,0,0.4);padding:10px;margin:10px;border-radius:10px;">
        <a href="https://nicer.app" target="naHP">https://nicer.app</a>, <a href="https://said.by" target="sbHP">https://said.by</a>, <a href="https://zoned.at" target="zAt">https://zoned.at</a>, <a href="https://github.com/NicerEnterprises" target="githubNicerEnterprises">https://github.com/NicerEnterprises</a>, in addition to ALL of the content listed on and/or hosted by the cloudhosting service companies, online forums and social media accounts that I use (or have ever used), are ENTIRELY
        Copyrighted (C) and Owned by <a href="mailto:rene.veerman.netherlands@gmail.com" target="_new" class="nomod noPushState">Rene Veerman &lt;rene.veerman.netherlands@gmail.com&gt;</a>.<br/>
        a.k.a. Gavan Peacefan Unifying Revenger Angelicus Divinicus Hoverswell.<br/>
        </p>

        <pre style="width:25%;background:rgba(0,0,0,0.4);padding:10px;margin:10px;border-radius:10px;">
--- "Because without Revengers, ascending from ordinary humans to Angels, (Demi-)Gods,
     Spirits or even Demons, what justice can there really be?<br/>
     Those in power would have us accept miniscule tokens of revenge, rather than face their own corruption."<br/>
--- Gavan P.U.R.A.D. Hoverswell, 2025-09-15 07:40CEST Amsterdam.NL timezone
        </pre>

        <p class="backdropped" style="width:25%;background:rgba(0,0,0,0.4);padding:10px;margin:10px;border-radius:10px;">
        Should I unexpectedly die for some strange reason, for instance by long standing "dissident" disputes (I'm an assertive peace activist who is NOT without the ability to look at his own ranks with criticism!) suddenly becoming lethal in some way, I want my belongings donated first to my parents, and second to the Amsterdam.NL stedelijk museum, who may do with it all as they please, but who are requested to keep copies of https://nicer.app plus https://said.by up and running at all times.<br/>
        My accountant's details are well engraved in medical records at https://mentrum.nl<br/>
        </p>
    </div>

    <?php
        echo $diaries->getDiary('siteOwner');
    ?>
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
                if ($(evt.currentTarget).is('.shown')) {
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
                if ($(evt.currentTarget).is('.shown')) {
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
    $('.naDiaryDaySegmentHeader, .naDiaryDayHeader').css({cursor:'hand'}).removeClass('todoList').removeClass('active');
    $('.naDiaryDaySegment, .naDiaryEntry').hide();
</script>
