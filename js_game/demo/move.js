var o = new Orienter();
o.onOrient = function (obj) {
var a, b;

a = obj.lon < 180 ? obj.lon : obj.lon - 360;
b = obj.lat;

a = a > 0 ? a > 50 ? 50 : a : a < -50 ? -50 : a;
b = b > 0 ? b > 50 ? 50 : b : b < -50 ? -50 : b;

$(".img").css("-webkit-transform", "translate3d(" + a + "px," + b + "px,0)");

};
o.init();
