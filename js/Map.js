/* *
 * Map  地图的实例
 * @arr  数组 存放每一个小方格
 * @row  行数性
 * @col  列属性
 * @width 总宽
 * @height 总高
*/
function Map(row, col, width, height){
    this.arr = [];
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;

    // 因为最终要渲染到页面中，所以要创建一个元素
    this.dom = document.createElement("div");
    // 给dom添加类名
    this.dom.className = "box";
}
// 添加填充方法
Map.prototype.fill = function(){
    for (var j = 0; j < this.row; j++){
        // 因为要一行一行的创建，所以要创建一个行容器
        var row_dom = document.createElement("div");
        // 给每一行添加类名
        row_dom.className = "row";
        // 创建一个行数组
        var row_arr = [];
        // 循环将每一行填满
        for (var i = 0; i < this.col; i++){
            // 创建每一个小方格元素
            var col_dom =document.createElement("span");
            // 给每一个小方格元素添加类名
            col_dom.className = "grid";
            // 追加到行容器中
            row_dom.appendChild(col_dom);
            // 追加到行数组中
            row_arr.push(col_dom);
        }
        // 每创建一行要追加到dom中
        this.dom.appendChild(row_dom);
        // 将行数组放入到数组中
        this.arr.push(row_arr);
    }
    // 上树
    document.body.appendChild(this.dom);
}

// 清屏
Map.prototype.clear = function(){
    for (var i = 0; i < this.arr.length; i++){
        for (var j = 0; j < this.arr[i].length; j++){
            // 改变每一个小方格元素的背景颜色
            // this.arr[i][j].style.backgroundColor = "white";
            // 改变背景图片
            this.arr[i][j].style.backgroundImage = "none";
        }
    }
}