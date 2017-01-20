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
		return this;
	}
	// 添加组件方法
	this.addComponent = function (Name,cfg) {
		var cfg = cfg || {}; 
		cfg = $.extend({type:"base"}, cfg);

		var component;

		switch (cfg.type) {
			case "base":
				component = new H5ComponentBase("myName",cfg);
				break;
			default:
				// statements_def
				break;
		}
		page = this.pageArr.slice(-1)[0];
		page.append(component);
		

		return this;
	}

	// H5页面初始化方法
	this.loader = function () {
		this.elem.fullpage({
			sectionsColor: ["red","blue","yellow","red","blue","yellow"],
			onLeave:function (index,nextIndex,direction) {
				$(this).find(".h5_component").trigger('onLeave');
			},
			afterLoad:function (anchorLink,index) {
				$(this).find(".h5_component").trigger('onLoad');
			}
		});	
		this.elem.show();

	}
	return this;
}