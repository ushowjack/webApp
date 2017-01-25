/* 雷达图组件对象*/

// 基于H5ComponentBase组件，传入参数，获得一个类名为h5_component_polyline的
// jQuery对象。最后通过设置Radar组件独有的动画和数据显示，然后再把jQuery对象
// 返回到全局作用域中。

var H5ComponentRadar = function (Name,cfg) {

	//创建一个基本图文组件对象，通过cfg对其进行配置
	var component = new H5ComponentBase(Name,cfg);

	//绘制网格线

	var num = cfg.data.length;
	var w = cfg.width;
	var h = cfg.height;


	var step = num + 1;

	//	新建一个底部图层
	var cns = $("<canvas id='canvas'></canvas>").get(0);
	cns.width = cfg.width;
	cns.height = cfg.height;
	var ctx = cns.getContext("2d");
	$(cns).appendTo(component);
	
	function drawRadar() {
		
		var r = w/2 - 2;
		
		var num = cfg.data.length;
		
		//绘制底边多边形
		for (var i =0; i < 10; i++) {
			
			ctx.beginPath();
			
			ctx.strokeStyle = "#888888";
			ctx.lineWidth = 1;
			ctx.fillStyle = i%2 ? "#f1f9ff" : "#99c0ff";
			
			for (var j =0; j < num +1; j++) {
				var r = (w/2 - 2)/10 * (10 - i );
				
				var x = w/2 + r * Math.cos( 2*Math.PI/num * j );
				var y = h/2 - r * Math.sin( 2*Math.PI/num * j );
				
				ctx.lineTo(x, y);
			}	
				ctx.closePath();
				ctx.fill();
		}
		
		//绘制伞骨
		for (var j =0; j < num; j++) {
			ctx.beginPath();
			
			ctx.strokeStyle = "#99c0ff";
			ctx.lineWidth = 1;
			
			ctx.moveTo( w/2, h/2 );
			
			var r = w/2 - 2;
			
			var x = w/2 + r * Math.cos( 2*Math.PI/num * j );
			var y = h/2 - r * Math.sin( 2*Math.PI/num * j );
			
			ctx.lineTo(x, y);

			ctx.stroke();
			
			//添加文字
			var text = $("<div class='text'>"+cfg.data[j][0]+"</div>");
			text.css("transition","all 1s "+(1.3 + j * .1)+"s");
			if(x > w/2){
				text.css("left", x/2);
			}else{
				text.css("right", (w-x)/2);
			}
			
			if(y > h/2){
				text.css("top", y/2);
			}else{
				text.css("bottom", (h - y)/2);
			}
			
			text.appendTo(component);
		}	
	}
		
	drawRadar();
	
	

	
	//	新建一个数据图层
	var cns = $("<canvas id='canvas'></canvas>").get(0);
	cns.width = cfg.width;
	cns.height = cfg.height;
	var ctx = cns.getContext("2d");
	$(cns).appendTo(component);
	
	function drawData(per) {
		//清理图层
		ctx.clearRect( 0, 0, w, h);
		
		ctx.strokeStyle = "#ff0022";
		ctx.fillStyle = "rgba(255,0,16,0.5)";
		
		ctx.lineWidth = 1;

		//绘制折线
		ctx.beginPath();
	
		for (var i =0; i < num; i++) {
			var r = (w/2 - 2) * cfg.data[i][1] * per;
			
			var x = w/2 + r * Math.cos( 2*Math.PI/num * i );
			var y = h/2 - r * Math.sin( 2*Math.PI/num * i );
			
			ctx.lineTo(x, y);
		}	
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
		//绘制数据圆点
		for (var i =0; i < num; i++) {
			ctx.beginPath();
			ctx.strokeStyle = "#ff0022";
			ctx.fillStyle = "#ff0022";
			
			var r = (w/2 - 2) * cfg.data[i][1] * per;
			
			var x = w/2 + r * Math.cos( 2*Math.PI/num * i );
			var y = h/2 - r * Math.sin( 2*Math.PI/num * i );
			
			ctx.arc( x, y, 2, 0, 2*Math.PI);
			ctx.closePath();
			ctx.stroke();
		}	
	}
	//触发事件	
	component.on("onLoad",function () {
		var per = 0;
		for (var i = 0; i < 100; i++) {
			setTimeout(function () {
				per += 0.01;
				drawData(per);
			},i * 10 + 700);
		}
	});
	//载出时间
	component.on("onLeave",function () {
		var per = 1;
		for (var i = 0; i < 100; i++) {
			setTimeout(function () {
				per -= 0.01;
				drawData(per);
			},i *10);
		}
	});
	

			

		
	
	

	//返回H5ComponentPolyline对象到全局变量中
	return component;

}