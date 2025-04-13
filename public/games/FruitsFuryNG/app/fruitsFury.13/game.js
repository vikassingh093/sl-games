var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.SIMPLE_FROUND_POLYFILL = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, t, n) {
    e != Array.prototype && e != Object.prototype && (e[t] = n.value)
}, $jscomp.getGlobal = function(e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
}, $jscomp.global = $jscomp.getGlobal(this), $jscomp.polyfill = function(e, t, n, s) {
    if (t) {
        for (n = $jscomp.global, e = e.split("."), s = 0; s < e.length - 1; s++) {
            var a = e[s];
            a in n || (n[a] = {}), n = n[a]
        }(t = t(s = n[e = e[e.length - 1]])) != s && null != t && $jscomp.defineProperty(n, e, {
            configurable: !0,
            writable: !0,
            value: t
        })
    }
}, $jscomp.polyfill("Array.prototype.fill", (function(e) {
    return e || function(e, t, n) {
        var s = this.length || 0;
        for (0 > t && (t = Math.max(0, s + t)), (null == n || n > s) && (n = s), 0 > (n = Number(n)) && (n = Math.max(0, s + n)), t = Number(t || 0); t < n; t++) this[t] = e;
        return this
    }
}), "es6", "es3"), (window.webpackJsonp = window.webpackJsonp || []).push([
    [0], {
        1178: function(e, t, n) {
            nge.appPath = "app/fruitsFury.13/", nge.gameCode = "261"
        },
        1179: function(e, t) {
            nge.App[nge.appNS].Cfg = {}
        },
        1180: function(e, t) {
            nge.App[nge.appNS].Cfg.Sounds = Class.extend((function() {
                this.contents = {
                    bs_wheel_spin_0: "game:/sounds/reel_spin",
                    reels_stop_0: "game:sounds/bs_bn_wheel_stop_0",
                    reels_stop_1: "game:sounds/bs_bn_wheel_stop_1",
                    reels_stop_2: "game:sounds/bs_bn_wheel_stop_2",
                    reels_stop_3: "game:sounds/bs_bn_wheel_stop_3",
                    reels_stop_4: "game:sounds/bs_bn_wheel_stop_4",
                    bs_background: "game:sounds/ambient_basic_game",
                    bn_background: "game:sounds/ambient_free_spins",
                    intro_sound: "game:sounds/ambient_sfx",
                    big_win: "game:/sounds/big_win",
                    big_win_start: "game:/sounds/big_win_start",
                    big_win_ending: "game:/sounds/big_win_end",
                    intro_big_win: "game:/sounds/intro_big_win",
                    hover_0: "game:sounds/default_hover",
                    hover_1: "game:sounds/default_hover",
                    hover_2: "game:sounds/default_hover",
                    click: "game:sounds/default_btn",
                    spin_click: "game:/sounds/button_start",
                    spin_stop: "game:/sounds/button_stop",
                    scatter_0: "game:sounds/scatter_0",
                    scatter_1: "game:sounds/scatter_1",
                    scatter_2: "game:sounds/scatter_2",
                    scatter_3: "game:sounds/scatter_3",
                    scatter_4: "game:sounds/scatter_4",
                    sr_bell: "game:sounds/bell",
                    popup_disappear: "game:/sounds/pop_up_disappear",
                    start_freespins_popup: "game:/sounds/start_fs_popup",
                    finish_freespins_popup: "game:/sounds/finish_fs_popup",
                    spinification_0: "game:sounds/near_win_intriga",
                    spinification_1: "game:sounds/near_win_intriga_2",
                    spinification_2: "game:sounds/near_win_intriga_3",
                    win_regularWinHigh: "game:/sounds/sr_win_2",
                    win_regularWinMid: "game:sounds/sr_win_1",
                    win_regularWinLow: "game:sounds/sr_win_0",
                    silence: "game:sounds/silence",
                    jackpot_online_background: "game:sounds/jackpot_online_background",
                    jackpot_online_coincidence_1: "game:sounds/jackpot_online_coincidence_1",
                    jackpot_online_coincidence_2: "game:sounds/jackpot_online_coincidence_2",
                    jackpot_online_coincidence_3: "game:sounds/jackpot_online_coincidence_3",
                    jackpot_online_finish_jackpot_popup: "game:sounds/jackpot_online_finish_jackpot_popup",
                    jackpot_online_won_jackpot_movie: "game:sounds/jackpot_online_won_jackpot_movie"
                }
            }))
        },
        1181: function(e, t) {
            nge.App[nge.appNS].Cfg.Spine = nge.Cfg.Spine.extend((function() {
                this.preloadForStates = {
                    play: [{
                        spineName: "maingame_animation",
                        animationName: "meteorits_win"
                    }, {
                        spineName: "fs_background_animation",
                        animationName: "fs_start"
                    }, {
                        spineName: "fs_background_animation",
                        animationName: "fs_loop"
                    }, {
                        spineName: "fs_background_animation",
                        animationName: "fs_end"
                    }, {
                        spineName: "spinification_below",
                        animationName: "below"
                    }, {
                        spineName: "spinification_above",
                        animationName: "above"
                    }, {
                        spineName: "popupSpineBackground",
                        animationName: "appear_free_games"
                    }, {
                        spineName: "popupSpineBackground",
                        animationName: "loop_free_games"
                    }, {
                        spineName: "popupSpineBackground",
                        animationName: "disappear_free_games"
                    }, {
                        spineName: "popupSpineBackground",
                        animationName: "appear_total_win"
                    }, {
                        spineName: "popupSpineBackground",
                        animationName: "loop_total_win"
                    }, {
                        spineName: "popupSpineBackground",
                        animationName: "disappear_total_win"
                    }, {
                        spineName: "winline_0",
                        animationName: "show"
                    }, {
                        spineName: "winline_1",
                        animationName: "show"
                    }, {
                        spineName: "winline_2",
                        animationName: "show"
                    }, {
                        spineName: "winline_3",
                        animationName: "show"
                    }, {
                        spineName: "winline_4",
                        animationName: "show"
                    }, {
                        spineName: "winline_5",
                        animationName: "show"
                    }, {
                        spineName: "winline_6",
                        animationName: "show"
                    }, {
                        spineName: "winline_7",
                        animationName: "show"
                    }, {
                        spineName: "winline_8",
                        animationName: "show"
                    }, {
                        spineName: "winline_9",
                        animationName: "show"
                    }]
                }, this.preloadForEvents = []
            }))
        },
        1182: function(e, t) {
            nge.App[nge.appNS].Com = {}
        },
        1183: function(e, t) {
            nge.App[nge.appNS].Com.Autospin = {}
        },
        1184: function(e, t) {
            nge.App[nge.appNS].Com.Autospin.View = nge.App.DjGameBase.Com.Autospin.View.extend((function() {
                this.firstPanelElementTopYOffset = 0, this.yPanelOffset = 10, this.infinityTextYOffset = 3, this.staticMask = {
                    x: 20,
                    y: -255,
                    width: 116,
                    height: 426,
                    debug: !1
                }
            }))
        },
        1185: function(e, t) {
            nge.App[nge.appNS].Com.Background = {}
        },
        1186: function(e, t) {
            nge.App[nge.appNS].Com.Background.Controller = nge.Com.Base.extend((function() {
                var e = this,
                    t = !1,
                    n = null,
                    s = null,
                    a = null,
                    o = null;
                this.create = function() {
                    this.createDefault(), t || (e.subscribe(), t = !0), n = nge.findOne("^starsBackgroundAnimation"), s = nge.findOne("^meteoritesIdleAnimation"), a = nge.findOne("^meteoritesWinAnimation"), o = nge.findOne("^fsBackgroundAnimation")
                };
                var i = function(e) {
                        "play" === e && (n.setAnimationByMode(0, "idle_stars", nge.spine.LOOP), s.setAnimationByMode(0, "meteorits_idle", nge.spine.LOOP))
                    },
                    l = function() {
                        a.setAnimationByMode(0, "meteorits_win", nge.spine.NONE)
                    },
                    p = function(e) {
                        switch (e) {
                            case "freespinEndPopup":
                                o.setAnimationByMode(0, "fs_end", nge.spine.HIDE);
                                break;
                            case "gameFreeSpin":
                                o.setAnimationByMode(0, "fs_start", nge.spine.NONE), o.onComplete.addOnce((function() {
                                    o.setAnimationByMode(0, "fs_loop", nge.spine.LOOP)
                                }))
                        }
                    },
                    r = function() {
                        n.stop(), s.stop(), a.stop(), o.stop()
                    },
                    c = function() {
                        n.pause(), nge.localData.get("freespin.inProgress") && o.pause()
                    },
                    m = function() {
                        n.resume(), nge.localData.get("freespin.inProgress") && o.resume()
                    },
                    y = function(e) {
                        "freespinStartPopup" !== e && "freespinEndPopup" !== e || n.pause()
                    },
                    u = function(e) {
                        "freespinStartPopup" !== e && "freespinEndPopup" !== e || n.resume()
                    };
                this.subscribe = function() {
                    nge.observer.add("StatesManager.create.end", i), nge.observer.add("winlines.animateAll", l), nge.observer.add("layersSwitcher.switched", p), nge.observer.add("win.bigWin.startShow", c), nge.observer.add("win.big.hide", m), nge.observer.add("popup.showStart", y), nge.observer.add("popup.hideStart", u), nge.observer.add("Transport.close", r)
                }
            }))
        },
        1187: function(e, t) {
            nge.App[nge.appNS].Com.Background.Tpl = function() {
                return {
                    styles: {
                        ".album .fsBackgroundAnimationContainer": {
                            scaleX: 1,
                            scaleY: 1,
                            alignX: "center",
                            alignY: "bottom",
                            y: -560
                        },
                        ".portrait .fsBackgroundAnimationContainer": {
                            scaleX: 1.4,
                            scaleY: 1.4,
                            alignX: "center",
                            alignY: "bottom",
                            y: -800
                        },
                        ".album .backgroundAnimationContainer": {
                            scaleX: 1,
                            scaleY: 1
                        },
                        ".portrait .backgroundAnimationContainer": {
                            scaleX: .6,
                            scaleY: .6
                        },
                        ".album .reelsVertical": {
                            isVisible: !1
                        },
                        ".portrait .reelsVertical": {
                            isVisible: !0
                        }
                    },
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: mt.objects.IMAGE,
                            name: "reelsVertical",
                            class: "reelsVertical",
                            assetKey: "reelsVertical",
                            alignX: "center",
                            alignY: "top",
                            anchorX: .5,
                            anchorY: 0,
                            x: 0,
                            y: 460
                        }, {
                            type: mt.objects.GROUP,
                            name: "backgroundAnimationContainer",
                            class: "backgroundAnimationContainer",
                            alignX: "center",
                            contents: [{
                                type: mt.objects.SPINE,
                                name: "starsBackgroundAnimation",
                                assetKey: "maingame_animation",
                                anchorX: .5,
                                anchorY: .5,
                                x: 0,
                                y: 540,
                                isVisible: !1
                            }, {
                                type: mt.objects.SPINE,
                                name: "meteoritesIdleAnimation",
                                assetKey: "maingame_animation",
                                anchorX: .5,
                                anchorY: .5,
                                x: 0,
                                y: 540,
                                isVisible: !1
                            }, {
                                type: mt.objects.SPINE,
                                name: "meteoritesWinAnimation",
                                assetKey: "maingame_animation",
                                anchorX: .5,
                                anchorY: .5,
                                x: 0,
                                y: 540,
                                isVisible: !1
                            }]
                        }, {
                            type: mt.objects.GROUP,
                            name: "fsBackgroundAnimationContainer",
                            class: "fsBackgroundAnimationContainer",
                            contents: [{
                                type: mt.objects.SPINE,
                                name: "fsBackgroundAnimation",
                                assetKey: "fs_background_animation",
                                x: "0",
                                isVisible: !1
                            }]
                        }, {
                            type: mt.objects.IMAGE,
                            name: "bgArea",
                            assetKey: "bgArea",
                            alignX: "center",
                            alignY: "center",
                            anchorX: .5,
                            anchorY: .5,
                            sWidth: "100%",
                            sHeight: "100%",
                            sType: "circumscribed"
                        }]
                    }
                }
            }
        },
        1188: function(e, t) {
            nge.App[nge.appNS].Com.BigWin = {}
        },
        1189: function(e, t) {
            nge.App[nge.appNS].Com.BigWin.Cfg = nge.App.DjGameBase.Com.BigWin.Cfg.extend((function() {
                this.params = this.super.get(), this.params.followSlotName = "txt_holder", this.params.animation.phase1TrackNamePrefix = "big_win_start", this.params.animation.loopTrackName = "big_win_loop", this.params.animation.phase2TrackName = "big_win_end", this.params.animation.trackNumber = 1, this.params.odometerDurations = [{
                    duration: 31e3,
                    name: "",
                    mult: 3
                }, {
                    duration: 21e3,
                    name: "",
                    mult: 2
                }, {
                    duration: 11e3,
                    name: "",
                    mult: 1
                }], this.params.scaleDurations = [{
                    duration: 31e3,
                    name: "30_s",
                    mult: 3
                }, {
                    duration: 21e3,
                    name: "20_s",
                    mult: 2
                }, {
                    duration: 11e3,
                    name: "10_s",
                    mult: 1
                }]
            }))
        },
        1190: function(e, t) {
            nge.App[nge.appNS].Com.BigWin.Tpl = function() {
                return {
                    styles: {
                        ".portrait .bigWinContainer": {
                            y: "38%",
                            scaleX: .9,
                            scaleY: .9
                        },
                        ".album .bigWinContainer": {
                            y: "50%",
                            scaleX: 1,
                            scaleY: 1
                        }
                    },
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {
                        contents: [{
                            type: mt.objects.GROUP,
                            name: "bigWinInternalContainer",
                            class: "bigWinContainer",
                            x: "50%",
                            isVisible: !1,
                            contents: [{
                                type: 6,
                                assetKey: "bigWinFlareAnim",
                                name: "bigWinAnim_flare",
                                anchorX: .5,
                                anchorY: .5,
                                y: 0,
                                isVisible: !1
                            }, {
                                type: 7,
                                name: "bigWinAmount",
                                class: "bigWinAmount",
                                anchorX: .5,
                                anchorY: 0,
                                text: "0",
                                assetKey: "orange_font",
                                size: 100
                            }, {
                                type: 6,
                                assetKey: "bigWinAnim",
                                name: "bigWinAnim",
                                anchorX: .5,
                                anchorY: .5,
                                y: 0,
                                isVisible: !1
                            }]
                        }]
                    }
                }
            }
        },
        1191: function(e, t) {
            nge.App[nge.appNS].Com.BigWin.Controller = nge.App.DjGameBase.Com.BigWin.Controller.extend((function() {
                var e, t = this,
                    n = !1,
                    s = 0;
                this.create = function() {
                    this.super.create(), e = t.getInstance("Cfg").get()
                }, this.show = function(e) {
                    if (n = e.totalWin, !e.totalWin) return !1;
                    t.super.show(e)
                }, this.showLoop = function() {
                    if (!n) return !1;
                    t.mainAnim.stop(), t.mainAnim.stopTrack(0), t.mainAnim.stopTrack(1);
                    e: {
                        var s = n,
                            a = nge.Lib.Money.toCoins(nge.localData.get("totalBet.value"));a *= +nge.localData.get("BIGWIN_MULT");
                        for (var o = 0; o < e.scaleDurations.length; o++) {
                            var i = e.scaleDurations[o];
                            if (s >= a * i.mult) {
                                s = i;
                                break e
                            }
                        }
                        s = e.scaleDurations[0]
                    }
                    t.mainAnim.setAnimationByMode(0, "big_win_scale_" + s.name, nge.spine.FREEZE), t.mainAnim.setAnimationByMode(e.animation.trackNumber, e.animation.loopTrackName, nge.spine.LOOP)
                }, this.cycleComplete = function(e) {
                    s = nge.rafSetTimeout((function() {
                        t.super.cycleComplete(e)
                    }), 1)
                }, this.showPhase2 = function() {
                    t.mainAnim.stop(), t.mainAnim.stopTrack(0), t.mainAnim.stopTrack(1), t.super.showPhase2()
                };
                var a = function() {
                    0 !== s && (nge.rafClearTimeout(s), s = 0)
                };
                this.subscribe = function() {
                    t.super.subscribe(), nge.observer.add("Transport.close", a)
                }
            }))
        },
        1192: function(e, t) {
            nge.App[nge.appNS].Com.Freespin = {}
        },
        1193: function(e, t) {
            nge.App[nge.appNS].Com.Freespin.Controller = nge.App.DjGameBase.Com.Freespin.Controller.extend((function() {
                var e, t = this,
                    n = "0_blur 1_blur 2_blur 3_blur 4_blur 5_blur 6_blur 7_blur 8_blur 9_blur 10_blur 11_blur 12_blur".split(" "),
                    s = ["0_blur 2_blur 3_blur 4_blur 5_blur 6_blur 7_blur 8_blur 9_blur 10_blur 11_blur 12_blur".split(" "), "0_blur 2_blur 3_blur 4_blur 5_blur 6_blur 7_blur 8_blur 9_blur 10_blur 11_blur 12_blur".split(" "), ["0_x3_blur", "0_x5_blur", "0_x10_blur", "0_x25_blur"], "0_blur 2_blur 3_blur 4_blur 5_blur 6_blur 7_blur 8_blur 9_blur 10_blur 11_blur 12_blur".split(" "), "0_blur 2_blur 3_blur 4_blur 5_blur 6_blur 7_blur 8_blur 9_blur 10_blur 11_blur 12_blur".split(" ")];
                this.startFreespinsOnWinlinesComplete = function() {
                    t.freespinsInProgress || nge.rafSetTimeout((function() {
                        nge.observer.fire("winlines.stopAnimation"), nge.observer.fire("win.hide"), nge.observer.fire("freespin.popupStart.show"), nge.observer.fire("freespin.counterReset"), nge.observer.fire("popup.show", {
                            popupName: "freespinStartPopup",
                            layerName: "freespinStartPopup",
                            onClick: function() {
                                nge.observer.fire("layersSwitcher.show", "gameFreeSpin"), nge.localData.set("slotMachine.slotWin.lineWinAmounts", !1)
                            },
                            freespinsCounter: e
                        })
                    }), 300)
                }, this.prepareFreespinsToEnd = function() {
                    var e = nge.localData.get("slotMachine.totalBonusWin") || 0;
                    isNaN(e) ? console.error("Total bonus win is NaN") : nge.localData.set("freespins.totalWin", nge.Lib.Money.toCoins(e)), nge.rafSetTimeout((function() {
                        nge.observer.fire("popupFinish.animate.start"), nge.observer.fire("winlines.stopAnimation"), nge.observer.fire("popup.show", {
                            popupName: "freespinEndPopup",
                            layerName: "freespinEndPopup",
                            onClick: function() {
                                nge.observer.fire("freespin.press.endPopupButton")
                            },
                            freespinTotalWin: t.getTotalBonusWin(e)
                        }, 20)
                    }), 800)
                };
                var a = function(e) {
                    e ? nge.observer.fire("slotMachine.setSymbolsBlurKeys", s) : nge.observer.fire("slotMachine.setSymbolsBlurKeys", n), nge.observer.fire("slotMachine.updateBlurs")
                };
                this.freespinStart = function(n) {
                    t.super.freespinStart(n), e = n, a(!0), nge.observer.fire("freespins.setBonusStopCounters")
                }, this.endFreespins = function() {
                    this.super.endFreespins(), a(!1), nge.observer.fire("freespins.setBaseStopCounters")
                };
                var o = function(e) {
                    "freespinStartPopup" === e && nge.localData.get("freeGame.inProgress") && (e = nge.findOne("^offersFreespinCounter")) && (e.visible = !0)
                };
                this.subscribe = function() {
                    this.super.subscribe(), nge.observer.add("layersSwitcher.show", o)
                }
            }))
        },
        1194: function(e, t) {
            nge.App[nge.appNS].Com.Freespin.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {
                        name: "objects",
                        contents: []
                    }
                }
            }
        },
        1195: function(e, t) {
            nge.App[nge.appNS].Com.Freespin.Mobile = {}
        },
        1196: function(e, t) {
            nge.App[nge.appNS].Com.Freespin.Mobile.Controller = nge.App[nge.appNS].Com.Freespin.Controller.extend((function() {}))
        },
        1197: function(e, t) {
            nge.App[nge.appNS].Com.Intrigue = {}
        },
        1198: function(e, t) {
            nge.App[nge.appNS].Com.Intrigue.Cfg = Class.extend((function() {
                this.singleton = !0, this.params = {
                    triggerVariants: [{
                        symbols: ["1"],
                        reelMask: [!0, !0, !0, !0, !0],
                        minCount: 2
                    }]
                }, this.get = function() {
                    return this.params
                }
            }))
        },
        1199: function(e, t) {
            nge.App[nge.appNS].Com.Intrigue.Controller = nge.App.DjGameBase.Com.Intrigue.Controller.extend((function() {
                function e(e, t, n, s, a, o, i, l) {
                    return e = nge.Mlm.Objects.Spine({
                        assetKey: e,
                        name: t,
                        x: n,
                        y: s,
                        isVisible: !1
                    }), a = nge.findOne("^" + a), a = nge.objects.create(e, a, !0), o && a.setAnimationByName(0, o, i, l), a
                }

                function t(e) {
                    return function() {
                        if (!0 === o[e]) {
                            var t = nge.tween.add(s[e - 2]).to({
                                alpha: 0
                            }, 300, nge.Lib.Tween.Easing.Linear.None);
                            t.onComplete.addOnce((function() {
                                s[e - 2].stop()
                            })), t.start(), (t = nge.tween.add(a[e - 2]).to({
                                alpha: 0
                            }, 300)).onComplete.addOnce((function() {
                                a[e - 2].stop()
                            })), t.start()
                        }
                    }
                }

                function n() {
                    o = {}
                }
                nge.Lib.Helper.mobileAndTabletCheck();
                var s = [],
                    a = [],
                    o = {};
                this.create = function() {
                    this.super.create(), o = {}, s = [], a = [];
                    for (var t = 0; 3 > t; t++) s.push(e("spinification_below", "spinification_below_animation_" + t, 175 + 340 * (t + 2), 540, "spinificationBelowAnimationContainer"));
                    for (t = 0; 3 > t; t++) a.push(e("spinification_above", "spinification_above_animation_" + t, 175 + 340 * (t + 2), 540, "spinificationAboveAnimationContainer"))
                };
                var i = function(e) {
                    return function() {
                        o[e] || (o[e] = !0, s[e - 2].alpha = 0, nge.tween.add(s[e - 2]).to({
                            alpha: 1
                        }, 200, nge.Lib.Tween.Easing.Linear.None).start(), a[e - 2].alpha = 0, nge.tween.add(a[e - 2]).to({
                            alpha: 1
                        }, 200).start(), s[e - 2].setAnimationByName(0, "below", !0), a[e - 2].setAnimationByName(0, "above", !0))
                    }
                };
                this.subscribe = function() {
                    this.super.subscribe();
                    for (var e = 2; 5 > e; e++) nge.observer.add("slotMachine.reel_" + e + ".intrigue.start", i(e)), nge.observer.add("slotMachine.reel_" + e + ".animation.stop", t(e));
                    nge.observer.add("slotMachine.reel_4.animation.stop", n)
                }
            }))
        },
        1200: function(e, t) {
            nge.App[nge.appNS].Com.Load = {}
        },
        1201: function(e, t) {
            nge.App[nge.appNS].Com.Load.Cfg = nge.App.DjGameBase.Com.Load.Cfg.extend((function() {
                var e = nge.appPath + "img/fonts/";
                this.fonts.rounds_black = nge.appPath + "css/fonts/rounds_black", this.bitmapFonts.counter_font = {
                    type: mt.assets.BITMAP_FONT,
                    block: mt.assets.blocks.STATIC,
                    textureURL: e + "counter_font.png",
                    bitmapFont: e + "counter_font.fnt"
                }, this.bitmapFonts.orange_font = {
                    type: mt.assets.BITMAP_FONT,
                    block: mt.assets.blocks.STATIC,
                    textureURL: e + "orange_font.png",
                    bitmapFont: e + "orange_font.fnt"
                }
            }))
        },
        1202: function(e, t) {
            nge.App[nge.appNS].Com.MiniPaytable = {}
        },
        1203: function(e, t) {
            nge.App[nge.appNS].Com.MiniPaytable.Cfg = nge.App.DjGameBase.Com.MiniPaytable.Cfg.extend((function() {
                this.cfg.tableCoords = [
                    [{
                        x: 103,
                        y: 18.5
                    }, {
                        x: 103,
                        y: 303.5
                    }, {
                        x: 103,
                        y: 588.5
                    }],
                    [{
                        x: 447,
                        y: 18.5
                    }, {
                        x: 447,
                        y: 303.5
                    }, {
                        x: 447,
                        y: 588.5
                    }],
                    [{
                        x: 791,
                        y: 18.5
                    }, {
                        x: 791,
                        y: 303.5
                    }, {
                        x: 791,
                        y: 588.5
                    }],
                    [{
                        x: 1144,
                        y: 18.5
                    }, {
                        x: 1144,
                        y: 303.5
                    }, {
                        x: 1144,
                        y: 588.5
                    }],
                    [{
                        x: 1144,
                        y: 18.5
                    }, {
                        x: 1144,
                        y: 303.5
                    }, {
                        x: 1144,
                        y: 588.5
                    }]
                ], this.cfg.slotMachineWidth = 1720, this.cfg.slotMachineHeight = 855, this.cfg.leftContainer = {
                    name: "miniPaytableLeftContainer",
                    x: 108,
                    y: 107
                }, this.cfg.rightContainer = {
                    name: "miniPaytableRightContainer",
                    x: 443,
                    y: 107
                }, this.cfg.symbolSettings = {
                    1: {
                        selectorPostfix: "s",
                        numbers: {
                            offsetX: -10,
                            offsetY: 0,
                            hDist: 45,
                            style: {
                                font: "30pt futuraptmedium",
                                fill: 16696173
                            }
                        },
                        values: {
                            offsetX: 31,
                            offsetY: 0,
                            hDist: 45,
                            style: {
                                font: "30pt futuraptmedium",
                                fill: 16777215
                            }
                        },
                        divider: {
                            assetKey: "miniPaytableBgSeparator",
                            anchorX: .5,
                            anchorY: .5,
                            x: 65,
                            y: 140
                        },
                        additional: {
                            x: 55,
                            y: 190,
                            maxWidth: 310,
                            style: {
                                font: "16pt futuraptmedium",
                                fill: 16777215,
                                align: "center"
                            },
                            localizationKey: "MINI_PAYTABLE_SCATTER_DESCRIPTION"
                        }
                    },
                    0: {
                        numbers: {
                            offsetX: -10,
                            offsetY: -20,
                            hDist: 45,
                            style: {
                                font: "30pt futuraptmedium",
                                fill: 16696173
                            }
                        },
                        values: {
                            offsetX: 31,
                            offsetY: -20,
                            hDist: 45,
                            style: {
                                font: "30pt futuraptmedium",
                                fill: 16777215
                            }
                        },
                        divider: {
                            assetKey: "miniPaytableBgSeparator",
                            anchorX: .5,
                            anchorY: .5,
                            x: 65,
                            y: 150
                        },
                        additional: {
                            x: 55,
                            y: 200,
                            maxWidth: 310,
                            style: {
                                font: "16pt futuraptmedium",
                                fill: 16777215,
                                align: "center"
                            },
                            localizationKey: "MINI_PAYTABLE_WILD_DESCRIPTION"
                        }
                    },
                    other: {
                        numbers: {
                            offsetX: 0,
                            offsetY: 30,
                            hDist: 49,
                            style: {
                                font: "30pt futuraptmedium",
                                fill: 16696173
                            }
                        },
                        values: {
                            offsetX: 41,
                            offsetY: 30,
                            hDist: 49,
                            style: {
                                font: "30pt futuraptmedium",
                                fill: 16777215
                            }
                        }
                    }
                }
            }))
        },
        1204: function(e, t) {
            nge.App[nge.appNS].Com.MiniPaytable.Tpl = function() {
                var e = nge.appPath + "img/";
                return {
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "miniPaytableBg",
                            fullPath: e + "playarea/miniPaytableBg.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "miniPaytableBgSeparator",
                            fullPath: e + "playarea/miniPaytableBgSeparator.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: mt.objects.GROUP,
                            name: "miniPaytableMainContainer",
                            alignX: "center",
                            x: -960,
                            y: 0,
                            scaleX: 1,
                            scaleY: 1,
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "miniPaytableClickableZones",
                                x: 100,
                                y: 20,
                                contents: []
                            }, {
                                type: mt.objects.GROUP,
                                name: "miniPaytablePopupContainer",
                                isVisible: !1,
                                x: 791,
                                y: 296,
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "miniPaytableRightContainer",
                                    y: 83,
                                    contents: []
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "miniPaytableLeftContainer",
                                    y: 83,
                                    contents: [{
                                        type: mt.objects.IMAGE,
                                        name: "miniPaytableSymbolImage",
                                        anchorX: .5,
                                        anchorY: .5,
                                        assetKey: "2"
                                    }]
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "miniPaytableBg",
                                    assetKey: "miniPaytableBg"
                                }]
                            }]
                        }]
                    }
                }
            }
        },
        1205: function(e, t) {
            nge.App[nge.appNS].Com.MiniPaytable.View = nge.App.DjGameBase.Com.MiniPaytable.View.extend((function() {
                var e = this;
                this.show = function(t, n) {
                    var s = nge.localData.get("slotMachine_reelsSymbols");
                    if (!s) throw Error('Can\'t find "slotMachine_reelsSymbols" in localData');
                    e.state.activeMiniPaytable = {
                        reel: t,
                        row: n
                    };
                    var a = s[t][n];
                    s = s[t][n], "0_x3" !== a && "0_x5" !== a && "0_x10" !== a && "0_x25" !== a || (a = "0"), e.generatePayTable(a), e.changePopupContainerPosition(t, n), e.changeSymbolTexture(s, t, n), e.popupContainer.visible = !0
                }
            }))
        },
        1206: function(e, t) {
            nge.App[nge.appNS].Com.MiniPaytable.Mobile = {}
        },
        1207: function(e, t) {
            nge.App[nge.appNS].Com.MiniPaytable.Mobile.Cfg = nge.App[nge.appNS].Com.MiniPaytable.Cfg.extend((function() {
                this.cfg.slotMachineHeight = 880
            }))
        },
        1208: function(e, t) {
            nge.App[nge.appNS].Com.MiniPaytable.Mobile.Tpl = function() {
                var e = nge.appPath + "img/";
                return {
                    styles: {
                        ".portrait .miniPaytableParentContainer": {
                            isVisible: !1
                        },
                        ".album .miniPaytableParentContainer": {
                            isVisible: !0
                        },
                        ".portrait .miniPaytableMainContainer": {
                            alignX: "center",
                            x: 0,
                            y: 200,
                            scaleX: .6,
                            scaleY: .6
                        },
                        ".album .miniPaytableMainContainer": {
                            alignX: "center",
                            x: -864,
                            y: 60,
                            scaleX: .9,
                            scaleY: .9
                        },
                        ".portrait .miniPaytableClickableZones": {
                            x: -860,
                            y: 20
                        },
                        ".album .miniPaytableClickableZones": {
                            x: 100,
                            y: 20
                        }
                    },
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "miniPaytableBg",
                            fullPath: e + "playarea/miniPaytableBg.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "miniPaytableBgSeparator",
                            fullPath: e + "playarea/miniPaytableBgSeparator.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: mt.objects.GROUP,
                            name: "miniPaytableMainContainer",
                            class: "miniPaytableMainContainer",
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "miniPaytableClickableZones",
                                class: "miniPaytableClickableZones",
                                contents: []
                            }, {
                                type: mt.objects.GROUP,
                                name: "miniPaytablePopupContainer",
                                isVisible: !1,
                                x: 791,
                                y: 296,
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "miniPaytableRightContainer",
                                    y: 83,
                                    contents: []
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "miniPaytableLeftContainer",
                                    y: 83,
                                    contents: [{
                                        type: mt.objects.IMAGE,
                                        name: "miniPaytableSymbolImage",
                                        anchorX: .5,
                                        anchorY: .5,
                                        assetKey: "2"
                                    }]
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "miniPaytableBg",
                                    assetKey: "miniPaytableBg"
                                }]
                            }]
                        }]
                    }
                }
            }
        },
        1209: function(e, t) {
            nge.App[nge.appNS].Com.MiniPaytable.Mobile.View = nge.App.DjGameBase.Com.MiniPaytable.Mobile.View.extend((function() {
                var e = this,
                    t = this;
                this.changeSymbolTexture = function(e, n, s) {
                    var a = t.getSymbolSprite(),
                        o = a.scale.x,
                        i = a.scale.y;
                    a.texture = nge.wrap.cache.getTexture(e), a.scale.set(o, i), (e = nge.state.play.c.slotMachine._service._view.getSymbolByPosition({
                        reel: n,
                        row: s
                    })) && (e = nge.Lib.Helper.getRealWorldPosition(e.texture), n = nge.Lib.Helper.getRealWorldPosition(a.parent), a.position.x = e.x - n.x + 10.5, a.position.y = e.y - n.y + 3.5)
                }, this.show = function(t, n) {
                    var s = nge.localData.get("slotMachine_reelsSymbols");
                    if (!s) throw Error('Can\'t find "slotMachine_reelsSymbols" in localData');
                    e.state.activeMiniPaytable = {
                        reel: t,
                        row: n
                    }, "0_x3" !== (s = s[t][n]) && "0_x5" !== s && "0_x10" !== s && "0_x25" !== s || (s = "0"), e.generatePayTable(s), e.changePopupContainerPosition(t, n), e.changeSymbolTexture(s, t, n), e.popupContainer.visible = !0, e.miniPaytableGlobalCover.visible = !0
                }
            }))
        },
        1210: function(e, t) {
            nge.App[nge.appNS].Com.Popup = {}
        },
        1211: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Cfg = nge.App.DjGameBase.Com.Popup.Cfg.extend((function() {
                var e = {
                        font: "54pt rounds_black",
                        fill: "#FFFFFF",
                        stroke: "#915818",
                        strokeThickness: 6,
                        align: "center"
                    },
                    t = {
                        color: 0,
                        a: .6,
                        showDuration: 300,
                        hideDuration: 250,
                        hideDelay: 250
                    };
                this.cfg.popups = {
                    freespinStartPopup: {
                        shadow: t,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: {
                                show: "appear_free_games",
                                loop: "loop_free_games",
                                hide: "disappear_free_games"
                            }
                        },
                        button: {
                            type: 4,
                            name: "popupOkButton",
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1,
                            pixelPerfectOver: !1,
                            pixelPerfectClick: !1,
                            class: "popupButton popupOkButtonStart",
                            assetKey: "popupOkButtonAsset"
                        },
                        showButtonWithFade: !0,
                        content: [{
                            model: {
                                type: 0,
                                isVisible: !1,
                                name: "popup_congratulations",
                                assetKey: "popup_congratulations_en",
                                anchorX: .5,
                                anchorY: .5
                            },
                            followSlotName: "congratulations"
                        }, {
                            model: {
                                type: 7,
                                text: "1234",
                                size: 180,
                                anchorX: .5,
                                anchorY: .48,
                                assetKey: "counter_font"
                            },
                            followSlotName: "free_games_counter",
                            dataKey: "freespinsCounter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_FREE_SPINS"),
                                anchorX: .5,
                                anchorY: .4,
                                style: e
                            },
                            followSlotName: "free_games"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_WON"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "free_games_won"
                        }]
                    },
                    freespinEndPopup: {
                        shadow: t,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: {
                                show: "appear_total_win",
                                loop: "loop_total_win",
                                hide: "disappear_total_win"
                            }
                        },
                        button: {
                            type: 4,
                            name: "popupOkButton",
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1,
                            pixelPerfectOver: !1,
                            pixelPerfectClick: !1,
                            class: "popupButton popupOkButtonEnd",
                            assetKey: "popupOkButtonAsset"
                        },
                        showButtonWithFade: !0,
                        content: [{
                            model: {
                                type: 0,
                                isVisible: !1,
                                name: "popup_congratulations",
                                assetKey: "popup_congratulations_en",
                                anchorX: .5,
                                anchorY: .5
                            },
                            followSlotName: "congratulations"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_TOTAL_WIN"),
                                anchorX: .5,
                                anchorY: .5,
                                style: {
                                    font: "50pt rounds_black",
                                    fill: "#FFFFFF",
                                    stroke: "#915818",
                                    strokeThickness: 5,
                                    align: "center"
                                }
                            },
                            followSlotName: "total_win"
                        }, {
                            model: {
                                type: 7,
                                text: "1234",
                                size: 120,
                                anchorX: .5,
                                anchorY: .48,
                                assetKey: "counter_font"
                            },
                            followSlotName: "total_win_counter",
                            dataKey: "freespinTotalWin"
                        }]
                    }
                }
            }))
        },
        1212: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Tpl = function(e) {
                return e || (e = nge.appPath + "img/"), {
                    styles: {
                        ".popupButton": {
                            anchorX: .5,
                            anchorY: .5,
                            btnFrames: {
                                over: 2,
                                out: 1,
                                down: 0
                            },
                            frame: 1
                        },
                        ".portrait .popupContentHolderParent": {
                            scaleX: 1.25,
                            scaleY: 1.25,
                            y: "-10%"
                        },
                        ".album .popupContentHolderParent": {
                            scaleX: 1,
                            scaleY: 1,
                            y: 0
                        },
                        ".portrait .popupButtonsContainer": {
                            scaleX: .8,
                            scaleY: .8
                        },
                        ".album .popupButtonsContainer": {
                            scaleX: 1,
                            scaleY: 1
                        },
                        ".portrait .popupOkButtonStart": {
                            y: 610
                        },
                        ".album .popupOkButtonStart": {
                            y: 280
                        },
                        ".portrait .popupOkButtonEnd": {
                            y: 610
                        },
                        ".album .popupOkButtonEnd": {
                            y: 190
                        }
                    },
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "notificationPopupBackground",
                            fullPath: e + "playarea/notification_popup_bg.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "popupOkButtonAsset",
                            width: 708,
                            height: 108,
                            frameWidth: 236,
                            fullPath: e + "playarea/popupOkButton.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "notificationOkButtonAsset",
                            width: 852,
                            height: 128,
                            frameWidth: 284,
                            fullPath: e + "playarea/notificationOkButton.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "popup_congratulations_en",
                            fullPath: e + "playarea/popup_congratulations_en.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: mt.objects.GROUP,
                            name: "popupInternalContainer",
                            alignY: "center",
                            alignX: "center",
                            isVisible: !1,
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "popupContentHolderParent",
                                class: "popupContentHolderParent",
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "popupContentHolder",
                                    contents: [{
                                        type: mt.objects.GROUP,
                                        name: "popupButtonsContainer",
                                        class: "popupButtonsContainer",
                                        contents: []
                                    }, {
                                        type: mt.objects.GROUP,
                                        name: "popupContentContainer",
                                        contents: []
                                    }, {
                                        type: mt.objects.GROUP,
                                        name: "popupBackgroundContainer",
                                        contents: []
                                    }]
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "popupShadowContainer",
                                x: "-50%",
                                y: "-50%",
                                contents: []
                            }]
                        }]
                    }
                }
            }
        },
        1213: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Lang_ru = {}
        },
        1214: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Lang_ru.Cfg = nge.App.DjGameBase.Com.Popup.Cfg.extend((function() {
                var e = {
                        font: "54pt rounds_black",
                        fill: "#FFFFFF",
                        stroke: "#915818",
                        strokeThickness: 6,
                        align: "center"
                    },
                    t = {
                        color: 0,
                        a: .7,
                        showDuration: 300,
                        hideDuration: 250,
                        hideDelay: 250
                    };
                this.cfg.popups = {
                    freespinStartPopup: {
                        shadow: t,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: {
                                show: "appear_free_games",
                                loop: "loop_free_games",
                                hide: "disappear_free_games"
                            }
                        },
                        button: {
                            type: 4,
                            name: "popupOkButton",
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1,
                            pixelPerfectOver: !1,
                            pixelPerfectClick: !1,
                            class: "popupButton popupOkButtonStart",
                            assetKey: "popupOkButtonAsset"
                        },
                        showButtonWithFade: !0,
                        content: [{
                            model: {
                                type: 0,
                                isVisible: !1,
                                name: "popup_congratulations",
                                assetKey: "popup_congratulations_en",
                                anchorX: .5,
                                anchorY: .5
                            },
                            followSlotName: "congratulations"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_WON"),
                                anchorX: .5,
                                anchorY: 3,
                                style: e
                            },
                            followSlotName: "free_games"
                        }, {
                            model: {
                                type: 7,
                                text: "1234",
                                size: 180,
                                anchorX: .5,
                                anchorY: .07,
                                assetKey: "counter_font"
                            },
                            followSlotName: "free_games_counter",
                            dataKey: "freespinsCounter"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_FREE_SPINS"),
                                anchorX: .5,
                                anchorY: .5,
                                style: e
                            },
                            followSlotName: "free_games_won"
                        }]
                    },
                    freespinEndPopup: {
                        shadow: t,
                        background: {
                            type: "spine",
                            assetKey: "popupSpineBackground",
                            animations: {
                                show: "appear_total_win",
                                loop: "loop_total_win",
                                hide: "disappear_total_win"
                            }
                        },
                        button: {
                            type: 4,
                            name: "popupOkButton",
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1,
                            pixelPerfectOver: !1,
                            pixelPerfectClick: !1,
                            class: "popupButton popupOkButtonEnd",
                            assetKey: "popupOkButtonAsset"
                        },
                        showButtonWithFade: !0,
                        content: [{
                            model: {
                                type: 0,
                                isVisible: !1,
                                name: "popup_congratulations",
                                assetKey: "popup_congratulations_en",
                                anchorX: .5,
                                anchorY: .5
                            },
                            followSlotName: "congratulations"
                        }, {
                            model: {
                                type: 2,
                                isVisible: !1,
                                text: nge.i18n.get("popup_TOTAL_WIN"),
                                anchorX: .5,
                                anchorY: .5,
                                style: {
                                    font: "50pt rounds_black",
                                    fill: "#FFFFFF",
                                    stroke: "#915818",
                                    strokeThickness: 5,
                                    align: "center"
                                }
                            },
                            followSlotName: "total_win"
                        }, {
                            model: {
                                type: 7,
                                text: "1234",
                                size: 120,
                                anchorX: .5,
                                anchorY: .48,
                                assetKey: "counter_font"
                            },
                            followSlotName: "total_win_counter",
                            dataKey: "freespinTotalWin"
                        }]
                    }
                }
            }))
        },
        1215: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Mobile = {}
        },
        1216: function(e, t) {
            nge.App[nge.appNS].Com.Popup.Mobile.Tpl = function(e) {
                return e || (e = nge.appPath + "img/"), {
                    styles: {
                        ".popupButton": {
                            anchorX: .5,
                            anchorY: .5,
                            btnFrames: {
                                over: 2,
                                out: 1,
                                down: 0
                            },
                            frame: 1
                        },
                        ".portrait .popupContentHolderParent": {
                            scaleX: 1.25,
                            scaleY: 1.25,
                            y: "-10%"
                        },
                        ".album .popupContentHolderParent": {
                            scaleX: 1,
                            scaleY: 1,
                            y: 0
                        },
                        ".portrait .popupButtonsContainer": {
                            scaleX: .8,
                            scaleY: .8
                        },
                        ".album .popupButtonsContainer": {
                            scaleX: .8,
                            scaleY: .8
                        },
                        ".portrait .popupOkButtonStart": {
                            y: 610
                        },
                        ".album .popupOkButtonStart": {
                            y: 360
                        },
                        ".portrait .popupOkButtonEnd": {
                            y: 610
                        },
                        ".album .popupOkButtonEnd": {
                            y: 260
                        }
                    },
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "popupOkButtonAsset",
                            fullPath: e + "playarea/popupButtonVertical.png",
                            frameWidth: 456
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "popup_congratulations_en",
                            fullPath: e + "playarea/popup_congratulations_en.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: mt.objects.GROUP,
                            name: "popupInternalContainer",
                            alignY: "center",
                            alignX: "center",
                            isVisible: !1,
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "popupContentHolderParent",
                                class: "popupContentHolderParent",
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "popupContentHolder",
                                    contents: [{
                                        type: mt.objects.GROUP,
                                        name: "popupButtonsContainer",
                                        class: "popupButtonsContainer",
                                        contents: []
                                    }, {
                                        type: mt.objects.GROUP,
                                        name: "popupContentContainer",
                                        contents: []
                                    }, {
                                        type: mt.objects.GROUP,
                                        name: "popupBackgroundContainer",
                                        contents: []
                                    }]
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "popupShadowContainer",
                                x: "-50%",
                                y: "-50%",
                                contents: []
                            }]
                        }]
                    }
                }
            }
        },
        1217: function(e, t) {
            nge.App[nge.appNS].Com.RegularWin = {}
        },
        1218: function(e, t) {
            nge.App[nge.appNS].Com.RegularWin.Tpl = function() {
                return {
                    styles: {
                        ".portrait .regularWinContainer": {
                            y: 750
                        },
                        ".album .regularWinContainer": {
                            y: 474
                        }
                    },
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {
                        contents: [{
                            type: 1,
                            name: "regularWinInternalContainer",
                            class: "regularWinContainer",
                            x: "50%",
                            isVisible: !1,
                            contents: [{
                                type: 7,
                                name: "regularWinCounter",
                                isVisible: !1,
                                x: 0,
                                y: 0,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "counter_font",
                                size: 120
                            }]
                        }]
                    }
                }
            }
        },
        1219: function(e, t) {
            nge.App[nge.appNS].Com.Sidebar = {}
        },
        1220: function(e, t) {
            nge.App[nge.appNS].Com.Sidebar.Mobile = {}
        },
        1221: function(e, t) {
            nge.App[nge.appNS].Com.Sidebar.Mobile.Cfg = nge.App.DjGameBase.Com.Sidebar.Mobile.Cfg.extend((function() {
                var e = this;
                this.paytablePayoutsVariables = [e.getPayoutItem("page0image0", "0", [5, 4, 3, 2]), e.getPayoutItem("page0image1", "1s", [5, 4, 3]), e.getPayoutItem("page1image0", "2", [5, 4, 3]), e.getPayoutItem("page0image2", "3", [5, 4, 3]), e.getPayoutItem("page0image3", "4", [5, 4, 3]), e.getPayoutItem("page0image4", "5", [5, 4, 3]), e.getPayoutItem("page1image1", "6", [5, 4, 3]), e.getPayoutItem("page1image2", "7", [5, 4, 3]), e.getPayoutItem("page1image3", "8", [5, 4, 3]), e.getPayoutItem("page1image4", "9", [5, 4, 3]), e.getPayoutItem("page1image5", "10", [5, 4, 3]), e.getPayoutItem("page1image6", "11", [5, 4, 3]), e.getPayoutItem("page1image7", "12", [5, 4, 3])], this.paytableFeaturesVariables = [e.paytableFeatureItem("0", "Wild Symbol", nge.i18n.get("wild_symbol_feature")), e.paytableFeatureItem("1", "Scatter symbol", nge.i18n.get("scatter_symbol_feature"))], this.rulesVariables = [{
                    title: nge.i18n.get("3_4_or_5_Scatters_part_1_title"),
                    image: "page2image0",
                    text: nge.i18n.get("3_4_or_5_Scatters_part_1")
                }, {
                    title: nge.i18n.get("3_4_or_5_Scatters_part_2_title"),
                    image: "page2image1",
                    text: nge.i18n.get("3_4_or_5_Scatters_part_2")
                }, {
                    title: nge.i18n.get("All_prizes_are_for_combinations_title")
                }, {
                    text: nge.i18n.get("All_prizes_are_for_combinations")
                }], this.fillPaytableHtmlBlocks = function(t) {
                    e.pushPaytableHtmlBlock(t, "0", [5, 4, 3, 2]), e.pushPaytableHtmlBlock(t, "1s", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "2", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "3", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "4", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "5", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "6", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "7", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "8", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "9", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "10", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "11", [5, 4, 3]), e.pushPaytableHtmlBlock(t, "12", [5, 4, 3])
                }
            }))
        },
        1222: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine = {}
        },
        1223: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Cfg = nge.App.DjGameBase.Com.SlotMachine.Cfg.extend((function() {
                this.params.additionalBlurs = !1, this.params.mw = 5, this.params.mh = 3, this.params.wildSymbol = "0", this.params.tintDark = 10180027, this.params.tintNormal = 16777215, this.params.tintDarkAlpha = 1, this.params.tintNormalAlpha = 1, this.params.imageHeight = "original", this.params.imageWidth = "original", this.params.tweenDuration.blur = 85, this.params.th = [3, 3, 3, 3, 3], this.params.tweenDuration.oldSymbols = 138, this.params.tweenDuration.newSymbols = 138, this.params.symbolsBlurKeys = "0_blur 1_blur 2_blur 3_blur 4_blur 5_blur 6_blur 7_blur 8_blur 9_blur 10_blur 11_blur 12_blur".split(" "), this.params.maskName = "slotMachineMaskContainer", this.params.symbolAnimationContainerName = "slotMachineAnimationContainer", this.params.recyclerView.enabled = !0, this.params.recyclerView.reelsStopCounterBase = [8, 12, 16, 20, 24], this.params.recyclerView.reelsStopCounterBonus = [8, 16, 24, 16, 8], this.params.recyclerView.reelsStopCounter = [8, 12, 16, 20, 24], this.params.recyclerView.reelsSpeed = [1.5, 1.5, 1.5, 1.5, 1.5], this.params.recyclerView.reelsSpeedUpSpeed = 5, this.params.recyclerView.reelsIntrigueSpeed = 2, this.params.recyclerView.hideBorderSymbols = !0, this.params.recyclerView.borderSymbolsCount = 1, this.params.useSMJumpOnFreespins = !0
            }))
        },
        1224: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Controller = nge.App.DjGameBase.Com.SlotMachine.Controller.extend((function() {
                var e = this,
                    t = function() {
                        e._service._cfg.recyclerView.reelsStopCounter = e._service._cfg.recyclerView.reelsStopCounterBonus
                    },
                    n = function() {
                        e._service._cfg.recyclerView.reelsStopCounter = e._service._cfg.recyclerView.reelsStopCounterBase
                    };
                this.customSubscribe = function() {
                    this.super.customSubscribe(), nge.observer.add("freespins.setBonusStopCounters", t), nge.observer.add("freespins.setBaseStopCounters", n)
                }
            }))
        },
        1225: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.RecyclerReel = nge.App.DjGameBase.Com.SlotMachine.RecyclerReel.extend((function() {
                this.jumpDistance = 100, this.jumpTimeUp = 200, this.jumpTimeDown = 75
            }))
        },
        1226: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.RecyclerView = nge.App.DjGameBase.Com.SlotMachine.RecyclerView.extend((function() {
                var e = this,
                    t = this;
                this.getIntrigueStopCounters = function() {
                    var n = Array(e._reels.length).fill(0),
                        s = nge.localData.get("slotMachineIntrigue");
                    if (!s || !s.status) return t.super.getIntrigueStopCounters();
                    s.endsFrom = s.endsFrom ? s.endsFrom : 1 / 0;
                    var a = [0, 0, 0, 0, 0];
                    2 === s.startsFrom ? a = [0, 0, 20, 20, 20] : 3 === s.startsFrom ? a = [0, 0, 0, 20, 20] : 4 === s.startsFrom && (a = [0, 0, 0, 0, 20]);
                    for (var o = 0; o < n.length; o++)
                        if (o >= s.startsFrom && o < s.endsFrom)
                            for (var i = o; i < n.length; i++) n[i] += a[i];
                    if (nge.localData.get("settings.turboMode"))
                        for (s = 0; s < n.length; s++) n[s] = Math.round(n[s] / 2);
                    return n
                }, this._checkIntrigue = function(t) {
                    var n = nge.localData.get("slotMachineIntrigue");
                    if (n && n.status) {
                        var s = t + 1;
                        if (!e._speedUp && s !== e._reels.length) {
                            var a = n.startsFrom;
                            n = n.endsFrom || e._reels.length;
                            for (var o = 0; o < e._reels.length; o++) e._reels[o].setSpeed();
                            s >= a && s < n && e._reels[t + 1].setSpeed(e._cfg.recyclerView.reelsIntrigueSpeed)
                        }
                    }
                }, this.updateBlurs = function() {
                    console.color("[RV]updateBlurs", "#00ff00", "#000000");
                    var t = e._createBlurs(e._cfg.symbolsBlurKeys);
                    if (nge.localData.get("freespin.inProgress")) {
                        for (var n = t[2], s = e._cfg.symbolsBlurKeys[2], a = 0; a < n.length; a++) {
                            var o = s[nge.Lib.Random.generate_range(0, s.length - 1)];
                            n[a] = o, 2 === nge.Lib.Random.generate_range(0, 4) && a + 2 < n.length - 2 && (n[a + 1] = o, n[a + 2] = o, a += 2)
                        }
                        t[2] = n
                    }
                    for (n = 0; n < e._reels.length; n++) e._reels[n].setBlurs(t[n])
                }
            }))
        },
        1227: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Symbols = nge.Com.SlotMachine.Symbols.extend((function() {
                this.items = [{
                    name: "0",
                    spine: {
                        animation: "play",
                        atlas: "m00_000"
                    },
                    textureUrl: "m00_000.png"
                }, {
                    name: "1",
                    spine: {
                        animation: "play",
                        atlas: "m01_000"
                    },
                    textureUrl: "m01_000.png"
                }, {
                    name: "2",
                    textureUrl: "m02_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m02_000"
                    },
                    repeat: 1
                }, {
                    name: "3",
                    textureUrl: "m03_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m03_000"
                    },
                    repeat: 1
                }, {
                    name: "4",
                    textureUrl: "m04_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m04_000"
                    },
                    repeat: 1
                }, {
                    name: "5",
                    textureUrl: "m05_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m05_000"
                    },
                    repeat: 1
                }, {
                    name: "6",
                    textureUrl: "m06_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m06_000"
                    },
                    repeat: 1
                }, {
                    name: "7",
                    textureUrl: "m07_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m07_000"
                    },
                    repeat: 1
                }, {
                    name: "8",
                    textureUrl: "m08_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m08_000"
                    },
                    repeat: 1
                }, {
                    name: "9",
                    textureUrl: "m09_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m09_000"
                    },
                    repeat: 1
                }, {
                    name: "10",
                    textureUrl: "m10_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m10_000"
                    },
                    repeat: 1
                }, {
                    name: "11",
                    textureUrl: "m11_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m11_000"
                    },
                    repeat: 1
                }, {
                    name: "12",
                    textureUrl: "m12_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m12_000"
                    },
                    repeat: 1
                }, {
                    name: "0_x3",
                    textureUrl: "m13_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m13_000"
                    },
                    repeat: 1
                }, {
                    name: "0_x5",
                    textureUrl: "m14_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m14_000"
                    },
                    repeat: 1
                }, {
                    name: "0_x10",
                    textureUrl: "m15_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m15_000"
                    },
                    repeat: 1
                }, {
                    name: "0_x25",
                    textureUrl: "m16_000.png",
                    spine: {
                        animation: "play",
                        atlas: "m16_000"
                    },
                    repeat: 1
                }, {
                    name: "blank",
                    textureUrl: "blank.png"
                }, {
                    name: "0_blur",
                    textureUrl: "100.png"
                }, {
                    name: "1_blur",
                    textureUrl: "101.png"
                }, {
                    name: "2_blur",
                    textureUrl: "102.png"
                }, {
                    name: "3_blur",
                    textureUrl: "103.png"
                }, {
                    name: "4_blur",
                    textureUrl: "104.png"
                }, {
                    name: "5_blur",
                    textureUrl: "105.png"
                }, {
                    name: "6_blur",
                    textureUrl: "106.png"
                }, {
                    name: "7_blur",
                    textureUrl: "107.png"
                }, {
                    name: "8_blur",
                    textureUrl: "108.png"
                }, {
                    name: "9_blur",
                    textureUrl: "109.png"
                }, {
                    name: "10_blur",
                    textureUrl: "110.png"
                }, {
                    name: "11_blur",
                    textureUrl: "111.png"
                }, {
                    name: "12_blur",
                    textureUrl: "112.png"
                }, {
                    name: "0_x3_blur",
                    textureUrl: "113.png"
                }, {
                    name: "0_x5_blur",
                    textureUrl: "114.png"
                }, {
                    name: "0_x10_blur",
                    textureUrl: "115.png"
                }, {
                    name: "0_x25_blur",
                    textureUrl: "116.png"
                }]
            }))
        },
        1228: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Tpl = function() {
                var e = nge.appPath + "img/";
                return {
                    styles: {
                        ".album .slotMachineContainer": {
                            x: 0,
                            y: 0,
                            alignX: "center",
                            sWidth: 1920,
                            sHeight: 1080
                        }
                    },
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_0",
                            spine: e + "spine/winlines/winline_0.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_1",
                            spine: e + "spine/winlines/winline_1.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_2",
                            spine: e + "spine/winlines/winline_2.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_3",
                            spine: e + "spine/winlines/winline_3.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_4",
                            spine: e + "spine/winlines/winline_4.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_5",
                            spine: e + "spine/winlines/winline_5.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_6",
                            spine: e + "spine/winlines/winline_6.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_7",
                            spine: e + "spine/winlines/winline_7.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_8",
                            spine: e + "spine/winlines/winline_8.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_9",
                            spine: e + "spine/winlines/winline_9.json"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: 1,
                            name: "slotMachineWinContainer",
                            class: "slotMachineWinContainer",
                            width: 1920,
                            height: 1080,
                            x: -960,
                            y: 0,
                            alignX: "left",
                            contents: [{
                                type: 1,
                                id: "slotMachineAnimationContainer",
                                name: "slotMachineAnimationContainer",
                                x: 100,
                                y: 40,
                                contents: []
                            }, {
                                type: mt.objects.GROUP,
                                name: "winlinesContainer",
                                x: 0,
                                y: 0,
                                contents: [{
                                    type: mt.objects.SPINE,
                                    name: "winline_0",
                                    assetKey: "winline_0",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_1",
                                    assetKey: "winline_1",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_2",
                                    assetKey: "winline_2",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_3",
                                    assetKey: "winline_3",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_4",
                                    assetKey: "winline_4",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_5",
                                    assetKey: "winline_5",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_6",
                                    assetKey: "winline_6",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_7",
                                    assetKey: "winline_7",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_8",
                                    assetKey: "winline_8",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_9",
                                    assetKey: "winline_9",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }]
                            }]
                        }, {
                            type: 1,
                            name: "slotMachineMaskContainer",
                            x: -960,
                            y: 0,
                            alignX: "left",
                            width: 1920,
                            height: 1080,
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "spinificationAboveAnimationContainer",
                                x: 100
                            }, {
                                type: 1,
                                id: "slotMachineGameContainer",
                                name: "slotMachineGameContainer",
                                x: 100,
                                y: 40,
                                width: 1720,
                                height: 855,
                                alignX: "left"
                            }, {
                                type: mt.objects.GROUP,
                                name: "spinificationBelowAnimationContainer",
                                x: 100
                            }]
                        }]
                    }
                }
            }
        },
        1229: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Mobile = {}
        },
        1230: function(e, t) {
            nge.App[nge.appNS].Com.SlotMachine.Mobile.Tpl = function() {
                var e = nge.appPath + "img/";
                return {
                    styles: {
                        ".portrait .slotMachineContainer": {
                            x: 0,
                            y: 460,
                            alignX: "center",
                            sWidth: 1080,
                            sHeight: 1920
                        },
                        ".album .slotMachineContainer": {
                            x: 0,
                            y: 0,
                            alignX: "center",
                            sWidth: 1920,
                            sHeight: 1080
                        },
                        ".portrait .slotMachineWinContainer": {
                            x: -614.4,
                            scaleX: .64,
                            scaleY: .64,
                            alignX: "left"
                        },
                        ".album .slotMachineWinContainer": {
                            x: -960,
                            scaleX: 1,
                            scaleY: 1,
                            alignX: "left"
                        },
                        ".portrait .slotMachineAnimationContainer": {
                            x: 100,
                            y: 20,
                            scaleX: 1,
                            scaleY: 1
                        },
                        ".album .slotMachineAnimationContainer": {
                            x: 180,
                            y: 90,
                            scaleX: .9,
                            scaleY: .9
                        },
                        ".portrait .winlinesContainer": {
                            x: 0,
                            y: 0,
                            scaleX: 1,
                            scaleY: 1
                        },
                        ".album .winlinesContainer": {
                            x: 110,
                            y: 70,
                            scaleX: .9,
                            scaleY: .9
                        },
                        ".portrait .slotMachineMaskContainer": {
                            x: -614.4,
                            scaleX: .64,
                            scaleY: .64,
                            alignX: "left"
                        },
                        ".album .slotMachineMaskContainer": {
                            x: -960,
                            scaleX: 1,
                            scaleY: 1,
                            alignX: "left"
                        },
                        ".portrait .slotMachineMask": {
                            width: 1920,
                            height: 938
                        },
                        ".album .slotMachineMask": {
                            width: 1920,
                            height: 1340
                        },
                        ".portrait .slotMachineGameContainer": {
                            x: 100,
                            y: 20,
                            scaleX: 1,
                            scaleY: 1,
                            alignX: "left"
                        },
                        ".album .slotMachineGameContainer": {
                            x: 180,
                            y: 90,
                            scaleX: .9,
                            scaleY: .9,
                            alignX: "left"
                        },
                        ".portrait .intrigueContainer": {
                            x: 100,
                            scaleX: 1,
                            scaleY: 1
                        },
                        ".album .intrigueContainer": {
                            x: 180,
                            scaleX: .9,
                            scaleY: .9
                        }
                    },
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_0",
                            spine: e + "spine/winlines/winline_0.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_1",
                            spine: e + "spine/winlines/winline_1.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_2",
                            spine: e + "spine/winlines/winline_2.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_3",
                            spine: e + "spine/winlines/winline_3.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_4",
                            spine: e + "spine/winlines/winline_4.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_5",
                            spine: e + "spine/winlines/winline_5.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_6",
                            spine: e + "spine/winlines/winline_6.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_7",
                            spine: e + "spine/winlines/winline_7.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_8",
                            spine: e + "spine/winlines/winline_8.json"
                        }, {
                            type: mt.assets.SPINE,
                            block: mt.assets.blocks.STATIC,
                            key: "winline_9",
                            spine: e + "spine/winlines/winline_9.json"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: 1,
                            name: "slotMachineWinContainer",
                            class: "slotMachineWinContainer",
                            width: 1920,
                            height: 1080,
                            y: 0,
                            contents: [{
                                type: 1,
                                id: "slotMachineAnimationContainer",
                                name: "slotMachineAnimationContainer",
                                class: "slotMachineAnimationContainer",
                                contents: []
                            }, {
                                type: mt.objects.GROUP,
                                name: "winlinesContainer",
                                class: "winlinesContainer",
                                contents: [{
                                    type: mt.objects.SPINE,
                                    name: "winline_0",
                                    assetKey: "winline_0",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_1",
                                    assetKey: "winline_1",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_2",
                                    assetKey: "winline_2",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_3",
                                    assetKey: "winline_3",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_4",
                                    assetKey: "winline_4",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_5",
                                    assetKey: "winline_5",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_6",
                                    assetKey: "winline_6",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_7",
                                    assetKey: "winline_7",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_8",
                                    assetKey: "winline_8",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }, {
                                    type: mt.objects.SPINE,
                                    name: "winline_9",
                                    assetKey: "winline_9",
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 960,
                                    y: 540,
                                    isVisible: !1
                                }]
                            }]
                        }, {
                            type: 1,
                            name: "slotMachineMaskContainer",
                            class: "slotMachineMaskContainer",
                            y: 0,
                            contents: [{
                                type: 1,
                                id: "slotMachineMask",
                                name: "slotMachineMask",
                                class: "slotMachineMask"
                            }, {
                                type: mt.objects.GROUP,
                                name: "spinificationAboveAnimationContainer",
                                class: "intrigueContainer"
                            }, {
                                type: 1,
                                id: "slotMachineGameContainer",
                                name: "slotMachineGameContainer",
                                class: "slotMachineGameContainer",
                                width: 1720,
                                height: 900
                            }, {
                                type: mt.objects.GROUP,
                                name: "spinificationBelowAnimationContainer",
                                class: "intrigueContainer"
                            }]
                        }]
                    }
                }
            }
        },
        1231: function(e, t) {
            nge.App[nge.appNS].Com.Winlines = {}
        },
        1232: function(e, t) {
            nge.App[nge.appNS].Com.Winlines.Cfg = nge.App.DjGameBase.Com.Winlines.Cfg.extend((function() {
                this.linesType = "spine_lines", this.linesContainerName = "winlinesContainer", this.animationOneByOneDuration = this.animationAllDuration = 950
            }))
        },
        1233: function(e, t) {
            nge.App[nge.appNS].Com.WinlinesText = {}
        },
        1234: function(e, t) {
            nge.App[nge.appNS].Com.WinlinesText.Cfg = nge.App.DjGameBase.Com.WinlinesText.Cfg.extend((function() {
                this.params.symbolWidth = 350
            }))
        },
        1235: function(e, t) {
            nge.App[nge.appNS].Com.WinlinesText.Tpl = function() {
                return {
                    styles: {},
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    objects: {
                        contents: [{
                            type: 1,
                            name: "lineWinContainer",
                            x: "50%",
                            y: 404,
                            isVisible: !1,
                            contents: [{
                                type: 7,
                                name: "lineWinAmount0",
                                isVisible: !1,
                                x: 0,
                                y: -225,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "counter_font",
                                size: 90
                            }, {
                                type: 7,
                                name: "lineWinAmount1",
                                isVisible: !1,
                                x: 0,
                                y: 70,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "counter_font",
                                size: 90
                            }, {
                                type: 7,
                                name: "lineWinAmount2",
                                isVisible: !1,
                                x: 0,
                                y: 365,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "counter_font",
                                size: 90
                            }]
                        }]
                    }
                }
            }
        },
        1236: function(e, t) {
            nge.App[nge.appNS].Com.WinlinesText.Mobile = {}
        },
        1237: function(e, t) {
            nge.App[nge.appNS].Com.WinlinesText.Mobile.Tpl = function() {
                return {
                    assets: {
                        name: "assets",
                        contents: []
                    },
                    styles: {
                        ".portrait .winlinesTextContainer": {
                            y: 460
                        },
                        ".album .winlinesTextContainer": {
                            y: 0
                        },
                        ".portrait .lineWinContainer": {
                            y: 31.25,
                            scaleX: .64,
                            scaleY: .64
                        },
                        ".album .lineWinContainer": {
                            y: 100,
                            scaleX: .9,
                            scaleY: .9
                        }
                    },
                    objects: {
                        contents: [{
                            type: 1,
                            name: "lineWinContainer",
                            class: "lineWinContainer",
                            x: "50%",
                            isVisible: !1,
                            contents: [{
                                type: 7,
                                name: "lineWinAmount0",
                                isVisible: !1,
                                x: 0,
                                y: 130,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "counter_font",
                                size: 90
                            }, {
                                type: 7,
                                name: "lineWinAmount1",
                                isVisible: !1,
                                x: 0,
                                y: 430,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "counter_font",
                                size: 90
                            }, {
                                type: 7,
                                name: "lineWinAmount2",
                                isVisible: !1,
                                x: 0,
                                y: 740,
                                anchorX: .5,
                                anchorY: .5,
                                text: "0",
                                assetKey: "counter_font",
                                size: 90
                            }]
                        }]
                    }
                }
            }
        },
        1238: function(e, t) {
            nge.App[nge.appNS].Tpl = {}
        },
        1239: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups = {}
        },
        1240: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Intro = function() {
                var e = new nge.App.DjGameBase.Tpl.Groups.Intro;
                return nge.Lib.Helper.tplSetContainerContents(e, "introUniqueContent", [{
                    type: mt.objects.TEXT,
                    name: "introScreenTextCenter",
                    class: "coloredText",
                    text: nge.i18n.get("SCATTERS_TRIGGER_THE_FREE_SPINS"),
                    anchorX: .5,
                    anchorY: .5,
                    maxWidth: 1050,
                    x: 0,
                    y: -340,
                    alignY: "bottom",
                    style: {
                        font: "52pt futuraptheavy",
                        fill: 16503134,
                        align: "center",
                        shadowColor: 4787766,
                        shadowBlur: 6,
                        shadowOffsetY: 2,
                        stroke: 13268319,
                        strokeThickness: 6,
                        lineHeight: 85
                    }
                }]), e
            }
        },
        1241: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Ui = function() {
                var e = nge.App.DjGameBase.Tpl.Groups.Ui();
                return e.styles[".titleTextStyle"].style.font = "19pt futuraptheavy", e.styles[".titleTextStyle"].style.fill = 15325439, e.styles[".titleTextStyle"].style.stroke = 48, e.styles[".titleTextStyle"].style.strokeThickness = 3, e.styles[".titleButtonStyle"].style.font = "24pt futuraptheavy", e.styles[".titleButtonStyle"].style.fill = 15325439, e.styles[".titleButtonStyle"].style.stroke = 48, e.styles[".titleButtonStyle"].style.strokeThickness = 4, e.styles[".titleButtonStyle"].style.lineHeight = 33, e.styles[".freespinTextStyle"].style.fill = 14335487, e.styles[".freespinTextStyle"].style.stroke = 48, e.styles[".freespinTextStyle"].style.strokeThickness = 4, ["coinPlusButton", "betPlusButton"].forEach((function(t) {
                    (t = nge.Lib.Helper.customRecursiveFind("name", t, "contents", e.objects, !1, !0, !1)) && (t.x = (+t.x || 0) - 2)
                })), ["framInfoContainerBg"].forEach((function(t) {
                    (t = nge.Lib.Helper.customRecursiveFind("name", t, "contents", e.objects, !1, !0, !1)) && (t.x = (+t.x || 0) + 1), t.y = (+t.y || 0) + 1
                })), ["settingPanelBackBg"].forEach((function(t) {
                    (t = nge.Lib.Helper.customRecursiveFind("name", t, "contents", e.objects, !1, !0, !1)) && (t.x = (+t.x || 0) + 1), t.y = (+t.y || 0) - 1
                })), e
            }
        },
        1242: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Help = function() {
                var e = {
                        font: "60pt futuraptmedium",
                        fill: 15655103
                    },
                    t = {
                        font: "30pt futuraptmedium",
                        fill: 16777215,
                        align: "center"
                    },
                    n = {
                        font: "30pt futuraptmedium",
                        fill: 16696173
                    },
                    s = {
                        font: "30pt futuraptmedium",
                        fill: 16777215
                    },
                    a = {
                        font: "30pt futuraptmedium",
                        fill: 15325439
                    },
                    o = nge.appPath + "img/";
                return {
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "infoNextButton",
                            fullPath: o + "playarea/infoNextButton.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "pageInfoPlate",
                            fullPath: o + "playarea/pageInfoPlate.png",
                            frameHeight: 40
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "nameBg1",
                            fullPath: o + "playarea/nameBg1_asset.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page0image0",
                            fullPath: o + "playarea/page0image0.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page0image1",
                            fullPath: o + "playarea/page0image1.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page0image2",
                            fullPath: o + "playarea/page0image2.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page0image3",
                            fullPath: o + "playarea/page0image3.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page0image4",
                            fullPath: o + "playarea/page0image4.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page1image0",
                            fullPath: o + "playarea/page1image0.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page1image1",
                            fullPath: o + "playarea/page1image1.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page1image2",
                            fullPath: o + "playarea/page1image2.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page1image3",
                            fullPath: o + "playarea/page1image3.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page1image4",
                            fullPath: o + "playarea/page1image4.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page1image5",
                            fullPath: o + "playarea/page1image5.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page1image6",
                            fullPath: o + "playarea/page1image6.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page1image7",
                            fullPath: o + "playarea/page1image7.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image0",
                            fullPath: o + "playarea/page4image0.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image1",
                            fullPath: o + "playarea/page4image1.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image2",
                            fullPath: o + "playarea/page4image2.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image3",
                            fullPath: o + "playarea/page4image3.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image4",
                            fullPath: o + "playarea/page4image4.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image5",
                            fullPath: o + "playarea/page4image5.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image6",
                            fullPath: o + "playarea/page4image6.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image7",
                            fullPath: o + "playarea/page4image7.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image8",
                            fullPath: o + "playarea/page4image8.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.PAYTABLE,
                            key: "page4image9",
                            fullPath: o + "playarea/page4image9.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: mt.objects.GROUP,
                            name: "infoContainer",
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "pagesInfoContainer",
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "page0Container",
                                    contents: [{
                                        name: "paytableNameText",
                                        type: mt.objects.TEXT,
                                        text: "PAYTABLE_help",
                                        style: e,
                                        x: 960,
                                        y: 52,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.GROUP,
                                        scaleX: 1.2,
                                        scaleY: 1.2,
                                        x: 315,
                                        y: 141,
                                        contents: [{
                                            type: mt.objects.IMAGE,
                                            name: "page0image0",
                                            assetKey: "page0image0"
                                        }]
                                    }, {
                                        type: mt.objects.GROUP,
                                        scaleX: 1.15,
                                        scaleY: 1.15,
                                        x: 1095,
                                        y: 150,
                                        contents: [{
                                            type: mt.objects.IMAGE,
                                            name: "page0image1",
                                            assetKey: "page0image1"
                                        }]
                                    }, {
                                        type: mt.objects.GROUP,
                                        scaleX: .9,
                                        scaleY: .9,
                                        x: 175,
                                        y: 658,
                                        contents: [{
                                            type: mt.objects.IMAGE,
                                            name: "page1image0",
                                            assetKey: "page1image0"
                                        }]
                                    }, {
                                        type: mt.objects.GROUP,
                                        scaleX: .9,
                                        scaleY: .9,
                                        x: 565,
                                        y: 658,
                                        contents: [{
                                            type: mt.objects.IMAGE,
                                            name: "page0image2",
                                            assetKey: "page0image2"
                                        }]
                                    }, {
                                        type: mt.objects.GROUP,
                                        scaleX: .8,
                                        scaleY: .8,
                                        x: 965,
                                        y: 675,
                                        contents: [{
                                            type: mt.objects.IMAGE,
                                            name: "page0image3",
                                            assetKey: "page0image3"
                                        }]
                                    }, {
                                        type: mt.objects.GROUP,
                                        scaleX: 1,
                                        scaleY: 1,
                                        x: 1308,
                                        y: 645,
                                        contents: [{
                                            type: mt.objects.IMAGE,
                                            name: "page0image4",
                                            assetKey: "page0image4"
                                        }]
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "page0text0",
                                        text: "SUBSTITUTES_FOR_ALL",
                                        style: t,
                                        class: "coloredText",
                                        x: 590,
                                        y: 543,
                                        anchorX: .5,
                                        anchorY: .5,
                                        lineHeight: 35
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "page0text1",
                                        text: "3_OR_MORE",
                                        style: t,
                                        class: "coloredText",
                                        x: 1338,
                                        y: 543,
                                        anchorX: .5,
                                        anchorY: .5,
                                        lineHeight: 35
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 708,
                                        y: 235,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 708,
                                        y: 289,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 708,
                                        y: 342,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber2",
                                        type: mt.objects.TEXT,
                                        text: 2,
                                        style: n,
                                        x: 708,
                                        y: 398,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 1462,
                                        y: 274,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 1462,
                                        y: 327,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 1462,
                                        y: 381,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 436,
                                        y: 738,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 436,
                                        y: 791,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 436,
                                        y: 845,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 822,
                                        y: 738,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 822,
                                        y: 791,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 822,
                                        y: 845,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 1194,
                                        y: 738,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 1194,
                                        y: 791,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 1194,
                                        y: 845,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 1588,
                                        y: 738,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 1588,
                                        y: 791,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 1588,
                                        y: 845,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableWild5",
                                        type: mt.objects.TEXT,
                                        class: "ps0-5",
                                        style: s,
                                        x: 737,
                                        y: 235,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableWild4",
                                        type: mt.objects.TEXT,
                                        class: "ps0-4",
                                        style: s,
                                        x: 737,
                                        y: 289,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableWild3",
                                        type: mt.objects.TEXT,
                                        class: "ps0-3",
                                        style: s,
                                        x: 737,
                                        y: 342,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableWild3",
                                        type: mt.objects.TEXT,
                                        class: "ps0-2",
                                        style: s,
                                        x: 737,
                                        y: 398,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableBonus5",
                                        type: mt.objects.TEXT,
                                        class: "ps1s-5",
                                        style: s,
                                        x: 1490,
                                        y: 274,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableBonus4",
                                        type: mt.objects.TEXT,
                                        class: "ps1s-4",
                                        style: s,
                                        x: 1490,
                                        y: 327,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableBonus3",
                                        type: mt.objects.TEXT,
                                        class: "ps1s-3",
                                        style: s,
                                        x: 1490,
                                        y: 381,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableSeven5",
                                        type: mt.objects.TEXT,
                                        class: "ps2-5",
                                        style: s,
                                        x: 460,
                                        y: 738,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableSeven4",
                                        type: mt.objects.TEXT,
                                        class: "ps2-4",
                                        style: s,
                                        x: 460,
                                        y: 791,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableSeven3",
                                        type: mt.objects.TEXT,
                                        class: "ps2-3",
                                        style: s,
                                        x: 460,
                                        y: 845,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytable3Bar5",
                                        type: mt.objects.TEXT,
                                        class: "ps3-5",
                                        style: s,
                                        x: 852,
                                        y: 738,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytable3Bar4",
                                        type: mt.objects.TEXT,
                                        class: "ps3-4",
                                        style: s,
                                        x: 852,
                                        y: 791,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytable3Bar3",
                                        type: mt.objects.TEXT,
                                        class: "ps3-3",
                                        style: s,
                                        x: 852,
                                        y: 845,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytable2Bar5",
                                        type: mt.objects.TEXT,
                                        class: "ps4-5",
                                        style: s,
                                        x: 1220,
                                        y: 738,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytable2Bar4",
                                        type: mt.objects.TEXT,
                                        class: "ps4-4",
                                        style: s,
                                        x: 1220,
                                        y: 791,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytable2Bar3",
                                        type: mt.objects.TEXT,
                                        class: "ps4-3",
                                        style: s,
                                        x: 1220,
                                        y: 845,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytable1Bar5",
                                        type: mt.objects.TEXT,
                                        class: "ps5-5",
                                        style: s,
                                        x: 1616,
                                        y: 738,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytable1Bar4",
                                        type: mt.objects.TEXT,
                                        class: "ps5-4",
                                        style: s,
                                        x: 1616,
                                        y: 791,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytable1Bar3",
                                        type: mt.objects.TEXT,
                                        class: "ps5-3",
                                        style: s,
                                        x: 1616,
                                        y: 845,
                                        anchorY: .5
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "page1Container",
                                    contents: [{
                                        name: "paytableNameText",
                                        type: mt.objects.TEXT,
                                        text: "PAYTABLE_help",
                                        style: e,
                                        x: 960,
                                        y: 52,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page1image1",
                                        assetKey: "page1image1",
                                        x: 370,
                                        y: 165
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page1image2",
                                        assetKey: "page1image2",
                                        x: 760,
                                        y: 165
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page1image3",
                                        assetKey: "page1image3",
                                        x: 1160,
                                        y: 165
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page1image4",
                                        assetKey: "page1image4",
                                        x: 210,
                                        y: 560
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page1image5",
                                        assetKey: "page1image5",
                                        x: 580,
                                        y: 560
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page1image6",
                                        assetKey: "page1image6",
                                        x: 945,
                                        y: 560
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page1image7",
                                        assetKey: "page1image7",
                                        x: 1305,
                                        y: 560
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 640,
                                        y: 265,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 640,
                                        y: 320,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 640,
                                        y: 372,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 1035,
                                        y: 265,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 1035,
                                        y: 320,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 1035,
                                        y: 372,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 1440,
                                        y: 265,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 1440,
                                        y: 320,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 1440,
                                        y: 372,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableStrawberry5",
                                        type: mt.objects.TEXT,
                                        class: "ps6-5",
                                        style: s,
                                        x: 670,
                                        y: 265,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableStrawberry4",
                                        type: mt.objects.TEXT,
                                        class: "ps6-4",
                                        style: s,
                                        x: 670,
                                        y: 320,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableStrawberry3",
                                        type: mt.objects.TEXT,
                                        class: "ps6-3",
                                        style: s,
                                        x: 670,
                                        y: 372,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableWatermelon5",
                                        type: mt.objects.TEXT,
                                        class: "ps7-5",
                                        style: s,
                                        x: 1063,
                                        y: 265,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableWatermelon4",
                                        type: mt.objects.TEXT,
                                        class: "ps7-4",
                                        style: s,
                                        x: 1063,
                                        y: 320,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableWatermelon3",
                                        type: mt.objects.TEXT,
                                        class: "ps7-3",
                                        style: s,
                                        x: 1063,
                                        y: 372,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableBell5",
                                        type: mt.objects.TEXT,
                                        class: "ps8-5",
                                        style: s,
                                        x: 1470,
                                        y: 265,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableBell4",
                                        type: mt.objects.TEXT,
                                        class: "ps8-4",
                                        style: s,
                                        x: 1470,
                                        y: 320,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableBell3",
                                        type: mt.objects.TEXT,
                                        class: "ps8-3",
                                        style: s,
                                        x: 1470,
                                        y: 372,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 478,
                                        y: 650,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 478,
                                        y: 705,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 478,
                                        y: 758,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 851,
                                        y: 650,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 851,
                                        y: 705,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 851,
                                        y: 758,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 1222,
                                        y: 650,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 1222,
                                        y: 705,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 1222,
                                        y: 758,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber5",
                                        type: mt.objects.TEXT,
                                        text: 5,
                                        style: n,
                                        x: 1597,
                                        y: 650,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber4",
                                        type: mt.objects.TEXT,
                                        text: 4,
                                        style: n,
                                        x: 1597,
                                        y: 705,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textNumber3",
                                        type: mt.objects.TEXT,
                                        text: 3,
                                        style: n,
                                        x: 1597,
                                        y: 758,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableLemon5",
                                        type: mt.objects.TEXT,
                                        class: "ps9-5",
                                        style: s,
                                        x: 502,
                                        y: 650,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableLemon4",
                                        type: mt.objects.TEXT,
                                        class: "ps9-4",
                                        style: s,
                                        x: 502,
                                        y: 705,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableLemon3",
                                        type: mt.objects.TEXT,
                                        class: "ps9-3",
                                        style: s,
                                        x: 502,
                                        y: 758,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytablePlum5",
                                        type: mt.objects.TEXT,
                                        class: "ps10-5",
                                        style: s,
                                        x: 877,
                                        y: 650,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytablePlum4",
                                        type: mt.objects.TEXT,
                                        class: "ps10-4",
                                        style: s,
                                        x: 877,
                                        y: 705,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytablePlum3",
                                        type: mt.objects.TEXT,
                                        class: "ps10-3",
                                        style: s,
                                        x: 877,
                                        y: 758,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableOrange5",
                                        type: mt.objects.TEXT,
                                        class: "ps11-5",
                                        style: s,
                                        x: 1248,
                                        y: 650,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableOrange4",
                                        type: mt.objects.TEXT,
                                        class: "ps11-4",
                                        style: s,
                                        x: 1248,
                                        y: 705,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableOrange3",
                                        type: mt.objects.TEXT,
                                        class: "ps11-3",
                                        style: s,
                                        x: 1248,
                                        y: 758,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableCherry5",
                                        type: mt.objects.TEXT,
                                        class: "ps12-5",
                                        style: s,
                                        x: 1620,
                                        y: 650,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableCherry4",
                                        type: mt.objects.TEXT,
                                        class: "ps12-4",
                                        style: s,
                                        x: 1620,
                                        y: 705,
                                        anchorY: .5
                                    }, {
                                        name: "textPaytableCherry3",
                                        type: mt.objects.TEXT,
                                        class: "ps12-3",
                                        style: s,
                                        x: 1620,
                                        y: 758,
                                        anchorY: .5
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "page2Container",
                                    contents: [{
                                        name: "paytableNameText",
                                        type: mt.objects.TEXT,
                                        text: "BONUS_FEATURE",
                                        style: e,
                                        x: 960,
                                        y: 52,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page2image0",
                                        assetKey: "page2image0",
                                        x: 224,
                                        y: 239
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page2image1",
                                        assetKey: "page2image1",
                                        x: 978,
                                        y: 239
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textBonus",
                                        text: "3_4_or_5_Scatters",
                                        style: t,
                                        x: 960,
                                        y: 788,
                                        anchorX: .5,
                                        anchorY: .5
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "page3Container",
                                    contents: [{
                                        name: "rulesNameText",
                                        type: mt.objects.TEXT,
                                        text: "RULES_help",
                                        style: e,
                                        x: 960,
                                        y: 52,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "rulesText",
                                        text: "All_prizes_are_for_combinations",
                                        style: {
                                            font: "36pt futuraptmedium",
                                            fill: 16777215,
                                            align: "center"
                                        },
                                        x: 960,
                                        y: 500,
                                        anchorX: .5,
                                        anchorY: .5,
                                        lineHeight: 40
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "rtpTextRU",
                                        text: nge.i18n.get("rtpRU"),
                                        class: "rtpInfo",
                                        style: {
                                            font: "36pt futuraptmedium",
                                            fill: 16777215,
                                            align: "center"
                                        },
                                        x: 960,
                                        y: 780,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "rtpTextEN",
                                        text: nge.i18n.get("rtpEN"),
                                        class: "rtpInfo",
                                        style: {
                                            font: "36pt futuraptmedium",
                                            fill: 16777215,
                                            align: "center"
                                        },
                                        x: 960,
                                        y: 802,
                                        anchorX: .5,
                                        anchorY: .5
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "page4Container",
                                    contents: [{
                                        name: "paylineNameText",
                                        type: mt.objects.TEXT,
                                        text: "PAYLINE_help",
                                        style: e,
                                        x: 960,
                                        y: 52,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image0",
                                        assetKey: "page4image0",
                                        x: 300,
                                        y: 174
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image1",
                                        assetKey: "page4image1",
                                        x: 661,
                                        y: 174
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image2",
                                        assetKey: "page4image2",
                                        x: 1e3,
                                        y: 174
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image3",
                                        assetKey: "page4image3",
                                        x: 1349,
                                        y: 174
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image4",
                                        assetKey: "page4image4",
                                        x: 300,
                                        y: 444
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image5",
                                        assetKey: "page4image5",
                                        x: 651,
                                        y: 444
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image6",
                                        assetKey: "page4image6",
                                        x: 1e3,
                                        y: 444
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image7",
                                        assetKey: "page4image7",
                                        x: 1349,
                                        y: 444
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image8",
                                        assetKey: "page4image8",
                                        x: 651,
                                        y: 700
                                    }, {
                                        type: mt.objects.IMAGE,
                                        name: "page4image9",
                                        assetKey: "page4image9",
                                        x: 1e3,
                                        y: 700
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber1",
                                        text: 1,
                                        style: a,
                                        x: 280,
                                        y: 201,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber2",
                                        text: 2,
                                        style: a,
                                        x: 630,
                                        y: 201,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber3",
                                        text: 3,
                                        style: a,
                                        x: 978,
                                        y: 201,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber4",
                                        text: 4,
                                        style: a,
                                        x: 1331,
                                        y: 201,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber5",
                                        text: 5,
                                        style: a,
                                        x: 280,
                                        y: 475,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber6",
                                        text: 6,
                                        style: a,
                                        x: 630,
                                        y: 475,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber7",
                                        text: 7,
                                        style: a,
                                        x: 978,
                                        y: 475,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber8",
                                        text: 8,
                                        style: a,
                                        x: 1331,
                                        y: 475,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber9",
                                        text: 9,
                                        style: a,
                                        x: 630,
                                        y: 731,
                                        anchorX: .5,
                                        anchorY: .5
                                    }, {
                                        type: mt.objects.TEXT,
                                        name: "textNumber10",
                                        text: 10,
                                        style: a,
                                        x: 978,
                                        y: 731,
                                        anchorX: .5,
                                        anchorY: .5
                                    }]
                                }]
                            }, {
                                type: mt.objects.NINE_SLICE,
                                name: "nameBg",
                                assetKey: "nameBg1",
                                bottom: 12,
                                top: 12,
                                left: 12,
                                right: 12,
                                height: 100,
                                width: 1920
                            }, {
                                type: mt.objects.GROUP,
                                name: "paginationInfoContainer",
                                contents: [{
                                    type: 14,
                                    name: "pageInfoOnePlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 0,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 841,
                                    y: 910,
                                    action: "function(){nge.observer.fire('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoTwoPlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 1,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 891,
                                    y: 910,
                                    action: "function(){nge.observer.add('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoThreePlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 2,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 941,
                                    y: 910,
                                    action: "function(){nge.observer.add('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoFourPlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 3,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 991,
                                    y: 910,
                                    action: "function(){nge.observer.add('radiobutton.click.helpCarousel', _selectPage);}"
                                }, {
                                    type: 14,
                                    name: "pageInfoFivePlate",
                                    assetKey: "pageInfoPlate",
                                    groupName: "helpCarousel",
                                    selection: 4,
                                    btnFrames: {
                                        over: 0,
                                        out: 0,
                                        down: 0
                                    },
                                    pixelPerfectClick: !1,
                                    pixelPerfectOver: !1,
                                    x: 1041,
                                    y: 910,
                                    action: "function(){nge.observer.add('radiobutton.click.helpCarousel', _selectPage);}"
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "buttonsHelpContainer",
                                y: 469,
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "leftButtonsHelpContainer",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "infoPrevButtonButton",
                                        assetKey: "infoNextButton",
                                        btnFrames: {
                                            over: 2,
                                            out: 1,
                                            down: 0
                                        },
                                        pixelPerfectClick: !1,
                                        pixelPerfectOver: !1,
                                        x: 132,
                                        scaleX: -1,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "infoPrev");}'
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "rightButtonsHelpContainer",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "infoNextButtonButton",
                                        assetKey: "infoNextButton",
                                        btnFrames: {
                                            over: 2,
                                            out: 1,
                                            down: 0
                                        },
                                        pixelPerfectClick: !1,
                                        pixelPerfectOver: !1,
                                        x: 1788,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "infoNext");}'
                                    }]
                                }]
                            }]
                        }]
                    }
                }
            }
        },
        1243: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Mobile = {}
        },
        1244: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Mobile.Help = function() {
                var e = nge.appPath + "img/";
                return {
                    styles: {},
                    assets: {
                        name: "assets",
                        contents: [{
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "1px_empty",
                            fullPath: e + "1px_empty.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "fake_end_px",
                            fullPath: e + "1px_empty.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "infoMobileNextButton",
                            fullPath: e + "playarea/1px_empty.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "pageInfoPlate",
                            fullPath: e + "playarea/1px_empty.png",
                            frameHeight: 40
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "nameBg1_asset",
                            fullPath: e + "playarea/1px_empty.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page0image0",
                            fullPath: e + "playarea/page0image0.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page0image1",
                            fullPath: e + "playarea/page0image1.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page0image2",
                            fullPath: e + "playarea/page0image2.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page0image3",
                            fullPath: e + "playarea/page0image3.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page0image4",
                            fullPath: e + "playarea/page0image4.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page1image0",
                            fullPath: e + "playarea/page1image0.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page1image1",
                            fullPath: e + "playarea/page1image1.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page1image2",
                            fullPath: e + "playarea/page1image2.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page1image3",
                            fullPath: e + "playarea/page1image3.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page1image4",
                            fullPath: e + "playarea/page1image4.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page1image5",
                            fullPath: e + "playarea/page1image5.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page1image6",
                            fullPath: e + "playarea/page1image6.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "page1image7",
                            fullPath: e + "playarea/page1image7.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: [{
                            type: mt.objects.GROUP,
                            name: "infoContainer",
                            class: "infoContainer",
                            contents: [{
                                type: mt.objects.GROUP,
                                name: "pagesInfoContainer",
                                class: "pagesInfoContainer",
                                rewParams: {
                                    dragScrollSensivity: 1e-4
                                },
                                swipe: 2,
                                width: 1720,
                                height: 1080,
                                x: 100,
                                contents: []
                            }, {
                                type: mt.objects.IMAGE,
                                name: "1px_empty",
                                assetKey: "1px_empty"
                            }, {
                                type: mt.objects.IMAGE,
                                name: "nameBg1_asset",
                                assetKey: "nameBg1_asset"
                            }, {
                                type: mt.objects.NINE_SLICE,
                                name: "nameBg",
                                assetKey: "nameBg1",
                                bottom: 12,
                                top: 12,
                                left: 12,
                                right: 12,
                                height: 100,
                                width: 1920
                            }, {
                                type: mt.objects.GROUP,
                                name: "paginationInfoContainer",
                                contents: [{
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoOnePlate",
                                    assetKey: "pageInfoPlate",
                                    x: 841,
                                    y: 913
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoTwoPlate",
                                    assetKey: "pageInfoPlate",
                                    x: 891,
                                    y: 913
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoThreePlate",
                                    assetKey: "pageInfoPlate",
                                    x: 941,
                                    y: 913
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoFourPlate",
                                    assetKey: "pageInfoPlate",
                                    x: 991,
                                    y: 913
                                }, {
                                    type: mt.objects.IMAGE,
                                    name: "pageInfoFivePlate",
                                    assetKey: "pageInfoPlate",
                                    x: 1041,
                                    y: 913
                                }]
                            }, {
                                type: mt.objects.GROUP,
                                name: "buttonsHelpContainer",
                                y: 219,
                                contents: [{
                                    type: mt.objects.GROUP,
                                    name: "leftButtonsHelpContainer",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "infoPrevButtonButton",
                                        assetKey: "infoMobileNextButton",
                                        btnFrames: {
                                            over: 2,
                                            out: 1,
                                            down: 0
                                        },
                                        pixelPerfectClick: !1,
                                        pixelPerfectOver: !1,
                                        x: 132,
                                        scaleX: -1,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "infoPrev");}'
                                    }]
                                }, {
                                    type: mt.objects.GROUP,
                                    name: "rightButtonsHelpContainer",
                                    contents: [{
                                        type: mt.objects.BUTTON,
                                        name: "infoNextButtonButton",
                                        assetKey: "infoMobileNextButton",
                                        btnFrames: {
                                            over: 2,
                                            out: 1,
                                            down: 0
                                        },
                                        pixelPerfectClick: !1,
                                        pixelPerfectOver: !1,
                                        x: 1788,
                                        action: 'function(){nge.observer.fire("buttons.pressCommand", "infoNext");}'
                                    }]
                                }]
                            }]
                        }]
                    }
                }
            }
        },
        1245: function(e, t) {
            nge.App[nge.appNS].Tpl.Groups.Mobile.Intro = function() {
                var e = new nge.App.DjGameBase.Tpl.Groups.Mobile.Intro;
                return nge.Lib.Helper.tplSetContainerContents(e, "introUniqueContent", [{
                    type: mt.objects.TEXT,
                    name: "introScreenTextCenter",
                    class: "introScreenTextCenter coloredText",
                    text: nge.i18n.get("SCATTERS_TRIGGER_THE_FREE_SPINS"),
                    anchorX: .5,
                    anchorY: .5,
                    maxWidth: 1050,
                    x: 0,
                    style: {
                        font: "52pt futuraptheavy",
                        fill: 16503134,
                        align: "center",
                        shadowColor: 4787766,
                        shadowBlur: 6,
                        shadowOffsetY: 2,
                        stroke: 13268319,
                        strokeThickness: 6,
                        lineHeight: 85
                    }
                }]), e
            }
        },
        1246: function(e, t) {
            nge.App[nge.appNS].Tpl.States = {}
        },
        1247: function(e, t) {
            nge.App[nge.appNS].Tpl.States.Demo = function() {
                var e = nge.appPath + "img/";
                return {
                    assets: {
                        name: "assets",
                        contents: [nge.Lib.Helper.mobileAndTabletCheck() ? {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "demoPlayButtonMobile",
                            fullPath: e + "playarea/demoPlayButtonMobile.png",
                            frameWidth: 560
                        } : {
                            type: mt.assets.IMAGE,
                            key: "demoPlayButton",
                            block: mt.assets.blocks.STATIC,
                            fullPath: e + "playarea/demoPlayButton.png",
                            frameWidth: 240,
                            frameHeight: 112
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "introScreenArrow",
                            fullPath: e + "playarea/introScreenArrow.png"
                        }, {
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            key: "frameIntroScreen",
                            fullPath: e + "playarea/frameIntroScreen.png"
                        }]
                    },
                    objects: {
                        name: "objects",
                        contents: []
                    }
                }
            }
        },
        1248: function(e, t) {
            nge.App[nge.appNS].Tpl.States.Play = function() {
                var e = nge.appPath + "img/",
                    t = new nge.App.DjGameBase.Tpl.States.Play;
                t.assets.contents.push({
                    type: mt.assets.IMAGE,
                    block: mt.assets.blocks.STATIC,
                    key: "reelsVertical",
                    fullPath: e + "playarea/reelsVertical.png"
                }, {
                    type: mt.assets.IMAGE,
                    block: mt.assets.blocks.STATIC,
                    key: "verticalGameLogo",
                    fullPath: e + "playarea/verticalGameLogo.png"
                }), nge.Lib.Helper.tplObjFind(t, "logoPortraitContainer").contents = [{
                    type: mt.objects.IMAGE,
                    name: "playareaLogoVertical",
                    assetKey: "verticalGameLogo",
                    anchorX: .5,
                    anchorY: .5,
                    y: 300
                }], e = nge.Lib.Helper.tplObjFind(t, "playParentGroup");
                var n = nge.Lib.Helper.recursiveTplObjFind(e, "name", "spinificationAboveAnimationContainer");
                return e.contents.splice(n.index, 1), n = nge.Lib.Helper.recursiveTplObjFind(e, "name", "spinificationBelowAnimationContainer"), e.contents.splice(n.index, 1), t
            }
        },
        1249: function(e, t) {
            nge.App[nge.appNS].Tpl.States.LoadAssets = function() {
                var e = nge.appPath + "img/",
                    t = nge.Lib.Helper.mobileAndTabletCheck(),
                    n = {
                        name: "assets",
                        contents: []
                    };
                return [].forEach((function(t) {
                    n.contents.push({
                        type: mt.assets.ATLAS,
                        block: mt.assets.blocks.STATIC,
                        key: t,
                        atlas: e + "atlases/" + t + ".json",
                        fullPath: e + "atlases/" + t + ".png"
                    })
                })), t && n.contents.push({
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.STATIC,
                    key: "sidebar",
                    atlas: e + "atlases/sidebar.json",
                    fullPath: e + "atlases/sidebar.png"
                }), n.contents.push({
                    type: mt.assets.ATLAS,
                    block: t ? mt.assets.blocks.STATIC : mt.assets.blocks.PAYTABLE,
                    key: "paytable",
                    atlas: e + "atlases/paytable.json",
                    fullPath: e + "atlases/paytable.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.STATIC,
                    key: "paytable_buttons",
                    atlas: e + "atlases/paytable_buttons.json",
                    fullPath: e + "atlases/paytable_buttons.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.STATIC,
                    key: "play",
                    atlas: e + "atlases/play.json",
                    fullPath: e + "atlases/play.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.STATIC,
                    key: "symbols_static",
                    atlas: e + "atlases/symbols_static.json",
                    fullPath: e + "atlases/symbols_static.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.STATIC,
                    key: "symbols_static_blur",
                    atlas: e + "atlases/symbols_static_blur.json",
                    fullPath: e + "atlases/symbols_static_blur.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.STATIC,
                    key: "ui",
                    atlas: e + (t ? "atlases/ui_mobile.json" : "atlases/ui.json"),
                    fullPath: e + (t ? "atlases/ui_mobile.png" : "atlases/ui.png")
                }), n.contents.push({
                    type: mt.assets.IMAGE,
                    block: mt.assets.blocks.STATIC,
                    key: "popupJackpot",
                    fullPath: e + "jackpot/images/jackpotPopup.png"
                }, {
                    type: mt.assets.IMAGE,
                    block: mt.assets.blocks.STATIC,
                    key: "bgArea",
                    fullPath: e + "atlases/bgArea.jpg"
                }, {
                    type: mt.assets.IMAGE,
                    block: mt.assets.blocks.STATIC,
                    key: "page2image0",
                    fullPath: e + "atlases/help_0.jpg"
                }, {
                    type: mt.assets.IMAGE,
                    block: mt.assets.blocks.STATIC,
                    key: "page2image1",
                    fullPath: e + "atlases/help_1.jpg"
                }, {
                    type: mt.assets.IMAGE,
                    block: mt.assets.blocks.STATIC,
                    key: "loading-progress-bar",
                    fullPath: e + "atlases/loading-progress-bar.png"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m00_000",
                    spine: e + "spine/symbols/m00_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m01_000",
                    spine: e + "spine/symbols/m01_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m02_000",
                    spine: e + "spine/symbols/m02_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m03_000",
                    spine: e + "spine/symbols/m03_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m04_000",
                    spine: e + "spine/symbols/m04_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m05_000",
                    spine: e + "spine/symbols/m05_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m06_000",
                    spine: e + "spine/symbols/m06_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m07_000",
                    spine: e + "spine/symbols/m07_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m08_000",
                    spine: e + "spine/symbols/m08_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m09_000",
                    spine: e + "spine/symbols/m09_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m10_000",
                    spine: e + "spine/symbols/m10_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m11_000",
                    spine: e + "spine/symbols/m11_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m12_000",
                    spine: e + "spine/symbols/m12_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m13_000",
                    spine: e + "spine/symbols/m13_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m14_000",
                    spine: e + "spine/symbols/m14_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m15_000",
                    spine: e + "spine/symbols/m15_000.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "m16_000",
                    spine: e + "spine/symbols/m16_000.json",
                    packed: !0
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "symbols0",
                    atlas: e + "spine/symbols/symbols0.json",
                    fullPath: e + "spine/symbols/symbols0.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "symbols1",
                    atlas: e + "spine/symbols/symbols1.json",
                    fullPath: e + "spine/symbols/symbols1.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "symbols2",
                    atlas: e + "spine/symbols/symbols2.json",
                    fullPath: e + "spine/symbols/symbols2.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "symbols3",
                    atlas: e + "spine/symbols/symbols3.json",
                    fullPath: e + "spine/symbols/symbols3.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "symbols4",
                    atlas: e + "spine/symbols/symbols4.json",
                    fullPath: e + "spine/symbols/symbols4.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "symbols5",
                    atlas: e + "spine/symbols/symbols5.json",
                    fullPath: e + "spine/symbols/symbols5.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "symbols6",
                    atlas: e + "spine/symbols/symbols6.json",
                    fullPath: e + "spine/symbols/symbols6.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "symbols7",
                    atlas: e + "spine/symbols/symbols7.json",
                    fullPath: e + "spine/symbols/symbols7.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SYMBOLS_ANIMATION,
                    key: "symbols8",
                    atlas: e + "spine/symbols/symbols8.json",
                    fullPath: e + "spine/symbols/symbols8.png"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "maingame_animation",
                    spine: e + "spine/background/maingame_animation.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "fs_background_animation",
                    spine: e + "spine/background/fs_animation.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "spinification_below",
                    spine: e + "spine/spinification/spinification_below.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "spinification_above",
                    spine: e + "spine/spinification/spinification_above.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "popupSpineBackground",
                    spine: e + "spine/animatedPopup/animatedPopup.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_0",
                    spine: e + "spine/winlines/winline_0.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_1",
                    spine: e + "spine/winlines/winline_1.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_2",
                    spine: e + "spine/winlines/winline_2.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_3",
                    spine: e + "spine/winlines/winline_3.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_4",
                    spine: e + "spine/winlines/winline_4.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_5",
                    spine: e + "spine/winlines/winline_5.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_6",
                    spine: e + "spine/winlines/winline_6.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_7",
                    spine: e + "spine/winlines/winline_7.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_8",
                    spine: e + "spine/winlines/winline_8.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.STATIC,
                    key: "winline_9",
                    spine: e + "spine/winlines/winline_9.json"
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SPINE_ANIMATION,
                    key: "bigWinAnim",
                    spine: e + "spine/bigWin/big_win.json",
                    packed: !0
                }, {
                    type: mt.assets.SPINE,
                    block: mt.assets.blocks.SPINE_ANIMATION,
                    key: "bigWinFlareAnim",
                    spine: e + "spine/bigWin/bigwin_flare.json",
                    packed: !0
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SPINE_ANIMATION,
                    key: "big_win_animations_png0",
                    atlas: e + "spine/bigWin/big_win_animations_png0.json",
                    fullPath: e + "spine/bigWin/big_win_animations_png0.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SPINE_ANIMATION,
                    key: "big_win_animations_png1",
                    atlas: e + "spine/bigWin/big_win_animations_png1.json",
                    fullPath: e + "spine/bigWin/big_win_animations_png1.png"
                }, {
                    type: mt.assets.ATLAS,
                    block: mt.assets.blocks.SPINE_ANIMATION,
                    key: "big_win_animations_jpg_p",
                    atlas: e + "spine/bigWin/big_win_animations_jpg_p.json",
                    fullPath: e + "spine/bigWin/big_win_animations_jpg_p.jpg"
                }), {
                    assets: n,
                    objects: {
                        name: "objects",
                        contents: []
                    }
                }
            }
        },
        1250: function(e, t) {
            nge.App[nge.appNS].Mlm = {}
        },
        1251: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain = {}
        },
        1252: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Main = nge.Mlm.Brain.Main.extend((function() {
                var e = function(e) {
                    if (e && e.data && e.data.lastResponse && e.data.lastResponse.params && e.data.lastResponse.params.wildMultipliers) {
                        var t = e.data.lastResponse.params.wildMultipliers;
                        if ("FreeSpins" === e.data.lastResponse.state)
                            for (var n = 0; n < e.data.gameParameters.initialSymbols.length; n++) "-1" !== t[n] && (e.data.gameParameters.initialSymbols[n][2] = "0_x" + t[n])
                    }
                };
                this.subscribe = function() {
                    nge.observer.add("transportMessage.AuthResponse", e, !1, !0), this.super.subscribe()
                }
            }))
        },
        1253: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Slot = nge.App.DjGameBase.Mlm.Brain.Slot.extend((function() {
                var e = this;
                this.canIntrigue = !0, this.customIntrigueLogic = function(e, t, n) {
                    return this.super.customIntrigueLogic(e, t, n), !0 === n.status && (n.endsFrom = 5, nge.localData.set("slotMachineIntrigue", n)), n
                }, this.runBonusRoutine = function(t) {
                    return nge.localData.set("bonusWon", !0), nge.localData.set("slotMachineResponseBonusSpin", !0), e.triggerRoutineCheck(t), "ReSpins" === t.state || "PickBonus" === t.state ? e.runBonusGame() : "FreeSpins" !== t.state || nge.localData.get("freespin.inProgress") ? nge.localData.set("slotMachineResponseBonusSpin", !1) : (e.bonusGameTriggered = !0, e.runBonusGame()), !0
                }, this.tryToChangeQuery = function() {
                    if (e.bonusGameTriggered) {
                        var t = nge.Lib.Helper.jsObjClone(nge.localData.get("slotMachine"));
                        t.slotWin.lineWinAmounts = [], nge.observer.fire("winlines.setNewQuery", t), nge.observer.fire("winlines.animateByOne.cycleComplete", null, 200)
                    }
                };
                var t = function(e) {
                    e.data && (e.data.slotWin && e.data.slotWin.lineWinAmounts && e.data.slotWin.lineWinAmounts.forEach((function(e) {
                        "LinePickBonus" === e.type && e.bonusName && "FullLineJackpot" === e.bonusName && (e.type = "LineWinAmount", delete e.bonusName)
                    })), nge.localData.get("freespin.inProgress") && e.data.params && e.data.params.wildMultipliers && (e.data.spinResult.rows = function(e, t) {
                        for (var n = 0; n < e.length; n++) "-1" !== t[n] && (e[n][2] = "0_x" + t[n]);
                        return e
                    }(e.data.spinResult.rows, e.data.params.wildMultipliers)))
                };
                this.subscribe = function() {
                    nge.observer.add("transportMessage.SpinResponse", t, !1, !0), nge.observer.add("transportMessage.FreeSpinResponse", t, !1, !0), e.super.subscribe()
                }, this.checkIfBonus = function() {
                    var t = e.super.checkIfBonus();
                    return nge.localData.set("slotMachine.hasBonus", t), t
                }
            }))
        },
        1254: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Sounds = nge.App.DjGameBase.Mlm.Brain.Sounds.extend((function() {
                var e = this,
                    t = 0;
                this.wheelSpinSoundCount = 1, this.reelsCount = 5, this.triggersNeededForBonus = this.triggerReelsCount = 3, this.scatterSymbols = ["1"];
                var n = 0,
                    s = [],
                    a = !1,
                    o = 0;
                this.counterSounds = [], this.spinGameBackgroundSound.push({
                    s: "bs_background",
                    e: "popupFinish.animate.start",
                    action: "play",
                    loop: !0
                }), this.popupSounds = [{
                    s: "start_freespins_popup",
                    e: "freespin.popupStart.show"
                }, {
                    s: "finish_freespins_popup",
                    e: "popupFinish.animate.start"
                }, {
                    s: "popup_disappear",
                    e: "popup.hideStart"
                }], this.buttonsClickSounds = [{
                    s: "click",
                    e: "button.clickSound",
                    relaunch: !0
                }, {
                    s: "click",
                    e: "button.click",
                    relaunch: !0
                }, {
                    s: "hover_0",
                    e: "button.hover_0"
                }, {
                    s: "hover_1",
                    e: "button.hover_1"
                }, {
                    s: "hover_2",
                    e: "button.hover_2"
                }, {
                    s: "spin_click",
                    e: "sound.spin_click.play",
                    relaunch: !0
                }, {
                    s: "spin_stop",
                    e: "sound.stop_click.play",
                    relaunch: !0
                }], this.scatterSounds = [{
                    s: "scatter_0",
                    e: "sound.scatter_0.play"
                }, {
                    s: "scatter_1",
                    e: "sound.scatter_1.play"
                }, {
                    s: "scatter_2",
                    e: "sound.scatter_2.play"
                }, {
                    s: "scatter_3",
                    e: "sound.scatter_3.play"
                }, {
                    s: "scatter_4",
                    e: "sound.scatter_4.play"
                }], this.intrigueSounds = [{
                    s: "spinification_0",
                    e: "sound.spinification_0.play",
                    relaunch: !0
                }, {
                    s: "spinification_1",
                    e: "sound.spinification_1.play",
                    relaunch: !0
                }, {
                    s: "spinification_2",
                    e: "sound.spinification_2.play",
                    relaunch: !0
                }, {
                    s: "spinification_0",
                    e: "sound.spinification_0.stop"
                }, {
                    s: "spinification_1",
                    e: "sound.spinification_1.stop"
                }, {
                    s: "spinification_2",
                    e: "sound.spinification_2.stop"
                }, {
                    s: "spinification_0",
                    e: "slotMachine.reel_4.animation.stop",
                    action: "stop"
                }, {
                    s: "spinification_1",
                    e: "slotMachine.reel_4.animation.stop",
                    action: "stop"
                }, {
                    s: "spinification_2",
                    e: "slotMachine.reel_4.animation.stop",
                    action: "stop"
                }], this.bigWinSounds.push({
                    s: "big_win_start",
                    e: "win.big.show"
                }), this.regularWinSounds = [{
                    s: "win_regularWinLow",
                    e: "sounds.win.regularWinLow",
                    action: "play",
                    relaunch: !0
                }, {
                    s: "win_regularWinMid",
                    e: "sounds.win.regularWinMid",
                    action: "play",
                    relaunch: !0
                }, {
                    s: "win_regularWinHigh",
                    e: "sounds.win.regularWinHigh",
                    action: "play",
                    relaunch: !0
                }], this.layerSwitcherHandler = function(e) {
                    switch (e) {
                        case "intro":
                            nge.observer.fire("introSound.Play");
                            break;
                        case "game":
                        case "gameOffer":
                            nge.observer.fire("introSound.Stop"), nge.observer.fire("bs_background.play"), nge.observer.fire("sound.volume", {
                                s: "bs_background",
                                volume: 1
                            }), nge.observer.fire("sound.volume", {
                                s: "bn_background",
                                volume: 1
                            });
                            break;
                        case "gameFreeSpin":
                            nge.observer.fire("introSound.Stop"), nge.observer.fire("bs_background.stop"), nge.observer.fire("bn_background.play")
                    }
                };
                var i = function() {
                        n = 0, s = [], o = 0, a && y()
                    },
                    l = function() {
                        var t = nge.localData.get("freespin.inProgress"),
                            n = nge.Lib.Helper.getRandomInt(0, e.wheelSpinSoundCount - 1);
                        t && nge.observer.fire("slotMachine.reelsStartRandSound." + n)
                    },
                    p = function(t) {
                        return function() {
                            var a = nge.localData.get("slotMachine.spinResult.columns")[t].some((function(t) {
                                    return -1 !== e.scatterSymbols.indexOf(t)
                                })),
                                o = t / Math.round(e.reelsCount / e.scatterReelsCount);
                            a && (s.push(t), e.scattersNeededForFreespins - s.length <= e.scatterReelsCount - 1 - o && (nge.observer.fire("sound.scatter_" + n + ".play"), n++))
                        }
                    },
                    r = function() {
                        e.loopedSounds.forEach((function(t) {
                            e.fadeSound(t, .2, 200)
                        }))
                    },
                    c = function() {
                        e.loopedSounds.forEach((function(t) {
                            e.fadeSound(t, 1, 300)
                        }))
                    },
                    m = function() {
                        a = !0, e.loopedSounds.forEach((function(t) {
                            e.fadeSound(t, .5, 100)
                        }))
                    },
                    y = function() {
                        a && (a = !1, e.loopedSounds.forEach((function(t) {
                            e.fadeSound(t, 1, 100)
                        })))
                    },
                    u = function() {
                        a = !1, o = 0
                    },
                    g = function() {
                        0 < o && nge.observer.fire("sound.spinification_" + (o - 1) + ".stop"), nge.observer.fire("sound.spinification_" + o + ".play"), 3 <= ++o && (o = 0)
                    },
                    b = function() {
                        nge.observer.fire("button.hover_" + t), 3 <= ++t && (t = 0)
                    };
                this.customSubscribe = function() {
                    e.super.customSubscribe(), nge.observer.add("slotMachine.spinCommand", i, !1, !0), nge.observer.add("slotMachine.spinStart", l, !1, !0);
                    for (var t = 0; t < this.reelsCount; t++) nge.observer.add("slotMachine.reel_" + t + ".animation.stop", p(t), !1, !0);
                    nge.observer.add("freespin.popupStart.show", r, !1, !0), nge.observer.add("popupFinish.animate.start", r, !1, !0), nge.observer.add("sound.stopped.start_freespins_popup", c, !1, !0), nge.observer.add("sounds.win.regularWinLow", m, !1, !0), nge.observer.add("sounds.win.regularWinMid", m, !1, !0), nge.observer.add("sounds.win.regularWinHigh", m, !1, !0), nge.observer.add("sound.stopped.win_regularWinLow", y, !1, !0), nge.observer.add("sound.stopped.win_regularWinMid", y, !1, !0), nge.observer.add("sound.stopped.win_regularWinHigh", y, !1, !0), nge.observer.add("slotMachine.reel_2.intrigue.start", g, !1, !0), nge.observer.add("slotMachine.reel_3.intrigue.start", g, !1, !0), nge.observer.add("slotMachine.reel_4.intrigue.start", g, !1, !0), nge.observer.add("Transport.close", u, !1, !0), nge.observer.add("button.hover", b, !1, !0)
                }
            }))
        },
        1255: function(e, t) {
            nge.App[nge.appNS].Mlm.Brain.Win = nge.App.DjGameBase.Mlm.Brain.Win.extend((function() {
                this.regularWinInterruptOnFreespinEnd = !0
            }))
        },
        5: function(e, t, n) {
            n(8), n(1178), n(9), n(8), n(9), n(1179), n(1180), n(1181), n(1182), n(1183), n(1184), n(1185), n(1186), n(1187), n(1188), n(1189), n(1190), n(1191), n(1192), n(1193), n(1194), n(1195), n(1196), n(1197), n(1198), n(1199), n(1200), n(1201), n(1202), n(1203), n(1204), n(1205), n(1206), n(1207), n(1208), n(1209), n(1210), n(1211), n(1212), n(1213), n(1214), n(1215), n(1216), n(1217), n(1218), n(1219), n(1220), n(1221), n(1222), n(1223), n(1224), n(1225), n(1226), n(1227), n(1228), n(1229), n(1230), n(1231), n(1232), n(1233), n(1234), n(1235), n(1236), n(1237), n(1238), n(1239), n(1240), n(1241), n(1242), n(1243), n(1244), n(1245), n(1246), n(1247), n(1248), n(1249), n(1250), n(1251), n(1252), n(1253), n(1254), n(1255)
        },
        8: function(e, t) {
            nge.appNS = "FruitsFury", nge.App[nge.appNS] = {}
        },
        9: function(e, t) {
            nge.App[nge.appNS].Run = nge.App.DjGameBase.Run.extend((function() {
                this.linesCfg = [10], nge.App.addSysInstancesMode("SlimJackpot"), nge.App.DjGameBase && (nge.App[nge.appNS] = nge.Lib.Helper.mergeObjsRecursive(nge.App.DjGameBase, nge.App[nge.appNS])), this.applyClassicGameBase(), this.statesReplacements.play.push("background", "bigWin", "popup", "miniPaytable")
            })), nge.Cfg.Main.project = "fruitsFury", nge.Cfg.Main.title = "Fruits Fury", nge.Cfg.Main.gameCode = "261", nge.Cfg.Main.gameType = "slot", nge.Cfg.Main.slotType = "standart", nge.Cfg.Main.gameVersion = "0.20"
        }
    }
]);