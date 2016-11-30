(function(){
	//管子类
	var Pipe = window.Pipe = function(){
		//x位置
		this.x = 320;
		//高度，注意这个h表示上面的管子的高度，下面管子的高度是250-h，请见图示
		this.h = _.random(50,220);
		//是否已经过鸟
		this.guoniao = false;
		//自己是否已经加过分了
		this.alreadyJiafen = false;
		//加入演员
		g.actors.push(this);
	}
	//更新
	Pipe.prototype.update = function(){
		this.x -= 2;
		//检查管子有没有撞鸟，碰撞检测！
		if(this.guoniao == false){
			if((g.bird.Dx > this.x && g.bird.Dy > this.h+150) || (g.bird.Bx > this.x && g.bird.By < this.h)){
				// console.log("撞击");
				g.scene = 2;
			}
		}
		

		//检查自己有没有过鸟
		if(this.x + 52 < g.bird.Ax){
			//让自己的过鸟变为true
			this.guoniao = true;
			//分数加分
			this.alreadyJiafen == false && g.score++;
			//加分标记
			this.alreadyJiafen = true;
		}
	}
	//渲染
	Pipe.prototype.render = function(){
		//检测自己的x是不是已经出屏幕了，如果出去了，就自杀
		if(this.x < -52){
			g.kill(this);
			return;
		}
		//绘制两个管子
		g.ctx.drawImage(g.R.pipe_down,0,320-this.h,52,this.h,this.x,0,52,this.h);
		g.ctx.drawImage(g.R.pipe_up,0,0,52,250-this.h,this.x,this.h+150,52,250-this.h);

		//打印过鸟标记
		g.ctx.fillText(this.guoniao,this.x , 200);
	}
})();