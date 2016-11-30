(function(){
	//背景类
	var Background = window.Background = function(image,w,y,speed){
		//自己的图片
		this.image = image;
		//自己的宽度
		this.w = w;
		//自己的x位置
		this.x = 0;
		this.y = y;
		//速度
		this.speed = speed;
		//把自己注册
		g.actors.push(this);
	}
	//更新方法，这个函数每帧执行
	Background.prototype.update = function(){
		//移动
		this.x-= this.speed;
		//当拉动到了猫腻的位置，瞬移过来，制作成无缝连续滚动的效果
		if(this.x < -this.w){
			this.x = 0;
		}
	}
	//渲染方法，这个函数每帧执行
	Background.prototype.render = function(){
		//画图
		g.ctx.drawImage(this.image , this.x, this.y);
		//画猫腻
		g.ctx.drawImage(this.image , this.x + this.w, this.y);
		//画猫腻
		g.ctx.drawImage(this.image , this.x + this.w * 2, this.y);
	}
})();