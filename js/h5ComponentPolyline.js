/* 折线图组件对象*/

// 基于H5ComponentBase组件，传入参数，获得一个类名为h5_component_polyline的
// jQuery对象。最后通过设置Polyline组件独有的动画和数据显示，然后再把jQuery对象
// 返回到全局作用域中。

var H5ComponentPolyline = function (Name,cfg) {

	//创建一个基本图文组件对象，通过cfg对其进行配置
	var component = new H5ComponentBase(Name,cfg);

	//绘制网格线

	var num = cfg.data.length;
	var w = cfg.width;
	var h = cfg.height;


	var step = num + 1;

	//	新建一个图层否则在清理ctx时会将网格也清除
	var cns = $("<canvas id='canvas'></canvas>").get(0);
	cns.width = cfg.width;
	cns.height = cfg.height;
	var ctx = cns.getContext("2d");
	$(cns).appendTo(component);

	//设置画笔的参数
	ctx.beginPath();
	
	ctx.strokeStyle = "#222";
	ctx.lineWidth = 1;
	
	//画出横线线条
	for(var i = 0; i < 11; i++){
	
		ctx.moveTo(0,h * i / 10);
		ctx.lineTo(w,h * i / 10);
	
	}
	
	//画出竖线
	for(var i = 0; i < step + 1; i++){

		ctx.moveTo(w* i / step, 0);
		ctx.lineTo(w* i / step, h);
		
	}	
	ctx.stroke();
	ctx.closePath();
	
	var cns = $("<canvas id='canvas'></canvas>").get(0);
	cns.width = cfg.width;
	cns.height = cfg.height;
	var ctx = cns.getContext("2d");
	$(cns).appendTo(component);
	
	var per = 0;
	
	//这里把per提到全局变量的话有利于事件间的调用连贯性。
	//clearInterval试过在事件间互相消除但会出现undefined的问题
	//所以就在执行完之后对该setInterval进行销毁即可
	component.on("onLoad",function () {

		var timerLoad = setInterval(function () {
			if ( per <1 ) {
				polyDraw( per);
				per += 0.1;
			}else{
				clearInterval(timerLoad);	
			}
		},50);
	});
	component.on("onLeave",function () {
		var timerLeave = setInterval(function () {
			if ( per > 0 ) {
				polyDraw( per);
				per -= 0.1;
			}else{
				clearInterval(timerLeave);	
			}
		},50);
	});
	
	//画折线图函数，函数被调用不在调用的作用域内，
	//再者setInterval不能进行传参，只能传递事件参数
	//	必须依赖于自身对全局变量的调用，故传参比较少
	function polyDraw( per) {
		//清理canvas画布
		ctx.clearRect( 0, 0, w, h);
		
		//	画出点
		for (var i = 0; i < num; i++) {
			var y =h - cfg.data[i][1] * h*per ;
			var x = (i +1) * w/step; 
			
			ctx.beginPath();
			
			ctx.strokeStyle = "#f00";
			ctx.fillStyle = "#ff0022";
			
			ctx.moveTo(x, y);		
			ctx.arc( x, y, 3, 0, 2*Math.PI);
			
			ctx.fill();
			ctx.stroke();
			
			ctx.closePath();
		}
		//画出折线
	
		ctx.beginPath();
		ctx.strokeStyle = "#ff0022";
		ctx.lineWidth = 1;
		ctx.fillStyle = "rgba(255,0,16,0.5)";
		
		ctx.moveTo(w/step,h);
		
		for (var i = 0; i < num; i++) {
			
			var y = h - cfg.data[i][1] * h *per;
			var x = (i +1) * w/step; 
			
			ctx.lineTo( x, y );
			
		}
		
		ctx.lineTo(w/step*num,h);
		
		
		ctx.stroke();
		ctx.fill();
	
		ctx.closePath();
		
	}



	//返回H5ComponentPolyline对象到全局变量中
	return component;

}