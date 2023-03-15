/*!
 * smooth-scroll v16.1.2
 * Animate scrolling to anchor links
 * (c) 2020 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/smooth-scroll
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], (function () {
			return factory(root);
		}));
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.animateScroll = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {
	'use strict';
    var docbody = document.body,
        dochtml = document.documentElement;
	function animateElm(elm,opt,pos){
        opt = opt||{};
        if(!opt.offset)opt.offset = -50;
        if(typeof elm == 'string')elm = document.querySelector(elm);
        if(elm instanceof Element){
            if(pos)elm.setAttribute('data-pos',pos);
            elm.opt = opt;
            if(pos==undefined){
                var target = elm.getAttribute('href')||elm.getAttribute('data-target');
                if(target){
                    if(/#/.test(target))target = '[id=\''+target.split('#').splice(1).join('#')+'\']';
                    target = document.querySelector(target);
                    if(target){
                        var scrollid = target.getAttribute('data-scroll-id');
                        if(!scrollid){
                            scrollid ='id'+Math.random().toString().split('.')[1];
                            target.setAttribute('data-scroll-id',scrollid);
                        }
                        elm.setAttribute('scroll-target','[data-scroll-id='+scrollid+']');
                    }else{
                        return;
                    }
                }
            }else{
                pos = parseInt(pos);
            }
            elm.addEventListener('click',function(e){
                var pos = this.getAttribute('data-pos'),target,opt = this.opt;
                if(pos==null){
                    target = document.querySelector(this.getAttribute('scroll-target'));
                    if(target)pos = dochtml.scrollTop+target.getBoundingClientRect().y;
                }
                animateScroll.to(pos,opt,function(e){opt.callback&&opt.callback(e,elm,target,pos)});
                e.stopPropagation();
                e.preventDefault();
            });
        }
    }
    function animateScroll(elms,opt){
        if(typeof elms == 'string')elms = document.querySelectorAll('a[href*="#"]').forEach(function(elm){animateElm(elm,opt)});
        else if(elms.length)Array.from(elms).forEach(function(elm){animateElm(elm,opt)});
        else if(elms&&elms.constructor == Object)Object.entries(elms).forEach(function(entry){animateElm(entry[0],opt,entry[1])});
    }
    animateScroll.createAnimation = function(elm,opt,pos,callback){
        var keyframes = opt&&opt.keyframes,
            xpos = pos ||0,
            options = {
                delay:-1,//ms
                endDelay:-1,//ms
                easing:"ease-in-out",//速率 ease,ease-in,ease-out,ease-in-out,steps(int,start|end),cubic-bezier(n,n,n,n)
                duration: 800,//动画所需ms
                iterations: 1,//循环次数
            },
            y= xpos-dochtml.scrollTop;
        opt&&Object.keys(options).forEach(function(val){typeof opt[val] != 'undefined'&&(options[val]=opt[val])});
        if(!keyframes)keyframes = [
            { marginTop: y+'px' },//from
            { marginTop: 0+"px" },//to
        ];
        else if(keyframes instanceof Function){
            keyframes = keyframes(xpos,y);
        }
        var _Animate = elm.animate(keyframes,options);
        if(pos!=undefined&&pos!=null&&pos.constructor === Number)dochtml.scrollTop=pos;
        if(callback)_Animate.addEventListener('finish',function(e){callback(e)});
    };
    animateScroll.to = function(pos,opt,callback){
        opt = opt||{};
        var maxTop = dochtml.offsetHeight - window.innerHeight;
        pos = pos+(opt.offset||0);
        if(pos>maxTop)pos = maxTop;
        if(pos==dochtml.scrollTop) return;
        animateScroll.createAnimation(docbody,opt,pos,function(e){callback&&callback(e)});
    }
	return animateScroll;

}));
