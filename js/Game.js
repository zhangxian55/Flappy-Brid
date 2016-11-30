(function(){
	//游戏类
	var Game = window.Game = function(){
		//游戏画布
		this.canvas = document.getElementById("canvas");
		//上下文
		this.ctx = this.canvas.getContext("2d");
		//帧编号
		this.f = 0;
		//游戏分数
		this.score = 0;
		//演员清单
		this.actors = [];
		//场景编号
		this.scene = 0; //0开始场景， 1游戏中，2死亡动画 
		//图片资源列表
		this.Rlist = {
			"bg_day" : "images/bg_day.png",
			"bg_night" : "images/bg_night.png",
			"land" : "images/land.png",
			"pipe_down" : "images/pipe_down.png",
			"pipe_up" : "images/pipe_up.png",
			"bird0_0" : "images/bird0_0.png",
			"bird0_1" : "images/bird0_1.png",
			"bird0_2" : "images/bird0_2.png",
			"shuzi0" : "images/font_048.png",
			"shuzi1" : "images/font_049.png",
			"shuzi2" : "images/font_050.png",
			"shuzi3" : "images/font_051.png",
			"shuzi4" : "images/font_052.png",
			"shuzi5" : "images/font_053.png",
			"shuzi6" : "images/font_054.png",
			"shuzi7" : "images/font_055.png",
			"shuzi8" : "images/font_056.png",
			"shuzi9" : "images/font_057.png",
			"logo" : "images/title.png",
			"button_play" : "images/button_play.png",
			"tutorial" : "images/tutorial.png"
		}
		//图片资源对象
		this.R = {};
		//图片总数,underscore中的size方法，能够快速得到JSON中的键的个数
		var amount = _.size(this.Rlist);
		//图片计数器
		var count = 0;
		//备份this
		var self = this;
		//读取图片资源
		for(var k in this.Rlist){
			//设置一个新图片
			this.R[k] = new Image();
			//让图片的src设置为遍历的这个对象此时k的v：
			this.R[k].src = this.Rlist[k];
			//监听这个图片的load事件
			this.R[k].onload = function(){
				count++;
				//清屏
				self.ctx.clearRect(0, 0, self.canvas.width,self.canvas.height);
				//打印提示文字
				self.ctx.fillText("正在读取图片" + count + "/" + amount + "...",100,100);
				//如果读取完毕的图片个数等于总数，表示所有图片都已经load
				if(count == amount){
					self.start();
				}
			}
		}
		//监听
		this.bindEvent();
	}
	//开始游戏
	Game.prototype.start = function(){
		//==============================
		//            注册演员
		//==============================
		//天空，天空是背景类的实例
		this.tiankong = new Background(this.R.bg_day,288,0,1);
		//大地，大地也是背景类的实例
		this.dadi = new Background(this.R.land,336,400,2);
		//鸟
		this.bird = new Bird();
		//logo
		this.logo = new Logo();
		//按钮
		this.button_play = new Button_play();
		//提示
		this.tutorial = new Tutorial();
		//备份this
		var self = this;
		//游戏的唯一主循环
		setInterval(function(){
			//清屏
			self.ctx.clearRect(0, 0, self.canvas.width,self.canvas.height);
			//帧编号++
			self.f ++;
			//根据场景决定做什么事情
			switch(self.scene){
				case 0 :
					//渲染天空和大地
					self.tiankong.render();
					self.dadi.render();
					//渲染logo
					self.logo.render();
					//渲染按钮
					self.button_play.render();
					//提示
					self.tutorial.render();
					break;
				case 1 :
					//更新
					//每100帧new管子
					self.f % 90 == 0 && new Pipe();
					//渲染所有演员
					_.each(self.actors,function(actor){
						actor.update();
						actor.render();
					});
					//打印分数
					//得到分数的位数
					var fenshuweishu = self.score.toString().length;
					//遍历每一位，渲染每一位的数字
					for(var i = 0 ; i < fenshuweishu ; i++){
						//得到这一位的数字
						var shu = self.score.toString().charAt(i);
						//渲染图片
						self.ctx.drawImage(self.R["shuzi" + shu],160 - fenshuweishu / 2 * 30 + 30 * i,80);
					}
					break;
				case 2 :
					//鸟仍在更新
					self.bird.update();
					//死亡场景
					_.each(self.actors,function(actor){
						actor.render();
					});
					break;
			}
			
			//打印帧编号
			self.ctx.font = "14px 微软雅黑";  //字号
			self.ctx.fillText("帧编号" + self.f,0,20);
			
			  
		},20);
	}
	//杀演员
	Game.prototype.kill = function(actor){
		this.actors = _.without(this.actors,actor);
	}
	//绑定监听
	Game.prototype.bindEvent = function(){
		//备份this
		var self = this;
		//绑定鼠标按下事件监听
		this.canvas.addEventListener("touchstart",function(event){
			event.preventDefault();
			var finger = event.touches[0];
			if(self.scene == 0){
				//看看点击了按钮
				if(finger.clientX > self.button_play.x && finger.clientX < self.button_play.x + 116){
					if(finger.clientY > self.button_play.y && finger.clientY < self.button_play.y + 70){
						//进入场景1 
						self.scene = 1;
					}
				}
			}else if(self.scene == 1){
				self.bird.giveEnergy();
			}
		},true);
	}
})();