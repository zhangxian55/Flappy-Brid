var Logo = window.Logo = function(){
	this.image = g.R.logo;
	//自己的小帧
	this.f = 0;
	this.x = 71;
	this.y = 0;
}
Logo.prototype.render = function(){
	this.f++;
	//移动
	this.y +=10;
	if(this.y >= 100){
		this.y = 100;
	}
	g.ctx.drawImage(this.image , this.x , this.y);
}
 

//按钮类
var Button_play = window.Button_play = function(){
	this.image = g.R.button_play;
	this.x = 102;
	this.y = 360;

}
Button_play.prototype.render = function(){
	g.ctx.drawImage(this.image , this.x , this.y);
}


//提示类
var Tutorial = window.Tutorial = function(){
	this.image = g.R.tutorial;
	this.x = 102;
	this.y = 210;
	//透明度
	this.alpha = 1;
	//透明度增量
	this.dalpha = -0.1;
}
Tutorial.prototype.render = function(){
	//闪烁
	//透明度
	this.alpha += this.dalpha;
	//调整增量
	if(this.alpha < 0){
		this.dalpha = 0.1;
	}else if(this.alpha > 1){
		this.dalpha = -0.1;
	}

	//透明度
	g.ctx.save();
	g.ctx.globalAlpha = this.alpha;
	g.ctx.drawImage(this.image , this.x , this.y);
	g.ctx.restore();
}