<?php
    global $naWebOS;
    require_once ($naWebOS->domainPath.'/domainConfig/pageHeader.php');
?>

<h1 class="contentSectionTitle2"><span class="contentSectionTitle2_span">NicerApp WebOS Development Direction</span></h1><br/><br/>

<p class="backdropped" style="width:30%"><b>Last modified : 2026-01-07-Wednesday 02:03CET Amsterdam.NL</b></p>
<p class="backdropped" style="width:30%">
The yearly release stage of a new <a href="https://github.com/Rene-AJM-Veerman/NicerApp-WebOS-5.10.z">stable version</a> of NicerApp WebOS is always Dec 1st - Dec 24th.<br/>
A major upgrade of the documentation will happen well before Dec 1st 2025! :-)<br/>
</p>

<ol class="todoList" style="width:30%; width:content-width;">
    <li class="todoList"><div>(2026) Improve /logs (statistics and analytics), build an opt-in/out feature for user accounts and IP addresses.</div></li>

    <li class="todoList"><div>(2026) Fix final bugs in said.by/me document handling</div></li>

    <li class="todoList"><div>(2026) Start on .../logic.databases/uDB-2.0.0, to be based on .../logic.databases/generalizedDatabasesAPI-1.0.0
        <a href="/NicerAppWebOS/documentation/__README__documentation/v5.10.z/v5.10.z-uDB.png" class="nomod noPushState" target="tl-udb-1"><img src="/NicerAppWebOS/documentation/__README__documentation/v5.10.z/v5.10.z-uDB.png" style="width:320px"/></a>
        <a href="/NicerAppWebOS/documentation/__README__documentation/v5.10.z/v5.10.z-taskManager.png" class="nomod noPushState" target="tl-udb-1"><img src="/NicerAppWebOS/documentation/__README__documentation/v5.10.z/v5.10.z-taskManager.png" style="width:320px"/></a>
        <ol class="todoList_l1">
            <li class="todoList_l1"><div>Add query routines in uDB to translate couchdb index names to index ids.</div></li>
            <li class="todoList_l1"><div>Add and test MySQL, PostgreSQL and 'filesystemDB' (fsDB) sub-modules to uDB <b>(also on Window 11)</b>, as well as their interactions with the CouchDB part of uDB.</div></li>
            <li class="todoList_l1"><div>(2027) Start on .../businessLogic/filePhoenix</div></li>
        </ol>
    </div></li>

    <li class="todoList"><div>(2026) Rewrite the help system and comments system.
        <ol class="todoList_l1">
            <li class="todoList_l1"><div>(2026) Write a notification API based on the VAPID browser API for this WebOS.</div></li>

            <li class="todoList_l1"><div>(2026) Write an in-app tutorial API for this WebOS.</div></li>
        </ol>
    </div></li>

    <li class="todoList"><div>(2026) Complete a <a href="/3D">3D folder structure viewer</a>, saving the user's 3D position in a database after 2 seconds of movement or inactivity, and which will be linked to all sorts of 2D user interface components/widgets.</div></li>

    <li class="todoList"><div>(2026) Implement <a href="https://stackoverflow.com/questions/10721884/how-to-render-html-to-an-image" class="nomod noPushState" target="sohrhi">rendering from HTML</a> to an <a href="https://developer.chrome.com/blog/headless-chrome/" class="nomod noPushState" target="hc">image</a>, to facilitate pre-fetches with image preview of specific pages on a NicerApp server by other websites.</div></li>

    <li class="todoList"><div>(2026) Allow log entries (of console.log in the browser, and all database traffic and error messages on the server) to be logged to a different machine on the LAN than the main server.</div></li>

    <li class="todoList"><div>(2026) Get na.m.log() to log per datetimeRangeBegin.milliseconds to datetimeRangeEnd.milliseconds into a database on the server, for use in /view/logs as the PHP data belonging to a PHP session_id().<br/>
    Status : Completed javascript code, now needs revamped generalizedDatabaseAPI written and called, and db businesslogic PHP code.</div></li>

    <li class="todoList"><div>(2025 or 2026) Start work on a self-healer component for this WebOS, and a lot more Desktop OS level automated security to be installed via the <a href="https://github.com/NicerEnterprises/NicerApp-WebOS/tree/main/NicerAppWebOS/scripts.install" target="mainBashInstallScript_for_NicerAppWebOS" class="nomod noPushState contentSectionTitle3_a"><span class="contentSectionTitle3_span">main Bash install script</span></a>.</div></li>

    <li class="todoList"><div>Add the next set of animations to .todoList p, span, h1, h2, and h3 HTML elements (config data for which is to be visualized and interacted with in the theme editor by the way).<br/>
    These will be javascript + PHP generated visualizations for SVG (animated) graphics.<br/>
    I promise to bring you all some level of CSS animations in the generation config language :)<br/>
    Maybe even a real translation of CSS animations (they're easy to parse), into SVG color and transparency animations! :D</div></li>

    <li class="todoList"><div>(2028) Create a quantum + elemental + molecular editor data-structure and component as business logic code and an initially basic 2D (+3D ThreeJS?) user-interface.</div></li>

    <li class="todoList"><div>Create a donations button (again, in collaboration with paypal.com), with monthly goal indicator, for the news app.</div></li>

    <li class="todoList"><div>(2030) Create a bitcoin + stocks + bonds + indexes storage &amp; trading app - with free to use accounts as well - in essence i'd need a bank company name. :-D</div></li>

    <li class="todoList"><div>Implement bandwidth throttling in the <a href="https://github.com/NicerEnterprises/NicerApp-WebOS/tree/main/NicerAppWebOS/scripts.install" target="mainBashInstallScript_for_NicerAppWebOS" class="nomod noPushState">main Bash install script</a>.</div></li>

    <li class="todoList"><div>Add a checkbox in the Theme Editor to select backgrounds and stretch instead of tile them for any DIV.</div></li>

    <!--<li class="todoList"><div>Restore the automatic retrieval of new backgrounds download routines for nicerapp via free to use methods of delivery at Google image search and (TODO :)Bing image search.</div></li>-->

    <li class="todoList">
    <div><pre class="todoList">
    rewrite the backgrounds analysis and automatic resizing routines;
    - put all of the backgrounds in a DOMAIN_TLD___backgrounds dataSet with relative filepath (starting at siteMedia/backgrounds) and image size.
    - let users search for backgrounds based on filepath, then save those searches in their account settings and make them viewable as photoalbums.
    </pre></div>
    </li>

    <li class="todoList"><div>Upgrade the news app and vividDialog : add siteToolbarLeft functionality :<br/>
        <ol class="todoList_l1">
            <li class="todoList_l1"><div>add a 'translate' dropdown box to the app-specific options menu</div></li>
            <li class="todoList_l1"><div>add French news sources</div></li>
            <li class="todoList_l1"><div>add/enable/disable/remove any URL to a combination of lists that are each given a name, which get stored in several database-stored dataSubSets (records/documents) inside a dataSet (table/couchdb-database).<br/>
            </li>
            <li class="todoList_l1"><div>the ability to assign specific 'theme' and 'sub-theme' settings to such a URL.</div></li>
            <li class="todoList_l1"><div>the ability to do keyphrase searches (perhaps later with 'or' and 'and' logic support) on the news content gatered, and paint that content with specific 'theme' and/or 'sub-theme' settings.<br/>
            (putting all of this in siteToolbarLeft and the rest in the siteThemeEditor, and that those can already be shown at the same time, means you can edit *all* user-interface settings for *any* app or service on any HD screen or pad screen.</div></li>
            <li class="todoList_l1"><div>let vividDialog have a vividMenu, with vividButton icons that will lead to vividMenus and vividDialogs and vividDialogPopups, at the top-right of it's borders.<br/>
            the contents of this menu should be defined in a &lt;UL&gt; structure (that can, if needed, get loaded with fresh content via AJAX), much like the vividMenu already is today.</div></li>
        </ol>
    </div>
    </li>

    <li class="todoList"><div>Build a comments engine and user-interface again, this time comments get stored in a database instead of on the server filesystem.</div></li>

    <li class="todoList"><div>Figure out a way to store the width and height of each background found in the filesystem in the output of .../domainConfig/DOMAIN.TLD/ajax_backgrounds_recursive.php and .../domainConfig/DOMAIN.TLD/ajax_backgrounds.php.<br/>
    (NOT DONE) Then use this information in the backgrounds menu to select only elligible backgrounds, and popup an error message 'No backgrounds found, reverting to search key = {$someSearchKey}' when no backgrounds are found for the current search / menu-option.</div></li>

    <li class="todoList"><div>Integration of payment platforms (as plugins) for paypal.com, creditcards, and the Dutch banking system iDeal.</div></li>

    <li class="todoList"><div>Add MySQL and PostgreSQL to the list of supported database architectures (via .../NicerAppWebOS/3rd-party/adodb5), currently only couchdb is supported.<br/>
    </div></li>

</ol>
<!-- no longer necessary here in v5.8.z, the following is now done in .../NicerWebAppOS/site-6.y.z.js::startUIvisuals() :
<script type="text/javascript">
    na.site.bindTodoListAnimations (
        '.todoList > li, '
        +'.contentSectionTitle3, '
        +'p.todoList, h1.todoList, h2.todoList, h3.todoList, '
        +'.todoList > lI > div, '
        +'.todoList > lI > pre, '
        +'.todoList_l1 > li, '
        +'.todoList_l1 > lI > div, '
        +'.todoList_l1 > lI > pre, '
        +'.todoList_l2 > li, '
        +'.todoList_l2 > lI > div, '
        +'.todoList_l2 > lI > pre '
    );
</script>
-->
