$(function () {

    // var zoneArray = zoneArray;          //note "zoneArray" IS SET FROM FURTHER JSON FILE
    var worldClocks = getDefaultClocks();
    var settings = getDefaultSettings();

    //init timezone selector menus
    var allTimezones = allClockMenuTemplate(zoneArray);
    var commonTimezones = commonClockMenuTemplate(zoneArray);
    
    //init maxClocks selector
    $('#max-clocks').attr("value", settings.maxClocks)

    //populate row1 (clocks 1-4)
    for (var i=0;i<4;i++) {
        $("#clock-row-1").append(clockTemplate(worldClocks[i]));
    }
    
    //populate row2 (clocks 5-8)
    for (var i=4;i<8;i++) {
        $("#clock-row-2").append(clockTemplate(worldClocks[i]));
    }

    updateClocks(worldClocks);
    //update time every second
    setInterval(function() { updateClocks(worldClocks); },1000);

    //LISTENERS

    //Show settings modal
    $('.display').click(function() {
        $('#settings-modal').modal('show');
        updateClockSelection(worldClocks, settings);
    });

    //CLOCK SETTINGS LISTENERS

    //Set max clocks
    $('.max-clocks-button').click(function() {
        if (this.id == 'max-clocks-plus') {
            if (settings.maxClocks+1 < 9) {
                settings.maxClocks++;
            }
        }
        else {
            if (settings.maxClocks-1 > 0) {
                settings.maxClocks--;
            }
        }
        $('#max-clocks').val(settings.maxClocks);
        $.each(worldClocks, function(index, obj) { obj.selected = false; });
        
        worldClocks[0].selected = true;

        updateClockLayout(worldClocks, settings.maxClocks);
        updateClockSelection(worldClocks, settings);
    });

    //Reset all clock(s)
    $('#reset-clocks-button').click(function() {
        worldClocks = getDefaultClocks();
        updateClocks(worldClocks);
        updateClockSelection(worldClocks, settings);
    });

    //Select clock(s)
    $('.clock-select-button').click(function() {
        var id = $(this).text();
        
        if (id == "All") { $.each(worldClocks, function(index, obj) { obj.selected = true; }); }
        else if (id == "None") { $.each(worldClocks, function(index, obj) { obj.selected = false; }); }
        else { 
            $.each(worldClocks, function(index, obj) { obj.selected = false; }); //COMMENT THIS LINE TO ENABLE STICKY TOGGLE
            worldClocks[id-1].selected = !(worldClocks[id-1].selected); //toggle true to false and vice versa.
         }
        updateClockSelection(worldClocks, settings);
    });

    //All/common timezones
    $('#all-common-timezone').change(function() {
        if ($('#all-common-timezone').is(':checked')) { 
            $('#timezone-select').html(allTimezones);
        }
        else {
            $('#timezone-select').html(commonTimezones);
        }
    });

    //Set timezone for clock
    $('#timezone-select').change(function() {
        $.each(worldClocks, function(index, obj) { 
            if (obj.selected == true) {
                obj.tzData = getTimezone($('#timezone-select').val());
            }
        });
    });

    //12h/24h
    $('#ampm').change(function() {
        $.each(worldClocks, function(index, obj) { 
            if (obj.selected == true) {
                obj.settings.ampm = $('#ampm').val();
            }
        });
    });

    //Show seconds
    $('#show-seconds').change(function() {
        $.each(worldClocks, function(index, obj) { 
            if (obj.selected == true) {
                obj.settings.showSeconds = $('#show-seconds').val();
            }
        });

    });

    //Select clock title
    $('#clock-title-select').change(function() {
        if ($('#clock-title-select').val() == "custom") {
            $('#custom-clock-title-select-row').removeClass('d-none');
            $('#custom-clock-title-select').focus();
        }
        else {
            $('#custom-clock-title-select-row').addClass('d-none');
            $.each(worldClocks, function(index, obj) { 
                if (obj.selected == true) {
                    obj.settings.titleFormat = $('#clock-title-select').val();
                }
            });
        }
    });

    //Custom title 'set' button
    $('#custom-clock-title-select-submit').click(function() {
        $.each(worldClocks, function(index, obj) { 
            if (obj.selected == true) {
                obj.settings.titleFormat = $('#custom-clock-title-select').val();
            }
        });
    });

    //Select date format
    $('#date-format-select').change(function() {
        if ($('#date-format-select').val() == "custom") {
            $('#custom-date-format-select-row').removeClass('d-none');
            $('#custom-date-format-select').focus();
        }
        else {
            $('#custom-date-format-select-row').addClass('d-none');
            $.each(worldClocks, function(index, obj) { 
            if (obj.selected == true) {
                    obj.settings.dateFormat = $('#date-format-select').val();
                }
            });
        }
    });

    //Custom date format 'set' button
    $('#custom-date-format-select-submit').click(function() {
        $.each(worldClocks, function(index, obj) { 
            if (obj.selected == true) {
                obj.settings.dateFormat = $('#custom-date-format-select').val();
            }
        });
    });

// DISPLAY SETTINGS LISTENERS

    //Select theme
    $('#theme-select').change(function() {
        $('head').append('<link rel="stylesheet" href="' + $('#theme-select').val() + '.css" type="text/css" id="currentTheme" />');
    });

    //Reset
    $('#resetStyleButton').click(function() {
        $.each(worldClocks, function(index, obj) { obj.selected = false; });
        updateClockSelection(worldClocks, settings);
        $('#themeSelect').val("none");
        $('.colorpicker').val("#000000");
        $('#highlightNonlocalDates').prop('checked', false);
        $('#highlightNonbusinessHours').prop('checked', false);
    });

    //Clock select buttons are already handled in Clock Settings
    
    //Bold/Italic/Underline text
    $('.font-button').click(function() {
        var selector = /(.*)-font-(.*)/.exec(this.id.toLowerCase()); //array will be [0] = clocktitlefontbold, [1] = title, [2] = bold

        $(this).toggleClass('btn-primary btn-secondary');
        $.each(worldClocks, function(index, obj) { 
            if (obj.selected == true) {
               obj.settings[selector[1]][selector[2]] = !obj.settings[selector[1]][selector[2]];
            }
        });
        updateClockStyle(worldClocks);
    });
 

    //Font select
    $('.font-family').change(function() {
        var selector = this.id.substr(0, this.id.indexOf('-'));
        var selectElement = $(this);

        $.each(worldClocks, function(index, obj) { 
            if (obj.selected == true) {
                obj.settings[selector].fontFamily = selectElement.val();
            }
        });
        updateClockStyle(worldClocks);
    });

    //Color select
    $('.colorpicker').colorpicker({useAlpha: false}).on('changeColor.colorpicker', function(event) {
        var selector = this.id.split('-');
        var selectElement = $(this);

        $.each(worldClocks, function(index, obj) {
            if (obj.selected == true) {
                if (selector[1] == 'font') {
                    obj.settings[selector[0]].fontColor = selectElement.colorpicker('getValue');
                }
                else if (selector[1] == 'background') {
                    obj.settings.backgroundColor = selectElement.colorpicker('getValue');
                }
                else if (selector[1] == 'nonlocal') {
                    obj.settings.highlightNonlocalDatesColor = selectElement.colorpicker('getValue');
                }
                else if (selector[1] == 'nonbusiness') {
                    obj.settings.highlightNonbusinessHoursColor = selectElement.colorpicker('getValue');
                }
            }
        });
        updateClockStyle(worldClocks);
    });

    //Before/After today
    $('#highlightNonlocalDates').change(function() {
        if ($('#highlightNonlocalDates').is(':checked')) { 
            $('.dateBeforeToday, .dateAfterToday').css('color', $('#highlightNonlocalDatesColor').colorpicker('getValue'));
        }
        else {
            $('.dateBeforeToday, .dateAfterToday').css('color', $('#clockDateFontColor').colorpicker('getValue'));
        }
    });

    //Before/After business hours
    $('#highlightNonbusinessHours').change(function() {
        if ($('#highlightNonbusinessHours').is(':checked')) {
            $('.timeBefore9, .timeAfter5').css('color', $('#highlightNonbusinessHoursColor').colorpicker('getValue'));
        }
        else {
            $('.timeBefore9, .timeAfter5').css('color', $('#clockTimeFontColor').colorpicker('getValue'));
        }
    });


    //ODDS AND ENDS 
    
    //optional listener for ENTER on a custom title set button
    $('.set-button').keypress(function(ev){
        if (ev.which === 13)
            $(this).click();
    });

    //bug work-around
    $('.colorpicker').removeClass('colorpicker-with-alpha');
    
// END JQUERY.DOCUMENT.READY
});

//UPDATE CLOCKS (EVERY SECOND)
function updateClocks(worldClocks) {
    
    worldClocks.forEach(element => {
        var homedt = luxon.DateTime.local();
        var localdt = luxon.DateTime.local().setZone(element.tzData.timezone);

        var localDate = luxon.DateTime.fromISO(localdt.toISODate());
        var homeDate = luxon.DateTime.fromISO(homedt.toISODate());

        localdt.setLocale('en-US');

        var clockId = "#clock-" + element.id;
        var clockTitleId = "#clock-title-" + element.id;
        var dateId = "#clock-date-" + element.id;
        var timeId = "#clock-time-" + element.id;

        var title = getTitleFormat(element);
        var time = getTimeFormat(localdt, element);
        var date = getDateFormat(localdt, element);

        time = time.replace(':', '<span class="separator">:</span>');

        //print title
        $(clockTitleId).text(title);

        //print time
        if (localdt.hour < 9) { $(timeId).addClass('time-before-9').html(time); }
        else if (localdt.hour > 17 ) { $(timeId).addClass('time-after-5').html(time); }
        else { $(timeId).html(time); }

        if (element.settings.showSeconds == "blink") { 
            if (element.settings.blinkOn == true) { 
                $(timeId + ' span.separator').css('visibility', 'hidden');
                element.settings.blinkOn = false;
            }
            else { 
                element.settings.blinkOn = true; 
            }
        }

        //print date
        if (localDate < homeDate) { $(dateId).addClass('date-before-today').html(date); }
        else if (localDate > homeDate) { $(dateId).addClass('date-after-today').html(date); }
        else { $(dateId).html(date); }
        
    });
}

function updateClockLayout(worldClocks, maxClocks) {
    $.each(worldClocks, function(index, obj) { 
        obj.settings.display = false;
    });

    for (i=0;i<maxClocks;i++) {
        worldClocks[i].settings.display = true;
    }
    if (maxClocks == 4) { //special case for 2 up 2 down
        worldClocks[2].settings.display = false; 
        worldClocks[3].settings.display = false; 
        worldClocks[4].settings.display = true; 
        worldClocks[5].settings.display = true; 
    }
    else if (maxClocks == 6) { //special case for 3 up 3 down
        worldClocks[3].settings.display = false; 
        worldClocks[6].settings.display = true; 
    }

    if (maxClocks <= 3) { $('#clock-row-1').addClass('h-100'); $('#clock-row-2').addClass('d-none'); } //resize row1 and hide row2 }
    else { $('.clock-row').removeClass('d-none'); $('.clock-row').removeClass('h-100'); $('.clock-row').addClass('h-50'); }

    $.each(worldClocks, function(index, obj) {
        clockID = '#clock-' + obj.id + '.col';
        if (obj.settings.display == true) { $(clockID).removeClass('d-none'); }
        else { $(clockID).addClass('d-none'); }
    });
}

function updateClockStyle(worldClocks) {

    $.each(worldClocks, function(index, obj) {
        var styleSheetId = "";

        //title-biu
        if (obj.settings.title.bold == true)        { $('#clock-title-' + obj.id).addClass('font-weight-bold'); } else { $('#clock-title-' + obj.id).removeClass('font-weight-bold'); }
        if (obj.settings.title.italic == true)      { $('#clock-title-' + obj.id).addClass('font-italic'); } else { $('#clock-title-' + obj.id).removeClass('font-italic'); }
        if (obj.settings.title.underline == true)   { $('#clock-title-' + obj.id).addClass('font-underline'); } else { $('#clock-title-' + obj.id).removeClass('font-underline'); }
        
        //title-font
        styleSheetId = obj.settings.title.fontFamily.replace(/ /g, "-");
        if (($('option:contains("' + obj.settings.title.fontFamily + '")').hasClass('google-font')) && ($('#' + styleSheetId).length < 1)) {
            $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=' + obj.settings.title.fontFamily.replace(/ /g, "+") + '" type="text/css" id="' + styleSheetId + '" />');
        }
        $('#clock-title-' + obj.id).css({ 'font-family': '"' + obj.settings.title.fontFamily + '", sans-serif'});

        //title-color
        console.log(obj.settings.title.fontColor);
        $('#clock-title-' + obj.id).css({ 'color': obj.settings.title.fontColor });


        //time-biu
        if (obj.settings.time.bold == true)        { $('#clock-time-' + obj.id).addClass('font-weight-bold'); } else { $('#clock-time-' + obj.id).removeClass('font-weight-bold'); }
        if (obj.settings.time.italic == true)      { $('#clock-time-' + obj.id).addClass('font-italic'); } else { $('#clock-time-' + obj.id).removeClass('font-italic'); }
        if (obj.settings.time.underline == true)   { $('#clock-time-' + obj.id).addClass('font-underline'); } else { $('#clock-time-' + obj.id).removeClass('font-underline'); }
  
        //time-font
        styleSheetId = obj.settings.time.fontFamily.replace(/ /g, "-");
        if (($('option:contains("' + obj.settings.time.fontFamily + '")').hasClass('google-font')) && ($('#' + styleSheetId).length < 1)) {
            $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=' + obj.settings.time.fontFamily.replace(/ /g, "+") + '" type="text/css" id="' + styleSheetId + '" />');
        }
        $('#clock-time-' + obj.id).css({ 'font-family': '"' + obj.settings.time.fontFamily + '", sans-serif'});

        //time-color
        $('#clock-time-' + obj.id).css({ 'color': obj.settings.time.fontColor });


        
        //date-biu
        if (obj.settings.date.bold == true)        { $('#clock-date-' + obj.id).addClass('font-weight-bold'); } else { $('#clock-date-' + obj.id).removeClass('font-weight-bold'); }
        if (obj.settings.date.italic == true)      { $('#clock-date-' + obj.id).addClass('font-italic'); } else { $('#clock-date-' + obj.id).removeClass('font-italic'); }
        if (obj.settings.date.underline == true)   { $('#clock-date-' + obj.id).addClass('font-underline'); } else { $('#clock-date-' + obj.id).removeClass('font-underline'); }
        
        //date-font
        styleSheetId = obj.settings.date.fontFamily.replace(/ /g, "-");
        if (($('option:contains("' + obj.settings.date.fontFamily + '")').hasClass('google-font')) && ($('#' + styleSheetId).length < 1)) {
            $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=' + obj.settings.date.fontFamily.replace(/ /g, "+") + '" type="text/css" id="' + styleSheetId + '" />');
        }
        $('#clock-date-' + obj.id).css({ 'font-family': '"' + obj.settings.date.fontFamily + '", sans-serif'});
       
        //date-color
        $('#clock-date-' + obj.id).css({ 'color': obj.settings.date.fontColor});

    //    //other colors
    //    else if (colorPickerElement == 'highlightNonlocalDatesColor') {
    //     $('#highlightNonlocalDates').prop('checked', true);
    //     $('.dateBeforeToday, .dateAfterToday').css({'color': event.color.toHex()});
    // }
    // else if (colorPickerElement == 'highlightNonbusinessHoursColor') {
    //     $('#highlightNonbusinessHours').prop('checked', true);
    //     $('.timeBefore9, .timeAfter5').css({'color': event.color.toHex()});
    // }
       
       
       
        //font family


        // backgroundColor: "#ffffff",
        // title: {
        //     fontSize: "",
        //     fontFamily: "",
        //     fontColor: "",
        //     fontBold: false,
        //     fontItalic: false,
        //     fontUnderline: false
        // },
        // time: {
        //     fontSize: "",
        //     fontFamily: "",
        //     fontColor: "",
        //     fontBold: false,
        //     fontItalic: false,
        //     fontUnderline: false
        // },
        // date: {
        //     fontSize: "",
        //     fontFamily: "",
        //     fontColor: "",
        //     fontBold: false,
        //     fontItalic: false,
        //     fontUnderline: false

        //font 
            
        
        //bold

        //italic

        //underline

        //color
        
        //background

        //non-local date

        //non-business hours

    });

}

function updateClockSelection(worldClocks, settings) {
    var selectCount = 0;
    var clock = {};

    $('.clock-select-button').removeClass('btn-primary').addClass('btn-secondary');

    $.each(worldClocks, function(index, obj) {
        buttonID = '.clock-select-button-' + obj.id;
        $(buttonID).prop('disabled', !obj.settings.display);
        if (obj.selected == true && obj.settings.display == true) {            
            $(buttonID).addClass('btn-primary').removeClass('btn-secondary');
            selectCount++;
            clock = obj;
        }
    });
    
    //if only one clock is selected
    if (selectCount == 1) {
        if ((clock.tzData.common == "true") && ($('#all-common-timezone').prop("checked") == true)) {
            $('#all-common-timezone').prop("checked", false);
            $('#all-common-timezone').trigger("change");
        }
        else if ((clock.tzData.common == "false") && ($('#all-common-timezone').prop("checked") == false)) {
            $('#all-common-timezone').prop("checked", true);
            $('#all-common-timezone').trigger("change");
        }
        $('#timezone-select').val(clock.tzData.timezone);
        $('#ampm').val(clock.settings.ampm);
        $('#show-seconds').val(clock.settings.showSeconds);
        $('#clock-title-select').val(clock.settings.titleFormat);
        $('#date-format-select').val(clock.settings.dateFormat);
    }
    //special case if 0, or if more than 1 clock is selected (generify the inputs)
    else {
        //clock settings tab
        $('all-common-timezone').attr("checked", false);
        $('#timezone-select').val('null');
        $('#ampm').val('null');
        $('#show-seconds').val('null');
        $('#clock-title-select').val('null');
        $('#date-format-select').val('null');
        //display settings tab
        $('.font-family').val('null');
        $('.colorpicker ').val('Select color');
    }

}

function updateClockFontSize(worldClocks, maxClocks) {
    $.each(worldClocks, function(index, obj) { 
        clockID = '#clock' + obj.id;
        bodyWidth = $('body').width();
        clockWidth = $(clockID).width();
        ratio = clockWidth / bodyWidth;
        
        var dimension = '';

        if (maxClocks == 4) { dimension = 'vh'; }
        else if (maxClocks == 5 && obj.id == 5) { dimension = 'vh'; }
        else { dimension = 'vw'; }

        var titleFontSize = (10 * ratio) + dimension;
        var clockFontSize = (12 * ratio) + dimension;
        var dateFontSize = (10 * ratio) + dimension;

        //special case for 5 clocks (can't fiure a way to do this elegantly)
        if (maxClocks == 5 && obj.id == 5) {
                titleFontSize = (10 * ratio) + dimension;
                clockFontSize = (12 * ratio) + dimension;
                dateFontSize = (10 * ratio) + dimension;
        }

        var title = "#clock-title" + obj.id;
        var time = "#clock-time" + obj.id;
        var date = "#clock-date" + obj.id;

        $(title).css('font-size', titleFontSize);
        $(time).css('font-size', clockFontSize);
        $(date).css('font-size', dateFontSize);
    });
}

function getTitleFormat(clock) {
    var title;
    
    switch(clock.settings.titleFormat) {
        case "short":
            title = clock.tzData.IATA;
            break;
        case "city":
            title = clock.tzData.city;
            break;
        case "country":
            title = clock.tzData.country;
            break;
        case "timezone":
            title = clock.tzData.timezone;
            break;
        default:
            title = clock.settings.titleFormat;
            break;
    }

    return title;
}

function getDateFormat(ldt, clock) {
    var date;
    
    switch(clock.settings.dateFormat) {
        case "none":
            date = "";
            break;
        case "short":
            date = ldt.setLocale('en-GB').toLocaleString(luxon.DateTime.DATE_MED);
            break;
        case "shortday":
            date = ldt.weekdayShort + ", " + ldt.setLocale('en-GB').toLocaleString(luxon.DateTime.DATE_MED);
            break;
        case "long":
            date = ldt.setLocale('en-GB').toLocaleString(luxon.DateTime.DATE_HUGE);
            break;
        default:
            date = ldt.setLocale('en-GB').toFormat(clock.settings.dateFormat);
            break;
    }
    return date;
}

function getTimeFormat(ldt, clock) {
    var time;
    
    if (clock.settings.ampm == "12hr") {
        if (clock.settings.showSeconds == "number") { time = ldt.setLocale('en-US').toLocaleString(luxon.DateTime.TIME_WITH_SECONDS); }
        else { time = ldt.setLocale('en-US').toLocaleString(luxon.DateTime.TIME_SIMPLE); } // for blink or none
    }
    else {
        if (clock.settings.showSeconds == "number") { time = ldt.setLocale('en-US').toLocaleString(luxon.DateTime.TIME_24_WITH_SECONDS); }
        else { time = ldt.setLocale('en-US').toLocaleString(luxon.DateTime.TIME_24_SIMPLE); } // for blink or none
    }
    return time;
}

function getTimezone(zone) {
    var tz = zoneArray.filter(function(obj) {
        return obj.timezone == zone;
      });
    return $.extend(true, {}, tz[0]);
}

// DEFAULT CLOCK SETUP

function getDefaultSettings() {
    var defaultSettings =   {
                                maxClocks: 8,
                                theme: ""
                            }
    return defaultSettings;
}

function getDefaultClocks() {
    var clocks = [];
    var defaultTimezones = ["America/Los_Angeles", "America/New_York", "Europe/London", "Europe/Berlin", "Asia/Kolkata", "Asia/Hong_Kong", "Asia/Tokyo", "Australia/Sydney"];
    
    for (i=0;i<8;i++) {
        clock = getDefaultClock();
        tzData = getTimezone(defaultTimezones[i]);
        
        clock.id = i+1;
        clock.tzData = tzData; //important to use $.extend to clone the object (rather than create a reference)

        clocks[i] = clock;
    }

    clocks[0].selected = true;

    return clocks;
}

function getDefaultClock() {
    var defaultSettings =   {
                                id: "",
                                tzData: "",
                                selected: false,
                                settings: {
                                    ampm: "24hr",
                                    backgroundColor: "#ffffff",
                                    title: {
                                        fontSize: "",
                                        fontFamily: "Arial",
                                        fontColor: "#000000",
                                        bold: false,
                                        italic: false,
                                        underline: false
                                    },
                                    time: {
                                        fontSize: "",
                                        fontFamily: "Arial",
                                        fontColor: "#000000",
                                        bold: false,
                                        italic: false,
                                        underline: false
                                    },
                                    date: {
                                        fontSize: "",
                                        fontFamily: "Arial",
                                        fontColor: "#000000",
                                        bold: false,
                                        italic: false,
                                        underline: false
                                    },
                                    blinkOn: true,
                                    dateFormat: "shortday",
                                    display: true,
                                    highlightNonLocalDate: true,
                                    highlightNonlocalDatesColor: "#ff0000",
                                    highlightNonbusinessHours: false,
                                    highlightNonbusinessHoursColor: "#ff8000",
                                    showSeconds: "none",
                                    titleFormat: "city"
                                }
                            }
    return defaultSettings;
}


// HTML MICRO-TEMPLATES

function clockTemplate(clockData, settings) {
    var id = clockData.id
    var template = 
    `<div id="clock-${id}" class="col text-center my-auto clock vertical-align justify-content-center">
        <div class="clockInner">
            <div id="clock-title-${id}" class="clock-title"></div>
            <div id="clock-time-${id}" class="clock-time"></div>
            <div id="clock-date-${id}" class="clock-date"></div>
        </div>
    </div>`;
    return template;
}

function commonClockMenuTemplate(clockData) {
      var template = `<option id="select" selected hidden>Select timezone</option>
                    <option value="null">None (No clock displayed)</option>`;
    var group = '';
    var commonZones = [];
    $.each(clockData, function(i, item) {
        if (item.common == "true") {
            commonZones.push(item);
        }
    });

    commonZones.sort(function(a, b) {
        return parseFloat(a.numericalUTCoffset) - parseFloat(b.numericalUTCoffset);
    });

    $.each(commonZones, function(i, item) {
        template += `<option value = "${item.timezone}">(${item.UTCoffset}) ${item.timezone}</option>`;
    });
    
    return template;
}

function allClockMenuTemplate(clockData) {

    var template = `<option selected hidden>Select timezone</option>
                    <option value = "0">None (No clock displayed)</option>`;
    var group = '';
    $.each(clockData, function(i, item) {
        if (group != item.region) {
            group = item.region;
            template +=  `<optgroup label="${item.region}">`;
        }
        template += `<option value = "${item.timezone}">${item.timezone} (${item.UTCoffset})</option>`;
    });

    return template;
}