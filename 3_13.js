/*3.13.1
三元运算符*/
function min(a,b){
    return a > b ? b : a;
} 
/*3.13.2
注意每种分支都要有返回值，否则会中断*/
function isEven(a){
    if(a < 0){
        var a = Number(prompt('请重新输入一个有效的正整数:'));
        return isEven(a);
    }
    else if(a == 0)
        return true;
    else if(a == 1)
        return false;
    else{
        return isEven(a -= 2);
    }
}
/*3.13.3
注意类型判断的细节*/
function countBs(a){
    if(typeof a != 'string'){
        var a = prompt('请重新输入一个有效的字符串:');
        return countBs(a);
    }
    else{
        var j = 0;
        for(var i = 0;i < a.length;i++){
            if(a[i] == 'B')
                j++;
        }
        return j;
    }
}
function countChar(a,b){
    if(typeof b != 'string' || typeof a != 'string'){
        var a = prompt('请重新输入一个有效的字符串:');
        var b = prompt('请重新输入一个有效的字符串:');
        return countChar(a,b);
    }
    else{
        var j = 0;
        for(var i = 0;i < a.length;i++){
            if(a[i] == b)
                j++;
        }
        return j;
    }
}