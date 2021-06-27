window.__require = function n(e, i, r) {
function o(a, c) {
if (!i[a]) {
if (!e[a]) {
var l = a.split("/");
l = l[l.length - 1];
if (!e[l]) {
var u = "function" == typeof __require && __require;
if (!c && u) return u(l, !0);
if (t) return t(l, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = l;
}
var s = i[a] = {
exports: {}
};
e[a][0].call(s.exports, function(n) {
return o(e[a][1][n] || n);
}, s, s.exports, n, e, i, r);
}
return i[a].exports;
}
for (var t = "function" == typeof __require && __require, a = 0; a < r.length; a++) o(r[a]);
return o;
}({
Loading: [ function(n, e) {
"use strict";
cc._RF.push(e, "a62796eGilLfbOPYrNW8Cf/", "Loading");
cc.Class({
extends: cc.Component,
properties: {},
loadMainScene: function() {
MH.config && MH.config.url ? cc.assetManager.loadBundle(MH.config.url + "/2048", {
version: MH.config.versiongame
}, this.loadBundleCallback.bind(this)) : cc.assetManager.loadBundle("2048", this.loadBundleCallback.bind(this));
},
loadBundleCallback: function(n, e) {
if (n) this.loadMainScene(); else {
var i = this;
e.loadScene("Game", function(n, e) {
n ? i.loadMainScene() : cc.director.runScene(e);
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