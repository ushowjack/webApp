/* 图文组件对象*/
var H5ComponentBase = function (Name,cfg) {
	var cfg = cfg || {};
	var cls ='h5_component_' + cfg.type;
	var component = $("<div class='h5_component_" + Name + " h5_component "+cls+" '></div>");



	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.text  && component.text(cfg.text);
	cfg.css && component.css(cfg.css); 
	cfg.width && component.css("backgroundImage"," url("+cfg.bg+")");
	if (cfg.center === true) {
		component.css({
			left: "50%",
			marginLeft: (-1 * cfg.width/4) + "px",
		});
	}


	component.on("onLeave",function () {
		component.addClass(cls + '_leave').removeClass(cls + '_load');
		cfg.animateOut && component.animate(cfg.animateOut,1000);
		return false;
	});
	component.on("onLoad",function () {
		component.addClass(cls + '_load').removeClass(cls + '_leave');
		cfg.animateIn && component.animate(cfg.animateIn,1000);
		return false;
	}); 
	return component;

}