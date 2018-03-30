// module1.js
console.log(1);
function obj(){};
obj.prototype.output = function(){
    console.log('Hello');
}
console.log(3);
var object1 = {'output':obj};
module.exports = object1;