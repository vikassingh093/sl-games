var r, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, e) {
        a != Array.prototype && a != Object.prototype && (a[b] = e.value)
    },
    ba = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;

function ca(a, b) {
    if (b) {
        var e = ba;
        a = a.split(".");
        for (var f = 0; f < a.length - 1; f++) {
            var k = a[f];
            k in e || (e[k] = {});
            e = e[k]
        }
        a = a[a.length - 1];
        f = e[a];
        b = b(f);
        b != f && null != b && aa(e, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
ca("Array.prototype.find", function (a) {
    return a ? a : function (a, e) {
        a: {
            var b = this;b instanceof String && (b = String(b));
            for (var k = b.length, n = 0; n < k; n++) {
                var w = b[n];
                if (a.call(e, w, n, b)) {
                    a = w;
                    break a
                }
            }
            a = void 0
        }
        return a
    }
});
r = createjs.Container.prototype;
r.co = "right";
r.Gf = void 0;
r.zi = void 0;

function x(a, b) {
    void 0 !== b ? (a.addEventListener("mouseover", loader.mouseOver), a.addEventListener("mouseout", loader.mouseOut), a.addEventListener("click", b), a.mouseChildren = !1) : (a.removeAllEventListeners("click"), a.removeEventListener("mouseover", loader.mouseOver), a.removeEventListener("mouseout", loader.mouseOut))
}

function y(a) {
    a.x == a.Gf && (a.Gf = void 0)
}

function z(a, b) {
    return void 0 !== b ? a.nominalBounds.width : null !== a.getBounds() ? a.getBounds().width : a.nominalBounds.width
}

function U(a, b) {
    isNaN(b) && (b = b.x + .5 * z(b, b.ya));
    a.ya ? (a.ya.getBounds().width > a.ya.nominalBounds.width && (b -= a.ya.getBounds().width - a.ya.nominalBounds.width), b += .5 * a.getBounds().width, b -= .5 * (a.nominalBounds.width - a.getBounds().width)) : b += .5 * z(a);
    a.x = parseInt(b);
    a.Gf = a.x
}
r.setAlign = function (a, b) {
    "center" == a || "left" == a || "right" == a || "left2" == a ? this.co = a : console.log("Can't set align " + a);
    "reverse" == b && (this.zi = b);
    return this
};
r.setText = function (a, b) {
    exportRoot.Mb && this == exportRoot.Mb.Vc ? exportRootInt.setTotalBet(exportRoot.Ff()) : this == exportRoot.pa.mM && exportRootInt.setTotalBet(exportRoot.Ff());
    b && (this.co = b);
    a = a.toString();
    if ("" === a) this.visible = !1;
    else {
        this.visible = !0;
        b = a.length - 1;
        for (var e = 0, f = 0, k = 0, n = 0; n < this.numChildren; ++n) {
            var w = "reverse" == this.zi ? this.getChildAt(this.numChildren - n - 1) : this.getChildAt(n);
            w && (++e, n < a.length ? (f = a.charAt(b - n), w.gotoAndStop(" " == f ? 10 : f), f = w.nominalBounds.width, k += f) : w.gotoAndStop(10))
        }
        void 0 ==
            this.Gf && (this.Gf = this.x);
        switch (this.co) {
        case "left":
            this.x = this.Gf - ("reverse" == this.zi ? 0 : e * f - k);
            break;
        case "right":
            this.x = this.Gf - ("reverse" == this.zi ? .75 * Math.ceil(e * f - k) : 0);
            break;
        case "center":
            this.x = this.Gf - Math.ceil(e * f - k) * ("reverse" == this.zi ? .35 : .5)
        }
        this.cacheID && this.updateCache()
    }
};
r = createjs.MovieClip.prototype;
r.qo = "";
r.Wh = "";
r.xe = [];
r.Yl = !1;
r.Xc = !1;
r.Mi = "";
r.za = 0;
r.Vl = 0;
r.po = -1;
r.za = 0;

function V(a, b) {
    a.qo = b.replace(/\s+/g, "");
    a.po = -1;
    return a
}

function da(a) {
    a.Wh = "fingerL,_wait_=3,fingerR,_wait_=3".replace(/\s+/g, "");
    a.xe && a.xe.splice(0);
    a.xe = a.Wh.split(",");
    return a
}

function ea(a) {
    a.Wh = "";
    a.xe && a.xe.splice(0);
    return a
}

function W(a, b) {
    a.Yl = b;
    return a
}

function fa(a, b) {
    if (a.Mi == b) return a;
    var e = a.Mi.length;
    a.Mi = b;
    a.gotoAndStop(a.currentLabel);
    var f = a.Vl - a.currentFrame;
    a.gotoAndStop(0 < e ? a.currentLabel.substr(0, a.currentLabel.length - e) : a.currentLabel + b);
    a.Xc && 0 == a.za ? a.gotoAndPlay(a.currentFrame + f) : a.gotoAndStop(a.currentFrame + f);
    return a
}

function ha(a) {
    return 0 == a.Xc ? !0 : a.paused ? !0 : !1
}
r.update = function () {
    0 < this.za ? --this.za : this.Xc && ha(this) && (0 < this.xe.length || this.Yl) && ia(this);
    this.Vl = this.currentFrame
};
r.play = function () {
    this.visible = !0;
    this.za = 0;
    this.Xc = !0;
    ia(this);
    return this
};
r.reset = function (a) {
    this.Yl = !1;
    ea(this);
    a += this.Mi;
    this.Xc = !1;
    this.za = 0;
    a ? this.gotoAndStop(a) : this.stop();
    this.Vl = this.currentFrame;
    return this
};

function ja(a, b) {
    a.za = 0;
    if ("_wait_" == b.substr(0, 6)) {
        var e = b.substr(6, 1);
        ":" != e && ("=" == e ? (b = b.substr(7), e = b.split(":"), 1 < e.length ? (b = Math.random(), a.za = e[0] * (1 - b) + e[1] * b) : a.za = b, a.za = loader.getDelay(a.za)) : (b = Math.random(), a.za = loader.getDelay(1 - b + 3 * b)))
    } else e = b.split("="), 1 < e.length && (b = e[0] + Math.floor(Math.random() * e[1] + 1)), a.gotoAndPlay(b + a.Mi);
    a.Vl = a.currentFrame
}

function ia(a) {
    "" != a.Wh && 0 == a.xe.length && (a.xe = a.Wh.split(","));
    if (0 < a.xe.length) ja(a, a.xe[0]), a.xe.shift(), 0 == a.xe.length && 2 != a.Yl && (a.Wh = "");
    else if ("" != a.qo) {
        var b = a.qo.split(",");
        do var e = Math.floor(Math.random() * b.length); while (1 < b.length && e == a.po);
        a.po = e;
        ja(a, b[e])
    }
}

function ka() {
    this.Rh = !1;
    this.wf = this.Bf = 0;
    this.oh;
    this.Zl = 1;
    this.qf = 0;
    this.Yc;
    this.Fi = 0;
    this.Rl;
    this.Up
}
r = ka.prototype;
r.Uo = function () {
    this.Yc = arguments
};
r.reset = function () {
    this.set(0, 0)
};
r.set = function (a, b) {
    this.Bf = a;
    this.wf = b;
    this.oh = this.Rh ? 10 : 8;
    this.Rl = 1;
    this.Up = Math.max(1, Math.floor(a / loader.getDelay(5)));
    this.Dc = loader.getDelay(this.Rh ? .1 : .15);
    this.Fi = 0
};
r.src = function () {
    return this.Bf
};
r.update = function () {
    if (0 == this.Bf) return !1;
    var a = this.Rl,
        b = this.Dc;
    if (this.Rh)
        if (exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Bet, !0)) a = 0, this.wf += this.Bf, this.Bf = 0;
        else if (exportRoot.Wp || exportRoot.autoPlay() || exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Start, !0)) 2 < this.Dc ? b *= .6 : a *= 2;
    if (0 < this.qf) return --this.qf, !1;
    if (this.Rh) {
        var e = (10 - this.oh) / 10;
        this.Dc = loader.getDelay(.1 * (1 - e) + .04 * e)
    } else e = (8 - this.oh) / 10, this.Dc = loader.getDelay(.15 * (1 - e) + .1 * e);
    this.qf += b;
    this.Bf -= a;
    this.wf += a * this.Zl;
    0 > this.Bf && (this.wf += this.Bf * this.Zl, this.Bf = 0);
    0 < this.oh && (this.oh -= loader.getSpeed(lib.properties.fps));
    this.Rh && 1 >= this.oh && (this.Rl += this.Up);
    this.Yc && (exportRoot.m_sound.playSound(this.Yc[this.Fi]), ++this.Fi, this.Fi >= this.Yc.length && (this.Fi = 0));
    return !0
};

function la() {
    var a = exportRoot.Cf;
    this.Oi = this.qf = 0;
    this.Vp;
    this.vi = !1;
    this.ta;
    this.na = a;
    this.uh = this.na.nominalBounds.x + this.na.nominalBounds.width;
    this.Ii = 1;
    this.eo = void 0;
    this.HG = "take_or_risk";
    for (var b = a = "", e = 0; e < this.na.labels.length; ++e) this.na.labels[e].label == "take" + a ? a = "" == a ? 2 : a + 1 : this.na.labels[e].label == "move" + b && (b = "" == b ? 2 : b + 1);
    this.GG = a - 1;
    this.cq = b - 1
}
la.prototype.m_enum = {
    wm: 0,
    Tb: 1,
    Play: 2,
    $i: 3,
    Ef: 4,
    Rf: 5,
    uf: 6,
    um: 7,
    vm: 8
};
la.prototype.setData = function (a, b) {
    this.na.bd.setText(a);
    this.na.tf.setText(a);
    this.na.Mc.setText(b);
    this.na.cd;
    this.na.cd.setText(b)
};
la.prototype.update = function () {
    if (0 <= this.qf) --this.qf;
    else {
        this.vi = !this.vi;
        switch (this.ta) {
        case this.m_enum.wm:
            return;
        case this.m_enum.Tb:
            X(this, this.m_enum.Play);
            break;
        case this.m_enum.Play:
            this.vi ? (this.na.bd.visible = !0, this.na.tf.visible = !1, this.na.Mc.visible = !0, this.na.cd.visible = !1) : (this.na.bd.visible = !1, this.na.tf.visible = !0, this.na.Mc.visible = !1, this.na.cd.visible = !0);
            break;
        case this.m_enum.$i:
            return;
        case this.m_enum.Ef:
            return;
        case this.m_enum.Rf:
            this.na.gotoAndStop(this.vi ? "take_or_risk" :
                "take_or_risk2");
            break;
        case this.m_enum.uf:
            var a = parseInt(4 === this.na.currentLabel.length ? 1 : this.na.currentLabel[4]);
            ++a;
            a > this.GG && (a = "");
            this.na.gotoAndStop("take" + a);
            break;
        case this.m_enum.um:
            this.Vp ? this.na.gotoAndStop(1 > this.Oi ? "doubling" : "select_a_card") : this.na.gotoAndStop(1 > this.Oi ? "double_to" : this.HG);
            this.na.Ce.x = this.na.Ce.Gf;
            ++this.Oi;
            2 <= this.Oi && (this.Oi = 0);
            break;
        case this.m_enum.vm:
            return
        }
        this.qf = loader.getDelay(.5);
        this.na.cacheID && this.na.updateCache()
    }
};

function X(a, b, e, f) {
    a.ta = b;
    a.na.visible = !0;
    switch (a.ta) {
    case a.m_enum.wm:
        a.na.visible = !1;
        break;
    case a.m_enum.Tb:
        a.na.visible = !1;
        a.na.gotoAndStop("play");
        break;
    case a.m_enum.Play:
        a.na.gotoAndStop("play");
        b = z(a.na.Bg);
        b += z(a.na.bd);
        b += z(a.na.to);
        !0 === a.eo && (b += z(a.na.Mc), b += z(a.na.bh));
        b = .5 * (a.uh - b);
        U(a.na.Bg, b);
        U(a.na.bd, a.na.Bg);
        U(a.na.tf, a.na.Bg);
        U(a.na.to, a.na.bd);
        !0 === a.eo ? (U(a.na.Mc, a.na.to), U(a.na.cd, a.na.to)) : (b = a.na.Mc.getBounds().width + z(a.na.bh), b = .5 * (a.uh - b), U(a.na.Mc, b), U(a.na.cd, b));
        U(a.na.bh,
            a.na.Mc);
        break;
    case a.m_enum.$i:
        if (e) {
            a.na.gotoAndStop(e);
            break
        }
        1 === a.cq ? a.na.gotoAndStop("move") : (a.na.gotoAndStop("move" + (1 == a.Ii ? "" : a.Ii)), ++a.Ii, a.Ii > a.cq && (a.Ii = 1));
        break;
    case a.m_enum.Ef:
        a.na.gotoAndStop("win");
        a.na.Df.setText(e);
        a.na.Pf.setText(f);
        b = z(a.na.line) + z(a.na.Df);
        b = .5 * (a.uh - b);
        U(a.na.line, b);
        U(a.na.Df, a.na.line);
        b = .5 * (a.uh - z(a.na.Pf));
        U(a.na.Pf, b);
        break;
    case a.m_enum.Rf:
        a.na.gotoAndStop("take_or_risk");
        break;
    case a.m_enum.uf:
        a.na.gotoAndStop("take");
        break;
    case a.m_enum.um:
        a.Vp = f ?
            !0 : !1;
        a.na.gotoAndStop(f ? "doubling" : "double_to");
        a.na.Ce.setText(e + (f ? "" : "?"));
        b = f ? a.na.nM : a.na.pi;
        !0 === a.eo ? (U(b, .5 * (a.uh - z(b) - z(a.na.Ce))), U(a.na.Ce, b)) : (U(b, .5 * (a.uh - z(b)) + a.na.nominalBounds.x), U(a.na.Ce, .5 * (a.uh - z(a.na.Ce)) + a.na.nominalBounds.x));
        break;
    case a.m_enum.vm:
        a.na.visible = !1
    }
    a.qf = loader.getDelay(.5);
    a.vi = !0;
    a.na.cacheID && a.na.updateCache()
}

function ma() {
    this.Xh;
    this.nq = [5E3, 3E4];
    this.kq = 4E3;
    this.hm;
    this.JG;
    this.bm = !1;
    this.Jf = [];
    this.Ci;
    this.mo;
    this.bq;
    this.xg;
    this.no = 0;
    this.ec;
    this.nh;
    this.zc;
    this.Bc;
    this.Ei;
    this.Di;
    this.Yh;
    this.am = !1;
    this.$p = 0;
    this.Ul;
    this.Sl = {};
    this.Yh = 0;
    this.Xh = new XMLHttpRequest;
    this.Xh.onreadystatechange = this.PH;
    if (loader.m_params.replay)
        if (0 == loader.m_params.replay.length) na(this, "The history is empty");
        else {
            "undefined" !== typeof libInfo && (exportRootInfo.mouseEnabled = !1);
            "undefined" !== typeof libJP && (exportRootJP.mouseEnabled = !1);
            exportRoot.mouseEnabled = !1;
            exportRoot.y = 0;
            exportRoot.addEventListener("tick", this.Cz);
            this.Cc = 0;
            this.nf;
            this.ho = this.Pl = this.Qc = 0;
            this.Dc = this.Xc = !0;
            this.lo = this.gf = oa(this, loader.m_params.replay.length - 1);
            this.yo;
            this.ic = [];
            this.Uh = [];
            for (var a = 0, b = 0; b < loader.m_params.replay.length; ++b) {
                var e = JSON.parse(loader.m_params.replay[b]);
                if ("init" == e.cmd || "start" == e.cmd) {
                    var f = oa(this, b);
                    e = e.time.substr(9, 2) + ":" + e.time.substr(11, 2) + ":" + e.time.substr(13, 2);
                    a = this.ic.length;
                    this.ic.push({
                        num: b,
                        time: f,
                        time2: e
                    })
                }
                this.Uh.push(a)
            }
            this.qh = new createjs.Container;
            this.Yp = new createjs.Shape;
            this.Xp = new createjs.Shape;
            this.Ai = new createjs.Shape;
            this.fq = new createjs.Shape;
            this.we = new createjs.Shape;
            this.ug = new createjs.Shape;
            this.tg = new createjs.Shape;
            this.Nb = new createjs.Shape;
            this.Ac = new createjs.Shape;
            this.Zp = new createjs.Shape;
            this.Yp.graphics.beginFill("#222").drawRect(-3, 0, lib.properties.width + 5, 60);
            this.Xp.graphics.beginFill("#444").drawRect(0, 16, lib.properties.width, 8);
            for (b = 0; b < this.ic.length; ++b) {
                a =
                    parseInt(this.ic[b].time / this.gf * lib.properties.width);
                a == lib.properties.width && --a;
                e = pa(this, this.ic[b].num);
                f = "#60cc40";
                if ("init" == e.cmd) f = "#FFFFFF";
                else if (e.SuperWin) f = "#FF207F";
                else if (e.Bonus2Wins || e.NeedBonus2 || e.FreeGames) f = e.BonusWins || e.Bonus1Wins ? "#f2a80a" : "#00FFFF";
                else if (e.BonusWins || e.Bonus1Wins) f = "#FFFF00";
                this.Zp.graphics.beginFill(f).drawRect(a, 22, b + 1 < this.ic.length ? parseInt(this.ic[b + 1].time / this.gf * lib.properties.width) - a : lib.properties.width - a, 4);
                this.fq.graphics.beginFill(f).drawRect(a,
                    14, 1, 10)
            }
            this.we.graphics.beginFill("#eeeeee").drawRect(0, 0, 4, 15);
            this.we.graphics.beginFill("#eeeeee").drawRect(8, 0, 4, 15);
            this.we.setTransform(0, 35);
            qa(this, this.we, "Pause");
            this.ug.graphics.beginFill("#eeeeee").drawPolyStar(6, 7.5, 3.75, 3, -1, 0);
            this.ug.graphics.setStrokeStyle(2).beginStroke("#eeeeee");
            this.ug.graphics.moveTo(-3, 2);
            this.ug.graphics.lineTo(-3, 13);
            this.ug.setTransform(30, 35);
            qa(this, this.ug, "Prev Step");
            this.tg.graphics.beginFill("#eeeeee").drawPolyStar(4, 7.5, 7.5, 3, 0, 0);
            this.tg.graphics.setStrokeStyle(2).beginStroke("#eeeeee");
            this.tg.graphics.moveTo(12, 2);
            this.tg.graphics.lineTo(12, 13);
            this.tg.setTransform(50, 35);
            qa(this, this.tg, "Next Step");
            this.Nb.graphics.setStrokeStyle(2).beginStroke("#eeeeee");
            this.Nb.graphics.moveTo(0, 2);
            this.Nb.graphics.lineTo(7.5, 7.5);
            this.Nb.graphics.lineTo(0, 13);
            this.Nb.graphics.moveTo(6, 2);
            this.Nb.graphics.lineTo(13.5, 7.5);
            this.Nb.graphics.lineTo(6, 13);
            this.Nb.graphics.endStroke();
            this.Nb.setTransform(75, 35);
            qa(this, this.Nb, "Waiting On");
            this.Ac.graphics.beginFill("#eeeeee").drawRect(0, 15 / 3.5,
                8, 6);
            this.Ac.graphics.beginFill("#eeeeee").drawPolyStar(7, 7.5, 3.75, 3, -1, 0);
            this.Ac.graphics.setStrokeStyle(2).beginStroke("#dddddd");
            this.Ac.graphics.moveTo(0, 15);
            this.Ac.graphics.lineTo(16, 0);
            this.Ac.setTransform(100, 35);
            qa(this, this.Ac, "Sound On");
            exportRoot.m_sound.reverseMute();
            this.qh.addChild(this.Yp, this.Xp, this.Zp, this.fq, this.Ai, this.we, this.ug, this.tg, this.Nb, this.Ac);
            this.qh.setTransform(exportRoot.x, exportRoot.y + lib.properties.height);
            stage.addChild(this.qh);
            this.fm = new createjs.Text("",
                "11px Verdana", "#FFF");
            this.xo = new createjs.Text("", "11px Verdana", "#FFF");
            this.xo.setTransform(125, 36);
            this.em = new createjs.Text("", "11px Verdana", "#FFF");
            this.ic[0] && (this.em.text = this.ic[0].time2 + " - " + this.ic[this.ic.length - 1].time2 + " UTC", this.em.setTransform(lib.properties.width - this.em.getBounds().width, 36));
            this.qh.addChild(this.fm, this.xo, this.em);
            stage.addEventListener("stagemousemove", this.qq);
            stage.addEventListener("stagemousedown", this.qq);
            this.we.addEventListener("mousedown", this.Wo);
            this.ug.addEventListener("mousedown", this.ZH);
            this.tg.addEventListener("mousedown", this.aH);
            this.Nb.addEventListener("mousedown", this.UK);
            this.Ac.addEventListener("mousedown", this.Bz);
            this.yo = setInterval(this.wr, 100);
            this.Ai.graphics.clear();
            this.Ai.graphics.beginFill("#aa2020AA").drawRect(0, 16, this.Qc / this.gf * lib.properties.width, 4)
        } stage.addEventListener("spinBeginEvent", this.LH);
    stage.addEventListener("spinCompleteEvent", this.OH);
    stage.addEventListener("closeEvent", this.MH)
}
r = ma.prototype;
r.qq = function (a) {
    var b = exportRoot.xa;
    if (a.stageX >= exportRoot.x && a.stageY >= exportRoot.y + lib.properties.height + 15 && a.stageX <= exportRoot.x + lib.properties.width && a.stageY <= exportRoot.y + lib.properties.height + 27) {
        for (var e = (a.stageX - exportRoot.x) / lib.properties.width * b.gf, f = 0, k = 0, n = b.ic.length - 1; k < n; ++k) {
            if (k == n - 1 && e > b.ic[k + 1].time) {
                f = k + 1;
                break
            }
            if (e >= b.ic[k].time && e <= b.ic[k + 1].time) {
                f = e < (b.ic[k].time + b.ic[k + 1].time) / 2 ? k : k + 1;
                break
            }
        }
        "stagemousedown" == a.type ? b.next(f) : (b.fm.text = b.ic[f].time2, b.fm.setTransform(a.stageX -
            b.qh.x, exportRoot.y))
    } else exportRoot.xa.fm.text = "", "stagemousedown" == a.type && a.stageX >= exportRoot.x && a.stageY >= exportRoot.y && a.stageX <= lib.properties.width && a.stageY <= lib.properties.height && b.Wo()
};

function ra(a) {
    var b = Math.floor(a / 1E3);
    a = Math.floor(b / 3600);
    var e = Math.floor((b - 3600 * a) / 60);
    b = b - 3600 * a - 60 * e;
    var f = Math.floor(exportRoot.xa.gf / 1E3 / 3600);
    0 < f && 10 > a && (a = "0" + a);
    10 > e && (e = "0" + e);
    10 > b && (b = "0" + b);
    return 0 < f ? a + ":" + e + ":" + b : e + ":" + b
}
r.wr = function () {
    var a = exportRoot.xa;
    a.Qc < a.gf && (a.Qc += 100);
    a.Ai.graphics.clear();
    a.Ai.graphics.beginFill("#dd0010").drawRect(0, 17, Math.min(Math.min(a.Qc, a.gf), a.lo) / a.gf * lib.properties.width, 4);
    a.xo.text = ra(a.Qc) + " / " + ra(a.gf)
};
r.Wo = function () {
    var a = exportRoot.xa;
    a.Xc = !exportRoot.xa.Xc;
    a.we.graphics.clear();
    a.Xc ? (sa(a.we, "Pause"), a.yo = setInterval(a.wr, 100), a.we.graphics.beginFill("#eeeeee").drawRect(0, 0, 4, 15), a.we.graphics.beginFill("#eeeeee").drawRect(8, 0, 4, 15), stage.tickEnabled = !0) : (sa(a.we, "Play"), clearInterval(a.yo), clearTimeout(a.nf), a.nf = void 0, a.we.graphics.beginFill("#eeeeee").drawPolyStar(5, 7.5, 10, 3, 0, 0), stage.tickEnabled = !1, exportRoot.m_sound.stopAllSounds())
};
r.ZH = function () {
    var a = exportRoot.xa;
    a.next(a.Uh[Math.max(a.Cc - 2, 0)])
};
r.aH = function () {
    for (var a = exportRoot.xa, b = a.Uh[a.Cc - 1], e = a.Cc; e < a.Uh.length; ++e)
        if (a.Uh[e] > b) {
            a.next(a.Uh[e]);
            break
        }
};
r.next = function (a) {
    "object" == typeof libInfo && stage.getChildAt(0) == exportRootInfo && this.Mm();
    "object" == typeof libJP && stage.getChildAt(0) == exportRootJP && this.ao();
    var b = exportRoot.xa;
    b.Xc || b.Wo();
    b.Xc = !1;
    "fc2" == loader.m_params.game && (exportRoot.pa.oM = 0);
    exportRoot.pa.parent && exportRoot.pa.removeChild(this.Lb);
    exportRoot.setCredit(1E3);
    exportRoot.jc(0);
    exportRoot.pa.wi = !1;
    exportRoot.pa.ta = exportRoot.pa.m_scenes.Tb;
    exportRoot.pa.reset();
    if (exportRoot.pa.Be) {
        exportRoot.pa.Be();
        for (var e = 0; 5 > e; ++e) ta(exportRoot.pa.Rc[e])
    }
    exportRoot.setScene(exportRoot.m_scenes.Nc);
    clearTimeout(b.nf);
    b.Cc = b.ic[a].num;
    for (var f = e = !0, k = !0, n = Math.min(b.Cc, loader.m_params.replay.length - 1); 0 <= n; --n) {
        var w = JSON.parse(loader.m_params.replay[n]);
        if (f) {
            var Y = w.args && w.args.Bet ? w.args.Bet : w.LastBet;
            Y && (this.zc = Y, exportRoot.Eg(this.zc), f = !1)
        }
        e && (Y = w.args && w.args.Lines ? w.args.Lines : w.LastLines) && (this.Bc = Y, exportRoot.sf(this.Bc), exportRoot.pa.Be(), e = !1);
        if (k)
            if (w.args && w.args.Denom)
                for (var h in this.Sl) {
                    if (this.Sl[h] == w.args.Denom) {
                        loader.setDenom(h);
                        k = !1;
                        break
                    }
                } else w.Denomination && (loader.setDenom(w.Denomination),
                    k = !1);
        if (!f && !e && !k) break
    }
    b.Xc = !0;
    exportRoot.xa.Qc = b.ic[a].time;
    b.Ri()
};
r.UK = function () {
    var a = exportRoot.xa;
    a.Dc = !a.Dc;
    a.Nb.graphics.clear();
    a.Dc ? (sa(a.Nb, "Waiting On"), a.Nb.graphics.setStrokeStyle(2).beginStroke("#eeeeee"), a.Nb.graphics.moveTo(0, 2), a.Nb.graphics.lineTo(7.5, 7.5), a.Nb.graphics.lineTo(0, 13), a.Nb.graphics.moveTo(6, 2), a.Nb.graphics.lineTo(13.5, 7.5), a.Nb.graphics.lineTo(6, 13), a.Nb.graphics.endStroke(), void 0 !== a.nf && (clearTimeout(a.nf), exportRoot.xa.nf = setTimeout(a.Ri, 10))) : (sa(a.Nb, "Waiting Off"), a.Nb.graphics.setStrokeStyle(2).beginStroke("#eeeeee"), a.Nb.graphics.moveTo(1,
        2), a.Nb.graphics.lineTo(8.5, 7.5), a.Nb.graphics.lineTo(1, 13), a.Nb.graphics.endStroke())
};

function qa(a, b, e) {
    var f = new createjs.Shape;
    f.graphics.beginFill("#000").drawRect(0, 0, 12, 15);
    b.hitArea = f;
    e = new createjs.Text(e, "11px Verdana", "#FFF");
    e.name = "toolTip";
    f = new createjs.Shape;
    f.name = "bg";
    f.graphics.beginFill("#00000080").drawRect(-4, 0, e.getBounds().width + 8, 15);
    b.Uc = new createjs.Container;
    b.Uc.addChild(f, e);
    b.Uc.w = 12;
    b.Uc.setTransform(b.x + (b.Uc.w - b.Uc.getBounds().width) / 2, 18);
    b.cursor = "pointer";
    b.addEventListener("mouseover", a.Uc);
    b.addEventListener("mouseout", a.Uc)
}

function sa(a, b) {
    var e = a.Uc.getChildByName("toolTip");
    e.text = b;
    b = a.Uc.getChildByName("bg");
    b.graphics.clear();
    b.graphics.beginFill("#00000080").drawRect(-4, 0, e.getBounds().width + 8, e.getBounds().height + 4);
    a.Uc.setTransform(a.x + (a.Uc.w - e.getBounds().width) / 2, 18)
}
r.Uc = function (a) {
    var b = exportRoot.xa;
    "mouseover" == a.type ? b.qh.addChild(a.target.Uc) : b.qh.removeChild(a.target.Uc)
};
r.Bz = function () {
    var a = exportRoot.xa;
    exportRoot.m_sound.$l ? (a.Ac.graphics.clear(), a.Ac.graphics.beginFill("#eeeeee").drawRect(0, 15 / 3.5, 8, 6), a.Ac.graphics.beginFill("#eeeeee").drawPolyStar(7, 7.5, 3.75, 3, -1, 0), sa(a.Ac, "Sound Off")) : (a.Ac.graphics.setStrokeStyle(2).beginStroke("#dddddd"), a.Ac.graphics.moveTo(0, 15), a.Ac.graphics.lineTo(16, 0), sa(a.Ac, "Sound On"));
    exportRoot.m_sound.reverseMute()
};
r.LH = function () {
    var a = exportRoot.xa,
        b = a.zc * a.Bc;
    a.Di = a.ec.RawCredit;
    a.Ei = 0;
    if ("function" === typeof window.onBeginSpin) window.onBeginSpin(a.Di, b)
};
r.OH = function () {
    var a = exportRoot.xa;
    a.Di += a.Ei;
    a.Yh += a.Ei;
    "function" === typeof window.onFinishSpin && (a = exportRoot.xa, window.onFinishSpin(a.Di, a.Ei))
};
r.MH = function () {
    na(exportRoot.xa, "Game is closed!")
};
r.zp = function () {
    exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Start, !0)
};
r.jackpot = function () {
    exportRoot.m_sound.hf && (exportRoot.m_sound.hf.paused = !0);
    stage.removeEventListener("spinCompleteEvent", exportRoot.xa.jackpot);
    stage.removeChild(exportRoot);
    stage.addChildAt(exportRootJP, 0);
    exportRootJP.reset(exportRoot.wg);
    stage.addEventListener("jackpotCompleteEvent", exportRoot.xa.ao);
    loader.m_params.replay && setTimeout(this.zp, 1E3)
};
r.ao = function (a) {
    a && exportRoot.xa.send("finish", {
        Bonusing: 0
    });
    exportRootJP.removeEventListener("tick", exportRootJP.update);
    stage.removeChild(exportRootJP);
    stage.addChildAt(exportRoot, 0);
    stage.removeEventListener("jackpotCompleteEvent", exportRoot.xa.ao);
    loader.m_params.replay && exportRoot.autoPlay() && (exportRoot.m_buttons.revert(exportRoot.m_buttons.m_enum.AutoPlay), exportRoot.Kc = !1);
    exportRoot.m_sound.hf && (exportRoot.m_sound.hf.paused = !1)
};
r.Lm = function (a, b) {
    stage.removeEventListener("spinCompleteEvent", exportRoot.xa.Lm);
    stage.removeChild(exportRoot);
    stage.addChildAt(exportRootInfo, 0);
    exportRootInfo.reset();
    void 0 == b ? exportRootInfo.setScene(exportRootInfo.m_scenes.FreeSpinsEnd, exportRoot.xa.Yh) : (exportRootInfo.setData(exportRoot.xa.ec.Denomination, exportRoot.xa.ec.Currency, b), 0 == a ? exportRootInfo.setScene(exportRootInfo.m_scenes.FreeSpinsEnd, exportRoot.xa.Yh) : exportRootInfo.setScene(exportRootInfo.m_scenes.FreeSpins, a));
    stage.addEventListener("fsCompleteEvent",
        exportRoot.xa.Mm);
    loader.m_params.replay && (a = exportRoot.xa, setTimeout(this.zp, 0 != a.Cc || a.Dc ? 1E3 : oa(a, 1)))
};
r.Mm = function () {
    exportRootInfo.removeEventListener("tick", exportRootInfo.update);
    stage.removeChild(exportRootInfo);
    stage.addChildAt(exportRoot, 0);
    stage.removeEventListener("fsCompleteEvent", exportRoot.xa.Mm);
    loader.m_params.replay && exportRoot.autoPlay() && (exportRoot.m_buttons.revert(exportRoot.m_buttons.m_enum.AutoPlay), exportRoot.Kc = !1)
};
r.PH = function () {
    var a = exportRoot.xa.Xh;
    4 == a.readyState && (200 == a.status ? (exportRoot.xa.am && (loader.hide(), exportRoot.xa.am = !1), exportRoot.xa.read(a.responseText)) : (va(exportRoot.xa), loader.setText("Connection problem!", !0), exportRoot.xa.am = !0, exportRoot.xa.JG = setTimeout(exportRoot.xa.Ro, exportRoot.xa.kq)))
};
r.status = function () {
    void 0 !== exportRoot.xa && void 0 !== exportRoot.xa.send && (exportRoot.xa.am || exportRoot.xa.send("status"), va(exportRoot.xa))
};

function na(a, b, e) {
    clearTimeout(a.hm);
    a.Xh.onreadystatechange = void 0;
    a.Xh.abort();
    a.Jf.splice(0);
    exportRoot.setScene(exportRoot.m_scenes.fp);
    if (exportRoot.m_sound) {
        exportRoot.m_sound.stopAllSounds();
        var f = exportRoot.m_sound;
        f.hf && (f.hf.stop(), f.hf = void 0)
    }
    exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.Sound, !0);
    exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.FullScreen, !0);
    exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.AutoPlay, !0);
    exportRoot.autoPlay() && (exportRoot.m_buttons.revert(exportRoot.m_buttons.m_enum.AutoPlay),
        exportRoot.Kc = !1);
    exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.Exit, !0);
    exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.Menu, !0);
    exportRoot.m_buttons.disableAll(!0);
    "object" == typeof libInfo && exportRootInfo.parent && stage.removeChild(exportRootInfo);
    "object" == typeof libJP && exportRootJP.parent && stage.removeChild(exportRootJP);
    loader.setText(b);
    e && (a.no = 0, a.bm = !1, a.send("init"))
}

function va(a) {
    void 0 !== a.hm && clearTimeout(a.hm);
    a.hm = setTimeout(a.status, exportRoot.Ff() > exportRoot.wg ? a.nq[0] : a.nq[1])
}
r.Ri = function () {
    if (exportRoot.xa.Xc) {
        var a = exportRoot.xa;
        if (void 0 !== loader.m_params.replay && loader.m_params.replay.length > a.Cc) {
            a.nf = void 0;
            a.Pl = 0;
            a.ho = 0;
            var b = loader.m_params.replay[a.Cc],
                e = JSON.parse(b);
            if (a.Dc && "start" == e.cmd) {
                var f = a.Qc;
                a.Qc = oa(a, a.Cc);
                f > a.Qc && (a.Qc = f)
            }
            if ("start" === e.cmd || "init" === e.cmd) e.LastBet && e.cmd && (this.zc = e.LastBet, exportRoot.Eg(this.zc)), e.args && e.args.Bet && (this.zc = e.args.Bet, exportRoot.Eg(this.zc)), e.LastLines && (this.Bc = e.LastLines, exportRoot.sf(this.Bc), exportRoot.pa.Be()),
                e.args && e.args.Lines && (this.Bc = e.args.Lines, exportRoot.sf(this.Bc), exportRoot.pa.Be());
            "start" === e.cmd && exportRoot.pa.rb && (exportRoot.pa.Be(), exportRoot.sf(exportRoot.qb));
            (f = loader.m_params.replay.length > a.Cc + 1 ? !0 : !1) && (f = JSON.parse(loader.m_params.replay[a.Cc + 1]));
            ("status" !== e.cmd || !f || "status" !== f.cmd && "finish" !== f.cmd) && a.read(b);
            a.Cc < loader.m_params.replay.length && a.Cc++;
            a.lo = a.gf;
            for (f = a.Cc; f < loader.m_params.replay.length; ++f)
                if (b = loader.m_params.replay[f], e = JSON.parse(b), "start" == e.cmd) {
                    a.lo =
                        oa(a, f);
                    break
                }
        }
    } else exportRoot.xa.nf = !1
};

function oa(a, b) {
    if (void 0 === b) {
        if (exportRoot.xa.Dc) return 0;
        b = a.Cc
    }
    return b < loader.m_params.replay.length ? (b = loader.m_params.replay[b], a = JSON.parse(loader.m_params.replay[0]).time, b = JSON.parse(b).time, Math.abs(new Date(b.substr(0, 4), b.substr(4, 2), b.substr(6, 2), b.substr(9, 2), b.substr(11, 2), b.substr(13, 2)) - new Date(a.substr(0, 4), a.substr(4, 2), a.substr(6, 2), a.substr(9, 2), a.substr(11, 2), a.substr(13, 2)))) : 0
}

function wa(a, b) {
    if (void 0 !== b && 0 === a.Pl) {
        a.ho = a.Qc + b;
        var e = oa(a, a.Cc) - a.Qc;
        a.Pl = e < b ? b - e : -1
    }
    return Math.max(oa(a) - a.Qc + (exportRoot.xa.Dc ? a.ho : a.Pl), 0)
}

function pa(a, b) {
    void 0 == b && (b = a.Cc);
    return loader.m_params.replay.length > b ? JSON.parse(loader.m_params.replay[b]) : {}
}

function xa(a) {
    if (void 0 === a.nf) {
        var b = wa(a);
        0 >= b ? a.Ri() : a.nf = setTimeout(a.Ri, b)
    }
}
r.Cz = function () {
    exportRoot.Kc = !1;
    var a = exportRoot.xa,
        b = pa(a);
    if ("tp" == loader.m_params.game) exportRoot.uo == exportRoot.vo.VK ? "start" === b.cmd || "deal" === b.cmd ? 0 >= wa(a, 1E3) && xa(a) : "risk" === b.cmd ? 0 >= wa(a) && exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Bet, !0) : xa(a) : exportRoot.uo === exportRoot.vo.zM ? "risk" === b.cmd ? 0 >= wa(a, 1E3) && exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Bet, !0) : "finish" === b.cmd || "start" === b.cmd ? 0 >= wa(a, 1E3) && exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Start,
        !0) : xa(a) : exportRoot.uo === exportRoot.vo.yM && 0 >= wa(a) && exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Line1 + Math.floor(4 * Math.random()) + 1, !0);
    else switch (exportRoot.ta) {
    case exportRoot.m_scenes.Nc:
        switch (exportRoot.pa.ta) {
        case exportRoot.pa.m_scenes.Tb:
            xa(a);
            break;
        case exportRoot.pa.m_scenes.Rf:
            b = pa(a), "risk" === b.cmd ? exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Bet, !0) : "finish" === b.cmd || "start" === b.cmd ? exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Start, !0) : xa(a)
        }
        break;
    case exportRoot.m_scenes.bj:
        exportRoot.Na.ta ===
            exportRoot.Na.m_scenes.ej && (b = pa(a), "risk" === b.cmd ? 0 >= wa(a) && exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Line1 + Math.floor(4 * Math.random()) + 1, !0) : "finish" === b.cmd || "start" === b.cmd ? 0 >= wa(a, 1E3) && exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Start, !0) : xa(a));
        break;
    case exportRoot.m_scenes.Zi:
        exportRoot.Kc = !0;
        exportRoot.va.ta === exportRoot.va.m_scenes.De && (exportRoot.Kc = !1);
        break;
    case exportRoot.m_scenes.cj:
        if (exportRoot.bb.ta === exportRoot.bb.m_scenes.Tb) switch (b = pa(a), loader.m_params.game) {
        case "gg":
            "open" ===
            b.cmd ? exportRoot.bb.Kf(1 == b.args.Super ? 2 : Math.floor(2 * Math.random()), !1) : xa(a);
            break;
        case "pr":
        case "pr2":
            exportRoot.bb.Kf(Math.floor(5 * Math.random()), !1);
            break;
        case "cm2":
            "finish" === b.cmd ? exportRoot.m_buttons.click(exportRoot.m_buttons.m_enum.Start, !0) : "super" === b.cmd ? exportRoot.bb.Kf(Math.floor(2 * Math.random()), !1) : xa(a);
            break;
        default:
            exportRoot.bb.Kf(Math.floor(2 * Math.random()), !1)
        }
    }
};
r.send = function (a, b) {
    "finish" == a && (this.Ei = exportRoot.rb);
    if (void 0 !== loader.m_params.replay) this.nf = setTimeout(this.Ri, 10);
    else if (va(this), this.bm) "status" == a && ("status" == this.mo || 2 <= this.Jf.length && "status" == this.Jf[this.Jf.length - 2]) || (this.Jf.push(a), this.Jf.push(b));
    else {
        this.bm = !0;
        this.mo = a;
        this.xg = void 0 !== b ? b : {};
        this.bq = loader.m_params.server + loader.m_params.game + "/" + loader.m_params.token + "/" + a;
        this.xg["req-id"] = this.no;
        ++this.no;
        switch (a) {
        case "start":
            a = loader.getDenom(), this.Ul != a ? (this.Ul =
                loader.getDenom(), this.xg.Denom = parseInt(this.Sl[this.Ul]), this.zc = exportRoot.ve, this.xg.Bet = this.zc, this.Bc = exportRoot.qb, this.xg.Lines = this.Bc) : (this.zc != exportRoot.ve && (this.zc = exportRoot.ve, this.xg.Bet = this.zc), this.Bc != exportRoot.qb && (this.Bc = exportRoot.qb, this.xg.Lines = this.Bc))
        }
        this.Ro()
    }
};
r.Ro = function () {
    var a = exportRoot.xa.Xh;
    
     var addPrm=exportRoot.xa.bq.split('cm//');
    
    //console.log(exportRoot.xa);
    exportRoot.xa.xg.action=addPrm[1];
 exportRoot.xa.xg.bet=exportRoot.xa.zc;
  exportRoot.xa.xg.lines=exportRoot.xa.Bc;
    
    
    a.open("POST", addPrm[0], !0);
   // a.open("POST", exportRoot.xa.bq, !0);
    a.timeout = exportRoot.xa.kq;
    a.setRequestHeader("Content-Type", "application/json");
    a.send(JSON.stringify(exportRoot.xa.xg))
};
r.read = function (a) {
    this.ec = a = JSON.parse(a);
    if (void 0 !== a.Code) switch (a.Code) {
    case "REJECTED":
        "status" != this.mo && na(this, a.Code + "\n" + a.Message, !0);
        break;
    case "INTERNAL_ERROR":
        ++this.$p;
        2 >= this.$p ? setTimeout(this.Ro, 1E3) : na(this, a.Message);
        break;
    default:
        na(this, a.Message)
    }
    switch (a.cmd) {
    case "status":
        "tp" == loader.m_params.game && exportRoot.uo == exportRoot.vo.VK ? (loader.setCredit(a.Amount), a.Bonusing && "object" == typeof libJP && stage.getChildAt(0) != exportRootJP && (exportRootJP.setJackpot(a.Bonusing), this.jackpot())) :
            exportRoot.pa.ta == exportRoot.pa.m_scenes.Tb && (loader.setCredit(a.Amount), a.Bonusing && "object" == typeof libJP && stage.getChildAt(0) != exportRootJP && (exportRootJP.setJackpot(a.Bonusing), this.jackpot()));
        break;
    case "init":
        this.Ul = a.Denomination;
        if (a.Denominations) {
            for (var b in a.Denominations) this.Sl[a.Denominations[b]] = b;
            if ("tp" == loader.m_params.game) {
                loader.hide();
                this.zc = a.LastBet;
                exportRoot.vM(a.Credit, a.MaxWin, a.BetArray, a.WinCoef, a.LastBet, a.Currency, a.Denomination);
                exportRoot.setScene(exportRoot.m_scenes.Nc);
                exportRoot.xM();
                break
            }
        }
        if (a.FreeSpins) this.zc = a.FreeSpins.Condition.Bet, this.Bc = a.FreeSpins.Condition.Lines, this.Yh = a.FreeSpins.Returned;
        else {
            this.zc = a.LastBet;
            this.Bc = a.LastLines;
            if (loader.m_params.bet)
                for (var e in a.BetArray)
                    if (loader.m_params.bet == a.BetArray[e]) {
                        this.zc = parseInt(loader.m_params.bet);
                        break
                    } loader.m_params.lines && 0 !== loader.m_params.lines % 2 && 1 <= loader.m_params.lines && 9 >= loader.m_params.lines && (this.Bc = parseInt(loader.m_params.lines))
        }
        exportRoot.OK(a.FuseBet);
        exportRoot.sf(this.Bc);
        exportRoot.Eg(this.zc);
        this.zc = a.LastBet;
        this.Bc = a.LastLines;
        exportRoot.jc(0);
        exportRoot.setCredit(a.Credit);
        a.FuseBet && (this.Ci = a.FuseBet, exportRoot.Xi(a.LastBet >= a.FuseBet));
        exportRoot.LK(a.BetArray);
        b = a.BetArray;
        var f = a.HelpCoef;
        e = b[0] + " " + b[b.length - 1] + " " + a.MaxWin;
        this.nh = [];
        for (b = 0; b < f.length; ++b) {
            var k = f[b].reverse().join(" ");
            "0 0 0" != k ? e += " " + k : this.nh.push(b)
        }
        exportRoot.PK(e.split(" "));
        k = Array(5);
        k[0] = [a.Reels[0][0], a.Reels[1][0], a.Reels[2][0]];
        k[1] = [a.Reels[0][1], a.Reels[1][1], a.Reels[2][1]];
        k[2] = [a.Reels[0][2], a.Reels[1][2], a.Reels[2][2]];
        k[3] = [a.Reels[0][3], a.Reels[1][3], a.Reels[2][3]];
        k[4] = [a.Reels[0][4], a.Reels[1][4], a.Reels[2][4]];
        exportRoot.pa.uE(k);
        void 0 !== a.Sprinkler && exportRoot.pa.uM(a.Sprinkler, !1, a.Sprinklers);
        loader.hide();
        exportRoot.setScene(exportRoot.m_scenes.Nc);
        a.Bonusing && "object" == typeof libJP && stage.getChildAt(0) != exportRootJP && (exportRootJP.setJackpot(a.Bonusing), this.jackpot());
        createjs.WebAudioPlugin.context && "running" === createjs.WebAudioPlugin.context.state &&
            exportRoot.m_sound.playSound();
        a.FreeSpins && (exportRoot.So(a.FreeSpins.SpinsLeft), this.Lm(a.FreeSpins.SpinsLeft, a.FreeSpins.Condition.Continue));
        break;
    case "start":
        if ("tp" == loader.m_params.game) {
            exportRoot.MK(a.Hand, a.Deal, a.WinType, a.Holds, a.Credit);
            break
        }
        a.Bonusing && "object" == typeof libJP && stage.getChildAt(0) != exportRootJP && (exportRootJP.setJackpot(a.Bonusing), stage.addEventListener("spinCompleteEvent", this.jackpot));
        a.FreeSpins && (exportRoot.So(a.FreeSpins.SpinsLeft), 0 == a.FreeSpins.SpinsLeft && stage.addEventListener("spinCompleteEvent",
            this.Lm));
        exportRoot.setCredit(a.Credit);
        k = a.LineWins;
        e = "";
        if (0 != k.length)
            for (b = 0; b < k.length; ++b) {
                var n = k[b].Pos.join("").replace(new RegExp(/-1/g), "-");
                e += " L:" + k[b].Element + ":" + k[b].Line + ":" + k[b].Win + ":" + n + ":" + k[b].Count
            }
        b = "";
        if (a.BonusWins || a.Bonus1Wins || a.Bonus2Wins || a.NeedBonus2) {
            for (n = k = f = 0; n < a.Reels.length; ++n)
                for (var w = a.Reels[n], Y = 0; Y < w.length; ++Y) w[Y] == exportRoot.xa.nh[0] ? ++f : null != exportRoot.xa.nh[1] && w[Y] == exportRoot.xa.nh[1] && ++k;
            if (a.BonusWins || a.Bonus1Wins) b += " B:" + exportRoot.xa.nh[0] +
                ":" + f;
            if (a.Bonus2Wins || a.NeedBonus2) b += " B:" + exportRoot.xa.nh[1] + ":" + k
        }
        k = Array(5);
        k[0] = [a.Reels[0][0], a.Reels[1][0], a.Reels[2][0]];
        k[1] = [a.Reels[0][1], a.Reels[1][1], a.Reels[2][1]];
        k[2] = [a.Reels[0][2], a.Reels[1][2], a.Reels[2][2]];
        k[3] = [a.Reels[0][3], a.Reels[1][3], a.Reels[2][3]];
        k[4] = [a.Reels[0][4], a.Reels[1][4], a.Reels[2][4]];
        switch (loader.m_params.game) {
        case "pf":
            exportRoot.pa.sm(k, e + b);
            break;
        case "gg":
            exportRoot.pa.sm(k, e + b);
            break;
        case "fc2":
            exportRoot.pa.sm(k, e + b);
            break;
        default:
            exportRoot.pa.sm(k,
                e + b)
        }
        void 0 != a.RiskCard && void 0 != exportRoot.Na && exportRoot.Na.NK(a.RiskCard);
        void 0 != a.RiskHistory && void 0 != exportRoot.Na && exportRoot.Na.tM(a.RiskHistory);
        if (void 0 != a.BonusWins && void 0 != exportRoot.va) switch (e = [], loader.m_params.game) {
        case "pf":
            for (b = 0; b < a.BonusWins.length; ++b) e.push(a.BonusWins[b].Coef);
            exportRoot.va.setData(e, Math.floor(a.Sprinkler / 9));
            break;
        case "fc":
        case "fc2":
            for (b = f = 0; b < a.BonusWins.length; ++b) null != a.BonusWins[b] ? e.push([a.BonusWins[b].Elem, a.BonusWins[b].Count, a.BonusWins[b].Coef]) :
                (e.push([0, 0, 0]), ++f);
            exportRoot.va.setData(f, e);
            break;
        default:
            for (b = 0; b < a.BonusWins.length; ++b) e.push(a.BonusWins[b].Coef);
            exportRoot.va.setData(e, f)
        }
        if (void 0 != a.Bonus1Wins && void 0 != exportRoot.va) switch (loader.m_params.game) {
        case "gg":
            f = [];
            for (e = 0; e < a.Bonus1Wins.length; ++e) f.push(a.Bonus1Wins[e].Coef);
            e = Array(6);
            for (b = 0; b < a.Bonus1Accums.length; ++b) e[b + 3] = a.Bonus1Accums[b].Count, e[b] = a.Bonus1Accums[b].Value;
            exportRoot.va.setData(f, e, void 0 !== a.Bonus2Wins || void 0 !== a.NeedBonus2);
            break;
        case "pr":
        case "pr2":
            f = [];
            k = [];
            for (b = 0; b < a.Bonus1Wins.length; ++b)
                for (f.push([]), k.push([]), e = 0; e < a.Bonus1Wins[b].length; ++e) n = a.Bonus1Wins[b][e].Gem, f[b].push(n ? n : 0), k[b].push(a.Bonus1Wins[b][e].Die);
            exportRoot.va.setData(f, k)
        }
        if ((void 0 != a.Bonus2Wins || void 0 != a.NeedBonus2) && void 0 != exportRoot.bb) switch (loader.m_params.game) {
        case "gg":
            f = [];
            if (a.Bonus2Wins)
                for (e = 0; e < a.Bonus2Wins.length; ++e) f.push(a.Bonus2Wins[e].Coef);
            exportRoot.bb.setData(f, a.SuperKeyPresent);
            a.SuperWin && exportRoot.bb.ur(a.SuperWin.Win);
            break;
        case "pr":
        case "pr2":
            f = [];
            for (e = 0; e < a.Bonus2Wins.length; ++e) f.push(a.Bonus2Wins[e].Coef);
            exportRoot.bb.setData(f, void 0 != a.Bonus1Wins);
            break;
        default:
            f = [];
            for (e = 0; e < a.Bonus2Wins.length; ++e) f.push(a.Bonus2Wins[e].Coef);
            exportRoot.bb.setData(f)
        }
        if (void 0 != a.SuperWin && void 0 != exportRoot.bb) switch (loader.m_params.game) {
        case "gg":
            exportRoot.bb.ur(a.SuperWin.Win);
            break;
        default:
            exportRoot.bb.setData(a.SuperWin.Coef)
        }
        break;
    case "risk":
        if ("tp" == loader.m_params.game) {
            exportRoot.wM(a.Dealer, a.Other, a.Player, a.PrevWin, a.Win);
            break
        }
        switch (loader.m_params.game) {
        case "is":
        case "pr":
        case "sl":
            exportRoot.Na.setData(a.Win);
            break;
        default:
            f = [a.Dealer, a.Player, a.Other[0], a.Other[1], a.Other[2]], null != a.RiskCard && f.push(a.RiskCard), exportRoot.Na.setData(f, a.Win)
        }
        break;
    case "super":
        exportRoot.bb.setData(a.SuperWin.Coef);
        break;
    case "open":
        exportRoot.bb.sM(a.LockWin.Coef);
        a.SuperWin && exportRoot.bb.ur(a.SuperWin.Win);
        break;
    case "deal":
        "tp" == loader.m_params.game && exportRoot.MK(a.Hand, a.Deal, a.WinType, a.Holds, a.Credit);
        break;
    case "finish":
        "tp" == loader.m_params.game ? exportRoot.tr() : exportRoot.pa.tr()
    }
    a.Currency && a.Denomination &&
        (exportRootInt.setDenom(a.Denomination, a.Currency, a.Denominations), exportRootInt.setTotalBet(exportRoot.Ff()));
    a.Amount && exportRootInt.setBalance(a.Amount, a.RawCredit > a.Credit);
    void 0 === a.Code && void 0 === loader.m_params.replay && va(this);
    this.bm = !1;
    0 < this.Jf.length && this.send(this.Jf.shift(), this.Jf.shift())
};

function ya(a, b, e, f, k, n) {
    a.tickEnabled = !1;
    a.mouseEnabled = !1;
    f && (f.mouseEnabled = !1);
    k && (k.mouseEnabled = !1);
    this.oo = !0;
    this.FG = 16;
    void 0 === n ? this.aq = !1 : this.aq = n;
    this.ub = a;
    this.Dc = 60 * b / lib.properties.fps;
    this.IG = loader.getDelay(e);
    this.Dc -= 10;
    this.Sh = f;
    this.sg = k;
    this.so = 8;
    this.iq = 4;
    this.Ki = this.iq / this.so * 2;
    this.Li = !0;
    this.mq = 0;
    this.ff;
    this.ub.ye.visible = !1;
    this.zf = [a.Oc, a.Uf, a.Vf, a.Wf, a.Nh];
    a == exportRoot.pa.ci ? a.name = 0 : a == exportRoot.pa.di ? a.name = 1 : a == exportRoot.pa.ei ? a.name = 2 : a == exportRoot.pa.fi ? a.name =
        3 : a == exportRoot.pa.gi && (a.name = 4);
    this.lq = this.ub.y
}
ya.prototype.reset = function () {
    this.Li = !0;
    this.ub.ye.visible = !1;
    Z(this, 1, !1);
    Z(this, 2, !0);
    Z(this, 3, !0);
    Z(this, 4, !0);
    Z(this, 5, !1);
    this.Sh && this.sg && (this.Sh.gotoAndStop("right"), this.sg.gotoAndStop("right"))
};

function ta(a, b) {
    a.ub.y = a.lq;
    a.ub.Oc.y = 0;
    a.ub.Uf.y = a.ub.Oc.y + a.ub.Oc.getBounds().height;
    a.ub.Vf.y = a.ub.Uf.y + a.ub.Oc.getBounds().height;
    a.ub.Wf.y = a.ub.Vf.y + a.ub.Oc.getBounds().height;
    a.ub.Nh.y = a.ub.Wf.y + a.ub.Oc.getBounds().height;
    b && (a.ub.Uf.gotoAndStop(b[0]), a.ub.Vf.gotoAndStop(b[1]), a.ub.Wf.gotoAndStop(b[2]));
    a.reset()
}

function Z(a, b, e) {
    a: {
        var f = b;--f;
        for (var k = 0; 5 > k; ++k)
            if (a.zf[k].y == a.ub.Oc.getBounds().height * f) {
                a = a.zf[k];
                break a
            } a = void 0
    }
    void 0 !== a ? a.visible = e ? !0 : !1 : console.log("Can't find " + b + " element")
}

function za(a, b) {
    if (b)
        for (b = 0; 5 > b; ++b) a.zf[b].visible = !0;
    else
        for (b = 0; 5 > b; ++b) a.zf[b].visible = !1
}
ya.prototype.start = function () {
    this.Li = !1;
    this.rh = this.mq;
    this.ro = this.so;
    this.Ki = Math.abs(this.Ki);
    this.Sh && this.sg && (this.Sh.gotoAndPlay("all"), this.sg.gotoAndPlay("all"));
    this.oo ? (this.ub.ye.gotoAndPlay("play" + this.ub.name), this.ub.ye.visible = !0, za(this, !1), this.ub.tickEnabled = !0) : (this.ub.ye.visible = !1, za(this, !0))
};
ya.prototype.update = function () {
    if (0 == this.Li)
        if (0 < this.rh) {
            var a = 5 * this.ub.Oc.getBounds().height;
            if (1 == this.rh)
                for (var b = 0; 5 > b; ++b) {
                    var e = this.zf[b];
                    if (e.y + this.jo > a) {
                        this.jo = a - e.y;
                        break
                    }
                }
            for (b = 0; 5 > b; ++b)
                if (e = this.zf[b], e.y += this.jo, e.y >= a) {
                    --this.rh;
                    e.y -= a;
                    if (3 < this.rh && 0 != this.rh) {
                        var f = this.zf[4 == b ? 0 : b];
                        do var k = Math.ceil(Math.random() * this.qM); while (k == f.currentFrame);
                        e.gotoAndStop(k)
                    } else e.gotoAndStop(this.ff[this.rh - 1]);
                    0 == this.oo && void 0 === e.parent && (e.visible = !0, this.zf[4 == b ? 0 : b].visible = !1);
                    e.fj = void 0
                } 0 == this.rh && (this.oo && (this.ub.ye.visible = !1, this.ub.tickEnabled = !1), Z(this, 1, !1), Z(this, 2, !0), Z(this, 3, !0), Z(this, 4, !0), Z(this, 5, 0 == this.FG ? !0 : !1), this.sg && this.sg.gotoAndPlay("right"))
        } else 0 < this.ro ? (this.ro == this.so && (this.aq && (a = exportRoot.m_sound, a.Yc.reel_rotation && (a.Yc.reel_rotation.stop(), delete a.Yc.reel_rotation, a.mf.reel_rotation && (clearTimeout(a.mf.reel_rotation), delete a.mf.reel_rotation)), this.sg && this.sg.gotoAndStop("right")), exportRoot.m_sound.playSound("reel_stop")),
            this.ub.y -= this.Ki, this.ub.y <= this.lq - this.iq && (this.Ki = -this.Ki), --this.ro) : (Z(this, 5, !1), this.Li = !0, this.Sh && this.Sh.gotoAndStop("right"));
    return this.Li
};

function Aa() {
    Aa.prototype.Yc = {};
    Aa.prototype.hf;
    Aa.prototype.$l = !1;
    Aa.prototype.gm;
    Aa.prototype.mf = {};
    Aa.prototype.Vh = 1;
    Aa.prototype.hq = !1;
    Aa.prototype.EG;
    window.addEventListener("click", this.Fo)
}
r = Aa.prototype;
r.Fo = function () {
    try {
        createjs.WebAudioPlugin.context && "suspended" === createjs.WebAudioPlugin.context.state ? (createjs.WebAudioPlugin.context.resume(), window.removeEventListener("click", exportRoot.m_sound.Fo)) : createjs.WebAudioPlugin.context && "running" === createjs.WebAudioPlugin.context.state && window.removeEventListener("click", exportRoot.m_sound.Fo)
    } catch (a) {}
};
r.reverseMute = function () {
    this.$l = !this.$l;
    createjs.Sound.muted = this.$l
};
r.playSound = function (a, b, e, f, k, n, w, Y) {
    this.EG = a;
    !this.hq && this.hf && "playSucceeded" !== this.hf.playState && this.hf.play();
    this.hq = !0;
    if (void 0 !== a) return w = w ? createjs.Sound.play(a, (new createjs.PlayPropsConfig).set({
        offset: w
    })) : createjs.Sound.play(a), !0 === b && (w.loop = -1), this.Yc[a] = w, e && (w.volume = e), void 0 !== f && !1 !== f && (w.on("complete", this.TK, this), this.gj(f, this.Vh / 10), void 0 !== k && !1 !== k && (this.Vh = k), n && (w.volume = 0, this.xp(a, e, e / 10))), Y && (w.duration = Y), w
};
r.xp = function (a, b, e) {
    this.mf[a] && (clearTimeout(this.mf[a]), this.mf[a] = void 0);
    var f = !1,
        k = this.Yc[a];
    k.volume <= b ? (k.volume += e, k.volume >= b && (f = !0, k.volume = b)) : (k.volume -= e, k.volume <= b && (f = !0, k.volume = b));
    f || (this.mf[a] = setTimeout(this.xp.bind(this, a, b, e), 100))
};
r.gj = function (a, b) {
    this.gm && (clearTimeout(this.gm), this.gm = void 0);
    var e = !1,
        f = this.hf;
    void 0 !== f && (f.volume <= a ? (f.volume += b, f.volume >= a && (e = !0, f.volume = a)) : (f.volume -= b, f.volume <= a && (e = !0, f.volume = a)), e || (this.gm = setTimeout(this.gj.bind(this, a, b), 100)))
};
r.TK = function (a) {
    a.target.removeAllEventListeners();
    this.gj(this.Vh, this.Vh / 10)
};
r.stopAllSounds = function () {
    for (var a in this.Yc) "button_click" != a && (this.Yc[a].stop(), delete this.Yc[a], this.mf[a] && (clearTimeout(this.mf[a]), this.mf[a] = void 0, delete this.mf[a]));
    this.gj(this.Vh, this.Vh / 10)
};

function Ba(a) {
    var b = exportRoot.ve,
        e = exportRoot.wg,
        f = exportRoot.Ff(),
        k = exportRoot.qb,
        n = exportRoot.Ol;
    if (0 <= a.ph)
        if (0 == a.ph) exportRoot.So(-1);
        else {
            exportRoot.m_buttons.disableAll(!1, exportRoot.m_buttons.m_enum.Help, exportRoot.m_buttons.m_enum.Start);
            0 == a.vg && (a.Lb.gotoAndStop(), a.Lb.visible = !1);
            a.vg = !0;
            exportRoot.parent ? exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Help) : exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.Help);
            exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Start);
            exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.AutoPlay);
            return
        } if (e < f) {
        a.vg && (stage.dispatchEvent("lowCreditEvent"), a.vg = !1);
        if (e < n[0]) 0 == a.Lb.visible && (a.Lb.gotoAndPlay("add_credit"), a.Lb.visible = !0);
        else if (exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Start, !0) || exportRoot.autoPlay())
            if (e >= n[0] * k) {
                if (!a.Lb.parent || !a.Lb.visible) {
                    stage.dispatchEvent("needChangeBetEvent");
                    if ("function" === typeof window.onNeedChangeBet) window.onNeedChangeBet(exportRoot.xa.ec.RawCredit);
                    a.addChild(a.Lb);
                    a.Lb.gotoAndPlay("change_bet");
                    a.Lb.visible = !0
                }
            } else if (!a.Lb.parent || !a.Lb.visible) {
            stage.dispatchEvent("needChangeLinesEvent");
            if ("function" === typeof window.onNeedChangeLines) window.onNeedChangeLines(exportRoot.xa.ec.RawCredit);
            a.addChild(a.Lb);
            a.Lb.gotoAndPlay("change_lines");
            a.Lb.visible = !0
        }
        exportRoot.autoPlay() && (exportRoot.m_buttons.revert(exportRoot.m_buttons.m_enum.AutoPlay), exportRoot.Kc = !1)
    } else a.vg || (a.Lb.stop(), a.Lb.visible = !1, a.vg = !0);
    if (exportRoot.autoPlay()) exportRoot.m_buttons.disableAll();
    else {
        for (var w = 0; 5 > w; ++w)(1 + 2 * w) * (0 == w ? n[0] : b) > e ? exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.Line1 + w) : exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line1 + w);
        exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Help);
        a.vg ? (exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Start), a = n.indexOf(b), 0 == a && f >= e ? exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.Bet) : exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Bet), a == n.length - 1 || f >= e ? exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.MaxBet) :
            exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.MaxBet), exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.AutoPlay)) : (exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.AutoPlay), exportRoot.autoPlay() && (exportRoot.m_buttons.revert(exportRoot.m_buttons.m_enum.AutoPlay), exportRoot.Kc = !1), exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.Start), e >= n[0] * k ? (exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Bet), exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.MaxBet)) :
            (exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.Bet), exportRoot.m_buttons.disable(exportRoot.m_buttons.m_enum.MaxBet)))
    }
};
(function (a, b, e, f) {
    function k() {
        var a = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
        a.gotoAndStop(this.currentFrame);
        a.paused = this.paused;
        a.framerate = this.framerate;
        return a
    }

    function n(a, b, f) {
        a = e.extend(a, e.MovieClip);
        a.clone = k;
        a.nominalBounds = b;
        a.frameBounds = f;
        return a
    }
    a.ssMetadata = [{
        name: "cm_atlas_",
        frames: [
            [230, 1202, 96, 48],
            [512, 0, 576, 144],
            [512, 146, 576, 80],
            [842, 1766, 32, 48],
            [704, 1318, 64, 64],
            [1594, 1968, 32, 16],
            [1016, 1992, 16, 16],
            [998, 1992, 16, 16],
            [234, 1670, 32, 64],
            [956,
                1482, 48, 64
            ],
            [650, 1880, 16, 64],
            [200, 1670, 32, 64],
            [756, 1650, 48, 48],
            [0, 1972, 32, 16],
            [1138, 1992, 16, 16],
            [1444, 1948, 48, 16],
            [1596, 1950, 48, 16],
            [392, 1020, 112, 48],
            [66, 1326, 64, 64],
            [1240, 1320, 64, 64],
            [1438, 1328, 64, 64],
            [1738, 1328, 64, 64],
            [1306, 1320, 64, 64],
            [1372, 1320, 64, 64],
            [976, 1332, 64, 64],
            [1804, 1328, 64, 64],
            [1042, 1332, 64, 64],
            [1472, 1882, 16, 64],
            [1490, 1882, 16, 64],
            [1222, 1880, 16, 64],
            [1508, 1882, 16, 64],
            [926, 1766, 48, 32],
            [976, 1766, 48, 32],
            [876, 1766, 48, 32],
            [1438, 1882, 32, 32],
            [1608, 1882, 32, 32],
            [1642, 1882, 32, 32],
            [1240, 1880, 32, 32],
            [1188, 1880, 32, 32],
            [198, 1888, 32, 32],
            [1136, 1688, 64, 32],
            [1070, 1672, 64, 32],
            [1628, 1696, 64, 32],
            [268, 1686, 64, 32],
            [1526, 1888, 32, 32],
            [702, 1888, 32, 32],
            [232, 1888, 32, 32],
            [668, 1888, 32, 32],
            [1870, 1766, 48, 32],
            [1920, 1766, 48, 32],
            [336, 1768, 48, 32],
            [1006, 1482, 48, 64],
            [0, 1486, 48, 64],
            [50, 1486, 48, 64],
            [1970, 1766, 32, 48],
            [1836, 1766, 32, 48],
            [2004, 1766, 32, 48],
            [1768, 1766, 32, 48],
            [1802, 1766, 32, 48],
            [0, 1334, 64, 64],
            [770, 1334, 64, 64],
            [1108, 1334, 64, 64],
            [264, 1334, 64, 64],
            [462, 1336, 64, 64],
            [396, 1336, 64, 64],
            [1694, 1888, 16, 64],
            [1560, 1888, 16, 64],
            [1676, 1882, 16, 64],
            [1578, 1888, 16, 64],
            [736, 1888, 16, 64],
            [330, 1336, 64, 64],
            [1174, 1334, 64, 64],
            [528, 1336, 64, 64],
            [1870, 1334, 64, 64],
            [1868, 1972, 32, 16],
            [1628, 1972, 32, 16],
            [1902, 1972, 32, 16],
            [1662, 1972, 32, 16],
            [1696, 1972, 32, 16],
            [1500, 1992, 16, 16],
            [1482, 1992, 16, 16],
            [1156, 1992, 16, 16],
            [1536, 1992, 16, 16],
            [1518, 1992, 16, 16],
            [1554, 1992, 16, 16],
            [1498, 1698, 32, 64],
            [334, 1686, 32, 64],
            [706, 1700, 32, 64],
            [774, 1700, 32, 64],
            [740, 1700, 32, 64],
            [1762, 1696, 32, 64],
            [200, 1486, 48, 64],
            [250, 1486, 48, 64],
            [300, 1486, 48, 64],
            [350, 1486, 48, 64],
            [100, 1486,
                48, 64
            ],
            [150, 1486, 48, 64],
            [1912, 1888, 16, 64],
            [1730, 1888, 16, 64],
            [1748, 1888, 16, 64],
            [1712, 1888, 16, 64],
            [1930, 1888, 16, 64],
            [1694, 1696, 32, 64],
            [808, 1700, 32, 64],
            [1728, 1696, 32, 64],
            [1606, 1238, 16, 48],
            [1948, 1650, 48, 48],
            [1898, 1650, 48, 48],
            [1798, 1650, 48, 48],
            [1848, 1650, 48, 48],
            [378, 1652, 48, 48],
            [1998, 1650, 48, 48],
            [226, 1974, 32, 16],
            [664, 1974, 32, 16],
            [260, 1974, 32, 16],
            [630, 1974, 32, 16],
            [156, 1974, 32, 16],
            [1782, 1992, 16, 16],
            [1800, 1992, 16, 16],
            [1818, 1992, 16, 16],
            [1646, 1954, 48, 16],
            [1696, 1954, 48, 16],
            [294, 1974, 16, 32],
            [190, 1974, 16, 32],
            [698, 1974, 16, 32],
            [208, 1974, 16, 32],
            [716, 1974, 16, 32],
            [1372, 1040, 112, 48],
            [1258, 1020, 112, 48],
            [506, 1038, 112, 48],
            [1882, 1020, 112, 48],
            [638, 1030, 112, 48],
            [1654, 1366, 64, 64],
            [420, 1768, 32, 48],
            [386, 1768, 32, 48],
            [1936, 1368, 64, 64],
            [1504, 1370, 64, 64],
            [902, 1382, 64, 64],
            [198, 1384, 64, 64],
            [660, 1384, 64, 64],
            [836, 1350, 64, 64],
            [132, 1384, 64, 64],
            [1240, 1386, 64, 64],
            [594, 1360, 64, 64],
            [1588, 1366, 64, 64],
            [1966, 1888, 16, 64],
            [266, 1890, 16, 64],
            [1948, 1888, 16, 64],
            [338, 1890, 16, 64],
            [302, 1890, 16, 64],
            [320, 1890, 16, 64],
            [284, 1890, 16, 64],
            [1306, 1386,
                64, 64
            ],
            [980, 1974, 32, 16],
            [768, 1974, 32, 16],
            [1138, 1974, 32, 16],
            [734, 1974, 32, 16],
            [1014, 1974, 32, 16],
            [802, 1974, 32, 16],
            [836, 1974, 32, 16],
            [1836, 1992, 16, 16],
            [938, 1994, 16, 16],
            [876, 1700, 32, 64],
            [842, 1700, 32, 64],
            [1830, 1700, 32, 64],
            [944, 1700, 32, 64],
            [978, 1700, 32, 64],
            [1012, 1700, 32, 64],
            [910, 1700, 32, 64],
            [1864, 1700, 32, 64],
            [1796, 1700, 32, 64],
            [1250, 1488, 48, 64],
            [400, 1486, 48, 64],
            [1970, 1500, 48, 64],
            [808, 1498, 48, 64],
            [1920, 1500, 48, 64],
            [1150, 1488, 48, 64],
            [1476, 1502, 48, 64],
            [1300, 1488, 48, 64],
            [1200, 1488, 48, 64],
            [880, 1890, 16, 64],
            [808,
                1890, 16, 64
            ],
            [826, 1890, 16, 64],
            [790, 1890, 16, 64],
            [754, 1890, 16, 64],
            [898, 1890, 16, 64],
            [844, 1890, 16, 64],
            [772, 1890, 16, 64],
            [862, 1890, 16, 64],
            [1898, 1700, 32, 64],
            [368, 1702, 32, 64],
            [402, 1702, 32, 64],
            [1932, 1700, 32, 64],
            [436, 1702, 32, 64],
            [2E3, 1700, 32, 64],
            [1966, 1700, 32, 64],
            [470, 1702, 32, 64],
            [1588, 1304, 16, 48],
            [478, 1652, 48, 48],
            [428, 1652, 48, 48],
            [1550, 584, 48, 80],
            [1482, 1974, 32, 16],
            [1516, 1974, 32, 16],
            [956, 1994, 16, 16],
            [1120, 1994, 16, 16],
            [170, 1956, 48, 16],
            [220, 1956, 48, 16],
            [270, 1956, 48, 16],
            [644, 1956, 48, 16],
            [1902, 1954, 48, 16],
            [1494,
                1956, 48, 16
            ],
            [1746, 1958, 48, 16],
            [794, 1956, 48, 16],
            [744, 1956, 48, 16],
            [894, 1960, 48, 16],
            [694, 1956, 48, 16],
            [1544, 1956, 48, 16],
            [1052, 1960, 48, 16],
            [844, 1956, 48, 16],
            [972, 1052, 112, 48],
            [1086, 1052, 112, 48],
            [114, 1046, 112, 48],
            [0, 1070, 112, 48],
            [228, 1070, 112, 48],
            [1102, 1994, 16, 16],
            [1550, 1974, 32, 16],
            [1832, 1974, 32, 16],
            [1730, 1976, 32, 16],
            [870, 1978, 32, 16],
            [66, 1392, 64, 64],
            [1372, 1386, 64, 64],
            [1420, 1254, 64, 64],
            [778, 1268, 64, 64],
            [1108, 1268, 64, 64],
            [1042, 1266, 64, 64],
            [264, 1268, 64, 64],
            [1174, 1268, 64, 64],
            [976, 1266, 64, 64],
            [0, 1268, 64, 64],
            [1006, 1874, 16, 64],
            [1894, 1872, 16, 64],
            [66, 1260, 64, 64],
            [132, 1202, 96, 48],
            [2026, 708, 16, 352],
            [760, 964, 16, 352],
            [2032, 354, 16, 352],
            [2025, 0, 16, 352],
            [2008, 532, 16, 352],
            [1846, 972, 16, 352],
            [1864, 972, 16, 352],
            [620, 972, 16, 352],
            [1828, 972, 16, 352],
            [1486, 974, 16, 352],
            [1504, 974, 16, 352],
            [1994, 1876, 32, 32],
            [444, 1880, 32, 32],
            [478, 1880, 32, 32],
            [1860, 1872, 32, 32],
            [68, 1670, 64, 32],
            [806, 1666, 64, 32],
            [134, 1670, 64, 32],
            [474, 1584, 64, 32],
            [512, 1880, 32, 32],
            [546, 1880, 32, 32],
            [598, 1880, 32, 32],
            [1480, 1764, 32, 48],
            [0, 1762, 32, 48],
            [1080, 1764, 32, 48],
            [396, 1270, 64, 64],
            [1882, 1268, 64, 64],
            [330, 1270, 64, 64],
            [462, 1270, 64, 64],
            [580, 1880, 16, 64],
            [1024, 1874, 16, 64],
            [632, 1880, 16, 64],
            [1170, 1874, 16, 64],
            [980, 1992, 16, 16],
            [938, 1666, 64, 32],
            [872, 1666, 64, 32],
            [1004, 1666, 64, 32],
            [740, 1766, 32, 48],
            [774, 1766, 32, 48],
            [1514, 1764, 32, 48],
            [706, 1766, 32, 48],
            [808, 1766, 32, 48],
            [1672, 1300, 64, 64],
            [1522, 1304, 64, 64],
            [198, 1318, 64, 64],
            [132, 1318, 64, 64],
            [528, 1270, 64, 64],
            [844, 1284, 64, 64],
            [1948, 1302, 64, 64],
            [638, 1294, 64, 64],
            [910, 1316, 64, 64],
            [1606, 1300, 64, 64],
            [486, 322, 16, 64],
            [916, 780, 16, 64],
            [2008,
                886, 16, 64
            ],
            [1070, 390, 16, 64],
            [838, 604, 16, 64],
            [2030, 1120, 16, 64],
            [1574, 684, 32, 16],
            [180, 1096, 32, 16],
            [660, 1360, 32, 16],
            [132, 1178, 32, 16],
            [1806, 672, 32, 16],
            [558, 1402, 32, 16],
            [358, 1436, 32, 16],
            [908, 1516, 32, 16],
            [1674, 1514, 32, 16],
            [1156, 1102, 32, 16],
            [1587, 520, 16, 16],
            [604, 1652, 32, 64],
            [646, 898, 32, 64],
            [720, 1080, 32, 64],
            [638, 1652, 32, 64],
            [672, 1652, 32, 64],
            [1226, 1652, 32, 64],
            [570, 1652, 32, 64],
            [1294, 1652, 32, 64],
            [1260, 1652, 32, 64],
            [1362, 1652, 32, 64],
            [758, 1450, 48, 64],
            [1996, 1434, 48, 64],
            [658, 1450, 48, 64],
            [1946, 1434, 48, 64],
            [452, 1452,
                48, 64
            ],
            [502, 1452, 48, 64],
            [1376, 1452, 48, 64],
            [1504, 1436, 48, 64],
            [708, 1450, 48, 64],
            [1704, 1234, 48, 64],
            [576, 1122, 16, 64],
            [2028, 1834, 16, 64],
            [1328, 1652, 32, 64],
            [1672, 1106, 48, 48],
            [1304, 1554, 32, 16],
            [916, 846, 16, 16],
            [1868, 1544, 48, 16],
            [1200, 1052, 48, 16],
            [1314, 1070, 48, 16],
            [1100, 766, 48, 16],
            [392, 1552, 48, 16],
            [132, 1570, 48, 16],
            [1386, 1592, 48, 16],
            [1510, 798, 48, 16],
            [456, 1070, 48, 16],
            [798, 1564, 48, 16],
            [422, 518, 48, 16],
            [0, 1020, 112, 48],
            [1114, 1722, 32, 48],
            [1148, 1722, 32, 48],
            [1566, 1730, 32, 48],
            [268, 1720, 32, 48],
            [1600, 1730, 32, 48],
            [328, 1202,
                64, 64
            ],
            [1156, 1202, 64, 64],
            [0, 1202, 64, 64],
            [1222, 1202, 64, 64],
            [910, 1250, 64, 64],
            [132, 1252, 64, 64],
            [460, 1204, 64, 64],
            [526, 1204, 64, 64],
            [1948, 1236, 64, 64],
            [1882, 1202, 64, 64],
            [706, 1618, 32, 16],
            [844, 1218, 64, 64],
            [1638, 1234, 64, 64],
            [638, 1228, 64, 64],
            [1540, 1238, 64, 64],
            [1430, 1652, 32, 64],
            [1396, 1652, 32, 64],
            [1770, 1478, 48, 64],
            [1720, 1478, 48, 64],
            [1426, 1460, 48, 64],
            [1820, 1478, 48, 64],
            [1870, 1478, 48, 64],
            [394, 1204, 64, 64],
            [1288, 1254, 64, 64],
            [1354, 1254, 64, 64],
            [198, 1252, 64, 64],
            [1894, 970, 128, 48],
            [1258, 970, 128, 48],
            [1766, 1006, 16, 320],
            [1522,
                974, 16, 320
            ],
            [1964, 532, 32, 288],
            [1991, 0, 32, 288],
            [0, 650, 576, 16],
            [594, 1122, 16, 160],
            [1732, 1006, 32, 160],
            [1032, 666, 576, 16],
            [328, 816, 80, 32],
            [1540, 1048, 80, 16],
            [1150, 1434, 80, 16],
            [726, 1816, 80, 16],
            [1532, 1816, 80, 16],
            [1748, 1816, 80, 16],
            [1795, 0, 96, 384],
            [1090, 114, 96, 384],
            [1188, 114, 96, 384],
            [1893, 0, 96, 384],
            [1286, 114, 96, 384],
            [324, 518, 96, 16],
            [1022, 864, 64, 16],
            [1540, 1188, 96, 48],
            [1948, 1186, 96, 48],
            [0, 1654, 32, 64],
            [34, 1654, 32, 64],
            [1594, 1664, 32, 64],
            [1464, 1652, 32, 64],
            [1288, 1120, 16, 48],
            [898, 878, 16, 48],
            [874, 952, 16, 48],
            [642, 604,
                96, 96
            ],
            [740, 604, 96, 96],
            [1610, 614, 96, 96],
            [972, 390, 96, 96],
            [1708, 614, 96, 96],
            [0, 668, 96, 96],
            [98, 668, 96, 96],
            [196, 668, 96, 96],
            [294, 668, 96, 96],
            [392, 668, 96, 96],
            [490, 668, 96, 96],
            [838, 682, 96, 96],
            [168, 1736, 96, 16],
            [1078, 264, 8, 16],
            [1078, 372, 8, 16],
            [1078, 246, 8, 16],
            [1078, 336, 8, 16],
            [1078, 282, 8, 16],
            [1078, 354, 8, 16],
            [1078, 300, 8, 16],
            [472, 518, 8, 16],
            [1078, 228, 8, 16],
            [1078, 318, 8, 16],
            [522, 938, 16, 32],
            [1702, 1072, 16, 32],
            [594, 1284, 16, 32],
            [1504, 1328, 16, 32],
            [1578, 212, 16, 32],
            [1476, 1460, 16, 32],
            [1070, 456, 16, 32],
            [268, 1804, 16, 32],
            [1450,
                1526, 16, 32
            ],
            [2002, 1616, 16, 32],
            [1720, 1366, 16, 16],
            [1592, 1548, 16, 16],
            [910, 1218, 16, 16],
            [1566, 1706, 16, 16],
            [168, 1704, 16, 16],
            [1738, 1300, 16, 16],
            [1920, 1478, 16, 16],
            [860, 1120, 16, 16],
            [42, 1720, 16, 16],
            [302, 1720, 16, 16],
            [2008, 952, 16, 16],
            [1350, 1488, 16, 16],
            [1648, 1614, 16, 16],
            [1668, 1730, 16, 16],
            [1628, 1664, 16, 16],
            [110, 1738, 16, 16],
            [294, 980, 16, 16],
            [1410, 1896, 16, 16],
            [1744, 1796, 16, 16],
            [560, 1914, 16, 16],
            [1614, 1816, 16, 32],
            [1192, 1820, 16, 32],
            [2018, 1950, 16, 32],
            [984, 1892, 16, 32],
            [1410, 1950, 16, 32],
            [238, 1922, 16, 32],
            [1952, 1954, 16, 32],
            [1280, 1812, 16, 32],
            [436, 1818, 16, 32],
            [320, 1956, 16, 32],
            [1868, 1906, 16, 16],
            [1444, 1844, 16, 16],
            [538, 1744, 16, 16],
            [1444, 1916, 16, 16],
            [1052, 1940, 16, 16],
            [500, 1984, 16, 16],
            [170, 1894, 16, 16],
            [1408, 1984, 16, 16],
            [1900, 1990, 16, 16],
            [752, 1992, 16, 16],
            [262, 1992, 16, 16],
            [226, 1992, 16, 16],
            [630, 1992, 16, 16],
            [648, 1992, 16, 16],
            [156, 1992, 16, 16],
            [734, 1992, 16, 16],
            [666, 1992, 16, 16],
            [244, 1992, 16, 16],
            [1918, 1990, 16, 16],
            [770, 1992, 16, 16],
            [1102, 1960, 16, 32],
            [84, 1962, 16, 32],
            [102, 1962, 16, 32],
            [338, 1956, 16, 32],
            [962, 1960, 16, 32],
            [138, 1962, 16, 32],
            [120, 1962, 16, 32],
            [1120, 1960, 16, 32],
            [1264, 1964, 16, 32],
            [1796, 1958, 16, 32],
            [944, 1960, 16, 32],
            [1282, 1964, 16, 32],
            [1814, 1958, 16, 32],
            [1318, 1964, 16, 32],
            [1300, 1964, 16, 32],
            [1390, 1964, 16, 32],
            [1372, 1964, 16, 32],
            [356, 1966, 16, 32],
            [446, 1966, 16, 32],
            [374, 1966, 16, 32],
            [1336, 1964, 16, 32],
            [428, 1966, 16, 32],
            [392, 1966, 16, 32],
            [1354, 1964, 16, 32],
            [410, 1966, 16, 32],
            [302, 1752, 32, 48],
            [42, 1738, 32, 48],
            [168, 1754, 32, 48],
            [1634, 1730, 32, 48],
            [504, 1744, 32, 48],
            [76, 1738, 32, 48],
            [202, 1754, 32, 48],
            [1328, 1760, 32, 48],
            [1362, 1760, 32, 48],
            [1396, 1760, 32,
                48
            ],
            [1422, 486, 163, 54],
            [1902, 776, 47, 35],
            [1090, 0, 509, 112],
            [0, 0, 510, 320],
            [858, 1482, 96, 32],
            [1587, 486, 112, 32],
            [1430, 1760, 48, 32],
            [726, 1400, 80, 48],
            [594, 1948, 48, 16],
            [1178, 1948, 48, 16],
            [424, 1948, 48, 16],
            [474, 1948, 48, 16],
            [512, 228, 224, 160],
            [1968, 1816, 80, 16],
            [440, 938, 80, 80],
            [936, 684, 112, 80],
            [806, 1992, 16, 16],
            [824, 1992, 16, 16],
            [464, 1966, 16, 32],
            [788, 1992, 16, 16],
            [212, 880, 32, 32],
            [482, 1966, 32, 16],
            [842, 1992, 16, 16],
            [870, 584, 160, 96],
            [1540, 1072, 160, 32],
            [456, 1088, 160, 32],
            [1158, 1638, 48, 48],
            [1648, 1646, 48, 48],
            [1698, 1646, 48, 48],
            [1598, 1614, 48, 48],
            [328, 1636, 48, 48],
            [1502, 1648, 48, 48],
            [1748, 1646, 48, 48],
            [706, 1650, 48, 48],
            [1601, 0, 192, 256],
            [638, 1080, 80, 64],
            [594, 1966, 16, 32],
            [1464, 1966, 16, 32],
            [612, 1966, 16, 32],
            [1178, 1966, 16, 32],
            [1196, 1966, 16, 32],
            [1428, 1966, 16, 32],
            [1446, 1966, 16, 32],
            [1668, 1762, 48, 32],
            [1718, 1762, 48, 32],
            [1784, 1006, 16, 320],
            [1802, 1006, 16, 320],
            [1388, 584, 160, 80],
            [1384, 114, 144, 112],
            [1210, 584, 176, 80],
            [778, 1034, 80, 32],
            [1608, 532, 240, 80],
            [552, 1508, 96, 32],
            [538, 1776, 96, 16],
            [1526, 1514, 96, 32],
            [650, 1516, 96, 32],
            [1032, 584, 176, 80],
            [354,
                1818, 80, 16
            ],
            [1530, 114, 64, 96],
            [738, 228, 224, 160],
            [324, 570, 544, 32],
            [1634, 972, 192, 32],
            [1766, 1890, 32, 32],
            [70, 1996, 16, 16],
            [950, 1892, 32, 32],
            [88, 1996, 16, 16],
            [1720, 1994, 16, 16],
            [1800, 1890, 32, 32],
            [916, 1892, 32, 32],
            [106, 1996, 16, 16],
            [1122, 1892, 32, 32],
            [860, 1996, 16, 16],
            [34, 1894, 32, 32],
            [124, 1996, 16, 16],
            [1738, 1994, 16, 16],
            [878, 1996, 16, 16],
            [68, 1894, 32, 32],
            [1088, 1892, 32, 32],
            [896, 1996, 16, 16],
            [972, 500, 448, 48],
            [1050, 684, 112, 80],
            [966, 550, 640, 32],
            [324, 536, 640, 32],
            [1384, 228, 192, 16],
            [132, 1450, 224, 16],
            [858, 1464, 224, 16],
            [0, 1468,
                224, 16
            ],
            [0, 632, 640, 16],
            [0, 614, 640, 16],
            [226, 1468, 224, 16],
            [1150, 1452, 224, 16],
            [1720, 1460, 224, 16],
            [1150, 1470, 224, 16],
            [892, 1070, 64, 80],
            [1708, 258, 80, 112],
            [1328, 684, 80, 112],
            [1246, 684, 80, 112],
            [1410, 684, 80, 112],
            [1164, 684, 80, 112],
            [1888, 694, 64, 80],
            [1738, 712, 64, 80],
            [1314, 1090, 64, 80],
            [1380, 1090, 64, 80],
            [392, 1584, 80, 32],
            [808, 1818, 80, 16],
            [1592, 1580, 80, 32],
            [1624, 1514, 48, 64],
            [1304, 1584, 80, 32],
            [846, 1598, 80, 32],
            [928, 1598, 80, 32],
            [1010, 1598, 80, 32],
            [132, 1602, 80, 32],
            [748, 1516, 48, 64],
            [214, 1602, 80, 32],
            [890, 1818, 80, 16],
            [914,
                1996, 16, 16
            ],
            [518, 1998, 16, 16],
            [536, 1998, 16, 16],
            [1214, 1998, 16, 16],
            [1026, 1772, 48, 32],
            [110, 1770, 48, 32],
            [236, 1770, 48, 32],
            [454, 1768, 48, 32],
            [1666, 906, 112, 64],
            [212, 914, 112, 64],
            [1780, 906, 112, 64],
            [1552, 900, 112, 64],
            [394, 1402, 80, 48],
            [1852, 1400, 80, 48],
            [476, 1402, 80, 48],
            [1110, 1820, 80, 16],
            [1830, 1818, 80, 16],
            [102, 1822, 80, 16],
            [1748, 1834, 80, 16],
            [1912, 1834, 80, 16],
            [890, 1836, 80, 16],
            [354, 1836, 80, 16],
            [808, 1836, 80, 16],
            [726, 1834, 80, 16],
            [1830, 1836, 80, 16],
            [1110, 1838, 80, 16],
            [1532, 1834, 80, 16],
            [34, 1840, 80, 16],
            [350, 1854, 80, 16],
            [1532,
                1852, 80, 16
            ],
            [1830, 1854, 80, 16],
            [268, 1852, 80, 16],
            [116, 1840, 80, 16],
            [726, 1852, 80, 16],
            [972, 1856, 80, 16],
            [748, 1616, 80, 32],
            [378, 1618, 80, 32],
            [1516, 1614, 80, 32],
            [1838, 1616, 80, 32],
            [1912, 1852, 80, 16],
            [808, 1854, 80, 16],
            [1110, 1856, 80, 16],
            [890, 1854, 80, 16],
            [1748, 1852, 80, 16],
            [1920, 1616, 80, 32],
            [460, 1618, 80, 32],
            [296, 1602, 80, 32],
            [542, 1618, 80, 32],
            [1092, 1604, 80, 32],
            [624, 1618, 80, 32],
            [1174, 1604, 80, 32],
            [1256, 1618, 80, 32],
            [1338, 1618, 80, 32],
            [1674, 1612, 80, 32],
            [1420, 1618, 80, 32],
            [1756, 1612, 80, 32],
            [858, 1516, 48, 64],
            [1056, 1516, 48, 64],
            [450, 1518, 48, 64],
            [500, 1518, 48, 64],
            [1350, 1518, 48, 64],
            [1400, 1526, 48, 64],
            [0, 1620, 80, 32],
            [34, 1858, 80, 16],
            [1280, 1860, 80, 16],
            [1362, 1860, 80, 16],
            [432, 1862, 80, 16],
            [116, 1858, 80, 16],
            [1786, 1394, 64, 64],
            [1034, 1398, 64, 64],
            [1438, 1394, 64, 64],
            [968, 1398, 64, 64],
            [1720, 1394, 64, 64],
            [1182, 1722, 16, 48],
            [1412, 1810, 16, 48],
            [524, 1948, 16, 48],
            [1570, 1370, 16, 48],
            [2028, 1900, 16, 48],
            [1996, 1020, 26, 32],
            [324, 468, 160, 48],
            [1674, 1544, 192, 16],
            [542, 1948, 16, 48],
            [1228, 1948, 16, 48],
            [550, 1550, 192, 16],
            [0, 1552, 192, 16],
            [830, 1632, 80, 32],
            [1226, 1776, 96,
                16
            ],
            [34, 1962, 48, 16],
            [1548, 1780, 96, 16],
            [68, 1704, 64, 32],
            [264, 1402, 128, 32],
            [1100, 1400, 128, 32],
            [904, 1978, 32, 16],
            [114, 1096, 64, 80],
            [958, 1102, 64, 80],
            [1024, 1102, 64, 80],
            [1090, 1102, 64, 80],
            [1492, 684, 80, 112],
            [588, 702, 80, 112],
            [1806, 694, 80, 112],
            [1656, 712, 80, 112],
            [82, 766, 80, 112],
            [1540, 1106, 64, 80],
            [180, 1120, 64, 80],
            [0, 1120, 64, 80],
            [246, 1120, 64, 80],
            [1606, 1106, 64, 80],
            [164, 766, 80, 112],
            [0, 766, 80, 112],
            [752, 702, 80, 112],
            [1574, 712, 80, 112],
            [670, 702, 80, 112],
            [1342, 1896, 32, 32],
            [1376, 1896, 32, 32],
            [102, 1894, 32, 32],
            [1274, 1896, 32,
                32
            ],
            [1308, 1896, 32, 32],
            [356, 1898, 32, 32],
            [390, 1898, 32, 32],
            [136, 1894, 32, 32],
            [0, 1904, 32, 32],
            [1042, 1906, 32, 32],
            [1834, 1906, 32, 32],
            [702, 1922, 32, 32],
            [204, 1922, 32, 32],
            [598, 1914, 32, 32],
            [1240, 1914, 32, 32],
            [492, 1914, 32, 32],
            [668, 1922, 32, 32],
            [1526, 1922, 32, 32],
            [1766, 1924, 32, 32],
            [526, 1914, 32, 32],
            [1410, 1916, 32, 32],
            [1984, 1910, 32, 32],
            [458, 1914, 32, 32],
            [1596, 1916, 32, 32],
            [1630, 1916, 32, 32],
            [170, 1922, 32, 32],
            [1188, 1914, 32, 32],
            [1800, 1924, 32, 32],
            [424, 1914, 32, 32],
            [1076, 1926, 32, 32],
            [1110, 1926, 32, 32],
            [916, 1926, 32, 32],
            [34, 1928,
                32, 32
            ],
            [68, 1928, 32, 32],
            [102, 1928, 32, 32],
            [950, 1926, 32, 32],
            [2020, 1500, 16, 144],
            [1208, 1638, 16, 144],
            [1530, 212, 9, 11],
            [1446, 1090, 32, 80],
            [908, 1548, 64, 48],
            [778, 1120, 80, 64],
            [1114, 1784, 96, 16],
            [134, 1704, 32, 64],
            [1991, 290, 32, 80],
            [378, 1120, 64, 80],
            [1156, 1120, 64, 80],
            [1222, 1120, 64, 80],
            [312, 1120, 64, 80],
            [444, 1122, 64, 80],
            [510, 1122, 64, 80],
            [704, 1146, 48, 80],
            [342, 1070, 112, 48],
            [1238, 1554, 64, 48],
            [1526, 1548, 64, 48],
            [1948, 1120, 80, 64],
            [504, 1794, 96, 16],
            [2014, 1236, 32, 80],
            [1882, 1120, 64, 80],
            [704, 1228, 48, 80],
            [778, 1070, 112, 48],
            [326,
                1552, 64, 48
            ],
            [1106, 1554, 64, 48],
            [260, 1552, 64, 48],
            [974, 1548, 64, 48],
            [1674, 1562, 64, 48],
            [1740, 1562, 64, 48],
            [1172, 1554, 64, 48],
            [194, 1552, 64, 48],
            [1806, 1562, 64, 48],
            [1938, 1566, 64, 48],
            [1872, 1566, 64, 48],
            [550, 1568, 64, 48],
            [616, 1568, 64, 48],
            [1450, 1568, 64, 48],
            [66, 1570, 64, 48],
            [0, 1570, 64, 48],
            [1672, 1168, 80, 64],
            [1212, 1794, 96, 16],
            [602, 1794, 96, 16],
            [1288, 1172, 64, 80],
            [1354, 1172, 64, 80],
            [558, 1426, 48, 80],
            [808, 1416, 48, 80],
            [1246, 1948, 16, 48],
            [682, 1568, 64, 48],
            [860, 1152, 80, 64],
            [1548, 1798, 96, 16],
            [1646, 1796, 96, 16],
            [1046, 1706, 32, 64],
            [2014, 1318, 32, 80],
            [1420, 1172, 64, 80],
            [638, 1146, 64, 80],
            [66, 1178, 64, 80],
            [1570, 1432, 48, 80],
            [608, 1426, 48, 80],
            [1620, 1432, 48, 80],
            [1200, 1070, 112, 48],
            [1882, 1070, 112, 48],
            [1066, 1978, 16, 32],
            [1970, 1978, 16, 32],
            [560, 1980, 16, 32],
            [1048, 1978, 16, 32],
            [1988, 1978, 16, 32],
            [1084, 1978, 16, 32],
            [34, 1980, 16, 32],
            [52, 1980, 16, 32],
            [482, 1984, 16, 32],
            [1764, 1976, 16, 32],
            [246, 766, 176, 48],
            [942, 1184, 80, 64],
            [1870, 1800, 96, 16],
            [876, 1800, 96, 16],
            [1024, 1184, 64, 80],
            [1090, 1184, 64, 80],
            [1670, 1432, 48, 80],
            [1100, 1434, 48, 80],
            [1128, 896, 104, 72],
            [1902, 822,
                104, 72
            ],
            [792, 878, 104, 72],
            [434, 864, 104, 72],
            [0, 880, 104, 72],
            [328, 864, 104, 72],
            [1234, 896, 104, 72],
            [1022, 896, 104, 72],
            [916, 864, 104, 72],
            [106, 880, 104, 72],
            [1616, 826, 104, 72],
            [1340, 896, 104, 72],
            [686, 816, 104, 72],
            [540, 898, 104, 72],
            [686, 890, 104, 72],
            [1902, 896, 104, 72],
            [1510, 826, 104, 72],
            [1446, 900, 104, 72],
            [2002, 1400, 40, 32],
            [594, 1326, 40, 32],
            [1056, 1482, 40, 32],
            [540, 864, 40, 32],
            [1106, 1516, 40, 32],
            [1618, 1990, 32, 16],
            [1584, 1986, 32, 16],
            [1936, 1988, 32, 16],
            [2006, 1984, 32, 16],
            [1652, 1990, 32, 16],
            [1686, 1990, 32, 16],
            [1866, 1990, 32, 16],
            [0,
                1990, 32, 16
            ],
            [312, 1990, 32, 16],
            [514, 1862, 80, 16],
            [1192, 1862, 80, 16],
            [1444, 1864, 80, 16],
            [1614, 1864, 80, 16],
            [596, 1862, 80, 16],
            [198, 1870, 80, 16],
            [1696, 1870, 80, 16],
            [1526, 1870, 80, 16],
            [678, 1870, 80, 16],
            [1308, 1930, 32, 32],
            [136, 1928, 32, 32],
            [1342, 1930, 32, 32],
            [1376, 1930, 32, 32],
            [356, 1932, 32, 32],
            [1274, 1930, 32, 32],
            [604, 1718, 32, 56],
            [1080, 1706, 32, 56],
            [570, 1718, 32, 56],
            [672, 1718, 32, 56],
            [638, 1718, 32, 56],
            [1226, 1718, 32, 56],
            [1260, 1718, 32, 56],
            [1294, 1718, 32, 56],
            [1532, 1706, 32, 56],
            [1996, 1062, 48, 56],
            [1806, 614, 40, 56],
            [792, 816, 40, 56],
            [66, 1120, 40, 56],
            [1552, 1648, 40, 56],
            [528, 1652, 40, 56],
            [858, 1416, 40, 40],
            [1370, 1718, 40, 40],
            [0, 1720, 40, 40],
            [1240, 1268, 40, 40],
            [1412, 1718, 40, 40],
            [1328, 1718, 40, 40],
            [1454, 1718, 40, 40],
            [588, 650, 50, 48],
            [1054, 1864, 32, 40],
            [0, 1862, 32, 40],
            [1638, 1188, 32, 40],
            [1994, 1834, 32, 40],
            [972, 1004, 32, 40],
            [504, 1710, 64, 32],
            [228, 1046, 64, 16],
            [636, 1776, 64, 16],
            [778, 1186, 64, 80],
            [0, 1400, 64, 64],
            [522, 972, 96, 64],
            [1388, 974, 96, 64],
            [294, 1004, 96, 64],
            [196, 980, 96, 64],
            [874, 1004, 96, 64],
            [994, 1632, 80, 32],
            [1076, 1638, 80, 32],
            [246, 1636, 80, 32],
            [82, 1636,
                80, 32
            ],
            [164, 1636, 80, 32],
            [912, 1632, 80, 32],
            [924, 1874, 80, 16],
            [1088, 1874, 80, 16],
            [34, 1876, 80, 16],
            [760, 1872, 80, 16],
            [842, 1872, 80, 16],
            [1912, 1870, 80, 16],
            [1778, 1872, 80, 16],
            [116, 1876, 80, 16],
            [1274, 1878, 80, 16],
            [280, 1872, 80, 16],
            [1356, 1878, 80, 16],
            [362, 1880, 80, 16],
            [1012, 970, 80, 80],
            [114, 954, 80, 80],
            [1552, 966, 80, 80],
            [792, 952, 80, 80],
            [1094, 970, 80, 80],
            [1176, 970, 80, 80],
            [748, 1582, 96, 32],
            [1114, 1802, 96, 16],
            [102, 1804, 96, 16],
            [588, 816, 96, 80],
            [1634, 1006, 96, 64],
            [1868, 1938, 32, 32],
            [0, 1938, 32, 32],
            [984, 1940, 32, 32],
            [1018, 1940, 32, 32],
            [1144, 1940, 32, 32],
            [390, 1932, 32, 32],
            [1834, 1940, 32, 32],
            [1984, 1944, 32, 32],
            [560, 1946, 32, 32],
            [0, 322, 160, 144],
            [162, 322, 160, 144],
            [162, 468, 160, 144],
            [1546, 340, 160, 144],
            [1708, 386, 160, 144],
            [810, 390, 160, 144],
            [1384, 340, 160, 144],
            [1870, 386, 160, 144],
            [486, 390, 160, 144],
            [648, 390, 160, 144],
            [0, 468, 160, 144],
            [324, 322, 160, 144],
            [1384, 258, 320, 80],
            [1008, 1806, 32, 48],
            [200, 1804, 32, 48],
            [1042, 1806, 32, 48],
            [234, 1804, 32, 48],
            [1680, 1814, 32, 48],
            [1714, 1814, 32, 48],
            [488, 1812, 32, 48],
            [624, 1812, 32, 48],
            [1498, 1814, 32, 48],
            [1344, 1810, 32, 48],
            [658,
                1812, 32, 48
            ],
            [556, 1812, 32, 48],
            [1212, 1812, 32, 48],
            [522, 1812, 32, 48],
            [1646, 1814, 32, 48],
            [1464, 1814, 32, 48],
            [590, 1812, 32, 48],
            [1246, 1812, 32, 48],
            [0, 1812, 32, 48],
            [1310, 1810, 32, 48],
            [692, 1816, 32, 48],
            [1378, 1810, 32, 48],
            [1076, 1814, 32, 48],
            [68, 1788, 32, 48],
            [1430, 1794, 32, 48],
            [34, 1788, 32, 48],
            [1182, 798, 80, 96],
            [834, 780, 80, 96],
            [1264, 798, 80, 96],
            [936, 766, 80, 96],
            [1820, 808, 80, 96],
            [1738, 808, 80, 96],
            [1018, 766, 80, 96],
            [1100, 798, 80, 96],
            [506, 766, 80, 96],
            [1346, 798, 80, 96],
            [1428, 798, 80, 96],
            [246, 816, 80, 96],
            [424, 766, 80, 96],
            [964, 228, 112, 160],
            [1850, 532, 112, 160],
            [898, 938, 112, 64],
            [326, 938, 112, 64],
            [0, 954, 112, 64],
            [646, 964, 112, 64],
            [454, 1802, 32, 48],
            [286, 1802, 32, 48],
            [974, 1800, 32, 48],
            [320, 1802, 32, 48]
        ]
    }];
    (a.Or = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(0)
    }).prototype = b = new e.Sprite;
    (a.rp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1)
    }).prototype = b = new e.Sprite;
    (a.sp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(2)
    }).prototype = b = new e.Sprite;
    (a.Pr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(3)
    }).prototype =
        b = new e.Sprite;
    (a.Qr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(4)
    }).prototype = b = new e.Sprite;
    (a.Rr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(5)
    }).prototype = b = new e.Sprite;
    (a.Sr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(6)
    }).prototype = b = new e.Sprite;
    (a.Tr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(7)
    }).prototype = b = new e.Sprite;
    (a.Ur = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(8)
    }).prototype = b = new e.Sprite;
    (a.Vr = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(9)
    }).prototype = b = new e.Sprite;
    (a.Wr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(10)
    }).prototype = b = new e.Sprite;
    (a.Xr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(11)
    }).prototype = b = new e.Sprite;
    (a.Yr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(12)
    }).prototype = b = new e.Sprite;
    (a.Zr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(13)
    }).prototype = b = new e.Sprite;
    (a.$r = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(14)
    }).prototype =
        b = new e.Sprite;
    (a.cs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(15)
    }).prototype = b = new e.Sprite;
    (a.ds = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(16)
    }).prototype = b = new e.Sprite;
    (a.fs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(17)
    }).prototype = b = new e.Sprite;
    (a.ez = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(18)
    }).prototype = b = new e.Sprite;
    (a.hs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(19)
    }).prototype = b = new e.Sprite;
    (a.js = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(20)
    }).prototype = b = new e.Sprite;
    (a.ms = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(21)
    }).prototype = b = new e.Sprite;
    (a.ns = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(22)
    }).prototype = b = new e.Sprite;
    (a.os = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(23)
    }).prototype = b = new e.Sprite;
    (a.ps = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(24)
    }).prototype = b = new e.Sprite;
    (a.qs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(25)
    }).prototype =
        b = new e.Sprite;
    (a.ts = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(26)
    }).prototype = b = new e.Sprite;
    (a.us = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(27)
    }).prototype = b = new e.Sprite;
    (a.vs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(28)
    }).prototype = b = new e.Sprite;
    (a.ws = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(29)
    }).prototype = b = new e.Sprite;
    (a.xs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(30)
    }).prototype = b = new e.Sprite;
    (a.ys = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(31)
    }).prototype = b = new e.Sprite;
    (a.zs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(32)
    }).prototype = b = new e.Sprite;
    (a.As = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(33)
    }).prototype = b = new e.Sprite;
    (a.Bs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(34)
    }).prototype = b = new e.Sprite;
    (a.Cs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(35)
    }).prototype = b = new e.Sprite;
    (a.Ds = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(36)
    }).prototype =
        b = new e.Sprite;
    (a.Es = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(37)
    }).prototype = b = new e.Sprite;
    (a.Fs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(38)
    }).prototype = b = new e.Sprite;
    (a.Gs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(39)
    }).prototype = b = new e.Sprite;
    (a.Hs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(40)
    }).prototype = b = new e.Sprite;
    (a.Is = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(41)
    }).prototype = b = new e.Sprite;
    (a.Js = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(42)
    }).prototype = b = new e.Sprite;
    (a.Ks = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(43)
    }).prototype = b = new e.Sprite;
    (a.Ls = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(44)
    }).prototype = b = new e.Sprite;
    (a.Ms = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(45)
    }).prototype = b = new e.Sprite;
    (a.Ns = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(46)
    }).prototype = b = new e.Sprite;
    (a.Os = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(47)
    }).prototype =
        b = new e.Sprite;
    (a.Ps = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(48)
    }).prototype = b = new e.Sprite;
    (a.Qs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(49)
    }).prototype = b = new e.Sprite;
    (a.Rs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(50)
    }).prototype = b = new e.Sprite;
    (a.Ss = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(51)
    }).prototype = b = new e.Sprite;
    (a.Ts = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(52)
    }).prototype = b = new e.Sprite;
    (a.Us = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(53)
    }).prototype = b = new e.Sprite;
    (a.Vs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(54)
    }).prototype = b = new e.Sprite;
    (a.Ws = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(55)
    }).prototype = b = new e.Sprite;
    (a.Xs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(56)
    }).prototype = b = new e.Sprite;
    (a.Ys = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(57)
    }).prototype = b = new e.Sprite;
    (a.Zs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(58)
    }).prototype =
        b = new e.Sprite;
    (a.$s = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(59)
    }).prototype = b = new e.Sprite;
    (a.ct = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(60)
    }).prototype = b = new e.Sprite;
    (a.dt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(61)
    }).prototype = b = new e.Sprite;
    (a.et = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(62)
    }).prototype = b = new e.Sprite;
    (a.ft = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(63)
    }).prototype = b = new e.Sprite;
    (a.gt = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(64)
    }).prototype = b = new e.Sprite;
    (a.ht = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(65)
    }).prototype = b = new e.Sprite;
    (a.it = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(66)
    }).prototype = b = new e.Sprite;
    (a.jt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(67)
    }).prototype = b = new e.Sprite;
    (a.kt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(68)
    }).prototype = b = new e.Sprite;
    (a.nt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(69)
    }).prototype =
        b = new e.Sprite;
    (a.ot = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(70)
    }).prototype = b = new e.Sprite;
    (a.pt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(71)
    }).prototype = b = new e.Sprite;
    (a.rt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(72)
    }).prototype = b = new e.Sprite;
    (a.st = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(73)
    }).prototype = b = new e.Sprite;
    (a.tt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(74)
    }).prototype = b = new e.Sprite;
    (a.ut = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(75)
    }).prototype = b = new e.Sprite;
    (a.vt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(76)
    }).prototype = b = new e.Sprite;
    (a.wt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(77)
    }).prototype = b = new e.Sprite;
    (a.xt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(78)
    }).prototype = b = new e.Sprite;
    (a.yt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(79)
    }).prototype = b = new e.Sprite;
    (a.zt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(80)
    }).prototype =
        b = new e.Sprite;
    (a.At = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(81)
    }).prototype = b = new e.Sprite;
    (a.Bt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(82)
    }).prototype = b = new e.Sprite;
    (a.Ct = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(83)
    }).prototype = b = new e.Sprite;
    (a.Dt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(84)
    }).prototype = b = new e.Sprite;
    (a.Et = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(85)
    }).prototype = b = new e.Sprite;
    (a.Ft = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(86)
    }).prototype = b = new e.Sprite;
    (a.Gt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(87)
    }).prototype = b = new e.Sprite;
    (a.Ht = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(88)
    }).prototype = b = new e.Sprite;
    (a.It = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(89)
    }).prototype = b = new e.Sprite;
    (a.Jt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(90)
    }).prototype = b = new e.Sprite;
    (a.Kt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(91)
    }).prototype =
        b = new e.Sprite;
    (a.Lt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(92)
    }).prototype = b = new e.Sprite;
    (a.Mt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(93)
    }).prototype = b = new e.Sprite;
    (a.Nt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(94)
    }).prototype = b = new e.Sprite;
    (a.Ot = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(95)
    }).prototype = b = new e.Sprite;
    (a.Pt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(96)
    }).prototype = b = new e.Sprite;
    (a.Qt = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(97)
    }).prototype = b = new e.Sprite;
    (a.Rt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(98)
    }).prototype = b = new e.Sprite;
    (a.St = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(99)
    }).prototype = b = new e.Sprite;
    (a.Tt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(100)
    }).prototype = b = new e.Sprite;
    (a.Ut = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(101)
    }).prototype = b = new e.Sprite;
    (a.Vt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(102)
    }).prototype =
        b = new e.Sprite;
    (a.Wt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(103)
    }).prototype = b = new e.Sprite;
    (a.Xt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(104)
    }).prototype = b = new e.Sprite;
    (a.Yt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(105)
    }).prototype = b = new e.Sprite;
    (a.Zt = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(106)
    }).prototype = b = new e.Sprite;
    (a.$t = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(107)
    }).prototype = b = new e.Sprite;
    (a.au = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(108)
    }).prototype = b = new e.Sprite;
    (a.bu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(109)
    }).prototype = b = new e.Sprite;
    (a.cu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(110)
    }).prototype = b = new e.Sprite;
    (a.du = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(111)
    }).prototype = b = new e.Sprite;
    (a.eu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(112)
    }).prototype = b = new e.Sprite;
    (a.fu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(113)
    }).prototype =
        b = new e.Sprite;
    (a.gu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(114)
    }).prototype = b = new e.Sprite;
    (a.hu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(115)
    }).prototype = b = new e.Sprite;
    (a.iu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(116)
    }).prototype = b = new e.Sprite;
    (a.ju = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(117)
    }).prototype = b = new e.Sprite;
    (a.ku = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(118)
    }).prototype = b = new e.Sprite;
    (a.lu = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(119)
    }).prototype = b = new e.Sprite;
    (a.mu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(120)
    }).prototype = b = new e.Sprite;
    (a.nu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(121)
    }).prototype = b = new e.Sprite;
    (a.ou = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(122)
    }).prototype = b = new e.Sprite;
    (a.pu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(123)
    }).prototype = b = new e.Sprite;
    (a.qu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(124)
    }).prototype =
        b = new e.Sprite;
    (a.ru = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(125)
    }).prototype = b = new e.Sprite;
    (a.su = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(126)
    }).prototype = b = new e.Sprite;
    (a.tu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(127)
    }).prototype = b = new e.Sprite;
    (a.uu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(128)
    }).prototype = b = new e.Sprite;
    (a.vu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(129)
    }).prototype = b = new e.Sprite;
    (a.wu = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(130)
    }).prototype = b = new e.Sprite;
    (a.xu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(131)
    }).prototype = b = new e.Sprite;
    (a.gs = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(132)
    }).prototype = b = new e.Sprite;
    (a.yu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(133)
    }).prototype = b = new e.Sprite;
    (a.zu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(134)
    }).prototype = b = new e.Sprite;
    (a.Au = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(135)
    }).prototype =
        b = new e.Sprite;
    (a.Bu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(136)
    }).prototype = b = new e.Sprite;
    (a.Cu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(137)
    }).prototype = b = new e.Sprite;
    (a.Du = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(138)
    }).prototype = b = new e.Sprite;
    (a.Eu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(139)
    }).prototype = b = new e.Sprite;
    (a.Fu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(140)
    }).prototype = b = new e.Sprite;
    (a.Gu = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(141)
    }).prototype = b = new e.Sprite;
    (a.Hu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(142)
    }).prototype = b = new e.Sprite;
    (a.Iu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(143)
    }).prototype = b = new e.Sprite;
    (a.Ju = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(144)
    }).prototype = b = new e.Sprite;
    (a.Ku = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(145)
    }).prototype = b = new e.Sprite;
    (a.Lu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(146)
    }).prototype =
        b = new e.Sprite;
    (a.Mu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(147)
    }).prototype = b = new e.Sprite;
    (a.Nu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(148)
    }).prototype = b = new e.Sprite;
    (a.Ou = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(149)
    }).prototype = b = new e.Sprite;
    (a.Pu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(150)
    }).prototype = b = new e.Sprite;
    (a.Qu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(151)
    }).prototype = b = new e.Sprite;
    (a.Ru = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(152)
    }).prototype = b = new e.Sprite;
    (a.Su = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(153)
    }).prototype = b = new e.Sprite;
    (a.Tu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(154)
    }).prototype = b = new e.Sprite;
    (a.Uu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(155)
    }).prototype = b = new e.Sprite;
    (a.Vu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(156)
    }).prototype = b = new e.Sprite;
    (a.Wu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(157)
    }).prototype =
        b = new e.Sprite;
    (a.Xu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(158)
    }).prototype = b = new e.Sprite;
    (a.Yu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(159)
    }).prototype = b = new e.Sprite;
    (a.Zu = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(160)
    }).prototype = b = new e.Sprite;
    (a.$u = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(161)
    }).prototype = b = new e.Sprite;
    (a.av = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(162)
    }).prototype = b = new e.Sprite;
    (a.bv = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(163)
    }).prototype = b = new e.Sprite;
    (a.cv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(164)
    }).prototype = b = new e.Sprite;
    (a.dv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(165)
    }).prototype = b = new e.Sprite;
    (a.ev = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(166)
    }).prototype = b = new e.Sprite;
    (a.fv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(167)
    }).prototype = b = new e.Sprite;
    (a.gv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(168)
    }).prototype =
        b = new e.Sprite;
    (a.hv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(169)
    }).prototype = b = new e.Sprite;
    (a.iv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(170)
    }).prototype = b = new e.Sprite;
    (a.jv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(171)
    }).prototype = b = new e.Sprite;
    (a.kv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(172)
    }).prototype = b = new e.Sprite;
    (a.lv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(173)
    }).prototype = b = new e.Sprite;
    (a.mv = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(174)
    }).prototype = b = new e.Sprite;
    (a.nv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(175)
    }).prototype = b = new e.Sprite;
    (a.ov = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(176)
    }).prototype = b = new e.Sprite;
    (a.pv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(177)
    }).prototype = b = new e.Sprite;
    (a.qv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(178)
    }).prototype = b = new e.Sprite;
    (a.rv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(179)
    }).prototype =
        b = new e.Sprite;
    (a.sv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(180)
    }).prototype = b = new e.Sprite;
    (a.tv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(181)
    }).prototype = b = new e.Sprite;
    (a.uv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(182)
    }).prototype = b = new e.Sprite;
    (a.vv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(183)
    }).prototype = b = new e.Sprite;
    (a.wv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(184)
    }).prototype = b = new e.Sprite;
    (a.xv = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(185)
    }).prototype = b = new e.Sprite;
    (a.yv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(186)
    }).prototype = b = new e.Sprite;
    (a.zv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(187)
    }).prototype = b = new e.Sprite;
    (a.Av = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(188)
    }).prototype = b = new e.Sprite;
    (a.Bv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(189)
    }).prototype = b = new e.Sprite;
    (a.Cv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(190)
    }).prototype =
        b = new e.Sprite;
    (a.Dv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(191)
    }).prototype = b = new e.Sprite;
    (a.Ev = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(192)
    }).prototype = b = new e.Sprite;
    (a.Fv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(193)
    }).prototype = b = new e.Sprite;
    (a.Gv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(194)
    }).prototype = b = new e.Sprite;
    (a.Hv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(195)
    }).prototype = b = new e.Sprite;
    (a.Iv = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(196)
    }).prototype = b = new e.Sprite;
    (a.Jv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(197)
    }).prototype = b = new e.Sprite;
    (a.Kv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(198)
    }).prototype = b = new e.Sprite;
    (a.Lv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(199)
    }).prototype = b = new e.Sprite;
    (a.Mv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(200)
    }).prototype = b = new e.Sprite;
    (a.Nv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(201)
    }).prototype =
        b = new e.Sprite;
    (a.Ov = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(202)
    }).prototype = b = new e.Sprite;
    (a.Pv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(203)
    }).prototype = b = new e.Sprite;
    (a.Qv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(204)
    }).prototype = b = new e.Sprite;
    (a.Rv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(205)
    }).prototype = b = new e.Sprite;
    (a.Sv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(206)
    }).prototype = b = new e.Sprite;
    (a.Tv = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(207)
    }).prototype = b = new e.Sprite;
    (a.Uv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(208)
    }).prototype = b = new e.Sprite;
    (a.Vv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(209)
    }).prototype = b = new e.Sprite;
    (a.Wv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(210)
    }).prototype = b = new e.Sprite;
    (a.Xv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(211)
    }).prototype = b = new e.Sprite;
    (a.Yv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(212)
    }).prototype =
        b = new e.Sprite;
    (a.Zv = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(213)
    }).prototype = b = new e.Sprite;
    (a.$v = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(214)
    }).prototype = b = new e.Sprite;
    (a.aw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(215)
    }).prototype = b = new e.Sprite;
    (a.bw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(216)
    }).prototype = b = new e.Sprite;
    (a.cw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(217)
    }).prototype = b = new e.Sprite;
    (a.dw = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(218)
    }).prototype = b = new e.Sprite;
    (a.ew = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(219)
    }).prototype = b = new e.Sprite;
    (a.fw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(220)
    }).prototype = b = new e.Sprite;
    (a.gw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(221)
    }).prototype = b = new e.Sprite;
    (a.hw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(222)
    }).prototype = b = new e.Sprite;
    (a.iw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(223)
    }).prototype =
        b = new e.Sprite;
    (a.fz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(224)
    }).prototype = b = new e.Sprite;
    (a.hz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(225)
    }).prototype = b = new e.Sprite;
    (a.iz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(226)
    }).prototype = b = new e.Sprite;
    (a.jz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(227)
    }).prototype = b = new e.Sprite;
    (a.kz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(228)
    }).prototype = b = new e.Sprite;
    (a.kw = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(229)
    }).prototype = b = new e.Sprite;
    (a.lw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(230)
    }).prototype = b = new e.Sprite;
    (a.mw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(231)
    }).prototype = b = new e.Sprite;
    (a.nw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(232)
    }).prototype = b = new e.Sprite;
    (a.ow = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(233)
    }).prototype = b = new e.Sprite;
    (a.pw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(234)
    }).prototype =
        b = new e.Sprite;
    (a.qw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(235)
    }).prototype = b = new e.Sprite;
    (a.rw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(236)
    }).prototype = b = new e.Sprite;
    (a.sw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(237)
    }).prototype = b = new e.Sprite;
    (a.tw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(238)
    }).prototype = b = new e.Sprite;
    (a.uw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(239)
    }).prototype = b = new e.Sprite;
    (a.vw = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(240)
    }).prototype = b = new e.Sprite;
    (a.ww = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(241)
    }).prototype = b = new e.Sprite;
    (a.lz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(242)
    }).prototype = b = new e.Sprite;
    (a.zw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(243)
    }).prototype = b = new e.Sprite;
    (a.Aw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(244)
    }).prototype = b = new e.Sprite;
    (a.Bw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(245)
    }).prototype =
        b = new e.Sprite;
    (a.Cw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(246)
    }).prototype = b = new e.Sprite;
    (a.Dw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(247)
    }).prototype = b = new e.Sprite;
    (a.Ew = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(248)
    }).prototype = b = new e.Sprite;
    (a.Fw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(249)
    }).prototype = b = new e.Sprite;
    (a.Gw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(250)
    }).prototype = b = new e.Sprite;
    (a.Hw = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(251)
    }).prototype = b = new e.Sprite;
    (a.xw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(252)
    }).prototype = b = new e.Sprite;
    (a.yw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(253)
    }).prototype = b = new e.Sprite;
    (a.Iw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(254)
    }).prototype = b = new e.Sprite;
    (a.Jw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(255)
    }).prototype = b = new e.Sprite;
    (a.Kw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(256)
    }).prototype =
        b = new e.Sprite;
    (a.Lw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(257)
    }).prototype = b = new e.Sprite;
    (a.Mw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(258)
    }).prototype = b = new e.Sprite;
    (a.Nw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(259)
    }).prototype = b = new e.Sprite;
    (a.Ow = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(260)
    }).prototype = b = new e.Sprite;
    (a.Pw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(261)
    }).prototype = b = new e.Sprite;
    (a.Qw = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(262)
    }).prototype = b = new e.Sprite;
    (a.Rw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(263)
    }).prototype = b = new e.Sprite;
    (a.Sw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(264)
    }).prototype = b = new e.Sprite;
    (a.Tw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(265)
    }).prototype = b = new e.Sprite;
    (a.Uw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(266)
    }).prototype = b = new e.Sprite;
    (a.Vw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(267)
    }).prototype =
        b = new e.Sprite;
    (a.Ww = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(268)
    }).prototype = b = new e.Sprite;
    (a.Xw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(269)
    }).prototype = b = new e.Sprite;
    (a.Yw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(270)
    }).prototype = b = new e.Sprite;
    (a.Zw = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(271)
    }).prototype = b = new e.Sprite;
    (a.$w = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(272)
    }).prototype = b = new e.Sprite;
    (a.ax = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(273)
    }).prototype = b = new e.Sprite;
    (a.bx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(274)
    }).prototype = b = new e.Sprite;
    (a.cx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(275)
    }).prototype = b = new e.Sprite;
    (a.dx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(276)
    }).prototype = b = new e.Sprite;
    (a.vx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(277)
    }).prototype = b = new e.Sprite;
    (a.wx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(278)
    }).prototype =
        b = new e.Sprite;
    (a.xx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(279)
    }).prototype = b = new e.Sprite;
    (a.yx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(280)
    }).prototype = b = new e.Sprite;
    (a.zx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(281)
    }).prototype = b = new e.Sprite;
    (a.Ax = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(282)
    }).prototype = b = new e.Sprite;
    (a.Bx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(283)
    }).prototype = b = new e.Sprite;
    (a.Cx = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(284)
    }).prototype = b = new e.Sprite;
    (a.Dx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(285)
    }).prototype = b = new e.Sprite;
    (a.Ex = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(286)
    }).prototype = b = new e.Sprite;
    (a.Fx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(287)
    }).prototype = b = new e.Sprite;
    (a.Gx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(288)
    }).prototype = b = new e.Sprite;
    (a.Hx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(289)
    }).prototype =
        b = new e.Sprite;
    (a.Ix = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(290)
    }).prototype = b = new e.Sprite;
    (a.Jx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(291)
    }).prototype = b = new e.Sprite;
    (a.Kx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(292)
    }).prototype = b = new e.Sprite;
    (a.Lx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(293)
    }).prototype = b = new e.Sprite;
    (a.Mx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(294)
    }).prototype = b = new e.Sprite;
    (a.Nx = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(295)
    }).prototype = b = new e.Sprite;
    (a.Ox = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(296)
    }).prototype = b = new e.Sprite;
    (a.Px = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(297)
    }).prototype = b = new e.Sprite;
    (a.Qx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(298)
    }).prototype = b = new e.Sprite;
    (a.Rx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(299)
    }).prototype = b = new e.Sprite;
    (a.Sx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(300)
    }).prototype =
        b = new e.Sprite;
    (a.Tx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(301)
    }).prototype = b = new e.Sprite;
    (a.Ux = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(302)
    }).prototype = b = new e.Sprite;
    (a.Vx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(303)
    }).prototype = b = new e.Sprite;
    (a.Wx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(304)
    }).prototype = b = new e.Sprite;
    (a.Xx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(305)
    }).prototype = b = new e.Sprite;
    (a.Yx = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(306)
    }).prototype = b = new e.Sprite;
    (a.Zx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(307)
    }).prototype = b = new e.Sprite;
    (a.$x = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(308)
    }).prototype = b = new e.Sprite;
    (a.ay = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(309)
    }).prototype = b = new e.Sprite;
    (a.by = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(310)
    }).prototype = b = new e.Sprite;
    (a.cy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(311)
    }).prototype =
        b = new e.Sprite;
    (a.dy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(312)
    }).prototype = b = new e.Sprite;
    (a.ey = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(313)
    }).prototype = b = new e.Sprite;
    (a.fy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(314)
    }).prototype = b = new e.Sprite;
    (a.gy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(315)
    }).prototype = b = new e.Sprite;
    (a.hy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(316)
    }).prototype = b = new e.Sprite;
    (a.iy = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(317)
    }).prototype = b = new e.Sprite;
    (a.jy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(318)
    }).prototype = b = new e.Sprite;
    (a.ky = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(319)
    }).prototype = b = new e.Sprite;
    (a.ly = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(320)
    }).prototype = b = new e.Sprite;
    (a.my = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(321)
    }).prototype = b = new e.Sprite;
    (a.ny = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(322)
    }).prototype =
        b = new e.Sprite;
    (a.oy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(323)
    }).prototype = b = new e.Sprite;
    (a.py = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(324)
    }).prototype = b = new e.Sprite;
    (a.qy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(325)
    }).prototype = b = new e.Sprite;
    (a.ry = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(326)
    }).prototype = b = new e.Sprite;
    (a.sy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(327)
    }).prototype = b = new e.Sprite;
    (a.uy = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(328)
    }).prototype = b = new e.Sprite;
    (a.vy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(329)
    }).prototype = b = new e.Sprite;
    (a.wy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(330)
    }).prototype = b = new e.Sprite;
    (a.xy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(331)
    }).prototype = b = new e.Sprite;
    (a.yy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(332)
    }).prototype = b = new e.Sprite;
    (a.zy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(333)
    }).prototype =
        b = new e.Sprite;
    (a.Ay = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(334)
    }).prototype = b = new e.Sprite;
    (a.By = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(335)
    }).prototype = b = new e.Sprite;
    (a.Cy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(336)
    }).prototype = b = new e.Sprite;
    (a.Dy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(337)
    }).prototype = b = new e.Sprite;
    (a.Ey = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(338)
    }).prototype = b = new e.Sprite;
    (a.Fy = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(339)
    }).prototype = b = new e.Sprite;
    (a.Gy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(340)
    }).prototype = b = new e.Sprite;
    (a.Hy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(341)
    }).prototype = b = new e.Sprite;
    (a.Iy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(342)
    }).prototype = b = new e.Sprite;
    (a.Jy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(343)
    }).prototype = b = new e.Sprite;
    (a.Ky = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(344)
    }).prototype =
        b = new e.Sprite;
    (a.Ly = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(345)
    }).prototype = b = new e.Sprite;
    (a.My = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(346)
    }).prototype = b = new e.Sprite;
    (a.Ny = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(347)
    }).prototype = b = new e.Sprite;
    (a.Oy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(348)
    }).prototype = b = new e.Sprite;
    (a.Py = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(349)
    }).prototype = b = new e.Sprite;
    (a.ex = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(350)
    }).prototype = b = new e.Sprite;
    (a.fx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(351)
    }).prototype = b = new e.Sprite;
    (a.gx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(352)
    }).prototype = b = new e.Sprite;
    (a.hx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(353)
    }).prototype = b = new e.Sprite;
    (a.ix = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(354)
    }).prototype = b = new e.Sprite;
    (a.jx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(355)
    }).prototype =
        b = new e.Sprite;
    (a.kx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(356)
    }).prototype = b = new e.Sprite;
    (a.lx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(357)
    }).prototype = b = new e.Sprite;
    (a.mx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(358)
    }).prototype = b = new e.Sprite;
    (a.nx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(359)
    }).prototype = b = new e.Sprite;
    (a.ox = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(360)
    }).prototype = b = new e.Sprite;
    (a.px = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(361)
    }).prototype = b = new e.Sprite;
    (a.qx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(362)
    }).prototype = b = new e.Sprite;
    (a.rx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(363)
    }).prototype = b = new e.Sprite;
    (a.sx = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(364)
    }).prototype = b = new e.Sprite;
    (a.ux = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(365)
    }).prototype = b = new e.Sprite;
    (a.Uy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(366)
    }).prototype =
        b = new e.Sprite;
    (a.Vy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(367)
    }).prototype = b = new e.Sprite;
    (a.Wy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(368)
    }).prototype = b = new e.Sprite;
    (a.Xy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(369)
    }).prototype = b = new e.Sprite;
    (a.Yy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(370)
    }).prototype = b = new e.Sprite;
    (a.Zy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(371)
    }).prototype = b = new e.Sprite;
    (a.$y = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(372)
    }).prototype = b = new e.Sprite;
    (a.az = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(373)
    }).prototype = b = new e.Sprite;
    (a.bz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(374)
    }).prototype = b = new e.Sprite;
    (a.cz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(375)
    }).prototype = b = new e.Sprite;
    (a.dz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(376)
    }).prototype = b = new e.Sprite;
    (a.Qy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(377)
    }).prototype =
        b = new e.Sprite;
    (a.Ry = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(378)
    }).prototype = b = new e.Sprite;
    (a.Sy = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(379)
    }).prototype = b = new e.Sprite;
    (a.Ty = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(380)
    }).prototype = b = new e.Sprite;
    (a.mz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(381)
    }).prototype = b = new e.Sprite;
    (a.nz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(382)
    }).prototype = b = new e.Sprite;
    (a.oz = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(383)
    }).prototype = b = new e.Sprite;
    (a.pz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(384)
    }).prototype = b = new e.Sprite;
    (a.Bm = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(385)
    }).prototype = b = new e.Sprite;
    (a.Cm = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(386)
    }).prototype = b = new e.Sprite;
    (a.qz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(387)
    }).prototype = b = new e.Sprite;
    (a.rz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(388)
    }).prototype =
        b = new e.Sprite;
    (a.sz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(389)
    }).prototype = b = new e.Sprite;
    (a.uz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(390)
    }).prototype = b = new e.Sprite;
    (a.vz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(391)
    }).prototype = b = new e.Sprite;
    (a.wz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(392)
    }).prototype = b = new e.Sprite;
    (a.xz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(393)
    }).prototype = b = new e.Sprite;
    (a.yz = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(394)
    }).prototype = b = new e.Sprite;
    (a.zz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(395)
    }).prototype = b = new e.Sprite;
    (a.Az = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(396)
    }).prototype = b = new e.Sprite;
    (a.Hz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(397)
    }).prototype = b = new e.Sprite;
    (a.Iz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(398)
    }).prototype = b = new e.Sprite;
    (a.Jz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(399)
    }).prototype =
        b = new e.Sprite;
    (a.Kz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(400)
    }).prototype = b = new e.Sprite;
    (a.Lz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(401)
    }).prototype = b = new e.Sprite;
    (a.Mz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(402)
    }).prototype = b = new e.Sprite;
    (a.Nz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(403)
    }).prototype = b = new e.Sprite;
    (a.Oz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(404)
    }).prototype = b = new e.Sprite;
    (a.Pz = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(405)
    }).prototype = b = new e.Sprite;
    (a.Qz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(406)
    }).prototype = b = new e.Sprite;
    (a.Rz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(407)
    }).prototype = b = new e.Sprite;
    (a.Sz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(408)
    }).prototype = b = new e.Sprite;
    (a.Tz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(409)
    }).prototype = b = new e.Sprite;
    (a.Vz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(410)
    }).prototype =
        b = new e.Sprite;
    (a.Wz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(411)
    }).prototype = b = new e.Sprite;
    (a.Xz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(412)
    }).prototype = b = new e.Sprite;
    (a.zr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(413)
    }).prototype = b = new e.Sprite;
    (a.Ar = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(414)
    }).prototype = b = new e.Sprite;
    (a.Br = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(415)
    }).prototype = b = new e.Sprite;
    (a.Cr = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(416)
    }).prototype = b = new e.Sprite;
    (a.Dr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(417)
    }).prototype = b = new e.Sprite;
    (a.Er = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(418)
    }).prototype = b = new e.Sprite;
    (a.Fr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(419)
    }).prototype = b = new e.Sprite;
    (a.Gr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(420)
    }).prototype = b = new e.Sprite;
    (a.Hr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(421)
    }).prototype =
        b = new e.Sprite;
    (a.Ir = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(422)
    }).prototype = b = new e.Sprite;
    (a.Jr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(423)
    }).prototype = b = new e.Sprite;
    (a.Kr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(424)
    }).prototype = b = new e.Sprite;
    (a.Lr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(425)
    }).prototype = b = new e.Sprite;
    (a.NB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(426)
    }).prototype = b = new e.Sprite;
    (a.OB = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(427)
    }).prototype = b = new e.Sprite;
    (a.PB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(428)
    }).prototype = b = new e.Sprite;
    (a.QB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(429)
    }).prototype = b = new e.Sprite;
    (a.RB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(430)
    }).prototype = b = new e.Sprite;
    (a.SB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(431)
    }).prototype = b = new e.Sprite;
    (a.TB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(432)
    }).prototype =
        b = new e.Sprite;
    (a.UB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(433)
    }).prototype = b = new e.Sprite;
    (a.VB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(434)
    }).prototype = b = new e.Sprite;
    (a.WB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(435)
    }).prototype = b = new e.Sprite;
    (a.Yz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(436)
    }).prototype = b = new e.Sprite;
    (a.Zz = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(437)
    }).prototype = b = new e.Sprite;
    (a.$z = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(438)
    }).prototype = b = new e.Sprite;
    (a.aA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(439)
    }).prototype = b = new e.Sprite;
    (a.bA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(440)
    }).prototype = b = new e.Sprite;
    (a.cA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(441)
    }).prototype = b = new e.Sprite;
    (a.dA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(442)
    }).prototype = b = new e.Sprite;
    (a.eA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(443)
    }).prototype =
        b = new e.Sprite;
    (a.fA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(444)
    }).prototype = b = new e.Sprite;
    (a.gA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(445)
    }).prototype = b = new e.Sprite;
    (a.hA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(446)
    }).prototype = b = new e.Sprite;
    (a.iA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(447)
    }).prototype = b = new e.Sprite;
    (a.jA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(448)
    }).prototype = b = new e.Sprite;
    (a.kA = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(449)
    }).prototype = b = new e.Sprite;
    (a.lA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(450)
    }).prototype = b = new e.Sprite;
    (a.mA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(451)
    }).prototype = b = new e.Sprite;
    (a.nA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(452)
    }).prototype = b = new e.Sprite;
    (a.oA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(453)
    }).prototype = b = new e.Sprite;
    (a.pA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(454)
    }).prototype =
        b = new e.Sprite;
    (a.qA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(455)
    }).prototype = b = new e.Sprite;
    (a.rA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(456)
    }).prototype = b = new e.Sprite;
    (a.sA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(457)
    }).prototype = b = new e.Sprite;
    (a.tA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(458)
    }).prototype = b = new e.Sprite;
    (a.uA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(459)
    }).prototype = b = new e.Sprite;
    (a.vA = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(460)
    }).prototype = b = new e.Sprite;
    (a.wA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(461)
    }).prototype = b = new e.Sprite;
    (a.xA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(462)
    }).prototype = b = new e.Sprite;
    (a.yA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(463)
    }).prototype = b = new e.Sprite;
    (a.zA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(464)
    }).prototype = b = new e.Sprite;
    (a.AA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(465)
    }).prototype =
        b = new e.Sprite;
    (a.BA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(466)
    }).prototype = b = new e.Sprite;
    (a.CA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(467)
    }).prototype = b = new e.Sprite;
    (a.DA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(468)
    }).prototype = b = new e.Sprite;
    (a.EA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(469)
    }).prototype = b = new e.Sprite;
    (a.FA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(470)
    }).prototype = b = new e.Sprite;
    (a.GA = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(471)
    }).prototype = b = new e.Sprite;
    (a.HA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(472)
    }).prototype = b = new e.Sprite;
    (a.IA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(473)
    }).prototype = b = new e.Sprite;
    (a.JA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(474)
    }).prototype = b = new e.Sprite;
    (a.KA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(475)
    }).prototype = b = new e.Sprite;
    (a.LA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(476)
    }).prototype =
        b = new e.Sprite;
    (a.MA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(477)
    }).prototype = b = new e.Sprite;
    (a.NA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(478)
    }).prototype = b = new e.Sprite;
    (a.OA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(479)
    }).prototype = b = new e.Sprite;
    (a.PA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(480)
    }).prototype = b = new e.Sprite;
    (a.QA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(481)
    }).prototype = b = new e.Sprite;
    (a.RA = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(482)
    }).prototype = b = new e.Sprite;
    (a.SA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(483)
    }).prototype = b = new e.Sprite;
    (a.TA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(484)
    }).prototype = b = new e.Sprite;
    (a.UA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(485)
    }).prototype = b = new e.Sprite;
    (a.VA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(486)
    }).prototype = b = new e.Sprite;
    (a.WA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(487)
    }).prototype =
        b = new e.Sprite;
    (a.XA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(488)
    }).prototype = b = new e.Sprite;
    (a.YA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(489)
    }).prototype = b = new e.Sprite;
    (a.ZA = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(490)
    }).prototype = b = new e.Sprite;
    (a.$A = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(491)
    }).prototype = b = new e.Sprite;
    (a.aB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(492)
    }).prototype = b = new e.Sprite;
    (a.bB = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(493)
    }).prototype = b = new e.Sprite;
    (a.cB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(494)
    }).prototype = b = new e.Sprite;
    (a.dB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(495)
    }).prototype = b = new e.Sprite;
    (a.eB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(496)
    }).prototype = b = new e.Sprite;
    (a.fB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(497)
    }).prototype = b = new e.Sprite;
    (a.gB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(498)
    }).prototype =
        b = new e.Sprite;
    (a.hB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(499)
    }).prototype = b = new e.Sprite;
    (a.iB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(500)
    }).prototype = b = new e.Sprite;
    (a.jB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(501)
    }).prototype = b = new e.Sprite;
    (a.kB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(502)
    }).prototype = b = new e.Sprite;
    (a.lB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(503)
    }).prototype = b = new e.Sprite;
    (a.mB = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(504)
    }).prototype = b = new e.Sprite;
    (a.nB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(505)
    }).prototype = b = new e.Sprite;
    (a.oB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(506)
    }).prototype = b = new e.Sprite;
    (a.pB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(507)
    }).prototype = b = new e.Sprite;
    (a.qB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(508)
    }).prototype = b = new e.Sprite;
    (a.rB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(509)
    }).prototype =
        b = new e.Sprite;
    (a.sB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(510)
    }).prototype = b = new e.Sprite;
    (a.tB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(511)
    }).prototype = b = new e.Sprite;
    (a.uB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(512)
    }).prototype = b = new e.Sprite;
    (a.vB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(513)
    }).prototype = b = new e.Sprite;
    (a.wB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(514)
    }).prototype = b = new e.Sprite;
    (a.xB = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(515)
    }).prototype = b = new e.Sprite;
    (a.yB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(516)
    }).prototype = b = new e.Sprite;
    (a.zB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(517)
    }).prototype = b = new e.Sprite;
    (a.AB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(518)
    }).prototype = b = new e.Sprite;
    (a.BB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(519)
    }).prototype = b = new e.Sprite;
    (a.CB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(520)
    }).prototype =
        b = new e.Sprite;
    (a.DB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(521)
    }).prototype = b = new e.Sprite;
    (a.EB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(522)
    }).prototype = b = new e.Sprite;
    (a.FB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(523)
    }).prototype = b = new e.Sprite;
    (a.GB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(524)
    }).prototype = b = new e.Sprite;
    (a.HB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(525)
    }).prototype = b = new e.Sprite;
    (a.IB = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(526)
    }).prototype = b = new e.Sprite;
    (a.JB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(527)
    }).prototype = b = new e.Sprite;
    (a.KB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(528)
    }).prototype = b = new e.Sprite;
    (a.LB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(529)
    }).prototype = b = new e.Sprite;
    (a.MB = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(530)
    }).prototype = b = new e.Sprite;
    (a.green = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(531)
    }).prototype =
        b = new e.Sprite;
    (a.nD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(532)
    }).prototype = b = new e.Sprite;
    (a.oD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(533)
    }).prototype = b = new e.Sprite;
    (a.qE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(534)
    }).prototype = b = new e.Sprite;
    (a.rE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(535)
    }).prototype = b = new e.Sprite;
    (a.sE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(536)
    }).prototype = b = new e.Sprite;
    (a.pD = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(537)
    }).prototype = b = new e.Sprite;
    (a.qD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(538)
    }).prototype = b = new e.Sprite;
    (a.hj = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(539)
    }).prototype = b = new e.Sprite;
    (a.rD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(540)
    }).prototype = b = new e.Sprite;
    (a.sD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(541)
    }).prototype = b = new e.Sprite;
    (a.ij = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(542)
    }).prototype =
        b = new e.Sprite;
    (a.tD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(543)
    }).prototype = b = new e.Sprite;
    (a.uD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(544)
    }).prototype = b = new e.Sprite;
    (a.vD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(545)
    }).prototype = b = new e.Sprite;
    (a.wD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(546)
    }).prototype = b = new e.Sprite;
    (a.AD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(547)
    }).prototype = b = new e.Sprite;
    (a.BD = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(548)
    }).prototype = b = new e.Sprite;
    (a.CD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(549)
    }).prototype = b = new e.Sprite;
    (a.DD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(550)
    }).prototype = b = new e.Sprite;
    (a.ED = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(551)
    }).prototype = b = new e.Sprite;
    (a.FD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(552)
    }).prototype = b = new e.Sprite;
    (a.GD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(553)
    }).prototype =
        b = new e.Sprite;
    (a.xD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(554)
    }).prototype = b = new e.Sprite;
    (a.yD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(555)
    }).prototype = b = new e.Sprite;
    (a.zD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(556)
    }).prototype = b = new e.Sprite;
    (a.HD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(557)
    }).prototype = b = new e.Sprite;
    (a.ID = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(558)
    }).prototype = b = new e.Sprite;
    (a.JD = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(559)
    }).prototype = b = new e.Sprite;
    (a.KD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(560)
    }).prototype = b = new e.Sprite;
    (a.LD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(561)
    }).prototype = b = new e.Sprite;
    (a.MD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(562)
    }).prototype = b = new e.Sprite;
    (a.ND = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(563)
    }).prototype = b = new e.Sprite;
    (a.OD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(564)
    }).prototype =
        b = new e.Sprite;
    (a.PD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(565)
    }).prototype = b = new e.Sprite;
    (a.XD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(566)
    }).prototype = b = new e.Sprite;
    (a.QD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(567)
    }).prototype = b = new e.Sprite;
    (a.RD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(568)
    }).prototype = b = new e.Sprite;
    (a.SD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(569)
    }).prototype = b = new e.Sprite;
    (a.TD = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(570)
    }).prototype = b = new e.Sprite;
    (a.UD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(571)
    }).prototype = b = new e.Sprite;
    (a.VD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(572)
    }).prototype = b = new e.Sprite;
    (a.WD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(573)
    }).prototype = b = new e.Sprite;
    (a.ZD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(574)
    }).prototype = b = new e.Sprite;
    (a.Bp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(575)
    }).prototype =
        b = new e.Sprite;
    (a.$D = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(576)
    }).prototype = b = new e.Sprite;
    (a.Cp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(577)
    }).prototype = b = new e.Sprite;
    (a.YD = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(578)
    }).prototype = b = new e.Sprite;
    (a.aE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(579)
    }).prototype = b = new e.Sprite;
    (a.bE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(580)
    }).prototype = b = new e.Sprite;
    (a.cE = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(581)
    }).prototype = b = new e.Sprite;
    (a.dE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(582)
    }).prototype = b = new e.Sprite;
    (a.eE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(583)
    }).prototype = b = new e.Sprite;
    (a.fE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(584)
    }).prototype = b = new e.Sprite;
    (a.gE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(585)
    }).prototype = b = new e.Sprite;
    (a.hE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(586)
    }).prototype =
        b = new e.Sprite;
    (a.iE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(587)
    }).prototype = b = new e.Sprite;
    (a.jE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(588)
    }).prototype = b = new e.Sprite;
    (a.kE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(589)
    }).prototype = b = new e.Sprite;
    (a.lE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(590)
    }).prototype = b = new e.Sprite;
    (a.mE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(591)
    }).prototype = b = new e.Sprite;
    (a.nE = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(592)
    }).prototype = b = new e.Sprite;
    (a.$f = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(593)
    }).prototype = b = new e.Sprite;
    (a.ag = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(594)
    }).prototype = b = new e.Sprite;
    (a.cg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(595)
    }).prototype = b = new e.Sprite;
    (a.dg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(596)
    }).prototype = b = new e.Sprite;
    (a.eg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(597)
    }).prototype =
        b = new e.Sprite;
    (a.fg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(598)
    }).prototype = b = new e.Sprite;
    (a.hg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(599)
    }).prototype = b = new e.Sprite;
    (a.ig = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(600)
    }).prototype = b = new e.Sprite;
    (a.jg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(601)
    }).prototype = b = new e.Sprite;
    (a.kg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(602)
    }).prototype = b = new e.Sprite;
    (a.lg = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(603)
    }).prototype = b = new e.Sprite;
    (a.mg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(604)
    }).prototype = b = new e.Sprite;
    (a.Qb = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(605)
    }).prototype = b = new e.Sprite;
    (a.ng = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(606)
    }).prototype = b = new e.Sprite;
    (a.og = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(607)
    }).prototype = b = new e.Sprite;
    (a.pg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(608)
    }).prototype =
        b = new e.Sprite;
    (a.qg = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(609)
    }).prototype = b = new e.Sprite;
    (a.oE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(610)
    }).prototype = b = new e.Sprite;
    (a.pE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(611)
    }).prototype = b = new e.Sprite;
    (a.Dp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(612)
    }).prototype = b = new e.Sprite;
    (a.Ep = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(613)
    }).prototype = b = new e.Sprite;
    (a.Fp = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(614)
    }).prototype = b = new e.Sprite;
    (a.Gp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(615)
    }).prototype = b = new e.Sprite;
    (a.Hp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(616)
    }).prototype = b = new e.Sprite;
    (a.Ip = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(617)
    }).prototype = b = new e.Sprite;
    (a.Jp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(618)
    }).prototype = b = new e.Sprite;
    (a.Kp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(619)
    }).prototype =
        b = new e.Sprite;
    (a.Lp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(620)
    }).prototype = b = new e.Sprite;
    (a.Mp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(621)
    }).prototype = b = new e.Sprite;
    (a.Np = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(622)
    }).prototype = b = new e.Sprite;
    (a.Op = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(623)
    }).prototype = b = new e.Sprite;
    (a.vE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(624)
    }).prototype = b = new e.Sprite;
    (a.wE = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(625)
    }).prototype = b = new e.Sprite;
    (a.xE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(626)
    }).prototype = b = new e.Sprite;
    (a.yE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(627)
    }).prototype = b = new e.Sprite;
    (a.zE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(628)
    }).prototype = b = new e.Sprite;
    (a.AE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(629)
    }).prototype = b = new e.Sprite;
    (a.BE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(630)
    }).prototype =
        b = new e.Sprite;
    (a.CE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(631)
    }).prototype = b = new e.Sprite;
    (a.DE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(632)
    }).prototype = b = new e.Sprite;
    (a.EE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(633)
    }).prototype = b = new e.Sprite;
    (a.GE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(634)
    }).prototype = b = new e.Sprite;
    (a.HE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(635)
    }).prototype = b = new e.Sprite;
    (a.IE = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(636)
    }).prototype = b = new e.Sprite;
    (a.JE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(637)
    }).prototype = b = new e.Sprite;
    (a.Qp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(638)
    }).prototype = b = new e.Sprite;
    (a.KE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(639)
    }).prototype = b = new e.Sprite;
    (a.LE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(640)
    }).prototype = b = new e.Sprite;
    (a.ME = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(641)
    }).prototype =
        b = new e.Sprite;
    (a.NE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(642)
    }).prototype = b = new e.Sprite;
    (a.OE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(643)
    }).prototype = b = new e.Sprite;
    (a.FE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(644)
    }).prototype = b = new e.Sprite;
    (a.Pp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(645)
    }).prototype = b = new e.Sprite;
    (a.PE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(646)
    }).prototype = b = new e.Sprite;
    (a.QE = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(647)
    }).prototype = b = new e.Sprite;
    (a.RE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(648)
    }).prototype = b = new e.Sprite;
    (a.SE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(649)
    }).prototype = b = new e.Sprite;
    (a.TE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(650)
    }).prototype = b = new e.Sprite;
    (a.UE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(651)
    }).prototype = b = new e.Sprite;
    (a.VE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(652)
    }).prototype =
        b = new e.Sprite;
    (a.WE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(653)
    }).prototype = b = new e.Sprite;
    (a.XE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(654)
    }).prototype = b = new e.Sprite;
    (a.YE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(655)
    }).prototype = b = new e.Sprite;
    (a.ZE = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(656)
    }).prototype = b = new e.Sprite;
    (a.$E = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(657)
    }).prototype = b = new e.Sprite;
    (a.aF = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(658)
    }).prototype = b = new e.Sprite;
    (a.bF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(659)
    }).prototype = b = new e.Sprite;
    (a.cF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(660)
    }).prototype = b = new e.Sprite;
    (a.Rp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(661)
    }).prototype = b = new e.Sprite;
    (a.tF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(662)
    }).prototype = b = new e.Sprite;
    (a.uF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(663)
    }).prototype =
        b = new e.Sprite;
    (a.vF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(664)
    }).prototype = b = new e.Sprite;
    (a.dF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(665)
    }).prototype = b = new e.Sprite;
    (a.eF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(666)
    }).prototype = b = new e.Sprite;
    (a.mF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(667)
    }).prototype = b = new e.Sprite;
    (a.nF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(668)
    }).prototype = b = new e.Sprite;
    (a.oF = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(669)
    }).prototype = b = new e.Sprite;
    (a.pF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(670)
    }).prototype = b = new e.Sprite;
    (a.qF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(671)
    }).prototype = b = new e.Sprite;
    (a.rF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(672)
    }).prototype = b = new e.Sprite;
    (a.sF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(673)
    }).prototype = b = new e.Sprite;
    (a.fF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(674)
    }).prototype =
        b = new e.Sprite;
    (a.gF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(675)
    }).prototype = b = new e.Sprite;
    (a.hF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(676)
    }).prototype = b = new e.Sprite;
    (a.iF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(677)
    }).prototype = b = new e.Sprite;
    (a.jF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(678)
    }).prototype = b = new e.Sprite;
    (a.kF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(679)
    }).prototype = b = new e.Sprite;
    (a.lF = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(680)
    }).prototype = b = new e.Sprite;
    (a.wF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(681)
    }).prototype = b = new e.Sprite;
    (a.xF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(682)
    }).prototype = b = new e.Sprite;
    (a.yF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(683)
    }).prototype = b = new e.Sprite;
    (a.FF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(684)
    }).prototype = b = new e.Sprite;
    (a.GF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(685)
    }).prototype =
        b = new e.Sprite;
    (a.HF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(686)
    }).prototype = b = new e.Sprite;
    (a.IF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(687)
    }).prototype = b = new e.Sprite;
    (a.JF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(688)
    }).prototype = b = new e.Sprite;
    (a.KF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(689)
    }).prototype = b = new e.Sprite;
    (a.LF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(690)
    }).prototype = b = new e.Sprite;
    (a.MF = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(691)
    }).prototype = b = new e.Sprite;
    (a.NF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(692)
    }).prototype = b = new e.Sprite;
    (a.OF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(693)
    }).prototype = b = new e.Sprite;
    (a.PF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(694)
    }).prototype = b = new e.Sprite;
    (a.QF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(695)
    }).prototype = b = new e.Sprite;
    (a.RF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(696)
    }).prototype =
        b = new e.Sprite;
    (a.SF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(697)
    }).prototype = b = new e.Sprite;
    (a.TF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(698)
    }).prototype = b = new e.Sprite;
    (a.Sp = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(699)
    }).prototype = b = new e.Sprite;
    (a.UF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(700)
    }).prototype = b = new e.Sprite;
    (a.VF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(701)
    }).prototype = b = new e.Sprite;
    (a.WF = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(702)
    }).prototype = b = new e.Sprite;
    (a.XF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(703)
    }).prototype = b = new e.Sprite;
    (a.YF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(704)
    }).prototype = b = new e.Sprite;
    (a.ZF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(705)
    }).prototype = b = new e.Sprite;
    (a.$F = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(706)
    }).prototype = b = new e.Sprite;
    (a.aG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(707)
    }).prototype =
        b = new e.Sprite;
    (a.zF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(708)
    }).prototype = b = new e.Sprite;
    (a.AF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(709)
    }).prototype = b = new e.Sprite;
    (a.BF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(710)
    }).prototype = b = new e.Sprite;
    (a.CF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(711)
    }).prototype = b = new e.Sprite;
    (a.DF = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(712)
    }).prototype = b = new e.Sprite;
    (a.EF = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(713)
    }).prototype = b = new e.Sprite;
    (a.bG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(714)
    }).prototype = b = new e.Sprite;
    (a.cG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(715)
    }).prototype = b = new e.Sprite;
    (a.dG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(716)
    }).prototype = b = new e.Sprite;
    (a.eG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(717)
    }).prototype = b = new e.Sprite;
    (a.fG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(718)
    }).prototype =
        b = new e.Sprite;
    (a.gG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(719)
    }).prototype = b = new e.Sprite;
    (a.hG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(720)
    }).prototype = b = new e.Sprite;
    (a.iG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(721)
    }).prototype = b = new e.Sprite;
    (a.jG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(722)
    }).prototype = b = new e.Sprite;
    (a.kG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(723)
    }).prototype = b = new e.Sprite;
    (a.OG = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(724)
    }).prototype = b = new e.Sprite;
    (a.PG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(725)
    }).prototype = b = new e.Sprite;
    (a.rq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(726)
    }).prototype = b = new e.Sprite;
    (a.sq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(727)
    }).prototype = b = new e.Sprite;
    (a.tq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(728)
    }).prototype = b = new e.Sprite;
    (a.QG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(729)
    }).prototype =
        b = new e.Sprite;
    (a.SG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(730)
    }).prototype = b = new e.Sprite;
    (a.TG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(731)
    }).prototype = b = new e.Sprite;
    (a.UG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(732)
    }).prototype = b = new e.Sprite;
    (a.VG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(733)
    }).prototype = b = new e.Sprite;
    (a.WG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(734)
    }).prototype = b = new e.Sprite;
    (a.XG = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(735)
    }).prototype = b = new e.Sprite;
    (a.YG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(736)
    }).prototype = b = new e.Sprite;
    (a.ZG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(737)
    }).prototype = b = new e.Sprite;
    (a.$G = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(738)
    }).prototype = b = new e.Sprite;
    (a.qG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(739)
    }).prototype = b = new e.Sprite;
    (a.rG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(740)
    }).prototype =
        b = new e.Sprite;
    (a.sG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(741)
    }).prototype = b = new e.Sprite;
    (a.tG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(742)
    }).prototype = b = new e.Sprite;
    (a.uG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(743)
    }).prototype = b = new e.Sprite;
    (a.vG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(744)
    }).prototype = b = new e.Sprite;
    (a.wG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(745)
    }).prototype = b = new e.Sprite;
    (a.xG = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(746)
    }).prototype = b = new e.Sprite;
    (a.yG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(747)
    }).prototype = b = new e.Sprite;
    (a.zG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(748)
    }).prototype = b = new e.Sprite;
    (a.AG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(749)
    }).prototype = b = new e.Sprite;
    (a.BG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(750)
    }).prototype = b = new e.Sprite;
    (a.CG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(751)
    }).prototype =
        b = new e.Sprite;
    (a.DG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(752)
    }).prototype = b = new e.Sprite;
    (a.lG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(753)
    }).prototype = b = new e.Sprite;
    (a.mG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(754)
    }).prototype = b = new e.Sprite;
    (a.nG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(755)
    }).prototype = b = new e.Sprite;
    (a.oG = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(756)
    }).prototype = b = new e.Sprite;
    (a.pG = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(757)
    }).prototype = b = new e.Sprite;
    (a.bH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(758)
    }).prototype = b = new e.Sprite;
    (a.cH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(759)
    }).prototype = b = new e.Sprite;
    (a.dH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(760)
    }).prototype = b = new e.Sprite;
    (a.eH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(761)
    }).prototype = b = new e.Sprite;
    (a.fH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(762)
    }).prototype =
        b = new e.Sprite;
    (a.gH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(763)
    }).prototype = b = new e.Sprite;
    (a.hH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(764)
    }).prototype = b = new e.Sprite;
    (a.iH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(765)
    }).prototype = b = new e.Sprite;
    (a.jH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(766)
    }).prototype = b = new e.Sprite;
    (a.kH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(767)
    }).prototype = b = new e.Sprite;
    (a.lH = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(768)
    }).prototype = b = new e.Sprite;
    (a.mH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(769)
    }).prototype = b = new e.Sprite;
    (a.nH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(770)
    }).prototype = b = new e.Sprite;
    (a.oH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(771)
    }).prototype = b = new e.Sprite;
    (a.pH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(772)
    }).prototype = b = new e.Sprite;
    (a.qH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(773)
    }).prototype =
        b = new e.Sprite;
    (a.rH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(774)
    }).prototype = b = new e.Sprite;
    (a.sH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(775)
    }).prototype = b = new e.Sprite;
    (a.tH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(776)
    }).prototype = b = new e.Sprite;
    (a.uH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(777)
    }).prototype = b = new e.Sprite;
    (a.vH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(778)
    }).prototype = b = new e.Sprite;
    (a.wH = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(779)
    }).prototype = b = new e.Sprite;
    (a.xH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(780)
    }).prototype = b = new e.Sprite;
    (a.yH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(781)
    }).prototype = b = new e.Sprite;
    (a.zH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(782)
    }).prototype = b = new e.Sprite;
    (a.AH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(783)
    }).prototype = b = new e.Sprite;
    (a.BH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(784)
    }).prototype =
        b = new e.Sprite;
    (a.CH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(785)
    }).prototype = b = new e.Sprite;
    (a.DH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(786)
    }).prototype = b = new e.Sprite;
    (a.EH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(787)
    }).prototype = b = new e.Sprite;
    (a.FH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(788)
    }).prototype = b = new e.Sprite;
    (a.GH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(789)
    }).prototype = b = new e.Sprite;
    (a.HH = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(790)
    }).prototype = b = new e.Sprite;
    (a.IH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(791)
    }).prototype = b = new e.Sprite;
    (a.JH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(792)
    }).prototype = b = new e.Sprite;
    (a.KH = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(793)
    }).prototype = b = new e.Sprite;
    (a.Zh = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(794)
    }).prototype = b = new e.Sprite;
    (a.$h = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(795)
    }).prototype =
        b = new e.Sprite;
    (a.Zc = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(796)
    }).prototype = b = new e.Sprite;
    (a.Fq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(797)
    }).prototype = b = new e.Sprite;
    (a.aI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(798)
    }).prototype = b = new e.Sprite;
    (a.Gq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(799)
    }).prototype = b = new e.Sprite;
    (a.Hq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(800)
    }).prototype = b = new e.Sprite;
    (a.Iq = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(801)
    }).prototype = b = new e.Sprite;
    (a.Jq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(802)
    }).prototype = b = new e.Sprite;
    (a.Eo = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(803)
    }).prototype = b = new e.Sprite;
    (a.bI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(804)
    }).prototype = b = new e.Sprite;
    (a.cI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(805)
    }).prototype = b = new e.Sprite;
    (a.dI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(806)
    }).prototype =
        b = new e.Sprite;
    (a.eI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(807)
    }).prototype = b = new e.Sprite;
    (a.fI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(808)
    }).prototype = b = new e.Sprite;
    (a.Kq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(809)
    }).prototype = b = new e.Sprite;
    (a.Lq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(810)
    }).prototype = b = new e.Sprite;
    (a.Eq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(811)
    }).prototype = b = new e.Sprite;
    (a.hI = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(812)
    }).prototype = b = new e.Sprite;
    (a.iI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(813)
    }).prototype = b = new e.Sprite;
    (a.jI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(814)
    }).prototype = b = new e.Sprite;
    (a.kI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(815)
    }).prototype = b = new e.Sprite;
    (a.lI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(816)
    }).prototype = b = new e.Sprite;
    (a.mI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(817)
    }).prototype =
        b = new e.Sprite;
    (a.nI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(818)
    }).prototype = b = new e.Sprite;
    (a.gI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(819)
    }).prototype = b = new e.Sprite;
    (a.Zq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(820)
    }).prototype = b = new e.Sprite;
    (a.$q = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(821)
    }).prototype = b = new e.Sprite;
    (a.ar = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(822)
    }).prototype = b = new e.Sprite;
    (a.Wq = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(823)
    }).prototype = b = new e.Sprite;
    (a.Xq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(824)
    }).prototype = b = new e.Sprite;
    (a.Yq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(825)
    }).prototype = b = new e.Sprite;
    (a.Sq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(826)
    }).prototype = b = new e.Sprite;
    (a.Tq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(827)
    }).prototype = b = new e.Sprite;
    (a.Uq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(828)
    }).prototype =
        b = new e.Sprite;
    (a.Vq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(829)
    }).prototype = b = new e.Sprite;
    (a.Nq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(830)
    }).prototype = b = new e.Sprite;
    (a.Oq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(831)
    }).prototype = b = new e.Sprite;
    (a.Pq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(832)
    }).prototype = b = new e.Sprite;
    (a.Qq = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(833)
    }).prototype = b = new e.Sprite;
    (a.Rq = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(834)
    }).prototype = b = new e.Sprite;
    (a.pI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(835)
    }).prototype = b = new e.Sprite;
    (a.qI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(836)
    }).prototype = b = new e.Sprite;
    (a.rI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(837)
    }).prototype = b = new e.Sprite;
    (a.sI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(838)
    }).prototype = b = new e.Sprite;
    (a.tI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(839)
    }).prototype =
        b = new e.Sprite;
    (a.uI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(840)
    }).prototype = b = new e.Sprite;
    (a.vI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(841)
    }).prototype = b = new e.Sprite;
    (a.wI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(842)
    }).prototype = b = new e.Sprite;
    (a.xI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(843)
    }).prototype = b = new e.Sprite;
    (a.yI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(844)
    }).prototype = b = new e.Sprite;
    (a.zI = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(845)
    }).prototype = b = new e.Sprite;
    (a.AI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(846)
    }).prototype = b = new e.Sprite;
    (a.BI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(847)
    }).prototype = b = new e.Sprite;
    (a.CI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(848)
    }).prototype = b = new e.Sprite;
    (a.DI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(849)
    }).prototype = b = new e.Sprite;
    (a.EI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(850)
    }).prototype =
        b = new e.Sprite;
    (a.FI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(851)
    }).prototype = b = new e.Sprite;
    (a.GI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(852)
    }).prototype = b = new e.Sprite;
    (a.HI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(853)
    }).prototype = b = new e.Sprite;
    (a.II = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(854)
    }).prototype = b = new e.Sprite;
    (a.JI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(855)
    }).prototype = b = new e.Sprite;
    (a.KI = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(856)
    }).prototype = b = new e.Sprite;
    (a.UI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(857)
    }).prototype = b = new e.Sprite;
    (a.VI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(858)
    }).prototype = b = new e.Sprite;
    (a.WI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(859)
    }).prototype = b = new e.Sprite;
    (a.XI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(860)
    }).prototype = b = new e.Sprite;
    (a.YI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(861)
    }).prototype =
        b = new e.Sprite;
    (a.ZI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(862)
    }).prototype = b = new e.Sprite;
    (a.$I = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(863)
    }).prototype = b = new e.Sprite;
    (a.aJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(864)
    }).prototype = b = new e.Sprite;
    (a.bJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(865)
    }).prototype = b = new e.Sprite;
    (a.cJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(866)
    }).prototype = b = new e.Sprite;
    (a.eJ = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(867)
    }).prototype = b = new e.Sprite;
    (a.LI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(868)
    }).prototype = b = new e.Sprite;
    (a.MI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(869)
    }).prototype = b = new e.Sprite;
    (a.NI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(870)
    }).prototype = b = new e.Sprite;
    (a.OI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(871)
    }).prototype = b = new e.Sprite;
    (a.QI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(872)
    }).prototype =
        b = new e.Sprite;
    (a.RI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(873)
    }).prototype = b = new e.Sprite;
    (a.SI = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(874)
    }).prototype = b = new e.Sprite;
    (a.gJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(875)
    }).prototype = b = new e.Sprite;
    (a.hJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(876)
    }).prototype = b = new e.Sprite;
    (a.iJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(877)
    }).prototype = b = new e.Sprite;
    (a.jJ = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(878)
    }).prototype = b = new e.Sprite;
    (a.kJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(879)
    }).prototype = b = new e.Sprite;
    (a.lJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(880)
    }).prototype = b = new e.Sprite;
    (a.mJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(881)
    }).prototype = b = new e.Sprite;
    (a.nJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(882)
    }).prototype = b = new e.Sprite;
    (a.oJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(883)
    }).prototype =
        b = new e.Sprite;
    (a.pJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(884)
    }).prototype = b = new e.Sprite;
    (a.qJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(885)
    }).prototype = b = new e.Sprite;
    (a.rJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(886)
    }).prototype = b = new e.Sprite;
    (a.sJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(887)
    }).prototype = b = new e.Sprite;
    (a.tJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(888)
    }).prototype = b = new e.Sprite;
    (a.uJ = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(889)
    }).prototype = b = new e.Sprite;
    (a.vJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(890)
    }).prototype = b = new e.Sprite;
    (a.wJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(891)
    }).prototype = b = new e.Sprite;
    (a.xJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(892)
    }).prototype = b = new e.Sprite;
    (a.yJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(893)
    }).prototype = b = new e.Sprite;
    (a.zJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(894)
    }).prototype =
        b = new e.Sprite;
    (a.AJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(895)
    }).prototype = b = new e.Sprite;
    (a.BJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(896)
    }).prototype = b = new e.Sprite;
    (a.CJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(897)
    }).prototype = b = new e.Sprite;
    (a.DJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(898)
    }).prototype = b = new e.Sprite;
    (a.EJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(899)
    }).prototype = b = new e.Sprite;
    (a.FJ = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(900)
    }).prototype = b = new e.Sprite;
    (a.GJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(901)
    }).prototype = b = new e.Sprite;
    (a.HJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(902)
    }).prototype = b = new e.Sprite;
    (a.IJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(903)
    }).prototype = b = new e.Sprite;
    (a.JJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(904)
    }).prototype = b = new e.Sprite;
    (a.KJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(905)
    }).prototype =
        b = new e.Sprite;
    (a.LJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(906)
    }).prototype = b = new e.Sprite;
    (a.MJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(907)
    }).prototype = b = new e.Sprite;
    (a.NJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(908)
    }).prototype = b = new e.Sprite;
    (a.OJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(909)
    }).prototype = b = new e.Sprite;
    (a.PJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(910)
    }).prototype = b = new e.Sprite;
    (a.QJ = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(911)
    }).prototype = b = new e.Sprite;
    (a.RJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(912)
    }).prototype = b = new e.Sprite;
    (a.SJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(913)
    }).prototype = b = new e.Sprite;
    (a.TJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(914)
    }).prototype = b = new e.Sprite;
    (a.UJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(915)
    }).prototype = b = new e.Sprite;
    (a.VJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(916)
    }).prototype =
        b = new e.Sprite;
    (a.WJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(917)
    }).prototype = b = new e.Sprite;
    (a.XJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(918)
    }).prototype = b = new e.Sprite;
    (a.YJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(919)
    }).prototype = b = new e.Sprite;
    (a.ZJ = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(920)
    }).prototype = b = new e.Sprite;
    (a.$J = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(921)
    }).prototype = b = new e.Sprite;
    (a.aK = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(922)
    }).prototype = b = new e.Sprite;
    (a.bK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(923)
    }).prototype = b = new e.Sprite;
    (a.cK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(924)
    }).prototype = b = new e.Sprite;
    (a.dK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(925)
    }).prototype = b = new e.Sprite;
    (a.eK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(926)
    }).prototype = b = new e.Sprite;
    (a.fK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(927)
    }).prototype =
        b = new e.Sprite;
    (a.gK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(928)
    }).prototype = b = new e.Sprite;
    (a.hK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(929)
    }).prototype = b = new e.Sprite;
    (a.iK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(930)
    }).prototype = b = new e.Sprite;
    (a.jK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(931)
    }).prototype = b = new e.Sprite;
    (a.kK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(932)
    }).prototype = b = new e.Sprite;
    (a.lK = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(933)
    }).prototype = b = new e.Sprite;
    (a.mK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(934)
    }).prototype = b = new e.Sprite;
    (a.nK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(935)
    }).prototype = b = new e.Sprite;
    (a.oK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(936)
    }).prototype = b = new e.Sprite;
    (a.pK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(937)
    }).prototype = b = new e.Sprite;
    (a.qK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(938)
    }).prototype =
        b = new e.Sprite;
    (a.rK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(939)
    }).prototype = b = new e.Sprite;
    (a.sK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(940)
    }).prototype = b = new e.Sprite;
    (a.tK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(941)
    }).prototype = b = new e.Sprite;
    (a.uK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(942)
    }).prototype = b = new e.Sprite;
    (a.vK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(943)
    }).prototype = b = new e.Sprite;
    (a.wK = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(944)
    }).prototype = b = new e.Sprite;
    (a.xK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(945)
    }).prototype = b = new e.Sprite;
    (a.yK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(946)
    }).prototype = b = new e.Sprite;
    (a.zK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(947)
    }).prototype = b = new e.Sprite;
    (a.AK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(948)
    }).prototype = b = new e.Sprite;
    (a.BK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(949)
    }).prototype =
        b = new e.Sprite;
    (a.Ho = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(950)
    }).prototype = b = new e.Sprite;
    (a.Io = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(951)
    }).prototype = b = new e.Sprite;
    (a.CK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(952)
    }).prototype = b = new e.Sprite;
    (a.jm = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(953)
    }).prototype = b = new e.Sprite;
    (a.cr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(954)
    }).prototype = b = new e.Sprite;
    (a.er = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(955)
    }).prototype = b = new e.Sprite;
    (a.fr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(956)
    }).prototype = b = new e.Sprite;
    (a.gr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(957)
    }).prototype = b = new e.Sprite;
    (a.hr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(958)
    }).prototype = b = new e.Sprite;
    (a.ir = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(959)
    }).prototype = b = new e.Sprite;
    (a.jr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(960)
    }).prototype =
        b = new e.Sprite;
    (a.kr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(961)
    }).prototype = b = new e.Sprite;
    (a.lr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(962)
    }).prototype = b = new e.Sprite;
    (a.mr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(963)
    }).prototype = b = new e.Sprite;
    (a.nr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(964)
    }).prototype = b = new e.Sprite;
    (a.qr = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(965)
    }).prototype = b = new e.Sprite;
    (a.Jo = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(966)
    }).prototype = b = new e.Sprite;
    (a.DK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(967)
    }).prototype = b = new e.Sprite;
    (a.Ko = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(968)
    }).prototype = b = new e.Sprite;
    (a.EK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(969)
    }).prototype = b = new e.Sprite;
    (a.Lo = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(970)
    }).prototype = b = new e.Sprite;
    (a.FK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(971)
    }).prototype =
        b = new e.Sprite;
    (a.Mo = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(972)
    }).prototype = b = new e.Sprite;
    (a.GK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(973)
    }).prototype = b = new e.Sprite;
    (a.No = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(974)
    }).prototype = b = new e.Sprite;
    (a.HK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(975)
    }).prototype = b = new e.Sprite;
    (a.Oo = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(976)
    }).prototype = b = new e.Sprite;
    (a.IK = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(977)
    }).prototype = b = new e.Sprite;
    (a.km = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(978)
    }).prototype = b = new e.Sprite;
    (a.lm = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(979)
    }).prototype = b = new e.Sprite;
    (a.mm = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(980)
    }).prototype = b = new e.Sprite;
    (a.nm = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(981)
    }).prototype = b = new e.Sprite;
    (a.om = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(982)
    }).prototype =
        b = new e.Sprite;
    (a.pm = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(983)
    }).prototype = b = new e.Sprite;
    (a.Po = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(984)
    }).prototype = b = new e.Sprite;
    (a.Qo = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(985)
    }).prototype = b = new e.Sprite;
    (a.JK = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(986)
    }).prototype = b = new e.Sprite;
    (a.qm = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(987)
    }).prototype = b = new e.Sprite;
    (a.sr = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(988)
    }).prototype = b = new e.Sprite;
    (a.eb = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(989)
    }).prototype = b = new e.Sprite;
    (a.kc = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(990)
    }).prototype = b = new e.Sprite;
    (a.lc = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(991)
    }).prototype = b = new e.Sprite;
    (a.mc = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(992)
    }).prototype = b = new e.Sprite;
    (a.nc = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(993)
    }).prototype =
        b = new e.Sprite;
    (a.oc = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(994)
    }).prototype = b = new e.Sprite;
    (a.pc = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(995)
    }).prototype = b = new e.Sprite;
    (a.qc = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(996)
    }).prototype = b = new e.Sprite;
    (a.sc = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(997)
    }).prototype = b = new e.Sprite;
    (a.aL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(998)
    }).prototype = b = new e.Sprite;
    (a.bL = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(999)
    }).prototype = b = new e.Sprite;
    (a.cL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1E3)
    }).prototype = b = new e.Sprite;
    (a.dL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1001)
    }).prototype = b = new e.Sprite;
    (a.eL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1002)
    }).prototype = b = new e.Sprite;
    (a.fL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1003)
    }).prototype = b = new e.Sprite;
    (a.gL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1004)
    }).prototype =
        b = new e.Sprite;
    (a.hL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1005)
    }).prototype = b = new e.Sprite;
    (a.iL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1006)
    }).prototype = b = new e.Sprite;
    (a.jL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1007)
    }).prototype = b = new e.Sprite;
    (a.kL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1008)
    }).prototype = b = new e.Sprite;
    (a.lL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1009)
    }).prototype = b = new e.Sprite;
    (a.oL =
        function () {
            this.spriteSheet = f.cm_atlas_;
            this.gotoAndStop(1010)
        }).prototype = b = new e.Sprite;
    (a.qL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1011)
    }).prototype = b = new e.Sprite;
    (a.rL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1012)
    }).prototype = b = new e.Sprite;
    (a.sL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1013)
    }).prototype = b = new e.Sprite;
    (a.tL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1014)
    }).prototype = b = new e.Sprite;
    (a.uL = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(1015)
    }).prototype = b = new e.Sprite;
    (a.vL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1016)
    }).prototype = b = new e.Sprite;
    (a.wL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1017)
    }).prototype = b = new e.Sprite;
    (a.xL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1018)
    }).prototype = b = new e.Sprite;
    (a.yL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1019)
    }).prototype = b = new e.Sprite;
    (a.zL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1020)
    }).prototype =
        b = new e.Sprite;
    (a.AL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1021)
    }).prototype = b = new e.Sprite;
    (a.BL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1022)
    }).prototype = b = new e.Sprite;
    (a.CL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1023)
    }).prototype = b = new e.Sprite;
    (a.DL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1024)
    }).prototype = b = new e.Sprite;
    (a.EL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1025)
    }).prototype = b = new e.Sprite;
    (a.FL =
        function () {
            this.spriteSheet = f.cm_atlas_;
            this.gotoAndStop(1026)
        }).prototype = b = new e.Sprite;
    (a.GL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1027)
    }).prototype = b = new e.Sprite;
    (a.HL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1028)
    }).prototype = b = new e.Sprite;
    (a.IL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1029)
    }).prototype = b = new e.Sprite;
    (a.JL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1030)
    }).prototype = b = new e.Sprite;
    (a.KL = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(1031)
    }).prototype = b = new e.Sprite;
    (a.LL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1032)
    }).prototype = b = new e.Sprite;
    (a.ML = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1033)
    }).prototype = b = new e.Sprite;
    (a.NL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1034)
    }).prototype = b = new e.Sprite;
    (a.OL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1035)
    }).prototype = b = new e.Sprite;
    (a.PL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1036)
    }).prototype =
        b = new e.Sprite;
    (a.QL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1037)
    }).prototype = b = new e.Sprite;
    (a.RL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1038)
    }).prototype = b = new e.Sprite;
    (a.SL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1039)
    }).prototype = b = new e.Sprite;
    (a.TL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1040)
    }).prototype = b = new e.Sprite;
    (a.UL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1041)
    }).prototype = b = new e.Sprite;
    (a.VL =
        function () {
            this.spriteSheet = f.cm_atlas_;
            this.gotoAndStop(1042)
        }).prototype = b = new e.Sprite;
    (a.WL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1043)
    }).prototype = b = new e.Sprite;
    (a.XL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1044)
    }).prototype = b = new e.Sprite;
    (a.YL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1045)
    }).prototype = b = new e.Sprite;
    (a.ZL = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1046)
    }).prototype = b = new e.Sprite;
    (a.$L = function () {
        this.spriteSheet =
            f.cm_atlas_;
        this.gotoAndStop(1047)
    }).prototype = b = new e.Sprite;
    (a.aM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1048)
    }).prototype = b = new e.Sprite;
    (a.bM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1049)
    }).prototype = b = new e.Sprite;
    (a.cM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1050)
    }).prototype = b = new e.Sprite;
    (a.dM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1051)
    }).prototype = b = new e.Sprite;
    (a.eM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1052)
    }).prototype =
        b = new e.Sprite;
    (a.fM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1053)
    }).prototype = b = new e.Sprite;
    (a.gM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1054)
    }).prototype = b = new e.Sprite;
    (a.hM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1055)
    }).prototype = b = new e.Sprite;
    (a.iM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1056)
    }).prototype = b = new e.Sprite;
    (a.jM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1057)
    }).prototype = b = new e.Sprite;
    (a.kM =
        function () {
            this.spriteSheet = f.cm_atlas_;
            this.gotoAndStop(1058)
        }).prototype = b = new e.Sprite;
    (a.lM = function () {
        this.spriteSheet = f.cm_atlas_;
        this.gotoAndStop(1059)
    }).prototype = b = new e.Sprite;
    (a.hi = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.rA;
        this.ba.parent = this;
        this.$ = new a.sA;
        this.$.parent = this;
        this.aa = new a.tA;
        this.aa.parent = this;
        this.ca = new a.uA;
        this.ca.parent = this;
        this.da = new a.vA;
        this.da.parent = this;
        this.fa = new a.wA;
        this.fa.parent = this;
        this.ga = new a.xA;
        this.ga.parent = this;
        this.ea = new a.yA;
        this.ea.parent = this;
        this.ia = new a.zA;
        this.ia.parent = this;
        this.ha = new a.AA;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0,
        0, 16, 16);
    (a.Xo = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.DB;
        this.ba.parent = this;
        this.$ = new a.EB;
        this.$.parent = this;
        this.aa = new a.FB;
        this.aa.parent = this;
        this.ca = new a.GB;
        this.ca.parent = this;
        this.da = new a.HB;
        this.da.parent = this;
        this.fa = new a.IB;
        this.fa.parent = this;
        this.ga = new a.JB;
        this.ga.parent = this;
        this.ea = new a.KB;
        this.ea.parent = this;
        this.ia = new a.LB;
        this.ia.parent = this;
        this.ha = new a.MB;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
                state: [{
                    t: this.$
                }]
            },
            1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 32, 48);
    (a.Go = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.tB;
        this.ba.parent = this;
        this.$ = new a.uB;
        this.$.parent = this;
        this.aa = new a.vB;
        this.aa.parent = this;
        this.ca =
            new a.wB;
        this.ca.parent = this;
        this.da = new a.xB;
        this.da.parent = this;
        this.fa = new a.yB;
        this.fa.parent = this;
        this.ga = new a.zB;
        this.ga.parent = this;
        this.ea = new a.AB;
        this.ea.parent = this;
        this.ia = new a.BB;
        this.ia.parent = this;
        this.ha = new a.CB;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
                state: [{
                    t: this.ea
                }]
            },
            1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 16, 32);
    (a.Bo = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.LA;
        this.ba.parent = this;
        this.$ = new a.MA;
        this.$.parent = this;
        this.aa = new a.NA;
        this.aa.parent = this;
        this.ca = new a.OA;
        this.ca.parent = this;
        this.da = new a.PA;
        this.da.parent = this;
        this.fa = new a.QA;
        this.fa.parent = this;
        this.ga = new a.RA;
        this.ga.parent = this;
        this.ea = new a.SA;
        this.ea.parent =
            this;
        this.ia = new a.TA;
        this.ia.parent = this;
        this.ha = new a.UA;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 16, 16);
    (a.zg = function () {
        this.initialize(void 0,
            void 0, void 0, {
                "?": 11
            });
        this.ba = new a.eB;
        this.ba.parent = this;
        this.$ = new a.fB;
        this.$.parent = this;
        this.aa = new a.gB;
        this.aa.parent = this;
        this.ca = new a.hB;
        this.ca.parent = this;
        this.da = new a.iB;
        this.da.parent = this;
        this.fa = new a.jB;
        this.fa.parent = this;
        this.ga = new a.kB;
        this.ga.parent = this;
        this.ea = new a.lB;
        this.ea.parent = this;
        this.ia = new a.mB;
        this.ia.parent = this;
        this.ha = new a.nB;
        this.ha.parent = this;
        this.ka = new a.OG;
        this.ka.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
                state: [{
                    t: this.$
                }]
            },
            1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).to({
            state: [{
                t: this.ka
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 16, 32);
    (a.Co = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.VA;
        this.ba.parent = this;
        this.$ = new a.WA;
        this.$.parent = this;
        this.aa = new a.XA;
        this.aa.parent = this;
        this.ca = new a.YA;
        this.ca.parent = this;
        this.da = new a.ZA;
        this.da.parent = this;
        this.fa = new a.$A;
        this.fa.parent = this;
        this.ga = new a.aB;
        this.ga.parent = this;
        this.ea = new a.bB;
        this.ea.parent = this;
        this.ia = new a.cB;
        this.ia.parent = this;
        this.ha = new a.dB;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
                state: [{
                    t: this.ga
                }]
            },
            1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 16, 16);
    (a.jj = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.BA;
        this.ba.parent = this;
        this.$ = new a.CA;
        this.$.parent = this;
        this.aa = new a.DA;
        this.aa.parent = this;
        this.ca = new a.EA;
        this.ca.parent = this;
        this.da = new a.FA;
        this.da.parent = this;
        this.fa = new a.GA;
        this.fa.parent = this;
        this.ga = new a.HA;
        this.ga.parent = this;
        this.ea = new a.IA;
        this.ea.parent = this;
        this.ia = new a.JA;
        this.ia.parent = this;
        this.ha = new a.KA;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0,
        0, 16, 32);
    (a.Nm = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.NB;
        this.ba.parent = this;
        this.$ = new a.OB;
        this.$.parent = this;
        this.$.setTransform(1, 0);
        this.aa = new a.PB;
        this.aa.parent = this;
        this.ca = new a.QB;
        this.ca.parent = this;
        this.da = new a.RB;
        this.da.parent = this;
        this.fa = new a.SB;
        this.fa.parent = this;
        this.ga = new a.TB;
        this.ga.parent = this;
        this.ea = new a.UB;
        this.ea.parent = this;
        this.ia = new a.VB;
        this.ia.parent = this;
        this.ha = new a.WB;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
                state: [{
                    t: this.$
                }]
            },
            1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 8, 16);
    (a.vp = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.hA;
        this.ba.parent = this;
        this.$ = new a.iA;
        this.$.parent = this;
        this.aa = new a.jA;
        this.aa.parent = this;
        this.ca = new a.kA;
        this.ca.parent = this;
        this.da = new a.lA;
        this.da.parent = this;
        this.fa = new a.mA;
        this.fa.parent = this;
        this.ga = new a.nA;
        this.ga.parent = this;
        this.ea = new a.oA;
        this.ea.parent = this;
        this.ia = new a.pA;
        this.ia.parent = this;
        this.ha = new a.qA;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
                state: [{
                    t: this.ia
                }]
            },
            1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 16, 16);
    (a.up = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.Yz;
        this.ba.parent = this;
        this.$ = new a.Zz;
        this.$.parent = this;
        this.aa = new a.$z;
        this.aa.parent = this;
        this.ca = new a.aA;
        this.ca.parent = this;
        this.da = new a.bA;
        this.da.parent = this;
        this.fa = new a.cA;
        this.fa.parent = this;
        this.ga = new a.dA;
        this.ga.parent = this;
        this.ea = new a.eA;
        this.ea.parent = this;
        this.ia = new a.fA;
        this.ia.parent =
            this;
        this.ha = new a.gA;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 16, 32);
    (a.$K = function () {
        this.initialize(void 0, void 0,
            void 0, {
                line: 0,
                win: 1,
                risk: 2,
                bonus: 3,
                "super": 4
            });
        this.ba = new a.Hp;
        this.ba.parent = this;
        this.ba.setTransform(224, 16);
        this.$ = new a.Fp;
        this.$.parent = this;
        this.$.setTransform(448, 16);
        this.aa = new a.Lp;
        this.aa.parent = this;
        this.aa.setTransform(0, 16);
        this.ca = new a.Dp;
        this.ca.parent = this;
        this.ca.setTransform(0, 32);
        this.da = new a.Jp;
        this.da.parent = this;
        this.fa = new a.Np;
        this.fa.parent = this;
        this.fa.setTransform(224, 16);
        this.ga = new a.Ip;
        this.ga.parent = this;
        this.ga.setTransform(224, 16);
        this.ea = new a.Gp;
        this.ea.parent =
            this;
        this.ea.setTransform(0, 16);
        this.ia = new a.Kp;
        this.ia.parent = this;
        this.ha = new a.Ep;
        this.ha.parent = this;
        this.ha.setTransform(0, 32);
        this.ka = new a.Op;
        this.ka.parent = this;
        this.ka.setTransform(224, 16);
        this.ja = new a.Mp;
        this.ja.parent = this;
        this.ja.setTransform(0, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$,
                p: {
                    scaleY: 1
                }
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$,
                p: {
                    scaleY: 1
                }
            }, {
                t: this.fa
            }]
        }, 1).to({
            state: [{
                    t: this.$,
                    p: {
                        scaleY: 1
                    }
                },
                {
                    t: this.ha
                }, {
                    t: this.ia,
                    p: {
                        scaleY: 1
                    }
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }
            ]
        }, 1).to({
            state: [{
                t: this.$,
                p: {
                    scaleY: 1.001
                }
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ia,
                p: {
                    scaleY: 1.004
                }
            }, {
                t: this.ha
            }]
        }, 1).to({
            state: [{
                t: this.$,
                p: {
                    scaleY: 1.001
                }
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ia,
                p: {
                    scaleY: 1.004
                }
            }, {
                t: this.ha
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 64);
    (a.ZK = function () {
        this.initialize(void 0, void 0, void 0, {
            line: 0,
            win: 1,
            risk: 2,
            bonus: 3,
            "super": 4
        });
        this.ba = new a.Nz;
        this.ba.parent = this;
        this.ba.setTransform(448,
            16);
        this.timeline.addTween(e.Tween.get(this.ba).wait(5));
        this.$ = new a.Mz;
        this.$.parent = this;
        this.$.setTransform(16, 16);
        this.timeline.addTween(e.Tween.get(this.$).to({
            _off: !0
        }, 2).wait(3));
        this.aa = new a.Hp;
        this.aa.parent = this;
        this.aa.setTransform(224, 16);
        this.ca = new a.Fp;
        this.ca.parent = this;
        this.ca.setTransform(448, 16);
        this.da = new a.Lp;
        this.da.parent = this;
        this.da.setTransform(0, 16);
        this.fa = new a.Dp;
        this.fa.parent = this;
        this.fa.setTransform(0, 32);
        this.ga = new a.Jp;
        this.ga.parent = this;
        this.ea = new a.Np;
        this.ea.parent = this;
        this.ea.setTransform(224, 16);
        this.ia = new a.Ip;
        this.ia.parent = this;
        this.ia.setTransform(224, 16);
        this.ha = new a.Gp;
        this.ha.parent = this;
        this.ha.setTransform(0, 16);
        this.ka = new a.Kp;
        this.ka.parent = this;
        this.ja = new a.Ep;
        this.ja.parent = this;
        this.ja.setTransform(0, 32);
        this.la = new a.Op;
        this.la.parent = this;
        this.la.setTransform(224, 16);
        this.ma = new a.Mp;
        this.ma.parent = this;
        this.ma.setTransform(0, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca,
                p: {
                    scaleY: 1
                }
            }, {
                t: this.aa
            }]
        }).to({
            state: [{
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca,
                p: {
                    scaleY: 1
                }
            }, {
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ca,
                p: {
                    scaleY: 1
                }
            }, {
                t: this.ja,
                p: {
                    scaleY: 1
                }
            }, {
                t: this.ka,
                p: {
                    scaleY: 1
                }
            }, {
                t: this.ha
            }, {
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ca,
                p: {
                    scaleY: 1.001
                }
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja,
                p: {
                    scaleY: 1.001
                }
            }, {
                t: this.ka,
                p: {
                    scaleY: 1.004
                }
            }]
        }, 1).to({
            state: [{
                t: this.ca,
                p: {
                    scaleY: 1.001
                }
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja,
                p: {
                    scaleY: 1.001
                }
            }, {
                t: this.ka,
                p: {
                    scaleY: 1.004
                }
            }]
        }, 1).wait(1))
    }).prototype =
        b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 64);
    (a.vr = function () {
        this.initialize(void 0, void 0, void 0, {
            wait: 0,
            win: 1,
            stop: 18,
            stopE: 19,
            lose: 20,
            stop2: 37,
            stop2E: 38
        });
        this.uC = function () {
            this.stop()
        };
        this.QC = function () {
            this.stop()
        };
        this.timeline.addTween(e.Tween.get(this).wait(18).call(this.uC).wait(19).call(this.QC).wait(2));
        this.ba = new a.aL;
        this.ba.parent = this;
        this.$ = new a.bL;
        this.$.parent = this;
        this.aa = new a.cL;
        this.aa.parent = this;
        this.ca = new a.dL;
        this.ca.parent = this;
        this.da = new a.eL;
        this.da.parent =
            this;
        this.fa = new a.fL;
        this.fa.parent = this;
        this.ga = new a.gL;
        this.ga.parent = this;
        this.ea = new a.Oz;
        this.ea.parent = this;
        this.ea.setTransform(32, 80);
        this.ia = new a.hL;
        this.ia.parent = this;
        this.ha = new a.iL;
        this.ha.parent = this;
        this.ka = new a.jL;
        this.ka.parent = this;
        this.ja = new a.kL;
        this.ja.parent = this;
        this.la = new a.lL;
        this.la.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 3).to({
            state: [{
                t: this.ca
            }]
        }, 3).to({
                state: [{
                    t: this.da
                }]
            },
            3).to({
            state: [{
                t: this.fa
            }]
        }, 3).to({
            state: [{
                t: this.ga
            }]
        }, 3).to({
            state: [{
                t: this.ia
            }, {
                t: this.ea
            }]
        }, 3).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 3).to({
            state: [{
                t: this.ca
            }]
        }, 3).to({
            state: [{
                t: this.ha
            }]
        }, 3).to({
            state: [{
                t: this.ka
            }]
        }, 3).to({
            state: [{
                t: this.ja
            }]
        }, 3).to({
            state: [{
                t: this.la
            }]
        }, 3).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 160, 144);
    (a.fJ = function () {
        this.initialize(void 0, void 0, void 0, {
            fingerR_F: 0,
            winR_F: 4,
            loseR_F: 8,
            cryR_F: 24,
            fingerR: 36,
            winR: 40,
            loseR: 44,
            cryR: 60,
            fingerL_F: 72,
            winL_F: 76,
            loseL_F: 80,
            cryL_F: 96,
            fingerL: 108,
            winL: 112,
            loseL: 116,
            cryL: 132
        });
        this.si = function () {
            this.stop()
        };
        this.Im = function () {
            this.stop()
        };
        this.ri = function () {
            this.stop()
        };
        this.ti = function () {
            this.gotoAndPlay("cryR_F")
        };
        this.SC = function () {
            this.stop()
        };
        this.TC = function () {
            this.stop()
        };
        this.$C = function () {
            this.stop()
        };
        this.Jm = function () {
            this.gotoAndPlay("cryR")
        };
        this.gD = function () {
            this.stop()
        };
        this.iD = function () {
            this.stop()
        };
        this.mD = function () {
            this.stop()
        };
        this.bC = function () {
            this.gotoAndPlay("cryL_F")
        };
        this.dC = function () {
            this.stop()
        };
        this.eC = function () {
            this.stop()
        };
        this.kC = function () {
            this.stop()
        };
        this.mC = function () {
            this.gotoAndPlay("cryL")
        };
        this.timeline.addTween(e.Tween.get(this).wait(3).call(this.si).wait(4).call(this.Im).wait(16).call(this.ri).wait(12).call(this.ti).wait(4).call(this.SC).wait(4).call(this.TC).wait(16).call(this.$C).wait(12).call(this.Jm).wait(4).call(this.gD).wait(4).call(this.iD).wait(16).call(this.mD).wait(12).call(this.bC).wait(4).call(this.dC).wait(4).call(this.eC).wait(16).call(this.kC).wait(12).call(this.mC).wait(1));
        this.ba = new a.gJ;
        this.ba.parent = this;
        this.ba.setTransform(32, 0);
        this.$ = new a.wK;
        this.$.parent = this;
        this.$.setTransform(78, 144);
        this.aa = new a.jK;
        this.aa.parent = this;
        this.aa.setTransform(72, 88);
        this.ca = new a.xK;
        this.ca.parent = this;
        this.ca.setTransform(128, 144);
        this.da = new a.kK;
        this.da.parent = this;
        this.da.setTransform(120, 88);
        this.fa = new a.aK;
        this.fa.parent = this;
        this.fa.setTransform(40, 88);
        this.ga = new a.VJ;
        this.ga.parent = this;
        this.ga.setTransform(8, 88);
        this.ea = new a.MJ;
        this.ea.parent = this;
        this.ea.setTransform(56,
            72);
        this.ia = new a.DJ;
        this.ia.parent = this;
        this.ia.setTransform(24, 72);
        this.ha = new a.yJ;
        this.ha.parent = this;
        this.ha.setTransform(136, 56);
        this.ka = new a.hJ;
        this.ka.parent = this;
        this.ka.setTransform(32, 0);
        this.ja = new a.yK;
        this.ja.parent = this;
        this.ja.setTransform(128, 144);
        this.la = new a.lK;
        this.la.parent = this;
        this.la.setTransform(120, 88);
        this.ma = new a.bK;
        this.ma.parent = this;
        this.ma.setTransform(40, 88);
        this.oa = new a.WJ;
        this.oa.parent = this;
        this.oa.setTransform(8, 88);
        this.Ja = new a.NJ;
        this.Ja.parent = this;
        this.Ja.setTransform(56,
            72);
        this.Oa = new a.EJ;
        this.Oa.parent = this;
        this.Oa.setTransform(24, 72);
        this.Ia = new a.zJ;
        this.Ia.parent = this;
        this.Ia.setTransform(136, 56);
        this.Ba = new a.iJ;
        this.Ba.parent = this;
        this.Ba.setTransform(32, 0);
        this.Fa = new a.zK;
        this.Fa.parent = this;
        this.Fa.setTransform(128, 144);
        this.qa = new a.pK;
        this.qa.parent = this;
        this.qa.setTransform(40, 144);
        this.ua = new a.mK;
        this.ua.parent = this;
        this.ua.setTransform(120, 88);
        this.Ma = new a.cK;
        this.Ma.parent = this;
        this.Ma.setTransform(40, 88);
        this.La = new a.XJ;
        this.La.parent = this;
        this.La.setTransform(8,
            88);
        this.Wa = new a.OJ;
        this.Wa.parent = this;
        this.Wa.setTransform(56, 72);
        this.Ra = new a.FJ;
        this.Ra.parent = this;
        this.Ra.setTransform(24, 72);
        this.Ca = new a.AJ;
        this.Ca.parent = this;
        this.Ca.setTransform(136, 56);
        this.Xa = new a.jJ;
        this.Xa.parent = this;
        this.Xa.setTransform(32, 0);
        this.Ya = new a.AK;
        this.Ya.parent = this;
        this.Ya.setTransform(128, 144);
        this.Sa = new a.qK;
        this.Sa.parent = this;
        this.Sa.setTransform(40, 144);
        this.Za = new a.nK;
        this.Za.parent = this;
        this.Za.setTransform(120, 88);
        this.Pa = new a.dK;
        this.Pa.parent = this;
        this.Pa.setTransform(40,
            88);
        this.Ta = new a.YJ;
        this.Ta.parent = this;
        this.Ta.setTransform(8, 88);
        this.Ua = new a.PJ;
        this.Ua.parent = this;
        this.Ua.setTransform(56, 72);
        this.Va = new a.GJ;
        this.Va.parent = this;
        this.Va.setTransform(24, 72);
        this.gb = new a.BJ;
        this.gb.parent = this;
        this.gb.setTransform(136, 56);
        this.cb = new a.kJ;
        this.cb.parent = this;
        this.cb.setTransform(32, 0);
        this.wa = new a.BK;
        this.wa.parent = this;
        this.wa.setTransform(128, 144);
        this.$a = new a.rK;
        this.$a.parent = this;
        this.$a.setTransform(40, 144);
        this.Ea = new a.oK;
        this.Ea.parent = this;
        this.Ea.setTransform(120,
            88);
        this.hb = new a.eK;
        this.hb.parent = this;
        this.hb.setTransform(40, 88);
        this.ib = new a.ZJ;
        this.ib.parent = this;
        this.ib.setTransform(8, 88);
        this.jb = new a.QJ;
        this.jb.parent = this;
        this.jb.setTransform(56, 72);
        this.Ha = new a.HJ;
        this.Ha.parent = this;
        this.Ha.setTransform(24, 72);
        this.Aa = new a.CJ;
        this.Aa.parent = this;
        this.Aa.setTransform(136, 56);
        this.Ka = new a.lJ;
        this.Ka.parent = this;
        this.Ka.setTransform(32, 0);
        this.Qa = new a.sK;
        this.Qa.parent = this;
        this.Qa.setTransform(40, 144);
        this.ab = new a.fK;
        this.ab.parent = this;
        this.ab.setTransform(40,
            88);
        this.nb = new a.$J;
        this.nb.parent = this;
        this.nb.setTransform(8, 88);
        this.tb = new a.RJ;
        this.tb.parent = this;
        this.tb.setTransform(56, 72);
        this.pb = new a.IJ;
        this.pb.parent = this;
        this.pb.setTransform(24, 72);
        this.Bb = new a.mJ;
        this.Bb.parent = this;
        this.Bb.setTransform(32, 0);
        this.Da = new a.tK;
        this.Da.parent = this;
        this.Da.setTransform(40, 144);
        this.kb = new a.gK;
        this.kb.parent = this;
        this.kb.setTransform(40, 88);
        this.sb = new a.SJ;
        this.sb.parent = this;
        this.sb.setTransform(56, 72);
        this.Cb = new a.JJ;
        this.Cb.parent = this;
        this.Cb.setTransform(24,
            72);
        this.Db = new a.nJ;
        this.Db.parent = this;
        this.Db.setTransform(32, 0);
        this.Ab = new a.TJ;
        this.Ab.parent = this;
        this.Ab.setTransform(56, 72);
        this.wb = new a.KJ;
        this.wb.parent = this;
        this.wb.setTransform(24, 72);
        this.Eb = new a.oJ;
        this.Eb.parent = this;
        this.Eb.setTransform(32, 0);
        this.xb = new a.UJ;
        this.xb.parent = this;
        this.xb.setTransform(56, 72);
        this.yb = new a.LJ;
        this.yb.parent = this;
        this.yb.setTransform(24, 72);
        this.Fb = new a.pJ;
        this.Fb.parent = this;
        this.Fb.setTransform(32, 0);
        this.Jb = new a.qJ;
        this.Jb.parent = this;
        this.Jb.setTransform(32,
            0);
        this.zb = new a.rJ;
        this.zb.parent = this;
        this.zb.setTransform(32, 0);
        this.Gb = new a.sJ;
        this.Gb.parent = this;
        this.Gb.setTransform(32, 0);
        this.ra = new a.tJ;
        this.ra.parent = this;
        this.ra.setTransform(32, 0);
        this.Hb = new a.uJ;
        this.Hb.parent = this;
        this.Hb.setTransform(32, 0);
        this.Ib = new a.vJ;
        this.Ib.parent = this;
        this.Ib.setTransform(32, 0);
        this.Kb = new a.wJ;
        this.Kb.parent = this;
        this.Kb.setTransform(32, 0);
        this.ac = new a.xJ;
        this.ac.parent = this;
        this.ac.setTransform(32, 0);
        this.Sb = new a.uK;
        this.Sb.parent = this;
        this.Sb.setTransform(144,
            144, 1, 1, 0, 0, 180);
        this.cc = new a.hK;
        this.cc.parent = this;
        this.cc.setTransform(144, 88, 1, 1, 0, 0, 180);
        this.hc = new a.vK;
        this.hc.parent = this;
        this.hc.setTransform(144, 144, 1, 1, 0, 0, 180);
        this.Jc = new a.iK;
        this.Jc.parent = this;
        this.Jc.setTransform(144, 88, 1, 1, 0, 0, 180);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.ha,
                    p: {
                        skewY: 0,
                        x: 136
                    }
                }, {
                    t: this.ia,
                    p: {
                        skewY: 0,
                        x: 24
                    }
                }, {
                    t: this.ea,
                    p: {
                        skewY: 0,
                        x: 56
                    }
                }, {
                    t: this.ga,
                    p: {
                        skewY: 0,
                        x: 8
                    }
                }, {
                    t: this.fa,
                    p: {
                        skewY: 0,
                        x: 40
                    }
                }, {
                    t: this.da,
                    p: {
                        skewY: 0,
                        x: 120
                    }
                }, {
                    t: this.ca,
                    p: {
                        skewY: 0,
                        x: 128
                    }
                },
                {
                    t: this.aa,
                    p: {
                        skewY: 0,
                        x: 72
                    }
                }, {
                    t: this.$,
                    p: {
                        skewY: 0,
                        x: 78
                    }
                }, {
                    t: this.ba,
                    p: {
                        skewY: 0,
                        x: 32
                    }
                }
            ]
        }).to({
            state: [{
                t: this.Ia,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Oa,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.Ja,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.oa,
                p: {
                    skewY: 0,
                    x: 8
                }
            }, {
                t: this.ma,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.la,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.ja,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.ka,
                p: {
                    skewY: 0,
                    x: 32
                }
            }]
        }, 4).to({
            state: [{
                t: this.Ca,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ra,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.Wa,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.La,
                p: {
                    skewY: 0,
                    x: 8
                }
            }, {
                t: this.Ma,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.ua,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.qa,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Fa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Ba,
                p: {
                    skewY: 0,
                    x: 32
                }
            }]
        }, 4).to({
            state: [{
                t: this.gb,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Va,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.Ua,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.Ta,
                p: {
                    skewY: 0,
                    x: 8
                }
            }, {
                t: this.Pa,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Za,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.Sa,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Ya,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Xa,
                p: {
                    skewY: 0,
                    x: 32
                }
            }]
        }, 4).to({
            state: [{
                t: this.Aa,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ha,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.jb,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.ib,
                p: {
                    skewY: 0,
                    x: 8
                }
            }, {
                t: this.hb,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.$a,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.cb,
                p: {
                    skewY: 0,
                    x: 32
                }
            }]
        }, 4).to({
            state: [{
                t: this.pb,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.tb,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.nb,
                p: {
                    skewY: 0,
                    x: 8
                }
            }, {
                t: this.ab,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Qa,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Ka,
                p: {
                    skewY: 0,
                    x: 32
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }]
        }, 4).to({
            state: [{
                t: this.Cb,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.sb,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Bb,
                p: {
                    skewY: 0,
                    x: 32
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }]
        }, 4).to({
            state: [{
                t: this.wb,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.Ab,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Db,
                p: {
                    skewY: 0,
                    x: 32
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 0,
                    x: 40
                }
            }]
        }, 4).to({
            state: [{
                t: this.yb,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.xb,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Eb,
                p: {
                    skewY: 0,
                    x: 32
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 0,
                    x: 40
                }
            }]
        }, 4).to({
            state: [{
                t: this.ha,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.ia,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.ea,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.ga,
                p: {
                    skewY: 0,
                    x: 8
                }
            }, {
                t: this.fa,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.da,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.ca,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Fb,
                p: {
                    skewY: 0,
                    x: 32
                }
            }]
        }, 4).to({
            state: [{
                t: this.Ia,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Oa,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.Ja,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.oa,
                p: {
                    skewY: 0,
                    x: 8
                }
            }, {
                t: this.ma,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.la,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.ja,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.Jb,
                p: {
                    skewY: 0,
                    x: 32
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }]
        }, 4).to({
            state: [{
                t: this.Ca,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ra,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.Wa,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.La,
                p: {
                    skewY: 0,
                    x: 8
                }
            }, {
                t: this.Ma,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.ua,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.qa,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Fa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.zb,
                p: {
                    skewY: 0,
                    x: 32
                }
            }]
        }, 4).to({
            state: [{
                t: this.gb,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Va,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.Ua,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.Ta,
                p: {
                    skewY: 0,
                    x: 8
                }
            }, {
                t: this.Pa,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Za,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.Sa,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Ya,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Gb,
                p: {
                    skewY: 0,
                    x: 32
                }
            }]
        }, 4).to({
            state: [{
                    t: this.Aa,
                    p: {
                        skewY: 0,
                        x: 136
                    }
                }, {
                    t: this.Ha,
                    p: {
                        skewY: 0,
                        x: 24
                    }
                }, {
                    t: this.jb,
                    p: {
                        skewY: 0,
                        x: 56
                    }
                },
                {
                    t: this.ib,
                    p: {
                        skewY: 0,
                        x: 8
                    }
                }, {
                    t: this.hb,
                    p: {
                        skewY: 0,
                        x: 40
                    }
                }, {
                    t: this.Ea,
                    p: {
                        skewY: 0,
                        x: 120
                    }
                }, {
                    t: this.$a,
                    p: {
                        skewY: 0,
                        x: 40
                    }
                }, {
                    t: this.wa,
                    p: {
                        skewY: 0,
                        x: 128
                    }
                }, {
                    t: this.aa,
                    p: {
                        skewY: 0,
                        x: 72
                    }
                }, {
                    t: this.$,
                    p: {
                        skewY: 0,
                        x: 78
                    }
                }, {
                    t: this.ra,
                    p: {
                        skewY: 0,
                        x: 32
                    }
                }
            ]
        }, 4).to({
            state: [{
                    t: this.pb,
                    p: {
                        skewY: 0,
                        x: 24
                    }
                }, {
                    t: this.tb,
                    p: {
                        skewY: 0,
                        x: 56
                    }
                }, {
                    t: this.nb,
                    p: {
                        skewY: 0,
                        x: 8
                    }
                }, {
                    t: this.ab,
                    p: {
                        skewY: 0,
                        x: 40
                    }
                }, {
                    t: this.Qa,
                    p: {
                        skewY: 0,
                        x: 40
                    }
                }, {
                    t: this.aa,
                    p: {
                        skewY: 0,
                        x: 72
                    }
                }, {
                    t: this.$,
                    p: {
                        skewY: 0,
                        x: 78
                    }
                }, {
                    t: this.Hb,
                    p: {
                        skewY: 0,
                        x: 32
                    }
                }, {
                    t: this.Aa,
                    p: {
                        skewY: 0,
                        x: 136
                    }
                },
                {
                    t: this.Ea,
                    p: {
                        skewY: 0,
                        x: 120
                    }
                }, {
                    t: this.wa,
                    p: {
                        skewY: 0,
                        x: 128
                    }
                }
            ]
        }, 4).to({
            state: [{
                t: this.Cb,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.sb,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Ib,
                p: {
                    skewY: 0,
                    x: 32
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }]
        }, 4).to({
            state: [{
                t: this.wb,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.Ab,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.Kb,
                p: {
                    skewY: 0,
                    x: 32
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 0,
                    x: 40
                }
            }]
        }, 4).to({
            state: [{
                t: this.yb,
                p: {
                    skewY: 0,
                    x: 24
                }
            }, {
                t: this.xb,
                p: {
                    skewY: 0,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 0,
                    x: 72
                }
            }, {
                t: this.$,
                p: {
                    skewY: 0,
                    x: 78
                }
            }, {
                t: this.ac,
                p: {
                    skewY: 0,
                    x: 32
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 0,
                    x: 136
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 0,
                    x: 120
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 0,
                    x: 128
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 0,
                    x: 40
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 0,
                    x: 40
                }
            }]
        }, 4).to({
            state: [{
                t: this.ha,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.ia,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.ea,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.ga,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.fa,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.da,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.ca,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.ba,
                p: {
                    skewY: 180,
                    x: 152
                }
            }]
        }, 4).to({
            state: [{
                t: this.Ia,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Oa,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.Ja,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.oa,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.ma,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.la,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.ja,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.ka,
                p: {
                    skewY: 180,
                    x: 152
                }
            }]
        }, 4).to({
            state: [{
                t: this.Ca,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ra,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.Wa,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.La,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.Ma,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.ua,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.qa,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Fa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Ba,
                p: {
                    skewY: 180,
                    x: 152
                }
            }]
        }, 4).to({
            state: [{
                t: this.gb,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Va,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.Ua,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.Ta,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.Pa,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Za,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.Sa,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Ya,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Xa,
                p: {
                    skewY: 180,
                    x: 152
                }
            }]
        }, 4).to({
            state: [{
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ha,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.jb,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.ib,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.hb,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.$a,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.cb,
                p: {
                    skewY: 180,
                    x: 152
                }
            }]
        }, 4).to({
            state: [{
                t: this.pb,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.tb,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.nb,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.ab,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Qa,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Ka,
                p: {
                    skewY: 180,
                    x: 152
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }]
        }, 4).to({
            state: [{
                t: this.Cb,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.sb,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Bb,
                p: {
                    skewY: 180,
                    x: 152
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }]
        }, 4).to({
            state: [{
                t: this.wb,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.Ab,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.cc
            }, {
                t: this.Sb
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Db,
                p: {
                    skewY: 180,
                    x: 152
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }]
        }, 4).to({
            state: [{
                t: this.yb,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.xb,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.Jc
            }, {
                t: this.hc
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Eb,
                p: {
                    skewY: 180,
                    x: 152
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }]
        }, 4).to({
            state: [{
                    t: this.ha,
                    p: {
                        skewY: 180,
                        x: 48
                    }
                },
                {
                    t: this.ia,
                    p: {
                        skewY: 180,
                        x: 160
                    }
                }, {
                    t: this.ea,
                    p: {
                        skewY: 180,
                        x: 128
                    }
                }, {
                    t: this.ga,
                    p: {
                        skewY: 180,
                        x: 176
                    }
                }, {
                    t: this.fa,
                    p: {
                        skewY: 180,
                        x: 144
                    }
                }, {
                    t: this.da,
                    p: {
                        skewY: 180,
                        x: 64
                    }
                }, {
                    t: this.ca,
                    p: {
                        skewY: 180,
                        x: 56
                    }
                }, {
                    t: this.aa,
                    p: {
                        skewY: 180,
                        x: 112
                    }
                }, {
                    t: this.$,
                    p: {
                        skewY: 180,
                        x: 106
                    }
                }, {
                    t: this.Fb,
                    p: {
                        skewY: 180,
                        x: 152
                    }
                }
            ]
        }, 4).to({
            state: [{
                t: this.Ia,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Oa,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.Ja,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.oa,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.ma,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.la,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.ja,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Jb,
                p: {
                    skewY: 180,
                    x: 152
                }
            }]
        }, 4).to({
            state: [{
                t: this.Ca,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ra,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.Wa,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.La,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.Ma,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.ua,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.qa,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Fa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.zb,
                p: {
                    skewY: 180,
                    x: 152
                }
            }]
        }, 4).to({
            state: [{
                t: this.gb,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Va,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.Ua,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.Ta,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.Pa,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Za,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.Sa,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Ya,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Gb,
                p: {
                    skewY: 180,
                    x: 152
                }
            }]
        }, 4).to({
            state: [{
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ha,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.jb,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.ib,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.hb,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.$a,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.ra,
                p: {
                    skewY: 180,
                    x: 152
                }
            }]
        }, 4).to({
            state: [{
                t: this.pb,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.tb,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.nb,
                p: {
                    skewY: 180,
                    x: 176
                }
            }, {
                t: this.ab,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Qa,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Hb,
                p: {
                    skewY: 180,
                    x: 152
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }]
        }, 4).to({
            state: [{
                t: this.Cb,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.sb,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Ib,
                p: {
                    skewY: 180,
                    x: 152
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }]
        }, 4).to({
            state: [{
                t: this.wb,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.Ab,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.Kb,
                p: {
                    skewY: 180,
                    x: 152
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 180,
                    x: 144
                }
            }]
        }, 4).to({
            state: [{
                t: this.yb,
                p: {
                    skewY: 180,
                    x: 160
                }
            }, {
                t: this.xb,
                p: {
                    skewY: 180,
                    x: 128
                }
            }, {
                t: this.aa,
                p: {
                    skewY: 180,
                    x: 112
                }
            }, {
                t: this.$,
                p: {
                    skewY: 180,
                    x: 106
                }
            }, {
                t: this.ac,
                p: {
                    skewY: 180,
                    x: 152
                }
            }, {
                t: this.Aa,
                p: {
                    skewY: 180,
                    x: 48
                }
            }, {
                t: this.Ea,
                p: {
                    skewY: 180,
                    x: 64
                }
            }, {
                t: this.wa,
                p: {
                    skewY: 180,
                    x: 56
                }
            }, {
                t: this.kb,
                p: {
                    skewY: 180,
                    x: 144
                }
            }, {
                t: this.Da,
                p: {
                    skewY: 180,
                    x: 144
                }
            }]
        }, 4).wait(4))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(8, 0, 168, 192);
    (a.yp = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.oL;
        this.ba.parent = this;
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype = n(a.yp, new e.Rectangle(0, 0, 320, 80), null);
    (a.TI = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.vz;
        this.ba.parent = this;
        this.$ = new a.wz;
        this.$.parent = this;
        this.$.setTransform(112, 16);
        this.aa = new a.Az;
        this.aa.parent =
            this;
        this.aa.setTransform(112, 0);
        this.ca = new a.xz;
        this.ca.parent = this;
        this.ca.setTransform(224, 16);
        this.da = new a.yz;
        this.da.parent = this;
        this.da.setTransform(336, 16);
        this.fa = new a.zz;
        this.fa.parent = this;
        this.fa.setTransform(448, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.aa,
                p: {
                    x: 112
                }
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.aa,
                p: {
                    x: 224
                }
            }, {
                t: this.ca
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.aa,
                p: {
                    x: 336
                }
            }, {
                t: this.da
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.aa,
                p: {
                    x: 448
                }
            }, {
                t: this.fa
            }, {
                t: this.ba
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 80, 32);
    (a.br = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.eJ;
        this.ba.parent = this;
        this.ba.setTransform(240, 0);
        this.$ = new a.sz;
        this.$.parent = this;
        this.$.setTransform(592, 48);
        this.aa = new a.qz;
        this.aa.parent = this;
        this.aa.setTransform(32, 208);
        this.ca = new a.uz;
        this.ca.parent = this;
        this.ca.setTransform(32, 32);
        this.da = new a.rz;
        this.da.parent = this;
        this.da.setTransform(32, 48);
        this.fa =
            new a.green;
        this.fa.parent = this;
        this.fa.setTransform(48, 45, 3.337, 3.037);
        this.ga = new a.green;
        this.ga.parent = this;
        this.ga.setTransform(432, 346);
        this.ea = new a.SG;
        this.ea.parent = this;
        this.ea.setTransform(416, 336);
        this.ia = new a.tq;
        this.ia.parent = this;
        this.ia.setTransform(592, 352);
        this.ha = new a.sq;
        this.ha.parent = this;
        this.ha.setTransform(416, 352);
        this.ka = new a.rq;
        this.ka.parent = this;
        this.ka.setTransform(416, 400);
        this.ja = new a.jm;
        this.ja.parent = this;
        this.ja.setTransform(0, 336);
        this.la = new a.rp;
        this.la.parent =
            this;
        this.la.setTransform(32, 80);
        this.ma = new a.Oo;
        this.ma.parent = this;
        this.ma.setTransform(464, 320);
        this.oa = new a.ir;
        this.oa.parent = this;
        this.oa.setTransform(416, 224);
        this.Ja = new a.Ho;
        this.Ja.parent = this;
        this.Ja.setTransform(0, 288);
        this.Oa = new a.jr;
        this.Oa.parent = this;
        this.Oa.setTransform(64, 288);
        this.Ia = new a.kr;
        this.Ia.parent = this;
        this.Ia.setTransform(144, 288);
        this.Ba = new a.lr;
        this.Ba.parent = this;
        this.Ba.setTransform(224, 288);
        this.Fa = new a.mr;
        this.Fa.parent = this;
        this.Fa.setTransform(304, 288);
        this.qa =
            new a.nr;
        this.qa.parent = this;
        this.qa.setTransform(384, 288);
        this.ua = new a.qr;
        this.ua.parent = this;
        this.ua.setTransform(464, 288);
        this.Ma = new a.sr;
        this.Ma.parent = this;
        this.Ma.setTransform(512, 224);
        this.La = new a.Po;
        this.La.parent = this;
        this.La.setTransform(544, 288);
        this.Wa = new a.qm;
        this.Wa.parent = this;
        this.Wa.setTransform(544, 336);
        this.Ra = new a.pm;
        this.Ra.parent = this;
        this.Ra.setTransform(464, 336);
        this.Ca = new a.om;
        this.Ca.parent = this;
        this.Ca.setTransform(384, 336);
        this.Xa = new a.nm;
        this.Xa.parent = this;
        this.Xa.setTransform(304,
            336);
        this.Ya = new a.mm;
        this.Ya.parent = this;
        this.Ya.setTransform(224, 336);
        this.Sa = new a.lm;
        this.Sa.parent = this;
        this.Sa.setTransform(144, 336);
        this.Za = new a.cr;
        this.Za.parent = this;
        this.Za.setTransform(32, 224);
        this.Pa = new a.er;
        this.Pa.parent = this;
        this.Pa.setTransform(96, 224);
        this.Ta = new a.fr;
        this.Ta.parent = this;
        this.Ta.setTransform(176, 224);
        this.Ua = new a.gr;
        this.Ua.parent = this;
        this.Ua.setTransform(256, 224);
        this.Va = new a.hr;
        this.Va.parent = this;
        this.Va.setTransform(336, 224);
        this.gb = new a.sp;
        this.gb.parent =
            this;
        this.gb.setTransform(32, 0);
        this.cb = new a.Cm;
        this.cb.parent = this;
        this.cb.setTransform(608, 0);
        this.wa = new a.Qo;
        this.wa.parent = this;
        this.wa.setTransform(544, 320);
        this.$a = new a.No;
        this.$a.parent = this;
        this.$a.setTransform(384, 320);
        this.Ea = new a.Mo;
        this.Ea.parent = this;
        this.Ea.setTransform(304, 320);
        this.hb = new a.Lo;
        this.hb.parent = this;
        this.hb.setTransform(224, 320);
        this.ib = new a.Ko;
        this.ib.parent = this;
        this.ib.setTransform(144, 320);
        this.jb = new a.Bm;
        this.jb.parent = this;
        this.Ha = new a.Io;
        this.Ha.parent =
            this;
        this.Ha.setTransform(0, 320);
        this.Aa = new a.Jo;
        this.Aa.parent = this;
        this.Aa.setTransform(64, 320);
        this.Ka = new a.km;
        this.Ka.parent = this;
        this.Ka.setTransform(64, 336);
        this.shape = new e.Shape;
        this.shape.graphics.f("#005725").s().p("AsfDyIAAnjIY/AEIAAHfg");
        this.shape.setTransform(512, 375.8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.shape
                }, {
                    t: this.Ka
                }, {
                    t: this.Aa
                }, {
                    t: this.Ha
                }, {
                    t: this.jb
                }, {
                    t: this.ib
                }, {
                    t: this.hb
                }, {
                    t: this.Ea
                }, {
                    t: this.$a
                }, {
                    t: this.wa
                }, {
                    t: this.cb
                }, {
                    t: this.gb
                }, {
                    t: this.Va
                }, {
                    t: this.Ua
                },
                {
                    t: this.Ta
                }, {
                    t: this.Pa
                }, {
                    t: this.Za
                }, {
                    t: this.Sa
                }, {
                    t: this.Ya
                }, {
                    t: this.Xa
                }, {
                    t: this.Ca
                }, {
                    t: this.Ra
                }, {
                    t: this.Wa
                }, {
                    t: this.La
                }, {
                    t: this.Ma
                }, {
                    t: this.ua
                }, {
                    t: this.qa
                }, {
                    t: this.Fa
                }, {
                    t: this.Ba
                }, {
                    t: this.Ia
                }, {
                    t: this.Oa
                }, {
                    t: this.Ja
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }).wait(1))
    }).prototype = n(a.br, new e.Rectangle(0, 0, 640, 416), null);
    (a.oI = function () {
        this.initialize(void 0,
            void 0, void 0, {
                blink: 0,
                "rotate-cw": 31,
                "rotate-ccw": 55,
                forward: 79,
                check: 103,
                win: 107,
                lose: 118,
                winF: 130,
                loseF: 142,
                blinkF: 154,
                "rotate-cwF": 178,
                "rotate-ccwF": 206,
                forwardF: 234,
                checkF: 258
            });
        this.IC = function () {
            this.stop()
        };
        this.YC = function () {
            this.stop()
        };
        this.hD = function () {
            this.stop()
        };
        this.$B = function () {
            this.stop()
        };
        this.aC = function () {
            this.stop()
        };
        this.fC = function () {
            this.stop()
        };
        this.jC = function () {
            this.stop()
        };
        this.lC = function () {
            this.stop()
        };
        this.qC = function () {
            this.stop()
        };
        this.tC = function () {
            this.stop()
        };
        this.xC = function () {
            this.stop()
        };
        this.AC = function () {
            this.stop()
        };
        this.CC = function () {
            this.stop()
        };
        this.FC = function () {
            this.stop()
        };
        this.timeline.addTween(e.Tween.get(this).wait(30).call(this.IC).wait(24).call(this.YC).wait(24).call(this.hD).wait(24).call(this.$B).wait(4).call(this.aC).wait(11).call(this.fC).wait(12).call(this.jC).wait(12).call(this.lC).wait(12).call(this.qC).wait(24).call(this.tC).wait(28).call(this.xC).wait(28).call(this.AC).wait(24).call(this.CC).wait(4).call(this.FC).wait(1));
        this.ba =
            new a.Fq;
        this.ba.parent = this;
        this.ba.setTransform(-32, -96);
        this.$ = new a.Lq;
        this.$.parent = this;
        this.$.setTransform(0, 80);
        this.aa = new a.Gq;
        this.aa.parent = this;
        this.aa.setTransform(64, -64);
        this.ca = new a.Kq;
        this.ca.parent = this;
        this.ca.setTransform(64, 0);
        this.da = new a.Iq;
        this.da.parent = this;
        this.da.setTransform(-64, 0);
        this.fa = new a.Jq;
        this.fa.parent = this;
        this.fa.setTransform(-32, 0);
        this.ga = new a.Hq;
        this.ga.parent = this;
        this.ga.setTransform(-32, -16);
        this.ea = new a.Eo;
        this.ea.parent = this;
        this.ia = new a.aI;
        this.ia.parent = this;
        this.ia.setTransform(0, -64);
        this.ha = new a.Zq;
        this.ha.parent = this;
        this.ha.setTransform(0, -64);
        this.ka = new a.$q;
        this.ka.parent = this;
        this.ka.setTransform(0, -64);
        this.ja = new a.ar;
        this.ja.parent = this;
        this.ja.setTransform(0, -64);
        this.la = new a.Sq;
        this.la.parent = this;
        this.la.setTransform(0, -64);
        this.ma = new a.Tq;
        this.ma.parent = this;
        this.ma.setTransform(0, -64);
        this.oa = new a.Uq;
        this.oa.parent = this;
        this.oa.setTransform(0, -64);
        this.Ja = new a.Vq;
        this.Ja.parent = this;
        this.Ja.setTransform(0, -64);
        this.Oa = new a.pI;
        this.Oa.parent = this;
        this.Ia = new a.uI;
        this.Ia.parent = this;
        this.Ia.setTransform(64, 0);
        this.Ba = new a.sI;
        this.Ba.parent = this;
        this.Fa = new a.qI;
        this.Fa.parent = this;
        this.Fa.setTransform(-32, -16);
        this.qa = new a.wI;
        this.qa.parent = this;
        this.qa.setTransform(112, 0);
        this.ua = new a.vI;
        this.ua.parent = this;
        this.ua.setTransform(64, 0);
        this.Ma = new a.tI;
        this.Ma.parent = this;
        this.La = new a.rI;
        this.La.parent = this;
        this.La.setTransform(-32, -16);
        this.Wa = new a.mI;
        this.Wa.parent = this;
        this.Wa.setTransform(64, 0);
        this.Ra = new a.lI;
        this.Ra.parent = this;
        this.Ca = new a.kI;
        this.Ca.parent = this;
        this.Ca.setTransform(-32, 0);
        this.Xa = new a.iI;
        this.Xa.parent = this;
        this.Xa.setTransform(64, -64);
        this.Ya = new a.nI;
        this.Ya.parent = this;
        this.Ya.setTransform(0, 80);
        this.Sa = new a.hI;
        this.Sa.parent = this;
        this.Sa.setTransform(0, -64);
        this.Za = new a.jI;
        this.Za.parent = this;
        this.Za.setTransform(-32, -16);
        this.Pa = new a.zI;
        this.Pa.parent = this;
        this.Pa.setTransform(-32, -16);
        this.Ta = new a.DI;
        this.Ta.parent = this;
        this.Ua = new a.yI;
        this.Ua.parent = this;
        this.Ua.setTransform(64, -64);
        this.Va = new a.GI;
        this.Va.parent = this;
        this.Va.setTransform(64, 0);
        this.gb = new a.LI;
        this.gb.parent = this;
        this.gb.setTransform(64, -64);
        this.cb = new a.MI;
        this.cb.parent = this;
        this.cb.setTransform(-32, -16);
        this.wa = new a.OI;
        this.wa.parent = this;
        this.$a = new a.RI;
        this.$a.parent = this;
        this.$a.setTransform(64, 0);
        this.Ea = new a.SI;
        this.Ea.parent = this;
        this.Ea.setTransform(64, 0);
        this.hb = new a.NI;
        this.hb.parent = this;
        this.hb.setTransform(-32, -16);
        this.ib = new a.QI;
        this.ib.parent = this;
        this.jb =
            new a.xI;
        this.jb.parent = this;
        this.jb.setTransform(0, -64);
        this.Ha = new a.CI;
        this.Ha.parent = this;
        this.Ha.setTransform(-32, 0);
        this.Aa = new a.BI;
        this.Aa.parent = this;
        this.Aa.setTransform(-64, 0);
        this.Ka = new a.EI;
        this.Ka.parent = this;
        this.Qa = new a.HI;
        this.Qa.parent = this;
        this.Qa.setTransform(64, 0);
        this.ab = new a.JI;
        this.ab.parent = this;
        this.ab.setTransform(0, 80);
        this.nb = new a.II;
        this.nb.parent = this;
        this.nb.setTransform(64, 0);
        this.tb = new a.FI;
        this.tb.parent = this;
        this.pb = new a.KI;
        this.pb.parent = this;
        this.pb.setTransform(0,
            80);
        this.Bb = new a.AI;
        this.Bb.parent = this;
        this.Bb.setTransform(-32, -16);
        this.Da = new a.Eq;
        this.Da.parent = this;
        this.Da.setTransform(0, -64);
        this.kb = new a.Wq;
        this.kb.parent = this;
        this.kb.setTransform(0, -64);
        this.sb = new a.Xq;
        this.sb.parent = this;
        this.sb.setTransform(0, -64);
        this.Cb = new a.Yq;
        this.Cb.parent = this;
        this.Cb.setTransform(0, -64);
        this.Db = new a.Fq;
        this.Db.parent = this;
        this.Db.setTransform(-32, -96);
        this.Ab = new a.Lq;
        this.Ab.parent = this;
        this.Ab.setTransform(0, 80);
        this.wb = new a.Gq;
        this.wb.parent = this;
        this.wb.setTransform(64,
            -64);
        this.Eb = new a.Kq;
        this.Eb.parent = this;
        this.Eb.setTransform(64, 0);
        this.xb = new a.Iq;
        this.xb.parent = this;
        this.xb.setTransform(-64, 0);
        this.yb = new a.Jq;
        this.yb.parent = this;
        this.yb.setTransform(-32, 0);
        this.Fb = new a.Hq;
        this.Fb.parent = this;
        this.Fb.setTransform(-32, -16);
        this.Jb = new a.Eo;
        this.Jb.parent = this;
        this.zb = new a.Nq;
        this.zb.parent = this;
        this.zb.setTransform(0, -64);
        this.Gb = new a.Oq;
        this.Gb.parent = this;
        this.Gb.setTransform(0, -64);
        this.ra = new a.Pq;
        this.ra.parent = this;
        this.ra.setTransform(0, -64);
        this.Hb =
            new a.Qq;
        this.Hb.parent = this;
        this.Hb.setTransform(0, -64);
        this.Ib = new a.Rq;
        this.Ib.parent = this;
        this.Ib.setTransform(0, -64);
        this.Kb = new a.gI;
        this.Kb.parent = this;
        this.Kb.setTransform(0, -64);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ha
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 11).to({
            state: [{
                    t: this.ka
                }, {
                    t: this.ea
                },
                {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.ja
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ha
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                },
                {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.la
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ma
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.Ja
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                },
                {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Ja
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.oa
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                },
                {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.ma
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.la
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.Oa
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                },
                {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.Fa
            }, {
                t: this.Ba
            }, {
                t: this.Ia
            }, {
                t: this.ia
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }, {
                t: this.La
            }, {
                t: this.Ma
            }, {
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Fa
            }, {
                t: this.Ba
            }, {
                t: this.Ia
            }, {
                t: this.ia
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.ia
                }, {
                    t: this.La
                }, {
                    t: this.Ma
                }, {
                    t: this.ua
                }, {
                    t: this.qa
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.$
                },
                {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.Fa
            }, {
                t: this.Ba
            }, {
                t: this.Ia
            }, {
                t: this.ia
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Za
            }, {
                t: this.Sa
            }, {
                t: this.Ya
            }, {
                t: this.Xa
            }, {
                t: this.Ca
            }, {
                t: this.Ra
            }, {
                t: this.Wa
            }, {
                t: this.da
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }, {
                t: this.Va
            }, {
                t: this.Ua
            }, {
                t: this.Ta
            }, {
                t: this.Pa
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }, {
                t: this.$a
            }, {
                t: this.wa
            }, {
                t: this.cb
            }, {
                t: this.gb
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 3).to({
            state: [{
                    t: this.ia
                },
                {
                    t: this.ib
                }, {
                    t: this.hb
                }, {
                    t: this.Ea
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.Ta
            }, {
                t: this.Pa
            }, {
                t: this.Aa
            }, {
                t: this.Ha
            }, {
                t: this.Va
            }, {
                t: this.Ua
            }, {
                t: this.jb
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Pa
            }, {
                t: this.jb
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ab
            }, {
                t: this.Qa
            }, {
                t: this.Ka
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Bb
            }, {
                t: this.jb
            }, {
                t: this.da
            }, {
                t: this.pb
            }, {
                t: this.tb
            }, {
                t: this.Ha
            }, {
                t: this.nb
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.Pa
                }, {
                    t: this.Da
                }, {
                    t: this.ea
                },
                {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.$
                }, {
                    t: this.Va
                }, {
                    t: this.Ua
                }, {
                    t: this.Ta
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.$a
            }, {
                t: this.wa
            }, {
                t: this.cb
            }, {
                t: this.gb
            }, {
                t: this.Da
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ib
            }, {
                t: this.hb
            }, {
                t: this.Ea
            }, {
                t: this.Da
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Pa
            }, {
                t: this.Da
            }, {
                t: this.ea
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.Va
            }, {
                t: this.Ua
            }, {
                t: this.Ta
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.wa
                }, {
                    t: this.cb
                }, {
                    t: this.ab
                },
                {
                    t: this.Qa
                }, {
                    t: this.Da
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.ib
            }, {
                t: this.hb
            }, {
                t: this.pb
            }, {
                t: this.nb
            }, {
                t: this.Da
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Da
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.kb
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.sb
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                },
                {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.Cb
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.kb
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Da
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.Da
                }, {
                    t: this.Jb
                }, {
                    t: this.Fb
                }, {
                    t: this.yb
                }, {
                    t: this.xb
                },
                {
                    t: this.Eb
                }, {
                    t: this.wb
                }, {
                    t: this.Ab
                }, {
                    t: this.Db
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.zb
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Gb
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
                state: [{
                    t: this.ra
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }]
            },
            4).to({
            state: [{
                t: this.Hb
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Ib
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Da
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Da
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.Ib
                },
                {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.Hb
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ra
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Gb
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.zb
                }, {
                    t: this.ea
                },
                {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.Da
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Oa
            }, {
                t: this.Da
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Fa
            }, {
                t: this.Ba
            }, {
                t: this.Ia
            }, {
                t: this.Da
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.La
                }, {
                    t: this.Ma
                }, {
                    t: this.ua
                },
                {
                    t: this.qa
                }, {
                    t: this.Da
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.Fa
            }, {
                t: this.Ba
            }, {
                t: this.Ia
            }, {
                t: this.Da
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.La
            }, {
                t: this.Ma
            }, {
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.Da
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.Fa
            }, {
                t: this.Ba
            }, {
                t: this.Ia
            }, {
                t: this.Da
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                    t: this.Za
                }, {
                    t: this.Kb
                }, {
                    t: this.Ya
                }, {
                    t: this.Xa
                }, {
                    t: this.Ca
                }, {
                    t: this.Ra
                },
                {
                    t: this.Wa
                }, {
                    t: this.da
                }
            ]
        }, 4).wait(4))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-64, -96, 208, 224);
    (a.Mq = function () {
        this.initialize(void 0, void 0, void 0, {
            breath: 0,
            hide: 110
        });
        this.cC = function () {
            this.stop()
        };
        this.timeline.addTween(e.Tween.get(this).wait(109).call(this.cC).wait(2));
        this.ba = new a.Eo;
        this.ba.parent = this;
        this.$ = new a.bI;
        this.$.parent = this;
        this.aa = new a.cI;
        this.aa.parent = this;
        this.ca = new a.dI;
        this.ca.parent = this;
        this.da = new a.eI;
        this.da.parent = this;
        this.fa = new a.fI;
        this.fa.parent =
            this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 10).to({
            state: [{
                t: this.aa
            }]
        }, 10).to({
            state: [{
                t: this.ca
            }]
        }, 10).to({
            state: [{
                t: this.da
            }]
        }, 10).to({
            state: [{
                t: this.fa
            }]
        }, 10).to({
            state: [{
                t: this.da
            }]
        }, 10).to({
            state: [{
                t: this.ca
            }]
        }, 10).to({
            state: [{
                t: this.aa
            }]
        }, 10).to({
            state: [{
                t: this.$
            }]
        }, 10).to({
            state: [{
                t: this.ba
            }]
        }, 10).to({
            state: []
        }, 10).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 64, 80);
    (a.Wc = function (b, f, h) {
        this.initialize(b, f, h, {
            win: 0,
            lose: 12,
            forward: 24,
            hide: 36
        });
        this.Em = function () {
            this.stop()
        };
        this.ri = function () {
            this.stop()
        };
        this.ti = function () {
            this.stop()
        };
        this.timeline.addTween(e.Tween.get(this).wait(11).call(this.Em).wait(12).call(this.ri).wait(12).call(this.ti).wait(2));
        this.ba = new a.PE;
        this.ba.parent = this;
        this.$ = new a.QE;
        this.$.parent = this;
        this.aa = new a.RE;
        this.aa.parent = this;
        this.ca = new a.SE;
        this.ca.parent = this;
        this.da = new a.TE;
        this.da.parent = this;
        this.da.setTransform(16, -16);
        this.fa = new a.UE;
        this.fa.parent = this;
        this.fa.setTransform(16,
            -16);
        this.ga = new a.VE;
        this.ga.parent = this;
        this.ga.setTransform(16, -16);
        this.ea = new a.WE;
        this.ea.parent = this;
        this.ea.setTransform(16, -16);
        this.ia = new a.XE;
        this.ia.parent = this;
        this.ia.setTransform(64, -32);
        this.ha = new a.YE;
        this.ha.parent = this;
        this.ha.setTransform(64, -32);
        this.ka = new a.ZE;
        this.ka.parent = this;
        this.ka.setTransform(64, -32);
        this.ja = new a.cF;
        this.ja.parent = this;
        this.ja.setTransform(80, -32);
        this.la = new a.$E;
        this.la.parent = this;
        this.la.setTransform(64, -32);
        this.ma = new a.bF;
        this.ma.parent = this;
        this.ma.setTransform(80, -32);
        this.oa = new a.aF;
        this.oa.parent = this;
        this.oa.setTransform(80, -32);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }]
        }, 1).to({
            state: [{
                    t: this.aa
                }, {
                    t: this.ca
                }, {
                    t: this.ea
                },
                {
                    t: this.ia
                }
            ]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.ha
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.ka
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.la
            }, {
                t: this.ja
            }]
        }, 1).to({
            state: [{
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ga
            }]
        }, 1).to({
            state: [{
                    t: this.aa
                },
                {
                    t: this.ca
                }, {
                    t: this.ea
                }
            ]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.ha
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.ka
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.la
            }, {
                t: this.ma
            }]
        }, 1).to({
            state: [{
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.da
            }]
        }, 1).to({
            state: [{
                    t: this.aa
                }, {
                    t: this.ca
                },
                {
                    t: this.fa
                }
            ]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.ha
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.ka
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.ca
            }, {
                t: this.ea
            }, {
                t: this.la
            }, {
                t: this.oa
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 16, 16);
    (a.oi = function () {
        this.initialize(void 0,
            void 0, void 0, {
                s12: 0,
                s13: 1,
                s14: 2,
                s15: 3,
                s16: 4,
                s17: 5,
                s18: 6,
                s19: 7,
                s1a: 8,
                s1b: 9,
                s1c: 10,
                s1d: 11,
                s1e: 12,
                s22: 13,
                s23: 14,
                s24: 15,
                s25: 16,
                s26: 17,
                s27: 18,
                s28: 19,
                s29: 20,
                s2a: 21,
                s2b: 22,
                s2c: 23,
                s2d: 24,
                s2e: 25,
                s42: 26,
                s43: 27,
                s44: 28,
                s45: 29,
                s46: 30,
                s47: 31,
                s48: 32,
                s49: 33,
                s4a: 34,
                s4b: 35,
                s4c: 36,
                s4d: 37,
                s4e: 38,
                s82: 39,
                s83: 40,
                s84: 41,
                s85: 42,
                s86: 43,
                s87: 44,
                s88: 45,
                s89: 46,
                s8a: 47,
                s8b: 48,
                s8c: 49,
                s8d: 50,
                s8e: 51,
                s1f: 52,
                s2f: 53,
                s4f: 54,
                s8f: 55,
                sff: 56,
                wait: 57
            });
        this.ba = new a.qL;
        this.ba.parent = this;
        this.$ = new a.rL;
        this.$.parent = this;
        this.aa = new a.sL;
        this.aa.parent = this;
        this.ca = new a.tL;
        this.ca.parent = this;
        this.da = new a.uL;
        this.da.parent = this;
        this.fa = new a.vL;
        this.fa.parent = this;
        this.ga = new a.wL;
        this.ga.parent = this;
        this.ea = new a.xL;
        this.ea.parent = this;
        this.ia = new a.yL;
        this.ia.parent = this;
        this.ha = new a.AL;
        this.ha.parent = this;
        this.ka = new a.CL;
        this.ka.parent = this;
        this.ja = new a.BL;
        this.ja.parent = this;
        this.la = new a.zL;
        this.la.parent = this;
        this.ma = new a.DL;
        this.ma.parent = this;
        this.oa = new a.EL;
        this.oa.parent = this;
        this.Ja = new a.FL;
        this.Ja.parent = this;
        this.Oa = new a.GL;
        this.Oa.parent = this;
        this.Ia = new a.HL;
        this.Ia.parent = this;
        this.Ba = new a.IL;
        this.Ba.parent = this;
        this.Fa = new a.JL;
        this.Fa.parent = this;
        this.qa = new a.KL;
        this.qa.parent = this;
        this.ua = new a.LL;
        this.ua.parent = this;
        this.Ma = new a.NL;
        this.Ma.parent = this;
        this.La = new a.PL;
        this.La.parent = this;
        this.Wa = new a.OL;
        this.Wa.parent = this;
        this.Ra = new a.ML;
        this.Ra.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
                state: [{
                    t: this.ca
                }]
            },
            1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: [{
                t: this.ka
            }]
        }, 1).to({
            state: [{
                t: this.ja
            }]
        }, 1).to({
            state: [{
                t: this.la
            }]
        }, 1).to({
            state: [{
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.da
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
                state: [{
                    t: this.ia
                }]
            },
            1).to({
            state: [{
                t: this.ha
            }]
        }, 1).to({
            state: [{
                t: this.ka
            }]
        }, 1).to({
            state: [{
                t: this.ja
            }]
        }, 1).to({
            state: [{
                t: this.la
            }]
        }, 1).to({
            state: [{
                t: this.ma
            }]
        }, 1).to({
            state: [{
                t: this.oa
            }]
        }, 1).to({
            state: [{
                t: this.Ja
            }]
        }, 1).to({
            state: [{
                t: this.Oa
            }]
        }, 1).to({
            state: [{
                t: this.Ia
            }]
        }, 1).to({
            state: [{
                t: this.Ba
            }]
        }, 1).to({
            state: [{
                t: this.Fa
            }]
        }, 1).to({
            state: [{
                t: this.qa
            }]
        }, 1).to({
            state: [{
                t: this.ua
            }]
        }, 1).to({
            state: [{
                t: this.Ma
            }]
        }, 1).to({
            state: [{
                t: this.La
            }]
        }, 1).to({
            state: [{
                t: this.Wa
            }]
        }, 1).to({
            state: [{
                t: this.Ra
            }]
        }, 1).to({
                state: [{
                    t: this.ma
                }]
            },
            1).to({
            state: [{
                t: this.oa
            }]
        }, 1).to({
            state: [{
                t: this.Ja
            }]
        }, 1).to({
            state: [{
                t: this.Oa
            }]
        }, 1).to({
            state: [{
                t: this.Ia
            }]
        }, 1).to({
            state: [{
                t: this.Ba
            }]
        }, 1).to({
            state: [{
                t: this.Fa
            }]
        }, 1).to({
            state: [{
                t: this.qa
            }]
        }, 1).to({
            state: [{
                t: this.ua
            }]
        }, 1).to({
            state: [{
                t: this.Ma
            }]
        }, 1).to({
            state: [{
                t: this.La
            }]
        }, 1).to({
            state: [{
                t: this.Wa
            }]
        }, 1).to({
            state: [{
                t: this.Ra
            }]
        }, 1).to({
            state: []
        }, 1).wait(6));
        this.Ca = new a.ZL;
        this.Ca.parent = this;
        this.Ca.setTransform(32, 0);
        this.Xa = new a.$L;
        this.Xa.parent = this;
        this.Xa.setTransform(32, 0);
        this.Ya =
            new a.bM;
        this.Ya.parent = this;
        this.Ya.setTransform(32, 0);
        this.Sa = new a.aM;
        this.Sa.parent = this;
        this.Sa.setTransform(32, 0);
        this.Za = new a.WL;
        this.Za.parent = this;
        this.Za.setTransform(32, 0);
        this.Pa = new a.YL;
        this.Pa.parent = this;
        this.Pa.setTransform(32, 0);
        this.Ta = new a.XL;
        this.Ta.parent = this;
        this.Ta.setTransform(32, 0);
        this.Ua = new a.QL;
        this.Ua.parent = this;
        this.Ua.setTransform(32, 0);
        this.Va = new a.SL;
        this.Va.parent = this;
        this.Va.setTransform(32, 0);
        this.gb = new a.RL;
        this.gb.parent = this;
        this.gb.setTransform(32,
            0);
        this.cb = new a.TL;
        this.cb.parent = this;
        this.cb.setTransform(32, 0);
        this.wa = new a.VL;
        this.wa.parent = this;
        this.wa.setTransform(32, 0);
        this.$a = new a.UL;
        this.$a.parent = this;
        this.$a.setTransform(32, 0);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.Ca
            }]
        }).to({
            state: [{
                t: this.Xa
            }]
        }, 9).to({
            state: [{
                t: this.Ya
            }]
        }, 1).to({
            state: [{
                t: this.Sa
            }]
        }, 1).to({
            state: [{
                t: this.Ca
            }]
        }, 1).to({
            state: [{
                t: this.Ca
            }]
        }, 1).to({
            state: [{
                t: this.Za
            }]
        }, 9).to({
            state: [{
                t: this.Pa
            }]
        }, 1).to({
            state: [{
                t: this.Ta
            }]
        }, 1).to({
                state: [{
                    t: this.Ca
                }]
            },
            1).to({
            state: [{
                t: this.Ca
            }]
        }, 1).to({
            state: [{
                t: this.Ua
            }]
        }, 9).to({
            state: [{
                t: this.Va
            }]
        }, 1).to({
            state: [{
                t: this.gb
            }]
        }, 1).to({
            state: [{
                t: this.Ca
            }]
        }, 1).to({
            state: [{
                t: this.Ca
            }]
        }, 1).to({
            state: [{
                t: this.cb
            }]
        }, 9).to({
            state: [{
                t: this.wa
            }]
        }, 1).to({
            state: [{
                t: this.$a
            }]
        }, 1).to({
            state: [{
                t: this.Ca
            }]
        }, 1).to({
            state: []
        }, 1).wait(6));
        this.timeline.addTween(e.Tween.get(this.Ca).to({
            _off: !0
        }, 9).wait(3).to({
            _off: !1
        }, 0).wait(1).to({
            _off: !0
        }, 9).wait(3).to({
            _off: !1
        }, 0).wait(1).to({
            _off: !0
        }, 9).wait(3).to({
            _off: !1
        }, 0).wait(1).to({
                _off: !0
            },
            9).wait(3).to({
            _off: !1
        }, 0).to({
            _off: !0
        }, 1).wait(6));
        this.Ea = new a.lM;
        this.Ea.parent = this;
        this.Ea.setTransform(0, 48);
        this.hb = new a.hM;
        this.hb.parent = this;
        this.hb.setTransform(0, 96);
        this.ib = new a.kM;
        this.ib.parent = this;
        this.ib.setTransform(0, 48);
        this.jb = new a.gM;
        this.jb.parent = this;
        this.jb.setTransform(0, 96);
        this.Ha = new a.iM;
        this.Ha.parent = this;
        this.Ha.setTransform(0, 48);
        this.Aa = new a.eM;
        this.Aa.parent = this;
        this.Aa.setTransform(0, 96);
        this.Ka = new a.jM;
        this.Ka.parent = this;
        this.Ka.setTransform(0, 48);
        this.Qa =
            new a.fM;
        this.Qa.parent = this;
        this.Qa.setTransform(0, 96);
        this.ab = new a.cM;
        this.ab.parent = this;
        this.ab._off = !0;
        this.nb = new a.dM;
        this.nb.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.hb
            }, {
                t: this.Ea
            }]
        }).to({
            state: [{
                t: this.jb
            }, {
                t: this.ib
            }]
        }, 13).to({
            state: [{
                t: this.Aa
            }, {
                t: this.Ha
            }]
        }, 13).to({
            state: [{
                t: this.Qa
            }, {
                t: this.Ka
            }]
        }, 13).to({
            state: [{
                t: this.ab
            }]
        }, 13).to({
            state: [{
                t: this.ab
            }]
        }, 1).to({
            state: [{
                t: this.ab
            }]
        }, 1).to({
            state: [{
                t: this.ab
            }]
        }, 1).to({
            state: [{
                t: this.ab
            }]
        }, 1).to({
                state: [{
                    t: this.nb
                }]
            },
            1).wait(1));
        this.timeline.addTween(e.Tween.get(this.ab).wait(52).to({
            _off: !1
        }, 0).wait(4).to({
            _off: !0
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 112, 160);
    (a.yq = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.$G;
        this.ba.parent = this;
        this.ba.setTransform(0, 0, 1, .99);
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype = n(a.yq, new e.Rectangle(0, 0, 32, 15.9), null);
    (a.xq = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.VG;
        this.ba.parent = this;
        this.ba.setTransform(0,
            0, 1, .99);
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype = n(a.xq, new e.Rectangle(0, 0, 48, 15.9), null);
    (a.wq = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.WG;
        this.ba.parent = this;
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype = n(a.wq, new e.Rectangle(0, 0, 96, 16), null);
    (a.Lb = function (a, b, f) {
        this.initialize(a, b, f, {
            credit_limit: 0,
            change_bet: 1,
            change_lines: 32,
            add_credit: 63
        });
        this.JC = function () {
            this.visible = !1;
            this.stop()
        };
        this.cD = function () {
            this.visible = !1;
            this.stop()
        };
        this.lD = function () {
            this.gotoAndPlay("add_credit")
        };
        this.timeline.addTween(e.Tween.get(this).wait(31).call(this.JC).wait(31).call(this.cD).wait(31).call(this.lD).wait(1));
        this.t = new e.Text("CREDIT LIMIT", "22px 'Impact'");
        this.t.name = "t";
        this.t.textAlign = "center";
        this.t.lineHeight = 27;
        this.t.lineWidth = 156;
        this.t.parent = this;
        this.t.setTransform(80, 2.2, 1, 1.068);
        this.timeline.addTween(e.Tween.get(this.t).wait(1).to({
            text: "CHANGE BET"
        }, 0).wait(31).to({
            x: 79.4,
            text: "CHANGE LINES",
            lineWidth: 155
        }, 0).wait(31).to({
            x: 80,
            text: "ADD CREDIT",
            lineWidth: 156
        }, 0).wait(20).to({
            text: ""
        }, 0).wait(11));
        this.shape = new e.Shape;
        this.shape.graphics.f().s("#000000").ss(2, 0, 0, 3).p("AMgCgI4/AAIAAk/IY/AAg");
        this.shape.setTransform(80, 16);
        this.ob = new e.Shape;
        this.ob.graphics.f("#FFFF00").s().p("AsfCgIAAk/IY/AAIAAE/g");
        this.ob.setTransform(80, 16);
        this.mb = new e.Shape;
        this.mb.graphics.f("#FFFFFF").s().p("AsfCgIAAk/IY/AAIAAE/g");
        this.mb.setTransform(80, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ob
            }, {
                t: this.shape
            }]
        }).to({
            state: [{
                    t: this.mb
                },
                {
                    t: this.shape
                }
            ]
        }, 1).to({
            state: [{
                t: this.mb
            }, {
                t: this.shape
            }]
        }, 31).to({
            state: [{
                t: this.mb
            }, {
                t: this.shape
            }]
        }, 31).to({
            state: []
        }, 20).wait(11))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, -1, 162, 34);
    (a.vq = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.UG;
        this.ba.parent = this;
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype = n(a.vq, new e.Rectangle(0, 0, 96, 16), null);
    (a.uq = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.TG;
        this.ba.parent = this;
        this.ba.setTransform(0,
            0, 1, .99);
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype = n(a.uq, new e.Rectangle(0, 0, 80, 31.7), null);
    (a.vh = function (b, f, h) {
        this.initialize(b, f, h, {
            show: 0,
            hide: 1
        });
        this.ba = new a.KH;
        this.ba.parent = this;
        this.ba.setTransform(608, 0);
        this.$ = new a.BH;
        this.$.parent = this;
        this.aa = new a.sH;
        this.aa.parent = this;
        this.aa.setTransform(608, 0);
        this.ca = new a.jH;
        this.ca.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ca
            }, {
                t: this.aa
            }]
        }, 1).wait(1))
    }).prototype =
        b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 32);
    (a.Ae = function (b, f, h) {
        this.initialize(b, f, h, {
            show: 0,
            hide: 1
        });
        this.ba = new a.JH;
        this.ba.parent = this;
        this.ba.setTransform(608, 0);
        this.$ = new a.AH;
        this.$.parent = this;
        this.aa = new a.rH;
        this.aa.parent = this;
        this.aa.setTransform(608, 0);
        this.ca = new a.iH;
        this.ca.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ca
            }, {
                t: this.aa
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0,
        0, 640, 32);
    (a.ze = function (b, f, h) {
        this.initialize(b, f, h, {
            show: 0,
            hide: 1
        });
        this.ba = new a.IH;
        this.ba.parent = this;
        this.ba.setTransform(608, 0);
        this.$ = new a.zH;
        this.$.parent = this;
        this.aa = new a.qH;
        this.aa.parent = this;
        this.aa.setTransform(608, 0);
        this.ca = new a.hH;
        this.ca.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ca
            }, {
                t: this.aa
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 32);
    (a.Fc = function (b, f, h) {
        this.initialize(b,
            f, h, {
                show: 0,
                hide: 1
            });
        this.ba = new a.HH;
        this.ba.parent = this;
        this.ba.setTransform(608, 0);
        this.$ = new a.yH;
        this.$.parent = this;
        this.aa = new a.pH;
        this.aa.parent = this;
        this.aa.setTransform(608, 0);
        this.ca = new a.gH;
        this.ca.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ca
            }, {
                t: this.aa
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 32);
    (a.Ec = function (b, f, h) {
        this.initialize(b, f, h, {
            show: 0,
            hide: 1
        });
        this.ba = new a.GH;
        this.ba.parent =
            this;
        this.ba.setTransform(608, 0);
        this.$ = new a.xH;
        this.$.parent = this;
        this.aa = new a.oH;
        this.aa.parent = this;
        this.aa.setTransform(608, 0);
        this.ca = new a.fH;
        this.ca.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ca
            }, {
                t: this.aa
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 32);
    (a.bc = function (b, f, h) {
        this.initialize(b, f, h, {
            show: 0,
            hide: 1
        });
        this.ba = new a.FH;
        this.ba.parent = this;
        this.ba.setTransform(608, 0);
        this.$ =
            new a.wH;
        this.$.parent = this;
        this.aa = new a.nH;
        this.aa.parent = this;
        this.aa.setTransform(608, 0);
        this.ca = new a.eH;
        this.ca.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ca
            }, {
                t: this.aa
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 32);
    (a.fb = function (b, f, h) {
        this.initialize(b, f, h, {
            show: 0,
            hide: 1
        });
        this.ba = new a.EH;
        this.ba.parent = this;
        this.ba.setTransform(608, 0);
        this.$ = new a.vH;
        this.$.parent = this;
        this.aa = new a.mH;
        this.aa.parent = this;
        this.aa.setTransform(608, 0);
        this.ca = new a.dH;
        this.ca.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ca
            }, {
                t: this.aa
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 32);
    (a.Ga = function (b, f, h) {
        this.initialize(b, f, h, {
            show: 0,
            hide: 1
        });
        this.ba = new a.uH;
        this.ba.parent = this;
        this.$ = new a.DH;
        this.$.parent = this;
        this.$.setTransform(608, 0);
        this.aa = new a.cH;
        this.aa.parent = this;
        this.ca = new a.lH;
        this.ca.parent =
            this;
        this.ca.setTransform(608, 0);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ca
            }, {
                t: this.aa
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 32);
    (a.ya = function (b, f, h) {
        this.initialize(b, f, h, {
            show: 0,
            hide: 1
        });
        this.ba = new a.tH;
        this.ba.parent = this;
        this.$ = new a.CH;
        this.$.parent = this;
        this.$.setTransform(608, 0);
        this.aa = new a.kH;
        this.aa.parent = this;
        this.aa.setTransform(608, 0);
        this.ca = new a.bH;
        this.ca.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.$
                },
                {
                    t: this.ba
                }
            ]
        }).to({
            state: [{
                t: this.ca
            }, {
                t: this.aa
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 32);
    (a.ye = function (b, f, h) {
        this.initialize(b, f, h, {
            play1: 0,
            play2: 2,
            play3: 4,
            play4: 6,
            play5: 8
        });
        this.ba = new a.Hz;
        this.ba.parent = this;
        this.$ = new a.Iz;
        this.$.parent = this;
        this.aa = new a.Jz;
        this.aa.parent = this;
        this.ca = new a.Kz;
        this.ca.parent = this;
        this.da = new a.Lz;
        this.da.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 2).to({
                state: [{
                    t: this.aa
                }]
            },
            2).to({
            state: [{
                t: this.ca
            }]
        }, 2).to({
            state: [{
                t: this.da
            }]
        }, 2).wait(2))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 96, 384);
    (a.LG = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.ba = new a.Qp;
        this.ba.parent = this;
        this.$ = new a.KE;
        this.$.parent = this;
        this.aa = new a.LE;
        this.aa.parent = this;
        this.ca = new a.ME;
        this.ca.parent = this;
        this.da = new a.NE;
        this.da.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 11).to({
                state: [{
                    t: this.aa
                }]
            },
            11).to({
            state: [{
                t: this.ca
            }]
        }, 11).to({
            state: [{
                t: this.da
            }]
        }, 11).to({
            state: [{
                t: this.ca
            }]
        }, 11).to({
            state: [{
                t: this.aa
            }]
        }, 11).to({
            state: [{
                t: this.$
            }]
        }, 11).to({
            state: [{
                t: this.ba
            }]
        }, 11).wait(11))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 80, 32);
    (a.KG = function () {
        this.initialize(void 0, void 0, void 0, {
            blink: 0,
            rotateR: 28,
            rotateL: 64,
            blinkF: 100,
            rotateRF: 128,
            rotateLF: 164
        });
        this.GC = function () {
            this.stop()
        };
        this.Hm = function () {
            this.stop()
        };
        this.Km = function () {
            this.stop()
        };
        this.iC = function () {
            this.stop()
        };
        this.rC = function () {
            this.stop()
        };
        this.Fm = function () {
            this.stop()
        };
        this.timeline.addTween(e.Tween.get(this).wait(27).call(this.GC).wait(36).call(this.Hm).wait(36).call(this.Km).wait(28).call(this.iC).wait(36).call(this.rC).wait(36).call(this.Fm).wait(1));
        this.ba = new a.Rp;
        this.ba.parent = this;
        this.ba.setTransform(48, 32);
        this.$ = new a.tF;
        this.$.parent = this;
        this.$.setTransform(48, 32);
        this.aa = new a.uF;
        this.aa.parent = this;
        this.aa.setTransform(48, 32);
        this.ca = new a.vF;
        this.ca.parent = this;
        this.ca.setTransform(48,
            32);
        this.da = new a.mF;
        this.da.parent = this;
        this.da.setTransform(48, 32);
        this.fa = new a.nF;
        this.fa.parent = this;
        this.fa.setTransform(48, 32);
        this.ga = new a.oF;
        this.ga.parent = this;
        this.ga.setTransform(48, 32);
        this.ea = new a.pF;
        this.ea.parent = this;
        this.ea.setTransform(48, 32);
        this.ia = new a.qF;
        this.ia.parent = this;
        this.ia.setTransform(48, 32);
        this.ha = new a.rF;
        this.ha.parent = this;
        this.ha.setTransform(48, 32);
        this.ka = new a.sF;
        this.ka.parent = this;
        this.ka.setTransform(48, 32);
        this.ja = new a.Pp;
        this.ja.parent = this;
        this.ja.setTransform(48,
            32);
        this.ja._off = !0;
        this.la = new a.dF;
        this.la.parent = this;
        this.la.setTransform(48, 32);
        this.ma = new a.eF;
        this.ma.parent = this;
        this.ma.setTransform(48, 32);
        this.oa = new a.fF;
        this.oa.parent = this;
        this.oa.setTransform(48, 32);
        this.Ja = new a.gF;
        this.Ja.parent = this;
        this.Ja.setTransform(48, 32);
        this.Oa = new a.hF;
        this.Oa.parent = this;
        this.Oa.setTransform(48, 32);
        this.Ia = new a.iF;
        this.Ia.parent = this;
        this.Ia.setTransform(48, 32);
        this.Ba = new a.jF;
        this.Ba.parent = this;
        this.Ba.setTransform(48, 32);
        this.Fa = new a.kF;
        this.Fa.parent =
            this;
        this.Fa.setTransform(48, 32);
        this.qa = new a.lF;
        this.qa.parent = this;
        this.qa.setTransform(48, 32);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.aa
            }]
        }, 4).to({
            state: [{
                t: this.ca
            }]
        }, 4).to({
            state: [{
                t: this.aa
            }]
        }, 4).to({
            state: [{
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.da
            }]
        }, 4).to({
            state: [{
                t: this.fa
            }]
        }, 4).to({
            state: [{
                t: this.ga
            }]
        }, 4).to({
            state: [{
                t: this.ea
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }]
        }, 4).to({
                state: [{
                    t: this.ha
                }]
            },
            4).to({
            state: [{
                t: this.ka
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ka
            }]
        }, 4).to({
            state: [{
                t: this.ha
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }]
        }, 4).to({
            state: [{
                t: this.ea
            }]
        }, 4).to({
            state: [{
                t: this.ga
            }]
        }, 4).to({
            state: [{
                t: this.fa
            }]
        }, 4).to({
            state: [{
                t: this.da
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ja
            }]
        }, 4).to({
            state: [{
                t: this.ja
            }]
        }, 4).to({
            state: [{
                t: this.la
            }]
        }, 4).to({
            state: [{
                t: this.ma
            }]
        }, 4).to({
            state: [{
                t: this.la
            }]
        }, 4).to({
            state: [{
                t: this.ja
            }]
        }, 4).to({
                state: [{
                    t: this.ja
                }]
            },
            4).to({
            state: [{
                t: this.ja
            }]
        }, 4).to({
            state: [{
                t: this.oa
            }]
        }, 4).to({
            state: [{
                t: this.Ja
            }]
        }, 4).to({
            state: [{
                t: this.Oa
            }]
        }, 4).to({
            state: [{
                t: this.Ia
            }]
        }, 4).to({
            state: [{
                t: this.Ba
            }]
        }, 4).to({
            state: [{
                t: this.Fa
            }]
        }, 4).to({
            state: [{
                t: this.qa
            }]
        }, 4).to({
            state: [{
                t: this.ja
            }]
        }, 4).to({
            state: [{
                t: this.ja
            }]
        }, 4).to({
            state: [{
                t: this.qa
            }]
        }, 4).to({
            state: [{
                t: this.Fa
            }]
        }, 4).to({
            state: [{
                t: this.Ba
            }]
        }, 4).to({
            state: [{
                t: this.Ia
            }]
        }, 4).to({
            state: [{
                t: this.Oa
            }]
        }, 4).to({
            state: [{
                t: this.Ja
            }]
        }, 4).to({
            state: [{
                t: this.oa
            }]
        }, 4).to({
                state: [{
                    t: this.ja
                }]
            },
            4).wait(4));
        this.timeline.addTween(e.Tween.get(this.ba).to({
            _off: !0
        }, 4).wait(20).to({
            _off: !1
        }, 0).wait(4).to({
            _off: !0
        }, 4).wait(28).to({
            _off: !1
        }, 0).wait(4).to({
            _off: !0
        }, 4).wait(28).to({
            _off: !1
        }, 0).to({
            _off: !0
        }, 4).wait(100));
        this.timeline.addTween(e.Tween.get(this.ja).wait(100).to({
            _off: !1
        }, 0).wait(4).to({
            _off: !0
        }, 4).wait(12).to({
            _off: !1
        }, 0).wait(8).to({
            _off: !0
        }, 4).wait(28).to({
            _off: !1
        }, 0).wait(4).to({
            _off: !0
        }, 4).wait(28).to({
            _off: !1
        }, 0).wait(4))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(48,
        32, 80, 16);
    (a.pq = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.pz;
        this.ba.parent = this;
        this.ba.setTransform(592, 0);
        this.$ = new a.kz;
        this.$.parent = this;
        this.$.setTransform(608, 96);
        this.aa = new a.iz;
        this.aa.parent = this;
        this.aa.setTransform(608, 208);
        this.ca = new a.oz;
        this.ca.parent = this;
        this.ca.setTransform(32, 0);
        this.da = new a.jz;
        this.da.parent = this;
        this.da.setTransform(0, 96);
        this.fa = new a.hz;
        this.fa.parent = this;
        this.fa.setTransform(0, 208);
        this.ga = new a.Zh;
        this.ga.parent = this;
        this.ga.setTransform(480,
            176);
        this.ea = new a.$h;
        this.ea.parent = this;
        this.ea.setTransform(480, 0);
        this.ia = new a.Zh;
        this.ia.parent = this;
        this.ia.setTransform(368, 176);
        this.ha = new a.$h;
        this.ha.parent = this;
        this.ha.setTransform(368, 0);
        this.ka = new a.Zh;
        this.ka.parent = this;
        this.ka.setTransform(256, 176);
        this.ja = new a.$h;
        this.ja.parent = this;
        this.ja.setTransform(256, 0);
        this.la = new a.Zh;
        this.la.parent = this;
        this.la.setTransform(32, 176);
        this.ma = new a.$h;
        this.ma.parent = this;
        this.ma.setTransform(32, 0);
        this.oa = new a.Zh;
        this.oa.parent = this;
        this.oa.setTransform(144, 176);
        this.Ja = new a.$h;
        this.Ja.parent = this;
        this.Ja.setTransform(144, 0);
        this.Oa = new a.green;
        this.Oa.parent = this;
        this.Oa.setTransform(430, 348);
        this.Ia = new a.tq;
        this.Ia.parent = this;
        this.Ia.setTransform(592, 352);
        this.Ba = new a.sq;
        this.Ba.parent = this;
        this.Ba.setTransform(416, 352);
        this.Fa = new a.rq;
        this.Fa.parent = this;
        this.Fa.setTransform(416, 400);
        this.qa = new a.QG;
        this.qa.parent = this;
        this.qa.setTransform(416, 336);
        this.ua = new a.jm;
        this.ua.parent = this;
        this.ua.setTransform(0, 336);
        this.Ma =
            new a.CK;
        this.Ma.parent = this;
        this.Ma.setTransform(0, 320);
        this.La = new a.DK;
        this.La.parent = this;
        this.La.setTransform(64, 320);
        this.Wa = new a.EK;
        this.Wa.parent = this;
        this.Wa.setTransform(144, 320);
        this.Ra = new a.FK;
        this.Ra.parent = this;
        this.Ra.setTransform(224, 320);
        this.Ca = new a.GK;
        this.Ca.parent = this;
        this.Ca.setTransform(304, 320);
        this.Xa = new a.HK;
        this.Xa.parent = this;
        this.Xa.setTransform(384, 320);
        this.Ya = new a.JK;
        this.Ya.parent = this;
        this.Ya.setTransform(544, 320);
        this.Sa = new a.IK;
        this.Sa.parent = this;
        this.Sa.setTransform(464,
            320);
        this.Za = new a.qm;
        this.Za.parent = this;
        this.Za.setTransform(544, 336);
        this.Pa = new a.pm;
        this.Pa.parent = this;
        this.Pa.setTransform(464, 336);
        this.Ta = new a.om;
        this.Ta.parent = this;
        this.Ta.setTransform(384, 336);
        this.Ua = new a.nm;
        this.Ua.parent = this;
        this.Ua.setTransform(304, 336);
        this.Va = new a.mm;
        this.Va.parent = this;
        this.Va.setTransform(224, 336);
        this.gb = new a.lm;
        this.gb.parent = this;
        this.gb.setTransform(144, 336);
        this.cb = new a.km;
        this.cb.parent = this;
        this.cb.setTransform(64, 336);
        this.wa = new a.Zh;
        this.wa.parent =
            this;
        this.wa.setTransform(592, 176);
        this.$a = new a.$h;
        this.$a.parent = this;
        this.$a.setTransform(592, 0);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.$a
                }, {
                    t: this.wa
                }, {
                    t: this.cb
                }, {
                    t: this.gb
                }, {
                    t: this.Va
                }, {
                    t: this.Ua
                }, {
                    t: this.Ta
                }, {
                    t: this.Pa
                }, {
                    t: this.Za
                }, {
                    t: this.Sa
                }, {
                    t: this.Ya
                }, {
                    t: this.Xa
                }, {
                    t: this.Ca
                }, {
                    t: this.Ra
                }, {
                    t: this.Wa
                }, {
                    t: this.La
                }, {
                    t: this.Ma
                }, {
                    t: this.ua
                }, {
                    t: this.qa
                }, {
                    t: this.Fa
                }, {
                    t: this.Ba
                }, {
                    t: this.Ia
                }, {
                    t: this.Oa
                }, {
                    t: this.Ja
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                },
                {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }).wait(1))
    }).prototype = n(a.pq, new e.Rectangle(0, 0, 640, 416), null);
    (a.mh = function (a, b, f) {
        this.initialize(a, b, f, {});
        this.shape = new e.Shape;
        this.shape.graphics.f().s("#000000").ss(1, 0, 0, 1).p("AWglOIHqJ/INmAAIAAAeIt0AAInqp/MgssAAAInqJ/ItrAAIAAgeINcAAIHqp/g");
        this.shape.setTransform(280, 33.5);
        this.ob = new e.Shape;
        this.ob.graphics.f("#FFFFFF").s().p("Ad7FPInqp/MgsrAAAInqJ/ItrAAIAAgeINcAAIHrp/MAtIAAAIHqJ/INmAAIAAAeg");
        this.ob.setTransform(280, 33.5);
        this.mb = new e.Shape;
        this.mb.graphics.f().s("#000000").ss(1, 0, 0, 1).p("EApGAFPIAAgeICqAAIAAAegAceCkIgVAVIj9lJIAVgWgALQkwIlAAAIAAgeIFAAAgArPlOIFAAAIAAAeIlAAAgA8jCfID9lKIAVAWIj9FJgEgrvAExICqAAIAAAeIiqAAg");
        this.mb.setTransform(280, 33.5);
        this.vb = new e.Shape;
        this.vb.graphics.f("#FFFFFF").s().p("EApGAFPIAAgeICqAAIAAAegEgrvAFPIAAgeICqAAIAAAegAYMiQIAVgWID9FKIgVAVgA8jCeID9lIIAVAVIj8FJgAGQkwIAAgeIFAAAIAAAegArPkwIAAgeIFAAAIAAAeg");
        this.vb.setTransform(280, 33.5);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.ob
                },
                {
                    t: this.shape
                }
            ]
        }).to({
            state: [{
                t: this.vb
            }, {
                t: this.mb
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, -1, 562, 69);
    (a.kh = function (a, b, f) {
        this.initialize(a, b, f, {});
        this.shape = new e.Shape;
        this.shape.graphics.f().s("#000000").ss(1, 0, 0, 1).p("A2fFPInqp/ItmAAIAAgeIN0AAIHqJ/MAssAAAIHqp/INrAAIAAAeItcAAInqJ/g");
        this.shape.setTransform(280, 33.5);
        this.ob = new e.Shape;
        this.ob.graphics.f("#00FFFF").s().p("A2fFPInqp/ItmAAIAAgeIN1AAIHpJ/MAssAAAIHqp/INrAAIAAAeItdAAInpJ/g");
        this.ob.setTransform(280, 33.5);
        this.mb = new e.Shape;
        this.mb.graphics.f().s("#000000").ss(1, 0, 0, 1).p("EArwgEwIiqAAIAAgeICqAAgAckieIj9FJIgVgVID8lJgALQFPIlAAAIAAgeIFAAAgArPExIFAAAIAAAeIlAAAgA8dijIAVgVID9FJIgVAVgEgpFgFOIAAAeIiqAAIAAgeg");
        this.mb.setTransform(280, 33.5);
        this.vb = new e.Shape;
        this.vb.graphics.f("#00FFFF").s().p("AGQFPIAAgeIFAAAIAAAegArPFPIAAgeIFAAAIAAAegAYSCWID8lJIAWAVIj9FJgA8dijIAVgVID9FJIgVAVgEApGgEwIAAgeICqAAIAAAegEgrvgEwIAAgeICqAAIAAAeg");
        this.vb.setTransform(280, 33.5);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.ob
                },
                {
                    t: this.shape
                }
            ]
        }).to({
            state: [{
                t: this.vb
            }, {
                t: this.mb
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, -1, 562, 69);
    (a.jh = function (a, b, f) {
        this.initialize(a, b, f, {});
        this.shape = new e.Shape;
        this.shape.graphics.f().s("#000000").ss(1, 0, 0, 1).p("ALIHqIp/u1IiIAAIp/O1ItAAAIgXAAIgGAAIgHAAIgYAAIjNAAIgCAAIgDAAIgFAAIgIAAIs+AAIgCAAIiWAAIAAgeICWAAIACAAIM+AAIAIAAIAFAAIADAAIACAAIDNAAIAYAAIAHAAIAGAAIAXAAIMwAAIKAu1ICnAAIJ/O1MAgYAAAIAAAeg");
        this.shape.setTransform(280, 49);
        this.ob = new e.Shape;
        this.ob.graphics.f("#009A63").s().p("ALIHqIp/u1IiHAAIp/O1ItBAAIgXAAIgFAAIgIAAIgYAAIjMAAIgDAAIgDAAIgFAAIgIAAIs+AAIgCAAIiWAAIAAgeICWAAIACAAIM+AAIAIAAIAFAAIADAAIADAAIDMAAIAYAAIAIAAIAFAAIAXAAIMxAAIJ/u1ICnAAIJ/O1MAgYAAAIAAAeg");
        this.ob.setTransform(280, 49);
        this.mb = new e.Shape;
        this.mb.graphics.f().s("#000000").ss(1, 0, 0, 1).p("AhnC2IgXgTIDnlYIAWAUg");
        this.mb.setTransform(224.1, 74);
        this.vb = new e.Shape;
        this.vb.graphics.f().s("#000000").ss(1, 0, 0, 1).p("EApGAC0IACAAICXAAIARAAIAAAeIgRAAIiXAAIgCAAgAcwDSIgGAAIgDAAIgDAAIjuAAIgbAAIgJAAIgHAAIgbAAIAAgeIAbAAIAHAAIAJAAIAbAAIDuAAIADAAIADAAIAGAAgAKkCbIjolYIAWgTIDoFYgA8vC0IAGAAIADAAIADAAIDuAAIAbAAIAJAAIAHAAIAbAAIAAAeIgbAAIgHAAIgJAAIgbAAIjuAAIgDAAIgDAAIgGAAgEgpFADSIgCAAIioAAIAAgeICoAAIACAAg");
        this.vb.setTransform(280, 77);
        this.Lc = new e.Shape;
        this.Lc.graphics.f("#009A63").s().p("EArfADTIiYAAIgBAAIAAgeIABAAICYAAIARAAIAAAegAcpDTIgDAAIgCAAIjuAAIgcAAIgJAAIgGAAIgbAAIAAgeIAbAAIAGAAIAJAAIAcAAIDuAAIACAAIADAAIAHAAIAAAegA4KDTIgGAAIgKAAIgbAAIjtAAIgEAAIgCAAIgHAAIAAgeIAHAAIACAAIAEAAIDtAAIAbAAIAKAAIAGAAIAbAAIAAAegEgpHADTIioAAIAAgeICoAAIACAAIAAAegAG8i7IAWgUIDoFYIgWAUgAqtCFIDnlXIAXAUIjnFXg");
        this.Lc.setTransform(280, 76.9);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ob
            }, {
                t: this.shape
            }]
        }).to({
            state: [{
                    t: this.Lc
                },
                {
                    t: this.vb
                }, {
                    t: this.mb
                }
            ]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, -1, 562, 100);
    (a.ih = function (a, b, f) {
        this.initialize(a, b, f, {});
        this.shape = new e.Shape;
        this.shape.graphics.f().s("#000000").ss(1, 0, 0, 4).p("ArHnpIJ/O1ICIAAIJ/u1INAAAIAXAAIAGAAIAHAAIAYAAIDNAAIACAAIADAAIAFAAIAIAAIM+AAIACAAICWAAIAAAeIiWAAIgCAAIs+AAIgIAAIgFAAIgDAAIgCAAIjNAAIgYAAIgHAAIgGAAIgXAAIswAAIqAO1IinAAIp/u1MggYAAAIAAgeg");
        this.shape.setTransform(280, 49);
        this.ob = new e.Shape;
        this.ob.graphics.f("#FF00FF").s().p("AhYHqIp/u1MggYAAAIAAgeMAgoAAAIJ/O1ICIAAIJ/u1IM/AAIAYAAIAFAAIAIAAIAYAAIDNAAIACAAIACAAIAGAAIAIAAIM+AAIACAAICWAAIAAAeIiWAAIgCAAIs+AAIgIAAIgGAAIgCAAIgCAAIjNAAIgYAAIgIAAIgFAAIgYAAIswAAIp/O1g");
        this.ob.setTransform(280, 49);
        this.mb = new e.Shape;
        this.mb.graphics.f().s("#000000").ss(1, 0, 0, 22.9).p("ABpi1IAWATIjmFYIgXgUg");
        this.mb.setTransform(335.9, 24);
        this.vb = new e.Shape;
        this.vb.graphics.f().s("#000000").ss(1, 0, 0, 4).p("EApGgDSIACAAICoAAIAAAeIioAAIgCAAgAcwi0IgGAAIgDAAIgDAAIjuAAIgbAAIgJAAIgHAAIgbAAIAAgeIAbAAIAHAAIAJAAIAbAAIDuAAIADAAIADAAIAGAAgAqjicIDpFYIgYAUIjolYgA8vjSIAGAAIADAAIADAAIDuAAIAbAAIAJAAIAHAAIAbAAIAAAeIgbAAIgHAAIgJAAIgbAAIjuAAIgDAAIgDAAIgGAAgEgpFgC0IgCAAIiXAAIgRAAIAAgeIARAAICXAAIACAAg");
        this.vb.setTransform(280, 21.1);
        this.Lc = new e.Shape;
        this.Lc.graphics.f("#FF00FF").s().p("AGwC/IDnlXIAXATIjoFYgAq6iIIAYgUIDnFYIgWAUgEApHgC0IgBAAIAAgeIABAAICpAAIAAAegAcpi0IgDAAIgCAAIjuAAIgcAAIgJAAIgGAAIgbAAIAAgeIAbAAIAGAAIAJAAIAcAAIDuAAIACAAIADAAIAHAAIAAAegA4Ki0IgGAAIgKAAIgbAAIjtAAIgEAAIgCAAIgHAAIAAgeIAHAAIACAAIAEAAIDtAAIAbAAIAKAAIAGAAIAbAAIAAAegEgpHgC0IiXAAIgRAAIAAgeIARAAICXAAIACAAIAAAeg");
        this.Lc.setTransform(280, 21.1);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ob
            }, {
                t: this.shape
            }]
        }).to({
            state: [{
                    t: this.Lc
                },
                {
                    t: this.vb
                }, {
                    t: this.mb
                }
            ]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, -1, 562, 100);
    (a.hh = function (a, b, f) {
        this.initialize(a, b, f, {});
        this.shape = new e.Shape;
        this.shape.graphics.f().s("#000000").ss(1, 0, 0, 1).p("AeFQGI39/sIsFAAI39fsIgOAAIkeAAIlyAAIjXAAIAAgeIDXAAIFyAAIEdAAIABgCIX8/rIMiAAIX+ftINcAAIAAAeg");
        this.shape.setTransform(280, 108);
        this.ob = new e.Shape;
        this.ob.graphics.f("#FFFD00").s().p("AeFQGI39/sIsFAAI39fsIgOAAIkeAAIlyAAIjXAAIAAgeIDXAAIFyAAIEdAAIABgCIX9/rIMhAAIX+ftINcAAIAAAeg");
        this.ob.setTransform(280, 108);
        this.mb = new e.Shape;
        this.mb.graphics.f().s("#000000").ss(1, 0, 0, 1).p("AGpvVIAVgWID6FMIgVAVgAYdHdID7FMIgVAWIj7lMgEArwAPsIAAgeIiqAAIAAAegAqzqZID7lMIAWAVIj7FMgA4bHpIAVAVIj6FMIgVgVgEgrvAPsIAAgeICqAAIAAAeg");
        this.mb.setTransform(280, 110.6);
        this.vb = new e.Shape;
        this.vb.graphics.f("#FFFD00").s().p("A8WOGID6lMIAWAVIj6FMgAYHJEIAVgWID7FMIgVAWgAqzpIID6lMIAWAVIj7FMgAGouEIAWgWID6FMIgVAVg");
        this.vb.setTransform(280.1, 102.5);
        this.Lc = new e.Shape;
        this.Lc.graphics.f("#FFFF00").s().p("EApGAAPIAAgdICqAAIAAAdgEgrvAAPIAAgdICqAAIAAAdg");
        this.Lc.setTransform(280, 209.5);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ob
            }, {
                t: this.shape
            }]
        }).to({
            state: [{
                t: this.Lc
            }, {
                t: this.vb
            }, {
                t: this.mb
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, 4, 562, 208);
    (a.gh = function (a, b, f) {
        this.initialize(a, b, f, {});
        this.shape = new e.Shape;
        this.shape.graphics.f().s("#000000").ss(1, 0, 0, 4).p("A+JvsIruAAIh4AAIAAgeIB4AAIL9AAIYEf3IL2AAIYF/3INrAAIAAAeItcAAI28eXIgXAeIgaAjIgYAfIgSAAIgmAAIgOAAIqCAAIgxAAIgaAAg");
        this.shape.setTransform(280, 103.5);
        this.ob = new e.Shape;
        this.ob.graphics.f("#FF9400").s().p("AF9QLIgmAAIgOAAIqCAAIgxAAIgaAAI4F/3IrtAAIh5AAIAAgeIB5AAIL8AAIYEf3IL2AAIYF/3INrAAIAAAeItcAAI28eXIgXAeIgaAiIgYAgg");
        this.ob.setTransform(280, 103.5);
        this.mb = new e.Shape;
        this.mb.graphics.f().s("#000000").ss(1, 0, 0, 4).p("Aa+KHIAXAUIj5FJIgXgTgAFnKaIAUgXID+FRIgUAXgAr8s1IAWgWID6FMIgWAVgA4svPIiqAAIAAgeICqAAg");
        this.mb.setTransform(175.1, 100.6);
        this.vb = new e.Shape;
        this.vb.graphics.f().s("#000000").ss(1, 0, 0, 22.9).p("AJzjnIiqAAIAAgeICqAAgAl1heIAVAWIj7FLIgWgVg");
        this.vb.setTransform(497.3, 26.2);
        this.Lc = new e.Shape;
        this.Lc.graphics.f("#FF9400").s().p("AqxKcIAUgYID+FRIgUAXgAGsPSID5lKIAWAUIj4FKgAYLn3ID7lNIAWAVIj7FNgA8Vs0IAVgVID6FLIgVAWgEApGgPNIAAgeICqAAIAAAegEgrvgPNIAAgeICqAAIAAAeg");
        this.Lc.setTransform(280, 100.4);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ob
            }, {
                t: this.shape
            }]
        }).to({
            state: [{
                t: this.Lc
            }, {
                t: this.vb
            }, {
                t: this.mb
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, -1, 562, 209);
    (a.fh = function (a,
        b, f) {
        this.initialize(a, b, f, {});
        this.shape = new e.Shape;
        this.shape.graphics.f().s("#000000").ss(1, 0, 0, 1).p("EgrvAAPIAAgdMBXfAAAIAAAdg");
        this.shape.setTransform(280, 1.5);
        this.ob = new e.Shape;
        this.ob.graphics.f("#0000FF").s().p("EgrvAAPIAAgdMBXfAAAIAAAdg");
        this.ob.setTransform(280, 1.5);
        this.mb = new e.Shape;
        this.mb.graphics.f().s("#000000").ss(1, 0, 0, 1).p("EArwAAPIiqAAIAAgdICqAAgAcwAPIlAAAIAAgdIFAAAgALWAPIlQAAIAAgdIFQAAgArOgOIFAAAIAAAdIlAAAgA3vAPIlAAAIAAgdIFAAAgEgrvgAOICqAAIAAAdIiqAAg");
        this.mb.setTransform(280,
            1.5);
        this.vb = new e.Shape;
        this.vb.graphics.f("#0000FF").s().p("EApGAAPIAAgdICqAAIAAAdgAXwAPIAAgdIFAAAIAAAdgAGGAPIAAgdIFQAAIAAAdgArOAPIAAgdIE/AAIAAAdgA8vAPIAAgdIFAAAIAAAdgEgrvAAPIAAgdICqAAIAAAdg");
        this.vb.setTransform(280, 1.5);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ob
            }, {
                t: this.shape
            }]
        }).to({
            state: [{
                t: this.vb
            }, {
                t: this.mb
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, -1, 562, 5);
    (a.eh = function (a, b, f) {
        this.initialize(a, b, f, {});
        this.shape =
            new e.Shape;
        this.shape.graphics.f().s("#000000").ss(1, 0, 0, 1).p("EgrvAAPIAAgdMBXfAAAIAAAdg");
        this.shape.setTransform(280, 1.5);
        this.ob = new e.Shape;
        this.ob.graphics.f("#00FF00").s().p("EgrvAAPIAAgdMBXfAAAIAAAdg");
        this.ob.setTransform(280, 1.5);
        this.mb = new e.Shape;
        this.mb.graphics.f().s("#000000").ss(1, 0, 0, 1).p("EArwAAPIiqAAIAAgdICqAAgAcwAPIlAAAIAAgdIFAAAgALWAPIlQAAIAAgdIFQAAgArOgOIFAAAIAAAdIlAAAgA3vAPIlAAAIAAgdIFAAAgEgrvgAOICqAAIAAAdIiqAAg");
        this.mb.setTransform(280, 1.5);
        this.vb = new e.Shape;
        this.vb.graphics.f("#00FF00").s().p("EApGAAPIAAgdICqAAIAAAdgAXwAPIAAgdIFAAAIAAAdgAGGAPIAAgdIFQAAIAAAdgArOAPIAAgdIE/AAIAAAdgA8vAPIAAgdIFAAAIAAAdgEgrvAAPIAAgdICqAAIAAAdg");
        this.vb.setTransform(280, 1.5);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ob
            }, {
                t: this.shape
            }]
        }).to({
            state: [{
                t: this.vb
            }, {
                t: this.mb
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, -1, 562, 5);
    (a.dh = function (a, b, f) {
        this.initialize(a, b, f, {});
        this.shape = new e.Shape;
        this.shape.graphics.f().s("#000000").ss(1, 0, 0, 1).p("EgrvAAPIAAgdMBXfAAAIAAAdg");
        this.shape.setTransform(280, 1.5);
        this.ob = new e.Shape;
        this.ob.graphics.f("#FF0000").s().p("EgrvAAPIAAgdMBXfAAAIAAAdg");
        this.ob.setTransform(280, 1.5);
        this.mb = new e.Shape;
        this.mb.graphics.f().s("#000000").ss(1, 0, 0, 1).p("EArwAAPIiqAAIAAgdICqAAgAcwAPIlAAAIAAgdIFAAAgALWAPIlQAAIAAgdIFQAAgArOgOIFAAAIAAAdIlAAAgA3vAPIlAAAIAAgdIFAAAgEgrvgAOICqAAIAAAdIiqAAg");
        this.mb.setTransform(280, 1.5);
        this.vb = new e.Shape;
        this.vb.graphics.f("#FF0000").s().p("EApGAAPIAAgdICqAAIAAAdgAXwAPIAAgdIFAAAIAAAdgAGGAPIAAgdIFQAAIAAAdgArOAPIAAgdIE/AAIAAAdgA8vAPIAAgdIFAAAIAAAdgEgrvAAPIAAgdICqAAIAAAdg");
        this.vb.setTransform(280, 1.5);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.ob
                },
                {
                    t: this.shape
                }
            ]
        }).to({
            state: [{
                t: this.vb
            }, {
                t: this.mb
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-1, -1, 562, 5);
    (a.elements = function (b, f, h) {
        this.initialize(b, f, h, {
            play1: 9,
            stop1: 32
        });
        this.LC = function () {
            this.gotoAndPlay("play1")
        };
        this.timeline.addTween(e.Tween.get(this).wait(32).call(this.LC).wait(1));
        this.ba = new a.Lr;
        this.ba.parent = this;
        this.$ = new a.zr;
        this.$.parent = this;
        this.$.setTransform(0, -96);
        this.aa = new a.Dr;
        this.aa.parent = this;
        this.aa.setTransform(0,
            -96);
        this.ca = new a.Er;
        this.ca.parent = this;
        this.ca.setTransform(0, -96);
        this.da = new a.Fr;
        this.da.parent = this;
        this.da.setTransform(0, -96);
        this.fa = new a.Gr;
        this.fa.parent = this;
        this.fa.setTransform(0, -96);
        this.ga = new a.Hr;
        this.ga.parent = this;
        this.ga.setTransform(0, -96);
        this.ea = new a.Ir;
        this.ea.parent = this;
        this.ea.setTransform(0, -96);
        this.ia = new a.Jr;
        this.ia.parent = this;
        this.ia.setTransform(0, -96);
        this.ha = new a.Kr;
        this.ha.parent = this;
        this.ha.setTransform(0, -96);
        this.ka = new a.Cr;
        this.ka.parent = this;
        this.ka.setTransform(0,
            -96);
        this.ja = new a.Br;
        this.ja.parent = this;
        this.ja.setTransform(0, -96);
        this.la = new a.Ar;
        this.la.parent = this;
        this.la.setTransform(0, -96);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.aa
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.da
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.fa
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                    t: this.ha
                },
                {
                    t: this.ba
                }
            ]
        }, 1).to({
            state: [{
                t: this.ba
            }, {
                t: this.ka
            }]
        }, 1).to({
            state: [{
                t: this.ba
            }, {
                t: this.ja
            }]
        }, 6).to({
            state: [{
                t: this.ba
            }, {
                t: this.la
            }]
        }, 6).wait(12))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, -96, 96, 112);
    (a.blink = function (b, f, h) {
        this.initialize(b, f, h, {
            all: 0,
            right: 5
        });
        this.Gm = function () {
            this.gotoAndPlay("all")
        };
        this.jD = function () {
            this.gotoAndPlay("right")
        };
        this.timeline.addTween(e.Tween.get(this).wait(4).call(this.Gm).wait(5).call(this.jD).wait(1));
        this.ba = new a.UI;
        this.ba.parent =
            this;
        this.$ = new a.VI;
        this.$.parent = this;
        this.aa = new a.WI;
        this.aa.parent = this;
        this.ca = new a.XI;
        this.ca.parent = this;
        this.da = new a.YI;
        this.da.parent = this;
        this.fa = new a.$I;
        this.fa.parent = this;
        this.ga = new a.aJ;
        this.ga.parent = this;
        this.ea = new a.bJ;
        this.ea.parent = this;
        this.ia = new a.cJ;
        this.ia.parent = this;
        this.ha = new a.ZI;
        this.ha.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
                state: [{
                    t: this.da
                }]
            },
            1).to({
            state: [{
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }]
        }, 1).to({
            state: [{
                t: this.ha
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 16, 32);
    (a.Dq = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.iE;
        this.ba.parent = this;
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype = n(a.Dq, new e.Rectangle(0, 0, 176, 80), null);
    (a.nextPage = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.bE;
        this.ba.parent =
            this;
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype = n(a.nextPage, new e.Rectangle(0, 0, 176, 80), null);
    (a.Ap = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.ij;
        this.ba.parent = this;
        this.ba.setTransform(0, 128);
        this.$ = new a.hj;
        this.$.parent = this;
        this.$.setTransform(0, 112);
        this.aa = new a.hj;
        this.aa.parent = this;
        this.aa.setTransform(0, 80);
        this.ca = new a.ij;
        this.ca.parent = this;
        this.ca.setTransform(0, 64);
        this.da = new a.ij;
        this.da.parent = this;
        this.da.setTransform(0, 96);
        this.fa = new a.rD;
        this.fa.parent = this;
        this.fa.setTransform(0, 144);
        this.ga = new a.hj;
        this.ga.parent = this;
        this.ga.setTransform(0, 48);
        this.ea = new a.ij;
        this.ea.parent = this;
        this.ea.setTransform(0, 32);
        this.ia = new a.sD;
        this.ia.parent = this;
        this.ha = new a.hj;
        this.ha.parent = this;
        this.ha.setTransform(0, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }).wait(1))
    }).prototype = n(a.Ap, new e.Rectangle(0, 0, 48, 160),
        null);
    (a.Zf = function (b, f, h) {
        this.initialize(b, f, h, {
            play: 0
        });
        this.ti = function () {
            this.stop()
        };
        this.timeline.addTween(e.Tween.get(this).wait(35).call(this.ti).wait(1));
        this.ba = new a.QD;
        this.ba.parent = this;
        this.ba.setTransform(48, 0);
        this.$ = new a.XD;
        this.$.parent = this;
        this.aa = new a.RD;
        this.aa.parent = this;
        this.aa.setTransform(48, 0);
        this.ca = new a.SD;
        this.ca.parent = this;
        this.ca.setTransform(48, 0);
        this.da = new a.TD;
        this.da.parent = this;
        this.da.setTransform(48, 0);
        this.fa = new a.UD;
        this.fa.parent = this;
        this.fa.setTransform(48,
            0);
        this.ga = new a.VD;
        this.ga.parent = this;
        this.ga.setTransform(48, 0);
        this.ea = new a.WD;
        this.ea.parent = this;
        this.ea.setTransform(48, 0);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }, {
                t: this.aa
            }]
        }, 4).to({
            state: [{
                t: this.$
            }, {
                t: this.ca
            }]
        }, 4).to({
            state: [{
                t: this.$
            }, {
                t: this.da
            }]
        }, 4).to({
            state: [{
                t: this.$
            }, {
                t: this.fa
            }]
        }, 4).to({
            state: [{
                t: this.$
            }, {
                t: this.ga
            }]
        }, 4).to({
            state: [{
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.$
            }, {
                t: this.ea
            }]
        }, 4).to({
                state: [{
                    t: this.$
                }, {
                    t: this.ba
                }]
            },
            4).wait(4))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 80, 64);
    (a.YB = function () {
        this.initialize("synched", 0, void 0, {});
        this.ba = new a.mg;
        this.ba.parent = this;
        this.ba.setTransform(176, 20, 1, 9.375);
        this.$ = new a.mg;
        this.$.parent = this;
        this.$.setTransform(176, 196, 1, 9.375);
        this.aa = new a.ag;
        this.aa.parent = this;
        this.aa.setTransform(20, 176, 9.375, 1);
        this.ca = new a.mg;
        this.ca.parent = this;
        this.ca.setTransform(448, 196, 1, 9.375);
        this.da = new a.ag;
        this.da.parent = this;
        this.da.setTransform(296, 176,
            9, 1);
        this.fa = new a.mg;
        this.fa.parent = this;
        this.fa.setTransform(448, 20, 1, 9.375);
        this.ga = new a.eb;
        this.ga.parent = this;
        this.ga.setTransform(416, 48);
        this.ea = new a.eb;
        this.ea.parent = this;
        this.ea.setTransform(416, 112);
        this.ia = new a.eb;
        this.ia.parent = this;
        this.ia.setTransform(288, 80);
        this.ha = new a.eb;
        this.ha.parent = this;
        this.ha.setTransform(384, 112);
        this.ka = new a.eb;
        this.ka.parent = this;
        this.ka.setTransform(320, 144);
        this.ja = new a.eb;
        this.ja.parent = this;
        this.ja.setTransform(288, 144);
        this.la = new a.eb;
        this.la.parent =
            this;
        this.la.setTransform(416, 224);
        this.ma = new a.eb;
        this.ma.parent = this;
        this.ma.setTransform(416, 288);
        this.oa = new a.eb;
        this.oa.parent = this;
        this.oa.setTransform(384, 288);
        this.Ja = new a.eb;
        this.Ja.parent = this;
        this.Ja.setTransform(320, 320);
        this.Oa = new a.eb;
        this.Oa.parent = this;
        this.Oa.setTransform(288, 320);
        this.Ia = new a.eb;
        this.Ia.parent = this;
        this.Ia.setTransform(288, 256);
        this.Ba = new a.sc;
        this.Ba.parent = this;
        this.Ba.setTransform(416, 320);
        this.Fa = new a.sc;
        this.Fa.parent = this;
        this.Fa.setTransform(384, 320);
        this.qa = new a.sc;
        this.qa.parent = this;
        this.qa.setTransform(352, 320);
        this.ua = new a.sc;
        this.ua.parent = this;
        this.ua.setTransform(352, 288);
        this.Ma = new a.sc;
        this.Ma.parent = this;
        this.Ma.setTransform(320, 288);
        this.La = new a.sc;
        this.La.parent = this;
        this.La.setTransform(288, 288);
        this.Wa = new a.sc;
        this.Wa.parent = this;
        this.Wa.setTransform(416, 256);
        this.Ra = new a.sc;
        this.Ra.parent = this;
        this.Ra.setTransform(384, 256);
        this.Ca = new a.sc;
        this.Ca.parent = this;
        this.Ca.setTransform(352, 256);
        this.Xa = new a.sc;
        this.Xa.parent =
            this;
        this.Xa.setTransform(320, 256);
        this.Ya = new a.sc;
        this.Ya.parent = this;
        this.Ya.setTransform(384, 224);
        this.Sa = new a.sc;
        this.Sa.parent = this;
        this.Sa.setTransform(352, 224);
        this.Za = new a.sc;
        this.Za.parent = this;
        this.Za.setTransform(320, 224);
        this.Pa = new a.sc;
        this.Pa.parent = this;
        this.Pa.setTransform(288, 224);
        this.Ta = new a.sc;
        this.Ta.parent = this;
        this.Ta.setTransform(416, 192);
        this.Ua = new a.sc;
        this.Ua.parent = this;
        this.Ua.setTransform(384, 192);
        this.Va = new a.sc;
        this.Va.parent = this;
        this.Va.setTransform(352, 192);
        this.gb = new a.sc;
        this.gb.parent = this;
        this.gb.setTransform(320, 192);
        this.cb = new a.sc;
        this.cb.parent = this;
        this.cb.setTransform(288, 192);
        this.wa = new a.pc;
        this.wa.parent = this;
        this.wa.setTransform(416, 144);
        this.$a = new a.pc;
        this.$a.parent = this;
        this.$a.setTransform(384, 144);
        this.Ea = new a.pc;
        this.Ea.parent = this;
        this.Ea.setTransform(352, 144);
        this.hb = new a.pc;
        this.hb.parent = this;
        this.hb.setTransform(352, 112);
        this.ib = new a.pc;
        this.ib.parent = this;
        this.ib.setTransform(320, 112);
        this.jb = new a.pc;
        this.jb.parent =
            this;
        this.jb.setTransform(288, 112);
        this.Ha = new a.pc;
        this.Ha.parent = this;
        this.Ha.setTransform(416, 80);
        this.Aa = new a.pc;
        this.Aa.parent = this;
        this.Aa.setTransform(384, 80);
        this.Ka = new a.pc;
        this.Ka.parent = this;
        this.Ka.setTransform(352, 80);
        this.Qa = new a.pc;
        this.Qa.parent = this;
        this.Qa.setTransform(320, 80);
        this.ab = new a.pc;
        this.ab.parent = this;
        this.ab.setTransform(384, 48);
        this.nb = new a.pc;
        this.nb.parent = this;
        this.nb.setTransform(352, 48);
        this.tb = new a.pc;
        this.tb.parent = this;
        this.tb.setTransform(320, 48);
        this.pb =
            new a.pc;
        this.pb.parent = this;
        this.pb.setTransform(288, 48);
        this.Bb = new a.pc;
        this.Bb.parent = this;
        this.Bb.setTransform(416, 16);
        this.Da = new a.pc;
        this.Da.parent = this;
        this.Da.setTransform(384, 16);
        this.kb = new a.pc;
        this.kb.parent = this;
        this.kb.setTransform(352, 16);
        this.sb = new a.pc;
        this.sb.parent = this;
        this.sb.setTransform(320, 16);
        this.Cb = new a.pc;
        this.Cb.parent = this;
        this.Cb.setTransform(288, 16);
        this.Db = new a.eb;
        this.Db.parent = this;
        this.Db.setTransform(16, 320);
        this.Ab = new a.eb;
        this.Ab.parent = this;
        this.Ab.setTransform(48,
            320);
        this.wb = new a.eb;
        this.wb.parent = this;
        this.wb.setTransform(144, 288);
        this.Eb = new a.eb;
        this.Eb.parent = this;
        this.Eb.setTransform(112, 288);
        this.xb = new a.eb;
        this.xb.parent = this;
        this.xb.setTransform(16, 256);
        this.yb = new a.eb;
        this.yb.parent = this;
        this.yb.setTransform(144, 224);
        this.Fb = new a.qc;
        this.Fb.parent = this;
        this.Fb.setTransform(144, 320);
        this.Jb = new a.qc;
        this.Jb.parent = this;
        this.Jb.setTransform(112, 320);
        this.zb = new a.qc;
        this.zb.parent = this;
        this.zb.setTransform(80, 320);
        this.Gb = new a.qc;
        this.Gb.parent =
            this;
        this.Gb.setTransform(80, 288);
        this.ra = new a.qc;
        this.ra.parent = this;
        this.ra.setTransform(48, 288);
        this.Hb = new a.qc;
        this.Hb.parent = this;
        this.Hb.setTransform(16, 288);
        this.Ib = new a.qc;
        this.Ib.parent = this;
        this.Ib.setTransform(144, 256);
        this.Kb = new a.qc;
        this.Kb.parent = this;
        this.Kb.setTransform(112, 256);
        this.ac = new a.qc;
        this.ac.parent = this;
        this.ac.setTransform(80, 256);
        this.Sb = new a.qc;
        this.Sb.parent = this;
        this.Sb.setTransform(48, 256);
        this.cc = new a.qc;
        this.cc.parent = this;
        this.cc.setTransform(112, 224);
        this.hc =
            new a.qc;
        this.hc.parent = this;
        this.hc.setTransform(80, 224);
        this.Jc = new a.qc;
        this.Jc.parent = this;
        this.Jc.setTransform(48, 224);
        this.Zd = new a.qc;
        this.Zd.parent = this;
        this.Zd.setTransform(16, 224);
        this.$d = new a.qc;
        this.$d.parent = this;
        this.$d.setTransform(144, 192);
        this.ae = new a.qc;
        this.ae.parent = this;
        this.ae.setTransform(112, 192);
        this.be = new a.qc;
        this.be.parent = this;
        this.be.setTransform(80, 192);
        this.ce = new a.qc;
        this.ce.parent = this;
        this.ce.setTransform(48, 192);
        this.ee = new a.qc;
        this.ee.parent = this;
        this.ee.setTransform(16,
            192);
        this.fe = new a.eb;
        this.fe.parent = this;
        this.fe.setTransform(48, 144);
        this.cf = new a.eb;
        this.cf.parent = this;
        this.cf.setTransform(144, 112);
        this.ge = new a.eb;
        this.ge.parent = this;
        this.ge.setTransform(112, 112);
        this.he = new a.eb;
        this.he.parent = this;
        this.he.setTransform(16, 80);
        this.ie = new a.eb;
        this.ie.parent = this;
        this.ie.setTransform(144, 48);
        this.je = new a.eb;
        this.je.parent = this;
        this.je.setTransform(16, 144);
        this.ke = new a.oc;
        this.ke.parent = this;
        this.ke.setTransform(144, 144);
        this.le = new a.oc;
        this.le.parent =
            this;
        this.le.setTransform(112, 144);
        this.me = new a.oc;
        this.me.parent = this;
        this.me.setTransform(80, 144);
        this.ne = new a.oc;
        this.ne.parent = this;
        this.ne.setTransform(80, 112);
        this.Pc = new a.oc;
        this.Pc.parent = this;
        this.Pc.setTransform(48, 112);
        this.oe = new a.oc;
        this.oe.parent = this;
        this.oe.setTransform(16, 112);
        this.pe = new a.oc;
        this.pe.parent = this;
        this.pe.setTransform(144, 80);
        this.qe = new a.oc;
        this.qe.parent = this;
        this.qe.setTransform(112, 80);
        this.re = new a.oc;
        this.re.parent = this;
        this.re.setTransform(80, 80);
        this.se =
            new a.oc;
        this.se.parent = this;
        this.se.setTransform(48, 80);
        this.te = new a.oc;
        this.te.parent = this;
        this.te.setTransform(112, 48);
        this.ue = new a.oc;
        this.ue.parent = this;
        this.ue.setTransform(80, 48);
        this.df = new a.oc;
        this.df.parent = this;
        this.df.setTransform(48, 48);
        this.fd = new a.oc;
        this.fd.parent = this;
        this.fd.setTransform(16, 48);
        this.gd = new a.oc;
        this.gd.parent = this;
        this.gd.setTransform(144, 16);
        this.hd = new a.oc;
        this.hd.parent = this;
        this.hd.setTransform(112, 16);
        this.jd = new a.oc;
        this.jd.parent = this;
        this.jd.setTransform(80,
            16);
        this.kd = new a.oc;
        this.kd.parent = this;
        this.kd.setTransform(48, 16);
        this.ld = new a.oc;
        this.ld.parent = this;
        this.ld.setTransform(16, 16);
        this.md = new a.pg;
        this.md.parent = this;
        this.md.setTransform(512, 336);
        this.nd = new a.og;
        this.nd.parent = this;
        this.nd.setTransform(448, 336);
        this.od = new a.kg;
        this.od.parent = this;
        this.od.setTransform(476, 176, 2.5, 1);
        this.pd = new a.Qb;
        this.pd.parent = this;
        this.pd.setTransform(476, 336, 2.5, 1);
        this.qd = new a.Qb;
        this.qd.parent = this;
        this.qd.setTransform(462, 204, 4.25, 8.5);
        this.rd = new a.Qb;
        this.rd.parent = this;
        this.rd.setTransform(478, 192, 2.25, 1);
        this.td = new a.qg;
        this.td.parent = this;
        this.td.setTransform(476, 352, 2.5, 1);
        this.ud = new a.ng;
        this.ud.parent = this;
        this.ud.setTransform(528, 196, 1, 9.375);
        this.vd = new a.lg;
        this.vd.parent = this;
        this.vd.setTransform(512, 176);
        this.wd = new a.jg;
        this.wd.parent = this;
        this.wd.setTransform(448, 176);
        this.xd = new a.pg;
        this.xd.parent = this;
        this.xd.setTransform(512, 160);
        this.yd = new a.og;
        this.yd.parent = this;
        this.yd.setTransform(448, 160);
        this.zd = new a.kg;
        this.zd.parent =
            this;
        this.zd.setTransform(476, 0, 2.5, 1);
        this.Ad = new a.Qb;
        this.Ad.parent = this;
        this.Ad.setTransform(478, 160, 2.25, 1);
        this.Bd = new a.Qb;
        this.Bd.parent = this;
        this.Bd.setTransform(462, 28, 4.25, 8.5);
        this.Cd = new a.Qb;
        this.Cd.parent = this;
        this.Cd.setTransform(478, 16, 2.25, 1);
        this.Dd = new a.qg;
        this.Dd.parent = this;
        this.Dd.setTransform(476, 176, 2.5, 1);
        this.Ed = new a.ng;
        this.Ed.parent = this;
        this.Ed.setTransform(528, 20, 1, 9.375);
        this.Fd = new a.lg;
        this.Fd.parent = this;
        this.Fd.setTransform(512, 0);
        this.Gd = new a.jg;
        this.Gd.parent =
            this;
        this.Gd.setTransform(448, 0);
        this.Hd = new a.pg;
        this.Hd.parent = this;
        this.Hd.setTransform(240, 336);
        this.Id = new a.og;
        this.Id.parent = this;
        this.Id.setTransform(176, 336);
        this.Jd = new a.kg;
        this.Jd.parent = this;
        this.Jd.setTransform(204, 176, 2.5, 1);
        this.Kd = new a.Qb;
        this.Kd.parent = this;
        this.Kd.setTransform(206, 336, 2.25, 1);
        this.Ld = new a.Qb;
        this.Ld.parent = this;
        this.Ld.setTransform(190, 204, 4.25, 8.5);
        this.tc = new a.Qb;
        this.tc.parent = this;
        this.tc.setTransform(206, 192, 2.25, 1);
        this.uc = new a.qg;
        this.uc.parent = this;
        this.uc.setTransform(204, 352, 2.5, 1);
        this.Md = new a.ng;
        this.Md.parent = this;
        this.Md.setTransform(256, 196, 1, 9.375);
        this.vc = new a.lg;
        this.vc.parent = this;
        this.vc.setTransform(240, 176);
        this.Nd = new a.jg;
        this.Nd.parent = this;
        this.Nd.setTransform(176, 176);
        this.Od = new a.pg;
        this.Od.parent = this;
        this.Od.setTransform(240, 160);
        this.Pd = new a.og;
        this.Pd.parent = this;
        this.Pd.setTransform(176, 160);
        this.wc = new a.ig;
        this.wc.parent = this;
        this.wc.setTransform(296, 352, 9, 1);
        this.xc = new a.eg;
        this.xc.parent = this;
        this.xc.setTransform(448,
            196, 1, 9.375);
        this.yc = new a.dg;
        this.yc.parent = this;
        this.yc.setTransform(272, 196, 1, 9.375);
        this.Qd = new a.hg;
        this.Qd.parent = this;
        this.Qd.setTransform(432, 336);
        this.Gc = new a.fg;
        this.Gc.parent = this;
        this.Gc.setTransform(272, 336);
        this.Hc = new a.cg;
        this.Hc.parent = this;
        this.Hc.setTransform(432, 176);
        this.Ic = new a.$f;
        this.Ic.parent = this;
        this.Ic.setTransform(272, 176);
        this.Ee = new a.ig;
        this.Ee.parent = this;
        this.Ee.setTransform(296, 176, 9, 1);
        this.Fe = new a.eg;
        this.Fe.parent = this;
        this.Fe.setTransform(448, 20, 1, 9);
        this.Ge =
            new a.ag;
        this.Ge.parent = this;
        this.Ge.setTransform(296, 0, 9, 1);
        this.He = new a.dg;
        this.He.parent = this;
        this.He.setTransform(272, 20, 1, 9);
        this.Ie = new a.hg;
        this.Ie.parent = this;
        this.Ie.setTransform(432, 160);
        this.Je = new a.fg;
        this.Je.parent = this;
        this.Je.setTransform(272, 160);
        this.Ke = new a.cg;
        this.Ke.parent = this;
        this.Ke.setTransform(432, 0);
        this.Le = new a.$f;
        this.Le.parent = this;
        this.Le.setTransform(272, 0);
        this.Me = new a.ig;
        this.Me.parent = this;
        this.Me.setTransform(20, 352, 9.375, 1);
        this.Ne = new a.eg;
        this.Ne.parent =
            this;
        this.Ne.setTransform(176, 196, 1, 9.375);
        this.Oe = new a.dg;
        this.Oe.parent = this;
        this.Oe.setTransform(0, 196, 1, 9.375);
        this.Pe = new a.hg;
        this.Pe.parent = this;
        this.Pe.setTransform(160, 336);
        this.Qe = new a.fg;
        this.Qe.parent = this;
        this.Qe.setTransform(0, 336);
        this.Re = new a.cg;
        this.Re.parent = this;
        this.Re.setTransform(160, 176);
        this.Se = new a.$f;
        this.Se.parent = this;
        this.Se.setTransform(0, 176);
        this.Te = new a.kg;
        this.Te.parent = this;
        this.Te.setTransform(202, 0, 2.5, 1);
        this.Ue = new a.Qb;
        this.Ue.parent = this;
        this.Ue.setTransform(206,
            160, 2.25, 1);
        this.Ve = new a.Qb;
        this.Ve.parent = this;
        this.Ve.setTransform(190, 28, 4.25, 8.5);
        this.We = new a.Qb;
        this.We.parent = this;
        this.We.setTransform(206, 16, 2.25, 1);
        this.Xe = new a.qg;
        this.Xe.parent = this;
        this.Xe.setTransform(204, 176, 2.5, 1);
        this.Ye = new a.ng;
        this.Ye.parent = this;
        this.Ye.setTransform(256, 20, 1, 9.375);
        this.Ze = new a.ig;
        this.Ze.parent = this;
        this.Ze.setTransform(20, 176, 9.375, 1);
        this.$e = new a.eg;
        this.$e.parent = this;
        this.$e.setTransform(176, 20, 1, 9.375);
        this.Rd = new a.ag;
        this.Rd.parent = this;
        this.Rd.setTransform(20,
            0, 9.375, 1);
        this.af = new a.dg;
        this.af.parent = this;
        this.af.setTransform(0, 20, 1, 9.375);
        this.Sd = new a.hg;
        this.Sd.parent = this;
        this.Sd.setTransform(160, 160);
        this.Td = new a.fg;
        this.Td.parent = this;
        this.Td.setTransform(0, 160);
        this.Ud = new a.cg;
        this.Ud.parent = this;
        this.Ud.setTransform(160, 0);
        this.vf = new a.$f;
        this.vf.parent = this;
        this.Vd = new a.lg;
        this.Vd.parent = this;
        this.Vd.setTransform(240, 0);
        this.Wd = new a.jg;
        this.Wd.parent = this;
        this.Wd.setTransform(176, 0);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.Wd
                },
                {
                    t: this.Vd
                }, {
                    t: this.vf
                }, {
                    t: this.Ud
                }, {
                    t: this.Td
                }, {
                    t: this.Sd
                }, {
                    t: this.af
                }, {
                    t: this.Rd
                }, {
                    t: this.$e
                }, {
                    t: this.Ze
                }, {
                    t: this.Ye
                }, {
                    t: this.Xe
                }, {
                    t: this.We
                }, {
                    t: this.Ve
                }, {
                    t: this.Ue
                }, {
                    t: this.Te
                }, {
                    t: this.Se
                }, {
                    t: this.Re
                }, {
                    t: this.Qe
                }, {
                    t: this.Pe
                }, {
                    t: this.Oe
                }, {
                    t: this.Ne
                }, {
                    t: this.Me
                }, {
                    t: this.Le
                }, {
                    t: this.Ke
                }, {
                    t: this.Je
                }, {
                    t: this.Ie
                }, {
                    t: this.He
                }, {
                    t: this.Ge
                }, {
                    t: this.Fe
                }, {
                    t: this.Ee
                }, {
                    t: this.Ic
                }, {
                    t: this.Hc
                }, {
                    t: this.Gc
                }, {
                    t: this.Qd
                }, {
                    t: this.yc
                }, {
                    t: this.xc
                }, {
                    t: this.wc
                }, {
                    t: this.Pd
                }, {
                    t: this.Od
                }, {
                    t: this.Nd
                }, {
                    t: this.vc
                }, {
                    t: this.Md
                },
                {
                    t: this.uc
                }, {
                    t: this.tc
                }, {
                    t: this.Ld
                }, {
                    t: this.Kd
                }, {
                    t: this.Jd
                }, {
                    t: this.Id
                }, {
                    t: this.Hd
                }, {
                    t: this.Gd
                }, {
                    t: this.Fd
                }, {
                    t: this.Ed
                }, {
                    t: this.Dd
                }, {
                    t: this.Cd
                }, {
                    t: this.Bd
                }, {
                    t: this.Ad
                }, {
                    t: this.zd
                }, {
                    t: this.yd
                }, {
                    t: this.xd
                }, {
                    t: this.wd
                }, {
                    t: this.vd
                }, {
                    t: this.ud
                }, {
                    t: this.td
                }, {
                    t: this.rd
                }, {
                    t: this.qd
                }, {
                    t: this.pd
                }, {
                    t: this.od
                }, {
                    t: this.nd
                }, {
                    t: this.md
                }, {
                    t: this.ld
                }, {
                    t: this.kd
                }, {
                    t: this.jd
                }, {
                    t: this.hd
                }, {
                    t: this.gd
                }, {
                    t: this.fd
                }, {
                    t: this.df
                }, {
                    t: this.ue
                }, {
                    t: this.te
                }, {
                    t: this.se
                }, {
                    t: this.re
                }, {
                    t: this.qe
                }, {
                    t: this.pe
                }, {
                    t: this.oe
                }, {
                    t: this.Pc
                },
                {
                    t: this.ne
                }, {
                    t: this.me
                }, {
                    t: this.le
                }, {
                    t: this.ke
                }, {
                    t: this.je
                }, {
                    t: this.ie
                }, {
                    t: this.he
                }, {
                    t: this.ge
                }, {
                    t: this.cf
                }, {
                    t: this.fe
                }, {
                    t: this.ee
                }, {
                    t: this.ce
                }, {
                    t: this.be
                }, {
                    t: this.ae
                }, {
                    t: this.$d
                }, {
                    t: this.Zd
                }, {
                    t: this.Jc
                }, {
                    t: this.hc
                }, {
                    t: this.cc
                }, {
                    t: this.Sb
                }, {
                    t: this.ac
                }, {
                    t: this.Kb
                }, {
                    t: this.Ib
                }, {
                    t: this.Hb
                }, {
                    t: this.ra
                }, {
                    t: this.Gb
                }, {
                    t: this.zb
                }, {
                    t: this.Jb
                }, {
                    t: this.Fb
                }, {
                    t: this.yb
                }, {
                    t: this.xb
                }, {
                    t: this.Eb
                }, {
                    t: this.wb
                }, {
                    t: this.Ab
                }, {
                    t: this.Db
                }, {
                    t: this.Cb
                }, {
                    t: this.sb
                }, {
                    t: this.kb
                }, {
                    t: this.Da
                }, {
                    t: this.Bb
                }, {
                    t: this.pb
                }, {
                    t: this.tb
                },
                {
                    t: this.nb
                }, {
                    t: this.ab
                }, {
                    t: this.Qa
                }, {
                    t: this.Ka
                }, {
                    t: this.Aa
                }, {
                    t: this.Ha
                }, {
                    t: this.jb
                }, {
                    t: this.ib
                }, {
                    t: this.hb
                }, {
                    t: this.Ea
                }, {
                    t: this.$a
                }, {
                    t: this.wa
                }, {
                    t: this.cb
                }, {
                    t: this.gb
                }, {
                    t: this.Va
                }, {
                    t: this.Ua
                }, {
                    t: this.Ta
                }, {
                    t: this.Pa
                }, {
                    t: this.Za
                }, {
                    t: this.Sa
                }, {
                    t: this.Ya
                }, {
                    t: this.Xa
                }, {
                    t: this.Ca
                }, {
                    t: this.Ra
                }, {
                    t: this.Wa
                }, {
                    t: this.La
                }, {
                    t: this.Ma
                }, {
                    t: this.ua
                }, {
                    t: this.qa
                }, {
                    t: this.Fa
                }, {
                    t: this.Ba
                }, {
                    t: this.Ia
                }, {
                    t: this.Oa
                }, {
                    t: this.Ja
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                },
                {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 544, 368);
    (a.XB = function () {
        this.initialize("synched", 0, void 0, {});
        this.ba = new a.eb;
        this.ba.parent = this;
        this.ba.setTransform(416, 48);
        this.$ = new a.eb;
        this.$.parent = this;
        this.$.setTransform(416, 112);
        this.aa = new a.eb;
        this.aa.parent = this;
        this.aa.setTransform(288, 80);
        this.ca = new a.eb;
        this.ca.parent = this;
        this.ca.setTransform(384, 112);
        this.da = new a.eb;
        this.da.parent = this;
        this.da.setTransform(320, 144);
        this.fa = new a.eb;
        this.fa.parent = this;
        this.fa.setTransform(288, 144);
        this.ga = new a.eb;
        this.ga.parent = this;
        this.ga.setTransform(416, 224);
        this.ea = new a.eb;
        this.ea.parent = this;
        this.ea.setTransform(416, 288);
        this.ia = new a.eb;
        this.ia.parent = this;
        this.ia.setTransform(384, 288);
        this.ha = new a.eb;
        this.ha.parent = this;
        this.ha.setTransform(320, 320);
        this.ka = new a.eb;
        this.ka.parent = this;
        this.ka.setTransform(288, 320);
        this.ja = new a.eb;
        this.ja.parent = this;
        this.ja.setTransform(288,
            256);
        this.la = new a.nc;
        this.la.parent = this;
        this.la.setTransform(416, 320);
        this.ma = new a.nc;
        this.ma.parent = this;
        this.ma.setTransform(384, 320);
        this.oa = new a.nc;
        this.oa.parent = this;
        this.oa.setTransform(352, 320);
        this.Ja = new a.nc;
        this.Ja.parent = this;
        this.Ja.setTransform(352, 288);
        this.Oa = new a.nc;
        this.Oa.parent = this;
        this.Oa.setTransform(320, 288);
        this.Ia = new a.nc;
        this.Ia.parent = this;
        this.Ia.setTransform(288, 288);
        this.Ba = new a.nc;
        this.Ba.parent = this;
        this.Ba.setTransform(416, 256);
        this.Fa = new a.nc;
        this.Fa.parent =
            this;
        this.Fa.setTransform(384, 256);
        this.qa = new a.nc;
        this.qa.parent = this;
        this.qa.setTransform(352, 256);
        this.ua = new a.nc;
        this.ua.parent = this;
        this.ua.setTransform(320, 256);
        this.Ma = new a.nc;
        this.Ma.parent = this;
        this.Ma.setTransform(384, 224);
        this.La = new a.nc;
        this.La.parent = this;
        this.La.setTransform(352, 224);
        this.Wa = new a.nc;
        this.Wa.parent = this;
        this.Wa.setTransform(320, 224);
        this.Ra = new a.nc;
        this.Ra.parent = this;
        this.Ra.setTransform(288, 224);
        this.Ca = new a.nc;
        this.Ca.parent = this;
        this.Ca.setTransform(416, 192);
        this.Xa = new a.nc;
        this.Xa.parent = this;
        this.Xa.setTransform(384, 192);
        this.Ya = new a.nc;
        this.Ya.parent = this;
        this.Ya.setTransform(352, 192);
        this.Sa = new a.nc;
        this.Sa.parent = this;
        this.Sa.setTransform(320, 192);
        this.Za = new a.nc;
        this.Za.parent = this;
        this.Za.setTransform(288, 192);
        this.Pa = new a.lc;
        this.Pa.parent = this;
        this.Pa.setTransform(416, 144);
        this.Ta = new a.lc;
        this.Ta.parent = this;
        this.Ta.setTransform(384, 144);
        this.Ua = new a.lc;
        this.Ua.parent = this;
        this.Ua.setTransform(352, 144);
        this.Va = new a.lc;
        this.Va.parent =
            this;
        this.Va.setTransform(352, 112);
        this.gb = new a.lc;
        this.gb.parent = this;
        this.gb.setTransform(320, 112);
        this.cb = new a.lc;
        this.cb.parent = this;
        this.cb.setTransform(288, 112);
        this.wa = new a.lc;
        this.wa.parent = this;
        this.wa.setTransform(416, 80);
        this.$a = new a.lc;
        this.$a.parent = this;
        this.$a.setTransform(384, 80);
        this.Ea = new a.lc;
        this.Ea.parent = this;
        this.Ea.setTransform(352, 80);
        this.hb = new a.lc;
        this.hb.parent = this;
        this.hb.setTransform(320, 80);
        this.ib = new a.lc;
        this.ib.parent = this;
        this.ib.setTransform(384, 48);
        this.jb =
            new a.lc;
        this.jb.parent = this;
        this.jb.setTransform(352, 48);
        this.Ha = new a.lc;
        this.Ha.parent = this;
        this.Ha.setTransform(320, 48);
        this.Aa = new a.lc;
        this.Aa.parent = this;
        this.Aa.setTransform(288, 48);
        this.Ka = new a.lc;
        this.Ka.parent = this;
        this.Ka.setTransform(416, 16);
        this.Qa = new a.lc;
        this.Qa.parent = this;
        this.Qa.setTransform(384, 16);
        this.ab = new a.lc;
        this.ab.parent = this;
        this.ab.setTransform(352, 16);
        this.nb = new a.lc;
        this.nb.parent = this;
        this.nb.setTransform(320, 16);
        this.tb = new a.lc;
        this.tb.parent = this;
        this.tb.setTransform(288,
            16);
        this.pb = new a.eb;
        this.pb.parent = this;
        this.pb.setTransform(16, 320);
        this.Bb = new a.eb;
        this.Bb.parent = this;
        this.Bb.setTransform(48, 320);
        this.Da = new a.eb;
        this.Da.parent = this;
        this.Da.setTransform(144, 288);
        this.kb = new a.eb;
        this.kb.parent = this;
        this.kb.setTransform(112, 288);
        this.sb = new a.eb;
        this.sb.parent = this;
        this.sb.setTransform(16, 256);
        this.Cb = new a.eb;
        this.Cb.parent = this;
        this.Cb.setTransform(144, 224);
        this.Db = new a.mc;
        this.Db.parent = this;
        this.Db.setTransform(144, 320);
        this.Ab = new a.mc;
        this.Ab.parent =
            this;
        this.Ab.setTransform(112, 320);
        this.wb = new a.mc;
        this.wb.parent = this;
        this.wb.setTransform(80, 320);
        this.Eb = new a.mc;
        this.Eb.parent = this;
        this.Eb.setTransform(80, 288);
        this.xb = new a.mc;
        this.xb.parent = this;
        this.xb.setTransform(48, 288);
        this.yb = new a.mc;
        this.yb.parent = this;
        this.yb.setTransform(16, 288);
        this.Fb = new a.mc;
        this.Fb.parent = this;
        this.Fb.setTransform(144, 256);
        this.Jb = new a.mc;
        this.Jb.parent = this;
        this.Jb.setTransform(112, 256);
        this.zb = new a.mc;
        this.zb.parent = this;
        this.zb.setTransform(80, 256);
        this.Gb =
            new a.mc;
        this.Gb.parent = this;
        this.Gb.setTransform(48, 256);
        this.ra = new a.mc;
        this.ra.parent = this;
        this.ra.setTransform(112, 224);
        this.Hb = new a.mc;
        this.Hb.parent = this;
        this.Hb.setTransform(80, 224);
        this.Ib = new a.mc;
        this.Ib.parent = this;
        this.Ib.setTransform(48, 224);
        this.Kb = new a.mc;
        this.Kb.parent = this;
        this.Kb.setTransform(16, 224);
        this.ac = new a.mc;
        this.ac.parent = this;
        this.ac.setTransform(144, 192);
        this.Sb = new a.mc;
        this.Sb.parent = this;
        this.Sb.setTransform(112, 192);
        this.cc = new a.mc;
        this.cc.parent = this;
        this.cc.setTransform(80,
            192);
        this.hc = new a.mc;
        this.hc.parent = this;
        this.hc.setTransform(48, 192);
        this.Jc = new a.mc;
        this.Jc.parent = this;
        this.Jc.setTransform(16, 192);
        this.Zd = new a.eb;
        this.Zd.parent = this;
        this.Zd.setTransform(48, 144);
        this.$d = new a.eb;
        this.$d.parent = this;
        this.$d.setTransform(144, 112);
        this.ae = new a.eb;
        this.ae.parent = this;
        this.ae.setTransform(112, 112);
        this.be = new a.eb;
        this.be.parent = this;
        this.be.setTransform(16, 80);
        this.ce = new a.eb;
        this.ce.parent = this;
        this.ce.setTransform(144, 48);
        this.ee = new a.eb;
        this.ee.parent = this;
        this.ee.setTransform(16, 144);
        this.fe = new a.kc;
        this.fe.parent = this;
        this.fe.setTransform(144, 144);
        this.cf = new a.kc;
        this.cf.parent = this;
        this.cf.setTransform(112, 144);
        this.ge = new a.kc;
        this.ge.parent = this;
        this.ge.setTransform(80, 144);
        this.he = new a.kc;
        this.he.parent = this;
        this.he.setTransform(80, 112);
        this.ie = new a.kc;
        this.ie.parent = this;
        this.ie.setTransform(48, 112);
        this.je = new a.kc;
        this.je.parent = this;
        this.je.setTransform(16, 112);
        this.ke = new a.kc;
        this.ke.parent = this;
        this.ke.setTransform(144, 80);
        this.le =
            new a.kc;
        this.le.parent = this;
        this.le.setTransform(112, 80);
        this.me = new a.kc;
        this.me.parent = this;
        this.me.setTransform(80, 80);
        this.ne = new a.kc;
        this.ne.parent = this;
        this.ne.setTransform(48, 80);
        this.Pc = new a.kc;
        this.Pc.parent = this;
        this.Pc.setTransform(112, 48);
        this.oe = new a.kc;
        this.oe.parent = this;
        this.oe.setTransform(80, 48);
        this.pe = new a.kc;
        this.pe.parent = this;
        this.pe.setTransform(48, 48);
        this.qe = new a.kc;
        this.qe.parent = this;
        this.qe.setTransform(16, 48);
        this.re = new a.kc;
        this.re.parent = this;
        this.re.setTransform(144,
            16);
        this.se = new a.kc;
        this.se.parent = this;
        this.se.setTransform(112, 16);
        this.te = new a.kc;
        this.te.parent = this;
        this.te.setTransform(80, 16);
        this.ue = new a.kc;
        this.ue.parent = this;
        this.ue.setTransform(48, 16);
        this.df = new a.kc;
        this.df.parent = this;
        this.df.setTransform(16, 16);
        this.fd = new a.mg;
        this.fd.parent = this;
        this.fd.setTransform(176, 196, 1, 9.375);
        this.gd = new a.mg;
        this.gd.parent = this;
        this.gd.setTransform(176, 20, 1, 9.375);
        this.hd = new a.ag;
        this.hd.parent = this;
        this.hd.setTransform(296, 176, 9, 1);
        this.jd = new a.ag;
        this.jd.parent = this;
        this.jd.setTransform(22, 176, 9, 1);
        this.kd = new a.mg;
        this.kd.parent = this;
        this.kd.setTransform(448, 20, 1, 9.375);
        this.ld = new a.mg;
        this.ld.parent = this;
        this.ld.setTransform(448, 196, 1, 9.375);
        this.md = new a.pg;
        this.md.parent = this;
        this.md.setTransform(512, 336);
        this.nd = new a.og;
        this.nd.parent = this;
        this.nd.setTransform(448, 336);
        this.od = new a.kg;
        this.od.parent = this;
        this.od.setTransform(476, 176, 2.5, 1);
        this.pd = new a.Qb;
        this.pd.parent = this;
        this.pd.setTransform(476, 336, 2.5, 1);
        this.qd = new a.Qb;
        this.qd.parent =
            this;
        this.qd.setTransform(462, 204, 4.25, 8.5);
        this.rd = new a.Qb;
        this.rd.parent = this;
        this.rd.setTransform(478, 192, 2.25, 1);
        this.td = new a.qg;
        this.td.parent = this;
        this.td.setTransform(476, 352, 2.5, 1);
        this.ud = new a.ng;
        this.ud.parent = this;
        this.ud.setTransform(528, 196, 1, 9.375);
        this.vd = new a.lg;
        this.vd.parent = this;
        this.vd.setTransform(512, 176);
        this.wd = new a.jg;
        this.wd.parent = this;
        this.wd.setTransform(448, 176);
        this.xd = new a.pg;
        this.xd.parent = this;
        this.xd.setTransform(512, 160);
        this.yd = new a.og;
        this.yd.parent = this;
        this.yd.setTransform(448, 160);
        this.zd = new a.kg;
        this.zd.parent = this;
        this.zd.setTransform(476, 0, 2.5, 1);
        this.Ad = new a.Qb;
        this.Ad.parent = this;
        this.Ad.setTransform(478, 160, 2.25, 1);
        this.Bd = new a.Qb;
        this.Bd.parent = this;
        this.Bd.setTransform(462, 28, 4.25, 8.5);
        this.Cd = new a.Qb;
        this.Cd.parent = this;
        this.Cd.setTransform(478, 16, 2.25, 1);
        this.Dd = new a.qg;
        this.Dd.parent = this;
        this.Dd.setTransform(476, 176, 2.5, 1);
        this.Ed = new a.ng;
        this.Ed.parent = this;
        this.Ed.setTransform(528, 20, 1, 9.375);
        this.Fd = new a.lg;
        this.Fd.parent =
            this;
        this.Fd.setTransform(512, 0);
        this.Gd = new a.jg;
        this.Gd.parent = this;
        this.Gd.setTransform(448, 0);
        this.Hd = new a.pg;
        this.Hd.parent = this;
        this.Hd.setTransform(240, 336);
        this.Id = new a.og;
        this.Id.parent = this;
        this.Id.setTransform(176, 336);
        this.Jd = new a.kg;
        this.Jd.parent = this;
        this.Jd.setTransform(204, 176, 2.5, 1);
        this.Kd = new a.Qb;
        this.Kd.parent = this;
        this.Kd.setTransform(206, 336, 2.25, 1);
        this.Ld = new a.Qb;
        this.Ld.parent = this;
        this.Ld.setTransform(190, 204, 4.25, 8.5);
        this.tc = new a.Qb;
        this.tc.parent = this;
        this.tc.setTransform(206,
            192, 2.25, 1);
        this.uc = new a.qg;
        this.uc.parent = this;
        this.uc.setTransform(204, 352, 2.5, 1);
        this.Md = new a.ng;
        this.Md.parent = this;
        this.Md.setTransform(256, 196, 1, 9.375);
        this.vc = new a.lg;
        this.vc.parent = this;
        this.vc.setTransform(240, 176);
        this.Nd = new a.jg;
        this.Nd.parent = this;
        this.Nd.setTransform(176, 176);
        this.Od = new a.pg;
        this.Od.parent = this;
        this.Od.setTransform(240, 160);
        this.Pd = new a.og;
        this.Pd.parent = this;
        this.Pd.setTransform(176, 160);
        this.wc = new a.ig;
        this.wc.parent = this;
        this.wc.setTransform(296, 352, 9, 1);
        this.xc =
            new a.eg;
        this.xc.parent = this;
        this.xc.setTransform(448, 206, 1, 8.25);
        this.yc = new a.dg;
        this.yc.parent = this;
        this.yc.setTransform(272, 196, 1, 9.375);
        this.Qd = new a.hg;
        this.Qd.parent = this;
        this.Qd.setTransform(432, 336);
        this.Gc = new a.fg;
        this.Gc.parent = this;
        this.Gc.setTransform(272, 336);
        this.Hc = new a.cg;
        this.Hc.parent = this;
        this.Hc.setTransform(432, 176);
        this.Ic = new a.$f;
        this.Ic.parent = this;
        this.Ic.setTransform(272, 176);
        this.Ee = new a.ig;
        this.Ee.parent = this;
        this.Ee.setTransform(296, 176, 9, 1);
        this.Fe = new a.eg;
        this.Fe.parent =
            this;
        this.Fe.setTransform(448, 20, 1, 9.375);
        this.Ge = new a.ag;
        this.Ge.parent = this;
        this.Ge.setTransform(296, 0, 9, 1);
        this.He = new a.dg;
        this.He.parent = this;
        this.He.setTransform(272, 20, 1, 9.375);
        this.Ie = new a.hg;
        this.Ie.parent = this;
        this.Ie.setTransform(432, 160);
        this.Je = new a.fg;
        this.Je.parent = this;
        this.Je.setTransform(272, 160);
        this.Ke = new a.cg;
        this.Ke.parent = this;
        this.Ke.setTransform(432, 0);
        this.Le = new a.$f;
        this.Le.parent = this;
        this.Le.setTransform(272, 0);
        this.Me = new a.ig;
        this.Me.parent = this;
        this.Me.setTransform(24,
            352, 9, 1);
        this.Ne = new a.eg;
        this.Ne.parent = this;
        this.Ne.setTransform(176, 196, 1, 9.375);
        this.Oe = new a.dg;
        this.Oe.parent = this;
        this.Oe.setTransform(0, 196, 1, 9.375);
        this.Pe = new a.hg;
        this.Pe.parent = this;
        this.Pe.setTransform(160, 336);
        this.Qe = new a.fg;
        this.Qe.parent = this;
        this.Qe.setTransform(0, 336);
        this.Re = new a.cg;
        this.Re.parent = this;
        this.Re.setTransform(160, 176);
        this.Se = new a.$f;
        this.Se.parent = this;
        this.Se.setTransform(0, 176);
        this.Te = new a.kg;
        this.Te.parent = this;
        this.Te.setTransform(202, 0, 2.5, 1);
        this.Ue = new a.Qb;
        this.Ue.parent = this;
        this.Ue.setTransform(206, 160, 2.25, 1);
        this.Ve = new a.Qb;
        this.Ve.parent = this;
        this.Ve.setTransform(190, 28, 4.25, 8.5);
        this.We = new a.Qb;
        this.We.parent = this;
        this.We.setTransform(206, 16, 2.25, 1);
        this.Xe = new a.qg;
        this.Xe.parent = this;
        this.Xe.setTransform(204, 176, 2.5, 1);
        this.Ye = new a.ng;
        this.Ye.parent = this;
        this.Ye.setTransform(256, 20, 1, 9.375);
        this.Ze = new a.ig;
        this.Ze.parent = this;
        this.Ze.setTransform(22, 176, 9, 1);
        this.$e = new a.eg;
        this.$e.parent = this;
        this.$e.setTransform(176, 20, 1, 9.375);
        this.Rd =
            new a.ag;
        this.Rd.parent = this;
        this.Rd.setTransform(22, 0, 9.375, 1);
        this.af = new a.dg;
        this.af.parent = this;
        this.af.setTransform(0, 22, 1, 9.375);
        this.Sd = new a.hg;
        this.Sd.parent = this;
        this.Sd.setTransform(160, 160);
        this.Td = new a.fg;
        this.Td.parent = this;
        this.Td.setTransform(0, 160);
        this.Ud = new a.cg;
        this.Ud.parent = this;
        this.Ud.setTransform(160, 0);
        this.vf = new a.$f;
        this.vf.parent = this;
        this.Vd = new a.lg;
        this.Vd.parent = this;
        this.Vd.setTransform(240, 0);
        this.Wd = new a.jg;
        this.Wd.parent = this;
        this.Wd.setTransform(176, 0);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.Wd
                },
                {
                    t: this.Vd
                }, {
                    t: this.vf
                }, {
                    t: this.Ud
                }, {
                    t: this.Td
                }, {
                    t: this.Sd
                }, {
                    t: this.af
                }, {
                    t: this.Rd
                }, {
                    t: this.$e
                }, {
                    t: this.Ze
                }, {
                    t: this.Ye
                }, {
                    t: this.Xe
                }, {
                    t: this.We
                }, {
                    t: this.Ve
                }, {
                    t: this.Ue
                }, {
                    t: this.Te
                }, {
                    t: this.Se
                }, {
                    t: this.Re
                }, {
                    t: this.Qe
                }, {
                    t: this.Pe
                }, {
                    t: this.Oe
                }, {
                    t: this.Ne
                }, {
                    t: this.Me
                }, {
                    t: this.Le
                }, {
                    t: this.Ke
                }, {
                    t: this.Je
                }, {
                    t: this.Ie
                }, {
                    t: this.He
                }, {
                    t: this.Ge
                }, {
                    t: this.Fe
                }, {
                    t: this.Ee
                }, {
                    t: this.Ic
                }, {
                    t: this.Hc
                }, {
                    t: this.Gc
                }, {
                    t: this.Qd
                }, {
                    t: this.yc
                }, {
                    t: this.xc
                }, {
                    t: this.wc
                }, {
                    t: this.Pd
                }, {
                    t: this.Od
                }, {
                    t: this.Nd
                }, {
                    t: this.vc
                }, {
                    t: this.Md
                },
                {
                    t: this.uc
                }, {
                    t: this.tc
                }, {
                    t: this.Ld
                }, {
                    t: this.Kd
                }, {
                    t: this.Jd
                }, {
                    t: this.Id
                }, {
                    t: this.Hd
                }, {
                    t: this.Gd
                }, {
                    t: this.Fd
                }, {
                    t: this.Ed
                }, {
                    t: this.Dd
                }, {
                    t: this.Cd
                }, {
                    t: this.Bd
                }, {
                    t: this.Ad
                }, {
                    t: this.zd
                }, {
                    t: this.yd
                }, {
                    t: this.xd
                }, {
                    t: this.wd
                }, {
                    t: this.vd
                }, {
                    t: this.ud
                }, {
                    t: this.td
                }, {
                    t: this.rd
                }, {
                    t: this.qd
                }, {
                    t: this.pd
                }, {
                    t: this.od
                }, {
                    t: this.nd
                }, {
                    t: this.md
                }, {
                    t: this.ld
                }, {
                    t: this.kd
                }, {
                    t: this.jd
                }, {
                    t: this.hd
                }, {
                    t: this.gd
                }, {
                    t: this.fd
                }, {
                    t: this.df
                }, {
                    t: this.ue
                }, {
                    t: this.te
                }, {
                    t: this.se
                }, {
                    t: this.re
                }, {
                    t: this.qe
                }, {
                    t: this.pe
                }, {
                    t: this.oe
                }, {
                    t: this.Pc
                },
                {
                    t: this.ne
                }, {
                    t: this.me
                }, {
                    t: this.le
                }, {
                    t: this.ke
                }, {
                    t: this.je
                }, {
                    t: this.ie
                }, {
                    t: this.he
                }, {
                    t: this.ge
                }, {
                    t: this.cf
                }, {
                    t: this.fe
                }, {
                    t: this.ee
                }, {
                    t: this.ce
                }, {
                    t: this.be
                }, {
                    t: this.ae
                }, {
                    t: this.$d
                }, {
                    t: this.Zd
                }, {
                    t: this.Jc
                }, {
                    t: this.hc
                }, {
                    t: this.cc
                }, {
                    t: this.Sb
                }, {
                    t: this.ac
                }, {
                    t: this.Kb
                }, {
                    t: this.Ib
                }, {
                    t: this.Hb
                }, {
                    t: this.ra
                }, {
                    t: this.Gb
                }, {
                    t: this.zb
                }, {
                    t: this.Jb
                }, {
                    t: this.Fb
                }, {
                    t: this.yb
                }, {
                    t: this.xb
                }, {
                    t: this.Eb
                }, {
                    t: this.wb
                }, {
                    t: this.Ab
                }, {
                    t: this.Db
                }, {
                    t: this.Cb
                }, {
                    t: this.sb
                }, {
                    t: this.kb
                }, {
                    t: this.Da
                }, {
                    t: this.Bb
                }, {
                    t: this.pb
                }, {
                    t: this.tb
                },
                {
                    t: this.nb
                }, {
                    t: this.ab
                }, {
                    t: this.Qa
                }, {
                    t: this.Ka
                }, {
                    t: this.Aa
                }, {
                    t: this.Ha
                }, {
                    t: this.jb
                }, {
                    t: this.ib
                }, {
                    t: this.hb
                }, {
                    t: this.Ea
                }, {
                    t: this.$a
                }, {
                    t: this.wa
                }, {
                    t: this.cb
                }, {
                    t: this.gb
                }, {
                    t: this.Va
                }, {
                    t: this.Ua
                }, {
                    t: this.Ta
                }, {
                    t: this.Pa
                }, {
                    t: this.Za
                }, {
                    t: this.Sa
                }, {
                    t: this.Ya
                }, {
                    t: this.Xa
                }, {
                    t: this.Ca
                }, {
                    t: this.Ra
                }, {
                    t: this.Wa
                }, {
                    t: this.La
                }, {
                    t: this.Ma
                }, {
                    t: this.ua
                }, {
                    t: this.qa
                }, {
                    t: this.Fa
                }, {
                    t: this.Ba
                }, {
                    t: this.Ia
                }, {
                    t: this.Oa
                }, {
                    t: this.Ja
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                },
                {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 544, 368);
    (a.wp = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.YD;
        this.ba.parent = this;
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype = n(a.wp, new e.Rectangle(0, 0, 160, 80), null);
    (a.Tf = function (b, f, h) {
        this.initialize(b, f, h, {
            play: 0
        });
        this.Hm = function () {
            this.stop()
        };
        this.timeline.addTween(e.Tween.get(this).wait(63).call(this.Hm).wait(1));
        this.ba = new a.HD;
        this.ba.parent = this;
        this.$ = new a.ID;
        this.$.parent = this;
        this.aa = new a.JD;
        this.aa.parent = this;
        this.ca = new a.KD;
        this.ca.parent = this;
        this.da = new a.LD;
        this.da.parent = this;
        this.fa = new a.MD;
        this.fa.parent = this;
        this.ga = new a.ND;
        this.ga.parent = this;
        this.ea = new a.OD;
        this.ea.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.aa
            }]
        }, 4).to({
            state: [{
                t: this.ca
            }]
        }, 4).to({
            state: [{
                t: this.da
            }]
        }, 4).to({
            state: [{
                t: this.fa
            }]
        }, 4).to({
                state: [{
                    t: this.ga
                }]
            },
            4).to({
            state: [{
                t: this.ea
            }]
        }, 4).to({
            state: [{
                t: this.ea
            }]
        }, 4).to({
            state: [{
                t: this.ea
            }]
        }, 4).to({
            state: [{
                t: this.ga
            }]
        }, 4).to({
            state: [{
                t: this.fa
            }]
        }, 4).to({
            state: [{
                t: this.da
            }]
        }, 4).to({
            state: [{
                t: this.aa
            }]
        }, 4).to({
            state: [{
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }]
        }, 4).wait(4))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 48, 48);
    (a.Wi = function () {
        this.initialize(void 0, void 0, void 0, {
            swing: 0,
            pull: 68
        });
        this.eD = function () {
            this.gotoAndPlay("swing")
        };
        this.timeline.addTween(e.Tween.get(this).wait(67).call(this.eD).wait(4));
        this.ba = new a.Vz;
        this.ba.parent = this;
        this.$ = new a.Wz;
        this.$.parent = this;
        this.aa = new a.Xz;
        this.aa.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ba
            }]
        }, 68).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).wait(1));
        this.ca = new a.zw;
        this.ca.parent = this;
        this.ca.setTransform(0, 48);
        this.da = new a.Aw;
        this.da.parent = this;
        this.da.setTransform(0, 48);
        this.fa = new a.Bw;
        this.fa.parent = this;
        this.fa.setTransform(0, 48);
        this.ga = new a.Cw;
        this.ga.parent = this;
        this.ga.setTransform(0,
            48);
        this.ea = new a.Dw;
        this.ea.parent = this;
        this.ea.setTransform(0, 48);
        this.ia = new a.Ew;
        this.ia.parent = this;
        this.ia.setTransform(0, 48);
        this.ha = new a.Fw;
        this.ha.parent = this;
        this.ha.setTransform(0, 48);
        this.ka = new a.Gw;
        this.ka.parent = this;
        this.ka.setTransform(0, 48);
        this.ja = new a.Hw;
        this.ja.parent = this;
        this.ja.setTransform(0, 48);
        this.la = new a.xw;
        this.la.parent = this;
        this.la.setTransform(0, 48);
        this.ma = new a.yw;
        this.ma.parent = this;
        this.ma.setTransform(0, 48);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ca
            }]
        }).to({
                state: [{
                    t: this.da
                }]
            },
            4).to({
            state: [{
                t: this.fa
            }]
        }, 4).to({
            state: [{
                t: this.ga
            }]
        }, 4).to({
            state: [{
                t: this.ea
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }]
        }, 4).to({
            state: [{
                t: this.ha
            }]
        }, 4).to({
            state: [{
                t: this.ka
            }]
        }, 4).to({
            state: [{
                t: this.ja
            }]
        }, 4).to({
            state: [{
                t: this.ka
            }]
        }, 4).to({
            state: [{
                t: this.ha
            }]
        }, 4).to({
            state: [{
                t: this.ia
            }]
        }, 4).to({
            state: [{
                t: this.ea
            }]
        }, 4).to({
            state: [{
                t: this.ga
            }]
        }, 4).to({
            state: [{
                t: this.fa
            }]
        }, 4).to({
            state: [{
                t: this.da
            }]
        }, 4).to({
            state: [{
                t: this.ca
            }]
        }, 4).to({
            state: [{
                t: this.ea
            }]
        }, 4).to({
            state: [{
                t: this.la
            }]
        }, 1).to({
                state: [{
                    t: this.ma
                }]
            },
            1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 16, 400);
    (a.Tc = function (b, f, h) {
        this.initialize(b, f, h, {
            anvil: 0,
            banan: 4,
            brick: 8,
            coconut: 12,
            hide: 16
        });
        this.si = function () {
            this.gotoAndPlay("anvil")
        };
        this.Im = function () {
            this.gotoAndPlay("banan")
        };
        this.Em = function () {
            this.gotoAndPlay("brick")
        };
        this.nC = function () {
            this.gotoAndPlay("coconut")
        };
        this.timeline.addTween(e.Tween.get(this).wait(3).call(this.si).wait(4).call(this.Im).wait(4).call(this.Em).wait(4).call(this.nC).wait(2));
        this.ba =
            new a.Or;
        this.ba.parent = this;
        this.ba.setTransform(-8, 64);
        this.$ = new a.Qz;
        this.$.parent = this;
        this.$.setTransform(24, 0);
        this.aa = new a.Rz;
        this.aa.parent = this;
        this.aa.setTransform(24, 0);
        this.ca = new a.Sz;
        this.ca.parent = this;
        this.ca.setTransform(24, 0);
        this.da = new a.Tz;
        this.da.parent = this;
        this.da.setTransform(24, 0);
        this.fa = new a.ez;
        this.fa.parent = this;
        this.fa.setTransform(0, 64);
        this.ga = new a.lz;
        this.ga.parent = this;
        this.ga.setTransform(-8, 64);
        this.ea = new a.Pz;
        this.ea.parent = this;
        this.ea.setTransform(-8, 64);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$,
                p: {
                    x: 24
                }
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.aa,
                p: {
                    x: 24
                }
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.ca,
                p: {
                    x: 24
                }
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.da,
                p: {
                    x: 24
                }
            }, {
                t: this.ba
            }]
        }, 1).to({
            state: [{
                t: this.$,
                p: {
                    x: 32
                }
            }, {
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.aa,
                p: {
                    x: 32
                }
            }, {
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.ca,
                p: {
                    x: 32
                }
            }, {
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.da,
                p: {
                    x: 32
                }
            }, {
                t: this.fa
            }]
        }, 1).to({
            state: [{
                t: this.$,
                p: {
                    x: 24
                }
            }, {
                t: this.ga
            }]
        }, 1).to({
            state: [{
                    t: this.aa,
                    p: {
                        x: 24
                    }
                },
                {
                    t: this.ga
                }
            ]
        }, 1).to({
            state: [{
                t: this.ca,
                p: {
                    x: 24
                }
            }, {
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.da,
                p: {
                    x: 24
                }
            }, {
                t: this.ga
            }]
        }, 1).to({
            state: [{
                t: this.$,
                p: {
                    x: 24
                }
            }, {
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.aa,
                p: {
                    x: 24
                }
            }, {
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.ca,
                p: {
                    x: 24
                }
            }, {
                t: this.ea
            }]
        }, 1).to({
            state: [{
                t: this.da,
                p: {
                    x: 24
                }
            }, {
                t: this.ea
            }]
        }, 1).to({
            state: []
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(-8, 0, 96, 112);
    (a.Cq = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.Zc;
        this.ba.parent = this;
        this.timeline.addTween(e.Tween.get(this.ba).wait(1))
    }).prototype =
        n(a.Cq, new e.Rectangle(0, 0, 9, 11), null);
    (a.Am = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ba = new a.jm;
        this.ba.parent = this;
        this.ba.setTransform(0, 336);
        this.$ = new a.rp;
        this.$.parent = this;
        this.$.setTransform(32, 80);
        this.aa = new a.Oo;
        this.aa.parent = this;
        this.aa.setTransform(464, 320);
        this.ca = new a.ir;
        this.ca.parent = this;
        this.ca.setTransform(416, 224);
        this.da = new a.Ho;
        this.da.parent = this;
        this.da.setTransform(0, 288);
        this.fa = new a.jr;
        this.fa.parent = this;
        this.fa.setTransform(64, 288);
        this.ga = new a.kr;
        this.ga.parent =
            this;
        this.ga.setTransform(144, 288);
        this.ea = new a.lr;
        this.ea.parent = this;
        this.ea.setTransform(224, 288);
        this.ia = new a.mr;
        this.ia.parent = this;
        this.ia.setTransform(304, 288);
        this.ha = new a.nr;
        this.ha.parent = this;
        this.ha.setTransform(384, 288);
        this.ka = new a.qr;
        this.ka.parent = this;
        this.ka.setTransform(464, 288);
        this.ja = new a.sr;
        this.ja.parent = this;
        this.ja.setTransform(512, 224);
        this.la = new a.Po;
        this.la.parent = this;
        this.la.setTransform(544, 288);
        this.ma = new a.qm;
        this.ma.parent = this;
        this.ma.setTransform(544, 336);
        this.oa = new a.pm;
        this.oa.parent = this;
        this.oa.setTransform(464, 336);
        this.Ja = new a.om;
        this.Ja.parent = this;
        this.Ja.setTransform(384, 336);
        this.Oa = new a.nm;
        this.Oa.parent = this;
        this.Oa.setTransform(304, 336);
        this.Ia = new a.mm;
        this.Ia.parent = this;
        this.Ia.setTransform(224, 336);
        this.Ba = new a.lm;
        this.Ba.parent = this;
        this.Ba.setTransform(144, 336);
        this.Fa = new a.cr;
        this.Fa.parent = this;
        this.Fa.setTransform(32, 224);
        this.qa = new a.er;
        this.qa.parent = this;
        this.qa.setTransform(96, 224);
        this.ua = new a.fr;
        this.ua.parent = this;
        this.ua.setTransform(176, 224);
        this.Ma = new a.gr;
        this.Ma.parent = this;
        this.Ma.setTransform(256, 224);
        this.La = new a.hr;
        this.La.parent = this;
        this.La.setTransform(336, 224);
        this.Wa = new a.sp;
        this.Wa.parent = this;
        this.Wa.setTransform(32, 0);
        this.Ra = new a.Cm;
        this.Ra.parent = this;
        this.Ra.setTransform(608, 0);
        this.Ca = new a.Qo;
        this.Ca.parent = this;
        this.Ca.setTransform(544, 320);
        this.Xa = new a.No;
        this.Xa.parent = this;
        this.Xa.setTransform(384, 320);
        this.Ya = new a.Mo;
        this.Ya.parent = this;
        this.Ya.setTransform(304, 320);
        this.Sa =
            new a.Lo;
        this.Sa.parent = this;
        this.Sa.setTransform(224, 320);
        this.Za = new a.Ko;
        this.Za.parent = this;
        this.Za.setTransform(144, 320);
        this.Pa = new a.Bm;
        this.Pa.parent = this;
        this.Ta = new a.Io;
        this.Ta.parent = this;
        this.Ta.setTransform(0, 320);
        this.Ua = new a.Jo;
        this.Ua.parent = this;
        this.Ua.setTransform(64, 320);
        this.Va = new a.km;
        this.Va.parent = this;
        this.Va.setTransform(64, 336);
        this.shape = new e.Shape;
        this.shape.graphics.f("#005725").s().p("AsfDyIAAnjIY/AEIAAHfg");
        this.shape.setTransform(512, 375.8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.shape
                },
                {
                    t: this.Va
                }, {
                    t: this.Ua
                }, {
                    t: this.Ta
                }, {
                    t: this.Pa
                }, {
                    t: this.Za
                }, {
                    t: this.Sa
                }, {
                    t: this.Ya
                }, {
                    t: this.Xa
                }, {
                    t: this.Ca
                }, {
                    t: this.Ra
                }, {
                    t: this.Wa
                }, {
                    t: this.La
                }, {
                    t: this.Ma
                }, {
                    t: this.ua
                }, {
                    t: this.qa
                }, {
                    t: this.Fa
                }, {
                    t: this.Ba
                }, {
                    t: this.Ia
                }, {
                    t: this.Oa
                }, {
                    t: this.Ja
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }).wait(1))
    }).prototype = n(a.Am, new e.Rectangle(0, 0, 640, 416), null);
    (a.jw = function () {
        this.initialize(void 0,
            void 0, void 0, {
                blink: 0,
                blinkF: 24,
                "rotate-cw": 48,
                "rotate-cwF": 72,
                "rotate-ccw": 100,
                "rotate-ccwF": 124,
                blow: 152,
                blowF: 176,
                stars: 200,
                pullF: 216,
                pull: 256,
                tongue: 296,
                tongueF: 316,
                swal: 336,
                swalF: 356
            });
        this.ri = function () {
            this.stop()
        };
        this.VC = function () {
            this.stop()
        };
        this.Jm = function () {
            this.stop()
        };
        this.Km = function () {
            this.stop()
        };
        this.hC = function () {
            this.stop()
        };
        this.oC = function () {
            this.stop()
        };
        this.sC = function () {
            this.stop()
        };
        this.Fm = function () {
            this.stop()
        };
        this.yC = function () {
            this.gotoAndPlay("stars")
        };
        this.BC =
            function () {
                this.stop()
            };
        this.HC = function () {
            this.stop()
        };
        this.KC = function () {
            this.stop()
        };
        this.NC = function () {
            this.stop()
        };
        this.PC = function () {
            this.stop()
        };
        this.RC = function () {
            this.stop()
        };
        this.timeline.addTween(e.Tween.get(this).wait(23).call(this.ri).wait(24).call(this.VC).wait(24).call(this.Jm).wait(28).call(this.Km).wait(24).call(this.hC).wait(28).call(this.oC).wait(24).call(this.sC).wait(24).call(this.Fm).wait(16).call(this.yC).wait(40).call(this.BC).wait(40).call(this.HC).wait(20).call(this.KC).wait(20).call(this.NC).wait(20).call(this.PC).wait(20).call(this.RC).wait(1));
        this.ba = new a.Qr;
        this.ba.parent = this;
        this.ba.setTransform(64, 32);
        this.$ = new a.Pr;
        this.$.parent = this;
        this.$.setTransform(32, 32);
        this.aa = new a.Rr;
        this.aa.parent = this;
        this.aa.setTransform(32, 80);
        this.ca = new a.Sr;
        this.ca.parent = this;
        this.ca.setTransform(16, 96);
        this.da = new a.Tr;
        this.da.parent = this;
        this.da.setTransform(32, 96);
        this.fa = new a.Ur;
        this.fa.parent = this;
        this.fa.setTransform(48, 96);
        this.ga = new a.Vr;
        this.ga.parent = this;
        this.ga.setTransform(80, 96);
        this.ea = new a.Wr;
        this.ea.parent = this;
        this.ea.setTransform(128,
            96);
        this.ia = new a.Xr;
        this.ia.parent = this;
        this.ia.setTransform(144, 96);
        this.ha = new a.Yr;
        this.ha.parent = this;
        this.ha.setTransform(0, 112);
        this.ka = new a.Zr;
        this.ka.parent = this;
        this.ka.setTransform(32, 160);
        this.ja = new a.$r;
        this.ja.parent = this;
        this.ja.setTransform(64, 160);
        this.la = new a.cs;
        this.la.parent = this;
        this.la.setTransform(80, 160);
        this.ma = new a.ds;
        this.ma.parent = this;
        this.ma.setTransform(128, 160);
        this.oa = new a.fs;
        this.oa.parent = this;
        this.oa.setTransform(64, 176);
        this.Ja = new a.Zq;
        this.Ja.parent = this;
        this.Ja.setTransform(64, 32);
        this.Oa = new a.$q;
        this.Oa.parent = this;
        this.Oa.setTransform(64, 32);
        this.Ia = new a.ar;
        this.Ia.parent = this;
        this.Ia.setTransform(64, 32);
        this.Ba = new a.Eq;
        this.Ba.parent = this;
        this.Ba.setTransform(64, 32);
        this.Fa = new a.Wq;
        this.Fa.parent = this;
        this.Fa.setTransform(64, 32);
        this.qa = new a.Xq;
        this.qa.parent = this;
        this.qa.setTransform(64, 32);
        this.ua = new a.Yq;
        this.ua.parent = this;
        this.ua.setTransform(64, 32);
        this.Ma = new a.Sq;
        this.Ma.parent = this;
        this.Ma.setTransform(64, 32);
        this.La = new a.Tq;
        this.La.parent =
            this;
        this.La.setTransform(64, 32);
        this.Wa = new a.Uq;
        this.Wa.parent = this;
        this.Wa.setTransform(64, 32);
        this.Ra = new a.Vq;
        this.Ra.parent = this;
        this.Ra.setTransform(64, 32);
        this.Ca = new a.Nq;
        this.Ca.parent = this;
        this.Ca.setTransform(64, 32);
        this.Xa = new a.Oq;
        this.Xa.parent = this;
        this.Xa.setTransform(64, 32);
        this.Ya = new a.Pq;
        this.Ya.parent = this;
        this.Ya.setTransform(64, 32);
        this.Sa = new a.Qq;
        this.Sa.parent = this;
        this.Sa.setTransform(64, 32);
        this.Za = new a.Rq;
        this.Za.parent = this;
        this.Za.setTransform(64, 32);
        this.Pa = new a.ht;
        this.Pa.parent = this;
        this.Pa.setTransform(128, 32);
        this.Ta = new a.Vs;
        this.Ta.parent = this;
        this.Ta.setTransform(32, 32);
        this.Ua = new a.Hs;
        this.Ua.parent = this;
        this.Ua.setTransform(64, 0);
        this.Va = new a.$s;
        this.Va.parent = this;
        this.Va.setTransform(64, 32);
        this.gb = new a.tt;
        this.gb.parent = this;
        this.gb.setTransform(32, 80);
        this.cb = new a.zt;
        this.cb.parent = this;
        this.cb.setTransform(32, 96);
        this.wa = new a.Et;
        this.wa.parent = this;
        this.wa.setTransform(48, 96);
        this.$a = new a.Kt;
        this.$a.parent = this;
        this.$a.setTransform(80, 96);
        this.Ea = new a.Zt;
        this.Ea.parent = this;
        this.Ea.setTransform(0, 112);
        this.hb = new a.eu;
        this.hb.parent = this;
        this.hb.setTransform(32, 160);
        this.ib = new a.ju;
        this.ib.parent = this;
        this.ib.setTransform(64, 160);
        this.jb = new a.ou;
        this.jb.parent = this;
        this.jb.setTransform(48, 176);
        this.Ha = new a.mu;
        this.Ha.parent = this;
        this.Ha.setTransform(80, 160);
        this.Aa = new a.tu;
        this.Aa.parent = this;
        this.Aa.setTransform(64, 176);
        this.Ka = new a.nu;
        this.Ka.parent = this;
        this.Ka.setTransform(128, 160);
        this.Qa = new a.Vt;
        this.Qa.parent = this;
        this.Qa.setTransform(144,
            96);
        this.ab = new a.Qt;
        this.ab.parent = this;
        this.ab.setTransform(128, 96);
        this.nb = new a.ut;
        this.nb.parent = this;
        this.nb.setTransform(32, 80);
        this.tb = new a.hs;
        this.tb.parent = this;
        this.tb.setTransform(0, -64);
        this.pb = new a.us;
        this.pb.parent = this;
        this.pb.setTransform(128, -64);
        this.Bb = new a.Ds;
        this.Bb.parent = this;
        this.Bb.setTransform(32, 0);
        this.Da = new a.it;
        this.Da.parent = this;
        this.Da.setTransform(128, 32);
        this.kb = new a.ot;
        this.kb.parent = this;
        this.kb.setTransform(144, 32);
        this.sb = new a.ku;
        this.sb.parent = this;
        this.sb.setTransform(64,
            160);
        this.Cb = new a.os;
        this.Cb.parent = this;
        this.Cb.setTransform(64, -64);
        this.Db = new a.Is;
        this.Db.parent = this;
        this.Db.setTransform(64, 0);
        this.Ab = new a.Ls;
        this.Ab.parent = this;
        this.Ab.setTransform(128, 0);
        this.wb = new a.Ws;
        this.wb.parent = this;
        this.wb.setTransform(32, 32);
        this.Eb = new a.ct;
        this.Eb.parent = this;
        this.Eb.setTransform(64, 32);
        this.xb = new a.At;
        this.xb.parent = this;
        this.xb.setTransform(32, 96);
        this.yb = new a.$t;
        this.yb.parent = this;
        this.yb.setTransform(0, 112);
        this.Fb = new a.pu;
        this.Fb.parent = this;
        this.Fb.setTransform(48,
            176);
        this.Jb = new a.uu;
        this.Jb.parent = this;
        this.Jb.setTransform(64, 176);
        this.zb = new a.fu;
        this.zb.parent = this;
        this.zb.setTransform(32, 160);
        this.Gb = new a.Ft;
        this.Gb.parent = this;
        this.Gb.setTransform(48, 96);
        this.ra = new a.Rt;
        this.ra.parent = this;
        this.ra.setTransform(128, 96);
        this.Hb = new a.Lt;
        this.Hb.parent = this;
        this.Hb.setTransform(80, 96);
        this.Ib = new a.js;
        this.Ib.parent = this;
        this.Ib.setTransform(0, -64);
        this.Kb = new a.Ps;
        this.Kb.parent = this;
        this.Kb.setTransform(160, 0);
        this.ac = new a.Ss;
        this.ac.parent = this;
        this.ac.setTransform(-16,
            32);
        this.Sb = new a.Xs;
        this.Sb.parent = this;
        this.Sb.setTransform(32, 32);
        this.cc = new a.jt;
        this.cc.parent = this;
        this.cc.setTransform(128, 32);
        this.hc = new a.pt;
        this.hc.parent = this;
        this.hc.setTransform(144, 32);
        this.Jc = new a.vt;
        this.Jc.parent = this;
        this.Jc.setTransform(32, 80);
        this.Zd = new a.yt;
        this.Zd.parent = this;
        this.Zd.setTransform(16, 96);
        this.$d = new a.Bt;
        this.$d.parent = this;
        this.$d.setTransform(32, 96);
        this.ae = new a.Gt;
        this.ae.parent = this;
        this.ae.setTransform(48, 96);
        this.be = new a.dt;
        this.be.parent = this;
        this.be.setTransform(64,
            32);
        this.ce = new a.ps;
        this.ce.parent = this;
        this.ce.setTransform(64, -64);
        this.ee = new a.vs;
        this.ee.parent = this;
        this.ee.setTransform(128, -64);
        this.fe = new a.ys;
        this.fe.parent = this;
        this.fe.setTransform(144, -32);
        this.cf = new a.Bs;
        this.cf.parent = this;
        this.ge = new a.Es;
        this.ge.parent = this;
        this.ge.setTransform(32, 0);
        this.he = new a.Js;
        this.he.parent = this;
        this.he.setTransform(64, 0);
        this.ie = new a.Ms;
        this.ie.parent = this;
        this.ie.setTransform(128, 0);
        this.je = new a.Mt;
        this.je.parent = this;
        this.je.setTransform(80, 96);
        this.ke =
            new a.St;
        this.ke.parent = this;
        this.ke.setTransform(128, 96);
        this.le = new a.Wt;
        this.le.parent = this;
        this.le.setTransform(144, 96);
        this.me = new a.au;
        this.me.parent = this;
        this.me.setTransform(0, 112);
        this.ne = new a.gu;
        this.ne.parent = this;
        this.ne.setTransform(32, 160);
        this.Pc = new a.lu;
        this.Pc.parent = this;
        this.Pc.setTransform(64, 160);
        this.oe = new a.qu;
        this.oe.parent = this;
        this.oe.setTransform(48, 176);
        this.pe = new a.vu;
        this.pe.parent = this;
        this.pe.setTransform(64, 176);
        this.qe = new a.rt;
        this.qe.parent = this;
        this.qe.setTransform(144,
            32);
        this.re = new a.ms;
        this.re.parent = this;
        this.re.setTransform(0, -64);
        this.se = new a.qs;
        this.se.parent = this;
        this.se.setTransform(64, -64);
        this.te = new a.ws;
        this.te.parent = this;
        this.te.setTransform(128, -64);
        this.ue = new a.zs;
        this.ue.parent = this;
        this.ue.setTransform(144, -32);
        this.df = new a.Cs;
        this.df.parent = this;
        this.fd = new a.Fs;
        this.fd.parent = this;
        this.fd.setTransform(32, 0);
        this.gd = new a.Ks;
        this.gd.parent = this;
        this.gd.setTransform(64, 0);
        this.hd = new a.Ns;
        this.hd.parent = this;
        this.hd.setTransform(128, 0);
        this.jd =
            new a.Qs;
        this.jd.parent = this;
        this.jd.setTransform(160, 0);
        this.kd = new a.Ts;
        this.kd.parent = this;
        this.kd.setTransform(-16, 32);
        this.ld = new a.Ys;
        this.ld.parent = this;
        this.ld.setTransform(32, 32);
        this.md = new a.Ct;
        this.md.parent = this;
        this.md.setTransform(32, 96);
        this.nd = new a.wt;
        this.nd.parent = this;
        this.nd.setTransform(32, 80);
        this.od = new a.kt;
        this.od.parent = this;
        this.od.setTransform(128, 32);
        this.pd = new a.et;
        this.pd.parent = this;
        this.pd.setTransform(64, 32);
        this.qd = new a.hu;
        this.qd.parent = this;
        this.qd.setTransform(32,
            160);
        this.rd = new a.bu;
        this.rd.parent = this;
        this.rd.setTransform(0, 112);
        this.td = new a.Yt;
        this.td.parent = this;
        this.td.setTransform(176, 96);
        this.ud = new a.Xt;
        this.ud.parent = this;
        this.ud.setTransform(144, 96);
        this.vd = new a.Tt;
        this.vd.parent = this;
        this.vd.setTransform(128, 96);
        this.wd = new a.Ht;
        this.wd.parent = this;
        this.wd.setTransform(48, 96);
        this.xd = new a.Nt;
        this.xd.parent = this;
        this.xd.setTransform(80, 96);
        this.yd = new a.ru;
        this.yd.parent = this;
        this.yd.setTransform(48, 176);
        this.zd = new a.wu;
        this.zd.parent = this;
        this.zd.setTransform(64, 176);
        this.Ad = new a.ns;
        this.Ad.parent = this;
        this.Ad.setTransform(0, -64);
        this.Bd = new a.ts;
        this.Bd.parent = this;
        this.Bd.setTransform(64, -64);
        this.Cd = new a.xs;
        this.Cd.parent = this;
        this.Cd.setTransform(128, -64);
        this.Dd = new a.As;
        this.Dd.parent = this;
        this.Dd.setTransform(144, -32);
        this.Ed = new a.Gs;
        this.Ed.parent = this;
        this.Ed.setTransform(32, 0);
        this.Fd = new a.Os;
        this.Fd.parent = this;
        this.Fd.setTransform(128, 0);
        this.Gd = new a.Rs;
        this.Gd.parent = this;
        this.Gd.setTransform(160, 0);
        this.Hd = new a.Us;
        this.Hd.parent = this;
        this.Hd.setTransform(-16, 32);
        this.Id = new a.Zs;
        this.Id.parent = this;
        this.Id.setTransform(32, 32);
        this.Jd = new a.ft;
        this.Jd.parent = this;
        this.Jd.setTransform(64, 32);
        this.Kd = new a.nt;
        this.Kd.parent = this;
        this.Kd.setTransform(128, 32);
        this.Ld = new a.st;
        this.Ld.parent = this;
        this.Ld.setTransform(144, 32);
        this.tc = new a.xt;
        this.tc.parent = this;
        this.tc.setTransform(32, 80);
        this.uc = new a.dx;
        this.uc.parent = this;
        this.uc.setTransform(64, 160);
        this.Md = new a.Ut;
        this.Md.parent = this;
        this.Md.setTransform(128,
            96);
        this.vc = new a.Dt;
        this.vc.parent = this;
        this.vc.setTransform(32, 96);
        this.Nd = new a.It;
        this.Nd.parent = this;
        this.Nd.setTransform(48, 96);
        this.Od = new a.Ot;
        this.Od.parent = this;
        this.Od.setTransform(80, 96);
        this.Pd = new a.cu;
        this.Pd.parent = this;
        this.Pd.setTransform(0, 112);
        this.wc = new a.iu;
        this.wc.parent = this;
        this.wc.setTransform(32, 160);
        this.xc = new a.su;
        this.xc.parent = this;
        this.xc.setTransform(48, 176);
        this.yc = new a.xu;
        this.yc.parent = this;
        this.yc.setTransform(64, 176);
        this.Qd = new a.gt;
        this.Qd.parent = this;
        this.Qd.setTransform(64,
            32);
        this.Gc = new a.du;
        this.Gc.parent = this;
        this.Gc.setTransform(0, 112);
        this.Hc = new a.Pt;
        this.Hc.parent = this;
        this.Hc.setTransform(80, 96);
        this.Ic = new a.Jt;
        this.Ic.parent = this;
        this.Ic.setTransform(48, 96);
        this.Ee = new a.gs;
        this.Ee.parent = this;
        this.Ee.setTransform(64, 32);
        this.Fe = new a.$w;
        this.Fe.parent = this;
        this.Fe.setTransform(128, 32);
        this.Ge = new a.Mw;
        this.Ge.parent = this;
        this.Ge.setTransform(64, 0);
        this.He = new a.Iw;
        this.He.parent = this;
        this.He.setTransform(32, 0);
        this.Ie = new a.Ww;
        this.Ie.parent = this;
        this.Ie.setTransform(64,
            32);
        this.Je = new a.ax;
        this.Je.parent = this;
        this.Je.setTransform(128, 32);
        this.Ke = new a.Jw;
        this.Ke.parent = this;
        this.Ke.setTransform(32, 0);
        this.Le = new a.Nw;
        this.Le.parent = this;
        this.Le.setTransform(64, 0);
        this.Me = new a.Qw;
        this.Me.parent = this;
        this.Me.setTransform(128, 0);
        this.Ne = new a.Tw;
        this.Ne.parent = this;
        this.Ne.setTransform(32, 32);
        this.Oe = new a.Xw;
        this.Oe.parent = this;
        this.Oe.setTransform(64, 32);
        this.Pe = new a.Kw;
        this.Pe.parent = this;
        this.Pe.setTransform(32, 0);
        this.Qe = new a.Ow;
        this.Qe.parent = this;
        this.Qe.setTransform(64,
            0);
        this.Re = new a.Rw;
        this.Re.parent = this;
        this.Re.setTransform(128, 0);
        this.Se = new a.Uw;
        this.Se.parent = this;
        this.Se.setTransform(32, 32);
        this.Te = new a.bx;
        this.Te.parent = this;
        this.Te.setTransform(128, 32);
        this.Ue = new a.Yw;
        this.Ue.parent = this;
        this.Ue.setTransform(64, 32);
        this.Ve = new a.Lw;
        this.Ve.parent = this;
        this.Ve.setTransform(32, 0);
        this.We = new a.Pw;
        this.We.parent = this;
        this.We.setTransform(64, 0);
        this.Xe = new a.Sw;
        this.Xe.parent = this;
        this.Xe.setTransform(128, 0);
        this.Ye = new a.Vw;
        this.Ye.parent = this;
        this.Ye.setTransform(32,
            32);
        this.Ze = new a.cx;
        this.Ze.parent = this;
        this.Ze.setTransform(128, 32);
        this.$e = new a.Zw;
        this.$e.parent = this;
        this.$e.setTransform(64, 32);
        this.Rd = new a.Au;
        this.Rd.parent = this;
        this.Rd.setTransform(64, 32);
        this.af = new a.Bu;
        this.af.parent = this;
        this.af.setTransform(64, 32);
        this.Sd = new a.Su;
        this.Sd.parent = this;
        this.Sd.setTransform(32, 80);
        this.Td = new a.ew;
        this.Td.parent = this;
        this.Td.setTransform(64, 176);
        this.Ud = new a.$v;
        this.Ud.parent = this;
        this.Ud.setTransform(128, 160);
        this.vf = new a.Rv;
        this.vf.parent = this;
        this.vf.setTransform(80,
            160);
        this.Vd = new a.Bv;
        this.Vd.parent = this;
        this.Vd.setTransform(144, 96);
        this.Wd = new a.sv;
        this.Wd.parent = this;
        this.Wd.setTransform(128, 96);
        this.kj = new a.jv;
        this.kj.parent = this;
        this.kj.setTransform(80, 96);
        this.lj = new a.av;
        this.lj.parent = this;
        this.lj.setTransform(48, 96);
        this.Om = new a.Cu;
        this.Om.parent = this;
        this.Om.setTransform(64, 32);
        this.Oh = new a.Ku;
        this.Oh.parent = this;
        this.Oh.setTransform(128, 32);
        this.mj = new a.gG;
        this.mj.parent = this;
        this.mj.setTransform(176, 96);
        this.nj = new a.bG;
        this.nj.parent = this;
        this.nj.setTransform(144, 32);
        this.Xd = new a.fw;
        this.Xd.parent = this;
        this.Xd.setTransform(64, 176);
        this.Yd = new a.aw;
        this.Yd.parent = this;
        this.Yd.setTransform(128, 160);
        this.oj = new a.Sv;
        this.oj.parent = this;
        this.oj.setTransform(80, 160);
        this.Ph = new a.Cv;
        this.Ph.parent = this;
        this.Ph.setTransform(144, 96);
        this.pj = new a.tv;
        this.pj.parent = this;
        this.pj.setTransform(128, 96);
        this.qj = new a.kv;
        this.qj.parent = this;
        this.qj.setTransform(80, 96);
        this.rj = new a.bv;
        this.rj.parent = this;
        this.rj.setTransform(48, 96);
        this.sj = new a.Tu;
        this.sj.parent = this;
        this.sj.setTransform(32, 80);
        this.Pm = new a.Du;
        this.Pm.parent = this;
        this.Pm.setTransform(64, 32);
        this.tj = new a.Lu;
        this.tj.parent = this;
        this.tj.setTransform(128, 32);
        this.uj = new a.hG;
        this.uj.parent = this;
        this.uj.setTransform(176, 96);
        this.vj = new a.cG;
        this.vj.parent = this;
        this.vj.setTransform(144, 32);
        this.wj = new a.Tv;
        this.wj.parent = this;
        this.wj.setTransform(80, 160);
        this.xj = new a.Dv;
        this.xj.parent = this;
        this.xj.setTransform(144, 96);
        this.yj = new a.uv;
        this.yj.parent = this;
        this.yj.setTransform(128,
            96);
        this.zj = new a.lv;
        this.zj.parent = this;
        this.zj.setTransform(80, 96);
        this.Aj = new a.cv;
        this.Aj.parent = this;
        this.Aj.setTransform(48, 96);
        this.Bj = new a.Uu;
        this.Bj.parent = this;
        this.Bj.setTransform(32, 80);
        this.Qm = new a.Eu;
        this.Qm.parent = this;
        this.Qm.setTransform(64, 32);
        this.Cj = new a.Mu;
        this.Cj.parent = this;
        this.Cj.setTransform(128, 32);
        this.Dj = new a.iG;
        this.Dj.parent = this;
        this.Dj.setTransform(176, 96);
        this.Ej = new a.dG;
        this.Ej.parent = this;
        this.Ej.setTransform(144, 32);
        this.Fj = new a.Uv;
        this.Fj.parent = this;
        this.Fj.setTransform(80,
            160);
        this.Gj = new a.Ev;
        this.Gj.parent = this;
        this.Gj.setTransform(144, 96);
        this.Hj = new a.vv;
        this.Hj.parent = this;
        this.Hj.setTransform(128, 96);
        this.Ij = new a.mv;
        this.Ij.parent = this;
        this.Ij.setTransform(80, 96);
        this.Jj = new a.dv;
        this.Jj.parent = this;
        this.Jj.setTransform(48, 96);
        this.Kj = new a.Vu;
        this.Kj.parent = this;
        this.Kj.setTransform(32, 80);
        this.Lj = new a.Nu;
        this.Lj.parent = this;
        this.Lj.setTransform(128, 32);
        this.Rm = new a.Fu;
        this.Rm.parent = this;
        this.Rm.setTransform(64, 32);
        this.Mj = new a.jG;
        this.Mj.parent = this;
        this.Mj.setTransform(176,
            96);
        this.Nj = new a.eG;
        this.Nj.parent = this;
        this.Nj.setTransform(144, 32);
        this.Oj = new a.Vv;
        this.Oj.parent = this;
        this.Oj.setTransform(80, 160);
        this.Pj = new a.Fv;
        this.Pj.parent = this;
        this.Pj.setTransform(144, 96);
        this.Qj = new a.wv;
        this.Qj.parent = this;
        this.Qj.setTransform(128, 96);
        this.Rj = new a.nv;
        this.Rj.parent = this;
        this.Rj.setTransform(80, 96);
        this.Sj = new a.ev;
        this.Sj.parent = this;
        this.Sj.setTransform(48, 96);
        this.Qh = new a.Wu;
        this.Qh.parent = this;
        this.Qh.setTransform(32, 80);
        this.Sm = new a.Gu;
        this.Sm.parent = this;
        this.Sm.setTransform(64,
            32);
        this.Tj = new a.kG;
        this.Tj.parent = this;
        this.Tj.setTransform(176, 96);
        this.Uj = new a.fG;
        this.Uj.parent = this;
        this.Uj.setTransform(144, 32);
        this.Vj = new a.fv;
        this.Vj.parent = this;
        this.Vj.setTransform(48, 96);
        this.Wj = new a.Wv;
        this.Wj.parent = this;
        this.Wj.setTransform(80, 160);
        this.Xj = new a.xv;
        this.Xj.parent = this;
        this.Xj.setTransform(128, 96);
        this.Yj = new a.ov;
        this.Yj.parent = this;
        this.Yj.setTransform(80, 96);
        this.Zj = new a.Ou;
        this.Zj.parent = this;
        this.Zj.setTransform(128, 32);
        this.Tm = new a.Hu;
        this.Tm.parent = this;
        this.Tm.setTransform(64, 32);
        this.$j = new a.Xu;
        this.$j.parent = this;
        this.$j.setTransform(32, 80);
        this.ak = new a.Zu;
        this.ak.parent = this;
        this.ak.setTransform(32, 96);
        this.bk = new a.gv;
        this.bk.parent = this;
        this.bk.setTransform(48, 96);
        this.ck = new a.pv;
        this.ck.parent = this;
        this.ck.setTransform(80, 96);
        this.dk = new a.yv;
        this.dk.parent = this;
        this.dk.setTransform(128, 96);
        this.ek = new a.Gv;
        this.ek.parent = this;
        this.ek.setTransform(144, 96);
        this.fk = new a.Kv;
        this.fk.parent = this;
        this.fk.setTransform(0, 112);
        this.gk = new a.Nv;
        this.gk.parent = this;
        this.gk.setTransform(32, 160);
        this.hk = new a.Pv;
        this.hk.parent = this;
        this.hk.setTransform(64, 160);
        this.ik = new a.Xv;
        this.ik.parent = this;
        this.ik.setTransform(80, 160);
        this.jk = new a.bw;
        this.jk.parent = this;
        this.jk.setTransform(128, 160);
        this.kk = new a.gw;
        this.kk.parent = this;
        this.kk.setTransform(64, 176);
        this.lk = new a.yu;
        this.lk.parent = this;
        this.lk.setTransform(32, 32);
        this.Um = new a.Pu;
        this.Um.parent = this;
        this.Um.setTransform(128, 32);
        this.Vm = new a.Iu;
        this.Vm.parent = this;
        this.Vm.setTransform(64,
            32);
        this.mk = new a.Yu;
        this.mk.parent = this;
        this.mk.setTransform(32, 80);
        this.nk = new a.$u;
        this.nk.parent = this;
        this.nk.setTransform(32, 96);
        this.pk = new a.hv;
        this.pk.parent = this;
        this.pk.setTransform(48, 96);
        this.qk = new a.qv;
        this.qk.parent = this;
        this.qk.setTransform(80, 96);
        this.rk = new a.zv;
        this.rk.parent = this;
        this.rk.setTransform(128, 96);
        this.sk = new a.Hv;
        this.sk.parent = this;
        this.sk.setTransform(144, 96);
        this.tk = new a.Lv;
        this.tk.parent = this;
        this.tk.setTransform(0, 112);
        this.uk = new a.Ov;
        this.uk.parent = this;
        this.uk.setTransform(32,
            160);
        this.vk = new a.Qv;
        this.vk.parent = this;
        this.vk.setTransform(64, 160);
        this.wk = new a.Yv;
        this.wk.parent = this;
        this.wk.setTransform(80, 160);
        this.xk = new a.cw;
        this.xk.parent = this;
        this.xk.setTransform(128, 160);
        this.yk = new a.hw;
        this.yk.parent = this;
        this.yk.setTransform(64, 176);
        this.zk = new a.zu;
        this.zk.parent = this;
        this.zk.setTransform(32, 32);
        this.Wm = new a.Ju;
        this.Wm.parent = this;
        this.Wm.setTransform(64, 32);
        this.Xm = new a.Qu;
        this.Xm.parent = this;
        this.Xm.setTransform(128, 32);
        this.Ym = new a.Ru;
        this.Ym.parent = this;
        this.Ym.setTransform(144, 32);
        this.Ak = new a.iw;
        this.Ak.parent = this;
        this.Ak.setTransform(64, 176);
        this.Bk = new a.dw;
        this.Bk.parent = this;
        this.Bk.setTransform(128, 160);
        this.Ck = new a.Zv;
        this.Ck.parent = this;
        this.Ck.setTransform(80, 160);
        this.Dk = new a.Mv;
        this.Dk.parent = this;
        this.Dk.setTransform(176, 144);
        this.Ek = new a.Jv;
        this.Ek.parent = this;
        this.Ek.setTransform(176, 96);
        this.Fk = new a.Iv;
        this.Fk.parent = this;
        this.Fk.setTransform(144, 96);
        this.Gk = new a.Av;
        this.Gk.parent = this;
        this.Gk.setTransform(128, 96);
        this.Hk =
            new a.rv;
        this.Hk.parent = this;
        this.Hk.setTransform(80, 96);
        this.Ik = new a.iv;
        this.Ik.parent = this;
        this.Ik.setTransform(48, 96);
        this.Jk = new a.kw;
        this.Jk.parent = this;
        this.Jk.setTransform(64, 32);
        this.Zm = new a.lw;
        this.Zm.parent = this;
        this.Zm.setTransform(64, 32);
        this.$m = new a.mw;
        this.$m.parent = this;
        this.$m.setTransform(64, 32);
        this.an = new a.nw;
        this.an.parent = this;
        this.an.setTransform(64, 32);
        this.bn = new a.ow;
        this.bn.parent = this;
        this.bn.setTransform(64, 32);
        this.cn = new a.pw;
        this.cn.parent = this;
        this.cn.setTransform(64,
            32);
        this.dn = new a.qw;
        this.dn.parent = this;
        this.dn.setTransform(64, 32);
        this.en = new a.rw;
        this.en.parent = this;
        this.en.setTransform(64, 32);
        this.fn = new a.uw;
        this.fn.parent = this;
        this.fn.setTransform(128, 32);
        this.hn = new a.sw;
        this.hn.parent = this;
        this.hn.setTransform(64, 32);
        this.jn = new a.vw;
        this.jn.parent = this;
        this.jn.setTransform(128, 32);
        this.kn = new a.ww;
        this.kn.parent = this;
        this.kn.setTransform(144, 32);
        this.ln = new a.tw;
        this.ln.parent = this;
        this.ln.setTransform(64, 32);
        this.mn = new a.Uy;
        this.mn.parent = this;
        this.mn.setTransform(64,
            32);
        this.rg = new a.Yy;
        this.rg.parent = this;
        this.rg.setTransform(48, 96);
        this.Kk = new a.$y;
        this.Kk.parent = this;
        this.Kk.setTransform(80, 96);
        this.nn = new a.Vy;
        this.nn.parent = this;
        this.nn.setTransform(64, 32);
        this.Lk = new a.az;
        this.Lk.parent = this;
        this.Lk.setTransform(80, 96);
        this.pn = new a.Wy;
        this.pn.parent = this;
        this.pn.setTransform(64, 32);
        this.Mk = new a.bz;
        this.Mk.parent = this;
        this.Mk.setTransform(80, 96);
        this.Nk = new a.Zy;
        this.Nk.parent = this;
        this.Nk.setTransform(48, 96);
        this.qn = new a.Xy;
        this.qn.parent = this;
        this.qn.setTransform(64,
            32);
        this.Ok = new a.cz;
        this.Ok.parent = this;
        this.Ok.setTransform(80, 96);
        this.Pk = new a.dz;
        this.Pk.parent = this;
        this.Pk.setTransform(80, 96);
        this.rn = new a.Qy;
        this.rn.parent = this;
        this.rn.setTransform(64, 32);
        this.sn = new a.Ry;
        this.sn.parent = this;
        this.sn.setTransform(64, 32);
        this.tn = new a.Sy;
        this.tn.parent = this;
        this.tn.setTransform(64, 32);
        this.un = new a.Ty;
        this.un.parent = this;
        this.un.setTransform(64, 32);
        this.vn = new a.Dx;
        this.vn.parent = this;
        this.vn.setTransform(64, 32);
        this.Qk = new a.Tx;
        this.Qk.parent = this;
        this.Qk.setTransform(32,
            80);
        this.Ub = new a.cy;
        this.Ub.parent = this;
        this.Ub.setTransform(32, 96);
        this.Rk = new a.dy;
        this.Rk.parent = this;
        this.Rk.setTransform(48, 96);
        this.Sk = new a.ny;
        this.Sk.parent = this;
        this.Sk.setTransform(80, 96);
        this.Vb = new a.Py;
        this.Vb.parent = this;
        this.Vb.setTransform(64, 176);
        this.Tk = new a.yy;
        this.Tk.parent = this;
        this.Tk.setTransform(128, 96);
        this.Wb = new a.Ay;
        this.Wb.parent = this;
        this.Wb.setTransform(144, 96);
        this.Xb = new a.By;
        this.Xb.parent = this;
        this.Xb.setTransform(0, 112);
        this.Yb = new a.Cy;
        this.Yb.parent = this;
        this.Yb.setTransform(32,
            160);
        this.Zb = new a.Dy;
        this.Zb.parent = this;
        this.Zb.setTransform(64, 160);
        this.Uk = new a.Ey;
        this.Uk.parent = this;
        this.Uk.setTransform(80, 160);
        this.$b = new a.Oy;
        this.$b.parent = this;
        this.$b.setTransform(128, 160);
        this.Vk = new a.Nx;
        this.Vk.parent = this;
        this.Vk.setTransform(128, 32);
        this.wn = new a.Ex;
        this.wn.parent = this;
        this.wn.setTransform(64, 32);
        this.Wk = new a.Fy;
        this.Wk.parent = this;
        this.Wk.setTransform(80, 160);
        this.Xk = new a.Ux;
        this.Xk.parent = this;
        this.Xk.setTransform(32, 80);
        this.Yk = new a.ey;
        this.Yk.parent = this;
        this.Yk.setTransform(48, 96);
        this.Zk = new a.oy;
        this.Zk.parent = this;
        this.Zk.setTransform(80, 96);
        this.$k = new a.zy;
        this.$k.parent = this;
        this.$k.setTransform(128, 96);
        this.al = new a.Ox;
        this.al.parent = this;
        this.al.setTransform(128, 32);
        this.xn = new a.Fx;
        this.xn.parent = this;
        this.xn.setTransform(64, 32);
        this.bl = new a.Gy;
        this.bl.parent = this;
        this.bl.setTransform(80, 160);
        this.cl = new a.Vx;
        this.cl.parent = this;
        this.cl.setTransform(32, 80);
        this.dl = new a.fy;
        this.dl.parent = this;
        this.dl.setTransform(48, 96);
        this.el = new a.py;
        this.el.parent = this;
        this.el.setTransform(80, 96);
        this.fl = new a.Px;
        this.fl.parent = this;
        this.fl.setTransform(128, 32);
        this.yn = new a.Gx;
        this.yn.parent = this;
        this.yn.setTransform(64, 32);
        this.gl = new a.Hy;
        this.gl.parent = this;
        this.gl.setTransform(80, 160);
        this.hl = new a.Wx;
        this.hl.parent = this;
        this.hl.setTransform(32, 80);
        this.il = new a.gy;
        this.il.parent = this;
        this.il.setTransform(48, 96);
        this.jl = new a.qy;
        this.jl.parent = this;
        this.jl.setTransform(80, 96);
        this.kl = new a.Qx;
        this.kl.parent = this;
        this.kl.setTransform(128,
            32);
        this.zn = new a.yx;
        this.zn.parent = this;
        this.zn.setTransform(32, 32);
        this.An = new a.Hx;
        this.An.parent = this;
        this.An.setTransform(64, 32);
        this.ll = new a.Iy;
        this.ll.parent = this;
        this.ll.setTransform(80, 160);
        this.ml = new a.Xx;
        this.ml.parent = this;
        this.ml.setTransform(32, 80);
        this.nl = new a.hy;
        this.nl.parent = this;
        this.nl.setTransform(48, 96);
        this.ol = new a.ry;
        this.ol.parent = this;
        this.ol.setTransform(80, 96);
        this.pl = new a.Rx;
        this.pl.parent = this;
        this.pl.setTransform(128, 32);
        this.ql = new a.vx;
        this.ql.parent = this;
        this.ql.setTransform(64,
            0);
        this.Bn = new a.zx;
        this.Bn.parent = this;
        this.Bn.setTransform(32, 32);
        this.Cn = new a.Ix;
        this.Cn.parent = this;
        this.Cn.setTransform(64, 32);
        this.rl = new a.Jy;
        this.rl.parent = this;
        this.rl.setTransform(80, 160);
        this.Dn = new a.Yx;
        this.Dn.parent = this;
        this.Dn.setTransform(32, 80);
        this.tl = new a.iy;
        this.tl.parent = this;
        this.tl.setTransform(48, 96);
        this.ul = new a.sy;
        this.ul.parent = this;
        this.ul.setTransform(80, 96);
        this.vl = new a.Sx;
        this.vl.parent = this;
        this.vl.setTransform(128, 32);
        this.wl = new a.wx;
        this.wl.parent = this;
        this.wl.setTransform(64,
            0);
        this.En = new a.Ax;
        this.En.parent = this;
        this.En.setTransform(32, 32);
        this.Fn = new a.Jx;
        this.Fn.parent = this;
        this.Fn.setTransform(64, 32);
        this.xl = new a.Ky;
        this.xl.parent = this;
        this.xl.setTransform(80, 160);
        this.yl = new a.Zx;
        this.yl.parent = this;
        this.yl.setTransform(32, 80);
        this.zl = new a.jy;
        this.zl.parent = this;
        this.zl.setTransform(48, 96);
        this.Al = new a.uy;
        this.Al.parent = this;
        this.Al.setTransform(80, 96);
        this.Gn = new a.Kx;
        this.Gn.parent = this;
        this.Gn.setTransform(64, 32);
        this.Bl = new a.xx;
        this.Bl.parent = this;
        this.Bl.setTransform(64,
            0);
        this.Hn = new a.Bx;
        this.Hn.parent = this;
        this.Hn.setTransform(32, 32);
        this.Cl = new a.Ly;
        this.Cl.parent = this;
        this.Cl.setTransform(80, 160);
        this.Dl = new a.$x;
        this.Dl.parent = this;
        this.Dl.setTransform(32, 80);
        this.El = new a.ky;
        this.El.parent = this;
        this.El.setTransform(48, 96);
        this.Fl = new a.vy;
        this.Fl.parent = this;
        this.Fl.setTransform(80, 96);
        this.In = new a.Lx;
        this.In.parent = this;
        this.In.setTransform(64, 32);
        this.Jn = new a.Cx;
        this.Jn.parent = this;
        this.Jn.setTransform(32, 32);
        this.Gl = new a.My;
        this.Gl.parent = this;
        this.Gl.setTransform(80,
            160);
        this.Hl = new a.ay;
        this.Hl.parent = this;
        this.Hl.setTransform(32, 80);
        this.Il = new a.ly;
        this.Il.parent = this;
        this.Il.setTransform(48, 96);
        this.Jl = new a.wy;
        this.Jl.parent = this;
        this.Jl.setTransform(80, 96);
        this.Kn = new a.Mx;
        this.Kn.parent = this;
        this.Kn.setTransform(64, 32);
        this.Kl = new a.Ny;
        this.Kl.parent = this;
        this.Kl.setTransform(80, 160);
        this.Ll = new a.by;
        this.Ll.parent = this;
        this.Ll.setTransform(32, 80);
        this.Ml = new a.my;
        this.Ml.parent = this;
        this.Ml.setTransform(48, 96);
        this.Nl = new a.xy;
        this.Nl.parent = this;
        this.Nl.setTransform(80,
            96);
        this.Ln = new a.jx;
        this.Ln.parent = this;
        this.Ln.setTransform(64, 32);
        this.Mn = new a.kx;
        this.Mn.parent = this;
        this.Mn.setTransform(64, 32);
        this.Nn = new a.lx;
        this.Nn.parent = this;
        this.Nn.setTransform(64, 32);
        this.On = new a.mx;
        this.On.parent = this;
        this.On.setTransform(64, 32);
        this.Pn = new a.nx;
        this.Pn.parent = this;
        this.Pn.setTransform(64, 32);
        this.Qn = new a.ex;
        this.Qn.parent = this;
        this.Qn.setTransform(32, 32);
        this.Rn = new a.ox;
        this.Rn.parent = this;
        this.Rn.setTransform(64, 32);
        this.Sn = new a.fx;
        this.Sn.parent = this;
        this.Sn.setTransform(32,
            32);
        this.Tn = new a.ux;
        this.Tn.parent = this;
        this.Tn.setTransform(32, 80);
        this.Un = new a.px;
        this.Un.parent = this;
        this.Un.setTransform(64, 32);
        this.Vn = new a.gx;
        this.Vn.parent = this;
        this.Vn.setTransform(32, 32);
        this.Wn = new a.qx;
        this.Wn.parent = this;
        this.Wn.setTransform(64, 32);
        this.Xn = new a.hx;
        this.Xn.parent = this;
        this.Xn.setTransform(32, 32);
        this.Yn = new a.rx;
        this.Yn.parent = this;
        this.Yn.setTransform(64, 32);
        this.Zn = new a.ix;
        this.Zn.parent = this;
        this.Zn.setTransform(32, 32);
        this.$n = new a.sx;
        this.$n.parent = this;
        this.$n.setTransform(64,
            32);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ja
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                }, {
                    t: this.Oa
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                },
                {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ia
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                }, {
                    t: this.Ja
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                },
                {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ba
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                }, {
                    t: this.Fa
                }, {
                    t: this.oa
                },
                {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.qa
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                }, {
                    t: this.ua
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                },
                {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Fa
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ba
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.oa
                },
                {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ma
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                }, {
                    t: this.La
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                },
                {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Wa
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ra
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.oa
                },
                {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.ba
                }
            ]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }, {
                t: this.Ba
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                }, {
                    t: this.Ca
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                },
                {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Xa
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ya
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                },
                {
                    t: this.Sa
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Za
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                }, {
                    t: this.Ba
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                },
                {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ra
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                },
                {
                    t: this.Wa
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.La
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                }, {
                    t: this.Ma
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                },
                {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ba
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                },
                {
                    t: this.Za
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Sa
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                }, {
                    t: this.Ya
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                },
                {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Xa
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }, {
                t: this.Ca
            }, {
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }]
        }, 4).to({
            state: [{
                    t: this.ba
                },
                {
                    t: this.Ba
                }, {
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.ga
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.ab
            }, {
                t: this.Qa
            }, {
                t: this.Ka
            }, {
                t: this.Aa
            }, {
                t: this.Ha
            }, {
                t: this.jb
            }, {
                t: this.ib
            }, {
                t: this.hb
            }, {
                t: this.Ea
            }, {
                t: this.$a
            }, {
                t: this.wa
            }, {
                t: this.cb
            }, {
                t: this.gb
            }, {
                t: this.Va
            }, {
                t: this.Ua
            }, {
                t: this.Ta
            }, {
                t: this.Pa
            }]
        }, 4).to({
            state: [{
                    t: this.Qa
                }, {
                    t: this.Ka
                }, {
                    t: this.Ha
                }, {
                    t: this.Hb
                }, {
                    t: this.ra
                }, {
                    t: this.Gb
                }, {
                    t: this.zb
                }, {
                    t: this.Jb
                },
                {
                    t: this.Fb
                }, {
                    t: this.yb
                }, {
                    t: this.xb
                }, {
                    t: this.Eb
                }, {
                    t: this.wb
                }, {
                    t: this.Ab
                }, {
                    t: this.Db
                }, {
                    t: this.Cb
                }, {
                    t: this.sb
                }, {
                    t: this.kb
                }, {
                    t: this.Da
                }, {
                    t: this.Bb
                }, {
                    t: this.pb
                }, {
                    t: this.tb
                }, {
                    t: this.nb
                }
            ]
        }, 4).to({
            state: [{
                    t: this.pe
                }, {
                    t: this.oe
                }, {
                    t: this.Pc
                }, {
                    t: this.ne
                }, {
                    t: this.me
                }, {
                    t: this.le
                }, {
                    t: this.ke
                }, {
                    t: this.je
                }, {
                    t: this.ie
                }, {
                    t: this.he
                }, {
                    t: this.ge
                }, {
                    t: this.cf
                }, {
                    t: this.fe
                }, {
                    t: this.ee
                }, {
                    t: this.ce
                }, {
                    t: this.Ka
                }, {
                    t: this.Ha
                }, {
                    t: this.be
                }, {
                    t: this.ae
                }, {
                    t: this.$d
                }, {
                    t: this.Zd
                }, {
                    t: this.Jc
                }, {
                    t: this.hc
                }, {
                    t: this.cc
                }, {
                    t: this.Sb
                }, {
                    t: this.ac
                },
                {
                    t: this.Kb
                }, {
                    t: this.Ib
                }
            ]
        }, 4).to({
            state: [{
                t: this.zd
            }, {
                t: this.yd
            }, {
                t: this.xd
            }, {
                t: this.wd
            }, {
                t: this.vd
            }, {
                t: this.ud
            }, {
                t: this.td
            }, {
                t: this.rd
            }, {
                t: this.qd
            }, {
                t: this.Pc
            }, {
                t: this.Ka
            }, {
                t: this.Ha
            }, {
                t: this.pd
            }, {
                t: this.od
            }, {
                t: this.nd
            }, {
                t: this.md
            }, {
                t: this.ld
            }, {
                t: this.kd
            }, {
                t: this.jd
            }, {
                t: this.hd
            }, {
                t: this.gd
            }, {
                t: this.fd
            }, {
                t: this.df
            }, {
                t: this.ue
            }, {
                t: this.te
            }, {
                t: this.se
            }, {
                t: this.re
            }, {
                t: this.qe
            }]
        }, 4).to({
            state: [{
                    t: this.yc
                }, {
                    t: this.xc
                }, {
                    t: this.wc
                }, {
                    t: this.Pd
                }, {
                    t: this.Od
                }, {
                    t: this.Nd
                }, {
                    t: this.vc
                }, {
                    t: this.Md
                }, {
                    t: this.Ka
                }, {
                    t: this.Ha
                },
                {
                    t: this.Qa
                }, {
                    t: this.uc
                }, {
                    t: this.tc
                }, {
                    t: this.Ld
                }, {
                    t: this.Kd
                }, {
                    t: this.Jd
                }, {
                    t: this.Id
                }, {
                    t: this.Hd
                }, {
                    t: this.Gd
                }, {
                    t: this.Fd
                }, {
                    t: this.Ed
                }, {
                    t: this.Dd
                }, {
                    t: this.Cd
                }, {
                    t: this.Bd
                }, {
                    t: this.Ad
                }
            ]
        }, 4).to({
            state: [{
                t: this.yc
            }, {
                t: this.xc
            }, {
                t: this.wc
            }, {
                t: this.vc
            }, {
                t: this.Ka
            }, {
                t: this.Ha
            }, {
                t: this.Ic
            }, {
                t: this.Hc
            }, {
                t: this.Gc
            }, {
                t: this.ab
            }, {
                t: this.Qa
            }, {
                t: this.$
            }, {
                t: this.uc
            }, {
                t: this.Qd
            }, {
                t: this.tc
            }]
        }, 4).to({
            state: [{
                    t: this.ab
                }, {
                    t: this.Qa
                }, {
                    t: this.Ka
                }, {
                    t: this.Aa
                }, {
                    t: this.Ha
                }, {
                    t: this.jb
                }, {
                    t: this.ib
                }, {
                    t: this.hb
                }, {
                    t: this.Ea
                }, {
                    t: this.$a
                },
                {
                    t: this.wa
                }, {
                    t: this.cb
                }, {
                    t: this.gb
                }, {
                    t: this.Ua
                }, {
                    t: this.Ta
                }, {
                    t: this.Pa
                }, {
                    t: this.Ee
                }
            ]
        }, 4).to({
            state: [{
                t: this.Qa
            }, {
                t: this.Ka
            }, {
                t: this.Ha
            }, {
                t: this.Hb
            }, {
                t: this.ra
            }, {
                t: this.Gb
            }, {
                t: this.zb
            }, {
                t: this.Jb
            }, {
                t: this.Fb
            }, {
                t: this.yb
            }, {
                t: this.xb
            }, {
                t: this.Eb
            }, {
                t: this.wb
            }, {
                t: this.Ab
            }, {
                t: this.Db
            }, {
                t: this.Cb
            }, {
                t: this.sb
            }, {
                t: this.kb
            }, {
                t: this.Da
            }, {
                t: this.Bb
            }, {
                t: this.pb
            }, {
                t: this.tb
            }, {
                t: this.nb
            }]
        }, 4).to({
            state: [{
                    t: this.pe
                }, {
                    t: this.oe
                }, {
                    t: this.Pc
                }, {
                    t: this.ne
                }, {
                    t: this.me
                }, {
                    t: this.le
                }, {
                    t: this.ke
                }, {
                    t: this.je
                }, {
                    t: this.ie
                }, {
                    t: this.he
                },
                {
                    t: this.ge
                }, {
                    t: this.cf
                }, {
                    t: this.fe
                }, {
                    t: this.ee
                }, {
                    t: this.ce
                }, {
                    t: this.Ka
                }, {
                    t: this.Ha
                }, {
                    t: this.be
                }, {
                    t: this.ae
                }, {
                    t: this.$d
                }, {
                    t: this.Zd
                }, {
                    t: this.Jc
                }, {
                    t: this.hc
                }, {
                    t: this.cc
                }, {
                    t: this.Sb
                }, {
                    t: this.ac
                }, {
                    t: this.Kb
                }, {
                    t: this.Ib
                }
            ]
        }, 4).to({
            state: [{
                    t: this.zd
                }, {
                    t: this.yd
                }, {
                    t: this.xd
                }, {
                    t: this.wd
                }, {
                    t: this.vd
                }, {
                    t: this.ud
                }, {
                    t: this.td
                }, {
                    t: this.rd
                }, {
                    t: this.qd
                }, {
                    t: this.Pc
                }, {
                    t: this.Ka
                }, {
                    t: this.Ha
                }, {
                    t: this.pd
                }, {
                    t: this.od
                }, {
                    t: this.nd
                }, {
                    t: this.md
                }, {
                    t: this.ld
                }, {
                    t: this.kd
                }, {
                    t: this.jd
                }, {
                    t: this.hd
                }, {
                    t: this.gd
                }, {
                    t: this.fd
                }, {
                    t: this.df
                },
                {
                    t: this.ue
                }, {
                    t: this.te
                }, {
                    t: this.se
                }, {
                    t: this.re
                }, {
                    t: this.qe
                }
            ]
        }, 4).to({
            state: [{
                t: this.yc
            }, {
                t: this.xc
            }, {
                t: this.wc
            }, {
                t: this.Pd
            }, {
                t: this.Od
            }, {
                t: this.Nd
            }, {
                t: this.vc
            }, {
                t: this.Md
            }, {
                t: this.Ka
            }, {
                t: this.Ha
            }, {
                t: this.Qa
            }, {
                t: this.uc
            }, {
                t: this.tc
            }, {
                t: this.Ld
            }, {
                t: this.Kd
            }, {
                t: this.Jd
            }, {
                t: this.Id
            }, {
                t: this.Hd
            }, {
                t: this.Gd
            }, {
                t: this.Fd
            }, {
                t: this.Ed
            }, {
                t: this.Dd
            }, {
                t: this.Cd
            }, {
                t: this.Bd
            }, {
                t: this.Ad
            }]
        }, 4).to({
            state: [{
                    t: this.yc
                }, {
                    t: this.xc
                }, {
                    t: this.wc
                }, {
                    t: this.vc
                }, {
                    t: this.Ka
                }, {
                    t: this.Ha
                }, {
                    t: this.Ic
                }, {
                    t: this.Hc
                }, {
                    t: this.Gc
                }, {
                    t: this.ab
                },
                {
                    t: this.Qa
                }, {
                    t: this.uc
                }, {
                    t: this.Qd
                }, {
                    t: this.tc
                }, {
                    t: this.$
                }
            ]
        }, 4).to({
            state: [{
                t: this.Ie
            }, {
                t: this.He
            }, {
                t: this.Ge
            }, {
                t: this.Fe
            }, {
                t: this.yc
            }, {
                t: this.xc
            }, {
                t: this.wc
            }, {
                t: this.vc
            }, {
                t: this.Ka
            }, {
                t: this.Ha
            }, {
                t: this.Ic
            }, {
                t: this.Hc
            }, {
                t: this.Gc
            }, {
                t: this.ab
            }, {
                t: this.Qa
            }, {
                t: this.tc
            }, {
                t: this.$
            }, {
                t: this.uc
            }]
        }, 4).to({
            state: [{
                    t: this.Oe
                }, {
                    t: this.Ne
                }, {
                    t: this.Me
                }, {
                    t: this.Le
                }, {
                    t: this.Ke
                }, {
                    t: this.Je
                }, {
                    t: this.yc
                }, {
                    t: this.xc
                }, {
                    t: this.wc
                }, {
                    t: this.vc
                }, {
                    t: this.Ka
                }, {
                    t: this.Ha
                }, {
                    t: this.Ic
                }, {
                    t: this.Hc
                }, {
                    t: this.Gc
                }, {
                    t: this.ab
                }, {
                    t: this.Qa
                },
                {
                    t: this.tc
                }, {
                    t: this.$
                }, {
                    t: this.uc
                }
            ]
        }, 4).to({
            state: [{
                t: this.Ue
            }, {
                t: this.Te
            }, {
                t: this.Se
            }, {
                t: this.Re
            }, {
                t: this.Qe
            }, {
                t: this.Pe
            }, {
                t: this.yc
            }, {
                t: this.xc
            }, {
                t: this.wc
            }, {
                t: this.vc
            }, {
                t: this.Ka
            }, {
                t: this.Ha
            }, {
                t: this.Ic
            }, {
                t: this.Hc
            }, {
                t: this.Gc
            }, {
                t: this.ab
            }, {
                t: this.Qa
            }, {
                t: this.tc
            }, {
                t: this.$
            }, {
                t: this.uc
            }]
        }, 4).to({
            state: [{
                    t: this.$e
                }, {
                    t: this.Ze
                }, {
                    t: this.Ye
                }, {
                    t: this.Xe
                }, {
                    t: this.We
                }, {
                    t: this.Ve
                }, {
                    t: this.yc
                }, {
                    t: this.xc
                }, {
                    t: this.wc
                }, {
                    t: this.vc
                }, {
                    t: this.Ka
                }, {
                    t: this.Ha
                }, {
                    t: this.Ic
                }, {
                    t: this.Hc
                }, {
                    t: this.Gc
                }, {
                    t: this.ab
                }, {
                    t: this.Qa
                },
                {
                    t: this.tc
                }, {
                    t: this.$
                }, {
                    t: this.uc
                }
            ]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.Rd
            }]
        }, 4).to({
            state: [{
                t: this.lj
            }, {
                t: this.kj
            }, {
                t: this.Wd
            }, {
                t: this.Vd
            }, {
                t: this.vf
            }, {
                t: this.Ud
            }, {
                t: this.Td
            }, {
                t: this.Sd
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ca
            }, {
                t: this.da
            }, {
                t: this.af
            }]
        }, 4).to({
            state: [{
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ca
                }, {
                    t: this.da
                }, {
                    t: this.sj
                },
                {
                    t: this.rj
                }, {
                    t: this.qj
                }, {
                    t: this.pj
                }, {
                    t: this.Ph
                }, {
                    t: this.oj
                }, {
                    t: this.Yd
                }, {
                    t: this.Xd
                }, {
                    t: this.nj
                }, {
                    t: this.mj
                }, {
                    t: this.Oh
                }, {
                    t: this.Om
                }
            ]
        }, 4).to({
            state: [{
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ca
            }, {
                t: this.da
            }, {
                t: this.Yd
            }, {
                t: this.Bj
            }, {
                t: this.Aj
            }, {
                t: this.zj
            }, {
                t: this.yj
            }, {
                t: this.xj
            }, {
                t: this.wj
            }, {
                t: this.Xd
            }, {
                t: this.vj
            }, {
                t: this.uj
            }, {
                t: this.tj
            }, {
                t: this.Pm
            }]
        }, 4).to({
            state: [{
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ca
                }, {
                    t: this.da
                }, {
                    t: this.Yd
                }, {
                    t: this.Kj
                }, {
                    t: this.Jj
                }, {
                    t: this.Ij
                }, {
                    t: this.Hj
                }, {
                    t: this.Gj
                }, {
                    t: this.Fj
                },
                {
                    t: this.Xd
                }, {
                    t: this.Ej
                }, {
                    t: this.Dj
                }, {
                    t: this.Cj
                }, {
                    t: this.Qm
                }
            ]
        }, 4).to({
            state: [{
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ca
            }, {
                t: this.da
            }, {
                t: this.Qh
            }, {
                t: this.Sj
            }, {
                t: this.Rj
            }, {
                t: this.Qj
            }, {
                t: this.Pj
            }, {
                t: this.Oj
            }, {
                t: this.Yd
            }, {
                t: this.Xd
            }, {
                t: this.Nj
            }, {
                t: this.Mj
            }, {
                t: this.Rm
            }, {
                t: this.Lj
            }]
        }, 4).to({
                state: [{
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ca
                }, {
                    t: this.da
                }, {
                    t: this.Qh
                }, {
                    t: this.Yj
                }, {
                    t: this.Xj
                }, {
                    t: this.Wj
                }, {
                    t: this.Vj
                }, {
                    t: this.Ph
                }, {
                    t: this.Yd
                }, {
                    t: this.Xd
                }, {
                    t: this.Uj
                }, {
                    t: this.Tj
                }, {
                    t: this.Sm
                }, {
                    t: this.Oh
                }]
            },
            4).to({
            state: [{
                t: this.lk
            }, {
                t: this.kk
            }, {
                t: this.jk
            }, {
                t: this.ik
            }, {
                t: this.hk
            }, {
                t: this.gk
            }, {
                t: this.fk
            }, {
                t: this.ek
            }, {
                t: this.dk
            }, {
                t: this.ck
            }, {
                t: this.bk
            }, {
                t: this.ak
            }, {
                t: this.$j
            }, {
                t: this.Tm
            }, {
                t: this.Zj
            }]
        }, 4).to({
            state: [{
                t: this.zk
            }, {
                t: this.yk
            }, {
                t: this.xk
            }, {
                t: this.wk
            }, {
                t: this.vk
            }, {
                t: this.uk
            }, {
                t: this.tk
            }, {
                t: this.sk
            }, {
                t: this.rk
            }, {
                t: this.qk
            }, {
                t: this.pk
            }, {
                t: this.nk
            }, {
                t: this.mk
            }, {
                t: this.Vm
            }, {
                t: this.Um
            }]
        }, 4).to({
            state: [{
                    t: this.Ik
                }, {
                    t: this.Hk
                }, {
                    t: this.Gk
                }, {
                    t: this.Fk
                }, {
                    t: this.Ek
                }, {
                    t: this.Dk
                }, {
                    t: this.Ck
                }, {
                    t: this.Bk
                },
                {
                    t: this.Ak
                }, {
                    t: this.Ym
                }, {
                    t: this.Xm
                }, {
                    t: this.Wm
                }
            ]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.Jk
            }]
        }, 4).to({
            state: [{
                t: this.lj
            }, {
                t: this.kj
            }, {
                t: this.Wd
            }, {
                t: this.Vd
            }, {
                t: this.vf
            }, {
                t: this.Ud
            }, {
                t: this.Td
            }, {
                t: this.Sd
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ca
            }, {
                t: this.da
            }, {
                t: this.Zm
            }]
        }, 4).to({
            state: [{
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ca
                }, {
                    t: this.da
                },
                {
                    t: this.sj
                }, {
                    t: this.rj
                }, {
                    t: this.qj
                }, {
                    t: this.pj
                }, {
                    t: this.Ph
                }, {
                    t: this.oj
                }, {
                    t: this.Yd
                }, {
                    t: this.Xd
                }, {
                    t: this.nj
                }, {
                    t: this.mj
                }, {
                    t: this.Oh
                }, {
                    t: this.$m
                }
            ]
        }, 4).to({
            state: [{
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ca
            }, {
                t: this.da
            }, {
                t: this.Yd
            }, {
                t: this.Bj
            }, {
                t: this.Aj
            }, {
                t: this.zj
            }, {
                t: this.yj
            }, {
                t: this.xj
            }, {
                t: this.wj
            }, {
                t: this.Xd
            }, {
                t: this.vj
            }, {
                t: this.uj
            }, {
                t: this.tj
            }, {
                t: this.an
            }]
        }, 4).to({
            state: [{
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ca
                }, {
                    t: this.da
                }, {
                    t: this.Yd
                }, {
                    t: this.Kj
                }, {
                    t: this.Jj
                }, {
                    t: this.Ij
                }, {
                    t: this.Hj
                }, {
                    t: this.Gj
                },
                {
                    t: this.Fj
                }, {
                    t: this.Xd
                }, {
                    t: this.Ej
                }, {
                    t: this.Dj
                }, {
                    t: this.Cj
                }, {
                    t: this.bn
                }
            ]
        }, 4).to({
            state: [{
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ca
            }, {
                t: this.da
            }, {
                t: this.Qh
            }, {
                t: this.Sj
            }, {
                t: this.Rj
            }, {
                t: this.Qj
            }, {
                t: this.Pj
            }, {
                t: this.Oj
            }, {
                t: this.Yd
            }, {
                t: this.Xd
            }, {
                t: this.Nj
            }, {
                t: this.Mj
            }, {
                t: this.Lj
            }, {
                t: this.cn
            }]
        }, 4).to({
                state: [{
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ca
                }, {
                    t: this.da
                }, {
                    t: this.Qh
                }, {
                    t: this.Yj
                }, {
                    t: this.Xj
                }, {
                    t: this.Wj
                }, {
                    t: this.Vj
                }, {
                    t: this.Ph
                }, {
                    t: this.Yd
                }, {
                    t: this.Xd
                }, {
                    t: this.Uj
                }, {
                    t: this.Tj
                }, {
                    t: this.Oh
                }, {
                    t: this.dn
                }]
            },
            4).to({
            state: [{
                t: this.lk
            }, {
                t: this.kk
            }, {
                t: this.jk
            }, {
                t: this.ik
            }, {
                t: this.hk
            }, {
                t: this.gk
            }, {
                t: this.fk
            }, {
                t: this.ek
            }, {
                t: this.dk
            }, {
                t: this.ck
            }, {
                t: this.bk
            }, {
                t: this.ak
            }, {
                t: this.$j
            }, {
                t: this.Zj
            }, {
                t: this.en
            }]
        }, 4).to({
            state: [{
                t: this.zk
            }, {
                t: this.yk
            }, {
                t: this.xk
            }, {
                t: this.wk
            }, {
                t: this.vk
            }, {
                t: this.uk
            }, {
                t: this.tk
            }, {
                t: this.sk
            }, {
                t: this.rk
            }, {
                t: this.qk
            }, {
                t: this.pk
            }, {
                t: this.nk
            }, {
                t: this.mk
            }, {
                t: this.hn
            }, {
                t: this.fn
            }]
        }, 4).to({
            state: [{
                    t: this.Ik
                }, {
                    t: this.Hk
                }, {
                    t: this.Gk
                }, {
                    t: this.Fk
                }, {
                    t: this.Ek
                }, {
                    t: this.Dk
                }, {
                    t: this.Ck
                }, {
                    t: this.Bk
                },
                {
                    t: this.Ak
                }, {
                    t: this.ln
                }, {
                    t: this.kn
                }, {
                    t: this.jn
                }
            ]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.Kk
            }, {
                t: this.rg
            }, {
                t: this.mn
            }]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.Lk
            }, {
                t: this.rg
            }, {
                t: this.nn
            }]
        }, 4).to({
            state: [{
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                },
                {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.Nk
                }, {
                    t: this.Mk
                }, {
                    t: this.pn
                }
            ]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.Ok
            }, {
                t: this.rg
            }, {
                t: this.qn
            }]
        }, 4).to({
            state: [{
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                }, {
                    t: this.ea
                }, {
                    t: this.fa
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.Pk
                },
                {
                    t: this.Jk
                }
            ]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.Kk
            }, {
                t: this.rg
            }, {
                t: this.rn
            }]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.Lk
            }, {
                t: this.rg
            }, {
                t: this.sn
            }]
        }, 4).to({
            state: [{
                    t: this.oa
                }, {
                    t: this.ma
                }, {
                    t: this.la
                }, {
                    t: this.ja
                }, {
                    t: this.ka
                }, {
                    t: this.ha
                }, {
                    t: this.ia
                },
                {
                    t: this.ea
                }, {
                    t: this.da
                }, {
                    t: this.ca
                }, {
                    t: this.aa
                }, {
                    t: this.$
                }, {
                    t: this.Nk
                }, {
                    t: this.Mk
                }, {
                    t: this.tn
                }
            ]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.Ok
            }, {
                t: this.rg
            }, {
                t: this.un
            }]
        }, 4).to({
            state: [{
                t: this.oa
            }, {
                t: this.ma
            }, {
                t: this.la
            }, {
                t: this.ja
            }, {
                t: this.ka
            }, {
                t: this.ha
            }, {
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.Pk
            }, {
                t: this.Rd
            }]
        }, 4).to({
            state: [{
                    t: this.$b
                },
                {
                    t: this.Uk
                }, {
                    t: this.Zb
                }, {
                    t: this.Yb
                }, {
                    t: this.Xb
                }, {
                    t: this.Wb
                }, {
                    t: this.Tk
                }, {
                    t: this.Vb
                }, {
                    t: this.Sk
                }, {
                    t: this.Rk
                }, {
                    t: this.Ub
                }, {
                    t: this.Qk
                }, {
                    t: this.ca
                }, {
                    t: this.vn
                }
            ]
        }, 4).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.$k
            }, {
                t: this.Zk
            }, {
                t: this.Yk
            }, {
                t: this.Xk
            }, {
                t: this.Wk
            }, {
                t: this.wn
            }, {
                t: this.Vk
            }]
        }, 2).to({
            state: [{
                    t: this.$b
                }, {
                    t: this.Zb
                }, {
                    t: this.Yb
                }, {
                    t: this.Xb
                }, {
                    t: this.Wb
                }, {
                    t: this.Vb
                }, {
                    t: this.Ub
                }, {
                    t: this.ca
                }, {
                    t: this.el
                }, {
                    t: this.dl
                }, {
                    t: this.cl
                }, {
                    t: this.bl
                },
                {
                    t: this.ea
                }, {
                    t: this.xn
                }, {
                    t: this.al
                }
            ]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.jl
            }, {
                t: this.il
            }, {
                t: this.hl
            }, {
                t: this.gl
            }, {
                t: this.ea
            }, {
                t: this.yn
            }, {
                t: this.fl
            }]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.ol
            }, {
                t: this.nl
            }, {
                t: this.ml
            }, {
                t: this.ll
            }, {
                t: this.ea
            }, {
                t: this.An
            }, {
                t: this.zn
            }, {
                t: this.kl
            }]
        }, 2).to({
            state: [{
                    t: this.$b
                }, {
                    t: this.Zb
                }, {
                    t: this.Yb
                }, {
                    t: this.Xb
                },
                {
                    t: this.Wb
                }, {
                    t: this.Vb
                }, {
                    t: this.Ub
                }, {
                    t: this.ca
                }, {
                    t: this.ul
                }, {
                    t: this.tl
                }, {
                    t: this.Dn
                }, {
                    t: this.rl
                }, {
                    t: this.ea
                }, {
                    t: this.Cn
                }, {
                    t: this.Bn
                }, {
                    t: this.ql
                }, {
                    t: this.pl
                }
            ]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.Al
            }, {
                t: this.zl
            }, {
                t: this.yl
            }, {
                t: this.xl
            }, {
                t: this.ea
            }, {
                t: this.Fn
            }, {
                t: this.En
            }, {
                t: this.wl
            }, {
                t: this.vl
            }]
        }, 2).to({
            state: [{
                    t: this.$b
                }, {
                    t: this.Zb
                }, {
                    t: this.Yb
                }, {
                    t: this.Xb
                }, {
                    t: this.Wb
                }, {
                    t: this.Vb
                }, {
                    t: this.Ub
                }, {
                    t: this.ca
                }, {
                    t: this.Fl
                }, {
                    t: this.El
                },
                {
                    t: this.Dl
                }, {
                    t: this.Cl
                }, {
                    t: this.ea
                }, {
                    t: this.Hn
                }, {
                    t: this.Bl
                }, {
                    t: this.Gn
                }
            ]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.Jl
            }, {
                t: this.Il
            }, {
                t: this.Hl
            }, {
                t: this.Gl
            }, {
                t: this.ea
            }, {
                t: this.Jn
            }, {
                t: this.In
            }]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.Nl
            }, {
                t: this.Ml
            }, {
                t: this.Ll
            }, {
                t: this.Kl
            }, {
                t: this.ea
            }, {
                t: this.Kn
            }]
        }, 2).to({
            state: [{
                    t: this.$b
                }, {
                    t: this.Uk
                }, {
                    t: this.Zb
                },
                {
                    t: this.Yb
                }, {
                    t: this.Xb
                }, {
                    t: this.Wb
                }, {
                    t: this.Tk
                }, {
                    t: this.Vb
                }, {
                    t: this.Sk
                }, {
                    t: this.Rk
                }, {
                    t: this.Ub
                }, {
                    t: this.Qk
                }, {
                    t: this.ca
                }, {
                    t: this.Ln
                }
            ]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.$k
            }, {
                t: this.Zk
            }, {
                t: this.Yk
            }, {
                t: this.Xk
            }, {
                t: this.Wk
            }, {
                t: this.Mn
            }, {
                t: this.Vk
            }]
        }, 2).to({
            state: [{
                    t: this.$b
                }, {
                    t: this.Zb
                }, {
                    t: this.Yb
                }, {
                    t: this.Xb
                }, {
                    t: this.Wb
                }, {
                    t: this.Vb
                }, {
                    t: this.Ub
                }, {
                    t: this.ca
                }, {
                    t: this.el
                }, {
                    t: this.dl
                }, {
                    t: this.cl
                }, {
                    t: this.bl
                }, {
                    t: this.ea
                }, {
                    t: this.Nn
                },
                {
                    t: this.al
                }
            ]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.jl
            }, {
                t: this.il
            }, {
                t: this.hl
            }, {
                t: this.gl
            }, {
                t: this.ea
            }, {
                t: this.On
            }, {
                t: this.fl
            }]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.ol
            }, {
                t: this.nl
            }, {
                t: this.ml
            }, {
                t: this.ll
            }, {
                t: this.ea
            }, {
                t: this.Qn
            }, {
                t: this.Pn
            }, {
                t: this.kl
            }]
        }, 2).to({
            state: [{
                    t: this.$b
                }, {
                    t: this.Zb
                }, {
                    t: this.Yb
                }, {
                    t: this.Xb
                }, {
                    t: this.Wb
                }, {
                    t: this.Vb
                },
                {
                    t: this.Ub
                }, {
                    t: this.ca
                }, {
                    t: this.ul
                }, {
                    t: this.tl
                }, {
                    t: this.rl
                }, {
                    t: this.Tn
                }, {
                    t: this.ea
                }, {
                    t: this.Sn
                }, {
                    t: this.Rn
                }, {
                    t: this.ql
                }, {
                    t: this.pl
                }
            ]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.Al
            }, {
                t: this.zl
            }, {
                t: this.yl
            }, {
                t: this.xl
            }, {
                t: this.ea
            }, {
                t: this.Vn
            }, {
                t: this.Un
            }, {
                t: this.wl
            }, {
                t: this.vl
            }]
        }, 2).to({
            state: [{
                    t: this.$b
                }, {
                    t: this.Zb
                }, {
                    t: this.Yb
                }, {
                    t: this.Xb
                }, {
                    t: this.Wb
                }, {
                    t: this.Vb
                }, {
                    t: this.Ub
                }, {
                    t: this.ca
                }, {
                    t: this.Fl
                }, {
                    t: this.El
                }, {
                    t: this.Dl
                }, {
                    t: this.Cl
                },
                {
                    t: this.ea
                }, {
                    t: this.Xn
                }, {
                    t: this.Wn
                }, {
                    t: this.Bl
                }
            ]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.Jl
            }, {
                t: this.Il
            }, {
                t: this.Hl
            }, {
                t: this.Gl
            }, {
                t: this.ea
            }, {
                t: this.Zn
            }, {
                t: this.Yn
            }]
        }, 2).to({
            state: [{
                t: this.$b
            }, {
                t: this.Zb
            }, {
                t: this.Yb
            }, {
                t: this.Xb
            }, {
                t: this.Wb
            }, {
                t: this.Vb
            }, {
                t: this.Ub
            }, {
                t: this.ca
            }, {
                t: this.Nl
            }, {
                t: this.Ml
            }, {
                t: this.Ll
            }, {
                t: this.Kl
            }, {
                t: this.ea
            }, {
                t: this.$n
            }]
        }, 2).wait(2))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0,
        32, 176, 192);
    (a.tm = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.Fc = new a.hi;
        this.Fc.name = "num6";
        this.Fc.parent = this;
        this.Fc.setTransform(-72, 8, 1, 1, 0, 0, 0, 8, 8);
        this.Ec = new a.hi;
        this.Ec.name = "num5";
        this.Ec.parent = this;
        this.Ec.setTransform(-56, 8, 1, 1, 0, 0, 0, 8, 8);
        this.bc = new a.hi;
        this.bc.name = "num4";
        this.bc.parent = this;
        this.bc.setTransform(-40, 8, 1, 1, 0, 0, 0, 8, 8);
        this.fb = new a.hi;
        this.fb.name = "num3";
        this.fb.parent = this;
        this.fb.setTransform(-24, 8, 1, 1, 0, 0, 0, 8, 8);
        this.Ga = new a.hi;
        this.Ga.name = "num2";
        this.Ga.parent =
            this;
        this.Ga.setTransform(-8, 8, 1, 1, 0, 0, 0, 8, 8);
        this.ya = new a.hi;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(8, 8, 1, 1, 0, 0, 0, 8, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }, {
                t: this.fb
            }, {
                t: this.bc
            }, {
                t: this.Ec
            }, {
                t: this.Fc
            }]
        }).wait(1))
    }).prototype = n(a.tm, new e.Rectangle(-80, 0, 96, 16), null);
    (a.Zo = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.fb = new a.Xo;
        this.fb.name = "num3";
        this.fb.parent = this;
        this.fb.setTransform(-60, 8, 1, 1, 0, 0, 0, 4, 8);
        this.Ga = new a.Xo;
        this.Ga.name =
            "num2";
        this.Ga.parent = this;
        this.Ga.setTransform(-28, 8, 1, 1, 0, 0, 0, 4, 8);
        this.ya = new a.Xo;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(4, 8, 1, 1, 0, 0, 0, 4, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }, {
                t: this.fb
            }]
        }).wait(1))
    }).prototype = n(a.Zo, new e.Rectangle(-64, 0, 96, 48), null);
    (a.Fg = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.fb = new a.Go;
        this.fb.name = "num3";
        this.fb.parent = this;
        this.fb.setTransform(-28, 8, 1, 1, 0, 0, 0, 4, 8);
        this.Ga = new a.Go;
        this.Ga.name = "num2";
        this.Ga.parent = this;
        this.Ga.setTransform(-12, 8, 1, 1, 0, 0, 0, 4, 8);
        this.ya = new a.Go;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(4, 8, 1, 1, 0, 0, 0, 4, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }, {
                t: this.fb
            }]
        }).wait(1))
    }).prototype = n(a.Fg, new e.Rectangle(-32, 0, 48, 32), null);
    (a.ym = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.fb = new a.Bo;
        this.fb.name = "num3";
        this.fb.parent = this;
        this.fb.setTransform(-24, 8, 1, 1, 0, 0, 0, 8, 8);
        this.Ga = new a.Bo;
        this.Ga.name = "num2";
        this.Ga.parent =
            this;
        this.Ga.setTransform(-8, 8, 1, 1, 0, 0, 0, 8, 8);
        this.ya = new a.Bo;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(8, 8, 1, 1, 0, 0, 0, 8, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }, {
                t: this.fb
            }]
        }).wait(1))
    }).prototype = n(a.ym, new e.Rectangle(-32, 0, 48, 16), null);
    (a.dj = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.fb = new a.Co;
        this.fb.name = "num3";
        this.fb.parent = this;
        this.fb.setTransform(-24, 8, 1, 1, 0, 0, 0, 8, 8);
        this.Ga = new a.Co;
        this.Ga.name = "num2";
        this.Ga.parent = this;
        this.Ga.setTransform(-8,
            8, 1, 1, 0, 0, 0, 8, 8);
        this.ya = new a.Co;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(8, 8, 1, 1, 0, 0, 0, 8, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }, {
                t: this.fb
            }]
        }).wait(1))
    }).prototype = n(a.dj, new e.Rectangle(-32, 0, 48, 16), null);
    (a.xm = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.Ae = new a.zg;
        this.Ae.name = "num8";
        this.Ae.parent = this;
        this.Ae.setTransform(-104, 16, 1, 1, 0, 0, 0, 8, 16);
        this.ze = new a.zg;
        this.ze.name = "num7";
        this.ze.parent = this;
        this.ze.setTransform(-88, 16,
            1, 1, 0, 0, 0, 8, 16);
        this.Fc = new a.zg;
        this.Fc.name = "num6";
        this.Fc.parent = this;
        this.Fc.setTransform(-72, 16, 1, 1, 0, 0, 0, 8, 16);
        this.Ec = new a.zg;
        this.Ec.name = "num5";
        this.Ec.parent = this;
        this.Ec.setTransform(-56, 16, 1, 1, 0, 0, 0, 8, 16);
        this.bc = new a.zg;
        this.bc.name = "num4";
        this.bc.parent = this;
        this.bc.setTransform(-40, 16, 1, 1, 0, 0, 0, 8, 16);
        this.fb = new a.zg;
        this.fb.name = "num3";
        this.fb.parent = this;
        this.fb.setTransform(-24, 16, 1, 1, 0, 0, 0, 8, 16);
        this.Ga = new a.zg;
        this.Ga.name = "num2";
        this.Ga.parent = this;
        this.Ga.setTransform(-8,
            16, 1, 1, 0, 0, 0, 8, 16);
        this.ya = new a.zg;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(8, 16, 1, 1, 0, 0, 0, 8, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }, {
                t: this.fb
            }, {
                t: this.bc
            }, {
                t: this.Ec
            }, {
                t: this.Fc
            }, {
                t: this.ze
            }, {
                t: this.Ae
            }]
        }).wait(1))
    }).prototype = n(a.xm, new e.Rectangle(-112, 0, 128, 32), null);
    (a.gc = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.bc = new a.jj;
        this.bc.name = "num4";
        this.bc.parent = this;
        this.bc.setTransform(-40, 16, 1, 1, 0, 0, 0, 8, 16);
        this.fb = new a.jj;
        this.fb.name =
            "num3";
        this.fb.parent = this;
        this.fb.setTransform(-24, 16, 1, 1, 0, 0, 0, 8, 16);
        this.Ga = new a.jj;
        this.Ga.name = "num2";
        this.Ga.parent = this;
        this.Ga.setTransform(-8, 16, 1, 1, 0, 0, 0, 8, 16);
        this.ya = new a.jj;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(8, 16, 1, 1, 0, 0, 0, 8, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }, {
                t: this.fb
            }, {
                t: this.bc
            }]
        }).wait(1))
    }).prototype = n(a.gc, new e.Rectangle(-48, 0, 64, 32), null);
    (a.Yi = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.fb = new a.Nm;
        this.fb.name =
            "num3";
        this.fb.parent = this;
        this.fb.setTransform(-12, 8, 1, 1, 0, 0, 0, 4, 8);
        this.Ga = new a.Nm;
        this.Ga.name = "num2";
        this.Ga.parent = this;
        this.Ga.setTransform(-4, 8, 1, 1, 0, 0, 0, 4, 8);
        this.ya = new a.Nm;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(4, 8, 1, 1, 0, 0, 0, 4, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }, {
                t: this.fb
            }]
        }).wait(1))
    }).prototype = n(a.Yi, new e.Rectangle(-16, 0, 24, 16), null);
    (a.Yo = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.Ga = new a.vp;
        this.Ga.name = "num2";
        this.Ga.parent = this;
        this.Ga.setTransform(-12, 8, 1, 1, 0, 0, 0, 4, 8);
        this.ya = new a.vp;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(4, 8, 1, 1, 0, 0, 0, 4, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }]
        }).wait(1))
    }).prototype = n(a.Yo, new e.Rectangle(-16, 0, 32, 16), null);
    (a.ii = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.Ga = new a.up;
        this.Ga.name = "num2";
        this.Ga.parent = this;
        this.Ga.setTransform(-8, 16, 1, 1, 0, 0, 0, 8, 16);
        this.ya = new a.up;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(8, 16, 1, 1, 0, 0, 0, 8, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ya
            }, {
                t: this.Ga
            }]
        }).wait(1))
    }).prototype = n(a.ii, new e.Rectangle(-16, 0, 32, 32), null);
    (a.YK = function () {
        this.initialize(void 0, void 0, void 0, {
            main: 0,
            freeSpins: 1
        });
        this.screen = new a.$K;
        this.screen.name = "screen";
        this.screen.parent = this;
        this.screen.setTransform(320, 32, 1, 1, 0, 0, 0, 320, 32);
        this.rm = new a.ZK;
        this.rm.name = "screen2";
        this.rm.parent = this;
        this.rm.setTransform(320, 32, 1, 1, 0, 0, 0, 320, 32);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.screen
            }]
        }).to({
                state: [{
                    t: this.rm
                }]
            },
            1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 64);
    (a.XK = function () {
        this.initialize(void 0, void 0, void 0, {
            init: 0,
            line: 1,
            win: 2,
            risk: 3,
            bonus: 4,
            "super": 5
        });
        this.Dm = function () {
            this.bg.stop();
            this.bg.cache(0, 0, this.bg.getBounds().width, this.bg.getBounds().height);
            this.gotoAndStop("line")
        };
        this.ZB = function () {
            this.bg.getChildAt(0).gotoAndStop("line");
            this.bg.updateCache();
            y(this.Vc);
            y(this.dd);
            y(this.ed)
        };
        this.wC = function () {
            this.bg.getChildAt(0).gotoAndStop("win");
            this.bg.updateCache();
            y(this.Vc);
            y(this.dd);
            y(this.ed)
        };
        this.si = function () {
            this.bg.getChildAt(0).gotoAndStop("risk");
            this.bg.updateCache();
            y(this.Vc);
            y(this.dd);
            y(this.ed)
        };
        this.Gm = function () {
            this.bg.getChildAt(0).gotoAndStop("bonus");
            this.bg.updateCache();
            y(this.Vc);
            y(this.dd);
            y(this.ed)
        };
        this.WC = function () {
            this.bg.getChildAt(0).gotoAndStop("super");
            this.bg.updateCache();
            y(this.Vc);
            y(this.dd);
            y(this.ed)
        };
        this.timeline.addTween(e.Tween.get(this).call(this.Dm).wait(1).call(this.ZB).wait(1).call(this.wC).wait(1).call(this.si).wait(1).call(this.Gm).wait(1).call(this.WC).wait(1));
        this.ah = new a.Yo;
        this.ah.name = "bplRText";
        this.ah.parent = this;
        this.ah.setTransform(608, 56, 1, 1, 0, 0, 0, 0, 8);
        this.Sf = new a.Yo;
        this.Sf.name = "bplLText";
        this.Sf.parent = this;
        this.Sf.setTransform(32, 56, 1, 1, 0, 0, 0, 0, 8);
        this.ed = new a.tm;
        this.ed.name = "creditText";
        this.ed.parent = this;
        this.ed.setTransform(560, 24, 1, 1, 0, 0, 0, -32, 8);
        this.dd = new a.tm;
        this.dd.name = "winText";
        this.dd.parent = this;
        this.dd.setTransform(352, 24, 1, 1, 0, 0, 0, -32, 8);
        this.Vc = new a.tm;
        this.Vc.name = "totalBetText";
        this.Vc.parent = this;
        this.Vc.setTransform(128,
            24, 1, 1, 0, 0, 0, -32, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.Vc,
                p: {
                    x: 128
                }
            }, {
                t: this.dd,
                p: {
                    x: 352
                }
            }, {
                t: this.ed
            }, {
                t: this.Sf,
                p: {
                    visible: !0
                }
            }, {
                t: this.ah,
                p: {
                    visible: !0
                }
            }]
        }).to({
            state: [{
                t: this.Vc,
                p: {
                    x: 160
                }
            }, {
                t: this.dd,
                p: {
                    x: 368
                }
            }, {
                t: this.ed
            }, {
                t: this.Sf,
                p: {
                    visible: !1
                }
            }, {
                t: this.ah,
                p: {
                    visible: !1
                }
            }]
        }, 3).wait(3));
        this.bg = new a.YK;
        this.bg.name = "bg";
        this.bg.parent = this;
        this.bg.setTransform(320, 32, 1, 1, 0, 0, 0, 320, 32);
        this.timeline.addTween(e.Tween.get(this.bg).wait(6))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 64);
    (a.bb = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.sa = new a.fJ;
        this.sa.name = "monkey";
        this.sa.parent = this;
        this.sa.setTransform(312, 384, 1, 1, 0, 0, 0, 88, 96);
        this.timeline.addTween(e.Tween.get(this.sa).wait(1));
        this.ad = new a.Zo;
        this.ad.name = "prize2";
        this.ad.parent = this;
        this.ad.setTransform(482, 344, 1, 1, 0, 0, 0, -30, 24);
        this.$c = new a.Zo;
        this.$c.name = "prize1";
        this.$c.parent = this;
        this.$c.setTransform(130, 344, 1, 1, 0, 0, 0, -30, 24);
        this.ba = new a.nz;
        this.ba.parent = this;
        this.ba.setTransform(432,
            432);
        this.$ = new a.mz;
        this.$.parent = this;
        this.$.setTransform(80, 432);
        this.find = new a.yp;
        this.find.name = "find";
        this.find.parent = this;
        this.find.setTransform(320, 168, 1, 1, 0, 0, 0, 160, 40);
        this.yh = new a.vr;
        this.yh.name = "tablo2";
        this.yh.parent = this;
        this.yh.setTransform(496, 360, 1, 1, 0, 0, 0, 80, 72);
        this.xh = new a.vr;
        this.xh.name = "tablo1";
        this.xh.parent = this;
        this.xh.setTransform(144, 360, 1, 1, 0, 0, 0, 80, 72);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.xh
                }, {
                    t: this.yh
                }, {
                    t: this.find
                }, {
                    t: this.$
                }, {
                    t: this.ba
                },
                {
                    t: this.$c
                }, {
                    t: this.ad
                }
            ]
        }).wait(1));
        this.bg = new a.Am;
        this.bg.name = "bg";
        this.bg.parent = this;
        this.bg.setTransform(320, 272, 1, 1, 0, 0, 0, 320, 208);
        this.timeline.addTween(e.Tween.get(this.bg).wait(1))
    }).prototype = n(a.bb, new e.Rectangle(0, 64, 640, 416), null);
    (a.Na = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ai = new a.TI;
        this.ai.name = "pick";
        this.ai.parent = this;
        this.ai.setTransform(104, 272, 1, 1, 0, 0, 0, 40, 16);
        this.timeline.addTween(e.Tween.get(this.ai).wait(1));
        this.body = new a.Mq;
        this.body.name = "body";
        this.body.parent =
            this;
        this.body.setTransform(96, 392, 1, 1, 0, 0, 0, 32, 40);
        this.Fg = new a.Fg;
        this.Fg.name = "textRiskStep";
        this.Fg.parent = this;
        this.Fg.setTransform(376, 96, 1, 1, 0, 0, 0, -8, 16);
        this.Mh = new a.oi;
        this.Mh.name = "card5";
        this.Mh.parent = this;
        this.Mh.setTransform(552, 192, 1, 1, 0, 0, 0, 56, 80);
        this.Lh = new a.oi;
        this.Lh.name = "card4";
        this.Lh.parent = this;
        this.Lh.setTransform(440, 192, 1, 1, 0, 0, 0, 56, 80);
        this.Kh = new a.oi;
        this.Kh.name = "card3";
        this.Kh.parent = this;
        this.Kh.setTransform(328, 192, 1, 1, 0, 0, 0, 56, 80);
        this.Jh = new a.oi;
        this.Jh.name =
            "card2";
        this.Jh.parent = this;
        this.Jh.setTransform(216, 192, 1, 1, 0, 0, 0, 56, 80);
        this.Ih = new a.oi;
        this.Ih.name = "card1";
        this.Ih.parent = this;
        this.Ih.setTransform(104, 192, 1, 1, 0, 0, 0, 56, 80);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.Ih
            }, {
                t: this.Jh
            }, {
                t: this.Kh
            }, {
                t: this.Lh
            }, {
                t: this.Mh
            }, {
                t: this.Fg
            }, {
                t: this.body
            }]
        }).wait(1));
        this.Wc = new a.Wc;
        this.Wc.name = "cloud";
        this.Wc.parent = this;
        this.Wc.setTransform(119, 344, 1, 1, 0, 0, 0, 8, 8);
        this.sa = new a.oI;
        this.sa.name = "monkey";
        this.sa.parent = this;
        this.sa.setTransform(96,
            376, 1, 1, 0, 0, 0, 32, 24);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.sa
            }, {
                t: this.Wc
            }]
        }).wait(1));
        this.bg = new a.br;
        this.bg.name = "bg";
        this.bg.parent = this;
        this.bg.setTransform(320, 272, 1, 1, 0, 0, 0, 320, 208);
        this.timeline.addTween(e.Tween.get(this.bg).wait(1))
    }).prototype = n(a.Na, new e.Rectangle(0, 64, 640, 416), null);
    (a.Cf = function (b, f, h) {
        this.initialize(b, f, h, {
            move: 0,
            play: 1,
            win: 2,
            take_or_risk: 3,
            take_or_risk2: 4,
            take: 5,
            take2: 6,
            double_to: 7
        });
        this.Mc = new a.dj;
        this.Mc.name = "textMsgPlay2";
        this.Mc.parent =
            this;
        this.Mc.setTransform(40, 32, 1, 1, 0, 0, 0, -8, 8);
        this.Mc.visible = !1;
        this.cd = new a.ym;
        this.cd.name = "textMsgPlay21";
        this.cd.parent = this;
        this.cd.setTransform(40, 32, 1, 1, 0, 0, 0, -8, 8);
        this.cd.visible = !1;
        this.bd = new a.dj;
        this.bd.name = "textMsgPlay1";
        this.bd.parent = this;
        this.bd.setTransform(88, 8, 1, 1, 0, 0, 0, -8, 8);
        this.bd.visible = !1;
        this.tf = new a.ym;
        this.tf.name = "textMsgPlay11";
        this.tf.parent = this;
        this.tf.setTransform(88, 8, 1, 1, 0, 0, 0, -8, 8);
        this.tf.visible = !1;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.tf,
                p: {
                    visible: !1
                }
            }, {
                t: this.bd,
                p: {
                    visible: !1
                }
            }, {
                t: this.cd,
                p: {
                    visible: !1
                }
            }, {
                t: this.Mc,
                p: {
                    visible: !1
                }
            }]
        }).to({
            state: [{
                t: this.tf,
                p: {
                    visible: !0
                }
            }, {
                t: this.bd,
                p: {
                    visible: !0
                }
            }, {
                t: this.cd,
                p: {
                    visible: !0
                }
            }, {
                t: this.Mc,
                p: {
                    visible: !0
                }
            }]
        }, 1).to({
            state: [{
                t: this.tf,
                p: {
                    visible: !1
                }
            }, {
                t: this.bd,
                p: {
                    visible: !1
                }
            }, {
                t: this.cd,
                p: {
                    visible: !1
                }
            }, {
                t: this.Mc,
                p: {
                    visible: !1
                }
            }]
        }, 1).wait(6));
        this.Pf = new a.xm;
        this.Pf.name = "textMsgWin2";
        this.Pf.parent = this;
        this.Pf.setTransform(120, 24, 1, 1, 0, 0, 0, -8, 8);
        this.Pf.visible = !1;
        this.Df = new a.dj;
        this.Df.name = "textMsgWin1";
        this.Df.parent = this;
        this.Df.setTransform(120, 8, 1, 1, 0, 0, 0, -8, 8);
        this.Df.visible = !1;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.Df,
                p: {
                    visible: !1
                }
            }, {
                t: this.Pf,
                p: {
                    regX: -8,
                    regY: 8,
                    x: 120,
                    y: 24,
                    visible: !1
                }
            }]
        }).to({
            state: [{
                t: this.Df,
                p: {
                    visible: !0
                }
            }, {
                t: this.Pf,
                p: {
                    regX: -48,
                    regY: 16,
                    x: 80,
                    y: 32,
                    visible: !0
                }
            }]
        }, 2).to({
            state: [{
                t: this.Df,
                p: {
                    visible: !1
                }
            }]
        }, 1).wait(5));
        this.Ce = new a.xm;
        this.Ce.name = "textMsgDoubleTo";
        this.Ce.parent = this;
        this.Ce.setTransform(104, 32, 1, 1, 0, 0, 0, -24,
            16);
        this.Ce.visible = !1;
        this.timeline.addTween(e.Tween.get(this.Ce).wait(7).to({
            regX: -48,
            x: 80,
            visible: !0
        }, 0).wait(1));
        this.ba = new a.PG;
        this.ba.parent = this;
        this.bh = new a.uq;
        this.bh.name = "credits";
        this.bh.parent = this;
        this.bh.setTransform(104, 31.8, 1, 1, 0, 0, 0, 40, 15.8);
        this.to = new a.yq;
        this.to.name = "to";
        this.to.parent = this;
        this.to.setTransform(128, 7.9, 1, 1, 0, 0, 0, 16, 7.9);
        this.Bg = new a.xq;
        this.Bg.name = "play2";
        this.Bg.parent = this;
        this.Bg.setTransform(40, 7.9, 1, 1, 0, 0, 0, 24, 7.9);
        this.line = new a.wq;
        this.line.name =
            "line";
        this.line.parent = this;
        this.line.setTransform(64, 8, 1, 1, 0, 0, 0, 48, 8);
        this.$ = new a.YG;
        this.$.parent = this;
        this.$.setTransform(16, 0);
        this.aa = new a.ZG;
        this.aa.parent = this;
        this.aa.setTransform(16, 0);
        this.ca = new a.XG;
        this.ca.parent = this;
        this.ca.setTransform(48, 0);
        this.pi = new a.vq;
        this.pi.name = "doubleTo";
        this.pi.parent = this;
        this.pi.setTransform(96, 8, 1, 1, 0, 0, 0, 48, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.Bg
            }, {
                t: this.to
            }, {
                t: this.bh
            }]
        }, 1).to({
                state: [{
                    t: this.line
                }]
            },
            1).to({
            state: [{
                t: this.$
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.ca
            }]
        }, 1).to({
            state: [{
                t: this.pi
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 160, 48);
    (a.bi = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.ye = new a.ye;
        this.ye.name = "motion";
        this.ye.parent = this;
        this.ye.setTransform(48, 224, 1, 1, 0, 0, 0, 48, 192);
        this.Nh = new a.elements;
        this.Nh.name = "el5";
        this.Nh.parent = this;
        this.Nh.setTransform(48, 448, 1, 1, 0, 0, 0, 48, -48);
        this.Wf = new a.elements;
        this.Wf.name = "el4";
        this.Wf.parent = this;
        this.Wf.setTransform(48, 336, 1, 1, 0, 0, 0, 48, -48);
        this.Vf = new a.elements;
        this.Vf.name = "el3";
        this.Vf.parent = this;
        this.Vf.setTransform(48, 224, 1, 1, 0, 0, 0, 48, -48);
        this.Uf = new a.elements;
        this.Uf.name = "el2";
        this.Uf.parent = this;
        this.Uf.setTransform(48, 112, 1, 1, 0, 0, 0, 48, -48);
        this.Oc = new a.elements;
        this.Oc.name = "el1";
        this.Oc.parent = this;
        this.Oc.setTransform(48, 0, 1, 1, 0, 0, 0, 48, -48);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.Oc
                }, {
                    t: this.Uf
                }, {
                    t: this.Vf
                }, {
                    t: this.Wf
                },
                {
                    t: this.Nh
                }, {
                    t: this.ye
                }
            ]
        }).wait(1))
    }).prototype = n(a.bi, new e.Rectangle(0, -48, 96, 560), null);
    (a.MG = function () {
        this.initialize(void 0, void 0, void 0, {
            blink: 0,
            rotate: 27,
            face: 62,
            blinkF: 92,
            rotateF: 119,
            faceF: 153,
            breathF: 183,
            breath: 222,
            look: 261,
            win: 333,
            play: 345,
            playF: 432,
            lookF: 519,
            winF: 590,
            dance: 602,
            danceF: 638
        });
        this.DC = function () {
            this.stop()
        };
        this.bD = function () {
            this.stop()
        };
        this.kD = function () {
            this.gotoAndStop("blink")
        };
        this.gC = function () {
            this.stop()
        };
        this.pC = function () {
            this.stop()
        };
        this.vC = function () {
            this.gotoAndStop("blinkF")
        };
        this.zC = function () {
            this.stop()
        };
        this.EC = function () {
            this.stop()
        };
        this.MC = function () {
            this.stop()
        };
        this.OC = function () {
            this.stop()
        };
        this.UC = function () {
            this.gotoAndPlay("face")
        };
        this.XC = function () {
            this.gotoAndPlay("faceF")
        };
        this.ZC = function () {
            this.stop()
        };
        this.aD = function () {
            this.stop()
        };
        this.dD = function () {
            this.gotoAndPlay("dance")
        };
        this.fD = function () {
            this.gotoAndPlay("danceF")
        };
        this.timeline.addTween(e.Tween.get(this).wait(26).call(this.DC).wait(35).call(this.bD).wait(30).call(this.kD).wait(27).call(this.gC).wait(34).call(this.pC).wait(30).call(this.vC).wait(39).call(this.zC).wait(39).call(this.EC).wait(72).call(this.MC).wait(12).call(this.OC).wait(87).call(this.UC).wait(87).call(this.XC).wait(71).call(this.ZC).wait(12).call(this.aD).wait(36).call(this.dD).wait(34).call(this.fD).wait(1));
        this.ba = new a.GE;
        this.ba.parent = this;
        this.ba.setTransform(48, 0);
        this.$ = new a.FE;
        this.$.parent = this;
        this.$.setTransform(48, 0);
        this.aa = new a.wE;
        this.aa.parent = this;
        this.aa.setTransform(48, 0);
        this.ca = new a.xE;
        this.ca.parent = this;
        this.ca.setTransform(48, 0);
        this.da = new a.yE;
        this.da.parent = this;
        this.da.setTransform(48, 0);
        this.fa = new a.zE;
        this.fa.parent = this;
        this.fa.setTransform(48, 0);
        this.ga = new a.AE;
        this.ga.parent = this;
        this.ga.setTransform(48, 0);
        this.ea = new a.uG;
        this.ea.parent = this;
        this.ea.setTransform(48,
            0);
        this.ia = new a.vG;
        this.ia.parent = this;
        this.ia.setTransform(48, 0);
        this.ha = new a.FF;
        this.ha.parent = this;
        this.ha.setTransform(48, 0);
        this.ha._off = !0;
        this.ka = new a.zF;
        this.ka.parent = this;
        this.ka.setTransform(48, 0);
        this.ja = new a.nD;
        this.ja.parent = this;
        this.ja.setTransform(61, 12);
        this.la = new a.lG;
        this.la.parent = this;
        this.la.setTransform(48, 0);
        this.ma = new a.mG;
        this.ma.parent = this;
        this.ma.setTransform(48, 0);
        this.oa = new a.wG;
        this.oa.parent = this;
        this.oa.setTransform(48, 0);
        this.Ja = new a.xG;
        this.Ja.parent = this;
        this.Ja.setTransform(48, 0);
        this.Oa = new a.yG;
        this.Oa.parent = this;
        this.Oa.setTransform(48, 0);
        this.Ia = new a.nG;
        this.Ia.parent = this;
        this.Ia.setTransform(48, 0);
        this.Ba = new a.oG;
        this.Ba.parent = this;
        this.Ba.setTransform(48, 0);
        this.Fa = new a.pG;
        this.Fa.parent = this;
        this.Fa.setTransform(48, 0);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ba
            }]
        }, 27).to({
            state: [{
                t: this.$
            }]
        }, 65).to({
            state: [{
                t: this.ba
            }]
        }, 130).to({
            state: [{
                t: this.aa
            }]
        }, 39).to({
            state: [{
                t: this.ca
            }]
        }, 8).to({
                state: [{
                    t: this.da
                }]
            },
            8).to({
            state: [{
                t: this.fa
            }]
        }, 8).to({
            state: [{
                t: this.ga
            }]
        }, 8).to({
            state: [{
                t: this.fa
            }]
        }, 8).to({
            state: [{
                t: this.da
            }]
        }, 8).to({
            state: [{
                t: this.ca
            }]
        }, 8).to({
            state: [{
                t: this.aa
            }]
        }, 8).to({
            state: [{
                t: this.ea
            }]
        }, 8).to({
            state: [{
                t: this.ia
            }]
        }, 4).to({
            state: [{
                t: this.ea
            }]
        }, 4).to({
            state: [{
                t: this.ba
            }]
        }, 4).to({
            state: [{
                t: this.ha
            }]
        }, 8).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
                state: [{
                    t: this.ha
                }]
            },
            5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ha
            }]
        }, 5).to({
            state: [{
                t: this.ba
            }]
        }, 5).to({
            state: [{
                t: this.$
            }]
        }, 4).to({
            state: [{
                t: this.ka
            }]
        }, 8).to({
            state: [{
                t: this.ka
            }]
        }, 25).to({
            state: [{
                t: this.ka
            }]
        }, 25).to({
            state: [{
                t: this.$
            }]
        }, 25).to({
            state: [{
                t: this.aa
            }, {
                t: this.ja
            }]
        }, 4).to({
            state: [{
                t: this.ca
            }, {
                t: this.ja
            }]
        }, 8).to({
            state: [{
                t: this.da
            }, {
                t: this.ja
            }]
        }, 8).to({
            state: [{
                    t: this.fa
                },
                {
                    t: this.ja
                }
            ]
        }, 8).to({
            state: [{
                t: this.ga
            }, {
                t: this.ja
            }]
        }, 8).to({
            state: [{
                t: this.fa
            }, {
                t: this.ja
            }]
        }, 8).to({
            state: [{
                t: this.da
            }, {
                t: this.ja
            }]
        }, 8).to({
            state: [{
                t: this.ca
            }, {
                t: this.ja
            }]
        }, 8).to({
            state: [{
                t: this.aa
            }, {
                t: this.ja
            }]
        }, 8).to({
            state: [{
                t: this.la
            }]
        }, 7).to({
            state: [{
                t: this.ma
            }]
        }, 4).to({
            state: [{
                t: this.la
            }]
        }, 4).to({
            state: [{
                t: this.oa
            }]
        }, 4).to({
            state: [{
                t: this.Ja
            }]
        }, 9).to({
            state: [{
                t: this.Oa
            }]
        }, 9).to({
            state: [{
                t: this.Ja
            }]
        }, 9).to({
            state: [{
                t: this.Ia
            }]
        }, 9).to({
            state: [{
                t: this.Ba
            }]
        }, 9).to({
            state: [{
                t: this.Fa
            }]
        }, 9).to({
                state: [{
                    t: this.Ba
                }]
            },
            8).wait(8));
        this.timeline.addTween(e.Tween.get(this.ba).wait(27).to({
            _off: !0
        }, 65).wait(130).to({
            _off: !1
        }, 0).to({
            _off: !0
        }, 39).wait(84).to({
            _off: !1
        }, 0).to({
            _off: !0
        }, 8).wait(75).to({
            _off: !1
        }, 0).to({
            _off: !0
        }, 4).wait(240));
        this.timeline.addTween(e.Tween.get(this.ha).wait(353).to({
            _off: !1
        }, 0).wait(70).to({
            _off: !0
        }, 5).wait(244));
        this.qa = new a.IE;
        this.qa.parent = this;
        this.qa.setTransform(48, 48);
        this.ua = new a.OE;
        this.ua.parent = this;
        this.ua.setTransform(128, 48);
        this.Ma = new a.wF;
        this.Ma.parent = this;
        this.Ma.setTransform(48,
            48);
        this.La = new a.xF;
        this.La.parent = this;
        this.La.setTransform(48, 48);
        this.Wa = new a.yF;
        this.Wa.parent = this;
        this.Wa.setTransform(48, 48);
        this.Ra = new a.BE;
        this.Ra.parent = this;
        this.Ra.setTransform(128, 32);
        this.Ca = new a.CE;
        this.Ca.parent = this;
        this.Ca.setTransform(128, 32);
        this.Xa = new a.DE;
        this.Xa.parent = this;
        this.Xa.setTransform(128, 32);
        this.Ya = new a.EE;
        this.Ya.parent = this;
        this.Ya.setTransform(128, 32);
        this.Sa = new a.zG;
        this.Sa.parent = this;
        this.Sa.setTransform(128, 32);
        this.Za = new a.AG;
        this.Za.parent = this;
        this.Za.setTransform(128, 32);
        this.Pa = new a.HE;
        this.Pa.parent = this;
        this.Pa.setTransform(48, 32);
        this.Ta = new a.LF;
        this.Ta.parent = this;
        this.Ta.setTransform(48, 48);
        this.Ua = new a.RF;
        this.Ua.parent = this;
        this.Ua.setTransform(48, 80);
        this.Va = new a.WF;
        this.Va.parent = this;
        this.Va.setTransform(128, 48);
        this.gb = new a.GF;
        this.gb.parent = this;
        this.gb.setTransform(48, 32);
        this.cb = new a.MF;
        this.cb.parent = this;
        this.cb.setTransform(48, 48);
        this.wa = new a.SF;
        this.wa.parent = this;
        this.wa.setTransform(48, 80);
        this.$a = new a.XF;
        this.$a.parent = this;
        this.$a.setTransform(128, 48);
        this.Ea = new a.HF;
        this.Ea.parent = this;
        this.Ea.setTransform(48, 32);
        this.hb = new a.NF;
        this.hb.parent = this;
        this.hb.setTransform(48, 48);
        this.ib = new a.TF;
        this.ib.parent = this;
        this.ib.setTransform(48, 80);
        this.jb = new a.YF;
        this.jb.parent = this;
        this.jb.setTransform(128, 48);
        this.Ha = new a.IF;
        this.Ha.parent = this;
        this.Ha.setTransform(48, 32);
        this.Aa = new a.OF;
        this.Aa.parent = this;
        this.Aa.setTransform(48, 48);
        this.Ka = new a.Sp;
        this.Ka.parent = this;
        this.Ka.setTransform(48,
            80);
        this.Qa = new a.ZF;
        this.Qa.parent = this;
        this.Qa.setTransform(128, 48);
        this.ab = new a.JF;
        this.ab.parent = this;
        this.ab.setTransform(48, 32);
        this.nb = new a.PF;
        this.nb.parent = this;
        this.nb.setTransform(48, 48);
        this.tb = new a.UF;
        this.tb.parent = this;
        this.tb.setTransform(48, 80);
        this.pb = new a.$F;
        this.pb.parent = this;
        this.pb.setTransform(128, 48);
        this.Bb = new a.KF;
        this.Bb.parent = this;
        this.Bb.setTransform(48, 32);
        this.Da = new a.QF;
        this.Da.parent = this;
        this.Da.setTransform(48, 48);
        this.kb = new a.VF;
        this.kb.parent = this;
        this.kb.setTransform(48,
            80);
        this.sb = new a.aG;
        this.sb.parent = this;
        this.sb.setTransform(128, 48);
        this.Cb = new a.Rp;
        this.Cb.parent = this;
        this.Cb.setTransform(48, 32);
        this.Db = new a.Pp;
        this.Db.parent = this;
        this.Db.setTransform(48, 32);
        this.Ab = new a.Qp;
        this.Ab.parent = this;
        this.Ab.setTransform(48, 80);
        this.wb = new a.AF;
        this.wb.parent = this;
        this.wb.setTransform(48, 32);
        this.Eb = new a.BF;
        this.Eb.parent = this;
        this.Eb.setTransform(48, 32);
        this.xb = new a.CF;
        this.xb.parent = this;
        this.xb.setTransform(48, 32);
        this.yb = new a.DF;
        this.yb.parent = this;
        this.yb.setTransform(48,
            32);
        this.Fb = new a.EF;
        this.Fb.parent = this;
        this.Fb.setTransform(48, 32);
        this.Jb = new a.BG;
        this.Jb.parent = this;
        this.Jb.setTransform(128, 32);
        this.zb = new a.CG;
        this.zb.parent = this;
        this.zb.setTransform(128, 32);
        this.Gb = new a.DG;
        this.Gb.parent = this;
        this.Gb.setTransform(128, 32);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }]
        }).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }]
        }, 27).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.Ma
            }]
        }, 35).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.La
            }]
        }, 4).to({
            state: [{
                    t: this.ua
                },
                {
                    t: this.qa
                }, {
                    t: this.Wa
                }
            ]
        }, 4).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.La
            }]
        }, 14).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.Ma
            }]
        }, 4).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }]
        }, 4).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.Ma
            }]
        }, 61).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.La
            }]
        }, 4).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.Wa
            }]
        }, 4).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.La
            }]
        }, 14).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.Ma
            }]
        }, 4).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }]
        }, 4).to({
                state: [{
                    t: this.ua
                }, {
                    t: this.qa
                }]
            },
            39).to({
            state: [{
                t: this.Ra
            }]
        }, 39).to({
            state: [{
                t: this.Ca
            }]
        }, 16).to({
            state: [{
                t: this.Xa
            }]
        }, 8).to({
            state: [{
                t: this.Ya
            }]
        }, 8).to({
            state: [{
                t: this.Xa
            }]
        }, 8).to({
            state: [{
                t: this.Ca
            }]
        }, 8).to({
            state: [{
                t: this.Ra
            }]
        }, 16).to({
            state: [{
                t: this.Sa
            }]
        }, 8).to({
            state: [{
                t: this.Za
            }]
        }, 4).to({
            state: [{
                t: this.Sa
            }]
        }, 4).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.Pa
            }]
        }, 4).to({
            state: [{
                t: this.Va
            }, {
                t: this.Ua
            }, {
                t: this.Ta
            }, {
                t: this.Pa
            }]
        }, 4).to({
            state: [{
                t: this.$a
            }, {
                t: this.wa
            }, {
                t: this.cb
            }, {
                t: this.gb
            }]
        }, 4).to({
            state: [{
                    t: this.jb
                }, {
                    t: this.ib
                },
                {
                    t: this.hb
                }, {
                    t: this.Ea
                }
            ]
        }, 5).to({
            state: [{
                t: this.Qa
            }, {
                t: this.Ka
            }, {
                t: this.Aa
            }, {
                t: this.Ha
            }]
        }, 5).to({
            state: [{
                t: this.pb
            }, {
                t: this.tb
            }, {
                t: this.nb
            }, {
                t: this.ab
            }]
        }, 5).to({
            state: [{
                t: this.sb
            }, {
                t: this.kb
            }, {
                t: this.Da
            }, {
                t: this.Bb
            }]
        }, 5).to({
            state: [{
                t: this.$a
            }, {
                t: this.wa
            }, {
                t: this.cb
            }, {
                t: this.gb
            }]
        }, 5).to({
            state: [{
                t: this.jb
            }, {
                t: this.ib
            }, {
                t: this.hb
            }, {
                t: this.Ea
            }]
        }, 5).to({
            state: [{
                t: this.Qa
            }, {
                t: this.Ka
            }, {
                t: this.Aa
            }, {
                t: this.Ha
            }]
        }, 5).to({
            state: [{
                t: this.pb
            }, {
                t: this.tb
            }, {
                t: this.nb
            }, {
                t: this.ab
            }]
        }, 5).to({
            state: [{
                    t: this.sb
                }, {
                    t: this.kb
                },
                {
                    t: this.Da
                }, {
                    t: this.Bb
                }
            ]
        }, 5).to({
            state: [{
                t: this.$a
            }, {
                t: this.wa
            }, {
                t: this.cb
            }, {
                t: this.gb
            }]
        }, 5).to({
            state: [{
                t: this.jb
            }, {
                t: this.ib
            }, {
                t: this.hb
            }, {
                t: this.Ea
            }]
        }, 5).to({
            state: [{
                t: this.Qa
            }, {
                t: this.Ka
            }, {
                t: this.Aa
            }, {
                t: this.Ha
            }]
        }, 5).to({
            state: [{
                t: this.pb
            }, {
                t: this.tb
            }, {
                t: this.nb
            }, {
                t: this.ab
            }]
        }, 5).to({
            state: [{
                t: this.sb
            }, {
                t: this.kb
            }, {
                t: this.Da
            }, {
                t: this.Bb
            }]
        }, 5).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.Cb
            }]
        }, 5).to({
            state: [{
                t: this.ua
            }, {
                t: this.qa
            }, {
                t: this.Ab
            }, {
                t: this.Db
            }]
        }, 4).to({
            state: [{
                    t: this.Va
                }, {
                    t: this.Ta
                }, {
                    t: this.Ua
                },
                {
                    t: this.Db
                }
            ]
        }, 4).to({
            state: [{
                t: this.$a
            }, {
                t: this.cb
            }, {
                t: this.wa
            }, {
                t: this.wb
            }]
        }, 4).to({
            state: [{
                t: this.jb
            }, {
                t: this.hb
            }, {
                t: this.ib
            }, {
                t: this.Eb
            }]
        }, 5).to({
            state: [{
                t: this.Qa
            }, {
                t: this.Aa
            }, {
                t: this.Ka
            }, {
                t: this.xb
            }]
        }, 5).to({
            state: [{
                t: this.pb
            }, {
                t: this.nb
            }, {
                t: this.tb
            }, {
                t: this.yb
            }]
        }, 5).to({
            state: [{
                t: this.sb
            }, {
                t: this.Da
            }, {
                t: this.kb
            }, {
                t: this.Fb
            }]
        }, 5).to({
            state: [{
                t: this.$a
            }, {
                t: this.cb
            }, {
                t: this.wa
            }, {
                t: this.wb
            }]
        }, 5).to({
            state: [{
                t: this.jb
            }, {
                t: this.hb
            }, {
                t: this.ib
            }, {
                t: this.Eb
            }]
        }, 5).to({
                state: [{
                    t: this.Qa
                }, {
                    t: this.Aa
                }, {
                    t: this.xb
                }]
            },
            5).to({
            state: [{
                t: this.pb
            }, {
                t: this.nb
            }, {
                t: this.tb
            }, {
                t: this.yb
            }]
        }, 5).to({
            state: [{
                t: this.sb
            }, {
                t: this.Da
            }, {
                t: this.kb
            }, {
                t: this.Fb
            }]
        }, 5).to({
            state: [{
                t: this.$a
            }, {
                t: this.cb
            }, {
                t: this.wa
            }, {
                t: this.wb
            }]
        }, 5).to({
            state: [{
                t: this.jb
            }, {
                t: this.hb
            }, {
                t: this.ib
            }, {
                t: this.Eb
            }]
        }, 5).to({
            state: [{
                t: this.Qa
            }, {
                t: this.Aa
            }, {
                t: this.Ka
            }, {
                t: this.xb
            }]
        }, 5).to({
            state: [{
                t: this.pb
            }, {
                t: this.nb
            }, {
                t: this.tb
            }, {
                t: this.yb
            }]
        }, 5).to({
            state: [{
                t: this.sb
            }, {
                t: this.Da
            }, {
                t: this.kb
            }, {
                t: this.Fb
            }]
        }, 5).to({
                state: [{
                    t: this.ua
                }, {
                    t: this.qa
                }, {
                    t: this.Ab
                }, {
                    t: this.Db
                }]
            },
            5).to({
            state: [{
                t: this.Ra
            }]
        }, 4).to({
            state: [{
                t: this.Ca
            }]
        }, 16).to({
            state: [{
                t: this.Xa
            }]
        }, 8).to({
            state: [{
                t: this.Ya
            }]
        }, 8).to({
            state: [{
                t: this.Xa
            }]
        }, 8).to({
            state: [{
                t: this.Ca
            }]
        }, 8).to({
            state: [{
                t: this.Ra
            }]
        }, 16).to({
            state: [{
                t: this.Sa
            }]
        }, 7).to({
            state: [{
                t: this.Za
            }]
        }, 4).to({
            state: [{
                t: this.Sa
            }]
        }, 4).to({
            state: [{
                t: this.Jb
            }]
        }, 4).to({
            state: [{
                t: this.zb
            }]
        }, 9).to({
            state: [{
                t: this.Gb
            }]
        }, 9).to({
            state: [{
                t: this.zb
            }]
        }, 9).to({
            state: [{
                t: this.Jb
            }]
        }, 9).to({
            state: [{
                t: this.zb
            }]
        }, 9).to({
            state: [{
                t: this.Gb
            }]
        }, 9).to({
                state: [{
                    t: this.zb
                }]
            },
            8).wait(8));
        this.ra = new a.JE;
        this.ra.parent = this;
        this.ra.setTransform(0, 48);
        this.Hb = new a.vE;
        this.Hb.parent = this;
        this.Hb.setTransform(-16, 32);
        this.Ib = new a.qG;
        this.Ib.parent = this;
        this.Ib.setTransform(-16, 32);
        this.Kb = new a.Sp;
        this.Kb.parent = this;
        this.Kb.setTransform(48, 80);
        this.ac = new a.rG;
        this.ac.parent = this;
        this.ac.setTransform(-16, 32);
        this.Sb = new a.sG;
        this.Sb.parent = this;
        this.Sb.setTransform(-16, 32);
        this.cc = new a.tG;
        this.cc.parent = this;
        this.cc.setTransform(-16, 32);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ra
            }]
        }).to({
                state: [{
                    t: this.ra
                }]
            },
            27).to({
            state: [{
                t: this.ra
            }]
        }, 65).to({
            state: [{
                t: this.ra
            }]
        }, 130).to({
            state: [{
                t: this.Hb
            }]
        }, 39).to({
            state: [{
                t: this.Ib
            }]
        }, 72).to({
            state: [{
                t: this.ra
            }]
        }, 12).to({
            state: [{
                t: this.ra
            }]
        }, 4).to({
            state: [{
                t: this.ra
            }]
        }, 4).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
                state: [{
                    t: this.ra
                }]
            },
            5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 4).to({
            state: [{
                t: this.ra
            }]
        }, 4).to({
            state: [{
                t: this.ra
            }]
        }, 4).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }, {
                t: this.Kb
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
                state: [{
                    t: this.ra
                }]
            },
            5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.ra
            }]
        }, 5).to({
            state: [{
                t: this.Hb
            }]
        }, 4).to({
            state: [{
                t: this.Ib
            }]
        }, 71).to({
            state: [{
                t: this.ac
            }]
        }, 12).to({
            state: [{
                t: this.Sb
            }]
        }, 9).to({
            state: [{
                t: this.cc
            }]
        }, 9).to({
            state: [{
                t: this.Sb
            }]
        }, 9).to({
            state: [{
                t: this.ac
            }]
        }, 9).to({
            state: [{
                t: this.Sb
            }]
        }, 9).to({
            state: [{
                t: this.cc
            }]
        }, 9).to({
            state: [{
                t: this.Sb
            }]
        }, 8).wait(8));
        this.timeline.addTween(e.Tween.get(this.ra).wait(222).to({
            _off: !0
        }, 39).wait(84).to({
            _off: !1
        }, 0).wait(170).to({
                _off: !0
            },
            4).wait(153));
        this.Yf = new a.KG;
        this.Yf.name = "eye";
        this.Yf.parent = this;
        this.Yf.setTransform(88, 40, 1, 1, 0, 0, 0, 88, 40);
        this.timeline.addTween(e.Tween.get(this.Yf).wait(672));
        this.hc = new a.LG;
        this.hc.parent = this;
        this.hc.setTransform(88, 96, 1, 1, 0, 0, 0, 40, 16);
        this.timeline.addTween(e.Tween.get(this.hc).wait(672))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 176, 112);
    (a.pa = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.Lb = new a.Lb;
        this.Lb.name = "msgLimit";
        this.Lb.parent = this;
        this.Lb.setTransform(320,
            224, 1, 1, 0, 0, 0, 80, 16);
        this.timeline.addTween(e.Tween.get(this.Lb).wait(1));
        this.fh = new a.fh;
        this.fh.name = "line3";
        this.fh.parent = this;
        this.fh.setTransform(320, 361.5, 1, 1, 0, 0, 0, 280, 1.5);
        this.dh = new a.dh;
        this.dh.name = "line1";
        this.dh.parent = this;
        this.dh.setTransform(320, 224.5, 1, 1, 0, 0, 0, 280, 1.5);
        this.mh = new a.mh;
        this.mh.name = "line9";
        this.mh.parent = this;
        this.mh.setTransform(320, 166.5, 1, 1, 0, 0, 0, 280, 33.5);
        this.eh = new a.eh;
        this.eh.name = "line2";
        this.eh.parent = this;
        this.eh.setTransform(320.4, 88.6, 1, 1, 0, 0, 0, 280.4,
            1.6);
        this.kh = new a.kh;
        this.kh.name = "line8";
        this.kh.parent = this;
        this.kh.setTransform(320.6, 283.5, 1, 1, 0, 0, 0, 280.6, 33.5);
        this.jh = new a.jh;
        this.jh.name = "line7";
        this.jh.parent = this;
        this.jh.setTransform(320.6, 291.5, 1, 1, 0, 0, 0, 280.6, 49.5);
        this.ih = new a.ih;
        this.ih.name = "line6";
        this.ih.parent = this;
        this.ih.setTransform(320.6, 159.5, 1, 1, 0, 0, 0, 280.6, 49.5);
        this.gh = new a.gh;
        this.gh.name = "line4";
        this.gh.parent = this;
        this.gh.setTransform(320, 236.3, 1, 1, 0, 0, 0, 280, 103.3);
        this.hh = new a.hh;
        this.hh.name = "line5";
        this.hh.parent =
            this;
        this.hh.setTransform(320.6, 207.7, 1, 1, 0, 0, 0, 280.6, 102.7);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.hh
            }, {
                t: this.gh
            }, {
                t: this.ih
            }, {
                t: this.jh
            }, {
                t: this.kh
            }, {
                t: this.eh
            }, {
                t: this.mh
            }, {
                t: this.dh
            }, {
                t: this.fh
            }]
        }).wait(1));
        this.fb = new a.fb;
        this.fb.name = "num3";
        this.fb.parent = this;
        this.fb.setTransform(320, 368, 1, 1, 0, 0, 0, 320, 16);
        this.ze = new a.ze;
        this.ze.name = "num7";
        this.ze.parent = this;
        this.ze.setTransform(320, 336, 1, 1, 0, 0, 0, 320, 16);
        this.Ec = new a.Ec;
        this.Ec.name = "num5";
        this.Ec.parent = this;
        this.Ec.setTransform(320,
            304, 1, 1, 0, 0, 0, 320, 16);
        this.Ae = new a.Ae;
        this.Ae.name = "num8";
        this.Ae.parent = this;
        this.Ae.setTransform(320, 256, 1, 1, 0, 0, 0, 320, 16);
        this.ya = new a.ya;
        this.ya.name = "num1";
        this.ya.parent = this;
        this.ya.setTransform(320, 224, 1, 1, 0, 0, 0, 320, 16);
        this.vh = new a.vh;
        this.vh.name = "num9";
        this.vh.parent = this;
        this.vh.setTransform(320, 192, 1, 1, 0, 0, 0, 320, 16);
        this.bc = new a.bc;
        this.bc.name = "num4";
        this.bc.parent = this;
        this.bc.setTransform(320, 144, 1, 1, 0, 0, 0, 320, 16);
        this.Fc = new a.Fc;
        this.Fc.name = "num6";
        this.Fc.parent = this;
        this.Fc.setTransform(320,
            112, 1, 1, 0, 0, 0, 320, 16);
        this.Ga = new a.Ga;
        this.Ga.name = "num2";
        this.Ga.parent = this;
        this.Ga.setTransform(320, 80, 1, 1, 0, 0, 0, 320, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.Ga
            }, {
                t: this.Fc
            }, {
                t: this.bc
            }, {
                t: this.vh
            }, {
                t: this.ya
            }, {
                t: this.Ae
            }, {
                t: this.Ec
            }, {
                t: this.ze
            }, {
                t: this.fb
            }]
        }).wait(1));
        this.sa = new a.MG;
        this.sa.name = "monkey";
        this.sa.parent = this;
        this.sa.setTransform(264, 424, 1, 1, 0, 0, 0, 88, 56);
        this.timeline.addTween(e.Tween.get(this.sa).wait(1));
        this.bg = new a.pq;
        this.bg.name = "bg";
        this.bg.parent =
            this;
        this.bg.setTransform(320, 432, 1, 1, 0, 0, 0, 320, 368);
        this.timeline.addTween(e.Tween.get(this.bg).wait(1));
        this.ni = new a.blink;
        this.ni.name = "blink6";
        this.ni.parent = this;
        this.ni.setTransform(600, 192, 1, 1, 0, 0, 0, 8, -16);
        this.Hh = new a.blink;
        this.Hh.name = "blink5";
        this.Hh.parent = this;
        this.Hh.setTransform(488, 192, 1, 1, 0, 0, 0, 8, -16);
        this.Gh = new a.blink;
        this.Gh.name = "blink4";
        this.Gh.parent = this;
        this.Gh.setTransform(376, 192, 1, 1, 0, 0, 0, 8, -16);
        this.Fh = new a.blink;
        this.Fh.name = "blink3";
        this.Fh.parent = this;
        this.Fh.setTransform(264,
            192, 1, 1, 0, 0, 0, 8, -16);
        this.Eh = new a.blink;
        this.Eh.name = "blink2";
        this.Eh.parent = this;
        this.Eh.setTransform(152, 192, 1, 1, 0, 0, 0, 8, -16);
        this.mi = new a.blink;
        this.mi.name = "blink1";
        this.mi.parent = this;
        this.mi.setTransform(40, 192, 1, 1, 0, 0, 0, 8, -16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.mi
            }, {
                t: this.Eh
            }, {
                t: this.Fh
            }, {
                t: this.Gh
            }, {
                t: this.Hh
            }, {
                t: this.ni
            }]
        }).wait(1));
        this.gi = new a.bi;
        this.gi.name = "reel5";
        this.gi.parent = this;
        this.gi.setTransform(496, 0);
        this.fi = new a.bi;
        this.fi.name = "reel4";
        this.fi.parent =
            this;
        this.fi.setTransform(384, 0);
        this.ei = new a.bi;
        this.ei.name = "reel3";
        this.ei.parent = this;
        this.ei.setTransform(272, 0);
        this.di = new a.bi;
        this.di.name = "reel2";
        this.di.parent = this;
        this.di.setTransform(160, 0);
        this.ci = new a.bi;
        this.ci.name = "reel1";
        this.ci.parent = this;
        this.ci.setTransform(48, 0);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ci
            }, {
                t: this.di
            }, {
                t: this.ei
            }, {
                t: this.fi
            }, {
                t: this.gi
            }]
        }).wait(1))
    }).prototype = n(a.pa, new e.Rectangle(0, -48, 640, 560), null);
    (a.KK = function () {
        this.initialize(void 0,
            void 0, void 0, {});
        this.Ch = new a.Yi;
        this.Ch.name = "textPlayTo4";
        this.Ch.parent = this;
        this.Ch.setTransform(239, 184, 1, 1, 0, 0, 0, -4, 8);
        this.Bh = new a.Yi;
        this.Bh.name = "textPlayTo3";
        this.Bh.parent = this;
        this.Bh.setTransform(139, 184, 1, 1, 0, 0, 0, -4, 8);
        this.Ah = new a.Yi;
        this.Ah.name = "textPlayTo2";
        this.Ah.parent = this;
        this.Ah.setTransform(171, 168, 1, 1, 0, 0, 0, -4, 8);
        this.zh = new a.Yi;
        this.zh.name = "textPlayTo1";
        this.zh.parent = this;
        this.zh.setTransform(124, 168, 1, 1, 0, 0, 0, -4, 8);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.zh,
                p: {
                    visible: !0
                }
            }, {
                t: this.Ah,
                p: {
                    visible: !0
                }
            }, {
                t: this.Bh,
                p: {
                    visible: !0
                }
            }, {
                t: this.Ch,
                p: {
                    visible: !0
                }
            }]
        }).to({
            state: [{
                t: this.zh,
                p: {
                    visible: !1
                }
            }, {
                t: this.Ah,
                p: {
                    visible: !1
                }
            }, {
                t: this.Bh,
                p: {
                    visible: !1
                }
            }, {
                t: this.Ch,
                p: {
                    visible: !1
                }
            }]
        }, 1).wait(4));
        this.Sg = new a.gc;
        this.Sg.name = "textWin20";
        this.Sg.parent = this;
        this.Sg.setTransform(544, 368, 1, 1, 0, 0, 0, -16, 16);
        this.Sg.visible = !1;
        this.Qg = new a.gc;
        this.Qg.name = "textWin19";
        this.Qg.parent = this;
        this.Qg.setTransform(544, 336, 1, 1, 0, 0, 0, -16, 16);
        this.Qg.visible = !1;
        this.Pg = new a.gc;
        this.Pg.name = "textWin18";
        this.Pg.parent = this;
        this.Pg.setTransform(544, 304, 1, 1, 0, 0, 0, -16, 16);
        this.Pg.visible = !1;
        this.Og = new a.gc;
        this.Og.name = "textWin17";
        this.Og.parent = this;
        this.Og.setTransform(544, 272, 1, 1, 0, 0, 0, -16, 16);
        this.Og.visible = !1;
        this.Ng = new a.gc;
        this.Ng.name = "textWin16";
        this.Ng.parent = this;
        this.Ng.setTransform(544, 240, 1, 1, 0, 0, 0, -16, 16);
        this.Ng.visible = !1;
        this.Hg = new a.gc;
        this.Hg.name = "textWin10";
        this.Hg.parent = this;
        this.Hg.setTransform(544, 192, 1, 1, 0, 0, 0, -16, 16);
        this.Hg.visible = !1;
        this.Zg =
            new a.gc;
        this.Zg.name = "textWin9";
        this.Zg.parent = this;
        this.Zg.setTransform(544, 160, 1, 1, 0, 0, 0, -16, 16);
        this.Zg.visible = !1;
        this.Yg = new a.gc;
        this.Yg.name = "textWin8";
        this.Yg.parent = this;
        this.Yg.setTransform(544, 128, 1, 1, 0, 0, 0, -16, 16);
        this.Yg.visible = !1;
        this.Xg = new a.gc;
        this.Xg.name = "textWin7";
        this.Xg.parent = this;
        this.Xg.setTransform(544, 96, 1, 1, 0, 0, 0, -16, 16);
        this.Xg.visible = !1;
        this.Wg = new a.gc;
        this.Wg.name = "textWin6";
        this.Wg.parent = this;
        this.Wg.setTransform(544, 64, 1, 1, 0, 0, 0, -16, 16);
        this.Wg.visible = !1;
        this.Mg =
            new a.gc;
        this.Mg.name = "textWin15";
        this.Mg.parent = this;
        this.Mg.setTransform(272, 368, 1, 1, 0, 0, 0, -16, 16);
        this.Mg.visible = !1;
        this.Lg = new a.gc;
        this.Lg.name = "textWin14";
        this.Lg.parent = this;
        this.Lg.setTransform(272, 336, 1, 1, 0, 0, 0, -16, 16);
        this.Lg.visible = !1;
        this.Kg = new a.gc;
        this.Kg.name = "textWin13";
        this.Kg.parent = this;
        this.Kg.setTransform(272, 304, 1, 1, 0, 0, 0, -16, 16);
        this.Kg.visible = !1;
        this.Jg = new a.gc;
        this.Jg.name = "textWin12";
        this.Jg.parent = this;
        this.Jg.setTransform(272, 272, 1, 1, 0, 0, 0, -16, 16);
        this.Jg.visible = !1;
        this.Ig = new a.gc;
        this.Ig.name = "textWin11";
        this.Ig.parent = this;
        this.Ig.setTransform(272, 240, 1, 1, 0, 0, 0, -16, 16);
        this.Ig.visible = !1;
        this.Vg = new a.gc;
        this.Vg.name = "textWin5";
        this.Vg.parent = this;
        this.Vg.setTransform(272, 192, 1, 1, 0, 0, 0, -16, 16);
        this.Vg.visible = !1;
        this.Ug = new a.gc;
        this.Ug.name = "textWin4";
        this.Ug.parent = this;
        this.Ug.setTransform(272, 160, 1, 1, 0, 0, 0, -16, 16);
        this.Ug.visible = !1;
        this.Tg = new a.gc;
        this.Tg.name = "textWin3";
        this.Tg.parent = this;
        this.Tg.setTransform(272, 128, 1, 1, 0, 0, 0, -16, 16);
        this.Tg.visible = !1;
        this.Rg = new a.gc;
        this.Rg.name = "textWin2";
        this.Rg.parent = this;
        this.Rg.setTransform(272, 96, 1, 1, 0, 0, 0, -16, 16);
        this.Rg.visible = !1;
        this.Gg = new a.gc;
        this.Gg.name = "textWin1";
        this.Gg.parent = this;
        this.Gg.setTransform(272, 64, 1, 1, 0, 0, 0, -16, 16);
        this.Gg.visible = !1;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.Gg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Rg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Tg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Ug,
                p: {
                    visible: !1
                }
            }, {
                t: this.Vg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Ig,
                p: {
                    visible: !1
                }
            }, {
                t: this.Jg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Kg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Lg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Mg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Wg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Xg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Yg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Zg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Hg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Ng,
                p: {
                    visible: !1
                }
            }, {
                t: this.Og,
                p: {
                    visible: !1
                }
            }, {
                t: this.Pg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Qg,
                p: {
                    visible: !1
                }
            }, {
                t: this.Sg,
                p: {
                    visible: !1
                }
            }]
        }).to({
            state: [{
                    t: this.Gg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Rg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Tg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Ug,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Vg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Ig,
                    p: {
                        visible: !0
                    }
                },
                {
                    t: this.Jg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Kg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Lg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Mg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Wg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Xg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Yg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Zg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Hg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Ng,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Og,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Pg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Qg,
                    p: {
                        visible: !0
                    }
                }, {
                    t: this.Sg,
                    p: {
                        visible: !0
                    }
                }
            ]
        }, 1).to({
            state: [{
                    t: this.Gg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Rg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Tg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Ug,
                    p: {
                        visible: !1
                    }
                },
                {
                    t: this.Vg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Ig,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Jg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Kg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Lg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Mg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Wg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Xg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Yg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Zg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Hg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Ng,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Og,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Pg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Qg,
                    p: {
                        visible: !1
                    }
                }, {
                    t: this.Sg,
                    p: {
                        visible: !1
                    }
                }
            ]
        }, 2).wait(2));
        this.ba = new a.oB;
        this.ba.parent = this;
        this.ba.setTransform(352,
            0);
        this.$ = new a.oD;
        this.$.parent = this;
        this.$.setTransform(64, 159);
        this.aa = new a.fE;
        this.aa.parent = this;
        this.aa.setTransform(0, 32);
        this.ca = new a.dE;
        this.ca.parent = this;
        this.ca.setTransform(192, 304);
        this.da = new a.rE;
        this.da.parent = this;
        this.da.setTransform(384, 64);
        this.fa = new a.sE;
        this.fa.parent = this;
        this.fa.setTransform(160, 64);
        this.ga = new a.oE;
        this.ga.parent = this;
        this.ga.setTransform(96, 112);
        this.ea = new a.pE;
        this.ea.parent = this;
        this.ea.setTransform(272, 32);
        this.ia = new a.gE;
        this.ia.parent = this;
        this.ha =
            new a.pB;
        this.ha.parent = this;
        this.ha.setTransform(352, 0);
        this.ka = new a.XB;
        this.ka.parent = this;
        this.ka.setTransform(184, 128, 1, 1, 0, 0, 0, 136, 96);
        this.ja = new a.qB;
        this.ja.parent = this;
        this.ja.setTransform(352, 0);
        this.la = new a.YB;
        this.la.parent = this;
        this.la.setTransform(320, 216, 1, 1, 0, 0, 0, 272, 184);
        this.ma = new a.rB;
        this.ma.parent = this;
        this.ma.setTransform(352, 0);
        this.oa = new a.nE;
        this.oa.parent = this;
        this.oa.setTransform(64, 48);
        this.Ja = new a.PD;
        this.Ja.parent = this;
        this.Ja.setTransform(64, 128);
        this.Oa = new a.qE;
        this.Oa.parent = this;
        this.Oa.setTransform(64, 48);
        this.Ia = new a.hE;
        this.Ia.parent = this;
        this.Ba = new a.sB;
        this.Ba.parent = this;
        this.Ba.setTransform(352, 0);
        this.Fa = new a.Ap;
        this.Fa.parent = this;
        this.Fa.setTransform(248, 128, 1, 1, 0, 0, 0, 24, 80);
        this.qa = new a.uD;
        this.qa.parent = this;
        this.qa.setTransform(480, 32);
        this.ua = new a.qD;
        this.ua.parent = this;
        this.ua.setTransform(496, 240);
        this.Ma = new a.pD;
        this.Ma.parent = this;
        this.Ma.setTransform(528, 208);
        this.La = new a.aE;
        this.La.parent = this;
        this.La.setTransform(64, 240);
        this.Wa =
            new a.jE;
        this.Wa.parent = this;
        this.Wa.setTransform(224, 208);
        this.Ra = new a.lE;
        this.Ra.parent = this;
        this.Ra.setTransform(272, 224);
        this.Ca = new a.kE;
        this.Ca.parent = this;
        this.Ca.setTransform(208, 224);
        this.Xa = new a.wD;
        this.Xa.parent = this;
        this.Xa.setTransform(480, 128);
        this.Ya = new a.vD;
        this.Ya.parent = this;
        this.Ya.setTransform(496, 48);
        this.Sa = new a.tD;
        this.Sa.parent = this;
        this.Sa.setTransform(272, 48);
        this.Za = new a.zD;
        this.Za.parent = this;
        this.Za.setTransform(64, 176);
        this.Pa = new a.yD;
        this.Pa.parent = this;
        this.Pa.setTransform(64,
            48);
        this.Ta = new a.xD;
        this.Ta.parent = this;
        this.Ta.setTransform(64, 80);
        this.Ua = new a.eE;
        this.Ua.parent = this;
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.ia
            }, {
                t: this.ea
            }, {
                t: this.ga
            }, {
                t: this.fa
            }, {
                t: this.da
            }, {
                t: this.ca
            }, {
                t: this.aa
            }, {
                t: this.$
            }, {
                t: this.ba
            }]
        }).to({
            state: [{
                t: this.ia
            }, {
                t: this.aa
            }, {
                t: this.ka
            }, {
                t: this.ha
            }]
        }, 1).to({
            state: [{
                t: this.ia
            }, {
                t: this.aa
            }, {
                t: this.la
            }, {
                t: this.ja
            }]
        }, 1).to({
            state: [{
                t: this.aa
            }, {
                t: this.Ia
            }, {
                t: this.Oa
            }, {
                t: this.Ja
            }, {
                t: this.oa
            }, {
                t: this.ma
            }]
        }, 1).to({
            state: [{
                    t: this.Ua
                },
                {
                    t: this.Ta
                }, {
                    t: this.Pa
                }, {
                    t: this.Za
                }, {
                    t: this.Sa
                }, {
                    t: this.Ya
                }, {
                    t: this.Xa
                }, {
                    t: this.Ca
                }, {
                    t: this.Ra
                }, {
                    t: this.Wa
                }, {
                    t: this.La
                }, {
                    t: this.Ma
                }, {
                    t: this.ua
                }, {
                    t: this.qa
                }, {
                    t: this.aa
                }, {
                    t: this.Fa
                }, {
                    t: this.Ba
                }
            ]
        }, 1).wait(1));
        this.Va = new a.FD;
        this.Va.parent = this;
        this.Va.setTransform(560, 32);
        this.gb = new a.GD;
        this.gb.parent = this;
        this.gb.setTransform(64, 32, 33, 1);
        this.cb = new a.ED;
        this.cb.parent = this;
        this.cb.setTransform(560, 368);
        this.wa = new a.CD;
        this.wa.parent = this;
        this.wa.setTransform(48, 368);
        this.$a = new a.AD;
        this.$a.parent =
            this;
        this.$a.setTransform(48, 384, 34, 1);
        this.Ea = new a.DD;
        this.Ea.parent = this;
        this.Ea.setTransform(576, 32, 1, 23);
        this.hb = new a.BD;
        this.hb.parent = this;
        this.hb.setTransform(48, 32, 1, 22.999);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.hb
            }, {
                t: this.Ea
            }, {
                t: this.$a
            }, {
                t: this.wa
            }, {
                t: this.cb
            }, {
                t: this.gb
            }, {
                t: this.Va
            }]
        }).wait(5));
        this.ib = new a.jm;
        this.ib.parent = this;
        this.ib.setTransform(0, 400);
        this.jb = new a.Cm;
        this.jb.parent = this;
        this.jb.setTransform(608, 64);
        this.Ha = new a.cE;
        this.Ha.parent = this;
        this.Ha.setTransform(272,
            0);
        this.Aa = new a.Oo;
        this.Aa.parent = this;
        this.Aa.setTransform(464, 384);
        this.Ka = new a.No;
        this.Ka.parent = this;
        this.Ka.setTransform(384, 384);
        this.Qa = new a.Mo;
        this.Qa.parent = this;
        this.Qa.setTransform(304, 384.3);
        this.ab = new a.Lo;
        this.ab.parent = this;
        this.ab.setTransform(224, 384.3);
        this.nb = new a.Ko;
        this.nb.parent = this;
        this.nb.setTransform(144, 384);
        this.tb = new a.Jo;
        this.tb.parent = this;
        this.tb.setTransform(64, 384);
        this.pb = new a.om;
        this.pb.parent = this;
        this.pb.setTransform(384, 400);
        this.Bb = new a.Bm;
        this.Bb.parent =
            this;
        this.Bb.setTransform(0, 64);
        this.Da = new a.Bp;
        this.Da.parent = this;
        this.Da.setTransform(592, 32);
        this.kb = new a.ZD;
        this.kb.parent = this;
        this.kb.setTransform(0, 32);
        this.sb = new a.Cp;
        this.sb.parent = this;
        this.sb.setTransform(592, 64);
        this.Cb = new a.$D;
        this.Cb.parent = this;
        this.Cb.setTransform(32, 64);
        this.Db = new a.mE;
        this.Db.parent = this;
        this.Db.setTransform(96, 0);
        this.Ab = new a.Qo;
        this.Ab.parent = this;
        this.Ab.setTransform(544, 384);
        this.wb = new a.Ho;
        this.wb.parent = this;
        this.wb.setTransform(0, 352);
        this.Eb = new a.Io;
        this.Eb.parent = this;
        this.Eb.setTransform(0, 384);
        this.xb = new a.km;
        this.xb.parent = this;
        this.xb.setTransform(64, 400);
        this.yb = new a.lm;
        this.yb.parent = this;
        this.yb.setTransform(144, 400);
        this.Fb = new a.mm;
        this.Fb.parent = this;
        this.Fb.setTransform(224, 400);
        this.Jb = new a.nm;
        this.Jb.parent = this;
        this.Jb.setTransform(304, 400);
        this.zb = new a.Cp;
        this.zb.parent = this;
        this.zb.setTransform(590.8, 64);
        this.Gb = new a.Bp;
        this.Gb.parent = this;
        this.Gb.setTransform(590.8, 32);
        this.ra = new a.fz;
        this.ra.parent = this;
        this.ra.setTransform(32,
            32, 35.001, 22.874);
        this.Hb = new a.Po;
        this.Hb.parent = this;
        this.Hb.setTransform(544, 352);
        this.Ib = new a.qm;
        this.Ib.parent = this;
        this.Ib.setTransform(544, 400);
        this.Kb = new a.pm;
        this.Kb.parent = this;
        this.Kb.setTransform(464, 400);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.Kb
                }, {
                    t: this.Ib
                }, {
                    t: this.Hb
                }, {
                    t: this.ra
                }, {
                    t: this.Gb
                }, {
                    t: this.zb
                }, {
                    t: this.Jb
                }, {
                    t: this.Fb
                }, {
                    t: this.yb
                }, {
                    t: this.xb
                }, {
                    t: this.Eb
                }, {
                    t: this.wb
                }, {
                    t: this.Ab
                }, {
                    t: this.Db
                }, {
                    t: this.Cb
                }, {
                    t: this.sb
                }, {
                    t: this.kb
                }, {
                    t: this.Da
                }, {
                    t: this.Bb
                }, {
                    t: this.pb
                },
                {
                    t: this.tb
                }, {
                    t: this.nb
                }, {
                    t: this.ab
                }, {
                    t: this.Qa
                }, {
                    t: this.Ka
                }, {
                    t: this.Aa
                }, {
                    t: this.Ha
                }, {
                    t: this.jb
                }, {
                    t: this.ib
                }
            ]
        }).wait(5))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 640, 480);
    (a.lb = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.Ag = new a.nextPage;
        this.Ag.name = "nextButton";
        this.Ag.parent = this;
        this.Ag.setTransform(552, 440, 1, 1, 0, 0, 0, 88, 40);
        new e.ButtonHelper(this.Ag, 0, 1, 1);
        this.Xf = new a.wp;
        this.Xf.name = "exitButton";
        this.Xf.parent = this;
        this.Xf.setTransform(320, 440, 1, 1, 0, 0, 0, 80, 40);
        new e.ButtonHelper(this.Xf, 0, 1, 1);
        this.Cg = new a.Dq;
        this.Cg.name = "prevButton";
        this.Cg.parent = this;
        this.Cg.setTransform(88, 440, 1, 1, 0, 0, 0, 88, 40);
        new e.ButtonHelper(this.Cg, 0, 1, 1);
        this.Zf = new a.Zf;
        this.Zf.name = "hameleon";
        this.Zf.parent = this;
        this.Zf.setTransform(248, 32, 1, 1, 0, 0, 0, 40, 32);
        this.Tf = new a.Tf;
        this.Tf.name = "butterfly";
        this.Tf.parent = this;
        this.Tf.setTransform(600, 408, 1, 1, 0, 0, 0, 24, 24);
        this.screen = new a.KK;
        this.screen.name = "screen";
        this.screen.parent = this;
        this.screen.setTransform(48, 16, 1, 1, 0, 0, 0,
            48, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.screen
            }, {
                t: this.Tf
            }, {
                t: this.Zf
            }, {
                t: this.Cg
            }, {
                t: this.Xf
            }, {
                t: this.Ag
            }]
        }).wait(1))
    }).prototype = n(a.lb, new e.Rectangle(0, 0, 640, 480), null);
    (a.gz = function () {
        this.initialize(void 0, void 0, void 0, {});
        this.Zc = new a.Cq;
        this.Zc.name = "patch";
        this.Zc.parent = this;
        this.Zc.setTransform(123.5, 69.5, 1, 1, 0, 0, 0, 4.5, 5.5);
        this.body = new a.Mq;
        this.body.name = "body";
        this.body.parent = this;
        this.body.setTransform(96, 104, 1, 1, 0, 0, 0, 32, 40);
        this.sa = new a.jw;
        this.sa.name =
            "monkey";
        this.sa.parent = this;
        this.sa.setTransform(88, 96, 1, 1, 0, 0, 0, 88, 128);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.sa,
                p: {
                    x: 88
                }
            }, {
                t: this.body,
                p: {
                    x: 96
                }
            }, {
                t: this.Zc,
                p: {
                    x: 123.5
                }
            }]
        }).to({
            state: [{
                t: this.sa,
                p: {
                    x: 168
                }
            }, {
                t: this.body,
                p: {
                    x: 176
                }
            }, {
                t: this.Zc,
                p: {
                    x: 203.5
                }
            }]
        }, 1).to({
            state: [{
                t: this.sa,
                p: {
                    x: 248
                }
            }, {
                t: this.body,
                p: {
                    x: 256
                }
            }, {
                t: this.Zc,
                p: {
                    x: 283.5
                }
            }]
        }, 1).to({
            state: [{
                t: this.sa,
                p: {
                    x: 328
                }
            }, {
                t: this.body,
                p: {
                    x: 336
                }
            }, {
                t: this.Zc,
                p: {
                    x: 363.5
                }
            }]
        }, 1).to({
            state: [{
                    t: this.sa,
                    p: {
                        x: 408
                    }
                }, {
                    t: this.body,
                    p: {
                        x: 416
                    }
                },
                {
                    t: this.Zc,
                    p: {
                        x: 443.5
                    }
                }
            ]
        }, 1).to({
            state: [{
                t: this.sa,
                p: {
                    x: 488
                }
            }, {
                t: this.body,
                p: {
                    x: 496
                }
            }, {
                t: this.Zc,
                p: {
                    x: 523.5
                }
            }]
        }, 1).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(0, 0, 176, 192);
    (a.va = function (b, f, h) {
        this.initialize(b, f, h, {});
        this.Tc = new a.Tc;
        this.Tc.name = "prize";
        this.Tc.parent = this;
        this.Tc.setTransform(72, 160, 1, 1, 0, 0, 0, 40, 56);
        this.Ob = new a.gz;
        this.Ob.name = "pos";
        this.Ob.parent = this;
        this.Ob.setTransform(72, 384, 1, 1, 0, 0, 0, 88, 96);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                    t: this.Ob
                },
                {
                    t: this.Tc
                }
            ]
        }).wait(1));
        this.Vi = new a.ii;
        this.Vi.name = "prize5";
        this.Vi.parent = this;
        this.Vi.setTransform(480, 264, 1, 1, 0, 0, 0, 0, 16);
        this.Ui = new a.ii;
        this.Ui.name = "prize4";
        this.Ui.parent = this;
        this.Ui.setTransform(400, 264, 1, 1, 0, 0, 0, 0, 16);
        this.Ti = new a.ii;
        this.Ti.name = "prize3";
        this.Ti.parent = this;
        this.Ti.setTransform(320, 264, 1, 1, 0, 0, 0, 0, 16);
        this.ad = new a.ii;
        this.ad.name = "prize2";
        this.ad.parent = this;
        this.ad.setTransform(240, 264, 1, 1, 0, 0, 0, 0, 16);
        this.$c = new a.ii;
        this.$c.name = "prize1";
        this.$c.parent = this;
        this.$c.setTransform(160,
            264, 1, 1, 0, 0, 0, 0, 16);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.$c
            }, {
                t: this.ad
            }, {
                t: this.Ti
            }, {
                t: this.Ui
            }, {
                t: this.Vi
            }]
        }).wait(1));
        this.Of = new a.Wi;
        this.Of.name = "rope5";
        this.Of.parent = this;
        this.Of.setTransform(488, 176, 1, 1, 0, 0, 0, 8, 176);
        this.Nf = new a.Wi;
        this.Nf.name = "rope4";
        this.Nf.parent = this;
        this.Nf.setTransform(408, 176, 1, 1, 0, 0, 0, 8, 176);
        this.Mf = new a.Wi;
        this.Mf.name = "rope3";
        this.Mf.parent = this;
        this.Mf.setTransform(328, 176, 1, 1, 0, 0, 0, 8, 176);
        this.Lf = new a.Wi;
        this.Lf.name = "rope2";
        this.Lf.parent =
            this;
        this.Lf.setTransform(248, 176, 1, 1, 0, 0, 0, 8, 176);
        this.Dg = new a.Wi;
        this.Dg.name = "rope1";
        this.Dg.parent = this;
        this.Dg.setTransform(168, 176, 1, 1, 0, 0, 0, 8, 176);
        this.timeline.addTween(e.Tween.get({}).to({
            state: [{
                t: this.Dg
            }, {
                t: this.Lf
            }, {
                t: this.Mf
            }, {
                t: this.Nf
            }, {
                t: this.Of
            }]
        }).wait(1));
        this.bg = new a.Am;
        this.bg.name = "bg";
        this.bg.parent = this;
        this.bg.setTransform(320, 272, 1, 1, 0, 0, 0, 320, 208);
        this.timeline.addTween(e.Tween.get(this.bg).wait(1))
    }).prototype = n(a.va, new e.Rectangle(-16, 0, 656, 480), null);
    (a.cm = function (b,
        f, h) {
        this.initialize(b, f, h, {});
        this.Dm = function () {
            function b() {
                exportRoot.init();
                exportRoot.removeEventListener("tick", b);
                exportRoot.addEventListener("tick", exportRoot.update)
            }
            a.cm.prototype.m_scenes = {
                fp: 0,
                Nc: 1,
                bj: 2,
                Zi: 3,
                cj: 4,
                Help: 5
            };
            a.cm.prototype.ta = 0;
            a.cm.prototype.qb = 9;
            a.cm.prototype.rb = 0;
            a.cm.prototype.ve = 1;
            a.cm.prototype.wg = 0;
            a.cm.prototype.pM;
            a.cm.prototype.Ol;
            a.cm.prototype.Bi = !1;
            a.cm.prototype.Ci;
            a.cm.prototype.m_buttons;
            a.cm.prototype.Kc = !1;
            a.cm.prototype.Wp = !1;
            a.cm.prototype.init = function () {
                loader.cacheObj(exportRoot.Cf,
                    !0, !0);
                exportRoot.setScene(exportRoot.m_scenes.fp);
                a.cm.prototype.m_sound = new Aa;
                a.cm.prototype.na = new la;
                exportRoot.pa.init();
                exportRoot.lb.init();
                exportRoot.Na.init();
                exportRoot.va.init();
                exportRoot.bb.init();
                var b = exportRoot.Mb;
                b.tickEnabled = !1;
                b.mouseEnabled = !1;
                b.Sf.setAlign("left");
                loader.cacheObj(b.Sf, !0, !0);
                loader.cacheObj(b.ah, !0, !0);
                loader.cacheObj(b.Vc, !0, !0);
                loader.cacheObj(b.dd, !0, !0);
                loader.cacheObj(b.ed, !0, !0);
                a.cm.prototype.xa = new ma;
                exportRoot.xa.send("init")
            };
            a.cm.prototype.autoPlay =
                function (a) {
                    if (void 0 !== a) a !== this.Kc && (exportRoot.m_buttons.revert(exportRoot.m_buttons.m_enum.AutoPlay), this.Kc = !this.Kc);
                    else return this.Kc
                };
            a.cm.prototype.setAutoPlay = function (a) {
                this.Kc = a
            };
            a.cm.prototype.Ff = function () {
                return this.ve * this.qb
            };
            a.cm.prototype.PK = function (a) {
                exportRoot.lb && exportRoot.lb.setData(a)
            };
            a.cm.prototype.LK = function (a) {
                this.Ol = a;
                this.na.setData(a[0], 9 * a[a.length - 1])
            };
            a.cm.prototype.OK = function (a) {
                this.Ci = a
            };
            a.cm.prototype.To = function (a) {
                exportRoot.Mb.Vc.setText(a);
                this.Xi(this.Ff() >=
                    this.Ci)
            };
            a.cm.prototype.setTotalBet = function (a) {
                exportRoot.Mb.Vc.setText(a);
                this.Xi(a >= this.Ci)
            };
            a.cm.prototype.Eg = function (a) {
                this.ve = a;
                this.setTotalBet(this.ve * this.qb);
                exportRoot.Mb.Sf.setText(this.ve);
                exportRoot.Mb.ah.setText(this.ve)
            };
            a.cm.prototype.jc = function (a) {
                this.rb = parseInt("" !== a ? a : 0);
                this.ta == this.m_scenes.Nc && exportRoot.Mb.gotoAndStop("win");
                exportRoot.Mb.dd.setText(a)
            };
            a.cm.prototype.sf = function (a) {
                this.qb = parseInt(a);
                this.ta == this.m_scenes.Nc && exportRoot.Mb.gotoAndStop("line");
                exportRoot.Mb.dd.setText(a +
                    " ");
                0 <= exportRoot.pa.ph ? this.To(exportRoot.pa.ph) : this.setTotalBet(this.ve * this.qb)
            };
            a.cm.prototype.setCredit = function (a) {
                this.wg = parseInt(a);
                exportRoot.Mb.ed.setText(this.wg)
            };
            a.cm.prototype.Xi = function (a) {
                this.Bi != a && exportRoot.pa.Xi(a);
                this.Bi = a
            };
            a.cm.prototype.setScene = function (a) {
                exportRoot.ta = a;
                for (a = exportRoot.numChildren - 1; 0 <= a; --a) exportRoot.removeChild(exportRoot.getChildAt(a));
                switch (exportRoot.ta) {
                case exportRoot.m_scenes.Nc:
                    exportRoot.pa.reset();
                    exportRoot.addChild(exportRoot.pa);
                    exportRoot.addChild(exportRoot.Cf);
                    exportRoot.addChild(exportRoot.Mb);
                    break;
                case this.m_scenes.bj:
                    exportRoot.Na.reset();
                    exportRoot.addChild(exportRoot.Na);
                    exportRoot.addChild(exportRoot.Cf);
                    exportRoot.addChild(exportRoot.Mb);
                    break;
                case exportRoot.m_scenes.Zi:
                    exportRoot.va.reset();
                    exportRoot.addChild(exportRoot.Mb);
                    exportRoot.addChild(exportRoot.va);
                    break;
                case exportRoot.m_scenes.cj:
                    exportRoot.bb.reset();
                    exportRoot.addChild(exportRoot.Mb);
                    exportRoot.addChild(exportRoot.bb);
                    break;
                case exportRoot.m_scenes.Help:
                    exportRoot.lb.reset(), exportRoot.addChild(exportRoot.lb)
                }
            };
            a.cm.prototype.update = function () {
                exportRoot.m_buttons.read(exportRoot.m_buttons.m_enum.AutoPlay) && (exportRoot.Kc = !exportRoot.Kc);
                exportRoot.m_buttons.read(exportRoot.m_buttons.m_enum.Sound) && exportRoot.m_sound.reverseMute();
                switch (exportRoot.ta) {
                case exportRoot.m_scenes.Nc:
                    exportRoot.pa.update();
                    exportRoot.na.update();
                    break;
                case exportRoot.m_scenes.Help:
                    exportRoot.lb.update();
                    break;
                case exportRoot.m_scenes.bj:
                    exportRoot.Na.update();
                    exportRoot.na.update();
                    break;
                case exportRoot.m_scenes.Zi:
                    exportRoot.va.update();
                    break;
                case exportRoot.m_scenes.cj:
                    exportRoot.bb.update()
                }
                exportRoot.m_buttons.clear()
            };
            a.cm.prototype.So = function (a) {
                exportRoot.Mb.bg.gotoAndStop(0 <= a ? "freeSpins" : "main");
                var b = exportRoot.Mb.currentFrame;
                exportRoot.Mb.gotoAndStop("init");
                exportRoot.Mb.gotoAndStop(b);
                exportRoot.pa.ph = a;
                0 <= a ? this.To(a) : this.Eg(this.ve)
            };
            a.pa.prototype.ta = 0;
            a.pa.prototype.m_scenes = {
                Tb: 0,
                Mr: 1,
                mp: 2,
                li: 3,
                Rf: 4,
                Qf: 5,
                uf: 6,
                De: 7,
                yr: 8
            };
            a.pa.prototype.za = 0;
            a.pa.prototype.Ql = 0;
            a.pa.prototype.yi = 0;
            a.pa.prototype.dm = !1;
            a.pa.prototype.Wl =
                0;
            a.pa.prototype.ff = [];
            a.pa.prototype.fo = [];
            a.pa.prototype.im = [];
            a.pa.prototype.xi = !1;
            a.pa.prototype.rb = !1;
            a.pa.prototype.wi = !1;
            a.pa.prototype.Rb = new ka;
            a.pa.prototype.Xl = 0;
            a.pa.prototype.vg = !0;
            a.pa.prototype.ph = -1;
            a.pa.prototype.xf;
            a.pa.prototype.init = function () {
                a.pa.prototype.yf = [this.ya, this.Ga, this.fb, this.bc, this.Ec, this.Fc, this.ze, this.Ae, this.vh];
                a.pa.prototype.qb = [this.dh, this.eh, this.fh, this.gh, this.hh, this.ih, this.jh, this.kh, this.mh];
                a.pa.prototype.Rc = [];
                this.Rc[0] = new ya(this.ci, 40, .7,
                    this.mi, this.Eh);
                this.Rc[1] = new ya(this.di, 39, .9, this.Eh, this.Fh);
                this.Rc[2] = new ya(this.ei, 38, 1.1, this.Fh, this.Gh);
                this.Rc[3] = new ya(this.fi, 37, 1.3, this.Gh, this.Hh);
                this.Rc[4] = new ya(this.gi, 36, 1.5, this.Hh, this.ni, !0);
                this.Rb.Rh = !0;
                this.Lb.visible = !1;
                this.Lb.stop();
                this.Lb.t.textBaseline = "bottom";
                this.Lb.t.y += 27;
                for (var b = 0; b < this.yf.length; ++b) loader.cacheObj(this.yf[b], !0, !0), this.yf[b].tickEnabled = !1;
                for (b = 0; b < this.numChildren; ++b) {
                    var e = this.getChildAt(b);
                    e.mouseEnabled && (e.mouseEnabled = !1)
                }
                this.Rb.Uo("move_num_0",
                    "move_num_1", "move_num_2", "move_num_3");
                for (b = 0; b < this.qb.length; ++b) loader.cacheObj(this.qb[b], !0, !0);
                loader.cacheObj(this.bg, !0, !0);
                this.ph = -1
            };
            a.pa.prototype.reset = function () {
                exportRoot.m_sound.stopAllSounds();
                exportRoot.m_buttons.resetAllNames();
                exportRoot.m_buttons.disableAll();
                V(this.sa.reset("breath"), "breath").play();
                W(V(this.sa.Yf.reset("blink"), "_wait_=2:3,blink,_wait_=2:3,rotateL,_wait_=2:3,rotateR,_wait_=2:3,blink"), !0).play();
                this.dm = !1;
                this.za = 0;
                var a = exportRoot.rb;
                0 < a ? (exportRoot.sf(exportRoot.qb),
                    this.jc(a), exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Start, "TAKE"), exportRoot.Mb.gotoAndStop("win")) : (this.ta == this.m_scenes.uf && stage.dispatchEvent("spinCompleteEvent"), this.ta = this.m_scenes.Tb, this.rb = !1, exportRoot.sf(exportRoot.qb), exportRoot.Mb.gotoAndStop("line"));
                switch (this.ta) {
                case this.m_scenes.Tb:
                    -1 == this.ph && Ba(this);
                    this.Be();
                    X(exportRoot.na, exportRoot.na.m_enum.Tb);
                    break;
                case this.m_scenes.Rf:
                    0 == exportRoot.autoPlay() && (exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Help),
                        exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Bet), exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Start), exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Bet, "RISK"), this.xi && V(this.sa, "dance").play());
                    break;
                case this.m_scenes.uf:
                    this.Be(), this.rb = !1, X(exportRoot.na, exportRoot.na.m_enum.Tb)
                }
            };
            a.pa.prototype.Xi = function (a) {
                fa(this.sa, a ? "F" : "");
                fa(this.sa.Yf, a ? "F" : "")
            };
            a.pa.prototype.$o = function () {
                ha(this.sa) && ha(this.sa.Yf) && (0 == Math.floor(6 * Math.random()) ? V(this.sa, "play").play() :
                    V(this.sa, "breath").play())
            };
            a.pa.prototype.update = function () {
                switch (this.ta) {
                case this.m_scenes.Tb:
                    this.Dh();
                    this.$o();
                    break;
                case this.m_scenes.mp:
                    this.dJ();
                    break;
                case this.m_scenes.li:
                    this.Vo();
                    break;
                case this.m_scenes.Rf:
                    this.mL();
                    break;
                case this.m_scenes.Qf:
                    this.NG();
                    break;
                case this.m_scenes.uf:
                    this.nL();
                    break;
                case this.m_scenes.De:
                    this.finish();
                    break;
                case this.m_scenes.yr:
                    0 < this.th ? --this.th : (this.th = this.dm ? loader.getDelay(2 / 3) : loader.getDelay(1 / 3), this.dm = !this.dm)
                }
                this.sa.update();
                this.sa.Yf.update()
            };
            a.pa.prototype.Dh = function () {
                Ba(this);
                if (this.vg && (exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Start) || exportRoot.autoPlay())) exportRoot.xa.send("start"), exportRoot.m_buttons.disableAll(), this.rb && (this.Be(), exportRoot.sf(exportRoot.qb)), this.ta = this.m_scenes.Mr;
                else if (this.rb && (0 < this.za ? --this.za : (this.Be(), exportRoot.sf(exportRoot.qb), X(exportRoot.na, exportRoot.na.m_enum.Tb), this.rb = !1)), exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Help)) exportRoot.setScene(exportRoot.m_scenes.Help);
                else {
                    for (var a = 4; 0 <= a; --a) {
                        var b = 1 + 2 * a;
                        if (exportRoot.m_buttons.read(exportRoot.m_buttons.m_enum.Line1 + a)) {
                            exportRoot.sf(b);
                            exportRoot.m_sound.playSound("main_line_" + b);
                            this.SK();
                            this.Xl = loader.getDelay(1.5);
                            break
                        }
                    }
                    0 < this.Xl && (--this.Xl, 0 == this.Xl && exportRoot.pa.Be());
                    exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Bet) ? 0 < this.yi ? --this.yi : (exportRoot.m_buttons.read(exportRoot.m_buttons.m_enum.Bet) ? (exportRoot.m_sound.playSound("main_bet"), this.yi = loader.getDelay(.5)) : (exportRoot.m_sound.playSound("main_bet_fix"),
                        this.yi = loader.getDelay(5)), a = exportRoot.Ol, b = a.indexOf(exportRoot.ve), b < a.length - 1 ? exportRoot.Eg(a[b + 1] * exportRoot.qb <= exportRoot.wg ? a[b + 1] : a[0]) : exportRoot.Eg(a[0])) : this.yi = 0;
                    if (exportRoot.m_buttons.read(exportRoot.m_buttons.m_enum.MaxBet))
                        for (exportRoot.m_sound.playSound("main_max_bet"), a = exportRoot.Ol, b = a.length; 0 <= b; --b) {
                            var e = a[b];
                            if (e * exportRoot.qb <= exportRoot.wg) {
                                exportRoot.Eg(e);
                                break
                            }
                        }
                }
            };
            a.pa.prototype.dJ = function () {
                for (var a = 0; 5 > a; ++a) this.Rc[a].update() && 4 == a && (this.za = this.Wl = 0, this.ta =
                    exportRoot.pa.m_scenes.li)
            };
            a.pa.prototype.Vo = function () {
                if (0 < this.za) --this.za;
                else if (this.wi) this.WK(), exportRoot.setScene(exportRoot.m_scenes.Zi), this.wi = !1, this.ta = this.m_scenes.uf;
                else {
                    var a = this.Wl;
                    if (this.Wl < this.ff.length) {
                        switch (this.ff[a][0]) {
                        case "L":
                            var b = exportRoot.pa.ff[a][2],
                                e = parseInt(exportRoot.pa.ff[a][3]);
                            this.qb[b - 1].gotoAndStop(0);
                            this.qb[b - 1].updateCache();
                            this.jc(exportRoot.rb + e);
                            this.rb = !0;
                            V(this.sa, "win").play();
                            X(exportRoot.na, exportRoot.na.m_enum.Ef, b, e);
                            exportRoot.m_sound.playSound("win_line_" +
                                (a + 1));
                            this.im.push(exportRoot.pa.ff[a][2] - 1);
                            this.za = loader.getDelay(.5);
                            break;
                        case "B":
                            this.fo.push(exportRoot.pa.ff[a][1])
                        }++this.Wl
                    } else 0 < this.fo.length ? (X(exportRoot.na, exportRoot.na.m_enum.$i, "move"), this.wi = !0, this.za = loader.getDelay(4), W(V(this.sa, "dance"), !0).play(), this.Nr(), exportRoot.m_sound.playSound("bonus_music")) : this.rb ? (0 == exportRoot.autoPlay() && (exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Help), exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Bet), exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Start),
                        exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Bet, "RISK"), exportRoot.rb >= 10 * exportRoot.Ff() && (this.xi = !0, W(V(this.sa, "dance"), !0).play(), exportRoot.m_sound.playSound("big_win_music"))), exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Start, "TAKE"), this.Ql = 0, X(exportRoot.na, exportRoot.na.m_enum.Rf), this.ta = this.m_scenes.Rf) : this.finish()
                }
            };
            a.pa.prototype.mL = function () {
                this.$o();
                exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Start) || exportRoot.autoPlay() ? this.ta = this.m_scenes.uf :
                    exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Help) ? exportRoot.setScene(exportRoot.m_scenes.Help) : exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Bet) ? (exportRoot.setScene(exportRoot.m_scenes.bj), this.ta = this.m_scenes.uf) : this.zm()
            };
            a.pa.prototype.NG = function () {
                this.$o();
                this.zm();
                this.Rb.update() && (this.jc(this.Rb.src()), exportRoot.setCredit(this.Rb.wf));
                0 == this.Rb.src() && (this.jc(0), this.finish())
            };
            a.pa.prototype.nL = function () {
                this.xi && (exportRoot.m_sound.stopAllSounds(), V(this.sa,
                    "breath").play(), this.xi = !1);
                var a = exportRoot.rb;
                this.Rb.set(a, exportRoot.wg);
                exportRoot.m_buttons.disableAll();
                X(exportRoot.na, exportRoot.na.m_enum.uf);
                exportRoot.m_buttons.resetName(exportRoot.m_buttons.m_enum.Bet);
                0 < a && (exportRoot.xa.send("finish"), this.xf = !1);
                this.ta = this.m_scenes.Qf
            };
            a.pa.prototype.tr = function () {
                this.xf = !0
            };
            a.pa.prototype.finish = function () {
                this.ta != this.m_scenes.De ? (this.za = 1 == exportRoot.Wp ? 0 : loader.getDelay(.25), 0 < this.rb && X(exportRoot.na, exportRoot.na.m_enum.wm), this.ta = exportRoot.pa.m_scenes.De) :
                    (this.zm(), 0 < this.za ? --this.za : this.xf && (1 == this.qb[0].currentFrame || this.rb ? this.za = loader.getDelay(.5) : (this.Be(), exportRoot.sf(exportRoot.qb)), this.rb = !0, exportRoot.m_buttons.resetName(exportRoot.m_buttons.m_enum.Start), stage.dispatchEvent("spinCompleteEvent"), this.ta = this.m_scenes.Tb))
            };
            a.pa.prototype.zm = function () {
                if (this.rb)
                    if (0 < this.Ql) --this.Ql;
                    else
                        for (var a = 0; a < this.im.length; ++a) {
                            var b = exportRoot.pa.yf[this.im[a]];
                            b.gotoAndStop(1 == b.currentFrame ? 0 : 1);
                            b.updateCache();
                            this.Ql = loader.getDelay(.5)
                        }
            };
            a.pa.prototype.Nr = function () {
                for (var a = 0; 5 > a; ++a) {
                    for (var b = this.Rc[a], e = 0; 5 > e; ++e) {
                        var f = b.zf[e];
                        0 == f.currentFrame && (f.gotoAndPlay("play1"), f.fj = 0)
                    }
                    b.ub.tickEnabled = !0;
                    b.ub.uncache()
                }
            };
            a.pa.prototype.WK = function () {
                for (var a = 0; 5 > a; ++a)
                    for (var b = this.Rc[a], e = 0, f = 0; 5 > f; ++f) {
                        var h = b.zf[f];
                        0 == h.fj && (h.gotoAndStop(0), h.fj = void 0);
                        void 0 == h.fj && ++e
                    }
            };
            a.pa.prototype.uE = function (a) {
                for (var b = 0, e = this.Rc.length; b < e; ++b) ta(this.Rc[b], a[b])
            };
            a.pa.prototype.SK = function () {
                for (var a = 0, b = this.qb.length; a < b; ++a) exportRoot.qb >
                    a ? (this.qb[a].gotoAndStop(0), this.qb[a].updateCache(), this.yf[a].gotoAndStop(0)) : (this.qb[a].gotoAndStop(2), this.qb[a].updateCache(), this.yf[a].gotoAndStop(1)), this.yf[a].updateCache()
            };
            a.pa.prototype.Be = function () {
                for (var a = 0, b = this.qb.length; a < b; ++a) exportRoot.qb > a ? (this.qb[a].gotoAndStop(1), this.qb[a].updateCache(), this.yf[a].gotoAndStop(0)) : (this.qb[a].gotoAndStop(2), this.qb[a].updateCache(), this.yf[a].gotoAndStop(1)), this.yf[a].updateCache()
            };
            a.pa.prototype.tE = function () {
                for (var a = 0, b = this.qb.length; a <
                    b; ++a) this.qb[a].gotoAndStop(2), this.qb[a].updateCache()
            };
            a.pa.prototype.sm = function (a, b) {
                this.xf = !0;
                stage.dispatchEvent("spinBeginEvent");
                exportRoot.m_sound.playSound("main_start");
                exportRoot.m_sound.playSound("reel_rotation", !0);
                this.wi = this.rb = this.xi = !1;
                this.tE();
                this.ff.splice(0);
                this.fo.splice(0);
                this.im.splice(0);
                if (0 < b.length) {
                    var e = b.trim().split(" ");
                    for (b = 0; b < e.length; ++b) this.ff[b] = e[b].split(":")
                }
                b = 0;
                for (e = exportRoot.pa.Rc.length; b < e; ++b) {
                    var f = this.Rc[b];
                    f.ff = a[b];
                    var Da = f.IG,
                        h = f.ub.Oc.getBounds().height /
                        f.Dc;
                    f.jo = f.Dc;
                    f.mq = Math.floor(Da / h);
                    this.Rc[b].start()
                }
                V(ea(this.sa), "look").play();
                X(exportRoot.na, exportRoot.na.m_enum.$i);
                this.ta = this.m_scenes.mp
            };
            a.pa.prototype.jc = function (a) {
                0 == a ? exportRoot.jc("") : 100 > a ? exportRoot.jc(a + "  ") : 1E3 > a ? exportRoot.jc(a + " ") : exportRoot.jc(a)
            };
            a.Na.prototype.m_scenes = {
                $g: 0,
                ip: 1,
                ej: 2,
                hp: 3,
                np: 4,
                op: 5,
                qp: 6
            };
            a.Na.prototype.ta = 0;
            a.Na.prototype.Sc = 1;
            a.Na.prototype.qf = 0;
            a.Na.prototype.io;
            a.Na.prototype.Pi;
            a.Na.prototype.rb;
            a.Na.prototype.Pb = 1;
            a.Na.prototype.Gi;
            a.Na.prototype.xf;
            a.Na.prototype.Th;
            a.Na.prototype.init = function () {
                x(this.Jh, this.Dz);
                x(this.Kh, this.Ez);
                x(this.Lh, this.Fz);
                x(this.Mh, this.Gz);
                loader.cacheObj(this.bg, !0, !0);
                for (var a = 0; a < this.numChildren; ++a) {
                    var b = this.getChildAt(a);
                    b.mouseEnabled && (b.mouseEnabled = !1)
                }
                this.Th = [this.Ih, this.Jh, this.Kh, this.Lh, this.Mh]
            };
            a.Na.prototype.Dz = function () {
                exportRoot.Na.Si(1, !0)
            };
            a.Na.prototype.Ez = function () {
                exportRoot.Na.Si(2, !0)
            };
            a.Na.prototype.Fz = function () {
                exportRoot.Na.Si(3, !0)
            };
            a.Na.prototype.Gz = function () {
                exportRoot.Na.Si(4,
                    !0)
            };
            a.Na.prototype.NK = function (a) {
                this.io = a
            };
            a.Na.prototype.setData = function (a, b) {
                this.Pi = (a[1] & 15) != (a[0] & 15);
                this.Gi = a;
                this.rb = b;
                this.xf = !0
            };
            a.Na.prototype.reset = function () {
                exportRoot.m_sound.stopAllSounds();
                exportRoot.m_buttons.disableAll();
                exportRoot.m_buttons.resetAllNames();
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Bet, "RISK");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Start, "TAKE");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line1, "DEALER");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line3,
                    "1 CARD");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line5, "2 CARD");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line7, "3 CARD");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line9, "4 CARD");
                exportRoot.Mb.gotoAndStop("risk");
                var a = exportRoot.rb;
                exportRoot.To(a);
                this.jc(a);
                this.xf = !1;
                this.Sc = 1;
                fa(this.sa.reset("blink"), exportRoot.Bi ? "F" : "");
                this.body.reset("breath");
                this.xf = this.Wc.visible = !1;
                this.ui()
            };
            a.Na.prototype.update = function () {
                switch (this.ta) {
                case this.m_scenes.$g:
                    this.ui();
                    break;
                case this.m_scenes.ip:
                    this.WH();
                    break;
                case this.m_scenes.ej:
                    this.xr();
                    break;
                case this.m_scenes.hp:
                    this.VH();
                    break;
                case this.m_scenes.np:
                    this.QK();
                    break;
                case this.m_scenes.op:
                    this.RK();
                    break;
                case this.m_scenes.qp:
                    this.pL()
                }
                this.sa.update();
                this.body.update();
                this.Wc.update()
            };
            a.Na.prototype.ui = function () {
                var a = exportRoot.rb;
                this.jc(a);
                X(exportRoot.na, exportRoot.na.m_enum.um, 2 * a);
                this.Fg.setText(this.Sc);
                this.ai.gotoAndStop(0);
                for (a = 0; 5 > a; ++a) this.Th[a].gotoAndStop("wait");
                W(V(this.body.reset("breath"),
                    "breath, _wait_"), "true").play();
                W(V(this.sa.reset("blink"), "blink, rotate-ccw, _wait_=2:5"), "true").play();
                this.Wc.visible = !1;
                this.za = loader.getDelay(.5);
                this.ta = this.m_scenes.ip
            };
            a.Na.prototype.WH = function () {
                if (0 < this.za) --this.za;
                else {
                    exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line3);
                    exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line5);
                    exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line7);
                    exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line9);
                    exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Start);
                    for (var a = 1; 5 > a; ++a) this.Th[a].mouseEnabled = !0;
                    exportRoot.m_sound.playSound("risk_open");
                    this.Ih.gotoAndStop("s" + this.io.toString(16));
                    this.ta = this.m_scenes.ej;
                    this.xr()
                }
            };
            a.Na.prototype.xr = function () {
                for (var a = 1; 5 > a; ++a)
                    if (exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Line1 + a)) {
                        this.Si(a, !1);
                        break
                    } exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Start) && exportRoot.setScene(exportRoot.m_scenes.Nc)
            };
            a.Na.prototype.Si = function (a, b) {
                if (this.ta == this.m_scenes.ej) {
                    this.ta = this.m_scenes.hp;
                    this.ai.gotoAndStop(a);
                    this.Pb = a;
                    this.body.visible = !1;
                    W(V(this.sa, "check"), !1).play();
                    exportRoot.m_buttons.disableAll();
                    X(exportRoot.na, exportRoot.na.m_enum.vm);
                    this.za = loader.getDelay(.05);
                    for (var e = 1; 5 > e; ++e) this.Th[e].mouseEnabled = !1;
                    b && loader.mouseOut();
                    exportRoot.xa.send("risk", {
                        Card: a
                    })
                }
            };
            a.Na.prototype.VH = function () {
                0 < this.za ? --this.za : 0 != this.xf && (this.xf = !1, this.jc(this.rb), exportRoot.m_sound.playSound("risk_open"), 0 < this.rb && this.Pi && exportRoot.m_sound.playSound("risk_win"), this.Th[this.Pb].gotoAndStop("s" +
                    (this.Gi[1] & 255).toString(16)), this.za = loader.getDelay(.8), this.ta = this.m_scenes.np)
            };
            a.Na.prototype.QK = function () {
                if (0 < this.za) --this.za;
                else {
                    exportRoot.m_sound.playSound("risk_open");
                    for (var a = 1, b = 2; 5 > a; ++a) a != this.Pb && (this.Th[a].gotoAndStop("s" + (this.Gi[b] & 255).toString(16)), ++b);
                    V(this.sa, "win").play();
                    this.Pi ? 0 < this.rb ? V(this.sa, "win").play() : V(this.sa, "lose").play() : (V(this.sa, "forward").play(), exportRoot.m_sound.playSound("risk_forward"));
                    this.za = loader.getDelay(.5);
                    this.ta = this.m_scenes.op
                }
            };
            a.Na.prototype.RK = function () {
                0 < this.za ? --this.za : (this.Pi ? 0 < this.rb ? V(this.Wc, "win").play() : V(this.Wc, "lose").play() : V(this.Wc, "forward").play(), this.za = loader.getDelay(1.3), this.ta = this.m_scenes.qp)
            };
            a.Na.prototype.pL = function () {
                ha(this.Wc) && (0 < this.za ? --this.za : 0 < this.rb && 6 == this.Gi.length ? (this.Pi && ++this.Sc, this.io = this.Gi[5], this.ta = this.m_scenes.$g) : exportRoot.setScene(exportRoot.m_scenes.Nc))
            };
            a.Na.prototype.jc = function (a) {
                0 == a ? exportRoot.jc("") : exportRoot.jc(a)
            };
            a.va.prototype.m_scenes = {
                $g: 0,
                Tb: 1,
                ki: 2,
                bp: 3,
                jp: 4,
                Ef: 5,
                ji: 6,
                li: 7,
                aj: 8,
                Qf: 9,
                De: 10
            };
            a.va.prototype.Af = {
                gp: 0,
                kp: 1,
                lp: 2,
                pp: 3,
                ep: 4
            };
            a.va.prototype.ta;
            a.va.prototype.Pb;
            a.va.prototype.qf;
            a.va.prototype.za;
            a.va.prototype.Sc;
            a.va.prototype.Hi = [];
            a.va.prototype.Qi;
            a.va.prototype.wo;
            a.va.prototype.Tp;
            a.va.prototype.sh;
            a.va.prototype.ko;
            a.va.prototype.Ji;
            a.va.prototype.oq = 240;
            a.va.prototype.zo = 176;
            a.va.prototype.Rb = new ka;
            a.va.prototype.If;
            a.va.prototype.Hf;
            a.va.prototype.yg = 5;
            a.va.prototype.init = function () {
                x(this.Dg, this.QH);
                x(this.Lf,
                    this.RH);
                x(this.Mf, this.SH);
                x(this.Nf, this.TH);
                x(this.Of, this.UH);
                this.Rb.Uo("move_num_bonus");
                loader.cacheObj(this.bg, !0, !0);
                for (var a = 0; a < this.numChildren; ++a) {
                    var b = this.getChildAt(a);
                    b.mouseEnabled && (b.mouseEnabled = !1)
                }
                this.If = [this.Dg, this.Lf, this.Mf, this.Nf, this.Of];
                this.Hf = [this.$c, this.ad, this.Ti, this.Ui, this.Vi];
                b = new createjs.Shape;
                b.graphics.beginFill("#000").drawRect(-16, 0, 48, this.Dg.getBounds().height);
                for (a = 0; a < this.yg; ++a) this.If[a].hitArea = b
            };
            a.va.prototype.QH = function () {
                exportRoot.va.wh(0,
                    !0)
            };
            a.va.prototype.RH = function () {
                exportRoot.va.wh(1, !0)
            };
            a.va.prototype.SH = function () {
                exportRoot.va.wh(2, !0)
            };
            a.va.prototype.TH = function () {
                exportRoot.va.wh(3, !0)
            };
            a.va.prototype.UH = function () {
                exportRoot.va.wh(4, !0)
            };
            a.va.prototype.setData = function (a) {
                this.Qi = a;
                var b = a.indexOf(0); - 1 != b && exportRoot.Bi && (b = a.indexOf(0, b + 1));
                this.wo = a.length == this.yg && -1 == b
            };
            a.va.prototype.reset = function () {
                exportRoot.Mb.gotoAndStop("bonus");
                exportRoot.m_buttons.disableAll();
                exportRoot.m_buttons.resetAllNames();
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line1,
                    "1 ROPE");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line3, "2 ROPE");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line5, "3 ROPE");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line7, "4 ROPE");
                exportRoot.m_buttons.setName(exportRoot.m_buttons.m_enum.Line9, "5 ROPE");
                this.Rb.Zl = exportRoot.Ff();
                this.Dg.gotoAndPlay("swing");
                this.Lf.gotoAndPlay("swing");
                this.Lf.gotoAndPlay(this.Lf.currentFrame + 18);
                this.Mf.gotoAndPlay("swing");
                this.Mf.gotoAndPlay(this.Mf.currentFrame +
                    36);
                this.Nf.gotoAndPlay("swing");
                this.Nf.gotoAndPlay(this.Nf.currentFrame + 72);
                this.Of.gotoAndPlay("swing");
                this.Of.gotoAndPlay(this.Of.currentFrame + 54);
                this.Hi.splice(0);
                this.Sc = this.za = 0;
                this.Pb = -1;
                for (var a = 0; a < this.yg; ++a) this.Hf[a].setText(""), this.If[a].visible = !0;
                this.Tl = exportRoot.Bi;
                this.Ob.gotoAndStop(0);
                this.Ob.body.reset("breath");
                fa(this.Ob.sa.reset("blink"), this.Tl ? "F" : "");
                this.Tc.visible = !1;
                exportRoot.jc(exportRoot.rb);
                this.ta = this.m_scenes.$g;
                this.ui()
            };
            a.va.prototype.update = function () {
                switch (this.ta) {
                case this.m_scenes.$g:
                    this.ui();
                    break;
                case this.m_scenes.Tb:
                    this.Dh();
                    break;
                case this.m_scenes.ki:
                    this.Do();
                    break;
                case this.m_scenes.bp:
                    this.Uz();
                    break;
                case this.m_scenes.jp:
                    this.$H();
                    break;
                case this.m_scenes.ji:
                    this.bo();
                    break;
                case this.m_scenes.Ef:
                    this.ap();
                    break;
                case this.m_scenes.li:
                    this.Vo();
                    break;
                case this.m_scenes.aj:
                    this.za = 0;
                    this.Sc = -1;
                    this.Rb.reset();
                    this.ta = this.m_scenes.Qf;
                    break;
                case this.m_scenes.Qf:
                    this.Ao();
                    break;
                case this.m_scenes.De:
                    0 < this.za ? --this.za : exportRoot.setScene(this.wo ? exportRoot.m_scenes.cj : exportRoot.m_scenes.Nc)
                }
                this.Ob.sa.update();
                this.Ob.body.update()
            };
            a.va.prototype.ui = function () {
                if (0 == exportRoot.autoPlay())
                    for (var a = 0; a < this.yg; ++a) 1 == this.If[a].visible && (this.If[a].mouseEnabled = !0, exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line1 + a));
                W(V(this.Ob.body, "breath"), !0).play();
                this.Ob.body.visible = !0;
                this.Ob.Zc.visible = !0;
                W(V(fa(this.Ob.sa.reset("blink"), this.Tl ? "F" : ""), "blink,_wait_,rotate-cw,rotate-ccw,_wait_"), !0).play();
                this.ta = this.m_scenes.Tb;
                this.Dh()
            };
            a.va.prototype.Dh = function () {
                if (exportRoot.autoPlay()) this.wh(Math.floor(5 *
                    Math.random()), !1);
                else
                    for (var a = exportRoot.m_buttons.m_enum.Line1, b = 0; b < this.yg; ++b)
                        if (exportRoot.m_buttons.clicked(a + b) && this.If[b].visible) {
                            this.wh(b, !1);
                            break
                        }
            };
            a.va.prototype.wh = function (a, b) {
                if (this.ta == this.m_scenes.Tb && 0 != this.If[a].visible) {
                    this.ta = this.m_scenes.ki;
                    exportRoot.m_sound.stopAllSounds();
                    exportRoot.m_buttons.disableAll();
                    this.Pb = a;
                    this.Ob.gotoAndStop(a);
                    W(V(this.Ob.sa, "pull"), !1).play();
                    this.Ob.body.visible = !1;
                    this.Ob.Zc.visible = !1;
                    this.Tp = this.Ob.sa.currentFrame;
                    this.sh = this.Af.gp;
                    for (a = 0; a < this.yg; ++a) this.If[a].mouseEnabled = !1;
                    b && (loader.mouseOut(), exportRoot.m_sound.playSound("button_click"))
                }
            };
            a.va.prototype.Do = function () {
                if (ha(this.Ob.sa) && this.sh == this.Af.ep) this.ta = this.m_scenes.bp;
                else {
                    var a = this.If[this.Pb],
                        b = this.Ob.sa.currentFrame - this.Tp;
                    switch (this.sh) {
                    case this.Af.gp:
                        8 <= b && (a.gotoAndStop("pull"), this.sh = this.Af.kp);
                        break;
                    case this.Af.kp:
                        16 <= b && (++a.currentFrame, this.sh = this.Af.lp);
                        break;
                    case this.Af.lp:
                        20 <= b && (++a.currentFrame, this.sh = this.Af.pp);
                        break;
                    case this.Af.pp:
                        28 <=
                            b && (a.visible = !1, this.sh = this.Af.ep)
                    }
                }
            };
            a.va.prototype.Uz = function () {
                this.Ob.gotoAndStop(this.Pb + 1);
                this.Ob.sa.reset("blink");
                if (0 < this.Qi[this.Sc]) this.gq = "banan";
                else {
                    var a = Math.floor(3 * Math.random());
                    this.gq = 0 == a ? "anvil" : 1 == a ? "brick" : "coconut"
                }
                V(this.Tc, this.gq).play();
                this.Tc.y = -96;
                U(this.Tc, 128 + 80 * this.Pb);
                this.ko = !1;
                this.Ji = 50;
                this.ta = this.m_scenes.jp
            };
            a.va.prototype.$H = function () {
                this.Tc.y += loader.getSpeed(this.Ji);
                this.Ji += loader.getSpeed(9.8 * 200);
                var a = this.Qi[this.Sc],
                    b = this.Tc.y;
                if (!this.ko) {
                    if (0 <
                        a && -48 <= b || 0 == a && 196 <= b) 0 < a ? V(this.Ob.sa, "swal").play() : (this.Ji = 0, V(this.Ob.sa, "blow").play(), exportRoot.m_sound.playSound("bonus_hit")), this.ko = !0
                } else if (0 < a && 244 <= b || 0 == a && 220 <= b) 0 < a ? (exportRoot.m_sound.playSound("bonus_eat"), this.ta = this.m_scenes.Ef) : this.ta = this.m_scenes.ji, this.Tc.visible = !1
            };
            a.va.prototype.bo = function () {
                ha(this.Ob.sa) && (this.Tl ? (this.Tl = !1, ++this.Sc, this.ta = this.Sc < this.yg ? this.m_scenes.$g : this.m_scenes.aj) : (V(this.Ob.sa, "stars").play(), this.ta = this.m_scenes.aj))
            };
            a.va.prototype.ap =
                function () {
                    if (ha(this.Ob.sa)) {
                        V(this.Ob.sa, "tongue").play();
                        var a = this.Hf[this.Pb];
                        a.setText(this.Qi[this.Sc]);
                        a.alpha = .3;
                        a.y = this.oq;
                        this.Hi.push(this.Pb);
                        exportRoot.m_sound.playSound("bonus_raise");
                        this.za = 0;
                        this.ta = this.m_scenes.li
                    }
                };
            a.va.prototype.Vo = function () {
                var a = 10 * Math.sqrt(.91),
                    b = this.oq - this.zo;
                ++this.za;
                var e = this.za / loader.getDelay(1),
                    f = Math.PI / 2;
                a = this.zo + Math.exp(-3 * e) * (b * Math.cos(f + a * e) + b * Math.sin(f + a * e));
                1.5 <= e && (a = this.zo, ++this.Sc, this.za = 0, this.ta = this.Sc < this.yg ? this.m_scenes.$g :
                    this.m_scenes.aj);
                e = this.Hf[this.Pb];
                1 > e.alpha && (e.alpha += .1);
                e.y = a
            };
            a.va.prototype.Ao = function () {
                if (this.za) --this.za;
                else if (this.Rb.update() && (this.Hf[this.Pb].setText(this.Rb.src()), exportRoot.jc(this.Rb.wf)), 0 == this.Rb.src())
                    if (0 == this.Hi.length) this.ta = this.m_scenes.De, this.wo && exportRoot.m_sound.playSound("sbns_music"), this.za = loader.getDelay(1);
                    else {
                        this.Pb = this.Hi[0];
                        this.Hi.shift();
                        do var a = this.Qi[++this.Sc]; while (0 == a);
                        this.Rb.set(a, exportRoot.rb);
                        this.za = loader.getDelay(.5)
                    }
            };
            a.bb.prototype.m_scenes = {
                Tb: 0,
                ki: 1,
                Ef: 2,
                ji: 3,
                Qf: 4,
                De: 5
            };
            a.bb.prototype.ta = 0;
            a.bb.prototype.Rb = new ka;
            a.bb.prototype.Pb;
            a.bb.prototype.za;
            a.bb.prototype.Ni;
            a.bb.prototype.Hf;
            a.bb.prototype.init = function () {
                this.$c.setAlign("center");
                this.ad.setAlign("center");
                x(this.xh, this.XH);
                x(this.yh, this.YH);
                this.Rb.Uo("move_num_bonus");
                loader.cacheObj(this.bg, !0, !0);
                for (var a = 0; a < this.numChildren; ++a) {
                    var b = this.getChildAt(a);
                    b.mouseEnabled && (b.mouseEnabled = !1)
                }
                this.Ni = [this.xh, this.yh];
                this.Hf = [this.$c, this.ad]
            };
            a.bb.prototype.reset =
                function () {
                    exportRoot.m_buttons.disableAll();
                    exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line3);
                    exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line7);
                    exportRoot.m_buttons.resetAllNames();
                    exportRoot.Mb.gotoAndStop("super");
                    this.Rb.Zl = exportRoot.Ff();
                    this.$c.setText("");
                    this.ad.setText("");
                    this.Pb = -1;
                    this.xh.gotoAndStop(0);
                    this.yh.gotoAndStop(0);
                    if (0 == exportRoot.autoPlay())
                        for (var a = 0; 2 > a; ++a) this.Ni[a].mouseEnabled = !0;
                    W(da(this.sa.reset("fingerL")), 2).play();
                    this.find.visible = !0;
                    this.za = 0;
                    this.ta = this.m_scenes.Tb;
                    this.Dh()
                };
            a.bb.prototype.XH = function () {
                exportRoot.bb.Kf(0, !0)
            };
            a.bb.prototype.YH = function () {
                exportRoot.bb.Kf(1, !0)
            };
            a.bb.prototype.setData = function (a) {
                this.rb = a
            };
            a.bb.prototype.update = function () {
                switch (this.ta) {
                case this.m_scenes.Tb:
                    this.Dh();
                    break;
                case this.m_scenes.ki:
                    this.Do();
                    break;
                case this.m_scenes.Ef:
                    this.ap();
                    break;
                case this.m_scenes.ji:
                    this.bo();
                    break;
                case this.m_scenes.Qf:
                    this.Ao();
                    break;
                case this.m_scenes.De:
                    0 < this.za ? --this.za : exportRoot.setScene(exportRoot.m_scenes.Nc)
                }
                this.sa.update()
            };
            a.bb.prototype.Dh = function () {
                exportRoot.autoPlay() ? this.Kf(Math.floor(2 * Math.random()), !1) : exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Line3) ? this.Kf(0, !1) : exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Line7) && this.Kf(1, !1)
            };
            a.bb.prototype.Kf = function (a, b) {
                if (this.ta == this.m_scenes.Tb) {
                    this.ta = this.m_scenes.ki;
                    exportRoot.m_buttons.disableAll();
                    exportRoot.m_sound.stopAllSounds();
                    this.Pb = a;
                    exportRoot.m_sound.playSound("sbns_open");
                    for (a = 0; 2 > a; ++a) this.Ni[a].mouseEnabled = !1;
                    this.sa.reset(0 ==
                        this.Pb ? "fingerL" : "fingerR");
                    this.Ni[this.Pb].gotoAndPlay(0 < this.rb ? "win" : "lose");
                    this.find.visible = !1;
                    b && (loader.mouseOut(), exportRoot.m_sound.playSound("button_click"))
                }
            };
            a.bb.prototype.Do = function () {
                var a = this.Ni[this.Pb];
                if ("stop" == a.currentLabel || "stop2" == a.currentLabel) 0 < this.rb ? (this.sa.reset(0 == this.Pb ? "winL" : "winR"), a.gotoAndStop("stopE"), this.Hf[this.Pb].setText(this.rb), exportRoot.m_sound.playSound("sbns_win"), this.za = loader.getDelay(1.5), this.ta = this.m_scenes.Ef) : (this.sa.reset(0 == this.Pb ?
                    "loseL" : "loseR"), a.gotoAndStop("stop2E"), exportRoot.m_sound.playSound("sbns_lose"), this.za = loader.getDelay(2.5), this.ta = this.m_scenes.ji)
            };
            a.bb.prototype.ap = function () {
                0 < this.za ? --this.za : (this.Rb.set(this.rb, exportRoot.rb), this.ta = this.m_scenes.Qf)
            };
            a.bb.prototype.bo = function () {
                ha(this.sa) && (V(this.sa, 0 == this.Pb ? "cryL" : "cryR").play(), this.ta = this.m_scenes.De)
            };
            a.bb.prototype.Ao = function () {
                this.Rb.update() && (this.Hf[this.Pb].setText(this.Rb.src()), exportRoot.jc(this.Rb.wf));
                0 == this.Rb.src() && (this.za =
                    loader.getDelay(.5), this.ta = this.m_scenes.De)
            };
            a.lb.prototype.jf = 1;
            a.lb.prototype.eq = 5;
            a.lb.prototype.ec;
            a.lb.prototype.kf;
            a.lb.prototype.init = function () {
                this.kf = [this.screen.Gg, this.screen.Rg, this.screen.Tg, this.screen.Ug, this.screen.Vg, this.screen.Wg, this.screen.Xg, this.screen.Yg, this.screen.Zg, this.screen.Hg, this.screen.Ig, this.screen.Jg, this.screen.Kg, this.screen.Lg, this.screen.Mg, this.screen.Ng, this.screen.Og, this.screen.Pg, this.screen.Qg, this.screen.Sg];
                this.screen.zh.setAlign("center");
                this.screen.Ah.setAlign("center");
                this.screen.Bh.setAlign("center");
                this.screen.Ch.setAlign("center");
                x(this.Cg, this.Bq);
                x(this.Xf, this.NH);
                x(this.Ag, this.Aq);
                W(V(this.Zf, "play,_wait_=3:6"), !0).play();
                W(V(this.Tf, "play,_wait_=2:5"), !0).play();
                loader.cacheObj(this.screen, !0, !0);
                for (var a = 0; a < this.numChildren; ++a) {
                    var b = this.getChildAt(a);
                    b.mouseEnabled && (b.mouseEnabled = !1)
                }
                this.Cg.mouseEnabled = !0;
                this.Xf.mouseEnabled = !0;
                this.Ag.mouseEnabled = !0;
                loader.cacheObj(this.Cg, !0, !1);
                loader.cacheObj(this.Xf, !0, !1);
                loader.cacheObj(this.Ag, !0,
                    !1)
            };
            a.lb.prototype.reset = function () {
                exportRoot.m_sound.stopAllSounds();
                exportRoot.m_buttons.resetAllNames();
                exportRoot.m_buttons.disableAll();
                exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line1);
                exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Line9);
                exportRoot.m_buttons.enable(exportRoot.m_buttons.m_enum.Start);
                this.jf = 1;
                this.screen.gotoAndStop(this.jf - 1);
                this.check();
                this.screen.updateCache()
            };
            a.lb.prototype.setData = function (a) {
                this.ec = a
            };
            a.lb.prototype.update = function () {
                exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Start) ?
                    this.jq = !0 : this.jq && (this.jq = !1, exportRoot.setScene(exportRoot.m_scenes.Nc));
                exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Line1) ? this.zq() || (this.Bq(), this.th = loader.getDelay(.5)) : exportRoot.m_buttons.clicked(exportRoot.m_buttons.m_enum.Line9) ? this.zq() || (this.Aq(), this.th = loader.getDelay(.5)) : this.th = 0;
                this.Zf.update();
                this.Tf.update()
            };
            a.lb.prototype.zq = function () {
                return 0 < this.th ? (--this.th, !0) : !1
            };
            a.lb.prototype.check = function () {
                switch (this.jf) {
                case 1:
                    this.screen.zh.setText(this.ec[0]);
                    this.screen.Ah.setText(9 * this.ec[1]);
                    this.screen.Bh.setText(9);
                    this.screen.Ch.setText(this.ec[1]);
                    break;
                case 2:
                    for (var a = 3, b = 0; 4 > b; ++b) this.kf[5 * b].setText(this.ec[a + 3 * b]), this.kf[1 + 5 * b].setText(this.ec[a + 1 + 3 * b]), this.kf[2 + 5 * b].setText(this.ec[a + 1 + 3 * b]), this.kf[3 + 5 * b].setText(this.ec[a + 2 + 3 * b]), this.kf[4 + 5 * b].setText(this.ec[a + 2 + 3 * b]);
                    break;
                case 3:
                    for (a = 15, b = 0; 4 > b; ++b) this.kf[5 * b].setText(this.ec[a + 3 * b]), this.kf[1 + 5 * b].setText(this.ec[a + 1 + 3 * b]), this.kf[2 + 5 * b].setText(this.ec[a + 1 + 3 * b]), this.kf[3 + 5 *
                        b].setText(this.ec[a + 2 + 3 * b]), this.kf[4 + 5 * b].setText(this.ec[a + 2 + 3 * b])
                }
            };
            a.lb.prototype.Bq = function (a) {
                a && exportRoot.m_sound.playSound("button_click");
                --exportRoot.lb.jf;
                1 > exportRoot.lb.jf && (exportRoot.lb.jf = exportRoot.lb.eq);
                exportRoot.lb.screen.gotoAndStop(exportRoot.lb.jf - 1);
                exportRoot.lb.check();
                exportRoot.lb.screen.updateCache()
            };
            a.lb.prototype.NH = function () {
                exportRoot.m_sound.playSound("button_click");
                exportRoot.setScene(exportRoot.m_scenes.Nc)
            };
            a.lb.prototype.Aq = function (a) {
                a && exportRoot.m_sound.playSound("button_click");
                ++exportRoot.lb.jf;
                exportRoot.lb.jf > exportRoot.lb.eq && (exportRoot.lb.jf = 1);
                exportRoot.lb.screen.gotoAndStop(exportRoot.lb.jf - 1);
                exportRoot.lb.check();
                exportRoot.lb.screen.updateCache()
            };
            var e = {
                    path: loader.m_params.path + "sounds/common/",
                    manifest: [{
                        id: "add_credit",
                        src: "add-credit.mp3"
                    }, {
                        id: "button_click",
                        src: "btn-click.mp3"
                    }, {
                        id: "main_line_1",
                        src: "main-1line.mp3"
                    }, {
                        id: "main_line_3",
                        src: "main-3lines.mp3"
                    }, {
                        id: "main_line_5",
                        src: "main-5lines.mp3"
                    }, {
                        id: "main_line_7",
                        src: "main-7lines.mp3"
                    }, {
                        id: "main_line_9",
                        src: "main-9lines.mp3"
                    }, {
                        id: "main_bet",
                        src: "main-bet.mp3"
                    }, {
                        id: "main_bet_fix",
                        src: "main-fix-bet.mp3"
                    }, {
                        id: "main_max_bet",
                        src: "main-maxbet.mp3"
                    }, {
                        id: "main_start",
                        src: "main-start.mp3"
                    }, {
                        id: "win_line_1",
                        src: "win-line1.mp3"
                    }, {
                        id: "win_line_2",
                        src: "win-line2.mp3"
                    }, {
                        id: "win_line_3",
                        src: "win-line3.mp3"
                    }, {
                        id: "win_line_4",
                        src: "win-line4.mp3"
                    }, {
                        id: "win_line_5",
                        src: "win-line5.mp3"
                    }, {
                        id: "win_line_6",
                        src: "win-line6.mp3"
                    }, {
                        id: "win_line_7",
                        src: "win-line7.mp3"
                    }, {
                        id: "win_line_8",
                        src: "win-line8.mp3"
                    }, {
                        id: "win_line_9",
                        src: "win-line9.mp3"
                    }, {
                        id: "move_num_0",
                        src: "move-num0.mp3"
                    }, {
                        id: "move_num_1",
                        src: "move-num1.mp3"
                    }, {
                        id: "move_num_2",
                        src: "move-num2.mp3"
                    }, {
                        id: "move_num_3",
                        src: "move-num3.mp3"
                    }, {
                        id: "move_num_bonus",
                        src: "move-num-bns.mp3"
                    }, {
                        id: "reel_rotation",
                        src: "reel-rotation.mp3"
                    }, {
                        id: "reel_stop",
                        src: "reel-stop.mp3"
                    }, {
                        id: "risk_forward",
                        src: "risk-forward.mp3"
                    }, {
                        id: "risk_open",
                        src: "risk-open.mp3"
                    }, {
                        id: "risk_win",
                        src: "risk-win.mp3"
                    }]
                },
                f = {
                    path: loader.m_params.path + "sounds/cm/",
                    manifest: [{
                            id: "big_win_music",
                            src: "big-win-music.mp3"
                        },
                        {
                            id: "bonus_hit",
                            src: "bns-hit.mp3"
                        }, {
                            id: "bonus_eat",
                            src: "bns-eat.mp3"
                        }, {
                            id: "bonus_music",
                            src: "bns-music.mp3"
                        }, {
                            id: "bonus_raise",
                            src: "bns-raise.mp3"
                        }, {
                            id: "sbns_lose",
                            src: "sbns-lose.mp3"
                        }, {
                            id: "sbns_music",
                            src: "sbns-music.mp3"
                        }, {
                            id: "sbns_open",
                            src: "sbns-open.mp3"
                        }, {
                            id: "sbns_win",
                            src: "sbns-win.mp3"
                        }
                    ]
                };
            createjs.Sound.alternateExtensions = ["mp3"];
            createjs.Sound.registerSounds(e);
            createjs.Sound.registerSounds(f);
            exportRoot.addEventListener("tick", b)
        };
        this.timeline.addTween(e.Tween.get(this).call(this.Dm).wait(1));
        this.Cf = new a.Cf;
        this.Cf.name = "msgbox";
        this.Cf.parent = this;
        this.Cf.setTransform(512, 439, 1, 1, 0, 0, 0, 80, 24);
        this.timeline.addTween(e.Tween.get(this.Cf).wait(1));
        this.Mb = new a.XK;
        this.Mb.name = "tablo";
        this.Mb.parent = this;
        this.Mb.setTransform(320, 32.1, 1, 1.002, 0, 0, 0, 320, 32);
        this.timeline.addTween(e.Tween.get(this.Mb).wait(1));
        b = new e.Shape;
        b._off = !0;
        b.graphics.p("Egx/glfMBj/AAAMAAABK/Mhj/AAAg");
        b.setTransform(320, 240);
        this.va = new a.va;
        this.va.name = "bonus_game";
        this.va.parent = this;
        this.va.setTransform(320,
            239, 1, 1, 0, 0, 0, 320, 239);
        f = [this.va];
        for (h = 0; h < f.length; h++) f[h].mask = b;
        this.timeline.addTween(e.Tween.get(this.va).wait(1));
        this.pa = new a.pa;
        this.pa.name = "main_game";
        this.pa.parent = this;
        this.pa.setTransform(329.9, 234, 1, 1, 0, 0, 0, 329.9, 234);
        f = [this.pa];
        for (h = 0; h < f.length; h++) f[h].mask = b;
        this.timeline.addTween(e.Tween.get(this.pa).wait(1));
        this.bb = new a.bb;
        this.bb.name = "super_game";
        this.bb.parent = this;
        this.bb.setTransform(320, 272, 1, 1, 0, 0, 0, 320, 272);
        this.timeline.addTween(e.Tween.get(this.bb).wait(1));
        this.Na = new a.Na;
        this.Na.name = "risk_game";
        this.Na.parent = this;
        this.Na.setTransform(320, 272, 1, 1, 0, 0, 0, 320, 272);
        this.timeline.addTween(e.Tween.get(this.Na).wait(1));
        this.lb = new a.lb;
        this.lb.name = "help_game";
        this.lb.parent = this;
        this.lb.setTransform(320, 240, 1, 1, 0, 0, 0, 320, 240);
        this.timeline.addTween(e.Tween.get(this.lb).wait(1))
    }).prototype = b = new e.MovieClip;
    b.nominalBounds = new e.Rectangle(320, 240, 640, 480);
    a.properties = {
        id: "3E439908A153BD41B29A8AAAB9554382",
        width: 640,
        height: 480,
        fps: 30,
        color: "#FFFFFF",
        opacity: 1,
        manifest: [{
            src: "images/cm/cm_atlas_.png",
            id: "cm_atlas_"
        }],
        rM: []
    }
})(lib = lib || {}, images = images || {}, createjs = createjs || {}, ss = ss || {}, Ca = Ca || {});
var lib, images, createjs, ss, Ca;
