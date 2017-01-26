/* 饼图组件对象*/

// 基于H5ComponentBase组件，传入参数，获得一个类名为h5_component_polyline的
// jQuery对象。最后通过设置Pie组件独有的动画和数据显示，然后再把jQuery对象
// 返回到全局作用域中。

var H5ComponentPie = function(Name, cfg) {

	//创建一个基本图文组件对象，通过cfg对其进行配置
	var component = new H5ComponentBase(Name, cfg);

	//绘制网格线

	var num = cfg.data.length;
	var w = cfg.width;
	var h = cfg.height;
	var r = w / 2 - 2;

	//	var step = num + 1;

	//绘制底层为之后制作环形图做底部用
		var cns = $("<canvas id='canvas'></canvas>").get(0);
		cns.width = cfg.width;
		cns.height = cfg.height;
		var ctx = cns.getContext("2d");
		$(cns).appendTo(component);
		
		drawArc(0);

	//	新建一个数据图层
	var cns = $("<canvas id='canvas'></canvas>").get(0);
	cns.width = cfg.width;
	cns.height = cfg.height;
	var ctx = cns.getContext("2d");
	$(cns).appendTo(component);

	function drawData() {
		var colors = ["#d40045 ", "#ee0026 ", "#ff590b", "#ff7f00", "#99cf15", "#007a87", "#340c81"];
		var sAnger = 1.5 * Math.PI;
		var eAnger = 0;

		for(var i = 0; i < cfg.data.length; i++) {

			var tAnger = 2 * Math.PI * cfg.data[i][1];
			eAnger = sAnger + tAnger;

			ctx.beginPath();

			ctx.strokeStyle = ctx.fillStyle = cfg.data[i][2] || colors.pop();

			ctx.moveTo(w / 2, h / 2);
			ctx.arc(w / 2, h / 2, r, sAnger, eAnger);

			ctx.closePath();
			ctx.fill();

			//输出文字
			pushText(i, sAnger, tAnger)

			sAnger = eAnger;

		}
	}

	drawData();

	//输出文字函数
	function pushText(i, sAnger, tAnger) {

		//放的角度是起始角度到终点角度的一半
		var eAnger = sAnger + tAnger / 2;
		//		console.log(Math.cos(tAnger/2))

		var x = w / 2 + r * Math.cos(eAnger);

		//这里的y使用加号，因为圆是顺时针画的
		//而坐标刚好是反的
		var y = h / 2 + r * Math.sin(eAnger);

		var text = $("<div class='text'>" + cfg.data[i][0] + "</div>");
		//样式设置
		text.css("transition", "all 0.5s " + (0.8 + i * .1) + "s");

		if(x > w / 2) {
			text.css("left", x / 2);
		} else {
			text.css("right", (w - x) / 2);
		}

		if(y > h / 2) {
			text.css("top", y / 2);
		} else {
			text.css("bottom", (h - y) / 2);
		}
		//添加文本
		text.appendTo(component);
	}

	//	新建一个蒙图图层
	var cns = $("<canvas id='canvas'></canvas>").get(0);
	cns.width = cfg.width;
	cns.height = cfg.height;
	var ctx = cns.getContext("2d");
	$(cns).appendTo(component);

	drawArc(0);

	function drawArc(per) {
		ctx.clearRect(0, 0, w, h);

		var num = cfg.data.length;

		ctx.beginPath();
		ctx.strokeStyle = "rgb(239,238,235)";
		ctx.fillStyle = "rgb(239,238,235)";

		ctx.moveTo(w / 2, h / 2);
		if(per <= 0) {
			ctx.arc(w / 2, h / 2, r, 0, 2 * Math.PI);
		} else {
			ctx.arc(w / 2, h / 2, r, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI * per, true);
		}

		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		//当百分比为1的时候清空整层画布
				per === 1 && ctx.clearRect( 0, 0, w, h);
	}

		//触发事件	
		component.on("onLoad",function () {
			var per = 0;
			for (var i = 0; i < 100; i++) {
				setTimeout(function () {
					per += 1;
					//此处验证过，如果用小数计算的话，会导致计算误差很大
					//尽量用整数进行计算
					drawArc(per/100);
	//				console.log(per);
				},i * 10 +700);
			}
		});
		//载出时间
		component.on("onLeave",function () {
			var per = 100;
			for (var i = 0; i < 100; i++) {
				setTimeout(function () {
					per -= 1;
					drawArc(per/100);
				},i *10);
			}
		});

	//返回H5ComponentPolyline对象到全局变量中
	return component;

}