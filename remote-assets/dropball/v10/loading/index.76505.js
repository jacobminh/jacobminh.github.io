window.__require = function e(n, r, i) {
function o(t, c) {
if (!r[t]) {
if (!n[t]) {
var s = t.split("/");
s = s[s.length - 1];
if (!n[s]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(s, !0);
if (a) return a(s, !0);
throw new Error("Cannot find module '" + t + "'");
}
t = s;
}
var u = r[t] = {
exports: {}
};
n[t][0].call(u.exports, function(e) {
return o(n[t][1][e] || e);
}, u, u.exports, e, n, r, i);
}
return r[t].exports;
}
for (var a = "function" == typeof __require && __require, t = 0; t < i.length; t++) o(i[t]);
return o;
}({
Loading: [ function(e, n) {
"use strict";
cc._RF.push(n, "a62796eGilLfbOPYrNW8Cf/", "Loading");
cc.Class({
extends: cc.Component,
properties: {
progressBar: cc.ProgressBar
},
loadMainScene: function() {
MH.config && MH.config.url ? cc.assetManager.loadBundle(MH.config.url + "/2048", {
version: MH.config.versiongame
}, this.loadBundleProcess.bind(this), this.loadBundleCallback.bind(this)) : cc.assetManager.loadBundle("game", this.loadBundleCallback.bind(this));
},
loadBundleProcess: function(e, n) {
this.progressBar.progress = e / n;
},
loadBundleCallback: function(e, n) {
if (e) this.loadMainScene(); else {
var r = this;
n.loadScene("Game", function(e, n) {
e ? r.loadMainScene() : cc.director.runScene(n);
});
}
},
start: function() {
this.loadMainScene();
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Loading" ]);