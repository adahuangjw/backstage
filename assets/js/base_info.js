$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    inituserinfo()
    // 初始化用户信息
    function inituserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('获取用户信息失败！')
                }
                // 调用form.val()快速为表单赋值
                form.val('userinfo_form', res.data)
            }
        })
    }
    // 重置表单数据
    $('#btnreset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        inituserinfo()
    })
    // 更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用index父页面中的更新用户信息的方法
                // 此时的window相当于iframe窗口，它的父亲就是index页面
                window.parent.getuserinfo()
            }
        })
    })
})