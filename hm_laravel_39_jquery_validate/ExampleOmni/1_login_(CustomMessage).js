function form_submit(){
    $('.hidediv-wait').css({'display':'table'});
    $(".hidediv-wait").fadeTo(2000, 700).fadeOut(700, function () {
        $(".hidediv-wait").fadeOut(700);
    });
    $("#loginForm").validate({
        errorClass: "error-class",
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
            }
        },
        messages: {
            email: {
                required: "<span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>Anh/Chị vui lòng nhập email.",
                email: "<span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>Email sai định dạng.",
            },
            password: {
                required: "<span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>Anh/Chị vui lòng nhập mật khẩu.",
            }
        },
        submitHandler: function () {
            let encryption = new Encryption();
            let email =($('#email').val());
            let password = $('#password').val();
            let key = $("input[name='_token']").val();
            let email_encrypted = encryption.encrypt(email, key);
            let password_encrypted = encryption.encrypt(password, key);
            $('#email').hide();
            $('#password').hide();
            $('#email').val(email_encrypted);
            $('#password').val(password_encrypted);
            return true;
        }
    });
}