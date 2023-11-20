var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

$(function () {

    //setup
    $("#configWrapper button, #configWrapper input[type=submit]").not(".noUI").button();
    $("#configWrapper select").not(".noUI").addClass("ui-corner-all");
    $("#configWrapper").addClass("ui-widget");

    //highlight text on click or focus
    $("#configWrapper input:text")
        .focus(function () { $(this).select(); })
        .click(function () { $(this).focus(); })

    //prevent weird highlighting on radiobutton click
    $(".radioButton").buttonset().click(function () {
        document.getSelection().removeAllRanges();
    });

    //measure each configTitle, get the max, set the width of all configTitles to be that width
    var maxTitleWidth = 0;
    $(".configTitle").each(function () {
        maxTitleWidth = Math.max(maxTitleWidth, $(this).width());
    }).width(maxTitleWidth + 2);

    //change text-align if configwrapper is opened in a small screen. This just makes it look better imo
    var maxWidth = $("#configWrapper").css("max-width").slice(0, -2);
    if ($("#configWrapper").width() < maxWidth) {
        $(".configTitle").css("text-align", "left");
    }

    //setup infobubbles, make sure they work on mobile
    $(".infoBubble").attr('src', '/Configurators/configPictures/ibubble.jpg').tooltip({
        tooltipClass: "small",
        items: "img",
        hide: { duration: "fast" }
    }).click(function () {
        $(this).tooltip("open");
    });
});

}
/*
     FILE ARCHIVED ON 05:46:07 May 13, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 05:03:28 Nov 07, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 155.675
  exclusion.robots: 0.072
  exclusion.robots.policy: 0.061
  cdx.remote: 0.059
  esindex: 0.009
  LoadShardBlock: 130.941 (3)
  PetaboxLoader3.datanode: 58.602 (4)
  PetaboxLoader3.resolve: 131.435 (3)
  load_resource: 67.674
*/