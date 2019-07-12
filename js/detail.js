/*************
 *作者：杨金涛
 *项目名：商品图片放大
 *备注：null
 */

 //构造器，首字母大写
 function DetailFn( _obj ){
 	for(var i in _obj){
 		this[i] = _obj[i];
 	}

 	this.init();
 }

 DetailFn.prototype = {
 	constructor:DetailFn,
 	init:function(){
 		var _self = this;

 		_self.getData();
 	},
 	//获取数据
 	getData:function(){
 		var _self = this;

 		//假数据
 		var _imgObj = {
 			bigImg:"images/1.png",
 			small:["images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png","images/7.jpg"]
 		};
 		// console.log(_imgObj); //验证数据

        //设置页面加载时显示的第一张图片
        _self.bigImgId.attr('src', _imgObj.bigImg);
        _self.localDivId.children('img').attr('src', _imgObj.bigImg);

        //图片加载之后，需要隐藏,图片正在加载中,请稍等...
        //.hide()， 是隐藏一个DOM节点的方法
        _self.imgLoadingId.hide();

 		_self.creatListDOM( _imgObj.small );  //创建DOM之后，才能进行事件的操作

 		_self.switchBigImg();

 		_self.MaskShow();

 		_self.eventMouseFn();

 	},
 	//创建DOM
 	//先生成小图列表
 	creatListDOM:function( _data ){
 		var _self = this;

 		for(var i=0;i<_data.length;i++){
 			$("<li/>")
 		         .attr("data-img", _data[i])
 		         .html("<img src="+ _data[i] +">")
 		         .appendTo( _self.ulId );
 		}
 	},
 	//小图的事件,切换大图
    switchBigImg:function(){
    	var _self = this;

    	// console.log( _self.ulId.children("li") );

    	var _lis = _self.ulId.children("li");

    	_lis.on("click", function(){
    		// console.log($(this).attr("data-img"));
    		var _imgSrc = $(this).attr("data-img");

    		_self.bigImgId.attr("src", _imgSrc);
    		_self.zoomImgId.attr("src", _imgSrc);
    	});
    },
    //遮罩显示和隐藏
    MaskShow:function(){
    	var _self = this;

    	_self.wrapDivId.on({
    		mouseover:function(){
    			_self.maskDivId.show();
    			_self.localDivId.show();
    		},
    		mouseout:function(){
    			_self.maskDivId.hide();
    			_self.localDivId.hide();
    		}
    	});
    },
    //鼠标跟随事件
 	eventMouseFn:function(){
 		var _self = this;
        
        //mousemove，鼠标移动事件
        //e,它是一个参数，它里面保存的是mousemove事件被触发时的事件对象
        //里面是相关的信息，例如坐标一类的信息
 		_self.wrapDivId.on("mousemove",function( e ){
 			// console.log( e );
 			var _eL = e.pageX;
 			var _eT = e.pageY;
            
            //半透明遮罩的父容器，相对于整个页面的xy坐标
 			var _wrapDivIdXY = _self.wrapDivId.offset();

 			_eL = _eL - _wrapDivIdXY.left - 50;
 			_eT = _eT - _wrapDivIdXY.top - 50;
            
            //测试容器
 			// $("#h1xxx").html( _eL );

 			//左右的
 			if( _eL<0 ){
 				_eL = 0;
 			} else if( _eL > (_self.wrapDivId.width() - 100) ){
 				_eL = _self.wrapDivId.width() - 100;
 			}

 			//上下的
 			if( _eT<0 ){
 				_eT = 0;
 			} else if( _eT > (_self.wrapDivId.height() - 100) ){
 				_eT = _self.wrapDivId.height() - 100;
 			}
            
            //遮罩
 			_self.maskDivId.css({
 				"left":_eL,
 				"top":_eT
 			});

 			//局部大图
 			_self.zoomImgId.css({
 				"left": -(_eL * 3),
 				"top": -(_eT * 3)
 			});

 		})
 	}
 };

 new DetailFn({
 	imgLoadingId:$("#imgLoadingId"),
 	bigImgId:$("#bigImgId"),
 	wrapDivId:$("#wrapDivId"),
 	maskDivId:$("#maskDivId"),
 	localDivId:$("#localDivId"),
 	zoomImgId:$("#zoomImgId"),
 	ulId:$("#ulId")
 });