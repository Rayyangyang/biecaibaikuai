// 点击开始游戏
// 用计时器不停的生成一排div
// 随机在生成的div中加上背景颜色，并且被标记
// 当点击到被标记的div时div的背景颜色改变，num ++
// 当div的走出wrapper时 清除节点
// 当被标记的div未被点击时并且超出wrapper时，弹出框，并加上所得分数
init()
var num = 0;
var flag = true;
var timer;
// var over = document.getElementsByClassName('over')[0];
// var score = document.getElementsByClassName('score')[0];
function init(){
    bindEvent();
    clickDom()
}
function bindEvent(){
    $('.start').on('click', function(){
        console.log(11);
        $('.start').css('display','none');
        // clearInterval(timer);
        // var timer = setInterval(function(){
        //     createDom()
        // },1000)
        createDom()
        move($('.box'))
    })
}
function createDom(){
    var colors = ['orange', 'green', 'blue', 'red']    
    var index = parseInt(Math.random() * 4)
    // console.log(index)
    var row = $('<div class="row"></row>')
    for(var i = 0; i < 4; i ++){
        var div = $('<div></div>');
        $(row).append(div);
    }
    var clickDiv = $(row).children()[index];
    $(clickDiv).css('background', colors[index])
    $('.box').prepend(row);
    $(clickDiv).attr('class', 'i');

}
function move(dom){
    console.log(dom.css('top'));
    var speed = 10;
    clearInterval(timer);
    timer = setInterval(function(){
        var step = parseInt(dom.css('top')) + speed;
        dom.css('top', step + 'px');
        if(parseInt(dom.css('top')) >= 0){
            createDom();
            dom.css('top', '-121px')
        }
        var len = dom.children().length;
        console.log(len);
        if(len == 6){
            for(var i = 0 ;i < 4; i ++){
                console.log(dom.children()[len - 1].children[i].className);
                if(dom.children()[len - 1].children[i].className == 'i'){
                    gameOver();
                    clearInterval(timer);
                }
            }
            $(dom.children()[len-1]).remove()
        }
    },100)
    clickDom()
}
function clickDom(){
    if(flag){
        $('.box').on('click', function(e){
            // console.log(e.target);
            if(e.target.className == 'i'){
                e.target.style.backgroundColor = '#bbb';
                e.target.className = '';
                num ++;
            }else{
                $('.box').css('top', '0px');
                // alert('游戏结束 得分:'+ num );
                flag = false;
                clearInterval(timer);
                gameOver();
            }
        })
    }   
}
function gameOver(){
    $('.over').css('display', 'block');
    $('.score').html(num);
    // clearInterval(timer);
}
$('button').on('click', replay)
function replay(){
    $('.over').css('display', 'none');
    num = 0;
    $('.box').html('');
    
    console.log(10100);
    createDom();
    move($('.box'));
}
