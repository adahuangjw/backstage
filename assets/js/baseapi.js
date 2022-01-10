// 每次调用$.get(), $.post(), $.ajax()的时候都会先调用ajaxPrefilter()函数
$.ajaxPrefilter(function (opt) {
    opt.url = 'http://www.liulongbin.top:3007' + opt.url
})