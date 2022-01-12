$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        samePwd: function (val) {
            if (val === $('[name=old_pwd]').val()) {
                return '新密码不能与旧密码相同'
            }
        },
        repwd: function (val) {
            if (val !== $('[name=new_pwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 给表单绑定submit事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更改密码失败')
                }
                layer.msg('更改密码成功')
                // 重置表单,因为reset是原生的方法，所以要转换成dom对象
                $('.layui-form')[0].reset()
            }
        })
    })
})
