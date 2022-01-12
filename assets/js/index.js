$(function () {
    // 获取用户信息
    getuserinfo()
    var layer = layui.layer
    $('.logout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' },
            function (index) {
                // 清除本地存储的token
                localStorage.removeItem('token')
                location.href = 'login.html'
                // 关闭提示框
                layer.close(index)
            })
    })
})
// 获取用户基本信息
function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户图像
            randerimg(res.data)
        }
    })
}
// 渲染用户图像
function randerimg(userinfo) {
    // 获取用户名
    var name = userinfo.nickname || userinfo.username
    $('.username').html('欢迎&nbsp&nbsp' + name)
    // 判断用户图像
    if (userinfo.user_pic !== null) {
        $('.userimg').hide()
        $('.layui-nav-img').show()
        $('.layui-nav-img').url = user_pic
    } else {
        $('.userimg').show()
        $('.userimg').html((userinfo.username)[0].toUpperCase())
        $('.layui-nav-img').hide()
    }
}