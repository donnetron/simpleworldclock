var themeObject = {
    //default settings
    "none": [{
        "clocks": ['all'],
        "settings": {

            "settings.backgroundColor": "#ffffff",
            "settings.title.fontSize": "14",

            "settings.title.fontFamily": "Arial",
            "settings.title.fontColor": "#000000",
            "settings.title.bold": false,
            "settings.title.italic": false,
            "settings.title.underline": false,
            "settings.title.extraCSS": {},

            "settings.time.fontSize": "18",
            "settings.time.fontFamily": "Arial",
            "settings.time.fontColor": "#000000",
            "settings.time.bold": false,
            "settings.time.italic": false,
            "settings.time.underline": false,
            "settings.time.extraCSS": {},

            "settings.date.fontSize": "12",
            "settings.date.fontFamily": "Arial",
            "settings.date.fontColor": "#000000",
            "settings.date.bold": false,
            "settings.date.italic": false,
            "settings.date.underline": false,
            "settings.date.extraCSS": {},

            "settings.extraCSS": {},
            "settings.highlightNonLocalDates": false,
            "settings.highlightNonlocalDatesColor": "#000000",
            "settings.highlightNonbusinessHours": false,
            "settings.highlightNonbusinessHoursColor": "000000",

            "settings.showSeconds": "none",
            "settings.theme": "none"
        }
    }],

    //orbitron
    "enterprise": [{
        "clocks": ['all'],
        "settings": {
            "settings.ampm": "24hr",
            "settings.backgroundColor": "#000000",
            "settings.title.fontFamily": "Orbitron",
            "settings.title.fontColor": "#00e2db",

            "settings.time.fontFamily": "Orbitron",
            "settings.time.fontColor": "#00e2db",

            "settings.date.fontFamily": "Orbitron",
            "settings.date.fontColor": "#00e2db",

            "settings.extraCSS": {
                "text-shadow": "0 0 1.2em #00fff7, 0 0 3.2em #00fff7"
            },
            "settings.showSeconds": "none",

            "settings.theme": "enterprise"
        }
    }],

    //blue shades
    "indigofera": [{
            "clocks": ['all'],
            "settings": {

                "settings.title.fontFamily": "Saira",
                "settings.title.fontColor": "#ffffff",

                "settings.time.fontFamily": "Saira",
                "settings.time.fontColor": "#ffffff",

                "settings.date.fontFamily": "Saira",
                "settings.date.fontColor": "#ffffff",
                
                "settings.showSeconds": "none",

                "settings.theme": "indigofera"
            }
        },
        {
            "clocks": [1],
            "settings": {
                "settings.backgroundColor": "#5560ff"
            }
        },
        {
            "clocks": [2],
            "settings": {
                "settings.backgroundColor": "#4445dd"
            }
        },
        {
            "clocks": [3],
            "settings": {
                "settings.backgroundColor": "#776acd"
            }
        },
        {
            "clocks": [4],
            "settings": {
                "settings.backgroundColor": "#4f97e4"
            }
        },
        {
            "clocks": [5],
            "settings": {
                "settings.backgroundColor": "#5b32dd"
            }
        },
        {
            "clocks": [6],
            "settings": {
                "settings.backgroundColor": "#55aaff"
            }
        },
        {
            "clocks": [7],
            "settings": {
                "settings.backgroundColor": "#6955ff"
            }
        },
        {
            "clocks": [8],
            "settings": {
                "settings.backgroundColor": "#0e03cb"
            }
        }
    ],

    //green shades
    "kokiri": {},

    //seven-segment
    "lcd": [{
            "clocks": ['all'],
            "settings": {
                "settings.ampm": "24hr",
                "settings.backgroundColor": "#b9e200",

                "settings.title.fontFamily": "Digital-7",
                "settings.title.fontColor": "#4c4c4c",

                "settings.time.fontFamily": "Digital-7-mono",
                "settings.time.fontColor": "#4c4c4c",
                "settings.time.extraCSS": {
                    "opacity": "0.9"
                },

                "settings.date.fontFamily": "Digital-7",
                "settings.date.fontColor": "#4c4c4c",

                "settings.showSeconds": "blink",
                "settings.blinkOn": false,
                "settings.display": true,
                "settings.theme": "lcd"
            }
        },
        {
            "clocks": [1, 2, 3, 4],
            "settings": {
                "settings.extraCSS": {
                    "box-shadow": "inset 0 300px 300px -150px #8acd50"
                    //"text-shadow": "0 0 6em #4c4c4c, 0 0 4em #4c4c4c, 0 0 0.9em #4c4c4c",
                },
            }
        },
        {
            "clocks": [5, 6, 7, 8],
            "settings": {
                "settings.extraCSS": {
                    "box-shadow": "inset 0 -300px 300px -150px #8acd50",
                    //"text-shadow": "0 0 6em #4c4c4c, 0 0 4em #4c4c4c, 0 0 0.9em #4c4c4c",
                },
            }
        }
    ],

    //red orange yellow purple
    "lega": [{
            "clocks": ['all'],
            "settings": {
                "settings.title.fontFamily": "Arial",
                "settings.title.fontColor": "#000000",

                "settings.time.fontFamily": "Arial",
                "settings.time.fontColor": "#000000",

                "settings.date.fontFamily": "Arial",
                "settings.date.fontColor": "#000000",
                "settings.showSeconds": "none",
                "settings.theme": "lega"
            }
        },
        {
            "clocks": [1, 5],
            "settings": {
                "settings.extraCSS": {
                    "background": "repeating-linear-gradient(to right, #2060ff, #2060ff 25%, #209fff 25%, #209fff 50%, #20bfff 50%, #20bfff 75%, #00cfff 75%, #00cfff 100%)"
                }
            }
        },
        {
            "clocks": [2, 6],
            "settings": {
                "settings.extraCSS": {
                    "background": "repeating-linear-gradient(to right, #2affff, #2affff 25%, #55ffff 25%, #55ffff 50%, #7fffff 50%, #7fffff 75%, #aaffff 75%, #aaffff 100%)"
                }
            }
        },
        {
            "clocks": [3, 7],
            "settings": {
                "settings.extraCSS": {
                    "background": "repeating-linear-gradient(to right, #ffff54, #ffff54 25%, #fff000 25%, #fff000 50%, #ffbf00 50%, #ffbf00 75%, #ffa800 75%, #ffa800 100%)"
                }
            }
        },
        {
            "clocks": [4, 8],
            "settings": {
                "settings.extraCSS": {
                    "background": "repeating-linear-gradient(to right, #ff8a00, #ff8a00 25%, #ff7000 25%, #ff7000 50%, #ff4d00 50%, #ff4d00 75%, #ff0000 75%, #ff0000 100%)"
                }
            }
        }
    ],

    //nu-rainbow
    "nu-rainbow": [{
            "clocks": ['all'],
            "settings": {
                "settings.title.fontFamily": "Saira",
                "settings.title.fontColor": "#ffffff",

                "settings.time.fontFamily": "Saira",
                "settings.time.fontColor": "#ffffff",

                "settings.date.fontFamily": "Saira",
                "settings.date.fontColor": "#ffffff",
                "settings.showSeconds": "none",
                "settings.theme": "nu-rainbow"
            }
        },
        {
            "clocks": [1],
            "settings": {
                "settings.backgroundColor": "#ff5555"
            }
        },
        {
            "clocks": [2],
            "settings": {
                "settings.backgroundColor": "#ffaa55"
            }
        },
        {
            "clocks": [3],
            "settings": {
                "settings.backgroundColor": "#dada1c"
            }
        },
        {
            "clocks": [4],
            "settings": {
                "settings.backgroundColor": "#4fe452"
            }
        },
        {
            "clocks": [5],
            "settings": {
                "settings.backgroundColor": "#00e7b5"
            }
        },
        {
            "clocks": [6],
            "settings": {
                "settings.backgroundColor": "#55aaff"
            }
        },
        {
            "clocks": [7],
            "settings": {
                "settings.backgroundColor": "#aa55ff"
            }
        },
        {
            "clocks": [8],
            "settings": {
                "settings.backgroundColor": "#ff91c8"
            }
        }
    ],

    //dot matrix (not seven segment)
    "red-panel": [{
        "clocks": ['all'],
        "settings": {
            "settings.ampm": "24hr",
            "settings.backgroundColor": "#000000",
            "settings.title.fontFamily": "Press Start 2P",
            "settings.title.fontColor": "#ff0000",

            "settings.time.fontFamily": "Libre Barcode 128 Text",
            "settings.time.fontColor": "#ff0000",

            "settings.date.fontFamily": "Press Start 2P",
            "settings.date.fontColor": "#ff0000",

            "settings.extraCSS": {
                "background": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJklEQVQYV2WKsREAMAiEcEfG/B31LGITOjhK7SQ8Cugz4ILKnt8xmEMKASj8v2MAAAAASUVORK5CYII=) repeat"
            },
            "settings.showSeconds": "number",
            "settings.theme": "red-panel"
        }
    }],

    //sunset reds/pinks
    "sunset": [{
            "clocks": ['all'],
            "settings": {
                "settings.ampm": "24hr",
                "settings.title.fontFamily": "Arial",
                "settings.title.fontColor": "#ffffff",

                "settings.time.fontFamily": "Arial",
                "settings.time.fontColor": "#ffffff",

                "settings.date.fontFamily": "Arial",
                "settings.date.fontColor": "#ffffff",

                "settings.showSeconds": "none",
                "settings.blinkOn": true,
                "settings.theme": "sunset"
            }
        },
        {
            "clocks": [1, 2, 3, 4],
            "settings": {
                "settings.extraCSS": {
                    "border-bottom": "5px dashed white"
                }
            }
        },
        {
            "clocks": [1, 5],
            "settings": {
                "settings.backgroundColor": "#ff6f91"
            }
        },
        {
            "clocks": [2, 6],
            "settings": {
                "settings.backgroundColor": "#ff9671"
            }
        },
        {
            "clocks": [3, 7],
            "settings": {
                "settings.backgroundColor": "#ffc75f"
            }
        },
        {
            "clocks": [4, 8],
            "settings": {
                "settings.backgroundColor": "#f9f871"
            }
        }
    ],

    //VT100 (interlaced screen)
    "vt100": [{
        "clocks": ['all'],
        "settings": {
            "settings.backgroundColor": "#ffffff",
            "settings.title.fontFamily": "VT323",
            "settings.title.fontColor": "#14fdce",
            "settings.title.extraCSS": {
                "opacity": "0.6"
            },
            "settings.time.fontFamily": "VT323",
            "settings.time.fontColor": "#14fdce",
            "settings.time.extraCSS": {
                "opacity": "0.6"
            },
            "settings.date.fontFamily": "VT323",
            "settings.date.fontColor": "#14fdce",
            "settings.date.extraCSS": {
                "opacity": "0.6"
            },
            "settings.extraCSS": {
                "text-shadow": "0 0 3em #0da183, 0 0 1em #0da183, 0 0 0.9em #0da183",
                "background": "linear-gradient(to bottom, rgba(0,15,12,0.9), rgba(0,15,12,0.8) 50%, rgba(0,15,12,0.9) 10%, rgba(0,15,12,0.9))",
                "background-size": "100% 0.3rem",
                "border": "dashed 1px #14fdce"
            },
            "settings.showSeconds": "none",
            "settings.theme": "vt100"
        }
    }]
};