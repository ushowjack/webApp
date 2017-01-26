/* 内容管理对象*/
var H5 = function () {
	// 创建一个h5内容管理对象
	this.pageArr = [];
	this.elem = $("<div class='h5'>").hide();
	$("body").append(this.elem);

	// 添加页的方法
	this.addPage = function (name,text) {
		var page = $("<div class='section h5_page'></div>");
		if (name !==undefined) {	
			page.addClass('h5_page_' + name);
			page.text(text);
		}
		page.appendTo(this.elem);
		this.pageArr.push(page);
		if(typeof this.whenAddComponent === "function"){
			this.whenAddComponent();	
		} 
		return this;
	}
	// 添加组件方法
	this.addComponent = function (Name,cfg) {
		var cfg = cfg || {}; 
		cfg = $.extend({type:"base"}, cfg);

		var component;

		switch (cfg.type) {
			case "base":
				component = new H5ComponentBase(Name,cfg);
				break;
			case "polyline":
				component = new H5ComponentPolyline(Name,cfg);
				break;
			case "pie":
				component = new H5ComponentPie(Name,cfg);
				break;
			case "bar":
				component = new H5ComponentBar(Name,cfg);
				break;
			case "radar":
				component = new H5ComponentRadar(Name,cfg);
				break;
			case "ring":
				component = new H5ComponentRing(Name,cfg);
				break;
			case "point":
				component = new H5ComponentPoint(Name,cfg);
				break;



			default :
				// statements_def
				break;
		}
		page = this.pageArr.slice(-1)[0];
		page.append(component);
		

		return this;
	}

	// H5页面初始化方法
	this.loader = function (page) {
		this.elem.fullpage({

			onLeave:function (index,nextIndex,direction) {
				$(this).find(".h5_component").trigger('onLeave');
			},
			afterLoad:function (anchorLink,index) {
				$(this).find(".h5_component").trigger('onLoad');
			}
		});	
		this.elem.show();
		if (page) {
			$.fn.fullpage.moveTo(page);
		}
	}
	return this;
}