// 导航英文
$(function () {
    var sNavTxt = $('.P_Header nav dl dt a');
    $.each(sNavTxt,function (i, o) {
        if ($(o).text() == '关于我们') {
            $(o).siblings('em').text('About us')
        } else if ($(o).text() == '新闻动态') {
            $(o).siblings('em').text('New Centent')
        } else if ($(o).text() == '美食展示') {
            $(o).siblings('em').text('Foods')
        } else if ($(o).text() == '门店展示') {
            $(o).siblings('em').text('Stores')
        } else if ($(o).text() == '合作中心') {
            $(o).siblings('em').text('Cooperation')
        } else if ($(o).text() == '联系我们') {
            $(o).siblings('em').text('Contact Us')
        }
    })

})