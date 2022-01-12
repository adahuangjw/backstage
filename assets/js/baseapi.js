// 每次调用$.get(), $.post(), $.ajax()的时候都会先调用ajaxPrefilter()函数
$.ajaxPrefilter(function (opt) {
    // 配置url路径
    opt.url = 'http://www.liulongbin.top:3007' + opt.url
    // 配置headers,如果请求路径有my字段，则加上headers
    if (opt.url.indexOf('/my/') !== -1) {
        opt.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 无论成功还是失败都会调用complete函数
    opt.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token并且跳转到login页面
            localStorage.removeItem('token')
            location.href = 'login.html'
        }
    }
})