/*2.20.1
注意console.log自动换行*/
var j = 0;
while(j++ < 7){
    var str = '';
    for(var i = 1;i <= j;i++){
        str += '#';
    }
    console.log(str);
}
/*2.20.2
注意集合关系*/
var i = 0;
while(i++ < 100){
    if(!(i % 3) && !(i % 5))
        console.log('FizzBuzz');
    else if(!(i % 3))
        console.log('Fizz');
    else if(!(i % 5))
        console.log('Buzz');
    else
        console.log(i);
}
/*2.20.3
注意循环归0*/
do{
    var i = Number(prompt('请输入有效的网格长度：'));
    var j = Number(prompt('请输入有效的网格宽度：'));
}while(isNaN(i) || isNaN(j));
var m = 0;//m长度，n宽度
while(m++ < j){
    var str = '';
    var n = 0;
    while(n++ < i){
        if(n % 2 == m % 2)//两个偶数或两个奇数
            str += '#';
        else if(n % 2 != m % 2)//长偶宽奇或长奇宽偶
            str += ' ';
    }
    console.log(str);
}