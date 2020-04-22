// 获取视口的宽
var width = document.documentElement.clientWidth;
// 获取视口的高
var height = document.documentElement.clientHeight;
// 获取 canvas
var canvas = document.getElementById("myCanvas");
// 获取画笔
var ctx = canvas.getContext("2d");
// 赋值 canvas的宽
canvas.width = width;
// 赋值 canvas的高
canvas.height = height;
// 改变填充色
ctx.fillStyle = "white";
// 改变线条颜色
ctx.strokeStyle = "rgba(255, 255, 123, .4)";
// 改变线宽
ctx.lineWidth = ".3";

// 定义 Star 类
function Star(ctx, x, y, r){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    // parseInt(Math.random() * 3) + 1  === 1, 2, 3
    // parseInt(Math.random() * 10) + 1 === 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    // Math.pow(-1, 1~10)   -1 的 1~10 次幂
    this.x_speed = (parseInt(Math.random() * 3) + 1) * Math.pow(-1, parseInt(Math.random() * 10) + 1) / 5;
    this.y_speed = (parseInt(Math.random() * 3) + 1) * Math.pow(-1, parseInt(Math.random() * 10) + 1) / 5;
}

// 方法要写在原型上
// 移动方法
Star.prototype.move = function(){
    this.x -= this.x_speed;
    this.y -= this.y_speed;
}

// 转向 x 方法
Star.prototype.changeX = function(){
    this.x_speed = - this.x_speed;
}

// 转向 y 方法
Star.prototype.changeY = function(){
    this.y_speed = - this.y_speed;
}

// 渲染方法
Star.prototype.render = function(){
    // 开启路径
    this.ctx.beginPath();
    // 绘制圆
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    // 闭合路径
    this.ctx.closePath();
    // 填充
    this.ctx.fill();
}

// 定义数组 用于存放每一个星星对象
var arr = [];
// 初始化星星对象
// var star = new Star(ctx, parseInt(Math.random() * width), parseInt(Math.random() * height), 2);
// star.render();

// 创建 150 个星星
for (var i = 0; i < 150; i++){
    arr.push(new Star(ctx, parseInt(Math.random() * width), parseInt(Math.random() * height), 1));
}

// 创建鼠标星星对象
var mouse_star = new Star(ctx, 0, 0, 1);
document.onmousemove = function(e){
    // 获取鼠标的位置
    var x = e.clientX;
    var y = e.clientY;
    // 赋值 mouse_star 对象中的 x 和 y 值
    mouse_star.x = x;
    mouse_star.y = y;
}

// 开启定时器
var timer = setInterval(function(){
    // 清屏
    ctx.clearRect(0, 0, width, height);

    // 渲染鼠标星星
    mouse_star.render();

    // 渲染每一个星星
    arr.forEach(function(value, index){
        // 移动
        value.move();
        // 判断边界
        if (value.x < 0 || value.x > width){
            value.changeX();
        }
        if (value.y < 0 || value.y > height){
            value.changeY();
        }
        // 渲染
        value.render();
    });

    // 循环判断
    arr.forEach(function(value, index){
        // value 表示每一个星星，我们应该拿着这个星星与其它所有星星作比较
        for (var i = index + 1; i < arr.length; i++){
            // Math.abs(value.x - arr[i].x)  绝对值
            if (Math.abs(value.x - arr[i].x) < 50 && Math.abs(value.y - arr[i].y) < 50){
                // 连线
                line(value.x, value.y, arr[i].x, arr[i].y);
            }
        }

        // 判断鼠标星星与其他所有星星之间的关系
        if (Math.abs(value.x - mouse_star.x) < 150 && Math.abs(value.y - mouse_star.y) < 150){
            // 连线
            line(value.x, value.y, mouse_star.x, mouse_star.y);
        }
    });
}, 20);

// 给 document 添加点击事件
// 当点击的时候出现 5 个星星
document.onmousedown = function(e){
    for (var i = 0; i < 5; i++){
        arr.push(new Star(ctx, e.clientX, e.clientY, 1));
        // 同时去除数组头部的星星
        arr.shift();
    }
}

// 封装函数，传递两个点，绘制两个点之间的线段
function line(x1, y1, x2, y2){
    // 开启路径
    ctx.beginPath();
    // 移动画笔到某个位置
    ctx.moveTo(x1, y1);
    // 绘制路径
    ctx.lineTo(x2, y2);
    // 关闭路径
    ctx.closePath();
    // 描边
    ctx. stroke();
}