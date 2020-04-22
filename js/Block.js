function Block(img){
    // 数组属性  数组中存放每一个障碍物元素
    this.arr =[
        {row: 8, col:8},
        {row: 8, col:9},
        {row: 8, col:10},
        {row: 9, col:10},
        {row: 10, col:10},
        {row: 11, col:10},
        {row: 12, col:10},
        {row: 13, col:10},
    ];
    this.img = img;
}