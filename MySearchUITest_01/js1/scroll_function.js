//This js file is expanded method for scroll function 
(function ($) {
            $.fn.extend({
                Scroll: function (opt, callback) {
 
                    if (!opt) var opt = {};
                    var _btnleft = $(opt.left);
                    var _btnright = $(opt.right);
                    var timerID;
                    var _this = this.eq(0).find("div").eq(1);
                    var lineW = _this.find("a:first").width(), //get the width of the column
                    line = opt.line ? parseInt(opt.line, 10) : parseInt(_this.width() / lineW, 10), //number of column of scrolling each time
                    speed = opt.speed ? parseInt(opt.speed, 10) : 500; //speed of scrolling 500
                    timer = opt.timer ? parseInt(opt.timer, 10) : 4000; //time interval of scrolling 4000
                    if (line == 0) line = 1;
                    var upWidth = 0 - line * lineW;
                    //scroll_function
                        var scrollLeft = function () {
                        if (!_this.is(":animated")) {
                            _this.animate({
                                left: upWidth
                            }, speed, function () {
                                for (i = 1; i <= line; i++) {
                                    _this.find("a:first").appendTo(_this);
                                }
                                _this.css({ left: 0 });
                            });
                        }
                    }
                    var scrollRight = function () {
                        if (!_this.is(":animated")) {
                            for (i = 1; i <= line; i++) {
                                _this.find("a:last").show().prependTo(_this);
                            }
                            _this.css({ left: upWidth });
                            _this.animate({
                                left: 0
                            }, speed, function () {
                            });
                        }
                    }                         //Shawphy:automatic display   
                    var autoPlay = function () {
                            if (timer) timerID = window.setInterval(scrollLeft, timer);
                    };
                    var autoStop = function () {
                        if (timer) window.clearInterval(timerID);
                    };//bind for mouse_event 
                    //_this.hover(autoStop, autoPlay).mouseout();
					_btnleft.css("cursor", "pointer").click(scrollRight).hover(autoStop, autoPlay); 
					_btnright.css("cursor", "pointer").click(scrollLeft).hover(autoStop, autoPlay);
                }
            })
        })(jQuery);