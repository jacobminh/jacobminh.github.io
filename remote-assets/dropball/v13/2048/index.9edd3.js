window.__require = function e(t, i, n) {
function o(s, c) {
if (!i[s]) {
if (!t[s]) {
var l = s.split("/");
l = l[l.length - 1];
if (!t[l]) {
var r = "function" == typeof __require && __require;
if (!c && r) return r(l, !0);
if (a) return a(l, !0);
throw new Error("Cannot find module '" + s + "'");
}
s = l;
}
var h = i[s] = {
exports: {}
};
t[s][0].call(h.exports, function(e) {
return o(t[s][1][e] || e);
}, h, h.exports, e, t, i, n);
}
return i[s].exports;
}
for (var a = "function" == typeof __require && __require, s = 0; s < n.length; s++) o(n[s]);
return o;
}({
Ball: [ function(e, t) {
"use strict";
cc._RF.push(t, "13f1bx00WhNDqkLut4sh4Od", "Ball");
var i = [ "f43c3d", "3cf4f3", "f33cf4", "3c3df4", "f4973c", "3df43c", "3a96ef", "f4f33c", "f43c98", "3cf497", "973cf4", "96f13b" ];
cc.Class({
extends: cc.Component,
properties: {
itemFrames: {
default: null,
type: cc.SpriteAtlas
},
coin: 0,
_coin: 0,
numIndex: 0,
radius: 64,
isAlive: !0,
status: 0,
LbNumber: cc.Label,
animBoom: cc.Prefab,
soundBoom: {
default: null,
type: cc.AudioClip
}
},
onBeginContact: function(e, t, i) {
this.game && this.game.onBeginContact(e, t, i);
},
explosive: function() {
var e = cc.instantiate(this.animBoom);
e.x = this.node.x;
e.y = this.node.y;
e.scale = this.node.scale;
e.parent = this.game.KhungNode;
this.game && this.game.enableSound && cc.audioEngine.playEffect(this.soundBoom, !1);
this.node.destroy();
},
doubleCoin: function() {
if (this.isAlive) {
var e = 2 * this.coin;
-1 != e.toString().indexOf("1024") && (e = parseInt(e.toString().replace("1024", "1000")));
this.setCoin(e);
}
},
setCoin: function(e) {
-1 != e.toString().indexOf("1024") && (e = parseInt(e.toString().replace("1024", "1000")));
this.coin = e;
this._coin = e;
for (var t = [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1e3 ], n = 0, o = e; o > 1e3; ) {
o = Math.round(o / 1e3);
n += t.length;
}
var a = (n += t.indexOf(o)) % 12;
this.refreshSize();
this.node.getChildByName("Ball").getComponent(cc.Sprite).spriteFrame = this.itemFrames.getSpriteFrame("ball-" + a);
this.getComponent(cc.MotionStreak).color = new cc.Color().fromHEX("#" + i[a]);
var s = e + "";
e >= Math.pow(10, 24) ? s = Math.floor(e / Math.pow(10, 24)) + "Y" : e >= Math.pow(10, 21) ? s = Math.floor(e / Math.pow(10, 21)) + "Z" : e >= Math.pow(10, 18) ? s = Math.floor(e / Math.pow(10, 18)) + "E" : e >= Math.pow(10, 15) ? s = Math.floor(e / Math.pow(10, 15)) + "P" : e >= Math.pow(10, 12) ? s = Math.floor(e / Math.pow(10, 12)) + "T" : e >= Math.pow(10, 9) ? s = Math.floor(e / Math.pow(10, 9)) + "G" : e >= Math.pow(10, 6) ? s = Math.floor(e / Math.pow(10, 6)) + "M" : e >= Math.pow(10, 3) && (s = Math.floor(e / Math.pow(10, 3)) + "K");
this.LbNumber.string = s;
var c = s.length;
1 === c ? this.LbNumber.fontSize = 32 : 2 === c ? this.LbNumber.fontSize = 28 : 3 === c ? this.LbNumber.fontSize = 23 : 4 === c && (this.LbNumber.fontSize = 18);
this.numIndex = new Date().getTime();
},
refreshSize: function() {
if (this.isAlive) {
var e = 1;
if (this.game) {
for (var t = this.game.nextBall; t > this.coin; ) {
-1 != t.toString().indexOf("1000") && (t = parseInt(t.toString().replace("1000", "1024")));
t = Math.round(t / 2);
e -= .04;
}
e += .04;
}
this.node.scale = e;
this.radius = 64 * e;
this.getComponent(cc.MotionStreak).stroke = 128 * e;
}
},
getCoin: function() {
return this.coin;
}
});
cc._RF.pop();
}, {} ],
BgFull: [ function(e, t) {
"use strict";
cc._RF.push(t, "596f77lQTNKSbw0vxiF1mrg", "BgFull");
cc.Class({
extends: cc.Component,
properties: {
parentScale: !1
},
resizeBG: function() {
var e = cc.view.getFrameSize(), t = this.originWidth, i = this.originHeight, n = 1;
this.parentScale && (n = this.node.parent.scale);
if (t / i > e.width / e.height) {
var o = (s = t * e.height / e.width) * t / i, a = cc.size(o / n, s / n);
this.node.setContentSize(a);
} else {
var s = (o = i * e.width / e.height) * i / t;
a = cc.size(o / n, s / n);
this.node.setContentSize(a);
}
},
start: function() {
this.originWidth = this.node.width;
this.originHeight = this.node.height;
this.resizeBG();
cc.view.on("canvas-resize", this.resizeBG, this);
},
onDestroy: function() {
cc.view.off("canvas-resize", this.resizeBG, this);
}
});
cc._RF.pop();
}, {} ],
Count: [ function(e, t) {
"use strict";
cc._RF.push(t, "74d97xE4n1C4o6QaV1glMgg", "Count");
cc.Class({
extends: cc.Component,
countUp: function(e, t, i) {
this._countTo = e;
this._countFrom = e;
i && (this._countTemplate = i);
this.countTo(t, .5);
},
countTo: function(e, t) {
3 === arguments.length && (this._countTo = arguments[2]);
if (e !== this._countTo) {
this._countFrom = this._countTo;
this._countTo = e;
this._countDuration = t || 1;
this._countTime = 0;
this._countStep = (this._countTo - this._countFrom) / this._countDuration;
this._countRunning = !0;
}
},
onLoad: function() {
this._countRunning = !1;
this._countFrom = 0;
this._countTo = 0;
this._countStep = 1;
this._countDuration = 1;
this._countTime = 0;
this._countTemplate = "%n";
this.LabelNode = this.getComponent(cc.Label);
},
update: function(e) {
if (!1 !== this._countRunning) {
this._countTime += e;
if (this._countTime > this._countDuration) {
this._countRunning = !1;
this.LabelNode.string = this._countTemplate.replace("%n", Math.round(this._countTo));
this._countRunning = !1;
} else this.LabelNode.string = this._countTemplate.replace("%n", Math.round(this._countFrom + this._countStep * this._countTime));
}
}
});
cc._RF.pop();
}, {} ],
main_game_control: [ function(e, t) {
"use strict";
cc._RF.push(t, "92a0bB1bqVJ4IFq69Xq/uON", "main_game_control");
var i = !1, n = 2e3;
cc.Class({
extends: cc.Component,
properties: {
ballPre: cc.Prefab,
KhungNode: cc.Node,
MoveNode: cc.Node,
LineNode: cc.Node,
BoomNode: cc.Node,
CoinPre: cc.Node,
X2Node: cc.Node,
StringWin: cc.Node,
HowPlayNode: cc.Node,
DarkNode: cc.Node,
DangerLine: cc.Node,
NextLevelNode: cc.Node,
LevelProgess: cc.Node,
NextNode: cc.Node,
GameOverNode: cc.Node,
LbScrore: cc.Label,
LbCoin: cc.Label,
LbBest: cc.Label,
LbNumBoom: cc.Label,
LbNumX2: cc.Label,
LbDebug: cc.Label,
ButtonX2: cc.Node,
ButtonBoom: cc.Node,
CancelBoom: cc.Node,
CancelX2: cc.Node,
_canMove: !1,
sdkBoxEnable: !1,
nextBall: 2e3,
gameName: "2048"
},
newBall: function(e) {
for (var t = this.KhungNode.children, n = !1, o = 0, a = 0, s = 0; s < t.length; s++) if (cc.isValid(t[s]) && "Ball" === t[s].name && (r = t[s].getComponent("Ball"))) if (1 === r.status) t[s].destroy(); else if (2 === r.status) {
a++;
var c = t[s].y + r.radius;
if (c > 850) {
n = !0;
c > 940 && o++;
}
}
if (i && a > 5) {
cc.log("countBall", a);
this.gameOver();
} else if (o > 1) this.gameOver(); else {
a > 0 && (this.DangerLine.active = n);
this.ButtonX2.active = !0;
this.ButtonBoom.active = !0;
var l = null, r = (l = 4 === e ? cc.instantiate(this.BoomNode) : 5 === e ? cc.instantiate(this.X2Node) : cc.instantiate(this.ballPre)).getComponent("Ball");
l.name = "Ball";
l.active = !0;
l.parent = this.KhungNode;
r.status = 1;
r.game = this;
if (4 === e) this.ButtonBoom.active = !1; else if (5 === e) this.ButtonX2.active = !1; else {
var h = 2;
if (1 === e) h = this._lastRandomBall; else if (this.randomBalls && this.randomBalls.length) if (i) {
this.__testrandomindex || (this.__testrandomindex = 0);
h = this.randomBalls[this.__testrandomindex];
this.__testrandomindex++;
this.__testrandomindex >= this.randomBalls.length && (this.__testrandomindex = 0);
} else h = this.randomBalls[Math.floor(Math.random() * this.randomBalls.length)];
r.setCoin(h);
this._lastRandomBall = h;
}
l.x = 360;
l.y = 1050 - r.radius;
this.CurrentBall = l;
this.BallRadius = r.radius;
this._canMove = !0;
this.LineNode.active = !0;
this.LineNode.x = l.x - 360;
}
},
clickButton: function(e, t) {
var i = this;
this.detectRestart();
this._lastTimeTouch = new Date().getTime();
switch (t) {
case "SoundOn":
this.setSoundEnable(!0);
break;

case "SoundOff":
this.setSoundEnable(!1);
break;

case "Boom":
if (!this._canMove) return;
if (this.NumBoom > 0) {
this.CurrentBall && 1 === this.CurrentBall.getComponent("Ball").status && cc.tween(this.CurrentBall).to(.3, {
scale: 0
}).start();
(o = cc.instantiate(this.BoomNode)).removeComponent(cc.RigidBody);
o.x = 110;
o.y = 165;
o.scale = .5;
o.parent = this.KhungNode;
o.active = !0;
this._canMove = !1;
this.LineNode.active = !1;
cc.tween(o).to(.25, {
scale: 1.2
}, {
easing: "cubicOut"
}).to(.25, {
scale: .8
}, {
easing: "cubicIn"
}).start();
cc.tween(o).to(.5, {
x: 360,
y: 1020
}).call(function() {
o.destroy();
i.newBall(4);
}).start();
} else if (this.sdkBoxEnable && sdkbox.PluginAdMob.isAvailable("boom")) {
this.waitingAd = "boom";
sdkbox.PluginAdMob.show("boom");
} else this.waitingAd = null;
break;

case "X2":
if (!this._canMove) return;
if (this.NumX2 > 0) {
this.CurrentBall && 1 === this.CurrentBall.getComponent("Ball").status && cc.tween(this.CurrentBall).to(.3, {
scale: 0
}).start();
(o = cc.instantiate(this.X2Node)).removeComponent(cc.RigidBody);
o.x = 598;
o.y = 162;
o.scale = .5;
o.parent = this.KhungNode;
o.active = !0;
this._canMove = !1;
this.LineNode.active = !1;
cc.tween(o).to(.25, {
scale: 1.2
}, {
easing: "cubicOut"
}).to(.25, {
scale: .8
}, {
easing: "cubicIn"
}).start();
cc.tween(o).to(.5, {
x: 360,
y: 1020
}).call(function() {
o.destroy();
i.newBall(5);
}).start();
} else {
if (this.sdkBoxEnable && sdkbox.PluginAdMob.isAvailable("x2")) {
this.waitingAd = "x2";
sdkbox.PluginAdMob.show("x2");
} else this.waitingAd = null;
this.sdkBoxEnable && (sdkbox.PluginAdMob.isAvailable("x2") ? this.showDebugLog("x2 okkkkk") : this.showDebugLog("x2 nooooooooo"));
}
break;

case "CancelX2":
this._canMove = !1;
this.LineNode.active = !1;
this.CurrentBall.destroy();
(o = cc.instantiate(this.X2Node)).removeComponent(cc.RigidBody);
o.x = 360;
o.y = 1020;
o.scale = .8;
o.parent = this.KhungNode;
o.active = !0;
cc.tween(o).to(.25, {
scale: 1.2
}, {
easing: "cubicOut"
}).to(.25, {
scale: .8
}, {
easing: "cubicIn"
}).start();
cc.tween(o).to(.5, {
x: 598,
y: 162
}).call(function() {
o.destroy();
i.newBall(1);
}).start();
break;

case "CancelBoom":
this._canMove = !1;
this.LineNode.active = !1;
this.CurrentBall.destroy();
var o;
(o = cc.instantiate(this.BoomNode)).removeComponent(cc.RigidBody);
o.x = 360;
o.y = 1020;
o.scale = .8;
o.parent = this.KhungNode;
o.active = !0;
cc.tween(o).to(.25, {
scale: 1.2
}, {
easing: "cubicOut"
}).to(.25, {
scale: .8
}, {
easing: "cubicIn"
}).start();
cc.tween(o).to(.5, {
x: 110,
y: 165
}).call(function() {
o.destroy();
i.newBall(1);
}).start();
break;

case "SkipNextLevel":
if (!this._canClickContinue) return;
this.saveGame();
this._canClickContinue = !1;
this.waitingAd = "nextlevel";
this.sdkBoxEnable && sdkbox.PluginAdMob.isAvailable("nextlevel") ? sdkbox.PluginAdMob.show("nextlevel") : this.afterPlayAd();
break;

case "Revite":
this.waitingAd = "revite";
this.sdkBoxEnable && sdkbox.PluginAdMob.isAvailable("revite") ? sdkbox.PluginAdMob.show("revite") : this.afterPlayAd();
break;

case "GameOver":
if (this.GameScore > n) {
n = this.GameScore;
cc.sys.localStorage.setItem("BestScore", n);
this.LbBest.string = "BEST : " + n;
}
cc.tween(this.DarkNode).to(.4, {
opacity: 0
}).start();
cc.tween(this.GameOverNode).to(.5, {
opacity: 0
}).delay(.5).call(function() {
i.DarkNode.active = !1;
i.GameOverNode.active = !1;
cc.director.getPhysicsManager().enabled = !0;
i.MoveNode.active = !0;
i.newGame();
}).start();
}
},
setSoundEnable: function(e) {
this.enableSound = e;
var t = 0;
if (!0 === e) {
this.node.parent.getChildByName("sound-on").active = !0;
this.node.parent.getChildByName("sound-off").active = !1;
t = 1;
} else {
this.node.parent.getChildByName("sound-on").active = !1;
this.node.parent.getChildByName("sound-off").active = !0;
}
cc.sys.localStorage.setItem("enableSound", t);
},
onBeginContact: function(e, t, i) {
var n = this;
if (2 === t.tag && 2 === i.tag) {
var o = t.getComponent("Ball"), a = i.getComponent("Ball");
if (o && a && o._coin === a._coin && o.numIndex > a.numIndex && o.isAlive && a.isAlive && 2 === o.status && 2 === a.status) {
var s = null, c = null;
if (o.node.y > a.node.y + 3) {
s = a;
c = o;
} else if (a.node.y > o.node.y + 3) {
s = o;
c = a;
} else if (Math.abs(o.getComponent(cc.RigidBody).linearVelocity.x) > Math.abs(a.getComponent(cc.RigidBody).linearVelocity.x)) {
s = a;
c = o;
} else {
s = o;
c = a;
}
-1 != (h = 2 * Math.max(o.coin, a.coin)).toString().indexOf("1024") && (h = parseInt(h.toString().replace("1024", "1000")));
s._coin = h;
this.eatingBall(Math.max(o.coin, a.coin));
c.isAlive = !1;
c.getComponent(cc.RigidBody).destroy();
cc.tween(c.node).to(.08, {
x: s.node.x,
y: s.node.y
}).call(function() {
c.explosive();
cc.isValid(s.node) ? s.doubleCoin() : cc.log("not found! why?");
}).start();
}
} else if (4 === t.tag) {
var l = t.getComponent("Ball");
s = i.getComponent("Ball");
if (l && l.isAlive) if (0 === i.tag) this.scheduleOnce(function() {
if (l.isAlive) {
l.isAlive = !1;
l.explosive();
}
}, 1); else if (2 === i.tag && s && s.isAlive) {
l.isAlive = !1;
s.isAlive = !1;
l.getComponent(cc.RigidBody).destroy();
var r = s._coin;
cc.tween(l.node).to(.08, {
x: s.node.x,
y: s.node.y
}).call(function() {
for (var e = n.KhungNode.children, t = 1, i = 0; i < e.length; i++) if ("Ball" === e[i].name) {
var o = e[i].getComponent("Ball");
if (2 === o.status && o.isAlive && o._coin === r) {
o.isAlive = !1;
cc.tween(e[i]).delay(.1 * t).call(function(e) {
e.getComponent("Ball").explosive();
}).start();
t++;
}
}
l.node.destroy();
s.explosive();
}).start();
}
} else if (5 === t.tag) {
l = t.getComponent("Ball"), s = i.getComponent("Ball");
if (l && l.isAlive) if (0 === i.tag) this.scheduleOnce(function() {
if (l.isAlive) {
l.isAlive = !1;
l.explosive();
}
}, 1); else if (2 === i.tag && s && s.isAlive) {
l.isAlive = !1;
l.getComponent(cc.RigidBody).destroy();
var h;
-1 != (h = 2 * s.coin).toString().indexOf("1024") && (h = parseInt(h.toString().replace("1024", "1000")));
this.eatingBall(s.coin);
s._coin = h;
cc.tween(l.node).to(.08, {
x: s.node.x,
y: s.node.y
}).call(function() {
l.explosive();
cc.isValid(s.node) ? s.doubleCoin() : cc.log("not found! why?");
}).start();
if (h >= this.nextBall) {
this.MoveNode.active = !1;
this.LineNode.opacity = 0;
this.scheduleOnce(function() {
n.animNewRank();
}, 1);
}
}
}
},
pauseContact: function(e) {
cc.director.getPhysicsManager().enabled = !e;
},
winString: function(e) {
var t = this;
if (e > 2) {
var i;
i = e >= 5 ? 4 : 4 == e ? 3 : Math.random() > .5 ? 1 : 2;
var n = this.StringWin.getChildByName("T" + i);
if (n) {
this._isAnimMultiWin = !0;
n.y = -440;
n.opacity = 0;
n.scale = .4;
n.active = !0;
cc.tween(n).to(.3, {
y: 90,
opacity: 255,
scale: 1
}, {
easing: "cubicOut"
}).delay(.7).to(.3, {
opacity: 0,
y: 440
}).call(function() {
n.active = !1;
t._isAnimMultiWin = !1;
t._multiWinCallback && t._multiWinCallback();
t._multiWinCallback = null;
}).start();
}
}
},
setNextBall: function(e) {
this.nextBall = e;
for (var t = [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1e3 ], n = e; n > 1e3; ) {
n = Math.round(n / 1e3);
t.length;
}
t.indexOf(n);
this.randomBalls = [];
for (var o = e, a = 0; a < 10; a++) {
-1 != o.toString().indexOf("1000") && (o = parseInt(o.toString().replace("1000", "1024")));
if ((o = Math.round(o / 2)) < 2) break;
a >= 4 && this.randomBalls.push(o);
}
this.randomBalls.length < 4 && this.randomBalls.push(2 * this.randomBalls[0]);
if (i) {
this.randomBalls = [ 4e3, 2e3, 1e3, 512, 256, 128, 64, 32, 16, 16, 8, 4, 2 ];
if (this.nextBall != 2 * this.randomBalls[0]) {
this.setNextBall(2 * this.randomBalls[0]);
return;
}
}
this.CurrentBall && -1 != this.randomBalls.indexOf(this.CurrentBall.getComponent("Ball").coin) || this.newBall();
var s = this.KhungNode.children;
for (a = 0; a < s.length; a++) "Ball" === s[a].name && 3 === s[a].getComponent("Ball").status && s[a].destroy();
var c = cc.instantiate(this.ballPre);
c.x = -1;
c.y = -102;
c.removeComponent(cc.PhysicsCircleCollider);
c.removeComponent(cc.RigidBody);
c.getComponent("Ball").setCoin(e);
c.getComponent("Ball").status = 3;
c.getComponent("Ball").game = this;
c.parent = this.NextNode;
this.ballNext = c;
c.scale = .7;
},
_touchEnd: function() {
var e = this;
this.detectRestart();
this._lastTimeTouch = new Date().getTime();
if (this._canMove) {
this.saveGame();
cc.director.getPhysicsManager().enabled = !0;
this._canMove = !1;
this.LineNode.active = !1;
this.CurrentBall;
var t = this.CurrentBall.getComponent("Ball");
t.status = 2;
var i = t.getComponent(cc.PhysicsCircleCollider).tag;
4 === i ? this.NumBoom-- : 5 === i && this.NumX2--;
this.CurrentBall.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
this.countWinTurn = 0;
this.ButtonBoom.active = !0;
this.ButtonX2.active = !0;
this.renderNumFree();
this.scheduleOnce(function() {
e.newBall();
}, 1);
this.countLevelBalls++;
}
},
eatingBall: function(e) {
for (var t = this, i = Math.min.apply(Math, this.randomBalls), n = 0; i < e; ) {
-1 != (i *= 2).toString().indexOf("1024") && (i = parseInt(i.toString().replace("1024", "1000")));
n++;
}
if (n > 0) {
this.countLevelEats++;
this.countWinTurn++;
}
cc.Tween.stopAllByTarget(cc.find("Mask/progess", this.LevelProgess));
var o = Math.floor(this.GameScore / 64);
this.GameScore += n;
this.LbScrore.string = this.GameScore;
this.LbCoin.getComponent(cc.Label).string = Math.min(9999, this.GameCoin);
if (!this._isAnimMultiWin) {
cc.log("this.countWinTurn", this.countWinTurn);
if (this.countWinTurn > 2) {
this._isAnimMultiWin = !0;
var a = this.countWinTurn;
this.scheduleOnce(function() {
if (!t._isAnimNewRank && !t._isAnimNewLevel) {
t.winString(Math.max(a, t.countWinTurn));
cc.log("max", Math.max(a, t.countWinTurn));
}
t.countWinTurn = 0;
t._isAnimMultiWin = !1;
}, .5);
}
}
var s = this.GameScore % 64;
if (!this._isAnimNewLevel && o < Math.floor(this.GameScore / 64)) {
this._isAnimNewLevel = !0;
this.LevelProgess.getChildByName("End").active = !0;
this.LevelProgess.getChildByName("NextLevel").color = new cc.Color(163, 98, 0);
cc.find("Mask/progess", this.LevelProgess).x = 0;
this.MoveNode.active = !1;
this._canMove = !1;
this.scheduleOnce(function() {
t.animNewLevel();
}, .5);
}
if (!this._isAnimNewRank) {
var c = 2 * e;
-1 != c.toString().indexOf("1024") && (c = parseInt(c.toString().replace("1024", "1000")));
if (c >= this.nextBall) {
cc.log("has new rank");
this._isAnimNewRank = !0;
this.MoveNode.active = !1;
this.LineNode.opacity = 0;
this.scheduleOnce(function() {
t._isAnimNewLevel ? t._newLevelCallback = function() {
t.animNewRank();
} : t.animNewRank();
}, .6);
}
}
if (!this._isAnimNewLevel) {
this.LevelProgess.getChildByName("End").active = !1;
this.LevelProgess.getChildByName("NextLevel").color = new cc.Color(255, 255, 255);
cc.tween(cc.find("Mask/progess", this.LevelProgess)).to(.2, {
x: 180 * s / 64 - 205
}).start();
this.LevelProgess.getChildByName("CurrLevel").getComponent(cc.Label).string = o;
this.LevelProgess.getChildByName("NextLevel").getComponent(cc.Label).string = o + 1;
}
},
animNewLevel: function() {
var e = this;
if (this._isAnimNewLevel) {
cc.log("call animNewLevel");
cc.director.getPhysicsManager().enabled = !1;
this.MoveNode.active = !1;
this._canMove = !1;
this._canClickContinue = !0;
this._coinEarn = Math.min(10, Math.floor(10 * this.countLevelEats / this.countLevelBalls));
this.countLevelEats = 0;
this.countLevelBalls = 0;
this.NextLevelNode.active = !0;
this.NextLevelNode.opacity = 255;
var t = this.NextLevelNode.getChildByName("Ribbon"), i = this.NextLevelNode.getChildByName("Level"), n = this.NextLevelNode.getChildByName("Coin"), o = this.NextLevelNode.getChildByName("Continue"), a = n.getChildByName("Num");
i.active = !1;
n.active = !1;
o.active = !1;
t.active = !0;
this.DarkNode.active = !0;
i.getChildByName("Num").getComponent(cc.Label).string = Math.max(Math.floor(this.GameScore / 64) - 1, 0);
a.getComponent(cc.Label).string = "+0";
this.DarkNode.opacity = 0;
t.opacity = 0;
t.y = 45;
cc.tween(this.DarkNode).to(.3, {
opacity: 190
}).start();
cc.tween(t).to(.3, {
opacity: 255
}).delay(1).call(function() {
i.active = !0;
i.opacity = 0;
cc.tween(i).to(.3, {
opacity: 255
}).call(function() {
i.getChildByName("Num").getComponent(cc.Label).string = Math.floor(e.GameScore / 64);
}).delay(.5).call(function() {
n.active = !0;
n.opacity = 0;
cc.tween(n).delay(1).to(.3, {
opacity: 255
}).delay(.5).call(function() {
a.getComponent("Count").countUp(0, e._coinEarn, "+%n");
}).delay(2).call(function() {
o.active = !0;
}).start();
}).start();
}).to(.3, {
y: 305
}).start();
}
},
animNewRank: function() {
var e = this;
cc.log("finist Level");
this.MoveNode.active = !1;
this.LineNode.opacity = 0;
var t = 2 * this.nextBall;
-1 != t.toString().indexOf("1024") && (t = parseInt(t.toString().replace("1024", "1000")));
var i = this.nextBall;
this.nextBall = t;
var n = this.KhungNode.getChildByName("Light");
n.active = !1;
n.scale = 1;
n.x = 360;
n.y = 840;
this._isAnimNewRank = !0;
for (var o = !1, a = this.KhungNode.children, s = 0; s < a.length; s++) if ("Ball" === a[s].name) {
var c = a[s].getComponent("Ball");
if (2 === c.status && c.isAlive) if (c.coin === i) {
if (!1 === o) {
c.getComponent(cc.RigidBody).destroy();
a[s].zIndex = 99;
cc.tween(a[s]).to(.5, {
x: 360,
y: 840,
scale: 1,
angle: 0
}, {
easing: "cubicOut"
}).call(function() {}).delay(1.8).call(function(e) {
n.active = !1;
cc.tween(e).to(.6, {
x: 540
}, {
easing: "cubicOut"
}).to(.4, {
x: 360,
scale: .7
}, {
easing: "cubicIn"
}).start();
}).to(1, {
y: 144
}).call(function(i) {
i.getComponent("Ball").explosive();
e.setNextBall(t);
e.shakeKhung();
e.MoveNode.active = !0;
e.LineNode.opacity = 255;
for (var n = 1, o = e.KhungNode.children, a = 0; a < o.length; a++) if ("Ball" === o[a].name) {
var s = o[a].getComponent("Ball");
if (1 === s.status) s._coin < Math.min.apply(Math, e.randomBalls) && e.newBall(); else if (s.isAlive && s._coin < Math.min.apply(Math, e.randomBalls)) {
s.isAlive = !1;
cc.tween(o[a]).delay(.1 * n).call(function(e) {
e.getComponent("Ball").explosive();
}).start();
n++;
}
}
e._isAnimNewRank = !1;
e._newRankCallback && e._newRankCallback();
e._newRankCallback = null;
}).start();
}
o = !0;
} else c.refreshSize();
}
if (!1 === o) {
var l = this.KhungNode.children;
for (s = 0; s < l.length; s++) "Ball" === l[s].name && (h = l[s].getComponent("Ball")) && h.isAlive && 2 === h.status && t < 2 * h.coin && (t = 2 * h.coin);
-1 != t.toString().indexOf("1024") && (t = parseInt(t.toString().replace("1024", "1000")));
this.setNextBall(t);
this.MoveNode.active = !0;
this.LineNode.opacity = 255;
var r = 1;
for (s = 0; s < l.length; s++) if ("Ball" === l[s].name) {
var h;
if (1 === (h = l[s].getComponent("Ball")).status) h._coin < Math.min.apply(Math, this.randomBalls) && this.newBall(); else if (h.isAlive && h._coin < Math.min.apply(Math, this.randomBalls)) {
h.isAlive = !1;
cc.tween(l[s]).delay(.1 * r).call(function(e) {
e.getComponent("Ball").explosive();
}).start();
r++;
}
}
this._isAnimNewRank = !1;
this._newRankCallback && this._newRankCallback();
this._newRankCallback = null;
}
},
gameOver: function() {
cc.sys.localStorage.removeItem("gameCache");
cc.director.getPhysicsManager().enabled = !1;
this.MoveNode.active = !1;
this._canMove = !1;
this.GameOverNode.active = !0;
this.GameOverNode.opacity = 0;
this.DarkNode.active = !0;
this.DarkNode.opacity = 0;
this.GameOverNode.getChildByName("Score").getComponent(cc.Label).string = this.GameScore;
this.GameOverNode.getChildByName("Best").getComponent(cc.Label).string = n;
cc.tween(this.DarkNode).to(.5, {
opacity: 190
}).start();
cc.tween(this.GameOverNode).to(.5, {
opacity: 255
}).start();
},
newGame: function(e) {
for (var t = this, i = 256, n = this.KhungNode.children, o = 0; o < n.length; o++) "Ball" === n[o].name && n[o].destroy();
this.CurrentBall = null;
if (e) {
this.NumX2 = e.NumX2;
this.NumBoom = e.NumBoom;
this.GameScore = e.GameScore;
this.GameCoin = e.GameCoin;
this.nextBall = e.NextBall;
i = e.NextBall;
if (e.Balls && e.Balls.length) for (o = 0; o < e.Balls.length; o++) {
var a = cc.instantiate(this.ballPre), s = a.getComponent("Ball");
a.name = "Ball";
a.active = !0;
a.x = e.Balls[o].x;
a.y = e.Balls[o].y;
a.parent = this.KhungNode;
s.status = 2;
s.game = this;
s.setCoin(e.Balls[o].c);
a.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
}
cc.log(e);
} else {
this.NumX2 = 3;
this.NumBoom = 3;
this.GameScore = 0;
this.GameCoin = 0;
}
this.randomBalls = [];
this.countWinTurn = 0;
this.countLevelBalls = 0;
this.countLevelEats = 0;
this._isAnimMultiWin = !1;
this._isAnimNewRank = !1;
this._isAnimNewLevel = !1;
this._multiWinCallback = null;
this._newRankCallback = null;
this._newLevelCallback = null;
this.DangerLine.active = !0;
this.MoveNode.active = !0;
this._canMove = !0;
cc.director.getPhysicsManager().enabled = !0;
this.renderNumFree();
this.eatingBall(0);
this.scheduleOnce(function() {
t.setNextBall(i);
}, .3);
},
checkMyWeb: function() {
if (!cc.sys.isNative && location && -1 == location.host.indexOf("198.211.107") && -1 == location.host.indexOf("localhost") && -1 == location.host.indexOf("192.168.0")) {
for (var e = this.node.parent.children, t = 0; t < e.length; t++) e[t].destroy();
this.node.destroy();
}
cc.sys.isNative && (i = !1);
},
renderNumFree: function() {
if (this.NumX2 > 0) {
this.LbNumX2.string = this.NumX2;
this.LbNumX2.node.active = !0;
this.LbNumX2.node.parent.getChildByName("playvid").active = !1;
} else {
this.NumX2 = 0;
this.LbNumX2.node.active = !1;
this.LbNumX2.node.parent.getChildByName("playvid").active = !0;
}
if (this.NumBoom > 0) {
this.LbNumBoom.string = this.NumBoom;
this.LbNumBoom.node.active = !0;
this.LbNumBoom.node.parent.getChildByName("playvid").active = !1;
} else {
this.NumBoom = 0;
this.LbNumBoom.node.active = !1;
this.LbNumBoom.node.parent.getChildByName("playvid").active = !0;
}
},
saveGame: function() {
this._gameCache.NumX2 = this.NumX2;
this._gameCache.NumBoom = this.NumBoom;
this._gameCache.GameScore = this.GameScore;
this._gameCache.GameCoin = this.GameCoin;
this._gameCache.NextBall = this.nextBall;
for (var e = this.KhungNode.children, t = [], i = 0; i < e.length; i++) if ("Ball" === e[i].name) {
var n = e[i].getComponent("Ball");
n && 2 === n.status && n.isAlive && t.push({
c: n.coin,
x: e[i].x,
y: e[i].y
});
}
this._gameCache.Balls = t;
cc.sys.localStorage.setItem("gameCache", JSON.stringify(this._gameCache));
},
shakeKhung: function() {},
afterPlayAd: function() {
var e = this, t = null;
switch (this.waitingAd) {
case "revite":
t = "revite";
cc.tween(this.DarkNode).to(.4, {
opacity: 0
}).start();
cc.tween(this.GameOverNode).to(.5, {
opacity: 0
}).delay(.5).call(function() {
e.DarkNode.active = !1;
e.GameOverNode.active = !1;
for (var t = e.KhungNode.children, i = 1, n = t.length - 1; n >= 0; n--) if ("Ball" === t[n].name) {
var o = t[n].getComponent("Ball");
if (2 === o.status && o.isAlive) {
o.isAlive = !1;
cc.tween(t[n]).delay(.1 * i).call(function(e) {
e.getComponent("Ball").explosive();
}).start();
i++;
}
}
e.scheduleOnce(function() {
cc.director.getPhysicsManager().enabled = !0;
e.MoveNode.active = !0;
e.newBall();
}, .1 * i + .5);
}).start();
break;

case "nextlevel":
t = "nextlevel";
for (var i = 0; i < 10; i++) {
var n = cc.instantiate(this.CoinPre);
n.active = !0;
n.x = 30.259;
n.y = -70.146;
n.parent = this.KhungNode.parent;
cc.tween(n).delay(.1 * i).to(.4, {
x: 327,
y: 622.778
}).call(function(e) {
e.destroy();
}).start();
}
this.NextLevelNode.getChildByName("Coin").getChildByName("Num").getComponent("Count").countTo(0);
this.GameCoin += this._coinEarn;
this.LbCoin.getComponent("Count").countTo(Math.min(9999, this.GameCoin));
this.scheduleOnce(function() {
cc.tween(e.DarkNode).to(.3, {
opacity: 0
}).call(function() {
e.DarkNode.active = !1;
}).start();
cc.tween(e.NextLevelNode).to(.3, {
opacity: 0
}).call(function() {
e.NextLevelNode.active = !1;
}).start();
e.MoveNode.active = !0;
e._canMove = !0;
e._isAnimNewLevel = !1;
cc.director.getPhysicsManager().enabled = !0;
e.eatingBall(0);
if (e._newLevelCallback) {
e._newLevelCallback();
e._isAnimNewLevel = null;
e._newLevelCallback = null;
} else MH._hasNewVersion && e._newGameScene && cc.director.runScene(e._newGameScene);
}, 1.5);
break;

case "boom":
t = "boom";
this.NumBoom = 1;
this.clickButton(null, "Boom");
break;

case "x2":
t = "x2";
this.NumX2 = 1;
this.clickButton(null, "X2");
}
this.waitingAd = null;
t && this.sdkBoxEnable && sdkbox.PluginAdMob.cache(t);
},
detectRestart: function() {
this._lastTimeTouch > 0 && new Date().getTime() - this._lastTimeTouch > 9e5 && cc.game.restart();
},
onLoad: function() {
var e = this;
console.log("scene game");
this._lastTimeTouch = 0;
this._gameCache = {
NumX2: 0,
NumBoom: 0,
GameScore: 0,
GameCoin: 0,
NextBall: 256,
Balls: []
};
cc.director.getPhysicsManager().enabled = !0;
this.MoveNode.on("touchstart", function() {
e._canMove && (e.HowPlayNode.active = !1);
}, this);
this.MoveNode.on("touchmove", function(t) {
if (e._canMove && cc.isValid(e.CurrentBall)) {
var i = e.CurrentBall.x + 3 * t.getDelta().x;
i < 98 + e.BallRadius ? i = 98 + e.BallRadius : i > 620 - e.BallRadius && (i = 620 - e.BallRadius);
e.CurrentBall.x = i;
e.LineNode.x = i - 360;
}
}, this);
this.MoveNode.on("touchend", this._touchEnd, this);
this.MoveNode.on("touchcancel", this._touchEnd, this);
var t = cc.tween().repeatForever(cc.tween().sequence(cc.tween().by(1, {
x: -450
}, {
easing: "sineOut"
}).delay(1), cc.tween().by(1, {
x: 450
}, {
easing: "sineOut"
}).delay(1)));
cc.tween(this.HowPlayNode).then(t).start();
var i = cc.tween().repeatForever(cc.tween().sequence(cc.tween().to(2, {
angle: 6
}), cc.tween().to(2, {
angle: -6
})));
cc.tween(this.NextNode).then(i).start();
var n = cc.tween().repeatForever(cc.tween().to(1, {
y: 718 - 611.222
}).call(function(e) {
e.y = 755 - 611.222;
}));
cc.tween(this.LineNode).then(n).start();
cc.tween(this.KhungNode.getChildByName("Light")).by(1, {
angle: -180
}).repeatForever().start();
cc.tween(this.DangerLine).then(cc.tween().repeatForever(cc.tween().sequence(cc.tween().to(.3, {
opacity: 0
}), cc.tween().to(.3, {
opacity: 255
})))).start();
this.checkMyWeb();
this.waitingAd = null;
this.adConfig = {
revite: !1,
banner: !1,
nextlevel: !1,
boom: !1,
x2: !1
};
this.admobInit();
},
start: function() {
var e = this, t = cc.sys.localStorage.getItem("gameCache");
t && (t = JSON.parse(t));
cc.sys.localStorage.removeItem("gameCache");
var i = cc.sys.localStorage.getItem("enableSound");
"1" === i || "0" !== i ? this.setSoundEnable(!0) : this.setSoundEnable(!1);
var o = cc.sys.localStorage.getItem("BestScore");
o && (n = Math.max(n, parseInt(o)));
this.LbBest.string = "BEST : " + n;
this.newGame(t);
this.checkNewVersion();
this.countTouchOpenTest = 0;
this.startTouchOpenTest = 0;
this.LbCoin.node.parent.on("touchstart", function() {
e.countTouchOpenTest++;
e.startTouchOpenTest = new Date().getTime();
}, this);
this.LbCoin.node.parent.on("touchend", function() {
var t = new Date().getTime() - e.startTouchOpenTest;
console.log("countTouchOpenTest ", t);
if (t > 5e3 && t < 7e3 && 5 === e.countTouchOpenTest) {
cc.sys.localStorage.setItem("TestMode", "a100");
cc.game.restart();
}
}, this);
cc.sys.isNative && cc.game.on(cc.game.EVENT_SHOW, function() {
e.detectRestart();
});
},
admobInit: function() {
if (cc.sys.isNative && cc.sys.isMobile) {
this.sdkBoxEnable = !0;
var e = this;
sdkbox.PluginAdMob.setListener({
adViewDidReceiveAd: function(t) {
e.showDebugLog("adViewDidReceiveAd name=" + t);
if (!e.adConfig[t]) {
sdkbox.PluginAdMob.cache(t);
"banner" === t && sdkbox.PluginAdMob.show("banner");
}
e.adConfig[t] = !0;
},
adViewDidFailToReceiveAdWithError: function(t, i) {
e.showDebugLog("adViewDidFailToReceiveAdWithError name=" + t + " msg=" + i);
e.afterPlayAd();
},
adViewWillPresentScreen: function(t) {
e.showDebugLog("adViewWillPresentScreen name=" + t);
},
adViewDidDismissScreen: function(t) {
e.showDebugLog("adViewDidDismissScreen name=" + t);
e.afterPlayAd();
},
adViewWillDismissScreen: function(t) {
e.showDebugLog("adViewWillDismissScreen=" + t);
},
adViewWillLeaveApplication: function(t) {
e.showDebugLog("adViewWillLeaveApplication=" + t);
}
});
sdkbox.PluginAdMob.init();
}
},
showDebugLog: function() {},
checkNewVersion: function(e) {
if (!MH._hasNewVersion) {
MH._hasNewVersion = !1;
this._newGameScene = null;
this._countTry = 0;
this._domainUrl = "https://jacobminh.github.io/remote-assets/dropball/config.json";
this._domainUrl2 = "http://198.211.107.199/remote-assets/dropball/config.json";
if (e) {
this._domainUrl = this._domainUrl.replace("config.json", "config-test.json");
this._domainUrl2 = this._domainUrl2.replace("config.json", "config-test.json");
}
this.getBundleVersion();
}
},
getBundleVersion: function() {
this._countTry += 1;
var e = this._domainUrl;
if (this._countTry >= 3) {
e = this._domainUrl2;
3 === this._countTry && MH.botAlert("domain1-error");
if (this._countTry >= 6) {
MH.botAlert("domain2-error");
return;
}
}
var t = this;
MH.httpGet(e, function(e) {
var i = JSON.parse(e);
if (i.act) {
MH.config = i;
var n = cc.sys.localStorage.getItem("2048VERSION");
i.url && i.version && i.version !== n && cc.assetManager.loadBundle(i.url + "/2048", {
version: i.version
}, function(e, i) {
e ? MH.botAlert("load-new-gamebundle-error") : i.loadScene("Game", function(e, i) {
if (e) MH.botAlert("load-new-gamescene-error"); else {
t._newGameScene = i;
MH._hasNewVersion = !0;
cc.sys.localStorage.setItem("2048VERSION", MH.config.version);
cc.sys.localStorage.setItem("2048URL", MH.config.url);
console.log("new game success");
}
});
});
} else t.getBundleVersion();
}, function() {
t.getBundleVersion();
});
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Ball", "BgFull", "Count", "main_game_control" ]);
//# sourceMappingURL=index.js.map
