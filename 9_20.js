/*9.20.1*/
//1
var pattern = /ca(?:r|t)/;
//2
var pattern = /pr?op/;
//3
var pattern = /ferr[et|y|ari]/;
//4
var pattern = /\b[a-z]+(?:ious)\b/;
//5
var pattern = /\s(?:\.|:|;)/;
//6
var pattern = /\b[a-z]{7,}\b/i;
//7
var pattern = /\b[A-DF-Z]+\b/i;
/*9.20.2*/
var pattern = /(?<![a-z])\'/i;
function replace(str){
    str.replace(pattern,'\"');
    return str;
}
/*9.20.3*/
var pattern = /\b[+-]?\d*\.?\d*[e[+-]?\d+|]|[+-]?\d*\.?\d*[e[+-]?\d+|]\b/i;
