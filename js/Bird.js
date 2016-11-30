(function(){
	var Bird = window.Bird = function(){
		//自己的图片数组
		this.images = [g.R.bird0_0 , g.R.bird0_1 , g.R.bird0_2];
		//自己的翅膀动作0、1、2
		this.wing = 0;
		//自己的位置
		this.x = 100;
		this.y = 100;
		//角度
		this.degree = 0;
		//内部帧编号，注意我们要保证状态变化此时f从0重新计算
		this.f = 0;
		//状态
		this.state = "A";	//A掉 B升
		//放入演员列表
		g.actors.push(this);
	}
	Bird.prototype.update = function(){
		//内部帧编号加1
		this.f ++;
		//死亡场景的update我们先写，因为特殊
		if(g.scene == 2){
			this.degree = 90;
			this.y += 14;
			if(this.y >= 368){
				this.y = 368;
			}
			return;
		}
		//每3帧蒲扇一次翅膀
		g.f % 3 == 0 && this.wing++;
		if(this.wing > 2){
			this.wing = 0;
		}
		
		if(this.state == "A"){
			//小鸟下落
			this.y += this.f * this.f / 25;
			//鸟头的方向
			this.degree = this.f * 2.4;
			//撞底面
			if(this.y > 368){
				g.scene = 2;
			}
		}else if(this.state == "B"){
			//小鸟上升，升20帧
			this.y -= (20- this.f) * (20 - this.f) / 20;
			//鸟头的方向
			this.degree = -(20 - this.f) * 3.4;
			//上升只有20帧，我们20帧之后就要变为A状态，就是下落
			if(this.f > 20){
				this.state = "A";
				this.f = 0;
			}
		}

		//自己的ABCD盒
		this.Ax = this.x + 7;
		this.Ay = this.y + 10;
		this.Bx = this.x + 41;
		this.By = this.y + 10;
		this.Cx = this.x + 7;
		this.Cy = this.y + 40;
		this.Dx = this.x + 41;
		this.Dy = this.y + 40;
	}
	Bird.prototype.render = function(){
		//画出自己的ABCD盒
		//g.ctx.fillRect(this.Ax, this.Ay, 34, 30);
		//旋转几步走
		//保存上下文
		g.ctx.save();
		//移动坐标系到小鸟的中心
		g.ctx.translate(this.x + 24 , this.y + 24);
		//旋转坐标系
		g.ctx.rotate(this.degree * 3.14 / 180);
		//绘制小鸟，注意它的位置是-24，-24，为啥，自己看14号案例
		g.ctx.drawImage(this.images[this.wing],-24,-24);
		//恢复上下文
		g.ctx.restore();
		//绘制自己的状态和帧编号
		g.ctx.fillText(this.state + "," + this.f ,this.x ,this.y);

	}
	//给他能量，上升！
	Bird.prototype.giveEnergy = function(){
		this.state = "B";	//上升
		this.f = 0;  //小计数器设置为0
	}
})();