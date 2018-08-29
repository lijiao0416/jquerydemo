//搜索框的文字效果
$(function () {
    $('#inputSearch').focus(function () {
        $(this).addClass("focus");
        if($(this).val()==this.defaultValue){
            $(this).val('');
        }
    }).blur(function () {
        $(this).removeClass('focus');
        if($(this).val()==''){
            $(this).val(this.defaultValue);
        }
    }).keyup(function (e) {
        if(e.which==13){
            alert('回车提交表单');
        }
    })
});
//网页换肤
$(function () {
    var $li=$("#skin li");
    $li.click(function () {
        switchSkin(this.id);
    });
    var cookie_skin=$.cookie('MyCssSkin');
    if(cookie_skin){
        switchSkin(cookie_skin);
    }
});
function switchSkin(skinName) {
    $("#"+skinName).addClass("selected")
        .siblings().removeClass("selected");
    $("#cssfile").attr('href',"styles/skin/"+skinName+".css");//
    $.cookie("MyCssSkin",skinName,{path:'/',expires:10});
}
//导航效果
$(function () {
    $("#nav li").hover(function () {
        $(this).find('.jnNav').show();
    },function () {
        $(this).find('.jnNav').hide();
    });
});
//左侧商品分类热销效果
$(function () {
    $(".jnCatainfo .promoted").append('<s class="hot"></s>')
});
//右侧上部产品广告效果
$(function () {
    var $imgrolls=$('#jnImageroll div a');
    $imgrolls.css("opacity","0.7");
    var len=$imgrolls.length;
    var index=0;
    var adTimer=null;
    $imgrolls.mouseover(function () {
        index=$imgrolls.index(this);
        showImg(index);
    }).eq(0).mouseover();
    $("#jnImageroll").hover(function () {
        if(adTimer){
            clearInterval(adTimer);
        }
    },function () {
        adTimer=setInterval(function () {
            showImg(index);
            index++;
            if(index==len){index=0;}
        },5000);
    }).trigger('mouseleave');
});
function showImg(index) {
    var $rollobj=$('#jnImageroll');
    var $rolllist=$rollobj.find("div a");
    var newhref=$rolllist.eq(index).attr("href");
    $('#JS_imgWrap').attr('href',newhref)
        .find('img').eq(index).stop(true,true).fadeIn()
        .siblings().fadeOut();
    $rolllist.removeClass('chos').css("opacity","0.7")
        .eq(index).addClass('chos').css('opacity',"1");
}
//右侧最新动态模块内容添加超链接提示
$(function () {
    var x=10;
    var y=20;
    $('a.tooltip').mouseover(function (e) {
        this.myTitle=this.title;
        this.title='';
        var tooltip="<div id='tooltip'>"+this.myTitle+"</div>";
        $("body").append(tooltip);
        $("#tooltip")
            .css({
                "top":(e.pageY+y)+'px',
                "left":(e.pageX+x)+'px'
            }).show("fast");
    }).mouseout(function () {
        this.title=this.myTitle;
        $("#tooltip").remove();
    }).mousemove(function () {
        $("#tooltip")
            .css({
                'top':(e.pageY+y)+'px',
                'left':(e.pageX+x)+'px'
            });
    });
})

$(function () {
    $("#jnBrandTab li a").click(function () {
        $(this).parent().addClass('chos')
            .siblings().removeClass('chos');
        var idx=$('#jnBrandTab li a').index(this);
        showBrandList(idx);
        return false;
    }).eq(0).click();
})
function showBrandList(index) {
    var $rollobj=$('#jnBrandList');
    var rollWidth=$rollobj.find('li').outerWidth();
    rollWidth=rollWidth*4;
    $rollobj.stop(true,false).animate({left:-rollWidth*index},1000)
}
//鼠标滑过有放大镜的效果
/*
$(function () {
    $('#jnBrandList li a').each(function (index) {
        var $img=$(this).find('img');
        var img_w=$img.width();
        var img_h=$img.height();
        var spanHtml='<span style="position:absolute;top:0;left:5px;width:'+img_w+'px;height:'+img_h+'px;" class="imgMask"></span>';
        $(spanHtml).appendTo(this);
    });
    $("#jnBrandList").find('.imgMask').live('hover',function () {
        $(this).toggleClass("imageOver");
    })
})
*/

/*使用jqzoom*/
$(function(){
    $('.jqzoom').jqzoom({
        zoomType: 'standard',
        lens:true,
        preloadImages: false,
        alwaysOn:false,
        zoomWidth: 340,
        zoomHeight: 340,
        xOffset:10,
        yOffset:0,
        position:'right'
    });
});


$(function () {
    $('#jnProitem ul .imgList li a').bind('click',function () {
        var imgSrc=$(this).find('img').attr('src');
        var i=imgSrc.lastIndexOf('.');
        var unit=imgSrc.substring(i);
        imgSrc=imgSrc.substring(0,i);
        var imgSrc_big=imgSrc+'_big'+unit;
        $("#thickImg").attr("href",imgSrc_big);
    })
});

$(function(){
    var $div_li=$('div.tab_menu ul li');
    $div_li.click(function () {
        $(this).addClass('selected')
            .siblings().removeClass('selected');
        var index=$div_li.index(this);

        $('div.tab_box>div')
            .eq(index).show()
            .siblings().hide();

    }).hover(function () {
        $(this).addClass('hover');
    },function () {
        $(this).removeClass('hover');
    })
})

$(function () {
    $(".color_change ul li img").click(function () {
        $(this).addClass('hover')
            .parent().siblings().find('img').removeClass('hover');
        var imgSrc=$(this).attr('src');
        var i=imgSrc.lastIndexOf('.');
        var unit=imgSrc.substring(i);
        imgSrc=imgSrc.substring(0,i);
        var imgSrc_small=imgSrc+'_one_small'+unit;
        var imgSrc_big=imgSrc+'_one_big'+unit;
        $('#bigImg').attr({'src':imgSrc_small});
        $('#thickImg').attr('href',imgSrc_big);
        var alt=$(this).attr('alt');
        $('.color_change strong').text(alt);
        var newImgSrc=imgSrc.replace('images/pro_img/','');
        $('#jnProitem .imgList li').hide();
        $('#jnProitem .imgList').find('.imgList_'+newImgSrc).show();
        $('#jnProitem .imgList').find(".imgList_"+newImgSrc)
            .eq(0).find('a').click();
    });
})

$(function () {
    $(".pro_size li").click(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('ul').siblings('strong')
            .text($(this).text());
    })
})

$(function () {
    var $span=$('.pro_price strong');
    var price=$span.text();
    $('#num_sort').change(function () {
        var num=$(this).val();
        var amount=num*price;
        $span.text(amount);
    }).change();
})

$(function () {
    $('ul.rating li a').click(function () {
        var title=$(this).attr('title');
        alert('您给此商品的评分是'+title);
        var cl=$(this).parent().attr('class');
        $(this).parent().parent().removeClass().addClass('rating'+cl+'star');
        $(this).blur();
        return false;
    })
})

$(function () {
    var $product=$('#jnDetails');
    $("#cart a").click(function () {
        var pro_name=$product.find("h4:first").text();
        var pro_size=$product.find('.pro_size strong').text();
        var pro_color=$('.color_change strong').text();
        var pro_num=$product.find('#num_sort').val();
        var pro_price=$product.find('.pro_price strong').text();
        var dialog="感谢您的购买。\n您购买的\n"+
            "产品是："+pro_name+';\n'+
            "尺寸是："+pro_size+';\n'+
            "颜色是："+pro_color+';\n'+
            "数量是："+pro_num+';\n'+
            "总价是："+pro_price+'元';
        alert(dialog);
        return false;
    })
})
