/*! v.2.0.0-rc3-live-33b6ddc */
var defaultConfig = {
    server: {
        usePots: !0
        , url: ""
    }
    , desktop: {
        requestFullscreen: !1
    }
    , fonts: ["Open Sans", "Roboto Mono"]
    , display: {
        width: 1065
        , height: 600
        , controls: {
            width: 160
            , minWidth: 114
            , offsetX: 5
            , switchedBorderOffsetX: 2
        }
        , adjustment: {
            narrowScreenThreshold: .9
            , winlineNumbersOffset: -8
            , narrowFontSizeCorrection: -1
        }
    }
    , assets: {
        path: "./assets/"
        , slotControls: "../../../_common/assets/images/slot_controls.png"
        , controlsSeparator: "../../../_common/assets/images/controls_separator.png"
        , gambleControls: "../../../_common/assets/images/gamble_controls.png"
        , slotGambleControls: "../../../_common/assets/images/slot_gamble_controls.png"
        , slotStopControls: "../../../_common/assets/images/slot_stop_controls.png"
        , settingsBackground: "../../../_common/assets/images/settings_bg.png"
        , alertBox: "../../../_common/assets/images/alert_box.png"
        , formButton: "../../../_common/assets/images/form_button.png"
        , gambleSelected: "../../../_common/assets/images/gmbl_sel_rb.png"
        , overlay: "../../../_common/assets/images/overlay.png"
        , settingsMainControls: "../../../_common/assets/images/back_arrow.png"
        , settingsButtons: "../../../_common/assets/images/settings_buttons.png"
        , throbber: "../../../_common/assets/images/throbber.png"
        , demoFlag: "../../../_common/assets/images/demoflag.png"
        , effects: {
            coin: "../../../_common/assets/images/coin.png"
        }
        , autoPlayCharge: {
            file: "../../../_common/assets/images/autoplay_button_charge.png"
            , frameCount: 8
        }
        , amount: {
            select: "../../../_common/assets/images/amount_select.png"
            , decrease: "../../../_common/assets/images/amount_decrease.png"
            , increase: "../../../_common/assets/images/amount_increase.png"
        }
        , winline: {
            numbers: "../../../_common/assets/images/wl_numbers.png"
            , count: 5
        }
        , card: {
            suits: "../../../_common/assets/images/gmbl_hist_sym.png"
            , blackBack: "../../../_common/assets/images/gmbl_cardblack.png"
            , redBack: "../../../_common/assets/images/gmbl_cardred.png"
            , full: "../../../_common/assets/images/gmbl2_cards.png"
        }
        , symbol: {
            width: 128
            , height: 128
        }
        , fonts: {
            oswaldGold: "./gambleclient/_common/assets/fonts/oswald-gold.fnt"
            , oswaldPlatinumDigits: "./gambleclient/_common/assets/fonts/oswald-platinum-digits.fnt"
            , oswaldPlatinumDigitsGlow: "./gambleclient/_common/assets/fonts/oswald-platinum-digits-glow.fnt"
        }
        , sound: {
            formats: ["mp3", "ogg"]
            , cardFlip: "../../../_common/assets/sounds/kever2"
            , congratulations: "../../../_common/assets/sounds/congratulations"
            , csengo: "../../../_common/assets/sounds/csengo"
            , csengoLong: "../../../_common/assets/sounds/csengo_long"
            , csengoShort: "../../../_common/assets/sounds/csengo_short"
            , deny: "../../../_common/assets/sounds/action_deny"
            , gambleLost: "../../../_common/assets/sounds/gamble2lost"
            , gambleWins: ["../../../_common/assets/sounds/gamble2win1", "../../../_common/assets/sounds/gamble2win2", "../../../_common/assets/sounds/gamble2win3", "../../../_common/assets/sounds/gamble2win4", "../../../_common/assets/sounds/gamble2win5"]
            , gambleAutoTake: "../../../_common/assets/sounds/applause"
            , message: "../../../_common/assets/sounds/message"
            , payRun: "../../../_common/assets/sounds/wpay_run"
            , potWins: ["../../../_common/assets/sounds/slotbon_win", "../../../_common/assets/sounds/diabon_win", "../../../_common/assets/sounds/groupbon_win"]
            , reelStop: "../../../_common/assets/sounds/reelstop"
            , risk: "../../../_common/assets/sounds/risiko"
            , slideIn: "../../../_common/assets/sounds/slidein"
            , startup: "../../../_common/assets/sounds/startup"
            , take: "../../../_common/assets/sounds/wpay_end"
            , waiting: "../../../_common/assets/sounds/gselect"
        }
    }
    , language: {
        browserWarning: "Please use Google Chrome for more fun!"
        , disconnected: "Connection lost, please try again later"
        , potWin: "Congratulations!\nYou won the %LABEL% Jackpot with %WINAMOUNT% pts!"
        , unloadScatterWarning: "You are about to leave the game and may lose current ScatterGames and Bonuses. Please play your remaining ScatterGames before leaving."
        , unloadWinningsWarning: 'You are about to leave the game. Please press "Take" before leaving.'
        , waiting: "Waiting..."
    }
    , text: {
        style: {
            primary: {
                fontWeight: "bold"
                , fontSize: 24
                , fontFamily: "Roboto Mono"
                , color: 16772608
                , align: "left"
            }
            , secondary: {
                fontWeight: "bold"
                , fontSize: 24
                , fontFamily: "Roboto Mono"
                , color: 16777215
                , align: "left"
            }
            , message: {
                fontWeight: "bold"
                , fontSize: 28
                , fontFamily: "Open Sans"
                , color: 16777215
                , align: "center"
                , multiline: !0
            }
            , lowBalance: {
                fontWeight: "bold"
                , fontSize: 24
                , fontFamily: "Roboto Mono"
                , color: 16711680
                , align: "left"
            }
            , take: {
                fontWeight: "bold"
                , fontSize: 24
                , fontFamily: "Roboto Mono"
                , color: 65280
                , align: "left"
            }
        }
        , dialog: {
            padding: 25
            , confirm: "OK"
        }
        , format: {
            currency: slotCurrency
            , decimalMark: ","
            , thousandsSeparator: "."
        }
        , status: {
            goodLuck: "GOOD LUCK!"
            , gameOver: "Game Over"
            , hitPot: "JACKPOT WON!"
            , insufficientFunds: "Not enough Credits"
            , scatterGames: "Scattergame %CURRENT% of %TOTAL%"
            , findMaxSelectableScatter: "Find %MAX% Scatters"
            , scatterGameWinMultiplier: "Scatterwin x2!"
            , align: "center"
            , x: 455
            , y: 555
        }
        , win: {
            label: "win: "
            , countUpSpeed: .12
            , countDownSpeed: .08
            , align: "center"
            , x: 455
            , y: 555
            , pulse: {
                scale: 1.1
                , attackDuration: .05
                , decayDuration: .45
            }
        }
        , credits: {
            label: ""
            , countUpSpeed: .091
            , lineHeight: 30
            , align: "center"
            , x: 185
            , y: 555
        }
        , bet: {
            label: "bet: "
            , lineHeight: 30
            , align: "center"
            , x: 710
            , y: 555
        }
        , pots: [{
            id: "/3"
            , label: "Mini Pot"
            , maxValue: 1e6
            , moveDuration: 14
            , win: {
                lobbyColor: 16772608
                , selfColor: 65280
                , selfText: "WIN!"
                , interval: 3e3
                , blinkIntervals: [200, 0]
                , iterations: [3, 3]
            }
            , x: 290
            , y: 16
        }, {
            id: "/1"
            , label: "Maxi Pot"
            , maxValue: 1e6
            , moveDuration: 14
            , win: {
                lobbyColor: 16772608
                , selfColor: 65280
                , selfText: "WIN!"
                , interval: 3e3
                , blinkIntervals: [200, 0]
                , iterations: [3, 3]
            }
            , x: 550
            , y: 16
        }, {
            id: "/2"
            , label: "Midi Pot"
            , maxValue: 1e6
            , moveDuration: 14
            , win: {
                lobbyColor: 16772608
                , selfColor: 65280
                , selfText: "WIN!"
                , interval: 3e3
                , blinkIntervals: [200, 0]
                , iterations: [3, 3]
            }
            , x: 810
            , y: 16
        }]
    }
    , modes: {
        preload: {
            fonts: [{
                fontWeight: "bold"
                , fontSize: 20
                , fontFamily: "Roboto Mono"
            }, {
                fontWeight: "bold"
                , fontSize: 20
                , fontFamily: "Open Sans"
            }]
        }
        , ag: {}
        , gamble: {
            text: {
                style: {
                    primary: {
                        fontWeight: "bold"
                        , fontSize: 20
                        , fontFamily: "Roboto Mono"
                        , color: 16772608
                        , align: "left"
                    }
                    , secondary: {
                        fontWeight: "bold"
                        , fontSize: 20
                        , fontFamily: "Roboto Mono"
                        , color: 16777215
                        , align: "left"
                    }
                }
                , format: {
                    currency: slotCurrency
                    , decimalMark: ","
                    , thousandsSeparator: "."
                }
                , stake: {
                    label: "Gamble Amount: "
                    , align: "center"
                    , lineHeight: 24
                    , twoline: !0
                    , x: 192
                    , y: 186
                }
                , chance: {
                    label: "Gamble to win: "
                    , align: "center"
                    , lineHeight: 24
                    , twoline: !0
                    , x: 706
                    , y: 186
                }
            }
            , timing: {
                waitTimeAfterReveal: 2e3
            }
            , controls: {
                width: 160
                , tilesheetLayout: {
                    margin: {
                        top: 60
                        , left: 8
                    }
                    , button: {
                        width: 140
                        , square: {
                            height: 125
                        }
                        , long: {
                            height: 241
                        }
                    }
                    , black: {
                        margin: {
                            top: 10
                        }
                    }
                    , take: {
                        margin: {
                            top: 3
                        }
                    }
                }
            }
            , select: {
                red: {
                    x: 92
                    , y: 331
                }
                , black: {
                    x: 592
                    , y: 331
                }
                , highlight: {
                    offsetX: 7
                    , offsetY: 10
                }
                , button: {
                    offset: -905
                    , width: 220
                    , height: 120
                }
            }
            , cardHistory: {
                x: 353
                , y: 193
                , gap: 6
                , countOfVisibleSuits: 6
            }
            , cardFull: {
                x: 368
                , y: 275
                , fps: 25
            }
        }
        , settings: {
            useSelectableWinlines: !1
            , controls: {
                width: 160
                , tilesheetLayout: {
                    margin: {
                        top: 65
                        , left: 18
                    }
                    , button: {
                        width: 120
                    }
                }
            }
            , general: {
                tilesheetLayout: {
                    upStateXOffset: 728
                    , height: 119
                    , width: 182
                }
                , positioning: {
                    xOffset: 70
                    , yOffset: 65
                    , yMargin: 45
                    , xMargin: 50
                }
                , style: {
                    fontWeight: "bold"
                    , fontSize: 22
                    , fontFamily: "Roboto Mono"
                    , color: 16777215
                    , align: "center"
                }
                , descriptions: [
                    ["bet", "paytable", "help"]
                    , ["", "volume", "winlines"]
                    , ["quickspin", "gamble", "left/right hand"]
                ]
            }
            , paytable: {
                style: {
                    primary: {
                        fontWeight: "bold"
                        , fontSize: 20
                        , fontFamily: "Roboto Mono"
                        , color: 16772608
                        , align: "left"
                    }
                    , secondary: {
                        fontWeight: "bold"
                        , fontSize: 20
                        , fontFamily: "Roboto Mono"
                        , color: 16777215
                        , align: "left"
                    }
                    , info: {
                        fontWeight: "bold"
                        , fontSize: 16
                        , fontFamily: "Roboto Mono"
                        , color: 16777215
                        , align: "center"
                        , multiline: !0
                    }
                }
                , format: {
                    currency: ""
                    , decimalMark: ","
                    , thousandsSeparator: "."
                }
                , setup: {
                    lineHeight: 24
                    , blockWidth: 11
                }
            }
            , amountSelector: {
                spacing: 15
                , itemLength: 8
                , style: {
                    label: {
                        fontWeight: "bold"
                        , fontSize: 36
                        , fontFamily: "Roboto Mono"
                        , color: 16777215
                        , align: "center"
                    }
                    , items: {
                        fontWeight: "bold"
                        , fontSize: 26
                        , fontFamily: "Roboto Mono"
                        , color: 16777215
                        , align: "center"
                    }
                }
                , description: "Choose your bet!"
                , format: {
                    currency: ""
                    , decimalMark: ","
                    , thousandsSeparator: "."
                }
            }
        }
        , slot: {
            text: {
                style: {
                    fontWeight: "bold"
                    , fontSize: 32
                    , fontFamily: "Roboto Mono"
                    , color: 16777215
                    , align: "center"
                    , stroke: 26333
                    , strokeThickness: 4
                }
                , format: {
                    currency: slotCurrency
                    , decimalMark: ","
                    , thousandsSeparator: "."
                }
                , animation: {
                    jumpDuration: .7
                    , moveDuration: .7
                    , fullDuration: 1.3
                    , waitDuration: 0
                    , moveMidScale: 2
                    , moveEndScale: .5
                    , y: -10
                    , scale: 1.8
                    , endX: 460.5
                    , endY: 550
                    , special: {
                        jumpDuration: .7
                        , moveDuration: .7
                        , fullDuration: 1.3
                        , waitDuration: 0
                        , moveMidScale: 2
                        , moveEndScale: .5
                        , y: -10
                        , scale: 1.8
                        , endX: 460.5
                        , endY: 550
                    }
                }
            }
            , autoPlay: {
                delay: 150
                , enabled: !0
            }
            , controls: {
                width: 160
                , minHoldingTime: 400
                , tilesheetLayout: {
                    ready: {
                        button: {
                            width: 140
                            , square: {
                                height: 190
                            }
                            , long: {
                                height: 220
                            }
                        }
                        , home: {
                            margin: {
                                left: 8
                                , top: 5
                            }
                            , padding: {
                                bottom: -5
                            }
                        }
                        , settings: {
                            margin: {
                                left: 8
                                , top: -6
                            }
                            , padding: {
                                bottom: -55
                            }
                        }
                        , spin: {
                            margin: {
                                left: 8
                                , top: -57
                            }
                        }
                        , charge: {
                            margin: {
                                left: -11
                                , top: -10
                            }
                        }
                    }
                    , spinning: {
                        margin: {
                            top: 332
                            , left: 16
                        }
                        , button: {
                            width: 125
                        }
                    }
                    , waiting: {
                        margin: {
                            top: 80
                            , left: 8
                        }
                        , button: {
                            width: 140
                            , height: 245
                        }
                    }
                }
            }
            , winlines: {
                regular: {
                    lineWidth: 5
                    , lineColor: 16772608
                    , fadedColor: 8943360
                }
                , scatter: {
                    lineWidth: 5
                    , lineColor: 16750848
                }
                , animateSelectedOnly: !0
                , fadeNonSelected: !0
                , walkIfSingle: !0
                , walkIfSingleScatter: !0
                , walkRepeatDelay: 500
                , fastWalkDelay: 450
                , loopRepeatDelay: 0
            }
            , symbol: {
                width: 128
                , height: 128
                , fps: 25
            }
            , scatter: {}
            , reels: {
                x: 119
                , y: 140
                , gap: 7
                , count: 5
                , countOfVisibleSymbols: 3
                , countOfHiddenSymbolsAbove: 1
                , countOfHiddenSymbolsBelow: 1
                , minSoundInterval: 100
            }
            , timing: {
                speed: {
                    correctionFactor: .98
                    , symbolsPerSecond: 12.5
                }
                , windup: {
                    distance: -36
                    , duration: .12
                    , delay: .08
                }
                , overshoot: {
                    distance: 30
                    , duration: .14
                }
                , speedup: {
                    duration: .4
                    , timeScale: .82
                }
                , slowdown: {
                    distance: 40
                    , timeScale: .7
                }
            }
            , throbber: {
                offsetX: 2
                , offsetY: 37
            }
            , effects: {
                multiplierThreshold: {
                    regular: 1.25
                    , high: 3
                    , huge: 6
                }
                , message: {
                    highWin: {
                        text: "HIGH WIN!"
                        , font: {
                            size: 96
                            , name: "Oswald Gold"
                        }
                        , introDuration: .15
                        , introScale: .5
                        , outroDuration: 2.05
                        , outroScale: 1
                        , fadeoutDuration: .6
                        , x: 455
                        , y: 265
                    }
                    , hugeWin: {
                        text: "HUGE WIN!"
                        , font: {
                            size: 96
                            , name: "Oswald Gold"
                        }
                        , introDuration: .15
                        , introScale: .5
                        , outroDuration: 3.55
                        , outroScale: 1
                        , fadeoutDuration: .6
                        , x: 455
                        , y: 265
                    }
                    , fullWin: {
                        text: "CONGRATULATIONS!"
                        , font: {
                            size: 96
                            , name: "Oswald Gold"
                        }
                        , introDuration: .15
                        , introScale: .5
                        , outroDuration: 3.55
                        , outroScale: 1
                        , fadeoutDuration: .6
                        , x: 455
                        , y: 265
                    }
                    , potWins: [{
                        text: "MAXI POT!"
                        , font: {
                            size: 96
                            , name: "Oswald Gold"
                        }
                        , introDuration: .15
                        , introScale: .5
                        , outroDuration: 6.5
                        , outroScale: 1
                        , fadeoutDuration: .6
                        , verticalAlignment: "top"
                        , x: 455
                        , y: 300
                        , amount: {
                            font: {
                                size: 192
                                , name: "Oswald Platinum Digits"
                            }
                            , format: {
                                decimalMark: ","
                                , thousandsSeparator: "."
                            }
                            , filters: [{
                                font: {
                                    size: 192
                                    , name: "Oswald Platinum Digits Glow"
                                }
                                , offsetX: 10
                                , offsetY: -20
                                , fadeinDelay: 4.6
                                , fadeinDuration: .3
                                , fadeoutDelay: .2
                                , fadeoutDuration: .3
                            }]
                            , countUpDuration: 4.4
                            , introDuration: .15
                            , introScale: .5
                            , outroDuration: 6.5
                            , outroScale: 1
                            , fadeoutDuration: .6
                            , verticalAlignment: "bottom"
                            , x: 455
                            , y: 300
                        }
                    }, {
                        text: "MIDI POT!"
                        , font: {
                            size: 96
                            , name: "Oswald Gold"
                        }
                        , introDuration: .15
                        , introScale: .5
                        , outroDuration: 7.2
                        , outroScale: 1
                        , fadeoutDuration: .6
                        , verticalAlignment: "top"
                        , x: 455
                        , y: 300
                        , amount: {
                            font: {
                                size: 192
                                , name: "Oswald Platinum Digits"
                            }
                            , format: {
                                decimalMark: ","
                                , thousandsSeparator: "."
                            }
                            , filters: [{
                                font: {
                                    size: 192
                                    , name: "Oswald Platinum Digits Glow"
                                }
                                , offsetX: 10
                                , offsetY: -20
                                , fadeinDelay: 5
                                , fadeinDuration: .3
                                , fadeoutDelay: .2
                                , fadeoutDuration: .3
                            }]
                            , countUpDuration: 4.2
                            , introDuration: .15
                            , introScale: .5
                            , outroDuration: 7.2
                            , outroScale: 1
                            , fadeoutDuration: .6
                            , verticalAlignment: "bottom"
                            , x: 455
                            , y: 300
                        }
                    }, {
                        text: "MINI POT!"
                        , font: {
                            size: 96
                            , name: "Oswald Gold"
                        }
                        , introDuration: .15
                        , introScale: .5
                        , outroDuration: 6.1
                        , outroScale: 1
                        , fadeoutDuration: .6
                        , verticalAlignment: "top"
                        , x: 455
                        , y: 300
                        , amount: {
                            font: {
                                size: 192
                                , name: "Oswald Platinum Digits"
                            }
                            , format: {
                                decimalMark: ","
                                , thousandsSeparator: "."
                            }
                            , filters: [{
                                font: {
                                    size: 192
                                    , name: "Oswald Platinum Digits Glow"
                                }
                                , offsetX: 10
                                , offsetY: -20
                                , fadeinDelay: 4.5
                                , fadeinDuration: .3
                                , fadeoutDelay: .2
                                , fadeoutDuration: .3
                            }]
                            , countUpDuration: 4.2
                            , introDuration: .15
                            , introScale: .5
                            , outroDuration: 6.1
                            , outroScale: 1
                            , fadeoutDuration: .6
                            , verticalAlignment: "bottom"
                            , x: 455
                            , y: 300
                        }
                    }]
                }
                , coinEmitter: {
                    physics: {
                        gravity: .7
                        , terminalVelocity: 18
                        , damping: .983
                    }
                    , motion: {
                        startScale: .25
                        , scaleStep: 1.02
                        , rotationStep: {
                            base: 0
                            , fuzz: 0
                        }
                        , maxScale: 1
                        , yStep: {
                            base: -24
                            , fuzz: -8
                        }
                        , xStep: {
                            base: 2
                            , fuzz: 6
                            , range: 32
                        }
                    }
                    , triggers: {
                        regularWin: {
                            duration: 400
                            , interval: 20
                            , position: {
                                keyframes: [{
                                    x: 220
                                    , y: 320
                                }, {
                                    x: 700
                                    , y: 320
                                }]
                            }
                            , range: {
                                x: 40
                                , y: 10
                                , rotation: .15
                            }
                            , yStep: {
                                base: -15
                                , fuzz: -7
                            }
                        }
                        , highWin: {
                            duration: 1200
                            , interval: 20
                            , position: {
                                keyframes: [{
                                    x: 220
                                    , y: 320
                                }, {
                                    x: 700
                                    , y: 320
                                }]
                            }
                            , range: {
                                x: 40
                                , y: 10
                                , rotation: .15
                            }
                            , yStep: {
                                base: -15
                                , fuzz: -7
                            }
                        }
                        , hugeWin: {
                            duration: 2300
                            , interval: 20
                            , position: {
                                keyframes: [{
                                    x: 220
                                    , y: 320
                                }, {
                                    x: 700
                                    , y: 320
                                }]
                            }
                            , range: {
                                x: 40
                                , y: 10
                                , rotation: .15
                            }
                            , yStep: {
                                base: -15
                                , fuzz: -7
                            }
                        }
                        , potWin: [{
                            duration: 4e3
                            , interval: 10
                            , position: {
                                x: 400
                                , y: 600
                            }
                            , range: {
                                x: 100
                                , y: 0
                                , rotation: .15
                            }
                        }, {
                            duration: 6e3
                            , interval: 10
                            , position: {
                                x: 400
                                , y: 600
                            }
                            , range: {
                                x: 100
                                , y: 0
                                , rotation: .15
                            }
                        }, {
                            duration: 4e3
                            , interval: 10
                            , position: {
                                x: 400
                                , y: 600
                            }
                            , range: {
                                x: 100
                                , y: 0
                                , rotation: .15
                            }
                        }]
                    }
                }
                , multiplier: {
                    loopCount: 2
                    , y: 155
                    , duration: 1.2
                    , repeatDelay: .2
                    , textBottomY: 231
                }
            }
        }
    }
};