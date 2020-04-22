function Menu(menu_btn){
    this.start_btn = menu_btn.start_btn;
    this.over_btn = menu_btn.over_btn;
    this.num = menu_btn.num;
    // console.log(this.num);
}

// 
Menu.prototype.score = function(){
    console.log(this.num.html());
}
