$(function () {

    // var zoneArray = zoneArray;          //note "zoneArray" IS SET FROM FURTHER JSON FILE
    var simpleWorldClock = {};

    simpleWorldClock.worldClocks = getDefaultClocks();
    simpleWorldClock.globalSettings = getDefaultSettings();

    var worldClocks = simpleWorldClock.worldClocks;
    var globalSettings = simpleWorldClock.globalSettings;

    //init timezone selector menus
    var allTimezones = getClockMenuTemplate(zoneArray, "all");
    var commonTimezones = getClockMenuTemplate(zoneArray, "common");

    var allLocales = getLocaleMenuTemplate(localeArray, "all");
    var commonLocales = getLocaleMenuTemplate(localeArray, "common")

    $('.advanced-option').hide()

    //init maxClocks selector
    $('#max-clocks').attr("value", globalSettings.maxClocks)

    //populate row1 (clocks 1-4)
    for (var i = 0; i < 4; i++) {
        $("#clock-row-1").append(clockTemplate(worldClocks[i]));
    }

    //populate row2 (clocks 5-8)
    for (var i = 4; i < 8; i++) {
        $("#clock-row-2").append(clockTemplate(worldClocks[i]));
    }

    updateClocks(worldClocks);
    updateClockStyle(worldClocks, globalSettings);

    //update time every second
    setInterval(function () {
        updateClocks(worldClocks);
    }, 1000);

    //LISTENERS

    //Show settings modal
    $('.display').click(function () {
        $('#settings-modal').modal('show');
        updateClockSelection(worldClocks, globalSettings);
    });

    //Advanced mode
    $('#advanced-mode').click(function () {
        $('.advanced-option').toggle();
        $('#advanced-mode svg').toggleClass('svg-red')
    });

    //Preview mode
    //$('#preview-mode').click(function () {
    $('#preview-mode').hover(function () {
        $('#settings-modal-header h5').toggleClass('invisible');
        $('#settings-inner-body').toggleClass('invisible');
        $('#settings-modal-header').toggleClass('no-border');
        $('.modal-backdrop').toggleClass('transparent-background');
        $('#settings-modal-content').toggleClass('transparent-background');
    });

    //CLOCK SETTINGS LISTENERS

    //Set max clocks
    $('.max-clocks-button').click(function () {
        if (this.id == 'max-clocks-plus') {
            if (globalSettings.maxClocks + 1 < 9) {
                globalSettings.maxClocks++;
            }
        } else {
            if (globalSettings.maxClocks - 1 > 0) {
                globalSettings.maxClocks--;
            }
        }
        $('#max-clocks').val(globalSettings.maxClocks);
        $.each(worldClocks, function (index, obj) {
            obj.selected = false;
        });

        worldClocks[0].selected = true;

        updateClockLayout(worldClocks, globalSettings.maxClocks);
        updateClockSelection(worldClocks, globalSettings);
    });

    //Reset all clock(s)
    $('#reset-button').click(function (e) {
        e.preventDefault();
        if (window.confirm("Will reset all time-zones to default, and remove all styles. Are you sure?")) {
            worldClocks = getDefaultClocks();
            updateClocks(worldClocks);
            updateClockSelection(worldClocks, globalSettings);
            $('*:not(iframe)').removeAttr('style');
            $('#settings-modal').modal('hide');
        }
    });

    //Save clock settings
    $('#save-button').click(function (e) {
        var text = JSON.stringify(simpleWorldClock);
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
        a.setAttribute('download', "simpleworldclock_settings.json");
        a.click()
    });

    $('#load-file').change(function () {
        if (!window.FileReader) {
            return alert('FileReader API is not supported by your browser.');
        }
        var $i = $('#load-file'), // Put file input ID here
            input = $i[0]; // Getting the element from jQuery
        if (input.files && input.files[0]) {
            file = input.files[0]; // The file
            fr = new FileReader(); // FileReader instance
            fr.onload = function () {
                // Do stuff on onload, use fr.result for contents of file
                //alert(file);
                simpleWorldClock = JSON.parse(fr.result);
                worldClocks = simpleWorldClock.worldClocks;
                globalSettings = simpleWorldClock.globalSettings;
                updateClocks(worldClocks);
                updateClockStyle(worldClocks, globalSettings);
            };
            fr.readAsText(file);
            //fr.readAsDataURL(file);
        } else {
            // Handle errors here
            alert("File not selected or browser incompatible.")
        }
    });

    //Select clock(s)
    $('.clock-select-button').click(function () {
        var id = $(this).text();

        if (id == "All") {
            $.each(worldClocks, function (index, obj) {
                obj.selected = true;
            });
        } else if (id == "None") {
            $.each(worldClocks, function (index, obj) {
                obj.selected = false;
            });
        } else {
            $.each(worldClocks, function (index, obj) {
                obj.selected = false;
            }); //COMMENT THIS LINE TO ENABLE STICKY TOGGLE
            worldClocks[id - 1].selected = !(worldClocks[id - 1].selected); //toggle true to false and vice versa.
        }
        updateClockSelection(worldClocks, globalSettings);
    });

    //All/common timezones
    $('#all-common-timezone').change(function () {
        if ($('#all-common-timezone').is(':checked')) {
            $('#timezone-select').html(allTimezones);
        } else {
            $('#timezone-select').html(commonTimezones);
        }
    });

    //Set timezone for clock
    $('#timezone-select').change(function () {
        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.tzData = getTimezone($('#timezone-select').val());
            }
        });
    });

    //12h/24h
    $('#ampm').change(function () {
        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.settings.ampm = $('#ampm').val();
            }
        });
    });

    //Show seconds
    $('#show-seconds').change(function () {
        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.settings.showSeconds = $('#show-seconds').val();
            }
        });
    });

    //Number system
    $('#number-system').change(function () {
        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.settings.numberSystem = $('#number-system').val();
            }
        });
    });

    //Calendar system
    $('#calendar-system').change(function () {
        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.settings.calendarSystem = $('#calendar-system').val();
            }
        });
    });

    //Select clock title
    $('#clock-title-select').change(function () {
        if ($('#clock-title-select').val() == "custom") {
            $('#custom-clock-title-select-row').removeClass('d-none');
            $('#custom-clock-title-select').focus();
        } else {
            $('#custom-clock-title-select-row').addClass('d-none');
            $.each(worldClocks, function (index, obj) {
                if (obj.selected == true) {
                    obj.settings.titleFormat = $('#clock-title-select').val();
                }
            });
        }
    });

    //Custom title 'set' button
    $('#custom-clock-title-select-submit').click(function () {
        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.settings.titleFormat = $('#custom-clock-title-select').val();
            }
        });
    });

    //All/common locale
    $('#all-common-locale').change(function () {
        if ($('#all-common-locale').is(':checked')) {
            $('#locale-select').html(allLocales);
        } else {
            $('#locale-select').html(commonLocales);
        }
    });

    //Set locale for clock
    $('#locale-select').change(function () {
        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.localeData = getLocale($('#locale-select').val());
            }
            console.log(obj.localeData)
        });
    });

    //Select date format
    $('#date-format-select').change(function () {
        if ($('#date-format-select').val() == "custom") {
            $('#custom-date-format-select-row').removeClass('d-none');
            $('#custom-date-format-select').focus();
        } else {
            $('#custom-date-format-select-row').addClass('d-none');
            $.each(worldClocks, function (index, obj) {
                if (obj.selected == true) {
                    obj.settings.dateFormat = $('#date-format-select').val();
                }
            });
        }
    });

    //Custom date format 'set' button
    $('#custom-date-format-select-submit').click(function () {
        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.settings.dateFormat = $('#custom-date-format-select').val();
            }
        });
    });

    // DISPLAY SETTINGS LISTENERS

    //Select theme
    $('#theme-select').change(function () {
        $('head').append('<link rel="stylesheet" href="' + $('#theme-select').val() + '.css" type="text/css" id="currentTheme" />');
    });

    //Bold/Italic/Underline text
    $('.font-button').click(function () {
        var selector = /(.*)-font-(.*)/.exec(this.id.toLowerCase()); //array will be [0] = clocktitlefontbold, [1] = title, [2] = bold

        $(this).toggleClass('btn-primary btn-secondary');
        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.settings[selector[1]][selector[2]] = !obj.settings[selector[1]][selector[2]];
            }
        });
        updateClockStyle(worldClocks);
    });

    //Font family
    $('.font-family').change(function () {
        var selector = this.id.substr(0, this.id.indexOf('-'));
        var selectElement = $(this);

        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.settings[selector].fontFamily = selectElement.val();
            }
        });
        updateClockStyle(worldClocks);
    });

    //Font size
    $('.font-size').change(function () {
        var selector = this.id.substr(0, this.id.indexOf('-'));
        var selectElement = $(this);

        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                obj.settings[selector].fontSize = selectElement.val();
            }
        });
        updateClockStyle(worldClocks);
    });

    //Color select
    $('.cp').colorpicker({
        useAlpha: false
    });

    $('.cp').on('changeColor.colorpicker', function (event) {
        var selector = this.id.split('-');
        var selectElement = $(this);

        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                if (selector[1] == 'font') {
                    obj.settings[selector[0]].fontColor = selectElement.colorpicker('getValue');
                } else if (selector[1] == 'background') {
                    obj.settings.backgroundColor = selectElement.colorpicker('getValue');
                } else if (selector[1] == 'nonlocal') {
                    obj.settings.highlightNonlocalDatesColor = selectElement.colorpicker('getValue');
                } else if (selector[1] == 'nonbusiness') {
                    obj.settings.highlightNonbusinessHoursColor = selectElement.colorpicker('getValue');
                }
            }
        });
        updateClockStyle(worldClocks);
    });

    // MORE DISPLY SETTINGS LISTENERS

    //Custom title 'set' button
    $('.css-submit-button').click(function () {
        var selector = /clock-(.*)-extra-css-submit/.exec(this.id.toLowerCase()); //array will be [0] = clocktitlefontbold, [1] = title, [2] = bold

        $.each(worldClocks, function (index, obj) {
            if (obj.selected == true) {
                cssVal = $('#clock-' + selector[1] + '-extra-css').val();
                if (cssVal == "") {
                    cssVal = "{}";
                }

                cssObj = JSON.parse(cssVal);

                if (selector[1] == "all") {
                    obj.settings.extraCSS = cssObj;
                } else {
                    obj.settings[selector[1]].extraCSS = cssObj;
                }
            }
        });
        console.log(selector[1]);
        console.log(cssVal);
        updateClockStyle(worldClocks);
    });

    //Before/After today
    $('#highlight-nonlocal-dates').change(function () {
        if ($('#highlight-nonlocal-dates').is(':checked')) {
            $.each(worldClocks, function (index, obj) {
                if (obj.selected == true) {
                    obj.settings.highlightNonLocalDates = true;
                }
            });
        } else {
            $.each(worldClocks, function (index, obj) {
                if (obj.selected == true) {
                    obj.settings.highlightNonLocalDates = false;
                }
            });
        }
        updateClockStyle(worldClocks);
    });

    //Before/After business hours
    $('#highlight-nonbusiness-hours').change(function () {
        if ($('#highlight-nonbusiness-hours').is(':checked')) {
            $.each(worldClocks, function (index, obj) {
                if (obj.selected == true) {
                    obj.settings.highlightNonbusinessHours = true;
                }
            });
        } else {
            $.each(worldClocks, function (index, obj) {
                if (obj.selected == true) {
                    obj.settings.highlightNonbusinessHours = false;
                }
            });
        }
        updateClockStyle(worldClocks);
    });


    //ODDS AND ENDS 

    //optional listener for ENTER on a custom title set button
    $('.set-button').keypress(function (ev) {
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

        localdt.setLocale(element.localeData.code);

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
        if (localdt.hour < 9) {
            $(timeId).addClass('time-before-9').html(time);
        } else if (localdt.hour > 18) {
            $(timeId).addClass('time-after-6').html(time);
        } else {
            $(timeId).html(time);
        }

        if (element.settings.showSeconds == "blink") {
            if (element.settings.blinkOn == true) {
                $(timeId + ' span.separator').css('visibility', 'hidden');
                element.settings.blinkOn = false;
            } else {
                element.settings.blinkOn = true;
            }
        }

        //print date
        if (localDate < homeDate) {
            $(dateId).addClass('date-before-today').html(date);
        } else if (localDate > homeDate) {
            $(dateId).addClass('date-after-today').html(date);
        } else {
            $(dateId).html(date);
        }

    });
}

function updateClockLayout(worldClocks, maxClocks) {
    $.each(worldClocks, function (index, obj) {
        obj.settings.display = false;
    });

    for (i = 0; i < maxClocks; i++) {
        worldClocks[i].settings.display = true;
    }
    if (maxClocks == 4) { //special case for 2 up 2 down
        worldClocks[2].settings.display = false;
        worldClocks[3].settings.display = false;
        worldClocks[4].settings.display = true;
        worldClocks[5].settings.display = true;
    } else if (maxClocks == 6) { //special case for 3 up 3 down
        worldClocks[3].settings.display = false;
        worldClocks[6].settings.display = true;
    }

    if (maxClocks <= 3) {
        $('#clock-row-1').addClass('h-100');
        $('#clock-row-2').addClass('d-none');
    } //resize row1 and hide row2 }
    else {
        $('.clock-row').removeClass('d-none');
        $('.clock-row').removeClass('h-100');
        $('.clock-row').addClass('h-50');
    }

    $.each(worldClocks, function (index, obj) {
        clockID = '#clock-' + obj.id + '.col';
        if (obj.settings.display == true) {
            $(clockID).removeClass('d-none');
        } else {
            $(clockID).addClass('d-none');
        }
    });
}

function updateClockStyle(worldClocks) {

    $.each(worldClocks, function (index, obj) {
        var styleSheetId = "";

        //title-biu
        if (obj.settings.title.bold == true) {
            $('#clock-title-' + obj.id).addClass('font-weight-bold');
        } else {
            $('#clock-title-' + obj.id).removeClass('font-weight-bold');
        }
        if (obj.settings.title.italic == true) {
            $('#clock-title-' + obj.id).addClass('font-italic');
        } else {
            $('#clock-title-' + obj.id).removeClass('font-italic');
        }
        if (obj.settings.title.underline == true) {
            $('#clock-title-' + obj.id).addClass('font-underline');
        } else {
            $('#clock-title-' + obj.id).removeClass('font-underline');
        }

        //title-font-family
        styleSheetId = obj.settings.title.fontFamily.replace(/ /g, "-");
        if (($('option:contains("' + obj.settings.title.fontFamily + '")').hasClass('google-font')) && ($('#' + styleSheetId).length < 1)) {
            $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=' + obj.settings.title.fontFamily.replace(/ /g, "+") + '" type="text/css" id="' + styleSheetId + '" />');
        }
        $('#clock-title-' + obj.id).css({
            'font-family': '"' + obj.settings.title.fontFamily + '", sans-serif'
        });

        //title-font-size
        $('#clock-title-' + obj.id).css({
            'font-size': obj.settings.title.fontSize + 'px'
        });

        //title-color
        $('#clock-title-' + obj.id).css({
            'color': obj.settings.title.fontColor
        });

        //title-css
        $('#clock-title-' + obj.id).css(obj.settings.title.extraCSS);


        //time-biu
        if (obj.settings.time.bold == true) {
            $('#clock-time-' + obj.id).addClass('font-weight-bold');
        } else {
            $('#clock-time-' + obj.id).removeClass('font-weight-bold');
        }
        if (obj.settings.time.italic == true) {
            $('#clock-time-' + obj.id).addClass('font-italic');
        } else {
            $('#clock-time-' + obj.id).removeClass('font-italic');
        }
        if (obj.settings.time.underline == true) {
            $('#clock-time-' + obj.id).addClass('font-underline');
        } else {
            $('#clock-time-' + obj.id).removeClass('font-underline');
        }

        //time-font-family
        styleSheetId = obj.settings.time.fontFamily.replace(/ /g, "-");
        if (($('option:contains("' + obj.settings.time.fontFamily + '")').hasClass('google-font')) && ($('#' + styleSheetId).length < 1)) {
            $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=' + obj.settings.time.fontFamily.replace(/ /g, "+") + '" type="text/css" id="' + styleSheetId + '" />');
        }
        $('#clock-time-' + obj.id).css({
            'font-family': '"' + obj.settings.time.fontFamily + '", sans-serif'
        });

        //time-font-size
        $('#clock-time-' + obj.id).css({
            'font-size': obj.settings.time.fontSize + 'px'
        });

        //time-color
        $('#clock-time-' + obj.id).css({
            'color': obj.settings.time.fontColor
        });

        //time-css
        $('#clock-time-' + obj.id).css(obj.settings.time.extraCSS);

        //date-biu
        if (obj.settings.date.bold == true) {
            $('#clock-date-' + obj.id).addClass('font-weight-bold');
        } else {
            $('#clock-date-' + obj.id).removeClass('font-weight-bold');
        }
        if (obj.settings.date.italic == true) {
            $('#clock-date-' + obj.id).addClass('font-italic');
        } else {
            $('#clock-date-' + obj.id).removeClass('font-italic');
        }
        if (obj.settings.date.underline == true) {
            $('#clock-date-' + obj.id).addClass('font-underline');
        } else {
            $('#clock-date-' + obj.id).removeClass('font-underline');
        }

        //date-font-family
        styleSheetId = obj.settings.date.fontFamily.replace(/ /g, "-");
        if (($('option:contains("' + obj.settings.date.fontFamily + '")').hasClass('google-font')) && ($('#' + styleSheetId).length < 1)) {
            $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=' + obj.settings.date.fontFamily.replace(/ /g, "+") + '" type="text/css" id="' + styleSheetId + '" />');
        }
        $('#clock-date-' + obj.id).css({
            'font-family': '"' + obj.settings.date.fontFamily + '", sans-serif'
        });

        //date-font-size
        $('#clock-date-' + obj.id).css({
            'font-size': obj.settings.date.fontSize + 'px'
        });

        //date-color
        $('#clock-date-' + obj.id).css({
            'color': obj.settings.date.fontColor
        });

        //date-css
        $('#clock-date-' + obj.id).css(obj.settings.date.extraCSS);

        //background-color
        $('#clock-' + obj.id).css({
            'background-color': obj.settings.backgroundColor
        });

        //clock-css
        $('#clock-' + obj.id).css(obj.settings.extraCSS);

        //nonlocaldates
        if (obj.settings.highlightNonLocalDates == true) {
            $('#clock-' + obj.id + ' .date-before-today, ' + '#clock-' + obj.id + ' .date-after-today').css({
                'color': obj.settings.highlightNonlocalDatesColor
            });
        } else {
            $('#clock-' + obj.id + ' .date-before-today, ' + '#clock-' + obj.id + ' .date-after-today').css({
                'color': obj.settings.time.fontColor
            });
        }

        //nonlocalbusinesshours
        if (obj.settings.highlightNonbusinessHours == true) {
            $('#clock-' + obj.id + ' .time-before-9, ' + '#clock-' + obj.id + ' .time-after-6').css({
                'color': obj.settings.highlightNonbusinessHoursColor
            });
        } else {
            $('#clock-' + obj.id + ' .time-before-9, ' + '#clock-' + obj.id + ' .time-after-6').css({
                'color': obj.settings.date.fontColor
            });
        }
    });

}

function updateClockSelection(worldClocks, globalSettings) {
    var selectCount = 0;
    var selector = ['title', 'time', 'date'];
    var clock = {};

    $('.clock-select-button').removeClass('btn-primary').addClass('btn-secondary');

    $.each(worldClocks, function (index, obj) {
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
        //clock settings tab
        //set timzone
        if ((clock.tzData.common == "true") && ($('#all-common-timezone').prop("checked") == true)) {
            $('#all-common-timezone').prop("checked", false);
            $('#all-common-timezone').trigger("change");
        } else if ((clock.tzData.common == "false") && ($('#all-common-timezone').prop("checked") == false)) {
            $('#all-common-timezone').prop("checked", true);
            $('#all-common-timezone').trigger("change");
        }
        $('#timezone-select').val(clock.tzData.timezone);
        $('#clock-title-select').val(clock.settings.titleFormat);
        $('#date-format-select').val(clock.settings.dateFormat);
        $('#ampm').val(clock.settings.ampm);
        $('#show-seconds').val(clock.settings.showSeconds);
        $('#number-system').val(clock.settings.numberSystem);
        //set locale
        if ((clock.localeData.common == "true") && ($('#all-common-locale').prop("checked") == true)) {
            $('#all-common-locale').prop("checked", false);
            $('#all-common-locale').trigger("change");
        } else if ((clock.localeData.common == "false") && ($('#all-common-locale').prop("checked") == false)) {
            $('#all-common-locale').prop("checked", true);
            $('#all-common-locale').trigger("change");
        }
        $('#locale-select').val(clock.localeData.code);
        $('#calendar-system').val(clock.settings.calendarSystem);

        //display settings tab
        $('#theme-select').val(clock.settings.theme);
        for (i = 0; i < selector.length; i++) {
            if (clock.settings[selector[i]].bold == true) {
                $('#' + selector[i] + '-font-bold').addClass('btn-primary').removeClass('btn-secondary');
            } else {
                $('#' + selector[i] + '-font-bold').addClass('btn-secondary').removeClass('btn-primary');
            }

            if (clock.settings[selector[i]].italic == true) {
                $('#' + selector[i] + '-font-italic').addClass('btn-primary').removeClass('btn-secondary');
            } else {
                $('#' + selector[i] + '-font-italic').addClass('btn-secondary').removeClass('btn-primary');
            }

            if (clock.settings[selector[i]].underline == true) {
                $('#' + selector[i] + '-font-underline').addClass('btn-primary').removeClass('btn-secondary');
            } else {
                $('#' + selector[i] + '-font-underline').addClass('btn-secondary').removeClass('btn-primary');
            }

            $('#' + selector[i] + '-font-family').val(clock.settings[selector[i]].fontFamily);
            $('#' + selector[i] + '-font-size').val(clock.settings[selector[i]].fontSize);
            $('#' + selector[i] + '-font-color input').val(clock.settings[selector[i]].fontColor);
            $('#' + selector[i] + '-font-color input').trigger("change");
        }
        $('#clock-background-color input').val(clock.settings.backgroundColor);
        $('#clock-background-color input').trigger("change");

        //more display settings tab
        for (i = 0; i < selector.length; i++) {
            if ($.isEmptyObject(clock.settings[selector[i]].extraCSS)) {
                $('#clock-' + selector[i] + '-extra-css').val('');
            } else {
                $('#clock-' + selector[i] + '-extra-css').val(clock.settings[selector[i]].extraCSS);
            }
        }
        $('#clock-all-extra-css').val(clock.settings.extraCSS);

        if (clock.settings.highlightNonLocalDates == true) {
            $('#highlight-nonlocal-dates').prop("checked", true);
        } else {
            $('#highlight-nonlocal-dates').prop("checked", false);
        }
        $('#highlight-nonlocal-dates-color input').val(clock.settings.highlightNonlocalDatesColor);
        $('#highlight-nonlocal-dates-color input').trigger("change");

        if (clock.settings.highlightNonbusinessHours == true) {
            $('#highlight-nonbusiness-hours').prop("checked", true);
        } else {
            $('#highlight-nonbusiness-hours').prop("checked", false);
        }
        $('#highlight-nonbusiness-hours-color input').val(clock.settings.highlightNonbusinessHoursColor);
        $('#highlight-nonbusiness-hours-color input').trigger("change");
    }
    //special case if 0, or if more than 1 clock is selected (generify the inputs)
    else {
        //clock settings tab
        $('all-common-timezone').attr("checked", false);
        $('#all-common-timezone').trigger("change");
        $('#timezone-select').val('null');
        $('#clock-title-select').val('null');
        $('#date-format-select').val('null');
        $('#ampm').val('null');
        $('#show-seconds').val('null');
        $('#number-system').val('null');
        $('#locale-select').val('null');
        $('#calendar-system').val('null');

        //display settings tab
        $('#theme-select').val('null');
        $('.font-button').addClass('btn-secondary').removeClass('btn-primary');
        $('.font-family').val('null');
        $('.font-size').val('12');
        $('.cp input').val('Select color');

        //more display settings tab
        for (i = 0; i < selector.length; i++) {
            $('#clock-' + selector[i] + '-extra-css').val('');
        }
        $('#clock-all-extra-css').val('');
    }
}

function getTitleFormat(clock) {
    var title;

    switch (clock.settings.titleFormat) {
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

function getTimeFormat(ldt, clock) {
    var time;

    if (clock.settings.ampm == "12hr") {
        if (clock.settings.showSeconds == "number") {
            time = ldt.reconfigure({
                numberingSystem: clock.settings.numberSystem
            }).toLocaleString(luxon.DateTime.TIME_WITH_SECONDS);
        } else {
            time = ldt.reconfigure({
                numberingSystem: clock.settings.numberSystem
            }).toLocaleString(luxon.DateTime.TIME_SIMPLE);
        } // for blink or none
    } else {
        if (clock.settings.showSeconds == "number") {
            time = ldt.reconfigure({
                numberingSystem: clock.settings.numberSystem
            }).toLocaleString(luxon.DateTime.TIME_24_WITH_SECONDS);
        } else {
            time = ldt.reconfigure({
                numberingSystem: clock.settings.numberSystem
            }).toLocaleString(luxon.DateTime.TIME_24_SIMPLE);
        } // for blink or none
    }
    return time;
}

function getDateFormat(ldt, clock) {
    var date;

    switch (clock.settings.dateFormat) {
        case "none":
            date = "";
            break;
        case "short":
            date = ldt.setLocale(clock.localeData.code).reconfigure({
                outputCalendar: clock.settings.calendarSystem
            }).toLocaleString(luxon.DateTime.DATE_MED);
            break;
        case "shortday":
            date = ldt.weekdayShort + ", " + ldt.setLocale(clock.localeData.code).reconfigure({
                outputCalendar: clock.settings.calendarSystem
            }).toLocaleString(luxon.DateTime.DATE_MED);
            break;
        case "long":
            date = ldt.setLocale(clock.localeData.code).reconfigure({
                outputCalendar: clock.settings.calendarSystem
            }).toLocaleString(luxon.DateTime.DATE_HUGE);
            break;
        default:
            date = ldt.setLocale(clock.localeData.code).reconfigure({
                outputCalendar: clock.settings.calendarSystem
            }).toFormat(clock.settings.dateFormat);
            break;
    }
    return date;
}

//return an array of timeZone objects (from zoneArray) that match the given timezone string (e.g. "Europe/London" will return the zoneArray data object(s) that match thaat string in the timzeone property)
function getTimezone(timezoneString) {
    var tz = zoneArray.filter(function (timezone) {
        return timezone.timezone == timezoneString;
    });
    return $.extend(true, {}, tz[0]); //important to use $.extend to clone the object (rather than create a reference)
}

//return an array of locale objects (from localeArray)
function getLocale(localeString) {
    var loc = localeArray.filter(function (locale) {
        return locale.code == localeString;
    });
    return $.extend(true, {}, loc[0]); //important to use $.extend to clone the object (rather than create a reference)
}


// DEFAULT CLOCK SETUP

//default global settings
function getDefaultSettings() {
    var defaultSettings = {
        maxClocks: 8,
        theme: ""
    }
    return defaultSettings;
}

// returns default array of worldclock objects
function getDefaultClocks() {
    var clocks = [];
    var defaultTimezones = ["America/Los_Angeles", "America/New_York", "Europe/London", "Europe/Berlin", "Asia/Kolkata", "Asia/Hong_Kong", "Asia/Tokyo", "Australia/Sydney"];

    for (i = 0; i < 8; i++) {
        clock = getDefaultClock();
        tzData = getTimezone(defaultTimezones[i]);

        clock.id = i + 1;
        clock.tzData = tzData;

        clocks[i] = clock;
    }

    clocks[0].selected = true;

    return clocks;
}

// returns default clock object (for populating array)
function getDefaultClock() {
    var defaultSettings = {
        id: "",
        localeData: {
            code: "en-US",
            description: "English (United States)",
            common: "true"
        },
        tzData: "",
        selected: false,
        settings: {
            ampm: "24hr",
            backgroundColor: "#ffffff",
            title: {
                fontSize: "14",
                fontFamily: "Arial",
                fontColor: "#000000",
                bold: false,
                italic: false,
                underline: false,
                extraCSS: {}
            },
            time: {
                fontSize: "18",
                fontFamily: "Arial",
                fontColor: "#000000",
                bold: false,
                italic: false,
                underline: false,
                extraCSS: {}
            },
            date: {
                fontSize: "12",
                fontFamily: "Arial",
                fontColor: "#000000",
                bold: false,
                italic: false,
                underline: false,
                extraCSS: {}
            },
            blinkOn: true,
            calendarSystem: "gregory",
            dateFormat: "shortday",
            display: true,
            extraCSS: {},
            highlightNonLocalDates: false,
            highlightNonlocalDatesColor: "#000000",
            highlightNonbusinessHours: false,
            highlightNonbusinessHoursColor: "000000",
            numberSystem: "latn",
            showSeconds: "none",
            theme: "none",
            titleFormat: "city"
        }
    }

    return defaultSettings;
}

// HTML MICRO-TEMPLATES

function clockTemplate(clock) {
    var id = clock.id
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

function getClockMenuTemplate(timezoneArray, subset) {
    var template = `<option selected hidden value="null">Select timezone</option>`;
    var group = '';
    if (subset == "all") {
        $.each(timezoneArray, function (index, timezone) {
            if (group != timezone.region) {
                group = timezone.region;
                template += `<optgroup label="${timezone.region}">`;
            }
            template += `<option value = "${timezone.timezone}">${timezone.timezone} (${timezone.UTCoffset})</option>`;
        });
    } else if (subset == "common") {
        var commonZones = [];
        $.each(timezoneArray, function (index, timezone) {
            if (timezone.common == "true") {
                commonZones.push(timezone);
            }
        });
        commonZones.sort(function (a, b) {
            return parseFloat(a.numericalUTCoffset) - parseFloat(b.numericalUTCoffset);
        });
        $.each(commonZones, function (index, timezone) {
            template += `<option value = "${timezone.timezone}">(${timezone.UTCoffset}) ${timezone.timezone}</option>`;
        });
    }

    return template;
}

function getLocaleMenuTemplate(localeArray, subset) {
    var template = `<option selected hidden value="null">Select locale</option>`;
    if (subset == "all") {
        $.each(localeArray, function (index, locale) {
            template += `<option value = "${locale.code}">${locale.description}</option>`;
        });
    } else if (subset == "common") {
        $.each(localeArray, function (index, locale) {
            if (locale.common == "true") {
                template += `<option value = "${locale.code}">${locale.description}</option>`;
            }
        });
    }

    return template;
}