function Snake(pic_obj){
    // 数组属性 存放蛇的每一节身体
    this.arr = [
        {row: 4, col: 4},
        {row: 4, col: 5},
        {row: 4, col: 6},
        {row: 4, col: 7},
        {row: 4, col: 8},
    ];
    // 方向属性
    this.direction = 39;  // left 37   top 38   right 39   down 40
    // 定义锁  蛇向右移动时，同时按下上或下和左两个键，蛇会缩短一下，然后向左移动
    // 初始化锁为true
    //当按下方向键时，如果锁为false，则不执行
    // 如果锁为true,当按下方向键时，执行改变锁为false，执行方向改变，并在移动后将锁改为true
    this.lock = true;

    // 定义蛇的头部图片
    this.head_pic = pic_obj.head_pic;
    // 定义蛇的身体图片
    this.body_pic = pic_obj.body_pic;
    // 定义蛇的尾部图片
    this.tail_pic = pic_obj.tail_pic;
    // 定义头部索引
    this.head_idx = 2;   // 默认向右，索引值为2
    // 定义尾部索引
    this.tail_idx = 0;   // 默认向左，索引值为0
}

// 添加移动方法
Snake.prototype.move = function(){
    // 创建新的头部
    var newHead = {
        row: this.arr[this.arr.length - 1].row,
        col: this.arr[this.arr.length - 1].col
    }
    // 判断蛇的移动方向
    if (this.direction === 37){
        // 表示向左，新的头部应该出现在老的头部左边，行不变，列--
        newHead.col--;
    } else if (this.direction === 38){
        // 表示向上，新的头部应该出现在老的头部上边，列不变，行--
        newHead.row--;
    } else if (this.direction === 39){
        // 表示向右，新的头部应该出现在老的头部右边，行不变，列++
        newHead.col++;
    } else if (this.direction === 40){
        // 表示向下，新的头部应该出现在老的头部下方，列不变，行++
        newHead.row++;
    }
    // 将新的头部添加
    this.arr.push(newHead);
    // 去掉尾部
    this.arr.shift();
    //开锁
    this.lock = true;

    // 在移动的时候改变尾部图片
    // 获取蛇的尾部
    var tail = this.arr[0];
    // 获取尾部的上一个
    var pp = this.arr[1];
    // 判断尾巴与其上一个之间的关系
    if (tail.row === pp.row){
        // 此时说明在同一行，需要对列进行比较
        // if (tail.col > pp.col){
        //     this.tail_idx = 2;
        // }
        // 使用三元运算符
        this.tail_idx = tail.col > pp.col ? 2 : 0;
    } else {
        // 说明在同一列，应该对行进行比较
        this.tail_idx = tail.row > pp.row ? 3 : 1;
    }
}

// 转向方法
Snake.prototype.change = function(direction){
    if (!this.lock){
        return;
    }
    // 关闭锁
    this.lock = false;
    // 当用户按下的是与蛇相同或相反的方向的时候，此时蛇不应该有任何操作
    // 绝对值  37-37=0  37-39=-2  38-40=-2
    var result = Math.abs(direction - this.direction);   
    if (result === 0 || result === 2){
        // 此时什么也不做
        return;
    } else {
        // 说明用户传入的值是合法的，就设置
        this.direction = direction;
    }

    // 在转向的时候改变头部图片
    if (direction === 37){
        this.head_idx = 0;
    } else if (direction === 38){
        this.head_idx = 1;
    } else if (direction === 39){
        this.head_idx = 2;
    } else if (direction === 40){
        this.head_idx = 3;
    }
}

// 蛇长长的方法
Snake.prototype.growUp = function(){
    // 获取蛇的尾部
    var tail = this.arr[0];
    // 添加到蛇的头部
    this.arr.unshift(tail);
    // console.log(this.arr);
}