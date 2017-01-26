/* 饼图组件对象*/

// 基于H5ComponentRing组件，传入参数，获得一个类名为h5_component_ring的
// jQuery对象。最后通过设置Pie组件独有的动画和数据显示，然后再把jQuery对象
// 返回到全局作用域中。

var H5ComponentRing = function (Name,cfg) {
	
	cfg.type = "pie";
	
	var component = new H5ComponentPie( Name, cfg);
	
	var w = cfg.width;
	var h = cfg.height;
	
	//绘制一个罩层
	var cns = $("<canvas id='canvas'></canvas>").get(0);
	cns.width = cfg.width;
	cns.height = cfg.height;
	var ctx = cns.getContext("2d");
	$(cns).appendTo(component);
	
	
	drawArc();
	
	function drawArc() {
		ctx.clearRect( 0, 0, w, h);
		
		var num = cfg.data.length;
		
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		ctx.fillStyle = "#fff";
		
		ctx.moveTo(w/2, h/2);
		ctx.arc( w/2, h/2, w*2/5, 0, 2*Math.PI);
		
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
	}

	component.find(".text").css({
		left : "0%",
		top : "50%",
		color: cfg.data[0][2],
		fontSize : w/12,
		fontWeight:"bold",
		width : "100%",
		textAlign : "center", 
		marginLeft : "-5px",
		marginTop : "-10px",
		"z-index" : 4
	});


			

		
	
	

	//返回H5ComponentRing对象到全局变量中
	return component;

}