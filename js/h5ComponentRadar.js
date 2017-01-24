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
		
		
		for (var j =0; j < num +1; j++) {
			ctx.beginPath();
			
			ctx.strokeStyle = "#99c0ff";
			ctx.lineWidth = 1;
			
			ctx.moveTo( w/2, h/2 );
			
			var r = w/2 - 2;
			
			var x = w/2 + r * Math.cos( 2*Math.PI/num * j );
			var y = h/2 - r * Math.sin( 2*Math.PI/num * j );
			
			ctx.lineTo(x, y);

			ctx.stroke();
		}	
		
	drawRadar();
	
	//	新建一个数据图层
	var cns = $("<canvas id='canvas'></canvas>").get(0);
	cns.width = cfg.width;
	cns.height = cfg.height;
	var ctx = cns.getContext("2d");
	$(cns).appendTo(component);

			

		
	}
	
	

	//返回H5ComponentPolyline对象到全局变量中
	return component;

}