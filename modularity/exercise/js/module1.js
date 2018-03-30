// module1.js
function output(a){
    console.log('from module' + String(a));
}
output(1);
module.exports = output;