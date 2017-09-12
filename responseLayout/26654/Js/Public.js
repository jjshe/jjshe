// 导航悬浮出现二级菜单
$(function () {
    $('.P_Header .Header_con .nav_list').hover(function () {
        $(this).addClass('active');
    }, function () {
        $(this).removeClass('active');
    });
});

// 手机端展开菜单
$(function () {
    $('.P_Header .Header_con .click_nav').click(function () {
        $(this).parents('.Header_con').toggleClass('show_nav');
    });
});

// 导航跟随
$(function () {
    var iNavH = $('.Header_height').height();
    $(window).scroll(function () {
        if ($(this).scrollTop() >= iNavH) {
            $('.P_Header').addClass('Fixed');
            $('.Header_height').show();
        } else {
            $('.P_Header').removeClass('Fixed');
            $('.Header_height').hide();
        }
    });




    // 导航韩文
    var oNavLi = $('.P_Header .Header_con nav .nav_list');
    oNavLi.each(function () {
        if ($(this).attr('nav_name').search('首页') != -1) {
            $(this).find('p').text('홈페이지')
        } else if ($(this).attr('nav_name').search('关于韩爽') != -1) {
            $(this).find('p').text('한상에 관한')
        } else if ($(this).attr('nav_name').search('新闻动态') != -1) {
            $(this).find('p').text('뉴스')
        } else if ($(this).attr('nav_name').search('门店展示') != -1) {
            $(this).find('p').text('매장 전시')
        } else if ($(this).attr('nav_name').search('韩爽美食') != -1) {
            $(this).find('p').text('한상 음식')
        } else if ($(this).attr('nav_name').search('中国市场') != -1) {
            $(this).find('p').text('중국 시장')
        } else if ($(this).attr('nav_name').search('联系我们') != -1) {
            $(this).find('p').text('연락처')
        }
    });
    // 当前导航
    oNavLi.eq(0).addClass('current');
    var sName = $('.Content_Page .Content_title .Content_title_left a').eq(0).find('span').text();

    oNavLi.each(function () {
        if ($(this).attr('nav_name') == sName) {
            oNavLi.removeClass('current');
            $(this).addClass('current');
        }
    })
});


// 首页banner
$(function () {
    var aPicSrc = [];
    var aPicW = [];
    var oHint = $('.Banner .hint_box span');

    $.each(oHint, function (i, o) {
        aPicSrc.push($(o).find('img').attr('src'));
    });

    var duSwiper = new Swiper('.pic_box', {
        autoplay: 5000,          //自动滑动
        autoplayDisableOnInteraction: false,
        pagination: '.hint',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '"><img src="' + aPicSrc[index] + '" /></span>';
        }
    });

    $.each(oHint, function (i, o) {
        var iHintH = $('.Banner .hint').height();
        var iPicH = $('.Banner').height();
        var iWidth;
        var iHeight;
        $('<img/>').attr('src', aPicSrc[i]).load(function () {
            iWidth = this.width;
            iHeight = this.height;
            var iW = 1920 * iHintH / iPicH;
            $('.Banner .hint span img').eq(i).css('marginLeft', -iW / 2);
        });
        $('.Banner .hint span').eq(i).css('background-image', 'url(' + aPicSrc[i] + ')');
    });
    var iHintSpan = $('.Banner .hint span');
    $('.Banner .hint').css('marginLeft', -iHintSpan.length * iHintSpan.width() / 2);
})


// 首页产品
$(function () {
    var oSpanBox = $('.recommend .con_box .con');
    var oSpan = oSpanBox.find('span');
    var iSpanW = oSpan.eq(0).width();
    var iSpanLen = oSpan.length;
    oSpanBox.width(oSpan.length * iSpanW);

    // 下一项
    $('.recommend .change.down').click(function () {
        oSpanBox.stop(true, true);
        var iML = parseInt(oSpanBox.css('marginLeft'));
        if (iML >= -(iSpanLen - 5) * iSpanW) {
            //oSpanBox.css('marginLeft', iML - iSpanW);
            oSpanBox.animate({ 'marginLeft': iML - iSpanW }, 200);
        }
    })

    // 上一项
    $('.recommend .change.up').click(function () {
        oSpanBox.stop(true, true);
        var iML = parseInt(oSpanBox.css('marginLeft'));
        if (iML < 0) {
            //oSpanBox.css('marginLeft', iML + iSpanW);
            oSpanBox.animate({ 'marginLeft': iML + iSpanW }, 200);
        }
    })
})

// 首页门店
$(function () {
    var oListBox = $('.stroe_banner .stroe_banner_list');
    var oList = $('.stroe_banner .stroe_banner_list dl');
    var iListLen = oList.length;
    var iListW = oList.eq(0).outerWidth(true) + parseInt(oList.eq(0).css('marginRight'));
    oListBox.width(iListLen * iListW);


    // 下一项
    $('.stroe_banner .stroe_change.down').click(function () {
        oListBox.stop(true, true);
        var iML = parseInt(oListBox.css('marginLeft'));
        if (iML >= -(iListLen - 5) * iListW) {
            //oSpanBox.css('marginLeft', iML - iSpanW);
            oListBox.animate({ 'marginLeft': iML - iListW }, 200);
        }
    })

    // 上一项
    $('.stroe_banner .stroe_change.up').click(function () {
        oListBox.stop(true, true);
        var iML = parseInt(oListBox.css('marginLeft'));
        if (iML < 0) {
            //oSpanBox.css('marginLeft', iML + iSpanW);
            oListBox.animate({ 'marginLeft': iML + iListW }, 200);
        }
    })

})


// 二级页面导航
$(function () {
    // 左边
    var oLeftlistTit = $('.Content_Page .Content_title .Content_title_left a').eq(0);
    var oDt = $('.Content_Page .Content_title dl dt');
    oDt.append(oLeftlistTit);


    var oLeftList = $('.Content_Page .Content_title .Content_title_left a');
    var iLen = oLeftList.length;

    for (var i = 0; i < iLen; i++) {
        if (i % 2 == 0) {
            console.log(i)
            $('.Content_Page .Content_title dl').append('<dd></dd>');
        }
    }


    $.each(oLeftList, function (i, o) {
        var oCur = $(o).clone();

        $('.Content_Page .Content_title dl dd').eq(Math.floor(i / 2)).append(oCur);

    })

    if (iLen > 4) {
        $('.Content_Page .Content_title dl dd:gt(3)').hide();
        if ($(window).width() < 768) {
            $('.Content_Page .Content_title dl dd').css({ 'height': '1rem', 'overflow': 'hidden' });
        }
    }

    // 右边
    $('.Content_Page .Content_title ul li:first').addClass('no_bg');
    //fnAutoHeight();
    //$(window).resize(function () {
    //    fnAutoHeight();
    //})
    //function fnAutoHeight() {
    //    if ($(window).width() < 768 && iLen > 3) {
    //        $('.Content_Page .Content_title').css('height', '6rem');
    //    }
    //};


});


