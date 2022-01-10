$(function () {
    // 点击“注册”事件
    $('#link_reg').on('click', function () {
        $('.loginpart').hide()
        $('.regpart').show()
    })
    // 点击“登录”事件
    $('#link_login').on('click', function () {
        $('.loginpart').show()
        $('.regpart').hide()
    })
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        repwd: function (val) {
            if (val !== $('#regpwd').val()) {
                return '两次输入密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#reg_form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#regname').val(),
                password: $('#regpwd').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录~')
                // 注册成功自动跳转到登录页面 手动调用登录点击事件
                $('#link_login').click()
            }
        })
    })

    // 监听登录表单的提交事件
    $('#log_form').submit(function (e) {
        e.preventDefault()
        $.post(
            // $(this).serialize()一次获取表单的全部值
            '/api/login', $(this).serialize(),
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg(res.message)
                // 登录成功后把服务器返回的token值存储到本地
                localStorage.setItem('token', res.token)
                // 登录成功就跳转到index页面
                location.href = 'index.html'
            })
    })


})