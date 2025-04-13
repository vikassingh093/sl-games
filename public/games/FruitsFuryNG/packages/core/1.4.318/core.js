if (!sessionStorage.getItem('sessionId')) {
    sessionStorage.setItem('sessionId', parseInt(Math.random() * 1000000));
}
var serverString = '';

var XmlHttpRequest = new XMLHttpRequest();
XmlHttpRequest.overrideMimeType("application/json");
XmlHttpRequest.open('GET', '/socket_config.json', false);
XmlHttpRequest.onreadystatechange = function() {
    if (XmlHttpRequest.readyState == 4 && XmlHttpRequest.status == "200") {
        var serverConfig = JSON.parse(XmlHttpRequest.responseText);
        serverString = serverConfig.prefix_ws + serverConfig.host_ws + ':' + serverConfig.port;

    }
}
XmlHttpRequest.send(null);

var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, t, n) {
        e != Array.prototype && e != Object.prototype && (e[t] = n.value)
    }, $jscomp.getGlobal = function(e) {
        return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
    }, $jscomp.global = $jscomp.getGlobal(this), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function() {
        $jscomp.initSymbol = function() {}, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
    }, $jscomp.symbolCounter_ = 0, $jscomp.Symbol = function(e) {
        return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++
    }, $jscomp.initSymbolIterator = function() {
        $jscomp.initSymbol();
        var e = $jscomp.global.Symbol.iterator;
        e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")), "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
            configurable: !0,
            writable: !0,
            value: function() {
                return $jscomp.arrayIterator(this)
            }
        }), $jscomp.initSymbolIterator = function() {}
    }, $jscomp.arrayIterator = function(e) {
        var t = 0;
        return $jscomp.iteratorPrototype((function() {
            return t < e.length ? {
                done: !1,
                value: e[t++]
            } : {
                done: !0
            }
        }))
    }, $jscomp.iteratorPrototype = function(e) {
        return $jscomp.initSymbolIterator(), (e = {
            next: e
        })[$jscomp.global.Symbol.iterator] = function() {
            return this
        }, e
    }, $jscomp.makeIterator = function(e) {
        $jscomp.initSymbolIterator();
        var t = e[Symbol.iterator];
        return t ? t.call(e) : $jscomp.arrayIterator(e)
    }, $jscomp.arrayFromIterator = function(e) {
        for (var t, n = []; !(t = e.next()).done;) n.push(t.value);
        return n
    }, $jscomp.arrayFromIterable = function(e) {
        return e instanceof Array ? e : $jscomp.arrayFromIterator($jscomp.makeIterator(e))
    }, $jscomp.findInternal = function(e, t, n) {
        e instanceof String && (e = String(e));
        for (var i = e.length, o = 0; o < i; o++) {
            var s = e[o];
            if (t.call(n, s, o, e)) return {
                i: o,
                v: s
            }
        }
        return {
            i: -1,
            v: void 0
        }
    }, $jscomp.polyfill = function(e, t, n, i) {
        if (t) {
            for (n = $jscomp.global, e = e.split("."), i = 0; i < e.length - 1; i++) {
                var o = e[i];
                o in n || (n[o] = {}), n = n[o]
            }(t = t(i = n[e = e[e.length - 1]])) != i && null != t && $jscomp.defineProperty(n, e, {
                configurable: !0,
                writable: !0,
                value: t
            })
        }
    }, $jscomp.polyfill("Array.prototype.find", (function(e) {
        return e || function(e, t) {
            return $jscomp.findInternal(this, e, t).v
        }
    }), "es6", "es3"), $jscomp.iteratorFromArray = function(e, t) {
        $jscomp.initSymbolIterator(), e instanceof String && (e += "");
        var n = 0,
            i = {
                next: function() {
                    if (n < e.length) {
                        var o = n++;
                        return {
                            value: t(o, e[o]),
                            done: !1
                        }
                    }
                    return i.next = function() {
                        return {
                            done: !0,
                            value: void 0
                        }
                    }, i.next()
                }
            };
        return i[Symbol.iterator] = function() {
            return i
        }, i
    }, $jscomp.polyfill("Array.prototype.keys", (function(e) {
        return e || function() {
            return $jscomp.iteratorFromArray(this, (function(e) {
                return e
            }))
        }
    }), "es6", "es3"), $jscomp.polyfill("Object.is", (function(e) {
        return e || function(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
        }
    }), "es6", "es3"), $jscomp.polyfill("Array.prototype.includes", (function(e) {
        return e || function(e, t) {
            var n = this;
            n instanceof String && (n = String(n));
            var i = n.length;
            for (t = t || 0; t < i; t++)
                if (n[t] == e || Object.is(n[t], e)) return !0;
            return !1
        }
    }), "es7", "es3"), $jscomp.checkStringArgs = function(e, t, n) {
        if (null == e) throw new TypeError("The 'this' value for String.prototype." + n + " must not be null or undefined");
        if (t instanceof RegExp) throw new TypeError("First argument to String.prototype." + n + " must not be a regular expression");
        return e + ""
    }, $jscomp.polyfill("String.prototype.includes", (function(e) {
        return e || function(e, t) {
            return -1 !== $jscomp.checkStringArgs(this, e, "includes").indexOf(e, t || 0)
        }
    }), "es6", "es3"), $jscomp.polyfill("Array.prototype.fill", (function(e) {
        return e || function(e, t, n) {
            var i = this.length || 0;
            for (0 > t && (t = Math.max(0, i + t)), (null == n || n > i) && (n = i), 0 > (n = Number(n)) && (n = Math.max(0, i + n)), t = Number(t || 0); t < n; t++) this[t] = e;
            return this
        }
    }), "es6", "es3"), $jscomp.polyfill("String.prototype.repeat", (function(e) {
        return e || function(e) {
            var t = $jscomp.checkStringArgs(this, null, "repeat");
            if (0 > e || 1342177279 < e) throw new RangeError("Invalid count value");
            e |= 0;
            for (var n = ""; e;) 1 & e && (n += t), (e >>>= 1) && (t += t);
            return n
        }
    }), "es6", "es3"), $jscomp.polyfill("Array.prototype.findIndex", (function(e) {
        return e || function(e, t) {
            return $jscomp.findInternal(this, e, t).i
        }
    }), "es6", "es3"),
    function(e) {
        function t(i) {
            if (n[i]) return n[i].exports;
            var o = n[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }
        var n = {};
        t.m = e, t.c = n, t.d = function(e, n, i) {
            t.o(e, n) || Object.defineProperty(e, n, {
                enumerable: !0,
                get: i
            })
        }, t.r = function(e) {
            $jscomp.initSymbol(), $jscomp.initSymbol(), "undefined" != typeof Symbol && Symbol.toStringTag && ($jscomp.initSymbol(), Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            })), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, t.t = function(e, n) {
            if (1 & n && (e = t(e)), 8 & n || 4 & n && "object" == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (t.r(i), Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & n && "string" != typeof e)
                for (var o in e) t.d(i, o, function(t) {
                    return e[t]
                }.bind(null, o));
            return i
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 0)
    }([function(e, t, n) {
        n(1), n(2), n(10), n(172), n(198), n(213), window.nge._versions = window.nge._versions || {}, window.nge._versions.core = JSON.stringify("1.4.318") || "local"
    }, function(e, t) {
        window.nge || (window.nge = {})
    }, function(e, t, n) {
        n(3), n(4), n(5), n(6), n(7), n(8), n(9)
    }, function(e, t) {
        nge.Cfg = {}
    }, function(e, t) {
        nge.Cfg.HotPatches = Class.extend((function() {
            this.singleton = !0, this.contents = {
                hotPatchesCfg: 1,
                macOsX11HelperGetOs: 1
            }, this.get = function() {
                return this.contents
            }
        }))
    }, function(e, t) {
        nge.Cfg.Main = {
            _project: "slot",
            _title: "slot",
            _gameCode: "tr3",
            _gameType: "unknown",
            _version: "3.01.003 (build TEAMCITY_BUILD_NUMBER)",
            _apiVersion: "4.20",
            _gameVersion: "1",
            _mode: "development",
            _mobile: !1,
            _lang: "en",
            _langDefault: "en",
            _imagesQualityObeys: !0,
            _forceUpdate: !1,
            _sounds: !0,
            _host: "//" + window.location.hostname,
            _wsType: "WebSocket",
            _wshost: "<SERVERHOST>",
            _wshostDev: serverString,
            _wshostRemote: serverString,
            _sendQueryMode: "single",
            _sendUrl: !1,
            _sendDelay: 0,
            _sendUrlProcessing: !1,
            _orientations: ["album", "portrait"],
            get mode() {
                return this._mode
            },
            set mode(e) {
                return this._mode = e, !0
            },
            get mobile() {
                return this._mobile
            },
            set mobile(e) {
                return this._mobile = e, !0
            },
            get version() {
                return this._version.replace(" (build TEAMCITY_BUILD_NUMBER)", "")
            },
            get apiVersion() {
                return this._apiVersion
            },
            get gameVersion() {
                return this._gameVersion
            },
            set gameVersion(e) {
                return this._gameVersion = e, !0
            },
            get lang() {
                return this._lang
            },
            set lang(e) {
                return this._lang = e, !0
            },
            get langDefault() {
                return this._langDefault
            },
            get sounds() {
                return this._sounds
            },
            get imagesQualityObeys() {
                return this._imagesQualityObeys
            },
            set imagesQualityObeys(e) {
                return this._imagesQualityObeys = e
            },
            get forceUpdate() {
                return this._forceUpdate
            },
            set forceUpdate(e) {
                return this._forceUpdate = e
            },
            get host() {
                return this._host
            },
            get wsType() {
                return this._wsType
            },
            get wshost() {
                return this._wshost
            },
            get wshostDev() {
                return this._wshostDev
            },
            get wshostRemote() {
                return this._wshostRemote
            },
            get ie() {
                return this._ie
            },
            get project() {
                return this._project
            },
            set project(e) {
                return this._project = e, !0
            },
            get title() {
                return this._title
            },
            set title(e) {
                return this._title = e, !0
            },
            get gameCode() {
                return this._gameCode
            },
            set gameCode(e) {
                return this._gameCode = e, !0
            },
            get gameType() {
                return this._gameType
            },
            set gameType(e) {
                return this._gameType = e, !0
            },
            get sendQueryMode() {
                return this._sendQueryMode
            },
            get sendUrl() {
                return this._sendUrl
            },
            get sendUrlProcessing() {
                return this._sendUrlProcessing
            },
            get orientations() {
                return this._orientations
            },
            get sendDelay() {
                return this._sendDelay
            }
        }
    }, function(e, t) {
        nge.Cfg.Resolutions = Class.extend((function() {
            this.singleton = !0, this.contents = [{
                name: "main",
                width: 1920,
                height: 1080,
                orientation: 0,
                adaptive: !1,
                _fixed: 1
            }], this.adaptiveCfg = {
                desktop: {
                    supported: !1,
                    limits: {
                        horizontal: {
                            min: 1,
                            max: 2
                        },
                        vertical: {
                            min: .5,
                            max: 1
                        }
                    }
                },
                mobile: {
                    supported: !0,
                    limits: {
                        horizontal: {
                            min: 1,
                            max: 2
                        },
                        vertical: {
                            min: .5,
                            max: 1
                        }
                    }
                }
            }, this.get = function() {
                return this.contents
            }, this.getAdaptive = function() {
                return this.adaptiveCfg
            }, this.orientations = function() {
                for (var e = [], t = 0; t < this.contents.length; t++) - 1 === e.indexOf(this.contents[t].orientation) && e.push(this.contents[t].orientation);
                return e
            }, this.orientationsStrings = function() {
                for (var e = this.orientations(), t = 0; t < e.length; t++) e[t] = nge.Cfg.Main.orientations[e[t]];
                return e
            }, this.maxSize = function() {
                return Math.max(this.maxWidth(), this.maxHeight())
            }, this.maxWidth = function() {
                return e.call(this, "width")
            }, this.maxHeight = function() {
                return e.call(this, "height")
            };
            var e = function(e) {
                return this.contents.reduce((function(t, n) {
                    return n[e] > t ? n[e] : t
                }), 0)
            }
        }))
    }, function(e, t) {
        nge.Cfg.Sounds = Class.extend((function() {
            this.contents = {}, this.custom = {}
        }))
    }, function(e, t) {
        nge.Cfg.Spine = Class.extend((function() {
            this.singleton = !0, this.preloadForStates = {}, this.preloadForEvents = {}, this.preloadThreads = 2, this.backgroundContainerParentSelector = "^backgroundContainer"
        }))
    }, function(e, t) {
        nge.Cfg.StatesSlot = {
            demo: ["demo"],
            load: ["load"],
            loadAssets: ["loadAssets"],
            play: "infoPanel slotMachine spinButton settingsButton paytableButton playHeader spinControlContainer euroButton autoSpinButton bet buttons lines coins totalBet balance winlines maxbet autospin gambleButton bigWin welcomePopup freeGamePopup tutorial freeGameSummaryPopup".split(" "),
            historyDataCollector: ["historyDataCollector"],
            history: ["slotMachine"],
            bonusGame: ["bonusGame"],
            summaryPopup: ["summaryPopup"],
            settings: ["settings", "bet", "coins", "lines", "totalBet"],
            paytable: ["paytable", "winlines"],
            gamble: ["gamble", "infoPanel"]
        }
    }, function(e, t, n) {
        n(11), n(12), n(13), n(14), n(15), n(16), n(17), n(18), n(19), n(20), n(21), n(22), n(23), n(24), n(25), n(26), n(27), n(28), n(29), n(30), n(31), n(32), n(33), n(34), n(35), n(36), n(37), n(38), n(39), n(40), n(41), n(42), n(43), n(44), n(45), n(46), n(47), n(48), n(49), n(50), n(51), n(52), n(53), n(54), n(55), n(56), n(57), n(58), n(59), n(60), n(61), n(62), n(63), n(64), n(65), n(66), n(67), n(68), n(69), n(70), n(71), n(72), n(73), n(74), n(75), n(76), n(77), n(78), n(79), n(80), n(81), n(82), n(83), n(84), n(85), n(86), n(87), n(88), n(89), n(90), n(91), n(92), n(93), n(94), n(95), n(96), n(97), n(98), n(99), n(100), n(101), n(102), n(103), n(104), n(105), n(106), n(107), n(108), n(109), n(110), n(111), n(112), n(113), n(114), n(115), n(116), n(117), n(118), n(119), n(120), n(121), n(122), n(123), n(124), n(125), n(126), n(127), n(128), n(129), n(130), n(131), n(132), n(133), n(134), n(135), n(136), n(137), n(138), n(139), n(140), n(141), n(142), n(143), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), n(159), n(160), n(161), n(162), n(163), n(164), n(165), n(166), n(167), n(168), n(169), n(170), n(171)
    }, function(e, t) {
        nge.Com = {}
    }, function(e, t) {
        nge.Com.Base = Class.extend((function() {
            var e = {},
                t = this;
            this.preload = function() {
                this.preloadDefault()
            }, this.create = function() {
                this.createDefault(), this.animateDefault()
            }, this.preloadDefault = function(t, n) {
                if (t || (t = "Tpl"), "object" == typeof t) {
                    var i = t;
                    t = "Tpl"
                }
                var o = this.comName,
                    s = nge.statesManager.getCurrentName();
                if (i || (i = this.getInstance(t, !1, n)), e[t] = i) {
                    if (i.styles && (window.mt.data.styles = nge.Lib.Helper.objectApply(window.mt.data.styles, i.styles)), i.assets && i.assets.contents && 0 < i.assets.contents.length && 0 === window.mt.data.assets.contents.filter((function(e) {
                            return e.name === o + "Com"
                        })).length && window.mt.data.assets.contents.push({
                            name: o + "Com",
                            contents: nge.assets.tplsPathsPrepare(i.assets.contents, {
                                comName: o
                            })
                        }), i.objects && i.objects.contents && 0 < i.objects.contents.length) {
                        var a;
                        if (t = window.mt.data.objects, (s = mt.findItemInTemplate("name", s + "State", mt.data.objects)) && (a = mt.findItemInTemplate("name", o + "Container", s)), a ? t = a : console.warn("Component " + o + " container not found", i.objects.contents), t.contents || (t.contents = []), mt.findItemInTemplate("name", o + "Com", t)) return !1;
                        t.contents.push({
                            type: mt.objects.GROUP,
                            id: o + "Com",
                            name: o + "Com",
                            contents: mt.tplsPathsPrepare(i.objects.contents)
                        })
                    }
                } else "Tpl" !== t && console.warn("Com.Base error: no tpl with name " + t)
            }, this.createDefault = function(t) {
                var n;
                t || (t = "Tpl");
                var i = this.comName;
                if (!mt.findItemInTemplate("name", i + "Com", mt.data.objects)) return !1;
                (t = e[t]) && t.objects && t.objects.contents && 0 < t.objects.contents.length && (t = nge.statesManager.getCurrentName(), mt.findItemInTemplate("name", t + "State", mt.data.objects), (t = mt.findItemInTemplate("name", t + "State", mt.data.objects)) && (n = mt.findItemInTemplate("name", i + "Container", t)), n || nge.objects.create(i + "Com"))
            }, this.animateDefault = function() {
                var e = this.getInstance("Animator");
                if (e && e.firstCreation) {
                    var n = nge.localData.get("Com.Base.animateDefault.promisesArr"),
                        i = !0;
                    n || (i = !1, n = []);
                    var o = new $.Deferred;
                    n.push(o.promise()), i || (nge.observer.fire("Com.Base.animateDefault.start"), nge.localData.set("Com.Base.animateDefault.promisesArr", n), $.when.apply($, n).done((function() {
                        t._animateCallback()
                    }))), e.firstCreation((function() {
                        o.resolve()
                    }))
                }
            }, this._animateCallback = function() {
                nge.localData.set("Com.Base.animateDefault.promisesArr", null), nge.observer.fire("Com.Base.animateDefault.end")
            }
        }))
    }, function(e, t) {
        nge.Com.AutoSpinButton = {}
    }, function(e, t) {
        nge.Com.AutoSpinButton.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.create = function() {
                this.createDefault(), t = this, e || t._subscribe(), e = !0
            }, this._autoSpinButtonEnable = function() {
                var e = nge.localData.get("autospin.inProgress"),
                    t = nge.localData.get("freespin.inProgress"),
                    n = nge.localData.get("freeGame.inProgress"),
                    i = nge.localData.get("balance.totalAmount") < nge.localData.get("totalBet.value");
                if (e || t || n || i) return !1;
                nge.find("^btn_autospin").enable(), nge.find("^btn_autospin_text1").removeClass("disableText"), nge.find("^btn_autospin_text2").removeClass("disableText")
            }, this._autoSpinButtonDisable = function() {
                var e = nge.find("^btn_autospin"),
                    t = nge.localData.get("autospin.inProgress"),
                    n = nge.localData.get("freespin.inProgress");
                t ? (e.disable(3), nge.find("^btn_autospin_text1").removeClass("disableText"), nge.find("^btn_autospin_text2").removeClass("disableText")) : n ? (e.disable(5), nge.find("^btn_autospin_text1").removeClass("disableText"), nge.find("^btn_autospin_text2").removeClass("disableText")) : (e.disable(4), nge.find("^btn_autospin_text1").addClass("disableText"), nge.find("^btn_autospin_text2").addClass("disableText"))
            }, this._spinCompleteHandler = function() {
                t._checkFreeGame();
                var e = nge.localData.get("slotMachine.slotWin.linePickBonus");
                e && 0 < e.length && t._autoSpinButtonDisable()
            }, this._checkFreeGame = function() {
                var e = nge.localData.get("autospin.inProgress"),
                    n = nge.localData.get("freespin.inProgress");
                if (e || n) return !1;
                e = nge.localData.get("freeGame.inProgress"), n = nge.find("^autospinTextContainer");
                var i = nge.find("^autospinSpinsLeftText");
                e && 0 < nge.localData.get("freeGame.amount") ? (n.visible = !1, i.text = nge.localData.get("freeGame.amount"), i.alpha = 1) : (n.visible = !0, i.alpha = 0, t._autoSpinButtonEnable())
            }, this._subscribe = function() {
                nge.observer.add("autospinButton.enable", t._autoSpinButtonEnable), nge.observer.add("autospinButton.disable", t._autoSpinButtonDisable), nge.observer.add("slotMachine.spinComplete", t._spinCompleteHandler), nge.observer.add("freeGames.show", t._spinCompleteHandler)
            }
        }))
    }, function(e, t) {
        nge.Com.Autospin = {}
    }, function(e, t) {
        nge.Com.Autospin.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i;
            this.create = function() {
                return n = this, this.createDefault(), t || n._subscribe(), nge.find("^stopButton").visible = !1, nge.localData.set("autospin.stopRequest", !1), nge.localData.get("autospin.paused") && n._autospinStart(), nge.localData.set("autospin.spins", 10), t = !0
            }, this.show = function() {
                return n._show(), !0
            }, this._show = function() {
                return n._makeOnTop(), nge.find("^autospinPopupContainer").visible = !0, nge.observer.fire("autospin.opened"), !0
            }, this._makeOnTop = function() {
                var e = nge.find("^playState"),
                    t = nge.find("^autospinContainer");
                e.bringToTop(t)
            }, this._close = function() {
                return nge.find("^autospinPopupContainer").visible = !1, nge.observer.fire("autospin.closed"), !0
            }, this._updateSpins = function(e) {
                for (var t = 10; 50 >= t; t += 10) {
                    var n = nge.find("^autospinTabSpins_" + t),
                        i = nge.find("^tab_spins_text_" + t);
                    t === e ? (n.disable(3), i.fill = "white") : (n.enable(1), i.fill = "#26a5b8")
                }
                nge.localData.set("autospin.spins", e)
            }, this._updateCheckboxes = function(e) {
                var t = nge.localData.get("autospin.checkbox_" + e + ".checked");
                n._switchCheckbox(!t, e)
            }, this._switchCheckbox = function(e, t) {
                var n = nge.find("^autospinCheck_" + t),
                    i = nge.find("^autospinMoneyActive_" + t),
                    o = nge.find("^textMoney_" + t),
                    s = nge.find("^textEuro_" + t);
                e ? (nge.localData.set("autospin.checkbox_" + t + ".checked", !0), n.alpha = 1, i && (i.frame = 1, i.input.enabled = !0, i._onDownFrame = 0, i._onOutFrame = 1, i._onOverFrame = 2, s.fill = "white", o.text = nge.localData.get("autospin.checkbox_" + t + ".value"), o.alpha = 1)) : (nge.localData.set("autospin.checkbox_" + t + ".checked", !1), n.alpha = 0, i && (i.frame = 3, i.input.enabled = !1, s.fill = "#26a5b8", o.alpha = 0))
            }, this._updateAll = function() {
                var e = nge.localData.get("autospin.spins");
                for (n._updateSpins(e), e = 0; 4 > e; e++) {
                    var t = nge.localData.get("autospin.checkbox_" + e + ".checked");
                    n._switchCheckbox(t, e)
                }
            }, this._autospinStart = function() {
                if (nge.localData.get("autospin.paused")) nge.localData.set("autospin.paused", !1);
                else {
                    var e = nge.localData.get("balance");
                    nge.localData.set("autospin.startBalance", e), nge.localData.set("autospin.totalWin", 0), e = nge.localData.get("autospin.spins"), nge.localData.set("autospin.spinsLeft", e)
                }
                nge.localData.set("autospin.stopRequest", !1), nge.localData.set("autospin.inProgress", !0), nge.observer.fire("autospin.close"), nge.observer.fire("slotMachine.spinCommand"), nge.observer.fire("buttons.autospinMode"), e = nge.find("^autospinTextContainer");
                var t = nge.find("^autospinSpinsLeftText");
                e.visible = !1, t.text = nge.localData.get("autospin.spinsLeft"), t.alpha = 1
            }, this._autospinHandleResponse = function(e) {
                if (!nge.localData.get("autospin.inProgress")) return !1;
                nge.localData.get("autospin.inProgress");
                var t = nge.localData.get("autospin.spinsLeft");
                t--;
                var o = nge.find("^autospinSpinsLeftText");
                nge.localData.set("autospin.spinsLeft", t), o.text = t;
                var s = (o = e.slotWin.totalWin) + nge.localData.get("autospin.totalWin");
                nge.localData.set("autospin.currentWin", o), nge.localData.set("autospin.totalWin", s), i = e.slotWin.linePickBonus, 0 >= t && n._autoSpinStopRequest(), (e = nge.localData.get("autospin.checkbox_1")).checked && o > e.value && n._autoSpinStopRequest()
            }, this._autoSpinBalanceHide = function() {
                var e = nge.find("^autospinSpinsLeftText");
                nge.find("^autospinTextContainer").visible = !0, e.alpha = 0
            }, this._autoSpinStopRequest = function() {
                nge.localData.set("autospin.stopRequest", !0)
            }, this._finishAutoSpin = function() {
                if (!nge.localData.get("autospin.inProgress")) return !1;
                nge.localData.set("autospin.inProgress", !1), nge.localData.set("autospin.paused", !1), nge.localData.set("autospin.spinsLeft", 0), this._autoSpinBalanceHide(), nge.observer.fire("autospin.end")
            }, this._spinCompleteResponse = function() {
                if (!nge.localData.get("autospin.inProgress")) return !1;
                nge.localData.get("autospin.stopRequest") && n._finishAutoSpin(), i && 0 < i.length && (nge.localData.get("autospin.checkbox_0").checked && "FreeSpinReady" === i[0].bonusName ? (this._autoSpinStopRequest(), n._finishAutoSpin(), nge.observer.fire("spinButton.disable")) : (nge.localData.set("autospin.paused", !0), nge.localData.set("autospin.inProgress", !1))), e = !0
            }, this._autospinBalanceUpdate = function() {
                if (!nge.localData.get("autospin.inProgress")) return !1;
                var t = nge.localData.get("autospin.inProgress"),
                    i = nge.localData.get("balance"),
                    o = nge.localData.get("totalBet").value;
                if (!e || !t) return !1;
                e = !1, t = nge.localData.get("autospin.startBalance");
                var s = nge.localData.get("autospin.checkbox_2"),
                    a = nge.localData.get("autospin.checkbox_3");
                s.checked && i.totalAmount - t.totalAmount > s.value ? (log("stopping autospin as win is bigger than specified"), n._finishAutoSpin()) : a.checked && t.totalAmount - i.totalAmount > a.value ? (log("stopping autospin as loose is bigger than specified"), n._finishAutoSpin()) : i.totalAmount < o ? (n._finishAutoSpin(), nge.rafSetTimeout((function() {
                    nge.observer.fire("spinButton.disable")
                }), 500)) : nge.rafSetTimeout((function() {
                    nge.observer.fire("slotMachine.spinCommand")
                }), 500)
            }, this._checkAutospin = function() {
                "SpinRequest" === nge.localData.get("spin.type") && nge.localData.get("autospin.paused") && 0 < nge.localData.get("autospin.spinsLeft") && n._autospinStart()
            }, this._subscribe = function() {
                nge.observer.add("autospin.show", n._show), nge.observer.add("autospin.close", n._close), n.customSubscribe()
            }, this.customSubscribe = function() {
                nge.observer.add("autoSpinCheckbox.press", n._updateCheckboxes, "change_checkboxes"), nge.observer.add("autoSpinSpins.press", n._updateSpins, "change_spins"), nge.observer.add("autospin.opened", n._updateAll, "open_autospin"), nge.observer.add("autospin.start", n._autospinStart, "start_autospin"), nge.observer.add("slotMachine.spinResponse", n._autospinHandleResponse, "response_autospin"), nge.observer.add("slotMachine.spinComplete", n._spinCompleteResponse), nge.observer.add("balance.amount", n._autospinBalanceUpdate, "complete_autospin"), nge.observer.add("freespin.end", n._checkAutospin), nge.observer.add("autospin.stopRequest", n._autoSpinStopRequest), nge.observer.add("autoSpinMoney.press", (function(t) {
                    var n = nge.find("^textMoney_" + t);
                    $("<input>").attr("id", "autospinCheckbox_" + t).attr("maxlength", 5).css("position", "absolute").css("left", "-15px").css("top", "-15px").css("width", "5px").css("height", "5px").keyup(e).appendTo("body").focus().focusout((function(e) {
                        $(this).remove()
                    })).val(n.text.replace(".", ""))
                }), "tabs_lights");
                var e = function(e) {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    var t = e.target.id;
                    t = t.substring(t.lastIndexOf("_") + 1, t.length);
                    var n = nge.find("^textMoney_" + t);
                    n.text = nge.Lib.Validator.moneyWithPeriod(e.target.value), nge.localData.set("autospin.checkbox_" + t + ".value", n.text)
                };
                return !0
            }
        }))
    }, function(e, t) {
        nge.Com.Autospin.Tpl = function() {
            for (var e = [], t = 0, n = nge.localData.get("slotMachine.gameParameters.freeSpins"), i = 0; 4 > i; i++) nge.localData.set("autospin.checkbox_" + i + ".checked", 0 === i), 0 < i && nge.localData.set("autospin.checkbox_" + i + ".value", "5.00");
            for (nge.localData.set("autospin.spins", 10), i = 10; 50 >= i; i += 10) e.push({
                x: 68 + t,
                y: 17,
                type: mt.objects.TEXT,
                style: {
                    font: "bold 64px 'freesetboldc'",
                    fill: 10 === i ? "white" : "#26a5b8",
                    align: "left",
                    stroke: "black",
                    strokeThickness: 0
                },
                align: "left",
                isVisible: !0,
                text: i,
                id: "tab_spins_text_" + i,
                name: "tab_spins_text_" + i,
                fullPath: "tab_spins_text" + i
            }), t += 204;
            var o = [],
                s = ["If free spins are won", "On any win more than", "If balance increases by", "If balance decreases by"];
            for (i = t = 0; 4 > i; i++) o.push({
                assetId: "check.png_" + i,
                x: -10,
                y: t,
                type: mt.objects.IMAGE,
                alpha: 0 === i ? 1 : 0,
                isVisible: !0,
                width: 96,
                height: 76,
                id: "autospinCheck_" + i,
                name: "autospinCheck_" + i,
                assetKey: "img/autospin/check.png"
            }, {
                x: 110,
                y: 5 + t,
                type: mt.objects.TEXT,
                style: {
                    fontFamily: "freesetboldc",
                    fontSize: 60,
                    font: "bold 60px 'freesetboldc'",
                    fill: "#26a5b8",
                    align: "left",
                    stroke: "black"
                },
                align: "left",
                isVisible: !0,
                text: s[i],
                id: "autospinsText_" + i,
                name: "autospinsText_" + i
            }, {
                assetId: "checkbox.png_" + i,
                y: t,
                type: mt.objects.BUTTON,
                isVisible: 1,
                width: 80,
                height: 80,
                id: "img/autospin/checkbox_" + i,
                name: "img/autospin/checkbox_" + i,
                action: "function () {nge.observer.fire('autoSpinCheckbox.press', " + i + ");}",
                btnFrames: {
                    over: 2,
                    out: 1,
                    down: 0
                },
                assetKey: "img/autospin/checkbox.png",
                pixelPerfectOver: !1,
                pixelPerfectClick: !1
            }), t += 113;
            for (n || (o = o.slice(-9)), n = [], t = 0, i = 1; 4 > i; i++) n.push({
                x: 25,
                y: 42 + t,
                type: mt.objects.TEXT,
                anchorY: .5,
                style: {
                    font: "bold 50px 'freesetboldc'",
                    fill: "#26a5b8",
                    align: "left",
                    stroke: "black"
                },
                isVisible: !0,
                text: nge.localData.get("currency"),
                id: "textEuro_" + i,
                name: "textEuro_" + i
            }, {
                x: 215,
                y: 42 + t,
                z: 0,
                type: mt.objects.TEXT,
                anchorX: 1,
                anchorY: .5,
                style: {
                    font: "bold 50px 'freesetboldc'",
                    fill: "white",
                    align: "left",
                    stroke: "black"
                },
                isVisible: !0,
                text: "5.00",
                id: "textMoney_" + i,
                name: "textMoney_" + i
            }, {
                assetId: "money_active.png_" + i,
                y: t,
                type: mt.objects.BUTTON,
                frame: 3,
                isVisible: !0,
                enabled: !1,
                width: 256,
                height: 84,
                id: "autospinMoneyActive_" + i,
                name: "autospinMoneyActive_" + i,
                action: "function () {nge.observer.fire('autoSpinMoney.press', " + i + ");}",
                btnFrames: {
                    over: 2,
                    out: 1,
                    down: 0
                },
                assetKey: "img/autospin/money_active.png"
            }), t += 113;
            return {
                assets: {
                    name: "assets",
                    contents: [{
                        type: mt.assets.IMAGE,
                        fullPath: "img/black-bg.png",
                        key: "/black-bg.png",
                        qualityObeys: !1
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/popup_bg.png",
                        key: "img/autospin/popup_bg.png",
                        width: 1752,
                        height: 1096
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/btn_cancel.png",
                        key: "img/autospin/btn_cancel.png",
                        width: 1020,
                        height: 116,
                        frameWidth: 340,
                        frameHeight: 116
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/btn_start.png",
                        key: "img/autospin/btn_start.png",
                        width: 1020,
                        height: 116,
                        frameWidth: 340,
                        frameHeight: 116
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/check.png",
                        key: "img/autospin/check.png",
                        width: 288,
                        height: 76,
                        frameWidth: 96,
                        frameHeight: 76
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/checkbox.png",
                        key: "img/autospin/checkbox.png",
                        width: 240,
                        height: 80,
                        frameWidth: 80,
                        frameHeight: 80
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/money_active.png",
                        key: "img/autospin/money_active.png",
                        width: 1024,
                        height: 84,
                        frameWidth: 256,
                        frameHeight: 84
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/money_normal.png",
                        key: "img/autospin/money_normal.png",
                        width: 1024,
                        height: 84,
                        frameWidth: 256,
                        frameHeight: 84
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/separator.png",
                        key: "img/autospin/separator.png",
                        qualityObeys: !1
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/tab_spins_center.png",
                        key: "img/autospin/tab_spins_center.png",
                        width: 816,
                        height: 108,
                        frameWidth: 204,
                        frameHeight: 108
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/tab_spins_left.png",
                        key: "img/autospin/tab_spins_left.png",
                        width: 816,
                        height: 108,
                        frameWidth: 204,
                        frameHeight: 108
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/autospin/tab_spins_right.png",
                        key: "img/autospin/tab_spins_right.png",
                        width: 816,
                        height: 108,
                        frameWidth: 204
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "autospinPopupContainer",
                        name: "autospinPopupContainer",
                        x: 149,
                        y: 221,
                        type: mt.objects.GROUP,
                        contents: [{
                            x: 1085,
                            y: 917,
                            type: mt.objects.TEXT,
                            anchorX: .5,
                            anchorY: .5,
                            style: {
                                font: "bold 60px 'freesetboldc'",
                                fill: "#ffffff",
                                align: "left"
                            },
                            isVisible: !0,
                            text: "START",
                            name: "startText"
                        }, {
                            x: 665,
                            y: 917,
                            type: mt.objects.TEXT,
                            anchorX: .5,
                            anchorY: .5,
                            style: {
                                font: "bold 60px 'freesetboldc'",
                                fill: "#26a5b8",
                                align: "left"
                            },
                            isVisible: !0,
                            text: "CANCEL",
                            name: "cancelText"
                        }, {
                            assetId: "btn_start.png",
                            x: 915,
                            y: 860,
                            type: mt.objects.BUTTON,
                            isVisible: 1,
                            name: "img/autospin/btn_start",
                            action: "function () {nge.observer.fire('autospin.start');}",
                            btnFrames: {
                                over: 1,
                                out: 2,
                                down: 1
                            },
                            assetKey: "img/autospin/btn_start.png"
                        }, {
                            x: 495,
                            y: 860,
                            type: mt.objects.BUTTON,
                            isVisible: 1,
                            name: "img/autospin/btn_cancel",
                            action: "function () {nge.observer.fire('autospin.close');}",
                            btnFrames: {
                                over: 1,
                                out: 2,
                                down: 1
                            },
                            assetKey: "img/autospin/btn_cancel.png"
                        }, {
                            name: "autospinSpinsTextContainer",
                            x: 601,
                            y: 84,
                            type: mt.objects.GROUP,
                            contents: e,
                            isVisible: 1
                        }, {
                            id: "autospinMoneyContainer",
                            name: "autospinMoneyContainer",
                            x: 1333,
                            y: 447,
                            type: mt.objects.GROUP,
                            contents: n,
                            isVisible: 1
                        }, {
                            assetId: "separator.png",
                            x: 142,
                            y: 265,
                            type: mt.objects.IMAGE,
                            isVisible: 1,
                            width: 1463,
                            height: 4,
                            assetKey: "img/autospin/separator.png"
                        }, {
                            id: "autospinSpinsContainer",
                            name: "autospinSpinsContainer",
                            x: 601,
                            y: 84,
                            type: mt.objects.GROUP,
                            contents: [{
                                assetId: "spins10",
                                type: mt.objects.BUTTON,
                                frame: 3,
                                isVisible: 1,
                                id: "autospinTabSpins_10",
                                name: "autospinTabSpins_10",
                                action: "function () {nge.observer.fire('autoSpinSpins.press', 10);}",
                                btnFrames: {
                                    over: 1,
                                    out: 2,
                                    down: 1
                                },
                                assetKey: "img/autospin/tab_spins_left.png"
                            }, {
                                assetId: "spins20",
                                x: 204,
                                type: mt.objects.BUTTON,
                                isVisible: 1,
                                name: "autospinTabSpins_20",
                                action: "function () {nge.observer.fire('autoSpinSpins.press', 20);}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                },
                                assetKey: "img/autospin/tab_spins_center.png"
                            }, {
                                assetId: "spins30",
                                x: 408,
                                type: mt.objects.BUTTON,
                                isVisible: 1,
                                id: "autospinTabSpins_30",
                                name: "autospinTabSpins_30",
                                action: "function () {nge.observer.fire('autoSpinSpins.press', 30);}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                },
                                assetKey: "img/autospin/tab_spins_center.png"
                            }, {
                                assetId: "spins40",
                                x: 612,
                                type: mt.objects.BUTTON,
                                isVisible: 1,
                                id: "autospinTabSpins_40",
                                name: "autospinTabSpins_40",
                                action: "function () {nge.observer.fire('autoSpinSpins.press', 40);}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                },
                                assetKey: "img/autospin/tab_spins_center.png"
                            }, {
                                assetId: "spins50",
                                x: 816,
                                type: mt.objects.BUTTON,
                                isVisible: 1,
                                id: "autospinTabSpins_50",
                                name: "autospinTabSpins_50",
                                action: "function () {nge.observer.fire('autoSpinSpins.press', 50);}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                },
                                assetKey: "img/autospin/tab_spins_right.png"
                            }],
                            isVisible: 1
                        }, {
                            id: "autospinSpinsCheckboxContainer",
                            name: "autospinSpinsCheckboxContainer",
                            x: 501,
                            y: 335,
                            type: mt.objects.GROUP,
                            contents: o,
                            isVisible: 1
                        }, {
                            x: 139,
                            y: 97,
                            type: mt.objects.TEXT,
                            style: {
                                font: "bold 72px 'freesetboldc'",
                                fill: "#26a5b8",
                                align: "left",
                                stroke: "black"
                            },
                            isVisible: !0,
                            text: "Spins"
                        }, {
                            x: 139,
                            y: 318,
                            type: mt.objects.TEXT,
                            style: {
                                font: "bold 72px 'freesetboldc'",
                                fill: "#26a5b8",
                                align: "left",
                                stroke: "black"
                            },
                            isVisible: !0,
                            text: "Stop"
                        }, {
                            x: 139,
                            y: 401,
                            type: mt.objects.TEXT,
                            style: {
                                font: "bold 72px 'freesetboldc'",
                                fill: "#26a5b8",
                                align: "left",
                                stroke: "black"
                            },
                            isVisible: !0,
                            text: "Autoplay"
                        }, {
                            assetId: "214",
                            x: 43,
                            y: 5,
                            type: mt.objects.IMAGE,
                            isVisible: 1,
                            width: 227,
                            height: 170,
                            assetKey: "img/autospin/popup_bg.png"
                        }, {
                            x: -149,
                            y: -221,
                            name: "black-bg4",
                            inputEnabled: !0,
                            scaleX: 205,
                            scaleY: 154,
                            alpha: .75,
                            isVisible: 1,
                            width: 10,
                            height: 10,
                            assetKey: "/black-bg.png"
                        }],
                        isVisible: !1
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Balance = {}
    }, function(e, t) {
        nge.Com.Balance.Controller = nge.Com.Base.extend((function() {
            var e, t = this;
            this.create = function() {
                t.createDefault();
                var n = nge.localData.get("balance");
                return n && t._drawText(n), e || t._subscribe(), !0
            }, this._change = function(e) {
                return "object" == typeof e && (t._drawText(e), nge.localData.set("balance.totalAmount", e.totalAmount), !0)
            }, this._drawText = function(e) {
                var t = nge.findAll(".balanceNumber"),
                    n = nge.findAll(".balanceAmount"),
                    i = nge.findAll(".currency"),
                    o = e.currency || nge.localData.get("balance.currency");
                e = parseFloat(e.totalAmount).toFixed(2);
                for (var s = 0; s < t.length; s++) t[s].text = e + " " + o;
                for (t = 0; t < n.length; t++) n[t].text = "" + e;
                for (n = 0; n < i.length; n++) i[n].text = "" + o
            }, this._subscribe = function() {
                nge.observer.add("balance.amount", t._change), e = !0
            }
        }))
    }, function(e, t) {
        nge.Com.Balance.Tpl = function() {
            return {
                styles: {
                    "^container .text": {
                        style: {
                            font: '36pt "freesetboldc"',
                            fill: "#fff",
                            align: "left"
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: []
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "balanceAdds",
                        name: "balanceAdds",
                        type: mt.objects.GROUP,
                        isVisible: 1,
                        contents: []
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.BalanceBonus = {}
    }, function(e, t) {
        nge.Com.BalanceBonus.Controller = nge.Com.Base.extend((function() {}))
    }, function(e, t) {
        nge.Com.BalanceBonus.Tpl = function() {
            return {
                styles: {
                    "^balanceBonusWrapper .text": {
                        style: {
                            font: '36pt "freesetboldc"',
                            fill: "#fff",
                            align: "left"
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: []
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "balanceBonusWrapper",
                        name: "balanceBonusWrapper",
                        type: mt.objects.GROUP,
                        isVisible: 1,
                        contents: [{
                            id: "balanceBonusAmount",
                            name: "balanceBonusAmount",
                            x: 350,
                            class: "text",
                            type: mt.objects.TEXT,
                            anchorX: 1,
                            isVisible: !0,
                            text: "0"
                        }, {
                            id: "balanceBonusTitle",
                            name: "balanceBonusTitle",
                            class: "text",
                            type: mt.objects.TEXT,
                            isVisible: !0,
                            text: "Bonus:"
                        }]
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Bet = {}
    }, function(e, t) {
        nge.Com.Bet.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.create = function() {
                this.createDefault(), t = this;
                var n = nge.localData.get("bet.cfg");
                return nge.localData.set("maxBetValue", n[n.length - 1]), t._setDefault(), e || t._subscribe(), e = !0
            }, this.customSubscribe = function() {}, this._setDefault = function() {
                var e = nge.localData.get("bet.cfg");
                if (!e) return !1;
                var n = nge.localData.get("bet.value");
                return n || (n = e[0]), t.setVal(n), !0
            }, this._minusNC = function(e) {
                t._minus(!0)
            }, this._plusNC = function(e) {
                t._plus(!0)
            }, this._minus = function(e) {
                var n = nge.localData.get("bet.value"),
                    i = nge.localData.get("bet.cfg");
                return !!n && (n = i.indexOf(n), i[--n] || (n = e ? 0 : i.length - 1), n = i[n], t.setVal(n), !0)
            }, this._plus = function(e) {
                var n = nge.localData.get("bet.value"),
                    i = nge.localData.get("bet.cfg");
                return !!n && (n = i.indexOf(n), i[++n] || (n = e ? i.length - 1 : 0), n = i[n], t.setVal(n), !0)
            }, this.setVal = function(e) {
                var t, n = nge.findAll(".betNumber");
                for (t in n) n[t].text = e;
                nge.localData.set("bet.value", e), nge.observer.fire("bet.change", e)
            }, this._setMax = function() {
                var e = nge.localData.get("maxBetValue");
                nge.observer.fire("bet.set", e)
            }, this._subscribe = function() {
                nge.observer.add("brain.openGameSuccess", t._setDefault), nge.observer.add("bet.down", t._minus), nge.observer.add("bet.up", t._plus), nge.observer.add("bet.downNC", t._minusNC), nge.observer.add("bet.upNC", t._plusNC), nge.observer.add("bet.set", t.setVal), nge.observer.add("bet.update", t._setDefault), nge.observer.add("maxbet.go", t._setMax), t.customSubscribe()
            }
        }))
    }, function(e, t) {
        nge.Com.BigWin = {}
    }, function(e, t) {
        nge.Com.BigWin.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i, o = nge.localData.get("currency"),
                s = !1,
                a = 1,
                r = ["_rotateSun"],
                l = [
                    ["_popupDisplay"],
                    ["_bigWinTxt120"],
                    ["_bigWinTxt100", "_showSun", "_showDots"],
                    ["_amountShow", "_amountUpdate", "_starsShow"],
                    ["_setAmount", "_popupHide"],
                    ["_animationFinish"]
                ],
                c = 0,
                u = [],
                g = 0;
            this.create = function() {
                return e = this, a = nge.assets.getQualityFactor(), this.createDefault(), t || e._subscribe(), t = !0
            }, this._subscribe = function() {
                nge.observer.add("bigWin", e._showBigWin), nge.observer.add("jackPot", e._showJackPot)
            }, this._showJackPot = function(t) {
                i = "jackpot_txt", e._show(t)
            }, this._showBigWin = function(t) {
                i = "big_win_txt", e._show(t)
            }, this._show = function(t) {
                for (var o in s = !0, n = t, nge.find("#" + i).visible = !0, nge.observer.fire("bigWinAnimation.start"), nge.find("^playState").cacheAsBitmap = !0, r) e[r[o]]();
                e._startStep(0)
            }, this._startStep = function(t) {
                if (!l[t]) return !1;
                var n = l[t];
                for (var i in c = t, u = n, g = 0, n) e[n[i]]()
            }, this._checkNextStep = function() {
                g++, u.length === g && e._startStep(c + 1)
            }, this._rotateSun = function() {
                var e = nge.find("#sun");
                if (!s) return !1;
                e.angle = 0, (e = nge.tween.add(e)).to({
                    angle: 360
                }, 3e3, nge.Lib.Tween.Easing.Linear.None, !1, 0), e.repeatCounter = 2, e.start()
            }, this._popupDisplay = function() {
                var t = nge.find("#bigWinWrapperContainer"),
                    n = nge.find("#bigWinAmount"),
                    i = nge.find("#bigWinAmountContainer");
                t.visible = !0, t.alpha = 1, i.x = nge.game.world.width / 2, i.y = nge.game.world.height / 2, i.scale.x = .01, i.scale.y = .01, i.visible = !0, n.text = 0, (t = nge.tween.add(i)).to({
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    scaleY: 1
                }, 500, nge.Lib.Tween.Easing.Linear.None, !1, 0), t.onComplete.add(e._checkNextStep, this), t.start()
            }, this._bigWinTxt120 = function() {
                var t = nge.find("#" + i);
                (t = nge.tween.add(t)).to({
                    y: 300,
                    scaleX: 1.5 / a,
                    scaleY: 1.5 / a
                }, 100, nge.Lib.Tween.Easing.Linear.None, !1, 0), t.onComplete.add(e._checkNextStep, this), t.start()
            }, this._bigWinTxt100 = function() {
                var t = nge.find("#" + i);
                (t = nge.tween.add(t)).to({
                    y: 400,
                    scaleX: 1 / a,
                    scaleY: 1 / a
                }, 100, nge.Lib.Tween.Easing.Linear.None, !1, 0), t.onComplete.add(e._checkNextStep, this), t.start()
            }, this._showSun = function() {
                var t = nge.find("#sun");
                t.visible = !0, (t = nge.tween.add(t)).to({
                    alpha: 1
                }, 100, nge.Lib.Tween.Easing.Linear.None, !1, 0), t.onComplete.add(e._checkNextStep, this), t.start()
            }, this._showDots = function() {
                var t = nge.find("#dots");
                t.visible = !0, t.scaleX = 0, t.scaleY = 0, t.x = 1037, t.y = 905;
                var n = nge.tween.add(t);
                for (n.to({
                        x: 455,
                        y: 725,
                        scaleX: 1,
                        scaleY: 1
                    }, 500, nge.Lib.Tween.Easing.Linear.None, !1, 0), n.onComplete.add(e._checkNextStep, this), n.start(), t = 0; 33 > t; t++) n = nge.find("#money_dot_big_" + t), (n = nge.tween.add(n)).to({
                    scaleX: 1.5 / a,
                    scaleY: 1.5 / a
                }, 200, nge.Lib.Tween.Easing.Linear.None, !1, 500 + 200 * t).to({
                    scaleX: 1 / a,
                    scaleY: 1 / a
                }, 200, nge.Lib.Tween.Easing.Linear.None, !1, 0), n.start()
            }, this._amountShow = function() {
                var t = nge.find("#bigWinAmount");
                t.visible = !0, t.scale.x = 0, t.scale.y = 0, (t = nge.tween.add(t.scale)).to({
                    x: 1,
                    y: 1
                }, 1e3, nge.Lib.Tween.Easing.Linear.None, !1, 0), t.onComplete.add(e._checkNextStep, this), t.start()
            }, this._amountUpdate = function() {
                var t = nge.find("#bigWinAmount");
                (t = nge.tween.add(t)).to({
                    text: n
                }, 5e3, nge.Lib.Tween.Easing.Linear.None, !1, 0), t.onUpdateCallback((function(t, n, i) {
                    e._setWinAmount(i.percent * i.vEnd.text)
                }), this), t.onComplete.add(e._checkNextStep, this), t.start()
            }, this._starsShow = function() {
                nge.find("#stars").visible = !0;
                var t = nge.find("#stars_bg");
                t.visible = !0, t.scaleX = 0, t.scaleY = 0, (t = nge.tween.add(t)).to({
                    scaleX: 1.2 / a,
                    scaleY: 1.2 / a
                }, 1e3, nge.Lib.Tween.Easing.Linear.None, !1, 500).to({
                    scaleX: 1 / a,
                    scaleY: 1 / a
                }, 200, nge.Lib.Tween.Easing.Linear.None, !1, 0), t.onComplete.add(e._checkNextStep, this), t.start(), (t = function(e, t) {
                    var n = nge.find("#" + e);
                    e = n.x;
                    var i = n.y;
                    n.visible = !0, n.x = 1036, n.y = 690, n.scaleX = 0, n.scaleY = 0, (n = nge.tween.add(n)).to({
                        x: e,
                        y: i,
                        scaleX: 1.5 / a,
                        scaleY: 1.5 / a
                    }, 1e3, nge.Lib.Tween.Easing.Linear.None, !1, t).to({
                        scaleX: 1 / a,
                        scaleY: 1 / a
                    }, 200, nge.Lib.Tween.Easing.Linear.None, !1, 0), n.start()
                })("star_left_top", 100), t("star_right_top", 100), t("star_left_center", 450), t("star_right_center", 350), t("star_left_bottom", 800), t("star_right_bottom", 950)
            }, this._setAmount = function() {
                e._setWinAmount(n), e._checkNextStep()
            }, this._popupHide = function() {
                var t = nge.find("#bigWinWrapperContainer");
                (t = nge.tween.add(t)).to({
                    alpha: 0
                }, 500, nge.Lib.Tween.Easing.Linear.None, !1, 3e3), t.onComplete.addOnce(e._checkNextStep, this), t.start()
            }, this._animationFinish = function() {
                s = !1;
                var e = nge.find("#bigWinWrapperContainer");
                nge.find("#bigWinAmountContainer").visible = !1, e.visible = !1, nge.find("#sun").visible = !1, nge.find("#bigWinAmount").visible = !1, nge.find("#stars").visible = !1, nge.find("#dots").visible = !1, nge.find("^playState").cacheAsBitmap = !1, nge.find("#" + i).visible = !1, nge.observer.fire("bigWinAnimation.end")
            }, this._setWinAmount = function(e) {
                nge.find("#bigWinAmount").text = nge.Lib.Validator.floatMoney(e, !0) + o
            }
        }))
    }, function(e, t) {
        nge.Com.BigWin.Tpl = function() {
            var e = function() {
                    var e = function(e, t) {
                        for (var n = [], i = 0; i < t; i++) {
                            var o = 3050 * i / t,
                                s = 0;
                            1165 < o && (s = s + o - 1165, o = 1165), 360 < s && (o -= s - 360, s = 360), 0 > o && (s += o, o = 0), n.push({
                                id: e + "_" + i,
                                x: o,
                                y: s,
                                type: mt.objects.IMAGE,
                                anchorX: .5,
                                anchorY: .5,
                                isVisible: !0,
                                assetKey: e
                            })
                        }
                        return n
                    };
                    return nge.Lib.Helper.mergeArrs(e("money_dot_big", 33), e("money_dot_small", 115))
                }(),
                t = function() {
                    var e = function(e, t) {
                        var n, i = [];
                        for (n in t) i.push({
                            id: e + "_" + n,
                            x: t[n].x,
                            y: t[n].y,
                            class: "hotspot_big_win_txt",
                            type: mt.objects.IMAGE,
                            alpha: 0,
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1,
                            assetKey: e
                        });
                        return i
                    };
                    return nge.Lib.Helper.mergeArrs(e("hotspot_big_win_txt", [{
                        x: 510,
                        y: 457
                    }, {
                        x: 660,
                        y: 600
                    }, {
                        x: 910,
                        y: 457
                    }, {
                        x: 1135,
                        y: 457
                    }, {
                        x: 1430,
                        y: 457
                    }, {
                        x: 1590,
                        y: 555
                    }]), e("hotspot_random", []))
                }();
            return {
                styles: {
                    "#bigWinWrapperContainer .bigWinAmount": {
                        style: {
                            font: "285px 'freesetboldc'",
                            fill: "#00ccff",
                            stroke: "#ffffff",
                            strokeThickness: 20
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: [{
                        fullPath: "img/popup/big_Win/big_win_ref.png",
                        key: "popup/big_win_ref"
                    }, {
                        fullPath: "img/black-bg.png",
                        key: "popup/bigWinBg",
                        qualityObeys: !1
                    }, {
                        fullPath: "img/popup/big_Win/big_win_txt.png",
                        key: "popup/big_win_txt"
                    }, {
                        fullPath: "img/popup/big_Win/jackpot_txt.png",
                        key: "popup/jackpot_txt"
                    }, {
                        fullPath: "img/popup/big_Win/blue_glow.png",
                        key: "popup/blue_glow"
                    }, {
                        fullPath: "img/popup/big_Win/money_dot_big.png",
                        key: "money_dot_big"
                    }, {
                        fullPath: "img/popup/big_Win/money_dot_small.png",
                        key: "money_dot_small"
                    }, {
                        fullPath: "img/popup/big_Win/money_dot_box_glow.png",
                        key: "popup/money_dot_box_glow"
                    }, {
                        fullPath: "img/popup/big_Win/sun.png",
                        key: "popup/sun"
                    }, {
                        fullPath: "img/popup/big_Win/stars_bg.png",
                        key: "popup/stars_bg"
                    }, {
                        fullPath: "img/popup/big_Win/star_left_bottom.png",
                        key: "popup/star_left_bottom"
                    }, {
                        fullPath: "img/popup/big_Win/star_left_center.png",
                        key: "popup/star_left_center"
                    }, {
                        fullPath: "img/popup/big_Win/star_left_top.png",
                        key: "popup/star_left_top"
                    }, {
                        fullPath: "img/popup/big_Win/star_right_bottom.png",
                        key: "popup/star_right_bottom"
                    }, {
                        fullPath: "img/popup/big_Win/star_right_center.png",
                        key: "popup/star_right_center"
                    }, {
                        fullPath: "img/popup/big_Win/star_right_top.png",
                        key: "popup/star_right_top"
                    }, {
                        fullPath: "img/popup/big_Win/hotspot_big_win_txt.png",
                        key: "hotspot_big_win_txt"
                    }, {
                        fullPath: "img/popup/big_Win/hotspot_random.png",
                        key: "hotspot_random"
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "bigWinWrapperContainer",
                        type: mt.objects.GROUP,
                        isVisible: !1,
                        contents: [{
                            id: "bigWinAmountContainer",
                            type: mt.objects.GROUP,
                            isVisible: !1,
                            contents: [{
                                id: "bigWinAmount",
                                x: 1050,
                                y: 925,
                                anchorX: .5,
                                anchorY: .5,
                                class: "bigWinAmount",
                                type: mt.objects.TEXT,
                                isVisible: !1,
                                text: "0"
                            }, {
                                id: "hotSpots",
                                type: mt.objects.GROUP,
                                isVisible: !0,
                                contents: t
                            }, {
                                id: "big_win_txt",
                                x: 1042,
                                y: 400,
                                type: mt.objects.IMAGE,
                                anchorX: .5,
                                isVisible: !1,
                                assetKey: "popup/big_win_txt"
                            }, {
                                id: "jackpot_txt",
                                x: 1042,
                                y: 400,
                                type: mt.objects.IMAGE,
                                anchorX: .5,
                                isVisible: !1,
                                assetKey: "popup/jackpot_txt"
                            }, {
                                id: "dots",
                                x: 455,
                                y: 725,
                                type: mt.objects.GROUP,
                                isVisible: !1,
                                contents: e
                            }, {
                                id: "stars",
                                type: mt.objects.GROUP,
                                isVisible: !1,
                                contents: [{
                                    id: "star_left_top",
                                    x: 625,
                                    y: 415,
                                    type: mt.objects.IMAGE,
                                    anchorX: .5,
                                    anchorY: .5,
                                    isVisible: !0,
                                    assetKey: "popup/star_left_top"
                                }, {
                                    id: "star_left_center",
                                    x: 505,
                                    y: 515,
                                    type: mt.objects.IMAGE,
                                    anchorX: .5,
                                    anchorY: .5,
                                    isVisible: !0,
                                    assetKey: "popup/star_left_center"
                                }, {
                                    id: "star_left_bottom",
                                    x: 510,
                                    y: 655,
                                    type: mt.objects.IMAGE,
                                    anchorX: .5,
                                    anchorY: .5,
                                    isVisible: !0,
                                    assetKey: "popup/star_left_bottom"
                                }, {
                                    id: "star_right_top",
                                    x: 1440,
                                    y: 415,
                                    type: mt.objects.IMAGE,
                                    anchorX: .5,
                                    anchorY: .5,
                                    isVisible: !0,
                                    assetKey: "popup/star_right_top"
                                }, {
                                    id: "star_right_center",
                                    x: 1565,
                                    y: 515,
                                    type: mt.objects.IMAGE,
                                    anchorX: .5,
                                    anchorY: .5,
                                    isVisible: !0,
                                    assetKey: "popup/star_right_center"
                                }, {
                                    id: "star_right_bottom",
                                    x: 1555,
                                    y: 660,
                                    type: mt.objects.IMAGE,
                                    anchorX: .5,
                                    anchorY: .5,
                                    isVisible: !0,
                                    assetKey: "popup/star_right_bottom"
                                }, {
                                    id: "stars_bg",
                                    x: 1036,
                                    y: 690,
                                    type: mt.objects.IMAGE,
                                    anchorX: .5,
                                    anchorY: .5,
                                    isVisible: !0,
                                    assetKey: "popup/stars_bg"
                                }]
                            }, {
                                id: "blue_glow",
                                type: mt.objects.IMAGE,
                                isVisible: !0,
                                assetKey: "popup/blue_glow"
                            }, {
                                id: "sun",
                                x: 1050,
                                y: 750,
                                alpha: .5,
                                anchorX: .5,
                                anchorY: .5,
                                type: mt.objects.IMAGE,
                                isVisible: !1,
                                assetKey: "popup/sun"
                            }]
                        }, {
                            type: mt.objects.IMAGE,
                            alpha: .85,
                            scaleX: 205,
                            scaleY: 154,
                            isVisible: !0,
                            inputEnabled: !0,
                            assetKey: "popup/bigWinBg"
                        }]
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Buttons = {}
    }, function(e, t) {
        nge.Com.Buttons.Cfg = Class.extend((function() {
            this.singleton = !0, this.params = {
                fullscreen: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "fullscreenButton",
                    asset: ["btnFullscreenOn", "btnFullscreenOff"],
                    bClass: "button",
                    parentSelector: "^buttonsContainer"
                }),
                sound: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "soundButton",
                    asset: ["Sound1Button", "Sound2Button"],
                    bClass: "button",
                    parentSelector: "^buttonsContainer"
                }),
                coinMinus: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "coinMinusButton",
                    asset: "playareaBtn_bottom_denom_minus",
                    bClass: "button",
                    x: 167,
                    y: 914,
                    parentSelector: "^buttonsContainer"
                }),
                coinPlus: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "coinPlusButton",
                    asset: "playareaBtn_bottom_denom_plus",
                    bClass: "button",
                    x: 335,
                    y: 914,
                    parentSelector: "^buttonsContainer"
                }),
                auto: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "autoButton",
                    asset: ["AutoOffButton", "AutoOnButton"],
                    bClass: "simpleButton",
                    title: [nge.i18n.get("AUTO OFF"), nge.i18n.get("AUTO ON")],
                    textStyle: {
                        font: '20pt "roboto_condensed_regular"'
                    },
                    textY: 1035,
                    textX: [276, 251],
                    parentSelector: "^buttonsContainer"
                }),
                paytable: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "paytableButton",
                    asset: "playareaBtn_info",
                    bClass: "button",
                    x: 399,
                    y: 986,
                    title: nge.i18n.get("PAY TABLE"),
                    textY: 4,
                    parentSelector: "^buttonsContainer"
                }),
                hold1: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "hold1Button",
                    asset: "playareaBtn_hold",
                    bClass: "button",
                    x: 540,
                    y: 988,
                    title: nge.i18n.get("HOLD 1"),
                    textY: 4,
                    parentSelector: "^buttonsContainer"
                }),
                hold2: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "hold2Button",
                    asset: "playareaBtn_hold",
                    bClass: "button",
                    x: 681,
                    y: 988,
                    title: nge.i18n.get("HOLD 2"),
                    textY: 4,
                    parentSelector: "^buttonsContainer"
                }),
                hold3: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "hold3Button",
                    asset: "playareaBtn_hold",
                    bClass: "button",
                    x: 821,
                    y: 988,
                    title: nge.i18n.get("HOLD 3"),
                    textY: 4,
                    parentSelector: "^buttonsContainer"
                }),
                hold4: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "hold4Button",
                    asset: "playareaBtn_hold",
                    bClass: "button",
                    x: 961,
                    y: 988,
                    title: nge.i18n.get("HOLD 4"),
                    textY: 4,
                    parentSelector: "^buttonsContainer"
                }),
                hold5: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "hold5Button",
                    asset: "playareaBtn_hold",
                    bClass: "button",
                    x: 1101,
                    y: 988,
                    title: nge.i18n.get("HOLD 5"),
                    textY: 4,
                    parentSelector: "^buttonsContainer"
                }),
                oneBet: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "oneBetButton",
                    asset: "playareaBtn_info",
                    bClass: "button",
                    x: 1239,
                    y: 987,
                    title: nge.i18n.get("ONE BET"),
                    textY: 4,
                    parentSelector: "^buttonsContainer"
                }),
                maxBet: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "maxBetButton",
                    asset: "playareaBtn_info",
                    bClass: "button",
                    x: 1384,
                    y: 987,
                    title: nge.i18n.get("MAX BET"),
                    textStyle: {
                        align: "center"
                    },
                    textY: 4,
                    parentSelector: "^buttonsContainer"
                }),
                spin: nge.App.getInstance("Com.Buttons.Model", !1, {
                    name: "spinButton",
                    asset: "Btn_Spin",
                    bClass: "button",
                    x: 1520,
                    y: 988,
                    title: nge.i18n.get("SPIN"),
                    textY: 4,
                    parentSelector: "^buttonsContainer"
                })
            }
        }))
    }, function(e, t) {
        nge.Com.Buttons.Controller = nge.Com.Base.extend((function() {
            var e, t, n = {},
                i = {},
                o = {},
                s = {},
                a = 0;
            this.create = function() {
                this.createDefault();
                var a = nge.statesManager.getCurrentName(),
                    c = this.getInstance("Cfg");
                if (t = c[a] ? c[a] : c.params, "undefined" != typeof customButtons && nge.Lib.Helper.mobileAndTabletCheck())
                    for (var u in customButtons)(a = customButtons[u]).x && (t[u].x = a.x), a.y && (t[u].y = a.y);
                for (var g in e || (e = !0, this.subscribe()), n = {}, i = {}, o = {}, s = {}, t) {
                    var f = void 0;
                    if (c = !0, (a = l(u = g)).name) {
                        var p = nge.findOne("^" + a.name);
                        if (!p) {
                            var b = nge.findOne("^" + a.name + "Button");
                            b && (p = b.parent)
                        }
                        p && (f = [p])
                    }
                    if (a.class && (!(f = nge.findAll("." + a.class)) && (p = nge.findAll("." + a.class + "Button"))))
                        for (f = [], b = 0; b < p.length; b++) f.push(p[b].parent);
                    f || (c = !1, f = {
                        type: mt.objects.GROUP,
                        name: a.name,
                        contents: [{
                            type: mt.objects.TEXT,
                            name: a.name + "Text",
                            text: "-",
                            class: "buttonText buttonText" + a.name,
                            style: a.textStyle
                        }, {
                            type: mt.objects.BUTTON,
                            name: a.name + "Button",
                            assetKey: a.asset,
                            class: a.bClass,
                            btnFrames: a.btnFrames,
                            pixelPerfectOver: !a.nonPixelPerfect,
                            pixelPerfectClick: !a.nonPixelPerfect,
                            action: "function () {nge.observer.fire('buttons.pressCommand', '" + u + "');}"
                        }]
                    }, p = a.parentSelector || "^" + nge.statesManager.getCurrentName() + "State", p = nge.findOne(p), f = [p = nge.objects.create(f, p)]), n[u] = f, c ? s[u] = !0 : r(u, a)
                }
                nge.observer.fire("buttons.create.end")
            }, this.getButtons = function() {
                return n
            };
            var r = function(e, t) {
                    for (var i in e = n[e], f)
                        for (var o = 0; o < e.length; o++) nge.Lib.Helper.recursiveSet(i, t[f[i]], e[o])
                },
                l = function(e) {
                    var n = t[e];
                    void 0 === o[e] && (o[e] = -1), o[e]++;
                    var i, s = {};
                    for (i in n) {
                        var a = i,
                            r = n[i],
                            l = o[e];
                        "[object Array]" === Object.prototype.toString.call(r) && (r = r[l % r.length]), s[a] = r
                    }
                    return s
                },
                c = function(e) {
                    var t = nge.Lib.Time.get();
                    if (t < a + 100) return !1;
                    if (a = t, !s[e] && n[e]) {
                        t = n[e];
                        for (var o = 0; o < t.length; o++) {
                            var c = t[o].children[0];
                            if (!c.input.enabled) return;
                            var u = l(e);
                            r(e, u), c.loadTexture(u.asset), u.btnFrames && c.setFrames(u.btnFrames.over, u.btnFrames.out, u.btnFrames.down)
                        }
                    }
                    i[e] && i[e]()
                },
                u = function(e) {
                    for (var o in e) {
                        if (!n[o]) return console.error("nge.App.ClassicGameBase.Com.Buttons.Controller: no button with key ", o), !1;
                        for (var a = e[o], r = n[o], l = 0; l < r.length; l++) {
                            var c = r[l].children[0];
                            if (!c) return !1;
                            if (void 0 !== a.callback && (i[o] = a.callback), void 0 !== a.visible && (r[l].visible = a.visible), void 0 !== a.frame && (c.frame = a.frame), void 0 !== a.classes)
                                for (var u in a.classes) r[l][a.classes[u].action + "Class"](a.classes[u].title);
                            if (void 0 !== a.title && r[l].children[1] && void 0 !== r[l].children[1].text && (nge.Lib.Helper.recursiveSet("children.1.text", a.title, r[l]), s[o] = !0), void 0 !== a.enabled) {
                                if ("function" != typeof c.enable || "function" != typeof c.disable) return console.error("nge.App.ClassicGameBase.Com.Buttons.Controller: no button with key ", a), !1;
                                if (a.enabled) c.enable();
                                else {
                                    var g = t[o];
                                    c.disable(a.disableFrame ? a.disableFrame : g.disableFrame)
                                }
                            }
                        }
                    }
                },
                g = function(e) {
                    delete s[e]
                };
            this.subscribe = function() {
                nge.observer.add("buttons.restoreAutoUpdate", g), nge.observer.add("buttons.changeData", u), nge.observer.add("buttons.pressCommand", c), nge.observer.add("buttons.insidePress", c)
            };
            var f = {
                x: "x",
                y: "y",
                "children.1.x": "textX",
                "children.1.y": "textY",
                "children.1.text": "title"
            }
        }))
    }, function(e, t) {
        nge.Com.Buttons.Model = function(e) {
            return e || (e = {}), {
                name: nge.Lib.Helper.recursiveGet("name", e, !1),
                asset: nge.Lib.Helper.recursiveGet("asset", e, !1),
                btnFrames: nge.Lib.Helper.recursiveGet("btnFrames", e, void 0),
                bClass: nge.Lib.Helper.recursiveGet("bClass", e, !1),
                disableFrame: nge.Lib.Helper.recursiveGet("disableFrame", e, 3),
                nonPixelPerfect: nge.Lib.Helper.recursiveGet("nonPixelPerfect", e, !0),
                x: nge.Lib.Helper.recursiveGet("x", e, 0),
                y: nge.Lib.Helper.recursiveGet("y", e, 0),
                title: nge.Lib.Helper.recursiveGet("title", e, ""),
                textStyle: nge.Lib.Helper.recursiveGet("textStyle", e, {}),
                textX: nge.Lib.Helper.recursiveGet("textX", e, 0),
                textY: nge.Lib.Helper.recursiveGet("textY", e, 0),
                parentSelector: nge.Lib.Helper.recursiveGet("parentSelector", e, "")
            }
        }
    }, function(e, t) {
        nge.Com.ClearButton = {}
    }, function(e, t) {
        nge.Com.ClearButton.Cfg = Class.extend((function() {
            this.singleton = !0, this.cfg = {
                color: "#fff",
                stroke: "#766ce2",
                offset: {
                    x: 0,
                    y: -7
                }
            }, this.get = function() {
                return this.cfg
            }
        }))
    }, function(e, t) {
        nge.Com.ClearButton.Controller = nge.Com.Base.extend((function() {
            var e, t, n;
            this.preload = function() {
                e = this, t || e._getCfg(), this.preloadDefault(!1, t)
            }, this.create = function() {
                this.createDefault(), n || e._subscribe(), n = !0, this.animateDefault()
            }, this._getCfg = function() {
                return t = e.getInstance("Cfg"), !0
            }, this._disable = function() {
                var e = nge.find("^clearButtonTexture");
                e && e.disable(3)
            }, this._enable = function() {
                var e = nge.find("^clearButtonTexture");
                e && e.enable(1)
            }, this._subscribe = function() {
                nge.observer.add("clearButton.enable", e._enable), nge.observer.add("clearButton.disable", e._disable)
            }
        }))
    }, function(e, t) {
        nge.Com.ClearButton.Animator = Class.extend((function() {
            this.firstCreation = function(t) {
                return e(t), !0
            };
            var e = function(e) {
                var t = nge.find("^clearButtonContainer"),
                    n = t.y + 200;
                (t = nge.tween.add(t)).from({
                    y: n
                }, 600, nge.Lib.Tween.Easing.Back.Out, !1, 800).onComplete.add((function() {
                    e && e()
                })), t.start()
            }
        }))
    }, function(e, t) {
        nge.Com.ClearButton.Tpl = function(e) {
            return {
                styles: {
                    ".clearButtonTexture": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 0
                        },
                        frame: 1,
                        anchorX: .5,
                        anchorY: .5
                    },
                    ".clearButtonText": {
                        anchorX: .5,
                        anchorY: .5,
                        y: -14,
                        style: {
                            font: '54px "freesetboldc"',
                            fill: e.cfg.color,
                            stroke: e.cfg.stroke,
                            strokeThickness: 6
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: [{
                        fullPath: "app/testKeno/img/btn/btn_clear.png",
                        key: "/random_button.png",
                        width: 1664,
                        height: 164,
                        frameWidth: 416
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        name: "clearButtonText",
                        class: "clearButtonText",
                        type: mt.objects.TEXT,
                        text: "CLEAR",
                        isVisible: !0
                    }, {
                        name: "clearButtonTexture",
                        class: "clearButtonTexture",
                        type: mt.objects.BUTTON,
                        isVisible: !0,
                        assetKey: "/random_button.png",
                        action: 'function () {nge.observer.fire("kenoMachine.clearBalls");}'
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Coins = {}
    }, function(e, t) {
        nge.Com.Coins.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.create = function() {
                return this.createDefault(), (t = this)._setDefault(), e || t._subscribe(), e = !0
            }, this._setDefault = function() {
                var e = nge.localData.get("coins.cfg");
                if (!e) return !1;
                for (var n = e.length, i = 0; i < n; i++) e[i] = parseFloat(e[i]);
                return nge.localData.set("coins.cfg", e), (n = nge.localData.get("coins.value")) || (n = parseFloat(nge.localData.get("coins.defaultCoin"))), n || (n = e[0]), t._setVal(n), !0
            }, this._minusNC = function() {
                t._minus(!0)
            }, this._plusNC = function() {
                t._plus(!0)
            }, this._minus = function(e) {
                var n = nge.localData.get("coins.value"),
                    i = nge.localData.get("coins.cfg");
                return !!n && (n = i.indexOf(n), i[--n] || (n = e ? 0 : i.length - 1), n = i[n], t._setVal(n), !0)
            }, this._plus = function(e) {
                var n = nge.localData.get("coins.value"),
                    i = nge.localData.get("coins.cfg");
                return !!n && (n = i.indexOf(n), i[++n] || (n = e ? i.length - 1 : 0), n = i[n], t._setVal(n), !0)
            }, this._setVal = function(e) {
                var t, n = nge.findAll(".coinsNumber");
                for (t in n) n[t].text = parseFloat(e).toFixed(2);
                nge.localData.set("coins.value", parseFloat(e)), nge.observer.fire("coins.change", e)
            }, this._subscribe = function() {
                nge.observer.add("brain.openGameSuccess", t._setDefault), nge.observer.add("coins.down", t._minus), nge.observer.add("coins.up", t._plus), nge.observer.add("coins.downNC", t._minusNC), nge.observer.add("coins.upNC", t._plusNC), nge.observer.add("coins.set", t._setVal), nge.observer.add("coins.update", t._setDefault)
            }
        }))
    }, function(e, t) {
        nge.Com.Debug = {}
    }, function(e, t) {
        nge.Com.Debug.Controller = nge.Com.Base.extend((function() {
            this._logicBlocks = "coords fps observer plugin renderStat resolution sounds versions variables".split(" ");
            var e, t = !1,
                n = !0,
                i = !1;
            this.preload = function() {
                return "production" !== nge.Cfg.Main.mode && (this.preloadDefault(), nge.Lib.Helper.logicBlocksDo(this, "preload"), !0)
            }, this.create = function() {
                return e = this, "production" !== nge.Cfg.Main.mode && (this.createDefault(), i = nge.findOne("^debugCom"), e._show(!1), nge.Lib.Helper.logicBlocksDo(this, "create"), t || (nge.Lib.Helper.logicBlocksDo(this, "subscribe"), e._subscribe(), t = !0), !0)
            }, this.update = function() {
                if ("production" === nge.Cfg.Main.mode) return !1;
                nge.Lib.Helper.logicBlocksDo(this, "update")
            }, this._show = function(e) {
                n = void 0 !== e ? e : !n, i.visible = n
            }, this._subscribe = function() {
                nge.observer.add("keyboard.KeyDown", (function(t) {
                    "D" === t && nge.keyboard.check("SHIFT") && e._show()
                }))
            }
        }))
    }, function(e, t) {
        nge.Com.Debug.Coords = Class.extend((function() {
            var e, t;
            this.create = function() {
                return t = this, e = nge.find("^debugCoords"), t._updateCoords(), !0
            }, this._updateCoords = function() {
                var n = t._getCurCoords();
                e.attr("text", "x:" + Math.floor(n.x) + "; y:" + Math.floor(n.y))
            }, this._getCurCoords = function() {
                return {
                    x: nge.game.input.mousePointer.x / nge.game.world.scale.x,
                    y: nge.game.input.mousePointer.y / nge.game.world.scale.y
                }
            };
            var n = 0,
                i = null;
            this.show = function() {
                n = (n + 1) % 3
            }, this.update = function() {
                if (t._updateCoords(), i && (i.filters = i.obJfilters), !n) return !1;
                var e = o(nge.game.world);
                (i = e).filters = e.filters, e.filters = [new PIXI.filters.OutlineFilter(2, 16711680)], nge.Lib.Helper.recursiveSet("debug.selectedObject", e, nge)
            }, this.subscribe = function() {
                nge.observer.add("keyboard.KeyDown", (function(e) {
                    "C" === e && nge.keyboard.check("ALT") && t.show()
                }))
            };
            var o = function(e) {
                for (var t = !1, i = (e = e.children).length - 1; 0 <= i; i--) {
                    var s = e[i];
                    if (s.visible) {
                        if ((s.getData && void 0 !== s.getData().type ? s.getData().type : mt.objects.GROUP) === mt.objects.GROUP) 0 < s.children.length && (t = o(s));
                        else if (t = s, s = {
                                x: nge.game.input.mousePointer.x,
                                y: nge.game.input.mousePointer.y
                            }, t.visible) {
                            var a = t,
                                r = a.getGlobalPosition(),
                                l = a._width,
                                c = a._height;
                            2 === n && (l = a._width || a.width, c = a._height || a.height), l = {
                                x: a.x + l,
                                y: a.y + c
                            }, c = new PIXI.Point, a.parent.toGlobal(l, c), l = c.x - r.x, c = c.y - r.y;
                            var u = r.x - l * a.anchor.x;
                            a = r.y - c * a.anchor.y, t = s.x >= u && s.x < u + l && s.y >= a && s.y < a + c ? t : null
                        } else t = null;
                        if (t) return t
                    }
                }
                return !1
            }
        }))
    }, function(e, t) {
        nge.Com.Debug.Fps = Class.extend((function() {
            var e, t;
            this.create = function() {
                return t = this, e = nge.find("^debugFps"), !0
            }, this.update = function() {
                t._updateFps()
            }, this._updateFps = function() {
                e.attr("text", "fps:" + nge.game.time.fps)
            }
        }))
    }, function(e, t) {
        nge.Com.Debug.Observer = Class.extend((function() {
            var e = this,
                t = !1,
                n = {};
            this.create = function() {
                return nge.localData.get("debug.observer.created") ? e.show(!1) : (i(), nge.localData.set("debug.observer.created", !0)), c(), nge.observer.debugFire = r, nge.observer.debugPreFire = a, !0
            }, this.show = function(e) {
                t = void 0 !== e ? e : !t, e = $(".debugObserverEditor"), t ? e.show() : e.hide()
            };
            var i = function() {
                    $.get("../../js/com/debug/tpl.html", (function(t) {
                        o(t), $(".eventAdd").on("click", (function(t) {
                                t = $(".eventName").val();
                                var n = $(".eventColor").val();
                                return e.add(t, n), !1
                            })),
                            function() {
                                var t = nge.Lib.Helper.getCookie("debug.observer");
                                if (!t) return !1;
                                if (t = JSON.parse(t), !nge.Lib.Helper.getObjSize(t)) return !1;
                                for (var n in t) e.add(n, t[n])
                            }()
                    }))
                },
                o = function(e) {
                    var t = $('<div class="debugObserverEditor"></div>');
                    $("body").append(t), t.html(e), t.hide()
                };
            this.add = function(e, t) {
                if (!e) return alert("no event name"), !1;
                if (n[e]) return alert("event name exist"), !1;
                var i = g,
                    o = u(e);
                return i = nge.Lib.Helper.strReplace("{className}", o, i), i = nge.Lib.Helper.strReplace("{color}", t, i), i = nge.Lib.Helper.strReplace("{name}", e, i), $(".list-observers").append(i), $(".eventName").val(""), n[e] = t, s(), !0
            }, this.remove = function(e) {
                var t = u(e);
                $("." + t).remove(), n[e] = null, delete n[e], s()
            };
            var s = function() {
                    var e = JSON.stringify(n);
                    nge.Lib.Helper.setCookie("debug.observer", e)
                },
                a = function(e, t) {
                    if (e._callee || -1 === Object.keys(n).indexOf(e.eventName)) return !1;
                    var i = nge.Lib.Helper.getCallsStack();
                    return e._callee = t.callee ? {
                        callee: t.callee,
                        caller: t.callee.caller || "none",
                        name: !!i && i[2],
                        stack: i
                    } : "none", !0
                },
                r = function(e) {
                    for (var t in n)
                        if (t === e.eventName) l(e.eventName, n[t], e.params, e._callee);
                        else if (-1 !== t.indexOf("*")) {
                        var i = nge.Lib.Helper.strReplace("*", "", t);
                        new RegExp(i, "ig").test(e.eventName) && l(e.eventName, n[t], e.params, e._callee)
                    }
                },
                l = function(e, t, n, i) {
                    n && (e += " | " + JSON.stringify(n)), log("%c" + e, "color: " + t, i)
                },
                c = function() {
                    nge.observer.add("sendSocket", (function(e) {
                        e = JSON.stringify(e), e = "> sendSocket " + nge.Lib.Time.HHMMSS() + " " + e;
                        var t = nge.Lib.Helper.getObjSize(n);
                        log("%c" + e, !!t && "background: #222; color: #bada55")
                    }), "debug.sendSocket", !0), nge.observer.add("getSocket", (function(e) {
                        if (-1 !== e.indexOf("JackpotResponse")) return !1;
                        var t = !!nge.Lib.Helper.getObjSize(n) && "background: #222; color: #bada55";
                        e = "< getSocket " + nge.Lib.Time.HHMMSS() + " " + e, log("%c" + e, t)
                    }), "debug.getSocket", !0)
                },
                u = function(e) {
                    return e = nge.Lib.Helper.strReplace(".", "", "observer_" + e), e = nge.Lib.Helper.strReplace("'", "", e), e = nge.Lib.Helper.strReplace('"', "", e), nge.Lib.Helper.strReplace("*", "", e)
                };
            this.subscribe = function() {
                nge.observer.add("keyboard.KeyDown", (function(t) {
                    "O" === t && nge.keyboard.check("ALT") && e.show()
                })), nge.observer.add("debug.observer.remove", e.remove)
            };
            var g = '<li class="{className}"><input type="button" onclick="nge.observer.fire(\'debug.observer.remove\',\'{name}\');" value="X"> <font style="color:{color};">{name}</font></li>'
        }))
    }, function(e, t) {
        nge.Com.Debug.Plugin = Class.extend((function() {
            var e = this,
                t = !0,
                n = [".pdebug", ".dg"];
            this.create = function() {
                var t = nge.localData.get("debug.plugin.created");
                if (Phaser && Phaser.Plugin && Phaser.Plugin.Debug && Phaser.Plugin.GameGui) return t || (nge.game.plugins.add(Phaser.Plugin.Debug), nge.game.plugins.add(Phaser.Plugin.GameGui, {
                    autoPlace: !0,
                    width: 200
                }).gui.closed = !0, nge.localData.set("debug.plugin.created", !0)), e.show(!1), !0
            }, this.show = function(e) {
                t = void 0 !== e ? e : !t, e = $(n.join(",")), t ? e.show() : e.hide()
            }, this.subscribe = function() {
                nge.observer.add("keyboard.KeyDown", (function(t) {
                    "O" === t && nge.keyboard.check("ALT") && e.show()
                }))
            }
        }))
    }, function(e, t) {
        nge.Com.Debug.RenderStat = Class.extend((function() {
            var e, t;
            this.create = function() {
                return t = this, e = nge.find("^debugRenderStat"), !0
            }, this.update = function() {
                if (e.visible) {
                    var i = {
                        nSprite: 0,
                        pxSprite: 0,
                        nText: 0,
                        pxText: 0,
                        containers: 0,
                        nMesh: 0,
                        nVertices: 0
                    };
                    nge.wrap.states.world.children.forEach((function(e) {
                        t._fillRenderStat(e, i)
                    })), e.attr("text", "Sprite count = " + i.nSprite + "\nSprite pixels = " + n(i.pxSprite) + "\ntext items = " + i.nText + "\ntext pixels = " + n(i.pxText) + "\ncontainers = " + n(i.containers) + "\nmeshes = " + n(i.nMesh) + "\nvertices = " + n(i.nVertices) + "\n ifs = " + nge.game.scale.isFullScreen + "\n draw calls = " + nge.drawCalls), nge.drawCalls = 0
                }
            };
            var n = function(e) {
                return 1e4 > e ? Math.round(e) : 1e7 > e ? Math.round(e / 1e3) + "K" : 1e10 > e ? Math.round(e / 1e6) + "M" : void 0
            };
            this._fillRenderStat = function(e, n) {
                if (e.mt && e.mt.data)
                    if (e.mt.data.type === mt.objects.TEXT) e.visible && (n.pxText += Math.abs(e.width * e.height), n.nText++);
                    else if (e.mt.data.type === mt.objects.BITMAP_TEXT) e.visible && (n.pxText += Math.abs(e.width * e.height), n.nText++);
                else if (e.mt.data.type === mt.objects.IMAGE && "_slotMachineBlur" !== e.mt.data.class || e.mt.data.type === mt.objects.GRAPHICS || e.mt.data.type === mt.objects.ANIMATION) e.visible && (n.pxSprite += Math.abs(e.width * e.height), n.nSprite++, e.vertexData && (n.nVertices += e.vertexData.length / 2));
                else if (e.mt.data.type !== mt.objects.MASK)
                    if (e.mt.data.type === mt.objects.BUTTON) e.visible && (n.pxSprite += Math.abs(e.width * e.height), n.nSprite++, e.vertexData && (n.nVertices += e.vertexData.length / 2));
                    else if (e.mt.data.type === mt.objects.NINE_SLICE) e.visible && (n.pxSprite += Math.abs(e.width * e.height), n.nSprite++, e.vertices && (n.nVertices += e.vertices.length));
                else if (PIXI && PIXI.spine && e.mt.data.type === mt.objects.SPINE) {
                    if (e.visible) {
                        e = e.spine.slotContainers;
                        for (var i = 0; i < e.length; i++) {
                            var o = e[i];
                            if (o.visible) {
                                o = o.children;
                                for (var s = 0; s < o.length; s++) {
                                    var a = o[s];
                                    a.visible && (a.getData && a.getData().type === mt.objects.BITMAP_TEXT ? n.pxSprite += Math.abs(a._textWidth * a._textHeight) : n.pxSprite += Math.abs(a.width * a.height), n.nSprite++)
                                }
                            }
                        }
                    }
                } else e.mt.data.type === mt.objects.GROUP ? e.visible && (n.containers++, e.children.forEach((function(e) {
                    t._fillRenderStat(e, n)
                }))) : e.mt.data.type === mt.objects.EMITTER && e.visible && (n.containers++, e.children.forEach((function(e) {
                    e.visible && (n.pxSprite += Math.abs(e.width * e.height), n.nSprite++, e.vertexData && (n.nVertices += e.vertexData.length / 2))
                })))
            }
        }))
    }, function(e, t) {
        nge.Com.Debug.Resolution = Class.extend((function() {
            var e, t;
            this.create = function() {
                return e = nge.find("^debugRes"), t = this, !0
            }, this.update = function() {
                t._updateRes()
            }, this._updateRes = function() {
                e.attr("text", "f: " + nge.assets.getQualityFactor() + ", w: " + nge.resolutionsManager.getCurrent().width)
            }
        }))
    }, function(e, t) {
        nge.Com.Debug.Sounds = Class.extend((function() {
            var e = this;
            this.create = function() {
                return "done" === nge.localData.get("sounds.preload") && t(), !0
            }, this.subscribe = function() {
                nge.observer.add("sounds.preloaded", t), nge.observer.add("keyboard.KeyDown", (function(t) {
                    "P" === t && nge.keyboard.check("ALT") && e.show()
                }))
            }, this.show = function() {
                Ext.Viewport.setStyle({
                    width: "100%"
                }), Ext.Viewport.toggleMenu("right")
            };
            var t = function() {
                var e, t = function(e) {
                        var t = "false" !== nge.Lib.Helper.getCookie("debug.sound." + e);
                        return nge.observer.fire("sound.volume", {
                            s: e,
                            volume: t ? 1 : 0
                        }), {
                            xtype: "checkboxfield",
                            name: e,
                            label: e,
                            value: e,
                            checked: t,
                            labelWidth: 150,
                            listeners: {
                                change: function(t, n) {
                                    nge.Lib.Helper.setCookie("debug.sound." + e, n.toString(), 0), nge.observer.fire("sound.volume", {
                                        s: e,
                                        volume: n ? 1 : 0
                                    })
                                }
                            }
                        }
                    },
                    n = [];
                for (e in nge.soundManager.audios) n.push(new t(e));
                Ext.Viewport.setMenu({
                    width: "200px",
                    autoScroll: !0,
                    listeners: {
                        hide: function() {
                            Ext.Viewport.setStyle({
                                width: "0%"
                            })
                        }
                    },
                    items: {
                        autoScroll: !0,
                        xtype: "container",
                        scrollable: {
                            y: "scroll"
                        },
                        width: 180,
                        height: "100%",
                        items: n
                    }
                }, {
                    side: "right"
                })
            }
        }))
    }, function(e, t) {
        nge.Com.Debug.Tpl = function() {
            return {
                objects: {
                    name: "objects",
                    contents: [{
                        name: "debugCoords",
                        x: 1660,
                        isVisible: !0,
                        text: "",
                        type: mt.objects.TEXT,
                        style: {
                            font: '15pt "Helvetica"',
                            fill: "#00FF00",
                            align: "left"
                        }
                    }, {
                        name: "debugVer",
                        x: 1660,
                        y: 25,
                        isVisible: !0,
                        text: "v. " + nge.Cfg.Main.version,
                        type: mt.objects.TEXT,
                        style: {
                            font: '15pt "Helvetica"',
                            fill: "#00FF00",
                            align: "left"
                        }
                    }, {
                        name: "debugFps",
                        x: 1660,
                        y: 50,
                        isVisible: !0,
                        text: "",
                        type: mt.objects.TEXT,
                        style: {
                            font: '15pt "Helvetica"',
                            fill: "#00FF00",
                            align: "left"
                        }
                    }, {
                        name: "debugRes",
                        x: 1660,
                        y: 75,
                        isVisible: !0,
                        text: "",
                        type: mt.objects.TEXT,
                        style: {
                            font: '15pt "Helvetica"',
                            fill: "#00FF00",
                            align: "left"
                        }
                    }, {
                        name: "debugRenderStat",
                        x: 25,
                        isVisible: !0,
                        text: "",
                        type: mt.objects.TEXT,
                        style: {
                            font: '15pt "Helvetica"',
                            fill: "#00FF00",
                            align: "left"
                        }
                    }, {
                        name: "debugVersions",
                        x: 1660,
                        y: 100,
                        isVisible: !0,
                        type: mt.objects.TEXT,
                        style: {
                            font: '15pt "Helvetica"',
                            fill: "#00FF00",
                            align: "left"
                        }
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Debug.Variables = Class.extend((function() {
            var e = ["Phaser"],
                t = function(e) {
                    console.warn("Unexpected global variable", e, window[e])
                },
                n = function() {
                    nge.Lib.SelfCheckTools.showChanges(t), nge.Lib.SelfCheckTools.saveState()
                };
            this.create = function() {
                nge.Lib.SelfCheckTools.addReserved(e), n()
            }, this.update = function() {
                n()
            }
        }))
    }, function(e, t) {
        nge.Com.Debug.Versions = Class.extend((function() {
            this.create = function() {
                var e, t = nge.find("^debugVersions"),
                    n = "",
                    i = nge.versions();
                for (e in i) n += e + ": " + i[e] + "\n";
                t.attr("text", n)
            }
        }))
    }, function(e, t) {
        nge.Com.Demo = {}
    }, function(e, t) {
        nge.Com.Demo.Controller = function() {
            this.create = function() {
                return nge.rafSetTimeout(this.gotoPlay, 1e3), nge.observer.add("StatesManager.create.end", (function(e) {
                    if ("demo" === e) return !1;
                    nge.userInfoRemove(), nge.observer.fire("game.readyToPlay"), nge.observer.remove("StatesManager.create.end", !1, "userInfoRemove", !0)
                }), "userInfoRemove", !0), !0
            }, this.gotoPlay = function() {
                return nge.observer.fire("window.resize"), nge.brain.showGamePlayState(), nge.userInfoHTML("Preparing to show Game Play"), !0
            }
        }
    }, function(e, t) {
        nge.Com.EuroButton = {}
    }, function(e, t) {
        nge.Com.EuroButton.Cfg = Class.extend((function() {
            this.singleton = !0, this.cfg = {
                color: "#fff",
                stroke: "#766ce2",
                offset: {
                    x: 0,
                    y: -7
                }
            }, this.get = function() {
                return this.cfg
            }
        }))
    }, function(e, t) {
        nge.Com.EuroButton.Controller = nge.Com.Base.extend((function() {
            var e, t, n;
            this.preload = function() {
                e = this, t || e._getCfg(), this.preloadDefault(!1, t)
            }, this._getCfg = function() {
                t = e.getInstance("Cfg").get();
                var n = nge.localData.get("currency");
                return t.currency = n, !0
            }, this.create = function() {
                this.createDefault(), n || e._subscribe(), n = !0
            }, this._subscribe = function() {}
        }))
    }, function(e, t) {
        nge.Com.EuroButton.Tpl = function(e) {
            var t = e.currency;
            return {
                styles: {},
                assets: {
                    name: "assets",
                    contents: []
                },
                objects: {
                    name: "objects",
                    contents: [{
                        x: e.offset.x,
                        y: e.offset.y,
                        anchorX: .5,
                        anchorY: .5,
                        type: mt.objects.TEXT,
                        style: {
                            font: 50 / (t ? t.length : 1) + 30 + "px 'freesetboldc'",
                            fill: e.color,
                            stroke: e.stroke,
                            strokeThickness: void 0 === e.strokeThickness ? 5 : e.strokeThickness
                        },
                        align: "center",
                        isVisible: !0,
                        text: t,
                        name: "btn_euro_text"
                    }, {
                        name: "btn_euro",
                        class: "button",
                        x: 0,
                        y: 0,
                        anchorX: .5,
                        anchorY: .5,
                        type: mt.objects.BUTTON,
                        isVisible: 1,
                        assetKey: "/btn/btn_euro.png",
                        action: "function () {nge.observer.fire('currency.change');}"
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Freespin = {}
    }, function(e, t) {
        nge.Com.Freespin.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i, o = 0,
                s = !1;
            this._pauseMode = this._canSpin = !1, this._restoringFlag = !1, this.create = function() {
                return (t = this)._pauseMode = !1, n = nge.findOne("^autospinSpinsLeftText"), i = nge.findOne("^autospinSpinsTotal"), e || t._subscribe(), nge.localData.set("freespin.inProgress", !1), nge.localData.set("spin.type", "SpinRequest"), e = !0, t._restoringFlag = !1, !0
            }, this.freespinStart = function(e) {
                nge.observer.fire("freespin.startProcess.start"), e = parseInt(e, 10), s = !0, t._canSpin = !0;
                var o = nge.localData.get("freespin.inProgress"),
                    a = nge.localData.get("freespin.spinsTotal");
                !nge.localData.get("freespin.spinsTotalResetFlag") && o && a || (a = 0, nge.localData.set("freespin.spinsTotalResetFlag", !1)), a += e, nge.localData.getAll(), t.setSpinType(), nge.localData.set("freespin.inProgress", !0), nge.localData.set("freespin.lastSpin", !1), t._restoringFlag || (nge.localData.set("freespin.spinsTotal", a), nge.localData.set("freespin.spinsLeft", parseInt(nge.localData.get("freespin.spinsLeft"), 10) || 0 + e)), t._spinCommand(), nge.observer.fire("buttons.freespinMode"), n && (n.text = e, n.visible = !0), i && (i.text = e), t._restoringFlag = !1, nge.observer.fire("freespin.startProcess.end"), nge.observer.fire("autospinButton.disable"), nge.observer.fire("maxBetButton.disable")
            }, this.setSpinType = function() {
                nge.localData.set("spin.type", "FreeSpinRequest")
            }, this.setSpinsTotal = function(e) {
                nge.localData.set("freespin.spinsTotal", e)
            }, this._spinHandleResponse = function(e) {
                if (!nge.localData.get("freespin.inProgress")) return !1;
                n && (n.text = nge.localData.get("freespin.spinsLeft") - 1), nge.localData.set("freespin.spinsLeft", parseInt(e.freeSpinRemain))
            }, this.finishFreespin = function() {
                s = !1, o = 0, nge.localData.get("freespin.inProgress") && (nge.localData.set("spin.type", "SpinRequest"), nge.localData.set("freespin.spinsTotalResetFlag", !0), nge.localData.set("freespin.inProgress", !1), n && (n.visible = !1)), nge.observer.fire("freespin.end")
            }, this._spinCompleteResponse = function() {
                if (!nge.localData.get("freespin.inProgress")) return !1;
                nge.localData.get("slotMachine.slotWin");
                var e = parseInt(nge.localData.get("freespin.spinsLeft"), 10);
                n && (n.text = e), 0 === e ? t.finishFreespin() : 0 < e && (t._canSpin = !0)
            }, this._winlinesCompleteHandler = function() {
                t._spinCommand()
            }, this._pause = function() {
                t._pauseMode = !0
            }, this._resume = function() {
                t._pauseMode = !1, t._spinCommand()
            }, this._spinCommand = function() {
                if (!t._canSpin || t._pauseMode) return !1;
                nge.observer.fire("slotMachine.spinCommand"), t._canSpin = !1
            }, this._spinRestore = function(e) {
                if ("FreeSpins" !== e.state && "FreeReSpins" !== e.state) return !1;
                var n = 0;
                if (e.freeSpinRemain) var i = e.freeSpinRemain;
                else if (e.slotWin && e.slotWin.linePickBonus)
                    for (var o = 0; o < e.slotWin.linePickBonus.length; o++) {
                        var s = e.slotWin.linePickBonus[o].bonusName;
                        if ("FreeSpins" === s || "FreeReSpins" === s) {
                            i = e.slotWin.linePickBonus[o].params;
                            break
                        }
                    }
                return e.freeSpinsTotal && (n = parseInt(e.freeSpinsTotal, 10)), nge.localData.set("freespin.spinsLeft", i), nge.localData.set("freespin.spinsTotal", n), t._restoringFlag = !0, nge.observer.fire("freespin.start", i, 1300), !0
            }, this._winHandler = function(e) {
                if (!s) return !1;
                o += e, nge.observer.fire("freespinWin", {
                    winAmount: e,
                    freespinTotalWin: o
                })
            }, this._subscribe = function() {
                return nge.observer.add("freespin.start", t.freespinStart), nge.observer.add("slotMachine.spinResponse", t._spinHandleResponse), nge.observer.add("slotMachine.spinComplete", t._spinCompleteResponse), nge.observer.add("freespin.restore", t._spinRestore), nge.observer.add("win", t._winHandler), nge.observer.add("spinAndWinComplete", t._winlinesCompleteHandler), nge.observer.add("freespin.pause", t._pause), nge.observer.add("freespin.resume", t._resume), !0
            }
        }))
    }, function(e, t) {
        nge.Com.FreeGamePopup = {}
    }, function(e, t) {
        nge.Com.FreeGamePopup.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.create = function() {
                return t = this, this.createDefault(), e || (t._subscribe(), e = !0), !0
            }, this._show = function() {
                var e = nge.localData.get("slotMachine.lastResponseType"),
                    n = nge.localData.get("freeGame");
                if (!n || "FreeSpinResponse" === e) return t._hide(), !1;
                nge.find("#freeGamePopup").visible = !0, nge.find("^winUserCodeText").text = n.amount, nge.find("^freeGameCoinValue").text = nge.localData.get("currency") + n.coin, nge.find("^freeGameCoinsNumberValue").text = n.coinsPerBet, nge.find("^freeGameLinesValue").text = n.lines, nge.find("^freeGameExpValue").text = n.freeGameExpiration, nge.observer.fire("brain.disableButtons"), nge.observer.fire("settingsButton.disable"), nge.observer.fire("euroButton.disable"), nge.observer.fire("paytableButton.disable")
            }, this._hide = function() {
                var e = nge.find("#freeGamePopup");
                if (!e) return !1;
                e.visible = !1
            }, this._close = function() {
                t._hide(), nge.observer.fire("spinButton.enable")
            }, this._subscribe = function() {
                nge.observer.add("freeGamePopup.hide", t._hide), nge.observer.add("freeGames.show", t._show), nge.observer.add("freeGamePopup.close", t._close), nge.observer.add("freespin.end", t._show), nge.observer.add("freespin.start", t._hide), nge.observer.add("freespin.restore", t._hide)
            }
        }))
    }, function(e, t) {
        nge.Com.FreeGamePopup.Tpl = function() {
            return {
                assets: {
                    name: "assets",
                    contents: [{
                        type: mt.assets.IMAGE,
                        fullPath: "img/popup/freegame/popup_bg.png",
                        key: "/popup_bg"
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/black-bg.png",
                        key: "/black-bg.png",
                        qualityObeys: !1
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/tutorial/welcome_scr/btn_play_now.png",
                        key: "btn_play_now",
                        width: 1548,
                        height: 144,
                        frameWidth: 516,
                        frameHeight: 144
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "freeGamePopup",
                        name: "freeGamePopup",
                        type: mt.objects.GROUP,
                        isVisible: !1,
                        contents: [{
                            id: "congratsContainer",
                            name: "congratsContainer",
                            type: mt.objects.GROUP,
                            contents: [{
                                name: "congratsText",
                                id: "congratsText",
                                x: 1024,
                                y: 320,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 90px 'freesetboldc'",
                                    fill: "#ffffff",
                                    align: "center",
                                    stroke: "#1c98ab",
                                    strokeThickness: 7
                                },
                                isVisible: !0,
                                text: "CONGRATS"
                            }]
                        }, {
                            id: "mainAreaContainer",
                            name: "mainAreaContainer",
                            type: mt.objects.GROUP,
                            contents: [{
                                name: "machWin",
                                x: 1024,
                                y: 484,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 54px 'freesetboldc'",
                                    fill: "#308794",
                                    align: "center",
                                    strokeThickness: 0
                                },
                                isVisible: !0,
                                text: "Your winnings are:"
                            }, {
                                name: "machWin2",
                                x: 1024,
                                y: 714,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 54px 'freesetboldc'",
                                    fill: "#ffffff",
                                    align: "center",
                                    stroke: "#1c98ab",
                                    strokeThickness: 6
                                },
                                isVisible: !0,
                                text: "Free Games"
                            }, {
                                name: "winUserCodeText",
                                id: "winUserCodeText",
                                x: 1024,
                                y: 575,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 146px 'freesetboldc'",
                                    fill: "#ff3f00",
                                    align: "center",
                                    stroke: "#ffffff",
                                    strokeThickness: 10
                                },
                                isVisible: !0,
                                text: " "
                            }, {
                                name: "freeGameCoinText",
                                id: "freeGameCoinText",
                                x: 720,
                                y: 810,
                                type: mt.objects.TEXT,
                                anchorX: 0,
                                style: {
                                    font: "bold 33px 'freesetboldc'",
                                    fill: "#308794",
                                    align: "left"
                                },
                                isVisible: !0,
                                text: "Coin Value:"
                            }, {
                                name: "freeGameCoinValue",
                                id: "freeGameCoinValue",
                                x: 1330,
                                y: 810,
                                type: mt.objects.TEXT,
                                anchorX: 1,
                                style: {
                                    font: "bold 36px 'freesetboldc'",
                                    fill: "#FF3F00",
                                    align: "right"
                                },
                                isVisible: !0,
                                text: "Coin Value:"
                            }, {
                                name: "freeGameCoinsNumberText",
                                id: "freeGameCoinsNumberText",
                                x: 720,
                                y: 860,
                                type: mt.objects.TEXT,
                                anchorX: 0,
                                style: {
                                    font: "bold 33px 'freesetboldc'",
                                    fill: "#308794",
                                    align: "left"
                                },
                                isVisible: !0,
                                text: "Coins Number:"
                            }, {
                                name: "freeGameCoinsNumberValue",
                                id: "freeGameCoinsNumberValue",
                                x: 1330,
                                y: 860,
                                type: mt.objects.TEXT,
                                anchorX: 1,
                                style: {
                                    font: "bold 36px 'freesetboldc'",
                                    fill: "#FF3F00",
                                    align: "right"
                                },
                                isVisible: !0,
                                text: "Coins Value:"
                            }, {
                                name: "freeGameLinesText",
                                id: "freeGameLinesText",
                                x: 720,
                                y: 910,
                                type: mt.objects.TEXT,
                                anchorX: 0,
                                style: {
                                    font: "bold 33px 'freesetboldc'",
                                    fill: "#308794",
                                    align: "left"
                                },
                                isVisible: !0,
                                text: "Lines Number:"
                            }, {
                                name: "freeGameLinesValue",
                                id: "freeGameLinesValue",
                                x: 1330,
                                y: 910,
                                type: mt.objects.TEXT,
                                anchorX: 1,
                                style: {
                                    font: "bold 36px 'freesetboldc'",
                                    fill: "#FF3F00",
                                    align: "right"
                                },
                                isVisible: !0,
                                text: "Lines Value:"
                            }, {
                                name: "freeGameExpText",
                                id: "freeGameExpText",
                                x: 720,
                                y: 960,
                                type: mt.objects.TEXT,
                                anchorX: 0,
                                style: {
                                    font: "bold 33px 'freesetboldc'",
                                    fill: "#308794",
                                    align: "left"
                                },
                                isVisible: !0,
                                text: "Expiration date:"
                            }, {
                                name: "freeGameExpValue",
                                id: "freeGameExpValue",
                                x: 1330,
                                y: 960,
                                type: mt.objects.TEXT,
                                anchorX: 1,
                                style: {
                                    font: "bold 36px 'freesetboldc'",
                                    fill: "#FF3F00",
                                    align: "right"
                                },
                                isVisible: !0,
                                text: "Expiration date:"
                            }, {
                                name: "freeGamePoputCloseButtonText",
                                id: "freeGamePoputCloseButtonText",
                                x: 1024,
                                y: 1118,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                anchorY: .5,
                                style: {
                                    font: "bold 54px 'freesetboldc'",
                                    fill: "#ffffff",
                                    align: "center"
                                },
                                isVisible: !0,
                                text: "GREAT!"
                            }, {
                                name: "freeGamePoputCloseButton",
                                id: "freeGamePoputCloseButton",
                                x: 1024,
                                y: 1122,
                                anchorX: .5,
                                anchorY: .5,
                                type: mt.objects.BUTTON,
                                isVisible: !0,
                                assetKey: "btn_play_now",
                                action: "function () {nge.observer.fire('freeGamePopup.close');}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 2
                                }
                            }, {
                                name: "results",
                                id: "results",
                                x: 1024,
                                y: 768,
                                anchorX: .5,
                                anchorY: .5,
                                type: mt.objects.IMAGE,
                                isVisible: !0,
                                assetKey: "/popup_bg"
                            }, {
                                type: mt.objects.IMAGE,
                                scaleX: 205,
                                scaleY: 154,
                                alpha: .75,
                                isVisible: !0,
                                width: 10,
                                height: 10,
                                inputEnabled: !0,
                                assetKey: "/black-bg.png"
                            }]
                        }]
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.FreeGameCounter = {}
    }, function(e, t) {
        nge.Com.FreeGameCounter.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.preload = function() {
                this.preloadDefault()
            }, this.create = function() {
                this.createDefault(), t = this, e || t._subscribe(), e = !0, this.animateDefault(), t._check()
            }, this._check = function() {
                nge.localData.get("freeGame.inProgress") ? (nge.find("^freeGameCounterContainer").visible = !0, nge.find("^counterButtonText").text = nge.localData.get("freeGame.totalAmount")) : nge.find("^freeGameCounterContainer").visible = !1
            }, this._changeNumberCounter = function() {
                if (!nge.localData.get("freeGame") || 0 >= nge.localData.get("freeGame.amount")) return nge.find("^freeGameCounterContainer").visible = !1;
                nge.find("^counterButtonText").text = nge.localData.get("freeGame.amount")
            }, this._subscribe = function() {
                nge.observer.add("kenoMachine.animationEnd", t._changeNumberCounter, !1, !0), nge.observer.add("scratchMachine.scratchComplete", t._changeNumberCounter, !1, !0)
            }
        }))
    }, function(e, t) {
        nge.Com.FreeGameCounter.Tpl = function() {
            return {
                styles: {
                    ".counterButtonTexture": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 0
                        },
                        frame: 1,
                        anchorX: .5,
                        anchorY: .5
                    },
                    ".counterButtonText": {
                        anchorX: .5,
                        anchorY: .5,
                        y: 0,
                        style: {
                            font: '96px "freesetboldc"',
                            fill: "#FFFFFF"
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: [{
                        fullPath: "img/kenoPlayarea/btn_freeSpin.png",
                        key: "/btn_freeSpin.png",
                        width: 292,
                        height: 244
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        name: "counterButtonText",
                        class: "counterButtonText",
                        x: 1820,
                        y: 1100,
                        type: mt.objects.TEXT,
                        text: "50",
                        isVisible: !0
                    }, {
                        name: "counterButtonTexture",
                        class: "counterButtonTexture",
                        x: 1820,
                        y: 1115,
                        type: mt.objects.IMAGE,
                        isVisible: !0,
                        assetKey: "/btn_freeSpin.png"
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.FreeGameSummaryPopup = {}
    }, function(e, t) {
        nge.Com.FreeGameSummaryPopup.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.create = function() {
                return t = this, this.createDefault(), e || (t._subscribe(), e = !0), !0
            }, this._show = function() {
                var e = nge.localData.get("slotMachine.params.freeGameWin");
                nge.find("^winUserCodeTextSumGame").text = nge.localData.get("freeGame.totalAmount"), nge.find("^winUserCodeTextSumMoney").text = nge.localData.get("currency") + nge.Lib.Validator.floatMoney(e, !0), nge.find("^freeGameSummaryPopup").visible = !0, nge.observer.fire("brain.disableButtons"), nge.observer.fire("settingsButton.disable"), nge.observer.fire("euroButton.disable"), nge.observer.fire("paytableButton.disable")
            }, this._close = function() {
                nge.find("^freeGameSummaryPopup").destroy(!0), nge.observer.fire("spinButton.enable")
            }, this._subscribe = function() {
                nge.observer.add("freeGameSumPopup.show", t._show), nge.observer.add("freeGameSumPopup.close", t._close)
            }
        }))
    }, function(e, t) {
        nge.Com.FreeGameSummaryPopup.Tpl = function() {
            return {
                assets: {
                    name: "assets",
                    contents: [{
                        type: mt.assets.IMAGE,
                        fullPath: "img/popup/freegame/popup_bg_2sections.png",
                        key: "/popup_sum"
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/black-bg.png",
                        key: "/black-bg.png",
                        qualityObeys: !1
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        name: "freeGameSummaryPopup",
                        type: mt.objects.GROUP,
                        isVisible: !1,
                        contents: [{
                            name: "congratsContainerSum",
                            type: mt.objects.GROUP,
                            contents: [{
                                name: "congratsTextSum",
                                x: 1024,
                                y: 320,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 90px 'freesetboldc'",
                                    fill: "#ffffff",
                                    align: "center",
                                    stroke: "#1c98ab",
                                    strokeThickness: 7
                                },
                                isVisible: !0,
                                text: "CONGRATS"
                            }]
                        }, {
                            name: "mainAreaContainerSum",
                            type: mt.objects.GROUP,
                            contents: [{
                                name: "played",
                                x: 1024,
                                y: 484,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 54px 'freesetboldc'",
                                    fill: "#308794",
                                    align: "center",
                                    strokeThickness: 0
                                },
                                isVisible: !0,
                                text: "You have played"
                            }, {
                                name: "played2",
                                x: 1024,
                                y: 800,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 54px 'freesetboldc'",
                                    fill: "#308794",
                                    align: "center",
                                    strokeThickness: 0
                                },
                                isVisible: !0,
                                text: "free games"
                            }, {
                                name: "won",
                                x: 1024,
                                y: 870,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 54px 'freesetboldc'",
                                    fill: "#308794",
                                    align: "center",
                                    strokeThickness: 0
                                },
                                isVisible: !0,
                                text: "And you have won"
                            }, {
                                name: "winUserCodeTextSumGame",
                                x: 1040,
                                y: 600,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 146px 'freesetboldc'",
                                    fill: "#ff3f00",
                                    align: "center",
                                    stroke: "#ffffff",
                                    strokeThickness: 10
                                },
                                isVisible: !0,
                                text: 300
                            }, {
                                name: "winUserCodeTextSumMoney",
                                x: 1040,
                                y: 970,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 146px 'freesetboldc'",
                                    fill: "#ff3f00",
                                    align: "center",
                                    stroke: "#ffffff",
                                    strokeThickness: 10
                                },
                                isVisible: !0,
                                text: 300
                            }, {
                                name: "results_sum",
                                x: 1024,
                                y: 768,
                                anchorX: .5,
                                anchorY: .5,
                                type: mt.objects.IMAGE,
                                isVisible: !0,
                                assetKey: "/popup_sum"
                            }, {
                                type: mt.objects.IMAGE,
                                scaleX: 205,
                                scaleY: 154,
                                alpha: .75,
                                isVisible: !0,
                                width: 10,
                                height: 10,
                                inputEnabled: !0,
                                assetKey: "/black-bg.png"
                            }]
                        }]
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Gamble = {}
    }, function(e, t) {
        nge.Com.Gamble.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i = "",
                o = 0,
                s = ["black", "red"];
            this.create = function() {
                e = this, o = 2 * nge.localData.get("slotMachine.slotWin.totalWin");
                var n = "YOU CAN WIN x2: " + nge.Lib.Validator.floatMoney(o, !0) + nge.localData.get("currency");
                return nge.localData.set("infoPanel.text", n), t || e._subscribe(), t = !0
            }, this._show = function(t) {
                e._gambleHandleResponse(t.winning)
            }, this._actionRequest = function(e) {
                i = e, self.disableButtons(), nge.observer.fire("gamble.actionRequest")
            }, this._gambleHandleResponse = function(e) {
                var t = null;
                0 < e ? (n = !0, t = i) : (n = !1, t = s.filter((function(e) {
                    return e !== i
                }))[0]);
                var o = "gamble/cards/" + t + " " + (e = nge.Lib.Helper.getRandomInt(1, 26)) + ".png";
                nge.rafSetTimeout((function() {
                    self._loadNewCardTexture(o)
                }), 1e3), self.complete()
            }, this._loadNewCardTexture = function(e) {
                var t = new Phaser.Loader(nge.game);
                t.image("card", nge.assets.getImagesPath() + e), t.onLoadComplete.addOnce((function() {
                    var e = nge.find("^card"),
                        t = PIXI.TextureCache.card,
                        n = nge.assets.getQualityFactor();
                    if (!t) return !1;
                    t.width /= n, t.height /= n, e.width = t.width, e.height = t.height, e.setTexture(t), nge.observer.fire("gamble.cardHasBeenShown")
                })), t.start()
            }, this.complete = function() {
                nge.localData.set("slotMachine.slotWin.totalWin", 0);
                var e = nge.Lib.Validator.floatMoney(o, !0) + nge.localData.get("currency");
                nge.rafSetTimeout((function() {
                    n ? (nge.find("^winCont").visible = !0, nge.find("^winUserCodeText").text = e, nge.observer.fire("gamble.win")) : (nge.find("^loseCont").visible = !0, nge.observer.fire("gamble.lose")), self._loadNewCardTexture("gamble/cards/card.png")
                }), 2e3), nge.rafSetTimeout((function() {
                    self._loadNewCardTexture("gamble/cards/card.png"), nge.statesManager.display("play", !0)
                }), 5e3)
            }, this.disableButtons = function() {
                nge.find("^btn_" + i).disable("2");
                var e = s.filter((function(e) {
                    return e !== i
                }))[0];
                nge.find("^btn_" + e).disable("0")
            }, this._subscribe = function() {
                nge.observer.add("gamble.showCard", e._actionRequest), nge.observer.add("gamble.response", e._show)
            }
        }))
    }, function(e, t) {
        nge.Com.Gamble.Tpl = function() {}
    }, function(e, t) {
        nge.Com.GambleButton = {}
    }, function(e, t) {
        nge.Com.GambleButton.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i, o = !1;
            this._isTotalWin = function() {
                var e = nge.localData.get("slotMachine.slotWin.totalWin");
                return !!(e && 0 < e)
            }, this.create = function() {
                this.createDefault(), (n = this)._isTotalWin() && n._gambleButtonEnable(), e || n._subscribe(), e = !0
            }, this._gambleButtonEnable = function() {
                if (nge.localData.get("livingLargeBonusGameEnd")) return nge.localData.set("livingLargeBonusGameEnd", !1), !1;
                nge.find("^btn_gamble").enable(1);
                var e = nge.localData.get("autospin.inProgress"),
                    t = nge.localData.get("freespin.inProgress"),
                    s = !!nge.localData.get("slotMachine.slotWin.linePickBonus").length;
                e || t || s || i || (o = !0, n.animate(1))
            }, this.animate = function(e) {
                if (!o) return !1;
                var n = e ? 200 : 0,
                    i = e ? 0 : 200,
                    s = nge.find("^gambleButtonContainer");
                s.visible = !0, s.y = n, (t = nge.tween.add(s).to({
                    y: i
                }, 1e3, "Quart.easeOut")).onComplete.add((function() {
                    e || (o = nge.find("^gambleButtonContainer").visible = !1)
                }), this), t.start()
            }, this._changeNeedAnimate = function() {
                o = !1
            }, this._gambleButtonDisable = function() {
                nge.find("^btn_gamble").disable(), n.animate(0)
            }, this._handleSpin = function() {
                n._isTotalWin() && (i = !1, n._gambleButtonEnable())
            }, this._disableWithoutAnimation = function() {
                n._changeNeedAnimate(), nge.find("^gambleButtonContainer").visible = !1, i = !0
            }, this._subscribe = function() {
                nge.observer.add("slotMachine.spinComplete", n._handleSpin), nge.observer.add("slotMachine.spinStart", n._gambleButtonDisable), nge.observer.add("bigWin", n._disableWithoutAnimation), nge.observer.add("freespin.end", n._disableWithoutAnimation), nge.observer.add("brain.bonusGameEnd", n._changeNeedAnimate, !1, !0), nge.observer.add("gamble.actionRequest", n._changeNeedAnimate, !1, !0)
            }
        }))
    }, function(e, t) {
        nge.Com.GambleButton.Cfg = Class.extend((function() {
            this.singleton = !0, this.cfg = {
                gambleButtonChange: !1,
                gambleButtonName: "btn_gamble"
            }, this.get = function() {
                return this.cfg
            }
        }))
    }, function(e, t) {
        nge.Com.HistoryDataCollector = {}
    }, function(e, t) {
        nge.Com.HistoryDataCollector.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.create = function() {
                t = this, this.createDefault(), e || t._subscribe(), e = !0, t._historyRequest()
            }, this._historyRequest = function() {
                var e = nge.Lib.Helper.parseGetParams("gameRoundId");
                nge.observer.fire("history.request", e)
            }, this._historyResponse = function(e) {
                if (!e.data.response) return !1;
                nge.observer.remove("transportMessage.HistoryDetailResponse", t._historyResponse, "historyResponse");
                var n = JSON.parse(e.data.response);
                n.response.isHistory = !0, nge.localData.set("brain.restoreGame.lastResponse", n.response), n.response.spinResult && (e = nge.Lib.Helper.rowsToColumns(n.response.spinResult.rows), nge.localData.set("slotMachine.initialSymbols", e)), "ScratchResponse" === n.response["@type"] && (e = nge.Lib.Helper.rowsToColumns(n.response.scratchResult.rows), nge.localData.set("slotMachine.initialSymbols", e)), nge.localData.set("poker.lastResponse", n.response), nge.statesManager.display("history")
            }, this._subscribe = function() {
                nge.observer.add("transportMessage.HistoryDetailResponse", t._historyResponse, "historyResponse")
            }
        }))
    }, function(e, t) {
        nge.Com.InfoPanel = {}
    }, function(e, t) {
        nge.Com.InfoPanel.Animator = Class.extend((function() {
            this.firstCreation = function(t) {
                return e(t), !0
            };
            var e = function(e) {
                var t = nge.find("^infoPanelContainer"),
                    n = t.y;
                t.y += 200, (t = nge.tween.add(t)).to({
                    y: n
                }, 600, nge.Lib.Tween.Easing.Back.Out, !1, 800).onComplete.add((function() {
                    e && e()
                })), t.start()
            }
        }))
    }, function(e, t) {
        nge.Com.InfoPanel.Controller = nge.Com.Base.extend((function() {
            var e, t, n;
            this.create = function() {
                t = this, this.createDefault(), e = nge.find("^infopanel_text"), n || t._subscribe(), n = !0;
                var i = nge.localData.get("infoPanel.text") || "";
                return t._show(i), this.animateDefault(), !0
            }, this._show = function(t) {
                nge.localData.set("infoPanel.text", t), e.text = t
            }, this._subscribe = function() {
                nge.observer.add("infoPanel.show", t._show)
            }
        }))
    }, function(e, t) {
        nge.Com.InfoPanel.RandomPhrases = Class.extend((function() {
            this.phrases = [], this.get = function() {
                return this.phrases
            }
        }))
    }, function(e, t) {
        nge.Com.Jackpot = {}
    }, function(e, t) {
        nge.Com.Jackpot.Cfg = Class.extend((function() {
            this.singleton = !0, this.cfg = {
                color: "#fff",
                stroke: "#766ce2",
                offset: {
                    x: 0,
                    y: -7
                }
            }, this.get = function() {
                return this.cfg
            }
        }))
    }, function(e, t) {
        nge.Com.Jackpot.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.create = function() {
                return t = this, this.createDefault(), nge.observer.fire("jackpotRequest"), e || t._subscribe(), e = !0
            }, this._changeJackpot = function(e) {
                var t = nge.statesManager.getCurrentName();
                e = nge.Lib.Validator.floatMoney(e.amount, !0) + "€", nge.find("^jackpotContainerContent").visible = !0, "paytable" === t && (nge.find("^jackpotContainerContent").visible = !1), nge.find("^jackpotAmountText").text = e, nge.find("^topTextWin2").text = e
            }, this._subscribe = function() {
                nge.observer.add("jackpot.amount", t._changeJackpot)
            }
        }))
    }, function(e, t) {
        nge.Com.LayersSwitcher = {}
    }, function(e, t) {
        nge.Com.LayersSwitcher.Cfg = Class.extend((function() {
            this.singleton = !0, this.scenes = {
                play: {
                    defaultLayer: "game",
                    baseScreen: "game",
                    autoSwitch: !1,
                    autoSwitchDelay: 2e3,
                    allContainers: "closeButtonContainer fullScreenContainer welcomeScreenContainer helpContainer dragonChoiceContainer finalPopupContainer gameLogoContainer bottomUIContainer reelsBorderContainer scattersContainer gameScreenContainer backgroundContainer".split(" "),
                    layers: {
                        welcome: "closeButtonContainer fullScreenContainer welcomeScreenContainer gameLogoContainer bottomUIContainer reelsBorderContainer gameScreenContainer backgroundContainer".split(" "),
                        game: "closeButtonContainer fullScreenContainer gameLogoContainer bottomUIContainer reelsBorderContainer gameScreenContainer backgroundContainer".split(" "),
                        info: "closeButtonContainer fullScreenContainer helpContainer gameLogoContainer bottomUIContainer reelsBorderContainer gameScreenContainer backgroundContainer".split(" "),
                        scatters: "closeButtonContainer fullScreenContainer gameLogoContainer bottomUIContainer reelsBorderContainer scattersContainer gameScreenContainer backgroundContainer".split(" "),
                        dragonChoiceGame: ["closeButtonContainer", "fullScreenContainer", "dragonChoiceContainer"],
                        bonusGameEndPopup: "closeButtonContainer fullScreenContainer finalPopupContainer gameLogoContainer bottomUIContainer reelsBorderContainer gameScreenContainer backgroundContainer".split(" ")
                    }
                }
            }
        }))
    }, function(e, t) {
        nge.Com.LayersSwitcher.Controller = nge.Com.Base.extend((function() {
            var e, t, n = {
                    cfg: null,
                    objects: {},
                    next: null,
                    current: null
                },
                i = this;
            this.create = function() {
                if (this.createDefault(), t = this.getInstance("Helper"), i._getCfg(), n.next = {
                        name: "",
                        layer: !1
                    }, n.current = {
                        name: "",
                        layer: !1
                    }, i._findSelectors(), i._show(n.cfg.defaultLayer), e || i._subscribe(), n.cfg.autoSwitch) {
                    var o = function() {
                        nge.rafSetTimeout(o, n.cfg.autoSwitchDelay);
                        var e = Object.keys(n.cfg.layers).length - 1;
                        e = nge.Lib.Helper.getRandomInt(0, e), e = Object.keys(n.cfg.layers[e]), nge.observer.fire("layersSwitcher.show", e)
                    };
                    nge.rafSetTimeout(o, n.cfg.autoSwitchDelay)
                }
            }, this._show = function(e) {
                n.next.name = e.split(" ")[0], n.next.name === n.current.name ? console.warn("LayersSwitcher: trying to change to the same layer", n.current.name) : (n.next.layer = n.cfg.layers[n.next.name], n.next.layer ? (i._changeListVisibility(n.cfg.allContainers, !1), i._changeListVisibility(n.next.layer.static, !0), i._animate((function() {
                    nge.observer.fire("layerSwitcher.animationComplete", e)
                })), n.current = {
                    name: n.next.name,
                    layer: n.next.layer
                }, nge.localData.get("layersSwitcher.debug") && console.log("layerSwircher.show: %c" + e, "color:yellow;background:black")) : console.error("No layer with key", n.next.name))
            }, this._getCfg = function() {
                var e = i.getInstance("Cfg");
                if (!e || !e.scenes) return console.error("nge.Com.LayersSwitcher.Controller no state cfg", e), !1;
                var t = nge.statesManager.getCurrentName();
                n.cfg = nge.Com.LayersSwitcher.Model(e.scenes[t])
            }, this._findSelectors = function() {
                n.objects = {};
                for (var e = 0; e < n.cfg.allContainers.length; e++) {
                    var t = n.cfg.allContainers[e];
                    n.objects[t] = nge.findOne("^" + t)
                }
            }, this._animate = function(e) {
                for (var i in t.animationTypes) {
                    var o = t.animationTypes[i].name,
                        s = n.next.layer && n.next.layer[o];
                    (n.current.layer && n.current.layer[o] || s) && t.animationTypes[o](n, e)
                }
            }, this._changeListVisibility = function(e, t) {
                if (e)
                    for (var i = 0; i < e.length; i++) n.objects[e[i]] || console.error("nge.Com.LayersSwitcher.Controller error: no key", e[i]), n.objects[e[i]].visible = t
            }, this._subscribe = function() {
                nge.observer.add("layersSwitcher.show", i._show), e = !0
            }
        }))
    }, function(e, t) {
        nge.Com.LayersSwitcher.Helper = Class.extend((function() {
            function e(e, t) {
                return (t = t.objects[e] || nge.findOne("^" + e)) || console.error("Cant't find element ", e), t
            }

            function t(e, t, n) {
                if (e)
                    for (var i = 0; i < e.length; i++) t.objects[e[i]] || console.error("nge.Com.LayersSwitcher.Controller error: no key", e[i]), t.objects[e[i]].visible = n
            }
            this.singleton = !0, this.animationTypes = {
                darkLayer: function(e, t) {
                    var n = e.objects[e.cfg.allContainers[0]].parent,
                        i = nge.Com.LayersSwitcher.Capture,
                        o = e.current;
                    e = e.next.layer, o.layer && o.layer.darkLayer && ((o = nge.localData.get("layersSwitcher.animations.darkLayer.image")).parent.remove(o), o.destroy()), e && e.darkLayer && (o = i.generateImage(0, n), t && t(), nge.localData.set("layersSwitcher.animations.darkLayer.image", o))
                },
                fromDark: function(e, t) {
                    var n = e.objects[e.cfg.allContainers[0]].parent,
                        i = nge.Com.LayersSwitcher.Capture;
                    (e = e.next.layer) && e.fromDark && (n = i.generateImage(0, n), i.animate(n, 1e3, {
                        alpha: 0
                    }, (function() {
                        t && t()
                    }), !0, !1))
                },
                capture: function(n, i) {
                    var o = n.objects[n.cfg.allContainers[0]].parent,
                        s = nge.Com.LayersSwitcher.Capture,
                        a = n.current,
                        r = n.next.layer;
                    a.layer && a.layer.capture && function(t) {
                        var a = nge.localData.get("layersSwitcher.animations.capture.captureImage");
                        a ? s.animate(a, 500, {
                            alpha: 0
                        }, (function() {
                            t.overlay && (t.overlay.forEach((function(t) {
                                (t = e(t, n)).primalParent !== o && (o.remove(t), t.primalParent.add(t))
                            })), t.overlay.forEach((function(t) {
                                (t = e(t, n)).z = t.primalZ
                            })), o.sort(), t.overlay.forEach((function(t) {
                                e(t, n).parent.sort()
                            }))), i && i()
                        }), !0, !1) : console.error("Invalid captureImage", a)
                    }(a.layer.capture), r && r.capture && function(i) {
                        o.children.forEach((function(e) {
                            e.primalZ = e.z
                        })), t(n.cfg.allContainers, n, !1), t(n.current.layer.static, n, !0);
                        var a = s.getTexture(i.exclude);
                        a = s.getImage(a, o), t(n.cfg.allContainers, n, !1), t(n.next.layer.static, n, !0), i.overlay && i.overlay.forEach((function(t) {
                            (t = e(t, n)) && (t.primalZ = t.z, t.primalParent = t.parent, o !== t.parent && (t.parent.remove(t), o.add(t)), o.bringToTop(t))
                        })), a.visible = !0, nge.localData.set("layersSwitcher.animations.capture.captureImage", a)
                    }(r.capture)
                },
                bounce: function(t, n) {
                    var i = function(e, t, n, i) {
                            e.visible = !0;
                            var o = nge.localData.get("layersSwitcher.animations.bounce.tweens");
                            o && o[n] && o[n].stop(!0);
                            for (var s, a, r = 0, l = 0 < t ? 750 : 500, c = .5 * (1 - t), u = .5 * (1 + t), g = 0; g < e.children.length; g++) e.getChildAt(g).hasClass("cover") && (r = g, (a = e.getChildAt(g)).alpha = 0 < t ? 0 : .7, e.parent.addChildAt(a, e.parent.getChildIndex(e)), nge.tween.add(a).to({
                                alpha: 0 < t ? .7 : 0
                            }, l, 0 < t ? nge.Lib.Tween.Easing.Cubic.Out : nge.Lib.Tween.Easing.Cubic.In, !0));
                            e.original || (e.original = {
                                x: e.centerX,
                                y: e.centerY
                            }), e.scale.x = e.scale.y = c, (s = nge.tween.add(e.scale)).to({
                                x: u,
                                y: u
                            }, l, 0 < t ? nge.Lib.Tween.Easing.Elastic.Out : nge.Lib.Tween.Easing.Back.In, !1), s.onUpdateCallback((function() {
                                e.centerX = e.original.x, e.centerY = e.original.y
                            }), this), s.onComplete.add((function() {
                                if (e.scale.x = e.scale.y = 1, e.centerX = e.original.x, e.centerY = e.original.y, a && e.addChildAt(a, r), s = null, delete o[n], nge.localData.set("layersSwitcher.animations.bounce.tweens", o), i) return i()
                            }), this), s.start(), o || (o = {}), o[n] = s, nge.localData.set("layersSwitcher.animations.bounce.tweens", o)
                        },
                        o = t.current.layer,
                        s = t.next.layer;
                    o && o.bounce && o.bounce.forEach((function(o) {
                        if (!s.static.includes(o)) {
                            var a = e(o, t);
                            a && i(a, -1, o, (function() {
                                a.visible = !1, n && n()
                            }))
                        }
                    })), s && s.bounce && s.bounce.forEach((function(o) {
                        var s = e(o, t);
                        s && i(s, 1, o, n)
                    }))
                },
                fakeLoaderOn: function(e, n) {
                    var i = e.next.layer;
                    if (i && i.fakeLoaderOn) {
                        i = i.fakeLoaderOn.showDuration || 500, t(e.cfg.allContainers, e, !1), t(e.current.layer.static, e, !0);
                        var o = nge.findOne("^loadingBarContainer");
                        o || (o = nge.objects.create("loadingBarContainer")), o.alpha = 0, nge.find("^loadingBarFill").visible = !0, nge.tween.add(o).to({
                            alpha: 1
                        }, i, null, !0).onComplete.addOnce((function() {
                            t(e.cfg.allContainers, e, !1), o.alpha = 1, n && n()
                        }), this)
                    }
                },
                fakeLoaderOff: function(e, t) {
                    var n = e.next.layer;
                    if (n && n.fakeLoaderOff) {
                        e = n.fakeLoaderOff.hideDelay || 0;
                        var i = n.fakeLoaderOff.hideDuration || 500,
                            o = nge.findOne("^loadingBarContainer");
                        o || (o = nge.objects.create("loadingBarContainer")), o.alpha = 1, (n = nge.find("^loadingBarFill")) && (n.visible = !0), nge.rafSetTimeout((function() {
                            nge.tween.add(o).to({
                                alpha: 0
                            }, i, null, !0).onComplete.addOnce((function() {
                                o.alpha = 0, o.destroy(), t && t()
                            }), this)
                        }), e)
                    }
                }
            }
        }))
    }, function(e, t) {
        nge.Com.LayersSwitcher.Capture = {
            getTexture: function(e) {
                var t, n;
                if (nge.observer.fire("capture.started"), e)
                    for (t = 0; t < e.length; t++)(n = nge.findOne("^" + e[t])) ? n.visible = !1 : console.error("Can't exclude object with name \"" + e[t] + "\". Maybe it doesn't exist");
                nge.game.paused = !0;
                var i = new Phaser.RenderTexture(nge.game, nge.game.width, nge.game.height, "cover", Phaser.scaleModes.SHOW_ALL, nge.game.renderer.resolution);
                if ((t = nge.objects.create(new nge.Mlm.Objects.Graphics({}))).beginFill(nge.game.stage.backgroundColor), t.lineStyle(1, nge.game.stage.backgroundColor, 1), t.drawRect(0, 0, nge.game.width, nge.game.height), t.endFill(), i.renderXY(t, 0, 0), t.clear(), i.renderXY(nge.game.world, -nge.game.camera.x, -nge.game.camera.y), nge.game.paused = !1, e)
                    for (t = 0; t < e.length; t++)(n = nge.findOne("^" + e[t])) && (n.visible = !0);
                return nge.observer.fire("capture.ended"), i
            },
            generateImage: function(e, t) {
                var n = nge.objects.create(new nge.Mlm.Objects.Graphics({}));
                return n.beginFill(e), n.drawRect(0, 0, 1, 1), n.endFill(), (e = nge.objects.create(new nge.Mlm.Objects.Image({
                    assetKey: "1px_empty"
                }))).loadTexture(n.generateTexture()), e.width = nge.game.width / nge.game.world.scale.x, e.height = nge.game.height / nge.game.world.scale.y, e.visible = !0, (t = t || nge.game.world).add(e), t.bringToTop(e), e
            },
            getImage: function(e, t) {
                var n = nge.objects.create(new nge.Mlm.Objects.Image({
                    assetKey: "1px_empty"
                }));
                return n.loadTexture(e), n.width = nge.game.width / nge.game.world.scale.x, n.height = nge.game.height / nge.game.world.scale.y, n.visible = !1, (t = t || nge.game.world).add(n), t.bringToTop(n), n
            },
            animate: function(e, t, n, i, o, s, a, r, l) {
                return (t = nge.tween.add(e).to(n || {}, t || 0, s || nge.Lib.Tween.Easing.Linear.None, o, a, r, l)).onComplete.addOnce((function() {
                    if (e.parent.remove(e), e.destroy(), i) return i()
                }), this), t
            },
            __test: function() {
                var e = this.getTexture();
                (e = this.getImage(e, nge.game.world)).visible = !0, this.animate(e, 2e3, {
                    alpha: 0
                }, (function() {}), !0, !1, 0)
            }
        }
    }, function(e, t) {
        nge.Com.LayersSwitcher.Model = function(e) {
            return e || (e = {}), {
                baseScreen: e.hasOwnProperty("baseScreen") ? e.baseScreen : "game",
                defaultLayer: e.hasOwnProperty("defaultLayer") ? e.defaultLayer : "game",
                autoSwitch: !!e.hasOwnProperty("autoSwitch") && e.autoSwitch,
                autoSwitchDelay: e.hasOwnProperty("autoSwitchDelay") ? e.autoSwitchDelay : 2e3,
                allContainers: e.hasOwnProperty("allContainers") ? e.allContainers : [],
                layers: e.hasOwnProperty("layers") ? e.layers : []
            }
        }
    }, function(e, t) {
        nge.Com.Lines = {}
    }, function(e, t) {
        nge.Com.Lines.Controller = nge.Com.Base.extend((function() {
            var e, t, n;
            this.create = function() {
                n = this, this.createDefault();
                var i = nge.localData.get("lines.cfg");
                return t = 1, i && (t = i[i.length - 1]), nge.localData.set("maxLinesValue", t), n._setDefault(), e || n._subscribe(), e = !0
            }, this._setDefault = function() {
                var e = nge.localData.get("lines.value");
                if (!e) {
                    e = 1;
                    var t = nge.localData.get("lines.cfg");
                    t && (e = t[t.length - 1])
                }
                return n._setVal(e, !0), !0
            }, this._minusNC = function() {
                n._minus(!0)
            }, this._plusNC = function() {
                n._plus(!0)
            }, this._minus = function(e) {
                var t = nge.localData.get("lines.value"),
                    n = nge.localData.get("lines.cfg");
                return !!t && (t = n.indexOf(t), n[--t] || (t = e ? 0 : n.length - 1), t = n[t], nge.observer.fire("lines.set", t), !0)
            }, this._plus = function(e) {
                var t = nge.localData.get("lines.value"),
                    n = nge.localData.get("lines.cfg");
                return !!t && (t = n.indexOf(t), n[++t] || (t = e ? n.length - 1 : 0), t = n[t], nge.observer.fire("lines.set", t), !0)
            }, this._setVal = function(e, t) {
                for (var n in nge.observer.fire("winlines.hideAll"), t || (nge.observer.fire("lines.change", e), nge.localData.set("winlines.updated", !0)), t = nge.findAll(".linesNumber")) t[n].text = e;
                nge.localData.set("lines.value", e)
            }, this._setMax = function() {
                n._setVal(t)
            }, this._subscribe = function() {
                nge.observer.add("brain.openGameSuccess", n._setDefault), nge.observer.add("lines.down", n._minus), nge.observer.add("lines.up", n._plus), nge.observer.add("lines.downNC", n._minusNC), nge.observer.add("lines.upNC", n._plusNC), nge.observer.add("lines.set", n._setVal), nge.observer.add("lines.update", n._setDefault)
            }
        }))
    }, function(e, t) {
        nge.Com.Load = {}
    }, function(e, t) {
        nge.Com.Load.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.preload = function() {
                t = this, this.preloadDefault(), e = this.getInstance("Cfg"), t._auth(), nge.userInfoHTML("Preloading fonts and sounds"), t._preloadUber(), t._preloadFonts(), t._preloadCustomJs()
            }, this.create = function() {
                this.createDefault(), nge.rafSetTimeout((function() {
                    nge.statesManager.display("loadAssets")
                }), 1)
            }, this._auth = function() {
                nge.userInfoHTML("Attempting to Auth"), nge.observer.fire("brain.authRequest")
            }, this._preloadUber = function() {
                var e = nge.assets.getAntiCacheSuffix(),
                    t = nge.assets.getImagesPath();
                nge.wrap.load.json("uber_json", t + "uber.json" + e)
            }, this._preloadFonts = function() {
                var t, n = nge.assets.getAntiCacheSuffix(),
                    i = e.fonts || {};
                for (t in i) nge.wrap.load.font(t, nge.realPathPrefix + i[t] + ".otf" + n)
            }, this._preloadCustomJs = function() {
                var e = nge.Lib.Helper.parseGetParams("customJs");
                e && nge.Lib.Helper.loadJsCssFile(e, "js")
            }
        }))
    }, function(e, t) {
        nge.Com.Load.Cfg = Class.extend((function() {
            this.singleton = !0, this.fonts = {
                freesetboldc: "css/fonts/freeSet-Bold",
                hobo_std: "css/fonts/hobo_std",
                roboto_condensed_regular: "css/fonts/roboto_condensed_regular",
                roboto_condensed_bold: "css/fonts/roboto_condensed_bold",
                roboto_regular: "css/fonts/roboto_regular"
            }, this.atlasesGroups = ["atlases"], this.archives = []
        }))
    }, function(e, t) {
        nge.Com.Load.Tpl = function() {
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
    }, function(e, t) {
        nge.Com.LoadAssets = {}
    }, function(e, t) {
        nge.Com.LoadAssets.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i, o = !1,
                s = !1,
                a = !1;
            this.preload = function() {
                this.preloadDefault(), e = this, t = nge.App.getInstance("Com.Load.Cfg"), e._preloadSounds(), i || (this.subscribe(), i = !0), e._preloadScrollbars(), e._preloadLoader(), e._preloadAtlases(), e._preloadBitmapFonts()
            }, this.create = function() {
                n = nge.Lib.Time.get(), nge.Lib.Checker.delay((function() {
                    var e = nge.Lib.Time.getDeltaT(n);
                    return o || (2e4 < e ? (s = !1, o = !0) : !0 === nge.localData.get("brain.firstAuthComplete") && (o = s = !0)), o && a
                }), (function() {
                    nge.rafSetTimeout((function() {
                        s ? (nge.userInfoHTML("Auth Complete"), nge.observer.fire("loadAssets.complete"), nge.statesManager.display(nge.statesManager.getDefaultState())) : (nge.userInfoHTML("Auth Fail. Try again later."), nge.userFatalErrorHTML("Auth Fail", "Try again later."))
                    }), 1)
                }), 500, 1e4, !0)
            }, this.subscribe = function() {
                nge.observer.add("sounds.preloaded", (function() {
                    a = !0
                }))
            }, this._preloadScrollbars = function() {
                e.preloadDefault({
                    assets: nge.tpl.group("scrollbarVertical").assets
                }), e.preloadDefault({
                    assets: nge.tpl.group("scrollbarHorizontal").assets
                })
            }, this._preloadLoader = function() {
                window.mt.data.assets.contents.push({
                    name: "loader",
                    contents: nge.tpl.group("loader").assets.contents,
                    id: 4
                }), window.mt.data.objects.contents.push({
                    id: "loader",
                    name: "loader",
                    contents: nge.tpl.group("loader").objects.contents,
                    isVisible: !0,
                    type: mt.objects.GROUP
                })
            }, this._preloadAtlases = function() {
                if (!t || !t.atlasesGroups || !t.atlasesGroups.length) return !1;
                for (var e = 0; e < t.atlasesGroups.length; e++) {
                    var n = t.atlasesGroups[e];
                    window.mt.data.assets.contents.push({
                        name: n,
                        contents: nge.tpl.group(n).assets.contents
                    })
                }
            }, this._preloadBitmapFonts = function() {
                if (t && t.bitmapFonts)
                    for (var e in t.bitmapFonts) window.mt.data.assets.contents.push({
                        key: e,
                        type: mt.assets.BITMAP_FONT,
                        block: mt.assets.blocks.STATIC,
                        textureURL: t.bitmapFonts[e].textureURL,
                        bitmapFont: t.bitmapFonts[e].bitmapFont
                    })
            }, this._preloadSounds = function() {
                // var e = nge.Lib.Helper.mobileAndTabletCheck(),
                //     t = nge.App.getInstance("Mlm.StatesManager.Cfg").params.lazyLoad;
                // e || t ? a = !0 : nge.soundManager.preload()
                nge.soundManager.preload()
            }
        }))
    }, function(e, t) {
        nge.Com.LoadAssets.Tpl = function() {
            var e = {
                assets: {
                    contents: []
                },
                objects: {
                    contents: []
                }
            };
            if ("undefined" == typeof customButtons) return e;
            for (var t in customButtons) {
                var n = customButtons[t];
                if (n.callback) {
                    if (n.imageUrl) {
                        var i = {};
                        i.key = t.concat("-blank"), i.fullPath = n.imageUrl, e.assets.contents.push(i)
                    }
                    if (customButtons[t].imageBase64) {
                        var o = new Image;
                        o.src = customButtons[t].imageBase64,
                            function(e) {
                                o.onload = function() {
                                    nge.wrap.cache.addImage(e.concat("-blank"), o.src, o)
                                }
                            }(t)
                    }
                }
            }
            return e
        }
    }, function(e, t) {
        nge.Com.Maxbet = {}
    }, function(e, t) {
        nge.Com.Maxbet.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i;
            this.create = function() {
                i = this, this.createDefault(), t = this.getInstance("Cfg").get(), e || (i._subscribe(), i._update()), e = !0
            }, this._update = function() {
                var e = nge.localData.get("lines.value"),
                    t = nge.localData.get("bet.value"),
                    n = nge.localData.get("maxBetValue");
                return e !== nge.localData.get("maxLinesValue") || t !== n ? (i._maxbetButtonChange(!1), i._spinButtonChange(!1), !1) : (i._maxbetButtonChange(!0), i._spinButtonChange(!0), !0)
            }, this._maxbetButtonChange = function(e) {
                if (!t.maxbetButtonChange) return !1;
                (n = e) ? i._maxBetButtonDisableMax(): i._maxBetButtonEnable()
            }, this._spinButtonChange = function(e) {
                if (!t.spinButtonChange) return !1;
                nge.observer.fire("spinButton.maxBet", e)
            }, this._maxBetButtonEnable = function() {
                if (nge.localData.get("autospin.inProgress") || nge.localData.get("freespin.inProgress") || nge.localData.get("freeGame.inProgress")) return !1;
                n ? i._maxBetButtonDisableMax() : (nge.find("^" + t.maxbetButtonName).enable(), nge.find("^btn_maxbet_text1").removeClass("disableText"), nge.find("^btn_maxbet_text2").removeClass("disableText"))
            }, this._maxBetButtonDisable = function() {
                nge.find("^" + t.maxbetButtonName).disable(4), nge.find("^btn_maxbet_text1").addClass("disableText"), nge.find("^btn_maxbet_text2").addClass("disableText")
            }, this._maxBetButtonDisableMax = function() {
                if (nge.localData.get("autospin.inProgress") || nge.localData.get("freespin.inProgress") || nge.localData.get("freeGame.inProgress")) return !1;
                nge.find("^" + t.maxbetButtonName).disable(3), nge.find("^btn_maxbet_text1").removeClass("disableText"), nge.find("^btn_maxbet_text2").removeClass("disableText")
            }, this._subscribe = function() {
                nge.observer.add("bet.change", (function() {
                    i._update()
                })), nge.observer.add("lines.change", (function() {
                    i._update()
                })), nge.observer.add("maxBetButton.enable", i._maxBetButtonEnable), nge.observer.add("maxBetButton.disable", i._maxBetButtonDisable), nge.observer.add("slotMachine.spinComplete", (function() {
                    i._update()
                }))
            }
        }))
    }, function(e, t) {
        nge.Com.Maxbet.Cfg = Class.extend((function() {
            this.singleton = !0, this.cfg = {
                maxbetButtonChange: !1,
                maxbetButtonName: "btn_maxbet",
                spinButtonChange: !1,
                spinButtonName: "spinButton",
                spinButtonRegularSprite: "/slots/btn_spin_regular.png",
                spinButtonMaxSprite: "/slots/btn_spin_maxbet.png"
            }, this.get = function() {
                return this.cfg
            }
        }))
    }, function(e, t) {
        nge.Com.Paytable = {}
    }, function(e, t) {
        nge.Com.Paytable.Cfg = Class.extend((function() {
            this.singleton = !0, this.tpl = "TplPaytableBonusLinesTabs", this.params = {
                x: 100,
                y: 50,
                horizontal: !0,
                itemLogoWidth: 280,
                itemLogoHeight: 280,
                mw: 3,
                gapX: 492,
                gapY: 40,
                linesContainerX: 0,
                linesContainerY: 0,
                paytableWasteSymbols: []
            }, this.get = function() {
                return this.params
            }
        }))
    }, function(e, t) {
        nge.Com.Paytable.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i, o;
            this.preload = function() {
                o = this;
                var e = this.getInstance("Cfg");
                n = e.get(), t = e.tpl, this.preloadDefault(t)
            }, this.create = function() {
                return this.createDefault(t), i || o._subscribe(), i || (i = !0), this.customCreate(), !0
            }, this.customCreate = function() {
                if (nge.tpl.group("paytable")) return !1;
                var e = nge.localData.get("payout.cfg"),
                    t = {},
                    i = 0,
                    o = e.length,
                    s = 0;
                e: for (; s < o; s++) {
                    var a = e[s].symbols,
                        r = e[s].payout,
                        l = e[s].matchCount,
                        c = 0,
                        u = a[0];
                    if (n.hasOwnProperty("paytableWasteSymbols")) {
                        var g = n.paytableWasteSymbols;
                        for (m in g)
                            if (u === g[m]) continue e
                    }
                    if (0 !== r) {
                        if (0 < l) u = "any_" + a.join("_"), c = l;
                        else
                            for (l = a.length, g = 0; g < l; g++) {
                                if (u !== a[g]) continue e;
                                c++
                            }
                        t[u] || (i++, t[u] = {}, t[u].awards = []), t[u].awards.push({
                            name: c,
                            value: r
                        })
                    }
                }
                e = nge.findOne("^paytableItemsContainer"), n.hasOwnProperty("x") && (e.x = n.x), n.hasOwnProperty("y") && (e.y = n.y);
                var f = n.horizontal,
                    p = n.itemLogoWidth,
                    b = n.itemLogoHeight;
                o = n.mw, s = n.gapX, a = n.gapY, c = r = 0, u = 1;
                var m = i % o;
                for (var h in l = (o * s - m * s) / 2, t) {
                    var d = t[h].awards,
                        y = nge.objects.create("paytableItemContainer", e);
                    y.visible = !0, y.id = h + "_itemContainer", y.name = h + "_itemContainer", y.x = r, y.y = c, u > i - m && (y.x += l), (g = y.create(0, 0, h)).id = h + "_logo", g.name = h + "_logo", g.width = p, g.height = b;
                    var _ = 0;
                    d.forEach((function(e) {
                        var t = nge.objects.create("paytableItemText", y);
                        t.x = f ? p + 50 : 100, t.y = f ? b / 5 * ((5 - d.length) / 2) : b + 15, t.visible = !0;
                        var n = nge.objects.create("paytableAwardName", t);
                        n.y = _, n.text = e.name, n.visible = !0, (t = nge.objects.create("paytableAwardValue", t)).name = "paytableAwardValue" + e + h, t.y = _, t.text = "- " + e.value, t.visible = !0, _ += 50
                    })), r = 0 == u % o ? 0 : r + s, c += 0 == u % o ? b + a + (f ? 0 : 200) : 0, u++
                }
            }, this._showTab = function(e) {
                switch (e.tab) {
                    case "LinesTab":
                        nge.observer.fire("winlines.thumbsRequest")
                }
            }, this._createThumbs = function(t) {
                e = nge.find("#paytableLinesContainer"), n.hasOwnProperty("linesContainerX") && (e.x = n.linesContainerX), n.hasOwnProperty("linesContainerY") && (e.y = n.linesContainerY);
                for (var i = 0, o = 0, s = 0; s < t.length; s++) {
                    t[s].x = s % 3 * (t[s].width + 130) + 130, t[s].y = ~~(s / 3) * (t[s].height + 150) + 100, t[s].visible = !0;
                    var a = nge.objects.create("paytableLinesText");
                    a.x = t[s].x + t[s].width / 2, a.y = t[s].y - 30, a.text = "LINE " + (s + 1), a.alpha = 1, a.name = "paytableLinesText_" + (s + 1), 3 <= t.length && ~~(s / 3) == ~~(t.length / 3) && (i || (i = t.length % 3, o = (e.width - 130 - (t[s].width + 130) * i) / 2), t[s].x += o, a.x += o), e.addChild(a), e.addChild(t[s])
                }
            }, this._subscribe = function() {
                nge.observer.add("tabs.paytablePopupObject.switch", o._showTab), nge.observer.add("winlines.thumbsResponse", o._createThumbs)
            }
        }))
    }, function(e, t) {
        nge.Com.Paytable.TplPaytableBonusLinesTabs = function() {
            var e = [{
                    name: "paytableItemContainer",
                    type: mt.objects.GROUP,
                    contents: [{
                        name: "paytableLogo",
                        type: mt.objects.IMAGE,
                        isVisible: !1,
                        width: 256,
                        height: 256,
                        assetKey: null
                    }, {
                        name: "paytableItemText",
                        x: 306,
                        width: 256,
                        height: 256,
                        type: mt.objects.GROUP,
                        contents: [{
                            name: "paytableAwardName",
                            type: mt.objects.TEXT,
                            anchorX: 1,
                            anchorY: 0,
                            style: {
                                font: "34pt 'freesetboldc'",
                                fill: "#41C402",
                                align: "left"
                            },
                            isVisible: !1
                        }, {
                            name: "paytableAwardValue",
                            x: 15,
                            type: mt.objects.TEXT,
                            style: {
                                font: "34pt 'freesetboldc'",
                                fill: "#26A5B8",
                                align: "left"
                            },
                            isVisible: !1
                        }],
                        isVisible: !1
                    }],
                    isVisible: !1
                }],
                t = nge.tpl.group("bonus"),
                n = nge.tpl.group("paytable");
            return (e = {
                styles: {
                    "#paytablePopupObject .tabBtn": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 3
                        },
                        frame: 1
                    },
                    "#paytablePopupObject .active .tabBtn": {
                        btnFrames: {
                            over: 3,
                            out: 3,
                            down: 3
                        },
                        frame: 3,
                        enabled: !1
                    },
                    "#paytablePopupObject .tabText": {
                        y: 100,
                        anchorX: .5,
                        anchorY: 1,
                        style: {
                            font: "50px 'freesetboldc'",
                            fill: "#13a6d0",
                            strokeThickness: 0,
                            align: "left"
                        }
                    },
                    "#paytablePopupObject .active .tabText": {
                        style: {
                            fill: "#ffffff",
                            stroke: "#1f8ea7",
                            strokeThickness: 3
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: [{
                        name: "groupLogo",
                        contents: nge.tpl.group("logo").assets.contents
                    }, {
                        name: "groupBonus",
                        contents: t.assets.contents
                    }, {
                        name: "groupPaytable",
                        contents: n ? n.assets.contents : []
                    }, {
                        fullPath: "img/black-bg.png",
                        key: "/black-bg.png",
                        qualityObeys: !1
                    }, {
                        fullPath: "img/btn/tab_center.png",
                        key: "/settings/tab_center.png",
                        width: 2288,
                        height: 236,
                        frameWidth: 572
                    }, {
                        fullPath: "img/btn/tab_left.png",
                        key: "/settings/tab_left.png",
                        width: 2208,
                        height: 236,
                        frameWidth: 552
                    }, {
                        fullPath: "img/btn/tab_right.png",
                        key: "/settings/tab_right.png",
                        width: 2176,
                        height: 236,
                        frameWidth: 544
                    }, {
                        fullPath: "img/btn/tab_close.png",
                        key: "/settings/close_paytable.png",
                        width: 216,
                        height: 72,
                        frameWidth: 72
                    }, {
                        fullPath: "img/btn/tab_info_bg.png",
                        key: "/btn/tab_info_bg.png"
                    }, {
                        fullPath: "img/btn/tab_stars_bg.png",
                        key: "/stars"
                    }, {
                        fullPath: "img/settings/total_bet_txt_fill.png",
                        key: "/settings/total_bet_txt_fill.png"
                    }, {
                        fullPath: "img/settings/money.png",
                        key: "/settings/money.png"
                    }, {
                        fullPath: "img/settings/separator_money_btn.png",
                        key: "/settings/separator_money_btn.png",
                        qualityObeys: !1
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "paytablePopupContainer",
                        name: "paytablePopupContainer",
                        type: mt.objects.GROUP,
                        contents: [{
                            id: "groupLogo",
                            name: "groupLogo",
                            type: mt.objects.GROUP,
                            x: 1024,
                            y: 150,
                            contents: nge.tpl.group("logo").objects.contents,
                            isVisible: 1
                        }, {
                            x: 1925,
                            y: 295,
                            type: mt.objects.BUTTON,
                            isVisible: 1,
                            assetKey: "/settings/close_paytable.png",
                            action: "function () {nge.statesManager.display('play', true);}",
                            btnFrames: {
                                over: 2,
                                out: 1,
                                down: 2
                            }
                        }, {
                            id: "paytablePopupObject",
                            name: "paytablePopupObject",
                            type: mt.objects.GROUP,
                            tabs: 1,
                            tabActive: {
                                tab: "PaytableTab",
                                container: "paytablePopupPaytableContainer"
                            },
                            contents: [{
                                id: "paytablePopupTabsContainer",
                                name: "paytablePopupTabsContainer",
                                x: 155,
                                y: 261,
                                type: mt.objects.GROUP,
                                contents: [{
                                    id: "PaytableTab",
                                    type: mt.objects.GROUP,
                                    x: 40,
                                    contents: [{
                                        x: 315,
                                        class: "tabText",
                                        type: mt.objects.TEXT,
                                        isVisible: !0,
                                        text: "Paytable"
                                    }, {
                                        type: mt.objects.BUTTON,
                                        isVisible: 1,
                                        assetKey: "/settings/tab_left.png",
                                        action: "function () {nge.observer.fire('tabs.paytablePopupObject.switch', {tab: 'PaytableTab', container:'paytablePopupPaytableContainer'});}",
                                        class: "tabBtn"
                                    }],
                                    isVisible: 1
                                }, {
                                    id: "BonusTab",
                                    type: mt.objects.GROUP,
                                    contents: [{
                                        x: 885,
                                        class: "tabText",
                                        type: mt.objects.TEXT,
                                        isVisible: !0,
                                        text: "Special"
                                    }, {
                                        x: 592,
                                        type: mt.objects.BUTTON,
                                        isVisible: 1,
                                        assetKey: "/settings/tab_center.png",
                                        action: "function () {nge.observer.fire('tabs.paytablePopupObject.switch', {tab: 'BonusTab', container:'paytablePopupBonusContainer'});}",
                                        class: "tabBtn"
                                    }],
                                    isVisible: 1
                                }, {
                                    id: "LinesTab",
                                    type: mt.objects.GROUP,
                                    y: 1,
                                    contents: [{
                                        x: 1420,
                                        class: "tabText",
                                        type: mt.objects.TEXT,
                                        isVisible: !0,
                                        text: "Lines"
                                    }, {
                                        x: 1164,
                                        type: mt.objects.BUTTON,
                                        isVisible: 1,
                                        assetKey: "/settings/tab_right.png",
                                        action: "function () {nge.observer.fire('tabs.paytablePopupObject.switch', {tab: 'LinesTab', container:'paytablePopupLinesContainer'});}",
                                        class: "tabBtn"
                                    }],
                                    isVisible: 1
                                }],
                                isVisible: 1,
                                fullPath: "/paytablePopupTabsContainer"
                            }, {
                                id: "paytablePopupPaytableContainer",
                                x: 195,
                                y: 415,
                                type: mt.objects.GROUP,
                                contents: [{
                                    name: "paytableItemsContainer",
                                    x: n ? 0 : 100,
                                    y: n ? 0 : 100,
                                    type: mt.objects.GROUP,
                                    contents: n ? n.objects.contents : e,
                                    isVisible: 1
                                }, {
                                    x: -50,
                                    y: -30,
                                    type: mt.objects.IMAGE,
                                    isVisible: !n,
                                    assetKey: "/btn/tab_info_bg.png"
                                }],
                                isVisible: 1
                            }, {
                                id: "paytablePopupBonusContainer",
                                name: "paytablePopupBonusContainer",
                                x: 195,
                                y: 415,
                                type: mt.objects.GROUP,
                                contents: [{
                                    name: "bonusContainer",
                                    contents: t.objects.contents,
                                    isVisible: 1,
                                    type: mt.objects.GROUP
                                }, {
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    alpha: .5,
                                    name: "stars",
                                    assetKey: "/stars"
                                }, {
                                    x: -50,
                                    y: -30,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    name: "bonus_tab_info_bg.png",
                                    assetKey: "/btn/tab_info_bg.png"
                                }],
                                isVisible: 1
                            }, {
                                id: "paytablePopupLinesContainer",
                                name: "paytablePopupLinesContainer",
                                x: 195,
                                y: 415,
                                type: mt.objects.GROUP,
                                contents: [{
                                    id: "paytableLinesContainer",
                                    name: "paytableLinesContainer",
                                    type: mt.objects.GROUP,
                                    scroll: 1,
                                    width: 1780,
                                    height: 1053,
                                    isVisible: 1,
                                    contents: []
                                }, {
                                    name: "paytableLinesText",
                                    anchorX: .5,
                                    anchorY: .5,
                                    type: mt.objects.TEXT,
                                    style: {
                                        font: "bolder 46px 'Arial'",
                                        fill: "#26A5B8",
                                        align: "center"
                                    },
                                    isVisible: 1,
                                    alpha: 0,
                                    text: " "
                                }, {
                                    x: -50,
                                    y: -30,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    alpha: 1,
                                    name: "bonus_tab_info_bg.png",
                                    assetKey: "/btn/tab_info_bg.png"
                                }],
                                isVisible: 1
                            }],
                            isVisible: 1
                        }, {
                            name: "black-bg4",
                            scaleX: 205,
                            scaleY: 154,
                            alpha: .25,
                            isVisible: 1,
                            width: 10,
                            height: 10,
                            assetKey: "/black-bg.png"
                        }],
                        isVisible: 1
                    }]
                }
            }).styles = nge.Lib.Helper.mergeObjs(e.styles, t.styles), n && (e.styles = nge.Lib.Helper.mergeObjs(e.styles, n.styles)), e
        }
    }, function(e, t) {
        nge.Com.Paytable.TplPaytableLinesTabs = function() {
            var e = [{
                    name: "paytableItemContainer",
                    type: mt.objects.GROUP,
                    contents: [{
                        name: "paytableLogo",
                        type: mt.objects.IMAGE,
                        isVisible: !1,
                        width: 256,
                        height: 256,
                        assetKey: null
                    }, {
                        name: "paytableItemText",
                        x: 306,
                        width: 256,
                        height: 256,
                        type: mt.objects.GROUP,
                        contents: [{
                            name: "paytableAwardName",
                            type: mt.objects.TEXT,
                            anchorX: 1,
                            anchorY: 0,
                            style: {
                                font: "34pt 'freesetboldc'",
                                fill: "#41C402",
                                align: "left"
                            },
                            isVisible: !1
                        }, {
                            name: "paytableAwardValue",
                            x: 15,
                            type: mt.objects.TEXT,
                            scaleX: 1,
                            scaleY: 1,
                            style: {
                                font: "34pt 'freesetboldc'",
                                fill: "#26A5B8",
                                align: "left"
                            },
                            isVisible: !1
                        }],
                        isVisible: !1
                    }],
                    isVisible: !1
                }],
                t = nge.tpl.group("bonus"),
                n = nge.tpl.group("paytable");
            return (e = {
                styles: {
                    "#paytablePopupObject .tabBtn": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 3
                        },
                        frame: 1
                    },
                    "#paytablePopupObject .active .tabBtn": {
                        btnFrames: {
                            over: 3,
                            out: 3,
                            down: 3
                        },
                        frame: 3,
                        enabled: !1
                    },
                    "#paytablePopupObject .tabText": {
                        y: 100,
                        anchorX: .5,
                        anchorY: 1,
                        style: {
                            font: "50px 'freesetboldc'",
                            fill: "#13a6d0",
                            strokeThickness: 0,
                            align: "left"
                        }
                    },
                    "#paytablePopupObject .active .tabText": {
                        style: {
                            fill: "#ffffff",
                            stroke: "#1f8ea7",
                            strokeThickness: 3
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: [{
                        name: "groupLogo",
                        contents: nge.tpl.group("logo").assets.contents
                    }, {
                        name: "groupBonus",
                        contents: t.assets.contents
                    }, {
                        name: "groupPaytable",
                        contents: n ? n.assets.contents : []
                    }, {
                        fullPath: "img/black-bg.png",
                        key: "/black-bg.png",
                        qualityObeys: !1
                    }, {
                        fullPath: "img/btn/tab_left2.png",
                        key: "/settings/tab_left2.png",
                        width: 3456,
                        height: 236,
                        frameWidth: 864,
                        frameHeight: 236
                    }, {
                        fullPath: "img/btn/tab_right2.png",
                        key: "/settings/tab_right2.png",
                        width: 3456,
                        height: 236,
                        frameWidth: 864,
                        frameHeight: 236
                    }, {
                        fullPath: "img/btn/tab_close.png",
                        key: "btn_close_paytable",
                        width: 216,
                        height: 72,
                        frameWidth: 72
                    }, {
                        fullPath: "img/btn/tab_info_bg.png",
                        key: "/btn/tab_info_bg2.png"
                    }, {
                        fullPath: "img/settings/total_bet_txt_fill.png",
                        key: "/settings/total_bet_txt_fill2.png"
                    }, {
                        fullPath: "img/settings/money.png",
                        key: "/settings/money.png2"
                    }, {
                        fullPath: "img/settings/separator_money_btn.png",
                        key: "/settings/separator_money_btn.png",
                        qualityObeys: !1
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "paytablePopupContainer",
                        name: "paytablePopupContainer",
                        type: mt.objects.GROUP,
                        contents: [{
                            id: "groupLogo",
                            name: "groupLogo",
                            type: mt.objects.GROUP,
                            x: 1024,
                            y: 150,
                            contents: nge.tpl.group("logo").objects.contents,
                            isVisible: 1
                        }, {
                            x: 1925,
                            y: 295,
                            type: mt.objects.BUTTON,
                            isVisible: 1,
                            assetKey: "btn_close_paytable",
                            action: "function () {nge.statesManager.display('play', true);}",
                            btnFrames: {
                                over: 2,
                                out: 1,
                                down: 2
                            }
                        }, {
                            id: "paytablePopupObject",
                            name: "paytablePopupObject",
                            type: mt.objects.GROUP,
                            tabs: 1,
                            tabActive: {
                                tab: "PaytableTab",
                                container: "paytablePopupPaytableContainer"
                            },
                            contents: [{
                                id: "paytablePopupTabsContainer",
                                name: "paytablePopupTabsContainer",
                                x: 155,
                                y: 261,
                                type: mt.objects.GROUP,
                                contents: [{
                                    id: "PaytableTab",
                                    type: mt.objects.GROUP,
                                    contents: [{
                                        x: 432,
                                        class: "tabText",
                                        type: mt.objects.TEXT,
                                        isVisible: !0,
                                        text: "Paytable"
                                    }, {
                                        type: mt.objects.BUTTON,
                                        isVisible: 1,
                                        assetKey: "/settings/tab_left2.png",
                                        action: "function () {nge.observer.fire('tabs.paytablePopupObject.switch', {tab: 'PaytableTab', container:'paytablePopupPaytableContainer'});}",
                                        class: "tabBtn"
                                    }],
                                    isVisible: 1
                                }, {
                                    id: "LinesTab",
                                    type: mt.objects.GROUP,
                                    contents: [{
                                        x: 1296,
                                        class: "tabText",
                                        type: mt.objects.TEXT,
                                        isVisible: !0,
                                        text: "Lines"
                                    }, {
                                        x: 864,
                                        type: mt.objects.BUTTON,
                                        isVisible: 1,
                                        assetKey: "/settings/tab_right2.png",
                                        action: "function () {nge.observer.fire('tabs.paytablePopupObject.switch', {tab: 'LinesTab', container:'paytablePopupLinesContainer'});}",
                                        class: "tabBtn"
                                    }],
                                    isVisible: 1
                                }],
                                isVisible: 1,
                                fullPath: "/paytablePopupTabsContainer"
                            }, {
                                id: "paytablePopupPaytableContainer",
                                x: 195,
                                y: 415,
                                type: mt.objects.GROUP,
                                contents: [{
                                    name: "paytableItemsContainer",
                                    x: n ? 0 : 100,
                                    y: n ? 0 : 100,
                                    type: mt.objects.GROUP,
                                    contents: n ? n.objects.contents : e,
                                    isVisible: 1
                                }, {
                                    x: -50,
                                    y: -30,
                                    type: mt.objects.IMAGE,
                                    isVisible: !n,
                                    assetKey: "/btn/tab_info_bg2.png"
                                }],
                                isVisible: 1
                            }, {
                                id: "paytablePopupLinesContainer",
                                name: "paytablePopupLinesContainer",
                                x: 195,
                                y: 415,
                                type: mt.objects.GROUP,
                                contents: [{
                                    id: "paytableLinesContainer",
                                    name: "paytableLinesContainer",
                                    type: mt.objects.GROUP,
                                    scroll: 1,
                                    width: 1680,
                                    height: 1053,
                                    isVisible: 1,
                                    contents: []
                                }, {
                                    name: "paytableLinesText",
                                    anchorX: .5,
                                    anchorY: .5,
                                    type: mt.objects.TEXT,
                                    style: {
                                        font: "bolder 36px 'freesetboldc'",
                                        fill: "#26A5B8",
                                        align: "center"
                                    },
                                    isVisible: 1,
                                    alpha: 0,
                                    text: " "
                                }, {
                                    x: -50,
                                    y: -30,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    assetKey: "/btn/tab_info_bg2.png"
                                }],
                                isVisible: 1
                            }],
                            isVisible: 1
                        }, {
                            name: "black-bg4",
                            scaleX: 205,
                            scaleY: 154,
                            alpha: .25,
                            isVisible: 1,
                            width: 10,
                            height: 10,
                            assetKey: "/black-bg.png"
                        }],
                        isVisible: 1
                    }]
                }
            }).styles = nge.Lib.Helper.mergeObjs(e.styles, t.styles), n && (e.styles = nge.Lib.Helper.mergeObjs(e.styles, n.styles)), e
        }
    }, function(e, t) {
        nge.Com.PaytableButton = {}
    }, function(e, t) {
        nge.Com.PaytableButton.Animator = Class.extend((function() {
            this.firstCreation = function(t) {
                return e(t), !0
            };
            var e = function(e) {
                var t = nge.find("^paytableButtonContainer"),
                    n = t.y + 200;
                (t = nge.tween.add(t)).from({
                    y: n
                }, 600, nge.Lib.Tween.Easing.Back.Out, !1, 1e3).onComplete.add((function() {
                    e && e()
                })), t.start()
            }
        }))
    }, function(e, t) {
        nge.Com.PickUpBonusGame = {}
    }, function(e, t) {
        nge.Com.PickUpBonusGame.Controller = nge.Com.Base.extend((function() {
            var e;
            this.inProgress = !1, this.lastPick = 0, this.counter = 1, this.itemsOpened = [], this.created = !1, this.setScope = function(t) {
                e = t
            }, this.create = function() {
                this.setScope(this), this.createDefault(), nge.observer.fire("brain.openPickUpBonusGame"), this.created || this.subscribe(), this.checkProgressFlags(), this.restoreGame()
            }, this.restoreGame = function() {
                var t = nge.localData.get("bonusGame.lastResponse");
                if (t && !t.lastPick) {
                    for (var n in t.items) this.openItem(t, t.items[n]);
                    t.winAmount && e.setWinAmount(t.winAmount)
                }
                nge.localData.set("bonusGame.lastResponse", !1)
            }, this.checkProgressFlags = function() {
                this.created = !0, this.counter = 1, this.itemsOpened = [], this.inProgress = !1
            }, this._display = function(e) {}, this._actionHandler = function(t) {
                if (e.inProgress || -1 !== e.itemsOpened.indexOf(t)) return !1;
                e.inProgress = !0, e.lastPick = t, e.itemsOpened.push(t), nge.observer.fire("pickUpBonusGame.actionRequest", t)
            }, this.openItem = function(t, n) {
                n || (n = t.bonusItem), nge.observer.fire("PickUpBonusGame.animationStart");
                var i = nge.find("^pickItem" + n.index);
                return i && i.disable(3), nge.find("^pickItemContainer" + n.index) && (i = nge.find("^pickItemText" + n.index)) && (i.text = n.value.toString(), i.visible = 1), e.setWinAmount(t.winAmount), e.customOpenItem(t, n), e.revealAll(t), t.lastPick && e.bonusGameEnd(t), e.complete(), !0
            }, this.bonusGameEnd = function(e) {
                nge.localData.set("lastBonusWin", e.params.lastBonusWinAmount), nge.observer.fire("brain.bonusGameEnd")
            }, this.setWinAmount = function(e) {
                var t = nge.find("^winAmount");
                t && (t.text = e)
            }, this.customOpenItem = function(e, t) {}, this.revealAll = function(e) {
                if (e.items)
                    for (var t in e.items) {
                        var n = e.items[t],
                            i = nge.find("^pickItemContainer" + n.index);
                        if (!e.lastPick) {
                            var o = nge.find("^pickItem" + n.index);
                            o && o.disable(3)
                        }(o = nge.find("^pickItemText" + n.index)) || (o = nge.find("^pickItemText" + n.index, i)), o.text = n.value.toString(), o.visible = 1
                    }
            }, this.complete = function() {
                e.inProgress = !1
            }, this.subscribe = function() {
                nge.observer.add("brain.openPickUpBonusGameSuccess", e._display), nge.observer.add("pickUpBonusGame.actionCommand", e._actionHandler), nge.observer.add("pickUpBonusGame.actionResponse", e.openItem)
            }
        }))
    }, function(e, t) {
        nge.Com.PlayHeader = {}
    }, function(e, t) {
        nge.Com.PlayHeader.Animator = Class.extend((function() {
            this.firstCreation = function(t) {
                return e(t), !0
            };
            var e = function(e) {
                var t = nge.find("^playHeader"),
                    n = t.y - 300;
                (t = nge.tween.add(t)).from({
                    y: n
                }, 400, nge.Lib.Tween.Easing.Quadratic.Out, !1, 400).onComplete.add((function() {
                    e && e()
                })), t.start()
            }
        }))
    }, function(e, t) {
        nge.Com.PopUp = {}
    }, function(e, t) {
        nge.Com.PopUp.Controller = nge.Com.Base.extend((function() {
            var e, t, n;
            this.preload = function() {
                e = this, t || (t = this.getInstance("View")), this.preloadDefault(!1)
            }, this.create = function() {
                n || e._subscribe(), n = !0
            }, this._show = function(e) {
                t.show(e)
            }, this._subscribe = function() {
                nge.observer.add("popUp.show", e._show)
            }
        }))
    }, function(e, t) {
        nge.Com.PopUp.Model = function(e) {
            return e || (e = {}), {
                popUpType: nge.Lib.Helper.recursiveGet("popUpType", e, "message"),
                name: nge.Lib.Helper.recursiveGet("name", e, "popUpWrapper"),
                class: nge.Lib.Helper.recursiveGet("class", e, !1),
                title: nge.Lib.Helper.recursiveGet("title", e, "Message"),
                text: nge.Lib.Helper.recursiveGet("text", e, ""),
                submitButtonText: nge.Lib.Helper.recursiveGet("submitButtonText", e, "YES"),
                cancelButtonText: nge.Lib.Helper.recursiveGet("cancelButtonText", e, "NO"),
                x: nge.Lib.Helper.recursiveGet("x", e, 0),
                y: nge.Lib.Helper.recursiveGet("y", e, 0),
                onSubmit: nge.Lib.Helper.recursiveGet("onSubmit", e, !1),
                onCancel: nge.Lib.Helper.recursiveGet("onCancel", e, !1)
            }
        }
    }, function(e, t) {
        nge.Com.PopUp.View = Class.extend((function() {
            var e, t = 0;
            this.show = function(n) {
                e._chkSelf(this), (n = new nge.Com.PopUp.Model(n)).id = "popUpWrapper" + t, n.popUpIndex = t, n.onCancel = e._createAction(t, n.onCancel), n.onSubmit = e._createAction(t, n.onSubmit), n = this.getInstance("Tpl", !1, n), nge.objects.create(n.objects.contents[0]), t++
            }, this.closePopup = function(e) {
                var t = nge.tween.add(e);
                t.to({
                    alpha: 0
                }, 200).onComplete.add((function() {
                    e.destroy(!0)
                })), t.start()
            }, this._chkSelf = function(t) {
                e || (e = t)
            }, this._createAction = function(t, n) {
                return function() {
                    var i = nge.find("#popUpWrapper" + t);
                    e.closePopup(i), n && n()
                }
            }
        }))
    }, function(e, t) {
        nge.Com.PopUp.Tpl = function(e) {
            var t = [];
            return "message" === (e = e || {}).popUpType && t.push({
                class: "popUpNoButton",
                type: mt.objects.GROUP,
                isVisible: !0,
                contents: [{
                    class: "popUpButtonText",
                    type: mt.objects.TEXT,
                    text: e.cancelButtonText,
                    isVisible: !0
                }, {
                    class: "popUpTexture",
                    type: mt.objects.BUTTON,
                    isVisible: !0,
                    assetKey: "/btn_no.png",
                    action: e.onCancel
                }]
            }), t.push({
                class: "popUpTitle",
                type: mt.objects.TEXT,
                text: e.title,
                isVisible: !0
            }, {
                class: "popUpText",
                type: mt.objects.TEXT,
                text: e.text,
                isVisible: !0
            }, {
                class: "popUpYesButton" + ("confirm" === e.popUpType ? " popUpYesButtonConfirm" : ""),
                type: mt.objects.GROUP,
                isVisible: !0,
                contents: [{
                    class: "popUpButtonText",
                    type: mt.objects.TEXT,
                    text: e.submitButtonText,
                    isVisible: !0
                }, {
                    class: "popUpTexture",
                    type: mt.objects.BUTTON,
                    isVisible: !0,
                    assetKey: "/btn_yes.png",
                    action: e.onSubmit
                }]
            }, {
                class: "popUpBg",
                type: mt.objects.IMAGE,
                isVisible: !0,
                assetKey: "/popup_bg.png"
            }), {
                styles: {
                    ".popUpBg": {
                        anchorX: .5,
                        anchorY: .5,
                        x: 1024,
                        y: 768
                    },
                    ".popUpTexture": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 2
                        },
                        frame: 1,
                        anchorX: .5,
                        anchorY: .5
                    },
                    ".popUpButtonText": {
                        anchorX: .5,
                        anchorY: .5,
                        style: {
                            font: '56px "freesetboldc"',
                            fill: "#fff"
                        }
                    },
                    ".popUpYesButton": {
                        x: 794,
                        y: 980
                    },
                    ".popUpYesButtonConfirm": {
                        x: 1024,
                        y: 980
                    },
                    ".popUpNoButton": {
                        x: 1254,
                        y: 980
                    },
                    ".popUpTitle": {
                        x: 1024,
                        y: 560,
                        anchorX: .5,
                        anchorY: .5,
                        style: {
                            font: '68px "freesetboldc"',
                            fill: "#EDC157",
                            align: "center",
                            wordWrap: !0,
                            wordWrapWidth: 1e3
                        }
                    },
                    ".popUpText": {
                        x: 1024,
                        y: 740,
                        anchorX: .5,
                        anchorY: .5,
                        style: {
                            font: '54px "freesetboldc"',
                            fill: "#D9E5DC",
                            align: "center",
                            wordWrap: !0,
                            wordWrapWidth: 1e3
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: [{
                        type: mt.assets.IMAGE,
                        fullPath: "img/popup/popup/btn_yes.png",
                        key: "/btn_yes.png",
                        width: 1128,
                        height: 160,
                        frameWidth: 376
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/popup/popup/btn_no.png",
                        key: "/btn_no.png",
                        width: 1128,
                        height: 160,
                        frameWidth: 376
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/popup/popup/popup_bg.png",
                        key: "/popup_bg.png"
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/black-bg.png",
                        key: "/black-bg.png"
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: e.id,
                        class: e.class,
                        type: mt.objects.GROUP,
                        isVisible: !0,
                        contents: [{
                            type: mt.objects.GROUP,
                            x: e.x,
                            y: e.y,
                            isVisible: !0,
                            contents: t
                        }, {
                            class: "popUpBackLayer",
                            type: mt.objects.IMAGE,
                            width: 2048,
                            height: 1536,
                            scaleX: 205,
                            scaleY: 154,
                            alpha: .7,
                            inputEnabled: !0,
                            isVisible: !0,
                            assetKey: "/black-bg.png"
                        }]
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.RandomButton = {}
    }, function(e, t) {
        nge.Com.RandomButton.Cfg = Class.extend((function() {
            this.singleton = !0, this.cfg = {
                color: "#fff",
                stroke: "#f00",
                offset: {
                    x: 0,
                    y: -7
                }
            }, this.get = function() {
                return this.cfg
            }
        }))
    }, function(e, t) {
        nge.Com.RandomButton.Controller = nge.Com.Base.extend((function() {
            var e, t, n;
            this.preload = function() {
                e = this, t || e._getCfg(), this.preloadDefault(!1, t)
            }, this.create = function() {
                this.createDefault(), n || e._subscribe(), n = !0, this.animateDefault()
            }, this._getCfg = function() {
                return t = e.getInstance("Cfg"), !0
            }, this._disable = function() {
                var e = nge.find("^randomButtonTexture");
                e && e.disable(3)
            }, this._enable = function() {
                var e = nge.find("^randomButtonTexture");
                e && e.enable(1)
            }, this._subscribe = function() {
                nge.observer.add("randomButton.enable", e._enable), nge.observer.add("randomButton.disable", e._disable)
            }
        }))
    }, function(e, t) {
        nge.Com.RandomButton.Animator = Class.extend((function() {
            this.firstCreation = function(t) {
                return e(t), !0
            };
            var e = function(e) {
                var t = nge.find("^randomButtonContainer"),
                    n = t.y + 200;
                (t = nge.tween.add(t)).from({
                    y: n
                }, 600, nge.Lib.Tween.Easing.Back.Out, !1, 1e3).onComplete.add((function() {
                    e && e()
                })), t.start()
            }
        }))
    }, function(e, t) {
        nge.Com.RandomButton.Tpl = function(e) {
            return {
                styles: {
                    ".randomButtonTexture": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 0
                        },
                        frame: 1,
                        anchorX: .5,
                        anchorY: .5
                    },
                    ".randomButtonText": {
                        anchorX: .5,
                        anchorY: .5,
                        y: -14,
                        style: {
                            font: '54px "freesetboldc"',
                            fill: e.cfg.color,
                            stroke: e.cfg.stroke,
                            strokeThickness: 6
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: []
                },
                objects: {
                    name: "objects",
                    contents: [{
                        name: "randomButtonText",
                        class: "randomButtonText",
                        type: mt.objects.TEXT,
                        text: "RANDOM",
                        isVisible: !0
                    }, {
                        name: "randomButtonTexture",
                        class: "randomButtonTexture",
                        type: mt.objects.BUTTON,
                        isVisible: !0,
                        assetKey: "/random_button.png",
                        action: 'function () {nge.observer.fire("kenoMachine.randomBalls");}'
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Respin = {}
    }, function(e, t) {
        nge.Com.Respin.Controller = nge.Com.Base.extend((function() {
            var e, t, n = !1,
                i = !1,
                o = 0,
                s = !1;
            this._restoringFlag = !1, this.create = function() {
                return e = this, t || e._subscribe(), nge.localData.set("respin.inProgress", !1), nge.localData.set("spin.type", "SpinRequest"), t = !0
            }, this.freeReSpinsStart = function(t) {
                e.respinStart(t), e.setSpinTypeFreeRespins()
            }, this.respinStart = function(t) {
                nge.observer.fire("respin.startProcess.start"), t = parseInt(t, 10), s = i = !0;
                var n = nge.localData.get("respin.inProgress"),
                    o = nge.localData.get("respin.spinsTotal");
                !nge.localData.get("respin.spinsTotalResetFlag") && n && o || (o = 0, nge.localData.set("respin.spinsTotalResetFlag", !1)), o += t, nge.localData.getAll(), e.setSpinTypeRespins(), nge.localData.set("respin.inProgress", !0), nge.localData.set("respin.lastSpin", !1), e._restoringFlag || (nge.localData.set("respin.spinsTotal", o), nge.localData.set("respin.spinsLeft", parseInt(nge.localData.get("respin.spinsLeft"), 10) || 0 + t)), nge.observer.fire("buttons.respinMode"), e._restoringFlag = !1, nge.observer.fire("respin.startProcess.end")
            }, this.setSpinTypeRespins = function() {
                nge.localData.set("spin.type", "RespinRequest")
            }, this.setSpinTypeFreeRespins = function() {
                nge.localData.set("spin.type", "FreeRespinRequest")
            }, this.spinCommand = this._spinCommand, this._spinHandleResponse = function(e) {
                if (!nge.localData.get("respin.inProgress")) return !1;
                nge.localData.set("respin.spinsLeft", e.reSpinRemain)
            }, this.finishRespin = function() {
                i = !1, o = 0, nge.localData.get("respin.inProgress") && (nge.localData.get("freespin.inProgress") ? nge.localData.set("spin.type", "FreeSpinRequest") : nge.localData.set("spin.type", "SpinRequest"), nge.localData.set("respin.spinsTotalResetFlag", !0), nge.localData.set("respin.inProgress", !1)), nge.observer.fire("respin.end")
            }, this._spinCompleteResponse = function() {
                if (!nge.localData.get("respin.inProgress")) return !1;
                nge.localData.get("slotMachine.slotWin");
                var t = parseInt(nge.localData.get("respin.spinsLeft"));
                0 === t ? e.finishRespin() : 0 < t && (s = !0)
            }, this._pause = function() {
                n = !0
            }, this._resume = function() {
                n = !1, e._spinCommand()
            }, this._spinCommand = function() {
                if (!s || n) return !1;
                nge.observer.fire("slotMachine.spinCommand"), s = !1
            }, this._spinRestore = function(t) {
                if ("ReSpins" !== t.state && "FreeReSpins" !== t.state) return !1;
                var n = 0;
                if (t.reSpinRemain) var i = t.reSpinRemain;
                else if (t.slotWin && t.slotWin.linePickBonus)
                    for (var o = 0; o < t.slotWin.linePickBonus.length; o++) {
                        var s = t.slotWin.linePickBonus[o].bonusName;
                        if ("ReSpins" === s || "FreeReSpins" === s) {
                            i = t.slotWin.linePickBonus[o].params;
                            break
                        }
                    }
                return t.reSpinsTotal && (n = parseInt(t.reSpinsTotal)), nge.localData.set("respin.spinsLeft", i), nge.localData.set("respin.spinsTotal", n), e._restoringFlag = !0, nge.observer.fire("respin.start", i, 1300), !0
            }, this._winHandler = function(e) {
                if (!i) return !1;
                o += e, nge.observer.fire("respinWin", {
                    winAmount: e,
                    respinTotalWin: o
                })
            }, this._subscribe = function() {
                nge.observer.add("freeReSpins.start", e.freeReSpinsStart), nge.observer.add("respin.start", e.respinStart), nge.observer.add("slotMachine.spinResponse", e._spinHandleResponse), nge.observer.add("slotMachine.spinComplete", e._spinCompleteResponse), nge.observer.add("respin.restore", e._spinRestore), nge.observer.add("win", e._winHandler), nge.observer.add("respin.pause", e._pause), nge.observer.add("respin.resume", e._resume)
            }
        }))
    }, function(e, t) {
        nge.Com.Settings = {}
    }, function(e, t) {
        nge.Com.Settings.Cfg = Class.extend((function() {}))
    }, function(e, t) {
        nge.Com.Settings.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.preload = function() {
                this.preloadDefault(!1, {
                    betGroup: "settingsContent"
                })
            }, this.create = function() {
                t = this, e || t._subscribe();
                var n = nge.localData.get("settings.imageQuality"),
                    i = nge.localData.get("settings.sounds");
                return n || (n = "high", nge.localData.set("settings.imageQuality", n)), t._switchSwitch(i), t._setQualityButtonsStyle(n), e = !0
            }, this._subscribe = function() {
                return nge.observer.add("settings.switchSound", t._switchSound), nge.observer.add("settings.changeImageQuality", t._changeQuality), !0
            }, this._switchSound = function() {
                var e = nge.localData.get("settings.sounds");
                t._switchSwitch(!e)
            }, this._switchSwitch = function(e) {
                nge.localData.set("settings.sounds", e), nge.observer.fire("settings.sounds.changed", e);
                var t = nge.find("^switch"),
                    n = nge.find("^pick"),
                    i = nge.find("^switchText");
                if (!t) return !1;
                e ? (t.addClass("activeSwitch"), n.addClass("activePick"), i.removeClass("offSwitch"), i.addClass("onSwitch")) : (t.removeClass("activeSwitch"), n.removeClass("activePick"), i.removeClass("onSwitch"), i.addClass("offSwitch"))
            }, this._changeQuality = function(e) {
                nge.localData.set("settings.imageQuality", e), t._forceRestartSettings()
            }, this._forceRestartSettings = function() {
                var e = nge.statesManager.getCurrentName();
                nge.statesManager.display(e, !1, !0), nge.observer.add("StatesManager.create.end", (function() {
                    nge.observer.fire("tabs.settingsPopupObject.switch", {
                        tab: "SettingsTab",
                        container: "settingsPopupSettingsContainer"
                    }, 1), nge.observer.remove("StatesManager.create.end", !1, "changeQualityTempEvent", !0)
                }), "changeQualityTempEvent", !0)
            }, this._setQualityButtonsStyle = function(e) {
                var t = nge.find("^tab_settings_left"),
                    n = nge.find("^tab_settings_center"),
                    i = nge.find("^tab_settings_right"),
                    o = nge.find("^tab_settings_left_text"),
                    s = nge.find("^tab_settings_center_text"),
                    a = nge.find("^tab_settings_right_text");
                if (!(t && n && i && o && s && a)) return !1;
                switch (e) {
                    case "low":
                        t.addClass("activeBtn"), n.removeClass("activeBtn"), i.removeClass("activeBtn"), o.addClass("activeText"), s.removeClass("activeText"), a.removeClass("activeText");
                        break;
                    case "medium":
                        t.removeClass("activeBtn"), n.addClass("activeBtn"), i.removeClass("activeBtn"), o.removeClass("activeText"), s.addClass("activeText"), a.removeClass("activeText");
                        break;
                    case "high":
                        t.removeClass("activeBtn"), n.removeClass("activeBtn"), i.addClass("activeBtn"), o.removeClass("activeText"), s.removeClass("activeText"), a.addClass("activeText")
                }
            }
        }))
    }, function(e, t) {
        nge.Com.Settings.Tpl = function(e) {
            return {
                styles: {
                    "#settingsPopupTabsContainer .tabBtn": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 3
                        },
                        frame: 1
                    },
                    "#settingsPopupTabsContainer .active .tabBtn": {
                        btnFrames: {
                            over: 3,
                            out: 3,
                            down: 3
                        },
                        frame: 3,
                        enabled: !1
                    },
                    "#settingsPopupTabsContainer .tabText": {
                        y: 100,
                        anchorX: .5,
                        anchorY: 1,
                        style: {
                            font: "50px 'freesetboldc'",
                            fill: "#13a6d0",
                            strokeThickness: 0,
                            align: "left"
                        }
                    },
                    "#settingsPopupTabsContainer .active .tabText": {
                        style: {
                            fill: "#ffffff",
                            stroke: "#1f8ea7",
                            strokeThickness: 3
                        }
                    },
                    "#settingsPopupSettingsContainer .settingsText": {
                        style: {
                            font: "bolder 80px 'freesetboldc'",
                            fill: "#26a5b8",
                            align: "center"
                        }
                    },
                    "#settingsPopupSettingsContainer .tabBtnSettings": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 0
                        },
                        frame: 1
                    },
                    "#settingsPopupSettingsContainer .tabBtnSettings.activeBtn": {
                        btnFrames: {
                            over: 3,
                            out: 3,
                            down: 3
                        },
                        frame: 3,
                        enabled: !1
                    },
                    "#settingsPopupSettingsContainer .tabTextSettings": {
                        anchorX: .5,
                        anchorY: .5,
                        style: {
                            font: "42pt 'freesetboldc'",
                            fill: "#26a5b8",
                            align: "left"
                        }
                    },
                    "#settingsPopupSettingsContainer .activeText.tabTextSettings": {
                        style: {
                            fill: "#fff"
                        }
                    },
                    "#settingsPopupSettingsContainer .onSwitch.tabTextSettings": {
                        x: 1335,
                        style: {
                            fill: "#fff"
                        },
                        text: "On"
                    },
                    "#settingsPopupSettingsContainer .offSwitch.tabTextSettings": {
                        x: 1420,
                        text: "Off"
                    },
                    "#settingsPopupSettingsContainer .tabSwitchBtn": {
                        btnFrames: {
                            over: 6,
                            out: 5,
                            down: 4
                        },
                        frame: 5
                    },
                    "#settingsPopupSettingsContainer .activeSwitch.tabSwitchBtn": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 0
                        },
                        frame: 1
                    },
                    "#settingsPopupSettingsContainer .pick": {
                        x: 1275
                    },
                    "#settingsPopupSettingsContainer .activePick.pick": {
                        x: 1500
                    },
                    "#settingsPopupBetContainer .totalbettext": {
                        anchorY: .5,
                        style: {
                            font: "48px freesetboldc",
                            fill: "#264C6F"
                        }
                    },
                    "#settingsPopupBetContainer .totalbetname": {
                        x: -5,
                        y: 0,
                        anchorX: 1,
                        style: {
                            font: "80px 'freesetboldc'",
                            fill: "#26a5b8",
                            stroke: "white"
                        },
                        text: nge.i18n.get("TOTAL BET") + ":"
                    },
                    "#settingsPopupBetContainer .totalbetvalue": {
                        x: 5,
                        y: -2,
                        anchorX: 0,
                        style: {
                            font: "80px 'freesetboldc'",
                            fill: "#f59c00",
                            stroke: "#faf9b8",
                            strokeThickness: 10
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: [{
                        name: "pick.png",
                        fullPath: "img/settings/pick.png",
                        key: "/pick.png",
                        width: 144,
                        height: 144
                    }, {
                        name: "switch.png",
                        fullPath: "img/settings/switch.png",
                        key: "/switch.png",
                        width: 1132,
                        height: 236,
                        frameWidth: 283,
                        frameHeight: 118
                    }, {
                        name: "tab_settings_center.png",
                        fullPath: "img/settings/tab_settings_center.png",
                        key: "/tab_settings_center.png",
                        width: 1e3,
                        height: 108,
                        frameWidth: 250
                    }, {
                        name: "tab_settings_left.png",
                        fullPath: "img/settings/tab_settings_left.png",
                        key: "/tab_settings_left.png",
                        width: 988,
                        height: 108,
                        frameWidth: 247
                    }, {
                        name: "tab_settings_right.png",
                        fullPath: "img/settings/tab_settings_right.png",
                        key: "/tab_settings_right.png",
                        width: 988,
                        height: 108,
                        frameWidth: 247
                    }, {
                        name: "groupLogo",
                        contents: nge.tpl.group("logo").assets.contents,
                        id: 4
                    }, {
                        name: "settingsBetContent",
                        id: 5,
                        contents: nge.tpl.group("settingsContent").assets.contents
                    }, {
                        name: "logo_onestop_gaming.png",
                        fullPath: "img/settings/logo_onestop_gaming.png",
                        key: "logo_onestop_gaming.png",
                        width: 600,
                        height: 600
                    }, {
                        fullPath: "img/black-bg.png",
                        key: "/black-bg.png",
                        qualityObeys: !1
                    }, {
                        fullPath: "img/btn/tab_center.png",
                        key: "/settings/tab_center.png",
                        width: 2288,
                        height: 236,
                        frameWidth: 572
                    }, {
                        fullPath: "img/btn/tab_left.png",
                        key: "/settings/tab_left.png",
                        width: 2208,
                        height: 236,
                        frameWidth: 552
                    }, {
                        fullPath: "img/btn/tab_right.png",
                        key: "/settings/tab_right.png",
                        width: 2176,
                        height: 236,
                        frameWidth: 544
                    }, {
                        fullPath: "img/btn/tab_close.png",
                        key: "/settings/close_paytable3.png",
                        width: 216,
                        height: 72,
                        frameWidth: 72
                    }, {
                        fullPath: "img/btn/tab_info_bg.png",
                        key: "/btn/tab_info_bg3.png"
                    }, {
                        fullPath: "img/settings/total_bet_txt_fill.png",
                        key: "/settings/total_bet_txt_fill3.png"
                    }, {
                        fullPath: "img/settings/money.png",
                        key: "/settings/money.png3"
                    }, {
                        fullPath: "img/settings/separator_money_btn.png",
                        key: "/settings/separator_money_btn.png",
                        qualityObeys: !1
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "settingsPopupContainer",
                        name: "settingsPopupContainer",
                        type: mt.objects.GROUP,
                        contents: [{
                            id: "groupLogo",
                            name: "groupLogo",
                            type: mt.objects.GROUP,
                            x: 1024,
                            y: 150,
                            contents: nge.tpl.group("logo").objects.contents,
                            isVisible: 1
                        }, {
                            x: 1925,
                            y: 295,
                            type: mt.objects.BUTTON,
                            isVisible: 1,
                            width: 71,
                            height: 71,
                            assetKey: "/settings/close_paytable3.png",
                            action: "function () {nge.statesManager.display('play', true);}",
                            btnFrames: {
                                over: 2,
                                out: 1,
                                down: 2
                            }
                        }, {
                            id: "settingsPopupObject",
                            name: "settingsPopupObject",
                            type: mt.objects.GROUP,
                            tabs: 1,
                            tabActive: {
                                tab: "betTab",
                                container: "settingsPopupBetContainer"
                            },
                            contents: [{
                                id: "settingsPopupTabsContainer",
                                name: "settingsPopupTabsContainer",
                                x: 155,
                                y: 261,
                                type: mt.objects.GROUP,
                                contents: [{
                                    id: "betTab",
                                    name: "betTab",
                                    x: 40,
                                    type: mt.objects.GROUP,
                                    contents: [{
                                        id: "betTabText",
                                        name: "betTabText",
                                        x: 315,
                                        class: "tabText",
                                        type: mt.objects.TEXT,
                                        isVisible: !0,
                                        text: "Bet"
                                    }, {
                                        id: "betTabBtn",
                                        name: "betTabBtn",
                                        type: mt.objects.BUTTON,
                                        isVisible: 1,
                                        assetKey: "/settings/tab_left.png",
                                        action: "function () {nge.observer.fire('tabs.settingsPopupObject.switch', {tab: 'betTab', container:'settingsPopupBetContainer'});}",
                                        class: "tabBtn"
                                    }],
                                    isVisible: 1
                                }, {
                                    id: "SettingsTab",
                                    type: mt.objects.GROUP,
                                    contents: [{
                                        x: 885,
                                        class: "tabText",
                                        type: mt.objects.TEXT,
                                        isVisible: !0,
                                        text: "Settings"
                                    }, {
                                        x: 592,
                                        type: mt.objects.BUTTON,
                                        isVisible: 1,
                                        assetKey: "/settings/tab_center.png",
                                        action: "function () {nge.observer.fire('tabs.settingsPopupObject.switch', {tab: 'SettingsTab', container:'settingsPopupSettingsContainer'});}",
                                        class: "tabBtn"
                                    }],
                                    isVisible: 1
                                }, {
                                    id: "AboutTab",
                                    name: "AboutTab",
                                    type: mt.objects.GROUP,
                                    contents: [{
                                        x: 1420,
                                        class: "tabText",
                                        type: mt.objects.TEXT,
                                        isVisible: !0,
                                        text: "About"
                                    }, {
                                        x: 1163,
                                        type: mt.objects.BUTTON,
                                        isVisible: 1,
                                        assetKey: "/settings/tab_right.png",
                                        action: "function () {nge.observer.fire('tabs.settingsPopupObject.switch', {tab: 'AboutTab', container:'settingsPopupAboutContainer'});}",
                                        class: "tabBtn"
                                    }],
                                    isVisible: 1
                                }],
                                isVisible: 1
                            }, {
                                id: "settingsPopupBetContainer",
                                x: 195,
                                y: 415,
                                type: mt.objects.GROUP,
                                contents: [{
                                    id: "settingsBetContent",
                                    name: "settingsBetContent",
                                    type: mt.objects.GROUP,
                                    contents: nge.tpl.group("settingsContent").objects.contents,
                                    isVisible: 1,
                                    width: 100,
                                    height: 100
                                }, {
                                    x: 775,
                                    y: 375,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    width: 4,
                                    height: 522,
                                    assetKey: "/settings/separator_money_btn.png"
                                }, {
                                    x: 100,
                                    y: 330,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    width: 583,
                                    height: 681,
                                    assetKey: "/settings/money.png3"
                                }, {
                                    name: "totalBetContainer",
                                    type: mt.objects.GROUP,
                                    isVisible: !0,
                                    anchorX: .5,
                                    anchorY: .5,
                                    x: 850,
                                    y: 168
                                }, {
                                    y: 90,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    width: 1667,
                                    height: 153,
                                    assetKey: "/settings/total_bet_txt_fill3.png"
                                }, {
                                    x: -50,
                                    y: -30,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    width: 1767,
                                    height: 1157,
                                    assetKey: "/btn/tab_info_bg3.png"
                                }],
                                isVisible: 1
                            }, {
                                id: "settingsPopupSettingsContainer",
                                name: "settingsPopupSettingsContainer",
                                x: 195,
                                y: 415,
                                type: mt.objects.GROUP,
                                contents: [{
                                    name: "image_quality_text",
                                    x: 90,
                                    y: 400,
                                    anchorY: .5,
                                    type: mt.objects.TEXT,
                                    class: "settingsText",
                                    align: "left",
                                    isVisible: !0,
                                    text: "IMAGE QUALITY"
                                }, {
                                    name: "sounds_text",
                                    x: 90,
                                    y: 700,
                                    anchorY: .5,
                                    type: mt.objects.TEXT,
                                    class: "settingsText",
                                    align: "left",
                                    isVisible: !0,
                                    text: "SOUNDS"
                                }, {
                                    name: "tab_settings_left_text",
                                    x: 945,
                                    y: 402,
                                    type: mt.objects.TEXT,
                                    class: "tabTextSettings",
                                    isVisible: !0,
                                    text: "Low"
                                }, {
                                    name: "tab_settings_left",
                                    class: "tabBtnSettings",
                                    x: 821,
                                    y: 402,
                                    type: mt.objects.BUTTON,
                                    anchorY: .5,
                                    isVisible: !0,
                                    pixelPerfectOver: !1,
                                    pixelPerfectClick: !1,
                                    action: "function () {nge.observer.fire('settings.changeImageQuality', 'low');}",
                                    assetKey: "/tab_settings_left.png"
                                }, {
                                    name: "tab_settings_center_text",
                                    x: 1193,
                                    y: 402,
                                    type: mt.objects.TEXT,
                                    class: "tabTextSettings",
                                    isVisible: !0,
                                    text: "Med"
                                }, {
                                    name: "tab_settings_center",
                                    class: "tabBtnSettings",
                                    x: 1068,
                                    y: 402,
                                    type: mt.objects.BUTTON,
                                    anchorY: .5,
                                    isVisible: !0,
                                    pixelPerfectOver: !1,
                                    pixelPerfectClick: !1,
                                    action: "function () {nge.observer.fire('settings.changeImageQuality', 'medium');}",
                                    assetKey: "/tab_settings_center.png"
                                }, {
                                    name: "tab_settings_right_text",
                                    x: 1442,
                                    y: 402,
                                    type: mt.objects.TEXT,
                                    class: "tabTextSettings",
                                    isVisible: !0,
                                    text: "High"
                                }, {
                                    name: "tab_settings_right",
                                    class: "tabBtnSettings",
                                    x: 1318,
                                    y: 402,
                                    type: mt.objects.BUTTON,
                                    anchorY: .5,
                                    isVisible: !0,
                                    pixelPerfectOver: !1,
                                    pixelPerfectClick: !1,
                                    action: "function () {nge.observer.fire('settings.changeImageQuality', 'high');}",
                                    assetKey: "/tab_settings_right.png"
                                }, {
                                    name: "pick",
                                    class: "pick",
                                    y: 693,
                                    type: mt.objects.IMAGE,
                                    anchorY: .5,
                                    anchorX: .5,
                                    isVisible: !0,
                                    assetKey: "/pick.png"
                                }, {
                                    name: "switchText",
                                    y: 693,
                                    type: mt.objects.TEXT,
                                    class: "tabTextSettings",
                                    isVisible: !0
                                }, {
                                    name: "switch",
                                    class: "tabSwitchBtn",
                                    x: 1245,
                                    y: 693,
                                    type: mt.objects.BUTTON,
                                    anchorY: .5,
                                    isVisible: !0,
                                    pixelPerfectOver: !1,
                                    pixelPerfectClick: !1,
                                    action: "function () {nge.observer.fire('settings.switchSound');}",
                                    inputEnabled: !0,
                                    assetKey: "/switch.png"
                                }, {
                                    x: -50,
                                    y: -30,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    assetKey: "/btn/tab_info_bg3.png"
                                }],
                                isVisible: 1
                            }, {
                                id: "settingsPopupAboutContainer",
                                x: 195,
                                y: 415,
                                type: mt.objects.GROUP,
                                contents: [{
                                    x: 853,
                                    y: 160,
                                    anchorX: .5,
                                    type: mt.objects.TEXT,
                                    style: {
                                        font: "80px 'freesetboldc'",
                                        fill: "#26a5b8",
                                        align: "center"
                                    },
                                    align: "left",
                                    isVisible: !0,
                                    text: " "
                                }, {
                                    x: 853,
                                    y: 530,
                                    anchorX: .5,
                                    anchorY: .5,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    name: "logo_onestop_gaming.png",
                                    assetKey: "logo_onestop_gaming.png"
                                }, {
                                    x: -50,
                                    y: -30,
                                    type: mt.objects.IMAGE,
                                    isVisible: 1,
                                    assetKey: "/btn/tab_info_bg3.png"
                                }],
                                isVisible: 1
                            }],
                            isVisible: 1
                        }, {
                            type: mt.objects.IMAGE,
                            scaleX: 205,
                            scaleY: 154,
                            alpha: .25,
                            isVisible: 1,
                            width: 10,
                            height: 10,
                            assetKey: "/black-bg.png"
                        }],
                        isVisible: 1
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.SettingsButton = {}
    }, function(e, t) {
        nge.Com.SettingsButton.Animator = Class.extend((function() {
            this.firstCreation = function(t) {
                return e(t), !0
            };
            var e = function(e) {
                var t = nge.find("^btn_settings"),
                    n = t.y + 300;
                (t = nge.tween.add(t)).from({
                    y: n
                }, 600, nge.Lib.Tween.Easing.Back.Out, !1, 600).onComplete.add((function() {
                    e && e()
                })), t.start()
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine = {}
    }, function(e, t) {
        nge.Com.SlotMachine.Animator = Class.extend((function() {}))
    }, function(e, t) {
        nge.Com.SlotMachine.Cfg = Class.extend((function() {
            this.singleton = !0, this.params = {
                mw: 3,
                mh: 3,
                mhv: !1,
                rowsXoffset: !1,
                rowsYoffset: !1,
                th: 25,
                imageWidth: "original",
                imageHeight: "original",
                padding: {
                    x: 15,
                    y: 15
                },
                symbolsScale: 1,
                parentName: "slotMachineGameContainer",
                maskName: "slotMachineGameContainer",
                imgPath: "img/slots/",
                blurAlpha: .5,
                spinCompleteDelay: 200,
                speedUpReelsFactor: 2,
                intrigueSpeedReelsFactor: 1.5,
                tweenType: "default",
                tweenDuration: {
                    oldSymbols: 600,
                    blur: 1325,
                    newSymbols: 800,
                    symbolsDurationType: "duration",
                    blurDurationType: "duration",
                    animationType: "custom"
                },
                symbolsBlurKeys: [],
                lastSymbolsBlurStaticKeys: [],
                tweenStartInterval: 200,
                tweenEndInterval: 0,
                blursShiftOnReelsHold: !0,
                recyclerView: {
                    enabled: !1,
                    reelsStopCounter: [5, 10, 15, 20, 25],
                    reelsMinStopCounter: 0,
                    reelsSpeed: [1, 1, 1, 1, 1],
                    reelsIntrigueSpeed: 1.5,
                    reelsSpeedUpSpeed: 2,
                    hideBorderSymbols: !0,
                    intrigueAdditionalCounter: 20,
                    reelBlursSize: 40
                },
                lazyBlock: mt.assets.blocks.SYMBOLS_ANIMATION
            }, this.get = function() {
                return this.params
            }, this.set = function(e, t) {
                return !!this.params[e] && (this.params[e] = t, !0)
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this._service = null, this.preload = function() {
                e = this, this._getService();
                var t = e._service.preload();
                return this.preloadDefault(t), !0
            }, this._getService = function() {
                e._service || (e._service = this.getInstance("Service"), e._service.init())
            }, this.create = function() {
                return this.createDefault(), e._service.create(), this.animateDefault(), t || e._subscribe(), t = !0
            }, this.deactivate = function() {
                e._service.deactivate()
            }, this.destroy = function() {
                e._service.destroy()
            }, this.getLastData = function() {
                return e._service.getLastData
            }, this.customSubscribe = function() {}, this._display = function(t) {
                return e._service.display(t)
            }, this._doSpin = function(t) {
                return e._service.doSpin(t)
            }, this._spinHandler = function() {
                return e._service.spinHandler()
            }, this._spinFailHandler = function() {
                return e._service.spinFailHandler()
            }, this._fakeSpinsStart = function(t) {
                return e._service.fakeSpinsStart(t)
            }, this._spinFailed = function() {
                return e._service.spinFailed()
            }, this._stopHandler = function() {
                return e._service.stopHandler()
            }, this._lastDataRequest = function() {
                return e._service.lastDataRequest()
            }, this._animateSymbol = function(t) {
                return e._service.animateSymbol(t)
            }, this._animateSymbolUnsafe = function(t) {
                return e._service.animateSymbol(t, !0)
            }, this._currentLineDurationCorrection = function(t) {
                return e._service.currentLineDurationCorrection(t)
            }, this._stopAnimateSymbol = function(t) {
                return e._service.stopAnimateSymbol(t)
            }, this._holdSymbol = function(t) {
                return e._service.holdSymbol(t)
            }, this._unholdSymbol = function(t) {
                return e._service.unholdSymbol(t)
            }, this._unholdAll = function() {
                return e._service.unholdAll()
            }, this._holdReel = function(t) {
                return e._service.holdReel(t)
            }, this._unholdReel = function(t) {
                return e._service.unholdReel(t)
            }, this._unholdAllReels = function() {
                return e._service.unholdAllReels()
            }, this._reset = function() {
                return e._service.reset()
            }, this._setSymbol = function(t) {
                return e._service.setSymbol(t)
            }, this._destroySymbol = function(t) {
                return e._service._view.destroySymbol(t.symbolPosition, t.animation)
            }, this._normalizeReelsSymbolsPositions = function(t) {
                return e._service._view.normalizeReelsSymbolsPositions(t.animation)
            }, this._changeSymbolPosition = function(t) {
                return e._service._view.changeSymbolPosition(t.symbolPosition, t.newSymbolPosition, t.callback, t.animation)
            }, this._appendSymbol = function(t) {
                return e._service._view.appendSymbol(t.symbolPosition, t.key, t.animation)
            }, this._updateBlurs = function() {
                return e._service.updateBlurs()
            }, this._setSymbolsBlurKeys = function(t) {
                return e._service.setSymbolsBlurKeys(t)
            }, this._setLastSymbolsBlurStaticKeys = function(t) {
                return e._service.setLastSymbolsBlurStaticKeys(t)
            }, this._resetMachine = function() {
                return e._service.resetMachine()
            }, this._changeBlursSpeed = function(t) {
                return e._service.changeBlursSpeed(t)
            }, this._subscribe = function() {
                nge.observer.add("brain.openGameSuccess", e._display), nge.observer.add("slotMachine.spinResponse", e._doSpin), nge.observer.add("slotMachine.spinCommand", e._spinHandler), nge.observer.add("slotMachine.spinRequest.fail", e._spinFailHandler), nge.observer.add("slotMachine.stopCommand", e._stopHandler), nge.observer.add("slotMachine.lastDataRequest", e._lastDataRequest), nge.observer.add("slotMachine.animateSymbol", e._animateSymbol), nge.observer.add("slotMachine.animateSymbolUnsafe", e._animateSymbolUnsafe), nge.observer.add("slotMachine.currentLineDurationCorrection", e._currentLineDurationCorrection), nge.observer.add("slotMachine.stopAnimateSymbol", e._stopAnimateSymbol), nge.observer.add("slotMachine.holdSymbol", e._holdSymbol), nge.observer.add("slotMachine.unholdSymbol", e._unholdSymbol), nge.observer.add("slotMachine.unholdAll", e._unholdAll), nge.observer.add("slotMachine.holdReel", e._holdReel), nge.observer.add("slotMachine.unholdReel", e._unholdReel), nge.observer.add("slotMachine.unholdAllReels", e._unholdAllReels), nge.observer.add("slotMachine.resetSpinState", e._reset), nge.observer.add("winlines.lineHighlite.start", e._service.winLineStartHandler), nge.observer.add("winlines.view.startHideAll", e._service.winLineHideAllHandler), nge.observer.add("slotMachine.setSymbol", e._setSymbol), nge.observer.add("slotMachine.appendSymbol", e._appendSymbol), nge.observer.add("slotMachine.changeSymbolPosition", e._changeSymbolPosition), nge.observer.add("slotMachine.normalizeReelsSymbolsPositions", e._normalizeReelsSymbolsPositions), nge.observer.add("slotMachine.destroySymbol", e._destroySymbol), nge.observer.add("slotMachine.updateBlurs", e._updateBlurs), nge.observer.add("slotMachine.setSymbolsBlurKeys", e._setSymbolsBlurKeys), nge.observer.add("slotMachine.setLastSymbolsBlurStaticKeys", e._setLastSymbolsBlurStaticKeys), nge.observer.add("slotMachine.fakeSpins.start", e._fakeSpinsStart), nge.observer.add("slotMachine.spinFailed.noBalance", e._spinFailed), nge.observer.add("slotMachine.resetMachine", e._resetMachine), nge.observer.add("slotMachine.changeBlursSpeed", e._changeBlursSpeed), e.customSubscribe()
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.Helper = Class.extend((function() {
            this.setTextureSize = function(e, t, n) {
                return n || (n = this.getInstance("Cfg").get()), nge.assets.getQualityFactor(), "auto" === n.imageWidth ? e.width = t.width : "number" == typeof n.imageWidth ? e.width = n.imageWidth : "original" === n.imageWidth && nge.Cfg.Main.imagesQualityObeys && (e.width /= nge.assets.getQualityFactor()), "auto" === n.imageHeight ? e.height = t.height : "number" == typeof n.imageHeight ? e.height = n.imageHeight : "original" === n.imageHeight && nge.Cfg.Main.imagesQualityObeys && (e.height /= nge.assets.getQualityFactor()), e
            }, this.getAnimationFrames = function(e) {
                e = new function(e) {
                    return {
                        prefix: nge.Lib.Helper.recursiveGet("prefix", e, ""),
                        count: nge.Lib.Helper.recursiveGet("count", e, 0),
                        suffix: nge.Lib.Helper.recursiveGet("suffix", e, ""),
                        ldg: nge.Lib.Helper.recursiveGet("ldg", e, 0)
                    }
                }(e);
                for (var t = [], n = "", i = 0; i < e.count; i++) n = nge.Lib.Helper.LdgZero(i, e.ldg), t.push(e.prefix + n + e.suffix);
                return t
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.Pool = nge.Com.Base.extend((function() {
            this.singleton = !0;
            var e = {};
            this.reset = function() {
                for (var t in e)
                    for (var n in e[t]) e[t][n].destroy && e[t][n].destroy(!0, !0);
                e = {}
            }, this.store = function(t, n) {
                t && nge.Lib.Helper.isNumeric(t) && console.warn("nge.Com.SlotMachine.Pool warning - trying to store numeric element (symbol). It can be universal."), t || (t = "universal"), e[t] || (e[t] = []), e[t].push(n)
            }, this.check = function(t) {
                return !!(e[t] && 0 < e[t].length)
            }, this.release = function(t) {
                var n;
                if (!t || !e[t]) {
                    var i = this.getInstance("Symbols").get().filter((function(e) {
                        return e.name === t
                    }))[0];
                    if (i && (n = e.universal.pop())) return n.setSymbolCfg(i), n
                }
                return e[t] ? 0 < e[t].length ? e[t].pop() : n ? void 0 : (console.error("Unable to find object with name " + t), !1) : (console.error("No key in pool: ", t), console.warn("Please check slotMachine symbols config"), !1)
            }, this.status = function() {
                var t, n = [];
                for (t in e) {
                    var i = {
                        poolName: t,
                        Size: e[t].length
                    };
                    n.push(i)
                }
                return console.table && console.table(n), !0
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.RecyclerReel = nge.Com.Base.extend((function() {
            var e = this;
            this.init = function(t) {
                for (e._index = t.index, e._symbolSize = {
                        width: t.symbolSize.width,
                        height: t.symbolSize.height
                    }, e._height = t.height * t.symbolSize.height, e._container = t.container, e._templates = t.templates, e._symbols = t.symbols, e._blurs = t.blurs, e._borderSymbolsCount = t.borderSymbolsCount, e._currentBlur = 0, e._running = !1, e._stopping = !1, e._onhold = !1, e._counter = 0, e._stepDuration = 100, e._lastSymbols = [], e._hideBorderSymbols = t.hideBorderSymbols, e._hideTopBorderSymbolsOnStart = t.hideTopBorderSymbolsOnStart, e._hideBottomBorderSymbolsOnStart = t.hideBottomBorderSymbolsOnStart, e._offsetY = e._container.y, e._normalSpeed = t.speed, e._intrigueSpeed = t.intrigueSpeed, e._speedUpSpeed = t.speedUpSpeed, e._parent = e.getInstance("RecyclerView"), t = 0; t < e._symbols.length; t++) e._symbols[t].setSymbolCfg(e._templates[e._blurs[e._currentBlur++]]), e._container.addChild(e._symbols[t].texture), e._symbols[t].texture.textureZ = 0;
                e.resetPosition(), e.switchBorders(!e._hideBorderSymbols)
            }, this.resetPosition = function() {
                e._container.y = e._offsetY;
                for (var t = -e._symbolSize.height / 2 - e._symbolSize.height * (e._borderSymbolsCount - 1), n = 0; n < e._symbols.length; n++) e._symbols[n].texture.position.set(e._symbolSize.width / 2, t), t += e._symbolSize.height;
                e._container.updateTransform()
            }, this.start = function(t, n) {
                if (t = void 0 === t ? 1 : t, n = void 0 === n ? 0 : n, !e._running && !e._onhold) {
                    e._stopping = !1, e._running = !0, e._lastSymbols = [], e.setCounter(999999), nge.observer.fire("slotMachine.reelAnimationStart", e.getIndex(), n), nge.observer.fire("slotMachine.reel_" + e.getIndex() + ".animation.start", null, n);
                    var i = e.customStartCallback(n).tween;
                    i ? i.onComplete.add((function() {
                        return e.handleStart(t)
                    })) : n ? nge.rafSetTimeout((function() {
                        return e.handleStart(t)
                    }), n) : e.handleStart(t)
                }
            }, this.handleStart = function(e) {
                this._tween = nge.tween.add(this._container, !0), this.resetPosition(), this.switchBorders(!0), this.setSpeed(this._normalSpeed), this.step(this._stepDuration, e)
            }, this.customStartCallback = function(e) {
                return {
                    delay: e,
                    tween: null
                }
            }, this.customStopCallback = function() {
                return {
                    delay: 0,
                    tween: null
                }
            }, this.isOnHold = function() {
                return e._onhold
            }, this.unhold = function() {
                e._onhold = !1
            }, this.hold = function() {
                e._onhold = !0
            }, this.getIndex = function() {
                return e._index
            }, this.getCounter = function() {
                return e._counter
            }, this.getContainer = function() {
                return e._container
            }, this.setCounter = function(t) {
                e._counter = t
            }, this.getBlurs = function() {
                return e._blurs
            }, this.setBlurs = function(t) {
                e._blurs = t, e._currentBlur = 0
            }, this.getCurrentBlur = function() {
                return e._currentBlur
            }, this.setCurrentBlur = function(t) {
                e._currentBlur = t
            }, this.isRunning = function() {
                return e._running
            }, this.stop = function(t, n) {
                e.isRunning() && (e.setCounter(n), e._lastSymbols = t)
            }, this.speedUp = function() {
                e._stopping || (e._counter = 0), e.setSpeed(e._speedUpSpeed)
            }, this.setSpeed = function(t) {
                t = void 0 === t ? e._normalSpeed : t, e._tween && (e._tween.timeScale = t), e._requiredTimeScale = t
            }, this.getSymbolAt = function(t) {
                return e._symbols[t + e._borderSymbolsCount]
            }, this.setSymbolAt = function(t, n) {
                n = e._templates[n], t += e._borderSymbolsCount, e._symbols[t].setSymbolCfg(n), e._symbols[t].texture.textureZ = n.textureZ ? n.textureZ : 0
            }, this.sort = function() {
                for (var t = 0; t < e._symbols.length; t++) e._symbols[t].texture.textureZ += t;
                e._container.sort("textureZ")
            }, this.destroy = function() {
                e._container.destroy(), e._tween && e._tween.stop()
            }, this.recycle = function(t) {
                0 < (t = void 0 === t ? 1 : t) ? (e._symbols[e._symbols.length - 1].texture.position.y = e._symbols[0].texture.position.y - e._symbolSize.height, e._symbols.unshift(e._symbols.pop())) : 0 > t && (e._symbols[0].texture.position.y = e._symbols[e._symbols.length - 1].texture.position.y + e._symbolSize.height, e._symbols.push(e._symbols.shift()))
            }, this.step = function(t, n, i) {
                t = void 0 === t ? 100 : t, n = void 0 === n ? 1 : n, e._tween.to({
                    y: e._container.y + e._symbolSize.height * n
                }, t, nge.Lib.Tween.Easing.Linear.None, !1, void 0 === i ? 0 : i), e._requiredTimeScale && e._tween.timeScale !== e._requiredTimeScale && (e._tween.timeScale = e._requiredTimeScale, delete e._requiredTimeScale), e._tween.onComplete.addOnce((function() {
                    if (e.recycle(n), 0 < n) {
                        if (0 < e._counter--) return e.loadUpperSymbol(e.nextBlur()), void e.step(t, n);
                        if (e._stopping = !0, 0 < e._lastSymbols.length) return e.loadUpperSymbol(e._lastSymbols.pop()), 0 === e._lastSymbols.length && (e._counter = e._borderSymbolsCount - 1), void e.step(t, n);
                        e.loadUpperSymbol(e.nextBlur())
                    } else {
                        if (0 < e._counter--) return e.loadLowerSymbol(e.previousBlur()), void e.step(t, n);
                        if (0 < e._lastSymbols.length) return e.loadLowerSymbol(e._lastSymbols.shift()), 0 === e._lastSymbols.length && (e._counter = e._borderSymbolsCount - 1), void e.step(t, n);
                        e.loadLowerSymbol(e.previousBlur())
                    }
                    e.customStopCallback(), e._parent._onReelStop(e), e.stopHandler()
                })), e._tween.start()
            }, this.stopHandler = function() {
                nge.observer.fire("slotMachine.reel_" + this.getIndex() + ".animation.stop"), nge.observer.fire("slotMachine.reel_" + this.getIndex() + ".animation.stopped"), this.resetPosition(), this._running = !1, this.switchBorders(!this._hideBorderSymbols)
            }, this.move = function(t) {
                e._container.y += t
            }, this.previousBlur = function() {
                var t = e._blurs[e._currentBlur--];
                return -1 === e._currentBlur && (e._currentBlur = e._blurs.length - 1), t
            }, this.nextBlur = function() {
                var t = e._blurs[e._currentBlur++];
                return e._currentBlur === e._blurs.length && (e._currentBlur = 0), t
            }, this.loadSymbolAt = function(t, n) {
                n = e._templates[n], e._symbols[t].setSymbolCfg(n), e._symbols[t].texture.textureZ = n.textureZ ? n.textureZ : 0, e.sort()
            }, this.loadUpperSymbol = function(t) {
                e.loadSymbolAt(0, t)
            }, this.loadLowerSymbol = function(t) {
                e.loadSymbolAt(e._symbols.length - 1, t)
            }, this.switchBorders = function(t) {
                t = void 0 !== t && t;
                for (var n = 0; n < e._borderSymbolsCount; n++) e._symbols[n].texture.visible = t && !e._hideTopBorderSymbolsOnStart, e._symbols[e._symbols.length - (n + 1)].texture.visible = t && !e._hideBottomBorderSymbolsOnStart
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.RecyclerView = Class.extend((function() {
            var e = this;
            this.singleton = !0, this._service = this._cfg = null, this._symbols = {}, this._helper = null, this._symbolSize = {
                width: 1,
                height: 1
            }, this._holdedSymbolsContainer = this._container = this._reelsContainer = this._maskContainer = null, this._holdedSymbols = [], this._reels = [], this._animationSymbolsCovers = [], this._reelsStoped = this._lastUpdate = 0, this._covers = null, this._speedUp = !1, this._spinDirection = "forward", Object.defineProperties(this, {
                spinDirection: {
                    get: function() {
                        return this._spinDirection
                    }
                }
            }), this.deactivate = function() {
                console.color("[RV]deactivate", "#00ff00", "#000000")
            }, this.destroy = function() {
                for (var t = 0; t < e._reels.length; t++) e._reels[t].destroy();
                e._reels = []
            }, this.destroyReelsContainer = function() {
                console.color("[RV]destroyReelsContainer", "#ff0000", "#000000"), e._holdedSymbolsContainer && (e._holdedSymbolsContainer.destroy(), e._holdedSymbolsContainer = null), e._reelsContainer.destroy(), e.destroy()
            }, this.createSlotMachine = function(t, n, i, o) {
                for (console.color("[RV]createSlotMachine", "#ff0000", "#000000"), e._cfg = t, e._service = n, t = 0; t < e._reels.length; t++) e._reels[t].destroy();
                for (e._reels = [], t = 0; t < i.get().length; t++) e._symbols[i.get()[t].name] = i.get()[t];
                e._helper || (e._helper = e.getInstance("Helper")), e._container = nge.find("^" + e._cfg.parentName), e._reelsContainer = nge.objects.create(new nge.Mlm.Objects.Folder), i = e._container.getData(), e._container.add(e._reelsContainer), e._setSymbolSize(i), e._createMask(i), e._createReels(i), e._createCovers()
            }, this._setSymbolSize = function(t) {
                e._symbolSize = {
                    width: t.width / e._cfg.mw,
                    height: t.height / e._cfg.mh
                }
            }, this._createBlurs = function(t) {
                for (var n = e._cfg.recyclerView.reelBlursSize || 40, i = [], o = 0; o < e._cfg.mw; o++) {
                    for (var s = [], a = 0; a < n; a++) t[o] && Array.isArray(t[o]) ? s.push(t[o][nge.Lib.Random.generate_range(0, t[o].length - 1)]) : s.push(t[nge.Lib.Random.generate_range(0, t.length - 1)]);
                    i.push(s)
                }
                return i
            }, this._createReels = function(t) {
                t = e._symbols[0];
                var n = e._createBlurs(e._cfg.symbolsBlurKeys);
                if (!e._cfg.mhv) {
                    e._cfg.mhv = [];
                    for (var i = 0; i < e._cfg.mw; i++) e._cfg.mhv.push(e._cfg.mh)
                }
                for (i = 0; i < e._cfg.mw; i++) {
                    e._holdedSymbols.push([]);
                    var o = [],
                        s = nge.objects.create(new nge.Mlm.Objects.Folder);
                    s.x = i * e._symbolSize.width, s.y = 0, e._cfg.rowsXoffset && e._cfg.rowsXoffset[i] && (s.x += e._cfg.rowsXoffset[i]), e._cfg.rowsYoffset && e._cfg.rowsYoffset[i] && (s.y += e._cfg.rowsYoffset[i]);
                    for (var a = 0; a < e._cfg.mhv[i] + 2 * e._cfg.recyclerView.borderSymbolsCount; a++) {
                        var r = e.getInstance("Symbol");
                        r.init(t, e._symbolSize, e._container), r.setView(e), o.push(r)
                    }(a = e.getInstance("RecyclerReel")).init({
                        index: i,
                        container: s,
                        symbols: o,
                        blurs: n[i],
                        templates: e._symbols,
                        symbolSize: e._symbolSize,
                        height: e._cfg.mhv[i],
                        speed: e._cfg.recyclerView.reelsSpeed[i],
                        intrigueSpeed: e._cfg.recyclerView.reelsIntrigueSpeed,
                        speedUpSpeed: e._cfg.recyclerView.reelsSpeedUpSpeed,
                        hideBorderSymbols: e._cfg.recyclerView.hideBorderSymbols,
                        borderSymbolsCount: e._cfg.recyclerView.borderSymbolsCount,
                        hideTopBorderSymbolsOnStart: e._cfg.recyclerView.hideTopBorderSymbolsOnStart,
                        hideBottomBorderSymbolsOnStart: e._cfg.recyclerView.hideBottomBorderSymbolsOnStart
                    }), e._reelsContainer.add(s), e._reels.push(a)
                }
            }, this._onReelStop = function(t) {
                e._checkIntrigue(t.getIndex()), t = e._reels.filter((function(e) {
                    return e.isOnHold()
                })).length, ++e._reelsStoped == e._reels.length - t && nge.rafSetTimeout((function() {
                    e._service.spinCompleteCallback()
                }), e._cfg.spinCompleteDelay)
            }, this._checkIntrigue = function(t) {
                var n = nge.localData.get("slotMachineIntrigue");
                if (n && n.status) {
                    var i = t + 1;
                    if (!e._speedUp && i !== e._reels.length) {
                        var o = n.startsFrom;
                        n = n.endsFrom || e._reels.length;
                        for (var s = 0; s < e._reels.length; s++) e._reels[s].setSpeed();
                        if (i >= o && i < n)
                            for (t += 1; t < e._reels.length; t++) e._reels[t].setSpeed(e._cfg.recyclerView.reelsIntrigueSpeed)
                    }
                }
            }, this._createMask = function(t) {
                e._maskContainer = nge.findOne("^" + e._cfg.maskName) || e._reelsContainer, t = 0 < e._maskContainer.getData().width && 0 < e._maskContainer.getData().height ? e._maskContainer.getData() : t;
                var n = [];
                if (e._cfg.rowsXoffset || e._cfg.rowsYoffset || e._cfg.mhv)
                    for (var i = 0; i < e._cfg.mw; i++) {
                        var o = t.width / e._cfg.mw,
                            s = t.height,
                            a = i * o,
                            r = 0;
                        e._cfg.rowsXoffset && e._cfg.rowsXoffset[i] && (a += e._cfg.rowsXoffset[i]), e._cfg.rowsYoffset && e._cfg.rowsYoffset[i] && (r += e._cfg.rowsYoffset[i]), e._cfg.mhv && e._cfg.mhv[i] && (s = t.height * e._cfg.mhv[i] / e._cfg.mh), n.push([a, r, o, s])
                    } else n = [0, 0, parseInt(t.width, 10), parseInt(t.height, 10)];
                e._maskContainer.mask = nge.objects.create(new nge.Mlm.Objects.Mask({
                    class: "slotMachineMask",
                    rects: n
                }), e._maskContainer, !0)
            }, this.setSymbol = function(t) {
                e._reels[t.coords[0]].setSymbolAt(t.coords[1], t.key), e._reels[t.coords[0]].sort()
            }, this.updateBlurs = function() {
                console.color("[RV]updateBlurs", "#00ff00", "#000000");
                for (var t = e._createBlurs(e._cfg.symbolsBlurKeys), n = 0; n < e._reels.length; n++) e._reels[n].setBlurs(t[n])
            }, this.setBlurs = function(t, n, i) {
                e._reels[t].updateBlurs(n, void 0 === i ? 0 : i)
            }, this.displaySymbols = function(t, n) {
                for (console.color("[RV]displaySymbols: " + JSON.stringify(t), "#00ff00", "#000000"), n = 0; n < t.length; n++) {
                    for (var i = 0; i < e._cfg.mhv[n]; i++) e._reels[n].setSymbolAt(i, t[n][i]);
                    e._reels[n].sort()
                }
            }, this._customClearSymbols = function() {
                console.color("[RV]_customClearSymbols", "#00ff00", "#000000")
            }, this._displaySymbolCallback = function(e, t, n) {
                console.color("[RV]_displaySymbolCallback", "#00ff00", "#000000")
            }, this.reelSpins = function(t) {
                t = void 0 === t ? "forward" : t, e._spinDirection = t, e._requestStartTime = nge.Lib.Time.get(), e._speedUp = !1, e._reelsStoped = 0, e._reels.forEach((function(n, i) {
                    n.start("forward" === t ? 1 : -1, i * e._cfg.tweenStartInterval)
                }))
            }, this.setNewReelsCfg = function(t) {
                var n = nge.Lib.Time.get() - e._requestStartTime,
                    i = Math.round(n / 100);
                n = e.getBaseStopCounters();
                for (var o = e.getIntrigueStopCounters(), s = 0; s < n.length; s++) n[s] += o[s];
                for (o = n[0], s = 0; s < n.length; s++) n[s] < o && (o = n[s]);
                for (i = Math.max(0, Math.min(i, o) - e._cfg.recyclerView.reelsMinStopCounter), o = 0; o < e._reels.length; o++) e._reels[o].stop(t[o].slice(0, e._cfg.mhv[o]), n[o] - i)
            }, this.getBaseStopCounters = function() {
                for (var t = e._cfg.recyclerView.reelsStopCounter.slice(), n = 0; n < e._reels.length; n++) e._reels[n].isOnHold() && t.splice(n, 0, 0);
                return t.slice(0, e._reels.length)
            }, this.getIntrigueStopCounters = function() {
                var t = Array(e._reels.length).fill(0),
                    n = nge.localData.get("slotMachineIntrigue");
                if (!n || !n.status) return t;
                n.endsFrom = n.endsFrom ? n.endsFrom : 1 / 0;
                for (var i = 0; i < t.length; i++)
                    if (i >= n.startsFrom && i < n.endsFrom)
                        for (var o = i; o < t.length; o++) t[o] += e._cfg.recyclerView.intrigueAdditionalCounter;
                return t
            }, this.getSymbolByPosition = function(t) {
                return e._reels[parseInt(t.reel, 10)].getSymbolAt(parseInt(t.row, 10))
            }, this.getReels = function() {
                return e._reels
            }, this.speedUpReel = function(t) {
                e._reels[t].speedUp()
            }, this.speedUpReels = function() {
                e._speedUp = !0;
                for (var t = 0; t < e._reels.length; t++) e.speedUpReel(t)
            }, this._createCovers = function() {
                var e = 0,
                    t = 0;
                this._covers = [];
                for (var n = 0; n < this._cfg.mw; n++) {
                    this._covers[n] = [];
                    var i = this._cfg.mhv[n];
                    this._cfg.rowsXoffset && (e = this._cfg.rowsXoffset[n]), this._cfg.rowsYoffset && (t = this._cfg.rowsYoffset[n]);
                    for (var o = 0; o < i; o++) {
                        var s = "animateSymbolCover-" + n + "-" + o,
                            a = nge.findOne("^" + s);
                        a ? this._covers[n][o] = a : nge.wrap.cache.checkImageKey(s) && (a = nge.objects.create(new nge.Mlm.Objects.Image({
                            name: s,
                            assetKey: s,
                            x: (n + .5) * this._symbolSize.width + e,
                            y: (o + .5) * this._symbolSize.height + t,
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1
                        }), this._container), this._covers[n][o] = a)
                    }
                }
            }, this.showAnimationSymbolsCover = function(t) {
                e._covers && e._covers[t.reel] && e._covers[t.reel][t.row] && ((t = e._covers[t.reel][t.row]).visible = !0, e._container.bringToTop(t))
            }, this.hideAnimationSymbolsCovers = function() {
                for (var t = 0; t < e._covers.length; t++)
                    for (var n = e._covers[t], i = 0; i < n.length; i++) {
                        var o = n[i];
                        o && (o.visible = !1)
                    }
            }, this.getRandomSymbolsTable = function() {
                console.color("[RV]getRandomSymbolsTable", "#00ff00", "#000000")
            }, this.holdSymbol = function(t, n) {
                console.color("[RV]holdSymbol", "#00ff00", "#000000"), e.unholdSymbol(t);
                var i = n.getName();
                n = n.texture, e._holdedSymbolsContainer || (e._holdedSymbolsContainer = nge.objects.create(nge.Mlm.Objects.Folder({
                    name: "holdedSymbolsContainer"
                }), e._container)), i = nge.objects.create(nge.Mlm.Objects.Image({
                    name: "holdedSymbol_" + t.reel + "_" + t.row,
                    assetKey: i,
                    x: n.x + n.parent.x,
                    y: n.y + n.parent.y,
                    anchorX: .5,
                    anchorY: .5
                }), e._holdedSymbolsContainer), e._holdedSymbols[t.reel][t.row] = i
            }, this.unholdSymbol = function(t) {
                console.color("[RV]unholdSymbol", "#00ff00", "#000000"), t || console.error("nge.Com.SlotMachine.View.unholdSymbol error: no symbolPosition"), e._holdedSymbols[t.reel][t.row] && (e._holdedSymbols[t.reel][t.row].destroy(!0), e._holdedSymbols[t.reel][t.row] = null)
            }, this.unholdAll = function() {
                for (var t in console.color("[RV]unholdAll", "#00ff00", "#000000"), e._holdedSymbols)
                    for (var n in e._holdedSymbols[t]) e.unholdSymbol({
                        reel: t,
                        row: n
                    })
            }, this.holdReel = function(t) {
                e._reels[t].hold()
            }, this.unholdReel = function(t) {
                e._reels[t].unhold()
            }, this.unholdAllReels = function() {
                for (var t = 0; t < e._reels.length; t++) e._reels[t].unhold()
            }, this.destroySymbol = function(e, t) {
                console.color("[RV]destroySymbol", "#00ff00", "#000000")
            }, this.normalizeReelsSymbolsPositions = function(e) {
                console.color("[RV]destroySymbol", "#00ff00", "#000000")
            }, this.changeSymbolPosition = function(e, t, n, i) {
                console.color("[RV]changeSymbolPosition", "#00ff00", "#000000")
            }, this.appendSymbol = function(e, t, n) {
                console.color("[RV]appendSymbol", "#00ff00", "#000000")
            }, this._createTempBlur = function(e, t) {
                console.color("[RV]_createTempBlur", "#00ff00", "#000000")
            }, this._getBlurKeys = function(e, t) {
                console.color("[RV]_getBlurKeys", "#00ff00", "#000000")
            }, this.reelSpinsFinishTweenOnUpdateCallback = this.reelSpinsStartTweenOnUpdateCallback = !1
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.Service = Class.extend((function() {
            var e, t, n, i, o, s, a = !1;
            this._cfg = this._view = null, this.init = function() {}, this.preload = function() {
                return o = (e = this).getInstance("Helper"), t = this.getInstance("Cfg").get(), e._cfg = t, this._getView(), i = this.getInstance("Symbols"), s = this.getInstance("Tpl"), e._symbolsPreload(), this._customPreload(), s
            }, this._customPreload = function() {}, this.create = function(n) {
                return this.reset(), e._view.createSlotMachine(t, e, i, n), (n = nge.localData.get("slotMachine")) && e.display(n), !0
            }, this.deactivate = function() {
                e._view.deactivate()
            }, this.destroy = function() {
                e._view.destroy()
            }, this.resetMachine = function() {
                nge.objects.blockUpdateStyles(), e._view.destroyReelsContainer(), e.create(!0), nge.objects.unblockUpdateStyles(), nge.objects.setStyles()
            }, this.reset = function() {
                e._setSpinning(!1)
            }, this.getLastData = function() {
                return n
            }, this.display = function(t) {
                return nge.localData.set("slotMachine", t), a || (t = e._getInitialSymbols(t), e._view.displaySymbols(t.symbols, t.isHistory)), !0
            }, this.lastDataRequest = function() {
                nge.observer.fire("slotMachine.lastDataResponse", n)
            }, this.spinHandler = function() {
                return !a && (e._setSpinning(!0), nge.observer.fire("slotMachine.spinRequest"), !0)
            }, this.spinFailHandler = function() {
                return e._setSpinning(!1), !0
            }, this.fakeSpinsStart = function(t) {
                nge.observer.fire("slotMachine.spinStart"), nge.observer.fire("winlines.stopAnimation"), e._view.reelSpins(t)
            }, this.spinFailed = function() {
                return e._setSpinning(!1), !0
            }, this.stopHandler = function() {
                return !!a && (e._view.speedUpReels(), !0)
            }, this.animateSymbol = function(t, n) {
                return !(a && !n) && (e._view.showAnimationSymbolsCover(t), !(!(t = e._view.getSymbolByPosition(t)) || !t.animate) && (t.animate(), !0))
            }, this.currentLineDurationCorrection = function(t) {
                for (var n = 0, i = 0; i < t.length; i++)
                    if (t[i]) {
                        var o = e._view.getSymbolByPosition({
                            reel: t[i][0],
                            row: t[i][1]
                        }).getConfig();
                        o.winlineTime && o.winlineTime > n && (n = o.winlineTime)
                    }
                n && nge.observer.fire("winlines.setCurrentLineDurationFirstTime", n, 1)
            }, this.stopAnimateSymbol = function(t) {
                return !(!(t = e._view.getSymbolByPosition(t)) || !t.cancelAnimation) && (t.cancelAnimation(), !0)
            }, this.changeBlursSpeed = function(t) {
                return !!a && (e._view.changeBlursSpeed(t), !0)
            }, this.holdSymbol = function(t) {
                if (a) return !1;
                nge.Lib.Helper.varOrArrOfVarsChk(t, e._holdSymbolSafe)
            }, this._getView = function() {
                e._view || (e._view = this.getInstance(e._cfg.recyclerView && e._cfg.recyclerView.enabled ? "RecyclerView" : "View"))
            }, this._holdSymbolSafe = function(t) {
                var n = e._view.getSymbolByPosition(t);
                if (!n) return !1;
                e._view.holdSymbol(t, n)
            }, this.unholdSymbol = function(t) {
                nge.Lib.Helper.varOrArrOfVarsChk(t, e._view.unholdSymbol)
            }, this.unholdAll = function(t) {
                e._view.unholdAll(t)
            }, this.holdReel = function(t) {
                return !a && e._view.holdReel(t)
            }, this.unholdReel = function(t) {
                return e._view.unholdReel(t)
            }, this.unholdAllReels = function() {
                return e._view.unholdAllReels()
            }, this.doSpin = function(t) {
                return e._doSpin(t)
            }, this.setSymbol = function(t) {
                return e._view.setSymbol(t)
            }, this.updateBlurs = function() {
                return e._view.updateBlurs()
            }, this.setSymbolsBlurKeys = function(e) {
                t.symbolsBlurKeys = e
            }, this.setLastSymbolsBlurStaticKeys = function(e) {
                t.lastSymbolsBlurStaticKeys = e
            }, this._doSpin = function(t) {
                return n = t, nge.localData.set("slotMachine", t), e._view.setNewReelsCfg(t.spinResult.columns), !0
            }, this.spinCompleteCallback = function() {
                e._setSpinning(!1), nge.observer.fire("slotMachine.spinComplete")
            }, this.winLineStartHandler = function(t) {
                if (!t || !t.wonSymbols) return !1;
                for (var n, i = t.wonSymbols, o = [], s = 0; s < i.length; s++)(n = e._view.getSymbolByPosition({
                    reel: i[s][0],
                    row: i[s][1]
                })) && o.push(n.getName());
                nge.observer.fire("slotMachine.winLineSymbols", {
                    symbolsNames: o,
                    amount: t.amount,
                    type: t.type,
                    selectedLine: t.selectedLine,
                    wonSymbols: t.wonSymbols,
                    bonusName: t.bonusName
                })
            }, this.winLineHideAllHandler = function() {
                e._view.hideAnimationSymbolsCovers()
            }, this._setSpinning = function(e) {
                a = e, nge.localData.set("slotMachineSpinning", e)
            }, this._symbolsPreload = function() {
                for (var e, n = 0 === t.symbolsBlurKeys.length, a = t.imgPath, r = i.get(), l = 0; l < r.length; l++) {
                    if (n && t.symbolsBlurKeys.push(r[l].name), s.assets.contents.push({
                            type: mt.assets.IMAGE,
                            block: mt.assets.blocks.STATIC,
                            fullPath: a + r[l].textureUrl,
                            key: r[l].name
                        }), r[l].animationFramesAuto && (r[l].animationFrames = o.getAnimationFrames(r[l].animationFramesAuto)), r[l].animationFrames)
                        for (e = 0; e < r[l].animationFrames.length; e++) s.assets.contents.push({
                            type: mt.assets.IMAGE,
                            block: t.lazyBlock,
                            fullPath: a + nge.Lib.Helper.lowerFirstLetter(r[l].animationFrames[e]),
                            key: r[l].animationFrames[e]
                        });
                    if (r[l].animationSprite) {
                        var c = r[l].animationSpriteExtension || "png";
                        if (r[l].multipack)
                            for (var u = 0; u < r[l].multipack; u++) e = r[l].framesInLastSprite && u === r[l].multipack - 1 ? r[l].framesInLastSprite : -1, s.assets.contents.push({
                                type: mt.assets.IMAGE,
                                block: t.lazyBlock,
                                fullPath: a + nge.Lib.Helper.lowerFirstLetter(r[l].name).replace(/ /g, "") + "/" + nge.Lib.Helper.lowerFirstLetter(r[l].name).replace(/ /g, "") + u + "." + c,
                                key: r[l].name + u + "." + c,
                                frameWidth: r[l].frameWidth,
                                frameHeight: r[l].frameHeight,
                                frameMax: e
                            });
                        else s.assets.contents.push({
                            type: mt.assets.IMAGE,
                            block: t.lazyBlock,
                            fullPath: a + nge.Lib.Helper.lowerFirstLetter(r[l].name).replace(/ /g, "") + "/" + nge.Lib.Helper.lowerFirstLetter(r[l].name).replace(/ /g, "") + "." + c,
                            key: r[l].name + "." + c,
                            frameWidth: r[l].frameWidth,
                            frameHeight: r[l].frameHeight
                        })
                    }
                }
            }, this._getInitialSymbols = function(e) {
                var t = {
                        isHistory: !1
                    },
                    n = nge.localData.get("slotMachine.initialSymbols");
                return "history" === nge.statesManager.getCurrentName() && n ? (t.symbols = n, t.isHistory = !0, t) : ((n = !!(e.gameParameters && e.gameParameters.initialSymbols && e.gameParameters.initialSymbols.length) && e.gameParameters.initialSymbols) && (n = nge.Lib.Helper.rowsToColumns(n)), !n && e.spinResult && e.spinResult.columns && (n = e.spinResult.columns), n || (n = _view.getRandomSymbolsTable()), t.symbols = n, t)
            }, this._continueWinlinesAnimation = function(e) {
                e.slotWin && e.slotWin.linePickBonus.length && e.slotWin.lineWinAmounts.length && nge.rafSetTimeout((function() {
                    nge.observer.fire("winlines.animateByOne")
                }), 1e3)
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.SymbolBase = Class.extend((function() {
            var e = this;
            this._originalParams = {}, this._subscribed = this._animationCreated = !1, this._spritesList = [], this._frames, this._name, this._repeat, this._animateNonStop, this._frameTime, this._initialScale = {
                x: 1,
                y: 1
            }, this.setCustomContext = function(t) {
                e = t
            }, this.setSymbolBase = function(t) {
                if (e._symbolConfig = t, void 0 === e._symbolConfig.animationMainTextureNeed && (e._symbolConfig.animationMainTextureNeed = !0), void 0 === e._symbolConfig.animationOnTop && (e._symbolConfig.animationOnTop = !0), e._repeat = t.repeat || 1, e._frameTime = t.frameTime || 30, e._texture) e._texture.loadTexture(t.name), e._texture.visible = !0, e._texture.getData().name = "smSymbol_" + t.name + "_" + e._sid, e._texture.getData().class = t.name;
                else {
                    var n = nge.Mlm.Objects.Image({
                        name: "smSymbol_" + t.name + "_" + e._sid,
                        class: t.name,
                        assetKey: t.name,
                        anchorX: .5,
                        anchorY: .5
                    });
                    e._texture = nge.objects.create(n, !1, !0, !0)
                }
                e.texture = e._texture, e._textureAnimation = !1, e._animationCreated = !1, e._originalParams = {
                    alpha: e._texture.alpha,
                    scale: {
                        x: e._texture.scale.x,
                        y: e._texture.scale.y
                    }
                }, e._name = t.name
            }, this.destroy = function(t) {
                e._unsubscribe(), t && (e._texture && e._texture.destroy(), e._textureAnimation && e._textureAnimation.destroy())
            }, this.getName = function() {
                return e._name
            }, this.getConfig = function() {
                return e._symbolConfig
            }, this.getTextureAnimation = function() {
                return e._textureAnimation
            }, this.reset = function() {
                return e._animateNonStop = !1, e._tween && (e._tween.stop(), e._tween = null, delete e._tween, e._textureAnimation && e._textureAnimation.loadTexture(e._name)), e._animationCheck(), !!e._textureAnimation && (e._textureAnimation.alpha = e._originalParams.alpha, e._textureAnimation.scale.x = e._originalParams.scale.x, e._textureAnimation.scale.y = e._originalParams.scale.y, !0)
            }, this._animationEndHandler = function() {
                e._animateNonStop && e.animate(!0)
            }, this.animate = function(t) {
                return e._symbolConfig.animationRelaunchOnWinlinesCycle && e._cancelAnimation(), void 0 !== e._texture && void 0 !== e._texture.parent && e._texture && e._texture.parent ? (e._subscribed || e._subscribe(), e._animationCreated || e._animationCreate(), e._subscribed = !0, e._animationCreated = !0, e.textureAnimationShow(t), e._tween || e._createTween(), e._tween.isRunning || e._tween.start(), e._symbolConfig.animateAllWinlinesCycle && (e._animateNonStop = !0), !0) : (console.warn("nge.Com.SlotMachine.Symbol.animate error", e._symbolConfig), !1)
            }, this.textureAnimationShow = function(t) {
                e._textureAnimation.x = e._texture.x + e._texture.parent.x, e._textureAnimation.y = e._texture.y + e._texture.parent.y, e._textureAnimation.visible = !0, e._texture.visible = !1, !t && e._symbolConfig.animationOnTop && e._smContainer.bringToTop(e._textureAnimation)
            }, this.animationCreate = this._animationCreate = function() {
                var t = nge.Mlm.Objects.Image({
                    assetKey: e._symbolConfig.name,
                    anchorX: .5,
                    anchorY: .5,
                    isVisible: !1
                });
                if (e._textureAnimation = nge.objects.create(t, e._smContainer, !0), e._symbolConfig.animationSprite)
                    if (t = e._symbolConfig.animationSpriteExtension || "png", e._symbolConfig.multipack)
                        for (var n = 0; n < e._symbolConfig.multipack; n++) e._spritesList.push(nge.wrap.cache.getImage(e._symbolConfig.name + n + "." + t));
                    else e._spritesList.push(nge.wrap.cache.getImage(e._symbolConfig.name + "." + t));
                e._createTween()
            }, this._createTween = function() {
                e._symbolConfig.animationFrames ? e._createFramesTween(e._symbolConfig.animationFrames) : e._symbolConfig.animationSprite ? e._createSpriteTween() : e._createScaleTween()
            }, this._createScaleTween = function() {
                return e._tween = nge.tween.add(e._textureAnimation.scale, !0), e._initialScale.x = e._textureAnimation.scale.x, e._initialScale.y = e._textureAnimation.scale.y, e._tween.to({
                    x: e._initialScale.x * e.maxScale.x,
                    y: e._initialScale.y * e.maxScale.y
                }, e.durationScale).to(e._initialScale, e.durationScale).to({
                    x: e._initialScale.x * e.maxScale.x,
                    y: e._initialScale.y * e.maxScale.y
                }, e.durationScale).to(e._initialScale, e.durationScale).onComplete.add((function() {
                    e._animationEndHandler()
                })), !0
            }, this._createFramesTween = function(t) {
                var n = e._frameTime,
                    i = t.length;
                e._frames = t, e._tween = nge.tween.add({
                    x: 0
                }, !0), e._tween.enableUpdate = !0, t = e._repeat;
                for (var o = 0; o < t; o++) e._tween.to({
                    x: i
                }, i * n);
                return e._tween.onUpdateCallback((function(t, n, i) {
                    e._textureAnimation.loadTexture(e._frames[~~(i.percent * i.vEnd.x) % e._frames.length])
                })).onComplete.add((function() {
                    e._animateNonStop && e._symbolConfig.animationMainTextureNeed && e._textureAnimation.loadTexture(e._name), e._symbolConfig.animateAllWinlinesCycle || e.reset(), e._animationEndHandler()
                })), !0
            }, this._createSpriteTween = function() {
                var t = e._frameTime,
                    n = 0;
                e._frames = [];
                for (var i = 0; i < e._spritesList.length; i++) {
                    for (var o = 0; o < e._spritesList[i].frameData._self._frames.length; o++) {
                        var s = e._spritesList[i].frameData._self._frames[o];
                        s.spriteName = e._spritesList[i].key, s.startsFrom = n, e._frames.push(s)
                    }
                    n += e._spritesList[i].frameData._self._frames.length
                }
                for (e._tween = nge.tween.add({
                        x: 0
                    }, !0), e._tween.enableUpdate = !0, e._symbolConfig.animationMainTextureNeed || (e._textureAnimation.loadTexture(e._frames[0].spriteName), e._textureAnimation.frame = 0), s = e._repeat, i = 0; i < s; i++) e._tween.to({
                    x: n
                }, n * t);
                return e._tween.onUpdateCallback((function(t, n, i) {
                    t = ~~(i.percent * i.vEnd.x), e._textureAnimation.loadTexture(e._frames[t].spriteName), e._textureAnimation.frame = t - e._frames[t].startsFrom
                })).onComplete.add((function() {
                    e._animateNonStop && e._symbolConfig.animationMainTextureNeed && e._textureAnimation.loadTexture(e._name), e.reset(), e._animationEndHandler()
                })), !0
            }, this._hideAnimation = function() {
                e._animateNonStop || (e._texture.visible = !0, e._textureAnimation && (e._textureAnimation.visible = !1), e.reset(), e._subscribed && (e._unsubscribe(), e._subscribed = !1))
            }, this._stopLinesAnimation = function() {
                e._animateNonStop = !1, e.reset()
            }, this._animationCheck = function() {
                e._textureAnimation || (e._textureAnimation = !1)
            }, this._cancelAnimationLoop = function() {
                e._animateNonStop = !1
            }, this.cancelAnimation = this._cancelAnimation = function() {
                e._stopLinesAnimation()
            }, this._subscribe = function() {
                nge.observer.add("slotMachine.symbols.cancelAnimation", e._cancelAnimation, "slotMachine.symbol." + e._sid + ".cancel"), nge.observer.add("slotMachine.symbols.cancelAnimationLoop", e._cancelAnimationLoop, "slotMachine.symbol." + e._sid + ".cancel"), nge.observer.add("winlines.view.startHideAll", e._hideAnimation, "slotMachine.symbol." + e._sid + ".hide"), nge.observer.add("winlines.stoppingAnimation.start", e._stopLinesAnimation, "slotMachine.symbol." + e._sid + ".stop")
            }, this._unsubscribe = function() {
                nge.observer.remove("slotMachine.symbols.cancelAnimation", !1, "slotMachine.symbol." + e._sid + ".cancel"), nge.observer.remove("slotMachine.symbols.cancelAnimationLoop", !1, "slotMachine.symbol." + e._sid + ".cancel"), nge.observer.remove("winlines.view.startHideAll", !1, "slotMachine.symbol." + e._sid + ".hide"), nge.observer.remove("winlines.stoppingAnimation.start", !1, "slotMachine.symbol." + e._sid + ".stop")
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.Symbol = nge.Com.SlotMachine.SymbolBase.extend((function() {
            this.texture = null, this.maxScale = {
                x: 1.08,
                y: 1.08
            }, this.durationScale = 400;
            var e, t = this,
                n = [],
                i = {};
            this._smContainer, this._symbolConfig, this._tween, this._texture, this._textureAnimation, this._sid, this.init = function(n, i, o, s) {
                return t._sid = nge.Lib.Helper.getRandomInt(0, 999999), e = i, t._smContainer = o, n && t.setSymbolCfg(n), s && (t.animate = function() {}, t._subscribe = function() {}), !0
            }, this.getSize = function() {
                return e
            }, this.setView = function(e) {}, this.setSymbolCfg = function(e) {
                t._symbolConfig = e;
                var o = t.getInstance("Symbol" + e.name);
                if (t._cleanup(), o) {
                    for (var s in n = nge.Lib.Helper.mergeArrs(Object.keys(o), n), o) t[s] && (i[s] = t[s]), t[s] = o[s];
                    o.setContext ? o.setContext(t) : console.warn("Context can be invalid in nge.Com.SlotMachine.Symbol" + e.name + ". Use setContext function")
                }
                t.setSymbolBase(e)
            }, this._cleanup = function() {
                t.reset && t.reset(), t._clearKeys(), t._tween && (t._tween.stop(), t._tween = null), t._textureAnimation && t._textureAnimation.destroy()
            }, this._clearKeys = function() {
                for (var e = 0; e < n.length; e++) delete t[n[e]];
                for (var o in i) t[o] = i[o];
                n = []
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.Symbols = Class.extend((function() {
            this.singleton = !0, this.items = [{
                name: "Wild",
                textureUrl: "Wild.png"
            }, {
                name: "TopAward",
                textureUrl: "Creck-it.png"
            }, {
                name: "Group1",
                textureUrl: "Egg_Gold.png"
            }, {
                name: "Group2",
                textureUrl: "Egg_silver.png"
            }, {
                name: "Group3",
                textureUrl: "Egg_bronze.png"
            }, {
                name: "Animal1",
                textureUrl: "chicken.png"
            }, {
                name: "Animal2",
                textureUrl: "sheep.png"
            }, {
                name: "Animal3",
                textureUrl: "Pig.png"
            }, {
                name: "Animal4",
                textureUrl: "cow.png"
            }, {
                name: "Slingshot",
                textureUrl: "BOHUS.png"
            }, {
                name: "Skillet",
                textureUrl: "SIZZILING_BONUSE.png"
            }, {
                name: "any_Group1_Group2_Group3",
                textureUrl: "any_Egg.png"
            }], this.get = function() {
                return this.items
            }
        }))
    }, function(e, t) {
        nge.Com.SlotMachine.Tpl = function() {
            return {
                assets: {
                    name: "assets",
                    contents: []
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "slotMachineGameContainer",
                        name: "slotMachineGameContainer",
                        type: mt.objects.GROUP,
                        isVisible: 1,
                        width: 1e3,
                        height: 600
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.SlotMachine.View = Class.extend((function() {
            var e, t, n, i, o, s, a, r, l = this,
                c = 0,
                u = [],
                g = [],
                f = [],
                p = [],
                b = [],
                m = !1,
                h = !1,
                d = {},
                y = {},
                _ = !1,
                v = !1,
                x = !1,
                w = [],
                C = "forward";
            this._cfg, this._pool, this._symbolSize, this._reelsSymbols, this._speedReelsCustom = [], Object.defineProperties(this, {
                spinDirection: {
                    get: function() {
                        return C
                    }
                }
            }), this.deactivate = function() {
                l._resetGlobals(l._cfg)
            }, this.destroy = function() {
                l._resetGlobals(l._cfg)
            }, this.destroyReelsContainer = function() {
                l._storeSymbols(), i.parent.removeChild(i), i.destroy(!0), i = null
            }, this.createSlotMachine = function(o, s, r, c) {
                return l._cfg = o, a = s, c || (l._clearOldPool(), l._pool = l.getInstance("Pool")), e = l.getInstance("Helper"), t = r, l._calcTextureZNeed(), l._resetGlobals(o, c), o = (n = nge.find("^" + l._cfg.parentName)).getData(), i = nge.objects.create(new nge.Mlm.Objects.Folder), l._setSymbolSize(o), l._maskCreate(), n.add(i), l._reelsSymbolsCreate(), c || (l._symbolsCreate(), l._createBlurs(), l._createTempBlurs()), l._createAnimationSymbolsCovers(), !0
            }, this._clearOldPool = function() {
                l._pool && l._pool.reset()
            }, this._calcTextureZNeed = function() {
                for (var e = t.get(), n = 0; n < e.length; n++) e[n].textureZ && (x = !0)
            }, this.setSymbol = function(e) {
                var t = e.coords,
                    n = t[0];
                if (t = t[1], e = e.key, l._storeSymbol(n, t), e = l._pool.release(e), l._reelsSymbols[n][t] = e, l._setDefaultCoords(e.texture, {
                        row: t
                    }), o[n].addChild(e.texture), l._displaySymbolCallback(e, o[n]), x) {
                    var i = e.getConfig().textureZ ? e.getConfig().textureZ : 0;
                    e.texture.z = i, e.texture.z += .01 * t, o[n].sort()
                }
            }, this.updateBlurs = function() {
                l._createBlurs()
            }, this.displaySymbols = function(e, t) {
                if (!n) return !1;
                l._storeSymbols(), l._customClearSymbols();
                for (var i = 0; i < l._cfg.mw; i++) {
                    o[i].removeChildren();
                    for (var s = l._getMH(i), a = 0; a < s; a++) {
                        var r = l._pool.release(e[i][a]);
                        if (l._reelsSymbols[i][a] = r, l._setDefaultCoords(r.texture, {
                                row: a
                            }), o[i].addChild(r.texture), l._displaySymbolCallback(r, o[i], t), x) {
                            var c = r.getConfig().textureZ ? r.getConfig().textureZ : 0;
                            r.texture.z = c, r.texture.z += .01 * a
                        }
                    }
                    x && o[i].sort()
                }
                return !0
            }, this._customClearSymbols = function() {}, this._displaySymbolCallback = function(e, t, n) {}, this.reelSpins = function(e) {
                C = e || "forward", v = m = !1, l._speedReelsCustom = [], l._setNewReelsCfg(!1), e = !1;
                for (var t = 0, n = 0; n < l._cfg.mw; n++)
                    if (y[n]) 0 === n && (e = !0), l._cfg.blursShiftOnReelsHold || t++;
                    else {
                        var i = o[n],
                            s = "blur-" + t,
                            a = l._pool.release(s);
                        a._sysSmName = s, l._appendBlur(i, n, a), l._startReelTween(i, n, a, t), t++
                    }
                return e && l._reelAnimationComplete(!1, 0), !0
            }, this.setNewReelsCfg = function(e) {
                l._setNewReelsCfg(e)
            }, this._setNewReelsCfg = function(e) {
                r = e
            }, this.getSymbolByPosition = function(e) {
                return l._reelsSymbols[e.reel][e.row]
            }, this.getReels = function() {
                return o
            }, this.speedUpReels = function() {
                for (var e in l._speedReelsCustom = [], g) {
                    var t = g[e];
                    t && t.timeScale && (t.timeScale = l._cfg.speedUpReelsFactor)
                }
                m = !0
            }, this.changeBlursSpeed = function(e) {
                for (var t in g) {
                    var n = g[t],
                        i = e[t] ? e[t] : e;
                    n.timeScale && (n.timeScale = i), l._speedReelsCustom[t] = i
                }
            }, this.showAnimationSymbolsCover = function(e) {
                var t;
                if (u && u[e.reel] && (t = u[e.reel][e.row]), !t) return !1;
                t.visible = !0, n.bringToTop(t)
            }, this.hideAnimationSymbolsCovers = function() {
                for (var e = 0; e < u.length; e++)
                    for (var t = u[e], n = 0; n < t.length; n++) {
                        var i = t[n];
                        i && (i.visible = !1)
                    }
            }, this.getRandomSymbolsTable = function() {
                for (var e = [], t = 0; t < l._cfg.mw; t++) {
                    for (var n = [], i = l._getMH(t), o = 0; o < i; o++) {
                        var s = _getRandomSymbolName();
                        n.push(s)
                    }
                    e.push(n)
                }
                return e
            }, this._getRandomSymbolName = function() {
                var e = t.get();
                return e[nge.Lib.Helper.getRandomInt(0, e.length - 1)].name
            }, this.holdSymbol = function(e, t) {
                l.unholdSymbol(e);
                var i = t.getName();
                if (t = t.texture, !_) {
                    var o = nge.Mlm.Objects.Folder({
                        name: "holdedSymbolsContainer"
                    });
                    _ = nge.objects.create(o, n)
                }
                i = nge.Mlm.Objects.Image({
                    name: "holdedSymbol_" + e.reel + "_" + e.row,
                    assetKey: i,
                    x: t.x + t.parent.x,
                    y: t.y + t.parent.y,
                    anchorX: .5,
                    anchorY: .5
                }), i = nge.objects.create(i, _), d[e.reel][e.row] = i
            }, this.unholdSymbol = function(e) {
                e || console.error("nge.Com.SlotMachine.View.unholdSymbol error: no symbolPosition"), d[e.reel] || (d[e.reel] = {}), l._destroyHold(e.row, e.reel)
            }, this.unholdAll = function() {
                for (var e in d)
                    for (var t in d[e]) l._destroyHold(t, e)
            }, this.holdReel = function(e) {
                y[e] = !0
            }, this.unholdReel = function(e) {
                y[e] = !1
            }, this.unholdAllReels = function() {
                y = {}
            }, this.destroySymbol = function(e, t) {
                if (!l._reelsSymbols[e.reel][e.row]) return console.error("nge.Com.SlotMachine.View destroySymbol error: no symbol in this position"), !1;
                var n = function() {
                    l._storeSymbol(e.reel, e.row), nge.observer.fire("slotMachine.destroySymbolComplete", e)
                };
                return t || (t = n), t(l._reelsSymbols[e.reel][e.row], e, n)
            }, this.normalizeReelsSymbolsPositions = function(e) {
                for (var t = l._cfg.mw * l._cfg.mh, n = 0, i = function() {
                        ++n === t && nge.observer.fire("slotMachine.normalizeReelsSymbolsPositionsComplete")
                    }, o = 0; o < l._reelsSymbols.length; o++)
                    for (var s = l._reelsSymbols[o].length - 1; 0 <= s; s--)
                        if (l._reelsSymbols[o][s]) i();
                        else {
                            for (var a = s - 1; 0 <= a; a--)
                                if (l._reelsSymbols[o][a]) {
                                    l.changeSymbolPosition({
                                        reel: o,
                                        row: a
                                    }, {
                                        reel: o,
                                        row: s
                                    }, i, e);
                                    break
                                }
                            l._reelsSymbols[o][s] || i()
                        }
            }, this.changeSymbolPosition = function(e, t, n, i) {
                if (!l._reelsSymbols[e.reel][e.row] || l._reelsSymbols[t.reel][t.row]) return console.error("nge.Com.SlotMachine.View changeSymbolPosition error: wrong incoming data"), !1;
                var o = l._reelsSymbols[e.reel][e.row];
                l._reelsSymbols[t.reel][t.row] = o, l._setDefaultCoords(o.texture, t), delete l._reelsSymbols[e.reel][e.row];
                var s = function() {
                    n && n(), nge.observer.fire("slotMachine.changeSymbolPositionComplete", e)
                };
                return i || (i = s), i(o, e, t, s)
            }, this.appendSymbol = function(e, t, n) {
                if (l._reelsSymbols[e.reel][e.row]) return console.error("nge.Com.SlotMachine.View appendSymbol error: symbol already exists in this position"), !1;
                var i = o[e.reel];
                if (t = l._pool.release(t), l._reelsSymbols[e.reel][e.row] = t, l._setDefaultCoords(t.texture, e), i.addChild(t.texture), x) {
                    var s = t.getConfig().textureZ ? t.getConfig().textureZ : 0;
                    t.texture.z = s, t.texture.z += .01 * e.row, i.sort()
                }
                return i = function() {
                    nge.observer.fire("slotMachine.appendSymbolComplete", e)
                }, n || (n = i), n(t, e, i)
            }, this._setDefaultCoords = function(e, t) {
                e.y = (t.row + .5) * l._symbolSize.height, e.x = l._symbolSize.width / 2
            }, this._destroyHold = function(e, t) {
                d[t][e] && (d[t][e].destroy(!0), d[t][e] = null)
            }, this._getMH = function(e) {
                var t = l._cfg.mh;
                return l._cfg.mhv && (t = l._cfg.mhv[e]), t
            }, this._createAnimationSymbolsCovers = function() {
                for (var e = 0, t = 0, i = 0; i < l._cfg.mw; i++) {
                    u[i] = [];
                    var o = l._getMH(i);
                    l._cfg.rowsXoffset && (e = l._cfg.rowsXoffset[i]), l._cfg.rowsYoffset && (t = l._cfg.rowsYoffset[i]);
                    for (var s = 0; s < o; s++) {
                        var a = "animateSymbolCover-" + i + "-" + s,
                            r = nge.findOne("^" + a);
                        r ? u[i][s] = r : nge.game.cache.checkImageKey(a) && (a = new nge.Mlm.Objects.Image({
                            name: a,
                            assetKey: a,
                            x: (i + .5) * l._symbolSize.width + e,
                            y: (s + .5) * l._symbolSize.height + t,
                            anchorX: .5,
                            anchorY: .5,
                            isVisible: !1
                        }), a = nge.objects.create(a, n), u[i][s] = a)
                    }
                }
            }, this._setSymbolSize = function(e) {
                return l._symbolSize = {
                    width: e.width / l._cfg.mw,
                    height: e.height / l._cfg.mh
                }, l._symbolSize
            }, this._resetGlobals = function(e, t) {
                for (var n in l._storeSymbols(), _ = !1, l._reelsSymbols = [], o = [], s = [], p = [], b = [], g) g[n].stop();
                g = [], c = 0, v = h = !1, l._pool && !t && l._pool.reset()
            }, this._storeSymbols = function() {
                if (!l._reelsSymbols || !l._reelsSymbols.length) return !1;
                for (var e = 0; e < l._reelsSymbols.length; e++)
                    for (var t = 0; t < l._reelsSymbols[e].length; t++) l._storeSymbol(e, t);
                return !0
            }, this._storeSymbol = function(e, t) {
                if (!(l._reelsSymbols && l._reelsSymbols.length && l._reelsSymbols[e] && l._reelsSymbols[e][t])) return !1;
                o[e].remove(l._reelsSymbols[e][t].texture), l._reelsSymbols[e][t].reset(), l._pool.store(!1, l._reelsSymbols[e][t]), l._reelsSymbols[e][t] = null
            }, this._maskCreate = function() {
                var e = n.getData(),
                    t = nge.find("^" + l._cfg.maskName);
                t || (t = i), e = t && 0 < t.getData().width && 0 < t.getData().height ? t.getData() : e;
                var o = [];
                if (l._cfg.rowsXoffset || l._cfg.rowsYoffset || l._cfg.mhv)
                    for (var s = 0; s < l._cfg.mw; s++) {
                        var a = e.width / l._cfg.mw,
                            r = e.height,
                            c = s * a,
                            u = 0;
                        l._cfg.rowsXoffset && l._cfg.rowsXoffset[s] && (c += l._cfg.rowsXoffset[s]), l._cfg.rowsYoffset && l._cfg.rowsYoffset[s] && (u += l._cfg.rowsYoffset[s]), l._cfg.mhv && l._cfg.mhv[s] && (r = e.height * l._cfg.mhv[s] / l._cfg.mh), o.push([c, u, a, r])
                    } else o = [0, 0, e.width, e.height];
                e = nge.objects.create(new nge.Mlm.Objects.Mask({
                    class: "slotMachineMask",
                    rects: o
                }), t, !0), t.mask = e
            }, this._reelsSymbolsCreate = function() {
                for (var e, t = i.parent.getData(), n = 0; n < l._cfg.mw; n++)(e = nge.objects.create(new nge.Mlm.Objects.Folder)).width = l._symbolSize.width, e.height = t.height, e.x = n * l._symbolSize.width, e.y = 0, l._cfg.rowsXoffset && l._cfg.rowsXoffset[n] && (e.x += l._cfg.rowsXoffset[n]), l._cfg.rowsYoffset && l._cfg.rowsYoffset[n] && (e.y += l._cfg.rowsYoffset[n]), i.add(e), o.push(e), l._reelsSymbols.push([]), s.push([])
            }, this._symbolsCreate = function() {
                t.get();
                for (var e = l._cfg.mw * (2 * l._cfg.mh + 1), i = 0; i < e; i++) {
                    var o = l.getInstance("Symbol");
                    o.init(!1, l._symbolSize, n), o.setView(l), l._pool.store(!1, o)
                }
            }, this._createTempBlurs = function() {
                for (var e = l._cfg.symbolsBlurKeys, t = 0; t < 3 * l._cfg.mw; t++) l._cfg.symbolsBlurKeys && l._cfg.symbolsBlurKeys[t] && "object" == typeof l._cfg.symbolsBlurKeys[t] && (e = l._cfg.symbolsBlurKeys[t]), l._createTempBlur(e)
            }, this._createTempBlur = function(e, t) {
                t = t || "blurTemp", (e = l._createBlur(l._cfg.mh, e)).key = t, l._pool.store(t, e)
            }, this._createBlurs = function() {
                for (var e, t = l._cfg.symbolsBlurKeys, n = l._cfg.lastSymbolsBlurStaticKeys, i = 0; i < l._cfg.mw; i++) l._cfg.symbolsBlurKeys && l._cfg.symbolsBlurKeys[i] && "object" == typeof l._cfg.symbolsBlurKeys[i] && (t = l._cfg.symbolsBlurKeys[i]), l._cfg.lastSymbolsBlurStaticKeys && void 0 !== l._cfg.lastSymbolsBlurStaticKeys[i] && (n = l._cfg.lastSymbolsBlurStaticKeys[i]), l._pool.check("blur-" + i) && l._destroyBlur("blur-" + i), e = l._createBlur("number" == typeof l._cfg.th ? l._cfg.th : l._cfg.th[i], t, n), l._pool.store("blur-" + i, e)
            }, this._destroyBlur = function(e) {
                return (e = l._pool.release(e)).texture.destroy(!0, !0), e.destroy(!0, !0), e.key = !1, e.game = !1, !0
            }, this._getBlurKeys = function(e, t) {
                for (var n = [], i = !1, o = function(e) {
                        if (0 === t.length) return console.error("nge.Com.SlotMachine.View _createBlur getBlurRandomKey error: symbolsKeys.length = 0"), !1;
                        if (1 === t.length) return t[0];
                        var n = t[~~(Math.random() * t.length)];
                        return e !== n ? n : o(e)
                    }, s = 0; s < e; s++) i = o(i), n.push(i);
                return n
            }, this._createBlur = function(n, i, o) {
                var s = l._cfg.blurAlpha,
                    a = nge.objects.create(new nge.Mlm.Objects.Folder),
                    r = nge.statesManager.getCurrentName();
                (r = nge.findOne("^" + r + "State")).add(a);
                var c = [],
                    u = 0;
                i = l._getBlurKeys(n, i);
                for (var g = 0; g < n; g++) {
                    var f = i[g];
                    if (o && 0 < o.length) {
                        var p = g + o.length - n;
                        0 <= p && (f = o[p])
                    }(p = nge.objects.create(new nge.Mlm.Objects.Image({
                        assetKey: f
                    }))).scale.x = p.scale.y = 1, e.setTextureSize(p, l._symbolSize, l._cfg), p.width > u && (u = p.width), p.position.y = (g + .5) * l._symbolSize.height, p.anchor.x = 0, p.anchor.y = .5, p.alpha = s;
                    var b = t.get();
                    x && (b = b.filter((function(e) {
                        return e.name === f
                    }))[0], p.z = (b.textureZ ? b.textureZ : 0) + .01 * g), c[g] = p
                }
                for (g = 0; g < n; g++)(p = c[g]).position.x = (u - p.width) / 2, a.addChild(p);
                return x && a.sort(), a.scale.x = 1 / r.worldScale.x, a.scale.y = 1 / r.worldScale.y, o = nge.objects.generateTexture(a), (n = nge.objects.create(new nge.Mlm.Objects.Image({
                    assetKey: "1px_empty",
                    class: "_slotMachineBlur"
                }), null, !0, !0)).loadTexture(o), n.scale.set(1, 1), n.x = l._symbolSize.width / 2, n.anchor.x = .5, a.destroy({
                    children: !0,
                    texture: !1,
                    baseTexture: !1
                }), n
            }, this._getReelOffsetY = function(e) {
                var t = 0;
                return l._cfg.rowsYoffset && l._cfg.rowsYoffset[e] && (t = l._cfg.rowsYoffset[e]), t
            }, this._startReelTween = function(e, t, n, i) {
                null == i && (i = t);
                var o = l._getMH(i),
                    s = l._cfg.tweenDuration,
                    a = i * l._cfg.tweenStartInterval,
                    r = s.blur + i * l._cfg.tweenEndInterval;
                "factor" === s.blurDurationType && (r = ("number" == typeof l._cfg.th ? l._cfg.th : l._cfg.th[i]) * s.blur + i * l._cfg.tweenEndInterval);
                var c = "factor" === s.symbolsDurationType ? "number" == typeof l._cfg.mhv ? l._cfg.mhv * s.oldSymbols : l._cfg.mhv[i] * s.oldSymbols : s.oldSymbols;
                w[t] = "factor" === s.symbolsDurationType ? "number" == typeof l._cfg.mhv ? l._cfg.mhv * s.newSymbols : l._cfg.mhv[i] * s.newSymbols : s.newSymbols;
                var u = c + r + w[t];
                i = 0 < u;
                var p = l._getReelOffsetY(t);
                if (i) {
                    var b = nge.tween.add(e, "custom" === l._cfg.tweenType),
                        m = l.customReelStartCallback(e, t, b, a);
                    m && (b = m.tween, a = m.startDelay), g[t] = b
                }
                m = "forward" === C ? n.height + p : -n.height + p;
                return i && "linear" === s.animationType ? (s = (n.height + l._symbolSize.height * o) / (u - c), f[t] = s, b.to({
                    y: m
                }, n.height / s, nge.Lib.Tween.Easing.Linear.None, !1, a)) : (function() {
                    var t = "forward" === C ? l._symbolSize.height * o + p : -l._symbolSize.height * o + p;
                    0 < c ? b.to({
                        y: t
                    }, c, nge.Lib.Tween.Easing.Quartic.In, !1, a) : e.y = t
                }(), 0 < s.blur ? b.to({
                    y: m
                }, r, nge.Lib.Tween.Easing.Linear.None, !1) : e.y = m), i ? (b.onStart.addOnce((function() {
                    nge.observer.fire("slotMachine.reelAnimationStart", t, a), nge.observer.fire("slotMachine.reel_" + t + ".animation.start", a)
                })), b.onUpdateCallback((function(e, t, n) {
                    l.reelSpinsStartTweenOnUpdateCallback && l.reelSpinsStartTweenOnUpdateCallback(e, t, n)
                }), this), b.onComplete.addOnce((function(i, o, s, a) {
                    l._reelAnimationStepEnd(e, t, n)
                }), this), b.start()) : l._reelAnimationComplete(e, t, n), !0
            }, this._appendBlur = function(e, t, n) {
                var i = l._getMH(t),
                    o = l._getReelOffsetY(t);
                n.y = "forward" === C ? -n.height : i * l._symbolSize.height + o, e.addChild(n), p[t] = n
            }, this._reelAnimationStepEnd = function(e, t, n) {
                if (!h)
                    for (h = [], n = 0; n < l._cfg.mw; n++) h[n] = 0;
                var i = nge.localData.get("slotMachineIntrigue");
                if (r && i && i.status && !i.done) {
                    nge.localData.set("slotMachineIntrigue.done", !0);
                    var o = 1;
                    for (n = i.startsFrom; n < l._cfg.mw; n++) h[n] += 5 * o, o++;
                    v = !0
                }
                if (o = nge.localData.get("slotMachineAdditionalBlurs"), r && o)
                    for (n = 0; n < o.length; n++) o[n] && (h[n] += o[n]), 0 > h[n] && (h[n] = 0);
                if (nge.localData.set("slotMachineAdditionalBlurs", !1), r && (m || 0 >= h[t])) return l._reelSpinsFinish(t), !1;
                if (0 === t && 0 === h[0])
                    for (n = 0; n < l._cfg.mw; n++) h[n]++;
                if (h[t]--, !m && v && !l._speedReelsCustom[t] && g[t - 1] && !g[t - 1].isRunning)
                    for (o = i.endsFrom ? i.endsFrom : l._cfg.mw, n = i.startsFrom; n < o; n++) i = l._cfg.intrigueSpeedReelsFactor, l._speedReelsCustom[n] = i, g[n] && (g[n].timeScale = i);
                if (b[t] || (b[t] = []), n = nge.localData.get("slotMachineAdditionalBlursKeys"), i = "blurTemp", r && n && n[t] && n[t][h[t]] && (i = n[t][h[t]]), !(i = l._pool.release(i))) return !1;
                for (o = 1 / 0, n = 0; n < e.children.length; n++) {
                    var s = e.children[n].y;
                    o > s && (o = s)
                }
                if (1 / 0 !== (o -= i.height)) {
                    for (n = 0; n < e.children.length; n++) e.children[n].y -= o;
                    e.y += o
                }
                b[t].push(i), n = i.height, o = e.children[e.children.length - 1], i.y = "forward" === C ? o.y - n : o.y + o.height, e.addChild(i), 2 < b[t].length && (n = b[t].shift(), e.removeChild(n), l._pool.store(n.key ? n.key : "blurTemp", n)), p[t] && e.y >= p[t].height + i.height && l._storingMainBlur(e, t), l._storeOldSymbols(e, t), n = l._getReelOffsetY(t), i = l._getMH(t), l._newSymbolsAnimate(e, t, l._reelAnimationStepEnd, "forward" === C ? n : e.y - l._symbolSize.height * i + n)
            }, this._reelAnimationComplete = function(e, t) {
                if (nge.observer.fire("slotMachine.reel_" + t + ".animation.stop"), e) {
                    if (l._storeOldSymbols(e, t), l._reelsSymbols[t] = s[t], l._storingMainBlur(e, t), b[t]) {
                        for (var n = 0; n < b[t].length; n++) {
                            var i = b[t][n];
                            e.removeChild(i), l._pool.store(i.key ? i.key : "blurTemp", i)
                        }
                        b[t] = []
                    }
                    for (n = 0, l._cfg.rowsYoffset && l._cfg.rowsYoffset[t] && (n = l._cfg.rowsYoffset[t]), e.y = n, n = 0; n < l._reelsSymbols[t].length; n++) l._setDefaultCoords(l._reelsSymbols[t][n].texture, {
                        row: n
                    })
                }
                l._reelStopCallback(e, t), nge.observer.fire("slotMachine.reel_" + t + ".animation.stopped"), y[t + 1] && l._reelAnimationComplete(!1, t + 1)
            }, this.customReelStartCallback = function(e, t, n, i) {
                return {
                    tween: n,
                    startDelay: i
                }
            }, this.customReelStopCallback = function(e, t) {}, this._increaseReelsY = function(e, t) {
                t = e.y;
                for (var n = 0; n < e.children.length; n++) e.children.y += t
            }, this._storeOldSymbols = function(e, t) {
                for (var n, i = 0; i < l._reelsSymbols[t].length; i++) n = l._reelsSymbols[t][i], e.removeChild(n.texture), l._pool.store(!1, n);
                l._reelsSymbols[t].splice(0, l._reelsSymbols[t].length)
            }, this._storingMainBlur = function(e, t) {
                if (p[t]) {
                    var n = p[t];
                    e.removeChild(n), e = "blur-" + t, n._sysSmName && (e = n._sysSmName, delete n._sysSmName), l._pool.store(e, n), p[t] = !1
                }
            }, this._reelStopCallback = function(e, t) {
                c++, l.customReelStopCallback(e, t), c === l._reelsSymbols.length && (g = [], c = 0, v = h = !1, nge.rafSetTimeout((function() {
                    a.spinCompleteCallback()
                }), l._cfg.spinCompleteDelay))
            }, this._reelSpinsFinish = function(e) {
                var t = o[e];
                return l._appendNewSymbols(t, e, r[e]), l._newSymbolsAnimate(t, e, l._reelAnimationComplete), l.reelSpinsFinishTweenOnUpdateCallback && g[e].onUpdateCallback(l.reelSpinsFinishTweenOnUpdateCallback, this), !0
            }, this.reelSpinsFinishTweenOnUpdateCallback = this.reelSpinsStartTweenOnUpdateCallback = !1, this._appendNewSymbols = function(e, t, n) {
                var i = 0,
                    o = e.children[e.children.length - 1];
                0 < e.children.length && (i = e.children[e.children.length - 1].y), s[t] = [];
                for (var a = l._getMH(t), r = 0; r < a; r++) {
                    var c = l._pool.release(n[r]);
                    if (s[t].push(c), c.texture.y = "forward" === C ? (r + .5 - a) * l._symbolSize.height + i : (r + .5) * l._symbolSize.height + i + o.height, c.texture.x = l._symbolSize.width / 2, e.addChild(c.texture), x) {
                        var u = c.getConfig().textureZ ? c.getConfig().textureZ : 0;
                        c.texture.z = u, c.texture.z += .01 * r
                    }
                }
                x && e.sort(), nge.observer.fire("slotMachine.reel.newSymbolsAppended", t)
            }, this._newSymbolsAnimate = function(e, t, n, i) {
                var o = l._cfg.tweenDuration;
                l._getReelOffsetY(t);
                var s = l._cfg.mhv && l._cfg.mhv[t] ? l._cfg.mhv[t] : l._cfg.mh;
                void 0 === i && (i = "forward" === C ? e.y + l._symbolSize.height * s : e.y - l._symbolSize.height * s);
                var a = 1;
                l._speedReelsCustom[t] ? a = l._speedReelsCustom[t] : m && (a = l._cfg.speedUpReelsFactor), "custom" === l._cfg.tweenType ? s = g[t] : (s = nge.tween.add(e), g[t] = s), "linear" === o.animationType ? s.to({
                    y: i
                }, Math.abs(i - e.y) / f[t], nge.Lib.Tween.Easing.Linear.None, !0) : 0 < w[t] ? s.to({
                    y: i
                }, w[t], nge.Lib.Tween.Easing.Quartic.Out, !0) : e.y = i, s.onComplete.addOnce((function() {
                    n(e, t)
                })), s.timeScale = a
            }
        }))
    }, function(e, t) {
        nge.Com.SpinButton = {}
    }, function(e, t) {
        nge.Com.SpinButton.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i, o;
            this.create = function() {
                o = this, this.createDefault(), e || o._subscribe(), t = nge.find("^spinButton"), n = nge.find("^stopButton"), i = nge.find("^freeSpinButton");
                var s = nge.localData.get("brain.restoreGame");
                return s && s.lastResponse && "FreeSpinReady" === s.lastResponse.state && o._spinButtonDisable(), e = !0
            }, this._spinRegular = function() {
                var e = nge.localData.get("freeGame.inProgress"),
                    o = nge.find("^spinButtonText");
                n.visible = !1, i.visible = !1, t.visible = !0, o.addClass("spinTextSpin"), o.removeClass("spinTextFree"), o.removeClass("disableText"), e ? (o.visible = !1, nge.find("^freeGameButtonTextFree").visible = !0, nge.find("^freeGameButtonTextFree").addClass("spinTextSpin"), nge.find("^freeGameButtonTextFree").removeClass("spinTextFree"), nge.find("^freeGameButtonTextFree").removeClass("disableText"), nge.find("^freeGameButtonTextGame").visible = !0, nge.find("^freeGameButtonTextGame").addClass("spinTextSpin"), nge.find("^freeGameButtonTextGame").removeClass("spinTextFree"), nge.find("^freeGameButtonTextGame").removeClass("disableText")) : (o.visible = !0, nge.find("^freeGameButtonTextFree").visible = !1, nge.find("^freeGameButtonTextGame").visible = !1)
            }, this._showSpinButton = function() {
                n.visible = !1, i.visible = !1, t.visible = !0
            }, this._spinAutospin = function() {
                t.visible = !1, i.visible = !1, n.visible = !0
            }, this._spinFreespin = function() {
                t.visible = !1, n.visible = !1, i.visible = !0, o._spinButtonDisable()
            }, this._spinButtonEnable = function() {
                var e = nge.localData.get("slotMachine"),
                    t = nge.localData.get("freeGame.inProgress");
                if (!t && e && e.slotWin && e.slotWin.linePickBonus && e.slotWin.linePickBonus.length) return !1;
                (e = nge.find("^spinButtonText")).removeClass("disableText");
                var n = nge.find("^spinButtonButton");
                n && n.enable(), t ? (e.visible = !1, nge.find("^freeGameButtonTextFree").visible = !0, nge.find("^freeGameButtonTextFree").removeClass("disableText"), nge.find("^freeGameButtonTextGame").visible = !0, nge.find("^freeGameButtonTextGame").removeClass("disableText")) : (e.visible = !0, nge.find("^freeGameButtonTextFree").visible = !1, nge.find("^freeGameButtonTextGame").visible = !1)
            }, this._spinButtonDisable = function() {
                var e = nge.find("^spinButtonButton");
                e && e.disable(3), (e = nge.find("^spinButtonText")).addClass("disableText"), nge.localData.get("freeGame.inProgress") ? (e.visible = !1, nge.find("^freeGameButtonTextFree").visible = !0, nge.find("^freeGameButtonTextFree").addClass("disableText"), nge.find("^freeGameButtonTextGame").visible = !0, nge.find("^freeGameButtonTextGame").addClass("disableText")) : (e.visible = !0, nge.find("^freeGameButtonTextFree").visible = !1, nge.find("^freeGameButtonTextGame").visible = !1)
            }, this._spinButtonMaxBet = function(e) {
                var t = nge.find("^spinButtonButton");
                nge.find("^spinButtonText").removeClass("disableText"), t.key = e ? "/btn_spin_maxbet.png" : "/btn_spin_regular.png", t.frame = 2, t.frame = 1, nge.assets.applyQuality(t)
            }, this._subscribe = function() {
                nge.observer.add("spinButton.regular", o._spinRegular), nge.observer.add("spinButton.autospin", o._spinAutospin), nge.observer.add("spinButton.freespin", o._spinFreespin), nge.observer.add("spinButton.enable", o._spinButtonEnable), nge.observer.add("spinButton.disable", o._spinButtonDisable), nge.observer.add("spinButton.maxBet", o._spinButtonMaxBet), nge.observer.add("autospin.end", o._spinRegular), nge.observer.add("autospin.stopRequest", o._showSpinButton), nge.observer.add("freespin.end", o._spinRegular), nge.observer.add("slotMachine.spinCommand", o._spinButtonDisable), nge.observer.add("slotMachine.spinComplete", o._spinButtonEnable)
            }
        }))
    }, function(e, t) {
        nge.Com.SpinButton.Tpl = function() {
            return {
                assets: {
                    name: "assets",
                    contents: [{
                        fullPath: "img/slots/button_sprite_sheet.png",
                        key: "/slots/button_sprite_sheet.png",
                        width: 579,
                        height: 71,
                        frameWidth: 193,
                        frameHeight: 71
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        type: mt.objects.BUTTON,
                        isVisible: 1,
                        width: 50,
                        height: 50,
                        id: "spinButton",
                        name: "spinButton",
                        assetKey: "/slots/button_sprite_sheet.png",
                        action: "function () {nge.observer.fire('slotMachine.spinCommand');}",
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 0
                        }
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.SpinControlContainer = {}
    }, function(e, t) {
        nge.Com.SpinControlContainer.Animator = Class.extend((function() {
            this.firstCreation = function(t) {
                return e(t), !0
            };
            var e = function(e) {
                var t = nge.find("^spinControlContainer");
                if (!t) return !1;
                var n = t.x + 500;
                (t = nge.tween.add(t)).from({
                    x: n
                }, 500, nge.Lib.Tween.Easing.Back.Out, !1, 1200).onComplete.add((function() {
                    e && e()
                })), t.start()
            }
        }))
    }, function(e, t) {
        nge.Com.SummaryPopup = {}
    }, function(e, t) {
        nge.Com.SummaryPopup.Controller = nge.Com.Base.extend((function() {
            this.preload = function() {
                this.preloadDefault(!1, {
                    betGroup: "summaryPopup"
                })
            }, this.create = function() {
                this.createDefault();
                var e = nge.localData.get("lastBonusWin");
                e = nge.Lib.Validator.floatMoney(e, !0) + nge.localData.get("currency"), nge.localData.set("lastBonusWin", !1), nge.find("^winUserCodeText").text = e
            }
        }))
    }, function(e, t) {
        nge.Com.SummaryPopup.Tpl = function() {
            return {
                assets: {
                    name: "assets",
                    contents: [{
                        type: mt.assets.IMAGE,
                        fullPath: "img/popup/minigame/popup_1_line.png",
                        key: "/popup_1_line.png"
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "winContainer",
                        name: "winContainer",
                        x: 0,
                        y: 0,
                        type: mt.objects.GROUP,
                        contents: [{
                            id: "congratsContainer",
                            name: "congratsContainer",
                            type: mt.objects.GROUP,
                            isVisible: !0,
                            contents: [{
                                name: "congratsText",
                                id: "congratsText",
                                x: 1024,
                                y: 565,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 98px 'freesetboldc'",
                                    fill: "#ffffff",
                                    align: "center",
                                    stroke: "#1c98ab",
                                    strokeThickness: 7
                                },
                                isVisible: !0,
                                text: "CONGRATS"
                            }]
                        }, {
                            id: "mainAreaContainer",
                            name: "mainAreaContainer",
                            type: mt.objects.GROUP,
                            contents: [{
                                name: "machWin",
                                x: 1024,
                                y: 730,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 74px 'freesetboldc'",
                                    fill: "#308794",
                                    align: "center",
                                    strokeThickness: 0
                                },
                                isVisible: !0,
                                text: "YOUR BONUS"
                            }, {
                                name: "winUserCodeText",
                                id: "winUserCodeText",
                                x: 1024,
                                y: 890,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                style: {
                                    font: "bold 112px 'freesetboldc'",
                                    fill: "#ff3f00",
                                    align: "center",
                                    stroke: "#ffffff",
                                    strokeThickness: 10
                                },
                                isVisible: !0,
                                text: " "
                            }, {
                                name: "results",
                                id: "results",
                                x: 1024,
                                y: 768,
                                anchorX: .5,
                                anchorY: .5,
                                type: mt.objects.IMAGE,
                                isVisible: !0,
                                assetKey: "/popup_1_line.png"
                            }]
                        }],
                        isVisible: !0
                    }, {
                        type: mt.objects.IMAGE,
                        isVisible: !0,
                        assetKey: "summary_bg"
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.TotalBet = {}
    }, function(e, t) {
        nge.Com.TotalBet.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.create = function() {
                return t = this, this.createDefault(), t._update(), e || t._subscribe(), e = !0
            }, this._update = function() {
                var e = nge.localData.get("lines.value"),
                    t = nge.localData.get("bet.value"),
                    n = nge.localData.get("coins.value"),
                    i = nge.localData.get("betMultiplier");
                return !(!e || !t || void 0 === n) && (e = e * t * n * i, nge.localData.set("totalBet.value", e), t = nge.find(".totalBetNumber"), n = nge.localData.get("pokerMachine.gameParameters.handsQty"), t && (t.text = e.toFixed(2)), t && n && (t.text = nge.Lib.Validator.convertToFloat(e * n)), nge.observer.fire("totalBet.change"), !0)
            }, this._subscribe = function() {
                nge.observer.add("brain.openGameSuccess", t._update), nge.observer.add("bet.change", t._update), nge.observer.add("lines.change", t._update), nge.observer.add("coins.change", t._update), nge.observer.add("totalBet.update", t._update)
            }
        }))
    }, function(e, t) {
        nge.Com.TotalBet.Tpl = function() {
            return {
                styles: {
                    ".totalbettext": {
                        anchorY: .5,
                        style: {
                            font: "48px freesetboldc",
                            fill: "#264C6F"
                        },
                        text: "BET:"
                    }
                },
                assets: {
                    name: "assets",
                    contents: []
                },
                objects: {
                    name: "objects",
                    contents: [{
                        name: "totalBetNumber",
                        type: mt.objects.TEXT,
                        class: "totalbettext totalbetvalue",
                        x: 5,
                        anchorX: 0,
                        isVisible: !0,
                        text: "0"
                    }, {
                        name: "totalBetText",
                        class: "totalbettext totalbetname",
                        type: mt.objects.TEXT,
                        x: -5,
                        anchorX: 1,
                        isVisible: !0
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Tutorial = {}
    }, function(e, t) {
        nge.Com.Tutorial.Controller = nge.Com.Base.extend((function() {
            var e, t, n = this;
            this.create = function() {
                return this.createDefault(), e || (n._subscribe(), t = this.getInstance("View"), e = !0), !0
            }, this._showTutorial = function() {
                t.show()
            }, this._close = function() {
                t.close()
            }, this._next = function() {
                t.next()
            }, this._back = function() {
                t.back()
            }, this._subscribe = function() {
                nge.observer.add("welcomePopup.hidden", n._showTutorial), nge.observer.add("tutorial.next", n._next), nge.observer.add("tutorial.back", n._back), nge.observer.add("tutorial.close", n._close)
            }
        }))
    }, function(e, t) {
        nge.Com.Tutorial.Tpl = function() {
            return {
                styles: {
                    ".tutorialNavigationText": {
                        anchorX: .5,
                        anchorY: .5,
                        style: {
                            font: '40px "freesetboldc"',
                            fill: "#FFFFFF",
                            align: "center"
                        }
                    },
                    "^tutorialClose": {
                        frame: 1,
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 0
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: [{
                        fullPath: "img/black-bg.png",
                        key: "black-bg",
                        qualityObeys: !1
                    }, {
                        fullPath: "img/tutorial/info/tutorial_panel_arrow.png",
                        key: "tutorial_panel_arrow"
                    }, {
                        fullPath: "img/tutorial/info/tutorial_panel_1px.png",
                        key: "tutorial_panel_1px"
                    }, {
                        fullPath: "img/tutorial/info/tutorial_panel_corner.png",
                        key: "tutorial_panel_corner"
                    }, {
                        fullPath: "img/tutorial/info/tutorial_panel_corner.png",
                        key: "tutorial_panel_corner"
                    }, {
                        fullPath: "img/tutorial/info/btn_back.png",
                        key: "tutorial_back",
                        width: 1104,
                        height: 88,
                        frameWidth: 276
                    }, {
                        fullPath: "img/tutorial/info/btn_next.png",
                        key: "tutorial_next",
                        width: 1104,
                        height: 88,
                        frameWidth: 276
                    }, {
                        fullPath: "img/tutorial/info/btn_close.png",
                        key: "tutorial_close",
                        width: 216,
                        height: 72,
                        frameWidth: 72
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        name: "tutorial",
                        type: mt.objects.GROUP,
                        isVisible: !1,
                        contents: [{
                            name: "tutorialNavigation",
                            type: mt.objects.GROUP,
                            isVisible: !0,
                            contents: [{
                                name: "tutorialNext",
                                type: mt.objects.GROUP,
                                x: 1224,
                                y: 1300,
                                isVisible: !0,
                                contents: [{
                                    class: "tutorialNavigationText",
                                    name: "tutorialNextText",
                                    type: mt.objects.TEXT,
                                    x: -20,
                                    isVisible: !0,
                                    text: "NEXT"
                                }, {
                                    class: "button",
                                    name: "tutorialNextButton",
                                    type: mt.objects.BUTTON,
                                    anchorX: .5,
                                    anchorY: .5,
                                    isVisible: !0,
                                    assetKey: "tutorial_next",
                                    action: 'function () {nge.observer.fire("tutorial.next");}'
                                }]
                            }, {
                                name: "tutorialBack",
                                type: mt.objects.GROUP,
                                x: 824,
                                y: 1300,
                                isVisible: !0,
                                contents: [{
                                    class: "tutorialNavigationText",
                                    name: "tutorialBackText",
                                    type: mt.objects.TEXT,
                                    x: 20,
                                    isVisible: !0,
                                    text: "PREVIOUS"
                                }, {
                                    class: "button",
                                    name: "tutorialBackButton",
                                    type: mt.objects.BUTTON,
                                    anchorX: .5,
                                    anchorY: .5,
                                    isVisible: !0,
                                    assetKey: "tutorial_back",
                                    action: 'function () {nge.observer.fire("tutorial.back");}'
                                }]
                            }, {
                                name: "tutorialClose",
                                type: mt.objects.BUTTON,
                                x: 1024,
                                y: 500,
                                anchorX: .5,
                                isVisible: !0,
                                assetKey: "tutorial_close",
                                action: 'function () {nge.observer.fire("tutorial.close");}'
                            }]
                        }, {
                            name: "tutorial-container",
                            type: mt.objects.GROUP,
                            isVisible: !0,
                            contents: [{
                                name: "objcopycontainer",
                                type: mt.objects.GROUP,
                                isVisible: !0,
                                contents: [{
                                    class: "obj-copy",
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    inputEnabled: !0,
                                    assetKey: "black-bg"
                                }]
                            }, {
                                class: "tutorial-box",
                                type: mt.objects.GROUP,
                                isVisible: !0,
                                contents: [{
                                    class: "corner-left-top",
                                    x: 8,
                                    y: 8,
                                    anchorX: .5,
                                    anchorY: .5,
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    assetKey: "tutorial_panel_corner"
                                }, {
                                    class: "px-top",
                                    x: 16,
                                    scaleY: 16,
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    assetKey: "tutorial_panel_1px"
                                }, {
                                    class: "corner-right-top",
                                    y: 0,
                                    angle: 90,
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    assetKey: "tutorial_panel_corner"
                                }, {
                                    class: "px-left",
                                    y: 16,
                                    scaleX: 16,
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    assetKey: "tutorial_panel_1px"
                                }, {
                                    class: "tutorial-text",
                                    type: mt.objects.TEXT,
                                    x: 16,
                                    y: 16,
                                    isVisible: !0,
                                    text: "",
                                    style: {
                                        font: 'bold 36px "freesetboldc"',
                                        fill: "#ffffff",
                                        align: "left",
                                        wordWrap: !0,
                                        wordWrapWidth: 600
                                    }
                                }, {
                                    class: "px-middle",
                                    x: 16,
                                    y: 16,
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    assetKey: "tutorial_panel_1px"
                                }, {
                                    class: "px-right",
                                    y: 15,
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    assetKey: "tutorial_panel_1px"
                                }, {
                                    class: "corner-left-bottom",
                                    x: 0,
                                    angle: 270,
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    assetKey: "tutorial_panel_corner"
                                }, {
                                    class: "px-bottom",
                                    x: 15,
                                    scaleY: 16,
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    assetKey: "tutorial_panel_1px"
                                }, {
                                    class: "corner-right-bottom",
                                    x: 0,
                                    y: 0,
                                    angle: 180,
                                    type: mt.objects.IMAGE,
                                    isVisible: !0,
                                    assetKey: "tutorial_panel_corner"
                                }]
                            }, {
                                class: "tutorial-arrow",
                                type: mt.objects.IMAGE,
                                anchorX: .5,
                                anchorY: .5,
                                isVisible: !0,
                                assetKey: "tutorial_panel_arrow"
                            }, {
                                name: "tutorialBg",
                                type: mt.objects.IMAGE,
                                alpha: .6,
                                scaleX: 205,
                                scaleY: 154,
                                isVisible: !0,
                                inputEnabled: !0,
                                assetKey: "black-bg"
                            }]
                        }]
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.Tutorial.View = Class.extend((function() {
            var e, t, n, i, o = this,
                s = 0,
                a = nge.game.world.width - 20,
                r = nge.game.world.height - 20,
                l = [{
                    text: "SPINS THE REELS",
                    arrowPosition: "right",
                    target: nge.findOne("^spinButton"),
                    targetSelector: "^spinButton"
                }, {
                    text: "ACTIVATES ALL AVAILABLE PAY LINES",
                    arrowPosition: "right",
                    target: nge.findOne("^maxbetContainer"),
                    targetSelector: "^maxbetContainer"
                }, {
                    text: "AFTER A WIN, YOU MAY GAMBLE TO DOUBLE  YOUR WIN",
                    arrowPosition: "right",
                    target: nge.findOne("^gambleButton"),
                    targetSelector: "^gambleButton"
                }, {
                    text: "OPENS OPTIONS AND LAUNCHES AUTOSPIN",
                    arrowPosition: "right",
                    target: nge.findOne("^autoSpinButtonContainer"),
                    targetSelector: "^autoSpinButtonContainer"
                }, {
                    text: "SHOWS YOUR CASH BALANCE AND ALLOWS YOU TO MAKE A DEPOSIT",
                    arrowPosition: "top",
                    target: nge.findOne("^playHeader"),
                    targetSelector: "^playHeader"
                }, {
                    text: "CHANGES THE SETTINGS FOR BET AMOUNT, PAY LINES, IMAGE QUALITY AND SOUND",
                    arrowPosition: "bottom",
                    target: nge.findOne("^btn_settings"),
                    targetSelector: "^btn_settings"
                }, {
                    text: "SHOWS PAYOUTS FOR SYMBOLS, SPECIALS AND PAY LINES",
                    arrowPosition: "bottom",
                    target: nge.findOne("^paytableButtonContainer"),
                    targetSelector: "^paytableButtonContainer"
                }, {
                    text: "SHOWS INFO ABOUT CURRENT WINS, STAKES ETC.",
                    arrowPosition: "bottom",
                    target: nge.findOne("^infoPanelContainer"),
                    targetSelector: "^infoPanelContainer",
                    targetShift: {
                        x: -580,
                        y: 0
                    }
                }, {
                    text: "LEAVE THE GAME",
                    arrowPosition: "top",
                    target: nge.findOne("^btn_close"),
                    targetSelector: "^btn_close",
                    targetShift: {
                        x: -35,
                        y: 10
                    }
                }];
            this.show = function() {
                e = nge.findOne(".tutorial-box"), t = nge.findOne(".tutorial-arrow"), n = nge.findOne("^tutorialNext"), i = nge.findOne("^tutorialBack");
                var a = nge.findOne("^tutorialClose"),
                    r = nge.findOne("^btn_close");
                a.x = r.x, a.y = r.y, a.anchor.x = r.anchor.x, a.anchor.y = r.anchor.y, nge.findOne("^gambleButtonContainer").visible = !0, o._updateSteps(), o._showStep(s)
            }, this.next = function() {
                ++s >= l.length ? this.close() : o._showStep(s)
            }, this.back = function() {
                0 >= --s ? o._showStep(0) : o._showStep(s)
            }, this.close = function() {
                nge.findOne("^gambleButtonContainer").visible = !1;
                var e = nge.findOne("^tutorial"),
                    t = nge.tween.add(e);
                t.to({
                    alpha: 0
                }, 300), t.onComplete.addOnce((function() {
                    e.destroy(!0), nge.observer.fire("tutorial.closed")
                })), t.start()
            }, this._updateSteps = function() {
                for (var e = 0; e < l.length; e++) l[e].target = nge.findOne(l[e].targetSelector)
            }, this._showStep = function(e) {
                s = e;
                var t = l[e];
                if (!t.target) return o.next(), !1;
                var n = o._objClone(t);
                return o._createTooltip(t, n), nge.findOne("^tutorial").visible = !0, o._updateNavButtons(e), !1
            }, this._updateNavButtons = function(e) {
                switch (e) {
                    case 0:
                        n.visible = !0, i.visible = !1;
                        break;
                    default:
                        n.visible = !0, i.visible = !0
                }
            }, this._createTooltip = function(e, t) {
                o._updateTextContainer(e), o._textContainerPositioning(e, t), o._arrowPositioning(e, t)
            }, this._updateTextContainer = function(e) {
                var t = nge.findOne(".tutorial-box .tutorial-text");
                t.text = e.text, (e = nge.findOne(".tutorial-box .px-middle")).width = t.width, e.height = 110 > t.height ? 110 : t.height, (t = nge.findOne(".tutorial-box .px-top")).width = e.width + 1, t.height = 16, nge.findOne(".tutorial-box .corner-right-top").x = e.width + 32, (t = nge.findOne(".tutorial-box .px-left")).height = e.height + 1, t.width = 16, (t = nge.findOne(".tutorial-box .px-right")).height = e.height + 2, t.width = 16, t.x = e.width + 16, nge.findOne(".tutorial-box .corner-left-bottom").y = e.height + 32, (t = nge.findOne(".tutorial-box .px-bottom")).y = e.y + e.height - 3, t.width = e.width + 2, t.height = 19, (t = nge.findOne(".tutorial-box .corner-right-bottom")).x = 32 + e.width, t.y = 32 + e.height
            }, this._textContainerPositioning = function(n, i) {
                var s = n.targetShift && n.targetShift.y ? n.targetShift.y : 0;
                switch (e.x = i.x + (n.targetShift && n.targetShift.x ? n.targetShift.x : 0), e.y = i.y + s, n.arrowPosition) {
                    case "top":
                        e.x += i.width / 2 - e.width / 2, e.y += i.height + t.height - 2, o._checkMinMax(e, "x");
                        break;
                    case "bottom":
                        e.x += i.width / 2 - e.width / 2, e.y -= e.height + t.height - 2, o._checkMinMax(e, "x");
                        break;
                    case "left":
                        e.x += i.width + t.height - 2, e.y += i.height / 2 - e.height / 2, o._checkMinMax(e, "y");
                        break;
                    case "right":
                        e.x -= e.width + t.height - 2, e.y += i.height / 2 - e.height / 2, o._checkMinMax(e, "y")
                }
                return !1
            }, this._checkMinMax = function(e, t) {
                switch (t) {
                    case "x":
                        20 > e.x ? e.x = 20 : e.x + e.width > a && (e.x = a - e.width);
                        break;
                    case "y":
                        20 > e.y ? e.y = 20 : e.y + e.height > r && (e.y = r - e.height)
                }
            }, this._arrowPositioning = function(e, n) {
                var i = t,
                    s = n.x + (e.targetShift && e.targetShift.x ? e.targetShift.x : 0),
                    a = n.y + (e.targetShift && e.targetShift.y ? e.targetShift.y : 0),
                    r = o._getArrowAngle(e.arrowPosition);
                switch (i.x = s, i.y = a, i.pivot.x = .5, i.pivot.y = .5, i.angle = r, e.arrowPosition) {
                    case "top":
                        i.x += n.width / 2, i.y += n.height + i.height / 2;
                        break;
                    case "bottom":
                        i.x += n.width / 2, i.y -= i.height / 2;
                        break;
                    case "left":
                        i.x += n.width + i.height / 2, i.y += n.height / 2;
                        break;
                    case "right":
                        i.x -= i.height / 2, i.y += n.height / 2
                }
                return !1
            }, this._getArrowAngle = function(e) {
                switch (e) {
                    case "bottom":
                        var t = 0;
                        break;
                    case "right":
                        t = -90;
                        break;
                    case "left":
                        t = 90;
                        break;
                    case "top":
                        t = 180
                }
                return t
            }, this._objClone = function(e) {
                e = e.target;
                var t = nge.findOne("^tutorial-container .obj-copy"),
                    n = e instanceof Phaser.Button;
                return t.x = e.worldTransform.tx / e.worldTransform.a, t.y = e.worldTransform.ty / e.worldTransform.d, n && (t.x /= nge.assets.getQualityFactor(), t.y /= nge.assets.getQualityFactor()), n = e.generateTexture(), t.x += e._bounds.x, t.y += e._bounds.y, t.setTexture(n), t.width = e.width, t.height = e.height, t
            }
        }))
    }, function(e, t) {
        nge.Com.WelcomePopup = {}
    }, function(e, t) {
        nge.Com.WelcomePopup.Controller = nge.Com.Base.extend((function() {
            var e, t, n = !1;
            this.create = function() {
                t = this, this.createDefault(), e || (t._subscribe(), e = !0);
                var n = nge.find("^welcomePopupLogo"),
                    i = 900 < n.width ? .8 : 1;
                return n.scaleY = i, n.scaleX = i, !0
            }, this._show = function() {
                nge.find("#welcomePopup").visible = !0
            }, this._dontShow = function() {
                n = !n;
                var e = nge.find(".welcomePopup .welcome-checkbox");
                e.removeClass("regular").removeClass("active"), n ? e.addClass("active") : e.addClass("regular"), nge.observer.fire("welcomePopup.showTutorial", !n)
            }, this._play = function() {
                nge.localData.set("showTutorial", !1), nge.find("#welcomePopup").destroy(!0), nge.observer.fire("welcomePopup.hidden")
            }, this._subscribe = function() {
                nge.observer.add("welcomePopup.show", t._show), nge.observer.add("welcomePopup.dontShow", t._dontShow), nge.observer.add("welcomePopup.play", t._play)
            }
        }))
    }, function(e, t) {
        nge.Com.WelcomePopup.Tpl = function() {
            return {
                styles: {
                    ".welcomePopup .welcome-checkbox.regular": {
                        btnFrames: {
                            over: 2,
                            out: 1,
                            down: 0
                        }
                    },
                    ".welcomePopup .welcome-checkbox.active": {
                        btnFrames: {
                            over: 5,
                            out: 4,
                            down: 3
                        }
                    }
                },
                assets: {
                    name: "assets",
                    contents: [{
                        fullPath: "img/tutorial/welcome_scr/welcome_popup.png",
                        key: "welcome_popup"
                    }, {
                        fullPath: "img/tutorial/welcome_scr/btn_play_now.png",
                        key: "btn_play_now",
                        width: 1548,
                        height: 144,
                        frameWidth: 516,
                        frameHeight: 144
                    }, {
                        fullPath: "img/tutorial/welcome_scr/checkbox.png",
                        key: "checkbox",
                        width: 456,
                        height: 76,
                        frameWidth: 76,
                        frameHeight: 76
                    }, {
                        name: "groupLogo",
                        contents: nge.tpl.group("logo").assets.contents
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "welcomePopup",
                        name: "welcomePopup",
                        class: "welcomePopup",
                        type: mt.objects.GROUP,
                        isVisible: !1,
                        contents: [{
                            x: 1050,
                            y: 972,
                            anchorX: .5,
                            type: mt.objects.TEXT,
                            isVisible: !0,
                            text: "PLAY NOW",
                            style: {
                                font: "bold 44pt 'freesetboldc'",
                                fill: "#f7ffff",
                                align: "left"
                            }
                        }, {
                            x: 640,
                            y: 1115,
                            type: mt.objects.TEXT,
                            isVisible: !0,
                            text: "DON'T SHOW THIS TUTORIAL AGAIN",
                            style: {
                                font: 'bold 32pt "freesetboldc"',
                                fill: "#0175b7",
                                align: "left"
                            }
                        }, {
                            x: 1050,
                            y: 810,
                            anchorX: .5,
                            anchorY: .5,
                            type: mt.objects.TEXT,
                            isVisible: !0,
                            text: "idleStart" + nge.Lib.Helper.getRandomInt(1, 5),
                            style: {
                                font: "bold 45pt 'freesetboldc'",
                                fill: "#ffffff",
                                align: "center",
                                wordWrap: !0,
                                wordWrapWidth: 850
                            }
                        }, {
                            x: 760,
                            y: 325,
                            type: mt.objects.TEXT,
                            isVisible: !0,
                            text: "WELCOME!",
                            style: {
                                font: '80pt "freesetboldc"',
                                fill: "#e5fbff",
                                align: "left"
                            }
                        }, {
                            x: 1455,
                            y: 1092,
                            class: "welcome-checkbox regular",
                            anchorX: .5,
                            type: mt.objects.BUTTON,
                            isVisible: !0,
                            assetKey: "checkbox",
                            action: "function () {nge.observer.fire('welcomePopup.dontShow');}"
                        }, {
                            x: 1050,
                            y: 935,
                            anchorX: .5,
                            type: mt.objects.BUTTON,
                            isVisible: !0,
                            assetKey: "btn_play_now",
                            action: "function () {nge.observer.fire('welcomePopup.play');}",
                            btnFrames: {
                                over: 2,
                                out: 1,
                                down: 2
                            }
                        }, {
                            name: "welcomePopupLogo",
                            type: mt.objects.GROUP,
                            anchorX: .5,
                            x: 1050,
                            y: 615,
                            contents: nge.tpl.group("logo").objects.contents,
                            isVisible: 1
                        }, {
                            type: mt.objects.IMAGE,
                            assetKey: "welcome_popup",
                            inputEnabled: !0
                        }]
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Com.WinInfo = {}
    }, function(e, t) {
        nge.Com.WinInfo.Controller = nge.Com.Base.extend((function() {
            var e, t;
            this.preload = function() {
                this.preloadDefault()
            }, this.create = function() {
                return t = this, this.createDefault(), e || t._subscribe(), e = !0
            }, this.customSubscribe = function() {
                return !0
            }, this._subscribe = function() {
                return nge.observer.add("win", t._winHandler), nge.observer.add("loose", t._winHandler), t.customSubscribe(), !0
            }, this._winHandler = function(e) {
                var t = nge.find("^winInfoWinAmountValue");
                t && (t.text = nge.localData.get("currency") + nge.Lib.Validator.convertToFloat(e.winAmount)), (t = nge.find("^winInfoWinFactorValue")) && (t.text = nge.Lib.Validator.convertToFloat(e.winMultiplier))
            }
        }))
    }, function(e, t) {
        nge.Com.Winlines = {}
    }, function(e, t) {
        nge.Com.Winlines.Cfg = Class.extend((function() {
            this.showLinesOnWin = this.buildWinLines = this.singleton = !0, this.linesHighligntDuration = 5e3, this.fastAutoMode = !0, this.animateAllSymbols = this.customParentName = !1, this.animationAllDelayPerLine = this.animationAllDelay = this.animationAllDuration = 0, this.animationOneByOneDuration = 3e3, this.rowsIndexesNormalizeValue = !1, this.globalOffset = 200, this.lineWeight = 6, this.tailSize = 0, this.cacheLineObjectsAsBitmap = !0, this.lineColors = "0xf9cc16 0x86e21a 0x2cd1e6 0xe496fa 0x9698fa 0xe7962d 0xbbe233 0xf9f10d 0xf35b5b 0x999999 0xaaaaaa 0xbbbbbb 0xcccccc 0xdddddd 0xeeeeee 0xffffff 0x123456 0xcccccc 0xcccccc 0xffffff".split(" "), this.lineOffsets = [0, 0, 0, -30, -30, -30, 30, 30, 30, -60, -60, -60, 60, 60, 60, -90, -90, -90, 90, 90], this.lineCustomCoords = [!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1], this.stroke = {
                weight: 2,
                alpha: .5,
                colors: "0xa36b24 0x40961e 0x2090ef 0xb25acc 0x6b71b2 0xa16210 0x627d03 0xac8b05 0xb61558 0xa36b24 0x40961e 0x2090ef 0xb25acc 0x6b71b2 0xa16210 0x627d03 0xac8b05 0xb61558 0xcccccc 0xffffff".split(" ")
            }, this.shadow = !0, this.numbers = {
                font: "bold 30px Arial",
                fill: "#ffffff",
                stroke: "#9a620b",
                strokeThickness: 5,
                lineHeight: 20
            }, this.numbersHighlighted = {
                font: "bold 30px Arial",
                fill: "#ffc668",
                stroke: "#8b4e0c",
                strokeThickness: 5,
                lineHeight: 20
            }, this.offsetFromLine = 30, this.numbersPositions = "both both both both both both both both both both both both both both both both both both both both".split(" "), this.thumbsOn = this.numbersCustomY = this.numbersCustomDecoration = !1, this.thumbs = {
                width: 380,
                height: 230,
                columns: null,
                rows: null,
                customRowsIndexesNormalizeValue: null,
                cellBgColor: "0xebf3f4",
                cellStrokeColor: "0x30afc2",
                cellBorderSize: 5,
                lineSize: 16,
                lineColor: "0x63de27",
                lineStrokeSize: 4,
                lineStrokeColor: "0xebf3f4"
            }
        }))
    }, function(e, t) {
        nge.Com.Winlines.Controller = nge.Com.Base.extend((function() {
            var e, t, n, i;
            this._service, this._view, this.preload = function() {
                return i = this, this.preloadDefault(), t = this.getInstance("Cfg", "slotMachine").get(), i._view || (i._view = this.getInstance("View")), i._service || (i._service = this.getInstance("Service")), i._service.preload(i._view), !0
            }, this.create = function() {
                return this.createDefault(), n || i._subscribe(), i._service.create(t), this.getInstance("Cfg").thumbsOn && (e || (e = this.getInstance("ThumbsService")), e.create(i._view)), i._stopLinesAnimationWithClearQuery(), n = !0
            }, this.destroy = function() {
                i._stopLinesAnimationWithClearQuery()
            }, this._setWinlines = function(e) {
                _normalizeRowsIndexes(e), i._view.buildWinLines(e)
            }, this._show = function(e) {
                i._view.show(e)
            }, this._hide = function(e) {
                i._view.hide(e)
            }, this._hideAll = function() {
                i._view.hideAll()
            }, this._setNewQuery = function(e) {
                i._view.setNewQuery(e)
            }, this._animateAll = function() {
                i._view.animateAll()
            }, this._animateByOne = function() {
                i._view.animateByOne()
            }, this._getThumbs = function() {
                var t = e.getThumbs();
                nge.observer.fire("winlines.thumbsResponse", t)
            }, this._highlightLines = function(e) {
                i._view.highlightLines(e)
            }, this._highlightNumbers = function(e) {
                i._view.highlightNumbers(e)
            }, this._stopLinesAnimation = function(e) {
                nge.observer.fire("winlines.stoppingAnimation.start"), i._view.stopLinesAnimation(e), i._view.hideAll()
            }, this._pauseLinesAnimation = function() {
                i._view.stopLinesAnimation()
            }, this._stopLinesAnimationWithClearQuery = function() {
                i._stopLinesAnimation(!0)
            }, this._sendLineToBack = function(e) {
                i._view.sendLineToBack(e)
            }, this._linesChangeHandler = function() {
                nge.localData.set("winlines.updated", !0);
                var e = nge.localData.get("lines.value");
                i._highlightLines(e), i._highlightNumbers(e)
            }, this._setCurrentLineDuration = function(e) {
                i._view.setCurrentLineDuration(e)
            }, this._setCurrentLineDurationFirstTime = function(e) {
                i._view.setCurrentLineDuration(e, !0)
            }, this._subscribe = function() {
                return nge.observer.add("Transport.close", i._pauseLinesAnimation), nge.observer.add("winlines.set", i._setWinlines), nge.observer.add("winlines.show", i._show), nge.observer.add("winlines.hide", i._hide), nge.observer.add("winlines.hideAll", i._hideAll), nge.observer.add("slotMachine.spinResponse", i._setNewQuery), nge.observer.add("winlines.setNewQuery", i._setNewQuery), nge.observer.add("winlines.animateAll", i._animateAll), nge.observer.add("winlines.animateByOne", i._animateByOne), nge.observer.add("winlines.thumbsRequest", i._getThumbs), nge.observer.add("winlines.sendLineToBack", i._sendLineToBack), nge.observer.add("lines.change", i._linesChangeHandler), nge.observer.add("slotMachine.spinStart", i._stopLinesAnimation), nge.observer.add("winlines.pauseAnimation", i._stopLinesAnimation), nge.observer.add("winlines.stopAnimation", i._stopLinesAnimationWithClearQuery), nge.observer.add("winlines.setCurrentLineDuration", i._setCurrentLineDuration), nge.observer.add("winlines.setCurrentLineDurationFirstTime", i._setCurrentLineDurationFirstTime), i.customSubscribe(), !0
            }, this.customSubscribe = function() {
                return !0
            }
        }))
    }, function(e, t) {
        nge.Com.Winlines.Service = Class.extend((function() {
            var e;
            this.preload = function(t) {
                return e = t, (t = this.getInstance("Cfg")).numbersCustomDecoration && nge.game.load.image(t.numbersCustomDecoration, t.numbersCustomDecoration), !0
            }, this.create = function() {
                return e.create(), e.normalizeRowsIndexes(), !0
            }
        }))
    }, function(e, t) {
        nge.Com.Winlines.ThumbsService = Class.extend((function() {
            var e, t, n, i, o, s = this;
            this.create = function(e) {
                return t = this.getInstance("Cfg"), i = nge.localData.get("winlines"), o = this.getInstance("ThumbsView"), n = this.getInstance("Cfg", "slotMachine").get(), s._createThumbs(e), !0
            }, this.getThumbs = function() {
                return e || s._createThumbs(), e
            }, this._createThumbs = function(a) {
                e && 0 < e.length && s._destroyThumbs(), e = [];
                var r = t.thumbs.rows || n.mh,
                    l = t.thumbs.columns || n.mw;
                for (r = {
                        columns: l,
                        rows: r,
                        rowsIndexesNormalizeValue: t.thumbs.customRowsIndexesNormalizeValue || a.normalizeRowsIndexes(),
                        width: t.thumbs.width,
                        height: t.thumbs.height,
                        cellBgColor: t.thumbs.cellBgColor,
                        cellStrokeColor: t.thumbs.cellStrokeColor,
                        cellBorderSize: t.thumbs.cellBorderSize,
                        lineSize: t.thumbs.lineSize,
                        lineColor: t.thumbs.lineColor,
                        lineStrokeSize: t.thumbs.lineStrokeSize,
                        lineStrokeColor: t.thumbs.lineStrokeColor,
                        symbolWidth: (t.thumbs.width - (l + 1) * t.thumbs.cellBorderSize) / l,
                        symbolHeight: (t.thumbs.height - (r + 1) * t.thumbs.cellBorderSize) / r
                    }, l = 0; l < i.length; l++) {
                    var c = i[l];
                    o.drawThumb(r, a, c), (c = nge.objects.create(new nge.Mlm.Objects.Image({
                        assetKey: "1px_empty"
                    }))).loadTexture(c.generateTexture()), e.push(c)
                }
            }, this._destroyThumbs = function() {
                e = []
            }
        }))
    }, function(e, t) {
        nge.Com.Winlines.ThumbsView = Class.extend((function() {
            var e, t = this;
            this.drawThumb = function(n, i, o) {
                return e = i, i = nge.objects.create(new nge.Mlm.Objects.Graphics, null), t._drawGrid(i, n), t._drawLineThumb(i, n, o), i
            }, this._drawGrid = function(e, t) {
                e.beginFill(t.cellStrokeColor, 1), e.drawRoundedRect(0, 0, t.width, t.height, 14), e.endFill();
                for (var n = 0; n < t.columns; n++)
                    for (var i = 0; i < t.rows; i++) e.beginFill(t.cellBgColor, 1), e.drawRoundedRect(t.cellBorderSize + (t.symbolWidth + t.cellBorderSize) * n, t.cellBorderSize + (t.symbolHeight + t.cellBorderSize) * i, t.symbolWidth, t.symbolHeight, 14), e.endFill();
                return e
            }, this._drawLineThumb = function(e, n, i) {
                return n.lineStrokeSize && n.lineStrokeColor && t._draw(e, i, n, 2 * n.lineStrokeSize + n.lineSize, n.lineStrokeColor), t._draw(e, i, n, n.lineSize, n.lineColor), e
            }, this._draw = function(t, n, i, o, s) {
                for (var a, r, l, c, u = 0; u < n.length - 1; u++) 0 === u ? (a = i.symbolWidth * u + i.symbolWidth / 2 + i.cellBorderSize * (u + 1), r = i.symbolHeight * (n[u] - i.rowsIndexesNormalizeValue) + i.symbolHeight / 2 + i.cellBorderSize * (n[u] + 1 - i.rowsIndexesNormalizeValue), l = i.symbolWidth * (u + 1) + i.symbolWidth / 2 + i.cellBorderSize * (u + 2), c = i.symbolHeight * (n[u + 1] - i.rowsIndexesNormalizeValue) + i.symbolHeight / 2 + i.cellBorderSize * (n[u + 1] + 1 - i.rowsIndexesNormalizeValue), e.drawConnector(t, a, r, o, s, 1)) : (l = i.symbolWidth * (u + 1) + i.symbolWidth / 2 + i.cellBorderSize * (u + 2), c = i.symbolHeight * (n[u + 1] - i.rowsIndexesNormalizeValue) + i.symbolHeight / 2 + i.cellBorderSize * (n[u + 1] + 1 - i.rowsIndexesNormalizeValue)), e.drawSegment(t, a, r, l, c, o, s, 1), e.drawConnector(t, a, r, o, s, 1), a = l, r = c;
                e.drawConnector(t, a, r, o, s, 1)
            }
        }))
    }, function(e, t) {
        nge.Com.Winlines.View = Class.extend((function() {
            this._cfg;
            var e, t, n, i, o, s, a, r, l, c, u, g = this,
                f = [],
                p = 0,
                b = [],
                m = !1,
                h = !1,
                d = !0;
            this.create = function() {
                return t = nge.localData.get("winlines"), n = [], f = [], g._cfg = this.getInstance("Cfg"), p = nge.localData.get("lines.value") || 0, e = this.getInstance("Cfg", "slotMachine").get(), this.buildWinLines(), !0
            }, this.normalizeRowsIndexes = function() {
                if (!1 !== g._cfg.rowsIndexesNormalizeValue && (m = g._cfg.rowsIndexesNormalizeValue), !1 !== m) return m;
                if (!t) return !1;
                for (var e = 0; e < t.length; e++)
                    for (var n = 0, i = t[e].length; n < i; n++) m = m > t[e][n] ? t[e][n] : m;
                return m
            }, this.buildWinLines = function() {
                if (n && n.length) return !1;
                if (g._cfg.buildWinLines && (!t || !t.length)) return console.error("lines is undefined ", t), !1;
                if (!(i = nge.findOne("^" + (g._cfg.customParentName ? g._cfg.customParentName : e.parentName)))) return !1;
                g._cfg.numbers && (o = nge.objects.create(new nge.Mlm.Objects.Folder({}), i));
                var r = i.mt.data;
                s = r.width / e.mw, a = r.height / e.mh, r = i;
                var l = document.createElement("canvas"),
                    c = l.getContext("2d");
                if (l.width = 1920, l.height = 1080, c.translate(i.x, 0), g._cfg.buildWinLines)
                    for (var u = 0; u < t.length; u++) {
                        c.clearRect(0, 0, l.width, l.height);
                        var b = 0;
                        if (g._cfg.shadow) {
                            var m = g._cfg.stroke ? g._cfg.stroke.weight + g._cfg.lineWeight : g._cfg.lineWeight;
                            b = ++m + 4, g._drawLine(t[u], u, c, m, "0x000000", .2)
                        }
                        g._cfg.stroke && (g._drawLine(t[u], u, c, g._cfg.stroke.weight + g._cfg.lineWeight, g._cfg.stroke.colors[u], g._cfg.stroke.alpha), b = b || g._cfg.stroke.weight + g._cfg.lineWeight), g._drawLine(t[u], u, c, g._cfg.lineWeight, g._cfg.lineColors[u]), b = b || g._cfg.lineWeight, b = g._cutLine(t[u], u, c, b), (m = nge.objects.create(new nge.Mlm.Objects.Folder({
                            name: "winline_" + u
                        }))).visible = !1, m.add(b), n.push(m), g._cfg.cacheLineObjectsAsBitmap && (b.cacheAsBitmap = !0), r.add(m), g._cfg.numbers && (m = g._createLineNumber(u), o.add(m), f.push(m), u < p && g._highlightLineNumber(u)), nge.localData.get("winlines.updated") && u < p && this.show(u)
                    }
                nge.localData.set("winlines.items", n), nge.localData.set("winlines.updated", !1), nge.observer.fire("winlines.buildWinLines.finish")
            }, this._cutLine = function(e, t, n, o) {
                var r, l = nge.objects.create(new nge.Mlm.Objects.Folder({})),
                    c = s,
                    u = a,
                    f = g._cfg.tailSize || c / 2,
                    p = function(e, t, s, a, r) {
                        r = e - o / 2;
                        var c = (t < a ? t : a) - o / 2;
                        e = s - e + o, t = Math.abs(a - t) + o, a = n.getImageData(r + i.x, c, e, t), (s = document.createElement("canvas")).width = e, s.height = t, s.getContext("2d").putImageData(a, 0, 0), (t = new PIXI.Sprite(PIXI.Texture.fromCanvas(s))).x = r, t.y = c, l.addChild(t)
                    },
                    b = g._cfg.globalOffset + g._cfg.lineOffsets[t];
                if (r = g._cfg.lineCustomCoords[t]) {
                    for (e = !0, t = 0; t < r.length; t++) {
                        var m = r[t][0],
                            h = r[t][1];
                        if (e) {
                            e = !1;
                            var d = m,
                                y = h
                        }
                        p(d, y, m, h), d = m, y = h
                    }
                    return l
                }
                for (t = 0, r = e.length; t < r; t++) 0 === t ? p(d = c / 2 - f, y = e[0] * u + u / 2 + b, m = c / 2, h = y, !0) : p(d, y, m = t * c + c / 2, h = e[t] * u + u / 2 + b), d = m, y = h;
                return p(d, y, m + f, h), l
            }, this.show = function(e) {
                if (!n[e] || nge.localData.get("slotMachineSpinning")) return !1;
                n[e].visible = !0, i.bringToTop(n[e])
            }, this.hide = function(e) {
                return !!n[e] && (n[e].visible = !1, !0)
            }, this.hideAll = function() {
                nge.observer.fire("winlines.view.startHideAll"), nge.localData.set("winlines.updated", !1), d || g._animationAllCallback();
                for (var e = 0; e < n.length; e++) this.hide(e);
                return !0
            }, this.highlightLines = function(e) {
                var t = g._cfg.linesHighligntDuration;
                if (0 === t) return !1;
                c = nge.Lib.Time.get();
                for (var n = 0; n < e; n++) n < e && this.show(n); - 1 !== t && nge.rafSetTimeout(g._linesHideCheck, t)
            }, this.highlightNumbers = function(e) {
                for (var t = 0; t < e; t++) g._highlightLineNumber(t)
            }, this.getAnimationQuery = function() {
                return b
            }, this.setNewQuery = function(e) {
                if (b = [], e && e.slotWin && e.slotWin.lineWinAmounts)
                    for (var t = 0; t < e.slotWin.lineWinAmounts.length; t++) b.push(e.slotWin.lineWinAmounts[t]);
                return e && e.slotWin && e.slotWin.jackpotWin && b.push(e.slotWin.jackpotWin), !0
            }, this.animateAll = function() {
                return 0 < g._cfg.animationAllDelay ? nge.rafSetTimeout(g._animateAll, g._cfg.animationAllDelay) : g._animateAll(), !0
            }, this.resetAnimationIndex = function() {
                r = 0
            }, this.animateByOne = function() {
                if (!b[r] || nge.localData.get("slotMachineSpinning")) return !1;
                nge.observer.fire("winlines.lineHighlite.start", b[r]), nge.rafClearTimeout(l);
                var e = nge.localData.get("autospin.inProgress"),
                    t = nge.localData.get("freespin.inProgress");
                if (g._cfg.fastAutoMode && (e || t)) return !1;
                this.hideAll(), void 0 !== b[r].selectedLine && g._cfg.showLinesOnWin && this.show(b[r].selectedLine), nge.observer.fire("winlines.lineHighlite.start.previousHided", b[r]), g._animateSymbols(b[r].wonSymbols), h = !1, l = nge.rafSetTimeout(g._animationOneByOneCallback, g._cfg.animationOneByOneDuration), u = "OneByOne", nge.observer.fire("winlines.lineHighlite.startComplete", b[r])
            }, this.sendLineToBack = function(e) {
                i.sendToBack(n[e])
            }, this.setCurrentLineDuration = function(e, t) {
                if (t && h) return !1;
                l && (h = !0, nge.rafClearTimeout(l), l = nge.rafSetTimeout("All" === u ? g._animationAllCallback : g._animationOneByOneCallback, e))
            }, this.stopLinesAnimation = function(e) {
                l && nge.rafClearTimeout(l), e && (b = []), d = !0
            }, this.drawSegment = function(e, t, n, i, o, s, a, r) {
                e.beginPath(), e.moveTo(t, n), e.lineTo(i, o), e.lineWidth = s, e.strokeStyle = "#" + nge.Lib.Helper.strReplace("0x", "", a), e.stroke()
            }, this.drawConnector = function(e, t, n, i, o, s) {
                1 > (s = s || 1) && (e.save(), e.globalAlpha = s), e.beginPath(), e.arc(t, n, i / 2, 0, 2 * Math.PI, !1), e.fillStyle = o.replace("0x", "#"), e.fill(), 1 > s && e.restore()
            }, this._animateAllDone = function() {
                if (d) return !1;
                d = !0, nge.observer.fire("winlines.hideAll"), nge.observer.fire("winlines.animateAllDone")
            }, this._animationAllCallback = function() {
                l && nge.rafClearTimeout(l), g._animateAllDone()
            }, this._animationOneByOneCallback = function() {
                var e = 0;
                ++r >= b.length && (r = 0, e = 5, nge.observer.fire("winlines.animateByOne.cycleComplete")), 0 < e ? nge.rafSetTimeout((function() {
                    g.animateByOne()
                }), e) : g.animateByOne()
            }, this._animateAll = function() {
                if (!b || 0 === b.length || nge.localData.get("slotMachineSpinning")) return !1;
                if (l && nge.rafClearTimeout(l), d = !1, g._cfg.animateAllSymbols)
                    for (var e in b) g._animateSymbols(b[e].wonSymbols);
                0 === g._cfg.animationAllDuration && g._animateAllDone(), r = 0, h = !1, l = nge.rafSetTimeout(g._animationAllCallback, g._cfg.animationAllDuration), u = "All";
                for (var t = 0; t < b.length; t++)(e = b[t]) && void 0 !== e.selectedLine && (0 >= g._cfg.animationAllDelayPerLine ? nge.observer.fire("winlines.show", e.selectedLine) : function(e) {
                    nge.rafSetTimeout((function() {
                        d || nge.observer.fire("winlines.show", e)
                    }), t * g._cfg.animationAllDelayPerLine)
                }(e.selectedLine));
                return !0
            }, this._linesHideCheck = function() {
                nge.Lib.Time.get() >= c + g._cfg.linesHighligntDuration && !l && g.hideAll()
            }, this._drawLine = function(e, t, n, i, o, r) {
                r = void 0 === r ? 1 : r;
                var l, c = s,
                    u = a,
                    f = g._cfg.tailSize || c / 2,
                    p = function(e, t, s, a, l) {
                        l && g.drawConnector(n, e, t, i, o, r), g.drawSegment(n, e, t, s, a, i, o, r), g.drawConnector(n, s, a, i, o, r)
                    },
                    b = g._cfg.globalOffset + g._cfg.lineOffsets[t];
                if (l = g._cfg.lineCustomCoords[t])
                    for (e = !0, t = 0; t < l.length; t++) {
                        var m = l[t][0],
                            h = l[t][1];
                        if (e) {
                            e = !1;
                            var d = m,
                                y = h
                        }
                        p(d, y, m, h), d = m, y = h
                    } else {
                        for (t = 0, l = e.length; t < l; t++) 0 === t ? p(d = c / 2 - f, y = e[0] * u + u / 2 + b, m = c / 2, h = y, !0) : p(d, y, m = t * c + c / 2, h = e[t] * u + u / 2 + b), d = m, y = h;
                        p(d, y, m + f, h)
                    }
            }, this._createLineNumber = function(e) {
                var n = g._cfg.numbers || {},
                    i = g._cfg.globalOffset + g._cfg.lineOffsets[e],
                    o = g._cfg.tailSize || s / 2,
                    r = !(!g._cfg.numbersCustomY || void 0 === g._cfg.numbersCustomY[e]) && g._cfg.numbersCustomY[e],
                    l = g._cfg.numbersPositions[e],
                    c = t[e].length - 1,
                    u = nge.objects.create(new nge.Mlm.Objects.Folder({}));
                if ("left" === l || "both" === l) {
                    var f = s / 2 - o - g._cfg.offsetFromLine,
                        p = !1 === r ? t[e][0] * a + a / 2 + i : r;
                    if (g._cfg.numbersCustomDecoration) {
                        var b = new Phaser.Image(nge.game, f, p, new PIXI.Texture(PIXI.BaseTextureCache[g._cfg.numbersCustomDecoration]));
                        b.anchor.x = .5, b.anchor.y = .5, u.add(b)
                    }
                    nge.objects.create(new nge.Mlm.Objects.Text({
                        x: f,
                        y: p,
                        text: e + 1,
                        style: n,
                        anchorX: .5,
                        anchorY: .5
                    }), u)
                }
                return "right" !== l && "both" !== l || (f = c * s + s / 2 + o + g._cfg.offsetFromLine, p = !1 === r ? t[e][c] * a + a / 2 + i : r, g._cfg.numbersCustomDecoration && ((b = new Phaser.Image(nge.game, f, p, new PIXI.Texture(PIXI.BaseTextureCache[g._cfg.numbersCustomDecoration]))).anchor.x = .5, b.anchor.y = .5, u.add(b)), nge.objects.create(new nge.Mlm.Objects.Text({
                    x: f,
                    y: p,
                    text: e + 1,
                    style: n,
                    anchorX: .5,
                    anchorY: .5
                }), u)), u
            }, this._highlightLineNumber = function(e) {
                if (!f[e]) return !1;
                f[e].forEach((function(e) {
                    e.setStyle && e.setStyle(g._cfg.numbersHighlighted)
                }))
            }, this._animateSymbols = function(e) {
                for (var t = 0; t < e.length; t++) e[t] && nge.observer.fire("slotMachine.animateSymbol", {
                    reel: e[t][0],
                    row: e[t][1]
                });
                nge.observer.fire("slotMachine.currentLineDurationCorrection", e)
            }
        }))
    }, function(e, t, n) {
        n(173), n(174), n(175), n(176), n(177), n(179), n(180), n(181), n(182), n(183), n(184), n(185), n(186), n(187), n(188), n(189), n(190), n(191), n(192), n(193), n(194), n(195), n(196), n(197)
    }, function(e, t) {
        nge.Lib = {}
    }, function(e, t) {
        nge.Lib.Api = function() {
            this.events = {
                subscribe: function(e, t, n, i) {
                    return nge.observer.add(e, t, n, i)
                },
                unsubscribe: function(e, t, n, i) {
                    return nge.observer.remove(e, t, n, i)
                }
            }, this.data = {
                get: function(e) {
                    return nge.localData.get(e)
                },
                getAll: function() {
                    return nge.localData.getAll()
                }
            }
        }
    }, function(e, t) {
        nge.Lib.Checker = {
            delay: function(e, t, n, i, o) {
                if (void 0 === i && (i = 20), void 0 === n && (n = 50), e()) return t(), !0;
                if (1 < i) nge.rafSetTimeout((function() {
                    nge.Lib.Checker.delay(e, t, n, i - 1, o)
                }), n);
                else if (o) return t(), !0;
                return !1
            },
            paths: function(e, t, n) {
                var i, o = function(e, t, i) {
                        var s;
                        for (s = 0; s < n.length; s++) {
                            var a = nge.Lib.Helper.capitaliseFirstLetter(n[s]);
                            if (e[a] && (a = o(e[a], t, i))) return a
                        }
                        return !!e[t[i]] && e[t[i]]
                    },
                    s = function(e) {
                        for (var t, i = window, s = 0; s < e.length; s++)
                            if (n && s === e.length - 1 && (t = o(i, e, s)), t) i = t;
                            else {
                                if (!i[e[s]]) return !1;
                                i = i[e[s]]
                            }
                        return i
                    };
                for (i in e) {
                    var a = s(e[i]);
                    if (a) return t(a)
                }
                return !1
            }
        }
    }, function(e, t) {
        nge.Lib.Console = {
            color: function(e, t, n) {
                t || (t = "#000"), n || (n = "#fff"), window.log("%c " + e, "background: " + n + "; color: " + t)
            },
            log: function(e, t) {
                var n = "#212121",
                    i = "#b0bec5",
                    o = {
                        error: {
                            clr: "#ffebee",
                            bgc: "#c62828"
                        },
                        success: {
                            clr: "#e8f5e9",
                            bgc: "#2e7d32"
                        },
                        warning: {
                            clr: "#fff3e0",
                            bgc: "#f4511e"
                        },
                        info: {
                            clr: "#ede7f6",
                            bgc: "#651fff"
                        }
                    };
                o.hasOwnProperty(t) && (n = o[t].clr, i = o[t].bgc), window.log("%c" + e, "color:" + n + "; font-weight:bold; background-color: " + i + "; padding: 3px 6px; border-radius: 2px;")
            }
        }, console.color = nge.Lib.Console.color
    }, function(e, t, n) {
        (function(e) {
            nge.Lib.Device = function() {
                this.deviceReadyAt = 0, this.canvas = this.windowsPhone = this.windows = this.macOS = this.linux = this.chromeOS = this.android = this.crosswalk = this.ejecta = this.electron = this.nodeWebkit = this.node = this.cordova = this.cocoonJSApp = this.cocoonJS = this.iOS = this.desktop = this.initialized = !1, this.canvasBitBltShift = null, this.vibration = this.typedArray = this.pointerLock = this.css3D = this.worker = this.localStorage = this.fileSystem = this.file = this.webGL = !1, this.getUserMedia = !0, this.mspointer = this.touch = this.quirksMode = !1, this.wheelEvent = null, this.chrome = this.arora = !1, this.chromeVersion = 0, this.firefox = this.epiphany = !1, this.firefoxVersion = 0, this.ie = !1, this.ieVersion = 0, this.trident = !1, this.tridentVersion = 0, this.iPad = this.iPhone5 = this.iPhone4 = this.iPhone = this.hlsVideo = this.vp9Video = this.webmVideo = this.mp4Video = this.h264Video = this.oggVideo = this.webm = this.m4a = this.wav = this.mp3 = this.opus = this.ogg = this.webAudio = this.audioData = this.silk = this.webApp = this.safari = this.opera = this.midori = this.mobileSafari = !1, this.pixelRatio = 0, this.fullscreen = this.support32bit = this.LITTLE_ENDIAN = this.littleEndian = !1, this.cancelFullscreen = this.requestFullscreen = "", this.fullscreenKeyboard = !1
            }, nge.Lib.Device = new nge.Lib.Device, nge.Lib.Device.whenReady = function(e, t, n) {
                var i = this._readyCheck;
                this.deviceReadyAt || !i ? e.call(t, this) : i._monitor || n ? (i._queue = i._queue || [], i._queue.push([e, t])) : (i._monitor = i.bind(this), i._queue = i._queue || [], i._queue.push([e, t]), e = void 0 !== window.cordova, t = navigator.isCocoonJS, "complete" === document.readyState || "interactive" === document.readyState ? window.setTimeout(i._monitor, 0) : e && !t ? document.addEventListener("deviceready", i._monitor, !1) : (document.addEventListener("DOMContentLoaded", i._monitor, !1), window.addEventListener("load", i._monitor, !1)))
            }, nge.Lib.Device._readyCheck = function() {
                var e = this._readyCheck;
                if (document.body) {
                    if (!this.deviceReadyAt) {
                        this.deviceReadyAt = Date.now(), document.removeEventListener("deviceready", e._monitor), document.removeEventListener("DOMContentLoaded", e._monitor), window.removeEventListener("load", e._monitor), this._initialize(), this.initialized = !0;
                        for (var t; t = e._queue.shift();) t[0].call(t[1], this);
                        this._initialize = this._readyCheck = null
                    }
                } else window.setTimeout(e._monitor, 20)
            }, nge.Lib.Device._initialize = function() {
                var t = this;
                ! function() {
                    var e = navigator.userAgent;
                    /Playstation Vita/.test(e) ? t.vita = !0 : /Kindle/.test(e) || /\bKF[A-Z][A-Z]+/.test(e) || /Silk.*Mobile Safari/.test(e) ? t.kindle = !0 : /Android/.test(e) ? t.android = !0 : /CrOS/.test(e) ? t.chromeOS = !0 : /iP[ao]d|iPhone/i.test(e) ? t.iOS = !0 : /Linux/.test(e) ? t.linux = !0 : /Mac OS/.test(e) ? t.macOS = !0 : /Windows/.test(e) && (t.windows = !0), (/Windows Phone/i.test(e) || /IEMobile/i.test(e)) && (t.android = !1, t.iOS = !1, t.macOS = !1, t.windows = !0, t.windowsPhone = !0);
                    var n = /Silk/.test(e);
                    (t.windows || t.macOS || t.linux && !n || t.chromeOS) && (t.desktop = !0), (t.windowsPhone || /Windows NT/i.test(e) && /Touch/i.test(e)) && (t.desktop = !1)
                }(),
                function() {
                    t.audioData = !!window.Audio, t.webAudio = !(!window.AudioContext && !window.webkitAudioContext);
                    var e = document.createElement("audio");
                    try {
                        e.canPlayType && (e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, "") && (t.ogg = !0), (e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, "") || e.canPlayType("audio/opus;").replace(/^no$/, "")) && (t.opus = !0), e.canPlayType("audio/mpeg;").replace(/^no$/, "") && (t.mp3 = !0), e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, "") && (t.wav = !0), (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;").replace(/^no$/, "")) && (t.m4a = !0), e.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "") && (t.webm = !0))
                    } catch (e) {}
                }(),
                function() {
                    var e = document.createElement("video");
                    try {
                        e.canPlayType && (e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, "") && (t.oggVideo = !0), e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, "") && (t.h264Video = !0, t.mp4Video = !0), e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "") && (t.webmVideo = !0), e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, "") && (t.vp9Video = !0), e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, "") && (t.hlsVideo = !0))
                    } catch (e) {}
                }(),
                function() {
                    var n = navigator.userAgent;
                    if (/Arora/.test(n) ? t.arora = !0 : /Chrome\/(\d+)/.test(n) && !t.windowsPhone ? (t.chrome = !0, t.chromeVersion = parseInt(RegExp.$1, 10)) : /Epiphany/.test(n) ? t.epiphany = !0 : /Firefox\D+(\d+)/.test(n) ? (t.firefox = !0, t.firefoxVersion = parseInt(RegExp.$1, 10)) : /AppleWebKit/.test(n) && t.iOS ? t.mobileSafari = !0 : /MSIE (\d+\.\d+);/.test(n) ? (t.ie = !0, t.ieVersion = parseInt(RegExp.$1, 10)) : /Midori/.test(n) ? t.midori = !0 : /Opera/.test(n) ? t.opera = !0 : /Safari/.test(n) && !t.windowsPhone ? t.safari = !0 : /Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(n) && (t.ie = !0, t.trident = !0, t.tridentVersion = parseInt(RegExp.$1, 10), t.ieVersion = parseInt(RegExp.$3, 10)), /Silk/.test(n) && (t.silk = !0), navigator.standalone && (t.webApp = !0), void 0 !== window.cordova && (t.cordova = !0), void 0 !== e && (t.node = !0), t.node && "object" == typeof e.versions && (t.nodeWebkit = !!e.versions["node-webkit"], t.electron = !!e.versions.electron), navigator.isCocoonJS && (t.cocoonJS = !0), t.cocoonJS) try {
                        t.cocoonJSApp = "undefined" != typeof CocoonJS
                    } catch (e) {
                        t.cocoonJSApp = !1
                    }
                    void 0 !== window.ejecta && (t.ejecta = !0), /Crosswalk/.test(n) && (t.crosswalk = !0)
                }(),
                function() {
                    var e = document.createElement("p"),
                        n = {
                            webkitTransform: "-webkit-transform",
                            OTransform: "-o-transform",
                            msTransform: "-ms-transform",
                            MozTransform: "-moz-transform",
                            transform: "transform"
                        };
                    for (var i in document.body.insertBefore(e, null), n)
                        if (void 0 !== e.style[i]) {
                            e.style[i] = "translate3d(1px,1px,1px)";
                            var o = window.getComputedStyle(e).getPropertyValue(n[i])
                        }
                    document.body.removeChild(e), t.css3D = void 0 !== o && 0 < o.length && "none" !== o
                }(), t.pixelRatio = window.devicePixelRatio || 1, t.iPhone = -1 != navigator.userAgent.toLowerCase().indexOf("iphone"), t.iPhone4 = 2 == t.pixelRatio && t.iPhone, t.iPhone5 = 2 === t.pixelRatio && t.iPhone && (320 === screen.availWidth && 568 === screen.availHeight || 568 === screen.availWidth && 320 === screen.availHeight), t.iPad = -1 != navigator.userAgent.toLowerCase().indexOf("ipad"), t.typedArray = "undefined" != typeof Int8Array, "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && "undefined" != typeof Uint32Array && (t.littleEndian = function() {
                        var e = new ArrayBuffer(4),
                            t = new Uint8Array(e);
                        return e = new Uint32Array(e), t[0] = 161, t[1] = 178, t[2] = 195, t[3] = 212, 3569595041 == e[0] || 2712847316 != e[0] && null
                    }(), t.LITTLE_ENDIAN = t.littleEndian), t.support32bit = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8ClampedArray && "undefined" != typeof Int32Array && null !== t.littleEndian && function() {
                        if (void 0 === Uint8ClampedArray) return !1;
                        var e = document.createElement("canvas").getContext("2d");
                        return !!e && e.createImageData(1, 1).data instanceof Uint8ClampedArray
                    }(), navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate, navigator.vibrate && (t.vibration = !0),
                    function() {
                        t.canvas = !!window.CanvasRenderingContext2D || t.cocoonJS;
                        try {
                            t.localStorage = !!localStorage.getItem
                        } catch (e) {
                            t.localStorage = !1
                        }
                        t.file = !!(window.File && window.FileReader && window.FileList && window.Blob), t.fileSystem = !!window.requestFileSystem;
                        try {
                            var e = document.createElement("canvas");
                            e.screencanvas = !1;
                            var n = !!window.WebGLRenderingContext && (e.getContext("webgl") || e.getContext("experimental-webgl"))
                        } catch (e) {
                            n = !1
                        }
                        t.webGL = n, t.webGL = !!t.webGL, t.worker = !!window.Worker, t.pointerLock = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document, t.quirksMode = "CSS1Compat" !== document.compatMode, navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia, window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL, t.getUserMedia = t.getUserMedia && !!navigator.getUserMedia && !!window.URL, t.firefox && 21 > t.firefoxVersion && (t.getUserMedia = !1), !t.iOS && (t.ie || t.firefox || t.chrome) && (t.canvasBitBltShift = !0), (t.safari || t.mobileSafari) && (t.canvasBitBltShift = !1)
                    }(),
                    function() {
                        for (var e = "requestFullscreen requestFullScreen webkitRequestFullscreen webkitRequestFullScreen msRequestFullscreen msRequestFullScreen mozRequestFullScreen mozRequestFullscreen".split(" "), n = document.createElement("div"), i = 0; i < e.length; i++)
                            if (n[e[i]]) {
                                t.fullscreen = !0, t.requestFullscreen = e[i];
                                break
                            }
                        if (e = "cancelFullScreen exitFullscreen webkitCancelFullScreen webkitExitFullscreen msCancelFullScreen msExitFullscreen mozCancelFullScreen mozExitFullscreen".split(" "), t.fullscreen)
                            for (i = 0; i < e.length; i++)
                                if (document[e[i]]) {
                                    t.cancelFullscreen = e[i];
                                    break
                                }
                        window.Element && Element.ALLOW_KEYBOARD_INPUT && (t.fullscreenKeyboard = !0)
                    }(), ("ontouchstart" in document.documentElement || window.navigator.maxTouchPoints && 1 <= window.navigator.maxTouchPoints) && (t.touch = !0), (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && (t.mspointer = !0), t.cocoonJS || ("onwheel" in window || t.ie && "WheelEvent" in window ? t.wheelEvent = "wheel" : "onmousewheel" in window ? t.wheelEvent = "mousewheel" : t.firefox && "MouseScrollEvent" in window && (t.wheelEvent = "DOMMouseScroll"))
            }, nge.Lib.Device.canPlayAudio = function(e) {
                return !!("mp3" === e && this.mp3 || "ogg" === e && (this.ogg || this.opus) || "m4a" === e && this.m4a || "opus" === e && this.opus || "wav" === e && this.wav || "webm" === e && this.webm)
            }, nge.Lib.Device.canPlayVideo = function(e) {
                return !!("webm" === e && (this.webmVideo || this.vp9Video) || "mp4" === e && (this.mp4Video || this.h264Video) || ("ogg" === e || "ogv" === e) && this.oggVideo || "mpeg" === e && this.hlsVideo)
            }, nge.Lib.Device.isConsoleOpen = function() {
                return !(!window.console || !window.console.firebug) || !(!window.console || (console.profile(), console.profileEnd(), console.clear && console.clear(), !console.profiles)) && 0 < console.profiles.length
            }, nge.Lib.Device.isAndroidStockBrowser = function() {
                var e = window.navigator.userAgent.match(/Android.*AppleWebKit\/([\d.]+)/);
                return e && 537 > e[1]
            }
        }).call(this, n(178))
    }, function(e, t) {
        function n() {
            throw Error("setTimeout has not been defined")
        }

        function i() {
            throw Error("clearTimeout has not been defined")
        }

        function o(e) {
            if (u === setTimeout) return setTimeout(e, 0);
            if ((u === n || !u) && setTimeout) return u = setTimeout, setTimeout(e, 0);
            try {
                return u(e, 0)
            } catch (t) {
                try {
                    return u.call(null, e, 0)
                } catch (t) {
                    return u.call(this, e, 0)
                }
            }
        }

        function s(e) {
            if (g === clearTimeout) return clearTimeout(e);
            if ((g === i || !g) && clearTimeout) return g = clearTimeout, clearTimeout(e);
            try {
                return g(e)
            } catch (t) {
                try {
                    return g.call(null, e)
                } catch (t) {
                    return g.call(this, e)
                }
            }
        }

        function a() {
            b && f && (b = !1, f.length ? p = f.concat(p) : m = -1, p.length && r())
        }

        function r() {
            if (!b) {
                var e = o(a);
                b = !0;
                for (var t = p.length; t;) {
                    for (f = p, p = []; ++m < t;) f && f[m].run();
                    m = -1, t = p.length
                }
                f = null, b = !1, s(e)
            }
        }

        function l(e, t) {
            this.fun = e, this.array = t
        }

        function c() {}
        e = e.exports = {};
        try {
            var u = "function" == typeof setTimeout ? setTimeout : n
        } catch (e) {
            u = n
        }
        try {
            var g = "function" == typeof clearTimeout ? clearTimeout : i
        } catch (e) {
            g = i
        }
        var f, p = [],
            b = !1,
            m = -1;
        e.nextTick = function(e) {
            var t = Array(arguments.length - 1);
            if (1 < arguments.length)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            p.push(new l(e, t)), 1 !== p.length || b || o(r)
        }, l.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, e.title = "browser", e.browser = !0, e.env = {}, e.argv = [], e.version = "", e.versions = {}, e.on = c, e.addListener = c, e.once = c, e.off = c, e.removeListener = c, e.removeAllListeners = c, e.emit = c, e.prependListener = c, e.prependOnceListener = c, e.listeners = function(e) {
            return []
        }, e.binding = function(e) {
            throw Error("process.binding is not supported")
        }, e.cwd = function() {
            return "/"
        }, e.chdir = function(e) {
            throw Error("process.chdir is not supported")
        }, e.umask = function() {
            return 0
        }
    }, function(e, t) {
        "undefined" == typeof nge && (nge = {}), nge.Lib || (nge.Lib = {}), nge.Lib.Helper = {
            typeCheck: function() {
                var e, t = {},
                    n = "String Number Boolean Array Object Function RegExp Date Error".split(" ");
                for (e = n.length; e--;) t["is" + n[e]] = function(e) {
                    return function(t) {
                        var n = Object.prototype.toString.call(t).slice(8, -1);
                        return null != t && n === e
                    }
                }(n[e]);
                return t
            }(),
            validate: function(e, t, n, i) {
                var o = nge.Lib.Helper.typeCheck,
                    s = function() {
                        i || console.error.apply(this, arguments)
                    };
                return t && !o.isString(t) || t && !o["is" + t] || void 0 !== i && !o.isBoolean(i) ? (s("validate call error, ", arguments), !1) : t && !o["is" + t](e) ? (s("Type error:", e, "is not a " + t), !1) : void 0 === n || e instanceof n || (s("Constructor error:", e, "is not a instance of", n), !1)
            },
            convertImgToBase64: function(e, t) {
                if (this.validate(e, !1, Image) && this.validate(t, "String")) {
                    var n = document.createElement("CANVAS"),
                        i = n.getContext("2d");
                    return n.height = e.height, n.width = e.width, i.drawImage(e, 0, 0), n.toDataURL(t)
                }
            },
            rowsToColumns: function(e) {
                var t, n = [];
                for (t in e) {
                    var i, o = e[t];
                    for (i in o) {
                        var s = o[i];
                        n[i] || (n[i] = []), n[i][t] = s
                    }
                }
                return n
            },
            arrayAllCombinations: function(e, t) {
                for (var n = [], i = e.length, o = Math.pow(2, i) - 1, s = 1; s <= o; s++) {
                    var a = nge.Lib.Helper.decbin(s);
                    a = nge.Lib.Helper.str_pad(a, i, "0", "STR_PAD_LEFT");
                    var r = nge.Lib.Helper.strrev(a);
                    a = [];
                    for (var l = 0; l < i; l++) a.push(r[l]);
                    for (var c in r = 0, l = [], a) 1 == +a[c] && l.push(e[r]), r++;
                    t && 1 < l.length ? n = nge.Lib.Helper.mergeArrs(n, nge.Lib.Helper.permute(l, !0)) : n.push(l)
                }
                return n
            },
            permute: function(e) {
                function t(e, t) {
                    var n, i = [];
                    for (n = e.length; 0 <= n; n--) i.push([].concat(e.slice(0, n), [t], e.slice(n, void 0)));
                    return i
                }
                var n, i = e.length,
                    o = [
                        [e[0]]
                    ];
                for (n = 1; n < i; n++) {
                    var s = e[n],
                        a = o;
                    o = [], a.forEach((function(e) {
                        o = o.concat(t(e, s))
                    }))
                }
                return o
            },
            decbin: function(e) {
                if (nge.Lib.Helper.validate(e, "Number")) return 0 > e && (e = 4294967295 + e + 1), parseInt(e, 10).toString(2)
            },
            strrev: function(e) {
                return (e = (e + "").replace(/(.)([\uDC00-\uDFFF\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065E\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1C24-\u1C37\u1DC0-\u1DE6\u1DFE\u1DFF\u20D0-\u20F0\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA926-\uA92D\uA947-\uA953\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uFB1E\uFE00-\uFE0F\uFE20-\uFE26]+)/g, "$2$1")).split("").reverse().join("")
            },
            str_pad: function(e, t, n, i) {
                var o = "",
                    s = function(e, t) {
                        for (var n = ""; n.length < t;) n += e;
                        return n.substr(0, t)
                    };
                return "STR_PAD_LEFT" !== i && "STR_PAD_RIGHT" !== i && "STR_PAD_BOTH" !== i && (i = "STR_PAD_RIGHT"), 0 < (o = t - e.length) && ("STR_PAD_LEFT" === i ? e = s(n, o) + e : "STR_PAD_RIGHT" === i ? e += s(n, o) : "STR_PAD_BOTH" === i && (e = ((o = s(n, Math.ceil(o / 2))) + e + o).substr(0, t))), e
            },
            LdgZero: function(e, t) {
                for (e += ""; e.length < t;) e = "0" + e;
                return e
            },
            extend: function(e, t) {
                var n = function() {};
                return n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e, e.superclass = t.prototype, !0
            },
            mergeObjs: function(e, t, n) {
                if (n)
                    for (var i in e) n[i] = e[i];
                else n = nge.Lib.Helper.jsObjClone(e);
                for (i in t) n[i] = t[i];
                return n
            },
            mergeObjsRecursive: function(e, t) {
                var n, i = nge.Lib.Helper.jsObjClone(e);
                for (n in t) i[n] = "object" == typeof t[n] && "object" == typeof e[n] ? nge.Lib.Helper.mergeObjsRecursive(e[n], t[n]) : t[n];
                return i
            },
            mergeArrs: function(e, t) {
                return e.concat(t.filter((function(t) {
                    return 0 > e.indexOf(t)
                })))
            },
            arraysUniqElements: function(e, t) {
                var n = {},
                    i = function(e) {
                        for (var t = 0; t < e.length; t++) n[e[t]] ? n[e[t]]++ : n[e[t]] = 1
                    };
                for (var o in i(e), i(t), e = [], n) 1 === n[o] && e.push(o);
                return e
            },
            numberEnd: function(e, t) {
                return t[4 < e % 100 && 20 > e % 100 ? 2 : [2, 0, 1, 1, 1, 2][Math.min(e % 10, 5)]]
            },
            urlExists: function(e) {
                var t = new XMLHttpRequest;
                return t.open("HEAD", e, !1), t.send(), 200 === t.status
            },
            recursiveSet: function(e, t, n) {
                "string" == typeof e && (e = e.split("."));
                var i = e.shift();
                return 0 < e.length ? (n[i] || (n[i] = {}), nge.Lib.Helper.recursiveSet(e, t, n[i])) : n[i] = t, !0
            },
            recursiveGet: function(e, t, n) {
                if (void 0 === t) return n;
                for (var i in "string" == typeof e && (e = e.split(".")), e) {
                    var o = e[i];
                    if (void 0 === t[o]) return n;
                    t = t[o]
                }
                return t
            },
            recursiveDelete: function(e, t) {
                "string" == typeof e && (e = e.split("."));
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    if (void 0 === t[i]) return !1;
                    n === e.length - 1 ? delete t[i] : t = t[i]
                }
                return !0
            },
            parseDate: function(e) {
                return (e = /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/.exec(e)) ? new Date(e[1], e[2] - 1, e[3], e[4], e[5], e[6]) : null
            },
            localizeDate: function(e) {
                var t = new Date;
                return e.setHours(e.getHours() - t.getTimezoneOffset() / 60), e
            },
            capitaliseFirstLetter: function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            },
            lowerFirstLetter: function(e) {
                return e.charAt(0).toLowerCase() + e.slice(1)
            },
            htmlDecode: function(e) {
                var t = document.createElement("div");
                return t.innerHTML = e, 0 === t.childNodes.length ? "" : t.childNodes[0].nodeValue
            },
            getRandomInt: function(e, t) {
                return Math.floor(Math.random() * (t - e + 1)) + e
            },
            intMakeBetween: function(e, t, n) {
                return Math.max.apply(Math, [t, Math.min.apply(Math, [n, e])])
            },
            getWindowName: function() {
                return window.location.hash.substring(1).split("?")[0]
            },
            getObjSize: function(e) {
                return Object.keys(e).length
            },
            parseGetParams: function(e) {
                var t = {},
                    n = window.location.href.substring(1).split("?");
                if (n[1]) {
                    n = n[1].split("&");
                    for (var i = 0; i < n.length; i++) {
                        var o = n[i].split("=");
                        t[o[0]] = void 0 === o[1] ? "" : o[1]
                    }
                }
                return e ? t[e] : t
            },
            strReplace: function(e, t, n) {
                return n.split(e).join(t)
            },
            sleep: function(e) {
                for (e += (new Date).getTime(); new Date < e;);
                return !0
            },
            jsObjClone: function(e, t) {
                if (!e || "object" != typeof e) return e;
                void 0 === t && (t = 999);
                var n, i = "function" == typeof e.pop ? [] : {};
                if (e.hasOwnProperty)
                    for (n in e)
                        if (e.hasOwnProperty(n)) {
                            var o = e[n];
                            i[n] = "imageSrc" === n ? o : o && "object" == typeof o ? t ? nge.Lib.Helper.jsObjClone(o, t - 1) : "[object Object]" : o
                        }
                return i
            },
            setCookie: function(e, t, n) {
                void 0 === n && (n = 360);
                var i = new Date;
                return i.setDate(i.getDate() + n), t = escape(t) + (n ? "; expires=" + i.toUTCString() : ""), document.cookie = e + "=" + t, !0
            },
            getCookie: function(e) {
                return (e = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))) ? decodeURIComponent(e[1]) : void 0
            },
            deleteCookie: function(e, t, n) {
                return this.getCookie(e) && (document.cookie = e + "=" + (t ? ";path=" + t : "") + (n ? ";domain=" + n : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"), !0
            },
            browserDetect: function() {
                var e = navigator.userAgent;
                if (nge.Lib.Device.iOS && -1 !== navigator.userAgent.indexOf("CriOS")) return "Chrome";
                var t = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if (/trident/i.test(t[1])) {
                    var n = /\brv[ :]+(\d+)/g.exec(e) || [];
                    return "IE " + (n[1] || "")
                }
                return "Chrome" === t[1] && null !== (n = e.match(/\b(OPR|Edge)\/(\d+)/)) ? n.slice(1).join(" ").replace("OPR", "Opera") : (t = t[2] ? [t[1], t[2]] : [navigator.appName, navigator.appVersion, "-?"], null !== (n = e.match(/version\/(\d+)/i)) && t.splice(1, 1, n[1]), t[0])
            },
            osDetect: function() {
                var e = "Unknown OS";
                return -1 !== navigator.appVersion.indexOf("Win") && (e = "Windows"), -1 !== navigator.appVersion.indexOf("Mac") && (e = "MacOS"), -1 !== navigator.appVersion.indexOf("X11") && (e = "UNIX"), -1 !== navigator.appVersion.indexOf("Linux") && (e = "Linux"), e
            },
            getOsAndVersion: function() {
                var e, t = navigator.appVersion,
                    n = navigator.userAgent,
                    i = "-",
                    o = [{
                        s: "Windows 10",
                        r: /(Windows 10.0|Windows NT 10.0)/
                    }, {
                        s: "Windows 8.1",
                        r: /(Windows 8.1|Windows NT 6.3)/
                    }, {
                        s: "Windows 8",
                        r: /(Windows 8|Windows NT 6.2)/
                    }, {
                        s: "Windows 7",
                        r: /(Windows 7|Windows NT 6.1)/
                    }, {
                        s: "Windows Vista",
                        r: /Windows NT 6.0/
                    }, {
                        s: "Windows Server 2003",
                        r: /Windows NT 5.2/
                    }, {
                        s: "Windows XP",
                        r: /(Windows NT 5.1|Windows XP)/
                    }, {
                        s: "Windows 2000",
                        r: /(Windows NT 5.0|Windows 2000)/
                    }, {
                        s: "Windows ME",
                        r: /(Win 9x 4.90|Windows ME)/
                    }, {
                        s: "Windows 98",
                        r: /(Windows 98|Win98)/
                    }, {
                        s: "Windows 95",
                        r: /(Windows 95|Win95|Windows_95)/
                    }, {
                        s: "Windows NT 4.0",
                        r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
                    }, {
                        s: "Windows CE",
                        r: /Windows CE/
                    }, {
                        s: "Windows 3.11",
                        r: /Win16/
                    }, {
                        s: "Android",
                        r: /Android/
                    }, {
                        s: "Open BSD",
                        r: /OpenBSD/
                    }, {
                        s: "Sun OS",
                        r: /SunOS/
                    }, {
                        s: "Linux",
                        r: /(Linux|X11)/
                    }, {
                        s: "iOS",
                        r: /(iPhone|iPad|iPod)/
                    }, {
                        s: "Mac OS X",
                        r: /Mac OS X/
                    }, {
                        s: "Mac OS",
                        r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
                    }, {
                        s: "QNX",
                        r: /QNX/
                    }, {
                        s: "UNIX",
                        r: /UNIX/
                    }, {
                        s: "BeOS",
                        r: /BeOS/
                    }, {
                        s: "OS/2",
                        r: /OS\/2/
                    }, {
                        s: "Search Bot",
                        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
                    }];
                for (e in o) {
                    var s = o[e];
                    if (s.r.test(n)) {
                        i = s.s;
                        break
                    }
                }
                switch (o = "-", /Windows/.test(i) && (o = /Windows (.*)/.exec(i)[1], i = "Windows"), i) {
                    case "Mac OS X":
                        o = /Mac OS X (1[\.\_\d]+)/.exec(n)[1];
                        break;
                    case "Android":
                        o = /Android ([\.\_\d]+)/.exec(n)[1];
                        break;
                    case "iOS":
                        o = (o = /OS (\d+)_(\d+)_?(\d+)?/.exec(t))[1] + "." + o[2] + "." + (0 | o[3])
                }
                return {
                    os: i,
                    version: o
                }
            },
            occur: function(e, t) {
                t = "#" + t + "#";
                for (var n = (e = "#" + e.join("#,#") + "#").indexOf(t), i = 0; - 1 !== n; i++) n = e.indexOf(t, n + t.length);
                return i
            },
            hexToRgb: function(e) {
                return (e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)) ? {
                    r: parseInt(e[1], 16),
                    g: parseInt(e[2], 16),
                    b: parseInt(e[3], 16)
                } : {
                    r: 0,
                    g: 0,
                    b: 0
                }
            },
            createPng: function(e, t, n, i, o, s, a) {
                function r(e) {
                    return 1 === (e = e.toString(16)).length ? "0" + e : e
                }
                var l = document.createElement("canvas");
                l.height = t, l.width = e;
                var c = l.getContext("2d");
                return n = function(e, t, n) {
                    return "#" + r(e) + r(t) + r(n)
                }(n, i, o), c.globalAlpha = parseInt(s) % 256 / 256, c.fillStyle = n, c.fillRect(0, 0, e, t), c.stroke(), e = function(e, t) {
                    return 0 < (e = l.toDataURL(t)).indexOf(t) && e
                }("png", "image/png"), a ? e : ((a = new Image).src = e, a)
            },
            create1PxPng: function(e, t, n, i, o) {
                return nge.Lib.Helper.createPng(1, 1, e, t, n, i, o)
            },
            getLengthBy2Points: function(e, t) {
                return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
            },
            getAngleBy3Points: function(e, t, n) {
                var i = 0,
                    o = nge.Lib.Helper.getLengthBy2Points(e, n);
                return e = nge.Lib.Helper.getLengthBy2Points(e, t), t = nge.Lib.Helper.getLengthBy2Points(t, n), 0 !== e && 0 !== t && (i = Math.acos((e * e + t * t - o * o) / (2 * e * t))), i
            },
            _arFactor: Math.PI / 180,
            get_radian: function(e) {
                return e * nge.Lib.Helper._arFactor
            },
            get_angle: function(e) {
                return e / nge.Lib.Helper._arFactor
            },
            objectApply: function(e, t, n) {
                if (void 0 === n && (n = 999), !n) return e;
                for (var i in t) {
                    var o = t[i];
                    e[i] ? "array" == typeof o || "object" == typeof o ? e[i] = nge.Lib.Helper.objectApply(e[i], t[i], n - 1) : t[i] !== e[i] && (e[i] = o) : e[i] = o
                }
                return e
            },
            chkDeepEqual: function(e, t) {
                return JSON.stringify(e) === JSON.stringify(t)
            },
            chkEqual: function(e, t) {
                var n = function(e) {
                    var t = {},
                        i = Object.keys(e);
                    for (var o in i.sort(), i)
                        if (i.hasOwnProperty(o)) {
                            var s = i[o],
                                a = e[s];
                            "object" == typeof e[s] && (a = n(a)), t[s] = a
                        }
                    return t
                };
                return e = n(e), t = n(t), nge.Lib.Helper.chkDeepEqual(e, t)
            },
            chkArraysPartialEntry: function(e, t) {
                if (!e || !t) return !1;
                e = e.sort();
                for (var n = (t = t.sort()).length - 1, i = e.length - 1; 0 <= i; i--)
                    if (JSON.stringify(e[i]) === JSON.stringify(t[n]) && n--, -1 === n) return !0;
                return !1
            },
            encodeQueryData: function(e) {
                var t, n = [];
                for (t in e) n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
                return n.join("&")
            },
            mobileCheck: function() {
                var e = !1,
                    t = navigator.userAgent || navigator.vendor || window.opera;
                return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
            },
            mobileAndTabletCheck: function() {
                var e = !1,
                    t = navigator.userAgent || navigator.vendor || window.opera;
                return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
            },
            varOrArrOfVarsChk: function(e, t) {
                if ("[object Array]" === Object.prototype.toString.call(e)) {
                    for (var n = 0; n < e.length; n++) t(e[n]);
                    return !1
                }
                return t(e), !0
            },
            logicBlocksDo: function() {
                var e = Array.prototype.slice.call(arguments),
                    t = e.shift(),
                    n = e.shift();
                if (!t._logicBlocksInstances)
                    for (var i in t._logicBlocksInstances = {}, t._logicBlocks) {
                        var o = t._logicBlocks[i],
                            s = nge.Lib.Helper.capitaliseFirstLetter(o);
                        t._logicBlocksInstances[o] = t.getInstance(s)
                    }
                for (o in i = [], t._logicBlocksInstances) t._logicBlocksInstances[o][n] && (s = t._logicBlocksInstances[o][n].apply(this, e), i.push(s));
                return i
            },
            objFind: function(e, t) {
                for (var n in e)
                    if (t(e[n], n, e)) return n;
                return !1
            },
            objFindEl: function(e, t) {
                if (t = nge.Lib.Helper.objFind(e, t)) return e[t]
            },
            customRecursiveFind: function(e, t, n, i, o, s, a) {
                var r;
                s || (r = []);
                var l = -1 === e.indexOf("."),
                    c = function(e) {
                        return e.filter((function(e) {
                            return null != e
                        }))
                    },
                    u = function(i, g) {
                        var f;
                        for (f = 0; f < i.length; f++) {
                            var p = i[f],
                                b = l ? p[e] : nge.Lib.Helper.recursiveGet(e, p);
                            if (b === t || o && void 0 !== b && b && -1 !== b.indexOf(t)) {
                                if (a && (i.splice(f, 1), f--), s) return p;
                                r.push(p)
                            }
                            if (p[n] && 0 < p[n].length && (b = u(p[n], g)) && (a && (p[n] = c(p[n])), s)) return b
                        }
                        return !1
                    };
                return u([i], t) || !s && r
            },
            checkSuffix: function(e, t) {
                return !(!(e = e.match(t + "$")) || !e[0]) && e[0] === t
            },
            getSuffix: function(e) {
                return 1 < (e = e.split("_")).length && e[e.length - 1]
            },
            objectDelete: function(e, t) {
                return t && (e.destroy(!0), e.game = !1), null
            },
            waitForWebfonts: function(e, t) {
                for (var n = function(e) {
                        var t = $.Deferred(),
                            n = document.createElement("span");
                        n.innerHTML = "giItT1WQy@!-/#", n.style.position = "absolute", n.style.left = "-10000px", n.style.top = "-10000px", n.style.fontSize = "300px", n.style.fontFamily = "sans-serif", n.style.fontVariant = "normal", n.style.fontStyle = "normal", n.style.fontWeight = "normal", n.style.letterSpacing = "0", document.body.appendChild(n);
                        var i = n.offsetWidth;
                        return n.style.fontFamily = e, nge.Lib.Checker.delay((function() {
                            return !n || n.offsetWidth !== i && (n.parentNode.removeChild(n), n = null, !0)
                        }), (function() {
                            t.resolve(e)
                        }), 500, 20, !0), t
                    }, i = [], o = 0; o < e.length; o++) i.push(n(e[o]));
                $.when.apply($, i).then((function() {
                    t()
                }))
            },
            isFontAvailable: function() {
                var e = function() {
                    var e, t = document.body,
                        n = document.createElement("span");
                    n.innerHTML = Array(100).join("wi"), n.style.cssText = ["position:absolute", "width:auto", "font-size:128px", "left:-99999px"].join(" !important;");
                    var i = function(i) {
                            return n.style.fontFamily = i, t.appendChild(n), e = n.clientWidth, t.removeChild(n), e
                        },
                        o = i("monospace"),
                        s = i("serif"),
                        a = i("sans-serif"),
                        r = [];
                    return function(e) {
                        if (-1 !== r.indexOf(e)) return !0;
                        var t = o !== i(e + ",monospace") || a !== i(e + ",sans-serif") || s !== i(e + ",serif");
                        return t && r.push(e), t
                    }
                };
                if (document.body) return e();
                document.addEventListener("DOMContentLoaded", (function() {
                    nge.Lib.Helper.isFontAvailable = e()
                }))
            }(),
            loadJsCssFile: function(e, t, n) {
                if ("js" === t) {
                    var i = document.createElement("script");
                    i.setAttribute("type", "text/javascript"), i.setAttribute("src", e)
                } else "css" === t && ((i = document.createElement("link")).setAttribute("rel", "stylesheet"), i.setAttribute("type", "text/css"), i.setAttribute("href", e));
                i && n && (i.onload = i.onreadystatechange = n), void 0 !== i && document.getElementsByTagName("head")[0].appendChild(i)
            },
            getMaxZIndex: function() {
                return Math.max.apply(null, $.map($("body *"), (function(e, t) {
                    if ("static" !== $(e).css("position")) return parseInt($(e).css("z-index")) || 1
                })))
            },
            makeReactive: function(e, t, n) {
                for (var i = e, o = Object.getOwnPropertyDescriptor(i, t); !o && i.__proto__;) {
                    i = i.__proto__;
                    var s = Object.getOwnPropertyDescriptor(i, t);
                    s && (s.value || s.set || s.get) && (o = s)
                }
                if (!o) return !1;
                if (void 0 !== o.value) {
                    var a = o.value;
                    o.get = function() {
                        return a
                    }, o.set = function(e) {
                        a = e
                    }, delete o.value, delete o.writable
                }
                var r = o.set;
                return o.set = function(t) {
                    r && r.call(e, t), n.call(e, t)
                }, Object.defineProperty(e, t, o), !0
            },
            isNumeric: function(e) {
                return !(!e.match(/^-{0,1}\d+$/) && !e.match(/^-{0,1}\d+\.\d+$/))
            },
            isTextJson: function(e) {
                try {
                    JSON.parse(e)
                } catch (e) {
                    return !1
                }
                return !0
            },
            isBase64: function(e) {
                if ("" === e || "" === e.trim()) return !1;
                if (0 === e.indexOf("data:image")) return !0;
                try {
                    return btoa(atob(e)) === e
                } catch (e) {
                    return !1
                }
            },
            getCallsStack: function() {
                try {
                    throw Error()
                } catch (o) {
                    for (var e, t = o.stack.match(/(\w+)@|at ([.\w]+) \(/g), n = [], i = 0; i < t.length; i++) e = t[i].match(/(\w+)@|at ([.\w]+) \(/), n[i] = e[1] || e[2];
                    return n
                }
            }
        }
    }, function(e, t) {
        nge.Lib.I18n = function(e) {
            var t = {},
                n = !1,
                i = !1;
            this.get = function(e, n) {
                return e = t[e] || e, a(e, n)
            }, this.applyTextParams = function(e, t) {
                return a(e, t)
            }, this.setStorage = function(e) {
                t = nge.Lib.Helper.mergeObjs(t, e)
            }, this.update = function(e) {
                o(e)
            };
            var o = function(e) {
                    if (e || (e = nge.Cfg.Main.project), nge.Cfg.Main.lang === n && i === e) return !1;
                    s(nge.appPath + "/i18n/" + nge.Cfg.Main.lang + ".json?gameVersion=" + gameVersion, (function() {
                        nge.observer.fire("i18n.update")
                    })), n = nge.Cfg.Main.lang, i = nge.Cfg.Main.project
                },
                s = function(e, t) {
                    $.getJSON(nge.realPathPrefix + e, (function(e) {
                        nge.i18n.setStorage(e), t && t()
                    }))
                },
                a = function(e, t) {
                    for (var n in t) e = nge.Lib.Helper.strReplace("%(" + n + ")s", t[n], e);
                    return e
                };
            ! function(e) {
                s(nge.appPath + "/i18n/" + nge.Cfg.Main.langDefault + ".json?gameVersion=" + gameVersion, (function() {
                    o(e)
                }))
            }(e)
        }
    }, function(e, t) {
        nge.Lib.Keyboard = Class.extend((function() {
            var e = [],
                t = {
                    1: {
                        key: 49
                    },
                    2: {
                        key: 50
                    },
                    3: {
                        key: 51
                    },
                    CTRL: {
                        key: 17
                    },
                    SHIFT: {
                        key: 16
                    },
                    ALT: {
                        key: 18
                    },
                    C: {
                        key: 67
                    },
                    D: {
                        key: 68
                    },
                    M: {
                        key: 77
                    },
                    N: {
                        key: 78
                    },
                    O: {
                        key: 79
                    },
                    P: {
                        key: 80
                    },
                    Q: {
                        key: 81
                    },
                    S: {
                        key: 83
                    },
                    SPACE: {
                        key: 32
                    }
                };
            this.constructor = function() {
                n("keydown", i), n("keyup", o)
            }, this.check = function(t) {
                return -1 !== e.indexOf(t)
            };
            var n = function(e, n) {
                    $(document)[e]((function(e) {
                        var i = nge.Lib.Helper.objFind(t, (function(t) {
                            return t.key === e.which
                        }));
                        i && (n(i), i = nge.Lib.Helper.browserDetect(), nge.game.scale.isFullScreen && -1 !== i.indexOf("Safari") && -1 === i.indexOf("Chrome") && e.preventDefault())
                    }))
                },
                i = function(t) {
                    return -1 === e.indexOf(t) && (e.push(t), nge.observer.fire("keyboard.KeyDown", t), nge.observer.fire("keyboard.KeyDown." + t)), !0
                },
                o = function(t) {
                    return -1 !== (t = e.indexOf(t)) && e.splice(t, 1), !0
                }
        }))
    }, function(e, t) {
        nge.Lib.Math = {
            linear: function(e, t, n) {
                return (t - e) * n + e
            },
            floatRound: function(e) {
                return Math.ceil(1e4 * e) / 1e4
            },
            valBetween: function(e, t, n) {
                return e < t ? t : e > n ? n : e
            },
            bezier: function(e, t, n, i, o) {
                return {
                    onComplete: new nge.Lib.Signal,
                    onUpdate: new nge.Lib.Signal,
                    target: e,
                    time: t,
                    p1: n,
                    p2: i,
                    p3: o,
                    running: !1,
                    _at: function(e) {
                        return {
                            x: Math.pow(1 - e, 2) * this.p1.x + 2 * (1 - e) * e * this.p2.x + Math.pow(e, 2) * this.p3.x,
                            y: Math.pow(1 - e, 2) * this.p1.y + 2 * (1 - e) * e * this.p2.y + Math.pow(e, 2) * this.p3.y
                        }
                    },
                    _moveTo: function(e) {
                        this.target.position = this._at(e), this.onUpdate.dispatch(this._at(e))
                    },
                    start: function() {
                        if (this.running || !this.target) return !1;
                        this.current = 0, this.running = !0
                    },
                    stop: function() {
                        this.running = !1, this.onComplete.dispatch()
                    },
                    update: function(e) {
                        this.running && (this.current = nge.Lib.Math.clamp(this.current + e, 0, this.time), this._moveTo(this.current / this.time), this.current >= this.time && this.stop())
                    }
                }
            },
            interpolateColor: function(e, t, n) {
                return e === t ? e : (e = nge.Lib.Math.getRGB(e), t = nge.Lib.Math.getRGB(t), 16777215 + nge.Lib.Math.getColor32(255, (t.red - e.red) * n + e.red, (t.green - e.green) * n + e.green, (t.blue - e.blue) * n + e.blue))
            },
            clamp: function(e, t, n) {
                return Math.max(t, Math.min(n, e))
            },
            clampBottom: function(e, t) {
                return Math.max(t, e)
            },
            getRGB: function(e) {
                return 16777215 < e ? {
                    alpha: e >>> 24,
                    red: e >> 16 & 255,
                    green: e >> 8 & 255,
                    blue: 255 & e,
                    a: e >>> 24,
                    r: e >> 16 & 255,
                    g: e >> 8 & 255,
                    b: 255 & e
                } : {
                    alpha: 255,
                    red: e >> 16 & 255,
                    green: e >> 8 & 255,
                    blue: 255 & e,
                    a: 255,
                    r: e >> 16 & 255,
                    g: e >> 8 & 255,
                    b: 255 & e
                }
            },
            getColor32: function(e, t, n, i) {
                return e << 24 | t << 16 | n << 8 | i
            }
        }
    }, function(e, t) {
        var n;
        nge.Lib.ModesManager = (n = {}, function(e, t) {
            var i = nge.Lib.Random.uuid4(),
                o = !1,
                s = Class.extend((function() {
                    this.constructor = function() {
                        for (var s = t ? nge.App.getPath(e, !1, !0) : Class, a = 0; a < n[e].length; a++) n[e][a].uid !== i && (s = s.extend(n[e][a].f));
                        s = s.extend(o), this.__proto__ = new s
                    }
                }));
            return {
                extend: function(t) {
                    return n[e] || (n[e] = []), n[e].push({
                        uid: i,
                        f: t
                    }), o = t, s
                }
            }
        })
    }, function(e, t) {
        nge.Lib.Money = {
            toCoins: function(e) {
                var t = nge.localData.get("coins.value");
                return nge.Lib.Math.floatRound(parseFloat((e / t).toFixed(2)))
            },
            toCoinsInt: function(e) {
                return Math.floor(this.toCoins(e))
            },
            fromCoins: function(e) {
                var t = nge.localData.get("coins.value");
                return nge.Lib.Math.floatRound(parseFloat((e * t).toFixed(2)))
            },
            getCoinsWin: function(e) {
                var t = nge.localData.get("bet.value");
                return this.toCoins(e) / t
            },
            getSign: function(e) {
                return {
                    FUN: "F",
                    USD: "$",
                    EUR: "€",
                    RUB: "₽",
                    UAH: "₴"
                }[e]
            }
        }
    }, function(e, t) {
        nge.Lib.Mouse = Class.extend((function() {
            var e = this,
                t = {
                    1: !1,
                    2: !1,
                    3: !1
                };
            this.constructor = function() {
                e.subscribe()
            }, this.check = function(e) {
                return t[e]
            };
            var n = function(e, t) {
                    $(document)[e]((function(e) {
                        t(e.which)
                    }))
                },
                i = function(e) {
                    t[e] = !0, nge.observer.fire("mouse.buttonDown", e), nge.observer.fire("mouse.buttonDown." + e)
                },
                o = function(n) {
                    e.check(n) && (t[n] = !1, nge.observer.fire("mouse.buttonUp", n), nge.observer.fire("mouse.buttonUp." + n))
                };
            this.subscribe = function() {
                n("mousedown", i), n("mouseup", o)
            }
        }))
    }, function(e, t) {
        nge.Lib.Observer = function() {
            var e = {},
                t = {},
                n = !1,
                i = [],
                o = [],
                s = [],
                a = "";
            this.add = function(i, s, r, l) {
                return "object" == typeof i && (i = (l = i).eventName, s = l.callback, r = l.name, l = l.global), n ? (o.push([i, s, r, l]), !1) : (l || (i += "_@" + a), r ? (void 0 === t[i] && (t[i] = {}), t[i][r] = s) : (void 0 === e[i] && (e[i] = []), e[i].push(s)), !0)
            }, this.remove = function(n, i, s, r) {
                "object" == typeof n && (n = (r = n).eventName, i = r.callback, s = r.name, r = r.global);
                var l, c = [];
                for (l in o) {
                    var u = o[l];
                    n === u[0] && s === u[2] && r === u[3] && (s || u[2] || i.toString() === u[1].toString()) || c.push(u)
                }
                if (o = c, r || (n += "_@" + a), s) {
                    if (void 0 === t[n] || void 0 === t[n][s]) return !1;
                    t[n][s] = void 0, delete t[n][s], 0 === nge.Lib.Helper.getObjSize(t[n]) && delete t[n]
                } else {
                    if (void 0 === e[n]) return !1; - 1 !== (i = e[n].indexOf(i)) && e[n].splice(i, 1), 0 === nge.Lib.Helper.getObjSize(e[n]) && delete e[n]
                }
                return !0
            }, this.removeByPrefix = function(n) {
                var i = "_@" + n;
                return (n = function(e) {
                    for (var t in e) - 1 !== t.indexOf(i) && delete e[t]
                })(t), n(e), !0
            }, this.clear = function() {
                return e = {}, t = {}, n = !1, i = [], o = [], s = [], !0
            }, this.clearEventsQueue = function() {
                0 < s.length && console.warn("Lib.Observer _eventsQueue was not empty"), s = [], n = !1
            }, this.setPrefix = function(e) {
                a = e
            }, this.Model = function(e) {
                return e || (e = {}), {
                    eventName: nge.Lib.Helper.recursiveGet("eventName", e, !1),
                    params: nge.Lib.Helper.recursiveGet("params", e, void 0),
                    delay: nge.Lib.Helper.recursiveGet("delay", e, 0),
                    _callee: nge.Lib.Helper.recursiveGet("_callee", e, void 0)
                }
            }, this.fire = function(r, l, c) {
                var u = {};
                if (u = "object" == typeof r ? r : this.Model({
                        eventName: r,
                        params: l,
                        delay: c
                    }), !r) return console.error("nge.Lib.Observer error: no eventName. Check your code"), !1;
                if (this.debugPreFire(u, arguments), c) return nge.rafSetTimeout((function() {
                    nge.observer.fire(u)
                }), c), !0;
                if (c = 0, n) return s.push(u), !1;
                this.debugFire(u), n = !0, i.push(u.eventName);
                var g = "_@" + a,
                    f = function(e, t) {
                        if (void 0 !== e[t.eventName])
                            for (var n in e[t.eventName])(0, e[t.eventName][n])(t.params, t)
                    };
                f(e, u), f(t, u);
                var p = this.Model(u);
                if (p.eventName += g, f(e, p), f(t, p), i.pop(), 0 === i.length) {
                    for (var b in n = !1, g = o) f = g[b], this.add(f[0], f[1], f[2], f[3]);
                    o = [], 0 < s.length && (b = s.shift(), this.fire(b))
                }
                return !0
            }, this.debugPreFire = function(e) {}, this.debugFire = function(e) {}
        }
    }, function(e, t) {
        nge.Lib.RafSetTimeout = function() {
            var e = {};
            this.init = function() {
                nge.observer.add("StatesManager.update.start", t, !1, !0)
            }, this.status = function() {
                log(e)
            }, this.add = function(t, n) {
                var i = (n = nge.Lib.Time.get() + n / nge.statesManager.getTimeScale()) + "_" + nge.Lib.Helper.getRandomInt(0, 99999);
                return e[i] = {
                    callTime: n,
                    callback: t
                }, i
            }, this.clear = function(t) {
                return !!e[t] && (delete e[t], !0)
            };
            var t = function() {
                var t, n = nge.Lib.Time.get(),
                    i = {},
                    o = 0;
                for (t in e) {
                    var s = e[t];
                    s.callTime <= n && (i[1e3 * s.callTime + o] = s.callback, e[t] = null, delete e[t]), o++
                }
                for (n = Object.keys(i).sort(), o = 0; o < n.length; o++) i[n[o]]();
                return !0
            }
        }
    }, function(e, t) {
        nge.Lib.Random = {
            generate: function(e) {
                return ~~(Math.random() * (e + 1))
            },
            generate_range: function(e, t) {
                return Math.round(Math.random() * (t - e) + e)
            },
            generate_one_f_fluctuation: function() {
                var e = Math.random();
                return .5 > e ? e + 2 * e * e : e - 2 * (1 - e) * (1 - e)
            },
            findAverage: function(e) {
                for (var t = 0, n = 0; n < e.length; n++) t += e[n];
                return t / e.length
            },
            findVariance: function(e) {
                for (var t = this.findAverage(e), n = 0, i = 0; i < e.length; i++) n += Math.pow(e[i] - t, 2);
                return n / e.length
            },
            findStandardDeviation: function(e) {
                return e = this.findVariance(e), Math.sqrt(e)
            },
            frac: function() {
                return Math.random()
            },
            testGenerate: function(e, t) {
                var n = 0;
                console.log("Testing RNG Generation. Range: " + e + " Iteration: " + t);
                for (var i = 0; i <= t; i++) {
                    var o = this.generate(e);
                    console.log("#" + i, o), o === e && (console.log("Max value " + e), n++)
                }
                console.log("Max Value Count : " + n)
            },
            uuid4: function() {
                var e, t = "";
                for (e = 0; 32 > e; e += 1) switch (e) {
                    case 8:
                    case 20:
                        t += "-", t += (16 * Math.random() | 0).toString(16);
                        break;
                    case 12:
                        t += "-", t += "4";
                        break;
                    case 16:
                        t += "-", t += (4 * Math.random() | 8).toString(16);
                        break;
                    default:
                        t += (16 * Math.random() | 0).toString(16)
                }
                return t
            },
            get: function(e, t) {
                return void 0 === t ? this.generate(e) : this.generate_range(e, t)
            }
        }
    }, function(e, t) {
        nge.Lib.SelfCheckTools = {
            _len: 0,
            _windowKeys: [],
            saveState: function() {
                for (var e in this._len = nge.Lib.Helper.getObjSize(window), window) this._windowKeys.push(e);
                return !0
            },
            addReserved: function(e) {
                this._windowKeys = this._windowKeys.concat(e)
            },
            changesCallback: function(e, t, n) {
                console.log(t + " ~~ " + n), console.log("---" + e, window[e])
            },
            showChanges: function(e) {
                for (var t in e || (e = this.changesCallback), window) - 1 === this._windowKeys.indexOf(t) && e(t, this._len, nge.Lib.Helper.getObjSize(window));
                return !0
            },
            deepDiffMapper: {
                VALUE_CREATED: "created",
                VALUE_UPDATED: "updated",
                VALUE_DELETED: "deleted",
                VALUE_UNCHANGED: "unchanged",
                map: function(e, t, n, i) {
                    if (void 0 === n && (n = 999), this.isFunction(e) || this.isFunction(t)) throw "Invalid argument. Function given, object expected.";
                    if (this.isValue(e) || this.isValue(t)) return {
                        type: this.compareValues(e, t),
                        data: void 0 === e ? t : e,
                        v1: e,
                        v2: t
                    };
                    var o, s = {};
                    for (o in e)
                        if (!this.isFunction(e[o])) {
                            var a = void 0;
                            void 0 !== t[o] && (a = n ? t[o] : "object");
                            var r = n ? e[o] : "object";
                            r = this.map(r, a, n - 1, i), s[o] = r
                        }
                    for (o in t) this.isFunction(t[o]) || void 0 !== s[o] || (r = n ? t[o] : "object", r = this.map(void 0, r, n - 1, i), s[o] = r);
                    return i && this.removeUnchanged(s), s
                },
                removeUnchanged: function(e) {
                    for (var t in e)(e[t] && e[t].type === this.VALUE_UNCHANGED || e[t] && "object" == typeof e[t] && 0 === nge.Lib.Helper.getObjSize(e[t])) && delete e[t]
                },
                compareValues: function(e, t) {
                    return e === t || this.isDate(e) && this.isDate(t) && e.getTime() === t.getTime() ? this.VALUE_UNCHANGED : void 0 === e ? this.VALUE_CREATED : void 0 === t ? this.VALUE_DELETED : this.VALUE_UPDATED
                },
                isFunction: function(e) {
                    return "[object Function]" === {}.toString.apply(e)
                },
                isArray: function(e) {
                    return "[object Array]" === {}.toString.apply(e)
                },
                isDate: function(e) {
                    return "[object Date]" === {}.toString.apply(e)
                },
                isObject: function(e) {
                    return "[object Object]" === {}.toString.apply(e)
                },
                isHTMLObject: function(e) {
                    return "[object HTMLImageElement]" === {}.toString.apply(e)
                },
                isValue: function(e) {
                    return !this.isObject(e) && !this.isArray(e) && !this.isHTMLObject(e)
                }
            },
            getNodeTree: function(e) {
                if (e.hasChildNodes())
                    for (var t = [], n = 0; n < e.childNodes.length; n++) t.push(this.getNodeTree(e.childNodes[n]));
                if (e.attributes && 0 < e.attributes.length) {
                    n = 0;
                    for (var i = e.attributes, o = i.length, s = {}; n < o; n++) s[i[n].nodeName] = i[n].nodeValue
                }
                return {
                    nodeName: e.nodeName || "",
                    parentName: e.parentNode.nodeName || "",
                    children: t || "",
                    content: e.innerText || "",
                    attributes: s || ""
                }
            }
        }, nge.Lib.SelfCheckTools.saveState()
    }, function(e, t) {
        window.Phaser && window.Phaser.Signal ? nge.Lib.Signal = window.Phaser.Signal : ((e = function() {
            this.listeners = []
        }).prototype.addOnce = function(e, t, n, i, o) {
            this.listeners.push({
                callback: e.bind(t || this),
                context: t || this,
                priority: n || 0,
                args: i || i,
                once: !0,
                name: o || !1
            }), this.listeners.sort((function(e, t) {
                return e.priority > t.priority
            }))
        }, e.prototype.add = function(e, t, n, i, o) {
            this.listeners.push({
                callback: e.bind(t || this),
                context: t || this,
                priority: n || 0,
                args: i || i,
                once: !1,
                name: o || !1
            }), this.listeners.sort((function(e, t) {
                return e.priority > t.priority
            }))
        }, e.prototype.dispatch = function(e) {
            for (var t = [], n = 0; n < arguments.length; ++n) t[n - 0] = arguments[n];
            this.listeners.forEach((function(e) {
                if (e.once) {
                    if (e.fired) return;
                    e.fired = !0
                }
                e.callback.apply(e, [].concat($jscomp.arrayFromIterable(t.concat(e.args))))
            })), _.remove(this.listeners, (function(e) {
                return e.once && e.fired
            }))
        }, e.prototype.remove = function(e, t) {
            var n = this.listeners.findIndex((function(n) {
                return t ? n.name === t : n.callback === e
            }));
            0 <= n && this.listeners.splice(n, 1)
        }, e.prototype.clear = function() {
            this.listeners = []
        }, e.prototype.removeAll = function() {
            this.listeners = []
        }, e.prototype.dispose = function() {
            this.clear()
        }, nge.Lib.Signal = e)
    }, function(e, t) {
        nge.Lib.Time = {
            get: function(e) {
                return e || (e = new Date), e.getTime()
            },
            getUnixtime: function(e) {
                return e || (e = new Date), ~~(e.getTime() / 1e3)
            },
            HHMMSS: function() {
                var e = new Date;
                return e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds() + "|" + e.getMilliseconds()
            },
            secToHHMMSS: function(e, t) {
                var n = ~~e,
                    i = ~~((n - 3600 * (e = ~~(n / 3600))) / 60);
                return n = n - 3600 * e - 60 * i, 10 > e && (e = "0" + e), 10 > i && (i = "0" + i), 10 > n && (n = "0" + n), t ? {
                    H: e,
                    M: i,
                    S: n
                } : e + ":" + i + ":" + n
            },
            dateToDDMMYYYYHHMMSS: function(e, t) {
                var n = 10 > e.getDate() ? "0" + e.getDate() : e.getDate(),
                    i = 10 > e.getMonth() + 1 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1,
                    o = e.getFullYear(),
                    s = 10 > e.getHours() ? "0" + e.getHours() : e.getHours(),
                    a = 10 > e.getMinutes() ? "0" + e.getMinutes() : e.getMinutes();
                return e = 10 > e.getSeconds() ? "0" + e.getSeconds() : e.getSeconds(), t ? {
                    d: n,
                    m: i,
                    y: o,
                    H: s,
                    M: a,
                    S: e
                } : n + "." + i + "." + o + " " + s + ":" + a + ":" + e
            },
            unixtimeToDDMMYYYY: function(e, t) {
                t || (t = ".");
                var n = new Date(1e3 * e);
                return (e = 10 > n.getDate() ? "0" + n.getDate() : n.getDate()) + t + (10 > n.getMonth() + 1 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1) + t + (n = n.getFullYear())
            },
            getDeltaT: function(e) {
                return !!e && this.get() - e
            },
            secToMsec: function(e) {
                return ~~(1e3 * e)
            },
            msecToSec: function(e) {
                return e / 1e3
            }
        }
    }, function(e, t) {
        nge.Lib.Timeline = function(e) {
            function t(t) {
                for (; i < o && (n = e.timePoints[i]).time <= t; i++) n.callback()
            }
            e = nge.Lib.Helper.mergeObjs({
                duration: 1e3,
                timePoints: [],
                onComplete: null
            }, e);
            var n, i = 0,
                o = e.timePoints.length,
                s = nge.tween.add({
                    x: 0
                });
            return s.to({
                x: e.duration
            }, e.duration), s.onStart.add((function() {
                t(0)
            })), s.onUpdateCallback((function(e, n, i) {
                t(i.dt)
            })).onComplete.add((function() {
                t(e.duration), e.onComplete && e.onComplete()
            })), this.start = function() {
                i = 0, s.start()
            }, this
        }
    }, function(e, t) {
        nge.Lib.TweenTools = {
            spritesAnimation: nge.Mlm.TweenManager.Controller.spritesAnimation
        }
    }, function(e, t) {
        nge.Lib.Tween = {
            Easing: nge.Mlm.TweenManager.Tween.Easing
        }
    }, function(e, t) {
        nge.Lib.Tweens = function() {
            var e = {},
                t = !1,
                n = 0,
                i = 0,
                o = this,
                s = 1;
            Object.defineProperties(this, {
                globalTimeScale: {
                    get: function() {
                        return s * nge.statesManager.getTimeScale()
                    },
                    set: function(e) {
                        s = e
                    }
                }
            }), this.tweens = e, this.removeAll = function() {
                for (var t in e) e[t].stop()
            }, this.add = function(i) {
                t || (t = !0, nge.observer.add("StatesManager.update.start", g, !1, !0), g());
                var s = f(),
                    p = {
                        id: s,
                        isRunning: !1,
                        enableUpdate: !1,
                        target: i,
                        to: a,
                        start: r,
                        pause: l,
                        resume: c,
                        stop: u,
                        points: [],
                        _timeScale: 1,
                        get timeScale() {
                            return this._timeScale
                        },
                        set timeScale(e) {
                            if (this._timeScale === e || !this.points[0]) return this._timeScale;
                            var t = ~~(n - this.points[0].timeStart) * o.globalTimeScale * this._timeScale;
                            if (0 >= this.points[0].duration - t) return this._timeScale;
                            for (var i in this.points[0].duration -= t, this.points[0].timeStart = n, this.points[0].propsTo) this.points[0].propsFrom[i] = this.target[i];
                            return this._timeScale = e
                        },
                        _started: !1,
                        _paused: !1,
                        _pauseTime: !1,
                        _timeBonus: 0,
                        _complete: !1,
                        _bkp: {
                            points: [],
                            obj: null
                        },
                        _functions: {
                            onStart: [],
                            onStartOnce: [],
                            onUpdate: [],
                            onComplete: [],
                            onCompleteOnce: []
                        },
                        onComplete: {
                            addOnce: function(e) {
                                return p._functions.onCompleteOnce.push(e), p
                            },
                            add: function(e) {
                                return p._functions.onComplete.push(e), p
                            }
                        },
                        onStart: {
                            addOnce: function(e) {
                                return p._functions.onStartOnce.push(e), p
                            },
                            add: function(e) {
                                return p._functions.onStart.push(e), p
                            }
                        },
                        onUpdateCallback: function(e) {
                            return p._functions.onUpdate.push(e), p
                        }
                    };
                return e[s] = p
            };
            var a = function(e, t, i, o, s) {
                    var a, r = {};
                    for (a in e) r[a] = this.target[a];
                    return s || (s = 0), this.points.push({
                        propsTo: e,
                        duration: t,
                        easing: i,
                        propsFrom: r,
                        timeStart: n + s,
                        startDelay: s
                    }), this._complete = !1, o && this.start(), this
                },
                r = function() {
                    if (this.isRunning || !this.points || 0 === this.points.length && 0 === this._bkp.points.length) return this;
                    if (0 === this.points.length && 0 < this._bkp.points.length) {
                        this.points = this._bkp.points;
                        var t = f();
                        e[t] = this
                    }
                    for (this.points[0].timeStart = n + this.points[0].startDelay, this._bkp = {
                            points: nge.Lib.Helper.jsObjClone(this.points),
                            obj: null
                        }, this.isRunning = this._started = !0, this._complete = !1, t = 0; t < this._functions.onStartOnce.length; t++) this._functions.onStartOnce[t]();
                    for (t = 0; t < this._functions.onStart.length; t++) this._functions.onStart[t]();
                    return 0 < this._timeBonus && p(this, !0), this
                },
                l = function() {
                    return this._paused = !0, this.isRunning = !1, this._pauseTime = n, this
                },
                c = function() {
                    return this.points && this.points[0] && (this.points[0].timeStart += n - this._pauseTime), this._paused = !1, this.isRunning = !0, this._pauseTime = 0, this
                },
                u = function() {
                    return this._complete = !0, this.isRunning = !1, delete e[this.id], this
                },
                g = function() {
                    var t = nge.Lib.Time.get();
                    if (nge.game.paused) {
                        for (var i in t -= n, e) e[i].points && e[i].points[0] && (e[i].points[0].timeStart += t);
                        return !0
                    }
                    for (i in n = t, e) e[i]._complete ? delete e[i] : e[i]._started && !e[i]._paused && p(e[i]);
                    return !0
                },
                f = function() {
                    return i++, n + "_" + i
                },
                p = function(e, t) {
                    var i = e.points[0];
                    if (n < i.timeStart) return !1;
                    var o = {
                        percent: +(t = b(e, i, t)).toFixed(3),
                        vEnd: i.propsTo
                    };
                    for (i = 0; i < e._functions.onUpdate.length; i++) e._functions.onUpdate[i](e, t, o);
                    if (1 === t)
                        if (e.points.shift(), 0 === e.points.length) {
                            e._complete = !0, e.isRunning = !1;
                            var s = e._functions.onComplete;
                            for (t = e._functions.onCompleteOnce, e._functions.onStartOnce = [], e._functions.onCompleteOnce = [], e.enableUpdate || (e._functions.onStart = [], e._functions.onUpdate = [], e._functions.onComplete = []), i = 0; i < t.length; i++) t[i]();
                            for (i = 0; i < s.length; i++) s[i]()
                        } else {
                            for (s in i = e.points[0].startDelay, e.points[0].timeStart = n + i, e.points[0].propsTo) e.points[0].propsFrom[s] = e.target[s];
                            i ? setTimeout((function() {
                                p(e)
                            }), i) : p(e)
                        }
                },
                b = function(e, t, i) {
                    0 < e._timeBonus && (t.timeStart -= e._timeBonus, e._timeBonus = 0);
                    var s = n,
                        a = (s - t.timeStart) * e.timeScale * o.globalTimeScale / t.duration;
                    for (var r in 1 <= a && i && (a = .99), 1 < a && (a = 1, e._timeBonus = ~~(s - t.timeStart - t.duration / (e.timeScale * o.globalTimeScale))), t.propsTo) e.target[r] = t.propsFrom[r] + (t.propsTo[r] - t.propsFrom[r]) * a;
                    return a
                }
        }
    }, function(e, t) {
        nge.Lib.Uploader = function() {
            this.beforeSubmit = function() {
                if (!(window.File && window.FileReader && window.FileList && window.Blob)) return alert("Please upgrade your browser, because your current browser lacks some new features we need!"), !1;
                var e = $("#FileInput")[0].files[0].size,
                    t = $("#FileInput")[0].files[0].type;
                switch (t) {
                    case "image/png":
                    case "image/gif":
                    case "image/jpeg":
                    case "image/pjpeg":
                    case "text/plain":
                    case "text/html":
                    case "application/x-zip-compressed":
                    case "application/pdf":
                    case "application/msword":
                    case "application/vnd.ms-excel":
                    case "video/mp4":
                        break;
                    default:
                        return $("#output").html("<b>" + t + "</b> Unsupported file type!"), !1
                }
                return 5242880 < e ? (alert("<b>" + e + "</b> Too big file! <br />File is too big, it should be less than 5 MB."), !1) : void 0
            }, this.OnProgress = function(e, t, n, i) {
                $("#progressbox").show(), $("#progressbar").width(i + "%"), $("#statustxt").html(i + "%"), 50 < i && $("#statustxt").css("color", "#000")
            }
        }
    }, function(e, t) {
        nge.Lib.Validator = {
            float: function(e, t) {
                var n = parseFloat(e);
                return t ? n : e === n
            },
            floatMoney: function(e, t) {
                for (var n = parseFloat(e).toFixed(2), i = [], o = 0, s = n.length - 1; 0 <= s; s--) s === n.length - 3 ? i.push(",") : (s < n.length - 4 && (0 == ++o % 3 && i.push(".")), i.push(n[s]));
                return t ? i.reverse().join("") : e === n
            },
            convertToFloat: function(e) {
                return this.floatMoney(e, !0)
            },
            moneyWithPeriod: function(e) {
                var t;
                return 0 === e.length && (t = "000"), 1 === e.length && (t = "00" + e), 2 === e.length && (t = "0" + e), 2 < e.length && (t = e), t.substring(0, t.length - 2) + "." + t.substring(t.length - 2, t.length)
            }
        }
    }, function(e, t, n) {
        n(199), n(200), n(201), n(202), n(203), n(204), n(205), n(206), n(207), n(208), n(209), n(210), n(211), n(212)
    }, function(e, t) {
        nge.Tpl = {}
    }, function(e, t) {
        nge.Tpl.Groups = {}
    }, function(e, t) {
        nge.Tpl.Groups.Atlases = function() {
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
    }, function(e, t) {
        nge.Tpl.Groups.ClickEffects = function() {
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
    }, function(e, t) {
        nge.Tpl.Groups.Loader = function(e) {
            return e || (e = nge.appPath + "img/"), {
                assets: {
                    name: "assets",
                    contents: [{
                        name: "groupLogo",
                        contents: nge.tpl.group("logo").assets.contents
                    }, {
                        type: mt.assets.IMAGE,
                        block: mt.assets.blocks.STATIC,
                        fullPath: e + "loading/bar_bg.png",
                        key: "loadingBarBG"
                    }, {
                        type: mt.assets.IMAGE,
                        block: mt.assets.blocks.STATIC,
                        fullPath: e + "loading/bar_fill.png",
                        key: "loadingBarFill"
                    }, {
                        type: mt.assets.IMAGE,
                        block: mt.assets.blocks.STATIC,
                        fullPath: e + "loading/bg.jpg",
                        key: "bg"
                    }, {
                        type: mt.assets.IMAGE,
                        block: mt.assets.blocks.STATIC,
                        fullPath: e + "loading/dot.png",
                        key: "loadingBarDot"
                    }, {
                        type: mt.assets.IMAGE,
                        block: mt.assets.blocks.STATIC,
                        fullPath: e + "loading/form.png",
                        key: "loadingBarBg"
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "loadingBarContainer",
                        name: "loadingBarContainer",
                        type: mt.objects.GROUP,
                        contents: [{
                            id: "loadingBar",
                            name: "loadingBar",
                            type: mt.objects.GROUP,
                            x: 650,
                            y: 800,
                            contents: [{
                                type: mt.objects.IMAGE,
                                isVisible: !1,
                                id: "loadingBarFill",
                                name: "loadingBarFill",
                                assetKey: "loadingBarFill"
                            }, {
                                type: mt.objects.IMAGE,
                                isVisible: !0,
                                id: "loadingBarBG",
                                name: "loadingBarBG",
                                assetKey: "loadingBarBG"
                            }, {
                                name: "loadingText",
                                x: 310,
                                y: 60,
                                type: mt.objects.TEXT,
                                anchorX: .5,
                                anchorY: .5,
                                style: {
                                    font: "52px 'freesetboldc'",
                                    fill: "#A0B0B9",
                                    stroke: "#000000",
                                    strokeThickness: 4
                                },
                                isVisible: !0,
                                text: "Loading"
                            }],
                            isVisible: !0
                        }, {
                            id: "groupLogo",
                            name: "groupLogo",
                            type: mt.objects.GROUP,
                            x: 960,
                            y: 400,
                            scaleX: 1.8,
                            scaleY: 1.8,
                            contents: nge.tpl.group("logo").objects.contents,
                            isVisible: 1
                        }],
                        isVisible: !0
                    }, {
                        id: "newLoadingBarContainer",
                        name: "newLoadingBarContainer",
                        type: mt.objects.GROUP,
                        contents: [{
                            id: "loadingBar",
                            name: "loadingBar",
                            type: mt.objects.GROUP,
                            x: 830,
                            y: 600,
                            contents: [{
                                type: mt.objects.IMAGE,
                                isVisible: !0,
                                id: "loadingBarBg",
                                anchorY: .5,
                                name: "loadingBarBg",
                                assetKey: "loadingBarBg"
                            }],
                            isVisible: !0
                        }],
                        isVisible: !0
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Tpl.Groups.Logo = function() {
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
    }, function(e, t) {
        nge.Tpl.Groups.ScrollbarHorizontal = function(e) {
            return e || (e = nge.appPath + "img/"), {
                assets: {
                    name: "assets",
                    contents: [{
                        type: mt.assets.IMAGE,
                        block: mt.assets.blocks.STATIC,
                        fullPath: e + "scrollbar/scroll_horizontal_bg.png",
                        key: "img/scrollbar/scroll_horizontal_bg.png",
                        qualityObeys: !1
                    }, {
                        type: mt.assets.IMAGE,
                        block: mt.assets.blocks.STATIC,
                        fullPath: e + "scrollbar/scroll_horizontal_touch.png",
                        key: "img/scrollbar/scroll_horizontal_touch.png",
                        qualityObeys: !1
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "scrollbarHorizontalContainer",
                        name: "scrollbarHorizontalContainer",
                        type: mt.objects.GROUP,
                        contents: [{
                            type: mt.objects.IMAGE,
                            isVisible: 1,
                            width: 321,
                            height: 21,
                            id: "scrollbarHorizontalTouch",
                            name: "scrollbarHorizontalTouch",
                            assetKey: "img/scrollbar/scroll_horizontal_touch.png"
                        }, {
                            type: mt.objects.IMAGE,
                            isVisible: 1,
                            width: 1048,
                            height: 21,
                            id: "scrollbarHorizontalBg",
                            name: "scrollbarHorizontalBg",
                            assetKey: "img/scrollbar/scroll_horizontal_bg.png"
                        }],
                        isVisible: 1
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Tpl.Groups.ScrollbarVertical = function(e) {
            return e || (e = nge.appPath + "img/"), {
                assets: {
                    name: "assets",
                    contents: [{
                        type: mt.assets.IMAGE,
                        block: mt.assets.blocks.STATIC,
                        fullPath: e + "scrollbar/scroll_bg.png",
                        key: "img/scrollbar/scroll_bg.png",
                        qualityObeys: !1
                    }, {
                        type: mt.assets.IMAGE,
                        block: mt.assets.blocks.STATIC,
                        fullPath: e + "scrollbar/scroll_touch.png",
                        key: "img/scrollbar/scroll_touch.png",
                        qualityObeys: !1
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        id: "scrollbarVerticalContainer",
                        name: "scrollbarVerticalContainer",
                        type: mt.objects.GROUP,
                        contents: [{
                            x: 0,
                            y: 0,
                            z: 0,
                            type: mt.objects.IMAGE,
                            isVisible: 1,
                            width: 21,
                            height: 321,
                            id: "scrollbarVerticalTouch",
                            name: "scrollbarVerticalTouch",
                            assetKey: "img/scrollbar/scroll_touch.png"
                        }, {
                            type: mt.objects.IMAGE,
                            isVisible: 1,
                            width: 21,
                            height: 1048,
                            id: "scrollbarVerticalBg",
                            name: "scrollbarVerticalBg",
                            assetKey: "img/scrollbar/scroll_bg.png"
                        }],
                        isVisible: !0
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Tpl.Groups.SettingsContent = function() {
            var e = 0,
                t = 0,
                n = function(n) {
                    var i = !1;
                    return (n = nge.localData.get(n + ".cfg")) && 1 < n.length && (i = !0), i && (e += 200, t++), {
                        visibility: i,
                        offset: e
                    }
                },
                i = n("lines"),
                o = n("coins");
            return n = n("bet"), {
                assets: {
                    name: "assets",
                    contents: [{
                        type: mt.assets.IMAGE,
                        fullPath: "img/settings/btn_minus.png",
                        key: "/settings/btn_line_minus.png",
                        width: 444,
                        height: 148,
                        frameWidth: 148,
                        frameHeight: 148
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/settings/btn_plus.png",
                        key: "/settings/btn_line_plus.png",
                        width: 444,
                        height: 148,
                        frameWidth: 148,
                        frameHeight: 148
                    }, {
                        type: mt.assets.IMAGE,
                        fullPath: "img/settings/lines_fill_txt.png",
                        key: "/settings/lines_fill_txt.png"
                    }]
                },
                objects: {
                    name: "objects",
                    contents: [{
                        type: mt.objects.GROUP,
                        isVisible: !0,
                        x: 915,
                        y: 2 === t ? 250 : 3 === t ? 150 : 350,
                        anchorY: .5,
                        contents: [{
                            id: "linesContainer",
                            name: "linesContainer",
                            y: i.offset,
                            type: mt.objects.GROUP,
                            contents: [{
                                x: 275,
                                y: 15,
                                type: 2,
                                anchorX: .5,
                                style: {
                                    font: "70px 'freesetboldc'",
                                    fill: "#4399a5",
                                    align: "left",
                                    stroke: "black"
                                },
                                isVisible: !0,
                                text: 10,
                                id: "linesNumber",
                                name: "linesNumber"
                            }, {
                                x: 275,
                                y: 95,
                                type: 2,
                                anchorX: .5,
                                scaleX: 1,
                                scaleY: 1,
                                alpha: 1,
                                style: {
                                    font: "32px 'freesetboldc'",
                                    fill: "#4399a5",
                                    align: "left",
                                    stroke: "black"
                                },
                                isVisible: !0,
                                text: "LINES",
                                id: "linesTitle",
                                name: "linesTitle"
                            }, {
                                type: 4,
                                isVisible: !0,
                                width: 441,
                                height: 147,
                                assetKey: "/settings/btn_line_minus.png",
                                action: "function() {nge.observer.fire('lines.down');}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                }
                            }, {
                                x: 400,
                                type: 4,
                                isVisible: !0,
                                width: 441,
                                height: 147,
                                assetKey: "/settings/btn_line_plus.png",
                                action: "function() {nge.observer.fire('lines.up');}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                }
                            }, {
                                x: 30,
                                y: 5,
                                type: 0,
                                isVisible: !0,
                                width: 444,
                                height: 134,
                                assetKey: "/settings/lines_fill_txt.png"
                            }],
                            isVisible: i.visibility
                        }, {
                            id: "betContainer",
                            name: "betContainer",
                            type: mt.objects.GROUP,
                            y: o.offset,
                            contents: [{
                                x: 275,
                                y: 15,
                                type: 2,
                                anchorX: .5,
                                style: {
                                    font: " 70px 'freesetboldc'",
                                    fill: "#4399a5",
                                    stroke: "black"
                                },
                                isVisible: !0,
                                text: 10,
                                id: "betNumber",
                                name: "betNumber"
                            }, {
                                x: 155,
                                y: 15,
                                type: 2,
                                style: {
                                    font: "70px 'freesetboldc'",
                                    fill: "#4399a5",
                                    align: "left",
                                    stroke: "black"
                                },
                                isVisible: !0,
                                text: nge.localData.get("currency"),
                                id: "coinsCur",
                                name: "coinsCur"
                            }, {
                                x: 275,
                                y: 95,
                                type: 2,
                                anchorX: .5,
                                style: {
                                    font: "32px 'freesetboldc'",
                                    fill: "#4399a5",
                                    stroke: "black"
                                },
                                isVisible: !0,
                                text: "BET"
                            }, {
                                type: 4,
                                isVisible: !0,
                                width: 441,
                                height: 147,
                                assetKey: "/settings/btn_line_minus.png",
                                action: "function() {nge.observer.fire('coins.down');}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                }
                            }, {
                                x: 400,
                                type: 4,
                                isVisible: !0,
                                width: 441,
                                height: 147,
                                assetKey: "/settings/btn_line_plus.png",
                                action: "function() {nge.observer.fire('coins.up');}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                }
                            }, {
                                x: 30,
                                y: 5,
                                type: 0,
                                isVisible: !0,
                                width: 444,
                                height: 134,
                                assetKey: "/settings/lines_fill_txt.png"
                            }],
                            isVisible: o.visibility
                        }, {
                            id: "coinsContainer",
                            name: "coinsContainer",
                            type: mt.objects.GROUP,
                            y: n.offset,
                            contents: [{
                                x: 275,
                                y: 15,
                                type: 2,
                                anchorX: .5,
                                style: {
                                    font: "70px 'freesetboldc'",
                                    fill: "#4399a5",
                                    align: "left"
                                },
                                align: "left",
                                isVisible: !0,
                                text: 10,
                                id: "coinsNumber",
                                name: "coinsNumber"
                            }, {
                                x: 275,
                                y: 95,
                                type: 2,
                                anchorX: .5,
                                style: {
                                    font: "32px 'freesetboldc'",
                                    fill: "#4399a5",
                                    align: "left",
                                    stroke: "black"
                                },
                                isVisible: !0,
                                text: "COINS PER LINE",
                                id: "coinsTitle",
                                name: "coinsTitle"
                            }, {
                                type: 4,
                                isVisible: !0,
                                width: 441,
                                height: 147,
                                id: "betDown",
                                name: "betDown",
                                assetKey: "/settings/btn_line_minus.png",
                                action: "function() {nge.observer.fire('bet.down');}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                }
                            }, {
                                x: 400,
                                type: 4,
                                isVisible: !0,
                                width: 441,
                                height: 147,
                                assetKey: "/settings/btn_line_plus.png",
                                action: "function() {nge.observer.fire('bet.up');}",
                                btnFrames: {
                                    over: 2,
                                    out: 1,
                                    down: 0
                                }
                            }, {
                                x: 30,
                                y: 5,
                                type: 0,
                                isVisible: !0,
                                width: 444,
                                height: 134,
                                assetKey: "/settings/lines_fill_txt.png"
                            }],
                            isVisible: n.visibility
                        }]
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Tpl.States = {}
    }, function(e, t) {
        nge.Tpl.States.BonusGame = function() {
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
    }, function(e, t) {
        nge.Tpl.States.Gamble = function() {
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
    }, function(e, t) {
        nge.Tpl.States.History = function() {
            return {
                objects: {
                    name: "objects",
                    contents: [{
                        name: "slotMachineContainer",
                        x: 0,
                        y: 0,
                        type: mt.objects.GROUP,
                        isVisible: 1,
                        alpha: 1
                    }, {
                        name: "scratchMachineContainer",
                        x: 0,
                        y: 0,
                        type: mt.objects.GROUP,
                        isVisible: 1,
                        alpha: 1
                    }, {
                        name: "blackJackMachineContainer",
                        type: mt.objects.GROUP,
                        isVisible: !0
                    }]
                }
            }
        }
    }, function(e, t) {
        nge.Tpl.States.Play = function() {
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
    }, function(e, t, n) {
        n(214), n(215), n(216)
    }, function(e, t) {
        nge.App = {}
    }, function(e, t) {
        nge.App.Run = function() {
            this.run = function() {
                if ("testing" === nge.Cfg.Main.mode) return t();
                nge.Cfg.Main.lang = nge.Lib.Helper.parseGetParams("lang") || nge.Cfg.Main.lang, nge.i18n = new nge.Lib.I18n(nge.Cfg.Main.project), nge.observer = new nge.Lib.Observer, nge.tween = new nge.Mlm.TweenManager.Controller, nge.clickEffects = new nge.Mlm.ClickEffects.Controller, nge.localData = new nge.Mlm.LocalData.Controller, nge.statesManager = new nge.Mlm.StatesManager.Controller, nge.tpl = new nge.Mlm.Tpl.Controller, nge.assets = new nge.Mlm.Assets.Controller, nge.objects = new nge.Mlm.Objects.Controller, nge.objects.init(), nge.device = nge.Lib.Device, nge.Lib.Helper.parseGetParams("forceMobile") && (nge.Lib.Helper.mobileAndTabletCheck = function() {
                    return !0
                }), t(), n();
                var i = nge.App.getInstance("Run", !0);
                nge.soundManager = nge.App.getInstance("Mlm.SoundManager.Controller"), nge.soundManager.init(), nge.transport = nge.App.getInstance("Mlm.Transport.Controller"), nge.transport.init(), nge.keyboard = nge.App.getInstance("Lib.Keyboard"), nge.mouse = nge.App.getInstance("Lib.Mouse"), nge.resolutionsManager = nge.App.getInstance("Mlm.ResolutionsManager.Controller"), nge.resolutionsManager.init(), nge.animator = nge.App.getInstance("Mlm.Animator.Controller"), nge.animator.init(), nge.assets.init(), nge.brain = nge.App.getInstance("Mlm.Brain.Controller"), nge.brain.init(), nge.cheatsManager = nge.App.getInstance("Mlm.CheatsManager.Controller"), nge.cheatsManager.init(), nge.audioInterfacesManager = nge.App.getInstance("Mlm.AudioInterfacesManager.Controller"), nge.audioInterfacesManager.init(), nge.api = nge.App.getInstance("Lib.Api");
                var o, a = function() {
                    o = setTimeout((function() {
                        clearTimeout(o), nge.observer.fire("window.resize")
                    }), 250)
                };
                return nge.game.scale.onFullScreenChange.add(a), $(window).resize(a), $(window).on("orientationchange", a), document.addEventListener("visibilitychange", (function() {
                    nge.observer.fire("window.visibilitychange", document.visibilityState)
                })), nge.userInfoHTML("run game"), nge.spine.Plugin.init(), nge.Cfg.Main.mobile || nge.Cfg.Main.forceUpdate || nge.observer.add("window.visibilitychange", nge.phaserAdapter.forcePC, !1, !0), e(), nge.localData.set("states", {
                    demo: ["demo"],
                    load: ["load"],
                    loadAssets: ["loadAssets"],
                    play: ["play"]
                }), s(), i ? i.run() : nge.statesManager.display("load"), !0
            };
            var e = function() {
                    if (!nge.Lib.Helper.mobileAndTabletCheck() || /MSIE|Trident|UCBrowser/.test(window.navigator.userAgent)) return !1;
                    var e = "Android" === nge.Lib.Helper.getOsAndVersion().os ? new nge.NoSleepAndroid : new nge.NoSleep,
                        t = !1,
                        n = function() {
                            t || (e.enable(), t = !0, document.removeEventListener("touchend", n, !1))
                        };
                    nge.observer.add("StatesManager.create.end", (function(e) {
                        "demo" !== e && "load" !== e && (document.addEventListener("touchend", n, !1), nge.observer.remove("StatesManager.create.end", !1, "enableNoSleep", !0))
                    }), !1, "enableNoSleep", !0)
                },
                t = function() {
                    nge.find = nge.objects.find, nge.findAll = nge.objects.findAll, nge.findOne = nge.objects.findOne;
                    var e = new nge.Lib.RafSetTimeout;
                    e.init(), nge.rafSetTimeoutLib = e, nge.rafSetTimeout = e.add, nge.rafClearTimeout = e.clear, nge.App.getInstance = function(e, t, n) {
                        return o({
                            path: e,
                            appOnly: t,
                            callback: function(t) {
                                if ("function" != typeof t && (log("ERROR TYPE !!!"), log(e, t)), t._instance && t._instance.singleton) return t._instance;
                                var i = new t(n);
                                return i.singleton && (t._instance = i), i
                            }
                        })
                    }, nge.App.getPath = function(e, t, n, i) {
                        return o({
                            path: e,
                            appOnly: t,
                            callback: function(e) {
                                return e
                            },
                            noModes: n,
                            modeName: i
                        })
                    }, nge.App.getSysInstancesModes = function() {
                        return nge.localData.get("_sysInstancesModes") || []
                    }, nge.App.addSysInstancesMode = function(e) {
                        var t = nge.App.getSysInstancesModes();
                        return -1 === t.indexOf(e) && (t.push(e), nge.localData.set("_sysInstancesModes", t))
                    }, nge.App.removeSysInstancesMode = function(e) {
                        var t = nge.App.getSysInstancesModes();
                        return -1 !== (e = t.indexOf(e)) && (t.splice(e, 1), nge.localData.set("_sysInstancesModes", t))
                    }
                },
                n = function() {
                    nge.Lib.Helper.mobileAndTabletCheck() && nge.App.addSysInstancesMode("mobile");
                    var e = nge.Lib.Helper.getOsAndVersion();
                    nge.App.addSysInstancesMode(e.os), nge.App.addSysInstancesMode(nge.Lib.Helper.browserDetect()), log("_sysInstancesModes", nge.App.getSysInstancesModes())
                },
                i = {},
                o = function(e) {
                    var t = [e.path, e.appOnly || "false", e.modeName || "none", e.noModes || "false"].join("_");
                    if (t in i) return !!i[t] && e.callback(i[t]);
                    i[t] = !1;
                    var n = e.path.split("."),
                        o = nge.Lib.Helper.capitaliseFirstLetter(nge.Cfg.Main.project),
                        s = nge.App.getSysInstancesModes(),
                        a = [];
                    return o = nge.Lib.Helper.mergeArrs(["nge", "App", o], n), a.push(o), e.appOnlyFlag || (n = nge.Lib.Helper.mergeArrs(["nge"], n), a.push(n)), s = nge.App.getSysInstancesModes(), nge.Lib.Checker.paths(a, (function(n) {
                        return i[t] = n, e.callback(n)
                    }), s)
                },
                s = function() {
                    var e = nge.Cfg.Main,
                        t = e.title + " v." + e.version + " - " + e.gameVersion;
                    nge.localData.set("version", e.version), document.title = t
                }
        }
    }, function(e, t) {
        nge.App.RunAppBase = Class.extend((function() {
            var e;
            this.statesReplacements = this.statesExtentions = !1, this.run = function() {
                e = this, this.runDefault()
            }, this.runDefault = function() {
                e || (e = this);
                var t = "States" + nge.Lib.Helper.capitaliseFirstLetter(nge.Cfg.Main.gameType);
                if (t = nge.Cfg[t], e.statesReplacements && (t = nge.Lib.Helper.jsObjClone(e.statesReplacements)), e.statesExtentions)
                    for (var n in e.statesExtentions) t[n] = t[n] ? nge.Lib.Helper.mergeArrs(t[n], e.statesExtentions[n]) : e.statesExtentions[n];
                return nge.localData.set("states", t), "test" !== (n = nge.Lib.Helper.parseGetParams("mode") || nge.Cfg.Main.mode) && ("history" === n ? nge.statesManager.display("historyDataCollector") : nge.statesManager.display("load")), nge.setStatisticsHandlers(), !0
            }
        }))
    }]);