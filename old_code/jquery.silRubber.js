$(function () {
    $("#dimen,#closeLeadsTstat,#powerVoltage").accordion({
        collapsible: false, heightStyle: "content", active: false
    });

    //max and min global variables for silicone rubber rect/circular heaters
    var limits = {
        minWidth: 1,
        maxWidth: 38,
        minLength: 1,
        maxLength: 98,
        minDiam: 1,
        maxDiam: 37,
        minLeadLength: 1,
        maxLeadLength: 240,
        minVolt: 12,
        maxVolt: 480,
        minWatt: 10,
        maxWattDensity: 10,
        maxAmps: 15
    }
    //global variables used in limiting the form
    var minWidth = limits.minWidth;
    var maxWidth = limits.maxWidth;
    var minLength = limits.minLength;
    var maxLength = limits.maxLength;
    var minDiam = limits.minDiam;
    var maxDiam = limits.maxDiam;
    var minLeadLength = limits.minLeadLength;
    var maxLeadLength = limits.maxLeadLength;
    var minVolt = limits.minVolt;
    var maxVolt = limits.maxVolt;
    var minWatt = limits.minWatt;
    var maxWattDensity = limits.maxWattDensity;
    var maxAmps = limits.maxAmps;

    //array for different options. images and descriptions
    var descArray = {
        xclosureVelcro: { title: "Velcro Closure", img: "/configurators/configPictures/SR/velcro.png", desc: "Velcro straps are used to secure the heater to a surface. Used when flexible heaters must be detachable from cylindrical parts.", note: "" },
        xclosureSpring: { title: "Spring Closure", img: "/configurators/configPictures/SR/Spring-loaded.png", desc: "When a silicone rubber heater is wrapped around an application, the ends of the heater can be fastened by metallic fasteners with springs.", note: "" },
        xclosurePSA: { title: "Pressure Sensitive Adhesive (PSA)", img: "/configurators/configPictures/SR/psa.png", desc: "Pressure Sensitive Adhesive (PSA). Peel off the protective liner and apply. It will adhere to most clean, smooth surfaces. ", note: "Selecting PSA will limit the watt density of the heater to 5 W/in\xB2." },
        xleadsPTFE: { title: "PTFE Leads", img: "/configurators/configPictures/SR/Teflon.png", desc: "PTFE-insulated, flexible, stranded, plated copper wire. Lead connections are insulated with vulcanized silicone rubber, which also acts as a strain relief.", note: "" },
        xleadsSil: { title: "Silicon Rubber Leads", img: "/configurators/configPictures/SR/Teflon.png", desc: "Ensures a moisture seal on the heater. Silicone rubber leads are more flexible, but are not as abrasion-resistant as PTFE leads.", note: "" },
        xleadsSJO: { title: "SJO Leads", img: "/configurators/configPictures/SR/sjoPlugs.png", desc: "An SJO heavy-duty power cord and plug set can be attached to the heaters.", note: "Including a plug will limit voltage to 120V." },
        xtstatPreset: { title: "Preset Thermostat", img: "/configurators/configPictures/SR/presetTstat.png", desc: "The preset thermostats automatically reset at preset temperature. An electrically isolated bimetallic disc is used to either open or close the circuit current.", note: "Selecting any thermostat will limit the size, voltage, and wattage of the heater." },
        xtstatAdj: { title: "Adjustable Thermostat", img: "/configurators/configPictures/SR/adjTstatCombined.png", desc: "Adjustable thermostats allow the user to dial in a specific temperature. The thermostat is enclosed in a molded silicone rubber housing and permanently attached to the heater.", note: "Selecting any thermostat will limit the size, voltage, and wattage of the heater." }
    };
    //data for available thermostats
    var tstatLimits = { minWidth: 2.5, minLength: 6, minDiam: 6, minVolt: 100, maxVolt: 250, maxAmps: 12 };
    var tstatData = {
        OA50: { name: "OA-50", low: 32, pmlow: 10, high: 50, pmhigh: 5 },
        OA60: { name: "OA-60", low: 40, pmlow: 7, high: 60, pmhigh: 5 },
        OA85: { name: "OA-85", low: 67, pmlow: 9, high: 85, pmhigh: 5 },
        OA110: { name: "OA-110", low: 80, pmlow: 10, high: 110, pmhigh: 5 },
        OA120: { name: "OA-120", low: 90, pmlow: 10, high: 120, pmhigh: 5 },
        OA140: { name: "OA-140", low: 110, pmlow: 10, high: 140, pmhigh: 5 },
        OA150: { name: "OA-150", low: 120, pmlow: 10, high: 150, pmhigh: 5 },
        OA190: { name: "OA-190", low: 160, pmlow: 10, high: 190, pmhigh: 5 },
        OA200: { name: "OA-200", low: 170, pmlow: 10, high: 200, pmhigh: 5 },
        OA250: { name: "OA-250", low: 220, pmlow: 10, high: 250, pmhigh: 7 },
        OA300: { name: "OA-300", low: 240, pmlow: 10, high: 300, pmhigh: 7 },
        A4059: { name: "A-4059", low: 100, pmlow: 10, high: 165, pmhigh: 10 },
        A4051: { name: "A-4051", low: 0, pmlow: 0, high: 205, pmhigh: 7 },
        A4081: { name: "A-4081", low: 0, pmlow: 0, high: 375, pmhigh: 15 }
    };

    $('#lengthSlider').slider({
        min: 0,
        max: maxLength,
        value: minLength,
        step: .25,
        slide: function (event, ui) {
            return lengthChange($(this).val(ui.value));
        }
    });
    $('#diamSlider').slider({
        min: 0,
        max: maxDiam,
        value: minDiam,
        step: .25,
        slide: function (event, ui) {
            return diamChange($(this).val(ui.value));
        }
    });
    $('#widthSlider').slider({
        orientation: "vertical",
        min: -maxWidth,
        max: 0,
        value: -minWidth,
        step: .25,
        slide: function (event, ui) {
            return widthChange($(this).val(ui.value));
        }
    }).height('100%');

    $(".lengthSpinner").spinner({
        min: minLength,
        max: maxLength,
        range: "min",
        step: .25,
        stop: function (event, ui) {
            if (event.which <= 3)
                lengthChange($(this));
        }
    }).spinnerChange(function () {
        lengthChange($(".lengthSpinner"));
    }).val(minLength);

    $(".widthSpinner").spinner({
        min: minWidth,
        max: maxWidth,
        step: .25,
        stop: function (event, ui) {
            if (event.which <= 3)
                widthChange($(this));
        }
    }).spinnerChange(function () {
        widthChange($(".widthSpinner"));
    }).val(minWidth);

    $(".diamSpinner").spinner({
        min: minWidth,
        max: maxWidth,
        step: .25,
        stop: function (event, ui) {
            if (event.which <= 3)
                diamChange($(this));
        }
    }).spinnerChange(function () {
        diamChange($(".diamSpinner"));
    }).val(minDiam);

    $(".leadSpinner").spinner({
        min: minLeadLength,
        max: maxLeadLength,
        step: 1
    }).spinnerChange(null).val(6);

    $("#powerSlider").slider({
        step: 1,
        min: minWatt,
        range: "min",
        slide: function (event, ui) {
            $(".powerSpinner").spinner("value", ui.value)
        }
    });
    $(".powerSpinner").spinner({
        step: 1,
        min: minWatt,
        change: function (event, ui) {
            $("#powerSlider").slider("value", $(this).val());
        },
        spin: function (event, ui) {
            $("#powerSlider").slider("value", $(this).val());
        }
    }).val(minWatt).spinnerChange(null);
    $("#powerMin").text(minWatt + "W");

    $("#voltSlider").slider({
        step: 1,
        range: "min",
        min: minVolt,
        max: maxVolt,
        value: minVolt,
        slide: function (event, ui) {
            var newStep = (ui.value > 48) ? 5 : 1;
            var min = minVolt;
            if (min % newStep != 0) {
                min = (Math.round(min / newStep) * newStep);
            }
            $(this).slider("option", { min: min, step: newStep });
            $(".voltSpinner").spinner("value", ui.value).change();
        }
    });
    $(".voltSpinner").spinner({
        step: 1,
        min: minVolt,
        max: maxVolt,
        spin: function (event, ui) {
            $("#voltSlider").slider("value", $(this).val());
        },
        stop: function (event, ui) {
            if (event.which <= 3) {
                $(this).change();
            }
        }
    }).spinnerChange(function (event, ui) {
        var tstat = $(".tstatRadio input[type=radio]:checked").val();
        var voltVal = $(".voltSpinner").val();
        $("#voltSlider").slider("value", voltVal);
        if (tstat != "None") {
            maxAmps = (voltVal < 200) ? 12 : 8;
        }
        $("#maxAmps").text(maxAmps);
        getMaxWatts();
    }).val(minVolt);

    var updateVoltText = function () {
        $("#voltMin").text(minVolt);
        $("#voltMax").text(maxVolt);
    }
    updateVoltText();

    $('#dimDiv').width((minLength / maxLength * 100) + '%').height((minWidth / maxWidth * 100) + '%');
    $('#widthSlider').height($('#lengthSlider').width() * (maxWidth / maxLength));
    $('#diamSlider').width($('#widthSlider').height());
    $('#dimDiv').parent().height($('#widthSlider').height());

    function lengthChange(obj) {
        result = true;
        if (obj.val() < minLength) {
            obj.val(minLength);
            result = false;
        }
        $(".lengthSpinner").spinner("value", obj.val());
        $("#lengthSlider").slider("value", obj.val());

        var percent = (obj.val() / maxLength) * 100;
        $('#dimDiv').width(percent + '%');

        getMaxWatts();
        return result;
    }
    function widthChange(obj) {
        result = true;
        if (Math.abs(obj.val()) < minWidth) {
            obj.val(-minWidth);
            result = false;
        }
        $(".widthSpinner").spinner("value", Math.abs(obj.val()));
        $("#widthSlider").slider("value", -Math.abs(obj.val()));

        var percent = (Math.abs(obj.val()) / maxWidth) * 100;
        $('#dimDiv').height(percent + '%');

        getMaxWatts();
        return result;
    }
    function diamChange(obj) {
        result = true;
        if (obj.val() < minDiam) {
            obj.val(minDiam);
            result = false;
        }
        $(".diamSpinner").spinner("value", obj.val());
        $("#diamSlider").slider("value", obj.val());

        var percent = (obj.val() / maxDiam) * 100;
        $('#dimDiv').width(percent + '%').height(percent + '%');

        getMaxWatts();
        return result;
    }
    var diamDivWidth = 0;
    var lengthDivWidth = 0;
    $(".shapeRadio").change(function () {
        var s = $(".shapeRadio input[type='radio']:checked").val();
        diamDivWidth = Math.max(diamDivWidth, $('#diamSlider').width());
        lengthDivWidth = Math.max(lengthDivWidth, $('#lengthSlider').width())

        $(".circleShapeShow,.rectShapeShow,#otherShapeDiv").hide();
        if (s == "other") {
            $("#otherShapeDiv").fadeIn();
            $("#closureSpring input,#closureVelcro input").button("enable");
        }
        else if (s == "rect") {
            $(".rectShapeShow").fadeIn();
            $("#dimDiv").css("border-radius", "0%");
            $("#diamSlider").parent().css("margin-left", 25);

            $('#dimDiv').parent().width(lengthDivWidth);
            $("#closureSpring input,#closureVelcro input").button("enable");
            $(".lengthSpinner,.widthSpinner").change();
        }
        else {
            $(".circleShapeShow").fadeIn();
            $("#dimDiv").css("border-radius", "50%");
            $("#diamSlider").parent().css("margin-left", 0);

            $('#dimDiv').parent().width(diamDivWidth);
            $("#closureNone input").prop('checked', true);
            $("#closureSpring input,#closureVelcro input").button("disable");
            $(".diamSpinner").change();
        }
        $(".closureRadio").buttonset().change();
    });

    $(".closureRadio").change(function () {
        var s = $(".closureRadio input[type=radio]:checked").val();
        maxWattDensity = (s == "PSA") ? 5 : 10;
        $("#maxWattDens").text(maxWattDensity);
        getMaxWatts();
        fillDesc("#closure", "closure" + s);
    });
    $(".leadsRadio").change(function () {
        var s = $(".leadsRadio input[type=radio]:checked").val();
        if (s == "SJO") {
            $("#plugsRadioDiv").fadeIn();
        }
        else {
            $("#plugsRadioDiv").fadeOut(function () {
                $("#plugsNone input").prop('checked', true);
                $(".plugsRadio").buttonset().change();
            });
        }
        fillDesc("#leads", "leads" + s);
    });

    $("#tstatAdjSelect").hide();
    $(".tstatRadio").change(function () {
        var selTstat = $(".tstatRadio input[type=radio]:checked").val();
        var selShape = $(".shapeRadio input[type=radio]:checked").val();
        var selPlug = $(".plugsRadio input[type=radio]:checked").val();
        fillDesc("#tstat", "tstat" + selTstat);

        if (selTstat != "None") {
            minLength = tstatLimits.minLength;
            minDiam = tstatLimits.minDiam;
            minWidth = tstatLimits.minWidth;
            maxAmps = tstatLimits.maxAmps;
            if (selPlug == "None") {
                minVolt = tstatLimits.minVolt;
                maxVolt = tstatLimits.maxVolt;
            }
            $("#maxAmps").text(maxAmps);
            $("#tstatSelectDiv").show(200);

            if (selShape == "circle") {
                $(".diamSpinner").change();
            }
            else if (selShape == "rect") {
                $(".lengthSpinner,.widthSpinner").change();
            }
            if (selTstat == "Preset") {
                $("#tstatAdjSelect").hide();
                $("#tstatPresetSelect").show().change();
            }
            else {
                $("#tstatAdjSelect").show().change();
                $("#tstatPresetSelect").hide();
            }
        }
        else {
            minLength = limits.minLength;
            minDiam = limits.minDiam;
            minWidth = limits.minWidth;
            maxAmps = limits.maxAmps;
            if (selPlug == "None") {
                minVolt = limits.minVolt;
                maxVolt = limits.maxVolt;
            }
            $("#tstatSelectDiv").hide();
        }
        $("#voltSlider").slider("option", { min: minVolt, max: maxVolt });
        $(".voltSpinner").spinner("option", { min: minVolt, max: maxVolt }).change();
        $(".lengthSpinner,.diamSpinner").spinner("option", "min", minLength);
        $(".widthSpinner").spinner("option", "min", minWidth);
        updateVoltText();
    });

    //selecting different tstats via spinner 
    $(".tstatSelect").change(function () {
        var tstat = $(this).val();

        var selected = tstatData[tstat.replace('-', '')];
        if (selected != null) {
            $("#tstatHigh").text(selected.high);
            if (selected.low == 0) {
                $("#tstatRoomTemp").show().next().hide();
            }
            else {
                $("#tstatRoomTemp").hide().next().show();
                $("#tstatLow").text(selected.low);
            }
            $(".tstatSelection").val(selected.name);
        }
    });
    //restrict voltage if plug is selected
    $(".plugsRadio").change(function () {
        var selTstat = $(".tstatRadio input[type=radio]:checked").val();
        var selPlug = $(".plugsRadio input[type=radio]:checked").val();
        if (selPlug == "None") {
            if (selTstat == "None") {
                minVolt = limits.minVolt;
                maxVolt = limits.maxVolt;
            }
            else {
                minVolt = tstatLimits.minVolt;
                maxVolt = tstatLimits.maxVolt;
            }
            $("#voltSlider").slider("enable");
            $("#voltDiv").removeClass("disabled");
        }
        else {
            minVolt = 120;
            maxVolt = 120;
            $("#voltSlider").slider("disable");
            $("#voltDiv").addClass("disabled");
        }
        $("#voltSlider").slider("option", { min: minVolt, max: maxVolt });
        $(".voltSpinner").spinner("option", { min: minVolt, max: maxVolt }).change();
        updateVoltText();
        getMaxWatts();
    });

    //Pulls data from array, displays in corresponding section
    function fillDesc(which, ID) {
        var selected = descArray[ID];
        if (selected == null) {
            $(which + "Div").hide(200);
        }
        else {
            $(which + "Div").show(200);
            var note = (selected.note != "") ? "<br /><br /> <b>Note:</b> " + selected.note : "";
            $(which + "Desc").html(selected.desc + note);
            $(which + "Img").attr('src', selected.img);
        }
    }
    function getMaxWatts() {
        var shape = $(".shapeRadio input[type=radio]:checked").val();
        var volts = $(".voltSpinner").val();
        var area = Infinity;
        if (shape == "rect") {
            area = $(".lengthSpinner").val() * $(".widthSpinner").val();
        }
        else if (shape == "circle") {
            area = Math.PI * Math.pow($(".diamSpinner").val() / 2, 2);
        }
        var maxWatts = Math.round(Math.min(area * maxWattDensity, maxAmps * volts));
        var currentMinWatts = (minWatt > maxWatts) ? maxWatts : minWatt;

        $("#powerSlider").slider("option", { max: maxWatts, min: currentMinWatts });
        $(".powerSpinner").spinner("option", { max: maxWatts, min: currentMinWatts }).change();
        $("#powerMax").text(maxWatts + "W");
        $("#powerMin").text(currentMinWatts + "W");
    }
    $(".closureRadio,.leadsRadio,.tstatRadio,.shapeRadio").change();
});

}
/*
     FILE ARCHIVED ON 06:42:09 May 13, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 05:03:28 Nov 07, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 80.574
  exclusion.robots: 0.149
  exclusion.robots.policy: 0.131
  cdx.remote: 0.102
  esindex: 0.016
  LoadShardBlock: 51.032 (3)
  PetaboxLoader3.datanode: 79.576 (4)
  load_resource: 148.178
  PetaboxLoader3.resolve: 99.18
*/