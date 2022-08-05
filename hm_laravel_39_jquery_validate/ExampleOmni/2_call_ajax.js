let clickCount = 0;
$('#add-api-form').validate({
    rules: {
        method: {
            required: true
        },
        name: {
            required: true
        },
        url: {
            required: true
        }

    },
    messages: {
        method: {
            required: 'Vui lòng chọn loại method',
        },
        name: {
            required: 'Vui lòng nhập tên API',
        },
        url: {
            required: 'Vui lòng nhập URL',
        },
    },
    errorElement: 'div',
    errorClass: 'error',
    submitHandler: function (form, event) {
        event.preventDefault();

        let data = $(form).serialize();

        console.log(data);
        if (clickCount < 1) {
            clickCount++;
            $.ajax({
                type: "POST",
                url: '/debug/monitor-api-speed/store',
                data: data,
                beforeSend: function () {
                    turnOnOffLoadingBar(true);
                },
                success: function (res) {
                    console.log('res', res);
                    turnOnOffLoadingBar(false);

                    if (res.status == 1) {
                        location.reload();
                    } else {
                        clickCount = 0;
                    }

                    return false;
                },
                error: function (data) {
                    clickCount = 0;
                    turnOnOffLoadingBar(false);
                },
                complete: () => {

                    // location.reload();
                }
            });
            return false;
        }
        return true;
    }
})




let clickCount = 0;
$('#add-api-form').validate({
    rules: {
        method: {
            required: true
        },
        name: {
            required: true
        },
        url: {
            required: true
        },
        "thirdPartyApiNames[]": {
            required: true
        } ,
        "thirdPartyApiUrls[]": {
            required: true
        },
    },
    messages: {
        method: {
            required: 'Vui lòng chọn loại method',
        },
        name: {
            required: 'Vui lòng nhập tên API',
        },
        url: {
            required: 'Vui lòng nhập URL',
        },
        "thirdPartyApiNames[]": {
            required: 'Tên api bên thứ 3 không được để trống'
        },
        "thirdPartyApiUrls[]": {
            required: 'Url bên thứ 3 không được để trống'
        },
    },
    errorElement: 'div',
    errorClass: 'error',
    submitHandler: function (form, event) {
        event.preventDefault();

        let data = $(form).serializeArray();
        data.push({name: "_method", value: 'PUT'})

        if (clickCount < 1) {
            clickCount++;
            $.ajax({
                type: "POST",
                url: `/debug/monitor-api-speed/{{$api->id}}`,
                data: data,
                beforeSend: function () {
                    turnOnOffLoadingBar(true);
                },
                success: function (res) {
                    turnOnOffLoadingBar(false);

                    if (res.status == 1) {
                        window.location.href = '/debug/monitor-api-speed';
                    } else {
                        clickCount = 0;
                    }

                    return false;
                },
                error: function (jqXHR, textstatus, errorThrown) {
                    console.log(jqXHR, textstatus, errorThrown)

                    if (jqXHR.status === 422) {
                        console.log(jqXHR.responseText)
                    }

                    clickCount = 0;
                    turnOnOffLoadingBar(false);
                },
                complete: () => {

                    // location.reload();
                }
            });
            return false;
        }
        return true;
    }
})