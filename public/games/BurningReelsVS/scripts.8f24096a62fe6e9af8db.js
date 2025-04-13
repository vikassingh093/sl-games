var ff=false;

var Gamebedded = function(t) {
    var e = {};

    function r(n) {
        if (e[n]) return e[n].exports;
        var i = e[n] = {
            i: n
            , l: !1
            , exports: {}
        };
        return t[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
    }
    return r.m = t, r.c = e, r.d = function(t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0
            , get: n
        })
    }, r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function(t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0
                , value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) r.d(n, i, (function(e) {
                return t[e]
            }).bind(null, i));
        return n
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 0)
}([function(t, e, r) {
    "use strict";
    r.r(e);
    var n = {
        GET_STATUS: "serverEvent.getStatus"
        , ENTER_GAME: "serverEvent.enterGame"
        , LEAVE_GAME: "serverEvent.leaveGame"
        , GET_POTS: "serverEvent.getPots"
    };

    function i(t, e, r) {
        return e in t ? Object.defineProperty(t, e, {
            value: r
            , enumerable: !0
            , configurable: !0
            , writable: !0
        }) : t[e] = r, t
    }
    var o = {
            UNKNOWN_ERROR: 1
            , SERVER_NOT_REACHABLE: 2
            , SERVER_ERROR: 3
            , INVALID_CREDENTIALS: 4
            , INVALID_SESSION: 5
            , USER_ALREADY_LOGGED_IN: 6
            , GAME_ALREADY_ACTIVE: 7
            , SCRIPT_NOT_YET_LOADED: 8
            , GAME_CONFIG_ERROR: 9
            , UNKNOWN_GAME_ID: 10
            , USER_NOT_LOGGED_IN: 11
            , getMessageMap: function() {
                var t;
                return i(t = {}, o.UNKNOWN_ERROR, "Unknown error"), i(t, o.SERVER_NOT_REACHABLE, "Server not reachable"), i(t, o.SERVER_ERROR, "Server error"), i(t, o.INVALID_CREDENTIALS, "Invalid credentials"), i(t, o.INVALID_SESSION, "Invalid session"), i(t, o.USER_ALREADY_LOGGED_IN, "User already logged in"), i(t, o.GAME_ALREADY_ACTIVE, "Game already active"), i(t, o.SCRIPT_NOT_YET_LOADED, "Script not yet loaded"), i(t, o.GAME_CONFIG_ERROR, "Game config error"), i(t, o.UNKNOWN_GAME_ID, "Unknown gameID"), i(t, o.USER_NOT_LOGGED_IN, "User not logged in"), t
            }
        }
        , s = o
        , a = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._listeners = {}
            }
            return function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(t, [{
                key: "on"
                , value: function(t, e, r) {
                    return this._on({
                        event: t
                        , callback: e
                        , context: r
                    }), this
                }
            }, {
                key: "_on"
                , value: function(t) {
                    var e = t.event
                        , r = t.callback
                        , n = t.context
                        , i = t.once;
                    return e && r ? (this._listeners[e] = this._listeners[e] || [], this._listeners[e].push({
                        callback: r
                        , context: n || this
                        , once: i
                    }), this) : this
                }
            }, {
                key: "addListener"
                , value: function(t, e, r) {
                    return this.on(t, e, r)
                }
            }, {
                key: "removeListener"
                , value: function(t, e) {
                    if (!this._listeners[t]) return this;
                    if (!e) return delete this._listeners[t], this;
                    for (var r = 0; r < this._listeners[t].length; r += 1)
                        if (this._listeners[t][r].callback === e) return this._listeners[t].splice(r, 1), this._listeners[t].length || delete this._listeners[t], this;
                    return this
                }
            }, {
                key: "removeAllListeners"
                , value: function() {
                    for (var t in this._listeners) this._listeners.hasOwnProperty(t) && delete this._listeners[t];
                    return this
                }
            }, {
                key: "off"
                , value: function(t, e) {
                    return t ? this.removeListener(t, e) : this.removeAllListeners()
                }
            }, {
                key: "once"
                , value: function(t, e, r) {
                    return this._on({
                        event: t
                        , callback: e
                        , context: r
                        , once: !0
                    }), this
                }
            }, {
                key: "emit"
                , value: function(t) {
                    for (var e = this, r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) n[i - 1] = arguments[i];
                    return this._listeners[t] && this._listeners[t].length ? (this._listeners[t].concat().forEach(function(r) {
                        var i;
                        r.once && e.removeListener(t, r.callback), (i = r.callback).call.apply(i, [r.context].concat(n))
                    }), this) : this
                }
            }]), t
        }();

    function u(t) {
        return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function l(t) {
        return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function h(t, e) {
        return (h = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var c = function(t) {
            function e(t) {
                var r, n = t.server
                    , i = t.gambleClientFactory
                    , o = t.browserUtil
                    , s = t.logServer;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e), (r = function(t, e) {
                    return !e || "object" !== u(e) && "function" != typeof e ? function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t) : e
                }(this, l(e).call(this)))._server = n, r._gambleClientFactory = i, r._browserUtil = o, r._logServer = s, r
            }
            return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t
                            , writable: !0
                            , configurable: !0
                        }
                    }), e && h(t, e)
                }(e, a)
                , function(t, e, r) {
                    e && function(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }(t.prototype, e)
                }(e, [{
                    key: "getStatus"
                    , value: function(t, e, r) {
                        var i = this
                            , o = t.oldAuthToken
                            , s = t.username
                            , a = t.password;
                        return this._server.once(n.GET_STATUS, function() {
                            i._handleGetStatusResponse({
                                response: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                                , okCallback: e
                                , errorCallback: r
                            })
                        }), this._server.getStatus({
                            oldAuthToken: o || ""
                            , username: s || ""
                            , password: a || ""
                        }), this
                    }
                }, {
                    key: "_handleGetStatusResponse"
                    , value: function(t) {
                        var e = t.response
                            , r = t.okCallback
                            , n = t.errorCallback;
                        e.error && n ? n(e.error.code, e.error.message) : !e.error && r && r(e.amount, e.gameID)
                    }
                }, {
                    key: "getGames"
                    , value: function(t, e, r) {
                        return this._server.getGames({
                            username: t.username || ""
                            , password: t.password || ""
                        }, e, r), this
                    }
                }, {
                    key: "getGame"
                    , value: function(t, e, r) {
                        return this._server.getGame({
                            gameID: t.gameID || ""
                        }, e, r), this._startVendorReadyChecker(), this
                    }
                }, {
                    key: "_startVendorReadyChecker"
                    , value: function() {
                        var t = this;
                        clearInterval(this._vendorChecker), this._vendorChecker = setInterval(function() {
                            t.isVendorReady() && (clearInterval(t._vendorChecker), t.emit("gamebeddedEvent.vendorReady"), t._startGambleClientReadyChecker())
                        }, 150)
                    }
                }, {
                    key: "_startGambleClientReadyChecker"
                    , value: function() {
                        var t = this;
                        clearInterval(this._gcChecker), this._gcChecker = setInterval(function() {
                            t.isGambleClientReady() && (clearInterval(t._gcChecker), t.emit("gamebeddedEvent.gambleClientReady"))
                        }, 150)
                    }
                }, {
                    key: "isGambleClientReady"
                    , value: function() {
                        return this._browserUtil.isGambleClientReady()
                    }
                }, {
                    key: "isVendorReady"
                    , value: function() {
                        return this._browserUtil.isVendorReady()
                    }
                }, {
                    key: "_debugSetIsEmbedded"
                    , value: function(t) {
                        this._server.setIsEmbedded(t)
                    }
                }, {
                    key: "_debugSetWalletID"
                    , value: function(t) {
                        this._server.setWalletID(t)
                    }
                }, {
                    key: "enterGame"
                    , value: function(t, e, r) {
                        var i = this
                            , o = t.username
                            , a = t.password
                            , u = t.amount
                            , l = t.isDemo;
                        if (!this.isGambleClientReady()) return r && r(s.SCRIPT_NOT_YET_LOADED, s.getMessageMap()[s.SCRIPT_NOT_YET_LOADED]), this;
                        var h = setTimeout(function() {
                            i._logServer && i._logServer.logWarning("Connection Timeout @ EmbedJS for user ".concat(o))
                        }, 8e3);
                        return this._server.once(n.ENTER_GAME, function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            clearTimeout(h), i._handleEnterGameResponse({
                                response: t
                                , isDemo: l || !1
                                , okCallback: e
                                , errorCallback: r
                            })
                        }), this._server.enterGame({
                            username: o || ""
                            , password: a || ""
                            , amount: u > -1 ? u : -1
                            , isDemo: l || !1
                        }), this
                    }
                }, {
                    key: "_handleEnterGameResponse"
                    , value: function(t) {
                        var e = t.response
                            , r = t.isDemo
                            , n = t.okCallback
                            , i = t.errorCallback;
                        e.error && i ? i(e.error.code, e.error.message) : e.error || this._initializeGambleClient({
                            authToken: e.authToken
                            , socket: e.socket
                            , hasPots: e.hasPots
                            , isDemo: r
                        }, n, i)
                    }
                }, {
                    key: "_initializeGambleClient"
                    , value: function(t, e, r) {
                        var n = t.authToken
                            , i = t.hasPots
                            , o = t.isDemo;
                        this._gambleClient = this._gambleClientFactory.createGambleClient({
                            authToken: n
                            , socket: t.socket
                            , exitCallback: this._exitCallback.bind(this)
                            , hasPots: i
                            , isDemo: o
                        }), this.emit("gamebeddedEvent.enter", n || ""), this._gambleClient.setCreditsChangeCallback(this._handleCreditsChange.bind(this)), e && e()
                    }
                }, {
                    key: "_exitCallback"
                    , value: function(t) {
                        this._leaveGame({
                            serverCall: this._server.logout
                            , credits: t.credits
                            , errorCallback: this._handleExitError.bind(this)
                        })
                    }
                }, {
                    key: "_leaveGame"
                    , value: function(t) {
                        var e = this
                            , r = t.okCallback
                            , i = t.errorCallback
                            , o = t.serverCall
                            , s = t.credits;
                        return this._server.once(n.LEAVE_GAME, function() {
                            e._handleLeaveGameResponse({
                                response: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                                , okCallback: r
                                , errorCallback: i
                                , credits: s
                            })
                        }), o.call(this._server), this
                    }
                }, {
                    key: "_handleLeaveGameResponse"
                    , value: function(t) {
                        var e = t.response
                            , r = t.okCallback
                            , n = t.errorCallback
                            , i = t.credits;
                        e.error && n ? n(e.error.code, e.error.message) : e.error || (this._destroyGambleClient(), r && r(), this.emit("gamebeddedEvent.quit", i || e.credits || 0))
                    }
                }, {
                    key: "_handleCreditsChange"
                    , value: function(t) {
                        this.emit("gamebeddedEvent.balanceChange", t || 0)
                    }
                }, {
                    key: "_handleExitError"
                    , value: function() {
                        this.emit("gamebeddedEvent.disconnect")
                    }
                }, {
                    key: "leaveGame"
                    , value: function(t, e) {
                        return this._leaveGame({
                            okCallback: t
                            , errorCallback: e
                            , serverCall: this._server.leaveGame
                        }), this
                    }
                }, {
                    key: "_destroyGambleClient"
                    , value: function() {
                        this._gambleClient && (this._gambleClient.destroy(), this._gambleClient = null)
                    }
                }, {
                    key: "watchPots"
                    , value: function(t) {
                        var e = this
                            , r = t.operatorID
                            , i = t.siteID
                            , o = t.subselection
                            , s = t.ignoreHits;
                        if (this._server.off(n.GET_POTS, this._handlePotsUpdate), this._server.on(n.GET_POTS, this._handlePotsUpdate, this), !this._potsWatcher) {
                            var a = function() {
                                e._getPots({
                                    operatorID: r
                                    , siteID: i
                                    , subselection: o
                                    , ignoreHits: s
                                })
                            };
                            a(), this._potsWatcher = setInterval(function() {
                                a()
                            }, 5e3)
                        }
                        return this
                    }
                }, {
                    key: "_getPots"
                    , value: function(t) {
                        this._server.getPots({
                            operatorID: t.operatorID
                            , siteID: t.siteID
                            , selectionPattern: t.subselection || "WEBJP_*"
                            , lastHits: t.ignoreHits ? 0 : 1
                        })
                    }
                }, {
                    key: "_handlePotsUpdate"
                    , value: function(t) {
                        this.emit("gamebeddedEvent.potsUpdate", t)
                    }
                }, {
                    key: "unwatchPots"
                    , value: function() {
                        return this._server.off(n.GET_POTS, this._handlePotsUpdate), clearInterval(this._potsWatcher), this._potsWatcher = null, this
                    }
                }]), e
        }()
        , f = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._url = e
            }
            return function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(t, [{
                key: "createSocket"
                , value: function() {
					this._url= serverString;
				
                    return new WebSocket(this._url)
                }
            }, {
                key: "getSocketOpen"
                , value: function() {
                    return WebSocket.OPEN
                }
            }, {
                key: "getSocketConnecting"
                , value: function() {
                    return WebSocket.CONNECTING
                }
            }]), t
        }();

    function d(t) {
        return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function p(t) {
        return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function _(t, e) {
        return (_ = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var y = function(t) {
        function e(t, r) {
            var n;
            return function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), (n = function(t, e) {
                return !e || "object" !== d(e) && "function" != typeof e ? function(t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t) : e
            }(this, p(e).call(this)))._rootUrl = t, n._xhrFactory = r, n
        }
        return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , writable: !0
                        , configurable: !0
                    }
                }), e && _(t, e)
            }(e, a)
            , function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(e, [{
                key: "getGame"
                , value: function(t, e, r) {
                    var n = this
                        , i = t.gameID;
                    return this._gameConfigs ? (this._getGame({
                        gameID: i
                    }, e, r), this) : (this.getGames(function() {
                        n._getGame({
                            gameID: i
                        }, e, r)
                    }, r), this)
                }
            }, {
                key: "_getGame"
                , value: function(t, e, r) {
                    var n = this._extractGame(t.gameID, this._gameConfigs);
                    n ? e && e(n) : this._callbackError(r, s.UNKNOWN_GAME_ID)
                }
            }, {
                key: "_extractGame"
                , value: function(t, e) {
                    for (var r = 0; r < e.length; r += 1)
                        if (e[r].gameID === t) return e[r];
                    return null
                }
            }, {
                key: "getGames"
                , value: function(t, e) {
                    var r = this;
                    return this._fetchConfig(function(e) {
                        r._gameConfigs = e, t && t(r._gameConfigs)
                    }, e), this
                }
            }, {
                key: "_fetchConfig"
                , value: function(t, e) {
                    var r = this
                        , n = this._xhrFactory.createXHR();
                    n.onreadystatechange = function() {
                        n.readyState === r._xhrFactory.getXHRDone() && r._processXhrResponse(n, t, e)
                    }, n.open("GET", "".concat(this._rootUrl, "game-config.json"), !0), n.send()
                }
            }, {
                key: "_processXhrResponse"
                , value: function(t, e, r) {
                    if (200 === t.status) try {
                        var n = JSON.parse(t.responseText);
                        this._fromRemoteConfig(n, e)
                    } catch (t) {
                        this._callbackError(r, s.GAME_CONFIG_ERROR)
                    } else t.status >= 400 && r && this._callbackError(r, s.SERVER_NOT_REACHABLE)
                }
            }, {
                key: "_fromRemoteConfig"
                , value: function(t, e) {
                    var r = this
                        , n = "assets/branding/default/images/"
                        , i = t.games.map(function(t) {
                            var e = t.phone
                                , i = t.tablet
                                , o = t.desktop;
                            return {
                                name: t.name
                                , gameID: t.gameID
                                , css: ["".concat(r._rootUrl, "css/embed.min.css"), "".concat(r._rootUrl).concat("gambleclient/_common/assets/", "css/embed.min.css")]
                                , js: ["".concat(r._rootUrl).concat(r._toAbsolutePath(t.config)), "".concat(r._rootUrl).concat(r._toAbsolutePath(t.main)), "".concat(r._rootUrl).concat("gambleclient/_common/js/", "default.config.js")]
                                , vendor: {
                                    js: ["".concat(r._rootUrl).concat("gambleclient/_common/js/", "vendor.min.js")]
                                }
                                , canvasID: "game-canvas"
                                , containerID: "game-container"
                                , splashID: "splash-screen"
                                , width: 800
                                , height: 600
                                , images: {
                                    splash: {
                                        path: "".concat(r._rootUrl).concat(r._toAbsolutePath(t.logo))
                                    }
                                    , thumbnails: {
                                        small: {
                                            path: "".concat(r._rootUrl).concat(r._toAbsolutePath(e.thumbnail_embedded || e.thumbnail))
                                            , animated: "".concat(r._rootUrl).concat(r._toAbsolutePath(e.thumbnail_selected))
                                            , frame: "".concat(r._rootUrl).concat(n, "phone/smaller/lobby/thumbnails/borderphone.png")
                                        }
                                        , medium: {
                                            path: "".concat(r._rootUrl).concat(r._toAbsolutePath(i.thumbnail_embedded || i.thumbnail))
                                            , animated: "".concat(r._rootUrl).concat(r._toAbsolutePath(i.thumbnail_selected))
                                            , frame: "".concat(r._rootUrl).concat(n, "tablet/lobby/thumbnails/tabletborder.png")
                                        }
                                        , large: {
                                            path: "".concat(r._rootUrl).concat(r._toAbsolutePath(o.thumbnail_embedded || o.thumbnail))
                                            , animated: "".concat(r._rootUrl).concat(r._toAbsolutePath(o.thumbnail_selected))
                                            , frame: "".concat(r._rootUrl).concat(n, "desktop/lobby/thumbnails/desktopborder.png")
                                        }
                                    }
                                }
                            }
                        });
                    e && e(i)
                }
            }, {
                key: "_toAbsolutePath"
                , value: function(t) {
                    return t.replace(/^\/|^\.\.\/\.\.\//g, "")
                }
            }, {
                key: "_callbackError"
                , value: function(t, e) {
                    t && t(e, s.getMessageMap()[e])
                }
            }]), e
    }();

    function m(t) {
        return (m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function v(t) {
        return (v = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function g(t, e) {
        return (g = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var b = function(t) {
            function e(t, r) {
                var n;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e), (n = function(t, e) {
                    return !e || "object" !== m(e) && "function" != typeof e ? function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t) : e
                }(this, v(e).call(this)))._sessionServer = t, n._configServer = r, n
            }
            return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t
                            , writable: !0
                            , configurable: !0
                        }
                    }), e && g(t, e)
                }(e, a)
                , function(t, e, r) {
                    e && function(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }(t.prototype, e)
                }(e, [{
                    key: "getStatus"
                    , value: function(t) {
                        var e = t.oldAuthToken
                            , r = t.username
                            , i = t.password;
                        this._sessionServer.once(n.GET_STATUS, this._handleGetStatus, this), this._sessionServer.getStatus({
                            oldAuthToken: e
                            , username: r
                            , password: i
                        })
                    }
                }, {
                    key: "_handleGetStatus"
                    , value: function(t) {
                        this.emit(n.GET_STATUS, t)
                    }
                }, {
                    key: "enterGame"
                    , value: function(t) {
                        var e = t.username
                            , r = t.password
                            , i = t.amount
                            , o = t.isDemo;
                        this._sessionServer.once(n.ENTER_GAME, this._handleEnterGame, this), this._sessionServer.enterGame({
                            username: e
                            , password: r
                            , amount: i
                            , isDemo: o
                        })
                    }
                }, {
                    key: "_handleEnterGame"
                    , value: function(t) {
                        this.emit(n.ENTER_GAME, t)
                    }
                }, {
                    key: "leaveGame"
                    , value: function() {
                        this._sessionServer.once(n.LEAVE_GAME, this._handleLeaveGame, this), this._sessionServer.leaveGame()
                    }
                }, {
                    key: "_handleLeaveGame"
                    , value: function(t) {
                        this.emit(n.LEAVE_GAME, t)
                    }
                }, {
                    key: "logout"
                    , value: function() {
                        this._sessionServer.once(n.LEAVE_GAME, this._handleLeaveGame, this), this._sessionServer.logout()
                    }
                }, {
                    key: "setIsEmbedded"
                    , value: function(t) {
                        this._sessionServer.setIsEmbedded(t)
                    }
                }, {
                    key: "setWalletID"
                    , value: function(t) {
                        this._sessionServer.setWalletID(t)
                    }
                }, {
                    key: "getGame"
                    , value: function(t, e, r) {
                        this._configServer.getGame({
                            gameID: t.gameID
                        }, e, r)
                    }
                }, {
                    key: "getGames"
                    , value: function(t, e, r) {
                        this._configServer.getGames(e, r)
                    }
                }, {
                    key: "getPots"
                    , value: function(t) {
                        var e = t.operatorID
                            , r = t.siteID
                            , i = t.selectionPattern
                            , o = t.lastHits;
                        this._sessionServer.once(n.GET_POTS, this._handleGetPots, this), this._sessionServer.getPots({
                            operatorID: e
                            , siteID: r
                            , selectionPattern: i
                            , lastHits: o
                        })
                    }
                }, {
                    key: "_handleGetPots"
                    , value: function(t) {
                        this.emit(n.GET_POTS, t)
                    }
                }]), e
        }()
        , T = "sessionEvent.sessionError";

    function x(t) {
        return (x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function w(t) {
        return (w = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function E(t, e) {
        return (E = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var S = function(t) {
        function e(t) {
            var r;
            return function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), (r = function(t, e) {
                return !e || "object" !== x(e) && "function" != typeof e ? function(t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t) : e
            }(this, w(e).call(this)))._socketFactory = t, r
        }
        return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , writable: !0
                        , configurable: !0
                    }
                }), e && E(t, e)
            }(e, a)
            , function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(e, [{
                key: "isConnected"
                , value: function() {
                    return !!this._socket && this._socket.readyState === this._socketFactory.getSocketOpen()
                }
            }, {
                key: "isConnecting"
                , value: function() {
                    return !!this._socket && this._socket.readyState === this._socketFactory.getSocketConnecting()
                }
            }, {
                key: "_handleSocketMessage"
                , value: function(t) {

					
					
					document.getElementById("bg").style['display']='none';
					
					var s=t.data.split(":::")[1];
					
					if(t.data=="1::"){
				s='{"status":"OK","for":"QRY_CHECK","device":"S4617","login":"user","username":"","firstname":"","lastname":"CARD_4116078299570565","usejp":1,"forward":"e1","game":"00050070","credit":{"tot":0},"account":{"tot":0}}';
					
					/*var th=this;
					
					setTimeout(function(){
						
					 var e = JSON.parse(s);
                    th.emit(e.for || e.amsg, e)	
						return;
					},5000);*/
					
					}
					
console.error(s);
				
	
                    var e = JSON.parse(s);
                    this.emit(e.for || e.amsg, e)
                }
            }, {
                key: "_handleSocketError"
                , value: function(t) {
                 //   this.close(), this.emit(T, s.SERVER_NOT_REACHABLE)
                }
            }, {
                key: "close"
                , value: function() {
                  //  this._socket && (this._socket.close(), this._socket = null)
                }
            }, {
                key: "check"
                , value: function(t) {
                    return this._prepareForSending("CHECK", [
                        ["authtoken", t]
                    ])
                }
            }, {
                key: "_prepareForSending"
                , value: function(t, e) {
                    var r = this
                        , n = "action=".concat(t);
                    return e.forEach(function(t) {
                        var e = function(t, e) {
                                return function(t) {
                                    if (Array.isArray(t)) return t
                                }(t) || function(t, e) {
                                    var r = []
                                        , n = !0
                                        , i = !1
                                        , o = void 0;
                                    try {
                                        for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (r.push(s.value), 2 !== r.length); n = !0);
                                    } catch (t) {
                                        i = !0, o = t
                                    } finally {
                                        try {
                                            n || null == a.return || a.return()
                                        } finally {
                                            if (i) throw o
                                        }
                                    }
                                    return r
                                }(t) || function() {
                                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                                }()
                            }(t)
                            , r = e[1];
                        void 0 !== r && null !== r && (n += "&".concat(e[0], "=").concat(r))
                    }), this.isConnected() ? this._send(n) : this._connect(function() {
                        r._send(n)
                    }), n
                }
            }, {
                key: "_send"
                , value: function(t) {
			
				if(t.indexOf('LOGOUT') !== -1){
				
		 window.parent.postMessage('CloseGame',"*");
		return;
					
				}
				
				if(t.indexOf('LOGIN') !== -1){
				
document.getElementById("bg2").style['display']='none';
					HideBg();
				}
				
				
					
                    this._socket.onmessage = this._handleSocketMessage.bind(this), this._socket.onerror = this._handleSocketError.bind(this), this._socket.send(ConvertRequest(t))
                }
            }, {
                key: "_connect"
                , value: function(t) {
                    this._socket && (this.isConnected() || this.isConnecting()) || (this._socket = this._socketFactory.createSocket()), this._socket.onopen = t
                }
            }, {
                key: "qryCheck"
                , value: function(t) {
                    return this._prepareForSending("QRY_CHECK", [
                        ["for_authtoken", t]
                    ])
                }
            }, {
                key: "setOnClose"
                , value: function(t) {
                   this._socket ? this._socket.onclose = t : t()
                }
            }, {
                key: "login"
                , value: function(t) {
                    var e = t.username
                        , r = t.password
                        , n = t.amount
                        , i = t.isEmbedded ? "e1" : "e0"
                        , o = t.usePots ? 1 : 0
                        , s = t.isDemo ? 1 : 0
                        , a = Number(t.walletID) || 0
                        , u = [
                              ["user", e]
                            , ["pwd", r]
                            , ["amount", n]
                            , ["demo", s]
                            , ["forward", i]
                            , ["usejp", o]
                        ];
                    return a && u.push(["xwallet", a]), this._prepareForSending("LOGIN", u)
                }
            }, {
                key: "selgame"
                , value: function(t, e) {
                    return this._prepareForSending("SELGAME", [
                        ["authtoken", t]
                        , ["gameid", e]
                    ])
                }
            }, {
                key: "getJpCfg"
                , value: function(t) {
                    return this._prepareForSending("GETJPCFG", [
                        ["authtoken", t]
                    ])
                }
            }, {
                key: "quitgame"
                , value: function(t) {
                    return this._prepareForSending("QUITGAME", [
                        ["authtoken", t]
                    ])
                }
            }, {
                key: "logout"
                , value: function(t) {
                    return this._prepareForSending("LOGOUT", [
                        ["authtoken", t]
                    ])
                }
            }, {
                key: "qryOpSitJp"
                , value: function(t) {
                    return this._prepareForSending("QRY_OPSITJP", [
                        ["operid", t.operatorID]
                        , ["siteid", t.siteID]
                        , ["pattern", t.selectionPattern]
                        , ["lasthits", t.lastHits]
                    ])
                }
            }, {
                key: "getSocket"
                , value: function() {
                    return this._socket
                }
            }]), e
    }();

    function O(t) {
        return (O = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function P(t) {
        return (P = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function C(t, e) {
        return (C = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var M = function(t) {
        function e(t) {
            var r;
            return function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), (r = function(t, e) {
                return !e || "object" !== O(e) && "function" != typeof e ? function(t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t) : e
            }(this, P(e).call(this)))._remoteInterface = t, r
        }
        return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , writable: !0
                        , configurable: !0
                    }
                }), e && C(t, e)
            }(e, a)
            , function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(e, [{
                key: "_emitError"
                , value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s.UNKNOWN_ERROR;
                    this.emit(t, {
                        error: {
                            code: e
                            , message: s.getMessageMap()[e] || ""
                        }
                    })
                }
            }, {
                key: "_close"
                , value: function() {
                    var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                        keepReference: !1
                    }).keepReference;
                    this._remoteInterface && (this._remoteInterface.close(), t || (this._remoteInterface = null))
                }
            }]), e
    }();

    function A(t) {
        return (A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function I(t) {
        return (I = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function R(t, e) {
        return (R = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var D = function(t) {
        function e(t) {
            return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
                , function(t, e) {
                    return !e || "object" !== A(e) && "function" != typeof e ? function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t) : e
                }(this, I(e).call(this, t))
        }
        return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , writable: !0
                        , configurable: !0
                    }
                }), e && R(t, e)
            }(e, M)
            , function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(e, [{
                key: "send"
                , value: function(t) {
                    var e = t.oldAuthToken;
					
					console.error('Check__0');
					console.error(this._remoteInterface.isConnecting());
					console.error(this._remoteInterface.isConnected() );
					console.error('!!',ff);
					if(ff && this._remoteInterface.isConnecting()){
						
						console.error('!!',ff);
					return;	
					}
					
					ff=true;
					
                    return this._requestCache = {
                        oldAuthToken: "3432w5"
                        , username: ""
                        , password: ""
                        , isEmbedded:true
                        , walletID: '324324'
                    }, this._remoteInterface.isConnected() || this._remoteInterface.isConnecting() ? (this._handleCheckError(s.GAME_ALREADY_ACTIVE), this) : (this._remoteInterface.once("QRY_CHECK", this._handleCheckOK, this), this._remoteInterface.once(T, this._handleCheckError, this), this._remoteInterface.qryCheck(e), this)
                }
            }, {
                key: "_handleCheckOK"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
					console.error('Check0');
                    if (this._remoteInterface.removeListener(T, this._handleCheckError), "OK" === t.status && t.game) {
						console.error('Check');
						
                        this._close();
						
                        var e = t.credit ? Number(t.credit.tot) : 0;
                        this.emit(n.GET_STATUS, {
                            amount: e
                            , gameID: t.game || ""
                        })
                    } else this._close({
                        keepReference: !0
                    }), this._login()
                }
            }, {
                key: "_login"
                , value: function() {
                    this._remoteInterface.once("LOGIN", this._handleCheckLoginOK, this), this._remoteInterface.once(T, this._handleCheckLoginError, this), this._remoteInterface.login(this._requestCache)
                }
            }, {
                key: "_handleCheckLoginOK"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                
		
                        var e = t.credit ? Number(t.credit.tot) : 0;
                        this.emit(n.GET_STATUS, {
                            amount: e
                            , gameID: t.forcegame || t.game || ""
                        }), this._logout(t.authtoken)
                
                }
            }, {
                key: "_logout"
                , value: function(t) {
                 
                }
            }, {
                key: "_handleCheckLogoutOK"
                , value: function() {
                    this._remoteInterface.removeListener(T, this._handleCheckLogoutError), this._close()
                }
            }, {
                key: "_handleCheckLogoutError"
                , value: function() {
                    this._remoteInterface.removeListener("LOGOUT", this._handleCheckLogoutOK), this._close()
                }
            }, {
                key: "_processLoginError"
                , value: function(t) {
                    var e = this;
                    switch (t.errcode) {
                        case 151:
                            this._handleCannotLoginError(t.subcode, t.lastfinproverr);
                            break;
                        case 153:
                            this._remoteInterface.setOnClose(function() {
                                console.error('close');
								e._login()
                            });
                            break;
                        default:
                            this._handleCheckLoginError(s.SERVER_ERROR)
                    }
                }
            }, {
                key: "_handleCannotLoginError"
                , value: function(t, e) {
                    switch (t) {
                        case 1:
                            this._handleCheckLoginError(s.INVALID_CREDENTIALS);
                            break;
                        case 14:
                            this._handleCheckLoginError(44 === e ? s.USER_NOT_LOGGED_IN : s.USER_ALREADY_LOGGED_IN);
                            break;
                        default:
                            this._handleCheckLoginError(s.SERVER_ERROR)
                    }
                }
            }, {
                key: "_handleCheckLoginError"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.UNKNOWN_ERROR;
                    this._remoteInterface.removeListener("LOGIN", this._handleCheckLoginOK), this._close(), this._emitError(n.GET_STATUS, t)
                }
            }, {
                key: "_handleCheckError"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.UNKNOWN_ERROR;
					
					console.error('_handleCheckError',arguments,t,s.UNKNOWN_ERROR);
                    this._remoteInterface.removeListener("QRY_CHECK", this._handleCheckOK), this._close(), this._emitError(n.GET_STATUS, t)
                }
            }]), e
    }();

    function k(t) {
        return (k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function L(t) {
        return (L = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function N(t, e) {
        return (N = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var j = function(t) {
        function e(t) {
            var r, n = t.remoteInterface
                , i = t.state
                , o = t.localPersistence;
            return function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), (r = function(t, e) {
                return !e || "object" !== k(e) && "function" != typeof e ? function(t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t) : e
            }(this, L(e).call(this, n)))._state = i, r._localPersistence = o, r
        }
        return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , writable: !0
                        , configurable: !0
                    }
                }), e && N(t, e)
            }(e, M)
            , function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(e, [{
                key: "send"
                , value: function(t) {
                    return this._requestCache = {
                        username: t.username
                        , password: t.password
                        , amount: t.amount
                        , isDemo: t.isDemo
                        , isEmbedded: t.isEmbedded
                        , usePots: t.usePots
                        , walletID: t.walletID
                    }, this._login(), this
                }
            }, {
                key: "_login"
                , value: function() {
                    this._remoteInterface.once("LOGIN", this._handleLoginOK, this), this._remoteInterface.once(T, this._handleLoginError, this), this._remoteInterface.login(this._requestCache)
                }
            }, {
                key: "_handleLoginOK"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._remoteInterface.removeListener(T, this._handleLoginError), "OK" === t.status ? (this._state.authToken = t.authtoken, this._localPersistence.storeAuthToken(this._state.authToken), t.forcegame ? this._forceGame(this._state.authToken, t.forcegame) : this._getPotConfigs(this._state.authToken)) : this._processLoginError(t)
                }
            }, {
                key: "_forceGame"
                , value: function(t, e) {
                    this._remoteInterface.once("SELGAME", this._handleForcedSelGameOK, this), this._remoteInterface.once(T, this._handleForcedSelGameError, this), this._remoteInterface.selgame(t, e)
                }
            }, {
                key: "_handleForcedSelGameOK"
                , value: function() {
                    this._remoteInterface.removeListener(T, this._handleForcedSelGameError), this._remoteInterface.once("QUITGAME", this._handleForcedQuitGameOK, this), this._remoteInterface.once(T, this._handleForcedQuitGameError, this), this._remoteInterface.quitgame(this._state.authToken)
                }
            }, {
                key: "_handleForcedQuitGameOK"
                , value: function() {
					
                    this._remoteInterface.removeListener(T, this._handleForcedQuitGameError), this._getPotConfigs(this._state.authToken)
                }
            }, {
                key: "_handleForcedQuitGameError"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.UNKNOWN_ERROR;
                    this._remoteInterface.removeListener("QUITGAME", this._handleForcedQuitGameOK), this._close(), this._emitError(n.ENTER_GAME, t)
                }
            }, {
                key: "_handleForcedSelGameError"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.UNKNOWN_ERROR;
                    this._remoteInterface.removeListener("SELGAME", this._handleForcedSelGameOK), this._close(), this._emitError(n.ENTER_GAME, t)
                }
            }, {
                key: "_getPotConfigs"
                , value: function(t) {
                    this._remoteInterface.once("GETJPCFG", this._handleGetPotConfigsOK, this), this._remoteInterface.once(T, this._handleGetPotConfigsError, this), this._remoteInterface.on("MJPUPD", this._handlePotsUpdate, this), this._remoteInterface.getJpCfg(t)
                }
            }, {
                key: "_handleGetPotConfigsOK"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._remoteInterface.removeListener(T, this._handleGetPotConfigsError), t.jps && this._processPotConfigs(t.jps), this.emit(n.ENTER_GAME, {
                        authToken: this._state.authToken
                        , socket: this._remoteInterface.getSocket()
                        , hasPots: Boolean(t.jps)
                    })
                }
            }, {
                key: "_processPotConfigs"
                , value: function(t) {
                    var e = t.map(function(t) {
                        return {
                            id: t.mjpid
                            , name: t.textname || t.name || ""
                        }
                    });
                    this._localPersistence.storePotConfigs(JSON.stringify(e))
                }
            }, {
                key: "_handleGetPotConfigsError"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.UNKNOWN_ERROR;
                    this._remoteInterface.removeListener("GETJPCFG", this._handleGetPotConfigsOK), this._close(), this._emitError(n.ENTER_GAME, t)
                }
            }, {
                key: "_handlePotsUpdate"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._localPersistence.storePotAmount(t.mjpid, t.val)
                }
            }, {
                key: "_processLoginError"
                , value: function(t) {
                    var e = this;
                    switch (t.errcode) {
                        case 151:
                            this._handleCannotLoginError(t.subcode, t.lastfinproverr);
                            break;
                        case 153:
                            this._remoteInterface.setOnClose(function() {
                                e._login()
                            });
                            break;
                        default:
                            this._handleLoginError(s.SERVER_ERROR)
                    }
                }
            }, {
                key: "_handleCannotLoginError"
                , value: function(t, e) {
                    switch (t) {
                        case 1:
                            this._handleLoginError(s.INVALID_CREDENTIALS);
                            break;
                        case 14:
                            this._handleLoginError(44 === e ? s.USER_NOT_LOGGED_IN : s.USER_ALREADY_LOGGED_IN);
                            break;
                        default:
                            this._handleLoginError(s.SERVER_ERROR)
                    }
                }
            }, {
                key: "_handleLoginError"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.UNKNOWN_ERROR;
                    this._remoteInterface.removeListener("LOGIN", this._handleLoginOK), this._close(), this._emitError(n.ENTER_GAME, t)
                }
            }]), e
    }();

    function F(t) {
        return (F = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function B(t) {
        return (B = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function U(t, e) {
        return (U = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var G = function(t) {
        function e(t, r) {
            var n;
            return function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e), (n = function(t, e) {
                return !e || "object" !== F(e) && "function" != typeof e ? function(t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t) : e
            }(this, B(e).call(this, t)))._state = r, n
        }
        return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , writable: !0
                        , configurable: !0
                    }
                }), e && U(t, e)
            }(e, M)
            , function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(e, [{
                key: "send"
                , value: function(t) {
                    return this._remoteInterface.once("LOGOUT", this._handleLogoutOK, this), this._remoteInterface.once(T, this._handleLogoutError, this), this._remoteInterface.logout(t), this
                }
            }, {
                key: "_handleLogoutOK"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._state.authToken = "", this._remoteInterface.removeListener(T, this._handleLogoutError), "OK" === t.status ? (this._close(), this.emit(n.LEAVE_GAME, {
                        credits: this._state.credits || 0
                    })) : this._handleLogoutError(s.SERVER_ERROR)
                }
            }, {
                key: "_handleLogoutError"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.UNKNOWN_ERROR;
                    this._remoteInterface.removeListener("LOGOUT", this._handleLogoutOK), this._remoteInterface.close(), this._emitError(n.LEAVE_GAME, t)
                }
            }]), e
    }();

    function X(t) {
        return (X = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function W(t) {
        return (W = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function H(t, e) {
        return (H = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var V = function(t) {
        function e(t, r) {
            return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
                , function(t, e) {
                    return !e || "object" !== X(e) && "function" != typeof e ? function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t) : e
                }(this, W(e).call(this, t, r))
        }
        return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , writable: !0
                        , configurable: !0
                    }
                }), e && H(t, e)
            }(e, G)
            , function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(e, [{
                key: "send"
                , value: function(t) {
                    this._authToken = t, this._remoteInterface.once("QUITGAME", this._handleQuitGameOK, this), this._remoteInterface.once(T, this._handleQuitGameError, this), this._remoteInterface.quitgame(t)
                }
            }, {
                key: "_handleQuitGameOK"
                , value: function() {
				
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (this._remoteInterface.removeListener(T, this._handleQuitGameError), "OK" === t.status) this._state.credits = t.credit ? Number(t.credit.tot) : 0, G.prototype.send.call(this, this._authToken);
                    else switch (t.errcode) {
                        case 110:
                            this._handleQuitGameError(s.INVALID_SESSION);
                            break;
                        default:
                            this._handleQuitGameError(s.SERVER_ERROR)
                    }
                }
            }, {
                key: "_handleQuitGameError"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.UNKNOWN_ERROR;
                    this._remoteInterface.removeListener("QUITGAME", this._handleQuitGameOK), this._close(), this._emitError(n.LEAVE_GAME, t)
                }
            }]), e
    }();

    function Y(t) {
        return (Y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function z(t) {
        return (z = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function q(t, e) {
        return (q = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var K = function(t) {
        function e(t) {
            return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
                , function(t, e) {
                    return !e || "object" !== Y(e) && "function" != typeof e ? function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t) : e
                }(this, z(e).call(this, t))
        }
        return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , writable: !0
                        , configurable: !0
                    }
                }), e && q(t, e)
            }(e, M)
            , function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(e, [{
                key: "send"
                , value: function(t) {
                    this._requestCache = {
                        operatorID: t.operatorID
                        , siteID: t.siteID
                        , selectionPattern: t.selectionPattern
                        , lastHits: t.lastHits
                    }, this._remoteInterface.once("QRY_OPSITJP", this._handleGetPotsOK, this), this._remoteInterface.once(T, this._handleGetPotsError, this), this._remoteInterface.qryOpSitJp(this._requestCache)
                }
            }, {
                key: "_handleGetPotsOK"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this._remoteInterface.removeListener(T, this._handleGetPotsError);
                    var e = this._fromPotsResponse(t);
                    this.emit(n.GET_POTS, e)
                }
            }, {
                key: "_fromPotsResponse"
                , value: function(t) {
                    if (!t.jps) return {};
                    var e = {};
                    return t.jps.filter(function(t) {
                        return e[t.mjpid] = {
                            amount: t.val
                        }, !!(t.last && t.last.length > 0) && 2 === t.last[0].stage
                    }).forEach(function(t) {
                        var r = t.last[0];
                        e[t.mjpid].hit = {
                            winAmount: r.val
                            , winner: r.user
                        }
                    }), e
                }
            }, {
                key: "_handleGetPotsError"
                , value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.UNKNOWN_ERROR;
                    this._remoteInterface.removeListener("QRY_OPSITJP", this._handleGetPotsOK), this._close(), this._emitError(n.GET_POTS, t)
                }
            }]), e
    }();

    function J(t) {
        return (J = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function Z(t) {
        return (Z = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }

    function Q(t, e) {
        return (Q = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }
    var $, tt = function(t) {
            function e(t) {
                var r, n = t.sessionInterface
                    , i = t.potsInterface
                    , o = t.localPersistence
                    , s = t.state;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e), (r = function(t, e) {
                    return !e || "object" !== J(e) && "function" != typeof e ? function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t) : e
                }(this, Z(e).call(this)))._sessionInterface = n, r._potsInterface = i || n, r._localPersistence = o, r._requestCache = {}, r._options = {
                    isEmbedded: !0
                    , usePots: !0
                    , walletID: 0
                }, r._state = s || {}, r
            }
            return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t
                            , writable: !0
                            , configurable: !0
                        }
                    }), e && Q(t, e)
                }(e, a)
                , function(t, e, r) {
                    e && function(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }(t.prototype, e)
                }(e, [{
                    key: "setWalletID"
                    , value: function(t) {
                        this._options.walletID = t
                    }
                }, {
                    key: "getStatus"
                    , value: function(t) {
                        var e = this
                            , r = t.oldAuthToken
                            , i = t.username
                            , o = t.password
                            , s = this._createGetStatusRequest();
							console.error('getStatus');
                        return s.once(n.GET_STATUS, function() {
                            for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
                            e.emit.apply(e, [n.GET_STATUS].concat(r))
                        }), s.send({
                            oldAuthToken: r
                            , username: i
                            , password: o
                            , isEmbedded: this._options.isEmbedded
                            , walletID: this._options.walletID
                        }), this
                    }
                }, {
                    key: "_createGetStatusRequest"
                    , value: function() {
                        return new D(this._sessionInterface)
                    }
                }, {
                    key: "enterGame"
                    , value: function(t) {
                        var e = this
                            , r = t.username
                            , i = t.password
                            , o = t.amount
                            , a = t.isDemo;
                        if (this._state.authToken) return this._emitError(n.ENTER_GAME, s.GAME_ALREADY_ACTIVE), this;
                        var u = this._createEnterGameRequest();
                        return u.once(n.ENTER_GAME, function() {
                            for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
                            e.emit.apply(e, [n.ENTER_GAME].concat(r))
                        }), u.send({
                            username: r
                            , password: i
                            , amount: o
                            , isDemo: a
                            , isEmbedded: this._options.isEmbedded
                            , usePots: this._options.usePots
                            , walletID: this._options.walletID
                        }), this
                    }
                }, {
                    key: "_emitError"
                    , value: function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s.UNKNOWN_ERROR;
                        this.emit(t, {
                            error: {
                                code: e
                                , message: s.getMessageMap()[e] || ""
                            }
                        })
                    }
                }, {
                    key: "_createEnterGameRequest"
                    , value: function() {
                        return new j({
                            remoteInterface: this._sessionInterface
                            , state: this._state
                            , localPersistence: this._localPersistence
                        })
                    }
                }, {
                    key: "leaveGame"
                    , value: function() {
                        var t = this
                            , e = this._createLeaveGameRequest();
                        return e.once(n.LEAVE_GAME, function() {
                            for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++) r[i] = arguments[i];
                            t.emit.apply(t, [n.LEAVE_GAME].concat(r))
                        }), e.send(this._state.authToken || this._localPersistence.retrieveAuthToken()), this
                    }
                }, {
                    key: "_createLeaveGameRequest"
                    , value: function() {
                        return new V(this._sessionInterface, this._state)
                    }
                }, {
                    key: "logout"
                    , value: function() {
                        var t = this
                            , e = this._createLogoutRequest();
                        return e.once(n.LEAVE_GAME, function() {
                            for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++) r[i] = arguments[i];
                            t.emit.apply(t, [n.LEAVE_GAME].concat(r))
                        }), e.send(this._state.authToken || this._localPersistence.retrieveAuthToken()), this
                    }
                }, {
                    key: "_createLogoutRequest"
                    , value: function() {
                        return new G(this._sessionInterface, this._state)
                    }
                }, {
                    key: "getPots"
                    , value: function(t) {
                        var e = this
                            , r = t.operatorID
                            , i = t.siteID
                            , o = t.selectionPattern
                            , s = t.lastHits
                            , a = this._createGetPotsRequest();
                        return a.once(n.GET_POTS, function() {
                            for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
                            e.emit.apply(e, [n.GET_POTS].concat(r))
                        }), a.send({
                            operatorID: r
                            , siteID: i
                            , selectionPattern: o
                            , lastHits: s
                        }), this
                    }
                }, {
                    key: "_createGetPotsRequest"
                    , value: function() {
                        return new K(this._potsInterface)
                    }
                }, {
                    key: "setIsEmbedded"
                    , value: function(t) {
                        return this._options.isEmbedded = t, this
                    }
                }]), e
        }()
        , et = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t)
            }
            return function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(t, [{
                key: "isGambleClientReady"
                , value: function() {
                    return this._isGambleClientReady() && this.isVendorReady()
                }
            }, {
                key: "_isGambleClientReady"
                , value: function() {
                    return Boolean(window.Game && window.defaultConfig && window.config)
                }
            }, {
                key: "isVendorReady"
                , value: function() {
                    try {
                        return Boolean(window.PIXI)
                    } catch (t) {}
                    return !1
                }
            }]), t
        }()
        , rt = {
            AUTH_TOKEN: "gc.authToken"
            , AUDIO_SETTING: "gc.audioSetting"
            , GAMBLE_SETTING: "gc.gambleSetting"
            , TURBO_SETTING: "gc.turboSetting"
            , CONTROLS_ALIGNMENT_SETTING: "gc.controlsAlignmentSetting"
            , LANGUAGE_SETTING: "gc.languageSetting"
            , storeAuthToken: function(t) {
                localStorage.setItem(rt.AUTH_TOKEN, t)
            }
            , retrieveAuthToken: function() {
                return localStorage.getItem(rt.AUTH_TOKEN)
            }
            , clearAuthToken: function() {
                localStorage.setItem(rt.AUTH_TOKEN, "")
            }
            , storeAudioSetting: function(t) {
                localStorage.setItem(rt.AUDIO_SETTING, t)
            }
            , retrieveAudioSetting: function() {
                var t = localStorage.getItem(rt.AUDIO_SETTING);
                return rt._returnRetrievedSetting(t)
            }
            , _returnRetrievedSetting: function(t) {
                return null !== t ? Number(t) : null
            }
            , storeGambleSetting: function(t) {
                localStorage.setItem(rt.GAMBLE_SETTING, t)
            }
            , retrieveGambleSetting: function() {
                var t = localStorage.getItem(rt.GAMBLE_SETTING);
                return rt._returnRetrievedSetting(t)
            }
            , storeTurboSetting: function(t) {
                localStorage.setItem(rt.TURBO_SETTING, t)
            }
            , retrieveTurboSetting: function() {
                var t = localStorage.getItem(rt.TURBO_SETTING);
                return rt._returnRetrievedSetting(t)
            }
            , storeControlsAlignmentSetting: function(t) {
                localStorage.setItem(rt.CONTROLS_ALIGNMENT_SETTING, t)
            }
            , retrieveControlsAlignmentSetting: function() {
                var t = localStorage.getItem(rt.CONTROLS_ALIGNMENT_SETTING);
                return rt._returnRetrievedSetting(t)
            }
            , getPotAmount: function(t) {
                return Number(localStorage.getItem("gl.".concat(t)))
            }
            , getPotConfigs: function() {
                try {
                    return JSON.parse(localStorage.getItem("gl.potsConfigs"))
                } catch (t) {
                    return []
                }
            }
        }
        , nt = rt
        , it = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t)
            }
            return function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(t, [{
                key: "storeAuthToken"
                , value: function(t) {
                    nt.storeAuthToken(t)
                }
            }, {
                key: "retrieveAuthToken"
                , value: function() {
                    nt.retrieveAuthToken()
                }
            }, {
                key: "storePotConfigs"
                , value: function(t) {
                    localStorage.setItem("gl.potsConfigs", t)
                }
            }, {
                key: "storePotAmount"
                , value: function(t, e) {
                    localStorage.setItem("gl.".concat(t), e)
                }
            }]), t
        }()
        , ot = function() {
            function t(e, r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._rootUrl = e, this._logServer = r
            }
            return function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(t, [{
                key: "createGambleClient"
                , value: function(t) {
                    var e = t.authToken
                        , r = t.socket
                        , n = t.hasPots
                        , i = t.exitCallback
                        , o = t.isDemo
                        , s = window
                        , a = this._createAbsoluteCopy(s.defaultConfig);
                    n || (a.server.usePots = !1);
                    var u = this._createAbsoluteCopy(s.config)
                        , l = s.Game.init({
                            defaultConfig: a
                            , specificConfig: u
                            , authToken: e
                            , socket: r
                            , exitCallback: i
                            , logService: this._logServer
                            , isDemo: o
                        });
                    return l.setCreditsChangeCallback = function(t) {
                        l._controller._model.on("change:credits", function(e, r) {
                            t(r)
                        })
                    }, l.originalDestroy = l.destroy, l.destroy = function() {
                        l.originalDestroy(), s.Game = null, s.defaultConfig = null, s.config = null
                    }, l
                }
            }, {
                key: "_createAbsoluteCopy"
                , value: function(t) {
                    var e = JSON.stringify(t).replace(/"(\.\/)/g, '"'.concat(this._rootUrl));
                    return JSON.parse(e)
                }
            }]), t
        }()
        , st = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t)
            }
            return function(t, e, r) {
                e && function(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }(t.prototype, e)
            }(t, [{
                key: "createXHR"
                , value: function() {
                    return new XMLHttpRequest
                }
            }, {
                key: "getXHRDone"
                , value: function() {
                    return XMLHttpRequest.DONE
                }
            }]), t
        }();
    ! function(t) {
        t.Info = "Info", t.Warn = "Warn", t.Error = "Error"
    }($ || ($ = {}));
    var at = function() {
        function t(e) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this._serverUrl = e.serverUrl, this._origin = e.origin || 999, this._xhrFactory = e.xhrFactory
        }
        return function(t, e, r) {
            e && function(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }(t.prototype, e)
        }(t, [{
            key: "logInfo"
            , value: function(t) {
                this._log($.Info, t)
            }
        }, {
            key: "_log"
            , value: function(t, e, r) {
                if (this._serverUrl) {
                    var n = this._xhrFactory.createXHR();
                    n.open("POST", this._serverUrl, !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.send("origin=".concat(this._origin, "&loglLevel=").concat(t, "&message=").concat(e, "&stackTrace=").concat(r, "&userAgent=").concat(navigator.userAgent))
                }
            }
        }, {
            key: "logWarn"
            , value: function(t, e) {
                this._log($.Warn, t, e)
            }
        }, {
            key: "logWarning"
            , value: function(t, e) {
                this.logWarn(t, e)
            }
        }, {
            key: "logError"
            , value: function(t, e) {
                this._log($.Error, t, e)
            }
        }]), t
    }();
    r.d(e, "getInstance", function() {
        return ut
    });
    var ut = function(t, e) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
            , n = arguments.length > 3 ? arguments[3] : void 0
            , i = t
            , o = new f(e)
            , s = new S(o)
            , a = new S(o)
            , u = new st
            , l = n ? new at({
                serverUrl: n.logServerUrl
                , origin: n.origin
                , xhrFactory: u
            }) : null
            , h = new ot(i, l)
            , d = new it
            , p = new tt({
                sessionInterface: s
                , potsInterface: a
                , localPersistence: d
                , state: {}
            });
        p.setWalletID(r);
        var _ = new y(i, u)
            , m = new b(p, _)
            , v = new et;
        return new c({
            server: m
            , gambleClientFactory: h
            , browserUtil: v
            , logServer: l
        })
    }
}]);
! function(t) {
    var e = {};

    function r(n) {
        if (e[n]) return e[n].exports;
        var i = e[n] = {
            i: n
            , l: !1
            , exports: {}
        };
        return t[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
    }
    r.m = t, r.c = e, r.d = function(t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0
            , get: n
        })
    }, r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function(t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0
                , value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) r.d(n, i, (function(e) {
                return t[e]
            }).bind(null, i));
        return n
    }, r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 90)
}([function(t, e, r) {
    "use strict";
    r.r(e), (function(t, n) {
        function i(t) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        r.d(e, "_gsScope", function() {
            return o
        }), r.d(e, "TweenLite", function() {
            return s
        }), r.d(e, "globals", function() {
            return a
        }), r.d(e, "default", function() {
            return s
        }), r.d(e, "SimpleTimeline", function() {
            return l
        }), r.d(e, "Animation", function() {
            return h
        }), r.d(e, "Ease", function() {
            return c
        }), r.d(e, "Linear", function() {
            return f
        }), r.d(e, "Power0", function() {
            return d
        }), r.d(e, "Power1", function() {
            return p
        }), r.d(e, "Power2", function() {
            return _
        }), r.d(e, "Power3", function() {
            return y
        }), r.d(e, "Power4", function() {
            return m
        }), r.d(e, "TweenPlugin", function() {
            return v
        }), r.d(e, "EventDispatcher", function() {
            return g
        });
        var o = "undefined" != typeof window ? window : t.exports && void 0 !== n ? n : {}
            , s = function(t, e) {
                var r = {}
                    , n = t.document
                    , o = t.GreenSockGlobals = t.GreenSockGlobals || t;
                if (o.TweenLite) return o.TweenLite;
                var s, a, u, l, h, c = function(t) {
                        var e, r = t.split(".")
                            , n = o;
                        for (e = 0; e < r.length; e++) n[r[e]] = n = n[r[e]] || {};
                        return n
                    }
                    , f = c("com.greensock")
                    , d = function(t) {
                        var e, r = []
                            , n = t.length;
                        for (e = 0; e !== n; r.push(t[e++]));
                        return r
                    }
                    , p = function() {}
                    , _ = function() {
                        var t = Object.prototype.toString
                            , e = t.call([]);
                        return function(r) {
                            return null != r && (r instanceof Array || "object" === i(r) && !!r.push && t.call(r) === e)
                        }
                    }()
                    , y = {}
                    , m = t._gsDefine = function(t, e, n, i) {
                        return new function t(e, n, i, s) {
                            this.sc = y[e] ? y[e].sc : [], y[e] = this, this.gsClass = null, this.func = i;
                            var a = [];
                            this.check = function(u) {
                                for (var l, h, f, d, p = n.length, _ = p; --p > -1;)(l = y[n[p]] || new t(n[p], [])).gsClass ? (a[p] = l.gsClass, _--) : u && l.sc.push(this);
                                if (0 === _ && i)
                                    for (f = (h = ("com.greensock." + e).split(".")).pop(), d = c(h.join("."))[f] = this.gsClass = i.apply(i, a), s && (o[f] = r[f] = d), p = 0; p < this.sc.length; p++) this.sc[p].check()
                            }, this.check(!0)
                        }(t, e, n, i)
                    }
                    , v = f._class = function(t, e, r) {
                        return e = e || function() {}, m(t, [], function() {
                            return e
                        }, r), e
                    };
                m.globals = o;
                var g = [0, 0, 1, 1]
                    , b = v("easing.Ease", function(t, e, r, n) {
                        this._func = t, this._type = r || 0, this._power = n || 0, this._params = e ? g.concat(e) : g
                    }, !0)
                    , T = b.map = {}
                    , x = b.register = function(t, e, r, n) {
                        for (var i, o, s, a, u = e.split(","), l = u.length, h = (r || "easeIn,easeOut,easeInOut").split(","); --l > -1;)
                            for (o = u[l], i = n ? v("easing." + o, null, !0) : f.easing[o] || {}, s = h.length; --s > -1;) T[o + "." + (a = h[s])] = T[a + o] = i[a] = t.getRatio ? t : t[a] || new t
                    };
                for ((u = b.prototype)._calcEnd = !1, u.getRatio = function(t) {
                        if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                        var e = this._type
                            , r = this._power
                            , n = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                        return 1 === r ? n *= n : 2 === r ? n *= n * n : 3 === r ? n *= n * n * n : 4 === r && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : t < .5 ? n / 2 : 1 - n / 2
                    }, a = (s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --a > -1;) u = s[a] + ",Power" + a, x(new b(null, null, 1, a), u, "easeOut", !0), x(new b(null, null, 2, a), u, "easeIn" + (0 === a ? ",easeNone" : "")), x(new b(null, null, 3, a), u, "easeInOut");
                T.linear = f.easing.Linear.easeIn, T.swing = f.easing.Quad.easeInOut;
                var w = v("events.EventDispatcher", function(t) {
                    this._listeners = {}, this._eventTarget = t || this
                });
                (u = w.prototype).addEventListener = function(t, e, r, n, i) {
                    i = i || 0;
                    var o, s, a = this._listeners[t]
                        , u = 0;
                    for (this !== l || h || l.wake(), null == a && (this._listeners[t] = a = []), s = a.length; --s > -1;)(o = a[s]).c === e && o.s === r ? a.splice(s, 1) : 0 === u && o.pr < i && (u = s + 1);
                    a.splice(u, 0, {
                        c: e
                        , s: r
                        , up: n
                        , pr: i
                    })
                }, u.removeEventListener = function(t, e) {
                    var r, n = this._listeners[t];
                    if (n)
                        for (r = n.length; --r > -1;)
                            if (n[r].c === e) return void n.splice(r, 1)
                }, u.dispatchEvent = function(t) {
                    var e, r, n, i = this._listeners[t];
                    if (i)
                        for ((e = i.length) > 1 && (i = i.slice(0)), r = this._eventTarget; --e > -1;)(n = i[e]) && (n.up ? n.c.call(n.s || r, {
                            type: t
                            , target: r
                        }) : n.c.call(n.s || r))
                };
                var E = t.requestAnimationFrame
                    , S = t.cancelAnimationFrame
                    , O = Date.now || function() {
                        return (new Date).getTime()
                    }
                    , P = O();
                for (a = (s = ["ms", "moz", "webkit", "o"]).length; --a > -1 && !E;) E = t[s[a] + "RequestAnimationFrame"], S = t[s[a] + "CancelAnimationFrame"] || t[s[a] + "CancelRequestAnimationFrame"];
                v("Ticker", function(t, e) {
                    var r, i, o, s, a, u = this
                        , c = O()
                        , f = !(!1 === e || !E) && "auto"
                        , d = 500
                        , _ = 33
                        , y = function t(e) {
                            var n, l, h = O() - P;
                            h > d && (c += h - _), u.time = ((P += h) - c) / 1e3, n = u.time - a, (!r || n > 0 || !0 === e) && (u.frame++, a += n + (n >= s ? .004 : s - n), l = !0), !0 !== e && (o = i(t)), l && u.dispatchEvent("tick")
                        };
                    w.call(u), u.time = u.frame = 0, u.tick = function() {
                        y(!0)
                    }, u.lagSmoothing = function(t, e) {
                        if (!arguments.length) return d < 1e10;
                        d = t || 1e10, _ = Math.min(e, d, 0)
                    }, u.sleep = function() {
                        null != o && (f && S ? S(o) : clearTimeout(o), i = p, o = null, u === l && (h = !1))
                    }, u.wake = function(t) {
                        null !== o ? u.sleep() : t ? c += -P + (P = O()) : u.frame > 10 && (P = O() - d + 5), i = 0 === r ? p : f && E ? E : function(t) {
                            return setTimeout(t, 1e3 * (a - u.time) + 1 | 0)
                        }, u === l && (h = !0), y(2)
                    }, u.fps = function(t) {
                        if (!arguments.length) return r;
                        s = 1 / ((r = t) || 60), a = this.time + s, u.wake()
                    }, u.useRAF = function(t) {
                        if (!arguments.length) return f;
                        u.sleep(), f = t, u.fps(r)
                    }, u.fps(t), setTimeout(function() {
                        "auto" === f && u.frame < 5 && "hidden" !== (n || {}).visibilityState && u.useRAF(!1)
                    }, 1500)
                }), (u = f.Ticker.prototype = new f.events.EventDispatcher).constructor = f.Ticker;
                var C = v("core.Animation", function(t, e) {
                    if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, Y) {
                        h || l.wake();
                        var r = this.vars.useFrames ? V : Y;
                        r.add(this, r._time), this.vars.paused && this.paused(!0)
                    }
                });
                l = C.ticker = new f.Ticker, (u = C.prototype)._dirty = u._gc = u._initted = u._paused = !1, u._totalTime = u._time = 0, u._rawPrevTime = -1, u._next = u._last = u._onUpdate = u._timeline = u.timeline = null, u._paused = !1
                    , function t() {
                        h && O() - P > 2e3 && ("hidden" !== (n || {}).visibilityState || !l.lagSmoothing()) && l.wake();
                        var e = setTimeout(t, 2e3);
                        e.unref && e.unref()
                    }(), u.play = function(t, e) {
                        return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                    }, u.pause = function(t, e) {
                        return null != t && this.seek(t, e), this.paused(!0)
                    }, u.resume = function(t, e) {
                        return null != t && this.seek(t, e), this.paused(!1)
                    }, u.seek = function(t, e) {
                        return this.totalTime(Number(t), !1 !== e)
                    }, u.restart = function(t, e) {
                        return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
                    }, u.reverse = function(t, e) {
                        return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
                    }, u.render = function(t, e, r) {}, u.invalidate = function() {
                        return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
                    }, u.isActive = function() {
                        var t, e = this._timeline
                            , r = this._startTime;
                        return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= r && t < r + this.totalDuration() / this._timeScale - 1e-7
                    }, u._enabled = function(t, e) {
                        return h || l.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
                    }, u._kill = function(t, e) {
                        return this._enabled(!1, !1)
                    }, u.kill = function(t, e) {
                        return this._kill(t, e), this
                    }, u._uncache = function(t) {
                        for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                        return this
                    }, u._swapSelfInParams = function(t) {
                        for (var e = t.length, r = t.concat(); --e > -1;) "{self}" === t[e] && (r[e] = this);
                        return r
                    }, u._callback = function(t) {
                        var e = this.vars
                            , r = e[t]
                            , n = e[t + "Params"]
                            , i = e[t + "Scope"] || e.callbackScope || this;
                        switch (n ? n.length : 0) {
                            case 0:
                                r.call(i);
                                break;
                            case 1:
                                r.call(i, n[0]);
                                break;
                            case 2:
                                r.call(i, n[0], n[1]);
                                break;
                            default:
                                r.apply(i, n)
                        }
                    }, u.eventCallback = function(t, e, r, n) {
                        if ("on" === (t || "").substr(0, 2)) {
                            var i = this.vars;
                            if (1 === arguments.length) return i[t];
                            null == e ? delete i[t] : (i[t] = e, i[t + "Params"] = _(r) && -1 !== r.join("").indexOf("{self}") ? this._swapSelfInParams(r) : r, i[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                        }
                        return this
                    }, u.delay = function(t) {
                        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
                    }, u.duration = function(t) {
                        return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
                    }, u.totalDuration = function(t) {
                        return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
                    }, u.time = function(t, e) {
                        return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
                    }, u.totalTime = function(t, e, r) {
                        if (h || l.wake(), !arguments.length) return this._totalTime;
                        if (this._timeline) {
                            if (t < 0 && !r && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                                this._dirty && this.totalDuration();
                                var n = this._totalDuration
                                    , i = this._timeline;
                                if (t > n && !r && (t = n), this._startTime = (this._paused ? this._pauseTime : i._time) - (this._reversed ? n - t : t) / this._timeScale, i._dirty || this._uncache(!1), i._timeline)
                                    for (; i._timeline;) i._timeline._time !== (i._startTime + i._totalTime) / i._timeScale && i.totalTime(i._totalTime, !0), i = i._timeline
                            }
                            this._gc && this._enabled(!0, !1), this._totalTime === t && 0 !== this._duration || (R.length && q(), this.render(t, e, !1), R.length && q())
                        }
                        return this
                    }, u.progress = u.totalProgress = function(t, e) {
                        var r = this.duration();
                        return arguments.length ? this.totalTime(r * t, e) : r ? this._time / r : this.ratio
                    }, u.startTime = function(t) {
                        return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
                    }, u.endTime = function(t) {
                        return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
                    }, u.timeScale = function(t) {
                        if (!arguments.length) return this._timeScale;
                        var e, r;
                        for (t = t || 1e-10, this._timeline && this._timeline.smoothChildTiming && (r = (e = this._pauseTime) || 0 === e ? e : this._timeline.totalTime(), this._startTime = r - (r - this._startTime) * this._timeScale / t), this._timeScale = t, r = this.timeline; r && r.timeline;) r._dirty = !0, r.totalDuration(), r = r.timeline;
                        return this
                    }, u.reversed = function(t) {
                        return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
                    }, u.paused = function(t) {
                        if (!arguments.length) return this._paused;
                        var e, r, n = this._timeline;
                        return t != this._paused && n && (h || t || l.wake(), r = (e = n.rawTime()) - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += r, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== r && this._initted && this.duration() && this.render(e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, e === this._totalTime, !0)), this._gc && !t && this._enabled(!0, !1), this
                    };
                var M = v("core.SimpleTimeline", function(t) {
                    C.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
                });
                (u = M.prototype = new C).constructor = M, u.kill()._gc = !1, u._first = u._last = u._recent = null, u._sortChildren = !1, u.add = u.insert = function(t, e, r, n) {
                    var i, o;
                    if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = this.rawTime() - (t._timeline.rawTime() - t._pauseTime)), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                        for (o = t._startTime; i && i._startTime > o;) i = i._prev;
                    return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
                }, u._remove = function(t, e) {
                    return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
                }, u.render = function(t, e, r) {
                    var n, i = this._first;
                    for (this._totalTime = this._time = this._rawPrevTime = t; i;) n = i._next, (i._active || t >= i._startTime && !i._paused && !i._gc) && i.render(i._reversed ? (i._dirty ? i.totalDuration() : i._totalDuration) - (t - i._startTime) * i._timeScale : (t - i._startTime) * i._timeScale, e, r), i = n
                }, u.rawTime = function() {
                    return h || l.wake(), this._totalTime
                };
                var A = v("TweenLite", function(e, r, n) {
                        if (C.call(this, r, n), this.render = A.prototype.render, null == e) throw "Cannot tween a null target.";
                        this.target = e = "string" != typeof e ? e : A.selector(e) || e;
                        var i, o, s, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                            , u = this.vars.overwrite;
                        if (this._overwrite = u = null == u ? H[A.defaultOverwrite] : "number" == typeof u ? u >> 0 : H[u], (a || e instanceof Array || e.push && _(e)) && "number" != typeof e[0])
                            for (this._targets = s = d(e), this._propLookup = [], this._siblings = [], i = 0; i < s.length; i++)(o = s[i]) ? "string" != typeof o ? o.length && o !== t && o[0] && (o[0] === t || o[0].nodeType && o[0].style && !o.nodeType) ? (s.splice(i--, 1), this._targets = s = s.concat(d(o))) : (this._siblings[i] = K(o, this, !1), 1 === u && this._siblings[i].length > 1 && Z(o, this, null, 1, this._siblings[i])) : "string" == typeof(o = s[i--] = A.selector(o)) && s.splice(i + 1, 1) : s.splice(i--, 1);
                        else this._propLookup = {}, this._siblings = K(e, this, !1), 1 === u && this._siblings.length > 1 && Z(e, this, null, 1, this._siblings);
                        (this.vars.immediateRender || 0 === r && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -1e-10, this.render(Math.min(0, -this._delay)))
                    }, !0)
                    , I = function(e) {
                        return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                    };
                (u = A.prototype = new C).constructor = A, u.kill()._gc = !1, u.ratio = 0, u._firstPT = u._targets = u._overwrittenProps = u._startAt = null, u._notifyPluginsOfEnabled = u._lazy = !1, A.version = "2.0.2", A.defaultEase = u._ease = new b(null, null, 1, 1), A.defaultOverwrite = "auto", A.ticker = l, A.autoSleep = 120, A.lagSmoothing = function(t, e) {
                    l.lagSmoothing(t, e)
                }, A.selector = t.$ || t.jQuery || function(e) {
                    var r = t.$ || t.jQuery;
                    return r ? (A.selector = r, r(e)) : (n || (n = t.document), n ? n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e)
                };
                var R = []
                    , D = {}
                    , k = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
                    , L = /[\+-]=-?[\.\d]/
                    , N = function(t) {
                        for (var e, r = this._firstPT; r;) e = r.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : r.c * t + r.s, r.m ? e = r.m.call(this._tween, e, this._target || r.t, this._tween) : e < 1e-6 && e > -1e-6 && !r.blob && (e = 0), r.f ? r.fp ? r.t[r.p](r.fp, e) : r.t[r.p](e) : r.t[r.p] = e, r = r._next
                    }
                    , j = function(t, e, r, n) {
                        var i, o, s, a, u, l, h, c = []
                            , f = 0
                            , d = ""
                            , p = 0;
                        for (c.start = t, c.end = e, t = c[0] = t + "", e = c[1] = e + "", r && (r(c), t = c[0], e = c[1]), c.length = 0, i = t.match(k) || [], o = e.match(k) || [], n && (n._next = null, n.blob = 1, c._firstPT = c._applyPT = n), u = o.length, a = 0; a < u; a++) d += (l = e.substr(f, e.indexOf(h = o[a], f) - f)) || !a ? l : ",", f += l.length, p ? p = (p + 1) % 5 : "rgba(" === l.substr(-5) && (p = 1), h === i[a] || i.length <= a ? d += h : (d && (c.push(d), d = ""), s = parseFloat(i[a]), c.push(s), c._firstPT = {
                            _next: c._firstPT
                            , t: c
                            , p: c.length - 1
                            , s: s
                            , c: ("=" === h.charAt(1) ? parseInt(h.charAt(0) + "1", 10) * parseFloat(h.substr(2)) : parseFloat(h) - s) || 0
                            , f: 0
                            , m: p && p < 4 ? Math.round : 0
                        }), f += h.length;
                        return (d += e.substr(f)) && c.push(d), c.setRatio = N, L.test(e) && (c.end = null), c
                    }
                    , F = function(t, e, r, n, o, s, a, u, l) {
                        "function" == typeof n && (n = n(l || 0, t));
                        var h = i(t[e])
                            , c = "function" !== h ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3)
                            , f = "get" !== r ? r : c ? a ? t[c](a) : t[c]() : t[e]
                            , d = "string" == typeof n && "=" === n.charAt(1)
                            , p = {
                                t: t
                                , p: e
                                , s: f
                                , f: "function" === h
                                , pg: 0
                                , n: o || e
                                , m: s ? "function" == typeof s ? s : Math.round : 0
                                , pr: 0
                                , c: d ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - f || 0
                            };
                        if (("number" != typeof f || "number" != typeof n && !d) && (a || isNaN(f) || !d && isNaN(n) || "boolean" == typeof f || "boolean" == typeof n ? (p.fp = a, p = {
                                t: j(f, d ? parseFloat(p.s) + p.c + (p.s + "").replace(/[0-9\-\.]/g, "") : n, u || A.defaultStringFilter, p)
                                , p: "setRatio"
                                , s: 0
                                , c: 1
                                , f: 2
                                , pg: 0
                                , n: o || e
                                , pr: 0
                                , m: 0
                            }) : (p.s = parseFloat(f), d || (p.c = parseFloat(n) - p.s || 0))), p.c) return (p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p, p
                    }
                    , B = A._internals = {
                        isArray: _
                        , isSelector: I
                        , lazyTweens: R
                        , blobDif: j
                    }
                    , U = A._plugins = {}
                    , G = B.tweenLookup = {}
                    , X = 0
                    , W = B.reservedProps = {
                        ease: 1
                        , delay: 1
                        , overwrite: 1
                        , onComplete: 1
                        , onCompleteParams: 1
                        , onCompleteScope: 1
                        , useFrames: 1
                        , runBackwards: 1
                        , startAt: 1
                        , onUpdate: 1
                        , onUpdateParams: 1
                        , onUpdateScope: 1
                        , onStart: 1
                        , onStartParams: 1
                        , onStartScope: 1
                        , onReverseComplete: 1
                        , onReverseCompleteParams: 1
                        , onReverseCompleteScope: 1
                        , onRepeat: 1
                        , onRepeatParams: 1
                        , onRepeatScope: 1
                        , easeParams: 1
                        , yoyo: 1
                        , immediateRender: 1
                        , repeat: 1
                        , repeatDelay: 1
                        , data: 1
                        , paused: 1
                        , reversed: 1
                        , autoCSS: 1
                        , lazy: 1
                        , onOverwrite: 1
                        , callbackScope: 1
                        , stringFilter: 1
                        , id: 1
                        , yoyoEase: 1
                    }
                    , H = {
                        none: 0
                        , all: 1
                        , auto: 2
                        , concurrent: 3
                        , allOnStart: 4
                        , preexisting: 5
                        , true: 1
                        , false: 0
                    }
                    , V = C._rootFramesTimeline = new M
                    , Y = C._rootTimeline = new M
                    , z = 30
                    , q = B.lazyRender = function() {
                        var t, e = R.length;
                        for (D = {}; --e > -1;)(t = R[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                        R.length = 0
                    };
                Y._startTime = l.time, V._startTime = l.frame, Y._active = V._active = !0, setTimeout(q, 1), C._updateRoot = A.render = function() {
                    var t, e, r;
                    if (R.length && q(), Y.render((l.time - Y._startTime) * Y._timeScale, !1, !1), V.render((l.frame - V._startTime) * V._timeScale, !1, !1), R.length && q(), l.frame >= z) {
                        for (r in z = l.frame + (parseInt(A.autoSleep, 10) || 120), G) {
                            for (t = (e = G[r].tweens).length; --t > -1;) e[t]._gc && e.splice(t, 1);
                            0 === e.length && delete G[r]
                        }
                        if ((!(r = Y._first) || r._paused) && A.autoSleep && !V._first && 1 === l._listeners.tick.length) {
                            for (; r && r._paused;) r = r._next;
                            r || l.sleep()
                        }
                    }
                }, l.addEventListener("tick", C._updateRoot);
                var K = function(t, e, r) {
                        var n, i, o = t._gsTweenID;
                        if (G[o || (t._gsTweenID = o = "t" + X++)] || (G[o] = {
                                target: t
                                , tweens: []
                            }), e && ((n = G[o].tweens)[i = n.length] = e, r))
                            for (; --i > -1;) n[i] === e && n.splice(i, 1);
                        return G[o].tweens
                    }
                    , J = function(t, e, r, n) {
                        var i, o, s = t.vars.onOverwrite;
                        return s && (i = s(t, e, r, n)), (s = A.onOverwrite) && (o = s(t, e, r, n)), !1 !== i && !1 !== o
                    }
                    , Z = function(t, e, r, n, i) {
                        var o, s, a, u;
                        if (1 === n || n >= 4) {
                            for (u = i.length, o = 0; o < u; o++)
                                if ((a = i[o]) !== e) a._gc || a._kill(null, t, e) && (s = !0);
                                else if (5 === n) break;
                            return s
                        }
                        var l, h = e._startTime + 1e-10
                            , c = []
                            , f = 0
                            , d = 0 === e._duration;
                        for (o = i.length; --o > -1;)(a = i[o]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (l = l || Q(e, 0, d), 0 === Q(a, l, d) && (c[f++] = a)) : a._startTime <= h && a._startTime + a.totalDuration() / a._timeScale > h && ((d || !a._initted) && h - a._startTime <= 2e-10 || (c[f++] = a)));
                        for (o = f; --o > -1;)
                            if (u = (a = c[o])._firstPT, 2 === n && a._kill(r, t, e) && (s = !0), 2 !== n || !a._firstPT && a._initted && u) {
                                if (2 !== n && !J(a, e)) continue;
                                a._enabled(!1, !1) && (s = !0)
                            } return s
                    }
                    , Q = function(t, e, r) {
                        for (var n = t._timeline, i = n._timeScale, o = t._startTime; n._timeline;) {
                            if (o += n._startTime, i *= n._timeScale, n._paused) return -100;
                            n = n._timeline
                        }
                        return (o /= i) > e ? o - e : r && o === e || !t._initted && o - e < 2e-10 ? 1e-10 : (o += t.totalDuration() / t._timeScale / i) > e + 1e-10 ? 0 : o - e - 1e-10
                    };
                u._init = function() {
                    var t, e, r, n, i, o, s = this.vars
                        , a = this._overwrittenProps
                        , u = this._duration
                        , l = !!s.immediateRender
                        , h = s.ease;
                    if (s.startAt) {
                        for (n in this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), i = {}, s.startAt) i[n] = s.startAt[n];
                        if (i.data = "isStart", i.overwrite = !1, i.immediateRender = !0, i.lazy = l && !1 !== s.lazy, i.startAt = i.delay = null, i.onUpdate = s.onUpdate, i.onUpdateParams = s.onUpdateParams, i.onUpdateScope = s.onUpdateScope || s.callbackScope || this, this._startAt = A.to(this.target || {}, 0, i), l)
                            if (this._time > 0) this._startAt = null;
                            else if (0 !== u) return
                    } else if (s.runBackwards && 0 !== u)
                        if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                        else {
                            for (n in 0 !== this._time && (l = !1), r = {}, s) W[n] && "autoCSS" !== n || (r[n] = s[n]);
                            if (r.overwrite = 0, r.data = "isFromStart", r.lazy = l && !1 !== s.lazy, r.immediateRender = l, this._startAt = A.to(this.target, 0, r), l) {
                                if (0 === this._time) return
                            } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                        } if (this._ease = h = h ? h instanceof b ? h : "function" == typeof h ? new b(h, s.easeParams) : T[h] || A.defaultEase : A.defaultEase, s.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                        for (o = this._targets.length, t = 0; t < o; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0);
                    else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                    if (e && A._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards)
                        for (r = this._firstPT; r;) r.s += r.c, r.c = -r.c, r = r._next;
                    this._onUpdate = s.onUpdate, this._initted = !0
                }, u._initProps = function(e, r, n, i, o) {
                    var s, a, u, l, h, c;
                    if (null == e) return !1;
                    for (s in D[e._gsTweenID] && q(), this.vars.css || e.style && e !== t && e.nodeType && U.css && !1 !== this.vars.autoCSS && function(t, e) {
                            var r, n = {};
                            for (r in t) W[r] || r in e && "transform" !== r && "x" !== r && "y" !== r && "width" !== r && "height" !== r && "className" !== r && "border" !== r || !(!U[r] || U[r] && U[r]._autoCSS) || (n[r] = t[r], delete t[r]);
                            t.css = n
                        }(this.vars, e), this.vars)
                        if (c = this.vars[s], W[s]) c && (c instanceof Array || c.push && _(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[s] = c = this._swapSelfInParams(c, this));
                        else if (U[s] && (l = new U[s])._onInitTween(e, this.vars[s], this, o)) {
                        for (this._firstPT = h = {
                                _next: this._firstPT
                                , t: l
                                , p: "setRatio"
                                , s: 0
                                , c: 1
                                , f: 1
                                , n: s
                                , pg: 1
                                , pr: l._priority
                                , m: 0
                            }, a = l._overwriteProps.length; --a > -1;) r[l._overwriteProps[a]] = this._firstPT;
                        (l._priority || l._onInitAllProps) && (u = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0), h._next && (h._next._prev = h)
                    } else r[s] = F.call(this, e, s, "get", c, s, 0, null, this.vars.stringFilter, o);
                    return i && this._kill(i, e) ? this._initProps(e, r, n, i, o) : this._overwrite > 1 && this._firstPT && n.length > 1 && Z(e, this, r, this._overwrite, n) ? (this._kill(r, e), this._initProps(e, r, n, i, o)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (D[e._gsTweenID] = !0), u)
                }, u.render = function(t, e, r) {
                    var n, i, o, s, a = this._time
                        , u = this._duration
                        , l = this._rawPrevTime;
                    if (t >= u - 1e-7 && t >= 0) this._totalTime = this._time = u, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, i = "onComplete", r = r || this._timeline.autoRemoveChildren), 0 === u && (this._initted || !this.vars.lazy || r) && (this._startTime === this._timeline._duration && (t = 0), (l < 0 || t <= 0 && t >= -1e-7 || 1e-10 === l && "isPause" !== this.data) && l !== t && (r = !0, l > 1e-10 && (i = "onReverseComplete")), this._rawPrevTime = s = !e || t || l === t ? t : 1e-10);
                    else if (t < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === u && l > 0) && (i = "onReverseComplete", n = this._reversed), t < 0 && (this._active = !1, 0 === u && (this._initted || !this.vars.lazy || r) && (l >= 0 && (1e-10 !== l || "isPause" !== this.data) && (r = !0), this._rawPrevTime = s = !e || t || l === t ? t : 1e-10)), (!this._initted || this._startAt && this._startAt.progress()) && (r = !0);
                    else if (this._totalTime = this._time = t, this._easeType) {
                        var h = t / u
                            , c = this._easeType
                            , f = this._easePower;
                        (1 === c || 3 === c && h >= .5) && (h = 1 - h), 3 === c && (h *= 2), 1 === f ? h *= h : 2 === f ? h *= h * h : 3 === f ? h *= h * h * h : 4 === f && (h *= h * h * h * h), this.ratio = 1 === c ? 1 - h : 2 === c ? h : t / u < .5 ? h / 2 : 1 - h / 2
                    } else this.ratio = this._ease.getRatio(t / u);
                    if (this._time !== a || r) {
                        if (!this._initted) {
                            if (this._init(), !this._initted || this._gc) return;
                            if (!r && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = l, R.push(this), void(this._lazy = [t, e]);
                            this._time && !n ? this.ratio = this._ease.getRatio(this._time / u) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                        }
                        for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, r) : i || (i = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== u || e || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                        this._onUpdate && (t < 0 && this._startAt && -1e-4 !== t && this._startAt.render(t, !0, r), e || (this._time !== a || n || r) && this._callback("onUpdate")), i && (this._gc && !r || (t < 0 && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, !0, r), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[i] && this._callback(i), 0 === u && 1e-10 === this._rawPrevTime && 1e-10 !== s && (this._rawPrevTime = 0)))
                    }
                }, u._kill = function(t, e, r) {
                    if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                    e = "string" != typeof e ? e || this._targets || this.target : A.selector(e) || e;
                    var n, o, s, a, u, l, h, c, f, d = r && this._time && r._startTime === this._startTime && this._timeline === r._timeline
                        , p = this._firstPT;
                    if ((_(e) || I(e)) && "number" != typeof e[0])
                        for (n = e.length; --n > -1;) this._kill(t, e[n], r) && (l = !0);
                    else {
                        if (this._targets) {
                            for (n = this._targets.length; --n > -1;)
                                if (e === this._targets[n]) {
                                    u = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], o = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                    break
                                }
                        } else {
                            if (e !== this.target) return !1;
                            u = this._propLookup, o = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                        }
                        if (u) {
                            if (h = t || u, c = t !== o && "all" !== o && t !== u && ("object" !== i(t) || !t._tempKill), r && (A.onOverwrite || this.vars.onOverwrite)) {
                                for (s in h) u[s] && (f || (f = []), f.push(s));
                                if ((f || !t) && !J(this, r, e, f)) return !1
                            }
                            for (s in h)(a = u[s]) && (d && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s, l = !0), a.pg && a.t._kill(h) && (l = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete u[s]), c && (o[s] = 1);
                            !this._firstPT && this._initted && p && this._enabled(!1, !1)
                        }
                    }
                    return l
                }, u.invalidate = function() {
                    return this._notifyPluginsOfEnabled && A._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -1e-10, this.render(Math.min(0, -this._delay))), this
                }, u._enabled = function(t, e) {
                    if (h || l.wake(), t && this._gc) {
                        var r, n = this._targets;
                        if (n)
                            for (r = n.length; --r > -1;) this._siblings[r] = K(n[r], this, !0);
                        else this._siblings = K(this.target, this, !0)
                    }
                    return C.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && A._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
                }, A.to = function(t, e, r) {
                    return new A(t, e, r)
                }, A.from = function(t, e, r) {
                    return r.runBackwards = !0, r.immediateRender = 0 != r.immediateRender, new A(t, e, r)
                }, A.fromTo = function(t, e, r, n) {
                    return n.startAt = r, n.immediateRender = 0 != n.immediateRender && 0 != r.immediateRender, new A(t, e, n)
                }, A.delayedCall = function(t, e, r, n, i) {
                    return new A(e, 0, {
                        delay: t
                        , onComplete: e
                        , onCompleteParams: r
                        , callbackScope: n
                        , onReverseComplete: e
                        , onReverseCompleteParams: r
                        , immediateRender: !1
                        , lazy: !1
                        , useFrames: i
                        , overwrite: 0
                    })
                }, A.set = function(t, e) {
                    return new A(t, 0, e)
                }, A.getTweensOf = function(t, e) {
                    if (null == t) return [];
                    var r, n, i, o;
                    if (t = "string" != typeof t ? t : A.selector(t) || t, (_(t) || I(t)) && "number" != typeof t[0]) {
                        for (r = t.length, n = []; --r > -1;) n = n.concat(A.getTweensOf(t[r], e));
                        for (r = n.length; --r > -1;)
                            for (o = n[r], i = r; --i > -1;) o === n[i] && n.splice(r, 1)
                    } else if (t._gsTweenID)
                        for (r = (n = K(t).concat()).length; --r > -1;)(n[r]._gc || e && !n[r].isActive()) && n.splice(r, 1);
                    return n || []
                }, A.killTweensOf = A.killDelayedCallsTo = function(t, e, r) {
                    "object" === i(e) && (r = e, e = !1);
                    for (var n = A.getTweensOf(t, e), o = n.length; --o > -1;) n[o]._kill(r, t)
                };
                var $ = v("plugins.TweenPlugin", function(t, e) {
                    this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = $.prototype
                }, !0);
                if (u = $.prototype, $.version = "1.19.0", $.API = 2, u._firstPT = null, u._addTween = F, u.setRatio = N, u._kill = function(t) {
                        var e, r = this._overwriteProps
                            , n = this._firstPT;
                        if (null != t[this._propName]) this._overwriteProps = [];
                        else
                            for (e = r.length; --e > -1;) null != t[r[e]] && r.splice(e, 1);
                        for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                        return !1
                    }, u._mod = u._roundProps = function(t) {
                        for (var e, r = this._firstPT; r;)(e = t[this._propName] || null != r.n && t[r.n.split(this._propName + "_").join("")]) && "function" == typeof e && (2 === r.f ? r.t._applyPT.m = e : r.m = e), r = r._next
                    }, A._onPluginEvent = function(t, e) {
                        var r, n, i, o, s, a = e._firstPT;
                        if ("_onInitAllProps" === t) {
                            for (; a;) {
                                for (s = a._next, n = i; n && n.pr > a.pr;) n = n._next;
                                (a._prev = n ? n._prev : o) ? a._prev._next = a: i = a, (a._next = n) ? n._prev = a : o = a, a = s
                            }
                            a = e._firstPT = i
                        }
                        for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (r = !0), a = a._next;
                        return r
                    }, $.activate = function(t) {
                        for (var e = t.length; --e > -1;) t[e].API === $.API && (U[(new t[e])._propName] = t[e]);
                        return !0
                    }, m.plugin = function(t) {
                        if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                        var e, r = t.propName
                            , n = t.priority || 0
                            , i = t.overwriteProps
                            , o = {
                                init: "_onInitTween"
                                , set: "setRatio"
                                , kill: "_kill"
                                , round: "_mod"
                                , mod: "_mod"
                                , initAll: "_onInitAllProps"
                            }
                            , s = v("plugins." + r.charAt(0).toUpperCase() + r.substr(1) + "Plugin", function() {
                                $.call(this, r, n), this._overwriteProps = i || []
                            }, !0 === t.global)
                            , a = s.prototype = new $(r);
                        for (e in a.constructor = s, s.API = t.API, o) "function" == typeof t[e] && (a[o[e]] = t[e]);
                        return s.version = t.version, $.activate([s]), s
                    }, s = t._gsQueue) {
                    for (a = 0; a < s.length; a++) s[a]();
                    for (u in y) y[u].func || t.console.log("GSAP encountered missing dependency: " + u)
                }
                return h = !1, A
            }(o)
            , a = o.GreenSockGlobals
            , u = a.com.greensock
            , l = u.core.SimpleTimeline
            , h = u.core.Animation
            , c = a.Ease
            , f = a.Linear
            , d = f
            , p = a.Power1
            , _ = a.Power2
            , y = a.Power3
            , m = a.Power4
            , v = a.TweenPlugin
            , g = u.events.EventDispatcher
    }).call(this, r(194)(t), r(17))
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.VERSION = "4.8.2", e.PI_2 = 2 * Math.PI, e.RAD_TO_DEG = 180 / Math.PI, e.DEG_TO_RAD = Math.PI / 180, e.RENDERER_TYPE = {
        UNKNOWN: 0
        , WEBGL: 1
        , CANVAS: 2
    }, e.BLEND_MODES = {
        NORMAL: 0
        , ADD: 1
        , MULTIPLY: 2
        , SCREEN: 3
        , OVERLAY: 4
        , DARKEN: 5
        , LIGHTEN: 6
        , COLOR_DODGE: 7
        , COLOR_BURN: 8
        , HARD_LIGHT: 9
        , SOFT_LIGHT: 10
        , DIFFERENCE: 11
        , EXCLUSION: 12
        , HUE: 13
        , SATURATION: 14
        , COLOR: 15
        , LUMINOSITY: 16
        , NORMAL_NPM: 17
        , ADD_NPM: 18
        , SCREEN_NPM: 19
    }, e.DRAW_MODES = {
        POINTS: 0
        , LINES: 1
        , LINE_LOOP: 2
        , LINE_STRIP: 3
        , TRIANGLES: 4
        , TRIANGLE_STRIP: 5
        , TRIANGLE_FAN: 6
    }, e.SCALE_MODES = {
        LINEAR: 0
        , NEAREST: 1
    }, e.WRAP_MODES = {
        CLAMP: 0
        , REPEAT: 1
        , MIRRORED_REPEAT: 2
    }, e.GC_MODES = {
        AUTO: 0
        , MANUAL: 1
    }, e.URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i, e.DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i, e.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i, e.SHAPES = {
        POLY: 0
        , RECT: 1
        , CIRC: 2
        , ELIP: 3
        , RREC: 4
    }, e.PRECISION = {
        LOW: "lowp"
        , MEDIUM: "mediump"
        , HIGH: "highp"
    }, e.TRANSFORM_MODE = {
        STATIC: 0
        , DYNAMIC: 1
    }, e.TEXT_GRADIENT = {
        LINEAR_VERTICAL: 0
        , LINEAR_HORIZONTAL: 1
    }, e.UPDATE_PRIORITY = {
        INTERACTION: 50
        , HIGH: 25
        , NORMAL: 0
        , LOW: -25
        , UTILITY: -50
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.autoDetectRenderer = e.Application = e.Filter = e.SpriteMaskFilter = e.Quad = e.RenderTarget = e.ObjectRenderer = e.WebGLManager = e.Shader = e.CanvasRenderTarget = e.TextureUvs = e.VideoBaseTexture = e.BaseRenderTexture = e.RenderTexture = e.BaseTexture = e.TextureMatrix = e.Texture = e.Spritesheet = e.CanvasGraphicsRenderer = e.GraphicsRenderer = e.GraphicsData = e.Graphics = e.TextMetrics = e.TextStyle = e.Text = e.SpriteRenderer = e.CanvasTinter = e.CanvasSpriteRenderer = e.Sprite = e.TransformBase = e.TransformStatic = e.Transform = e.Container = e.DisplayObject = e.Bounds = e.glCore = e.WebGLRenderer = e.CanvasRenderer = e.ticker = e.utils = e.settings = void 0;
    var n = r(1);
    Object.keys(n).forEach(function(t) {
        "default" !== t && "__esModule" !== t && Object.defineProperty(e, t, {
            enumerable: !0
            , get: function() {
                return n[t]
            }
        })
    });
    var i = r(5);
    Object.keys(i).forEach(function(t) {
        "default" !== t && "__esModule" !== t && Object.defineProperty(e, t, {
            enumerable: !0
            , get: function() {
                return i[t]
            }
        })
    });
    var o = r(6);
    Object.defineProperty(e, "glCore", {
        enumerable: !0
        , get: function() {
            return z(o).default
        }
    });
    var s = r(26);
    Object.defineProperty(e, "Bounds", {
        enumerable: !0
        , get: function() {
            return z(s).default
        }
    });
    var a = r(49);
    Object.defineProperty(e, "DisplayObject", {
        enumerable: !0
        , get: function() {
            return z(a).default
        }
    });
    var u = r(11);
    Object.defineProperty(e, "Container", {
        enumerable: !0
        , get: function() {
            return z(u).default
        }
    });
    var l = r(51);
    Object.defineProperty(e, "Transform", {
        enumerable: !0
        , get: function() {
            return z(l).default
        }
    });
    var h = r(50);
    Object.defineProperty(e, "TransformStatic", {
        enumerable: !0
        , get: function() {
            return z(h).default
        }
    });
    var c = r(28);
    Object.defineProperty(e, "TransformBase", {
        enumerable: !0
        , get: function() {
            return z(c).default
        }
    });
    var f = r(30);
    Object.defineProperty(e, "Sprite", {
        enumerable: !0
        , get: function() {
            return z(f).default
        }
    });
    var d = r(122);
    Object.defineProperty(e, "CanvasSpriteRenderer", {
        enumerable: !0
        , get: function() {
            return z(d).default
        }
    });
    var p = r(34);
    Object.defineProperty(e, "CanvasTinter", {
        enumerable: !0
        , get: function() {
            return z(p).default
        }
    });
    var _ = r(125);
    Object.defineProperty(e, "SpriteRenderer", {
        enumerable: !0
        , get: function() {
            return z(_).default
        }
    });
    var y = r(141);
    Object.defineProperty(e, "Text", {
        enumerable: !0
        , get: function() {
            return z(y).default
        }
    });
    var m = r(65);
    Object.defineProperty(e, "TextStyle", {
        enumerable: !0
        , get: function() {
            return z(m).default
        }
    });
    var v = r(66);
    Object.defineProperty(e, "TextMetrics", {
        enumerable: !0
        , get: function() {
            return z(v).default
        }
    });
    var g = r(143);
    Object.defineProperty(e, "Graphics", {
        enumerable: !0
        , get: function() {
            return z(g).default
        }
    });
    var b = r(67);
    Object.defineProperty(e, "GraphicsData", {
        enumerable: !0
        , get: function() {
            return z(b).default
        }
    });
    var T = r(145);
    Object.defineProperty(e, "GraphicsRenderer", {
        enumerable: !0
        , get: function() {
            return z(T).default
        }
    });
    var x = r(152);
    Object.defineProperty(e, "CanvasGraphicsRenderer", {
        enumerable: !0
        , get: function() {
            return z(x).default
        }
    });
    var w = r(153);
    Object.defineProperty(e, "Spritesheet", {
        enumerable: !0
        , get: function() {
            return z(w).default
        }
    });
    var E = r(8);
    Object.defineProperty(e, "Texture", {
        enumerable: !0
        , get: function() {
            return z(E).default
        }
    });
    var S = r(63);
    Object.defineProperty(e, "TextureMatrix", {
        enumerable: !0
        , get: function() {
            return z(S).default
        }
    });
    var O = r(10);
    Object.defineProperty(e, "BaseTexture", {
        enumerable: !0
        , get: function() {
            return z(O).default
        }
    });
    var P = r(33);
    Object.defineProperty(e, "RenderTexture", {
        enumerable: !0
        , get: function() {
            return z(P).default
        }
    });
    var C = r(58);
    Object.defineProperty(e, "BaseRenderTexture", {
        enumerable: !0
        , get: function() {
            return z(C).default
        }
    });
    var M = r(55);
    Object.defineProperty(e, "VideoBaseTexture", {
        enumerable: !0
        , get: function() {
            return z(M).default
        }
    });
    var A = r(56);
    Object.defineProperty(e, "TextureUvs", {
        enumerable: !0
        , get: function() {
            return z(A).default
        }
    });
    var I = r(59);
    Object.defineProperty(e, "CanvasRenderTarget", {
        enumerable: !0
        , get: function() {
            return z(I).default
        }
    });
    var R = r(14);
    Object.defineProperty(e, "Shader", {
        enumerable: !0
        , get: function() {
            return z(R).default
        }
    });
    var D = r(13);
    Object.defineProperty(e, "WebGLManager", {
        enumerable: !0
        , get: function() {
            return z(D).default
        }
    });
    var k = r(18);
    Object.defineProperty(e, "ObjectRenderer", {
        enumerable: !0
        , get: function() {
            return z(k).default
        }
    });
    var L = r(20);
    Object.defineProperty(e, "RenderTarget", {
        enumerable: !0
        , get: function() {
            return z(L).default
        }
    });
    var N = r(64);
    Object.defineProperty(e, "Quad", {
        enumerable: !0
        , get: function() {
            return z(N).default
        }
    });
    var j = r(61);
    Object.defineProperty(e, "SpriteMaskFilter", {
        enumerable: !0
        , get: function() {
            return z(j).default
        }
    });
    var F = r(62);
    Object.defineProperty(e, "Filter", {
        enumerable: !0
        , get: function() {
            return z(F).default
        }
    });
    var B = r(68);
    Object.defineProperty(e, "Application", {
        enumerable: !0
        , get: function() {
            return z(B).default
        }
    });
    var U = r(69);
    Object.defineProperty(e, "autoDetectRenderer", {
        enumerable: !0
        , get: function() {
            return U.autoDetectRenderer
        }
    });
    var G = Y(r(3))
        , X = Y(r(32))
        , W = z(r(4))
        , H = z(r(12))
        , V = z(r(19));

    function Y(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e.default = t, e
    }

    function z(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    e.settings = W.default, e.utils = G, e.ticker = X, e.CanvasRenderer = H.default, e.WebGLRenderer = V.default
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.premultiplyBlendMode = e.BaseTextureCache = e.TextureCache = e.earcut = e.mixins = e.pluginTarget = e.EventEmitter = e.removeItems = e.isMobile = void 0, e.uid = function() {
        return ++p
    }, e.hex2rgb = function(t, e) {
        return (e = e || [])[0] = (t >> 16 & 255) / 255, e[1] = (t >> 8 & 255) / 255, e[2] = (255 & t) / 255, e
    }, e.hex2string = function(t) {
        return t = t.toString(16), "#" + ("000000".substr(0, 6 - t.length) + t)
    }, e.rgb2hex = function(t) {
        return (255 * t[0] << 16) + (255 * t[1] << 8) + (255 * t[2] | 0)
    }, e.getResolutionOfUrl = function(t, e) {
        var r = i.default.RETINA_PREFIX.exec(t);
        return r ? parseFloat(r[1]) : void 0 !== e ? e : 1
    }, e.decomposeDataUri = function(t) {
        var e = n.DATA_URI.exec(t);
        if (e) return {
            mediaType: e[1] ? e[1].toLowerCase() : void 0
            , subType: e[2] ? e[2].toLowerCase() : void 0
            , charset: e[3] ? e[3].toLowerCase() : void 0
            , encoding: e[4] ? e[4].toLowerCase() : void 0
            , data: e[5]
        }
    }, e.getUrlFileExtension = function(t) {
        var e = n.URL_FILE_EXTENSION.exec(t);
        if (e) return e[1].toLowerCase()
    }, e.getSvgSize = function(t) {
        var e = n.SVG_SIZE.exec(t)
            , r = {};
        return e && (r[e[1]] = Math.round(parseFloat(e[3])), r[e[5]] = Math.round(parseFloat(e[7]))), r
    }, e.skipHello = function() {
        _ = !0
    }, e.sayHello = function(t) {
        _ || (navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? window.console.log.apply(console, ["\n %c %c %c PixiJS " + n.VERSION + " - \u2730 " + t + " \u2730  %c  %c  http://www.pixijs.com/  %c %c \u2665%c\u2665%c\u2665 \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"]) : window.console && window.console.log("PixiJS " + n.VERSION + " - " + t + " - http://www.pixijs.com/"), _ = !0)
    }, e.isWebGLSupported = function() {
        var t = {
            stencil: !0
            , failIfMajorPerformanceCaveat: !0
        };
        try {
            if (!window.WebGLRenderingContext) return !1;
            var e = document.createElement("canvas")
                , r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t)
                , n = !(!r || !r.getContextAttributes().stencil);
            if (r) {
                var i = r.getExtension("WEBGL_lose_context");
                i && i.loseContext()
            }
            return r = null, n
        } catch (t) {
            return !1
        }
    }, e.sign = function(t) {
        return 0 === t ? 0 : t < 0 ? -1 : 1
    }, e.destroyTextureCache = function() {
        var t = void 0;
        for (t in y) y[t].destroy();
        for (t in m) m[t].destroy()
    }, e.clearTextureCache = function() {
        var t = void 0;
        for (t in y) delete y[t];
        for (t in m) delete m[t]
    }, e.correctBlendMode = function(t, e) {
        return v[e ? 1 : 0][t]
    }, e.premultiplyTint = function(t, e) {
        if (1 === e) return (255 * e << 24) + t;
        if (0 === e) return 0;
        var r = t >> 16 & 255
            , n = t >> 8 & 255;
        return (255 * e << 24) + ((r = r * e + .5 | 0) << 16) + ((n = n * e + .5 | 0) << 8) + ((255 & t) * e + .5 | 0)
    }, e.premultiplyRgba = function(t, e, r, n) {
        return r = r || new Float32Array(4), n || void 0 === n ? (r[0] = t[0] * e, r[1] = t[1] * e, r[2] = t[2] * e) : (r[0] = t[0], r[1] = t[1], r[2] = t[2]), r[3] = e, r
    }, e.premultiplyTintToRgba = function(t, e, r, n) {
        return (r = r || new Float32Array(4))[0] = (t >> 16 & 255) / 255, r[1] = (t >> 8 & 255) / 255, r[2] = (255 & t) / 255, (n || void 0 === n) && (r[0] *= e, r[1] *= e, r[2] *= e), r[3] = e, r
    };
    var n = r(1)
        , i = d(r(4))
        , o = d(r(9))
        , s = d(r(110))
        , a = f(r(111))
        , u = f(r(27))
        , l = d(r(112))
        , h = d(r(113))
        , c = d(r(29));

    function f(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e.default = t, e
    }

    function d(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var p = 0
        , _ = !1;
    e.isMobile = u, e.removeItems = l.default, e.EventEmitter = o.default, e.pluginTarget = s.default, e.mixins = a, e.earcut = c.default;
    var y = e.TextureCache = Object.create(null)
        , m = e.BaseTextureCache = Object.create(null)
        , v = e.premultiplyBlendMode = (0, h.default)()
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = o(r(108))
        , i = o(r(109));

    function o(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    e.default = {
        TARGET_FPMS: .06
        , MIPMAP_TEXTURES: !0
        , RESOLUTION: 1
        , FILTER_RESOLUTION: 1
        , SPRITE_MAX_TEXTURES: (0, n.default)(32)
        , SPRITE_BATCH_SIZE: 4096
        , RETINA_PREFIX: /@([0-9\.]+)x/
        , RENDER_OPTIONS: {
            view: null
            , antialias: !1
            , forceFXAA: !1
            , autoResize: !1
            , transparent: !1
            , backgroundColor: 0
            , clearBeforeRender: !0
            , preserveDrawingBuffer: !1
            , roundPixels: !1
            , width: 800
            , height: 600
            , legacy: !1
        }
        , TRANSFORM_MODE: 0
        , GC_MODE: 0
        , GC_MAX_IDLE: 3600
        , GC_MAX_CHECK_COUNT: 600
        , WRAP_MODE: 0
        , SCALE_MODE: 0
        , PRECISION_VERTEX: "highp"
        , PRECISION_FRAGMENT: "mediump"
        , CAN_UPLOAD_SAME_BUFFER: (0, i.default)()
        , MESH_CANVAS_PADDING: 0
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(22);
    Object.defineProperty(e, "Point", {
        enumerable: !0
        , get: function() {
            return f(n).default
        }
    });
    var i = r(38);
    Object.defineProperty(e, "ObservablePoint", {
        enumerable: !0
        , get: function() {
            return f(i).default
        }
    });
    var o = r(23);
    Object.defineProperty(e, "Matrix", {
        enumerable: !0
        , get: function() {
            return f(o).default
        }
    });
    var s = r(39);
    Object.defineProperty(e, "GroupD8", {
        enumerable: !0
        , get: function() {
            return f(s).default
        }
    });
    var a = r(98);
    Object.defineProperty(e, "Circle", {
        enumerable: !0
        , get: function() {
            return f(a).default
        }
    });
    var u = r(99);
    Object.defineProperty(e, "Ellipse", {
        enumerable: !0
        , get: function() {
            return f(u).default
        }
    });
    var l = r(100);
    Object.defineProperty(e, "Polygon", {
        enumerable: !0
        , get: function() {
            return f(l).default
        }
    });
    var h = r(24);
    Object.defineProperty(e, "Rectangle", {
        enumerable: !0
        , get: function() {
            return f(h).default
        }
    });
    var c = r(101);

    function f(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "RoundedRectangle", {
        enumerable: !0
        , get: function() {
            return f(c).default
        }
    })
}, function(t, e, r) {
    var n = {
        createContext: r(102)
        , setVertexAttribArrays: r(40)
        , GLBuffer: r(103)
        , GLFramebuffer: r(104)
        , GLShader: r(105)
        , GLTexture: r(41)
        , VertexArrayObject: r(106)
        , shader: r(107)
    };
    t.exports && (t.exports = n), "undefined" != typeof window && (window.PIXI = window.PIXI || {}, window.PIXI.glCore = n)
}, function(t, e, r) {
    (function(t) {
        function r(t, e) {
            for (var r = 0, n = t.length - 1; n >= 0; n--) {
                var i = t[n];
                "." === i ? t.splice(n, 1) : ".." === i ? (t.splice(n, 1), r++) : r && (t.splice(n, 1), r--)
            }
            if (e)
                for (; r--; r) t.unshift("..");
            return t
        }
        var n = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
            , i = function(t) {
                return n.exec(t).slice(1)
            };

        function o(t, e) {
            if (t.filter) return t.filter(e);
            for (var r = [], n = 0; n < t.length; n++) e(t[n], n, t) && r.push(t[n]);
            return r
        }
        e.resolve = function() {
            for (var e = "", n = !1, i = arguments.length - 1; i >= -1 && !n; i--) {
                var s = i >= 0 ? arguments[i] : t.cwd();
                if ("string" != typeof s) throw new TypeError("Arguments to path.resolve must be strings");
                s && (e = s + "/" + e, n = "/" === s.charAt(0))
            }
            return e = r(o(e.split("/"), function(t) {
                return !!t
            }), !n).join("/"), (n ? "/" : "") + e || "."
        }, e.normalize = function(t) {
            var n = e.isAbsolute(t)
                , i = "/" === s(t, -1);
            return (t = r(o(t.split("/"), function(t) {
                return !!t
            }), !n).join("/")) || n || (t = "."), t && i && (t += "/"), (n ? "/" : "") + t
        }, e.isAbsolute = function(t) {
            return "/" === t.charAt(0)
        }, e.join = function() {
            var t = Array.prototype.slice.call(arguments, 0);
            return e.normalize(o(t, function(t, e) {
                if ("string" != typeof t) throw new TypeError("Arguments to path.join must be strings");
                return t
            }).join("/"))
        }, e.relative = function(t, r) {
            function n(t) {
                for (var e = 0; e < t.length && "" === t[e]; e++);
                for (var r = t.length - 1; r >= 0 && "" === t[r]; r--);
                return e > r ? [] : t.slice(e, r - e + 1)
            }
            t = e.resolve(t).substr(1), r = e.resolve(r).substr(1);
            for (var i = n(t.split("/")), o = n(r.split("/")), s = Math.min(i.length, o.length), a = s, u = 0; u < s; u++)
                if (i[u] !== o[u]) {
                    a = u;
                    break
                } var l = [];
            for (u = a; u < i.length; u++) l.push("..");
            return (l = l.concat(o.slice(a))).join("/")
        }, e.sep = "/", e.delimiter = ":", e.dirname = function(t) {
            var e = i(t)
                , r = e[0]
                , n = e[1];
            return r || n ? (n && (n = n.substr(0, n.length - 1)), r + n) : "."
        }, e.basename = function(t, e) {
            var r = i(t)[2];
            return e && r.substr(-1 * e.length) === e && (r = r.substr(0, r.length - e.length)), r
        }, e.extname = function(t) {
            return i(t)[3]
        };
        var s = "b" === "ab".substr(-1) ? function(t, e, r) {
            return t.substr(e, r)
        } : function(t, e, r) {
            return e < 0 && (e = t.length + e), t.substr(e, r)
        }
    }).call(this, r(128))
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = f(r(10))
        , s = f(r(55))
        , a = f(r(56))
        , u = f(r(9))
        , l = r(5)
        , h = r(3)
        , c = f(r(4));

    function f(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var d = function(t) {
        function e(r, i, o, s, a, u) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var h = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this));
            if (h.noFrame = !1, i || (h.noFrame = !0, i = new l.Rectangle(0, 0, 1, 1)), r instanceof e && (r = r.baseTexture), h.baseTexture = r, h._frame = i, h.trim = s, h.valid = !1, h.requiresUpdate = !1, h._uvs = null, h.orig = o || i, h._rotate = Number(a || 0), !0 === a) h._rotate = 2;
            else if (h._rotate % 2 != 0) throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");
            return r.hasLoaded ? (h.noFrame && (i = new l.Rectangle(0, 0, r.width, r.height), r.on("update", h.onBaseTextureUpdated, h)), h.frame = i) : r.once("loaded", h.onBaseTextureLoaded, h), h.defaultAnchor = u ? new l.Point(u.x, u.y) : new l.Point(0, 0), h._updateID = 0, h.transform = null, h.textureCacheIds = [], h
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.update = function() {
            this.baseTexture.update()
        }, e.prototype.onBaseTextureLoaded = function(t) {
            this._updateID++, this.frame = this.noFrame ? new l.Rectangle(0, 0, t.width, t.height) : this._frame, this.baseTexture.on("update", this.onBaseTextureUpdated, this), this.emit("update", this)
        }, e.prototype.onBaseTextureUpdated = function(t) {
            this._updateID++, this._frame.width = t.width, this._frame.height = t.height, this.emit("update", this)
        }, e.prototype.destroy = function(t) {
            this.baseTexture && (t && (h.TextureCache[this.baseTexture.imageUrl] && e.removeFromCache(this.baseTexture.imageUrl), this.baseTexture.destroy()), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture.off("loaded", this.onBaseTextureLoaded, this), this.baseTexture = null), this._frame = null, this._uvs = null, this.trim = null, this.orig = null, this.valid = !1, e.removeFromCache(this), this.textureCacheIds = null
        }, e.prototype.clone = function() {
            return new e(this.baseTexture, this.frame, this.orig, this.trim, this.rotate)
        }, e.prototype._updateUvs = function() {
            this._uvs || (this._uvs = new a.default), this._uvs.set(this._frame, this.baseTexture, this.rotate), this._updateID++
        }, e.fromImage = function(t, r, n, i) {
            var s = h.TextureCache[t];
            return s || (s = new e(o.default.fromImage(t, r, n, i)), e.addToCache(s, t)), s
        }, e.fromFrame = function(t) {
            var e = h.TextureCache[t];
            if (!e) throw new Error('The frameId "' + t + '" does not exist in the texture cache');
            return e
        }, e.fromCanvas = function(t, r) {
            return new e(o.default.fromCanvas(t, r, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "canvas"))
        }, e.fromVideo = function(t, r) {
            return "string" == typeof t ? e.fromVideoUrl(t, r) : new e(s.default.fromVideo(t, r))
        }, e.fromVideoUrl = function(t, r) {
            return new e(s.default.fromUrl(t, r))
        }, e.from = function(t) {
            return "string" == typeof t ? h.TextureCache[t] || (null !== t.match(/\.(mp4|webm|ogg|h264|avi|mov)$/) ? e.fromVideoUrl(t) : e.fromImage(t)) : t instanceof HTMLImageElement ? new e(o.default.from(t)) : t instanceof HTMLCanvasElement ? e.fromCanvas(t, c.default.SCALE_MODE, "HTMLCanvasElement") : t instanceof HTMLVideoElement ? e.fromVideo(t) : t instanceof o.default ? new e(t) : t
        }, e.fromLoader = function(t, r, n) {
            var i = new o.default(t, void 0, (0, h.getResolutionOfUrl)(r))
                , s = new e(i);
            return i.imageUrl = r, n || (n = r), o.default.addToCache(s.baseTexture, n), e.addToCache(s, n), n !== r && (o.default.addToCache(s.baseTexture, r), e.addToCache(s, r)), s
        }, e.addToCache = function(t, e) {
            e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), h.TextureCache[e] && console.warn("Texture added to the cache with an id [" + e + "] that already had an entry"), h.TextureCache[e] = t)
        }, e.removeFromCache = function(t) {
            if ("string" == typeof t) {
                var e = h.TextureCache[t];
                if (e) {
                    var r = e.textureCacheIds.indexOf(t);
                    return r > -1 && e.textureCacheIds.splice(r, 1), delete h.TextureCache[t], e
                }
            } else if (t && t.textureCacheIds) {
                for (var n = 0; n < t.textureCacheIds.length; ++n) h.TextureCache[t.textureCacheIds[n]] === t && delete h.TextureCache[t.textureCacheIds[n]];
                return t.textureCacheIds.length = 0, t
            }
            return null
        }, i(e, [{
            key: "frame"
            , get: function() {
                return this._frame
            }
            , set: function(t) {
                this._frame = t, this.noFrame = !1;
                var e = t.x
                    , r = t.y
                    , n = t.width
                    , i = t.height
                    , o = e + n > this.baseTexture.width
                    , s = r + i > this.baseTexture.height;
                if (o || s) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: X: " + e + " + " + n + " = " + (e + n) + " > " + this.baseTexture.width + " " + (o && s ? "and" : "or") + " Y: " + r + " + " + i + " = " + (r + i) + " > " + this.baseTexture.height);
                this.valid = n && i && this.baseTexture.hasLoaded, this.trim || this.rotate || (this.orig = t), this.valid && this._updateUvs()
            }
        }, {
            key: "rotate"
            , get: function() {
                return this._rotate
            }
            , set: function(t) {
                this._rotate = t, this.valid && this._updateUvs()
            }
        }, {
            key: "width"
            , get: function() {
                return this.orig.width
            }
        }, {
            key: "height"
            , get: function() {
                return this.orig.height
            }
        }]), e
    }(u.default);

    function p(t) {
        t.destroy = function() {}, t.on = function() {}, t.once = function() {}, t.emit = function() {}
    }
    e.default = d, d.EMPTY = new d(new o.default), p(d.EMPTY), p(d.EMPTY.baseTexture), d.WHITE = function() {
        var t = document.createElement("canvas");
        t.width = 10, t.height = 10;
        var e = t.getContext("2d");
        return e.fillStyle = "white", e.fillRect(0, 0, 10, 10), new d(new o.default(t))
    }(), p(d.WHITE), p(d.WHITE.baseTexture)
}, function(t, e, r) {
    "use strict";
    var n = Object.prototype.hasOwnProperty
        , i = "~";

    function o() {}

    function s(t, e, r) {
        this.fn = t, this.context = e, this.once = r || !1
    }

    function a() {
        this._events = new o, this._eventsCount = 0
    }
    Object.create && (o.prototype = Object.create(null), (new o).__proto__ || (i = !1)), a.prototype.eventNames = function() {
        var t, e, r = [];
        if (0 === this._eventsCount) return r;
        for (e in t = this._events) n.call(t, e) && r.push(i ? e.slice(1) : e);
        return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(t)) : r
    }, a.prototype.listeners = function(t, e) {
        var r = this._events[i ? i + t : t];
        if (e) return !!r;
        if (!r) return [];
        if (r.fn) return [r.fn];
        for (var n = 0, o = r.length, s = new Array(o); n < o; n++) s[n] = r[n].fn;
        return s
    }, a.prototype.emit = function(t, e, r, n, o, s) {
        var a = i ? i + t : t;
        if (!this._events[a]) return !1;
        var u, l, h = this._events[a]
            , c = arguments.length;
        if (h.fn) {
            switch (h.once && this.removeListener(t, h.fn, void 0, !0), c) {
                case 1:
                    return h.fn.call(h.context), !0;
                case 2:
                    return h.fn.call(h.context, e), !0;
                case 3:
                    return h.fn.call(h.context, e, r), !0;
                case 4:
                    return h.fn.call(h.context, e, r, n), !0;
                case 5:
                    return h.fn.call(h.context, e, r, n, o), !0;
                case 6:
                    return h.fn.call(h.context, e, r, n, o, s), !0
            }
            for (l = 1, u = new Array(c - 1); l < c; l++) u[l - 1] = arguments[l];
            h.fn.apply(h.context, u)
        } else {
            var f, d = h.length;
            for (l = 0; l < d; l++) switch (h[l].once && this.removeListener(t, h[l].fn, void 0, !0), c) {
                case 1:
                    h[l].fn.call(h[l].context);
                    break;
                case 2:
                    h[l].fn.call(h[l].context, e);
                    break;
                case 3:
                    h[l].fn.call(h[l].context, e, r);
                    break;
                case 4:
                    h[l].fn.call(h[l].context, e, r, n);
                    break;
                default:
                    if (!u)
                        for (f = 1, u = new Array(c - 1); f < c; f++) u[f - 1] = arguments[f];
                    h[l].fn.apply(h[l].context, u)
            }
        }
        return !0
    }, a.prototype.on = function(t, e, r) {
        var n = new s(e, r || this)
            , o = i ? i + t : t;
        return this._events[o] ? this._events[o].fn ? this._events[o] = [this._events[o], n] : this._events[o].push(n) : (this._events[o] = n, this._eventsCount++), this
    }, a.prototype.once = function(t, e, r) {
        var n = new s(e, r || this, !0)
            , o = i ? i + t : t;
        return this._events[o] ? this._events[o].fn ? this._events[o] = [this._events[o], n] : this._events[o].push(n) : (this._events[o] = n, this._eventsCount++), this
    }, a.prototype.removeListener = function(t, e, r, n) {
        var s = i ? i + t : t;
        if (!this._events[s]) return this;
        if (!e) return 0 == --this._eventsCount ? this._events = new o : delete this._events[s], this;
        var a = this._events[s];
        if (a.fn) a.fn !== e || n && !a.once || r && a.context !== r || (0 == --this._eventsCount ? this._events = new o : delete this._events[s]);
        else {
            for (var u = 0, l = [], h = a.length; u < h; u++)(a[u].fn !== e || n && !a[u].once || r && a[u].context !== r) && l.push(a[u]);
            l.length ? this._events[s] = 1 === l.length ? l[0] : l : 0 == --this._eventsCount ? this._events = new o : delete this._events[s]
        }
        return this
    }, a.prototype.removeAllListeners = function(t) {
        var e;
        return t ? this._events[e = i ? i + t : t] && (0 == --this._eventsCount ? this._events = new o : delete this._events[e]) : (this._events = new o, this._eventsCount = 0), this
    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prototype.setMaxListeners = function() {
        return this
    }, a.prefixed = i, a.EventEmitter = a, t.exports = a
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = r(3)
        , o = l(r(4))
        , s = l(r(9))
        , a = l(r(52))
        , u = l(r(31));

    function l(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var h = function(t) {
        function e(r, s, a) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var u = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this));
            return u.uid = (0, i.uid)(), u.touched = 0, u.resolution = a || o.default.RESOLUTION, u.width = 100, u.height = 100, u.realWidth = 100, u.realHeight = 100, u.scaleMode = void 0 !== s ? s : o.default.SCALE_MODE, u.hasLoaded = !1, u.isLoading = !1, u.source = null, u.origSource = null, u.imageType = null, u.sourceScale = 1, u.premultipliedAlpha = !0, u.imageUrl = null, u.isPowerOfTwo = !1, u.mipmap = o.default.MIPMAP_TEXTURES, u.wrapMode = o.default.WRAP_MODE, u._glTextures = {}, u._enabled = 0, u._virtalBoundId = -1, u._destroyed = !1, u.textureCacheIds = [], r && u.loadSource(r), u
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.update = function() {
            "svg" !== this.imageType && (this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width, this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height, this._updateDimensions()), this.emit("update", this)
        }, e.prototype._updateDimensions = function() {
            this.width = this.realWidth / this.resolution, this.height = this.realHeight / this.resolution, this.isPowerOfTwo = u.default.isPow2(this.realWidth) && u.default.isPow2(this.realHeight)
        }, e.prototype.loadSource = function(t) {
            var e = this.isLoading;
            this.hasLoaded = !1, this.isLoading = !1, e && this.source && (this.source.onload = null, this.source.onerror = null);
            var r = !this.source;
            if (this.source = t, (t.src && t.complete || t.getContext) && t.width && t.height) this._updateImageType(), "svg" === this.imageType ? this._loadSvgSource() : this._sourceLoaded(), r && this.emit("loaded", this);
            else if (!t.getContext) {
                this.isLoading = !0;
                var n = this;
                if (t.onload = function() {
                        n._updateImageType(), t.onload = null, t.onerror = null, n.isLoading && (n.isLoading = !1, n._sourceLoaded(), "svg" !== n.imageType ? n.emit("loaded", n) : n._loadSvgSource())
                    }, t.onerror = function() {
                        t.onload = null, t.onerror = null, n.isLoading && (n.isLoading = !1, n.emit("error", n))
                    }, t.complete && t.src) {
                    if (t.onload = null, t.onerror = null, "svg" === n.imageType) return void n._loadSvgSource();
                    this.isLoading = !1, t.width && t.height ? (this._sourceLoaded(), e && this.emit("loaded", this)) : e && this.emit("error", this)
                }
            }
        }, e.prototype._updateImageType = function() {
            if (this.imageUrl) {
                var t = (0, i.decomposeDataUri)(this.imageUrl)
                    , e = void 0;
                if (t && "image" === t.mediaType) {
                    var r = t.subType.split("+")[0];
                    if (!(e = (0, i.getUrlFileExtension)("." + r))) throw new Error("Invalid image type in data URI.")
                } else(e = (0, i.getUrlFileExtension)(this.imageUrl)) || (e = "png");
                this.imageType = e
            }
        }, e.prototype._loadSvgSource = function() {
            if ("svg" === this.imageType) {
                var t = (0, i.decomposeDataUri)(this.imageUrl);
                t ? this._loadSvgSourceUsingDataUri(t) : this._loadSvgSourceUsingXhr()
            }
        }, e.prototype._loadSvgSourceUsingDataUri = function(t) {
            var e = void 0;
            if ("base64" === t.encoding) {
                if (!atob) throw new Error("Your browser doesn't support base64 conversions.");
                e = atob(t.data)
            } else e = t.data;
            this._loadSvgSourceUsingString(e)
        }, e.prototype._loadSvgSourceUsingXhr = function() {
            var t = this
                , e = new XMLHttpRequest;
            e.onload = function() {
                if (e.readyState !== e.DONE || 200 !== e.status) throw new Error("Failed to load SVG using XHR.");
                t._loadSvgSourceUsingString(e.response)
            }, e.onerror = function() {
                return t.emit("error", t)
            }, e.open("GET", this.imageUrl, !0), e.send()
        }, e.prototype._loadSvgSourceUsingString = function(t) {
            var r = (0, i.getSvgSize)(t)
                , n = r.width
                , o = r.height;
            if (!n || !o) throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
            this.realWidth = Math.round(n * this.sourceScale), this.realHeight = Math.round(o * this.sourceScale), this._updateDimensions();
            var s = document.createElement("canvas");
            s.width = this.realWidth, s.height = this.realHeight, s._pixiId = "canvas_" + (0, i.uid)(), s.getContext("2d").drawImage(this.source, 0, 0, n, o, 0, 0, this.realWidth, this.realHeight), this.origSource = this.source, this.source = s, e.addToCache(this, s._pixiId), this.isLoading = !1, this._sourceLoaded(), this.emit("loaded", this)
        }, e.prototype._sourceLoaded = function() {
            this.hasLoaded = !0, this.update()
        }, e.prototype.destroy = function() {
            this.imageUrl && (delete i.TextureCache[this.imageUrl], this.imageUrl = null, navigator.isCocoonJS || (this.source.src = "")), this.source = null, this.dispose(), e.removeFromCache(this), this.textureCacheIds = null, this._destroyed = !0
        }, e.prototype.dispose = function() {
            this.emit("dispose", this)
        }, e.prototype.updateSourceImage = function(t) {
            this.source.src = t, this.loadSource(this.source)
        }, e.fromImage = function(t, r, n, o) {
            var s = i.BaseTextureCache[t];
            if (!s) {
                var u = new Image;
                void 0 === r && 0 !== t.indexOf("data:") ? u.crossOrigin = (0, a.default)(t) : r && (u.crossOrigin = "string" == typeof r ? r : "anonymous"), (s = new e(u, n)).imageUrl = t, o && (s.sourceScale = o), s.resolution = (0, i.getResolutionOfUrl)(t), u.src = t, e.addToCache(s, t)
            }
            return s
        }, e.fromCanvas = function(t, r) {
            t._pixiId || (t._pixiId = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "canvas") + "_" + (0, i.uid)());
            var n = i.BaseTextureCache[t._pixiId];
            return n || (n = new e(t, r), e.addToCache(n, t._pixiId)), n
        }, e.from = function(t, r, n) {
            if ("string" == typeof t) return e.fromImage(t, void 0, r, n);
            if (t instanceof HTMLImageElement) {
                var o = t.src
                    , s = i.BaseTextureCache[o];
                return s || ((s = new e(t, r)).imageUrl = o, n && (s.sourceScale = n), s.resolution = (0, i.getResolutionOfUrl)(o), e.addToCache(s, o)), s
            }
            return t instanceof HTMLCanvasElement ? e.fromCanvas(t, r) : t
        }, e.addToCache = function(t, e) {
            e && (-1 === t.textureCacheIds.indexOf(e) && t.textureCacheIds.push(e), i.BaseTextureCache[e] && console.warn("BaseTexture added to the cache with an id [" + e + "] that already had an entry"), i.BaseTextureCache[e] = t)
        }, e.removeFromCache = function(t) {
            if ("string" == typeof t) {
                var e = i.BaseTextureCache[t];
                if (e) {
                    var r = e.textureCacheIds.indexOf(t);
                    return r > -1 && e.textureCacheIds.splice(r, 1), delete i.BaseTextureCache[t], e
                }
            } else if (t && t.textureCacheIds) {
                for (var n = 0; n < t.textureCacheIds.length; ++n) delete i.BaseTextureCache[t.textureCacheIds[n]];
                return t.textureCacheIds.length = 0, t
            }
            return null
        }, e
    }(s.default);
    e.default = h
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = r(3)
        , s = function(t) {
            function e() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var r = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this));
                return r.children = [], r
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.onChildrenChange = function() {}, e.prototype.addChild = function(t) {
                var e = arguments.length;
                if (e > 1)
                    for (var r = 0; r < e; r++) this.addChild(arguments[r]);
                else t.parent && t.parent.removeChild(t), t.parent = this, t.transform._parentID = -1, this.children.push(t), this._boundsID++, this.onChildrenChange(this.children.length - 1), t.emit("added", this);
                return t
            }, e.prototype.addChildAt = function(t, e) {
                if (e < 0 || e > this.children.length) throw new Error(t + "addChildAt: The index " + e + " supplied is out of bounds " + this.children.length);
                return t.parent && t.parent.removeChild(t), t.parent = this, t.transform._parentID = -1, this.children.splice(e, 0, t), this._boundsID++, this.onChildrenChange(e), t.emit("added", this), t
            }, e.prototype.swapChildren = function(t, e) {
                if (t !== e) {
                    var r = this.getChildIndex(t)
                        , n = this.getChildIndex(e);
                    this.children[r] = e, this.children[n] = t, this.onChildrenChange(r < n ? r : n)
                }
            }, e.prototype.getChildIndex = function(t) {
                var e = this.children.indexOf(t);
                if (-1 === e) throw new Error("The supplied DisplayObject must be a child of the caller");
                return e
            }, e.prototype.setChildIndex = function(t, e) {
                if (e < 0 || e >= this.children.length) throw new Error("The index " + e + " supplied is out of bounds " + this.children.length);
                var r = this.getChildIndex(t);
                (0, o.removeItems)(this.children, r, 1), this.children.splice(e, 0, t), this.onChildrenChange(e)
            }, e.prototype.getChildAt = function(t) {
                if (t < 0 || t >= this.children.length) throw new Error("getChildAt: Index (" + t + ") does not exist.");
                return this.children[t]
            }, e.prototype.removeChild = function(t) {
                var e = arguments.length;
                if (e > 1)
                    for (var r = 0; r < e; r++) this.removeChild(arguments[r]);
                else {
                    var n = this.children.indexOf(t);
                    if (-1 === n) return null;
                    t.parent = null, t.transform._parentID = -1, (0, o.removeItems)(this.children, n, 1), this._boundsID++, this.onChildrenChange(n), t.emit("removed", this)
                }
                return t
            }, e.prototype.removeChildAt = function(t) {
                var e = this.getChildAt(t);
                return e.parent = null, e.transform._parentID = -1, (0, o.removeItems)(this.children, t, 1), this._boundsID++, this.onChildrenChange(t), e.emit("removed", this), e
            }, e.prototype.removeChildren = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                    , e = arguments[1]
                    , r = "number" == typeof e ? e : this.children.length
                    , n = r - t
                    , i = void 0;
                if (n > 0 && n <= r) {
                    i = this.children.splice(t, n);
                    for (var o = 0; o < i.length; ++o) i[o].parent = null, i[o].transform && (i[o].transform._parentID = -1);
                    this._boundsID++, this.onChildrenChange(t);
                    for (var s = 0; s < i.length; ++s) i[s].emit("removed", this);
                    return i
                }
                if (0 === n && 0 === this.children.length) return [];
                throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
            }, e.prototype.updateTransform = function() {
                this._boundsID++, this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha;
                for (var t = 0, e = this.children.length; t < e; ++t) {
                    var r = this.children[t];
                    r.visible && r.updateTransform()
                }
            }, e.prototype.calculateBounds = function() {
                this._bounds.clear(), this._calculateBounds();
                for (var t = 0; t < this.children.length; t++) {
                    var e = this.children[t];
                    e.visible && e.renderable && (e.calculateBounds(), e._mask ? (e._mask.calculateBounds(), this._bounds.addBoundsMask(e._bounds, e._mask._bounds)) : e.filterArea ? this._bounds.addBoundsArea(e._bounds, e.filterArea) : this._bounds.addBounds(e._bounds))
                }
                this._lastBoundsID = this._boundsID
            }, e.prototype._calculateBounds = function() {}, e.prototype.renderWebGL = function(t) {
                if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
                    if (this._mask || this._filters) this.renderAdvancedWebGL(t);
                    else {
                        this._renderWebGL(t);
                        for (var e = 0, r = this.children.length; e < r; ++e) this.children[e].renderWebGL(t)
                    }
            }, e.prototype.renderAdvancedWebGL = function(t) {
                t.flush();
                var e = this._filters
                    , r = this._mask;
                if (e) {
                    this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0;
                    for (var n = 0; n < e.length; n++) e[n].enabled && this._enabledFilters.push(e[n]);
                    this._enabledFilters.length && t.filterManager.pushFilter(this, this._enabledFilters)
                }
                r && t.maskManager.pushMask(this, this._mask), this._renderWebGL(t);
                for (var i = 0, o = this.children.length; i < o; i++) this.children[i].renderWebGL(t);
                t.flush(), r && t.maskManager.popMask(this, this._mask), e && this._enabledFilters && this._enabledFilters.length && t.filterManager.popFilter()
            }, e.prototype._renderWebGL = function(t) {}, e.prototype._renderCanvas = function(t) {}, e.prototype.renderCanvas = function(t) {
                if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
                    this._mask && t.maskManager.pushMask(this._mask), this._renderCanvas(t);
                    for (var e = 0, r = this.children.length; e < r; ++e) this.children[e].renderCanvas(t);
                    this._mask && t.maskManager.popMask(t)
                }
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this);
                var r = "boolean" == typeof e ? e : e && e.children
                    , n = this.removeChildren(0, this.children.length);
                if (r)
                    for (var i = 0; i < n.length; ++i) n[i].destroy(e)
            }, i(e, [{
                key: "width"
                , get: function() {
                    return this.scale.x * this.getLocalBounds().width
                }
                , set: function(t) {
                    var e = this.getLocalBounds().width;
                    this.scale.x = 0 !== e ? t / e : 1, this._width = t
                }
            }, {
                key: "height"
                , get: function() {
                    return this.scale.y * this.getLocalBounds().height
                }
                , set: function(t) {
                    var e = this.getLocalBounds().height;
                    this.scale.y = 0 !== e ? t / e : 1, this._height = t
                }
            }]), e
        }(function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(49)).default);
    e.default = s, s.prototype.containerUpdateTransform = s.prototype.updateTransform
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = c(r(57))
        , o = c(r(123))
        , s = c(r(59))
        , a = c(r(124))
        , u = r(3)
        , l = r(1)
        , h = c(r(4));

    function c(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var f = function(t) {
        function e(r, i, s) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var u = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, "Canvas", r, i, s));
            return u.type = l.RENDERER_TYPE.CANVAS, u.rootContext = u.view.getContext("2d", {
                alpha: u.transparent
            }), u.context = u.rootContext, u.refresh = !0, u.maskManager = new o.default(u), u.smoothProperty = "imageSmoothingEnabled", u.rootContext.imageSmoothingEnabled || (u.rootContext.webkitImageSmoothingEnabled ? u.smoothProperty = "webkitImageSmoothingEnabled" : u.rootContext.mozImageSmoothingEnabled ? u.smoothProperty = "mozImageSmoothingEnabled" : u.rootContext.oImageSmoothingEnabled ? u.smoothProperty = "oImageSmoothingEnabled" : u.rootContext.msImageSmoothingEnabled && (u.smoothProperty = "msImageSmoothingEnabled")), u.initPlugins(), u.blendModes = (0, a.default)(), u._activeBlendMode = null, u.renderingToScreen = !1, u.resize(u.options.width, u.options.height), u
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.render = function(t, e, r, n, i) {
            if (this.view) {
                this.renderingToScreen = !e, this.emit("prerender");
                var o = this.resolution;
                e ? ((e = e.baseTexture || e)._canvasRenderTarget || (e._canvasRenderTarget = new s.default(e.width, e.height, e.resolution), e.source = e._canvasRenderTarget.canvas, e.valid = !0), this.context = e._canvasRenderTarget.context, this.resolution = e._canvasRenderTarget.resolution) : this.context = this.rootContext;
                var a = this.context;
                if (e || (this._lastObjectRendered = t), !i) {
                    var u = t.parent
                        , h = this._tempDisplayObjectParent.transform.worldTransform;
                    n ? (n.copy(h), this._tempDisplayObjectParent.transform._worldID = -1) : h.identity(), t.parent = this._tempDisplayObjectParent, t.updateTransform(), t.parent = u
                }
                a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.globalAlpha = 1, this._activeBlendMode = l.BLEND_MODES.NORMAL, a.globalCompositeOperation = this.blendModes[l.BLEND_MODES.NORMAL], navigator.isCocoonJS && this.view.screencanvas && (a.fillStyle = "black", a.clear()), (void 0 !== r ? r : this.clearBeforeRender) && this.renderingToScreen && (this.transparent ? a.clearRect(0, 0, this.width, this.height) : (a.fillStyle = this._backgroundColorString, a.fillRect(0, 0, this.width, this.height)));
                var c = this.context;
                this.context = a, t.renderCanvas(this), this.context = c, a.restore(), this.resolution = o, this.emit("postrender")
            }
        }, e.prototype.clear = function(t) {
            var e = this.context;
            t = t || this._backgroundColorString, !this.transparent && t ? (e.fillStyle = t, e.fillRect(0, 0, this.width, this.height)) : e.clearRect(0, 0, this.width, this.height)
        }, e.prototype.setBlendMode = function(t) {
            this._activeBlendMode !== t && (this._activeBlendMode = t, this.context.globalCompositeOperation = this.blendModes[t])
        }, e.prototype.destroy = function(e) {
            this.destroyPlugins(), t.prototype.destroy.call(this, e), this.context = null, this.refresh = !0, this.maskManager.destroy(), this.maskManager = null, this.smoothProperty = null
        }, e.prototype.resize = function(e, r) {
            t.prototype.resize.call(this, e, r), this.smoothProperty && (this.rootContext[this.smoothProperty] = h.default.SCALE_MODE === l.SCALE_MODES.LINEAR)
        }, e.prototype.invalidateBlendMode = function() {
            this._activeBlendMode = this.blendModes.indexOf(this.context.globalCompositeOperation)
        }, e
    }(i.default);
    e.default = f, u.pluginTarget.mixin(f)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
        function t(e) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.renderer = e, this.renderer.on("context", this.onContextChange, this)
        }
        return t.prototype.onContextChange = function() {}, t.prototype.destroy = function() {
            this.renderer.off("context", this.onContextChange, this), this.renderer = null
        }, t
    }();
    e.default = n
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = r(6)
        , o = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(4));

    function s(t, e) {
        if (t instanceof Array) {
            if ("precision" !== t[0].substring(0, 9)) {
                var r = t.slice(0);
                return r.unshift("precision " + e + " float;"), r
            }
        } else if ("precision" !== t.trim().substring(0, 9)) return "precision " + e + " float;\n" + t;
        return t
    }
    var a = function(t) {
        function e(r, i, a, u, l) {
            return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
                , function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r, s(i, l || o.default.PRECISION_VERTEX), s(a, l || o.default.PRECISION_FRAGMENT), void 0, u))
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e
    }(i.GLShader);
    e.default = a
}, function(t, e, r) {
    "use strict";
    var n = r(177).default
        , i = r(36).default
        , o = r(84)
        , s = r(85);
    n.Resource = i, n.async = o, n.base64 = s, t.exports = n, t.exports.default = n
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , s = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(8))
        , a = new o.Point
        , u = new o.Polygon
        , l = function(t) {
            function e(r, i, a, u, l) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var h = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this));
                return h._texture = r || s.default.EMPTY, h.uvs = a || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), h.vertices = i || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]), h.indices = u || new Uint16Array([0, 1, 3, 2]), h.dirty = 0, h.indexDirty = 0, h.vertexDirty = 0, h.autoUpdate = !0, h.blendMode = o.BLEND_MODES.NORMAL, h.canvasPadding = o.settings.MESH_CANVAS_PADDING, h.drawMode = l || e.DRAW_MODES.TRIANGLE_MESH, h.shader = null, h.tintRgb = new Float32Array([1, 1, 1]), h._glDatas = {}, h._uvTransform = new o.TextureMatrix(h._texture), h.uploadUvTransform = !1, h.pluginName = "mesh", h
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype._renderWebGL = function(t) {
                this.refresh(), t.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this)
            }, e.prototype._renderCanvas = function(t) {
                this.refresh(), t.plugins[this.pluginName].render(this)
            }, e.prototype._onTextureUpdate = function() {
                this._uvTransform.texture = this._texture, this.refresh()
            }, e.prototype.multiplyUvs = function() {
                this.uploadUvTransform || this._uvTransform.multiplyUvs(this.uvs)
            }, e.prototype.refresh = function(t) {
                this.autoUpdate && this.vertexDirty++, this._uvTransform.update(t) && this._refresh()
            }, e.prototype._refresh = function() {}, e.prototype._calculateBounds = function() {
                this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length)
            }, e.prototype.containsPoint = function(t) {
                if (!this.getBounds().contains(t.x, t.y)) return !1;
                this.worldTransform.applyInverse(t, a);
                for (var r = this.vertices, n = u.points, i = this.indices, o = this.indices.length, s = this.drawMode === e.DRAW_MODES.TRIANGLES ? 3 : 1, l = 0; l + 2 < o; l += s) {
                    var h = 2 * i[l]
                        , c = 2 * i[l + 1]
                        , f = 2 * i[l + 2];
                    if (n[0] = r[h], n[1] = r[h + 1], n[2] = r[c], n[3] = r[c + 1], n[4] = r[f], n[5] = r[f + 1], u.contains(a.x, a.y)) return !0
                }
                return !1
            }, e.prototype.destroy = function(e) {
                for (var r in this._glDatas) {
                    var n = this._glDatas[r];
                    n.destroy ? n.destroy() : (n.vertexBuffer && (n.vertexBuffer.destroy(), n.vertexBuffer = null), n.indexBuffer && (n.indexBuffer.destroy(), n.indexBuffer = null), n.uvBuffer && (n.uvBuffer.destroy(), n.uvBuffer = null), n.vao && (n.vao.destroy(), n.vao = null))
                }
                this._glDatas = null, t.prototype.destroy.call(this, e)
            }, i(e, [{
                key: "texture"
                , get: function() {
                    return this._texture
                }
                , set: function(t) {
                    this._texture !== t && (this._texture = t, t && (t.baseTexture.hasLoaded ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)))
                }
            }, {
                key: "tint"
                , get: function() {
                    return o.utils.rgb2hex(this.tintRgb)
                }
                , set: function(t) {
                    this.tintRgb = o.utils.hex2rgb(t, this.tintRgb)
                }
            }]), e
        }(o.Container);
    e.default = l, l.DRAW_MODES = {
        TRIANGLE_MESH: 0
        , TRIANGLES: 1
    }
}, function(t, e) {
    function r(t) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" === ("undefined" == typeof window ? "undefined" : r(window)) && (n = window)
    }
    t.exports = n
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
        function e() {
            return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
                , function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.apply(this, arguments))
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.start = function() {}, e.prototype.stop = function() {
            this.flush()
        }, e.prototype.flush = function() {}, e.prototype.render = function(t) {}, e
    }(function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(r(13)).default);
    e.default = i
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = g(r(57))
        , o = g(r(126))
        , s = g(r(129))
        , a = g(r(130))
        , u = g(r(20))
        , l = g(r(18))
        , h = g(r(132))
        , c = g(r(10))
        , f = g(r(133))
        , d = g(r(134))
        , p = g(r(136))
        , _ = g(r(137))
        , y = r(3)
        , m = g(r(6))
        , v = r(1);

    function g(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var b = 0
        , T = function(t) {
            function e(r, i, a) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var u = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, "WebGL", r, i, a));
                return u.legacy = u.options.legacy, u.legacy && (m.default.VertexArrayObject.FORCE_NATIVE = !0), u.type = v.RENDERER_TYPE.WEBGL, u.handleContextLost = u.handleContextLost.bind(u), u.handleContextRestored = u.handleContextRestored.bind(u), u.view.addEventListener("webglcontextlost", u.handleContextLost, !1), u.view.addEventListener("webglcontextrestored", u.handleContextRestored, !1), u._contextOptions = {
                    alpha: u.transparent
                    , antialias: u.options.antialias
                    , premultipliedAlpha: u.transparent && "notMultiplied" !== u.transparent
                    , stencil: !0
                    , preserveDrawingBuffer: u.options.preserveDrawingBuffer
                    , powerPreference: u.options.powerPreference
                }, u._backgroundColorRgba[3] = u.transparent ? 0 : 1, u.maskManager = new o.default(u), u.stencilManager = new s.default(u), u.emptyRenderer = new l.default(u), u.currentRenderer = u.emptyRenderer, u.textureManager = null, u.filterManager = null, u.initPlugins(), u.options.context && (0, _.default)(u.options.context), u.gl = u.options.context || m.default.createContext(u.view, u._contextOptions), u.CONTEXT_UID = b++, u.state = new d.default(u.gl), u.renderingToScreen = !0, u.boundTextures = null, u._activeShader = null, u._activeVao = null, u._activeRenderTarget = null, u._initContext(), u.drawModes = (0, p.default)(u.gl), u._nextTextureLocation = 0, u.setBlendMode(0), u
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype._initContext = function() {
                var t = this.gl;
                t.isContextLost() && t.getExtension("WEBGL_lose_context") && t.getExtension("WEBGL_lose_context").restoreContext();
                var e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);
                this._activeShader = null, this._activeVao = null, this.boundTextures = new Array(e), this.emptyTextures = new Array(e), this.textureManager = new h.default(this), this.filterManager = new a.default(this), this.textureGC = new f.default(this), this.state.resetToDefault(), this.rootRenderTarget = new u.default(t, this.width, this.height, null, this.resolution, !0), this.rootRenderTarget.clearColor = this._backgroundColorRgba, this.bindRenderTarget(this.rootRenderTarget);
                var r = new m.default.GLTexture.fromData(t, null, 1, 1)
                    , n = {
                        _glTextures: {}
                    };
                n._glTextures[this.CONTEXT_UID] = {};
                for (var i = 0; i < e; i++) {
                    var o = new c.default;
                    o._glTextures[this.CONTEXT_UID] = r, this.boundTextures[i] = n, this.emptyTextures[i] = o, this.bindTexture(null, i)
                }
                this.emit("context", t), this.resize(this.screen.width, this.screen.height)
            }, e.prototype.render = function(t, e, r, n, i) {
                if (this.renderingToScreen = !e, this.emit("prerender"), this.gl && !this.gl.isContextLost()) {
                    if (this._nextTextureLocation = 0, e || (this._lastObjectRendered = t), !i) {
                        var o = t.parent;
                        t.parent = this._tempDisplayObjectParent, t.updateTransform(), t.parent = o
                    }
                    this.bindRenderTexture(e, n), this.currentRenderer.start(), (void 0 !== r ? r : this.clearBeforeRender) && this._activeRenderTarget.clear(), t.renderWebGL(this), this.currentRenderer.flush(), this.textureGC.update(), this.emit("postrender")
                }
            }, e.prototype.setObjectRenderer = function(t) {
                this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start())
            }, e.prototype.flush = function() {
                this.setObjectRenderer(this.emptyRenderer)
            }, e.prototype.resize = function(t, e) {
                i.default.prototype.resize.call(this, t, e), this.rootRenderTarget.resize(t, e), this._activeRenderTarget === this.rootRenderTarget && (this.rootRenderTarget.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(!0)))
            }, e.prototype.setBlendMode = function(t) {
                this.state.setBlendMode(t)
            }, e.prototype.clear = function(t) {
                this._activeRenderTarget.clear(t)
            }, e.prototype.setTransform = function(t) {
                this._activeRenderTarget.transform = t
            }, e.prototype.clearRenderTexture = function(t, e) {
                var r = t.baseTexture._glRenderTargets[this.CONTEXT_UID];
                return r && r.clear(e), this
            }, e.prototype.bindRenderTexture = function(t, e) {
                var r = void 0;
                if (t) {
                    var n = t.baseTexture;
                    n._glRenderTargets[this.CONTEXT_UID] || this.textureManager.updateTexture(n, 0), this.unbindTexture(n), (r = n._glRenderTargets[this.CONTEXT_UID]).setFrame(t.frame)
                } else r = this.rootRenderTarget;
                return r.transform = e, this.bindRenderTarget(r), this
            }, e.prototype.bindRenderTarget = function(t) {
                return t !== this._activeRenderTarget && (this._activeRenderTarget = t, t.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = t.projectionMatrix.toArray(!0)), this.stencilManager.setMaskStack(t.stencilMaskStack)), this
            }, e.prototype.bindShader = function(t, e) {
                return this._activeShader !== t && (this._activeShader = t, t.bind(), !1 !== e && (t.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(!0))), this
            }, e.prototype.bindTexture = function(t, e, r) {
                if ((t = (t = t || this.emptyTextures[e]).baseTexture || t).touched = this.textureGC.count, r) e = e || 0;
                else {
                    for (var n = 0; n < this.boundTextures.length; n++)
                        if (this.boundTextures[n] === t) return n;
                    void 0 === e && (this._nextTextureLocation++, this._nextTextureLocation %= this.boundTextures.length, e = this.boundTextures.length - this._nextTextureLocation - 1)
                }
                var i = this.gl
                    , o = t._glTextures[this.CONTEXT_UID];
                return o ? (this.boundTextures[e] = t, i.activeTexture(i.TEXTURE0 + e), i.bindTexture(i.TEXTURE_2D, o.texture)) : this.textureManager.updateTexture(t, e), e
            }, e.prototype.unbindTexture = function(t) {
                var e = this.gl;
                t = t.baseTexture || t;
                for (var r = 0; r < this.boundTextures.length; r++) this.boundTextures[r] === t && (this.boundTextures[r] = this.emptyTextures[r], e.activeTexture(e.TEXTURE0 + r), e.bindTexture(e.TEXTURE_2D, this.emptyTextures[r]._glTextures[this.CONTEXT_UID].texture));
                return this
            }, e.prototype.createVao = function() {
                return new m.default.VertexArrayObject(this.gl, this.state.attribState)
            }, e.prototype.bindVao = function(t) {
                return this._activeVao === t ? this : (t ? t.bind() : this._activeVao && this._activeVao.unbind(), this._activeVao = t, this)
            }, e.prototype.reset = function() {
                this.setObjectRenderer(this.emptyRenderer), this.bindVao(null), this._activeShader = null, this._activeRenderTarget = this.rootRenderTarget;
                for (var t = 0; t < this.boundTextures.length; t++) this.boundTextures[t] = this.emptyTextures[t];
                return this.rootRenderTarget.activate(), this.state.resetToDefault(), this
            }, e.prototype.handleContextLost = function(t) {
                t.preventDefault()
            }, e.prototype.handleContextRestored = function() {
                this.textureManager.removeAll(), this.filterManager.destroy(!0), this._initContext()
            }, e.prototype.destroy = function(e) {
                this.destroyPlugins(), this.view.removeEventListener("webglcontextlost", this.handleContextLost), this.view.removeEventListener("webglcontextrestored", this.handleContextRestored), this.textureManager.destroy(), t.prototype.destroy.call(this, e), this.uid = 0, this.maskManager.destroy(), this.stencilManager.destroy(), this.filterManager.destroy(), this.maskManager = null, this.filterManager = null, this.textureManager = null, this.currentRenderer = null, this.handleContextLost = null, this.handleContextRestored = null, this._contextOptions = null, this.gl.useProgram(null), this.gl.getExtension("WEBGL_lose_context") && this.gl.getExtension("WEBGL_lose_context").loseContext(), this.gl = null
            }, e
        }(i.default);
    e.default = T, y.pluginTarget.mixin(T)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(5)
        , i = r(1)
        , o = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(4))
        , s = r(6)
        , a = function() {
            function t(e, r, a, u, l, h) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.gl = e, this.frameBuffer = null, this.texture = null, this.clearColor = [0, 0, 0, 0], this.size = new n.Rectangle(0, 0, 1, 1), this.resolution = l || o.default.RESOLUTION, this.projectionMatrix = new n.Matrix, this.transform = null, this.frame = null, this.defaultFrame = new n.Rectangle, this.destinationFrame = null, this.sourceFrame = null, this.stencilBuffer = null, this.stencilMaskStack = [], this.filterData = null, this.filterPoolKey = "", this.scaleMode = void 0 !== u ? u : o.default.SCALE_MODE, this.root = h, this.root ? (this.frameBuffer = new s.GLFramebuffer(e, 100, 100), this.frameBuffer.framebuffer = null) : (this.frameBuffer = s.GLFramebuffer.createRGBA(e, 100, 100), this.scaleMode === i.SCALE_MODES.NEAREST ? this.frameBuffer.texture.enableNearestScaling() : this.frameBuffer.texture.enableLinearScaling(), this.texture = this.frameBuffer.texture), this.setFrame(), this.resize(r, a)
            }
            return t.prototype.clear = function(t) {
                var e = t || this.clearColor;
                this.frameBuffer.clear(e[0], e[1], e[2], e[3])
            }, t.prototype.attachStencilBuffer = function() {
                this.root || this.frameBuffer.enableStencil()
            }, t.prototype.setFrame = function(t, e) {
                this.destinationFrame = t || this.destinationFrame || this.defaultFrame, this.sourceFrame = e || this.sourceFrame || this.destinationFrame
            }, t.prototype.activate = function() {
                var t = this.gl;
                this.frameBuffer.bind(), this.calculateProjection(this.destinationFrame, this.sourceFrame), this.transform && this.projectionMatrix.append(this.transform), this.destinationFrame !== this.sourceFrame ? (t.enable(t.SCISSOR_TEST), t.scissor(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)) : t.disable(t.SCISSOR_TEST), t.viewport(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)
            }, t.prototype.calculateProjection = function(t, e) {
                var r = this.projectionMatrix;
                e = e || t, r.identity(), this.root ? (r.a = 1 / t.width * 2, r.d = -1 / t.height * 2, r.tx = -1 - e.x * r.a, r.ty = 1 - e.y * r.d) : (r.a = 1 / t.width * 2, r.d = 1 / t.height * 2, r.tx = -1 - e.x * r.a, r.ty = -1 - e.y * r.d)
            }, t.prototype.resize = function(t, e) {
                e |= 0, (this.size.width !== (t |= 0) || this.size.height !== e) && (this.size.width = t, this.size.height = e, this.defaultFrame.width = t, this.defaultFrame.height = e, this.frameBuffer.resize(t * this.resolution, e * this.resolution), this.calculateProjection(this.frame || this.size))
            }, t.prototype.destroy = function() {
                this.frameBuffer.destroy(), this.frameBuffer = null, this.texture = null
            }, t
        }();
    e.default = a
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e, r) {
        t.nativeLines ? function(t, e) {
            var r = 0
                , n = t.points;
            if (0 !== n.length) {
                var o = e.points
                    , s = n.length / 2
                    , a = (0, i.hex2rgb)(t.lineColor)
                    , u = t.lineAlpha
                    , l = a[0] * u
                    , h = a[1] * u
                    , c = a[2] * u;
                for (r = 1; r < s; r++) {
                    var f = n[2 * r]
                        , d = n[2 * r + 1];
                    o.push(n[2 * (r - 1)], n[2 * (r - 1) + 1]), o.push(l, h, c, u), o.push(f, d), o.push(l, h, c, u)
                }
            }
        }(t, r) : function(t, e) {
            var r = t.points;
            if (0 !== r.length) {
                var o = new n.Point(r[0], r[1])
                    , s = new n.Point(r[r.length - 2], r[r.length - 1]);
                if (o.x === s.x && o.y === s.y) {
                    (r = r.slice()).pop(), r.pop();
                    var a = (s = new n.Point(r[r.length - 2], r[r.length - 1])).x + .5 * (o.x - s.x)
                        , u = s.y + .5 * (o.y - s.y);
                    r.unshift(a, u), r.push(a, u)
                }
                var l = e.points
                    , h = e.indices
                    , c = r.length / 2
                    , f = r.length
                    , d = l.length / 6
                    , p = t.lineWidth / 2
                    , _ = (0, i.hex2rgb)(t.lineColor)
                    , y = t.lineAlpha
                    , m = _[0] * y
                    , v = _[1] * y
                    , g = _[2] * y
                    , b = r[0]
                    , T = r[1]
                    , x = r[2]
                    , w = r[3]
                    , E = 0
                    , S = 0
                    , O = -(T - w)
                    , P = b - x
                    , C = 0
                    , M = 0
                    , A = 0
                    , I = 0
                    , R = Math.sqrt(O * O + P * P);
                O /= R, P /= R;
                var D = t.lineAlignment
                    , k = 2 * (1 - D)
                    , L = 2 * D;
                l.push(b - (O *= p) * k, T - (P *= p) * k, m, v, g, y), l.push(b + O * L, T + P * L, m, v, g, y);
                for (var N = 1; N < c - 1; ++N) {
                    E = r[2 * (N + 1)], S = r[2 * (N + 1) + 1], O = -((T = r[2 * (N - 1) + 1]) - (w = r[2 * N + 1])), P = (b = r[2 * (N - 1)]) - (x = r[2 * N]), O /= R = Math.sqrt(O * O + P * P), P /= R, O *= p, P *= p, C = -(w - S), M = x - E, C /= R = Math.sqrt(C * C + M * M), M /= R;
                    var j = -P + T - (-P + w)
                        , F = -O + x - (-O + b)
                        , B = (-O + b) * (-P + w) - (-O + x) * (-P + T)
                        , U = -(M *= p) + S - (-M + w)
                        , G = -(C *= p) + x - (-C + E)
                        , X = (-C + E) * (-M + w) - (-C + x) * (-M + S)
                        , W = j * G - U * F;
                    if (Math.abs(W) < .1) W += 10.1, l.push(x - O * k, w - P * k, m, v, g, y), l.push(x + O * L, w + P * L, m, v, g, y);
                    else {
                        var H = (F * X - G * B) / W
                            , V = (U * B - j * X) / W;
                        (H - x) * (H - x) + (V - w) * (V - w) > 196 * p * p ? (A = O - C, I = P - M, A /= R = Math.sqrt(A * A + I * I), I /= R, l.push(x - (A *= p) * k, w - (I *= p) * k), l.push(m, v, g, y), l.push(x + A * L, w + I * L), l.push(m, v, g, y), l.push(x - A * L * k, w - I * k), l.push(m, v, g, y), f++) : (l.push(x + (H - x) * k, w + (V - w) * k), l.push(m, v, g, y), l.push(x - (H - x) * L, w - (V - w) * L), l.push(m, v, g, y))
                    }
                }
                O = -((T = r[2 * (c - 2) + 1]) - (w = r[2 * (c - 1) + 1])), P = (b = r[2 * (c - 2)]) - (x = r[2 * (c - 1)]), O /= R = Math.sqrt(O * O + P * P), P /= R, l.push(x - (O *= p) * k, w - (P *= p) * k), l.push(m, v, g, y), l.push(x + O * L, w + P * L), l.push(m, v, g, y), h.push(d);
                for (var Y = 0; Y < f; ++Y) h.push(d++);
                h.push(d - 1)
            }
        }(t, e)
    };
    var n = r(5)
        , i = r(3)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.x = e, this.y = r
        }
        return t.prototype.clone = function() {
            return new t(this.x, this.y)
        }, t.prototype.copy = function(t) {
            this.set(t.x, t.y)
        }, t.prototype.equals = function(t) {
            return t.x === this.x && t.y === this.y
        }, t.prototype.set = function(t, e) {
            this.x = t || 0, this.y = e || (0 !== e ? this.x : 0)
        }, t
    }();
    e.default = n
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(22))
        , o = r(1)
        , s = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1
                    , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                    , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                    , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1
                    , o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0
                    , s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.a = e, this.b = r, this.c = n, this.d = i, this.tx = o, this.ty = s, this.array = null
            }
            return t.prototype.fromArray = function(t) {
                this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5]
            }, t.prototype.set = function(t, e, r, n, i, o) {
                return this.a = t, this.b = e, this.c = r, this.d = n, this.tx = i, this.ty = o, this
            }, t.prototype.toArray = function(t, e) {
                this.array || (this.array = new Float32Array(9));
                var r = e || this.array;
                return t ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r
            }, t.prototype.apply = function(t, e) {
                e = e || new i.default;
                var r = t.x
                    , n = t.y;
                return e.x = this.a * r + this.c * n + this.tx, e.y = this.b * r + this.d * n + this.ty, e
            }, t.prototype.applyInverse = function(t, e) {
                e = e || new i.default;
                var r = 1 / (this.a * this.d + this.c * -this.b)
                    , n = t.x
                    , o = t.y;
                return e.x = this.d * r * n + -this.c * r * o + (this.ty * this.c - this.tx * this.d) * r, e.y = this.a * r * o + -this.b * r * n + (-this.ty * this.a + this.tx * this.b) * r, e
            }, t.prototype.translate = function(t, e) {
                return this.tx += t, this.ty += e, this
            }, t.prototype.scale = function(t, e) {
                return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this
            }, t.prototype.rotate = function(t) {
                var e = Math.cos(t)
                    , r = Math.sin(t)
                    , n = this.a
                    , i = this.c
                    , o = this.tx;
                return this.a = n * e - this.b * r, this.b = n * r + this.b * e, this.c = i * e - this.d * r, this.d = i * r + this.d * e, this.tx = o * e - this.ty * r, this.ty = o * r + this.ty * e, this
            }, t.prototype.append = function(t) {
                var e = this.a
                    , r = this.b
                    , n = this.c
                    , i = this.d;
                return this.a = t.a * e + t.b * n, this.b = t.a * r + t.b * i, this.c = t.c * e + t.d * n, this.d = t.c * r + t.d * i, this.tx = t.tx * e + t.ty * n + this.tx, this.ty = t.tx * r + t.ty * i + this.ty, this
            }, t.prototype.setTransform = function(t, e, r, n, i, o, s, a, u) {
                return this.a = Math.cos(s + u) * i, this.b = Math.sin(s + u) * i, this.c = -Math.sin(s - a) * o, this.d = Math.cos(s - a) * o, this.tx = t - (r * this.a + n * this.c), this.ty = e - (r * this.b + n * this.d), this
            }, t.prototype.prepend = function(t) {
                var e = this.tx;
                if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                    var r = this.a
                        , n = this.c;
                    this.a = r * t.a + this.b * t.c, this.b = r * t.b + this.b * t.d, this.c = n * t.a + this.d * t.c, this.d = n * t.b + this.d * t.d
                }
                return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this
            }, t.prototype.decompose = function(t) {
                var e = this.a
                    , r = this.b
                    , n = this.c
                    , i = this.d
                    , s = -Math.atan2(-n, i)
                    , a = Math.atan2(r, e)
                    , u = Math.abs(s + a);
                return u < 1e-5 || Math.abs(o.PI_2 - u) < 1e-5 ? (t.rotation = a, e < 0 && i >= 0 && (t.rotation += t.rotation <= 0 ? Math.PI : -Math.PI), t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = s, t.skew.y = a), t.scale.x = Math.sqrt(e * e + r * r), t.scale.y = Math.sqrt(n * n + i * i), t.position.x = this.tx, t.position.y = this.ty, t
            }, t.prototype.invert = function() {
                var t = this.a
                    , e = this.b
                    , r = this.c
                    , n = this.d
                    , i = this.tx
                    , o = t * n - e * r;
                return this.a = n / o, this.b = -e / o, this.c = -r / o, this.d = t / o, this.tx = (r * this.ty - n * i) / o, this.ty = -(t * this.ty - e * i) / o, this
            }, t.prototype.identity = function() {
                return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
            }, t.prototype.clone = function() {
                var e = new t;
                return e.a = this.a, e.b = this.b, e.c = this.c, e.d = this.d, e.tx = this.tx, e.ty = this.ty, e
            }, t.prototype.copy = function(t) {
                return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t
            }, n(t, null, [{
                key: "IDENTITY"
                , get: function() {
                    return new t
                }
            }, {
                key: "TEMP_MATRIX"
                , get: function() {
                    return new t
                }
            }]), t
        }();
    e.default = s
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = r(1)
        , o = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                    , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                    , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                    , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.x = Number(e), this.y = Number(r), this.width = Number(n), this.height = Number(o), this.type = i.SHAPES.RECT
            }
            return t.prototype.clone = function() {
                return new t(this.x, this.y, this.width, this.height)
            }, t.prototype.copy = function(t) {
                return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
            }, t.prototype.contains = function(t, e) {
                return !(this.width <= 0 || this.height <= 0) && t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height
            }, t.prototype.pad = function(t, e) {
                t = t || 0, e = e || (0 !== e ? t : 0), this.x -= t, this.y -= e, this.width += 2 * t, this.height += 2 * e
            }, t.prototype.fit = function(t) {
                this.x < t.x && (this.width += this.x, this.width < 0 && (this.width = 0), this.x = t.x), this.y < t.y && (this.height += this.y, this.height < 0 && (this.height = 0), this.y = t.y), this.x + this.width > t.x + t.width && (this.width = t.width - this.x, this.width < 0 && (this.width = 0)), this.y + this.height > t.y + t.height && (this.height = t.height - this.y, this.height < 0 && (this.height = 0))
            }, t.prototype.enlarge = function(t) {
                var e = Math.min(this.x, t.x)
                    , r = Math.max(this.x + this.width, t.x + t.width)
                    , n = Math.min(this.y, t.y)
                    , i = Math.max(this.y + this.height, t.y + t.height);
                this.x = e, this.width = r - e, this.y = n, this.height = i - n
            }, n(t, [{
                key: "left"
                , get: function() {
                    return this.x
                }
            }, {
                key: "right"
                , get: function() {
                    return this.x + this.width
                }
            }, {
                key: "top"
                , get: function() {
                    return this.y
                }
            }, {
                key: "bottom"
                , get: function() {
                    return this.y + this.height
                }
            }], [{
                key: "EMPTY"
                , get: function() {
                    return new t(0, 0, 0, 0)
                }
            }]), t
        }();
    e.default = o
}, function(t, e) {
    var r = null
        , n = {
            FLOAT: "float"
            , FLOAT_VEC2: "vec2"
            , FLOAT_VEC3: "vec3"
            , FLOAT_VEC4: "vec4"
            , INT: "int"
            , INT_VEC2: "ivec2"
            , INT_VEC3: "ivec3"
            , INT_VEC4: "ivec4"
            , BOOL: "bool"
            , BOOL_VEC2: "bvec2"
            , BOOL_VEC3: "bvec3"
            , BOOL_VEC4: "bvec4"
            , FLOAT_MAT2: "mat2"
            , FLOAT_MAT3: "mat3"
            , FLOAT_MAT4: "mat4"
            , SAMPLER_2D: "sampler2D"
        };
    t.exports = function(t, e) {
        if (!r) {
            var i = Object.keys(n);
            r = {};
            for (var o = 0; o < i.length; ++o) {
                var s = i[o];
                r[t[s]] = n[s]
            }
        }
        return r[e]
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(5)
        , i = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.rect = null
            }
            return t.prototype.isEmpty = function() {
                return this.minX > this.maxX || this.minY > this.maxY
            }, t.prototype.clear = function() {
                this.updateID++, this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0
            }, t.prototype.getRectangle = function(t) {
                return this.minX > this.maxX || this.minY > this.maxY ? n.Rectangle.EMPTY : ((t = t || new n.Rectangle(0, 0, 1, 1)).x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t)
            }, t.prototype.addPoint = function(t) {
                this.minX = Math.min(this.minX, t.x), this.maxX = Math.max(this.maxX, t.x), this.minY = Math.min(this.minY, t.y), this.maxY = Math.max(this.maxY, t.y)
            }, t.prototype.addQuad = function(t) {
                var e = this.minX
                    , r = this.minY
                    , n = this.maxX
                    , i = this.maxY
                    , o = t[0]
                    , s = t[1];
                e = o < e ? o : e, r = s < r ? s : r, n = o > n ? o : n, i = s > i ? s : i, s = t[3], e = (o = t[2]) < e ? o : e, r = s < r ? s : r, n = o > n ? o : n, i = s > i ? s : i, s = t[5], e = (o = t[4]) < e ? o : e, r = s < r ? s : r, n = o > n ? o : n, i = s > i ? s : i, s = t[7], e = (o = t[6]) < e ? o : e, r = s < r ? s : r, n = o > n ? o : n, i = s > i ? s : i, this.minX = e, this.minY = r, this.maxX = n, this.maxY = i
            }, t.prototype.addFrame = function(t, e, r, n, i) {
                var o = t.worldTransform
                    , s = o.a
                    , a = o.b
                    , u = o.c
                    , l = o.d
                    , h = o.tx
                    , c = o.ty
                    , f = this.minX
                    , d = this.minY
                    , p = this.maxX
                    , _ = this.maxY
                    , y = s * e + u * r + h
                    , m = a * e + l * r + c;
                f = y < f ? y : f, d = m < d ? m : d, p = y > p ? y : p, _ = m > _ ? m : _, m = a * n + l * r + c, f = (y = s * n + u * r + h) < f ? y : f, d = m < d ? m : d, p = y > p ? y : p, _ = m > _ ? m : _, m = a * e + l * i + c, f = (y = s * e + u * i + h) < f ? y : f, d = m < d ? m : d, p = y > p ? y : p, _ = m > _ ? m : _, m = a * n + l * i + c, f = (y = s * n + u * i + h) < f ? y : f, d = m < d ? m : d, p = y > p ? y : p, _ = m > _ ? m : _, this.minX = f, this.minY = d, this.maxX = p, this.maxY = _
            }, t.prototype.addVertices = function(t, e, r, n) {
                for (var i = t.worldTransform, o = i.a, s = i.b, a = i.c, u = i.d, l = i.tx, h = i.ty, c = this.minX, f = this.minY, d = this.maxX, p = this.maxY, _ = r; _ < n; _ += 2) {
                    var y = e[_]
                        , m = e[_ + 1]
                        , v = o * y + a * m + l
                        , g = u * m + s * y + h;
                    c = v < c ? v : c, f = g < f ? g : f, d = v > d ? v : d, p = g > p ? g : p
                }
                this.minX = c, this.minY = f, this.maxX = d, this.maxY = p
            }, t.prototype.addBounds = function(t) {
                var e = this.minX
                    , r = this.minY
                    , n = this.maxX
                    , i = this.maxY;
                this.minX = t.minX < e ? t.minX : e, this.minY = t.minY < r ? t.minY : r, this.maxX = t.maxX > n ? t.maxX : n, this.maxY = t.maxY > i ? t.maxY : i
            }, t.prototype.addBoundsMask = function(t, e) {
                var r = t.minX > e.minX ? t.minX : e.minX
                    , n = t.minY > e.minY ? t.minY : e.minY
                    , i = t.maxX < e.maxX ? t.maxX : e.maxX
                    , o = t.maxY < e.maxY ? t.maxY : e.maxY;
                if (r <= i && n <= o) {
                    var s = this.minX
                        , a = this.minY
                        , u = this.maxX
                        , l = this.maxY;
                    this.minX = r < s ? r : s, this.minY = n < a ? n : a, this.maxX = i > u ? i : u, this.maxY = o > l ? o : l
                }
            }, t.prototype.addBoundsArea = function(t, e) {
                var r = t.minX > e.x ? t.minX : e.x
                    , n = t.minY > e.y ? t.minY : e.y
                    , i = t.maxX < e.x + e.width ? t.maxX : e.x + e.width
                    , o = t.maxY < e.y + e.height ? t.maxY : e.y + e.height;
                if (r <= i && n <= o) {
                    var s = this.minX
                        , a = this.minY
                        , u = this.maxX
                        , l = this.maxY;
                    this.minX = r < s ? r : s, this.minY = n < a ? n : a, this.maxX = i > u ? i : u, this.maxY = o > l ? o : l
                }
            }, t
        }();
    e.default = i
}, function(t, e, r) {
    var n, i, o;
    ! function(r) {
        var s = /iPhone/i
            , a = /iPod/i
            , u = /iPad/i
            , l = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i
            , h = /Android/i
            , c = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i
            , f = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i
            , d = /Windows Phone/i
            , p = /(?=.*\bWindows\b)(?=.*\bARM\b)/i
            , _ = /BlackBerry/i
            , y = /BB10/i
            , m = /Opera Mini/i
            , v = /(CriOS|Chrome)(?=.*\bMobile\b)/i
            , g = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i
            , b = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i")
            , T = function(t, e) {
                return t.test(e)
            }
            , x = function(t) {
                var e = t || navigator.userAgent
                    , r = e.split("[FBAN");
                if (void 0 !== r[1] && (e = r[0]), void 0 !== (r = e.split("Twitter"))[1] && (e = r[0]), this.apple = {
                        phone: T(s, e)
                        , ipod: T(a, e)
                        , tablet: !T(s, e) && T(u, e)
                        , device: T(s, e) || T(a, e) || T(u, e)
                    }, this.amazon = {
                        phone: T(c, e)
                        , tablet: !T(c, e) && T(f, e)
                        , device: T(c, e) || T(f, e)
                    }, this.android = {
                        phone: T(c, e) || T(l, e)
                        , tablet: !T(c, e) && !T(l, e) && (T(f, e) || T(h, e))
                        , device: T(c, e) || T(f, e) || T(l, e) || T(h, e)
                    }, this.windows = {
                        phone: T(d, e)
                        , tablet: T(p, e)
                        , device: T(d, e) || T(p, e)
                    }, this.other = {
                        blackberry: T(_, e)
                        , blackberry10: T(y, e)
                        , opera: T(m, e)
                        , firefox: T(g, e)
                        , chrome: T(v, e)
                        , device: T(_, e) || T(y, e) || T(m, e) || T(g, e) || T(v, e)
                    }, this.seven_inch = T(b, e), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window) return this
            }
            , w = function() {
                var t = new x;
                return t.Class = x, t
            };
        t.exports && "undefined" == typeof window ? t.exports = x : t.exports && "undefined" != typeof window ? t.exports = w() : (i = [], n = r.isMobile = w(), void 0 === (o = "function" == typeof n ? n.apply(e, i) : n) || (t.exports = o))
    }(this)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(5)
        , i = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.worldTransform = new n.Matrix, this.localTransform = new n.Matrix, this._worldID = 0, this._parentID = 0
            }
            return t.prototype.updateLocalTransform = function() {}, t.prototype.updateTransform = function(t) {
                var e = t.worldTransform
                    , r = this.worldTransform
                    , n = this.localTransform;
                r.a = n.a * e.a + n.b * e.c, r.b = n.a * e.b + n.b * e.d, r.c = n.c * e.a + n.d * e.c, r.d = n.c * e.b + n.d * e.d, r.tx = n.tx * e.a + n.ty * e.c + e.tx, r.ty = n.tx * e.b + n.ty * e.d + e.ty, this._worldID++
            }, t
        }();
    e.default = i, i.prototype.updateWorldTransform = i.prototype.updateTransform, i.IDENTITY = new i
}, function(t, e, r) {
    "use strict";

    function n(t, e, r) {
        r = r || 2;
        var n, a, u, l, h, d, _, y = e && e.length
            , m = y ? e[0] * r : t.length
            , v = i(t, 0, m, r, !0)
            , g = [];
        if (!v) return g;
        if (y && (v = function(t, e, r, n) {
                var s, a, u, l = [];
                for (s = 0, a = e.length; s < a; s++)(u = i(t, e[s] * n, s < a - 1 ? e[s + 1] * n : t.length, n, !1)) === u.next && (u.steiner = !0), l.push(p(u));
                for (l.sort(c), s = 0; s < l.length; s++) f(l[s], r), r = o(r, r.next);
                return r
            }(t, e, v, r)), t.length > 80 * r) {
            n = u = t[0], a = l = t[1];
            for (var b = r; b < m; b += r) d = t[b + 1], (h = t[b]) < n && (n = h), d < a && (a = d), h > u && (u = h), d > l && (l = d);
            _ = 0 !== (_ = Math.max(u - n, l - a)) ? 1 / _ : 0
        }
        return s(v, g, r, n, a, _), g
    }

    function i(t, e, r, n, i) {
        var o, s;
        if (i === S(t, e, r, n) > 0)
            for (o = e; o < r; o += n) s = x(o, t[o], t[o + 1], s);
        else
            for (o = r - n; o >= e; o -= n) s = x(o, t[o], t[o + 1], s);
        return s && v(s, s.next) && (w(s), s = s.next), s
    }

    function o(t, e) {
        if (!t) return t;
        e || (e = t);
        var r, n = t;
        do {
            if (r = !1, n.steiner || !v(n, n.next) && 0 !== m(n.prev, n, n.next)) n = n.next;
            else {
                if (w(n), (n = e = n.prev) === n.next) break;
                r = !0
            }
        } while (r || n !== e);
        return e
    }

    function s(t, e, r, n, i, c, f) {
        if (t) {
            !f && c && function(t, e, r, n) {
                var i = t;
                do {
                    null === i.z && (i.z = d(i.x, i.y, e, r, n)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next
                } while (i !== t);
                i.prevZ.nextZ = null, i.prevZ = null
                    , function(t) {
                        var e, r, n, i, o, s, a, u, l = 1;
                        do {
                            for (r = t, t = null, o = null, s = 0; r;) {
                                for (s++, n = r, a = 0, e = 0; e < l && (a++, n = n.nextZ); e++);
                                for (u = l; a > 0 || u > 0 && n;) 0 !== a && (0 === u || !n || r.z <= n.z) ? (i = r, r = r.nextZ, a--) : (i = n, n = n.nextZ, u--), o ? o.nextZ = i : t = i, i.prevZ = o, o = i;
                                r = n
                            }
                            o.nextZ = null, l *= 2
                        } while (s > 1)
                    }(i)
            }(t, n, i, c);
            for (var p, _, y = t; t.prev !== t.next;)
                if (p = t.prev, _ = t.next, c ? u(t, n, i, c) : a(t)) e.push(p.i / r), e.push(t.i / r), e.push(_.i / r), w(t), t = _.next, y = _.next;
                else if ((t = _) === y) {
                f ? 1 === f ? s(t = l(t, e, r), e, r, n, i, c, 2) : 2 === f && h(t, e, r, n, i, c) : s(o(t), e, r, n, i, c, 1);
                break
            }
        }
    }

    function a(t) {
        var e = t.prev
            , r = t
            , n = t.next;
        if (m(e, r, n) >= 0) return !1;
        for (var i = t.next.next; i !== t.prev;) {
            if (_(e.x, e.y, r.x, r.y, n.x, n.y, i.x, i.y) && m(i.prev, i, i.next) >= 0) return !1;
            i = i.next
        }
        return !0
    }

    function u(t, e, r, n) {
        var i = t.prev
            , o = t
            , s = t.next;
        if (m(i, o, s) >= 0) return !1;
        for (var a = i.x > o.x ? i.x > s.x ? i.x : s.x : o.x > s.x ? o.x : s.x, u = i.y > o.y ? i.y > s.y ? i.y : s.y : o.y > s.y ? o.y : s.y, l = d(i.x < o.x ? i.x < s.x ? i.x : s.x : o.x < s.x ? o.x : s.x, i.y < o.y ? i.y < s.y ? i.y : s.y : o.y < s.y ? o.y : s.y, e, r, n), h = d(a, u, e, r, n), c = t.prevZ, f = t.nextZ; c && c.z >= l && f && f.z <= h;) {
            if (c !== t.prev && c !== t.next && _(i.x, i.y, o.x, o.y, s.x, s.y, c.x, c.y) && m(c.prev, c, c.next) >= 0) return !1;
            if (c = c.prevZ, f !== t.prev && f !== t.next && _(i.x, i.y, o.x, o.y, s.x, s.y, f.x, f.y) && m(f.prev, f, f.next) >= 0) return !1;
            f = f.nextZ
        }
        for (; c && c.z >= l;) {
            if (c !== t.prev && c !== t.next && _(i.x, i.y, o.x, o.y, s.x, s.y, c.x, c.y) && m(c.prev, c, c.next) >= 0) return !1;
            c = c.prevZ
        }
        for (; f && f.z <= h;) {
            if (f !== t.prev && f !== t.next && _(i.x, i.y, o.x, o.y, s.x, s.y, f.x, f.y) && m(f.prev, f, f.next) >= 0) return !1;
            f = f.nextZ
        }
        return !0
    }

    function l(t, e, r) {
        var n = t;
        do {
            var i = n.prev
                , o = n.next.next;
            !v(i, o) && g(i, n, n.next, o) && b(i, o) && b(o, i) && (e.push(i.i / r), e.push(n.i / r), e.push(o.i / r), w(n), w(n.next), n = t = o), n = n.next
        } while (n !== t);
        return n
    }

    function h(t, e, r, n, i, a) {
        var u = t;
        do {
            for (var l = u.next.next; l !== u.prev;) {
                if (u.i !== l.i && y(u, l)) {
                    var h = T(u, l);
                    return u = o(u, u.next), h = o(h, h.next), s(u, e, r, n, i, a), void s(h, e, r, n, i, a)
                }
                l = l.next
            }
            u = u.next
        } while (u !== t)
    }

    function c(t, e) {
        return t.x - e.x
    }

    function f(t, e) {
        if (e = function(t, e) {
                var r, n = e
                    , i = t.x
                    , o = t.y
                    , s = -1 / 0;
                do {
                    if (o <= n.y && o >= n.next.y && n.next.y !== n.y) {
                        var a = n.x + (o - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
                        if (a <= i && a > s) {
                            if (s = a, a === i) {
                                if (o === n.y) return n;
                                if (o === n.next.y) return n.next
                            }
                            r = n.x < n.next.x ? n : n.next
                        }
                    }
                    n = n.next
                } while (n !== e);
                if (!r) return null;
                if (i === s) return r.prev;
                var u, l = r
                    , h = r.x
                    , c = r.y
                    , f = 1 / 0;
                for (n = r.next; n !== l;) i >= n.x && n.x >= h && i !== n.x && _(o < c ? i : s, o, h, c, o < c ? s : i, o, n.x, n.y) && ((u = Math.abs(o - n.y) / (i - n.x)) < f || u === f && n.x > r.x) && b(n, t) && (r = n, f = u), n = n.next;
                return r
            }(t, e)) {
            var r = T(e, t);
            o(r, r.next)
        }
    }

    function d(t, e, r, n, i) {
        return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - r) * i) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - n) * i) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
    }

    function p(t) {
        var e = t
            , r = t;
        do {
            e.x < r.x && (r = e), e = e.next
        } while (e !== t);
        return r
    }

    function _(t, e, r, n, i, o, s, a) {
        return (i - s) * (e - a) - (t - s) * (o - a) >= 0 && (t - s) * (n - a) - (r - s) * (e - a) >= 0 && (r - s) * (o - a) - (i - s) * (n - a) >= 0
    }

    function y(t, e) {
        return t.next.i !== e.i && t.prev.i !== e.i && ! function(t, e) {
            var r = t;
            do {
                if (r.i !== t.i && r.next.i !== t.i && r.i !== e.i && r.next.i !== e.i && g(r, r.next, t, e)) return !0;
                r = r.next
            } while (r !== t);
            return !1
        }(t, e) && b(t, e) && b(e, t) && function(t, e) {
            var r = t
                , n = !1
                , i = (t.x + e.x) / 2
                , o = (t.y + e.y) / 2;
            do {
                r.y > o != r.next.y > o && r.next.y !== r.y && i < (r.next.x - r.x) * (o - r.y) / (r.next.y - r.y) + r.x && (n = !n), r = r.next
            } while (r !== t);
            return n
        }(t, e)
    }

    function m(t, e, r) {
        return (e.y - t.y) * (r.x - e.x) - (e.x - t.x) * (r.y - e.y)
    }

    function v(t, e) {
        return t.x === e.x && t.y === e.y
    }

    function g(t, e, r, n) {
        return !!(v(t, e) && v(r, n) || v(t, n) && v(r, e)) || m(t, e, r) > 0 != m(t, e, n) > 0 && m(r, n, t) > 0 != m(r, n, e) > 0
    }

    function b(t, e) {
        return m(t.prev, t, t.next) < 0 ? m(t, e, t.next) >= 0 && m(t, t.prev, e) >= 0 : m(t, e, t.prev) < 0 || m(t, t.next, e) < 0
    }

    function T(t, e) {
        var r = new E(t.i, t.x, t.y)
            , n = new E(e.i, e.x, e.y)
            , i = t.next
            , o = e.prev;
        return t.next = e, e.prev = t, r.next = i, i.prev = r, n.next = r, r.prev = n, o.next = n, n.prev = o, n
    }

    function x(t, e, r, n) {
        var i = new E(t, e, r);
        return n ? (i.next = n.next, i.prev = n, n.next.prev = i, n.next = i) : (i.prev = i, i.next = i), i
    }

    function w(t) {
        t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ)
    }

    function E(t, e, r) {
        this.i = t, this.x = e, this.y = r, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
    }

    function S(t, e, r, n) {
        for (var i = 0, o = e, s = r - n; o < r; o += n) i += (t[s] - t[o]) * (t[o + 1] + t[s + 1]), s = o;
        return i
    }
    t.exports = n, t.exports.default = n, n.deviation = function(t, e, r, n) {
        var i = e && e.length
            , o = Math.abs(S(t, 0, i ? e[0] * r : t.length, r));
        if (i)
            for (var s = 0, a = e.length; s < a; s++) o -= Math.abs(S(t, e[s] * r, s < a - 1 ? e[s + 1] * r : t.length, r));
        var u = 0;
        for (s = 0; s < n.length; s += 3) {
            var l = n[s] * r
                , h = n[s + 1] * r
                , c = n[s + 2] * r;
            u += Math.abs((t[l] - t[c]) * (t[h + 1] - t[l + 1]) - (t[l] - t[h]) * (t[c + 1] - t[l + 1]))
        }
        return 0 === o && 0 === u ? 0 : Math.abs((u - o) / o)
    }, n.flatten = function(t) {
        for (var e = t[0][0].length, r = {
                vertices: []
                , holes: []
                , dimensions: e
            }, n = 0, i = 0; i < t.length; i++) {
            for (var o = 0; o < t[i].length; o++)
                for (var s = 0; s < e; s++) r.vertices.push(t[i][o][s]);
            i > 0 && r.holes.push(n += t[i - 1].length)
        }
        return r
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = r(5)
        , s = r(3)
        , a = r(1)
        , u = h(r(8))
        , l = h(r(11));

    function h(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var c = new o.Point
        , f = function(t) {
            function e(r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this));
                return i._anchor = new o.ObservablePoint(i._onAnchorUpdate, i, r ? r.defaultAnchor.x : 0, r ? r.defaultAnchor.y : 0), i._texture = null, i._width = 0, i._height = 0, i._tint = null, i._tintRGB = null, i.tint = 16777215, i.blendMode = a.BLEND_MODES.NORMAL, i.shader = null, i.cachedTint = 16777215, i.texture = r || u.default.EMPTY, i.vertexData = new Float32Array(8), i.vertexTrimmedData = null, i._transformID = -1, i._textureID = -1, i._transformTrimmedID = -1, i._textureTrimmedID = -1, i.pluginName = "sprite", i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype._onTextureUpdate = function() {
                this._textureID = -1, this._textureTrimmedID = -1, this.cachedTint = 16777215, this._width && (this.scale.x = (0, s.sign)(this.scale.x) * this._width / this._texture.orig.width), this._height && (this.scale.y = (0, s.sign)(this.scale.y) * this._height / this._texture.orig.height)
            }, e.prototype._onAnchorUpdate = function() {
                this._transformID = -1, this._transformTrimmedID = -1
            }, e.prototype.calculateVertices = function() {
                if (this._transformID !== this.transform._worldID || this._textureID !== this._texture._updateID) {
                    this._transformID = this.transform._worldID, this._textureID = this._texture._updateID;
                    var t = this._texture
                        , e = this.transform.worldTransform
                        , r = e.a
                        , n = e.b
                        , i = e.c
                        , o = e.d
                        , s = e.tx
                        , a = e.ty
                        , u = this.vertexData
                        , l = t.trim
                        , h = t.orig
                        , c = this._anchor
                        , f = 0
                        , d = 0
                        , p = 0
                        , _ = 0;
                    l ? (f = (d = l.x - c._x * h.width) + l.width, p = (_ = l.y - c._y * h.height) + l.height) : (f = (d = -c._x * h.width) + h.width, p = (_ = -c._y * h.height) + h.height), u[0] = r * d + i * _ + s, u[1] = o * _ + n * d + a, u[2] = r * f + i * _ + s, u[3] = o * _ + n * f + a, u[4] = r * f + i * p + s, u[5] = o * p + n * f + a, u[6] = r * d + i * p + s, u[7] = o * p + n * d + a
                }
            }, e.prototype.calculateTrimmedVertices = function() {
                if (this.vertexTrimmedData) {
                    if (this._transformTrimmedID === this.transform._worldID && this._textureTrimmedID === this._texture._updateID) return
                } else this.vertexTrimmedData = new Float32Array(8);
                this._transformTrimmedID = this.transform._worldID, this._textureTrimmedID = this._texture._updateID;
                var t = this.vertexTrimmedData
                    , e = this._texture.orig
                    , r = this._anchor
                    , n = this.transform.worldTransform
                    , i = n.a
                    , o = n.b
                    , s = n.c
                    , a = n.d
                    , u = n.tx
                    , l = n.ty
                    , h = -r._x * e.width
                    , c = h + e.width
                    , f = -r._y * e.height
                    , d = f + e.height;
                t[0] = i * h + s * f + u, t[1] = a * f + o * h + l, t[2] = i * c + s * f + u, t[3] = a * f + o * c + l, t[4] = i * c + s * d + u, t[5] = a * d + o * c + l, t[6] = i * h + s * d + u, t[7] = a * d + o * h + l
            }, e.prototype._renderWebGL = function(t) {
                this.calculateVertices(), t.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this)
            }, e.prototype._renderCanvas = function(t) {
                t.plugins[this.pluginName].render(this)
            }, e.prototype._calculateBounds = function() {
                var t = this._texture.trim
                    , e = this._texture.orig;
                !t || t.width === e.width && t.height === e.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData))
            }, e.prototype.getLocalBounds = function(e) {
                return 0 === this.children.length ? (this._bounds.minX = this._texture.orig.width * -this._anchor._x, this._bounds.minY = this._texture.orig.height * -this._anchor._y, this._bounds.maxX = this._texture.orig.width * (1 - this._anchor._x), this._bounds.maxY = this._texture.orig.height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new o.Rectangle), e = this._localBoundsRect), this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e)
            }, e.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, c);
                var e = this._texture.orig.width
                    , r = this._texture.orig.height
                    , n = -e * this.anchor.x
                    , i = 0;
                return c.x >= n && c.x < n + e && c.y >= (i = -r * this.anchor.y) && c.y < i + r
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this, e), this._texture.off("update", this._onTextureUpdate, this), this._anchor = null, ("boolean" == typeof e ? e : e && e.texture) && this._texture.destroy(!!("boolean" == typeof e ? e : e && e.baseTexture)), this._texture = null, this.shader = null
            }, e.from = function(t) {
                return new e(u.default.from(t))
            }, e.fromFrame = function(t) {
                var r = s.TextureCache[t];
                if (!r) throw new Error('The frameId "' + t + '" does not exist in the texture cache');
                return new e(r)
            }, e.fromImage = function(t, r, n) {
                return new e(u.default.fromImage(t, r, n))
            }, i(e, [{
                key: "width"
                , get: function() {
                    return Math.abs(this.scale.x) * this._texture.orig.width
                }
                , set: function(t) {
                    var e = (0, s.sign)(this.scale.x) || 1;
                    this.scale.x = e * t / this._texture.orig.width, this._width = t
                }
            }, {
                key: "height"
                , get: function() {
                    return Math.abs(this.scale.y) * this._texture.orig.height
                }
                , set: function(t) {
                    var e = (0, s.sign)(this.scale.y) || 1;
                    this.scale.y = e * t / this._texture.orig.height, this._height = t
                }
            }, {
                key: "anchor"
                , get: function() {
                    return this._anchor
                }
                , set: function(t) {
                    this._anchor.copy(t)
                }
            }, {
                key: "tint"
                , get: function() {
                    return this._tint
                }
                , set: function(t) {
                    this._tint = t, this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16)
                }
            }, {
                key: "texture"
                , get: function() {
                    return this._texture
                }
                , set: function(t) {
                    this._texture !== t && (this._texture = t || u.default.EMPTY, this.cachedTint = 16777215, this._textureID = -1, this._textureTrimmedID = -1, t && (t.baseTexture.hasLoaded ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)))
                }
            }]), e
        }(l.default);
    e.default = f
}, function(t, e, r) {
    "use strict";
    "use restrict";

    function n(t) {
        var e = 32;
        return (t &= -t) && e--, 65535 & t && (e -= 16), 16711935 & t && (e -= 8), 252645135 & t && (e -= 4), 858993459 & t && (e -= 2), 1431655765 & t && (e -= 1), e
    }
    e.INT_BITS = 32, e.INT_MAX = 2147483647, e.INT_MIN = -1 << 31, e.sign = function(t) {
        return (t > 0) - (t < 0)
    }, e.abs = function(t) {
        var e = t >> 31;
        return (t ^ e) - e
    }, e.min = function(t, e) {
        return e ^ (t ^ e) & -(t < e)
    }, e.max = function(t, e) {
        return t ^ (t ^ e) & -(t < e)
    }, e.isPow2 = function(t) {
        return !(t & t - 1 || !t)
    }, e.log2 = function(t) {
        var e, r;
        return e = (t > 65535) << 4, e |= r = ((t >>>= e) > 255) << 3, e |= r = ((t >>>= r) > 15) << 2, (e |= r = ((t >>>= r) > 3) << 1) | (t >>>= r) >> 1
    }, e.log10 = function(t) {
        return t >= 1e9 ? 9 : t >= 1e8 ? 8 : t >= 1e7 ? 7 : t >= 1e6 ? 6 : t >= 1e5 ? 5 : t >= 1e4 ? 4 : t >= 1e3 ? 3 : t >= 100 ? 2 : t >= 10 ? 1 : 0
    }, e.popCount = function(t) {
        return 16843009 * ((t = (858993459 & (t -= t >>> 1 & 1431655765)) + (t >>> 2 & 858993459)) + (t >>> 4) & 252645135) >>> 24
    }, e.countTrailingZeros = n, e.nextPow2 = function(t) {
        return t += 0 === t, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, 1 + ((t |= t >>> 8) | t >>> 16)
    }, e.prevPow2 = function(t) {
        return t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, (t |= t >>> 16) - (t >>> 1)
    }, e.parity = function(t) {
        return t ^= t >>> 16, t ^= t >>> 8, t ^= t >>> 4, 27030 >>> (t &= 15) & 1
    };
    var i = new Array(256);
    ! function(t) {
        for (var e = 0; e < 256; ++e) {
            var r = e
                , n = e
                , i = 7;
            for (r >>>= 1; r; r >>>= 1) n <<= 1, n |= 1 & r, --i;
            t[e] = n << i & 255
        }
    }(i), e.reverse = function(t) {
        return i[255 & t] << 24 | i[t >>> 8 & 255] << 16 | i[t >>> 16 & 255] << 8 | i[t >>> 24 & 255]
    }, e.interleave2 = function(t, e) {
        return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t &= 65535) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e &= 65535) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
    }, e.deinterleave2 = function(t, e) {
        return (t = 65535 & ((t = 16711935 & ((t = 252645135 & ((t = 858993459 & ((t = t >>> e & 1431655765) | t >>> 1)) | t >>> 2)) | t >>> 4)) | t >>> 16)) << 16 >> 16
    }, e.interleave3 = function(t, e, r) {
        return t = 1227133513 & ((t = 3272356035 & ((t = 251719695 & ((t = 4278190335 & ((t &= 1023) | t << 16)) | t << 8)) | t << 4)) | t << 2), (t |= (e = 1227133513 & ((e = 3272356035 & ((e = 251719695 & ((e = 4278190335 & ((e &= 1023) | e << 16)) | e << 8)) | e << 4)) | e << 2)) << 1) | (r = 1227133513 & ((r = 3272356035 & ((r = 251719695 & ((r = 4278190335 & ((r &= 1023) | r << 16)) | r << 8)) | r << 4)) | r << 2)) << 2
    }, e.deinterleave3 = function(t, e) {
        return (t = 1023 & ((t = 4278190335 & ((t = 251719695 & ((t = 3272356035 & ((t = t >>> e & 1227133513) | t >>> 2)) | t >>> 4)) | t >>> 8)) | t >>> 16)) << 22 >> 22
    }, e.nextCombination = function(t) {
        var e = t | t - 1;
        return e + 1 | (~e & -~e) - 1 >>> n(t) + 1
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.Ticker = e.shared = void 0;
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(120))
        , i = new n.default;
    i.autoStart = !0, i.destroy = function() {}, e.shared = i, e.Ticker = n.default
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = o(r(58));

    function o(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var s = function(t) {
        function e(r, o) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var s = null;
            if (!(r instanceof i.default)) {
                var a = arguments[1]
                    , u = arguments[2]
                    , l = arguments[3]
                    , h = arguments[4];
                console.warn("Please use RenderTexture.create(" + a + ", " + u + ") instead of the ctor directly."), s = arguments[0], o = null, r = new i.default(a, u, l, h)
            }
            var c = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, r, o));
            return c.legacyRenderer = s, c.valid = !0, c._updateUvs(), c
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.resize = function(t, e, r) {
            t = Math.ceil(t), e = Math.ceil(e), this.valid = t > 0 && e > 0, this._frame.width = this.orig.width = t, this._frame.height = this.orig.height = e, r || this.baseTexture.resize(t, e), this._updateUvs()
        }, e.create = function(t, r, n, o) {
            return new e(new i.default(t, r, n, o))
        }, e
    }(o(r(8)).default);
    e.default = s
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(3)
        , i = {
            getTintedTexture: function(t, e) {
                var r = t._texture
                    , n = "#" + ("00000" + (0 | (e = i.roundColor(e))).toString(16)).substr(-6);
                r.tintCache = r.tintCache || {};
                var o = r.tintCache[n]
                    , s = void 0;
                if (o) {
                    if (o.tintId === r._updateID) return r.tintCache[n];
                    s = r.tintCache[n]
                } else s = i.canvas || document.createElement("canvas");
                if (i.tintMethod(r, e, s), s.tintId = r._updateID, i.convertTintToImage) {
                    var a = new Image;
                    a.src = s.toDataURL(), r.tintCache[n] = a
                } else r.tintCache[n] = s, i.canvas = null;
                return s
            }
            , tintWithMultiply: function(t, e, r) {
                var n = r.getContext("2d")
                    , i = t._frame.clone()
                    , o = t.baseTexture.resolution;
                i.x *= o, i.y *= o, i.width *= o, i.height *= o, r.width = Math.ceil(i.width), r.height = Math.ceil(i.height), n.save(), n.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), n.fillRect(0, 0, i.width, i.height), n.globalCompositeOperation = "multiply", n.drawImage(t.baseTexture.source, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height), n.globalCompositeOperation = "destination-atop", n.drawImage(t.baseTexture.source, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height), n.restore()
            }
            , tintWithOverlay: function(t, e, r) {
                var n = r.getContext("2d")
                    , i = t._frame.clone()
                    , o = t.baseTexture.resolution;
                i.x *= o, i.y *= o, i.width *= o, i.height *= o, r.width = Math.ceil(i.width), r.height = Math.ceil(i.height), n.save(), n.globalCompositeOperation = "copy", n.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), n.fillRect(0, 0, i.width, i.height), n.globalCompositeOperation = "destination-atop", n.drawImage(t.baseTexture.source, i.x, i.y, i.width, i.height, 0, 0, i.width, i.height), n.restore()
            }
            , tintWithPerPixel: function(t, e, r) {
                var i = r.getContext("2d")
                    , o = t._frame.clone()
                    , s = t.baseTexture.resolution;
                o.x *= s, o.y *= s, o.width *= s, o.height *= s, r.width = Math.ceil(o.width), r.height = Math.ceil(o.height), i.save(), i.globalCompositeOperation = "copy", i.drawImage(t.baseTexture.source, o.x, o.y, o.width, o.height, 0, 0, o.width, o.height), i.restore();
                for (var a = (0, n.hex2rgb)(e), u = a[0], l = a[1], h = a[2], c = i.getImageData(0, 0, o.width, o.height), f = c.data, d = 0; d < f.length; d += 4) f[d + 0] *= u, f[d + 1] *= l, f[d + 2] *= h;
                i.putImageData(c, 0, 0)
            }
            , roundColor: function(t) {
                var e = i.cacheStepsPerColorChannel
                    , r = (0, n.hex2rgb)(t);
                return r[0] = Math.min(255, r[0] / e * e), r[1] = Math.min(255, r[1] / e * e), r[2] = Math.min(255, r[2] / e * e), (0, n.rgb2hex)(r)
            }
            , cacheStepsPerColorChannel: 8
            , convertTintToImage: !1
            , canUseMultiply: (0, function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r(60)).default)()
            , tintMethod: 0
        };
    i.tintMethod = i.canUseMultiply ? i.tintWithMultiply : i.tintWithPerPixel, e.default = i
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        for (var e = 6 * t, r = new Uint16Array(e), n = 0, i = 0; n < e; n += 6, i += 4) r[n + 0] = i + 0, r[n + 1] = i + 1, r[n + 2] = i + 2, r[n + 3] = i + 0, r[n + 4] = i + 2, r[n + 5] = i + 3;
        return r
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = s(r(83))
        , o = s(r(82));

    function s(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var a = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest)
        , u = null;

    function l() {}
    var h = function() {
        function t(e, r, n) {
            if (function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), "string" != typeof e || "string" != typeof r) throw new Error("Both name and url are required for constructing a resource.");
            n = n || {}, this._flags = 0, this._setFlag(t.STATUS_FLAGS.DATA_URL, 0 === r.indexOf("data:")), this.name = e, this.url = r, this.extension = this._getExtension(), this.data = null, this.crossOrigin = !0 === n.crossOrigin ? "anonymous" : n.crossOrigin, this.loadType = n.loadType || this._determineLoadType(), this.xhrType = n.xhrType, this.metadata = n.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = t.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = l, this._onLoadBinding = null, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this), this.onStart = new o.default, this.onProgress = new o.default, this.onComplete = new o.default, this.onAfterMiddleware = new o.default
        }
        return t.setExtensionLoadType = function(e, r) {
            c(t._loadTypeMap, e, r)
        }, t.setExtensionXhrType = function(e, r) {
            c(t._xhrTypeMap, e, r)
        }, t.prototype.complete = function() {
            if (this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null)), this.isComplete) throw new Error("Complete called again for an already completed resource.");
            this._setFlag(t.STATUS_FLAGS.COMPLETE, !0), this._setFlag(t.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this)
        }, t.prototype.abort = function(e) {
            if (!this.error) {
                if (this.error = new Error(e), this.xhr) this.xhr.abort();
                else if (this.xdr) this.xdr.abort();
                else if (this.data)
                    if (this.data.src) this.data.src = t.EMPTY_GIF;
                    else
                        for (; this.data.firstChild;) this.data.removeChild(this.data.firstChild);
                this.complete()
            }
        }, t.prototype.load = function(e) {
            var r = this;
            if (!this.isLoading)
                if (this.isComplete) e && setTimeout(function() {
                    return e(r)
                }, 1);
                else switch (e && this.onComplete.once(e), this._setFlag(t.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
                    case t.LOAD_TYPE.IMAGE:
                        this.type = t.TYPE.IMAGE, this._loadElement("image");
                        break;
                    case t.LOAD_TYPE.AUDIO:
                        this.type = t.TYPE.AUDIO, this._loadSourceElement("audio");
                        break;
                    case t.LOAD_TYPE.VIDEO:
                        this.type = t.TYPE.VIDEO, this._loadSourceElement("video");
                        break;
                    case t.LOAD_TYPE.XHR:
                    default:
                        a && this.crossOrigin ? this._loadXdr() : this._loadXhr()
                }
        }, t.prototype._hasFlag = function(t) {
            return !!(this._flags & t)
        }, t.prototype._setFlag = function(t, e) {
            this._flags = e ? this._flags | t : this._flags & ~t
        }, t.prototype._loadElement = function(t) {
            this.data = this.metadata.loadElement ? this.metadata.loadElement : "image" === t && void 0 !== window.Image ? new Image : document.createElement(t), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1)
        }, t.prototype._loadSourceElement = function(t) {
            if (this.data = this.metadata.loadElement ? this.metadata.loadElement : "audio" === t && void 0 !== window.Audio ? new Audio : document.createElement(t), null !== this.data) {
                if (!this.metadata.skipSource)
                    if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
                    else if (Array.isArray(this.url))
                    for (var e = this.metadata.mimeType, r = 0; r < this.url.length; ++r) this.data.appendChild(this._createSource(t, this.url[r], Array.isArray(e) ? e[r] : e));
                else {
                    var n = this.metadata.mimeType;
                    this.data.appendChild(this._createSource(t, this.url, Array.isArray(n) ? n[0] : n))
                }
                this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load()
            } else this.abort("Unsupported element: " + t)
        }, t.prototype._loadXhr = function() {
            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
            var e = this.xhr = new XMLHttpRequest;
            e.open("GET", this.url, !0), e.responseType = this.xhrType === t.XHR_RESPONSE_TYPE.JSON || this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT ? t.XHR_RESPONSE_TYPE.TEXT : this.xhrType, e.addEventListener("error", this._boundXhrOnError, !1), e.addEventListener("abort", this._boundXhrOnAbort, !1), e.addEventListener("progress", this._boundOnProgress, !1), e.addEventListener("load", this._boundXhrOnLoad, !1), e.send()
        }, t.prototype._loadXdr = function() {
            "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
            var t = this.xhr = new XDomainRequest;
            t.timeout = 5e3, t.onerror = this._boundXhrOnError, t.ontimeout = this._boundXdrOnTimeout, t.onprogress = this._boundOnProgress, t.onload = this._boundXhrOnLoad, t.open("GET", this.url, !0), setTimeout(function() {
                return t.send()
            }, 1)
        }, t.prototype._createSource = function(t, e, r) {
            r || (r = t + "/" + this._getExtension(e));
            var n = document.createElement("source");
            return n.src = e, n.type = r, n
        }, t.prototype._onError = function(t) {
            this.abort("Failed to load element using: " + t.target.nodeName)
        }, t.prototype._onProgress = function(t) {
            t && t.lengthComputable && this.onProgress.dispatch(this, t.loaded / t.total)
        }, t.prototype._xhrOnError = function() {
            var t = this.xhr;
            this.abort(f(t) + " Request failed. Status: " + t.status + ', text: "' + t.statusText + '"')
        }, t.prototype._xhrOnAbort = function() {
            this.abort(f(this.xhr) + " Request was aborted by the user.")
        }, t.prototype._xdrOnTimeout = function() {
            this.abort(f(this.xhr) + " Request timed out.")
        }, t.prototype._xhrOnLoad = function() {
            var e = this.xhr
                , r = ""
                , n = void 0 === e.status ? 200 : e.status;
            if ("" !== e.responseType && "text" !== e.responseType && void 0 !== e.responseType || (r = e.responseText), 0 === n && (r.length > 0 || e.responseType === t.XHR_RESPONSE_TYPE.BUFFER) ? n = 200 : 1223 === n && (n = 204), 2 == (n / 100 | 0)) {
                if (this.xhrType === t.XHR_RESPONSE_TYPE.TEXT) this.data = r, this.type = t.TYPE.TEXT;
                else if (this.xhrType === t.XHR_RESPONSE_TYPE.JSON) try {
                    this.data = JSON.parse(r), this.type = t.TYPE.JSON
                } catch (t) {
                    return void this.abort("Error trying to parse loaded json: " + t)
                } else if (this.xhrType === t.XHR_RESPONSE_TYPE.DOCUMENT) try {
                    if (window.DOMParser) {
                        var i = new DOMParser;
                        this.data = i.parseFromString(r, "text/xml")
                    } else {
                        var o = document.createElement("div");
                        o.innerHTML = r, this.data = o
                    }
                    this.type = t.TYPE.XML
                } catch (t) {
                    return void this.abort("Error trying to parse loaded xml: " + t)
                } else this.data = e.response || r;
                this.complete()
            } else this.abort("[" + e.status + "] " + e.statusText + ": " + e.responseURL)
        }, t.prototype._determineCrossOrigin = function(t, e) {
            if (0 === t.indexOf("data:")) return "";
            e = e || window.location, u || (u = document.createElement("a")), u.href = t;
            var r = !(t = (0, i.default)(u.href, {
                strictMode: !0
            })).port && "" === e.port || t.port === e.port;
            return t.host === e.hostname && r && (t.protocol ? t.protocol + ":" : "") === e.protocol ? "" : "anonymous"
        }, t.prototype._determineXhrType = function() {
            return t._xhrTypeMap[this.extension] || t.XHR_RESPONSE_TYPE.TEXT
        }, t.prototype._determineLoadType = function() {
            return t._loadTypeMap[this.extension] || t.LOAD_TYPE.XHR
        }, t.prototype._getExtension = function() {
            var t = this.url
                , e = "";
            if (this.isDataUrl) {
                var r = t.indexOf("/");
                e = t.substring(r + 1, t.indexOf(";", r))
            } else {
                var n = t.indexOf("?")
                    , i = t.indexOf("#")
                    , o = Math.min(n > -1 ? n : t.length, i > -1 ? i : t.length);
                e = (t = t.substring(0, o)).substring(t.lastIndexOf(".") + 1)
            }
            return e.toLowerCase()
        }, t.prototype._getMimeFromXhrType = function(e) {
            switch (e) {
                case t.XHR_RESPONSE_TYPE.BUFFER:
                    return "application/octet-binary";
                case t.XHR_RESPONSE_TYPE.BLOB:
                    return "application/blob";
                case t.XHR_RESPONSE_TYPE.DOCUMENT:
                    return "application/xml";
                case t.XHR_RESPONSE_TYPE.JSON:
                    return "application/json";
                case t.XHR_RESPONSE_TYPE.DEFAULT:
                case t.XHR_RESPONSE_TYPE.TEXT:
                default:
                    return "text/plain"
            }
        }, n(t, [{
            key: "isDataUrl"
            , get: function() {
                return this._hasFlag(t.STATUS_FLAGS.DATA_URL)
            }
        }, {
            key: "isComplete"
            , get: function() {
                return this._hasFlag(t.STATUS_FLAGS.COMPLETE)
            }
        }, {
            key: "isLoading"
            , get: function() {
                return this._hasFlag(t.STATUS_FLAGS.LOADING)
            }
        }]), t
    }();

    function c(t, e, r) {
        e && 0 === e.indexOf(".") && (e = e.substring(1)), e && (t[e] = r)
    }

    function f(t) {
        return t.toString().replace("object ", "")
    }
    e.default = h, h.STATUS_FLAGS = {
        NONE: 0
        , DATA_URL: 1
        , COMPLETE: 2
        , LOADING: 4
    }, h.TYPE = {
        UNKNOWN: 0
        , JSON: 1
        , XML: 2
        , IMAGE: 3
        , AUDIO: 4
        , VIDEO: 5
        , TEXT: 6
    }, h.LOAD_TYPE = {
        XHR: 1
        , IMAGE: 2
        , AUDIO: 3
        , VIDEO: 4
    }, h.XHR_RESPONSE_TYPE = {
        DEFAULT: "text"
        , BUFFER: "arraybuffer"
        , BLOB: "blob"
        , DOCUMENT: "document"
        , JSON: "json"
        , TEXT: "text"
    }, h._loadTypeMap = {
        gif: h.LOAD_TYPE.IMAGE
        , png: h.LOAD_TYPE.IMAGE
        , bmp: h.LOAD_TYPE.IMAGE
        , jpg: h.LOAD_TYPE.IMAGE
        , jpeg: h.LOAD_TYPE.IMAGE
        , tif: h.LOAD_TYPE.IMAGE
        , tiff: h.LOAD_TYPE.IMAGE
        , webp: h.LOAD_TYPE.IMAGE
        , tga: h.LOAD_TYPE.IMAGE
        , svg: h.LOAD_TYPE.IMAGE
        , "svg+xml": h.LOAD_TYPE.IMAGE
        , mp3: h.LOAD_TYPE.AUDIO
        , ogg: h.LOAD_TYPE.AUDIO
        , wav: h.LOAD_TYPE.AUDIO
        , mp4: h.LOAD_TYPE.VIDEO
        , webm: h.LOAD_TYPE.VIDEO
    }, h._xhrTypeMap = {
        xhtml: h.XHR_RESPONSE_TYPE.DOCUMENT
        , html: h.XHR_RESPONSE_TYPE.DOCUMENT
        , htm: h.XHR_RESPONSE_TYPE.DOCUMENT
        , xml: h.XHR_RESPONSE_TYPE.DOCUMENT
        , tmx: h.XHR_RESPONSE_TYPE.DOCUMENT
        , svg: h.XHR_RESPONSE_TYPE.DOCUMENT
        , tsx: h.XHR_RESPONSE_TYPE.DOCUMENT
        , gif: h.XHR_RESPONSE_TYPE.BLOB
        , png: h.XHR_RESPONSE_TYPE.BLOB
        , bmp: h.XHR_RESPONSE_TYPE.BLOB
        , jpg: h.XHR_RESPONSE_TYPE.BLOB
        , jpeg: h.XHR_RESPONSE_TYPE.BLOB
        , tif: h.XHR_RESPONSE_TYPE.BLOB
        , tiff: h.XHR_RESPONSE_TYPE.BLOB
        , webp: h.XHR_RESPONSE_TYPE.BLOB
        , tga: h.XHR_RESPONSE_TYPE.BLOB
        , json: h.XHR_RESPONSE_TYPE.JSON
        , text: h.XHR_RESPONSE_TYPE.TEXT
        , txt: h.XHR_RESPONSE_TYPE.TEXT
        , ttf: h.XHR_RESPONSE_TYPE.BUFFER
        , otf: h.XHR_RESPONSE_TYPE.BUFFER
    }, h.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(89))
        , o = n.ticker.shared;
    n.settings.UPLOADS_PER_FRAME = 4;
    var s = function() {
        function t(e) {
            var r = this;
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.limiter = new i.default(n.settings.UPLOADS_PER_FRAME), this.renderer = e, this.uploadHookHelper = null, this.queue = [], this.addHooks = [], this.uploadHooks = [], this.completes = [], this.ticking = !1, this.delayedTick = function() {
                r.queue && r.prepareItems()
            }, this.registerFindHook(f), this.registerFindHook(d), this.registerFindHook(a), this.registerFindHook(u), this.registerFindHook(l), this.registerUploadHook(h), this.registerUploadHook(c)
        }
        return t.prototype.upload = function(t, e) {
            "function" == typeof t && (e = t, t = null), t && this.add(t), this.queue.length ? (e && this.completes.push(e), this.ticking || (this.ticking = !0, o.addOnce(this.tick, this, n.UPDATE_PRIORITY.UTILITY))) : e && e()
        }, t.prototype.tick = function() {
            setTimeout(this.delayedTick, 0)
        }, t.prototype.prepareItems = function() {
            for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload();) {
                var t = this.queue[0]
                    , e = !1;
                if (t && !t._destroyed)
                    for (var r = 0, i = this.uploadHooks.length; r < i; r++)
                        if (this.uploadHooks[r](this.uploadHookHelper, t)) {
                            this.queue.shift(), e = !0;
                            break
                        } e || this.queue.shift()
            }
            if (this.queue.length) o.addOnce(this.tick, this, n.UPDATE_PRIORITY.UTILITY);
            else {
                this.ticking = !1;
                var s = this.completes.slice(0);
                this.completes.length = 0;
                for (var a = 0, u = s.length; a < u; a++) s[a]()
            }
        }, t.prototype.registerFindHook = function(t) {
            return t && this.addHooks.push(t), this
        }, t.prototype.registerUploadHook = function(t) {
            return t && this.uploadHooks.push(t), this
        }, t.prototype.add = function(t) {
            for (var e = 0, r = this.addHooks.length; e < r && !this.addHooks[e](t, this.queue); e++);
            if (t instanceof n.Container)
                for (var i = t.children.length - 1; i >= 0; i--) this.add(t.children[i]);
            return this
        }, t.prototype.destroy = function() {
            this.ticking && o.remove(this.tick, this), this.ticking = !1, this.addHooks = null, this.uploadHooks = null, this.renderer = null, this.completes = null, this.queue = null, this.limiter = null, this.uploadHookHelper = null
        }, t
    }();

    function a(t, e) {
        var r = !1;
        if (t && t._textures && t._textures.length)
            for (var i = 0; i < t._textures.length; i++)
                if (t._textures[i] instanceof n.Texture) {
                    var o = t._textures[i].baseTexture; - 1 === e.indexOf(o) && (e.push(o), r = !0)
                } return r
    }

    function u(t, e) {
        return t instanceof n.BaseTexture && (-1 === e.indexOf(t) && e.push(t), !0)
    }

    function l(t, e) {
        if (t._texture && t._texture instanceof n.Texture) {
            var r = t._texture.baseTexture;
            return -1 === e.indexOf(r) && e.push(r), !0
        }
        return !1
    }

    function h(t, e) {
        return e instanceof n.Text && (e.updateText(!0), !0)
    }

    function c(t, e) {
        if (e instanceof n.TextStyle) {
            var r = e.toFontString();
            return n.TextMetrics.measureFont(r), !0
        }
        return !1
    }

    function f(t, e) {
        if (t instanceof n.Text) {
            -1 === e.indexOf(t.style) && e.push(t.style), -1 === e.indexOf(t) && e.push(t);
            var r = t._texture.baseTexture;
            return -1 === e.indexOf(r) && e.push(r), !0
        }
        return !1
    }

    function d(t, e) {
        return t instanceof n.TextStyle && (-1 === e.indexOf(t) && e.push(t), !0)
    }
    e.default = s
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = function() {
            function t(e, r) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                    , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._x = n, this._y = i, this.cb = e, this.scope = r
            }
            return t.prototype.clone = function() {
                return new t((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null) || this.cb, (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null) || this.scope, this._x, this._y)
            }, t.prototype.set = function(t, e) {
                var r = t || 0
                    , n = e || (0 !== e ? r : 0);
                this._x === r && this._y === n || (this._x = r, this._y = n, this.cb.call(this.scope))
            }, t.prototype.copy = function(t) {
                this._x === t.x && this._y === t.y || (this._x = t.x, this._y = t.y, this.cb.call(this.scope))
            }, t.prototype.equals = function(t) {
                return t.x === this._x && t.y === this._y
            }, n(t, [{
                key: "x"
                , get: function() {
                    return this._x
                }
                , set: function(t) {
                    this._x !== t && (this._x = t, this.cb.call(this.scope))
                }
            }, {
                key: "y"
                , get: function() {
                    return this._y
                }
                , set: function(t) {
                    this._y !== t && (this._y = t, this.cb.call(this.scope))
                }
            }]), t
        }();
    e.default = i
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(23))
        , i = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1]
        , o = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1]
        , s = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1]
        , a = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1]
        , u = []
        , l = [];

    function h(t) {
        return t < 0 ? -1 : t > 0 ? 1 : 0
    }! function() {
        for (var t = 0; t < 16; t++) {
            var e = [];
            l.push(e);
            for (var r = 0; r < 16; r++)
                for (var c = h(i[t] * i[r] + s[t] * o[r]), f = h(o[t] * i[r] + a[t] * o[r]), d = h(i[t] * s[r] + s[t] * a[r]), p = h(o[t] * s[r] + a[t] * a[r]), _ = 0; _ < 16; _++)
                    if (i[_] === c && o[_] === f && s[_] === d && a[_] === p) {
                        e.push(_);
                        break
                    }
        }
        for (var y = 0; y < 16; y++) {
            var m = new n.default;
            m.set(i[y], o[y], s[y], a[y], 0, 0), u.push(m)
        }
    }();
    var c = {
        E: 0
        , SE: 1
        , S: 2
        , SW: 3
        , W: 4
        , NW: 5
        , N: 6
        , NE: 7
        , MIRROR_VERTICAL: 8
        , MIRROR_HORIZONTAL: 12
        , uX: function(t) {
            return i[t]
        }
        , uY: function(t) {
            return o[t]
        }
        , vX: function(t) {
            return s[t]
        }
        , vY: function(t) {
            return a[t]
        }
        , inv: function(t) {
            return 8 & t ? 15 & t : 7 & -t
        }
        , add: function(t, e) {
            return l[t][e]
        }
        , sub: function(t, e) {
            return l[t][c.inv(e)]
        }
        , rotate180: function(t) {
            return 4 ^ t
        }
        , isVertical: function(t) {
            return 2 == (3 & t)
        }
        , byDirection: function(t, e) {
            return 2 * Math.abs(t) <= Math.abs(e) ? e >= 0 ? c.S : c.N : 2 * Math.abs(e) <= Math.abs(t) ? t > 0 ? c.E : c.W : e > 0 ? t > 0 ? c.SE : c.SW : t > 0 ? c.NE : c.NW
        }
        , matrixAppendRotationInv: function(t, e) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                , i = u[c.inv(e)];
            i.tx = r, i.ty = n, t.append(i)
        }
    };
    e.default = c
}, function(t, e) {
    t.exports = function(t, e, r) {
        var n;
        if (r) {
            var i = r.tempAttribState
                , o = r.attribState;
            for (n = 0; n < i.length; n++) i[n] = !1;
            for (n = 0; n < e.length; n++) i[e[n].attribute.location] = !0;
            for (n = 0; n < o.length; n++) o[n] !== i[n] && (o[n] = i[n], r.attribState[n] ? t.enableVertexAttribArray(n) : t.disableVertexAttribArray(n))
        } else
            for (n = 0; n < e.length; n++) t.enableVertexAttribArray(e[n].attribute.location)
    }
}, function(t, e) {
    var r = function(t, e, r, n, i) {
        this.gl = t, this.texture = t.createTexture(), this.mipmap = !1, this.premultiplyAlpha = !1, this.width = e || -1, this.height = r || -1, this.format = n || t.RGBA, this.type = i || t.UNSIGNED_BYTE
    };
    r.prototype.upload = function(t) {
        this.bind();
        var e = this.gl;
        e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        var r = t.videoWidth || t.width
            , n = t.videoHeight || t.height;
        n !== this.height || r !== this.width ? e.texImage2D(e.TEXTURE_2D, 0, this.format, this.format, this.type, t) : e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, this.format, this.type, t), this.width = r, this.height = n
    };
    var n = !1;
    r.prototype.uploadData = function(t, e, r) {
        this.bind();
        var i = this.gl;
        if (t instanceof Float32Array) {
            if (!n) {
                if (!i.getExtension("OES_texture_float")) throw new Error("floating point textures not available");
                n = !0
            }
            this.type = i.FLOAT
        } else this.type = this.type || i.UNSIGNED_BYTE;
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), e !== this.width || r !== this.height ? i.texImage2D(i.TEXTURE_2D, 0, this.format, e, r, 0, this.format, this.type, t || null) : i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, e, r, this.format, this.type, t || null), this.width = e, this.height = r
    }, r.prototype.bind = function(t) {
        var e = this.gl;
        void 0 !== t && e.activeTexture(e.TEXTURE0 + t), e.bindTexture(e.TEXTURE_2D, this.texture)
    }, r.prototype.unbind = function() {
        var t = this.gl;
        t.bindTexture(t.TEXTURE_2D, null)
    }, r.prototype.minFilter = function(t) {
        var e = this.gl;
        this.bind(), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, this.mipmap ? t ? e.LINEAR_MIPMAP_LINEAR : e.NEAREST_MIPMAP_NEAREST : t ? e.LINEAR : e.NEAREST)
    }, r.prototype.magFilter = function(t) {
        var e = this.gl;
        this.bind(), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t ? e.LINEAR : e.NEAREST)
    }, r.prototype.enableMipmap = function() {
        var t = this.gl;
        this.bind(), this.mipmap = !0, t.generateMipmap(t.TEXTURE_2D)
    }, r.prototype.enableLinearScaling = function() {
        this.minFilter(!0), this.magFilter(!0)
    }, r.prototype.enableNearestScaling = function() {
        this.minFilter(!1), this.magFilter(!1)
    }, r.prototype.enableWrapClamp = function() {
        var t = this.gl;
        this.bind(), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE)
    }, r.prototype.enableWrapRepeat = function() {
        var t = this.gl;
        this.bind(), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT)
    }, r.prototype.enableWrapMirrorRepeat = function() {
        var t = this.gl;
        this.bind(), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.MIRRORED_REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.MIRRORED_REPEAT)
    }, r.prototype.destroy = function() {
        this.gl.deleteTexture(this.texture)
    }, r.fromSource = function(t, e, n) {
        var i = new r(t);
        return i.premultiplyAlpha = n || !1, i.upload(e), i
    }, r.fromData = function(t, e, n, i) {
        var o = new r(t);
        return o.uploadData(e, n, i), o
    }, t.exports = r
}, function(t, e) {
    var r = function(t, e, r) {
        var n = t.createShader(e);
        return t.shaderSource(n, r), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS) ? n : (console.log(t.getShaderInfoLog(n)), null)
    };
    t.exports = function(t, e, n, i) {
        var o = r(t, t.VERTEX_SHADER, e)
            , s = r(t, t.FRAGMENT_SHADER, n)
            , a = t.createProgram();
        if (t.attachShader(a, o), t.attachShader(a, s), i)
            for (var u in i) t.bindAttribLocation(a, i[u], u);
        return t.linkProgram(a), t.getProgramParameter(a, t.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."), console.error("gl.VALIDATE_STATUS", t.getProgramParameter(a, t.VALIDATE_STATUS)), console.error("gl.getError()", t.getError()), "" !== t.getProgramInfoLog(a) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(a)), t.deleteProgram(a), a = null), t.deleteShader(o), t.deleteShader(s), a
    }
}, function(t, e, r) {
    var n = r(25)
        , i = r(44)
        , o = function(t, e, r, n) {
            gl.vertexAttribPointer(this.location, this.size, t || gl.FLOAT, e || !1, r || 0, n || 0)
        };
    t.exports = function(t, e) {
        for (var r = {}, s = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), a = 0; a < s; a++) {
            var u = t.getActiveAttrib(e, a)
                , l = n(t, u.type);
            r[u.name] = {
                type: l
                , size: i(l)
                , location: t.getAttribLocation(e, u.name)
                , pointer: o
            }
        }
        return r
    }
}, function(t, e) {
    var r = {
        float: 1
        , vec2: 2
        , vec3: 3
        , vec4: 4
        , int: 1
        , ivec2: 2
        , ivec3: 3
        , ivec4: 4
        , bool: 1
        , bvec2: 2
        , bvec3: 3
        , bvec4: 4
        , mat2: 4
        , mat3: 9
        , mat4: 16
        , sampler2D: 1
    };
    t.exports = function(t) {
        return r[t]
    }
}, function(t, e, r) {
    var n = r(25)
        , i = r(46);
    t.exports = function(t, e) {
        for (var r = {}, o = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), s = 0; s < o; s++) {
            var a = t.getActiveUniform(e, s)
                , u = a.name.replace(/\[.*?\]/, "")
                , l = n(t, a.type);
            r[u] = {
                type: l
                , size: a.size
                , location: t.getUniformLocation(e, u)
                , value: i(l, a.size)
            }
        }
        return r
    }
}, function(t, e) {
    var r = function(t) {
        for (var e = new Array(t), r = 0; r < e.length; r++) e[r] = !1;
        return e
    };
    t.exports = function(t, e) {
        switch (t) {
            case "float":
                return 0;
            case "vec2":
                return new Float32Array(2 * e);
            case "vec3":
                return new Float32Array(3 * e);
            case "vec4":
                return new Float32Array(4 * e);
            case "int":
            case "sampler2D":
                return 0;
            case "ivec2":
                return new Int32Array(2 * e);
            case "ivec3":
                return new Int32Array(3 * e);
            case "ivec4":
                return new Int32Array(4 * e);
            case "bool":
                return !1;
            case "bvec2":
                return r(2 * e);
            case "bvec3":
                return r(3 * e);
            case "bvec4":
                return r(4 * e);
            case "mat2":
                return new Float32Array([1, 0, 0, 1]);
            case "mat3":
                return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            case "mat4":
                return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        }
    }
}, function(t, e) {
    t.exports = function(t, e) {
        return "precision" !== t.substring(0, 9) ? "precision " + e + " float;\n" + t : t
    }
}, function(t, e) {
    var r = function(t) {
            return function() {
                return this.data[t].value
            }
        }
        , n = {
            float: function(t, e, r) {
                t.uniform1f(e, r)
            }
            , vec2: function(t, e, r) {
                t.uniform2f(e, r[0], r[1])
            }
            , vec3: function(t, e, r) {
                t.uniform3f(e, r[0], r[1], r[2])
            }
            , vec4: function(t, e, r) {
                t.uniform4f(e, r[0], r[1], r[2], r[3])
            }
            , int: function(t, e, r) {
                t.uniform1i(e, r)
            }
            , ivec2: function(t, e, r) {
                t.uniform2i(e, r[0], r[1])
            }
            , ivec3: function(t, e, r) {
                t.uniform3i(e, r[0], r[1], r[2])
            }
            , ivec4: function(t, e, r) {
                t.uniform4i(e, r[0], r[1], r[2], r[3])
            }
            , bool: function(t, e, r) {
                t.uniform1i(e, r)
            }
            , bvec2: function(t, e, r) {
                t.uniform2i(e, r[0], r[1])
            }
            , bvec3: function(t, e, r) {
                t.uniform3i(e, r[0], r[1], r[2])
            }
            , bvec4: function(t, e, r) {
                t.uniform4i(e, r[0], r[1], r[2], r[3])
            }
            , mat2: function(t, e, r) {
                t.uniformMatrix2fv(e, !1, r)
            }
            , mat3: function(t, e, r) {
                t.uniformMatrix3fv(e, !1, r)
            }
            , mat4: function(t, e, r) {
                t.uniformMatrix4fv(e, !1, r)
            }
            , sampler2D: function(t, e, r) {
                t.uniform1i(e, r)
            }
        }
        , i = {
            float: function(t, e, r) {
                t.uniform1fv(e, r)
            }
            , vec2: function(t, e, r) {
                t.uniform2fv(e, r)
            }
            , vec3: function(t, e, r) {
                t.uniform3fv(e, r)
            }
            , vec4: function(t, e, r) {
                t.uniform4fv(e, r)
            }
            , int: function(t, e, r) {
                t.uniform1iv(e, r)
            }
            , ivec2: function(t, e, r) {
                t.uniform2iv(e, r)
            }
            , ivec3: function(t, e, r) {
                t.uniform3iv(e, r)
            }
            , ivec4: function(t, e, r) {
                t.uniform4iv(e, r)
            }
            , bool: function(t, e, r) {
                t.uniform1iv(e, r)
            }
            , bvec2: function(t, e, r) {
                t.uniform2iv(e, r)
            }
            , bvec3: function(t, e, r) {
                t.uniform3iv(e, r)
            }
            , bvec4: function(t, e, r) {
                t.uniform4iv(e, r)
            }
            , sampler2D: function(t, e, r) {
                t.uniform1iv(e, r)
            }
        };

    function o(t, e) {
        return function(r) {
            this.data[t].value = r;
            var o = this.data[t].location;
            1 === e.size ? n[e.type](this.gl, o, r) : i[e.type](this.gl, o, r)
        }
    }

    function s(t, e) {
        for (var r = e, n = 0; n < t.length - 1; n++) {
            var i = r[t[n]] || {
                data: {}
            };
            r[t[n]] = i, r = i
        }
        return r
    }
    t.exports = function(t, e) {
        var n = {
            data: {}
        };
        n.gl = t;
        for (var i = Object.keys(e), a = 0; a < i.length; a++) {
            var u = i[a]
                , l = u.split(".")
                , h = l[l.length - 1]
                , c = s(l, n)
                , f = e[u];
            c.data[h] = f, c.gl = t, Object.defineProperty(c, h, {
                get: r(h)
                , set: o(h, f)
            })
        }
        return n
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = f(r(9))
        , s = r(1)
        , a = f(r(4))
        , u = f(r(50))
        , l = f(r(51))
        , h = f(r(26))
        , c = r(5);

    function f(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var d = function(t) {
        function e() {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var r = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this))
                , i = a.default.TRANSFORM_MODE === s.TRANSFORM_MODE.STATIC ? u.default : l.default;
            return r.tempDisplayObjectParent = null, r.transform = new i, r.alpha = 1, r.visible = !0, r.renderable = !0, r.parent = null, r.worldAlpha = 1, r.filterArea = null, r._filters = null, r._enabledFilters = null, r._bounds = new h.default, r._boundsID = 0, r._lastBoundsID = -1, r._boundsRect = null, r._localBoundsRect = null, r._mask = null, r._destroyed = !1, r
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.updateTransform = function() {
            this.transform.updateTransform(this.parent.transform), this.worldAlpha = this.alpha * this.parent.worldAlpha, this._bounds.updateID++
        }, e.prototype._recursivePostUpdateTransform = function() {
            this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
        }, e.prototype.getBounds = function(t, e) {
            return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = this._tempDisplayObjectParent, this.updateTransform(), this.parent = null)), this._boundsID !== this._lastBoundsID && this.calculateBounds(), e || (this._boundsRect || (this._boundsRect = new c.Rectangle), e = this._boundsRect), this._bounds.getRectangle(e)
        }, e.prototype.getLocalBounds = function(t) {
            var e = this.transform
                , r = this.parent;
            this.parent = null, this.transform = this._tempDisplayObjectParent.transform, t || (this._localBoundsRect || (this._localBoundsRect = new c.Rectangle), t = this._localBoundsRect);
            var n = this.getBounds(!1, t);
            return this.parent = r, this.transform = e, n
        }, e.prototype.toGlobal = function(t, e) {
            return arguments.length > 2 && void 0 !== arguments[2] && arguments[2] || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, e)
        }, e.prototype.toLocal = function(t, e, r, n) {
            return e && (t = e.toGlobal(t, r, n)), n || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = this._tempDisplayObjectParent, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, r)
        }, e.prototype.renderWebGL = function(t) {}, e.prototype.renderCanvas = function(t) {}, e.prototype.setParent = function(t) {
            if (!t || !t.addChild) throw new Error("setParent: Argument must be a Container");
            return t.addChild(this), t
        }, e.prototype.setTransform = function() {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                , e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
                , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1
                , n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0
                , i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0
                , o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0
                , s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0
                , a = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0;
            return this.position.x = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, this.position.y = t, this.scale.x = e || 1, this.scale.y = r || 1, this.rotation = n, this.skew.x = i, this.skew.y = o, this.pivot.x = s, this.pivot.y = a, this
        }, e.prototype.destroy = function() {
            this.removeAllListeners(), this.parent && this.parent.removeChild(this), this.transform = null, this.parent = null, this._bounds = null, this._currentBounds = null, this._mask = null, this.filterArea = null, this.interactive = !1, this.interactiveChildren = !1, this._destroyed = !0
        }, i(e, [{
            key: "_tempDisplayObjectParent"
            , get: function() {
                return null === this.tempDisplayObjectParent && (this.tempDisplayObjectParent = new e), this.tempDisplayObjectParent
            }
        }, {
            key: "x"
            , get: function() {
                return this.position.x
            }
            , set: function(t) {
                this.transform.position.x = t
            }
        }, {
            key: "y"
            , get: function() {
                return this.position.y
            }
            , set: function(t) {
                this.transform.position.y = t
            }
        }, {
            key: "worldTransform"
            , get: function() {
                return this.transform.worldTransform
            }
        }, {
            key: "localTransform"
            , get: function() {
                return this.transform.localTransform
            }
        }, {
            key: "position"
            , get: function() {
                return this.transform.position
            }
            , set: function(t) {
                this.transform.position.copy(t)
            }
        }, {
            key: "scale"
            , get: function() {
                return this.transform.scale
            }
            , set: function(t) {
                this.transform.scale.copy(t)
            }
        }, {
            key: "pivot"
            , get: function() {
                return this.transform.pivot
            }
            , set: function(t) {
                this.transform.pivot.copy(t)
            }
        }, {
            key: "skew"
            , get: function() {
                return this.transform.skew
            }
            , set: function(t) {
                this.transform.skew.copy(t)
            }
        }, {
            key: "rotation"
            , get: function() {
                return this.transform.rotation
            }
            , set: function(t) {
                this.transform.rotation = t
            }
        }, {
            key: "worldVisible"
            , get: function() {
                var t = this;
                do {
                    if (!t.visible) return !1;
                    t = t.parent
                } while (t);
                return !0
            }
        }, {
            key: "mask"
            , get: function() {
                return this._mask
            }
            , set: function(t) {
                this._mask && (this._mask.renderable = !0, this._mask.isMask = !1), this._mask = t, this._mask && (this._mask.renderable = !1, this._mask.isMask = !0)
            }
        }, {
            key: "filters"
            , get: function() {
                return this._filters && this._filters.slice()
            }
            , set: function(t) {
                this._filters = t && t.slice()
            }
        }]), e
    }(o.default);
    e.default = d, d.prototype.displayObjectUpdateTransform = d.prototype.updateTransform
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = r(5)
        , s = function(t) {
            function e() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var r = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this));
                return r.position = new o.ObservablePoint(r.onChange, r, 0, 0), r.scale = new o.ObservablePoint(r.onChange, r, 1, 1), r.pivot = new o.ObservablePoint(r.onChange, r, 0, 0), r.skew = new o.ObservablePoint(r.updateSkew, r, 0, 0), r._rotation = 0, r._cx = 1, r._sx = 0, r._cy = 0, r._sy = 1, r._localID = 0, r._currentLocalID = 0, r
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.onChange = function() {
                this._localID++
            }, e.prototype.updateSkew = function() {
                this._cx = Math.cos(this._rotation + this.skew._y), this._sx = Math.sin(this._rotation + this.skew._y), this._cy = -Math.sin(this._rotation - this.skew._x), this._sy = Math.cos(this._rotation - this.skew._x), this._localID++
            }, e.prototype.updateLocalTransform = function() {
                var t = this.localTransform;
                this._localID !== this._currentLocalID && (t.a = this._cx * this.scale._x, t.b = this._sx * this.scale._x, t.c = this._cy * this.scale._y, t.d = this._sy * this.scale._y, t.tx = this.position._x - (this.pivot._x * t.a + this.pivot._y * t.c), t.ty = this.position._y - (this.pivot._x * t.b + this.pivot._y * t.d), this._currentLocalID = this._localID, this._parentID = -1)
            }, e.prototype.updateTransform = function(t) {
                var e = this.localTransform;
                if (this._localID !== this._currentLocalID && (e.a = this._cx * this.scale._x, e.b = this._sx * this.scale._x, e.c = this._cy * this.scale._y, e.d = this._sy * this.scale._y, e.tx = this.position._x - (this.pivot._x * e.a + this.pivot._y * e.c), e.ty = this.position._y - (this.pivot._x * e.b + this.pivot._y * e.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== t._worldID) {
                    var r = t.worldTransform
                        , n = this.worldTransform;
                    n.a = e.a * r.a + e.b * r.c, n.b = e.a * r.b + e.b * r.d, n.c = e.c * r.a + e.d * r.c, n.d = e.c * r.b + e.d * r.d, n.tx = e.tx * r.a + e.ty * r.c + r.tx, n.ty = e.tx * r.b + e.ty * r.d + r.ty, this._parentID = t._worldID, this._worldID++
                }
            }, e.prototype.setFromMatrix = function(t) {
                t.decompose(this), this._localID++
            }, i(e, [{
                key: "rotation"
                , get: function() {
                    return this._rotation
                }
                , set: function(t) {
                    this._rotation = t, this.updateSkew()
                }
            }]), e
        }(function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(28)).default);
    e.default = s
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = r(5)
        , s = function(t) {
            function e() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var r = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this));
                return r.position = new o.Point(0, 0), r.scale = new o.Point(1, 1), r.skew = new o.ObservablePoint(r.updateSkew, r, 0, 0), r.pivot = new o.Point(0, 0), r._rotation = 0, r._cx = 1, r._sx = 0, r._cy = 0, r._sy = 1, r
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.updateSkew = function() {
                this._cx = Math.cos(this._rotation + this.skew._y), this._sx = Math.sin(this._rotation + this.skew._y), this._cy = -Math.sin(this._rotation - this.skew._x), this._sy = Math.cos(this._rotation - this.skew._x)
            }, e.prototype.updateLocalTransform = function() {
                var t = this.localTransform;
                t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d)
            }, e.prototype.updateTransform = function(t) {
                var e = this.localTransform;
                e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d);
                var r = t.worldTransform
                    , n = this.worldTransform;
                n.a = e.a * r.a + e.b * r.c, n.b = e.a * r.b + e.b * r.d, n.c = e.c * r.a + e.d * r.c, n.d = e.c * r.b + e.d * r.d, n.tx = e.tx * r.a + e.ty * r.c + r.tx, n.ty = e.tx * r.b + e.ty * r.d + r.ty, this._worldID++
            }, e.prototype.setFromMatrix = function(t) {
                t.decompose(this)
            }, i(e, [{
                key: "rotation"
                , get: function() {
                    return this._rotation
                }
                , set: function(t) {
                    this._rotation = t, this.updateSkew()
                }
            }]), e
        }(function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(28)).default);
    e.default = s
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.location;
        if (0 === t.indexOf("data:")) return "";
        e = e || window.location, i || (i = document.createElement("a")), i.href = t;
        var r = !(t = n.default.parse(i.href)).port && "" === e.port || t.port === e.port;
        return t.hostname === e.hostname && r && t.protocol === e.protocol ? "" : "anonymous"
    };
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(53))
        , i = void 0
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    var i = r(114)
        , o = r(116);

    function s() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
    }
    e.parse = b, e.resolve = function(t, e) {
        return b(t, !1, !0).resolve(e)
    }, e.resolveObject = function(t, e) {
        return t ? b(t, !1, !0).resolveObject(e) : e
    }, e.format = function(t) {
        return o.isString(t) && (t = b(t)), t instanceof s ? t.format() : s.prototype.format.call(t)
    }, e.Url = s;
    var a = /^([a-z0-9.+-]+:)/i
        , u = /:[0-9]*$/
        , l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
        , h = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"])
        , c = ["'"].concat(h)
        , f = ["%", "/", "?", ";", "#"].concat(c)
        , d = ["/", "?", "#"]
        , p = /^[+a-z0-9A-Z_-]{0,63}$/
        , _ = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
        , y = {
            javascript: !0
            , "javascript:": !0
        }
        , m = {
            javascript: !0
            , "javascript:": !0
        }
        , v = {
            http: !0
            , https: !0
            , ftp: !0
            , gopher: !0
            , file: !0
            , "http:": !0
            , "https:": !0
            , "ftp:": !0
            , "gopher:": !0
            , "file:": !0
        }
        , g = r(117);

    function b(t, e, r) {
        if (t && o.isObject(t) && t instanceof s) return t;
        var n = new s;
        return n.parse(t, e, r), n
    }
    s.prototype.parse = function(t, e, r) {
        if (!o.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + n(t));
        var s = t.indexOf("?")
            , u = -1 !== s && s < t.indexOf("#") ? "?" : "#"
            , h = t.split(u);
        h[0] = h[0].replace(/\\/g, "/");
        var b = t = h.join(u);
        if (b = b.trim(), !r && 1 === t.split("#").length) {
            var T = l.exec(b);
            if (T) return this.path = b, this.href = b, this.pathname = T[1], T[2] ? (this.search = T[2], this.query = e ? g.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this
        }
        var x = a.exec(b);
        if (x) {
            var w = (x = x[0]).toLowerCase();
            this.protocol = w, b = b.substr(x.length)
        }
        if (r || x || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var E = "//" === b.substr(0, 2);
            !E || x && m[x] || (b = b.substr(2), this.slashes = !0)
        }
        if (!m[x] && (E || x && !v[x])) {
            for (var S, O, P = -1, C = 0; C < d.length; C++) - 1 !== (M = b.indexOf(d[C])) && (-1 === P || M < P) && (P = M);
            for (-1 !== (O = -1 === P ? b.lastIndexOf("@") : b.lastIndexOf("@", P)) && (S = b.slice(0, O), b = b.slice(O + 1), this.auth = decodeURIComponent(S)), P = -1, C = 0; C < f.length; C++) {
                var M; - 1 !== (M = b.indexOf(f[C])) && (-1 === P || M < P) && (P = M)
            } - 1 === P && (P = b.length), this.host = b.slice(0, P), b = b.slice(P), this.parseHost(), this.hostname = this.hostname || "";
            var A = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!A)
                for (var I = this.hostname.split(/\./), R = (C = 0, I.length); C < R; C++) {
                    var D = I[C];
                    if (D && !D.match(p)) {
                        for (var k = "", L = 0, N = D.length; L < N; L++) D.charCodeAt(L) > 127 ? k += "x" : k += D[L];
                        if (!k.match(p)) {
                            var j = I.slice(0, C)
                                , F = I.slice(C + 1)
                                , B = D.match(_);
                            B && (j.push(B[1]), F.unshift(B[2])), F.length && (b = "/" + F.join(".") + b), this.hostname = j.join(".");
                            break
                        }
                    }
                }
            this.hostname = this.hostname.length > 255 ? "" : this.hostname.toLowerCase(), A || (this.hostname = i.toASCII(this.hostname));
            var U = this.port ? ":" + this.port : "";
            this.host = (this.hostname || "") + U, this.href += this.host, A && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== b[0] && (b = "/" + b))
        }
        if (!y[w])
            for (C = 0, R = c.length; C < R; C++) {
                var G = c[C];
                if (-1 !== b.indexOf(G)) {
                    var X = encodeURIComponent(G);
                    X === G && (X = escape(G)), b = b.split(G).join(X)
                }
            }
        var W = b.indexOf("#"); - 1 !== W && (this.hash = b.substr(W), b = b.slice(0, W));
        var H = b.indexOf("?");
        return -1 !== H ? (this.search = b.substr(H), this.query = b.substr(H + 1), e && (this.query = g.parse(this.query)), b = b.slice(0, H)) : e && (this.search = "", this.query = {}), b && (this.pathname = b), v[w] && this.hostname && !this.pathname && (this.pathname = "/"), (this.pathname || this.search) && (this.path = (U = this.pathname || "") + (this.search || "")), this.href = this.format(), this
    }, s.prototype.format = function() {
        var t = this.auth || "";
        t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
        var e = this.protocol || ""
            , r = this.pathname || ""
            , n = this.hash || ""
            , i = !1
            , s = "";
        this.host ? i = t + this.host : this.hostname && (i = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (i += ":" + this.port)), this.query && o.isObject(this.query) && Object.keys(this.query).length && (s = g.stringify(this.query));
        var a = this.search || s && "?" + s || "";
        return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || v[e]) && !1 !== i ? (i = "//" + (i || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : i || (i = ""), n && "#" !== n.charAt(0) && (n = "#" + n), a && "?" !== a.charAt(0) && (a = "?" + a), e + i + (r = r.replace(/[?#]/g, function(t) {
            return encodeURIComponent(t)
        })) + (a = a.replace("#", "%23")) + n
    }, s.prototype.resolve = function(t) {
        return this.resolveObject(b(t, !1, !0)).format()
    }, s.prototype.resolveObject = function(t) {
        if (o.isString(t)) {
            var e = new s;
            e.parse(t, !1, !0), t = e
        }
        for (var r = new s, n = Object.keys(this), i = 0; i < n.length; i++) {
            var a = n[i];
            r[a] = this[a]
        }
        if (r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
        if (t.slashes && !t.protocol) {
            for (var u = Object.keys(t), l = 0; l < u.length; l++) {
                var h = u[l];
                "protocol" !== h && (r[h] = t[h])
            }
            return v[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r
        }
        if (t.protocol && t.protocol !== r.protocol) {
            if (!v[t.protocol]) {
                for (var c = Object.keys(t), f = 0; f < c.length; f++) {
                    var d = c[f];
                    r[d] = t[d]
                }
                return r.href = r.format(), r
            }
            if (r.protocol = t.protocol, t.host || m[t.protocol]) r.pathname = t.pathname;
            else {
                for (var p = (t.pathname || "").split("/"); p.length && !(t.host = p.shift()););
                t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== p[0] && p.unshift(""), p.length < 2 && p.unshift(""), r.pathname = p.join("/")
            }
            return r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, (r.pathname || r.search) && (r.path = (r.pathname || "") + (r.search || "")), r.slashes = r.slashes || t.slashes, r.href = r.format(), r
        }
        var _ = r.pathname && "/" === r.pathname.charAt(0)
            , y = t.host || t.pathname && "/" === t.pathname.charAt(0)
            , g = y || _ || r.host && t.pathname
            , b = g
            , T = r.pathname && r.pathname.split("/") || []
            , x = (p = t.pathname && t.pathname.split("/") || [], r.protocol && !v[r.protocol]);
        if (x && (r.hostname = "", r.port = null, r.host && ("" === T[0] ? T[0] = r.host : T.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === p[0] ? p[0] = t.host : p.unshift(t.host)), t.host = null), g = g && ("" === p[0] || "" === T[0])), y) r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, T = p;
        else if (p.length) T || (T = []), T.pop(), T = T.concat(p), r.search = t.search, r.query = t.query;
        else if (!o.isNullOrUndefined(t.search)) return x && (r.hostname = r.host = T.shift(), (P = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = P.shift(), r.host = r.hostname = P.shift())), r.search = t.search, r.query = t.query, o.isNull(r.pathname) && o.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
        if (!T.length) return r.pathname = null, r.path = r.search ? "/" + r.search : null, r.href = r.format(), r;
        for (var w = T.slice(-1)[0], E = (r.host || t.host || T.length > 1) && ("." === w || ".." === w) || "" === w, S = 0, O = T.length; O >= 0; O--) "." === (w = T[O]) ? T.splice(O, 1) : ".." === w ? (T.splice(O, 1), S++) : S && (T.splice(O, 1), S--);
        if (!g && !b)
            for (; S--; S) T.unshift("..");
        !g || "" === T[0] || T[0] && "/" === T[0].charAt(0) || T.unshift(""), E && "/" !== T.join("/").substr(-1) && T.push("");
        var P, C = "" === T[0] || T[0] && "/" === T[0].charAt(0);
        return x && (r.hostname = r.host = C ? "" : T.length ? T.shift() : "", (P = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = P.shift(), r.host = r.hostname = P.shift())), (g = g || r.host && T.length) && !C && T.unshift(""), T.length ? r.pathname = T.join("/") : (r.pathname = null, r.path = null), o.isNull(r.pathname) && o.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r
    }, s.prototype.parseHost = function() {
        var t = this.host
            , e = u.exec(t);
        e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
    }
}, function(t, e) {
    (function(e) {
        t.exports = e
    }).call(this, {})
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = h(r(10))
        , s = r(3)
        , a = r(32)
        , u = r(1)
        , l = h(r(52));

    function h(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var c = function(t) {
        function e(r, i) {
            if (function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e), !r) throw new Error("No video source element specified.");
            (r.readyState === r.HAVE_ENOUGH_DATA || r.readyState === r.HAVE_FUTURE_DATA) && r.width && r.height && (r.complete = !0);
            var o = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, r, i));
            return o.width = r.videoWidth, o.height = r.videoHeight, o._autoUpdate = !0, o._isAutoUpdating = !1, o.autoPlay = !0, o.update = o.update.bind(o), o._onCanPlay = o._onCanPlay.bind(o), r.addEventListener("play", o._onPlayStart.bind(o)), r.addEventListener("pause", o._onPlayStop.bind(o)), o.hasLoaded = !1, o.__loaded = !1, o._isSourceReady() ? o._onCanPlay() : (r.addEventListener("canplay", o._onCanPlay), r.addEventListener("canplaythrough", o._onCanPlay)), o
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype._isSourcePlaying = function() {
            var t = this.source;
            return t.currentTime > 0 && !1 === t.paused && !1 === t.ended && t.readyState > 2
        }, e.prototype._isSourceReady = function() {
            return 3 === this.source.readyState || 4 === this.source.readyState
        }, e.prototype._onPlayStart = function() {
            this.hasLoaded || this._onCanPlay(), !this._isAutoUpdating && this.autoUpdate && (a.shared.add(this.update, this, u.UPDATE_PRIORITY.HIGH), this._isAutoUpdating = !0)
        }, e.prototype._onPlayStop = function() {
            this._isAutoUpdating && (a.shared.remove(this.update, this), this._isAutoUpdating = !1)
        }, e.prototype._onCanPlay = function() {
            this.hasLoaded = !0, this.source && (this.source.removeEventListener("canplay", this._onCanPlay), this.source.removeEventListener("canplaythrough", this._onCanPlay), this.width = this.source.videoWidth, this.height = this.source.videoHeight, this.__loaded || (this.__loaded = !0, this.emit("loaded", this)), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.source.play())
        }, e.prototype.destroy = function() {
            this._isAutoUpdating && a.shared.remove(this.update, this), this.source && this.source._pixiId && (o.default.removeFromCache(this.source._pixiId), delete this.source._pixiId, this.source.pause(), this.source.src = "", this.source.load()), t.prototype.destroy.call(this)
        }, e.fromVideo = function(t, r) {
            t._pixiId || (t._pixiId = "video_" + (0, s.uid)());
            var n = s.BaseTextureCache[t._pixiId];
            return n || (n = new e(t, r), o.default.addToCache(n, t._pixiId)), n
        }, e.fromUrl = function(t, r, n) {
            var i = document.createElement("video");
            i.setAttribute("webkit-playsinline", ""), i.setAttribute("playsinline", "");
            var o = Array.isArray(t) ? t[0].src || t[0] : t.src || t;
            if (void 0 === n && 0 !== o.indexOf("data:") ? i.crossOrigin = (0, l.default)(o) : n && (i.crossOrigin = "string" == typeof n ? n : "anonymous"), Array.isArray(t))
                for (var s = 0; s < t.length; ++s) i.appendChild(f(t[s].src || t[s], t[s].mime));
            else i.appendChild(f(o, t.mime));
            return i.load(), e.fromVideo(i, r)
        }, i(e, [{
            key: "autoUpdate"
            , get: function() {
                return this._autoUpdate
            }
            , set: function(t) {
                t !== this._autoUpdate && (this._autoUpdate = t, !this._autoUpdate && this._isAutoUpdating ? (a.shared.remove(this.update, this), this._isAutoUpdating = !1) : this._autoUpdate && !this._isAutoUpdating && (a.shared.add(this.update, this, u.UPDATE_PRIORITY.HIGH), this._isAutoUpdating = !0))
            }
        }]), e
    }(o.default);

    function f(t, e) {
        e || (e = "video/" + (t = t.split("?").shift().toLowerCase()).substr(t.lastIndexOf(".") + 1));
        var r = document.createElement("source");
        return r.src = t, r.type = e, r
    }
    e.default = c, c.fromUrls = c.fromUrl
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(39))
        , i = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsUint32 = new Uint32Array(4)
            }
            return t.prototype.set = function(t, e, r) {
                var i = e.width
                    , o = e.height;
                if (r) {
                    var s = t.width / 2 / i
                        , a = t.height / 2 / o
                        , u = t.x / i + s
                        , l = t.y / o + a;
                    r = n.default.add(r, n.default.NW), this.x0 = u + s * n.default.uX(r), this.y0 = l + a * n.default.uY(r), r = n.default.add(r, 2), this.x1 = u + s * n.default.uX(r), this.y1 = l + a * n.default.uY(r), r = n.default.add(r, 2), this.x2 = u + s * n.default.uX(r), this.y2 = l + a * n.default.uY(r), r = n.default.add(r, 2), this.x3 = u + s * n.default.uX(r), this.y3 = l + a * n.default.uY(r)
                } else this.x0 = t.x / i, this.y0 = t.y / o, this.x1 = (t.x + t.width) / i, this.y1 = t.y / o, this.x2 = (t.x + t.width) / i, this.y2 = (t.y + t.height) / o, this.x3 = t.x / i, this.y3 = (t.y + t.height) / o;
                this.uvsUint32[0] = (65535 * this.y0 & 65535) << 16 | 65535 * this.x0 & 65535, this.uvsUint32[1] = (65535 * this.y1 & 65535) << 16 | 65535 * this.x1 & 65535, this.uvsUint32[2] = (65535 * this.y2 & 65535) << 16 | 65535 * this.x2 & 65535, this.uvsUint32[3] = (65535 * this.y3 & 65535) << 16 | 65535 * this.x3 & 65535
            }, t
        }();
    e.default = i
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = r(3)
        , s = r(5)
        , a = r(1)
        , u = f(r(4))
        , l = f(r(11))
        , h = f(r(33))
        , c = f(r(9));

    function f(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var d = new s.Matrix
        , p = function(t) {
            function e(r, i, h, c) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var f = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this));
                return (0, o.sayHello)(r), "number" == typeof i && (i = Object.assign({
                    width: i
                    , height: h || u.default.RENDER_OPTIONS.height
                }, c)), i = Object.assign({}, u.default.RENDER_OPTIONS, i), f.options = i, f.type = a.RENDERER_TYPE.UNKNOWN, f.screen = new s.Rectangle(0, 0, i.width, i.height), f.view = i.view || document.createElement("canvas"), f.resolution = i.resolution || u.default.RESOLUTION, f.transparent = i.transparent, f.autoResize = i.autoResize || !1, f.blendModes = null, f.preserveDrawingBuffer = i.preserveDrawingBuffer, f.clearBeforeRender = i.clearBeforeRender, f.roundPixels = i.roundPixels, f._backgroundColor = 0, f._backgroundColorRgba = [0, 0, 0, 0], f._backgroundColorString = "#000000", f.backgroundColor = i.backgroundColor || f._backgroundColor, f._tempDisplayObjectParent = new l.default, f._lastObjectRendered = f._tempDisplayObjectParent, f
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.resize = function(t, e) {
                this.screen.width = t, this.screen.height = e, this.view.width = t * this.resolution, this.view.height = e * this.resolution, this.autoResize && (this.view.style.width = t + "px", this.view.style.height = e + "px")
            }, e.prototype.generateTexture = function(t, e, r, n) {
                n = n || t.getLocalBounds();
                var i = h.default.create(0 | n.width, 0 | n.height, e, r);
                return d.tx = -n.x, d.ty = -n.y, this.render(t, i, !1, d, !!t.parent), i
            }, e.prototype.destroy = function(t) {
                t && this.view.parentNode && this.view.parentNode.removeChild(this.view), this.type = a.RENDERER_TYPE.UNKNOWN, this.view = null, this.screen = null, this.resolution = 0, this.transparent = !1, this.autoResize = !1, this.blendModes = null, this.options = null, this.preserveDrawingBuffer = !1, this.clearBeforeRender = !1, this.roundPixels = !1, this._backgroundColor = 0, this._backgroundColorRgba = null, this._backgroundColorString = null, this._tempDisplayObjectParent = null, this._lastObjectRendered = null
            }, i(e, [{
                key: "width"
                , get: function() {
                    return this.view.width
                }
            }, {
                key: "height"
                , get: function() {
                    return this.view.height
                }
            }, {
                key: "backgroundColor"
                , get: function() {
                    return this._backgroundColor
                }
                , set: function(t) {
                    this._backgroundColor = t, this._backgroundColorString = (0, o.hex2string)(t), (0, o.hex2rgb)(t, this._backgroundColorRgba)
                }
            }]), e
        }(c.default);
    e.default = p
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = s(r(10))
        , o = s(r(4));

    function s(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var a = function(t) {
        function e() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100
                , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100
                , s = arguments[2]
                , a = arguments[3];
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var u = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, null, s));
            return u.resolution = a || o.default.RESOLUTION, u.width = Math.ceil(r), u.height = Math.ceil(i), u.realWidth = u.width * u.resolution, u.realHeight = u.height * u.resolution, u.scaleMode = void 0 !== s ? s : o.default.SCALE_MODE, u.hasLoaded = !0, u._glRenderTargets = {}, u._canvasRenderTarget = null, u.valid = !1, u
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.resize = function(t, e) {
            t = Math.ceil(t), e = Math.ceil(e), t === this.width && e === this.height || (this.valid = t > 0 && e > 0, this.width = t, this.height = e, this.realWidth = this.width * this.resolution, this.realHeight = this.height * this.resolution, this.valid && this.emit("update", this))
        }, e.prototype.destroy = function() {
            t.prototype.destroy.call(this, !0), this.renderer = null
        }, e
    }(i.default);
    e.default = a
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(4))
        , o = function() {
            function t(e, r, n) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = n || i.default.RESOLUTION, this.resize(e, r)
            }
            return t.prototype.clear = function() {
                this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            }, t.prototype.resize = function(t, e) {
                this.canvas.width = t * this.resolution, this.canvas.height = e * this.resolution
            }, t.prototype.destroy = function() {
                this.context = null, this.canvas = null
            }, n(t, [{
                key: "width"
                , get: function() {
                    return this.canvas.width
                }
                , set: function(t) {
                    this.canvas.width = t
                }
            }, {
                key: "height"
                , get: function() {
                    return this.canvas.height
                }
                , set: function(t) {
                    this.canvas.height = t
                }
            }]), t
        }();
    e.default = o
}, function(t, e, r) {
    "use strict";

    function n(t) {
        var e = document.createElement("canvas");
        e.width = 6, e.height = 1;
        var r = e.getContext("2d");
        return r.fillStyle = t, r.fillRect(0, 0, 6, 1), e
    }
    e.__esModule = !0, e.default = function() {
        if ("undefined" == typeof document) return !1;
        var t = n("#ff00ff")
            , e = n("#ffff00")
            , r = document.createElement("canvas");
        r.width = 6, r.height = 1;
        var i = r.getContext("2d");
        i.globalCompositeOperation = "multiply", i.drawImage(t, 0, 0), i.drawImage(e, 2, 0);
        var o = i.getImageData(2, 0, 1, 1);
        if (!o) return !1;
        var s = o.data;
        return 255 === s[0] && 0 === s[1] && 0 === s[2]
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = a(r(62))
        , o = r(5)
        , s = (r(7), a(r(63)));

    function a(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var u = function(t) {
        function e(r) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var i = new o.Matrix
                , s = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", "varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform sampler2D mask;\nuniform float alpha;\nuniform vec4 maskClamp;\n\nvoid main(void)\n{\n    float clip = step(3.5,\n        step(maskClamp.x, vMaskCoord.x) +\n        step(maskClamp.y, vMaskCoord.y) +\n        step(vMaskCoord.x, maskClamp.z) +\n        step(vMaskCoord.y, maskClamp.w));\n\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n\n    original *= (masky.r * masky.a * alpha * clip);\n\n    gl_FragColor = original;\n}\n"));
            return r.renderable = !1, s.maskSprite = r, s.maskMatrix = i, s
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.apply = function(t, e, r) {
            var n = this.maskSprite
                , i = this.maskSprite.texture;
            i.valid && (i.transform || (i.transform = new s.default(i, 0)), i.transform.update(), this.uniforms.mask = i, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, n).prepend(i.transform.mapCoord), this.uniforms.alpha = n.worldAlpha, this.uniforms.maskClamp = i.transform.uClampFrame, t.applyFilter(this, e, r))
        }, e
    }(i.default);
    e.default = u
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = u(r(127))
        , o = r(3)
        , s = r(1)
        , a = u(r(4));

    function u(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var l = {}
        , h = function() {
            function t(e, r, n) {
                for (var u in function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.vertexSrc = e || t.defaultVertexSrc, this.fragmentSrc = r || t.defaultFragmentSrc, this._blendMode = s.BLEND_MODES.NORMAL, this.uniformData = n || (0, i.default)(this.vertexSrc, this.fragmentSrc, "projectionMatrix|uSampler"), this.uniforms = {}, this.uniformData) this.uniforms[u] = this.uniformData[u].value, this.uniformData[u].type && (this.uniformData[u].type = this.uniformData[u].type.toLowerCase());
                this.glShaders = {}, l[this.vertexSrc + this.fragmentSrc] || (l[this.vertexSrc + this.fragmentSrc] = (0, o.uid)()), this.glShaderKey = l[this.vertexSrc + this.fragmentSrc], this.padding = 4, this.resolution = a.default.FILTER_RESOLUTION, this.enabled = !0, this.autoFit = !0
            }
            return t.prototype.apply = function(t, e, r, n, i) {
                t.applyFilter(this, e, r, n)
            }, n(t, [{
                key: "blendMode"
                , get: function() {
                    return this._blendMode
                }
                , set: function(t) {
                    this._blendMode = t
                }
            }], [{
                key: "defaultVertexSrc"
                , get: function() {
                    return ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 projectionMatrix;", "uniform mat3 filterMatrix;", "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;", "   vTextureCoord = aTextureCoord ;", "}"].join("\n")
                }
            }, {
                key: "defaultFragmentSrc"
                , get: function() {
                    return ["varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "uniform sampler2D uSampler;", "uniform sampler2D filterSampler;", "void main(void){", "   vec4 masky = texture2D(filterSampler, vFilterCoord);", "   vec4 sample = texture2D(uSampler, vTextureCoord);", "   vec4 color;", "   if(mod(vFilterCoord.x, 1.0) > 0.5)", "   {", "     color = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   else", "   {", "     color = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   gl_FragColor = mix(sample, masky, 0.5);", "   gl_FragColor *= sample.a;", "}"].join("\n")
                }
            }]), t
        }();
    e.default = h
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(23))
        , o = new i.default
        , s = function() {
            function t(e, r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._texture = e, this.mapCoord = new i.default, this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._lastTextureID = -1, this.clampOffset = 0, this.clampMargin = void 0 === r ? .5 : r
            }
            return t.prototype.multiplyUvs = function(t, e) {
                void 0 === e && (e = t);
                for (var r = this.mapCoord, n = 0; n < t.length; n += 2) {
                    var i = t[n]
                        , o = t[n + 1];
                    e[n] = i * r.a + o * r.c + r.tx, e[n + 1] = i * r.b + o * r.d + r.ty
                }
                return e
            }, t.prototype.update = function(t) {
                var e = this._texture;
                if (!e || !e.valid) return !1;
                if (!t && this._lastTextureID === e._updateID) return !1;
                this._lastTextureID = e._updateID;
                var r = e._uvs;
                this.mapCoord.set(r.x1 - r.x0, r.y1 - r.y0, r.x3 - r.x0, r.y3 - r.y0, r.x0, r.y0);
                var n = e.orig
                    , i = e.trim;
                i && (o.set(n.width / i.width, 0, 0, n.height / i.height, -i.x / i.width, -i.y / i.height), this.mapCoord.append(o));
                var s = e.baseTexture
                    , a = this.uClampFrame
                    , u = this.clampMargin / s.resolution
                    , l = this.clampOffset;
                return a[0] = (e._frame.x + u + l) / s.width, a[1] = (e._frame.y + u + l) / s.height, a[2] = (e._frame.x + e._frame.width - u + l) / s.width, a[3] = (e._frame.y + e._frame.height - u + l) / s.height, this.uClampOffset[0] = l / s.realWidth, this.uClampOffset[1] = l / s.realHeight, !0
            }, n(t, [{
                key: "texture"
                , get: function() {
                    return this._texture
                }
                , set: function(t) {
                    this._texture = t, this._lastTextureID = -1
                }
            }]), t
        }();
    e.default = s
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = o(r(6))
        , i = o(r(35));

    function o(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var s = function() {
        function t(e, r) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.gl = e, this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.interleaved = new Float32Array(16);
            for (var o = 0; o < 4; o++) this.interleaved[4 * o] = this.vertices[2 * o], this.interleaved[4 * o + 1] = this.vertices[2 * o + 1], this.interleaved[4 * o + 2] = this.uvs[2 * o], this.interleaved[4 * o + 3] = this.uvs[2 * o + 1];
            this.indices = (0, i.default)(1), this.vertexBuffer = n.default.GLBuffer.createVertexBuffer(e, this.interleaved, e.STATIC_DRAW), this.indexBuffer = n.default.GLBuffer.createIndexBuffer(e, this.indices, e.STATIC_DRAW), this.vao = new n.default.VertexArrayObject(e, r)
        }
        return t.prototype.initVao = function(t) {
            this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer, t.attributes.aVertexPosition, this.gl.FLOAT, !1, 16, 0).addAttribute(this.vertexBuffer, t.attributes.aTextureCoord, this.gl.FLOAT, !1, 16, 8)
        }, t.prototype.map = function(t, e) {
            var r = 0
                , n = 0;
            return this.uvs[0] = r, this.uvs[1] = n, this.uvs[2] = r + e.width / t.width, this.uvs[3] = n, this.uvs[4] = r + e.width / t.width, this.uvs[5] = n + e.height / t.height, this.uvs[6] = r, this.uvs[7] = n + e.height / t.height, n = e.y, this.vertices[0] = r = e.x, this.vertices[1] = n, this.vertices[2] = r + e.width, this.vertices[3] = n, this.vertices[4] = r + e.width, this.vertices[5] = n + e.height, this.vertices[6] = r, this.vertices[7] = n + e.height, this
        }, t.prototype.upload = function() {
            for (var t = 0; t < 4; t++) this.interleaved[4 * t] = this.vertices[2 * t], this.interleaved[4 * t + 1] = this.vertices[2 * t + 1], this.interleaved[4 * t + 2] = this.uvs[2 * t], this.interleaved[4 * t + 3] = this.uvs[2 * t + 1];
            return this.vertexBuffer.upload(this.interleaved), this
        }, t.prototype.destroy = function() {
            var t = this.gl;
            t.deleteBuffer(this.vertexBuffer), t.deleteBuffer(this.indexBuffer)
        }, t
    }();
    e.default = s
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = r(1)
        , o = r(3)
        , s = {
            align: "left"
            , breakWords: !1
            , dropShadow: !1
            , dropShadowAlpha: 1
            , dropShadowAngle: Math.PI / 6
            , dropShadowBlur: 0
            , dropShadowColor: "black"
            , dropShadowDistance: 5
            , fill: "black"
            , fillGradientType: i.TEXT_GRADIENT.LINEAR_VERTICAL
            , fillGradientStops: []
            , fontFamily: "Arial"
            , fontSize: 26
            , fontStyle: "normal"
            , fontVariant: "normal"
            , fontWeight: "normal"
            , letterSpacing: 0
            , lineHeight: 0
            , lineJoin: "miter"
            , miterLimit: 10
            , padding: 0
            , stroke: "black"
            , strokeThickness: 0
            , textBaseline: "alphabetic"
            , trim: !1
            , whiteSpace: "pre"
            , wordWrap: !1
            , wordWrapWidth: 100
            , leading: 0
        }
        , a = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"]
        , u = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.styleID = 0, this.reset(), c(this, e, e)
            }
            return t.prototype.clone = function() {
                var e = {};
                return c(e, this, s), new t(e)
            }, t.prototype.reset = function() {
                c(this, s, s)
            }, t.prototype.toFontString = function() {
                var t = "number" == typeof this.fontSize ? this.fontSize + "px" : this.fontSize
                    , e = this.fontFamily;
                Array.isArray(this.fontFamily) || (e = this.fontFamily.split(","));
                for (var r = e.length - 1; r >= 0; r--) {
                    var n = e[r].trim();
                    !/([\"\'])[^\'\"]+\1/.test(n) && a.indexOf(n) < 0 && (n = '"' + n + '"'), e[r] = n
                }
                return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + t + " " + e.join(",")
            }, n(t, [{
                key: "align"
                , get: function() {
                    return this._align
                }
                , set: function(t) {
                    this._align !== t && (this._align = t, this.styleID++)
                }
            }, {
                key: "breakWords"
                , get: function() {
                    return this._breakWords
                }
                , set: function(t) {
                    this._breakWords !== t && (this._breakWords = t, this.styleID++)
                }
            }, {
                key: "dropShadow"
                , get: function() {
                    return this._dropShadow
                }
                , set: function(t) {
                    this._dropShadow !== t && (this._dropShadow = t, this.styleID++)
                }
            }, {
                key: "dropShadowAlpha"
                , get: function() {
                    return this._dropShadowAlpha
                }
                , set: function(t) {
                    this._dropShadowAlpha !== t && (this._dropShadowAlpha = t, this.styleID++)
                }
            }, {
                key: "dropShadowAngle"
                , get: function() {
                    return this._dropShadowAngle
                }
                , set: function(t) {
                    this._dropShadowAngle !== t && (this._dropShadowAngle = t, this.styleID++)
                }
            }, {
                key: "dropShadowBlur"
                , get: function() {
                    return this._dropShadowBlur
                }
                , set: function(t) {
                    this._dropShadowBlur !== t && (this._dropShadowBlur = t, this.styleID++)
                }
            }, {
                key: "dropShadowColor"
                , get: function() {
                    return this._dropShadowColor
                }
                , set: function(t) {
                    var e = h(t);
                    this._dropShadowColor !== e && (this._dropShadowColor = e, this.styleID++)
                }
            }, {
                key: "dropShadowDistance"
                , get: function() {
                    return this._dropShadowDistance
                }
                , set: function(t) {
                    this._dropShadowDistance !== t && (this._dropShadowDistance = t, this.styleID++)
                }
            }, {
                key: "fill"
                , get: function() {
                    return this._fill
                }
                , set: function(t) {
                    var e = h(t);
                    this._fill !== e && (this._fill = e, this.styleID++)
                }
            }, {
                key: "fillGradientType"
                , get: function() {
                    return this._fillGradientType
                }
                , set: function(t) {
                    this._fillGradientType !== t && (this._fillGradientType = t, this.styleID++)
                }
            }, {
                key: "fillGradientStops"
                , get: function() {
                    return this._fillGradientStops
                }
                , set: function(t) {
                    (function(t, e) {
                        if (!Array.isArray(t) || !Array.isArray(e)) return !1;
                        if (t.length !== e.length) return !1;
                        for (var r = 0; r < t.length; ++r)
                            if (t[r] !== e[r]) return !1;
                        return !0
                    })(this._fillGradientStops, t) || (this._fillGradientStops = t, this.styleID++)
                }
            }, {
                key: "fontFamily"
                , get: function() {
                    return this._fontFamily
                }
                , set: function(t) {
                    this.fontFamily !== t && (this._fontFamily = t, this.styleID++)
                }
            }, {
                key: "fontSize"
                , get: function() {
                    return this._fontSize
                }
                , set: function(t) {
                    this._fontSize !== t && (this._fontSize = t, this.styleID++)
                }
            }, {
                key: "fontStyle"
                , get: function() {
                    return this._fontStyle
                }
                , set: function(t) {
                    this._fontStyle !== t && (this._fontStyle = t, this.styleID++)
                }
            }, {
                key: "fontVariant"
                , get: function() {
                    return this._fontVariant
                }
                , set: function(t) {
                    this._fontVariant !== t && (this._fontVariant = t, this.styleID++)
                }
            }, {
                key: "fontWeight"
                , get: function() {
                    return this._fontWeight
                }
                , set: function(t) {
                    this._fontWeight !== t && (this._fontWeight = t, this.styleID++)
                }
            }, {
                key: "letterSpacing"
                , get: function() {
                    return this._letterSpacing
                }
                , set: function(t) {
                    this._letterSpacing !== t && (this._letterSpacing = t, this.styleID++)
                }
            }, {
                key: "lineHeight"
                , get: function() {
                    return this._lineHeight
                }
                , set: function(t) {
                    this._lineHeight !== t && (this._lineHeight = t, this.styleID++)
                }
            }, {
                key: "leading"
                , get: function() {
                    return this._leading
                }
                , set: function(t) {
                    this._leading !== t && (this._leading = t, this.styleID++)
                }
            }, {
                key: "lineJoin"
                , get: function() {
                    return this._lineJoin
                }
                , set: function(t) {
                    this._lineJoin !== t && (this._lineJoin = t, this.styleID++)
                }
            }, {
                key: "miterLimit"
                , get: function() {
                    return this._miterLimit
                }
                , set: function(t) {
                    this._miterLimit !== t && (this._miterLimit = t, this.styleID++)
                }
            }, {
                key: "padding"
                , get: function() {
                    return this._padding
                }
                , set: function(t) {
                    this._padding !== t && (this._padding = t, this.styleID++)
                }
            }, {
                key: "stroke"
                , get: function() {
                    return this._stroke
                }
                , set: function(t) {
                    var e = h(t);
                    this._stroke !== e && (this._stroke = e, this.styleID++)
                }
            }, {
                key: "strokeThickness"
                , get: function() {
                    return this._strokeThickness
                }
                , set: function(t) {
                    this._strokeThickness !== t && (this._strokeThickness = t, this.styleID++)
                }
            }, {
                key: "textBaseline"
                , get: function() {
                    return this._textBaseline
                }
                , set: function(t) {
                    this._textBaseline !== t && (this._textBaseline = t, this.styleID++)
                }
            }, {
                key: "trim"
                , get: function() {
                    return this._trim
                }
                , set: function(t) {
                    this._trim !== t && (this._trim = t, this.styleID++)
                }
            }, {
                key: "whiteSpace"
                , get: function() {
                    return this._whiteSpace
                }
                , set: function(t) {
                    this._whiteSpace !== t && (this._whiteSpace = t, this.styleID++)
                }
            }, {
                key: "wordWrap"
                , get: function() {
                    return this._wordWrap
                }
                , set: function(t) {
                    this._wordWrap !== t && (this._wordWrap = t, this.styleID++)
                }
            }, {
                key: "wordWrapWidth"
                , get: function() {
                    return this._wordWrapWidth
                }
                , set: function(t) {
                    this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.styleID++)
                }
            }]), t
        }();

    function l(t) {
        return "number" == typeof t ? (0, o.hex2string)(t) : ("string" == typeof t && 0 === t.indexOf("0x") && (t = t.replace("0x", "#")), t)
    }

    function h(t) {
        if (Array.isArray(t)) {
            for (var e = 0; e < t.length; ++e) t[e] = l(t[e]);
            return t
        }
        return l(t)
    }

    function c(t, e, r) {
        for (var n in r) t[n] = Array.isArray(e[n]) ? e[n].slice() : e[n]
    }
    e.default = u
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
        function t(e, r, n, i, o, s, a, u, l) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.text = e, this.style = r, this.width = n, this.height = i, this.lines = o, this.lineWidths = s, this.lineHeight = a, this.maxLineWidth = u, this.fontProperties = l
        }
        return t.measureText = function(e, r, n) {
            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : t._canvas;
            n = void 0 === n || null === n ? r.wordWrap : n;
            var o = r.toFontString()
                , s = t.measureFont(o)
                , a = i.getContext("2d");
            a.font = o;
            for (var u = (n ? t.wordWrap(e, r, i) : e).split(/(?:\r\n|\r|\n)/), l = new Array(u.length), h = 0, c = 0; c < u.length; c++) {
                var f = a.measureText(u[c]).width + (u[c].length - 1) * r.letterSpacing;
                l[c] = f, h = Math.max(h, f)
            }
            var d = h + r.strokeThickness;
            r.dropShadow && (d += r.dropShadowDistance);
            var p = r.lineHeight || s.fontSize + r.strokeThickness
                , _ = Math.max(p, s.fontSize + r.strokeThickness) + (u.length - 1) * (p + r.leading);
            return r.dropShadow && (_ += r.dropShadowDistance), new t(e, r, d, _, u, l, p + r.leading, h, s)
        }, t.wordWrap = function(e, r) {
            for (var n = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t._canvas).getContext("2d"), i = 0, o = "", s = "", a = {}, u = r.letterSpacing, l = r.whiteSpace, h = t.collapseSpaces(l), c = t.collapseNewlines(l), f = !h, d = r.wordWrapWidth + u, p = t.tokenize(e), _ = 0; _ < p.length; _++) {
                var y = p[_];
                if (t.isNewline(y)) {
                    if (!c) {
                        s += t.addLine(o), f = !h, o = "", i = 0;
                        continue
                    }
                    y = " "
                }
                if (h) {
                    var m = t.isBreakingSpace(y)
                        , v = t.isBreakingSpace(o[o.length - 1]);
                    if (m && v) continue
                }
                var g = t.getFromCache(y, u, a, n);
                if (g > d)
                    if ("" !== o && (s += t.addLine(o), o = "", i = 0), t.canBreakWords(y, r.breakWords))
                        for (var b = y.split(""), T = 0; T < b.length; T++) {
                            for (var x = b[T], w = 1; b[T + w];) {
                                var E = b[T + w];
                                if (t.canBreakChars(x[x.length - 1], E, y, T, r.breakWords)) break;
                                x += E, w++
                            }
                            T += x.length - 1;
                            var S = t.getFromCache(x, u, a, n);
                            S + i > d && (s += t.addLine(o), f = !1, o = "", i = 0), o += x, i += S
                        } else o.length > 0 && (s += t.addLine(o), o = "", i = 0), s += t.addLine(y, !(_ === p.length - 1)), f = !1, o = "", i = 0;
                    else g + i > d && (f = !1, s += t.addLine(o), o = "", i = 0), (o.length > 0 || !t.isBreakingSpace(y) || f) && (o += y, i += g)
            }
            return s + t.addLine(o, !1)
        }, t.addLine = function(e) {
            var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return e = t.trimRight(e), r ? e + "\n" : e
        }, t.getFromCache = function(t, e, r, n) {
            var i = r[t];
            if (void 0 === i) {
                var o = t.length * e;
                i = n.measureText(t).width + o, r[t] = i
            }
            return i
        }, t.collapseSpaces = function(t) {
            return "normal" === t || "pre-line" === t
        }, t.collapseNewlines = function(t) {
            return "normal" === t
        }, t.trimRight = function(e) {
            if ("string" != typeof e) return "";
            for (var r = e.length - 1; r >= 0 && t.isBreakingSpace(e[r]); r--) e = e.slice(0, -1);
            return e
        }, t.isNewline = function(e) {
            return "string" == typeof e && t._newlines.indexOf(e.charCodeAt(0)) >= 0
        }, t.isBreakingSpace = function(e) {
            return "string" == typeof e && t._breakingSpaces.indexOf(e.charCodeAt(0)) >= 0
        }, t.tokenize = function(e) {
            var r = []
                , n = "";
            if ("string" != typeof e) return r;
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                t.isBreakingSpace(o) || t.isNewline(o) ? ("" !== n && (r.push(n), n = ""), r.push(o)) : n += o
            }
            return "" !== n && r.push(n), r
        }, t.canBreakWords = function(t, e) {
            return e
        }, t.canBreakChars = function(t, e, r, n, i) {
            return !0
        }, t.measureFont = function(e) {
            if (t._fonts[e]) return t._fonts[e];
            var r = {}
                , n = t._canvas
                , i = t._context;
            i.font = e;
            var o = t.METRICS_STRING + t.BASELINE_SYMBOL
                , s = Math.ceil(i.measureText(o).width)
                , a = Math.ceil(i.measureText(t.BASELINE_SYMBOL).width)
                , u = 2 * a;
            a = a * t.BASELINE_MULTIPLIER | 0, n.width = s, n.height = u, i.fillStyle = "#f00", i.fillRect(0, 0, s, u), i.font = e, i.textBaseline = "alphabetic", i.fillStyle = "#000", i.fillText(o, 0, a);
            var l = i.getImageData(0, 0, s, u).data
                , h = l.length
                , c = 4 * s
                , f = 0
                , d = 0
                , p = !1;
            for (f = 0; f < a; ++f) {
                for (var _ = 0; _ < c; _ += 4)
                    if (255 !== l[d + _]) {
                        p = !0;
                        break
                    } if (p) break;
                d += c
            }
            for (r.ascent = a - f, d = h - c, p = !1, f = u; f > a; --f) {
                for (var y = 0; y < c; y += 4)
                    if (255 !== l[d + y]) {
                        p = !0;
                        break
                    } if (p) break;
                d -= c
            }
            return r.descent = f - a, r.fontSize = r.ascent + r.descent, t._fonts[e] = r, r
        }, t.clearMetrics = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            e ? delete t._fonts[e] : t._fonts = {}
        }, t
    }();
    e.default = n;
    var i = document.createElement("canvas");
    i.width = i.height = 10, n._canvas = i, n._context = i.getContext("2d"), n._fonts = {}, n.METRICS_STRING = "|\xc9q", n.BASELINE_SYMBOL = "M", n.BASELINE_MULTIPLIER = 1.4, n._newlines = [10, 13], n._breakingSpaces = [9, 32, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8200, 8201, 8202, 8287, 12288]
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
        function t(e, r, n, i, o, s, a, u, l) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.lineWidth = e, this.lineAlignment = l, this.nativeLines = a, this.lineColor = r, this.lineAlpha = n, this._lineTint = r, this.fillColor = i, this.fillAlpha = o, this._fillTint = i, this.fill = s, this.holes = [], this.shape = u, this.type = u.type
        }
        return t.prototype.clone = function() {
            return new t(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.nativeLines, this.shape)
        }, t.prototype.addHole = function(t) {
            this.holes.push(t)
        }, t.prototype.destroy = function() {
            this.shape = null, this.holes = null
        }, t
    }();
    e.default = n
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = r(69)
        , o = l(r(11))
        , s = r(32)
        , a = l(r(4))
        , u = r(1);

    function l(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var h = function() {
        function t(e, r, n, u, l) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), "number" == typeof e && (e = Object.assign({
                width: e
                , height: r || a.default.RENDER_OPTIONS.height
                , forceCanvas: !!u
                , sharedTicker: !!l
            }, n)), this._options = e = Object.assign({
                autoStart: !0
                , sharedTicker: !1
                , forceCanvas: !1
                , sharedLoader: !1
            }, e), this.renderer = (0, i.autoDetectRenderer)(e), this.stage = new o.default, this._ticker = null, this.ticker = e.sharedTicker ? s.shared : new s.Ticker, e.autoStart && this.start()
        }
        return t.prototype.render = function() {
            this.renderer.render(this.stage)
        }, t.prototype.stop = function() {
            this._ticker.stop()
        }, t.prototype.start = function() {
            this._ticker.start()
        }, t.prototype.destroy = function(t, e) {
            if (this._ticker) {
                var r = this._ticker;
                this.ticker = null, r.destroy()
            }
            this.stage.destroy(e), this.stage = null, this.renderer.destroy(t), this.renderer = null, this._options = null
        }, n(t, [{
            key: "ticker"
            , set: function(t) {
                this._ticker && this._ticker.remove(this.render, this), this._ticker = t, t && t.add(this.render, this, u.UPDATE_PRIORITY.LOW)
            }
            , get: function() {
                return this._ticker
            }
        }, {
            key: "view"
            , get: function() {
                return this.renderer.view
            }
        }, {
            key: "screen"
            , get: function() {
                return this.renderer.screen
            }
        }]), t
    }();
    e.default = h
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.autoDetectRenderer = function(t, e, r, s) {
        var a = t && t.forceCanvas;
        return void 0 !== s && (a = s), !a && n.isWebGLSupported() ? new o.default(t, e, r) : new i.default(t, e, r)
    };
    var n = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(3))
        , i = s(r(12))
        , o = s(r(19));

    function s(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = {
        accessible: !1
        , accessibleTitle: null
        , accessibleHint: null
        , tabIndex: 0
        , _accessibleActive: !1
        , _accessibleDiv: !1
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.BitmapText = e.TilingSpriteRenderer = e.TilingSprite = e.AnimatedSprite = void 0;
    var n = r(160);
    Object.defineProperty(e, "AnimatedSprite", {
        enumerable: !0
        , get: function() {
            return a(n).default
        }
    });
    var i = r(161);
    Object.defineProperty(e, "TilingSprite", {
        enumerable: !0
        , get: function() {
            return a(i).default
        }
    });
    var o = r(162);
    Object.defineProperty(e, "TilingSpriteRenderer", {
        enumerable: !0
        , get: function() {
            return a(o).default
        }
    });
    var s = r(163);

    function a(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "BitmapText", {
        enumerable: !0
        , get: function() {
            return a(s).default
        }
    }), r(164), r(165), r(166)
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , s = l(r(73))
        , a = l(r(74))
        , u = l(r(75));

    function l(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var h = function(t) {
        function e(r, i, u, l) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var h = (0, s.default)(l = l || 5, !0)
                , c = (0, a.default)(l)
                , f = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, h, c));
            return f.resolution = u || o.settings.RESOLUTION, f._quality = 0, f.quality = i || 4, f.strength = r || 8, f.firstRun = !0, f
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.apply = function(t, e, r, n) {
            if (this.firstRun) {
                var i = (0, u.default)(t.renderer.gl);
                this.vertexSrc = (0, s.default)(i, !0), this.fragmentSrc = (0, a.default)(i), this.firstRun = !1
            }
            if (this.uniforms.strength = 1 / r.size.width * (r.size.width / e.size.width), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) t.applyFilter(this, e, r, n);
            else {
                for (var o = t.getRenderTarget(!0), l = e, h = o, c = 0; c < this.passes - 1; c++) {
                    t.applyFilter(this, l, h, !0);
                    var f = h;
                    h = l, l = f
                }
                t.applyFilter(this, l, r, n), t.returnRenderTarget(o)
            }
        }, i(e, [{
            key: "blur"
            , get: function() {
                return this.strength
            }
            , set: function(t) {
                this.padding = 2 * Math.abs(t), this.strength = t
            }
        }, {
            key: "quality"
            , get: function() {
                return this._quality
            }
            , set: function(t) {
                this._quality = t, this.passes = t
            }
        }]), e
    }(o.Filter);
    e.default = h
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e) {
        var r = Math.ceil(t / 2)
            , i = n
            , o = ""
            , s = void 0;
        s = e ? "vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);";
        for (var a = 0; a < t; a++) {
            var u = s.replace("%index%", a);
            o += u = u.replace("%sampleIndex%", a - (r - 1) + ".0"), o += "\n"
        }
        return (i = i.replace("%blur%", o)).replace("%size%", t)
    };
    var n = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform float strength;", "uniform mat3 projectionMatrix;", "varying vec2 vBlurTexCoords[%size%];", "void main(void)", "{", "gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);", "%blur%", "}"].join("\n")
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        for (var e = n[t], r = e.length, o = i, s = "", a = void 0, u = 0; u < t; u++) {
            var l = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace("%index%", u);
            a = u, u >= r && (a = t - u - 1), s += l = l.replace("%value%", e[a]), s += "\n"
        }
        return (o = o.replace("%blur%", s)).replace("%size%", t)
    };
    var n = {
            5: [.153388, .221461, .250301]
            , 7: [.071303, .131514, .189879, .214607]
            , 9: [.028532, .067234, .124009, .179044, .20236]
            , 11: [.0093, .028002, .065984, .121703, .175713, .198596]
            , 13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641]
            , 15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448]
        }
        , i = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "    gl_FragColor = vec4(0.0);", "    %blur%", "}"].join("\n")
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        for (var e = t.getParameter(t.MAX_VARYING_VECTORS), r = 15; r > e;) r -= 2;
        return r
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , s = l(r(73))
        , a = l(r(74))
        , u = l(r(75));

    function l(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var h = function(t) {
        function e(r, i, u, l) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var h = (0, s.default)(l = l || 5, !1)
                , c = (0, a.default)(l)
                , f = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, h, c));
            return f.resolution = u || o.settings.RESOLUTION, f._quality = 0, f.quality = i || 4, f.strength = r || 8, f.firstRun = !0, f
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.apply = function(t, e, r, n) {
            if (this.firstRun) {
                var i = (0, u.default)(t.renderer.gl);
                this.vertexSrc = (0, s.default)(i, !1), this.fragmentSrc = (0, a.default)(i), this.firstRun = !1
            }
            if (this.uniforms.strength = 1 / r.size.height * (r.size.height / e.size.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes) t.applyFilter(this, e, r, n);
            else {
                for (var o = t.getRenderTarget(!0), l = e, h = o, c = 0; c < this.passes - 1; c++) {
                    t.applyFilter(this, l, h, !0);
                    var f = h;
                    h = l, l = f
                }
                t.applyFilter(this, l, r, n), t.returnRenderTarget(o)
            }
        }, i(e, [{
            key: "blur"
            , get: function() {
                return this.strength
            }
            , set: function(t) {
                this.padding = 2 * Math.abs(t), this.strength = t
            }
        }, {
            key: "quality"
            , get: function() {
                return this._quality
            }
            , set: function(t) {
                this._quality = t, this.passes = t
            }
        }]), e
    }(o.Filter);
    e.default = h
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , o = function() {
            function t() {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.global = new i.Point, this.target = null, this.originalEvent = null, this.identifier = null, this.isPrimary = !1, this.button = 0, this.buttons = 0, this.width = 0, this.height = 0, this.tiltX = 0, this.tiltY = 0, this.pointerType = null, this.pressure = 0, this.rotationAngle = 0, this.twist = 0, this.tangentialPressure = 0
            }
            return t.prototype.getLocalPosition = function(t, e, r) {
                return t.worldTransform.applyInverse(r || this.global, e)
            }, t.prototype.copyEvent = function(t) {
                t.isPrimary && (this.isPrimary = !0), this.button = t.button, this.buttons = Number.isInteger(t.buttons) ? t.buttons : t.which, this.width = t.width, this.height = t.height, this.tiltX = t.tiltX, this.tiltY = t.tiltY, this.pointerType = t.pointerType, this.pressure = t.pressure, this.rotationAngle = t.rotationAngle, this.twist = t.twist || 0, this.tangentialPressure = t.tangentialPressure || 0
            }, t.prototype.reset = function() {
                this.isPrimary = !1
            }, n(t, [{
                key: "pointerId"
                , get: function() {
                    return this.identifier
                }
            }]), t
        }();
    e.default = o
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
        function t() {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.stopped = !1, this.target = null, this.currentTarget = null, this.type = null, this.data = null
        }
        return t.prototype.stopPropagation = function() {
            this.stopped = !0
        }, t.prototype.reset = function() {
            this.stopped = !1, this.currentTarget = null, this.target = null
        }, t
    }();
    e.default = n
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this._pointerId = e, this._flags = t.FLAGS.NONE
            }
            return t.prototype._doSet = function(t, e) {
                this._flags = e ? this._flags | t : this._flags & ~t
            }, n(t, [{
                key: "pointerId"
                , get: function() {
                    return this._pointerId
                }
            }, {
                key: "flags"
                , get: function() {
                    return this._flags
                }
                , set: function(t) {
                    this._flags = t
                }
            }, {
                key: "none"
                , get: function() {
                    return this._flags === this.constructor.FLAGS.NONE
                }
            }, {
                key: "over"
                , get: function() {
                    return 0 != (this._flags & this.constructor.FLAGS.OVER)
                }
                , set: function(t) {
                    this._doSet(this.constructor.FLAGS.OVER, t)
                }
            }, {
                key: "rightDown"
                , get: function() {
                    return 0 != (this._flags & this.constructor.FLAGS.RIGHT_DOWN)
                }
                , set: function(t) {
                    this._doSet(this.constructor.FLAGS.RIGHT_DOWN, t)
                }
            }, {
                key: "leftDown"
                , get: function() {
                    return 0 != (this._flags & this.constructor.FLAGS.LEFT_DOWN)
                }
                , set: function(t) {
                    this._doSet(this.constructor.FLAGS.LEFT_DOWN, t)
                }
            }]), t
        }();
    e.default = i, i.FLAGS = Object.freeze({
        NONE: 0
        , OVER: 1
        , LEFT_DOWN: 2
        , RIGHT_DOWN: 4
    })
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = {
        interactive: !1
        , interactiveChildren: !0
        , hitArea: null
        , get buttonMode() {
            return "pointer" === this.cursor
        }
        , set buttonMode(t) {
            t ? this.cursor = "pointer" : "pointer" === this.cursor && (this.cursor = null)
        }
        , cursor: null
        , get trackedPointers() {
            return void 0 === this._trackedPointers && (this._trackedPointers = {}), this._trackedPointers
        }
        , _trackedPointers: void 0
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.parse = s, e.default = function() {
        return function(t, e) {
            if (t.data && t.type === i.Resource.TYPE.XML)
                if (0 !== t.data.getElementsByTagName("page").length && 0 !== t.data.getElementsByTagName("info").length && null !== t.data.getElementsByTagName("info")[0].getAttribute("face")) {
                    var r = t.isDataUrl ? "" : n.dirname(t.url);
                    t.isDataUrl && ("." === r && (r = ""), this.baseUrl && r && "/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (r += "/")), (r = r.replace(this.baseUrl, "")) && "/" !== r.charAt(r.length - 1) && (r += "/");
                    for (var o = t.data.getElementsByTagName("page"), a = {}, u = function(r) {
                            a[r.metadata.pageFile] = r.texture, Object.keys(a).length === o.length && (s(t, a), e())
                        }, l = 0; l < o.length; ++l) {
                        var h = o[l].getAttribute("file")
                            , c = r + h
                            , f = !1;
                        for (var d in this.resources) {
                            var p = this.resources[d];
                            if (p.url === c) {
                                p.metadata.pageFile = h, p.texture ? u(p) : p.onAfterMiddleware.add(u), f = !0;
                                break
                            }
                        }
                        if (!f) {
                            var _ = {
                                crossOrigin: t.crossOrigin
                                , loadType: i.Resource.LOAD_TYPE.IMAGE
                                , metadata: Object.assign({
                                    pageFile: h
                                }, t.metadata.imageMetadata)
                                , parentResource: t
                            };
                            this.add(c, _, u)
                        }
                    }
                } else e();
            else e()
        }
    };
    var n = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(7))
        , i = r(15)
        , o = r(71);

    function s(t, e) {
        t.bitmapFont = o.BitmapText.registerFont(t.data, e)
    }
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = function() {
        function t(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, r, n) {
            return r && t(e.prototype, r), n && t(e, n), e
        }
    }();

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var o = function() {
        function t(e, r, n) {
            void 0 === r && (r = !1), i(this, t), this._fn = e, this._once = r, this._thisArg = n, this._next = this._prev = this._owner = null
        }
        return n(t, [{
            key: "detach"
            , value: function() {
                return null !== this._owner && (this._owner.detach(this), !0)
            }
        }]), t
    }();

    function s(t, e) {
        return t._head ? (t._tail._next = e, e._prev = t._tail, t._tail = e) : (t._head = e, t._tail = e), e._owner = t, e
    }
    var a = function() {
        function t() {
            i(this, t), this._head = this._tail = void 0
        }
        return n(t, [{
            key: "handlers"
            , value: function() {
                var t = this._head;
                if (!(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0]) return !!t;
                for (var e = []; t;) e.push(t), t = t._next;
                return e
            }
        }, {
            key: "has"
            , value: function(t) {
                if (!(t instanceof o)) throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");
                return t._owner === this
            }
        }, {
            key: "dispatch"
            , value: function() {
                var t = this._head;
                if (!t) return !1;
                for (; t;) t._once && this.detach(t), t._fn.apply(t._thisArg, arguments), t = t._next;
                return !0
            }
        }, {
            key: "add"
            , value: function(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                if ("function" != typeof t) throw new Error("MiniSignal#add(): First arg must be a Function.");
                return s(this, new o(t, !1, e))
            }
        }, {
            key: "once"
            , value: function(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                if ("function" != typeof t) throw new Error("MiniSignal#once(): First arg must be a Function.");
                return s(this, new o(t, !0, e))
            }
        }, {
            key: "detach"
            , value: function(t) {
                if (!(t instanceof o)) throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");
                return t._owner !== this ? this : (t._prev && (t._prev._next = t._next), t._next && (t._next._prev = t._prev), t === this._head ? (this._head = t._next, null === t._next && (this._tail = null)) : t === this._tail && (this._tail = t._prev, this._tail._next = null), t._owner = null, this)
            }
        }, {
            key: "detachAll"
            , value: function() {
                var t = this._head;
                if (!t) return this;
                for (this._head = this._tail = null; t;) t._owner = null, t = t._next;
                return this
            }
        }]), t
    }();
    a.MiniSignalBinding = o, e.default = a, t.exports = e.default
}, function(t, e, r) {
    "use strict";
    t.exports = function(t, e) {
        for (var r = {
                key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"]
                , q: {
                    name: "queryKey"
                    , parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                }
                , parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
                    , loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            }, n = r.parser[(e = e || {}).strictMode ? "strict" : "loose"].exec(t), i = {}, o = 14; o--;) i[r.key[o]] = n[o] || "";
        return i[r.q.name] = {}, i[r.key[12]].replace(r.q.parser, function(t, e, n) {
            e && (i[r.q.name][e] = n)
        }), i
    }
}, function(t, e, r) {
    "use strict";

    function n() {}

    function i(t) {
        return function() {
            if (null === t) throw new Error("Callback was already called.");
            var e = t;
            t = null, e.apply(this, arguments)
        }
    }
    e.__esModule = !0, e.eachSeries = function(t, e, r, n) {
        var i = 0
            , o = t.length;
        ! function s(a) {
            a || i === o ? r && r(a) : n ? setTimeout(function() {
                e(t[i++], s)
            }, 1) : e(t[i++], s)
        }()
    }, e.queue = function(t, e) {
        if (null == e) e = 1;
        else if (0 === e) throw new Error("Concurrency must not be zero");
        var r = 0
            , o = {
                _tasks: []
                , concurrency: e
                , saturated: n
                , unsaturated: n
                , buffer: e / 4
                , empty: n
                , drain: n
                , error: n
                , started: !1
                , paused: !1
                , push: function(t, e) {
                    s(t, !1, e)
                }
                , kill: function() {
                    r = 0, o.drain = n, o.started = !1, o._tasks = []
                }
                , unshift: function(t, e) {
                    s(t, !0, e)
                }
                , process: function() {
                    for (; !o.paused && r < o.concurrency && o._tasks.length;) {
                        var e = o._tasks.shift();
                        0 === o._tasks.length && o.empty(), (r += 1) === o.concurrency && o.saturated(), t(e.data, i(a(e)))
                    }
                }
                , length: function() {
                    return o._tasks.length
                }
                , running: function() {
                    return r
                }
                , idle: function() {
                    return o._tasks.length + r === 0
                }
                , pause: function() {
                    !0 !== o.paused && (o.paused = !0)
                }
                , resume: function() {
                    if (!1 !== o.paused) {
                        o.paused = !1;
                        for (var t = 1; t <= o.concurrency; t++) o.process()
                    }
                }
            };

        function s(t, e, r) {
            if (null != r && "function" != typeof r) throw new Error("task callback must be a function");
            if (o.started = !0, null == t && o.idle()) setTimeout(function() {
                return o.drain()
            }, 1);
            else {
                var i = {
                    data: t
                    , callback: "function" == typeof r ? r : n
                };
                e ? o._tasks.unshift(i) : o._tasks.push(i), setTimeout(function() {
                    return o.process()
                }, 1)
            }
        }

        function a(t) {
            return function() {
                r -= 1, t.callback.apply(t, arguments), null != arguments[0] && o.error(arguments[0], t.data), r <= o.concurrency - o.buffer && o.unsaturated(), o.idle() && o.drain(), o.process()
            }
        }
        return o
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.encodeBinary = function(t) {
        for (var e = "", r = 0; r < t.length;) {
            for (var i = [0, 0, 0], o = [0, 0, 0, 0], s = 0; s < i.length; ++s) i[s] = r < t.length ? 255 & t.charCodeAt(r++) : 0;
            switch (o[0] = i[0] >> 2, o[1] = (3 & i[0]) << 4 | i[1] >> 4, o[2] = (15 & i[1]) << 2 | i[2] >> 6, o[3] = 63 & i[2], r - (t.length - 1)) {
                case 2:
                    o[3] = 64, o[2] = 64;
                    break;
                case 1:
                    o[3] = 64
            }
            for (var a = 0; a < o.length; ++a) e += n.charAt(o[a])
        }
        return e
    };
    var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function() {
        return function(t, e) {
            var r = t.name + "_image";
            if (t.data && t.type === n.Resource.TYPE.JSON && t.data.frames && !this.resources[r]) {
                var i = {
                        crossOrigin: t.crossOrigin
                        , metadata: t.metadata.imageMetadata
                        , parentResource: t
                    }
                    , a = s(t, this.baseUrl);
                this.add(r, a, i, function(r) {
                    if (r.error) e(r.error);
                    else {
                        var n = new o.Spritesheet(r.texture.baseTexture, t.data, t.url);
                        n.parse(function() {
                            t.spritesheet = n, t.textures = n.textures, e()
                        })
                    }
                })
            } else e()
        }
    }, e.getResourcePath = s;
    var n = r(15)
        , i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(53))
        , o = r(2);

    function s(t, e) {
        return t.isDataUrl ? t.data.meta.image : i.default.resolve(t.url.replace(e, ""), t.data.meta.image)
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function() {
        return function(t, e) {
            t.data && t.type === n.Resource.TYPE.IMAGE && (t.texture = i.default.fromLoader(t.data, t.url, t.name)), e()
        }
    };
    var n = r(15)
        , i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(8))
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(16))
        , o = function(t) {
            function e(r, o, s) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var a = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r));
                return a._ready = !0, a.verticesX = o || 10, a.verticesY = s || 10, a.drawMode = i.default.DRAW_MODES.TRIANGLES, a.refresh(), a
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype._refresh = function() {
                for (var t = this._texture, e = this.verticesX * this.verticesY, r = [], n = [], i = [], o = this.verticesX - 1, s = this.verticesY - 1, a = t.width / o, u = t.height / s, l = 0; l < e; l++) {
                    var h = l % this.verticesX
                        , c = l / this.verticesX | 0;
                    r.push(h * a, c * u), n.push(h / o, c / s)
                }
                for (var f = o * s, d = 0; d < f; d++) {
                    var p = d % o
                        , _ = d / o | 0
                        , y = _ * this.verticesX + p + 1
                        , m = (_ + 1) * this.verticesX + p
                        , v = (_ + 1) * this.verticesX + p + 1;
                    i.push(_ * this.verticesX + p, y, m), i.push(y, v, m)
                }
                this.vertices = new Float32Array(r), this.uvs = new Float32Array(n), this.colors = new Float32Array([]), this.indices = new Uint16Array(i), this.dirty++, this.indexDirty++, this.multiplyUvs()
            }, e.prototype._onTextureUpdate = function() {
                i.default.prototype._onTextureUpdate.call(this), this._ready && this.refresh()
            }, e
        }(i.default);
    e.default = o
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
        function t(e) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.maxItemsPerFrame = e, this.itemsLeft = 0
        }
        return t.prototype.beginFrame = function() {
            this.itemsLeft = this.maxItemsPerFrame
        }, t.prototype.allowedToUpload = function() {
            return this.itemsLeft-- > 0
        }, t
    }();
    e.default = n
}, function(t, e, r) {
    r(91), r(0), r(195), t.exports = r(196)
}, function(t, e, r) {
    "use strict";
    (function(t) {
        e.__esModule = !0, e.loader = e.prepare = e.particles = e.mesh = e.loaders = e.interaction = e.filters = e.extras = e.extract = e.accessibility = void 0;
        var n = r(92);
        Object.keys(n).forEach(function(t) {
            "default" !== t && "__esModule" !== t && Object.defineProperty(e, t, {
                enumerable: !0
                , get: function() {
                    return n[t]
                }
            })
        });
        var i = r(2);
        Object.keys(i).forEach(function(t) {
            "default" !== t && "__esModule" !== t && Object.defineProperty(e, t, {
                enumerable: !0
                , get: function() {
                    return i[t]
                }
            })
        });
        var o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r(154))
            , s = _(r(155))
            , a = _(r(157))
            , u = _(r(71))
            , l = _(r(167))
            , h = _(r(174))
            , c = _(r(176))
            , f = _(r(180))
            , d = _(r(185))
            , p = _(r(190));

        function _(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }
        i.utils.mixins.performMixins();
        var y = c.shared || null;
        e.accessibility = s, e.extract = a, e.extras = u, e.filters = l, e.interaction = h, e.loaders = c, e.mesh = f, e.particles = d, e.prepare = p, e.loader = y, "function" == typeof o.default && (0, o.default)(e), t.PIXI = e
    }).call(this, r(17))
}, function(t, e, r) {
    "use strict";
    r(93), r(95), r(96), r(97), window.ArrayBuffer || (window.ArrayBuffer = Array), window.Float32Array || (window.Float32Array = Array), window.Uint32Array || (window.Uint32Array = Array), window.Uint16Array || (window.Uint16Array = Array)
}, function(t, e, r) {
    "use strict";
    var n = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(r(94));
    Object.assign || (Object.assign = n.default)
}, function(t, e, r) {
    "use strict";
    var n = Object.getOwnPropertySymbols
        , i = Object.prototype.hasOwnProperty
        , o = Object.prototype.propertyIsEnumerable;
    t.exports = function() {
        try {
            if (!Object.assign) return !1;
            var t = new String("abc");
            if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
            for (var e = {}, r = 0; r < 10; r++) e["_" + String.fromCharCode(r)] = r;
            if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(t) {
                    return e[t]
                }).join("")) return !1;
            var n = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                n[t] = t
            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
        } catch (t) {
            return !1
        }
    }() ? Object.assign : function(t, e) {
        for (var r, s, a = function(t) {
                if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }(t), u = 1; u < arguments.length; u++) {
            for (var l in r = Object(arguments[u])) i.call(r, l) && (a[l] = r[l]);
            if (n) {
                s = n(r);
                for (var h = 0; h < s.length; h++) o.call(r, s[h]) && (a[s[h]] = r[s[h]])
            }
        }
        return a
    }
}, function(t, e, r) {
    "use strict";
    (function(t) {
        if (Date.now && Date.prototype.getTime || (Date.now = function() {
                return (new Date).getTime()
            }), !t.performance || !t.performance.now) {
            var e = Date.now();
            t.performance || (t.performance = {}), t.performance.now = function() {
                return Date.now() - e
            }
        }
        for (var r = Date.now(), n = ["ms", "moz", "webkit", "o"], i = 0; i < n.length && !t.requestAnimationFrame; ++i) {
            var o = n[i];
            t.requestAnimationFrame = t[o + "RequestAnimationFrame"], t.cancelAnimationFrame = t[o + "CancelAnimationFrame"] || t[o + "CancelRequestAnimationFrame"]
        }
        t.requestAnimationFrame || (t.requestAnimationFrame = function(t) {
            if ("function" != typeof t) throw new TypeError(t + "is not a function");
            var e = Date.now()
                , n = 16 + r - e;
            return n < 0 && (n = 0), r = e, setTimeout(function() {
                r = Date.now(), t(performance.now())
            }, n)
        }), t.cancelAnimationFrame || (t.cancelAnimationFrame = function(t) {
            return clearTimeout(t)
        })
    }).call(this, r(17))
}, function(t, e, r) {
    "use strict";
    Math.sign || (Math.sign = function(t) {
        return 0 === (t = Number(t)) || isNaN(t) ? t : t > 0 ? 1 : -1
    })
}, function(t, e, r) {
    "use strict";
    Number.isInteger || (Number.isInteger = function(t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t
    })
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(24))
        , i = r(1)
        , o = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                    , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                    , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.x = e, this.y = r, this.radius = n, this.type = i.SHAPES.CIRC
            }
            return t.prototype.clone = function() {
                return new t(this.x, this.y, this.radius)
            }, t.prototype.contains = function(t, e) {
                if (this.radius <= 0) return !1;
                var r = this.x - t
                    , n = this.y - e;
                return (r *= r) + (n *= n) <= this.radius * this.radius
            }, t.prototype.getBounds = function() {
                return new n.default(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
            }, t
        }();
    e.default = o
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(24))
        , i = r(1)
        , o = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                    , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                    , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                    , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.x = e, this.y = r, this.width = n, this.height = o, this.type = i.SHAPES.ELIP
            }
            return t.prototype.clone = function() {
                return new t(this.x, this.y, this.width, this.height)
            }, t.prototype.contains = function(t, e) {
                if (this.width <= 0 || this.height <= 0) return !1;
                var r = (t - this.x) / this.width
                    , n = (e - this.y) / this.height;
                return (r *= r) + (n *= n) <= 1
            }, t.prototype.getBounds = function() {
                return new n.default(this.x - this.width, this.y - this.height, this.width, this.height)
            }, t
        }();
    e.default = o
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(22))
        , i = r(1)
        , o = function() {
            function t() {
                for (var e = arguments.length, r = Array(e), o = 0; o < e; o++) r[o] = arguments[o];
                if (function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), Array.isArray(r[0]) && (r = r[0]), r[0] instanceof n.default) {
                    for (var s = [], a = 0, u = r.length; a < u; a++) s.push(r[a].x, r[a].y);
                    r = s
                }
                this.closed = !0, this.points = r, this.type = i.SHAPES.POLY
            }
            return t.prototype.clone = function() {
                return new t(this.points.slice())
            }, t.prototype.close = function() {
                var t = this.points;
                t[0] === t[t.length - 2] && t[1] === t[t.length - 1] || t.push(t[0], t[1])
            }, t.prototype.contains = function(t, e) {
                for (var r = !1, n = this.points.length / 2, i = 0, o = n - 1; i < n; o = i++) {
                    var s = this.points[2 * i]
                        , a = this.points[2 * i + 1]
                        , u = this.points[2 * o + 1];
                    a > e != u > e && t < (e - a) / (u - a) * (this.points[2 * o] - s) + s && (r = !r)
                }
                return r
            }, t
        }();
    e.default = o
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(1)
        , i = function() {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                    , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                    , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                    , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                    , s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 20;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.x = e, this.y = r, this.width = i, this.height = o, this.radius = s, this.type = n.SHAPES.RREC
            }
            return t.prototype.clone = function() {
                return new t(this.x, this.y, this.width, this.height, this.radius)
            }, t.prototype.contains = function(t, e) {
                if (this.width <= 0 || this.height <= 0) return !1;
                if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
                    if (e >= this.y + this.radius && e <= this.y + this.height - this.radius || t >= this.x + this.radius && t <= this.x + this.width - this.radius) return !0;
                    var r = t - (this.x + this.radius)
                        , n = e - (this.y + this.radius)
                        , i = this.radius * this.radius;
                    if (r * r + n * n <= i) return !0;
                    if ((r = t - (this.x + this.width - this.radius)) * r + n * n <= i) return !0;
                    if (r * r + (n = e - (this.y + this.height - this.radius)) * n <= i) return !0;
                    if ((r = t - (this.x + this.radius)) * r + n * n <= i) return !0
                }
                return !1
            }, t
        }();
    e.default = i
}, function(t, e) {
    t.exports = function(t, e) {
        var r = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
        if (!r) throw new Error("This browser does not support webGL. Try using the canvas renderer");
        return r
    }
}, function(t, e) {
    var r = new ArrayBuffer(0)
        , n = function(t, e, n, i) {
            this.gl = t, this.buffer = t.createBuffer(), this.type = e || t.ARRAY_BUFFER, this.drawType = i || t.STATIC_DRAW, this.data = r, n && this.upload(n), this._updateID = 0
        };
    n.prototype.upload = function(t, e, r) {
        r || this.bind();
        var n = this.gl;
        t = t || this.data, e = e || 0, this.data.byteLength >= t.byteLength ? n.bufferSubData(this.type, e, t) : n.bufferData(this.type, t, this.drawType), this.data = t
    }, n.prototype.bind = function() {
        this.gl.bindBuffer(this.type, this.buffer)
    }, n.createVertexBuffer = function(t, e, r) {
        return new n(t, t.ARRAY_BUFFER, e, r)
    }, n.createIndexBuffer = function(t, e, r) {
        return new n(t, t.ELEMENT_ARRAY_BUFFER, e, r)
    }, n.create = function(t, e, r, i) {
        return new n(t, e, r, i)
    }, n.prototype.destroy = function() {
        this.gl.deleteBuffer(this.buffer)
    }, t.exports = n
}, function(t, e, r) {
    var n = r(41)
        , i = function(t, e, r) {
            this.gl = t, this.framebuffer = t.createFramebuffer(), this.stencil = null, this.texture = null, this.width = e || 100, this.height = r || 100
        };
    i.prototype.enableTexture = function(t) {
        var e = this.gl;
        this.texture = t || new n(e), this.texture.bind(), this.bind(), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texture.texture, 0)
    }, i.prototype.enableStencil = function() {
        if (!this.stencil) {
            var t = this.gl;
            this.stencil = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.stencil), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.stencil), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, this.width, this.height)
        }
    }, i.prototype.clear = function(t, e, r, n) {
        this.bind();
        var i = this.gl;
        i.clearColor(t, e, r, n), i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT)
    }, i.prototype.bind = function() {
        var t = this.gl;
        t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer)
    }, i.prototype.unbind = function() {
        var t = this.gl;
        t.bindFramebuffer(t.FRAMEBUFFER, null)
    }, i.prototype.resize = function(t, e) {
        var r = this.gl;
        this.width = t, this.height = e, this.texture && this.texture.uploadData(null, t, e), this.stencil && (r.bindRenderbuffer(r.RENDERBUFFER, this.stencil), r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, t, e))
    }, i.prototype.destroy = function() {
        var t = this.gl;
        this.texture && this.texture.destroy(), t.deleteFramebuffer(this.framebuffer), this.gl = null, this.stencil = null, this.texture = null
    }, i.createRGBA = function(t, e, r, o) {
        var s = n.fromData(t, null, e, r);
        s.enableNearestScaling(), s.enableWrapClamp();
        var a = new i(t, e, r);
        return a.enableTexture(s), a.unbind(), a
    }, i.createFloat32 = function(t, e, r, o) {
        var s = new n.fromData(t, o, e, r);
        s.enableNearestScaling(), s.enableWrapClamp();
        var a = new i(t, e, r);
        return a.enableTexture(s), a.unbind(), a
    }, t.exports = i
}, function(t, e, r) {
    var n = r(42)
        , i = r(43)
        , o = r(45)
        , s = r(47)
        , a = r(48)
        , u = function(t, e, r, u, l) {
            this.gl = t, u && (e = s(e, u), r = s(r, u)), this.program = n(t, e, r, l), this.attributes = i(t, this.program), this.uniformData = o(t, this.program), this.uniforms = a(t, this.uniformData)
        };
    u.prototype.bind = function() {
        return this.gl.useProgram(this.program), this
    }, u.prototype.destroy = function() {
        this.attributes = null, this.uniformData = null, this.uniforms = null, this.gl.deleteProgram(this.program)
    }, t.exports = u
}, function(t, e, r) {
    var n = r(40);

    function i(t, e) {
        if (this.nativeVaoExtension = null, i.FORCE_NATIVE || (this.nativeVaoExtension = t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object")), this.nativeState = e, this.nativeVaoExtension) {
            this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();
            var r = t.getParameter(t.MAX_VERTEX_ATTRIBS);
            this.nativeState = {
                tempAttribState: new Array(r)
                , attribState: new Array(r)
            }
        }
        this.gl = t, this.attributes = [], this.indexBuffer = null, this.dirty = !1
    }
    i.prototype.constructor = i, t.exports = i, i.FORCE_NATIVE = !1, i.prototype.bind = function() {
        if (this.nativeVao) {
            if (this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.dirty) return this.dirty = !1, this.activate(), this;
            this.indexBuffer && this.indexBuffer.bind()
        } else this.activate();
        return this
    }, i.prototype.unbind = function() {
        return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(null), this
    }, i.prototype.activate = function() {
        for (var t = this.gl, e = null, r = 0; r < this.attributes.length; r++) {
            var i = this.attributes[r];
            e !== i.buffer && (i.buffer.bind(), e = i.buffer), t.vertexAttribPointer(i.attribute.location, i.attribute.size, i.type || t.FLOAT, i.normalized || !1, i.stride || 0, i.start || 0)
        }
        return n(t, this.attributes, this.nativeState), this.indexBuffer && this.indexBuffer.bind(), this
    }, i.prototype.addAttribute = function(t, e, r, n, i, o) {
        return this.attributes.push({
            buffer: t
            , attribute: e
            , location: e.location
            , type: r || this.gl.FLOAT
            , normalized: n || !1
            , stride: i || 0
            , start: o || 0
        }), this.dirty = !0, this
    }, i.prototype.addIndex = function(t) {
        return this.indexBuffer = t, this.dirty = !0, this
    }, i.prototype.clear = function() {
        return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.attributes.length = 0, this.indexBuffer = null, this
    }, i.prototype.draw = function(t, e, r) {
        var n = this.gl;
        return this.indexBuffer ? n.drawElements(t, e || this.indexBuffer.data.length, n.UNSIGNED_SHORT, 2 * (r || 0)) : n.drawArrays(t, r, e || this.getSize()), this
    }, i.prototype.destroy = function() {
        this.gl = null, this.indexBuffer = null, this.attributes = null, this.nativeState = null, this.nativeVao && this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao), this.nativeVaoExtension = null, this.nativeVao = null
    }, i.prototype.getSize = function() {
        var t = this.attributes[0];
        return t.buffer.data.length / (t.stride / 4 || t.attribute.size)
    }
}, function(t, e, r) {
    t.exports = {
        compileProgram: r(42)
        , defaultValue: r(46)
        , extractAttributes: r(43)
        , extractUniforms: r(45)
        , generateUniformAccessObject: r(48)
        , setPrecision: r(47)
        , mapSize: r(44)
        , mapType: r(25)
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        return n.default.tablet || n.default.phone ? 4 : t
    };
    var n = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(r(27))
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function() {
        return !(navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = {
        mixin: function(t) {
            ! function(t) {
                t.__plugins = {}, t.registerPlugin = function(e, r) {
                    t.__plugins[e] = r
                }, t.prototype.initPlugins = function() {
                    for (var e in this.plugins = this.plugins || {}, t.__plugins) this.plugins[e] = new t.__plugins[e](this)
                }, t.prototype.destroyPlugins = function() {
                    for (var t in this.plugins) this.plugins[t].destroy(), this.plugins[t] = null;
                    this.plugins = null
                }
            }(t)
        }
    }
}, function(t, e, r) {
    "use strict";

    function n(t, e) {
        if (t && e)
            for (var r = Object.keys(e), n = 0; n < r.length; ++n) {
                var i = r[n];
                Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(e, i))
            }
    }
    e.__esModule = !0, e.mixin = n, e.delayMixin = function(t, e) {
        i.push(t, e)
    }, e.performMixins = function() {
        for (var t = 0; t < i.length; t += 2) n(i[t], i[t + 1]);
        i.length = 0
    };
    var i = []
}, function(t, e, r) {
    "use strict";
    t.exports = function(t, e, r) {
        var n, i = t.length;
        if (!(e >= i || 0 === r)) {
            var o = i - (r = e + r > i ? i - e : r);
            for (n = e; n < o; ++n) t[n] = t[n + r];
            t.length = o
        }
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function() {
        for (var t = [], e = [], r = 0; r < 32; r++) t[r] = r, e[r] = r;
        t[n.BLEND_MODES.NORMAL_NPM] = n.BLEND_MODES.NORMAL, t[n.BLEND_MODES.ADD_NPM] = n.BLEND_MODES.ADD, t[n.BLEND_MODES.SCREEN_NPM] = n.BLEND_MODES.SCREEN, e[n.BLEND_MODES.NORMAL] = n.BLEND_MODES.NORMAL_NPM, e[n.BLEND_MODES.ADD] = n.BLEND_MODES.ADD_NPM, e[n.BLEND_MODES.SCREEN] = n.BLEND_MODES.SCREEN_NPM;
        var i = [];
        return i.push(e), i.push(t), i
    };
    var n = r(1)
}, function(t, e, r) {
    (function(t, n) {
        var i;

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }! function(s) {
            var a = "object" == o(e) && e && !e.nodeType && e
                , u = "object" == o(t) && t && !t.nodeType && t
                , l = "object" == (void 0 === n ? "undefined" : o(n)) && n;
            l.global !== l && l.window !== l && l.self !== l || (s = l);
            var h, c, f = 2147483647
                , d = 36
                , p = 1
                , _ = 26
                , y = 38
                , m = 700
                , v = 72
                , g = 128
                , b = "-"
                , T = /^xn--/
                , x = /[^\x20-\x7E]/
                , w = /[\x2E\u3002\uFF0E\uFF61]/g
                , E = {
                    overflow: "Overflow: input needs wider integers to process"
                    , "not-basic": "Illegal input >= 0x80 (not a basic code point)"
                    , "invalid-input": "Invalid input"
                }
                , S = d - p
                , O = Math.floor
                , P = String.fromCharCode;

            function C(t) {
                throw new RangeError(E[t])
            }

            function M(t, e) {
                for (var r = t.length, n = []; r--;) n[r] = e(t[r]);
                return n
            }

            function A(t, e) {
                var r = t.split("@")
                    , n = "";
                return r.length > 1 && (n = r[0] + "@", t = r[1]), n + M((t = t.replace(w, ".")).split("."), e).join(".")
            }

            function I(t) {
                for (var e, r, n = [], i = 0, o = t.length; i < o;)(e = t.charCodeAt(i++)) >= 55296 && e <= 56319 && i < o ? 56320 == (64512 & (r = t.charCodeAt(i++))) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), i--) : n.push(e);
                return n
            }

            function R(t) {
                return M(t, function(t) {
                    var e = "";
                    return t > 65535 && (e += P((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e + P(t)
                }).join("")
            }

            function D(t) {
                return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : d
            }

            function k(t, e) {
                return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
            }

            function L(t, e, r) {
                var n = 0;
                for (t = r ? O(t / m) : t >> 1, t += O(t / e); t > S * _ >> 1; n += d) t = O(t / S);
                return O(n + (S + 1) * t / (t + y))
            }

            function N(t) {
                var e, r, n, i, o, s, a, u, l, h, c = []
                    , y = t.length
                    , m = 0
                    , T = g
                    , x = v;
                for ((r = t.lastIndexOf(b)) < 0 && (r = 0), n = 0; n < r; ++n) t.charCodeAt(n) >= 128 && C("not-basic"), c.push(t.charCodeAt(n));
                for (i = r > 0 ? r + 1 : 0; i < y;) {
                    for (o = m, s = 1, a = d; i >= y && C("invalid-input"), ((u = D(t.charCodeAt(i++))) >= d || u > O((f - m) / s)) && C("overflow"), m += u * s, !(u < (l = a <= x ? p : a >= x + _ ? _ : a - x)); a += d) s > O(f / (h = d - l)) && C("overflow"), s *= h;
                    x = L(m - o, e = c.length + 1, 0 == o), O(m / e) > f - T && C("overflow"), T += O(m / e), m %= e, c.splice(m++, 0, T)
                }
                return R(c)
            }

            function j(t) {
                var e, r, n, i, o, s, a, u, l, h, c, y, m, T, x, w = [];
                for (y = (t = I(t)).length, e = g, r = 0, o = v, s = 0; s < y; ++s)(c = t[s]) < 128 && w.push(P(c));
                for (n = i = w.length, i && w.push(b); n < y;) {
                    for (a = f, s = 0; s < y; ++s)(c = t[s]) >= e && c < a && (a = c);
                    for (a - e > O((f - r) / (m = n + 1)) && C("overflow"), r += (a - e) * m, e = a, s = 0; s < y; ++s)
                        if ((c = t[s]) < e && ++r > f && C("overflow"), c == e) {
                            for (u = r, l = d; !(u < (h = l <= o ? p : l >= o + _ ? _ : l - o)); l += d) w.push(P(k(h + (x = u - h) % (T = d - h), 0))), u = O(x / T);
                            w.push(P(k(u, 0))), o = L(r, m, n == i), r = 0, ++n
                        }++ r, ++e
                }
                return w.join("")
            }
            if (h = {
                    version: "1.4.1"
                    , ucs2: {
                        decode: I
                        , encode: R
                    }
                    , decode: N
                    , encode: j
                    , toASCII: function(t) {
                        return A(t, function(t) {
                            return x.test(t) ? "xn--" + j(t) : t
                        })
                    }
                    , toUnicode: function(t) {
                        return A(t, function(t) {
                            return T.test(t) ? N(t.slice(4).toLowerCase()) : t
                        })
                    }
                }, "object" == o(r(54)) && r(54)) void 0 === (i = (function() {
                return h
            }).call(e, r, e, t)) || (t.exports = i);
            else if (a && u)
                if (t.exports == a) u.exports = h;
                else
                    for (c in h) h.hasOwnProperty(c) && (a[c] = h[c]);
            else s.punycode = h
        }(this)
    }).call(this, r(115)(t), r(17))
}, function(t, e) {
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
            enumerable: !0
            , get: function() {
                return t.l
            }
        }), Object.defineProperty(t, "id", {
            enumerable: !0
            , get: function() {
                return t.i
            }
        }), t.webpackPolyfill = 1), t
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    t.exports = {
        isString: function(t) {
            return "string" == typeof t
        }
        , isObject: function(t) {
            return "object" === n(t) && null !== t
        }
        , isNull: function(t) {
            return null === t
        }
        , isNullOrUndefined: function(t) {
            return null == t
        }
    }
}, function(t, e, r) {
    "use strict";
    e.decode = e.parse = r(118), e.encode = e.stringify = r(119)
}, function(t, e, r) {
    "use strict";

    function n(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    t.exports = function(t, e, r, o) {
        e = e || "&", r = r || "=";
        var s = {};
        if ("string" != typeof t || 0 === t.length) return s;
        var a = /\+/g;
        t = t.split(e);
        var u = 1e3;
        o && "number" == typeof o.maxKeys && (u = o.maxKeys);
        var l = t.length;
        u > 0 && l > u && (l = u);
        for (var h = 0; h < l; ++h) {
            var c, f, d, p, _ = t[h].replace(a, "%20")
                , y = _.indexOf(r);
            y >= 0 ? (c = _.substr(0, y), f = _.substr(y + 1)) : (c = _, f = ""), d = decodeURIComponent(c), p = decodeURIComponent(f), n(s, d) ? i(s[d]) ? s[d].push(p) : s[d] = [s[d], p] : s[d] = p
        }
        return s
    };
    var i = Array.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    var i = function(t) {
        switch (n(t)) {
            case "string":
                return t;
            case "boolean":
                return t ? "true" : "false";
            case "number":
                return isFinite(t) ? t : "";
            default:
                return ""
        }
    };
    t.exports = function(t, e, r, u) {
        return e = e || "&", r = r || "=", null === t && (t = void 0), "object" === n(t) ? s(a(t), function(n) {
            var a = encodeURIComponent(i(n)) + r;
            return o(t[n]) ? s(t[n], function(t) {
                return a + encodeURIComponent(i(t))
            }).join(e) : a + encodeURIComponent(i(t[n]))
        }).join(e) : u ? encodeURIComponent(i(u)) + r + encodeURIComponent(i(t)) : ""
    };
    var o = Array.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    };

    function s(t, e) {
        if (t.map) return t.map(e);
        for (var r = [], n = 0; n < t.length; n++) r.push(e(t[n], n));
        return r
    }
    var a = Object.keys || function(t) {
        var e = [];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
        return e
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = a(r(4))
        , o = r(1)
        , s = a(r(121));

    function a(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var u = function() {
        function t() {
            var e = this;
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this._head = new s.default(null, null, 1 / 0), this._requestId = null, this._maxElapsedMS = 100, this.autoStart = !1, this.deltaTime = 1, this.elapsedMS = 1 / i.default.TARGET_FPMS, this.lastTime = -1, this.speed = 1, this.started = !1, this._tick = function(t) {
                e._requestId = null, e.started && (e.update(t), e.started && null === e._requestId && e._head.next && (e._requestId = requestAnimationFrame(e._tick)))
            }
        }
        return t.prototype._requestIfNeeded = function() {
            null === this._requestId && this._head.next && (this.lastTime = performance.now(), this._requestId = requestAnimationFrame(this._tick))
        }, t.prototype._cancelIfNeeded = function() {
            null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null)
        }, t.prototype._startIfPossible = function() {
            this.started ? this._requestIfNeeded() : this.autoStart && this.start()
        }, t.prototype.add = function(t, e) {
            return this._addListener(new s.default(t, e, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : o.UPDATE_PRIORITY.NORMAL))
        }, t.prototype.addOnce = function(t, e) {
            return this._addListener(new s.default(t, e, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : o.UPDATE_PRIORITY.NORMAL, !0))
        }, t.prototype._addListener = function(t) {
            var e = this._head.next
                , r = this._head;
            if (e) {
                for (; e;) {
                    if (t.priority > e.priority) {
                        t.connect(r);
                        break
                    }
                    r = e, e = e.next
                }
                t.previous || t.connect(r)
            } else t.connect(r);
            return this._startIfPossible(), this
        }, t.prototype.remove = function(t, e) {
            for (var r = this._head.next; r;) r = r.match(t, e) ? r.destroy() : r.next;
            return this._head.next || this._cancelIfNeeded(), this
        }, t.prototype.start = function() {
            this.started || (this.started = !0, this._requestIfNeeded())
        }, t.prototype.stop = function() {
            this.started && (this.started = !1, this._cancelIfNeeded())
        }, t.prototype.destroy = function() {
            this.stop();
            for (var t = this._head.next; t;) t = t.destroy(!0);
            this._head.destroy(), this._head = null
        }, t.prototype.update = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : performance.now()
                , e = void 0;
            if (t > this.lastTime) {
                (e = this.elapsedMS = t - this.lastTime) > this._maxElapsedMS && (e = this._maxElapsedMS), this.deltaTime = e * i.default.TARGET_FPMS * this.speed;
                for (var r = this._head, n = r.next; n;) n = n.emit(this.deltaTime);
                r.next || this._cancelIfNeeded()
            } else this.deltaTime = this.elapsedMS = 0;
            this.lastTime = t
        }, n(t, [{
            key: "FPS"
            , get: function() {
                return 1e3 / this.elapsedMS
            }
        }, {
            key: "minFPS"
            , get: function() {
                return 1e3 / this._maxElapsedMS
            }
            , set: function(t) {
                var e = Math.min(Math.max(0, t) / 1e3, i.default.TARGET_FPMS);
                this._maxElapsedMS = 1 / e
            }
        }]), t
    }();
    e.default = u
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
        function t(e) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
                , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                , i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.fn = e, this.context = r, this.priority = n, this.once = i, this.next = null, this.previous = null, this._destroyed = !1
        }
        return t.prototype.match = function(t, e) {
            return e = e || null, this.fn === t && this.context === e
        }, t.prototype.emit = function(t) {
            this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t));
            var e = this.next;
            return this.once && this.destroy(!0), this._destroyed && (this.next = null), e
        }, t.prototype.connect = function(t) {
            this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this
        }, t.prototype.destroy = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this._destroyed = !0, this.fn = null, this.context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
            var e = this.next;
            return this.next = t ? null : e, this.previous = null, e
        }, t
    }();
    e.default = n
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = a(r(12))
        , i = r(1)
        , o = r(5)
        , s = a(r(34));

    function a(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var u = new o.Matrix
        , l = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.renderer = e
            }
            return t.prototype.render = function(t) {
                var e = t._texture
                    , r = this.renderer
                    , n = e._frame.width
                    , a = e._frame.height
                    , l = t.transform.worldTransform
                    , h = 0
                    , c = 0;
                if (!(e.orig.width <= 0 || e.orig.height <= 0) && e.baseTexture.source && (r.setBlendMode(t.blendMode), e.valid)) {
                    r.context.globalAlpha = t.worldAlpha;
                    var f = e.baseTexture.scaleMode === i.SCALE_MODES.LINEAR;
                    r.smoothProperty && r.context[r.smoothProperty] !== f && (r.context[r.smoothProperty] = f), e.trim ? (h = e.trim.width / 2 + e.trim.x - t.anchor.x * e.orig.width, c = e.trim.height / 2 + e.trim.y - t.anchor.y * e.orig.height) : (h = (.5 - t.anchor.x) * e.orig.width, c = (.5 - t.anchor.y) * e.orig.height), e.rotate && (l.copy(u), o.GroupD8.matrixAppendRotationInv(l = u, e.rotate, h, c), h = 0, c = 0), h -= n / 2, c -= a / 2, r.roundPixels ? (r.context.setTransform(l.a, l.b, l.c, l.d, l.tx * r.resolution | 0, l.ty * r.resolution | 0), h |= 0, c |= 0) : r.context.setTransform(l.a, l.b, l.c, l.d, l.tx * r.resolution, l.ty * r.resolution);
                    var d = e.baseTexture.resolution;
                    16777215 !== t.tint ? (t.cachedTint === t.tint && t.tintedTexture.tintId === t._texture._updateID || (t.cachedTint = t.tint, t.tintedTexture = s.default.getTintedTexture(t, t.tint)), r.context.drawImage(t.tintedTexture, 0, 0, n * d, a * d, h * r.resolution, c * r.resolution, n * r.resolution, a * r.resolution)) : r.context.drawImage(e.baseTexture.source, e._frame.x * d, e._frame.y * d, n * d, a * d, h * r.resolution, c * r.resolution, n * r.resolution, a * r.resolution)
                }
            }, t.prototype.destroy = function() {
                this.renderer = null
            }, t
        }();
    e.default = l, n.default.registerPlugin("sprite", l)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(1)
        , i = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.renderer = e
            }
            return t.prototype.pushMask = function(t) {
                var e = this.renderer;
                e.context.save();
                var r = t.alpha
                    , n = t.transform.worldTransform
                    , i = e.resolution;
                e.context.setTransform(n.a * i, n.b * i, n.c * i, n.d * i, n.tx * i, n.ty * i), t._texture || (this.renderGraphicsShape(t), e.context.clip()), t.worldAlpha = r
            }, t.prototype.renderGraphicsShape = function(t) {
                var e = this.renderer.context
                    , r = t.graphicsData.length;
                if (0 !== r) {
                    e.beginPath();
                    for (var i = 0; i < r; i++) {
                        var o = t.graphicsData[i]
                            , s = o.shape;
                        if (o.type === n.SHAPES.POLY) {
                            var a = s.points;
                            e.moveTo(a[0], a[1]);
                            for (var u = 1; u < a.length / 2; u++) e.lineTo(a[2 * u], a[2 * u + 1]);
                            a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && e.closePath()
                        } else if (o.type === n.SHAPES.RECT) e.rect(s.x, s.y, s.width, s.height), e.closePath();
                        else if (o.type === n.SHAPES.CIRC) e.arc(s.x, s.y, s.radius, 0, 2 * Math.PI), e.closePath();
                        else if (o.type === n.SHAPES.ELIP) {
                            var l = 2 * s.width
                                , h = 2 * s.height
                                , c = s.x - l / 2
                                , f = s.y - h / 2
                                , d = l / 2 * .5522848
                                , p = h / 2 * .5522848
                                , _ = c + l
                                , y = f + h
                                , m = c + l / 2
                                , v = f + h / 2;
                            e.moveTo(c, v), e.bezierCurveTo(c, v - p, m - d, f, m, f), e.bezierCurveTo(m + d, f, _, v - p, _, v), e.bezierCurveTo(_, v + p, m + d, y, m, y), e.bezierCurveTo(m - d, y, c, v + p, c, v), e.closePath()
                        } else if (o.type === n.SHAPES.RREC) {
                            var g = s.x
                                , b = s.y
                                , T = s.width
                                , x = s.height
                                , w = s.radius
                                , E = Math.min(T, x) / 2 | 0;
                            e.moveTo(g, b + (w = w > E ? E : w)), e.lineTo(g, b + x - w), e.quadraticCurveTo(g, b + x, g + w, b + x), e.lineTo(g + T - w, b + x), e.quadraticCurveTo(g + T, b + x, g + T, b + x - w), e.lineTo(g + T, b + w), e.quadraticCurveTo(g + T, b, g + T - w, b), e.lineTo(g + w, b), e.quadraticCurveTo(g, b, g, b + w), e.closePath()
                        }
                    }
                }
            }, t.prototype.popMask = function(t) {
                t.context.restore(), t.invalidateBlendMode()
            }, t.prototype.destroy = function() {}, t
        }();
    e.default = i
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return (0, i.default)() ? (t[n.BLEND_MODES.NORMAL] = "source-over", t[n.BLEND_MODES.ADD] = "lighter", t[n.BLEND_MODES.MULTIPLY] = "multiply", t[n.BLEND_MODES.SCREEN] = "screen", t[n.BLEND_MODES.OVERLAY] = "overlay", t[n.BLEND_MODES.DARKEN] = "darken", t[n.BLEND_MODES.LIGHTEN] = "lighten", t[n.BLEND_MODES.COLOR_DODGE] = "color-dodge", t[n.BLEND_MODES.COLOR_BURN] = "color-burn", t[n.BLEND_MODES.HARD_LIGHT] = "hard-light", t[n.BLEND_MODES.SOFT_LIGHT] = "soft-light", t[n.BLEND_MODES.DIFFERENCE] = "difference", t[n.BLEND_MODES.EXCLUSION] = "exclusion", t[n.BLEND_MODES.HUE] = "hue", t[n.BLEND_MODES.SATURATION] = "saturate", t[n.BLEND_MODES.COLOR] = "color", t[n.BLEND_MODES.LUMINOSITY] = "luminosity") : (t[n.BLEND_MODES.NORMAL] = "source-over", t[n.BLEND_MODES.ADD] = "lighter", t[n.BLEND_MODES.MULTIPLY] = "source-over", t[n.BLEND_MODES.SCREEN] = "source-over", t[n.BLEND_MODES.OVERLAY] = "source-over", t[n.BLEND_MODES.DARKEN] = "source-over", t[n.BLEND_MODES.LIGHTEN] = "source-over", t[n.BLEND_MODES.COLOR_DODGE] = "source-over", t[n.BLEND_MODES.COLOR_BURN] = "source-over", t[n.BLEND_MODES.HARD_LIGHT] = "source-over", t[n.BLEND_MODES.SOFT_LIGHT] = "source-over", t[n.BLEND_MODES.DIFFERENCE] = "source-over", t[n.BLEND_MODES.EXCLUSION] = "source-over", t[n.BLEND_MODES.HUE] = "source-over", t[n.BLEND_MODES.SATURATION] = "source-over", t[n.BLEND_MODES.COLOR] = "source-over", t[n.BLEND_MODES.LUMINOSITY] = "source-over"), t[n.BLEND_MODES.NORMAL_NPM] = t[n.BLEND_MODES.NORMAL], t[n.BLEND_MODES.ADD_NPM] = t[n.BLEND_MODES.ADD], t[n.BLEND_MODES.SCREEN_NPM] = t[n.BLEND_MODES.SCREEN], t
    };
    var n = r(1)
        , i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(60))
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = p(r(18))
        , o = p(r(19))
        , s = p(r(35))
        , a = p(r(138))
        , u = p(r(139))
        , l = p(r(140))
        , h = p(r(4))
        , c = r(3)
        , f = p(r(6))
        , d = p(r(31));

    function p(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var _ = 0
        , y = 0
        , m = function(t) {
            function e(r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r));
                i.vertSize = 5, i.vertByteSize = 4 * i.vertSize, i.size = h.default.SPRITE_BATCH_SIZE, i.buffers = [];
                for (var o = 1; o <= d.default.nextPow2(i.size); o *= 2) i.buffers.push(new l.default(4 * o * i.vertByteSize));
                i.indices = (0, s.default)(i.size), i.shader = null, i.currentIndex = 0, i.groups = [];
                for (var a = 0; a < i.size; a++) i.groups[a] = {
                    textures: []
                    , textureCount: 0
                    , ids: []
                    , size: 0
                    , start: 0
                    , blend: 0
                };
                return i.sprites = [], i.vertexBuffers = [], i.vaos = [], i.vaoMax = 2, i.vertexCount = 0, i.renderer.on("prerender", i.onPrerender, i), i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.onContextChange = function() {
                var t = this.renderer.gl;
                this.renderer.legacy ? this.MAX_TEXTURES = 1 : (this.MAX_TEXTURES = Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), h.default.SPRITE_MAX_TEXTURES), this.MAX_TEXTURES = (0, u.default)(this.MAX_TEXTURES, t)), this.shader = (0, a.default)(t, this.MAX_TEXTURES), this.indexBuffer = f.default.GLBuffer.createIndexBuffer(t, this.indices, t.STATIC_DRAW), this.renderer.bindVao(null);
                for (var e = this.shader.attributes, r = 0; r < this.vaoMax; r++) {
                    var n = this.vertexBuffers[r] = f.default.GLBuffer.createVertexBuffer(t, null, t.STREAM_DRAW)
                        , i = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(n, e.aVertexPosition, t.FLOAT, !1, this.vertByteSize, 0).addAttribute(n, e.aTextureCoord, t.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(n, e.aColor, t.UNSIGNED_BYTE, !0, this.vertByteSize, 12);
                    e.aTextureId && i.addAttribute(n, e.aTextureId, t.FLOAT, !1, this.vertByteSize, 16), this.vaos[r] = i
                }
                this.vao = this.vaos[0], this.currentBlendMode = 99999, this.boundTextures = new Array(this.MAX_TEXTURES)
            }, e.prototype.onPrerender = function() {
                this.vertexCount = 0
            }, e.prototype.render = function(t) {
                this.currentIndex >= this.size && this.flush(), t._texture._uvs && (this.sprites[this.currentIndex++] = t)
            }, e.prototype.flush = function() {
                if (0 !== this.currentIndex) {
                    var t = this.renderer.gl
                        , e = this.MAX_TEXTURES
                        , r = d.default.nextPow2(this.currentIndex)
                        , n = d.default.log2(r)
                        , i = this.buffers[n]
                        , o = this.sprites
                        , s = this.groups
                        , a = i.float32View
                        , u = i.uint32View
                        , l = this.boundTextures
                        , p = this.renderer.boundTextures
                        , m = this.renderer.textureGC.count
                        , v = 0
                        , g = void 0
                        , b = void 0
                        , T = 1
                        , x = 0
                        , w = s[0]
                        , E = void 0
                        , S = void 0
                        , O = c.premultiplyBlendMode[o[0]._texture.baseTexture.premultipliedAlpha ? 1 : 0][o[0].blendMode];
                    w.textureCount = 0, w.start = 0, w.blend = O, _++;
                    var P = void 0;
                    for (P = 0; P < e; ++P) {
                        var C = p[P];
                        C._enabled !== _ ? (l[P] = C, C._virtalBoundId = P, C._enabled = _) : l[P] = this.renderer.emptyTextures[P]
                    }
                    for (_++, P = 0; P < this.currentIndex; ++P) {
                        var M = o[P];
                        o[P] = null, g = M._texture.baseTexture;
                        var A = c.premultiplyBlendMode[Number(g.premultipliedAlpha)][M.blendMode];
                        if (O !== A && (O = A, b = null, x = e, _++), b !== g && (b = g, g._enabled !== _)) {
                            if (x === e && (_++, w.size = P - w.start, x = 0, (w = s[T++]).blend = O, w.textureCount = 0, w.start = P), g.touched = m, -1 === g._virtalBoundId)
                                for (var I = 0; I < e; ++I) {
                                    var R = (I + y) % e
                                        , D = l[R];
                                    if (D._enabled !== _) {
                                        y++, D._virtalBoundId = -1, g._virtalBoundId = R, l[R] = g;
                                        break
                                    }
                                }
                            g._enabled = _, w.textureCount++, w.ids[x] = g._virtalBoundId, w.textures[x++] = g
                        }
                        if (E = M.vertexData, S = M._texture._uvs.uvsUint32, this.renderer.roundPixels) {
                            var k = this.renderer.resolution;
                            a[v] = (E[0] * k | 0) / k, a[v + 1] = (E[1] * k | 0) / k, a[v + 5] = (E[2] * k | 0) / k, a[v + 6] = (E[3] * k | 0) / k, a[v + 10] = (E[4] * k | 0) / k, a[v + 11] = (E[5] * k | 0) / k, a[v + 15] = (E[6] * k | 0) / k, a[v + 16] = (E[7] * k | 0) / k
                        } else a[v] = E[0], a[v + 1] = E[1], a[v + 5] = E[2], a[v + 6] = E[3], a[v + 10] = E[4], a[v + 11] = E[5], a[v + 15] = E[6], a[v + 16] = E[7];
                        u[v + 2] = S[0], u[v + 7] = S[1], u[v + 12] = S[2], u[v + 17] = S[3];
                        var L = Math.min(M.worldAlpha, 1)
                            , N = L < 1 && g.premultipliedAlpha ? (0, c.premultiplyTint)(M._tintRGB, L) : M._tintRGB + (255 * L << 24);
                        u[v + 3] = u[v + 8] = u[v + 13] = u[v + 18] = N, a[v + 4] = a[v + 9] = a[v + 14] = a[v + 19] = g._virtalBoundId, v += 20
                    }
                    if (w.size = P - w.start, h.default.CAN_UPLOAD_SAME_BUFFER) this.vertexBuffers[this.vertexCount].upload(i.vertices, 0, !0);
                    else {
                        if (this.vaoMax <= this.vertexCount) {
                            this.vaoMax++;
                            var j = this.shader.attributes
                                , F = this.vertexBuffers[this.vertexCount] = f.default.GLBuffer.createVertexBuffer(t, null, t.STREAM_DRAW)
                                , B = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(F, j.aVertexPosition, t.FLOAT, !1, this.vertByteSize, 0).addAttribute(F, j.aTextureCoord, t.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(F, j.aColor, t.UNSIGNED_BYTE, !0, this.vertByteSize, 12);
                            j.aTextureId && B.addAttribute(F, j.aTextureId, t.FLOAT, !1, this.vertByteSize, 16), this.vaos[this.vertexCount] = B
                        }
                        this.renderer.bindVao(this.vaos[this.vertexCount]), this.vertexBuffers[this.vertexCount].upload(i.vertices, 0, !1), this.vertexCount++
                    }
                    for (P = 0; P < e; ++P) p[P]._virtalBoundId = -1;
                    for (P = 0; P < T; ++P) {
                        for (var U = s[P], G = U.textureCount, X = 0; X < G; X++) p[U.ids[X]] !== (b = U.textures[X]) && this.renderer.bindTexture(b, U.ids[X], !0), b._virtalBoundId = -1;
                        this.renderer.state.setBlendMode(U.blend), t.drawElements(t.TRIANGLES, 6 * U.size, t.UNSIGNED_SHORT, 6 * U.start * 2)
                    }
                    this.currentIndex = 0
                }
            }, e.prototype.start = function() {
                this.renderer.bindShader(this.shader), h.default.CAN_UPLOAD_SAME_BUFFER && (this.renderer.bindVao(this.vaos[this.vertexCount]), this.vertexBuffers[this.vertexCount].bind())
            }, e.prototype.stop = function() {
                this.flush()
            }, e.prototype.destroy = function() {
                for (var e = 0; e < this.vaoMax; e++) this.vertexBuffers[e] && this.vertexBuffers[e].destroy(), this.vaos[e] && this.vaos[e].destroy();
                this.indexBuffer && this.indexBuffer.destroy(), this.renderer.off("prerender", this.onPrerender, this), t.prototype.destroy.call(this), this.shader && (this.shader.destroy(), this.shader = null), this.vertexBuffers = null, this.vaos = null, this.indexBuffer = null, this.indices = null, this.sprites = null;
                for (var r = 0; r < this.buffers.length; ++r) this.buffers[r].destroy()
            }, e
        }(i.default);
    e.default = m, o.default.registerPlugin("sprite", m)
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = s(r(13))
        , o = s(r(61));

    function s(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var a = function(t) {
        function e(r) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var i = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, r));
            return i.scissor = !1, i.scissorData = null, i.scissorRenderTarget = null, i.enableScissor = !0, i.alphaMaskPool = [], i.alphaMaskIndex = 0, i
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.pushMask = function(t, e) {
            if (e.texture) this.pushSpriteMask(t, e);
            else if (this.enableScissor && !this.scissor && this.renderer._activeRenderTarget.root && !this.renderer.stencilManager.stencilMaskStack.length && e.isFastRect()) {
                var r = e.worldTransform
                    , n = Math.atan2(r.b, r.a);
                (n = Math.round(n * (180 / Math.PI))) % 90 ? this.pushStencilMask(e) : this.pushScissorMask(t, e)
            } else this.pushStencilMask(e)
        }, e.prototype.popMask = function(t, e) {
            e.texture ? this.popSpriteMask(t, e) : this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length ? this.popScissorMask(t, e) : this.popStencilMask(t, e)
        }, e.prototype.pushSpriteMask = function(t, e) {
            var r = this.alphaMaskPool[this.alphaMaskIndex];
            r || (r = this.alphaMaskPool[this.alphaMaskIndex] = [new o.default(e)]), r[0].resolution = this.renderer.resolution, r[0].maskSprite = e, t.filterArea = e.getBounds(!0), this.renderer.filterManager.pushFilter(t, r), this.alphaMaskIndex++
        }, e.prototype.popSpriteMask = function() {
            this.renderer.filterManager.popFilter(), this.alphaMaskIndex--
        }, e.prototype.pushStencilMask = function(t) {
            this.renderer.currentRenderer.stop(), this.renderer.stencilManager.pushStencil(t)
        }, e.prototype.popStencilMask = function() {
            this.renderer.currentRenderer.stop(), this.renderer.stencilManager.popStencil()
        }, e.prototype.pushScissorMask = function(t, e) {
            e.renderable = !0;
            var r = this.renderer._activeRenderTarget
                , n = e.getBounds();
            n.fit(r.size), e.renderable = !1, this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
            var i = this.renderer.resolution;
            this.renderer.gl.scissor(n.x * i, (r.root ? r.size.height - n.y - n.height : n.y) * i, n.width * i, n.height * i), this.scissorRenderTarget = r, this.scissorData = e, this.scissor = !0
        }, e.prototype.popScissorMask = function() {
            this.scissorRenderTarget = null, this.scissorData = null, this.scissor = !1;
            var t = this.renderer.gl;
            t.disable(t.SCISSOR_TEST)
        }, e
    }(i.default);
    e.default = a
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e, r) {
        var n = i(t)
            , o = i(e);
        return Object.assign(n, o)
    };
    var n = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(r(6)).default.shader.defaultValue;

    function i(t) {
        for (var e = new RegExp("^(projectionMatrix|uSampler|filterArea|filterClamp)$"), r = {}, i = void 0, o = t.replace(/\s+/g, " ").split(/\s*;\s*/), s = 0; s < o.length; s++) {
            var a = o[s].trim();
            if (a.indexOf("uniform") > -1) {
                var u = a.split(" ")
                    , l = u[1]
                    , h = u[2]
                    , c = 1;
                h.indexOf("[") > -1 && (h = (i = h.split(/\[|]/))[0], c *= Number(i[1])), h.match(e) || (r[h] = {
                    value: n(l, c)
                    , name: h
                    , type: l
                })
            }
        }
        return r
    }
}, function(t, e) {
    var r, n, i = t.exports = {};

    function o() {
        throw new Error("setTimeout has not been defined")
    }

    function s() {
        throw new Error("clearTimeout has not been defined")
    }

    function a(t) {
        if (r === setTimeout) return setTimeout(t, 0);
        if ((r === o || !r) && setTimeout) return r = setTimeout, setTimeout(t, 0);
        try {
            return r(t, 0)
        } catch (e) {
            try {
                return r.call(null, t, 0)
            } catch (e) {
                return r.call(this, t, 0)
            }
        }
    }! function() {
        try {
            r = "function" == typeof setTimeout ? setTimeout : o
        } catch (t) {
            r = o
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : s
        } catch (t) {
            n = s
        }
    }();
    var u, l = []
        , h = !1
        , c = -1;

    function f() {
        h && u && (h = !1, u.length ? l = u.concat(l) : c = -1, l.length && d())
    }

    function d() {
        if (!h) {
            var t = a(f);
            h = !0;
            for (var e = l.length; e;) {
                for (u = l, l = []; ++c < e;) u && u[c].run();
                c = -1, e = l.length
            }
            u = null, h = !1
                , function(t) {
                    if (n === clearTimeout) return clearTimeout(t);
                    if ((n === s || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t);
                    try {
                        n(t)
                    } catch (e) {
                        try {
                            return n.call(null, t)
                        } catch (e) {
                            return n.call(this, t)
                        }
                    }
                }(t)
        }
    }

    function p(t, e) {
        this.fun = t, this.array = e
    }

    function _() {}
    i.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        l.push(new p(t, e)), 1 !== l.length || h || a(d)
    }, p.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = _, i.addListener = _, i.once = _, i.off = _, i.removeListener = _, i.removeAllListeners = _, i.emit = _, i.prependListener = _, i.prependOnceListener = _, i.listeners = function(t) {
        return []
    }, i.binding = function(t) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function() {
        return "/"
    }, i.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function() {
        return 0
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(13))
        , o = function(t) {
            function e(r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r));
                return i.stencilMaskStack = null, i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.setMaskStack = function(t) {
                this.stencilMaskStack = t;
                var e = this.renderer.gl;
                0 === t.length ? e.disable(e.STENCIL_TEST) : e.enable(e.STENCIL_TEST)
            }, e.prototype.pushStencil = function(t) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics), this.renderer._activeRenderTarget.attachStencilBuffer();
                var e = this.renderer.gl
                    , r = this.stencilMaskStack.length;
                0 === r && e.enable(e.STENCIL_TEST), this.stencilMaskStack.push(t), e.colorMask(!1, !1, !1, !1), e.stencilFunc(e.EQUAL, r, this._getBitwiseMask()), e.stencilOp(e.KEEP, e.KEEP, e.INCR), this.renderer.plugins.graphics.render(t), this._useCurrent()
            }, e.prototype.popStencil = function() {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
                var t = this.renderer.gl
                    , e = this.stencilMaskStack.pop();
                0 === this.stencilMaskStack.length ? (t.disable(t.STENCIL_TEST), t.clear(t.STENCIL_BUFFER_BIT), t.clearStencil(0)) : (t.colorMask(!1, !1, !1, !1), t.stencilOp(t.KEEP, t.KEEP, t.DECR), this.renderer.plugins.graphics.render(e), this._useCurrent())
            }, e.prototype._useCurrent = function() {
                var t = this.renderer.gl;
                t.colorMask(!0, !0, !0, !0), t.stencilFunc(t.EQUAL, this.stencilMaskStack.length, this._getBitwiseMask()), t.stencilOp(t.KEEP, t.KEEP, t.KEEP)
            }, e.prototype._getBitwiseMask = function() {
                return (1 << this.stencilMaskStack.length) - 1
            }, e.prototype.destroy = function() {
                i.default.prototype.destroy.call(this), this.stencilMaskStack.stencilStack = null
            }, e
        }(i.default);
    e.default = o
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = c(r(13))
        , o = c(r(20))
        , s = c(r(64))
        , a = r(5)
        , u = c(r(14))
        , l = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(131))
        , h = c(r(31));

    function c(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }

    function f(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var d = function() {
            function t() {
                f(this, t), this.renderTarget = null, this.target = null, this.resolution = 1, this.sourceFrame = new a.Rectangle, this.destinationFrame = new a.Rectangle, this.filters = []
            }
            return t.prototype.clear = function() {
                this.filters = null, this.target = null, this.renderTarget = null
            }, t
        }()
        , p = function(t) {
            function e(r) {
                f(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r));
                return i.gl = i.renderer.gl, i.quad = new s.default(i.gl, r.state.attribState), i.shaderCache = {}, i.pool = {}, i.filterData = null, i.managedFilters = [], i.renderer.on("prerender", i.onPrerender, i), i._screenWidth = r.view.width, i._screenHeight = r.view.height, i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.pushFilter = function(t, e) {
                var r = this.renderer
                    , n = this.filterData;
                if (!n) {
                    n = this.renderer._activeRenderTarget.filterStack;
                    var i = new d;
                    i.sourceFrame = i.destinationFrame = this.renderer._activeRenderTarget.size, i.renderTarget = r._activeRenderTarget, this.renderer._activeRenderTarget.filterData = n = {
                        index: 0
                        , stack: [i]
                    }, this.filterData = n
                }
                var o = n.stack[++n.index]
                    , s = n.stack[0].destinationFrame;
                o || (o = n.stack[n.index] = new d);
                var a = t.filterArea && 0 === t.filterArea.x && 0 === t.filterArea.y && t.filterArea.width === r.screen.width && t.filterArea.height === r.screen.height
                    , u = e[0].resolution
                    , l = 0 | e[0].padding
                    , h = a ? r.screen : t.filterArea || t.getBounds(!0)
                    , c = o.sourceFrame
                    , f = o.destinationFrame;
                c.x = (h.x * u | 0) / u, c.y = (h.y * u | 0) / u, c.width = (h.width * u | 0) / u, c.height = (h.height * u | 0) / u, a || (n.stack[0].renderTarget.transform || e[0].autoFit && c.fit(s), c.pad(l)), f.width = c.width, f.height = c.height;
                var p = this.getPotRenderTarget(r.gl, c.width, c.height, u);
                o.target = t, o.filters = e, o.resolution = u, o.renderTarget = p, p.setFrame(f, c), r.bindRenderTarget(p), p.clear()
            }, e.prototype.popFilter = function() {
                var t = this.filterData
                    , e = t.stack[t.index - 1]
                    , r = t.stack[t.index];
                this.quad.map(r.renderTarget.size, r.sourceFrame).upload();
                var n = r.filters;
                if (1 === n.length) n[0].apply(this, r.renderTarget, e.renderTarget, !1, r), this.freePotRenderTarget(r.renderTarget);
                else {
                    var i = r.renderTarget
                        , o = this.getPotRenderTarget(this.renderer.gl, r.sourceFrame.width, r.sourceFrame.height, r.resolution);
                    o.setFrame(r.destinationFrame, r.sourceFrame), o.clear();
                    var s = 0;
                    for (s = 0; s < n.length - 1; ++s) {
                        n[s].apply(this, i, o, !0, r);
                        var a = i;
                        i = o, o = a
                    }
                    n[s].apply(this, i, e.renderTarget, !1, r), this.freePotRenderTarget(i), this.freePotRenderTarget(o)
                }
                r.clear(), t.index--, 0 === t.index && (this.filterData = null)
            }, e.prototype.applyFilter = function(t, e, r, n) {
                var i = this.renderer
                    , o = i.gl
                    , s = t.glShaders[i.CONTEXT_UID];
                s || (t.glShaderKey ? (s = this.shaderCache[t.glShaderKey]) || (s = new u.default(this.gl, t.vertexSrc, t.fragmentSrc), t.glShaders[i.CONTEXT_UID] = this.shaderCache[t.glShaderKey] = s, this.managedFilters.push(t)) : (s = t.glShaders[i.CONTEXT_UID] = new u.default(this.gl, t.vertexSrc, t.fragmentSrc), this.managedFilters.push(t)), i.bindVao(null), this.quad.initVao(s)), i.bindVao(this.quad.vao), i.bindRenderTarget(r), n && (o.disable(o.SCISSOR_TEST), i.clear(), o.enable(o.SCISSOR_TEST)), r === i.maskManager.scissorRenderTarget && i.maskManager.pushScissorMask(null, i.maskManager.scissorData), i.bindShader(s);
                var a = this.renderer.emptyTextures[0];
                this.renderer.boundTextures[0] = a, this.syncUniforms(s, t), i.state.setBlendMode(t.blendMode), o.activeTexture(o.TEXTURE0), o.bindTexture(o.TEXTURE_2D, e.texture.texture), this.quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0), o.bindTexture(o.TEXTURE_2D, a._glTextures[this.renderer.CONTEXT_UID].texture)
            }, e.prototype.syncUniforms = function(t, e) {
                var r = e.uniformData
                    , n = e.uniforms
                    , i = 1
                    , o = void 0;
                if (t.uniforms.filterArea) {
                    var s = t.uniforms.filterArea;
                    s[0] = (o = this.filterData.stack[this.filterData.index]).renderTarget.size.width, s[1] = o.renderTarget.size.height, s[2] = o.sourceFrame.x, s[3] = o.sourceFrame.y, t.uniforms.filterArea = s
                }
                if (t.uniforms.filterClamp) {
                    o = o || this.filterData.stack[this.filterData.index];
                    var a = t.uniforms.filterClamp;
                    a[0] = 0, a[1] = 0, a[2] = (o.sourceFrame.width - 1) / o.renderTarget.size.width, a[3] = (o.sourceFrame.height - 1) / o.renderTarget.size.height, t.uniforms.filterClamp = a
                }
                for (var u in r) {
                    var l = r[u].type;
                    if ("sampler2d" === l && 0 !== n[u]) {
                        if (n[u].baseTexture) t.uniforms[u] = this.renderer.bindTexture(n[u].baseTexture, i);
                        else {
                            t.uniforms[u] = i;
                            var h = this.renderer.gl;
                            this.renderer.boundTextures[i] = this.renderer.emptyTextures[i], h.activeTexture(h.TEXTURE0 + i), n[u].texture.bind()
                        }
                        i++
                    } else if ("mat3" === l) t.uniforms[u] = void 0 !== n[u].a ? n[u].toArray(!0) : n[u];
                    else if ("vec2" === l)
                        if (void 0 !== n[u].x) {
                            var c = t.uniforms[u] || new Float32Array(2);
                            c[0] = n[u].x, c[1] = n[u].y, t.uniforms[u] = c
                        } else t.uniforms[u] = n[u];
                    else "float" === l ? t.uniforms.data[u].value !== r[u] && (t.uniforms[u] = n[u]) : t.uniforms[u] = n[u]
                }
            }, e.prototype.getRenderTarget = function(t, e) {
                var r = this.filterData.stack[this.filterData.index]
                    , n = this.getPotRenderTarget(this.renderer.gl, r.sourceFrame.width, r.sourceFrame.height, e || r.resolution);
                return n.setFrame(r.destinationFrame, r.sourceFrame), n
            }, e.prototype.returnRenderTarget = function(t) {
                this.freePotRenderTarget(t)
            }, e.prototype.calculateScreenSpaceMatrix = function(t) {
                var e = this.filterData.stack[this.filterData.index];
                return l.calculateScreenSpaceMatrix(t, e.sourceFrame, e.renderTarget.size)
            }, e.prototype.calculateNormalizedScreenSpaceMatrix = function(t) {
                var e = this.filterData.stack[this.filterData.index];
                return l.calculateNormalizedScreenSpaceMatrix(t, e.sourceFrame, e.renderTarget.size, e.destinationFrame)
            }, e.prototype.calculateSpriteMatrix = function(t, e) {
                var r = this.filterData.stack[this.filterData.index];
                return l.calculateSpriteMatrix(t, r.sourceFrame, r.renderTarget.size, e)
            }, e.prototype.destroy = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                    , e = this.renderer
                    , r = this.managedFilters;
                e.off("prerender", this.onPrerender, this);
                for (var n = 0; n < r.length; n++) t || r[n].glShaders[e.CONTEXT_UID].destroy(), delete r[n].glShaders[e.CONTEXT_UID];
                this.shaderCache = {}, t ? this.pool = {} : this.emptyPool()
            }, e.prototype.getPotRenderTarget = function(t, e, r, n) {
                var i = "screen";
                r *= n, (e *= n) === this._screenWidth && r === this._screenHeight || (i = (65535 & (e = h.default.nextPow2(e))) << 16 | 65535 & (r = h.default.nextPow2(r))), this.pool[i] || (this.pool[i] = []);
                var s = this.pool[i].pop();
                if (!s) {
                    var a = this.renderer.boundTextures[0];
                    t.activeTexture(t.TEXTURE0), s = new o.default(t, e, r, null, 1), t.bindTexture(t.TEXTURE_2D, a._glTextures[this.renderer.CONTEXT_UID].texture)
                }
                return s.resolution = n, s.defaultFrame.width = s.size.width = e / n, s.defaultFrame.height = s.size.height = r / n, s.filterPoolKey = i, s
            }, e.prototype.emptyPool = function() {
                for (var t in this.pool) {
                    var e = this.pool[t];
                    if (e)
                        for (var r = 0; r < e.length; r++) e[r].destroy(!0)
                }
                this.pool = {}
            }, e.prototype.freePotRenderTarget = function(t) {
                this.pool[t.filterPoolKey].push(t)
            }, e.prototype.onPrerender = function() {
                if (this._screenWidth !== this.renderer.view.width || this._screenHeight !== this.renderer.view.height) {
                    this._screenWidth = this.renderer.view.width, this._screenHeight = this.renderer.view.height;
                    var t = this.pool.screen;
                    if (t)
                        for (var e = 0; e < t.length; e++) t[e].destroy(!0);
                    this.pool.screen = []
                }
            }, e
        }(i.default);
    e.default = p
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.calculateScreenSpaceMatrix = function(t, e, r) {
        var n = t.identity();
        return n.translate(e.x / r.width, e.y / r.height), n.scale(r.width, r.height), n
    }, e.calculateNormalizedScreenSpaceMatrix = function(t, e, r) {
        var n = t.identity();
        return n.translate(e.x / r.width, e.y / r.height), n.scale(r.width / e.width, r.height / e.height), n
    }, e.calculateSpriteMatrix = function(t, e, r, i) {
        var o = i._texture.orig
            , s = t.set(r.width, 0, 0, r.height, e.x, e.y)
            , a = i.worldTransform.copy(n.Matrix.TEMP_MATRIX);
        return a.invert(), s.prepend(a), s.scale(1 / o.width, 1 / o.height), s.translate(i.anchor.x, i.anchor.y), s
    };
    var n = r(5)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(6)
        , i = r(1)
        , o = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(20))
        , s = r(3)
        , a = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.renderer = e, this.gl = e.gl, this._managedTextures = []
            }
            return t.prototype.bindTexture = function() {}, t.prototype.getTexture = function() {}, t.prototype.updateTexture = function(t, e) {
                var r = this.gl
                    , s = !!t._glRenderTargets;
                if (!t.hasLoaded) return null;
                var a = this.renderer.boundTextures;
                if (void 0 === e) {
                    e = 0;
                    for (var u = 0; u < a.length; ++u)
                        if (a[u] === t) {
                            e = u;
                            break
                        }
                }
                a[e] = t, r.activeTexture(r.TEXTURE0 + e);
                var l = t._glTextures[this.renderer.CONTEXT_UID];
                if (l) s ? t._glRenderTargets[this.renderer.CONTEXT_UID].resize(t.width, t.height) : l.upload(t.source);
                else {
                    if (s) {
                        var h = new o.default(this.gl, t.width, t.height, t.scaleMode, t.resolution);
                        h.resize(t.width, t.height), t._glRenderTargets[this.renderer.CONTEXT_UID] = h, l = h.texture
                    } else(l = new n.GLTexture(this.gl, null, null, null, null)).bind(e), l.premultiplyAlpha = !0, l.upload(t.source);
                    t._glTextures[this.renderer.CONTEXT_UID] = l, t.on("update", this.updateTexture, this), t.on("dispose", this.destroyTexture, this), this._managedTextures.push(t), t.isPowerOfTwo ? (t.mipmap && l.enableMipmap(), t.wrapMode === i.WRAP_MODES.CLAMP ? l.enableWrapClamp() : t.wrapMode === i.WRAP_MODES.REPEAT ? l.enableWrapRepeat() : l.enableWrapMirrorRepeat()) : l.enableWrapClamp(), t.scaleMode === i.SCALE_MODES.NEAREST ? l.enableNearestScaling() : l.enableLinearScaling()
                }
                return l
            }, t.prototype.destroyTexture = function(t, e) {
                if ((t = t.baseTexture || t).hasLoaded) {
                    var r = this.renderer.CONTEXT_UID
                        , n = t._glTextures
                        , i = t._glRenderTargets;
                    if (n[r] && (this.renderer.unbindTexture(t), n[r].destroy(), t.off("update", this.updateTexture, this), t.off("dispose", this.destroyTexture, this), delete n[r], !e)) {
                        var o = this._managedTextures.indexOf(t); - 1 !== o && (0, s.removeItems)(this._managedTextures, o, 1)
                    }
                    i && i[r] && (i[r].destroy(), delete i[r])
                }
            }, t.prototype.removeAll = function() {
                for (var t = 0; t < this._managedTextures.length; ++t) {
                    var e = this._managedTextures[t];
                    e._glTextures[this.renderer.CONTEXT_UID] && delete e._glTextures[this.renderer.CONTEXT_UID]
                }
            }, t.prototype.destroy = function() {
                for (var t = 0; t < this._managedTextures.length; ++t) {
                    var e = this._managedTextures[t];
                    this.destroyTexture(e, !0), e.off("update", this.updateTexture, this), e.off("dispose", this.destroyTexture, this)
                }
                this._managedTextures = null
            }, t
        }();
    e.default = a
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(1)
        , i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(4))
        , o = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.renderer = e, this.count = 0, this.checkCount = 0, this.maxIdle = i.default.GC_MAX_IDLE, this.checkCountMax = i.default.GC_MAX_CHECK_COUNT, this.mode = i.default.GC_MODE
            }
            return t.prototype.update = function() {
                this.count++, this.mode !== n.GC_MODES.MANUAL && (this.checkCount++, this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run()))
            }, t.prototype.run = function() {
                for (var t = this.renderer.textureManager, e = t._managedTextures, r = !1, n = 0; n < e.length; n++) {
                    var i = e[n];
                    !i._glRenderTargets && this.count - i.touched > this.maxIdle && (t.destroyTexture(i, !0), e[n] = null, r = !0)
                }
                if (r) {
                    for (var o = 0, s = 0; s < e.length; s++) null !== e[s] && (e[o++] = e[s]);
                    e.length = o
                }
            }, t.prototype.unload = function(t) {
                t._texture && t._texture._glRenderTargets && this.renderer.textureManager.destroyTexture(t._texture, !0);
                for (var e = t.children.length - 1; e >= 0; e--) this.unload(t.children[e])
            }, t
        }();
    e.default = o
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(135))
        , i = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.activeState = new Uint8Array(16), this.defaultState = new Uint8Array(16), this.defaultState[0] = 1, this.stackIndex = 0, this.stack = [], this.gl = e, this.maxAttribs = e.getParameter(e.MAX_VERTEX_ATTRIBS), this.attribState = {
                    tempAttribState: new Array(this.maxAttribs)
                    , attribState: new Array(this.maxAttribs)
                }, this.blendModes = (0, n.default)(e), this.nativeVaoExtension = e.getExtension("OES_vertex_array_object") || e.getExtension("MOZ_OES_vertex_array_object") || e.getExtension("WEBKIT_OES_vertex_array_object")
            }
            return t.prototype.push = function() {
                var t = this.stack[this.stackIndex];
                t || (t = this.stack[this.stackIndex] = new Uint8Array(16)), ++this.stackIndex;
                for (var e = 0; e < this.activeState.length; e++) t[e] = this.activeState[e]
            }, t.prototype.pop = function() {
                var t = this.stack[--this.stackIndex];
                this.setState(t)
            }, t.prototype.setState = function(t) {
                this.setBlend(t[0]), this.setDepthTest(t[1]), this.setFrontFace(t[2]), this.setCullFace(t[3]), this.setBlendMode(t[4])
            }, t.prototype.setBlend = function(t) {
                this.activeState[0] !== (t = t ? 1 : 0) && (this.activeState[0] = t, this.gl[t ? "enable" : "disable"](this.gl.BLEND))
            }, t.prototype.setBlendMode = function(t) {
                if (t !== this.activeState[4]) {
                    this.activeState[4] = t;
                    var e = this.blendModes[t];
                    2 === e.length ? this.gl.blendFunc(e[0], e[1]) : this.gl.blendFuncSeparate(e[0], e[1], e[2], e[3])
                }
            }, t.prototype.setDepthTest = function(t) {
                this.activeState[1] !== (t = t ? 1 : 0) && (this.activeState[1] = t, this.gl[t ? "enable" : "disable"](this.gl.DEPTH_TEST))
            }, t.prototype.setCullFace = function(t) {
                this.activeState[3] !== (t = t ? 1 : 0) && (this.activeState[3] = t, this.gl[t ? "enable" : "disable"](this.gl.CULL_FACE))
            }, t.prototype.setFrontFace = function(t) {
                this.activeState[2] !== (t = t ? 1 : 0) && (this.activeState[2] = t, this.gl.frontFace(this.gl[t ? "CW" : "CCW"]))
            }, t.prototype.resetAttributes = function() {
                for (var t = 0; t < this.attribState.tempAttribState.length; t++) this.attribState.tempAttribState[t] = 0;
                for (var e = 0; e < this.attribState.attribState.length; e++) this.attribState.attribState[e] = 0;
                for (var r = 1; r < this.maxAttribs; r++) this.gl.disableVertexAttribArray(r)
            }, t.prototype.resetToDefault = function() {
                this.nativeVaoExtension && this.nativeVaoExtension.bindVertexArrayOES(null), this.resetAttributes();
                for (var t = 0; t < this.activeState.length; ++t) this.activeState[t] = 32;
                this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1), this.setState(this.defaultState)
            }, t
        }();
    e.default = i
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        return e[n.BLEND_MODES.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.ADD] = [t.ONE, t.DST_ALPHA], e[n.BLEND_MODES.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.SCREEN] = [t.ONE, t.ONE_MINUS_SRC_COLOR], e[n.BLEND_MODES.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.NORMAL_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.ADD_NPM] = [t.SRC_ALPHA, t.DST_ALPHA, t.ONE, t.DST_ALPHA], e[n.BLEND_MODES.SCREEN_NPM] = [t.SRC_ALPHA, t.ONE_MINUS_SRC_COLOR, t.ONE, t.ONE_MINUS_SRC_COLOR], e
    };
    var n = r(1)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return e[n.DRAW_MODES.POINTS] = t.POINTS, e[n.DRAW_MODES.LINES] = t.LINES, e[n.DRAW_MODES.LINE_LOOP] = t.LINE_LOOP, e[n.DRAW_MODES.LINE_STRIP] = t.LINE_STRIP, e[n.DRAW_MODES.TRIANGLES] = t.TRIANGLES, e[n.DRAW_MODES.TRIANGLE_STRIP] = t.TRIANGLE_STRIP, e[n.DRAW_MODES.TRIANGLE_FAN] = t.TRIANGLE_FAN, e
    };
    var n = r(1)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        t.getContextAttributes().stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly")
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e) {
        var r = i;
        r = (r = r.replace(/%count%/gi, e)).replace(/%forloop%/gi, function(t) {
            var e = "";
            e += "\n", e += "\n";
            for (var r = 0; r < t; r++) r > 0 && (e += "\nelse "), r < t - 1 && (e += "if(textureId == " + r + ".0)"), e += "\n{", e += "\n\tcolor = texture2D(uSamplers[" + r + "], vTextureCoord);", e += "\n}";
            return (e += "\n") + "\n"
        }(e));
        for (var o = new n.default(t, "precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor;\n}\n", r), s = [], a = 0; a < e; a++) s[a] = a;
        return o.bind(), o.uniforms.uSamplers = s, o
    };
    var n = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(r(14));
    r(7);
    var i = ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vTextureId+0.5);", "%forloop%", "gl_FragColor = color * vColor;", "}"].join("\n")
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e) {
        var r = !e;
        if (0 === t) throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
        if (r) {
            var s = document.createElement("canvas");
            s.width = 1, s.height = 1, e = n.default.createContext(s)
        }
        for (var a = e.createShader(e.FRAGMENT_SHADER);;) {
            var u = i.replace(/%forloop%/gi, o(t));
            if (e.shaderSource(a, u), e.compileShader(a), e.getShaderParameter(a, e.COMPILE_STATUS)) break;
            t = t / 2 | 0
        }
        return r && e.getExtension("WEBGL_lose_context") && e.getExtension("WEBGL_lose_context").loseContext(), t
    };
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(6))
        , i = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n");

    function o(t) {
        for (var e = "", r = 0; r < t; ++r) r > 0 && (e += "\nelse "), r < t - 1 && (e += "if(test == " + r + ".0){}");
        return e
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
        function t(e) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.vertices = new ArrayBuffer(e), this.float32View = new Float32Array(this.vertices), this.uint32View = new Uint32Array(this.vertices)
        }
        return t.prototype.destroy = function() {
            this.vertices = null, this.positions = null, this.uvs = null, this.colors = null
        }, t
    }();
    e.default = n
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = p(r(30))
        , s = p(r(8))
        , a = r(5)
        , u = r(3)
        , l = r(1)
        , h = p(r(4))
        , c = p(r(65))
        , f = p(r(66))
        , d = p(r(142));

    function p(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var _ = {
            texture: !0
            , children: !1
            , baseTexture: !0
        }
        , y = function(t) {
            function e(r, i, o) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e), (o = o || document.createElement("canvas")).width = 3, o.height = 3;
                var u = s.default.fromCanvas(o, h.default.SCALE_MODE, "text");
                u.orig = new a.Rectangle, u.trim = new a.Rectangle;
                var l = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, u));
                return s.default.addToCache(l._texture, l._texture.baseTexture.textureCacheIds[0]), l.canvas = o, l.context = l.canvas.getContext("2d"), l.resolution = h.default.RESOLUTION, l._text = null, l._style = null, l._styleListener = null, l._font = "", l.text = r, l.style = i, l.localStyleID = -1, l
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.updateText = function(t) {
                var e = this._style;
                if (this.localStyleID !== e.styleID && (this.dirty = !0, this.localStyleID = e.styleID), this.dirty || !t) {
                    this._font = this._style.toFontString();
                    var r = this.context
                        , n = f.default.measureText(this._text, this._style, this._style.wordWrap, this.canvas)
                        , i = n.height
                        , o = n.lines
                        , s = n.lineHeight
                        , a = n.lineWidths
                        , u = n.maxLineWidth
                        , l = n.fontProperties;
                    this.canvas.width = Math.ceil((Math.max(1, n.width) + 2 * e.padding) * this.resolution), this.canvas.height = Math.ceil((Math.max(1, i) + 2 * e.padding) * this.resolution), r.scale(this.resolution, this.resolution), r.clearRect(0, 0, this.canvas.width, this.canvas.height), r.font = this._font, r.strokeStyle = e.stroke, r.lineWidth = e.strokeThickness, r.textBaseline = e.textBaseline, r.lineJoin = e.lineJoin, r.miterLimit = e.miterLimit;
                    var h = void 0
                        , c = void 0;
                    if (e.dropShadow) {
                        r.fillStyle = e.dropShadowColor, r.globalAlpha = e.dropShadowAlpha, r.shadowBlur = e.dropShadowBlur, e.dropShadowBlur > 0 && (r.shadowColor = e.dropShadowColor);
                        for (var d = Math.cos(e.dropShadowAngle) * e.dropShadowDistance, p = Math.sin(e.dropShadowAngle) * e.dropShadowDistance, _ = 0; _ < o.length; _++) h = e.strokeThickness / 2, c = e.strokeThickness / 2 + _ * s + l.ascent, "right" === e.align ? h += u - a[_] : "center" === e.align && (h += (u - a[_]) / 2), e.fill && (this.drawLetterSpacing(o[_], h + d + e.padding, c + p + e.padding), e.stroke && e.strokeThickness && (r.strokeStyle = e.dropShadowColor, this.drawLetterSpacing(o[_], h + d + e.padding, c + p + e.padding, !0), r.strokeStyle = e.stroke))
                    }
                    r.shadowBlur = 0, r.globalAlpha = 1, r.fillStyle = this._generateFillStyle(e, o);
                    for (var y = 0; y < o.length; y++) h = e.strokeThickness / 2, c = e.strokeThickness / 2 + y * s + l.ascent, "right" === e.align ? h += u - a[y] : "center" === e.align && (h += (u - a[y]) / 2), e.stroke && e.strokeThickness && this.drawLetterSpacing(o[y], h + e.padding, c + e.padding, !0), e.fill && this.drawLetterSpacing(o[y], h + e.padding, c + e.padding);
                    this.updateTexture()
                }
            }, e.prototype.drawLetterSpacing = function(t, e, r) {
                var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
                    , i = this._style.letterSpacing;
                if (0 !== i)
                    for (var o = String.prototype.split.call(t, ""), s = e, a = 0, u = ""; a < t.length;) u = o[a++], n ? this.context.strokeText(u, s, r) : this.context.fillText(u, s, r), s += this.context.measureText(u).width + i;
                else n ? this.context.strokeText(t, e, r) : this.context.fillText(t, e, r)
            }, e.prototype.updateTexture = function() {
                var t = this.canvas;
                if (this._style.trim) {
                    var e = (0, d.default)(t);
                    e.data && (t.width = e.width, t.height = e.height, this.context.putImageData(e.data, 0, 0))
                }
                var r = this._texture
                    , n = this._style
                    , i = n.trim ? 0 : n.padding
                    , o = r.baseTexture;
                o.hasLoaded = !0, o.resolution = this.resolution, o.realWidth = t.width, o.realHeight = t.height, o.width = t.width / this.resolution, o.height = t.height / this.resolution, r.trim.width = r._frame.width = t.width / this.resolution, r.trim.height = r._frame.height = t.height / this.resolution, r.trim.x = -i, r.trim.y = -i, r.orig.width = r._frame.width - 2 * i, r.orig.height = r._frame.height - 2 * i, this._onTextureUpdate(), o.emit("update", o), this.dirty = !1
            }, e.prototype.renderWebGL = function(e) {
                this.resolution !== e.resolution && (this.resolution = e.resolution, this.dirty = !0), this.updateText(!0), t.prototype.renderWebGL.call(this, e)
            }, e.prototype._renderCanvas = function(e) {
                this.resolution !== e.resolution && (this.resolution = e.resolution, this.dirty = !0), this.updateText(!0), t.prototype._renderCanvas.call(this, e)
            }, e.prototype.getLocalBounds = function(e) {
                return this.updateText(!0), t.prototype.getLocalBounds.call(this, e)
            }, e.prototype._calculateBounds = function() {
                this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData)
            }, e.prototype._onStyleChange = function() {
                this.dirty = !0
            }, e.prototype._generateFillStyle = function(t, e) {
                if (!Array.isArray(t.fill)) return t.fill;
                if (navigator.isCocoonJS) return t.fill[0];
                var r = void 0
                    , n = void 0
                    , i = void 0
                    , o = this.canvas.width / this.resolution
                    , s = this.canvas.height / this.resolution
                    , a = t.fill.slice()
                    , u = t.fillGradientStops.slice();
                if (!u.length)
                    for (var h = a.length + 1, c = 1; c < h; ++c) u.push(c / h);
                if (a.unshift(t.fill[0]), u.unshift(0), a.push(t.fill[t.fill.length - 1]), u.push(1), t.fillGradientType === l.TEXT_GRADIENT.LINEAR_VERTICAL) {
                    r = this.context.createLinearGradient(o / 2, 0, o / 2, s), n = (a.length + 1) * e.length, i = 0;
                    for (var f = 0; f < e.length; f++) {
                        i += 1;
                        for (var d = 0; d < a.length; d++) r.addColorStop("number" == typeof u[d] ? u[d] / e.length + f / e.length : i / n, a[d]), i++
                    }
                } else {
                    r = this.context.createLinearGradient(0, s / 2, o, s / 2), n = a.length + 1, i = 1;
                    for (var p = 0; p < a.length; p++) r.addColorStop("number" == typeof u[p] ? u[p] : i / n, a[p]), i++
                }
                return r
            }, e.prototype.destroy = function(e) {
                "boolean" == typeof e && (e = {
                    children: e
                }), e = Object.assign({}, _, e), t.prototype.destroy.call(this, e), this.context = null, this.canvas = null, this._style = null
            }, i(e, [{
                key: "width"
                , get: function() {
                    return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width
                }
                , set: function(t) {
                    this.updateText(!0);
                    var e = (0, u.sign)(this.scale.x) || 1;
                    this.scale.x = e * t / this._texture.orig.width, this._width = t
                }
            }, {
                key: "height"
                , get: function() {
                    return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height
                }
                , set: function(t) {
                    this.updateText(!0);
                    var e = (0, u.sign)(this.scale.y) || 1;
                    this.scale.y = e * t / this._texture.orig.height, this._height = t
                }
            }, {
                key: "style"
                , get: function() {
                    return this._style
                }
                , set: function(t) {
                    this._style = (t = t || {}) instanceof c.default ? t : new c.default(t), this.localStyleID = -1, this.dirty = !0
                }
            }, {
                key: "text"
                , get: function() {
                    return this._text
                }
                , set: function(t) {
                    t = String("" === t || null === t || void 0 === t ? " " : t), this._text !== t && (this._text = t, this.dirty = !0)
                }
            }]), e
        }(o.default);
    e.default = y
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        var e = t.width
            , r = t.height
            , n = t.getContext("2d")
            , i = n.getImageData(0, 0, e, r).data
            , o = i.length
            , s = {
                top: null
                , left: null
                , right: null
                , bottom: null
            }
            , a = null
            , u = void 0
            , l = void 0
            , h = void 0;
        for (u = 0; u < o; u += 4) 0 !== i[u + 3] && (l = u / 4 % e, h = ~~(u / 4 / e), null === s.top && (s.top = h), null === s.left ? s.left = l : l < s.left && (s.left = l), null === s.right ? s.right = l + 1 : s.right < l && (s.right = l + 1), null === s.bottom ? s.bottom = h : s.bottom < h && (s.bottom = h));
        return null !== s.top && (a = n.getImageData(s.left, s.top, e = s.right - s.left, r = s.bottom - s.top + 1)), {
            height: r
            , width: e
            , data: a
        }
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = _(r(11))
        , o = _(r(33))
        , s = _(r(8))
        , a = _(r(67))
        , u = _(r(30))
        , l = r(5)
        , h = r(3)
        , c = r(1)
        , f = _(r(26))
        , d = _(r(144))
        , p = _(r(12));

    function _(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var y = void 0
        , m = new l.Matrix
        , v = new l.Point
        , g = new Float32Array(4)
        , b = new Float32Array(4)
        , T = function(t) {
            function e() {
                var r = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this));
                return i.fillAlpha = 1, i.lineWidth = 0, i.nativeLines = r, i.lineColor = 0, i.lineAlignment = .5, i.graphicsData = [], i.tint = 16777215, i._prevTint = 16777215, i.blendMode = c.BLEND_MODES.NORMAL, i.currentPath = null, i._webGL = {}, i.isMask = !1, i.boundsPadding = 0, i._localBounds = new f.default, i.dirty = 0, i.fastRectDirty = -1, i.clearDirty = 0, i.boundsDirty = -1, i.cachedSpriteDirty = !1, i._spriteRect = null, i._fastRect = !1, i._prevRectTint = null, i._prevRectFillColor = null, i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.clone = function() {
                var t = new e;
                t.renderable = this.renderable, t.fillAlpha = this.fillAlpha, t.lineWidth = this.lineWidth, t.lineColor = this.lineColor, t.lineAlignment = this.lineAlignment, t.tint = this.tint, t.blendMode = this.blendMode, t.isMask = this.isMask, t.boundsPadding = this.boundsPadding, t.dirty = 0, t.cachedSpriteDirty = this.cachedSpriteDirty;
                for (var r = 0; r < this.graphicsData.length; ++r) t.graphicsData.push(this.graphicsData[r].clone());
                return t.currentPath = t.graphicsData[t.graphicsData.length - 1], t.updateLocalBounds(), t
            }, e.prototype._quadraticCurveLength = function(t, e, r, n, i, o) {
                var s = t - (2 * r + i)
                    , a = e - (2 * n + o)
                    , u = (r - 2) * t * 2
                    , l = (n - 2) * e * 2
                    , h = 4 * (s * s + a * a)
                    , c = 4 * (s * u + a * l)
                    , f = u * u + l * l
                    , d = 2 * Math.sqrt(h + c + f)
                    , p = Math.sqrt(h)
                    , _ = 2 * h * p
                    , y = 2 * Math.sqrt(f)
                    , m = c / p;
                return (_ * d + p * c * (d - y) + (4 * f * h - c * c) * Math.log((2 * p + m + d) / (m + y))) / (4 * _)
            }, e.prototype._bezierCurveLength = function(t, e, r, n, i, o, s, a) {
                for (var u = 0, l = 0, h = 0, c = 0, f = 0, d = 0, p = 0, _ = 0, y = 0, m = 0, v = 0, g = t, b = e, T = 1; T <= 10; ++T) m = g - (_ = (p = (d = (f = 1 - (l = T / 10)) * f) * f) * t + 3 * d * l * r + 3 * f * (h = l * l) * i + (c = h * l) * s), v = b - (y = p * e + 3 * d * l * n + 3 * f * h * o + c * a), g = _, b = y, u += Math.sqrt(m * m + v * v);
                return u
            }, e.prototype._segmentsCount = function(t) {
                var r = Math.ceil(t / e.CURVES.maxLength);
                return r < e.CURVES.minSegments ? r = e.CURVES.minSegments : r > e.CURVES.maxSegments && (r = e.CURVES.maxSegments), r
            }, e.prototype.lineStyle = function() {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                    , e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
                    , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : .5;
                if (this.lineWidth = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, this.lineColor = t, this.lineAlpha = e, this.lineAlignment = r, this.currentPath)
                    if (this.currentPath.shape.points.length) {
                        var n = new l.Polygon(this.currentPath.shape.points.slice(-2));
                        n.closed = !1, this.drawShape(n)
                    } else this.currentPath.lineWidth = this.lineWidth, this.currentPath.lineColor = this.lineColor, this.currentPath.lineAlpha = this.lineAlpha, this.currentPath.lineAlignment = this.lineAlignment;
                return this
            }, e.prototype.moveTo = function(t, e) {
                var r = new l.Polygon([t, e]);
                return r.closed = !1, this.drawShape(r), this
            }, e.prototype.lineTo = function(t, e) {
                var r = this.currentPath.shape.points;
                return r[r.length - 2] === t && r[r.length - 1] === e || (r.push(t, e), this.dirty++), this
            }, e.prototype.quadraticCurveTo = function(t, r, n, i) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                var o = this.currentPath.shape.points
                    , s = 0
                    , a = 0;
                0 === o.length && this.moveTo(0, 0);
                for (var u = o[o.length - 2], l = o[o.length - 1], h = e.CURVES.adaptive ? this._segmentsCount(this._quadraticCurveLength(u, l, t, r, n, i)) : 20, c = 1; c <= h; ++c) {
                    var f = c / h;
                    o.push((s = u + (t - u) * f) + (t + (n - t) * f - s) * f, (a = l + (r - l) * f) + (r + (i - r) * f - a) * f)
                }
                return this.dirty++, this
            }, e.prototype.bezierCurveTo = function(t, r, n, i, o, s) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                var a = this.currentPath.shape.points
                    , u = a[a.length - 2]
                    , l = a[a.length - 1];
                a.length -= 2;
                var h = e.CURVES.adaptive ? this._segmentsCount(this._bezierCurveLength(u, l, t, r, n, i, o, s)) : 20;
                return (0, d.default)(u, l, t, r, n, i, o, s, h, a), this.dirty++, this
            }, e.prototype.arcTo = function(t, e, r, n, i) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(t, e) : this.moveTo(t, e);
                var o = this.currentPath.shape.points
                    , s = o[o.length - 1] - e
                    , a = o[o.length - 2] - t
                    , u = n - e
                    , l = r - t
                    , h = Math.abs(s * l - a * u);
                if (h < 1e-8 || 0 === i) o[o.length - 2] === t && o[o.length - 1] === e || o.push(t, e);
                else {
                    var c = s * s + a * a
                        , f = u * u + l * l
                        , d = s * u + a * l
                        , p = i * Math.sqrt(c) / h
                        , _ = i * Math.sqrt(f) / h
                        , y = p * d / c
                        , m = _ * d / f
                        , v = p * l + _ * a
                        , g = p * u + _ * s
                        , b = l * (p + m)
                        , T = u * (p + m)
                        , x = Math.atan2(s * (_ + y) - g, a * (_ + y) - v)
                        , w = Math.atan2(T - g, b - v);
                    this.arc(v + t, g + e, i, x, w, a * u > l * s)
                }
                return this.dirty++, this
            }, e.prototype.arc = function(t, r, n, i, o) {
                var s = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
                if (i === o) return this;
                !s && o <= i ? o += c.PI_2 : s && i <= o && (i += c.PI_2);
                var a = o - i
                    , u = e.CURVES.adaptive ? this._segmentsCount(Math.abs(a) * n) : 40 * Math.ceil(Math.abs(a) / c.PI_2);
                if (0 === a) return this;
                var l = t + Math.cos(i) * n
                    , h = r + Math.sin(i) * n
                    , f = this.currentPath ? this.currentPath.shape.points : null;
                if (f) {
                    var d = Math.abs(f[f.length - 2] - l)
                        , p = Math.abs(f[f.length - 1] - h);
                    d < .001 && p < .001 || f.push(l, h)
                } else this.moveTo(l, h), f = this.currentPath.shape.points;
                for (var _ = a / (2 * u), y = 2 * _, m = Math.cos(_), v = Math.sin(_), g = u - 1, b = g % 1 / g, T = 0; T <= g; ++T) {
                    var x = _ + i + y * (T + b * T)
                        , w = Math.cos(x)
                        , E = -Math.sin(x);
                    f.push((m * w + v * E) * n + t, (m * -E + v * w) * n + r)
                }
                return this.dirty++, this
            }, e.prototype.beginFill = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                    , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                return this.filling = !0, this.fillColor = t, this.fillAlpha = e, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), this
            }, e.prototype.endFill = function() {
                return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this
            }, e.prototype.drawRect = function(t, e, r, n) {
                return this.drawShape(new l.Rectangle(t, e, r, n)), this
            }, e.prototype.drawRoundedRect = function(t, e, r, n, i) {
                return this.drawShape(new l.RoundedRectangle(t, e, r, n, i)), this
            }, e.prototype.drawCircle = function(t, e, r) {
                return this.drawShape(new l.Circle(t, e, r)), this
            }, e.prototype.drawEllipse = function(t, e, r, n) {
                return this.drawShape(new l.Ellipse(t, e, r, n)), this
            }, e.prototype.drawPolygon = function(t) {
                var e = t
                    , r = !0;
                if (e instanceof l.Polygon && (r = e.closed, e = e.points), !Array.isArray(e)) {
                    e = new Array(arguments.length);
                    for (var n = 0; n < e.length; ++n) e[n] = arguments[n]
                }
                var i = new l.Polygon(e);
                return i.closed = r, this.drawShape(i), this
            }, e.prototype.drawStar = function(t, e, r, n, i) {
                i = i || n / 2;
                for (var o = -1 * Math.PI / 2 + (arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0), s = 2 * r, a = c.PI_2 / s, u = [], l = 0; l < s; l++) {
                    var h = l % 2 ? i : n
                        , f = l * a + o;
                    u.push(t + h * Math.cos(f), e + h * Math.sin(f))
                }
                return this.drawPolygon(u)
            }, e.prototype.clear = function() {
                return (this.lineWidth || this.filling || this.graphicsData.length > 0) && (this.lineWidth = 0, this.lineAlignment = .5, this.filling = !1, this.boundsDirty = -1, this.canvasTintDirty = -1, this.dirty++, this.clearDirty++, this.graphicsData.length = 0), this.currentPath = null, this._spriteRect = null, this
            }, e.prototype.isFastRect = function() {
                return 1 === this.graphicsData.length && this.graphicsData[0].shape.type === c.SHAPES.RECT && !this.graphicsData[0].lineWidth
            }, e.prototype._renderWebGL = function(t) {
                this.dirty !== this.fastRectDirty && (this.fastRectDirty = this.dirty, this._fastRect = this.isFastRect()), this._fastRect ? this._renderSpriteRect(t) : (t.setObjectRenderer(t.plugins.graphics), t.plugins.graphics.render(this))
            }, e.prototype._renderSpriteRect = function(t) {
                var e = this.graphicsData[0].shape;
                this._spriteRect || (this._spriteRect = new u.default(new s.default(s.default.WHITE)));
                var r = this._spriteRect
                    , n = this.graphicsData[0].fillColor;
                if (16777215 === this.tint) r.tint = n;
                else if (this.tint !== this._prevRectTint || n !== this._prevRectFillColor) {
                    var i = g
                        , o = b;
                    (0, h.hex2rgb)(n, i), (0, h.hex2rgb)(this.tint, o), i[0] *= o[0], i[1] *= o[1], i[2] *= o[2], r.tint = (0, h.rgb2hex)(i), this._prevRectTint = this.tint, this._prevRectFillColor = n
                }
                r.alpha = this.graphicsData[0].fillAlpha, r.worldAlpha = this.worldAlpha * r.alpha, r.blendMode = this.blendMode, r._texture._frame.width = e.width, r._texture._frame.height = e.height, r.transform.worldTransform = this.transform.worldTransform, r.anchor.set(-e.x / e.width, -e.y / e.height), r._onAnchorUpdate(), r._renderWebGL(t)
            }, e.prototype._renderCanvas = function(t) {
                !0 !== this.isMask && t.plugins.graphics.render(this)
            }, e.prototype._calculateBounds = function() {
                this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.updateLocalBounds(), this.cachedSpriteDirty = !0);
                var t = this._localBounds;
                this._bounds.addFrame(this.transform, t.minX, t.minY, t.maxX, t.maxY)
            }, e.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, v);
                for (var e = this.graphicsData, r = 0; r < e.length; ++r) {
                    var n = e[r];
                    if (n.fill && n.shape && n.shape.contains(v.x, v.y)) {
                        if (n.holes)
                            for (var i = 0; i < n.holes.length; i++)
                                if (n.holes[i].contains(v.x, v.y)) return !1;
                        return !0
                    }
                }
                return !1
            }, e.prototype.updateLocalBounds = function() {
                var t = 1 / 0
                    , e = -1 / 0
                    , r = 1 / 0
                    , n = -1 / 0;
                if (this.graphicsData.length)
                    for (var i = 0, o = 0, s = 0, a = 0, u = 0, l = 0; l < this.graphicsData.length; l++) {
                        var h = this.graphicsData[l]
                            , f = h.type
                            , d = h.lineWidth;
                        if (i = h.shape, f === c.SHAPES.RECT || f === c.SHAPES.RREC) s = i.y - d / 2, a = i.width + d, u = i.height + d, t = (o = i.x - d / 2) < t ? o : t, e = o + a > e ? o + a : e, r = s < r ? s : r, n = s + u > n ? s + u : n;
                        else if (f === c.SHAPES.CIRC) s = i.y, u = i.radius + d / 2, t = (o = i.x) - (a = i.radius + d / 2) < t ? o - a : t, e = o + a > e ? o + a : e, r = s - u < r ? s - u : r, n = s + u > n ? s + u : n;
                        else if (f === c.SHAPES.ELIP) s = i.y, u = i.height + d / 2, t = (o = i.x) - (a = i.width + d / 2) < t ? o - a : t, e = o + a > e ? o + a : e, r = s - u < r ? s - u : r, n = s + u > n ? s + u : n;
                        else
                            for (var p = i.points, _ = 0, y = 0, m = 0, v = 0, g = 0, b = 0, T = 0, x = 0, w = 0; w + 2 < p.length; w += 2) o = p[w], s = p[w + 1], _ = p[w + 2], y = p[w + 3], m = Math.abs(_ - o), v = Math.abs(y - s), u = d, (a = Math.sqrt(m * m + v * v)) < 1e-9 || (b = (u / a * m + v) / 2, x = (y + s) / 2, t = (T = (_ + o) / 2) - (g = (u / a * v + m) / 2) < t ? T - g : t, e = T + g > e ? T + g : e, r = x - b < r ? x - b : r, n = x + b > n ? x + b : n)
                    } else t = 0, e = 0, r = 0, n = 0;
                var E = this.boundsPadding;
                this._localBounds.minX = t - E, this._localBounds.maxX = e + E, this._localBounds.minY = r - E, this._localBounds.maxY = n + E
            }, e.prototype.drawShape = function(t) {
                this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(), this.currentPath = null;
                var e = new a.default(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, this.nativeLines, t, this.lineAlignment);
                return this.graphicsData.push(e), e.type === c.SHAPES.POLY && (e.shape.closed = e.shape.closed, this.currentPath = e), this.dirty++, e
            }, e.prototype.generateCanvasTexture = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
                    , r = this.getLocalBounds()
                    , n = o.default.create(r.width, r.height, t, e);
                y || (y = new p.default), this.transform.updateLocalTransform(), this.transform.localTransform.copy(m), m.invert(), m.tx -= r.x, m.ty -= r.y, y.render(this, n, !0, m);
                var i = s.default.fromCanvas(n.baseTexture._canvasRenderTarget.canvas, t, "graphics");
                return i.baseTexture.resolution = e, i.baseTexture.update(), i
            }, e.prototype.closePath = function() {
                var t = this.currentPath;
                return t && t.shape && t.shape.close(), this
            }, e.prototype.addHole = function() {
                var t = this.graphicsData.pop();
                return this.currentPath = this.graphicsData[this.graphicsData.length - 1], this.currentPath.addHole(t.shape), this.currentPath = null, this
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this, e);
                for (var r = 0; r < this.graphicsData.length; ++r) this.graphicsData[r].destroy();
                for (var n in this._webGL)
                    for (var i = 0; i < this._webGL[n].data.length; ++i) this._webGL[n].data[i].destroy();
                this._spriteRect && this._spriteRect.destroy(), this.graphicsData = null, this.currentPath = null, this._webGL = null, this._localBounds = null
            }, e
        }(i.default);
    e.default = T, T._SPRITE_TEXTURE = null, T.CURVES = {
        adaptive: !1
        , maxLength: 10
        , minSegments: 8
        , maxSegments: 2048
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e, r, n, i, o, s, a, u) {
        var l = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : []
            , h = 0
            , c = 0
            , f = 0
            , d = 0
            , p = 0;
        l.push(t, e);
        for (var _ = 1, y = 0; _ <= u; ++_) f = (c = (h = 1 - (y = _ / u)) * h) * h, p = (d = y * y) * y, l.push(f * t + 3 * c * y * r + 3 * h * d * i + p * s, f * e + 3 * c * y * n + 3 * h * d * o + p * a);
        return l
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = r(3)
        , o = r(1)
        , s = p(r(18))
        , a = p(r(19))
        , u = p(r(146))
        , l = p(r(147))
        , h = p(r(148))
        , c = p(r(149))
        , f = p(r(150))
        , d = p(r(151));

    function p(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var _ = function(t) {
        function e(r) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var i = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, r));
            return i.graphicsDataPool = [], i.primitiveShader = null, i.gl = r.gl, i.CONTEXT_UID = 0, i
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.onContextChange = function() {
            this.gl = this.renderer.gl, this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.primitiveShader = new l.default(this.gl)
        }, e.prototype.destroy = function() {
            s.default.prototype.destroy.call(this);
            for (var t = 0; t < this.graphicsDataPool.length; ++t) this.graphicsDataPool[t].destroy();
            this.graphicsDataPool = null
        }, e.prototype.render = function(t) {
            var e = this.renderer
                , r = e.gl
                , n = void 0
                , o = t._webGL[this.CONTEXT_UID];
            o && t.dirty === o.dirty || (this.updateGraphics(t), o = t._webGL[this.CONTEXT_UID]), e.bindShader(this.primitiveShader), e.state.setBlendMode(t.blendMode);
            for (var s = 0, a = o.data.length; s < a; s++) {
                var u = (n = o.data[s]).shader;
                e.bindShader(u), u.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0), u.uniforms.tint = (0, i.hex2rgb)(t.tint), u.uniforms.alpha = t.worldAlpha, e.bindVao(n.vao), n.nativeLines ? r.drawArrays(r.LINES, 0, n.points.length / 6) : n.vao.draw(r.TRIANGLE_STRIP, n.indices.length)
            }
        }, e.prototype.updateGraphics = function(t) {
            var e = t._webGL[this.CONTEXT_UID];
            if (e || (e = t._webGL[this.CONTEXT_UID] = {
                    lastIndex: 0
                    , data: []
                    , gl: this.renderer.gl
                    , clearDirty: -1
                    , dirty: -1
                }), e.dirty = t.dirty, t.clearDirty !== e.clearDirty) {
                e.clearDirty = t.clearDirty;
                for (var r = 0; r < e.data.length; r++) this.graphicsDataPool.push(e.data[r]);
                e.data.length = 0, e.lastIndex = 0
            }
            for (var n = void 0, i = void 0, s = e.lastIndex; s < t.graphicsData.length; s++) {
                var a = t.graphicsData[s];
                n = this.getWebGLData(e, 0), a.nativeLines && a.lineWidth && (i = this.getWebGLData(e, 0, !0), e.lastIndex++), a.type === o.SHAPES.POLY && (0, h.default)(a, n, i), a.type === o.SHAPES.RECT ? (0, c.default)(a, n, i) : a.type === o.SHAPES.CIRC || a.type === o.SHAPES.ELIP ? (0, d.default)(a, n, i) : a.type === o.SHAPES.RREC && (0, f.default)(a, n, i), e.lastIndex++
            }
            this.renderer.bindVao(null);
            for (var u = 0; u < e.data.length; u++)(n = e.data[u]).dirty && n.upload()
        }, e.prototype.getWebGLData = function(t, e, r) {
            var n = t.data[t.data.length - 1];
            return (!n || n.nativeLines !== r || n.points.length > 32e4) && ((n = this.graphicsDataPool.pop() || new u.default(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState)).nativeLines = r, n.reset(e), t.data.push(n)), n.dirty = !0, n
        }, e
    }(s.default);
    e.default = _, a.default.registerPlugin("graphics", _)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(6))
        , i = function() {
            function t(e, r, i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.gl = e, this.color = [0, 0, 0], this.points = [], this.indices = [], this.buffer = n.default.GLBuffer.createVertexBuffer(e), this.indexBuffer = n.default.GLBuffer.createIndexBuffer(e), this.dirty = !0, this.nativeLines = !1, this.glPoints = null, this.glIndices = null, this.shader = r, this.vao = new n.default.VertexArrayObject(e, i).addIndex(this.indexBuffer).addAttribute(this.buffer, r.attributes.aVertexPosition, e.FLOAT, !1, 24, 0).addAttribute(this.buffer, r.attributes.aColor, e.FLOAT, !1, 24, 8)
            }
            return t.prototype.reset = function() {
                this.points.length = 0, this.indices.length = 0
            }, t.prototype.upload = function() {
                this.glPoints = new Float32Array(this.points), this.buffer.upload(this.glPoints), this.glIndices = new Uint16Array(this.indices), this.indexBuffer.upload(this.glIndices), this.dirty = !1
            }, t.prototype.destroy = function() {
                this.color = null, this.points = null, this.indices = null, this.vao.destroy(), this.buffer.destroy(), this.indexBuffer.destroy(), this.gl = null, this.buffer = null, this.indexBuffer = null, this.glPoints = null, this.glIndices = null
            }, t
        }();
    e.default = i
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
        function e(r) {
            return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
                , function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n")))
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e
    }(function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(r(14)).default);
    e.default = i
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e, r) {
        t.points = t.shape.points.slice();
        var s = t.points;
        if (t.fill && s.length >= 6) {
            for (var a = [], u = t.holes, l = 0; l < u.length; l++) {
                var h = u[l];
                a.push(s.length / 2), s = s.concat(h.points)
            }
            var c = e.points
                , f = e.indices
                , d = s.length / 2
                , p = (0, i.hex2rgb)(t.fillColor)
                , _ = t.fillAlpha
                , y = p[0] * _
                , m = p[1] * _
                , v = p[2] * _
                , g = (0, o.default)(s, a, 2);
            if (!g) return;
            for (var b = c.length / 6, T = 0; T < g.length; T += 3) f.push(g[T] + b), f.push(g[T] + b), f.push(g[T + 1] + b), f.push(g[T + 2] + b), f.push(g[T + 2] + b);
            for (var x = 0; x < d; x++) c.push(s[2 * x], s[2 * x + 1], y, m, v, _)
        }
        t.lineWidth > 0 && (0, n.default)(t, e, r)
    };
    var n = s(r(21))
        , i = r(3)
        , o = s(r(29));

    function s(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e, r) {
        var o = t.shape
            , s = o.x
            , a = o.y
            , u = o.width
            , l = o.height;
        if (t.fill) {
            var h = (0, i.hex2rgb)(t.fillColor)
                , c = t.fillAlpha
                , f = h[0] * c
                , d = h[1] * c
                , p = h[2] * c
                , _ = e.points
                , y = e.indices
                , m = _.length / 6;
            _.push(s, a), _.push(f, d, p, c), _.push(s + u, a), _.push(f, d, p, c), _.push(s, a + l), _.push(f, d, p, c), _.push(s + u, a + l), _.push(f, d, p, c), y.push(m, m, m + 1, m + 2, m + 3, m + 3)
        }
        if (t.lineWidth) {
            var v = t.points;
            t.points = [s, a, s + u, a, s + u, a + l, s, a + l, s, a], (0, n.default)(t, e, r), t.points = v
        }
    };
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(21))
        , i = r(3)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e, r) {
        var s = t.shape
            , a = s.x
            , l = s.y
            , h = s.width
            , c = s.height
            , f = s.radius
            , d = [];
        if (d.push(a, l + f), u(a, l + c - f, a, l + c, a + f, l + c, d), u(a + h - f, l + c, a + h, l + c, a + h, l + c - f, d), u(a + h, l + f, a + h, l, a + h - f, l, d), u(a + f, l, a, l, a, l + f + 1e-10, d), t.fill) {
            for (var p = (0, o.hex2rgb)(t.fillColor), _ = t.fillAlpha, y = p[0] * _, m = p[1] * _, v = p[2] * _, g = e.points, b = e.indices, T = g.length / 6, x = (0, n.default)(d, null, 2), w = 0, E = x.length; w < E; w += 3) b.push(x[w] + T), b.push(x[w] + T), b.push(x[w + 1] + T), b.push(x[w + 2] + T), b.push(x[w + 2] + T);
            for (var S = 0, O = d.length; S < O; S++) g.push(d[S], d[++S], y, m, v, _)
        }
        if (t.lineWidth) {
            var P = t.points;
            t.points = d, (0, i.default)(t, e, r), t.points = P
        }
    };
    var n = s(r(29))
        , i = s(r(21))
        , o = r(3);

    function s(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }

    function a(t, e, r) {
        return t + (e - t) * r
    }

    function u(t, e, r, n, i, o) {
        for (var s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [], u = 0, l = 0, h = 0, c = 0, f = 0, d = 0, p = 0, _ = 0; p <= 20; ++p) u = a(t, r, _ = p / 20), l = a(e, n, _), h = a(r, i, _), c = a(n, o, _), f = a(u, h, _), d = a(l, c, _), s.push(f, d);
        return s
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t, e, r) {
        var s = t.shape
            , a = s.x
            , u = s.y
            , l = void 0
            , h = void 0;
        if (t.type === i.SHAPES.CIRC ? (l = s.radius, h = s.radius) : (l = s.width, h = s.height), 0 !== l && 0 !== h) {
            var c = Math.floor(30 * Math.sqrt(s.radius)) || Math.floor(15 * Math.sqrt(s.width + s.height))
                , f = 2 * Math.PI / c;
            if (t.fill) {
                var d = (0, o.hex2rgb)(t.fillColor)
                    , p = t.fillAlpha
                    , _ = d[0] * p
                    , y = d[1] * p
                    , m = d[2] * p
                    , v = e.points
                    , g = e.indices
                    , b = v.length / 6;
                g.push(b);
                for (var T = 0; T < c + 1; T++) v.push(a, u, _, y, m, p), v.push(a + Math.sin(f * T) * l, u + Math.cos(f * T) * h, _, y, m, p), g.push(b++, b++);
                g.push(b - 1)
            }
            if (t.lineWidth) {
                var x = t.points;
                t.points = [];
                for (var w = 0; w < c; w++) t.points.push(a + Math.sin(f * -w) * l, u + Math.cos(f * -w) * h);
                t.points.push(t.points[0], t.points[1]), (0, n.default)(t, e, r), t.points = x
            }
        }
    };
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(21))
        , i = r(1)
        , o = r(3)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(12))
        , i = r(1)
        , o = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.renderer = e
            }
            return t.prototype.render = function(t) {
                var e = this.renderer
                    , r = e.context
                    , n = t.worldAlpha
                    , o = t.transform.worldTransform
                    , s = e.resolution;
                r.setTransform(o.a * s, o.b * s, o.c * s, o.d * s, o.tx * s, o.ty * s), t.canvasTintDirty === t.dirty && t._prevTint === t.tint || this.updateGraphicsTint(t), e.setBlendMode(t.blendMode);
                for (var a = 0; a < t.graphicsData.length; a++) {
                    var u = t.graphicsData[a]
                        , l = u.shape
                        , h = u._fillTint
                        , c = u._lineTint;
                    if (r.lineWidth = u.lineWidth, u.type === i.SHAPES.POLY) {
                        r.beginPath(), this.renderPolygon(l.points, l.closed, r);
                        for (var f = 0; f < u.holes.length; f++) this.renderPolygon(u.holes[f].points, !0, r);
                        u.fill && (r.globalAlpha = u.fillAlpha * n, r.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), r.fill()), u.lineWidth && (r.globalAlpha = u.lineAlpha * n, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.stroke())
                    } else if (u.type === i.SHAPES.RECT)(u.fillColor || 0 === u.fillColor) && (r.globalAlpha = u.fillAlpha * n, r.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), r.fillRect(l.x, l.y, l.width, l.height)), u.lineWidth && (r.globalAlpha = u.lineAlpha * n, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.strokeRect(l.x, l.y, l.width, l.height));
                    else if (u.type === i.SHAPES.CIRC) r.beginPath(), r.arc(l.x, l.y, l.radius, 0, 2 * Math.PI), r.closePath(), u.fill && (r.globalAlpha = u.fillAlpha * n, r.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), r.fill()), u.lineWidth && (r.globalAlpha = u.lineAlpha * n, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.stroke());
                    else if (u.type === i.SHAPES.ELIP) {
                        var d = 2 * l.width
                            , p = 2 * l.height
                            , _ = l.x - d / 2
                            , y = l.y - p / 2;
                        r.beginPath();
                        var m = d / 2 * .5522848
                            , v = p / 2 * .5522848
                            , g = _ + d
                            , b = y + p
                            , T = _ + d / 2
                            , x = y + p / 2;
                        r.moveTo(_, x), r.bezierCurveTo(_, x - v, T - m, y, T, y), r.bezierCurveTo(T + m, y, g, x - v, g, x), r.bezierCurveTo(g, x + v, T + m, b, T, b), r.bezierCurveTo(T - m, b, _, x + v, _, x), r.closePath(), u.fill && (r.globalAlpha = u.fillAlpha * n, r.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), r.fill()), u.lineWidth && (r.globalAlpha = u.lineAlpha * n, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.stroke())
                    } else if (u.type === i.SHAPES.RREC) {
                        var w = l.x
                            , E = l.y
                            , S = l.width
                            , O = l.height
                            , P = l.radius
                            , C = Math.min(S, O) / 2 | 0;
                        P = P > C ? C : P, r.beginPath(), r.moveTo(w, E + P), r.lineTo(w, E + O - P), r.quadraticCurveTo(w, E + O, w + P, E + O), r.lineTo(w + S - P, E + O), r.quadraticCurveTo(w + S, E + O, w + S, E + O - P), r.lineTo(w + S, E + P), r.quadraticCurveTo(w + S, E, w + S - P, E), r.lineTo(w + P, E), r.quadraticCurveTo(w, E, w, E + P), r.closePath(), (u.fillColor || 0 === u.fillColor) && (r.globalAlpha = u.fillAlpha * n, r.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), r.fill()), u.lineWidth && (r.globalAlpha = u.lineAlpha * n, r.strokeStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), r.stroke())
                    }
                }
            }, t.prototype.updateGraphicsTint = function(t) {
                t._prevTint = t.tint, t.canvasTintDirty = t.dirty;
                for (var e = (t.tint >> 16 & 255) / 255, r = (t.tint >> 8 & 255) / 255, n = (255 & t.tint) / 255, i = 0; i < t.graphicsData.length; ++i) {
                    var o = t.graphicsData[i]
                        , s = 0 | o.fillColor
                        , a = 0 | o.lineColor;
                    o._fillTint = ((s >> 16 & 255) / 255 * e * 255 << 16) + ((s >> 8 & 255) / 255 * r * 255 << 8) + (255 & s) / 255 * n * 255, o._lineTint = ((a >> 16 & 255) / 255 * e * 255 << 16) + ((a >> 8 & 255) / 255 * r * 255 << 8) + (255 & a) / 255 * n * 255
                }
            }, t.prototype.renderPolygon = function(t, e, r) {
                r.moveTo(t[0], t[1]);
                for (var n = 1; n < t.length / 2; ++n) r.lineTo(t[2 * n], t[2 * n + 1]);
                e && r.closePath()
            }, t.prototype.destroy = function() {
                this.renderer = null
            }, t
        }();
    e.default = o, n.default.registerPlugin("graphics", o)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , i = r(2)
        , o = r(3)
        , s = function() {
            function t(e, r) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.baseTexture = e, this.textures = {}, this.animations = {}, this.data = r, this.resolution = this._updateResolution(n || this.baseTexture.imageUrl), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null
            }
            return n(t, null, [{
                key: "BATCH_SIZE"
                , get: function() {
                    return 1e3
                }
            }]), t.prototype._updateResolution = function(t) {
                var e = this.data.meta.scale
                    , r = (0, o.getResolutionOfUrl)(t, null);
                return null === r && (r = void 0 !== e ? parseFloat(e) : 1), 1 !== r && (this.baseTexture.resolution = r, this.baseTexture.update()), r
            }, t.prototype.parse = function(e) {
                this._batchIndex = 0, this._callback = e, this._frameKeys.length <= t.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch()
            }, t.prototype._processFrames = function(e) {
                for (var r = e, n = t.BATCH_SIZE, o = this.baseTexture.sourceScale; r - e < n && r < this._frameKeys.length;) {
                    var s = this._frameKeys[r]
                        , a = this._frames[s]
                        , u = a.frame;
                    if (u) {
                        var l, h = null
                            , c = !1 !== a.trimmed && a.sourceSize ? a.sourceSize : a.frame
                            , f = new i.Rectangle(0, 0, Math.floor(c.w * o) / this.resolution, Math.floor(c.h * o) / this.resolution);
                        l = a.rotated ? new i.Rectangle(Math.floor(u.x * o) / this.resolution, Math.floor(u.y * o) / this.resolution, Math.floor(u.h * o) / this.resolution, Math.floor(u.w * o) / this.resolution) : new i.Rectangle(Math.floor(u.x * o) / this.resolution, Math.floor(u.y * o) / this.resolution, Math.floor(u.w * o) / this.resolution, Math.floor(u.h * o) / this.resolution), !1 !== a.trimmed && a.spriteSourceSize && (h = new i.Rectangle(Math.floor(a.spriteSourceSize.x * o) / this.resolution, Math.floor(a.spriteSourceSize.y * o) / this.resolution, Math.floor(u.w * o) / this.resolution, Math.floor(u.h * o) / this.resolution)), this.textures[s] = new i.Texture(this.baseTexture, l, f, h, a.rotated ? 2 : 0, a.anchor), i.Texture.addToCache(this.textures[s], s)
                    }
                    r++
                }
            }, t.prototype._processAnimations = function() {
                var t = this.data.animations || {};
                for (var e in t) {
                    this.animations[e] = [];
                    var r = t[e]
                        , n = Array.isArray(r)
                        , i = 0;
                    for (r = n ? r : r[Symbol.iterator]();;) {
                        var o;
                        if (n) {
                            if (i >= r.length) break;
                            o = r[i++]
                        } else {
                            if ((i = r.next()).done) break;
                            o = i.value
                        }
                        this.animations[e].push(this.textures[o])
                    }
                }
            }, t.prototype._parseComplete = function() {
                var t = this._callback;
                this._callback = null, this._batchIndex = 0, t.call(this, this.textures)
            }, t.prototype._nextBatch = function() {
                var e = this;
                this._processFrames(this._batchIndex * t.BATCH_SIZE), this._batchIndex++, setTimeout(function() {
                    e._batchIndex * t.BATCH_SIZE < e._frameKeys.length ? e._nextBatch() : (e._processAnimations(), e._parseComplete())
                }, 0)
            }, t.prototype.destroy = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                for (var e in this.textures) this.textures[e].destroy();
                this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && this.baseTexture.destroy(), this.baseTexture = null
            }, t
        }();
    e.default = s
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.default = function(t) {
        var e = t.mesh
            , r = t.particles
            , n = t.extras
            , o = t.filters
            , s = t.prepare
            , a = t.loaders
            , u = t.interaction;
        Object.defineProperties(t, {
            SpriteBatch: {
                get: function() {
                    throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")
                }
            }
            , AssetLoader: {
                get: function() {
                    throw new ReferenceError("The loader system was overhauled in PixiJS v3, please see the new PIXI.loaders.Loader class.")
                }
            }
            , Stage: {
                get: function() {
                    return i("You do not need to use a PIXI Stage any more, you can simply render any container."), t.Container
                }
            }
            , DisplayObjectContainer: {
                get: function() {
                    return i("DisplayObjectContainer has been shortened to Container, please use Container from now on."), t.Container
                }
            }
            , Strip: {
                get: function() {
                    return i("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."), e.Mesh
                }
            }
            , Rope: {
                get: function() {
                    return i("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."), e.Rope
                }
            }
            , ParticleContainer: {
                get: function() {
                    return i("The ParticleContainer class has been moved to particles.ParticleContainer, please use particles.ParticleContainer from now on."), r.ParticleContainer
                }
            }
            , MovieClip: {
                get: function() {
                    return i("The MovieClip class has been moved to extras.AnimatedSprite, please use extras.AnimatedSprite."), n.AnimatedSprite
                }
            }
            , TilingSprite: {
                get: function() {
                    return i("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."), n.TilingSprite
                }
            }
            , BitmapText: {
                get: function() {
                    return i("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."), n.BitmapText
                }
            }
            , blendModes: {
                get: function() {
                    return i("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."), t.BLEND_MODES
                }
            }
            , scaleModes: {
                get: function() {
                    return i("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."), t.SCALE_MODES
                }
            }
            , BaseTextureCache: {
                get: function() {
                    return i("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."), t.utils.BaseTextureCache
                }
            }
            , TextureCache: {
                get: function() {
                    return i("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."), t.utils.TextureCache
                }
            }
            , math: {
                get: function() {
                    return i("The math namespace is deprecated, please access members already accessible on PIXI."), t
                }
            }
            , AbstractFilter: {
                get: function() {
                    return i("AstractFilter has been renamed to Filter, please use PIXI.Filter"), t.Filter
                }
            }
            , TransformManual: {
                get: function() {
                    return i("TransformManual has been renamed to TransformBase, please update your pixi-spine"), t.TransformBase
                }
            }
            , TARGET_FPMS: {
                get: function() {
                    return i("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"), t.settings.TARGET_FPMS
                }
                , set: function(e) {
                    i("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"), t.settings.TARGET_FPMS = e
                }
            }
            , FILTER_RESOLUTION: {
                get: function() {
                    return i("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"), t.settings.FILTER_RESOLUTION
                }
                , set: function(e) {
                    i("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"), t.settings.FILTER_RESOLUTION = e
                }
            }
            , RESOLUTION: {
                get: function() {
                    return i("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"), t.settings.RESOLUTION
                }
                , set: function(e) {
                    i("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"), t.settings.RESOLUTION = e
                }
            }
            , MIPMAP_TEXTURES: {
                get: function() {
                    return i("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"), t.settings.MIPMAP_TEXTURES
                }
                , set: function(e) {
                    i("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"), t.settings.MIPMAP_TEXTURES = e
                }
            }
            , SPRITE_BATCH_SIZE: {
                get: function() {
                    return i("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"), t.settings.SPRITE_BATCH_SIZE
                }
                , set: function(e) {
                    i("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"), t.settings.SPRITE_BATCH_SIZE = e
                }
            }
            , SPRITE_MAX_TEXTURES: {
                get: function() {
                    return i("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"), t.settings.SPRITE_MAX_TEXTURES
                }
                , set: function(e) {
                    i("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"), t.settings.SPRITE_MAX_TEXTURES = e
                }
            }
            , RETINA_PREFIX: {
                get: function() {
                    return i("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"), t.settings.RETINA_PREFIX
                }
                , set: function(e) {
                    i("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"), t.settings.RETINA_PREFIX = e
                }
            }
            , DEFAULT_RENDER_OPTIONS: {
                get: function() {
                    return i("PIXI.DEFAULT_RENDER_OPTIONS has been deprecated, please use PIXI.settings.DEFAULT_RENDER_OPTIONS"), t.settings.RENDER_OPTIONS
                }
            }
        });
        for (var l = [{
                parent: "TRANSFORM_MODE"
                , target: "TRANSFORM_MODE"
            }, {
                parent: "GC_MODES"
                , target: "GC_MODE"
            }, {
                parent: "WRAP_MODES"
                , target: "WRAP_MODE"
            }, {
                parent: "SCALE_MODES"
                , target: "SCALE_MODE"
            }, {
                parent: "PRECISION"
                , target: "PRECISION_FRAGMENT"
            }], h = function(e) {
                var r = l[e];
                Object.defineProperty(t[r.parent], "DEFAULT", {
                    get: function() {
                        return i("PIXI." + r.parent + ".DEFAULT has been deprecated, please use PIXI.settings." + r.target), t.settings[r.target]
                    }
                    , set: function(e) {
                        i("PIXI." + r.parent + ".DEFAULT has been deprecated, please use PIXI.settings." + r.target), t.settings[r.target] = e
                    }
                })
            }, c = 0; c < l.length; c++) h(c);
        Object.defineProperties(t.settings, {
            PRECISION: {
                get: function() {
                    return i("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"), t.settings.PRECISION_FRAGMENT
                }
                , set: function(e) {
                    i("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"), t.settings.PRECISION_FRAGMENT = e
                }
            }
        }), n.AnimatedSprite && Object.defineProperties(n, {
            MovieClip: {
                get: function() {
                    return i("The MovieClip class has been renamed to AnimatedSprite, please use AnimatedSprite from now on."), n.AnimatedSprite
                }
            }
        }), n && Object.defineProperties(n, {
            TextureTransform: {
                get: function() {
                    return i("The TextureTransform class has been renamed to TextureMatrix, please use PIXI.TextureMatrix from now on."), t.TextureMatrix
                }
            }
        }), t.DisplayObject.prototype.generateTexture = function(t, e, r) {
            return i("generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)"), t.generateTexture(this, e, r)
        }, t.Graphics.prototype.generateTexture = function(t, e) {
            return i("graphics generate texture has moved to the renderer. Or to render a graphics to a texture using canvas please use generateCanvasTexture"), this.generateCanvasTexture(t, e)
        }, t.GroupD8.isSwapWidthHeight = function(e) {
            return i("GroupD8.isSwapWidthHeight was renamed to GroupD8.isVertical"), t.GroupD8.isVertical(e)
        }, t.RenderTexture.prototype.render = function(t, e, r, n) {
            this.legacyRenderer.render(t, this, r, e, !n), i("RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)")
        }, t.RenderTexture.prototype.getImage = function(t) {
            return i("RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)"), this.legacyRenderer.extract.image(t)
        }, t.RenderTexture.prototype.getBase64 = function(t) {
            return i("RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)"), this.legacyRenderer.extract.base64(t)
        }, t.RenderTexture.prototype.getCanvas = function(t) {
            return i("RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)"), this.legacyRenderer.extract.canvas(t)
        }, t.RenderTexture.prototype.getPixels = function(t) {
            return i("RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)"), this.legacyRenderer.pixels(t)
        }, t.Sprite.prototype.setTexture = function(t) {
            this.texture = t, i("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")
        }, n.BitmapText && (n.BitmapText.prototype.setText = function(t) {
            this.text = t, i("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")
        }), t.Text.prototype.setText = function(t) {
            this.text = t, i("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")
        }, t.Text.calculateFontProperties = function(e) {
            return i("Text.calculateFontProperties is now deprecated, please use the TextMetrics.measureFont"), t.TextMetrics.measureFont(e)
        }, Object.defineProperties(t.Text, {
            fontPropertiesCache: {
                get: function() {
                    return i("Text.fontPropertiesCache is deprecated"), t.TextMetrics._fonts
                }
            }
            , fontPropertiesCanvas: {
                get: function() {
                    return i("Text.fontPropertiesCanvas is deprecated"), t.TextMetrics._canvas
                }
            }
            , fontPropertiesContext: {
                get: function() {
                    return i("Text.fontPropertiesContext is deprecated"), t.TextMetrics._context
                }
            }
        }), t.Text.prototype.setStyle = function(t) {
            this.style = t, i("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")
        }, t.Text.prototype.determineFontProperties = function(e) {
            return i("determineFontProperties is now deprecated, please use TextMetrics.measureFont method"), t.TextMetrics.measureFont(e)
        }, t.Text.getFontStyle = function(e) {
            return i("getFontStyle is now deprecated, please use TextStyle.toFontString() instead"), (e = e || {}) instanceof t.TextStyle || (e = new t.TextStyle(e)), e.toFontString()
        }, Object.defineProperties(t.TextStyle.prototype, {
            font: {
                get: function() {
                    return i("text style property 'font' is now deprecated, please use the 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant' and 'fontWeight' properties from now on"), this._fontStyle + " " + this._fontVariant + " " + this._fontWeight + " " + ("number" == typeof this._fontSize ? this._fontSize + "px" : this._fontSize) + " " + this._fontFamily
                }
                , set: function(t) {
                    i("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on"), this._fontStyle = t.indexOf("italic") > 1 ? "italic" : t.indexOf("oblique") > -1 ? "oblique" : "normal", this._fontVariant = t.indexOf("small-caps") > -1 ? "small-caps" : "normal";
                    var e = t.split(" ")
                        , r = -1;
                    this._fontSize = 26;
                    for (var n = 0; n < e.length; ++n)
                        if (e[n].match(/(px|pt|em|%)/)) {
                            r = n, this._fontSize = e[n];
                            break
                        } this._fontWeight = "normal";
                    for (var o = 0; o < r; ++o)
                        if (e[o].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)) {
                            this._fontWeight = e[o];
                            break
                        } if (r > -1 && r < e.length - 1) {
                        this._fontFamily = "";
                        for (var s = r + 1; s < e.length; ++s) this._fontFamily += e[s] + " ";
                        this._fontFamily = this._fontFamily.slice(0, -1)
                    } else this._fontFamily = "Arial";
                    this.styleID++
                }
            }
        }), t.Texture.prototype.setFrame = function(t) {
            this.frame = t, i("setFrame is now deprecated, please use the frame property, e.g: myTexture.frame = frame;")
        }, t.Texture.addTextureToCache = function(e, r) {
            t.Texture.addToCache(e, r), i("Texture.addTextureToCache is deprecated, please use Texture.addToCache from now on.")
        }, t.Texture.removeTextureFromCache = function(e) {
            return i("Texture.removeTextureFromCache is deprecated, please use Texture.removeFromCache from now on. Be aware that Texture.removeFromCache does not automatically its BaseTexture from the BaseTextureCache. For that, use BaseTexture.removeFromCache"), t.BaseTexture.removeFromCache(e), t.Texture.removeFromCache(e)
        }, Object.defineProperties(o, {
            AbstractFilter: {
                get: function() {
                    return i("AstractFilter has been renamed to Filter, please use PIXI.Filter"), t.AbstractFilter
                }
            }
            , SpriteMaskFilter: {
                get: function() {
                    return i("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."), t.SpriteMaskFilter
                }
            }
            , VoidFilter: {
                get: function() {
                    return i("VoidFilter has been renamed to AlphaFilter, please use PIXI.filters.AlphaFilter"), o.AlphaFilter
                }
            }
        }), t.utils.uuid = function() {
            return i("utils.uuid() is deprecated, please use utils.uid() from now on."), t.utils.uid()
        }, t.utils.canUseNewCanvasBlendModes = function() {
            return i("utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on"), t.CanvasTinter.canUseMultiply
        };
        var f = !0;
        if (Object.defineProperty(t.utils, "_saidHello", {
                set: function(t) {
                    t && (i("PIXI.utils._saidHello is deprecated, please use PIXI.utils.skipHello()"), this.skipHello()), f = t
                }
                , get: function() {
                    return f
                }
            }), s.BasePrepare && (s.BasePrepare.prototype.register = function(t, e) {
                return i("renderer.plugins.prepare.register is now deprecated, please use renderer.plugins.prepare.registerFindHook & renderer.plugins.prepare.registerUploadHook"), t && this.registerFindHook(t), e && this.registerUploadHook(e), this
            }), s.canvas && Object.defineProperty(s.canvas, "UPLOADS_PER_FRAME", {
                set: function() {
                    i("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer")
                }
                , get: function() {
                    return i("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"), NaN
                }
            }), s.webgl && Object.defineProperty(s.webgl, "UPLOADS_PER_FRAME", {
                set: function() {
                    i("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer")
                }
                , get: function() {
                    return i("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"), NaN
                }
            }), a.Loader) {
            var d = a.Resource
                , p = a.Loader;
            Object.defineProperties(d.prototype, {
                isJson: {
                    get: function() {
                        return i("The isJson property is deprecated, please use `resource.type === Resource.TYPE.JSON`."), this.type === d.TYPE.JSON
                    }
                }
                , isXml: {
                    get: function() {
                        return i("The isXml property is deprecated, please use `resource.type === Resource.TYPE.XML`."), this.type === d.TYPE.XML
                    }
                }
                , isImage: {
                    get: function() {
                        return i("The isImage property is deprecated, please use `resource.type === Resource.TYPE.IMAGE`."), this.type === d.TYPE.IMAGE
                    }
                }
                , isAudio: {
                    get: function() {
                        return i("The isAudio property is deprecated, please use `resource.type === Resource.TYPE.AUDIO`."), this.type === d.TYPE.AUDIO
                    }
                }
                , isVideo: {
                    get: function() {
                        return i("The isVideo property is deprecated, please use `resource.type === Resource.TYPE.VIDEO`."), this.type === d.TYPE.VIDEO
                    }
                }
            }), Object.defineProperties(p.prototype, {
                before: {
                    get: function() {
                        return i("The before() method is deprecated, please use pre()."), this.pre
                    }
                }
                , after: {
                    get: function() {
                        return i("The after() method is deprecated, please use use()."), this.use
                    }
                }
            })
        }
        u.interactiveTarget && Object.defineProperty(u.interactiveTarget, "defaultCursor", {
            set: function(t) {
                i("Property defaultCursor has been replaced with 'cursor'. "), this.cursor = t
            }
            , get: function() {
                return i("Property defaultCursor has been replaced with 'cursor'. "), this.cursor
            }
        }), u.InteractionManager && (Object.defineProperty(u.InteractionManager, "defaultCursorStyle", {
            set: function(t) {
                i("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "), this.cursorStyles.default = t
            }
            , get: function() {
                return i("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "), this.cursorStyles.default
            }
        }), Object.defineProperty(u.InteractionManager, "currentCursorStyle", {
            set: function(t) {
                i("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."), this.currentCursorMode = t
            }
            , get: function() {
                return i("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."), this.currentCursorMode
            }
        }))
    };
    var n = {};

    function i(t) {
        if (!n[t]) {
            var e = (new Error).stack;
            void 0 === e ? console.warn("Deprecation Warning: ", t) : (e = e.split("\n").splice(3).join("\n"), console.groupCollapsed ? (console.groupCollapsed("%cDeprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", t), console.warn(e), console.groupEnd()) : (console.warn("Deprecation Warning: ", t), console.warn(e))), n[t] = !0
        }
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(70);
    Object.defineProperty(e, "accessibleTarget", {
        enumerable: !0
        , get: function() {
            return o(n).default
        }
    });
    var i = r(156);

    function o(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "AccessibilityManager", {
        enumerable: !0
        , get: function() {
            return o(i).default
        }
    })
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , i = s(r(27))
        , o = s(r(70));

    function s(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    n.utils.mixins.delayMixin(n.DisplayObject.prototype, o.default);
    var a = 100
        , u = 0
        , l = 0
        , h = 2
        , c = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), !i.default.tablet && !i.default.phone || navigator.isCocoonJS || this.createTouchHook();
                var r = document.createElement("div");
                r.style.width = a + "px", r.style.height = a + "px", r.style.position = "absolute", r.style.top = u + "px", r.style.left = l + "px", r.style.zIndex = h, this.div = r, this.pool = [], this.renderId = 0, this.debug = !1, this.renderer = e, this.children = [], this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this.isActive = !1, this.isMobileAccessabillity = !1, window.addEventListener("keydown", this._onKeyDown, !1)
            }
            return t.prototype.createTouchHook = function() {
                var t = this
                    , e = document.createElement("button");
                e.style.width = "1px", e.style.height = "1px", e.style.position = "absolute", e.style.top = "-1000px", e.style.left = "-1000px", e.style.zIndex = 2, e.style.backgroundColor = "#FF0000", e.title = "HOOK DIV", e.addEventListener("focus", function() {
                    t.isMobileAccessabillity = !0, t.activate(), document.body.removeChild(e)
                }), document.body.appendChild(e)
            }, t.prototype.activate = function() {
                this.isActive || (this.isActive = !0, window.document.addEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), this.renderer.view.parentNode && this.renderer.view.parentNode.appendChild(this.div))
            }, t.prototype.deactivate = function() {
                this.isActive && !this.isMobileAccessabillity && (this.isActive = !1, window.document.removeEventListener("mousemove", this._onMouseMove, !0), window.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), this.div.parentNode && this.div.parentNode.removeChild(this.div))
            }, t.prototype.updateAccessibleObjects = function(t) {
                if (t.visible) {
                    t.accessible && t.interactive && (t._accessibleActive || this.addChild(t), t.renderId = this.renderId);
                    for (var e = t.children, r = 0; r < e.length; r++) this.updateAccessibleObjects(e[r])
                }
            }, t.prototype.update = function() {
                if (this.renderer.renderingToScreen) {
                    this.updateAccessibleObjects(this.renderer._lastObjectRendered);
                    var t = this.renderer.view.getBoundingClientRect()
                        , e = t.width / this.renderer.width
                        , r = t.height / this.renderer.height
                        , i = this.div;
                    i.style.left = t.left + "px", i.style.top = t.top + "px", i.style.width = this.renderer.width + "px", i.style.height = this.renderer.height + "px";
                    for (var o = 0; o < this.children.length; o++) {
                        var s = this.children[o];
                        if (s.renderId !== this.renderId) s._accessibleActive = !1, n.utils.removeItems(this.children, o, 1), this.div.removeChild(s._accessibleDiv), this.pool.push(s._accessibleDiv), s._accessibleDiv = null, o--, 0 === this.children.length && this.deactivate();
                        else {
                            i = s._accessibleDiv;
                            var a = s.hitArea
                                , u = s.worldTransform;
                            s.hitArea ? (i.style.left = (u.tx + a.x * u.a) * e + "px", i.style.top = (u.ty + a.y * u.d) * r + "px", i.style.width = a.width * u.a * e + "px", i.style.height = a.height * u.d * r + "px") : (a = s.getBounds(), this.capHitArea(a), i.style.left = a.x * e + "px", i.style.top = a.y * r + "px", i.style.width = a.width * e + "px", i.style.height = a.height * r + "px", i.title !== s.accessibleTitle && null !== s.accessibleTitle && (i.title = s.accessibleTitle), i.getAttribute("aria-label") !== s.accessibleHint && null !== s.accessibleHint && i.setAttribute("aria-label", s.accessibleHint))
                        }
                    }
                    this.renderId++
                }
            }, t.prototype.capHitArea = function(t) {
                t.x < 0 && (t.width += t.x, t.x = 0), t.y < 0 && (t.height += t.y, t.y = 0), t.x + t.width > this.renderer.width && (t.width = this.renderer.width - t.x), t.y + t.height > this.renderer.height && (t.height = this.renderer.height - t.y)
            }, t.prototype.addChild = function(t) {
                var e = this.pool.pop();
                e || ((e = document.createElement("button")).style.width = a + "px", e.style.height = a + "px", e.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = h, e.style.borderStyle = "none", navigator.userAgent.toLowerCase().indexOf("chrome") > -1 ? e.setAttribute("aria-live", "off") : e.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? e.setAttribute("aria-relevant", "additions") : e.setAttribute("aria-relevant", "text"), e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))), t.accessibleTitle && null !== t.accessibleTitle ? e.title = t.accessibleTitle : t.accessibleHint && null !== t.accessibleHint || (e.title = "displayObject " + t.tabIndex), t.accessibleHint && null !== t.accessibleHint && e.setAttribute("aria-label", t.accessibleHint), t._accessibleActive = !0, t._accessibleDiv = e, e.displayObject = t, this.children.push(t), this.div.appendChild(t._accessibleDiv), t._accessibleDiv.tabIndex = t.tabIndex
            }, t.prototype._onClick = function(t) {
                var e = this.renderer.plugins.interaction;
                e.dispatchEvent(t.target.displayObject, "click", e.eventData)
            }, t.prototype._onFocus = function(t) {
                t.target.getAttribute("aria-live", "off") || t.target.setAttribute("aria-live", "assertive");
                var e = this.renderer.plugins.interaction;
                e.dispatchEvent(t.target.displayObject, "mouseover", e.eventData)
            }, t.prototype._onFocusOut = function(t) {
                t.target.getAttribute("aria-live", "off") || t.target.setAttribute("aria-live", "polite");
                var e = this.renderer.plugins.interaction;
                e.dispatchEvent(t.target.displayObject, "mouseout", e.eventData)
            }, t.prototype._onKeyDown = function(t) {
                9 === t.keyCode && this.activate()
            }, t.prototype._onMouseMove = function(t) {
                0 === t.movementX && 0 === t.movementY || this.deactivate()
            }, t.prototype.destroy = function() {
                this.div = null;
                for (var t = 0; t < this.children.length; t++) this.children[t].div = null;
                window.document.removeEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null
            }, t
        }();
    e.default = c, n.WebGLRenderer.registerPlugin("accessibility", c), n.CanvasRenderer.registerPlugin("accessibility", c)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(158);
    Object.defineProperty(e, "webgl", {
        enumerable: !0
        , get: function() {
            return o(n).default
        }
    });
    var i = r(159);

    function o(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "canvas", {
        enumerable: !0
        , get: function() {
            return o(i).default
        }
    })
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , i = new n.Rectangle
        , o = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.renderer = e, e.extract = this
            }
            return t.prototype.image = function(t) {
                var e = new Image;
                return e.src = this.base64(t), e
            }, t.prototype.base64 = function(t) {
                return this.canvas(t).toDataURL()
            }, t.prototype.canvas = function(t) {
                var e = this.renderer
                    , r = void 0
                    , o = void 0
                    , s = void 0
                    , a = !1
                    , u = void 0
                    , l = !1;
                t && (t instanceof n.RenderTexture ? u = t : (u = this.renderer.generateTexture(t), l = !0)), u ? (o = (r = u.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]).resolution, s = u.frame, a = !1) : (o = (r = this.renderer.rootRenderTarget).resolution, a = !0, (s = i).width = r.size.width, s.height = r.size.height);
                var h = s.width * o
                    , c = s.height * o
                    , f = new n.CanvasRenderTarget(h, c, 1);
                if (r) {
                    e.bindRenderTarget(r);
                    var d = new Uint8Array(4 * h * c)
                        , p = e.gl;
                    p.readPixels(s.x * o, s.y * o, h, c, p.RGBA, p.UNSIGNED_BYTE, d);
                    var _ = f.context.getImageData(0, 0, h, c);
                    _.data.set(d), f.context.putImageData(_, 0, 0), a && (f.context.scale(1, -1), f.context.drawImage(f.canvas, 0, -c))
                }
                return l && u.destroy(!0), f.canvas
            }, t.prototype.pixels = function(t) {
                var e = this.renderer
                    , r = void 0
                    , o = void 0
                    , s = void 0
                    , a = void 0
                    , u = !1;
                t && (t instanceof n.RenderTexture ? a = t : (a = this.renderer.generateTexture(t), u = !0)), a ? (o = (r = a.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID]).resolution, s = a.frame) : (o = (r = this.renderer.rootRenderTarget).resolution, (s = i).width = r.size.width, s.height = r.size.height);
                var l = s.width * o
                    , h = s.height * o
                    , c = new Uint8Array(4 * l * h);
                if (r) {
                    e.bindRenderTarget(r);
                    var f = e.gl;
                    f.readPixels(s.x * o, s.y * o, l, h, f.RGBA, f.UNSIGNED_BYTE, c)
                }
                return u && a.destroy(!0), c
            }, t.prototype.destroy = function() {
                this.renderer.extract = null, this.renderer = null
            }, t
        }();
    e.default = o, n.WebGLRenderer.registerPlugin("extract", o)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , i = new n.Rectangle
        , o = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.renderer = e, e.extract = this
            }
            return t.prototype.image = function(t) {
                var e = new Image;
                return e.src = this.base64(t), e
            }, t.prototype.base64 = function(t) {
                return this.canvas(t).toDataURL()
            }, t.prototype.canvas = function(t) {
                var e = this.renderer
                    , r = void 0
                    , o = void 0
                    , s = void 0
                    , a = void 0;
                t && (a = t instanceof n.RenderTexture ? t : e.generateTexture(t)), a ? (r = a.baseTexture._canvasRenderTarget.context, o = a.baseTexture._canvasRenderTarget.resolution, s = a.frame) : (r = e.rootContext, (s = i).width = this.renderer.width, s.height = this.renderer.height);
                var u = s.width * o
                    , l = s.height * o
                    , h = new n.CanvasRenderTarget(u, l, 1)
                    , c = r.getImageData(s.x * o, s.y * o, u, l);
                return h.context.putImageData(c, 0, 0), h.canvas
            }, t.prototype.pixels = function(t) {
                var e = this.renderer
                    , r = void 0
                    , o = void 0
                    , s = void 0
                    , a = void 0;
                return t && (a = t instanceof n.RenderTexture ? t : e.generateTexture(t)), a ? (r = a.baseTexture._canvasRenderTarget.context, o = a.baseTexture._canvasRenderTarget.resolution, s = a.frame) : (r = e.rootContext, (s = i).width = e.width, s.height = e.height), r.getImageData(0, 0, s.width * o, s.height * o).data
            }, t.prototype.destroy = function() {
                this.renderer.extract = null, this.renderer = null
            }, t
        }();
    e.default = o, n.CanvasRenderer.registerPlugin("extract", o)
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , s = function(t) {
            function e(r, i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var s = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r[0] instanceof o.Texture ? r[0] : r[0].texture));
                return s._textures = null, s._durations = null, s.textures = r, s._autoUpdate = !1 !== i, s.animationSpeed = 1, s.loop = !0, s.onComplete = null, s.onFrameChange = null, s.onLoop = null, s._currentTime = 0, s.playing = !1, s
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.stop = function() {
                this.playing && (this.playing = !1, this._autoUpdate && o.ticker.shared.remove(this.update, this))
            }, e.prototype.play = function() {
                this.playing || (this.playing = !0, this._autoUpdate && o.ticker.shared.add(this.update, this, o.UPDATE_PRIORITY.HIGH))
            }, e.prototype.gotoAndStop = function(t) {
                this.stop();
                var e = this.currentFrame;
                this._currentTime = t, e !== this.currentFrame && this.updateTexture()
            }, e.prototype.gotoAndPlay = function(t) {
                var e = this.currentFrame;
                this._currentTime = t, e !== this.currentFrame && this.updateTexture(), this.play()
            }, e.prototype.update = function(t) {
                var e = this.animationSpeed * t
                    , r = this.currentFrame;
                if (null !== this._durations) {
                    var n = this._currentTime % 1 * this._durations[this.currentFrame];
                    for (n += e / 60 * 1e3; n < 0;) this._currentTime--, n += this._durations[this.currentFrame];
                    var i = Math.sign(this.animationSpeed * t);
                    for (this._currentTime = Math.floor(this._currentTime); n >= this._durations[this.currentFrame];) n -= this._durations[this.currentFrame] * i, this._currentTime += i;
                    this._currentTime += n / this._durations[this.currentFrame]
                } else this._currentTime += e;
                this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : r !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < r ? this.onLoop() : this.animationSpeed < 0 && this.currentFrame > r && this.onLoop()), this.updateTexture())
            }, e.prototype.updateTexture = function() {
                this._texture = this._textures[this.currentFrame], this._textureID = -1, this.cachedTint = 16777215, this.onFrameChange && this.onFrameChange(this.currentFrame)
            }, e.prototype.destroy = function(e) {
                this.stop(), t.prototype.destroy.call(this, e)
            }, e.fromFrames = function(t) {
                for (var r = [], n = 0; n < t.length; ++n) r.push(o.Texture.fromFrame(t[n]));
                return new e(r)
            }, e.fromImages = function(t) {
                for (var r = [], n = 0; n < t.length; ++n) r.push(o.Texture.fromImage(t[n]));
                return new e(r)
            }, i(e, [{
                key: "totalFrames"
                , get: function() {
                    return this._textures.length
                }
            }, {
                key: "textures"
                , get: function() {
                    return this._textures
                }
                , set: function(t) {
                    if (t[0] instanceof o.Texture) this._textures = t, this._durations = null;
                    else {
                        this._textures = [], this._durations = [];
                        for (var e = 0; e < t.length; e++) this._textures.push(t[e].texture), this._durations.push(t[e].time)
                    }
                    this.gotoAndStop(0), this.updateTexture()
                }
            }, {
                key: "currentFrame"
                , get: function() {
                    var t = Math.floor(this._currentTime) % this._textures.length;
                    return t < 0 && (t += this._textures.length), t
                }
            }]), e
        }(o.Sprite);
    e.default = s
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , s = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(34))
        , a = new o.Point
        , u = function(t) {
            function e(r) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100
                    , s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var a = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r));
                return a.tileTransform = new o.TransformStatic, a._width = i, a._height = s, a._canvasPattern = null, a.uvTransform = r.transform || new o.TextureMatrix(r), a.pluginName = "tilingSprite", a.uvRespectAnchor = !1, a
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype._onTextureUpdate = function() {
                this.uvTransform && (this.uvTransform.texture = this._texture), this.cachedTint = 16777215
            }, e.prototype._renderWebGL = function(t) {
                var e = this._texture;
                e && e.valid && (this.tileTransform.updateLocalTransform(), this.uvTransform.update(), t.setObjectRenderer(t.plugins[this.pluginName]), t.plugins[this.pluginName].render(this))
            }, e.prototype._renderCanvas = function(t) {
                var e = this._texture;
                if (e.baseTexture.hasLoaded) {
                    var r = t.context
                        , n = this.worldTransform
                        , i = t.resolution
                        , a = e.baseTexture
                        , u = a.resolution
                        , l = this.tilePosition.x / this.tileScale.x % e._frame.width * u
                        , h = this.tilePosition.y / this.tileScale.y % e._frame.height * u;
                    if (this._textureID !== this._texture._updateID || this.cachedTint !== this.tint) {
                        this._textureID = this._texture._updateID;
                        var c = new o.CanvasRenderTarget(e._frame.width, e._frame.height, u);
                        16777215 !== this.tint ? (this.tintedTexture = s.default.getTintedTexture(this, this.tint), c.context.drawImage(this.tintedTexture, 0, 0)) : c.context.drawImage(a.source, -e._frame.x * u, -e._frame.y * u), this.cachedTint = this.tint, this._canvasPattern = c.context.createPattern(c.canvas, "repeat")
                    }
                    r.globalAlpha = this.worldAlpha, r.setTransform(n.a * i, n.b * i, n.c * i, n.d * i, n.tx * i, n.ty * i), t.setBlendMode(this.blendMode), r.fillStyle = this._canvasPattern, r.scale(this.tileScale.x / u, this.tileScale.y / u);
                    var f = this.anchor.x * -this._width
                        , d = this.anchor.y * -this._height;
                    this.uvRespectAnchor ? (r.translate(l, h), r.fillRect(-l + f, -h + d, this._width / this.tileScale.x * u, this._height / this.tileScale.y * u)) : (r.translate(l + f, h + d), r.fillRect(-l, -h, this._width / this.tileScale.x * u, this._height / this.tileScale.y * u))
                }
            }, e.prototype._calculateBounds = function() {
                this._bounds.addFrame(this.transform, this._width * -this._anchor._x, this._height * -this._anchor._y, this._width * (1 - this._anchor._x), this._height * (1 - this._anchor._y))
            }, e.prototype.getLocalBounds = function(e) {
                return 0 === this.children.length ? (this._bounds.minX = this._width * -this._anchor._x, this._bounds.minY = this._height * -this._anchor._y, this._bounds.maxX = this._width * (1 - this._anchor._x), this._bounds.maxY = this._height * (1 - this._anchor._y), e || (this._localBoundsRect || (this._localBoundsRect = new o.Rectangle), e = this._localBoundsRect), this._bounds.getRectangle(e)) : t.prototype.getLocalBounds.call(this, e)
            }, e.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, a);
                var e = this._width
                    , r = this._height
                    , n = -e * this.anchor._x;
                if (a.x >= n && a.x < n + e) {
                    var i = -r * this.anchor._y;
                    if (a.y >= i && a.y < i + r) return !0
                }
                return !1
            }, e.prototype.destroy = function(e) {
                t.prototype.destroy.call(this, e), this.tileTransform = null, this.uvTransform = null
            }, e.from = function(t, r, n) {
                return new e(o.Texture.from(t), r, n)
            }, e.fromFrame = function(t, r, n) {
                var i = o.utils.TextureCache[t];
                if (!i) throw new Error('The frameId "' + t + '" does not exist in the texture cache ' + this);
                return new e(i, r, n)
            }, e.fromImage = function(t, r, n, i, s) {
                return new e(o.Texture.fromImage(t, i, s), r, n)
            }, i(e, [{
                key: "clampMargin"
                , get: function() {
                    return this.uvTransform.clampMargin
                }
                , set: function(t) {
                    this.uvTransform.clampMargin = t, this.uvTransform.update(!0)
                }
            }, {
                key: "tileScale"
                , get: function() {
                    return this.tileTransform.scale
                }
                , set: function(t) {
                    this.tileTransform.scale.copy(t)
                }
            }, {
                key: "tilePosition"
                , get: function() {
                    return this.tileTransform.position
                }
                , set: function(t) {
                    this.tileTransform.position.copy(t)
                }
            }, {
                key: "width"
                , get: function() {
                    return this._width
                }
                , set: function(t) {
                    this._width = t
                }
            }, {
                key: "height"
                , get: function() {
                    return this._height
                }
                , set: function(t) {
                    this._height = t
                }
            }]), e
        }(o.Sprite);
    e.default = u
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , o = r(1);
    r(7);
    var s = new i.Matrix
        , a = function(t) {
            function e(r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r));
                return i.shader = null, i.simpleShader = null, i.quad = null, i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.onContextChange = function() {
                var t = this.renderer.gl;
                this.shader = new i.Shader(t, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 sample = texture2D(uSampler, coord);\n    gl_FragColor = sample * uColor;\n}\n"), this.simpleShader = new i.Shader(t, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = sample * uColor;\n}\n"), this.renderer.bindVao(null), this.quad = new i.Quad(t, this.renderer.state.attribState), this.quad.initVao(this.shader)
            }, e.prototype.render = function(t) {
                var e = this.renderer
                    , r = this.quad;
                e.bindVao(r.vao);
                var n = r.vertices;
                n[0] = n[6] = t._width * -t.anchor.x, n[1] = n[3] = t._height * -t.anchor.y, n[2] = n[4] = t._width * (1 - t.anchor.x), n[5] = n[7] = t._height * (1 - t.anchor.y), t.uvRespectAnchor && ((n = r.uvs)[0] = n[6] = -t.anchor.x, n[1] = n[3] = -t.anchor.y, n[2] = n[4] = 1 - t.anchor.x, n[5] = n[7] = 1 - t.anchor.y), r.upload();
                var a = t._texture
                    , u = a.baseTexture
                    , l = t.tileTransform.localTransform
                    , h = t.uvTransform
                    , c = u.isPowerOfTwo && a.frame.width === u.width && a.frame.height === u.height;
                c && (u._glTextures[e.CONTEXT_UID] ? c = u.wrapMode !== o.WRAP_MODES.CLAMP : u.wrapMode === o.WRAP_MODES.CLAMP && (u.wrapMode = o.WRAP_MODES.REPEAT));
                var f = c ? this.simpleShader : this.shader;
                e.bindShader(f);
                var d = a.width
                    , p = a.height
                    , _ = t._width
                    , y = t._height;
                s.set(l.a * d / _, l.b * d / y, l.c * p / _, l.d * p / y, l.tx / _, l.ty / y), s.invert(), c ? s.prepend(h.mapCoord) : (f.uniforms.uMapCoord = h.mapCoord.toArray(!0), f.uniforms.uClampFrame = h.uClampFrame, f.uniforms.uClampOffset = h.uClampOffset), f.uniforms.uTransform = s.toArray(!0), f.uniforms.uColor = i.utils.premultiplyTintToRgba(t.tint, t.worldAlpha, f.uniforms.uColor, u.premultipliedAlpha), f.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0), f.uniforms.uSampler = e.bindTexture(a), e.setBlendMode(i.utils.correctBlendMode(t.blendMode, u.premultipliedAlpha)), r.vao.draw(this.renderer.gl.TRIANGLES, 6, 0)
            }, e
        }(i.ObjectRenderer);
    e.default = a, i.WebGLRenderer.registerPlugin("tilingSprite", a)
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , s = l(r(38))
        , a = r(3)
        , u = l(r(4));

    function l(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var h = function(t) {
        function e(r) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var o = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this));
            return o._textWidth = 0, o._textHeight = 0, o._glyphs = [], o._font = {
                tint: void 0 !== i.tint ? i.tint : 16777215
                , align: i.align || "left"
                , name: null
                , size: 0
            }, o.font = i.font, o._text = r, o._maxWidth = 0, o._maxLineHeight = 0, o._letterSpacing = 0, o._anchor = new s.default(function() {
                o.dirty = !0
            }, o, 0, 0), o.dirty = !1, o.updateText(), o
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.updateText = function() {
            for (var t = e.fonts[this._font.name], r = this._font.size / t.size, n = new o.Point, i = [], s = [], a = this.text.replace(/(?:\r\n|\r)/g, "\n"), u = a.length, l = this._maxWidth * t.size / this._font.size, h = null, c = 0, f = 0, d = 0, p = -1, _ = 0, y = 0, m = 0, v = 0; v < u; v++) {
                var g = a.charCodeAt(v)
                    , b = a.charAt(v);
                if (/(?:\s)/.test(b) && (p = v, _ = c), "\r" !== b && "\n" !== b) {
                    var T = t.chars[g];
                    T && (h && T.kerning[h] && (n.x += T.kerning[h]), i.push({
                        texture: T.texture
                        , line: d
                        , charCode: g
                        , position: new o.Point(n.x + T.xOffset + this._letterSpacing / 2, n.y + T.yOffset)
                    }), n.x += T.xAdvance + this._letterSpacing, c = n.x, m = Math.max(m, T.yOffset + T.texture.height), h = g, -1 !== p && l > 0 && n.x > l && (o.utils.removeItems(i, 1 + p - ++y, 1 + v - p), v = p, p = -1, s.push(_), f = Math.max(f, _), d++, n.x = 0, n.y += t.lineHeight, h = null))
                } else s.push(c), f = Math.max(f, c), ++d, ++y, n.x = 0, n.y += t.lineHeight, h = null
            }
            var x = a.charAt(a.length - 1);
            "\r" !== x && "\n" !== x && (/(?:\s)/.test(x) && (c = _), s.push(c), f = Math.max(f, c));
            for (var w = [], E = 0; E <= d; E++) {
                var S = 0;
                "right" === this._font.align ? S = f - s[E] : "center" === this._font.align && (S = (f - s[E]) / 2), w.push(S)
            }
            for (var O = i.length, P = this.tint, C = 0; C < O; C++) {
                var M = this._glyphs[C];
                M ? M.texture = i[C].texture : (M = new o.Sprite(i[C].texture), this._glyphs.push(M)), M.position.x = (i[C].position.x + w[i[C].line]) * r, M.position.y = i[C].position.y * r, M.scale.x = M.scale.y = r, M.tint = P, M.parent || this.addChild(M)
            }
            for (var A = O; A < this._glyphs.length; ++A) this.removeChild(this._glyphs[A]);
            if (this._textWidth = f * r, this._textHeight = (n.y + t.lineHeight) * r, 0 !== this.anchor.x || 0 !== this.anchor.y)
                for (var I = 0; I < O; I++) this._glyphs[I].x -= this._textWidth * this.anchor.x, this._glyphs[I].y -= this._textHeight * this.anchor.y;
            this._maxLineHeight = m * r
        }, e.prototype.updateTransform = function() {
            this.validate(), this.containerUpdateTransform()
        }, e.prototype.getLocalBounds = function() {
            return this.validate(), t.prototype.getLocalBounds.call(this)
        }, e.prototype.validate = function() {
            this.dirty && (this.updateText(), this.dirty = !1)
        }, e.registerFont = function(t, r) {
            var n = {}
                , i = t.getElementsByTagName("info")[0]
                , s = t.getElementsByTagName("common")[0]
                , l = t.getElementsByTagName("page")
                , h = (0, a.getResolutionOfUrl)(l[0].getAttribute("file"), u.default.RESOLUTION)
                , c = {};
            n.font = i.getAttribute("face"), n.size = parseInt(i.getAttribute("size"), 10), n.lineHeight = parseInt(s.getAttribute("lineHeight"), 10) / h, n.chars = {}, r instanceof o.Texture && (r = [r]);
            for (var f = 0; f < l.length; f++) {
                var d = l[f].getAttribute("id")
                    , p = l[f].getAttribute("file");
                c[d] = r instanceof Array ? r[f] : r[p]
            }
            for (var _ = t.getElementsByTagName("char"), y = 0; y < _.length; y++) {
                var m = _[y]
                    , v = parseInt(m.getAttribute("id"), 10)
                    , g = m.getAttribute("page") || 0
                    , b = new o.Rectangle(parseInt(m.getAttribute("x"), 10) / h + c[g].frame.x / h, parseInt(m.getAttribute("y"), 10) / h + c[g].frame.y / h, parseInt(m.getAttribute("width"), 10) / h, parseInt(m.getAttribute("height"), 10) / h);
                n.chars[v] = {
                    xOffset: parseInt(m.getAttribute("xoffset"), 10) / h
                    , yOffset: parseInt(m.getAttribute("yoffset"), 10) / h
                    , xAdvance: parseInt(m.getAttribute("xadvance"), 10) / h
                    , kerning: {}
                    , texture: new o.Texture(c[g].baseTexture, b)
                    , page: g
                }
            }
            for (var T = t.getElementsByTagName("kerning"), x = 0; x < T.length; x++) {
                var w = T[x]
                    , E = parseInt(w.getAttribute("first"), 10) / h
                    , S = parseInt(w.getAttribute("second"), 10) / h
                    , O = parseInt(w.getAttribute("amount"), 10) / h;
                n.chars[S] && (n.chars[S].kerning[E] = O)
            }
            return e.fonts[n.font] = n, n
        }, i(e, [{
            key: "tint"
            , get: function() {
                return this._font.tint
            }
            , set: function(t) {
                this._font.tint = "number" == typeof t && t >= 0 ? t : 16777215, this.dirty = !0
            }
        }, {
            key: "align"
            , get: function() {
                return this._font.align
            }
            , set: function(t) {
                this._font.align = t || "left", this.dirty = !0
            }
        }, {
            key: "anchor"
            , get: function() {
                return this._anchor
            }
            , set: function(t) {
                "number" == typeof t ? this._anchor.set(t) : this._anchor.copy(t)
            }
        }, {
            key: "font"
            , get: function() {
                return this._font
            }
            , set: function(t) {
                t && ("string" == typeof t ? (t = t.split(" "), this._font.name = 1 === t.length ? t[0] : t.slice(1).join(" "), this._font.size = t.length >= 2 ? parseInt(t[0], 10) : e.fonts[this._font.name].size) : (this._font.name = t.name, this._font.size = "number" == typeof t.size ? t.size : parseInt(t.size, 10)), this.dirty = !0)
            }
        }, {
            key: "text"
            , get: function() {
                return this._text
            }
            , set: function(t) {
                t = t.toString() || " ", this._text !== t && (this._text = t, this.dirty = !0)
            }
        }, {
            key: "maxWidth"
            , get: function() {
                return this._maxWidth
            }
            , set: function(t) {
                this._maxWidth !== t && (this._maxWidth = t, this.dirty = !0)
            }
        }, {
            key: "maxLineHeight"
            , get: function() {
                return this.validate(), this._maxLineHeight
            }
        }, {
            key: "textWidth"
            , get: function() {
                return this.validate(), this._textWidth
            }
        }, {
            key: "letterSpacing"
            , get: function() {
                return this._letterSpacing
            }
            , set: function(t) {
                this._letterSpacing !== t && (this._letterSpacing = t, this.dirty = !0)
            }
        }, {
            key: "textHeight"
            , get: function() {
                return this.validate(), this._textHeight
            }
        }]), e
    }(o.Container);
    e.default = h, h.fonts = {}
}, function(t, e, r) {
    "use strict";
    var n = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , i = a(r(8))
        , o = a(r(10))
        , s = r(3);

    function a(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var u = n.DisplayObject
        , l = new n.Matrix;
    u.prototype._cacheAsBitmap = !1, u.prototype._cacheData = !1, Object.defineProperties(u.prototype, {
        cacheAsBitmap: {
            get: function() {
                return this._cacheAsBitmap
            }
            , set: function(t) {
                if (this._cacheAsBitmap !== t) {
                    this._cacheAsBitmap = t;
                    var e = void 0;
                    t ? (this._cacheData || (this._cacheData = new function t() {
                        ! function(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), this.textureCacheId = null, this.originalRenderWebGL = null, this.originalRenderCanvas = null, this.originalCalculateBounds = null, this.originalGetLocalBounds = null, this.originalUpdateTransform = null, this.originalHitTest = null, this.originalDestroy = null, this.originalMask = null, this.originalFilterArea = null, this.sprite = null
                    }), (e = this._cacheData).originalRenderWebGL = this.renderWebGL, e.originalRenderCanvas = this.renderCanvas, e.originalUpdateTransform = this.updateTransform, e.originalCalculateBounds = this._calculateBounds, e.originalGetLocalBounds = this.getLocalBounds, e.originalDestroy = this.destroy, e.originalContainsPoint = this.containsPoint, e.originalMask = this._mask, e.originalFilterArea = this.filterArea, this.renderWebGL = this._renderCachedWebGL, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : ((e = this._cacheData).sprite && this._destroyCachedDisplayObject(), this.renderWebGL = e.originalRenderWebGL, this.renderCanvas = e.originalRenderCanvas, this._calculateBounds = e.originalCalculateBounds, this.getLocalBounds = e.originalGetLocalBounds, this.destroy = e.originalDestroy, this.updateTransform = e.originalUpdateTransform, this.containsPoint = e.originalContainsPoint, this._mask = e.originalMask, this.filterArea = e.originalFilterArea)
                }
            }
        }
    }), u.prototype._renderCachedWebGL = function(t) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cacheData.sprite._transformID = -1, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderWebGL(t))
    }, u.prototype._initCachedDisplayObject = function(t) {
        if (!this._cacheData || !this._cacheData.sprite) {
            var e = this.alpha;
            this.alpha = 1, t.currentRenderer.flush();
            var r = this.getLocalBounds().clone();
            this._filters && r.pad(this._filters[0].padding);
            var a = t._activeRenderTarget
                , u = t.filterManager.filterStack
                , h = n.RenderTexture.create(0 | r.width, 0 | r.height)
                , c = "cacheAsBitmap_" + (0, s.uid)();
            this._cacheData.textureCacheId = c, o.default.addToCache(h.baseTexture, c), i.default.addToCache(h, c);
            var f = l;
            f.tx = -r.x, f.ty = -r.y, this.transform.worldTransform.identity(), this.renderWebGL = this._cacheData.originalRenderWebGL, t.render(this, h, !0, f, !0), t.bindRenderTarget(a), t.filterManager.filterStack = u, this.renderWebGL = this._renderCachedWebGL, this.updateTransform = this.displayObjectUpdateTransform, this._mask = null, this.filterArea = null;
            var d = new n.Sprite(h);
            d.transform.worldTransform = this.transform.worldTransform, d.anchor.x = -r.x / r.width, d.anchor.y = -r.y / r.height, d.alpha = e, d._bounds = this._bounds, this._calculateBounds = this._calculateCachedBounds, this.getLocalBounds = this._getCachedLocalBounds, this._cacheData.sprite = d, this.transform._parentID = -1, this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.containsPoint = d.containsPoint.bind(d)
        }
    }, u.prototype._renderCachedCanvas = function(t) {
        !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite.renderCanvas(t))
    }, u.prototype._initCachedDisplayObjectCanvas = function(t) {
        if (!this._cacheData || !this._cacheData.sprite) {
            var e = this.getLocalBounds()
                , r = this.alpha;
            this.alpha = 1;
            var a = t.context
                , u = n.RenderTexture.create(0 | e.width, 0 | e.height)
                , h = "cacheAsBitmap_" + (0, s.uid)();
            this._cacheData.textureCacheId = h, o.default.addToCache(u.baseTexture, h), i.default.addToCache(u, h);
            var c = l;
            this.transform.localTransform.copy(c), c.invert(), c.tx -= e.x, c.ty -= e.y, this.renderCanvas = this._cacheData.originalRenderCanvas, t.render(this, u, !0, c, !1), t.context = a, this.renderCanvas = this._renderCachedCanvas, this._calculateBounds = this._calculateCachedBounds, this._mask = null, this.filterArea = null;
            var f = new n.Sprite(u);
            f.transform.worldTransform = this.transform.worldTransform, f.anchor.x = -e.x / e.width, f.anchor.y = -e.y / e.height, f._bounds = this._bounds, f.alpha = r, this.parent ? this.updateTransform() : (this.parent = t._tempDisplayObjectParent, this.updateTransform(), this.parent = null), this.updateTransform = this.displayObjectUpdateTransform, this._cacheData.sprite = f, this.containsPoint = f.containsPoint.bind(f)
        }
    }, u.prototype._calculateCachedBounds = function() {
        this._cacheData.sprite._calculateBounds()
    }, u.prototype._getCachedLocalBounds = function() {
        return this._cacheData.sprite.getLocalBounds()
    }, u.prototype._destroyCachedDisplayObject = function() {
        this._cacheData.sprite._texture.destroy(!0), this._cacheData.sprite = null, o.default.removeFromCache(this._cacheData.textureCacheId), i.default.removeFromCache(this._cacheData.textureCacheId), this._cacheData.textureCacheId = null
    }, u.prototype._cacheAsBitmapDestroy = function(t) {
        this.cacheAsBitmap = !1, this.destroy(t)
    }
}, function(t, e, r) {
    "use strict";
    var n = function(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e.default = t, e
    }(r(2));
    n.DisplayObject.prototype.name = null, n.Container.prototype.getChildByName = function(t) {
        for (var e = 0; e < this.children.length; e++)
            if (this.children[e].name === t) return this.children[e];
        return null
    }
}, function(t, e, r) {
    "use strict";
    var n = function(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e.default = t, e
    }(r(2));
    n.DisplayObject.prototype.getGlobalPosition = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new n.Point;
        return this.parent ? this.parent.toGlobal(this.position, t, arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) : (t.x = this.position.x, t.y = this.position.y), t
    }
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(168);
    Object.defineProperty(e, "FXAAFilter", {
        enumerable: !0
        , get: function() {
            return c(n).default
        }
    });
    var i = r(169);
    Object.defineProperty(e, "NoiseFilter", {
        enumerable: !0
        , get: function() {
            return c(i).default
        }
    });
    var o = r(170);
    Object.defineProperty(e, "DisplacementFilter", {
        enumerable: !0
        , get: function() {
            return c(o).default
        }
    });
    var s = r(171);
    Object.defineProperty(e, "BlurFilter", {
        enumerable: !0
        , get: function() {
            return c(s).default
        }
    });
    var a = r(72);
    Object.defineProperty(e, "BlurXFilter", {
        enumerable: !0
        , get: function() {
            return c(a).default
        }
    });
    var u = r(76);
    Object.defineProperty(e, "BlurYFilter", {
        enumerable: !0
        , get: function() {
            return c(u).default
        }
    });
    var l = r(172);
    Object.defineProperty(e, "ColorMatrixFilter", {
        enumerable: !0
        , get: function() {
            return c(l).default
        }
    });
    var h = r(173);

    function c(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "AlphaFilter", {
        enumerable: !0
        , get: function() {
            return c(h).default
        }
    })
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e.default = t, e
    }(r(2));
    r(7);
    var o = function(t) {
        function e() {
            return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
                , function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, "\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}", 'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n      vec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n'))
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e
    }(i.Filter);
    e.default = o
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2));
    r(7);
    var s = function(t) {
        function e() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .5
                , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Math.random();
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var o = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n"));
            return o.noise = r, o.seed = i, o
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), i(e, [{
            key: "noise"
            , get: function() {
                return this.uniforms.uNoise
            }
            , set: function(t) {
                this.uniforms.uNoise = t
            }
        }, {
            key: "seed"
            , get: function() {
                return this.uniforms.uSeed
            }
            , set: function(t) {
                this.uniforms.uSeed = t
            }
        }]), e
    }(o.Filter);
    e.default = s
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2));
    r(7);
    var s = function(t) {
        function e(r, i) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var s = new o.Matrix;
            r.renderable = !1;
            var a = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}", "varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n  vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n  map -= 0.5;\n  map.xy *= scale / filterArea.xy;\n\n  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"));
            return a.maskSprite = r, a.maskMatrix = s, a.uniforms.mapSampler = r._texture, a.uniforms.filterMatrix = s, a.uniforms.scale = {
                x: 1
                , y: 1
            }, null !== i && void 0 !== i || (i = 20), a.scale = new o.Point(i, i), a
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.apply = function(t, e, r) {
            this.uniforms.filterMatrix = t.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y, t.applyFilter(this, e, r)
        }, i(e, [{
            key: "map"
            , get: function() {
                return this.uniforms.mapSampler
            }
            , set: function(t) {
                this.uniforms.mapSampler = t
            }
        }]), e
    }(o.Filter);
    e.default = s
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , s = u(r(72))
        , a = u(r(76));

    function u(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var l = function(t) {
        function e(r, i, u, l) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var h = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this));
            return h.blurXFilter = new s.default(r, i, u, l), h.blurYFilter = new a.default(r, i, u, l), h.padding = 0, h.resolution = u || o.settings.RESOLUTION, h.quality = i || 4, h.blur = r || 8, h
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.apply = function(t, e, r) {
            var n = t.getRenderTarget(!0);
            this.blurXFilter.apply(t, e, n, !0), this.blurYFilter.apply(t, n, r, !1), t.returnRenderTarget(n)
        }, i(e, [{
            key: "blur"
            , get: function() {
                return this.blurXFilter.blur
            }
            , set: function(t) {
                this.blurXFilter.blur = this.blurYFilter.blur = t, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
            }
        }, {
            key: "quality"
            , get: function() {
                return this.blurXFilter.quality
            }
            , set: function(t) {
                this.blurXFilter.quality = this.blurYFilter.quality = t
            }
        }, {
            key: "blurX"
            , get: function() {
                return this.blurXFilter.blur
            }
            , set: function(t) {
                this.blurXFilter.blur = t, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
            }
        }, {
            key: "blurY"
            , get: function() {
                return this.blurYFilter.blur
            }
            , set: function(t) {
                this.blurYFilter.blur = t, this.padding = 2 * Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength))
            }
        }, {
            key: "blendMode"
            , get: function() {
                return this.blurYFilter._blendMode
            }
            , set: function(t) {
                this.blurYFilter._blendMode = t
            }
        }]), e
    }(o.Filter);
    e.default = l
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2));
    r(7);
    var s = function(t) {
        function e() {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var r = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n"));
            return r.uniforms.m = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], r.alpha = 1, r
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype._loadMatrix = function(t) {
            var e = t;
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1] && (this._multiply(e, this.uniforms.m, t), e = this._colorMatrix(e)), this.uniforms.m = e
        }, e.prototype._multiply = function(t, e, r) {
            return t[0] = e[0] * r[0] + e[1] * r[5] + e[2] * r[10] + e[3] * r[15], t[1] = e[0] * r[1] + e[1] * r[6] + e[2] * r[11] + e[3] * r[16], t[2] = e[0] * r[2] + e[1] * r[7] + e[2] * r[12] + e[3] * r[17], t[3] = e[0] * r[3] + e[1] * r[8] + e[2] * r[13] + e[3] * r[18], t[4] = e[0] * r[4] + e[1] * r[9] + e[2] * r[14] + e[3] * r[19] + e[4], t[5] = e[5] * r[0] + e[6] * r[5] + e[7] * r[10] + e[8] * r[15], t[6] = e[5] * r[1] + e[6] * r[6] + e[7] * r[11] + e[8] * r[16], t[7] = e[5] * r[2] + e[6] * r[7] + e[7] * r[12] + e[8] * r[17], t[8] = e[5] * r[3] + e[6] * r[8] + e[7] * r[13] + e[8] * r[18], t[9] = e[5] * r[4] + e[6] * r[9] + e[7] * r[14] + e[8] * r[19] + e[9], t[10] = e[10] * r[0] + e[11] * r[5] + e[12] * r[10] + e[13] * r[15], t[11] = e[10] * r[1] + e[11] * r[6] + e[12] * r[11] + e[13] * r[16], t[12] = e[10] * r[2] + e[11] * r[7] + e[12] * r[12] + e[13] * r[17], t[13] = e[10] * r[3] + e[11] * r[8] + e[12] * r[13] + e[13] * r[18], t[14] = e[10] * r[4] + e[11] * r[9] + e[12] * r[14] + e[13] * r[19] + e[14], t[15] = e[15] * r[0] + e[16] * r[5] + e[17] * r[10] + e[18] * r[15], t[16] = e[15] * r[1] + e[16] * r[6] + e[17] * r[11] + e[18] * r[16], t[17] = e[15] * r[2] + e[16] * r[7] + e[17] * r[12] + e[18] * r[17], t[18] = e[15] * r[3] + e[16] * r[8] + e[17] * r[13] + e[18] * r[18], t[19] = e[15] * r[4] + e[16] * r[9] + e[17] * r[14] + e[18] * r[19] + e[19], t
        }, e.prototype._colorMatrix = function(t) {
            var e = new Float32Array(t);
            return e[4] /= 255, e[9] /= 255, e[14] /= 255, e[19] /= 255, e
        }, e.prototype.brightness = function(t, e) {
            this._loadMatrix([t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0], e)
        }, e.prototype.greyscale = function(t, e) {
            this._loadMatrix([t, t, t, 0, 0, t, t, t, 0, 0, t, t, t, 0, 0, 0, 0, 0, 1, 0], e)
        }, e.prototype.blackAndWhite = function(t) {
            this._loadMatrix([.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0], t)
        }, e.prototype.hue = function(t, e) {
            t = (t || 0) / 180 * Math.PI;
            var r = Math.cos(t)
                , n = Math.sin(t)
                , i = 1 / 3
                , o = (0, Math.sqrt)(i);
            this._loadMatrix([r + (1 - r) * i, i * (1 - r) - o * n, i * (1 - r) + o * n, 0, 0, i * (1 - r) + o * n, r + i * (1 - r), i * (1 - r) - o * n, 0, 0, i * (1 - r) - o * n, i * (1 - r) + o * n, r + i * (1 - r), 0, 0, 0, 0, 0, 1, 0], e)
        }, e.prototype.contrast = function(t, e) {
            var r = (t || 0) + 1
                , n = -.5 * (r - 1);
            this._loadMatrix([r, 0, 0, 0, n, 0, r, 0, 0, n, 0, 0, r, 0, n, 0, 0, 0, 1, 0], e)
        }, e.prototype.saturate = function() {
            var t = 2 * (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0) / 3 + 1
                , e = -.5 * (t - 1);
            this._loadMatrix([t, e, e, 0, 0, e, t, e, 0, 0, e, e, t, 0, 0, 0, 0, 0, 1, 0], arguments[1])
        }, e.prototype.desaturate = function() {
            this.saturate(-1)
        }, e.prototype.negative = function(t) {
            this._loadMatrix([-1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0], t)
        }, e.prototype.sepia = function(t) {
            this._loadMatrix([.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0], t)
        }, e.prototype.technicolor = function(t) {
            this._loadMatrix([1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0], t)
        }, e.prototype.polaroid = function(t) {
            this._loadMatrix([1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0], t)
        }, e.prototype.toBGR = function(t) {
            this._loadMatrix([0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0], t)
        }, e.prototype.kodachrome = function(t) {
            this._loadMatrix([1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0], t)
        }, e.prototype.browni = function(t) {
            this._loadMatrix([.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0], t)
        }, e.prototype.vintage = function(t) {
            this._loadMatrix([.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0], t)
        }, e.prototype.colorTone = function(t, e, r, n, i) {
            t = t || .2, e = e || .15;
            var o = ((r = r || 16770432) >> 16 & 255) / 255
                , s = (r >> 8 & 255) / 255
                , a = (255 & r) / 255
                , u = ((n = n || 3375104) >> 16 & 255) / 255
                , l = (n >> 8 & 255) / 255
                , h = (255 & n) / 255;
            this._loadMatrix([.3, .59, .11, 0, 0, o, s, a, t, 0, u, l, h, e, 0, o - u, s - l, a - h, 0, 0], i)
        }, e.prototype.night = function(t, e) {
            var r = [-2 * (t = t || .1), -t, 0, 0, 0, -t, 0, t, 0, 0, 0, t, 2 * t, 0, 0, 0, 0, 0, 1, 0];
            this._loadMatrix(r, e)
        }, e.prototype.predator = function(t, e) {
            this._loadMatrix([11.224130630493164 * t, -4.794486999511719 * t, -2.8746118545532227 * t, 0 * t, .40342438220977783 * t, -3.6330697536468506 * t, 9.193157196044922 * t, -2.951810836791992 * t, 0 * t, -1.316135048866272 * t, -3.2184197902679443 * t, -4.2375030517578125 * t, 7.476448059082031 * t, 0 * t, .8044459223747253 * t, 0, 0, 0, 1, 0], e)
        }, e.prototype.lsd = function(t) {
            this._loadMatrix([2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0], t)
        }, e.prototype.reset = function() {
            this._loadMatrix([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], !1)
        }, i(e, [{
            key: "matrix"
            , get: function() {
                return this.uniforms.m
            }
            , set: function(t) {
                this.uniforms.m = t
            }
        }, {
            key: "alpha"
            , get: function() {
                return this.uniforms.uAlpha
            }
            , set: function(t) {
                this.uniforms.uAlpha = t
            }
        }]), e
    }(o.Filter);
    e.default = s, s.prototype.grayscale = s.prototype.greyscale
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2));
    r(7);
    var s = function(t) {
        function e() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var i = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float uAlpha;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;\n}\n"));
            return i.alpha = r, i.glShaderKey = "alpha", i
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), i(e, [{
            key: "alpha"
            , get: function() {
                return this.uniforms.uAlpha
            }
            , set: function(t) {
                this.uniforms.uAlpha = t
            }
        }]), e
    }(o.Filter);
    e.default = s
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(77);
    Object.defineProperty(e, "InteractionData", {
        enumerable: !0
        , get: function() {
            return u(n).default
        }
    });
    var i = r(175);
    Object.defineProperty(e, "InteractionManager", {
        enumerable: !0
        , get: function() {
            return u(i).default
        }
    });
    var o = r(80);
    Object.defineProperty(e, "interactiveTarget", {
        enumerable: !0
        , get: function() {
            return u(o).default
        }
    });
    var s = r(79);
    Object.defineProperty(e, "InteractionTrackingData", {
        enumerable: !0
        , get: function() {
            return u(s).default
        }
    });
    var a = r(78);

    function u(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "InteractionEvent", {
        enumerable: !0
        , get: function() {
            return u(a).default
        }
    })
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? function(t) {
            return n(t)
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : n(t)
        }
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , s = c(r(77))
        , a = c(r(78))
        , u = c(r(79))
        , l = c(r(9))
        , h = c(r(80));

    function c(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    o.utils.mixins.delayMixin(o.DisplayObject.prototype, h.default);
    var f = 1
        , d = {
            target: null
            , data: {
                global: null
            }
        }
        , p = function(t) {
            function e(r, i) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var u = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this));
                return i = i || {}, u.renderer = r, u.autoPreventDefault = void 0 === i.autoPreventDefault || i.autoPreventDefault, u.interactionFrequency = i.interactionFrequency || 10, u.mouse = new s.default, u.mouse.identifier = f, u.mouse.global.set(-999999), u.activeInteractionData = {}, u.activeInteractionData[f] = u.mouse, u.interactionDataPool = [], u.eventData = new a.default, u.interactionDOMElement = null, u.moveWhenInside = !1, u.eventsAdded = !1, u.mouseOverRenderer = !1, u.supportsTouchEvents = "ontouchstart" in window, u.supportsPointerEvents = !!window.PointerEvent, u.onPointerUp = u.onPointerUp.bind(u), u.processPointerUp = u.processPointerUp.bind(u), u.onPointerCancel = u.onPointerCancel.bind(u), u.processPointerCancel = u.processPointerCancel.bind(u), u.onPointerDown = u.onPointerDown.bind(u), u.processPointerDown = u.processPointerDown.bind(u), u.onPointerMove = u.onPointerMove.bind(u), u.processPointerMove = u.processPointerMove.bind(u), u.onPointerOut = u.onPointerOut.bind(u), u.processPointerOverOut = u.processPointerOverOut.bind(u), u.onPointerOver = u.onPointerOver.bind(u), u.cursorStyles = {
                    default: "inherit"
                    , pointer: "pointer"
                }, u.currentCursorMode = null, u.cursor = null, u._tempPoint = new o.Point, u.resolution = 1, u.setTargetElement(u.renderer.view, u.renderer.resolution), u
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.hitTest = function(t, e) {
                return d.target = null, d.data.global = t, e || (e = this.renderer._lastObjectRendered), this.processInteractive(d, e, null, !0), d.target
            }, e.prototype.setTargetElement = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                this.removeEvents(), this.interactionDOMElement = t, this.resolution = e, this.addEvents()
            }, e.prototype.addEvents = function() {
                this.interactionDOMElement && (o.ticker.shared.add(this.update, this, o.UPDATE_PRIORITY.INTERACTION), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "none", this.interactionDOMElement.style["-ms-touch-action"] = "none") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = "none"), this.supportsPointerEvents ? (window.document.addEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("pointerover", this.onPointerOver, !0), window.addEventListener("pointercancel", this.onPointerCancel, !0), window.addEventListener("pointerup", this.onPointerUp, !0)) : (window.document.addEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onPointerOver, !0), window.addEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.addEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.addEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.addEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.addEventListener("touchmove", this.onPointerMove, !0)), this.eventsAdded = !0)
            }, e.prototype.removeEvents = function() {
                this.interactionDOMElement && (o.ticker.shared.remove(this.update, this), window.navigator.msPointerEnabled ? (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = "") : this.supportsPointerEvents && (this.interactionDOMElement.style["touch-action"] = ""), this.supportsPointerEvents ? (window.document.removeEventListener("pointermove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("pointerdown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("pointerleave", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("pointerover", this.onPointerOver, !0), window.removeEventListener("pointercancel", this.onPointerCancel, !0), window.removeEventListener("pointerup", this.onPointerUp, !0)) : (window.document.removeEventListener("mousemove", this.onPointerMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onPointerOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onPointerOver, !0), window.removeEventListener("mouseup", this.onPointerUp, !0)), this.supportsTouchEvents && (this.interactionDOMElement.removeEventListener("touchstart", this.onPointerDown, !0), this.interactionDOMElement.removeEventListener("touchcancel", this.onPointerCancel, !0), this.interactionDOMElement.removeEventListener("touchend", this.onPointerUp, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onPointerMove, !0)), this.interactionDOMElement = null, this.eventsAdded = !1)
            }, e.prototype.update = function(t) {
                if (this._deltaTime += t, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.interactionDOMElement))
                    if (this.didMove) this.didMove = !1;
                    else {
                        for (var e in this.cursor = null, this.activeInteractionData)
                            if (this.activeInteractionData.hasOwnProperty(e)) {
                                var r = this.activeInteractionData[e];
                                if (r.originalEvent && "touch" !== r.pointerType) {
                                    var n = this.configureInteractionEventForDOMEvent(this.eventData, r.originalEvent, r);
                                    this.processInteractive(n, this.renderer._lastObjectRendered, this.processPointerOverOut, !0)
                                }
                            } this.setCursorMode(this.cursor)
                    }
            }, e.prototype.setCursorMode = function(t) {
                if (this.currentCursorMode !== (t = t || "default")) {
                    this.currentCursorMode = t;
                    var e = this.cursorStyles[t];
                    if (e) switch (void 0 === e ? "undefined" : i(e)) {
                        case "string":
                            this.interactionDOMElement.style.cursor = e;
                            break;
                        case "function":
                            e(t);
                            break;
                        case "object":
                            Object.assign(this.interactionDOMElement.style, e)
                    } else "string" != typeof t || Object.prototype.hasOwnProperty.call(this.cursorStyles, t) || (this.interactionDOMElement.style.cursor = t)
                }
            }, e.prototype.dispatchEvent = function(t, e, r) {
                r.stopped || (r.currentTarget = t, r.type = e, t.emit(e, r), t[e] && t[e](r))
            }, e.prototype.mapPositionToPoint = function(t, e, r) {
                var n;
                n = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
                    x: 0
                    , y: 0
                    , width: 0
                    , height: 0
                };
                var i = navigator.isCocoonJS ? this.resolution : 1 / this.resolution;
                t.x = this.interactionDOMElement.width / n.width * (e - n.left) * i, t.y = this.interactionDOMElement.height / n.height * (r - n.top) * i
            }, e.prototype.processInteractive = function(t, e, r, n, i) {
                if (!e || !e.visible) return !1;
                var o = t.data.global
                    , s = !1
                    , a = i = e.interactive || i
                    , u = !0;
                if (e.hitArea ? (n && (e.worldTransform.applyInverse(o, this._tempPoint), e.hitArea.contains(this._tempPoint.x, this._tempPoint.y) ? s = !0 : (n = !1, u = !1)), a = !1) : e._mask && n && (e._mask.containsPoint(o) || (n = !1, u = !1)), u && e.interactiveChildren && e.children)
                    for (var l = e.children, h = l.length - 1; h >= 0; h--) {
                        var c = l[h]
                            , f = this.processInteractive(t, c, r, n, a);
                        if (f) {
                            if (!c.parent) continue;
                            a = !1, f && (t.target && (n = !1), s = !0)
                        }
                    }
                return i && (n && !t.target && !e.hitArea && e.containsPoint && e.containsPoint(o) && (s = !0), e.interactive && (s && !t.target && (t.target = e), r && r(t, e, !!s))), s
            }, e.prototype.onPointerDown = function(t) {
                if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                    var e = this.normalizeToPointerData(t);
                    this.autoPreventDefault && e[0].isNormalized && t.preventDefault();
                    for (var r = e.length, n = 0; n < r; n++) {
                        var i = e[n]
                            , o = this.getInteractionDataForPointerId(i)
                            , s = this.configureInteractionEventForDOMEvent(this.eventData, i, o);
                        s.data.originalEvent = t, this.processInteractive(s, this.renderer._lastObjectRendered, this.processPointerDown, !0), this.emit("pointerdown", s), "touch" === i.pointerType ? this.emit("touchstart", s) : "mouse" !== i.pointerType && "pen" !== i.pointerType || this.emit(2 === i.button ? "rightdown" : "mousedown", this.eventData)
                    }
                }
            }, e.prototype.processPointerDown = function(t, e, r) {
                var n = t.data
                    , i = t.data.identifier;
                if (r)
                    if (e.trackedPointers[i] || (e.trackedPointers[i] = new u.default(i)), this.dispatchEvent(e, "pointerdown", t), "touch" === n.pointerType) this.dispatchEvent(e, "touchstart", t);
                    else if ("mouse" === n.pointerType || "pen" === n.pointerType) {
                    var o = 2 === n.button;
                    o ? e.trackedPointers[i].rightDown = !0 : e.trackedPointers[i].leftDown = !0, this.dispatchEvent(e, o ? "rightdown" : "mousedown", t)
                }
            }, e.prototype.onPointerComplete = function(t, e, r) {
                for (var n = this.normalizeToPointerData(t), i = n.length, o = t.target !== this.interactionDOMElement ? "outside" : "", s = 0; s < i; s++) {
                    var a = n[s]
                        , u = this.getInteractionDataForPointerId(a)
                        , l = this.configureInteractionEventForDOMEvent(this.eventData, a, u);
                    l.data.originalEvent = t, this.processInteractive(l, this.renderer._lastObjectRendered, r, e || !o), this.emit(e ? "pointercancel" : "pointerup" + o, l), "mouse" === a.pointerType || "pen" === a.pointerType ? this.emit(2 === a.button ? "rightup" + o : "mouseup" + o, l) : "touch" === a.pointerType && (this.emit(e ? "touchcancel" : "touchend" + o, l), this.releaseInteractionDataForPointerId(a.pointerId, u))
                }
            }, e.prototype.onPointerCancel = function(t) {
                this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !0, this.processPointerCancel)
            }, e.prototype.processPointerCancel = function(t, e) {
                var r = t.data
                    , n = t.data.identifier;
                void 0 !== e.trackedPointers[n] && (delete e.trackedPointers[n], this.dispatchEvent(e, "pointercancel", t), "touch" === r.pointerType && this.dispatchEvent(e, "touchcancel", t))
            }, e.prototype.onPointerUp = function(t) {
                this.supportsTouchEvents && "touch" === t.pointerType || this.onPointerComplete(t, !1, this.processPointerUp)
            }, e.prototype.processPointerUp = function(t, e, r) {
                var n = t.data
                    , i = t.data.identifier
                    , o = e.trackedPointers[i]
                    , s = "touch" === n.pointerType
                    , a = "mouse" === n.pointerType || "pen" === n.pointerType
                    , l = !1;
                if (a) {
                    var h = 2 === n.button
                        , c = u.default.FLAGS
                        , f = void 0 !== o && o.flags & (h ? c.RIGHT_DOWN : c.LEFT_DOWN);
                    r ? (this.dispatchEvent(e, h ? "rightup" : "mouseup", t), f && (this.dispatchEvent(e, h ? "rightclick" : "click", t), l = !0)) : f && this.dispatchEvent(e, h ? "rightupoutside" : "mouseupoutside", t), o && (h ? o.rightDown = !1 : o.leftDown = !1)
                }
                r ? (this.dispatchEvent(e, "pointerup", t), s && this.dispatchEvent(e, "touchend", t), o && (a && !l || this.dispatchEvent(e, "pointertap", t), s && (this.dispatchEvent(e, "tap", t), o.over = !1))) : o && (this.dispatchEvent(e, "pointerupoutside", t), s && this.dispatchEvent(e, "touchendoutside", t)), o && o.none && delete e.trackedPointers[i]
            }, e.prototype.onPointerMove = function(t) {
                if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                    var e = this.normalizeToPointerData(t);
                    "mouse" !== e[0].pointerType && "pen" !== e[0].pointerType || (this.didMove = !0, this.cursor = null);
                    for (var r = e.length, n = 0; n < r; n++) {
                        var i = e[n]
                            , o = this.getInteractionDataForPointerId(i)
                            , s = this.configureInteractionEventForDOMEvent(this.eventData, i, o);
                        s.data.originalEvent = t, this.processInteractive(s, this.renderer._lastObjectRendered, this.processPointerMove, "touch" !== i.pointerType || this.moveWhenInside), this.emit("pointermove", s), "touch" === i.pointerType && this.emit("touchmove", s), "mouse" !== i.pointerType && "pen" !== i.pointerType || this.emit("mousemove", s)
                    }
                    "mouse" === e[0].pointerType && this.setCursorMode(this.cursor)
                }
            }, e.prototype.processPointerMove = function(t, e, r) {
                var n = t.data
                    , i = "touch" === n.pointerType
                    , o = "mouse" === n.pointerType || "pen" === n.pointerType;
                o && this.processPointerOverOut(t, e, r), this.moveWhenInside && !r || (this.dispatchEvent(e, "pointermove", t), i && this.dispatchEvent(e, "touchmove", t), o && this.dispatchEvent(e, "mousemove", t))
            }, e.prototype.onPointerOut = function(t) {
                if (!this.supportsTouchEvents || "touch" !== t.pointerType) {
                    var e = this.normalizeToPointerData(t)[0];
                    "mouse" === e.pointerType && (this.mouseOverRenderer = !1, this.setCursorMode(null));
                    var r = this.getInteractionDataForPointerId(e)
                        , n = this.configureInteractionEventForDOMEvent(this.eventData, e, r);
                    n.data.originalEvent = e, this.processInteractive(n, this.renderer._lastObjectRendered, this.processPointerOverOut, !1), this.emit("pointerout", n), "mouse" === e.pointerType || "pen" === e.pointerType ? this.emit("mouseout", n) : this.releaseInteractionDataForPointerId(r.identifier)
                }
            }, e.prototype.processPointerOverOut = function(t, e, r) {
                var n = t.data
                    , i = t.data.identifier
                    , o = "mouse" === n.pointerType || "pen" === n.pointerType
                    , s = e.trackedPointers[i];
                r && !s && (s = e.trackedPointers[i] = new u.default(i)), void 0 !== s && (r && this.mouseOverRenderer ? (s.over || (s.over = !0, this.dispatchEvent(e, "pointerover", t), o && this.dispatchEvent(e, "mouseover", t)), o && null === this.cursor && (this.cursor = e.cursor)) : s.over && (s.over = !1, this.dispatchEvent(e, "pointerout", this.eventData), o && this.dispatchEvent(e, "mouseout", t), s.none && delete e.trackedPointers[i]))
            }, e.prototype.onPointerOver = function(t) {
                var e = this.normalizeToPointerData(t)[0]
                    , r = this.getInteractionDataForPointerId(e)
                    , n = this.configureInteractionEventForDOMEvent(this.eventData, e, r);
                n.data.originalEvent = e, "mouse" === e.pointerType && (this.mouseOverRenderer = !0), this.emit("pointerover", n), "mouse" !== e.pointerType && "pen" !== e.pointerType || this.emit("mouseover", n)
            }, e.prototype.getInteractionDataForPointerId = function(t) {
                var e = t.pointerId
                    , r = void 0;
                return e === f || "mouse" === t.pointerType ? r = this.mouse : this.activeInteractionData[e] ? r = this.activeInteractionData[e] : ((r = this.interactionDataPool.pop() || new s.default).identifier = e, this.activeInteractionData[e] = r), r.copyEvent(t), r
            }, e.prototype.releaseInteractionDataForPointerId = function(t) {
                var e = this.activeInteractionData[t];
                e && (delete this.activeInteractionData[t], e.reset(), this.interactionDataPool.push(e))
            }, e.prototype.configureInteractionEventForDOMEvent = function(t, e, r) {
                return t.data = r, this.mapPositionToPoint(r.global, e.clientX, e.clientY), navigator.isCocoonJS && "touch" === e.pointerType && (r.global.x = r.global.x / this.resolution, r.global.y = r.global.y / this.resolution), "touch" === e.pointerType && (e.globalX = r.global.x, e.globalY = r.global.y), r.originalEvent = e, t.reset(), t
            }, e.prototype.normalizeToPointerData = function(t) {
                var e = [];
                if (this.supportsTouchEvents && t instanceof TouchEvent)
                    for (var r = 0, n = t.changedTouches.length; r < n; r++) {
                        var i = t.changedTouches[r];
                        void 0 === i.button && (i.button = t.touches.length ? 1 : 0), void 0 === i.buttons && (i.buttons = t.touches.length ? 1 : 0), void 0 === i.isPrimary && (i.isPrimary = 1 === t.touches.length && "touchstart" === t.type), void 0 === i.width && (i.width = i.radiusX || 1), void 0 === i.height && (i.height = i.radiusY || 1), void 0 === i.tiltX && (i.tiltX = 0), void 0 === i.tiltY && (i.tiltY = 0), void 0 === i.pointerType && (i.pointerType = "touch"), void 0 === i.pointerId && (i.pointerId = i.identifier || 0), void 0 === i.pressure && (i.pressure = i.force || .5), i.twist = 0, i.tangentialPressure = 0, void 0 === i.layerX && (i.layerX = i.offsetX = i.clientX), void 0 === i.layerY && (i.layerY = i.offsetY = i.clientY), i.isNormalized = !0, e.push(i)
                    } else !(t instanceof MouseEvent) || this.supportsPointerEvents && t instanceof window.PointerEvent ? e.push(t) : (void 0 === t.isPrimary && (t.isPrimary = !0), void 0 === t.width && (t.width = 1), void 0 === t.height && (t.height = 1), void 0 === t.tiltX && (t.tiltX = 0), void 0 === t.tiltY && (t.tiltY = 0), void 0 === t.pointerType && (t.pointerType = "mouse"), void 0 === t.pointerId && (t.pointerId = f), void 0 === t.pressure && (t.pressure = .5), t.twist = 0, t.tangentialPressure = 0, t.isNormalized = !0, e.push(t));
                return e
            }, e.prototype.destroy = function() {
                this.removeEvents(), this.removeAllListeners(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactionDOMElement = null, this.onPointerDown = null, this.processPointerDown = null, this.onPointerUp = null, this.processPointerUp = null, this.onPointerCancel = null, this.processPointerCancel = null, this.onPointerMove = null, this.processPointerMove = null, this.onPointerOut = null, this.processPointerOverOut = null, this.onPointerOver = null, this._tempPoint = null
            }, e
        }(l.default);
    e.default = p, o.WebGLRenderer.registerPlugin("interaction", p), o.CanvasRenderer.registerPlugin("interaction", p)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0, e.shared = e.Resource = e.textureParser = e.getResourcePath = e.spritesheetParser = e.parseBitmapFontData = e.bitmapFontParser = e.Loader = void 0;
    var n = r(81);
    Object.defineProperty(e, "bitmapFontParser", {
        enumerable: !0
        , get: function() {
            return l(n).default
        }
    }), Object.defineProperty(e, "parseBitmapFontData", {
        enumerable: !0
        , get: function() {
            return n.parse
        }
    });
    var i = r(86);
    Object.defineProperty(e, "spritesheetParser", {
        enumerable: !0
        , get: function() {
            return l(i).default
        }
    }), Object.defineProperty(e, "getResourcePath", {
        enumerable: !0
        , get: function() {
            return i.getResourcePath
        }
    });
    var o = r(87);
    Object.defineProperty(e, "textureParser", {
        enumerable: !0
        , get: function() {
            return l(o).default
        }
    });
    var s = r(15);
    Object.defineProperty(e, "Resource", {
        enumerable: !0
        , get: function() {
            return s.Resource
        }
    });
    var a = l(r(68))
        , u = l(r(178));

    function l(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    e.Loader = u.default;
    var h = new u.default;
    h.destroy = function() {}, e.shared = h;
    var c = a.default.prototype;
    c._loader = null, Object.defineProperty(c, "loader", {
        get: function() {
            return this._loader || (this._loader = this._options.sharedLoader ? h : new u.default), this._loader
        }
    }), c._parentDestroy = c.destroy, c.destroy = function(t, e) {
        this._loader && (this._loader.destroy(), this._loader = null), this._parentDestroy(t, e)
    }
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? function(t) {
            return n(t)
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : n(t)
        }
        , o = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , s = h(r(82))
        , a = h(r(83))
        , u = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(84))
        , l = h(r(36));

    function h(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var c = /(#[\w-]+)?$/
        , f = function() {
            function t() {
                var e = this
                    , r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                    , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10;
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.baseUrl = r, this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function(t, r) {
                    return e._loadResource(t, r)
                }, this._queue = u.queue(this._boundLoadResource, n), this._queue.pause(), this.resources = {}, this.onProgress = new s.default, this.onError = new s.default, this.onLoad = new s.default, this.onStart = new s.default, this.onComplete = new s.default
            }
            return t.prototype.add = function(t, e, r, n) {
                if (Array.isArray(t)) {
                    for (var o = 0; o < t.length; ++o) this.add(t[o]);
                    return this
                }
                if ("object" === (void 0 === t ? "undefined" : i(t)) && (n = e || t.callback || t.onComplete, r = t, e = t.url, t = t.name || t.key || t.url), "string" != typeof e && (n = r, r = e, e = t), "string" != typeof e) throw new Error("No url passed to add resource to loader.");
                if ("function" == typeof r && (n = r, r = null), this.loading && (!r || !r.parentResource)) throw new Error("Cannot add resources while the loader is running.");
                if (this.resources[t]) throw new Error('Resource named "' + t + '" already exists.');
                if (e = this._prepareUrl(e), this.resources[t] = new l.default(t, e, r), "function" == typeof n && this.resources[t].onAfterMiddleware.once(n), this.loading) {
                    for (var s = r.parentResource, a = [], u = 0; u < s.children.length; ++u) s.children[u].isComplete || a.push(s.children[u]);
                    var h = s.progressChunk * (a.length + 1) / (a.length + 2);
                    s.children.push(this.resources[t]), s.progressChunk = h;
                    for (var c = 0; c < a.length; ++c) a[c].progressChunk = h;
                    this.resources[t].progressChunk = h
                }
                return this._queue.push(this.resources[t]), this
            }, t.prototype.pre = function(t) {
                return this._beforeMiddleware.push(t), this
            }, t.prototype.use = function(t) {
                return this._afterMiddleware.push(t), this
            }, t.prototype.reset = function() {
                for (var t in this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause(), this.resources) {
                    var e = this.resources[t];
                    e._onLoadBinding && e._onLoadBinding.detach(), e.isLoading && e.abort()
                }
                return this.resources = {}, this
            }, t.prototype.load = function(t) {
                if ("function" == typeof t && this.onComplete.once(t), this.loading) return this;
                if (this._queue.idle()) this._onStart(), this._onComplete();
                else {
                    for (var e = 100 / this._queue._tasks.length, r = 0; r < this._queue._tasks.length; ++r) this._queue._tasks[r].data.progressChunk = e;
                    this._onStart(), this._queue.resume()
                }
                return this
            }, t.prototype._prepareUrl = function(t) {
                var e = (0, a.default)(t, {
                        strictMode: !0
                    })
                    , r = void 0;
                if (r = e.protocol || !e.path || 0 === t.indexOf("//") ? t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t.charAt(0) ? this.baseUrl + "/" + t : this.baseUrl + t, this.defaultQueryString) {
                    var n = c.exec(r)[0]; - 1 !== (r = r.substr(0, r.length - n.length)).indexOf("?") ? r += "&" + this.defaultQueryString : r += "?" + this.defaultQueryString, r += n
                }
                return r
            }, t.prototype._loadResource = function(t, e) {
                var r = this;
                t._dequeue = e, u.eachSeries(this._beforeMiddleware, function(e, n) {
                    e.call(r, t, function() {
                        n(t.isComplete ? {} : null)
                    })
                }, function() {
                    t.isComplete ? r._onLoad(t) : (t._onLoadBinding = t.onComplete.once(r._onLoad, r), t.load())
                }, !0)
            }, t.prototype._onStart = function() {
                this.progress = 0, this.loading = !0, this.onStart.dispatch(this)
            }, t.prototype._onComplete = function() {
                this.progress = 100, this.loading = !1, this.onComplete.dispatch(this, this.resources)
            }, t.prototype._onLoad = function(t) {
                var e = this;
                t._onLoadBinding = null, this._resourcesParsing.push(t), t._dequeue(), u.eachSeries(this._afterMiddleware, function(r, n) {
                    r.call(e, t, n)
                }, function() {
                    t.onAfterMiddleware.dispatch(t), e.progress += t.progressChunk, e.onProgress.dispatch(e, t), t.error ? e.onError.dispatch(t.error, e, t) : e.onLoad.dispatch(e, t), e._resourcesParsing.splice(e._resourcesParsing.indexOf(t), 1), e._queue.idle() && 0 === e._resourcesParsing.length && e._onComplete()
                }, !0)
            }, o(t, [{
                key: "concurrency"
                , get: function() {
                    return this._queue.concurrency
                }
                , set: function(t) {
                    this._queue.concurrency = t
                }
            }]), t
        }();
    e.default = f
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = h(r(15))
        , o = r(179)
        , s = h(r(9))
        , a = h(r(87))
        , u = h(r(86))
        , l = h(r(81));

    function h(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var c = function(t) {
        function e(r, i) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var o = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, r, i));
            s.default.call(o);
            for (var a = 0; a < e._pixiMiddleware.length; ++a) o.use(e._pixiMiddleware[a]());
            return o.onStart.add(function(t) {
                return o.emit("start", t)
            }), o.onProgress.add(function(t, e) {
                return o.emit("progress", t, e)
            }), o.onError.add(function(t, e, r) {
                return o.emit("error", t, e, r)
            }), o.onLoad.add(function(t, e) {
                return o.emit("load", t, e)
            }), o.onComplete.add(function(t, e) {
                return o.emit("complete", t, e)
            }), o
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.addPixiMiddleware = function(t) {
            e._pixiMiddleware.push(t)
        }, e.prototype.destroy = function() {
            this.removeAllListeners(), this.reset()
        }, e
    }(i.default);
    for (var f in e.default = c, s.default.prototype) c.prototype[f] = s.default.prototype[f];
    c._pixiMiddleware = [o.blobMiddlewareFactory, a.default, u.default, l.default];
    var d = i.default.Resource;
    d.setExtensionXhrType("fnt", d.XHR_RESPONSE_TYPE.DOCUMENT)
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = "function" == typeof Symbol && "symbol" === n(Symbol.iterator) ? function(t) {
        return n(t)
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : n(t)
    };
    e.blobMiddlewareFactory = function() {
        return function(t, e) {
            if (t.data) {
                if (t.xhr && t.xhrType === o.default.XHR_RESPONSE_TYPE.BLOB)
                    if (window.Blob && "string" != typeof t.data) {
                        if (0 === t.data.type.indexOf("image")) {
                            var r = function() {
                                var r = u.createObjectURL(t.data);
                                return t.blob = t.data, t.data = new Image, t.data.src = r, t.type = o.default.TYPE.IMAGE, t.data.onload = function() {
                                    u.revokeObjectURL(r), t.data.onload = null, e()
                                }, {
                                    v: void 0
                                }
                            }();
                            if ("object" === (void 0 === r ? "undefined" : i(r))) return r.v
                        }
                    } else {
                        var n = t.xhr.getResponseHeader("content-type");
                        if (n && 0 === n.indexOf("image")) return t.data = new Image, t.data.src = "data:" + n + ";base64," + s.default.encodeBinary(t.xhr.responseText), t.type = o.default.TYPE.IMAGE, void(t.data.onload = function() {
                            t.data.onload = null, e()
                        })
                    } e()
            } else e()
        }
    };
    var o = a(r(36))
        , s = a(r(85));

    function a(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var u = window.URL || window.webkitURL
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(16);
    Object.defineProperty(e, "Mesh", {
        enumerable: !0
        , get: function() {
            return l(n).default
        }
    });
    var i = r(181);
    Object.defineProperty(e, "MeshRenderer", {
        enumerable: !0
        , get: function() {
            return l(i).default
        }
    });
    var o = r(182);
    Object.defineProperty(e, "CanvasMeshRenderer", {
        enumerable: !0
        , get: function() {
            return l(o).default
        }
    });
    var s = r(88);
    Object.defineProperty(e, "Plane", {
        enumerable: !0
        , get: function() {
            return l(s).default
        }
    });
    var a = r(183);
    Object.defineProperty(e, "NineSlicePlane", {
        enumerable: !0
        , get: function() {
            return l(a).default
        }
    });
    var u = r(184);

    function l(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "Rope", {
        enumerable: !0
        , get: function() {
            return l(u).default
        }
    })
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , o = a(r(6))
        , s = a(r(16));

    function a(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    r(7);
    var u = i.Matrix.IDENTITY
        , l = function(t) {
            function e(r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r));
                return i.shader = null, i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.onContextChange = function() {
                this.shader = new i.Shader(this.renderer.gl, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n", "varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n")
            }, e.prototype.render = function(t) {
                var e = this.renderer
                    , r = e.gl
                    , n = t._texture;
                if (n.valid) {
                    var a = t._glDatas[e.CONTEXT_UID];
                    a || (e.bindVao(null), (a = {
                        shader: this.shader
                        , vertexBuffer: o.default.GLBuffer.createVertexBuffer(r, t.vertices, r.STREAM_DRAW)
                        , uvBuffer: o.default.GLBuffer.createVertexBuffer(r, t.uvs, r.STREAM_DRAW)
                        , indexBuffer: o.default.GLBuffer.createIndexBuffer(r, t.indices, r.STATIC_DRAW)
                        , vao: null
                        , dirty: t.dirty
                        , indexDirty: t.indexDirty
                        , vertexDirty: t.vertexDirty
                    }).vao = new o.default.VertexArrayObject(r).addIndex(a.indexBuffer).addAttribute(a.vertexBuffer, a.shader.attributes.aVertexPosition, r.FLOAT, !1, 8, 0).addAttribute(a.uvBuffer, a.shader.attributes.aTextureCoord, r.FLOAT, !1, 8, 0), t._glDatas[e.CONTEXT_UID] = a), e.bindVao(a.vao), t.dirty !== a.dirty && (a.dirty = t.dirty, a.uvBuffer.upload(t.uvs)), t.indexDirty !== a.indexDirty && (a.indexDirty = t.indexDirty, a.indexBuffer.upload(t.indices)), t.vertexDirty !== a.vertexDirty && (a.vertexDirty = t.vertexDirty, a.vertexBuffer.upload(t.vertices)), e.bindShader(a.shader), a.shader.uniforms.uSampler = e.bindTexture(n), e.state.setBlendMode(i.utils.correctBlendMode(t.blendMode, n.baseTexture.premultipliedAlpha)), a.shader.uniforms.uTransform && (a.shader.uniforms.uTransform = t.uploadUvTransform ? t._uvTransform.mapCoord.toArray(!0) : u.toArray(!0)), a.shader.uniforms.translationMatrix = t.worldTransform.toArray(!0), a.shader.uniforms.uColor = i.utils.premultiplyRgba(t.tintRgb, t.worldAlpha, a.shader.uniforms.uColor, n.baseTexture.premultipliedAlpha), a.vao.draw(t.drawMode === s.default.DRAW_MODES.TRIANGLE_MESH ? r.TRIANGLE_STRIP : r.TRIANGLES, t.indices.length, 0)
                }
            }, e
        }(i.ObjectRenderer);
    e.default = l, i.WebGLRenderer.registerPlugin("mesh", l)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(16))
        , o = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.renderer = e
            }
            return t.prototype.render = function(t) {
                var e = this.renderer
                    , r = e.context
                    , n = t.worldTransform
                    , o = e.resolution;
                e.roundPixels ? r.setTransform(n.a * o, n.b * o, n.c * o, n.d * o, n.tx * o | 0, n.ty * o | 0) : r.setTransform(n.a * o, n.b * o, n.c * o, n.d * o, n.tx * o, n.ty * o), e.context.globalAlpha = t.worldAlpha, e.setBlendMode(t.blendMode), t.drawMode === i.default.DRAW_MODES.TRIANGLE_MESH ? this._renderTriangleMesh(t) : this._renderTriangles(t)
            }, t.prototype._renderTriangleMesh = function(t) {
                for (var e = t.vertices.length / 2, r = 0; r < e - 2; r++) {
                    var n = 2 * r;
                    this._renderDrawTriangle(t, n, n + 2, n + 4)
                }
            }, t.prototype._renderTriangles = function(t) {
                for (var e = t.indices, r = e.length, n = 0; n < r; n += 3) this._renderDrawTriangle(t, 2 * e[n], 2 * e[n + 1], 2 * e[n + 2])
            }, t.prototype._renderDrawTriangle = function(t, e, r, n) {
                var i = this.renderer.context
                    , o = t.uvs
                    , s = t.vertices
                    , a = t._texture;
                if (a.valid) {
                    var u = a.baseTexture
                        , l = u.source
                        , h = u.width
                        , c = u.height
                        , f = void 0
                        , d = void 0
                        , p = void 0
                        , _ = void 0
                        , y = void 0
                        , m = void 0;
                    if (t.uploadUvTransform) {
                        var v = t._uvTransform.mapCoord;
                        f = (o[e] * v.a + o[e + 1] * v.c + v.tx) * u.width, d = (o[r] * v.a + o[r + 1] * v.c + v.tx) * u.width, p = (o[n] * v.a + o[n + 1] * v.c + v.tx) * u.width, _ = (o[e] * v.b + o[e + 1] * v.d + v.ty) * u.height, y = (o[r] * v.b + o[r + 1] * v.d + v.ty) * u.height, m = (o[n] * v.b + o[n + 1] * v.d + v.ty) * u.height
                    } else f = o[e] * u.width, d = o[r] * u.width, p = o[n] * u.width, _ = o[e + 1] * u.height, y = o[r + 1] * u.height, m = o[n + 1] * u.height;
                    var g = s[e]
                        , b = s[r]
                        , T = s[n]
                        , x = s[e + 1]
                        , w = s[r + 1]
                        , E = s[n + 1]
                        , S = t.canvasPadding / this.renderer.resolution;
                    if (S > 0) {
                        var O = S / Math.abs(t.worldTransform.a)
                            , P = S / Math.abs(t.worldTransform.d)
                            , C = (g + b + T) / 3
                            , M = (x + w + E) / 3
                            , A = g - C
                            , I = x - M
                            , R = Math.sqrt(A * A + I * I);
                        g = C + A / R * (R + O), x = M + I / R * (R + P), I = w - M, b = C + (A = b - C) / (R = Math.sqrt(A * A + I * I)) * (R + O), w = M + I / R * (R + P), I = E - M, T = C + (A = T - C) / (R = Math.sqrt(A * A + I * I)) * (R + O), E = M + I / R * (R + P)
                    }
                    i.save(), i.beginPath(), i.moveTo(g, x), i.lineTo(b, w), i.lineTo(T, E), i.closePath(), i.clip();
                    var D = f * y + _ * p + d * m - y * p - _ * d - f * m;
                    i.transform((g * y + _ * T + b * m - y * T - _ * b - g * m) / D, (x * y + _ * E + w * m - y * E - _ * w - x * m) / D, (f * b + g * p + d * T - b * p - g * d - f * T) / D, (f * w + x * p + d * E - w * p - x * d - f * E) / D, (f * y * T + _ * b * p + g * d * m - g * y * p - _ * d * T - f * b * m) / D, (f * y * E + _ * w * p + x * d * m - x * y * p - _ * d * E - f * w * m) / D), i.drawImage(l, 0, 0, h * u.resolution, c * u.resolution, 0, 0, h, c), i.restore(), this.renderer.invalidateBlendMode()
                }
            }, t.prototype.renderMeshFlat = function(t) {
                var e = this.renderer.context
                    , r = t.vertices
                    , n = r.length / 2;
                e.beginPath();
                for (var i = 1; i < n - 2; ++i) {
                    var o = 2 * i
                        , s = r[o + 2]
                        , a = r[o + 3]
                        , u = r[o + 4]
                        , l = r[o + 5];
                    e.moveTo(r[o], r[o + 1]), e.lineTo(s, a), e.lineTo(u, l)
                }
                e.fillStyle = "#FF0000", e.fill(), e.closePath()
            }, t.prototype.destroy = function() {
                this.renderer = null
            }, t
        }();
    e.default = o, n.CanvasRenderer.registerPlugin("mesh", o)
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = 10
        , s = function(t) {
            function e(r, i, s, a, u) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var l = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r, 4, 4));
                return l._origWidth = r.orig.width, l._origHeight = r.orig.height, l._width = l._origWidth, l._height = l._origHeight, l._leftWidth = void 0 !== i ? i : o, l._rightWidth = void 0 !== a ? a : o, l._topHeight = void 0 !== s ? s : o, l._bottomHeight = void 0 !== u ? u : o, l.refresh(!0), l
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.updateHorizontalVertices = function() {
                var t = this.vertices
                    , e = this._topHeight + this._bottomHeight
                    , r = this._height > e ? 1 : this._height / e;
                t[9] = t[11] = t[13] = t[15] = this._topHeight * r, t[17] = t[19] = t[21] = t[23] = this._height - this._bottomHeight * r, t[25] = t[27] = t[29] = t[31] = this._height
            }, e.prototype.updateVerticalVertices = function() {
                var t = this.vertices
                    , e = this._leftWidth + this._rightWidth
                    , r = this._width > e ? 1 : this._width / e;
                t[2] = t[10] = t[18] = t[26] = this._leftWidth * r, t[4] = t[12] = t[20] = t[28] = this._width - this._rightWidth * r, t[6] = t[14] = t[22] = t[30] = this._width
            }, e.prototype._renderCanvas = function(t) {
                var e = t.context;
                e.globalAlpha = this.worldAlpha, t.setBlendMode(this.blendMode);
                var r = this.worldTransform
                    , n = t.resolution;
                t.roundPixels ? e.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n | 0, r.ty * n | 0) : e.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n, r.ty * n);
                var i = this._texture.baseTexture
                    , o = i.source
                    , s = i.width * i.resolution
                    , a = i.height * i.resolution;
                this.drawSegment(e, o, s, a, 0, 1, 10, 11), this.drawSegment(e, o, s, a, 2, 3, 12, 13), this.drawSegment(e, o, s, a, 4, 5, 14, 15), this.drawSegment(e, o, s, a, 8, 9, 18, 19), this.drawSegment(e, o, s, a, 10, 11, 20, 21), this.drawSegment(e, o, s, a, 12, 13, 22, 23), this.drawSegment(e, o, s, a, 16, 17, 26, 27), this.drawSegment(e, o, s, a, 18, 19, 28, 29), this.drawSegment(e, o, s, a, 20, 21, 30, 31)
            }, e.prototype.drawSegment = function(t, e, r, n, i, o, s, a) {
                var u = this.uvs
                    , l = this.vertices
                    , h = (u[s] - u[i]) * r
                    , c = (u[a] - u[o]) * n
                    , f = l[s] - l[i]
                    , d = l[a] - l[o];
                h < 1 && (h = 1), c < 1 && (c = 1), f < 1 && (f = 1), d < 1 && (d = 1), t.drawImage(e, u[i] * r, u[o] * n, h, c, l[i], l[o], f, d)
            }, e.prototype._refresh = function() {
                t.prototype._refresh.call(this);
                var e = this.uvs
                    , r = this._texture;
                this._origWidth = r.orig.width, this._origHeight = r.orig.height;
                var n = 1 / this._origWidth
                    , i = 1 / this._origHeight;
                e[0] = e[8] = e[16] = e[24] = 0, e[1] = e[3] = e[5] = e[7] = 0, e[6] = e[14] = e[22] = e[30] = 1, e[25] = e[27] = e[29] = e[31] = 1, e[2] = e[10] = e[18] = e[26] = n * this._leftWidth, e[4] = e[12] = e[20] = e[28] = 1 - n * this._rightWidth, e[9] = e[11] = e[13] = e[15] = i * this._topHeight, e[17] = e[19] = e[21] = e[23] = 1 - i * this._bottomHeight, this.updateHorizontalVertices(), this.updateVerticalVertices(), this.dirty++, this.multiplyUvs()
            }, i(e, [{
                key: "width"
                , get: function() {
                    return this._width
                }
                , set: function(t) {
                    this._width = t, this._refresh()
                }
            }, {
                key: "height"
                , get: function() {
                    return this._height
                }
                , set: function(t) {
                    this._height = t, this._refresh()
                }
            }, {
                key: "leftWidth"
                , get: function() {
                    return this._leftWidth
                }
                , set: function(t) {
                    this._leftWidth = t, this._refresh()
                }
            }, {
                key: "rightWidth"
                , get: function() {
                    return this._rightWidth
                }
                , set: function(t) {
                    this._rightWidth = t, this._refresh()
                }
            }, {
                key: "topHeight"
                , get: function() {
                    return this._topHeight
                }
                , set: function(t) {
                    this._topHeight = t, this._refresh()
                }
            }, {
                key: "bottomHeight"
                , get: function() {
                    return this._bottomHeight
                }
                , set: function(t) {
                    this._bottomHeight = t, this._refresh()
                }
            }]), e
        }(function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(88)).default);
    e.default = s
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
        function e(r, i) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var o = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, r));
            return o.points = i, o.vertices = new Float32Array(4 * i.length), o.uvs = new Float32Array(4 * i.length), o.colors = new Float32Array(2 * i.length), o.indices = new Uint16Array(2 * i.length), o.autoUpdate = !0, o.refresh(), o
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype._refresh = function() {
            var t = this.points;
            if (!(t.length < 1) && this._texture._uvs) {
                this.vertices.length / 4 !== t.length && (this.vertices = new Float32Array(4 * t.length), this.uvs = new Float32Array(4 * t.length), this.colors = new Float32Array(2 * t.length), this.indices = new Uint16Array(2 * t.length));
                var e = this.uvs
                    , r = this.indices
                    , n = this.colors;
                e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, n[0] = 1, n[1] = 1, r[0] = 0, r[1] = 1;
                for (var i = t.length, o = 1; o < i; o++) {
                    var s = 4 * o
                        , a = o / (i - 1);
                    e[s] = a, e[s + 1] = 0, e[s + 2] = a, e[s + 3] = 1, n[s = 2 * o] = 1, n[s + 1] = 1, r[s = 2 * o] = s, r[s + 1] = s + 1
                }
                this.dirty++, this.indexDirty++, this.multiplyUvs(), this.refreshVertices()
            }
        }, e.prototype.refreshVertices = function() {
            var t = this.points;
            if (!(t.length < 1))
                for (var e = t[0], r = void 0, n = 0, i = 0, o = this.vertices, s = t.length, a = 0; a < s; a++) {
                    var u = t[a]
                        , l = 4 * a;
                    i = -((r = a < t.length - 1 ? t[a + 1] : u).x - e.x), n = r.y - e.y;
                    var h = 10 * (1 - a / (s - 1));
                    h > 1 && (h = 1);
                    var c = Math.sqrt(n * n + i * i)
                        , f = this._texture.height / 2;
                    n /= c, i /= c, i *= f, o[l] = u.x + (n *= f), o[l + 1] = u.y + i, o[l + 2] = u.x - n, o[l + 3] = u.y - i, e = u
                }
        }, e.prototype.updateTransform = function() {
            this.autoUpdate && this.refreshVertices(), this.containerUpdateTransform()
        }, e
    }(function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(r(16)).default);
    e.default = i
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(186);
    Object.defineProperty(e, "ParticleContainer", {
        enumerable: !0
        , get: function() {
            return o(n).default
        }
    });
    var i = r(187);

    function o(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "ParticleRenderer", {
        enumerable: !0
        , get: function() {
            return o(i).default
        }
    })
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }()
        , o = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , s = r(3)
        , a = function(t) {
            function e() {
                var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1500
                    , i = arguments[1]
                    , s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 16384
                    , a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var u = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this));
                return s > 16384 && (s = 16384), s > r && (s = r), u._properties = [!1, !0, !1, !1, !1], u._maxSize = r, u._batchSize = s, u._glBuffers = {}, u._bufferUpdateIDs = [], u._updateID = 0, u.interactiveChildren = !1, u.blendMode = o.BLEND_MODES.NORMAL, u.autoResize = a, u.roundPixels = !0, u.baseTexture = null, u.setProperties(i), u._tint = 0, u.tintRgb = new Float32Array(4), u.tint = 16777215, u
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.setProperties = function(t) {
                t && (this._properties[0] = "vertices" in t || "scale" in t ? !!t.vertices || !!t.scale : this._properties[0], this._properties[1] = "position" in t ? !!t.position : this._properties[1], this._properties[2] = "rotation" in t ? !!t.rotation : this._properties[2], this._properties[3] = "uvs" in t ? !!t.uvs : this._properties[3], this._properties[4] = "tint" in t || "alpha" in t ? !!t.tint || !!t.alpha : this._properties[4])
            }, e.prototype.updateTransform = function() {
                this.displayObjectUpdateTransform()
            }, e.prototype.renderWebGL = function(t) {
                var e = this;
                this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.hasLoaded || this.baseTexture.once("update", function() {
                    return e.onChildrenChange(0)
                })), t.setObjectRenderer(t.plugins.particle), t.plugins.particle.render(this))
            }, e.prototype.onChildrenChange = function(t) {
                for (var e = Math.floor(t / this._batchSize); this._bufferUpdateIDs.length < e;) this._bufferUpdateIDs.push(0);
                this._bufferUpdateIDs[e] = ++this._updateID
            }, e.prototype.renderCanvas = function(t) {
                if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
                    var e = t.context
                        , r = this.worldTransform
                        , n = !0
                        , i = 0
                        , o = 0
                        , s = 0
                        , a = 0;
                    t.setBlendMode(this.blendMode), e.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();
                    for (var u = 0; u < this.children.length; ++u) {
                        var l = this.children[u];
                        if (l.visible) {
                            var h = l._texture.frame;
                            if (e.globalAlpha = this.worldAlpha * l.alpha, l.rotation % (2 * Math.PI) == 0) n && (e.setTransform(r.a, r.b, r.c, r.d, r.tx * t.resolution, r.ty * t.resolution), n = !1), i = l.anchor.x * (-h.width * l.scale.x) + l.position.x + .5, o = l.anchor.y * (-h.height * l.scale.y) + l.position.y + .5, s = h.width * l.scale.x, a = h.height * l.scale.y;
                            else {
                                n || (n = !0), l.displayObjectUpdateTransform();
                                var c = l.worldTransform;
                                t.roundPixels ? e.setTransform(c.a, c.b, c.c, c.d, c.tx * t.resolution | 0, c.ty * t.resolution | 0) : e.setTransform(c.a, c.b, c.c, c.d, c.tx * t.resolution, c.ty * t.resolution), i = l.anchor.x * -h.width + .5, o = l.anchor.y * -h.height + .5, s = h.width, a = h.height
                            }
                            var f = l._texture.baseTexture.resolution;
                            e.drawImage(l._texture.baseTexture.source, h.x * f, h.y * f, h.width * f, h.height * f, i * t.resolution, o * t.resolution, s * t.resolution, a * t.resolution)
                        }
                    }
                }
            }, e.prototype.destroy = function(e) {
                if (t.prototype.destroy.call(this, e), this._buffers)
                    for (var r = 0; r < this._buffers.length; ++r) this._buffers[r].destroy();
                this._properties = null, this._buffers = null, this._bufferUpdateIDs = null
            }, i(e, [{
                key: "tint"
                , get: function() {
                    return this._tint
                }
                , set: function(t) {
                    this._tint = t, (0, s.hex2rgb)(t, this.tintRgb)
                }
            }]), e
        }(o.Container);
    e.default = a
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , o = u(r(188))
        , s = u(r(189))
        , a = r(3);

    function u(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var l = function(t) {
        function e(r) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, e);
            var o = function(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" !== n(e) && "function" != typeof e ? t : e
            }(this, t.call(this, r));
            return o.shader = null, o.indexBuffer = null, o.properties = null, o.tempMatrix = new i.Matrix, o.CONTEXT_UID = 0, o
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e.prototype.onContextChange = function() {
            var t = this.renderer.gl;
            this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.shader = new o.default(t), this.properties = [{
                attribute: this.shader.attributes.aVertexPosition
                , size: 2
                , uploadFunction: this.uploadVertices
                , offset: 0
            }, {
                attribute: this.shader.attributes.aPositionCoord
                , size: 2
                , uploadFunction: this.uploadPosition
                , offset: 0
            }, {
                attribute: this.shader.attributes.aRotation
                , size: 1
                , uploadFunction: this.uploadRotation
                , offset: 0
            }, {
                attribute: this.shader.attributes.aTextureCoord
                , size: 2
                , uploadFunction: this.uploadUvs
                , offset: 0
            }, {
                attribute: this.shader.attributes.aColor
                , size: 1
                , unsignedByte: !0
                , uploadFunction: this.uploadTint
                , offset: 0
            }]
        }, e.prototype.start = function() {
            this.renderer.bindShader(this.shader)
        }, e.prototype.render = function(t) {
            var e = t.children
                , r = t._maxSize
                , n = t._batchSize
                , o = this.renderer
                , s = e.length;
            if (0 !== s) {
                s > r && (s = r);
                var a = t._glBuffers[o.CONTEXT_UID];
                a || (a = t._glBuffers[o.CONTEXT_UID] = this.generateBuffers(t));
                var u = e[0]._texture.baseTexture;
                this.renderer.setBlendMode(i.utils.correctBlendMode(t.blendMode, u.premultipliedAlpha));
                var l = o.gl
                    , h = t.worldTransform.copy(this.tempMatrix);
                h.prepend(o._activeRenderTarget.projectionMatrix), this.shader.uniforms.projectionMatrix = h.toArray(!0), this.shader.uniforms.uColor = i.utils.premultiplyRgba(t.tintRgb, t.worldAlpha, this.shader.uniforms.uColor, u.premultipliedAlpha), this.shader.uniforms.uSampler = o.bindTexture(u);
                for (var c = !1, f = 0, d = 0; f < s; f += n, d += 1) {
                    var p = s - f;
                    if (p > n && (p = n), d >= a.length) {
                        if (!t.autoResize) break;
                        a.push(this._generateOneMoreBuffer(t))
                    }
                    var _ = a[d];
                    _.uploadDynamic(e, f, p), (c = c || _._updateID < (t._bufferUpdateIDs[d] || 0)) && (_._updateID = t._updateID, _.uploadStatic(e, f, p)), o.bindVao(_.vao), _.vao.draw(l.TRIANGLES, 6 * p)
                }
            }
        }, e.prototype.generateBuffers = function(t) {
            for (var e = this.renderer.gl, r = [], n = t._maxSize, i = t._batchSize, o = t._properties, a = 0; a < n; a += i) r.push(new s.default(e, this.properties, o, i));
            return r
        }, e.prototype._generateOneMoreBuffer = function(t) {
            return new s.default(this.renderer.gl, this.properties, t._properties, t._batchSize)
        }, e.prototype.uploadVertices = function(t, e, r, n, i, o) {
            for (var s = 0, a = 0, u = 0, l = 0, h = 0; h < r; ++h) {
                var c = t[e + h]
                    , f = c._texture
                    , d = c.scale.x
                    , p = c.scale.y
                    , _ = f.trim
                    , y = f.orig;
                _ ? (s = (a = _.x - c.anchor.x * y.width) + _.width, u = (l = _.y - c.anchor.y * y.height) + _.height) : (s = y.width * (1 - c.anchor.x), a = y.width * -c.anchor.x, u = y.height * (1 - c.anchor.y), l = y.height * -c.anchor.y), n[o] = a * d, n[o + 1] = l * p, n[o + i] = s * d, n[o + i + 1] = l * p, n[o + 2 * i] = s * d, n[o + 2 * i + 1] = u * p, n[o + 3 * i] = a * d, n[o + 3 * i + 1] = u * p, o += 4 * i
            }
        }, e.prototype.uploadPosition = function(t, e, r, n, i, o) {
            for (var s = 0; s < r; s++) {
                var a = t[e + s].position;
                n[o] = a.x, n[o + 1] = a.y, n[o + i] = a.x, n[o + i + 1] = a.y, n[o + 2 * i] = a.x, n[o + 2 * i + 1] = a.y, n[o + 3 * i] = a.x, n[o + 3 * i + 1] = a.y, o += 4 * i
            }
        }, e.prototype.uploadRotation = function(t, e, r, n, i, o) {
            for (var s = 0; s < r; s++) {
                var a = t[e + s].rotation;
                n[o] = a, n[o + i] = a, n[o + 2 * i] = a, n[o + 3 * i] = a, o += 4 * i
            }
        }, e.prototype.uploadUvs = function(t, e, r, n, i, o) {
            for (var s = 0; s < r; ++s) {
                var a = t[e + s]._texture._uvs;
                a ? (n[o] = a.x0, n[o + 1] = a.y0, n[o + i] = a.x1, n[o + i + 1] = a.y1, n[o + 2 * i] = a.x2, n[o + 2 * i + 1] = a.y2, n[o + 3 * i] = a.x3, n[o + 3 * i + 1] = a.y3, o += 4 * i) : (n[o] = 0, n[o + 1] = 0, n[o + i] = 0, n[o + i + 1] = 0, n[o + 2 * i] = 0, n[o + 2 * i + 1] = 0, n[o + 3 * i] = 0, n[o + 3 * i + 1] = 0, o += 4 * i)
            }
        }, e.prototype.uploadTint = function(t, e, r, n, i, o) {
            for (var s = 0; s < r; ++s) {
                var u = t[e + s]
                    , l = u.alpha
                    , h = l < 1 && u._texture.baseTexture.premultipliedAlpha ? (0, a.premultiplyTint)(u._tintRGB, l) : u._tintRGB + (255 * l << 24);
                n[o] = h, n[o + i] = h, n[o + 2 * i] = h, n[o + 3 * i] = h, o += 4 * i
            }
        }, e.prototype.destroy = function() {
            this.renderer.gl && this.renderer.gl.deleteBuffer(this.indexBuffer), t.prototype.destroy.call(this), this.shader.destroy(), this.indices = null, this.tempMatrix = null
        }, e
    }(i.ObjectRenderer);
    e.default = l, i.WebGLRenderer.registerPlugin("particle", l)
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
        function e(r) {
            return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
                , function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "attribute vec2 aPositionCoord;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "uniform vec4 uColor;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   vec2 v = vec2(x, y);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor * uColor;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor;", "  gl_FragColor = color;", "}"].join("\n")))
        }
        return function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t
                    , enumerable: !1
                    , writable: !0
                    , configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }(e, t), e
    }(function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(r(14)).default);
    e.default = i
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = o(r(6))
        , i = o(r(35));

    function o(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var s = function() {
        function t(e, r, n, i) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.gl = e, this.size = i, this.dynamicProperties = [], this.staticProperties = [];
            for (var o = 0; o < r.length; ++o) {
                var s = r[o];
                s = {
                    attribute: s.attribute
                    , size: s.size
                    , uploadFunction: s.uploadFunction
                    , unsignedByte: s.unsignedByte
                    , offset: s.offset
                }, n[o] ? this.dynamicProperties.push(s) : this.staticProperties.push(s)
            }
            this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this._updateID = 0, this.initBuffers()
        }
        return t.prototype.initBuffers = function() {
            var t = this.gl
                , e = 0;
            this.indices = (0, i.default)(this.size), this.indexBuffer = n.default.GLBuffer.createIndexBuffer(t, this.indices, t.STATIC_DRAW), this.dynamicStride = 0;
            for (var r = 0; r < this.dynamicProperties.length; ++r) {
                var o = this.dynamicProperties[r];
                o.offset = e, e += o.size, this.dynamicStride += o.size
            }
            var s = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
            this.dynamicData = new Float32Array(s), this.dynamicDataUint32 = new Uint32Array(s), this.dynamicBuffer = n.default.GLBuffer.createVertexBuffer(t, s, t.STREAM_DRAW);
            var a = 0;
            this.staticStride = 0;
            for (var u = 0; u < this.staticProperties.length; ++u) {
                var l = this.staticProperties[u];
                l.offset = a, a += l.size, this.staticStride += l.size
            }
            var h = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
            this.staticData = new Float32Array(h), this.staticDataUint32 = new Uint32Array(h), this.staticBuffer = n.default.GLBuffer.createVertexBuffer(t, h, t.STATIC_DRAW), this.vao = new n.default.VertexArrayObject(t).addIndex(this.indexBuffer);
            for (var c = 0; c < this.dynamicProperties.length; ++c) {
                var f = this.dynamicProperties[c];
                f.unsignedByte ? this.vao.addAttribute(this.dynamicBuffer, f.attribute, t.UNSIGNED_BYTE, !0, 4 * this.dynamicStride, 4 * f.offset) : this.vao.addAttribute(this.dynamicBuffer, f.attribute, t.FLOAT, !1, 4 * this.dynamicStride, 4 * f.offset)
            }
            for (var d = 0; d < this.staticProperties.length; ++d) {
                var p = this.staticProperties[d];
                p.unsignedByte ? this.vao.addAttribute(this.staticBuffer, p.attribute, t.UNSIGNED_BYTE, !0, 4 * this.staticStride, 4 * p.offset) : this.vao.addAttribute(this.staticBuffer, p.attribute, t.FLOAT, !1, 4 * this.staticStride, 4 * p.offset)
            }
        }, t.prototype.uploadDynamic = function(t, e, r) {
            for (var n = 0; n < this.dynamicProperties.length; n++) {
                var i = this.dynamicProperties[n];
                i.uploadFunction(t, e, r, i.unsignedByte ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, i.offset)
            }
            this.dynamicBuffer.upload()
        }, t.prototype.uploadStatic = function(t, e, r) {
            for (var n = 0; n < this.staticProperties.length; n++) {
                var i = this.staticProperties[n];
                i.uploadFunction(t, e, r, i.unsignedByte ? this.staticDataUint32 : this.staticData, this.staticStride, i.offset)
            }
            this.staticBuffer.upload()
        }, t.prototype.destroy = function() {
            this.dynamicProperties = null, this.dynamicBuffer.destroy(), this.dynamicBuffer = null, this.dynamicData = null, this.dynamicDataUint32 = null, this.staticProperties = null, this.staticBuffer.destroy(), this.staticBuffer = null, this.staticData = null, this.staticDataUint32 = null
        }, t
    }();
    e.default = s
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = r(191);
    Object.defineProperty(e, "webgl", {
        enumerable: !0
        , get: function() {
            return u(n).default
        }
    });
    var i = r(192);
    Object.defineProperty(e, "canvas", {
        enumerable: !0
        , get: function() {
            return u(i).default
        }
    });
    var o = r(37);
    Object.defineProperty(e, "BasePrepare", {
        enumerable: !0
        , get: function() {
            return u(o).default
        }
    });
    var s = r(89);
    Object.defineProperty(e, "CountLimiter", {
        enumerable: !0
        , get: function() {
            return u(s).default
        }
    });
    var a = r(193);

    function u(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "TimeLimiter", {
        enumerable: !0
        , get: function() {
            return u(a).default
        }
    })
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , o = function(t) {
            function e(r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r));
                return i.uploadHookHelper = i.renderer, i.registerFindHook(u), i.registerUploadHook(s), i.registerUploadHook(a), i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e
        }(function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(37)).default);

    function s(t, e) {
        return e instanceof i.BaseTexture && (e._glTextures[t.CONTEXT_UID] || t.textureManager.updateTexture(e), !0)
    }

    function a(t, e) {
        return e instanceof i.Graphics && ((e.dirty || e.clearDirty || !e._webGL[t.plugins.graphics.CONTEXT_UID]) && t.plugins.graphics.updateGraphics(e), !0)
    }

    function u(t, e) {
        return t instanceof i.Graphics && (e.push(t), !0)
    }
    e.default = o, i.WebGLRenderer.registerPlugin("prepare", o)
}, function(t, e, r) {
    "use strict";

    function n(t) {
        return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    e.__esModule = !0;
    var i = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e.default = t, e
        }(r(2))
        , o = 16
        , s = function(t) {
            function e(r) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var i = function(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== n(e) && "function" != typeof e ? t : e
                }(this, t.call(this, r));
                return i.uploadHookHelper = i, i.canvas = document.createElement("canvas"), i.canvas.width = o, i.canvas.height = o, i.ctx = i.canvas.getContext("2d"), i.registerUploadHook(a), i
            }
            return function(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + n(e));
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t
                        , enumerable: !1
                        , writable: !0
                        , configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }(e, t), e.prototype.destroy = function() {
                t.prototype.destroy.call(this), this.ctx = null, this.canvas = null
            }, e
        }(function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(r(37)).default);

    function a(t, e) {
        if (e instanceof i.BaseTexture) {
            var r = e.source
                , n = 0 === r.width ? t.canvas.width : Math.min(t.canvas.width, r.width)
                , o = 0 === r.height ? t.canvas.height : Math.min(t.canvas.height, r.height);
            return t.ctx.drawImage(r, 0, 0, n, o, 0, 0, t.canvas.width, t.canvas.height), !0
        }
        return !1
    }
    e.default = s, i.CanvasRenderer.registerPlugin("prepare", s)
}, function(t, e, r) {
    "use strict";
    e.__esModule = !0;
    var n = function() {
        function t(e) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.maxMilliseconds = e, this.frameStart = 0
        }
        return t.prototype.beginFrame = function() {
            this.frameStart = Date.now()
        }, t.prototype.allowedToUpload = function() {
            return Date.now() - this.frameStart < this.maxMilliseconds
        }, t
    }();
    e.default = n
}, function(t, e) {
    t.exports = function(t) {
        if (!t.webpackPolyfill) {
            var e = Object.create(t);
            e.children || (e.children = []), Object.defineProperty(e, "loaded", {
                enumerable: !0
                , get: function() {
                    return e.l
                }
            }), Object.defineProperty(e, "id", {
                enumerable: !0
                , get: function() {
                    return e.i
                }
            }), Object.defineProperty(e, "exports", {
                enumerable: !0
            }), e.webpackPolyfill = 1
        }
        return e
    }
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "TimelineLite", function() {
        return i
    }), r.d(e, "default", function() {
        return i
    });
    var n = r(0);
    n._gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function() {
        var t = function(t) {
                n.SimpleTimeline.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                var e, r, i = this.vars;
                for (r in i) o(e = i[r]) && -1 !== e.join("").indexOf("{self}") && (i[r] = this._swapSelfInParams(e));
                o(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger)
            }
            , e = n.default._internals
            , r = t._internals = {}
            , i = e.isSelector
            , o = e.isArray
            , s = e.lazyTweens
            , a = e.lazyRender
            , u = n._gsScope._gsDefine.globals
            , l = function(t) {
                var e, r = {};
                for (e in t) r[e] = t[e];
                return r
            }
            , h = function(t, e, r) {
                var n, i, o = t.cycle;
                for (n in o) t[n] = "function" == typeof(i = o[n]) ? i(r, e[r]) : i[r % i.length];
                delete t.cycle
            }
            , c = r.pauseCallback = function() {}
            , f = function(t) {
                var e, r = []
                    , n = t.length;
                for (e = 0; e !== n; r.push(t[e++]));
                return r
            }
            , d = t.prototype = new n.SimpleTimeline;
        return t.version = "2.0.2", d.constructor = t, d.kill()._gc = d._forcingPlayhead = d._hasPause = !1, d.to = function(t, e, r, i) {
            return e ? this.add(new(r.repeat && u.TweenMax || n.default)(t, e, r), i) : this.set(t, r, i)
        }, d.from = function(t, e, r, i) {
            return this.add((r.repeat && u.TweenMax || n.default).from(t, e, r), i)
        }, d.fromTo = function(t, e, r, i, o) {
            return e ? this.add((i.repeat && u.TweenMax || n.default).fromTo(t, e, r, i), o) : this.set(t, i, o)
        }, d.staggerTo = function(e, r, o, s, a, u, c, d) {
            var p, _, y = new t({
                    onComplete: u
                    , onCompleteParams: c
                    , callbackScope: d
                    , smoothChildTiming: this.smoothChildTiming
                })
                , m = o.cycle;
            for ("string" == typeof e && (e = n.default.selector(e) || e), i(e = e || []) && (e = f(e)), (s = s || 0) < 0 && ((e = f(e)).reverse(), s *= -1), _ = 0; _ < e.length; _++)(p = l(o)).startAt && (p.startAt = l(p.startAt), p.startAt.cycle && h(p.startAt, e, _)), m && (h(p, e, _), null != p.duration && (r = p.duration, delete p.duration)), y.to(e[_], r, p, _ * s);
            return this.add(y, a)
        }, d.staggerFrom = function(t, e, r, n, i, o, s, a) {
            return r.immediateRender = 0 != r.immediateRender, r.runBackwards = !0, this.staggerTo(t, e, r, n, i, o, s, a)
        }, d.staggerFromTo = function(t, e, r, n, i, o, s, a, u) {
            return n.startAt = r, n.immediateRender = 0 != n.immediateRender && 0 != r.immediateRender, this.staggerTo(t, e, n, i, o, s, a, u)
        }, d.call = function(t, e, r, i) {
            return this.add(n.default.delayedCall(0, t, e, r), i)
        }, d.set = function(t, e, r) {
            return r = this._parseTimeOrLabel(r, 0, !0), null == e.immediateRender && (e.immediateRender = r === this._time && !this._paused), this.add(new n.default(t, 0, e), r)
        }, t.exportRoot = function(e, r) {
            null == (e = e || {}).smoothChildTiming && (e.smoothChildTiming = !0);
            var i, o, s, a, u = new t(e)
                , l = u._timeline;
            for (null == r && (r = !0), l._remove(u, !0), u._startTime = 0, u._rawPrevTime = u._time = u._totalTime = l._time, s = l._first; s;) a = s._next, r && s instanceof n.default && s.target === s.vars.onComplete || ((o = s._startTime - s._delay) < 0 && (i = 1), u.add(s, o)), s = a;
            return l.add(u, 0), i && u.totalDuration(), u
        }, d.add = function(e, r, i, s) {
            var a, u, l, h, c, f;
            if ("number" != typeof r && (r = this._parseTimeOrLabel(r, 0, !0, e)), !(e instanceof n.Animation)) {
                if (e instanceof Array || e && e.push && o(e)) {
                    for (i = i || "normal", s = s || 0, a = r, u = e.length, l = 0; l < u; l++) o(h = e[l]) && (h = new t({
                        tweens: h
                    })), this.add(h, a), "string" != typeof h && "function" != typeof h && ("sequence" === i ? a = h._startTime + h.totalDuration() / h._timeScale : "start" === i && (h._startTime -= h.delay())), a += s;
                    return this._uncache(!0)
                }
                if ("string" == typeof e) return this.addLabel(e, r);
                if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                e = n.default.delayedCall(0, e)
            }
            if (n.SimpleTimeline.prototype.add.call(this, e, r), e._time && (a = Math.max(0, Math.min(e.totalDuration(), (this.rawTime() - e._startTime) * e._timeScale)), Math.abs(a - e._totalTime) > 1e-5 && e.render(a, !1, !1)), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (f = (c = this).rawTime() > e._startTime; c._timeline;) f && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1), c = c._timeline;
            return this
        }, d.remove = function(t) {
            if (t instanceof n.Animation) {
                this._remove(t, !1);
                var e = t._timeline = t.vars.useFrames ? n.Animation._rootFramesTimeline : n.Animation._rootTimeline;
                return t._startTime = (t._paused ? t._pauseTime : e._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale, this
            }
            if (t instanceof Array || t && t.push && o(t)) {
                for (var r = t.length; --r > -1;) this.remove(t[r]);
                return this
            }
            return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
        }, d._remove = function(t, e) {
            return n.SimpleTimeline.prototype._remove.call(this, t, e), this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, d.append = function(t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }, d.insert = d.insertMultiple = function(t, e, r, n) {
            return this.add(t, e || 0, r, n)
        }, d.appendMultiple = function(t, e, r, n) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), r, n)
        }, d.addLabel = function(t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this
        }, d.addPause = function(t, e, r, i) {
            var o = n.default.delayedCall(0, c, r, i || this);
            return o.vars.onComplete = o.vars.onReverseComplete = e, o.data = "isPause", this._hasPause = !0, this.add(o, t)
        }, d.removeLabel = function(t) {
            return delete this._labels[t], this
        }, d.getLabelTime = function(t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }, d._parseTimeOrLabel = function(t, e, r, i) {
            var s, a;
            if (i instanceof n.Animation && i.timeline === this) this.remove(i);
            else if (i && (i instanceof Array || i.push && o(i)))
                for (a = i.length; --a > -1;) i[a] instanceof n.Animation && i[a].timeline === this && this.remove(i[a]);
            if (s = "number" != typeof t || e ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof e) return this._parseTimeOrLabel(e, r && "number" == typeof t && null == this._labels[e] ? t - s : 0, r);
            if (e = e || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = s);
            else {
                if (-1 === (a = t.indexOf("="))) return null == this._labels[t] ? r ? this._labels[t] = s + e : e : this._labels[t] + e;
                e = parseInt(t.charAt(a - 1) + "1", 10) * Number(t.substr(a + 1)), t = a > 1 ? this._parseTimeOrLabel(t.substr(0, a - 1), 0, r) : s
            }
            return Number(t) + e
        }, d.seek = function(t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
        }, d.stop = function() {
            return this.paused(!0)
        }, d.gotoAndPlay = function(t, e) {
            return this.play(t, e)
        }, d.gotoAndStop = function(t, e) {
            return this.pause(t, e)
        }, d.render = function(t, e, r) {
            this._gc && this._enabled(!0, !1);
            var n, i, o, u, l, h, c, f = this._time
                , d = this._dirty ? this.totalDuration() : this._totalDuration
                , p = this._startTime
                , _ = this._timeScale
                , y = this._paused;
            if (f !== this._time && (t += this._time - f), t >= d - 1e-7 && t >= 0) this._totalTime = this._time = d, this._reversed || this._hasPausedChild() || (i = !0, u = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || this._rawPrevTime < 0 || 1e-10 === this._rawPrevTime) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > 1e-10 && (u = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : 1e-10, t = d + 1e-4;
            else if (t < 1e-7)
                if (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && 1e-10 !== this._rawPrevTime && (this._rawPrevTime > 0 || t < 0 && this._rawPrevTime >= 0)) && (u = "onReverseComplete", i = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = i = !0, u = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : 1e-10, 0 === t && i)
                        for (n = this._first; n && 0 === n._startTime;) n._duration || (i = !1), n = n._next;
                    t = 0, this._initted || (l = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if (t >= f)
                        for (n = this._first; n && n._startTime <= t && !h;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (h = n), n = n._next;
                    else
                        for (n = this._last; n && n._startTime >= t && !h;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (h = n), n = n._prev;
                    h && (this._time = t = h._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = t
            }
            if (this._time !== f && this._first || r || l || h) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), (c = this._time) >= f)
                    for (n = this._first; n && (o = n._next, c === this._time && (!this._paused || y));)(n._active || n._startTime <= c && !n._paused && !n._gc) && (h === n && this.pause(), n.render(n._reversed ? (n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale : (t - n._startTime) * n._timeScale, e, r)), n = o;
                else
                    for (n = this._last; n && (o = n._prev, c === this._time && (!this._paused || y));) {
                        if (n._active || n._startTime <= f && !n._paused && !n._gc) {
                            if (h === n) {
                                for (h = n._prev; h && h.endTime() > this._time;) h.render(h._reversed ? h.totalDuration() - (t - h._startTime) * h._timeScale : (t - h._startTime) * h._timeScale, e, r), h = h._prev;
                                h = null, this.pause()
                            }
                            n.render(n._reversed ? (n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale : (t - n._startTime) * n._timeScale, e, r)
                        }
                        n = o
                    }
                this._onUpdate && (e || (s.length && a(), this._callback("onUpdate"))), u && (this._gc || p !== this._startTime && _ === this._timeScale || (0 === this._time || d >= this.totalDuration()) && (i && (s.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[u] && this._callback(u)))
            }
        }, d._hasPausedChild = function() {
            for (var e = this._first; e;) {
                if (e._paused || e instanceof t && e._hasPausedChild()) return !0;
                e = e._next
            }
            return !1
        }, d.getChildren = function(t, e, r, i) {
            i = i || -9999999999;
            for (var o = [], s = this._first, a = 0; s;) s._startTime < i || (s instanceof n.default ? !1 !== e && (o[a++] = s) : (!1 !== r && (o[a++] = s), !1 !== t && (a = (o = o.concat(s.getChildren(!0, e, r))).length))), s = s._next;
            return o
        }, d.getTweensOf = function(t, e) {
            var r, i, o = this._gc
                , s = []
                , a = 0;
            for (o && this._enabled(!0, !0), i = (r = n.default.getTweensOf(t)).length; --i > -1;)(r[i].timeline === this || e && this._contains(r[i])) && (s[a++] = r[i]);
            return o && this._enabled(!1, !0), s
        }, d.recent = function() {
            return this._recent
        }, d._contains = function(t) {
            for (var e = t.timeline; e;) {
                if (e === this) return !0;
                e = e.timeline
            }
            return !1
        }, d.shiftChildren = function(t, e, r) {
            r = r || 0;
            for (var n, i = this._first, o = this._labels; i;) i._startTime >= r && (i._startTime += t), i = i._next;
            if (e)
                for (n in o) o[n] >= r && (o[n] += t);
            return this._uncache(!0)
        }, d._kill = function(t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (var r = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = r.length, i = !1; --n > -1;) r[n]._kill(t, e) && (i = !0);
            return i
        }, d.clear = function(t) {
            var e = this.getChildren(!1, !0, !0)
                , r = e.length;
            for (this._time = this._totalTime = 0; --r > -1;) e[r]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}), this._uncache(!0)
        }, d.invalidate = function() {
            for (var t = this._first; t;) t.invalidate(), t = t._next;
            return n.Animation.prototype.invalidate.call(this)
        }, d._enabled = function(t, e) {
            if (t === this._gc)
                for (var r = this._first; r;) r._enabled(t, !0), r = r._next;
            return n.SimpleTimeline.prototype._enabled.call(this, t, e)
        }, d.totalTime = function(t, e, r) {
            this._forcingPlayhead = !0;
            var i = n.Animation.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, i
        }, d.duration = function(t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
        }, d.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, r, n = 0, i = this._last, o = 999999999999; i;) e = i._prev, i._dirty && i.totalDuration(), i._startTime > o && this._sortChildren && !i._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(i, i._startTime - i._delay), this._calculatingDuration = 0) : o = i._startTime, i._startTime < 0 && !i._paused && (n -= i._startTime, this._timeline.smoothChildTiming && (this._startTime += i._startTime / this._timeScale, this._time -= i._startTime, this._totalTime -= i._startTime, this._rawPrevTime -= i._startTime), this.shiftChildren(-i._startTime, !1, -9999999999), o = 0), (r = i._startTime + i._totalDuration / i._timeScale) > n && (n = r), i = e;
                    this._duration = this._totalDuration = n, this._dirty = !1
                }
                return this._totalDuration
            }
            return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
        }, d.paused = function(t) {
            if (!t)
                for (var e = this._first, r = this._time; e;) e._startTime === r && "isPause" === e.data && (e._rawPrevTime = 0), e = e._next;
            return n.Animation.prototype.paused.apply(this, arguments)
        }, d.usesFrames = function() {
            for (var t = this._timeline; t._timeline;) t = t._timeline;
            return t === n.Animation._rootFramesTimeline
        }, d.rawTime = function(t) {
            return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
        }, t
    }, !0);
    var i = n.globals.TimelineLite
}, function(t, e, r) {
    "use strict";
    r.r(e), r.d(e, "Back", function() {
        return i
    }), r.d(e, "Elastic", function() {
        return o
    }), r.d(e, "Bounce", function() {
        return s
    }), r.d(e, "RoughEase", function() {
        return a
    }), r.d(e, "SlowMo", function() {
        return u
    }), r.d(e, "SteppedEase", function() {
        return l
    }), r.d(e, "Circ", function() {
        return h
    }), r.d(e, "Expo", function() {
        return c
    }), r.d(e, "Sine", function() {
        return f
    }), r.d(e, "ExpoScaleEase", function() {
        return d
    });
    var n = r(0);
    r.d(e, "Linear", function() {
        return n.Linear
    }), r.d(e, "Power0", function() {
        return n.Power0
    }), r.d(e, "Power1", function() {
        return n.Power1
    }), r.d(e, "Power2", function() {
        return n.Power2
    }), r.d(e, "Power3", function() {
        return n.Power3
    }), r.d(e, "Power4", function() {
        return n.Power4
    }), n._gsScope._gsDefine("easing.Back", ["easing.Ease"], function() {
        var t, e, r, i, o = n._gsScope.GreenSockGlobals || n._gsScope
            , s = 2 * Math.PI
            , a = Math.PI / 2
            , u = o.com.greensock._class
            , l = function(t, e) {
                var r = u("easing." + t, function() {}, !0)
                    , i = r.prototype = new n.Ease;
                return i.constructor = r, i.getRatio = e, r
            }
            , h = n.Ease.register || function() {}
            , c = function(t, e, r, n, i) {
                var o = u("easing." + t, {
                    easeOut: new e
                    , easeIn: new r
                    , easeInOut: new n
                }, !0);
                return h(o, t), o
            }
            , f = function(t, e, r) {
                this.t = t, this.v = e, r && (this.next = r, r.prev = this, this.c = r.v - e, this.gap = r.t - t)
            }
            , d = function(t, e) {
                var r = u("easing." + t, function(t) {
                        this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                    }, !0)
                    , i = r.prototype = new n.Ease;
                return i.constructor = r, i.getRatio = e, i.config = function(t) {
                    return new r(t)
                }, r
            }
            , p = c("Back", d("BackOut", function(t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            }), d("BackIn", function(t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            }), d("BackInOut", function(t) {
                return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            }))
            , _ = u("easing.SlowMo", function(t, e, r) {
                e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === r
            }, !0)
            , y = _.prototype = new n.Ease;
        return y.constructor = _, y.getRatio = function(t) {
            var e = t + (.5 - t) * this._p;
            return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 === t ? 0 : 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }, _.ease = new _(.7, .7), y.config = _.config = function(t, e, r) {
            return new _(t, e, r)
        }, (y = (t = u("easing.SteppedEase", function(t, e) {
            this._p1 = 1 / (t = t || 1), this._p2 = t + (e ? 0 : 1), this._p3 = e ? 1 : 0
        }, !0)).prototype = new n.Ease).constructor = t, y.getRatio = function(t) {
            return t < 0 ? t = 0 : t >= 1 && (t = .999999999), ((this._p2 * t | 0) + this._p3) * this._p1
        }, y.config = t.config = function(e, r) {
            return new t(e, r)
        }, (y = (e = u("easing.ExpoScaleEase", function(t, e, r) {
            this._p1 = Math.log(e / t), this._p2 = e - t, this._p3 = t, this._ease = r
        }, !0)).prototype = new n.Ease).constructor = e, y.getRatio = function(t) {
            return this._ease && (t = this._ease.getRatio(t)), (this._p3 * Math.exp(this._p1 * t) - this._p3) / this._p2
        }, y.config = e.config = function(t, r, n) {
            return new e(t, r, n)
        }, (y = (r = u("easing.RoughEase", function(t) {
            for (var e, r, i, o, s, a, u = (t = t || {}).taper || "none", l = [], h = 0, c = 0 | (t.points || 20), d = c, p = !1 !== t.randomize, _ = !0 === t.clamp, y = t.template instanceof n.Ease ? t.template : null, m = "number" == typeof t.strength ? .4 * t.strength : .4; --d > -1;) e = p ? Math.random() : 1 / c * d, r = y ? y.getRatio(e) : e, i = "none" === u ? m : "out" === u ? (o = 1 - e) * o * m : "in" === u ? e * e * m : e < .5 ? (o = 2 * e) * o * .5 * m : (o = 2 * (1 - e)) * o * .5 * m, p ? r += Math.random() * i - .5 * i : d % 2 ? r += .5 * i : r -= .5 * i, _ && (r > 1 ? r = 1 : r < 0 && (r = 0)), l[h++] = {
                x: e
                , y: r
            };
            for (l.sort(function(t, e) {
                    return t.x - e.x
                }), a = new f(1, 1, null), d = c; --d > -1;) a = new f((s = l[d]).x, s.y, a);
            this._prev = new f(0, 0, 0 !== a.t ? a : a.next)
        }, !0)).prototype = new n.Ease).constructor = r, y.getRatio = function(t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;) e = e.next;
                e = e.prev
            } else
                for (; e.prev && t <= e.t;) e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c
        }, y.config = function(t) {
            return new r(t)
        }, r.ease = new r, c("Bounce", l("BounceOut", function(t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), l("BounceIn", function(t) {
            return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), l("BounceInOut", function(t) {
            var e = t < .5;
            return (t = e ? 1 - 2 * t : 2 * t - 1) < 1 / 2.75 ? t *= 7.5625 * t : t = t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
        })), c("Circ", l("CircOut", function(t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), l("CircIn", function(t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), l("CircInOut", function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })), c("Elastic", (i = function(t, e, r) {
            var i = u("easing." + t, function(t, e) {
                    this._p1 = t >= 1 ? t : 1, this._p2 = (e || r) / (t < 1 ? t : 1), this._p3 = this._p2 / s * (Math.asin(1 / this._p1) || 0), this._p2 = s / this._p2
                }, !0)
                , o = i.prototype = new n.Ease;
            return o.constructor = i, o.getRatio = e, o.config = function(t, e) {
                return new i(t, e)
            }, i
        })("ElasticOut", function(t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
        }, .3), i("ElasticIn", function(t) {
            return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
        }, .3), i("ElasticInOut", function(t) {
            return (t *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
        }, .45)), c("Expo", l("ExpoOut", function(t) {
            return 1 - Math.pow(2, -10 * t)
        }), l("ExpoIn", function(t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), l("ExpoInOut", function(t) {
            return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })), c("Sine", l("SineOut", function(t) {
            return Math.sin(t * a)
        }), l("SineIn", function(t) {
            return 1 - Math.cos(t * a)
        }), l("SineInOut", function(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })), u("easing.EaseLookup", {
            find: function(t) {
                return n.Ease.map[t]
            }
        }, !0), h(o.SlowMo, "SlowMo", "ease,"), h(r, "RoughEase", "ease,"), h(t, "SteppedEase", "ease,"), p
    }, !0);
    var i = n.globals.Back
        , o = n.globals.Elastic
        , s = n.globals.Bounce
        , a = n.globals.RoughEase
        , u = n.globals.SlowMo
        , l = n.globals.SteppedEase
        , h = n.globals.Circ
        , c = n.globals.Expo
        , f = n.globals.Sine
        , d = n.globals.ExpoScaleEase
}]);
var componentConfig = {
        potWidget: {
            style: {
                fontWeight: "bold"
                , fontSize: 24
                , fontFamily: "Roboto Mono"
                , color: 16777215
                , align: "left"
            }
            , format: {
                currency: slotCurrency
                , decimalMark: ","
                , thousandsSeparator: "."
            }
            , setup: {
                id: "MC_BON/1"
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
                , x: 140
                , y: 10
            }
        }
    }
    , GameComponent = function(t) {
        var e = {};

        function r(n) {
            if (e[n]) return e[n].exports;
            var i = e[n] = {
                i: n
                , l: !1
                , exports: {}
            };
            return t[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
        }
        return r.m = t, r.c = e, r.d = function(t, e, n) {
            r.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0
                , get: n
            })
        }, r.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, r.t = function(t, e) {
            if (1 & e && (t = r(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0
                    , value: t
                }), 2 & e && "string" != typeof t)
                for (var i in t) r.d(n, i, (function(e) {
                    return t[e]
                }).bind(null, i));
            return n
        }, r.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return r.d(e, "a", e), e
        }, r.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, r.p = "", r(r.s = 2)
    }([function(t, e) {
        t.exports = PIXI
    }, function(t, e) {
        t.exports = GreenSockGlobals
    }, function(t, e, r) {
        "use strict";
        r.r(e);
        var n = r(0)
            , i = function(t, e) {
                return {
                    fontFamily: t.fontFamily
                    , fontSize: t.fontSize
                    , fontWeight: t.fontWeight
                    , fill: t.color
                    , align: t.align
                    , stroke: t.stroke
                    , strokeThickness: t.strokeThickness || 0
                    , wordWrap: t.multiline || !1
                    , wordWrapWidth: e || 100
                    , lineHeight: t.lineHeight
                }
            }
            , o = {
                padLeft: function(t, e) {
                    for (var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : " ", n = String(t); n.length < e;) n = "".concat(r).concat(n);
                    return n
                }
                , padRight: function(t, e) {
                    for (var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : " ", n = String(t); n.length < e;) n = "".concat(n).concat(r);
                    return n
                }
                , padBoth: function(t, e) {
                    for (var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : " ", n = String(t), i = 0; n.length < e;) n = i % 2 ? "".concat(r).concat(n) : "".concat(n).concat(r), i += 1;
                    return n
                }
                , formatCredit: function(t, e) {
                    if (isNaN(Number(t)) || !e) return String(t);
                    var r = o.padLeft(Number(t), 3, "0")
                        , n = r.slice(0, r.length - 2)
                        , i = /(-?\d+)(\d{3})/;
                    if (e.thousandsSeparator)
                        for (; i.test(n);) n = n.replace(i, "$1".concat(e.thousandsSeparator, "$2"));
                    var s = r.slice(r.length - 2);
                    return "".concat(n).concat(e.decimalMark || "").concat(s)
                }
            }
            , s = o
            , a = r(1)
            , u = "odometerEvent.ready"
            , l = {
                hideSplashScreen: function() {
                    document.getElementById("splash-screen").style.display = "none"
                }
                , FPS: 60
                , MAX_MOBILE_TEXTURE_SIZE: 2048
                , MAX_DESKTOP_TEXTURE_SIZE: 8192
                , MIN_RATIO_ADJUSTMENT: .8484
                , _cache: {
                    ratioAdjustment: 0
                    , routeReady: !0
                }
                , requestFullscreen: function() {
                    var t = document.getElementById("game-container");
                    t.requestFullscreen ? t.requestFullscreen() : t.msRequestFullscreen ? t.msRequestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen && t.webkitRequestFullscreen()
                }
                , exitFullscreen: function() {
                    document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
                }
                , hasFullscreenSupport: function() {
                    var t = /Android ([0-9]+)\./.exec(navigator.userAgent)
                        , e = /Chrome\/([0-9]+)\./.exec(navigator.userAgent);
                    return !(!(document.body.requestFullscreen || document.body.msRequestFullscreen || document.body.mozRequestFullScreen || document.body.webkitRequestFullscreen) || t && t[1] < 5 && e && e[1] <= 38)
                }
                , isIPad: function() {
                    return navigator.userAgent.indexOf("iPad") > -1
                }
                , isIPhone: function() {
                    return navigator.userAgent.indexOf("iPhone") > -1
                }
                , isIOS: function() {
                    return l.isIPad() || l.isIPhone()
                }
                , isIE11: function() {
                    return !!window.MSInputMethodContext && !!document.documentMode
                }
                , reload: function() {
                    location.reload()
                }
                , isBigScreen: function() {
                    var t = 864
                        , e = screen.deviceXDPI / screen.logicalXDPI;
                    return e && (t /= e), screen.width >= t && screen.height >= t
                }
                , isFullscreen: function() {
                    return screen.height === window.innerHeight && screen.width === window.innerWidth
                }
                , isOptimalBrowser: function() {
                    var t = /Chrome\/([0-9]+)\./.exec(navigator.userAgent) || /CriOS\/([0-9]+)\./.exec(navigator.userAgent);
                    return t && t[1] > 39
                }
                , getRatioAdjustment: function(t) {
                    var e = t.width
                        , r = t.height;
                    if (!l._cache.ratioAdjustment) {
                        var n = l._calculateRatio(screen.width, screen.height)
                            , i = l._calculateTaskbarDependentRatio()
                            , o = l._calculateRatio(screen.availWidth, screen.availHeight)
                            , s = l.isIPad() ? i : o
                            , a = l.hasFullscreenSupport() ? n : s;
                        l._cache.ratioAdjustment = a / (e / r)
                    }
                    return l._cache.ratioAdjustment
                }
                , isNarrowScreen: function(t) {
                    return l.getCappedRatioAdjustment({
                        width: t.width
                        , height: t.height
                    }) < t.adjustment.narrowScreenThreshold
                }
                , getCappedRatioAdjustment: function(t) {
                    return Math.max(l.getRatioAdjustment({
                        width: t.width
                        , height: t.height
                    }), l.MIN_RATIO_ADJUSTMENT)
                }
                , _calculateRatio: function(t, e) {
                    return Math.max(t / e, e / t)
                }
                , _calculateTaskbarDependentRatio: function() {
                    var t = l._calculateTaskbarHeight()
                        , e = Math.min(screen.width, screen.height)
                        , r = Math.max(screen.width, screen.height);
                    return this._calculateRatio(r, e - t)
                }
                , _calculateTaskbarHeight: function() {
                    return screen.height === window.innerWidth ? screen.width - window.innerHeight : screen.width === window.innerWidth ? screen.height - window.innerHeight : Math.min(screen.width, screen.height) - Math.min(window.innerWidth, window.innerHeight)
                }
                , requiresScrolling: function() {
                    var t = document.body
                        , e = document.documentElement;
                    return Math.max(t.scrollHeight, t.offsetHeight, e.clientHeight, e.scrollHeight, e.offsetHeight) > window.innerHeight && !l.isFullscreen()
                }
                , addBeforeUnloadListener: function(t, e) {
                    window.history.state && window.history.state.isPrepared || window.history.pushState({
                        isPrepared: !0
                    }, "", window.location.href), l._cache.oldBeforeUnload || (l._cache.oldBeforeUnload = window.onbeforeunload), window.onbeforeunload = function() {
                        return t()
                    }, l._cache.oldPopState || (l._cache.oldPopState = window.onpopstate), window.onpopstate = function() {
                        window.history.pushState({
                            isPrepared: !0
                        }, "", window.location.href);
                        var r = t();
                        r ? alert(r) : e(), l._cache.oldPopState && l._cache.oldPopState()
                    }
                }
                , removeBeforeUnloadListener: function() {
                    window.onbeforeunload = l._cache.oldBeforeUnload, l._cache.oldBeforeUnload = null, window.onpopstate = l._cache.oldPopState, l._cache.oldPopState = null
                }
                , addClickListener: function(t, e, r) {
                    l.isIPhone() || t.on("click", e, r), t.on("tap", e, r)
                }
            }
            , h = l;

        function c(t) {
            return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function f(t) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function d(t, e) {
            return (d = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }
        var p = function(t) {
            function e() {
                return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e)
                    , function(t, e) {
                        return !e || "object" !== c(e) && "function" != typeof e ? function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t) : e
                    }(this, f(e).call(this))
            }
            return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t
                            , writable: !0
                            , configurable: !0
                        }
                    }), e && d(t, e)
                }(e, n.Container)
                , function(t, e, r) {
                    e && function(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }(t.prototype, e)
                }(e, [{
                    key: "_onClick"
                    , value: function(t, e, r) {
                        h.addClickListener(t, e, r)
                    }
                }, {
                    key: "destroy"
                    , value: function() {
                        a.TweenLite.killTweensOf(this), a.TweenLite.killTweensOf(this.scale), this.children.forEach(function(t) {
                            t.interactive = !1, t.cacheAsBitmap = !1, t.removeAllListeners()
                        }), this.removeChildren(), n.Container.prototype.destroy.call(this)
                    }
                }]), e
        }();

        function _(t) {
            return (_ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function y(t) {
            return (y = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function m(t, e) {
            return (m = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }
        var v = function(t) {
            function e(t, r) {
                var n, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e), (n = function(t, e) {
                    return !e || "object" !== _(e) && "function" != typeof e ? function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t) : e
                }(this, y(e).call(this)))._style = r, n._moveDuration = i, n._currentIndex = isNaN(t) ? 0 : Number(t), n._radix = 10, n._size = isNaN(t) ? 1 : 2 * n._radix, n._addText(t), n
            }
            return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t
                            , writable: !0
                            , configurable: !0
                        }
                    }), e && m(t, e)
                }(e, p)
                , function(t, e, r) {
                    e && function(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }(t.prototype, e)
                }(e, [{
                    key: "_addText"
                    , value: function(t) {
                        var e = isNaN(t) ? t : "0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9";
                        return this._text = this._createText(e), this.addChild(this._text)
                    }
                }, {
                    key: "_createText"
                    , value: function(t) {
                        var e = i(this._style);
                        return h.isIE11() || (e.lineHeight = .5 * this._style.fontSize), e.wordWrap = !0, e.wordWrapWidth = 10, new n.Text(t, e)
                    }
                }, {
                    key: "moveTo"
                    , value: function(t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                        return this._tween && this._tween.seek(this._tween.duration(), !1), this._tween = this._createTween(t, e), this._tween
                    }
                }, {
                    key: "_createTween"
                    , value: function(t, e) {
                        var r = this._createTweenSettings(t, e);
                        return a.TweenLite.to(this, r.duration, {
                            y: r.targetY
                            , ease: a.Linear.easeNone
                            , onComplete: this._createTweenCompleteHandler(r.wrappedIndex).bind(this)
                        })
                    }
                }, {
                    key: "_createTweenSettings"
                    , value: function(t, e) {
                        var r = t + (t < this._currentIndex ? this._radix : 0);
                        return {
                            wrappedIndex: r
                            , targetY: this._calcTargetY(r)
                            , duration: e > 0 ? this._moveDuration / e : this._moveDuration
                        }
                    }
                }, {
                    key: "_createTweenCompleteHandler"
                    , value: function(t) {
                        return function() {
                            this._currentIndex = t % this._radix, this.y = this._calcTargetY(this._currentIndex), this._tween = null, this.emit(u)
                        }
                    }
                }, {
                    key: "_calcTargetY"
                    , value: function(t) {
                        return this._size <= 1 ? this.y : this.height / this._size * t * -1
                    }
                }, {
                    key: "jumpTo"
                    , value: function(t) {
                        return this._tween && (this._tween.seek(this._tween.duration()), this._tween = null), t < this._size && (this._currentIndex = t % this._radix), this.y = this._calcTargetY(this._currentIndex), this._currentIndex
                    }
                }, {
                    key: "setColor"
                    , value: function(t) {
                        var e = this._text.style;
                        e.fill = t || this._style.color;
                        var r = new n.Text(this._text.text, e);
                        this.addChild(r), this.removeChild(this._text), this._text.destroy(!0), this._text = r
                    }
                }, {
                    key: "destroy"
                    , value: function() {
                        this._tween && this._tween.kill(), this._tween = null, this._text = null, p.prototype.destroy.call(this)
                    }
                }]), e
        }();

        function g(t) {
            return (g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function b(t) {
            return (b = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function T(t, e) {
            return (T = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }
        var x = function(t) {
            function e(t, r, n) {
                var i;
                return function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, e), (i = function(t, e) {
                    return !e || "object" !== g(e) && "function" != typeof e ? function(t) {
                        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return t
                    }(t) : e
                }(this, b(e).call(this)))._style = t, i._setup = r, i._format = n, i._init(), i
            }
            return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t
                            , writable: !0
                            , configurable: !0
                        }
                    }), e && T(t, e)
                }(e, p)
                , function(t, e, r) {
                    e && function(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }(t.prototype, e)
                }(e, [{
                    key: "_init"
                    , value: function() {
                        this._movingReelsCount = 0, this._maxValue = s.formatCredit(this._setup.maxValue, this._format), this._container = new n.Container, this.addChild(this._container);
                        var t = this._createMask(this._style);
                        return this.mask = t, this.addChild(t), this._initializeReels(), this
                    }
                }, {
                    key: "_createMask"
                    , value: function(t) {
                        var e = function(t) {
                                if (t.fontSize && !isNaN(t.fontSize)) return t.fontSize;
                                if (t.font)
                                    for (var e = t.font.split(" "), r = 0; r < e.length; r += 1)
                                        if (e[r].indexOf("px") > -1) {
                                            var n = e[r].substr(0, e.length - 2)
                                                , i = Number(n);
                                            if (!isNaN(i)) return i
                                        } return 0
                            }(this._style)
                            , r = new n.Graphics;
                        return r.beginFill(10066329, 1), r.drawRect(0, -2, 200, e + 4), r.endFill(), r
                    }
                }, {
                    key: "_initializeReels"
                    , value: function() {
                        for (; this._container.children.length < this._maxValue.length;) {
                            var t = this._createOdometerReel(this._maxValue[this._container.children.length]);
                            t.x = this._container.width, this._container.addChild(t)
                        }
                        return this._container.x = -1 * this._container.width, this.mask && (this.mask.x = this._container.x), this._container.children.forEach(function(t) {
                            t.visible = !1
                        }), this._container
                    }
                }, {
                    key: "_createOdometerReel"
                    , value: function(t) {
                        return new v(t, this._style, this._setup.moveDuration)
                    }
                }, {
                    key: "setContent"
                    , value: function(t) {
                        if (isNaN(Number(t))) return "";
                        if (t !== this._targetAmount) {
                            var e = void 0 === this._amount || t < this._amount || t < this._targetAmount;
                            this._targetAmount = t, (e ? this._jumpTo : this._moveTo).call(this)
                        }
                        return s.formatCredit(this._amount, this._format)
                    }
                }, {
                    key: "_jumpTo"
                    , value: function() {
                        this._amount = this._targetAmount, this._clearReelListeners(), this._setContent(function(t, e) {
                            t.jumpTo(e)
                        })
                    }
                }, {
                    key: "_clearReelListeners"
                    , value: function() {
                        for (var t = 0; t < this._maxValue.length; t += 1) this._container.children[t].off(u);
                        this._movingReelsCount = 0
                    }
                }, {
                    key: "_setContent"
                    , value: function(t) {
                        for (var e = s.formatCredit(this._amount, this._format), r = this._maxValue.length - e.length, n = 0; n < this._maxValue.length; n += 1) {
                            var i = n - r
                                , o = i >= 0
                                , a = o ? Number(e[i]) : 0
                                , u = isNaN(a) ? 0 : a
                                , l = this._container.children[n];
                            t.call(this, l, u), l.visible = o
                        }
                    }
                }, {
                    key: "_moveTo"
                    , value: function() {
                        var t = this;
                        this._amount < this._targetAmount && !this._movingReelsCount && (this._movingReelsCount = this._maxValue.length, this._amount += 1, this._setContent(function(e, r) {
                            e.once(u, function() {
                                t._movingReelsCount -= 1, t._movingReelsCount <= 0 && t._moveTo()
                            }), e.moveTo(r, t._targetAmount - t._amount + 4)
                        }))
                    }
                }, {
                    key: "blink"
                    , value: function() {
                        var t = this
                            , e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 65280
                            , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4
                            , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 500;
                        return this._blinkInterval && clearInterval(this._blinkInterval), this._steps && this._steps.length && this._steps.splice(0, this._steps.length - 1), this._remainingBlinkCount = 2 * r, this._setColor(e), this._blinkInterval = setInterval(function() {
                            t._remainingBlinkCount -= 1, t._setColor(t._remainingBlinkCount % 2 ? e : null), t._remainingBlinkCount <= 0 && (clearInterval(t._blinkInterval), t._blinkInterval = null)
                        }, n), this._blinkInterval
                    }
                }, {
                    key: "_setColor"
                    , value: function(t) {
                        return this._container.children.forEach(function(e) {
                            e.setColor(t)
                        }), this._container
                    }
                }, {
                    key: "getId"
                    , value: function() {
                        return this._setup.id
                    }
                }, {
                    key: "getIsReady"
                    , value: function() {
                        return !this._movingReelsCount
                    }
                }, {
                    key: "destroy"
                    , value: function() {
                        this._style = null, this._setup = null, this._format = null, this._container = null, this._blinkInterval && (clearInterval(this._blinkInterval), this._blinkInterval = null), p.prototype.destroy.call(this)
                    }
                }]), e
        }();

        function w(t) {
            return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function E(t) {
            return (E = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function S(t, e) {
            return (S = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }
        var O = function(t) {
                function e(t, r, i) {
                    var o;
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), (o = function(t, e) {
                        return !e || "object" !== w(e) && "function" != typeof e ? function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t) : e
                    }(this, E(e).call(this)))._style = t, o._setup = r.win, o._format = i, o._odometer = o._createOdometer(t, r, i), o.addChild(o._odometer), o._winInfo = new n.Container, o.addChild(o._winInfo), o
                }
                return function(t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t
                                , writable: !0
                                , configurable: !0
                            }
                        }), e && S(t, e)
                    }(e, p)
                    , function(t, e, r) {
                        e && function(t, e) {
                            for (var r = 0; r < e.length; r++) {
                                var n = e[r];
                                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                            }
                        }(t.prototype, e)
                    }(e, [{
                        key: "_createOdometer"
                        , value: function(t, e, r) {
                            return new x(t, e, r)
                        }
                    }, {
                        key: "updatePot"
                        , value: function(t) {
                            this._odometer.setContent(t)
                        }
                    }, {
                        key: "displayLobbyWin"
                        , value: function(t, e) {
                            var r = this._createComplexSequence(t, e);
                            this._displaySequence(r, this._setup.interval, this._setup.lobbyColor)
                        }
                    }, {
                        key: "_createComplexSequence"
                        , value: function(t, e) {
                            var r = this._setup.blinkIntervals
                                , n = this._setup.iterations;
                            return this._createSequence(t, e, r[0], n[0]).concat(this._createSequence(t, e, r[1], n[1]))
                        }
                    }, {
                        key: "_createSequence"
                        , value: function(t, e) {
                            for (var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, i = [], o = 0; o < n; o += 1) i.push({
                                content: e
                                , blinkInterval: r
                            }), i.push({
                                content: Number(t)
                                , blinkInterval: r
                            }), i.push(!1);
                            return i
                        }
                    }, {
                        key: "_displaySequence"
                        , value: function(t, e, r) {
                            var n = this;
                            this._clearSequenceTimeout(), this._winInfo.removeChildren();
                            var i = t.shift();
                            this._winInfo.visible = Boolean(i), this._odometer.visible = !Boolean(i), i && this._displaySequencePart(i, r), t.length && (this._sequenceTimeout = setTimeout(function() {
                                n._displaySequence(t, e, r)
                            }, e))
                        }
                    }, {
                        key: "_clearSequenceTimeout"
                        , value: function() {
                            this._sequenceTimeout && (clearTimeout(this._sequenceTimeout), this._sequenceTimeout = null)
                        }
                    }, {
                        key: "_displaySequencePart"
                        , value: function(t, e) {
                            this._clearBlinkTimeout();
                            var r = i(this._style);
                            r.fill = e;
                            var o = "string" == typeof t.content ? t.content : s.formatCredit(t.content, this._format)
                                , a = new n.Text(o, r);
                            return this._adjustText(a), this._winInfo.addChild(a), t.blinkInterval && this._blinkText(a, t.blinkInterval), a
                        }
                    }, {
                        key: "_adjustText"
                        , value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 130;
                            if (t.width > e) {
                                var r = t.height;
                                t.width = e, t.scale.y = t.scale.x, t.y = .5 * (r - t.height)
                            }
                            t.x = -1 * t.width
                        }
                    }, {
                        key: "_clearBlinkTimeout"
                        , value: function() {
                            this._blinkTimeout && (clearTimeout(this._blinkTimeout), this._blinkTimeout = null)
                        }
                    }, {
                        key: "_blinkText"
                        , value: function(t, e) {
                            var r = this;
                            this._clearBlinkTimeout(), t.visible = !t.visible, this._blinkTimeout = setTimeout(function() {
                                r._blinkText(t, e)
                            }, e)
                        }
                    }, {
                        key: "displaySelfWin"
                        , value: function(t) {
                            var e = this._createComplexSequence(t, this._setup.selfText);
                            this._displaySequence(e, this._setup.interval, this._setup.selfColor)
                        }
                    }, {
                        key: "getId"
                        , value: function() {
                            return this._odometer.getId()
                        }
                    }, {
                        key: "destroy"
                        , value: function() {
                            this._clearSequenceTimeout(), this._clearBlinkTimeout(), this._style = null, this._format = null, this._winInfo.destroy(), this._winInfo = null, this._odometer.destroy(), this._odometer = null, p.prototype.destroy.call(this)
                        }
                    }]), e
            }()
            , P = function() {
                function t() {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this._listeners = {}
                }
                return function(t, e, r) {
                    e && function(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }(t.prototype, e)
                }(t, [{
                    key: "on"
                    , value: function(t, e, r) {
                        return this._on({
                            event: t
                            , callback: e
                            , context: r
                        }), this
                    }
                }, {
                    key: "_on"
                    , value: function(t) {
                        var e = t.event
                            , r = t.callback
                            , n = t.context
                            , i = t.once;
                        return e && r ? (this._listeners[e] = this._listeners[e] || [], this._listeners[e].push({
                            callback: r
                            , context: n || this
                            , once: i
                        }), this) : this
                    }
                }, {
                    key: "addListener"
                    , value: function(t, e, r) {
                        return this.on(t, e, r)
                    }
                }, {
                    key: "removeListener"
                    , value: function(t, e) {
                        if (!this._listeners[t]) return this;
                        if (!e) return delete this._listeners[t], this;
                        for (var r = 0; r < this._listeners[t].length; r += 1)
                            if (this._listeners[t][r].callback === e) return this._listeners[t].splice(r, 1), this._listeners[t].length || delete this._listeners[t], this;
                        return this
                    }
                }, {
                    key: "removeAllListeners"
                    , value: function() {
                        for (var t in this._listeners) this._listeners.hasOwnProperty(t) && delete this._listeners[t];
                        return this
                    }
                }, {
                    key: "off"
                    , value: function(t, e) {
                        return t ? this.removeListener(t, e) : this.removeAllListeners()
                    }
                }, {
                    key: "once"
                    , value: function(t, e, r) {
                        return this._on({
                            event: t
                            , callback: e
                            , context: r
                            , once: !0
                        }), this
                    }
                }, {
                    key: "emit"
                    , value: function(t) {
                        for (var e = this, r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) n[i - 1] = arguments[i];
                        return this._listeners[t] && this._listeners[t].length ? (this._listeners[t].concat().forEach(function(r) {
                            var i;
                            r.once && e.removeListener(t, r.callback), (i = r.callback).call.apply(i, [r.context].concat(n))
                        }), this) : this
                    }
                }]), t
            }();

        function C(t) {
            return (C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function M(t) {
            return (M = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function A(t, e) {
            return (A = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }
        var I = function(t) {
                function e(t) {
                    var r, n = t.component
                        , i = t.canvasId
                        , o = t.containerId
                        , s = t.width
                        , a = t.height;
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), (r = function(t, e) {
                        return !e || "object" !== C(e) && "function" != typeof e ? function(t) {
                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return t
                        }(t) : e
                    }(this, M(e).call(this)))._component = n, r._canvasId = i, r._containerId = o, r._width = s, r._height = a, r._init(), r
                }
                return function(t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t
                                , writable: !0
                                , configurable: !0
                            }
                        }), e && A(t, e)
                    }(e, P)
                    , function(t, e, r) {
                        e && function(t, e) {
                            for (var r = 0; r < e.length; r++) {
                                var n = e[r];
                                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                            }
                        }(t.prototype, e)
                    }(e, [{
                        key: "_init"
                        , value: function() {
                            n.utils.skipHello();
                            var t = document.getElementById(this._canvasId)
                                , e = document.getElementById(this._containerId);
                            this._renderer = Object(n.autoDetectRenderer)(this._width, this._height, {
                                transparent: !0
                                , view: t
                            }), t.addEventListener("webglcontextlost", this._onWebGLContextLost.bind(this)), e.appendChild(this._renderer.view), this._enterFrame()
                        }
                    }, {
                        key: "_onWebGLContextLost"
                        , value: function() {
                            this.emit("webglcontextlost")
                        }
                    }, {
                        key: "_enterFrame"
                        , value: function() {
                            this._renderer && (requestAnimationFrame(this._enterFrame.bind(this)), this._renderer.render(this._component))
                        }
                    }, {
                        key: "destroy"
                        , value: function() {
                            this.removeAllListeners(), this._component = null, this._renderer.view.removeEventListener("webglcontextlost", this._onWebGLContextLost), document.getElementById(this._containerId).removeChild(this._renderer.view), this._renderer.destroy(!0), this._renderer = null
                        }
                    }]), e
            }()
            , R = function() {
                function t(e) {
                    var r = this
                        , n = e.config
                        , i = e.canvasId
                        , o = e.containerId
                        , s = e.width
                        , a = e.height;
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this._initTimeout = setTimeout(function() {
                        r._initPotWidget({
                            config: n
                            , canvasId: i
                            , containerId: o
                            , width: s
                            , height: a
                        })
                    }, 200), this._commands = []
                }
                return function(t, e, r) {
                    e && function(t, e) {
                        for (var r = 0; r < e.length; r++) {
                            var n = e[r];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }(t.prototype, e)
                }(t, [{
                    key: "_initPotWidget"
                    , value: function(t) {
                        var e = this
                            , r = t.config
                            , n = t.canvasId
                            , i = t.containerId
                            , o = t.width
                            , s = t.height;
                        this._potWidget = new O(r.style, r.setup, r.format), this._potWidget.x = r.setup.x, this._potWidget.y = r.setup.y, this._renderer = new I({
                            component: this._potWidget
                            , canvasId: n
                            , containerId: i
                            , width: o
                            , height: s
                        }), this._commands.forEach(function(t) {
                            t.toCall && t.toCall.apply(e, t.args)
                        })
                    }
                }, {
                    key: "updatePot"
                    , value: function(t) {
                        this._potWidget ? this._potWidget.updatePot(t) : this._commands.push({
                            toCall: this.updatePot
                            , args: [t]
                        })
                    }
                }, {
                    key: "on"
                    , value: function(t, e, r) {
                        this._potWidget ? (this._potWidget.on(t, e, r), this._renderer.on(t, e, r)) : this._commands.push({
                            toCall: this.on
                            , args: [t, e, r]
                        })
                    }
                }, {
                    key: "once"
                    , value: function(t, e, r) {
                        this._potWidget ? (this._potWidget.once(t, e, r), this._renderer.once(t, e, r)) : this._commands.push({
                            toCall: this.once
                            , args: [t, e, r]
                        })
                    }
                }, {
                    key: "removeListener"
                    , value: function(t, e) {
                        this._potWidget ? (this._potWidget.removeListener(t, e), this._renderer.removeListener(t, e)) : this._commands.push({
                            toCall: this.removeListener
                            , args: [t, e]
                        })
                    }
                }, {
                    key: "removeAllListeners"
                    , value: function(t) {
                        this._potWidget ? (this._potWidget.removeAllListeners(t), this._renderer.removeAllListeners()) : this._commands.push({
                            toCall: this.removeAllListeners
                            , args: [t]
                        })
                    }
                }, {
                    key: "displayLobbyWin"
                    , value: function(t, e) {
                        this._potWidget ? this._potWidget.displayLobbyWin(t, e) : this._commands.push({
                            toCall: this.displayLobbyWin
                            , args: [t, e]
                        })
                    }
                }, {
                    key: "destroy"
                    , value: function() {
                        this._initTimeout && (clearTimeout(this._initTimeout), this._initTimeout = null), this._commands = null, this._potWidget && this._potWidget.destroy(), this._potWidget = null, this._renderer && this._renderer.destroy(), this._renderer = null
                    }
                }]), t
            }();
        r.d(e, "createPotWidget", function() {
            return D
        });
        var D = function(t) {
            return new R({
                config: t.config
                , canvasId: t.canvasId
                , containerId: t.containerId
                , width: t.width
                , height: t.height
            })
        }
    }]);