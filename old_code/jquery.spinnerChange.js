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

(function ($) {
    $.fn.spinnerChange = function (func) {

        //bind change event to 'Enter' for the spinner, prevent default form submit
        $(this).keydown(function (event) {
            
            if (event.keyCode == 10 || event.keyCode == 13) {
                event.preventDefault();
                this.blur();
            }
        });
        $(this).change(function (event, ui) {
            var val = this.value;

            if (!$.isNumeric(val))
                val = 0;

            //fancy math to round spinners to nearest step
            var step = $(this).spinner("option", "step");
            val = (Math.round(val / step) * step);

            //Fix floating point impresicion by limiting output to number of decimals in step
            if (step < 1) {
                var numberOfDecimals = (step + '').replace(/^-?\d*\.?|0+$/g, '').length;
                val = parseFloat(val.toFixed(numberOfDecimals));
            }

            var max = ($(this).spinner("option", "max"));
            var min = ($(this).spinner("option", "min"));
            if (val > max)
                val = max;
            if (val < min)
                val = min;

            this.value = val;

            if (typeof func == "function") {
                func();
            }
        });
        return this;
    }
})(jQuery);

}
/*
     FILE ARCHIVED ON 03:29:08 May 13, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 05:03:28 Nov 07, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 103.315
  exclusion.robots: 0.085
  exclusion.robots.policy: 0.076
  cdx.remote: 0.06
  esindex: 0.008
  LoadShardBlock: 78.854 (3)
  PetaboxLoader3.datanode: 112.64 (4)
  load_resource: 241.431
  PetaboxLoader3.resolve: 191.487
*/