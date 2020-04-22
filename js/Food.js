function Food(x, y, img){
    this.row = x;
    this.col = y;
    this.img = img;
}

// 重置食物
Food.prototype.reset = function(x, y){
    this.row = x;
    this.col = y;
}