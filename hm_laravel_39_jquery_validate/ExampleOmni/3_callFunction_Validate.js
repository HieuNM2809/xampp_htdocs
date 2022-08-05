function createHiFPTChatInteraction() {
    var clickCount = 0, activeTab = $("#tab-list >.active>a").attr("href");
    $('#tab_detail_tuongtac #form-create-interaction-hi-fpt-chat').validate({
        rules: {
            virtual_customer_name: {
                required: true
            },
            virtual_customer_phone: {
                required: true,
                isNumber: true,
                noSpace: false
            }
        },
        messages: {
            virtual_customer_name: {
                required: 'Xin vui lòng nhập tên tài khoản Hi FPT Chat',
            },
            virtual_customer_phone: {
                required: 'Xin vui lòng nhập số điện thoại khách hàng',
                noSpace: 'Xin vui lòng nhập số điện thoại khách hàng',
                isNumber: 'Số điện thoại phải nhập số'
            },
        },
        errorElement: 'label',
        errorClass: 'error',
        submitHandler: function (form) {
            let data = $(form).serialize();
            if (clickCount < 1) {
                clickCount++;
                $.ajax({
                    type: "POST",
                    url: 'ajax/call/create-virtual-v2',
                    data: data,
                    beforeSend: function () {
                        turnOnOffLoadingBar(true);
                    },
                    success: function (res) {
                        console.log('res', res);
                        turnOnOffLoadingBar(false);

                        if (res.status == 2) {
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
                        location.reload();
                    }
                });
                return false;
            }
        }
    })
    return false;
}

function createFISHO() {
    var clickCount = 0, activeTab = $("#tab-list >.active>a").attr("href");
    $('#tab_detail_tuongtac #form-create-interaction-fisho').validate({
        rules: {
            virtual_point: {
                isFisHoChannel: true
            },
            customerName_FisHO: {
                required: true
            },
            virtual_customer_phone: {
                required: true,
                isNumber: true,
                noSpace: false
            }
        },
        messages: {
            virtual_customer_phone: {
                required: 'Xin vui lòng nhập số điện thoại khách hàng',
                noSpace: 'Số điện thoại phải nhập số',
                isNumber: 'Số điện thoại phải nhập số'
            },
            customerName_FisHO: {
                required: 'Xin vui lòng nhập tên khách hàng',
            },
            virtual_point: {
                isFisHoChannel: "Xin vui lòng chọn kênh tiếp xúc"
            }
        },
        errorElement: 'label',
        errorClass: 'error',
        submitHandler: function (form) {
            var data = $(form).serialize();
            if (clickCount < 1) { //chống click nút confirm nhiều lần
                clickCount++;
                $.ajax({
                    type: "POST",
                    url: 'ajax/call/create-virtual-v2',
                    data: data,
                    beforeSend: function () {
                        turnOnOffLoadingBar(true);
                        var arrCusInfoInNote = [];
                        if ($(activeTab + ' #contractNum').data('contractnum') != null && $(activeTab + ' #contractNum').data('contractnum') != '') {
                            arrCusInfoInNote.push($(activeTab + ' #contractNum').data('contractnum'));
                        }
                        arrCusInfoInNote.push($('#virtual_customer_phone').val());


                        if (typeof $(activeTab + ' #show_hd_name').html() != 'undefined' && $(activeTab + ' #show_hd_name').html().trim() != '') {
                            arrCusInfoInNote.push($(activeTab + ' #show_hd_name').html());
                        }
                        var strCusInfoInNote = arrCusInfoInNote.join(' - ');
                        if (strCusInfoInNote && strCusInfoInNote.length > 0) {
                            $(activeTab + ' #textarea_note').html(strCusInfoInNote + ':');
                        }
                        $(activeTab + ' #virtual_call').val($('#virtual_customer_phone').val());
                    },
                    success: function (res) {
                        turnOnOffLoadingBar(false);
                        ++countTab;
                        $(activeTab + ' .edit-name-link-phone').show();
                        $(activeTab + ' #swap-content-table, #check-swap-content-table').html('');
                        $(activeTab + ' #box-check-sys p').hide();

                        $('#form-virtual-call input[name="_token"]').val(res.token);

                        if (res.constructor === String) {
                            res = $.parseJSON(res);
                        }

                        if (res.status == 1) {
                            //Khi nào chỉnh qua hubchat thì tắt đi
                            $(activeTab + ' #call_type').val('sa');
                            //End
                            $(activeTab + ' #txt_nguoilienhe').val($('#customerName_FisHO').val());

                            hideMyModal(m);
                            if (res.data.callInfo) {
                                $(activeTab + ' #call_id').val(res.data.callInfo.call_id);
                                $(activeTab + ' #time_call').html(res.data.callInfo.call_start_call);
                                $(activeTab + ' #ip_phone').html(res.data.callInfo.call_CCallerID);
                                //$('#show_hd_phone').val(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #show_phone_call').html(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #point_fb').val(res.data.pointFb);
                                $(activeTab + ' #nick_fb').val(res.data.nickFb);
                                $(activeTab + ' #link_fb').val(res.data.linkFb);
                                copyInfoToDes(activeTab);
                            }
                        } else if (res.status == 2) {
                            // getCall('outbound', true);
                            getCall('sa', true, activeTab);
                            $(activeTab + ' #point_fb').val(res.data.pointFb);
                            $(activeTab + ' #link_fb').val(res.data.linkFb);
                            $(activeTab + ' #nick_fb').val(res.data.nickFb);

                            hideMyModal(m);
                        } else {
                            clickCount = 0;
                        }

                        return false;
                    },
                    error: function (data) {
                        clickCount = 0;
                        turnOnOffLoadingBar(false);
                        location.reload();
                    },
                    complete: () => {
                        if ($(activeTab + ' #obj_id').val() != '' && $(activeTab + ' #call_id').val() != '') {
                            $(activeTab + ' #btn_sendMail').addClass("btn-email-click");
                        } else {
                            $(activeTab + ' #btn_sendMail').removeClass("btn-email-click");
                        }
                        disableUpdateButton(activeTab); // thay đổi màu sắc nút cập nhật luồng ( cho phép cập nhật vì đã tạo call ảo thành công )
                        location.reload();
                    }
                });
                return false;
            }
        }
    });
    return false;
}

function createZalo() {
    var clickCount = 0, activeTab = $("#tab-list >.active>a").attr("href");
    $('#tab_detail_tuongtac #form-create-interaction-zalo').validate({
        rules: {
            nickZalo: {
                required: true
            },
            virtual_customer_phone: {
                required: true,
                isNumber: true,
                noSpace: false
            }
        },
        messages: {
            nickZalo: {
                required: 'Xin vui lòng nhập tên khách hàng (Nick Zalo)',
            },
            virtual_customer_phone: {
                required: 'Xin vui lòng nhập số điện thoại khách hàng',
                noSpace: 'Số điện thoại phải nhập số',
                isNumber: 'Số điện thoại phải nhập số'
            },
        },
        errorElement: 'label',
        errorClass: 'error',
        submitHandler: function (form) {
            var data = $(form).serialize();
            if (clickCount < 1) {
                clickCount++;
                $.ajax({
                    type: "POST",
                    url: 'ajax/call/create-virtual-v2',
                    data: data,
                    beforeSend: function () {
                        turnOnOffLoadingBar(true);
                        var arrCusInfoInNote = [];
                        if ($(activeTab + ' #contractNum').data('contractnum') != null && $(activeTab + ' #contractNum').data('contractnum') !== '') {
                            arrCusInfoInNote.push($(activeTab + ' #contractNum').data('contractnum'));
                        }
                        arrCusInfoInNote.push($('#virtual_customer_phone_zalo').val());

                        if (typeof $(activeTab + ' #show_hd_name').html() != 'undefined' && $(activeTab + ' #show_hd_name').html().trim() != '') {
                            arrCusInfoInNote.push($(activeTab + ' #show_hd_name').html());
                        }
                        var strCusInfoInNote = arrCusInfoInNote.join(' - ');
                        if (strCusInfoInNote && strCusInfoInNote.length > 0) {
                            $(activeTab + ' #textarea_note').html(strCusInfoInNote + ':');
                        }
                        $(activeTab + ' #virtual_call').val($('#virtual_customer_phone_zalo').val());
                    },
                    success: function (res) {
                        turnOnOffLoadingBar(false);
                        ++countTab;
                        $(activeTab + ' .edit-name-link-phone').show();
                        $(activeTab + ' #swap-content-table, #check-swap-content-table').html('');
                        $(activeTab + ' #box-check-sys p').hide();

                        $('#form-virtual-call input[name="_token"]').val(res.token);

                        if (res.constructor === String) {
                            res = $.parseJSON(res);
                        }

                        if (res.status == 1) {
                            //Khi nào chỉnh qua hubchat thì tắt đi
                            $(activeTab + ' #call_type').val('sa');
                            //End

                            hideMyModal(m);
                            if (res.data.callInfo) {
                                $(activeTab + ' #call_id').val(res.data.callInfo.call_id);
                                $(activeTab + ' #time_call').html(res.data.callInfo.call_start_call);
                                $(activeTab + ' #ip_phone').html(res.data.callInfo.call_CCallerID);
                                //$('#show_hd_phone').val(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #show_phone_call').html(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #point_fb').val(res.data.pointFb);
                                $(activeTab + ' #nick_fb').val(res.data.nickFb);
                                $(activeTab + ' #link_fb').val(res.data.linkFb);
                                copyInfoToDes(activeTab);
                            }
                        } else if (res.status == 2) {
                            // getCall('outbound', true);
                            getCall('sa', true, activeTab);
                            $(activeTab + ' #point_fb').val(res.data.pointFb);
                            $(activeTab + ' #link_fb').val(res.data.linkFb);
                            $(activeTab + ' #nick_fb').val(res.data.nickFb);

                            hideMyModal(m);
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
                        if ($(activeTab + ' #obj_id').val() != '' && $(activeTab + ' #call_id').val() != '') {
                            $(activeTab + ' #btn_sendMail').addClass("btn-email-click");
                        } else {
                            $(activeTab + ' #btn_sendMail').removeClass("btn-email-click");
                        }
                        disableUpdateButton(activeTab); // thay đổi màu sắc nút cập nhật luồng ( cho phép cập nhật vì đã tạo call ảo thành công )
                        location.reload();
                    }
                });
                return false;
            }
        }
    })
    return false;
}

function createSocialNetwork() {
    var clickCount = 0,
        activeTab = $("#tab-list >.active>a").attr("href");
    $('#tab_detail_tuongtac  #form-create-interaction-social-network').validate({
        rules: {
            nickFb: {
                required: true,
                noSpace: true
            },
            virtual_link_fb: {
                required: true,
                isUrlFacebookDependType: true,
                isUrlFacebookOrWorkPlaceDependType: true,
                isValidUrlDependType: true
            },
            virtual_point: {
                min: 2
            },
            virtual_customer_name_socialnetwork: {
                required: true,
                noSpace: true
            },
            virtual_customer_phone: {
                required: true,
                isNumber: true,
                noSpace: false
            }
        },
        messages: {
            nickFb: {
                required: 'Xin vui lòng nhập tên khách hàng',
            },
            virtual_customer_phone: {
                required: 'Xin vui lòng nhập số điện thoại khách hàng',
                noSpace: 'Số điện thoại phải nhập số',
                isNumber: 'Số điện thoại phải nhập số'
            },
            virtual_customer_name_socialnetwork: {
                required: 'Xin vui lòng nhập tên khách hàng',
                noSpace: 'Xin vui lòng nhập tên khách hàng',
            },
            virtual_link_fb: {
                required: 'Vui lòng nhập link profile Mạng xã hội.',
                isUrlFacebookDependType: 'Vui lòng nhập đúng đường dẫn Facebook',
                isUrlFacebookOrWorkPlaceDependType: 'Vui lòng nhập đúng đường dẫn Facebook/ Workplace',
                isValidUrlDependType: 'Vui lòng nhập link profile Mạng xã hội.'
            },
            virtual_point: {
                min: "Xin vui lòng chọn điểm tiếp xúc"
            }
        },
        errorElement: 'label',
        errorClass: 'error',
        submitHandler: function (form) {
            var data = $(form).serialize();
            if (clickCount < 1) { //chống click nút confirm nhiều lần
                clickCount++;
                $.ajax({
                    type: "POST",
                    url: 'ajax/call/create-virtual-v2',
                    data: data,
                    beforeSend: function () {
                        turnOnOffLoadingBar(true);
                        var arrCusInfoInNote = [];
                        if ($(activeTab + ' #contractNum').data('contractnum') != null && $(activeTab + ' #contractNum').data('contractnum') != '') {
                            arrCusInfoInNote.push($(activeTab + ' #contractNum').data('contractnum'));
                        }
                        arrCusInfoInNote.push($('#virtual_customer_phone_socialnetwork').val());


                        if (typeof $(activeTab + ' #show_hd_name').html() != 'undefined' && $(activeTab + ' #show_hd_name').html().trim() != '') {
                            arrCusInfoInNote.push($(activeTab + ' #show_hd_name').html());
                        }
                        var strCusInfoInNote = arrCusInfoInNote.join(' - ');
                        if (strCusInfoInNote && strCusInfoInNote.length > 0) {
                            $(activeTab + ' #textarea_note').html(strCusInfoInNote + ':');
                        }
                        $(activeTab + ' #virtual_call').val($('#virtual_customer_phone_socialnetwork').val());
                    },
                    success: function (res) {
                        turnOnOffLoadingBar(false);
                        ++countTab;
                        $(activeTab + ' .edit-name-link-phone').show();
                        $(activeTab + ' #swap-content-table, #check-swap-content-table').html('');
                        $(activeTab + ' #box-check-sys p').hide();

                        $('#form-virtual-call input[name="_token"]').val(res.token);

                        if (res.constructor === String) {
                            res = $.parseJSON(res);
                        }

                        if (res.status == 1) {
                            //Khi nào chỉnh qua hubchat thì tắt đi
                            $(activeTab + ' #call_type').val('sa');
                            //End
                            $(activeTab + ' #txt_nguoilienhe').val($('#virtual_customer_name_socialnetwork').val());

                            hideMyModal(m);
                            if (res.data.callInfo) {
                                $(activeTab + ' #call_id').val(res.data.callInfo.call_id);
                                $(activeTab + ' #time_call').html(res.data.callInfo.call_start_call);
                                $(activeTab + ' #ip_phone').html(res.data.callInfo.call_CCallerID);
                                //$('#show_hd_phone').val(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #show_phone_call').html(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #point_fb').val(res.data.pointFb);
                                $(activeTab + ' #nick_fb').val(res.data.nickFb);
                                $(activeTab + ' #link_fb').val(res.data.linkFb);
                                copyInfoToDes(activeTab);
                            }
                        } else if (res.status == 2) {
                            // getCall('outbound', true);
                            getCall('sa', true, activeTab);
                            $(activeTab + ' #point_fb').val(res.data.pointFb);
                            $(activeTab + ' #link_fb').val(res.data.linkFb);
                            $(activeTab + ' #nick_fb').val(res.data.nickFb);

                            hideMyModal(m);
                        } else {
                            clickCount = 0;
                        }

                        return false;
                    },
                    error: function (data) {
                        clickCount = 0;
                        turnOnOffLoadingBar(false);
                        location.reload();
                    },
                    complete: () => {
                        if ($(activeTab + ' #obj_id').val() != '' && $(activeTab + ' #call_id').val() != '') {
                            $(activeTab + ' #btn_sendMail').addClass("btn-email-click");
                        } else {
                            $(activeTab + ' #btn_sendMail').removeClass("btn-email-click");
                        }
                        disableUpdateButton(activeTab); // thay đổi màu sắc nút cập nhật luồng ( cho phép cập nhật vì đã tạo call ảo thành công )
                        location.reload();
                    }
                });
                return false;
            }
        }
    });
    return false;
}

function createLivechat() {
    var clickCount = 0,
        activeTab = $("#tab-list >.active>a").attr("href");// nó đã bao gồm '#' khi select bằng jquery
    $('#tab_detail_tuongtac #form-create-interaction-livechat').validate({
        rules: {
            nickFb: {
                required: true,
                noSpace: true
            },
            nickLiveChat: {
                required: true
            },
            virtual_customer_phone_livechat: {
                required: false,
                isNumber: true,
                noSpace: false
            },
            virtual_customer_phone: {
                required: true,
                isNumber: true,
                noSpace: false
            }
        },
        messages: {
            nickFb: {
                required: 'Xin vui lòng nhập tên khách hàng',
            },
            virtual_customer_phone_livechat: {
                required: 'Xin vui lòng nhập số điện thoại khách hàng',
                noSpace: 'Xin vui lòng nhập số điện thoại khách hàng',
                isNumber: 'Số điện thoại phải nhập số'
            },
            nickLiveChat: {
                required: 'Xin vui lòng nhập tên nick khách hàng',
            },
            virtual_customer_phone: {
                required: 'Xin vui lòng nhập số điện thoại khách hàng',
                noSpace: 'Xin vui lòng nhập số điện thoại khách hàng',
                isNumber: 'Số điện thoại phải nhập số'
            },
        },
        errorElement: 'label',
        errorClass: 'error',
        submitHandler: function (form) {
            var data = $(form).serialize();
            if (clickCount < 1) { //chống click nút confirm nhiều lần
                clickCount++;
                $.ajax({
                    type: "POST",
                    url: 'ajax/call/create-virtual-v2',
                    data: data,
                    beforeSend: function () {
                        turnOnOffLoadingBar(true);
                        var arrCusInfoInNote = [];
                        if ($(activeTab + ' #contractNum').data('contractnum') != null && $(activeTab + ' #contractNum').data('contractnum') != '') {
                            arrCusInfoInNote.push($(activeTab + ' #contractNum').data('contractnum'));
                        }
                        arrCusInfoInNote.push($('#virtual_customer_phone_livechat').val());


                        if (typeof $(activeTab + ' #show_hd_name').html() != 'undefined' && $(activeTab + ' #show_hd_name').html().trim() != '') {
                            arrCusInfoInNote.push($(activeTab + ' #show_hd_name').html());
                        }
                        var strCusInfoInNote = arrCusInfoInNote.join(' - ');
                        if (strCusInfoInNote && strCusInfoInNote.length > 0) {
                            $(activeTab + ' #textarea_note').html(strCusInfoInNote + ':');
                        }
                        $(activeTab + ' #virtual_call').val($('#virtual_customer_phone_livechat').val());
                    },
                    success: function (res) {
                        turnOnOffLoadingBar(false);
                        ++countTab;
                        $(activeTab + ' .edit-name-link-phone').show();
                        $(activeTab + ' #swap-content-table, #check-swap-content-table').html('');
                        $(activeTab + ' #box-check-sys p').hide();

                        $('#form-virtual-call input[name="_token"]').val(res.token);

                        if (res.constructor === String) {
                            res = $.parseJSON(res);
                        }

                        if (res.status == 1) {
                            //Khi nào chỉnh qua hubchat thì tắt đi
                            $(activeTab + ' #call_type').val('sa');
                            //End

                            hideMyModal(m);
                            if (res.data.callInfo) {
                                $(activeTab + ' #call_id').val(res.data.callInfo.call_id);
                                $(activeTab + ' #time_call').html(res.data.callInfo.call_start_call);
                                $(activeTab + ' #ip_phone').html(res.data.callInfo.call_CCallerID);
                                //$('#show_hd_phone').val(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #show_phone_call').html(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #point_fb').val(res.data.pointFb);
                                $(activeTab + ' #nick_fb').val(res.data.nickFb);
                                $(activeTab + ' #link_fb').val(res.data.linkFb);
                                copyInfoToDes(activeTab);
                            }
                        } else if (res.status == 2) {
                            // getCall('outbound', true);
                            getCall('sa', true, activeTab);
                            $(activeTab + ' #point_fb').val(res.data.pointFb);
                            $(activeTab + ' #link_fb').val(res.data.linkFb);
                            $(activeTab + ' #nick_fb').val(res.data.nickFb);

                            hideMyModal(m);
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
                        if ($(activeTab + ' #obj_id').val() != '' && $(activeTab + ' #call_id').val() != '') {
                            $(activeTab + ' #btn_sendMail').addClass("btn-email-click");
                        } else {
                            $(activeTab + ' #btn_sendMail').removeClass("btn-email-click");
                        }
                        disableUpdateButton(activeTab); // thay đổi màu sắc nút cập nhật luồng ( cho phép cập nhật vì đã tạo call ảo thành công )
                        location.reload();
                    }
                });
                return false;
            }
        }
    });
    return false;
}

function createEmail() {
    var clickCount = 0,
        activeTab = $("#tab-list >.active>a").attr("href");// nó đã bao gồm '#' khi select bằng jquery
    $('#tab_detail_tuongtac #form-create-interaction-email').validate({
        rules: {
            nickFb: {
                required: true,
                noSpace: true
            },
            customerEmail: {
                required: true,
                // email: true,
                isEmail: true
            },
            virtual_customer_phone_email: {
                required: true,
                isNumber: true,
                noSpace: false
            },
            virtual_customer_phone: {
                required: true,
                isNumber: true,
                noSpace: false
            }
        },
        messages: {
            nickFb: {
                required: 'Xin vui lòng nhập tên khách hàng',
            },
            virtual_customer_phone_email: {
                required: 'Xin vui lòng nhập số điện thoại khách hàng',
                noSpace: 'Xin vui lòng nhập số điện thoại khách hàng',
                isNumber: 'Số điện thoại phải nhập số'
            },
            customerEmail: {
                required: 'Xin vui lòng nhập Email khách hàng',
                // email: 'Email không đúng định dạng',
                isEmail: 'Email không đúng định dạng',
            },
            virtual_customer_phone: {
                required: 'Xin vui lòng nhập số điện thoại khách hàng',
                noSpace: 'Xin vui lòng nhập số điện thoại khách hàng',
                isNumber: 'Số điện thoại phải nhập số'
            },
        },
        errorElement: 'label',
        errorClass: 'error',
        submitHandler: function (form) {
            var data = $(form).serialize();
            if (clickCount < 1) { //chống click nút confirm nhiều lần
                clickCount++;
                $.ajax({
                    type: "POST",
                    url: 'ajax/call/create-virtual-v2',
                    data: data,
                    beforeSend: function () {
                        turnOnOffLoadingBar(true);
                        var arrCusInfoInNote = [];
                        if ($(activeTab + ' #contractNum').data('contractnum') != null && $(activeTab + ' #contractNum').data('contractnum') != '') {
                            arrCusInfoInNote.push($(activeTab + ' #contractNum').data('contractnum'));
                        }
                        arrCusInfoInNote.push($('#virtual_customer_phone_email').val());


                        if (typeof $(activeTab + ' #show_hd_name').html() != 'undefined' && $(activeTab + ' #show_hd_name').html().trim() != '') {
                            arrCusInfoInNote.push($(activeTab + ' #show_hd_name').html());
                        }
                        var strCusInfoInNote = arrCusInfoInNote.join(' - ');
                        if (strCusInfoInNote && strCusInfoInNote.length > 0) {
                            $(activeTab + ' #textarea_note').html(strCusInfoInNote + ':');
                        }
                        $(activeTab + ' #virtual_call').val($('#virtual_customer_phone_email').val());
                    },
                    success: function (res) {
                        turnOnOffLoadingBar(false);
                        ++countTab;
                        $(activeTab + ' .edit-name-link-phone').show();
                        $(activeTab + ' #swap-content-table, #check-swap-content-table').html('');
                        $(activeTab + ' #box-check-sys p').hide();

                        $('#form-virtual-call input[name="_token"]').val(res.token);

                        if (res.constructor === String) {
                            res = $.parseJSON(res);
                        }

                        if (res.status == 1) {
                            //Khi nào chỉnh qua hubchat thì tắt đi
                            $(activeTab + ' #call_type').val('sa');
                            //End

                            hideMyModal(m);
                            if (res.data.callInfo) {
                                $(activeTab + ' #call_id').val(res.data.callInfo.call_id);
                                $(activeTab + ' #time_call').html(res.data.callInfo.call_start_call);
                                $(activeTab + ' #ip_phone').html(res.data.callInfo.call_CCallerID);
                                //$('#show_hd_phone').val(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #show_phone_call').html(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #point_fb').val(res.data.pointFb);
                                $(activeTab + ' #nick_fb').val(res.data.nickFb);
                                $(activeTab + ' #link_fb').val(res.data.linkFb);
                                copyInfoToDes(activeTab);
                            }
                        } else if (res.status == 2) {
                            // getCall('outbound', true);
                            getCall('sa', true, activeTab);
                            $(activeTab + ' #point_fb').val(res.data.pointFb);
                            $(activeTab + ' #link_fb').val(res.data.linkFb);
                            $(activeTab + ' #nick_fb').val(res.data.nickFb);

                            hideMyModal(m);
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
                        if ($(activeTab + ' #obj_id').val() != '' && $(activeTab + ' #call_id').val() != '') {
                            $(activeTab + ' #btn_sendMail').addClass("btn-email-click");
                        } else {
                            $(activeTab + ' #btn_sendMail').removeClass("btn-email-click");
                        }
                        disableUpdateButton(activeTab); // thay đổi màu sắc nút cập nhật luồng ( cho phép cập nhật vì đã tạo call ảo thành công )
                        location.reload();
                    }
                });
                return false;
            }
        }
    });
    return false;
}

function create1900() {
    var clickCount = 0,
        activeTab = $("#tab-list >.active>a").attr("href");// nó đã bao gồm '#' khi select bằng jquery
    $('#tab_detail_tuongtac #form-create-interaction-1900').validate({
        rules: {
            nickFb: {
                required: true,
                noSpace: true
            },
            customerName: {
                required: true
            },
            virtual_customer_phone: {
                required: true,
                isNumber: true,
                noSpace: false
            }
        },
        messages: {
            nickFb: {
                required: 'Xin vui lòng nhập tên khách hàng',
            },
            virtual_customer_phone: {
                required: 'Xin vui lòng nhập số điện thoại khách hàng',
                noSpace: 'Xin vui lòng nhập số điện thoại khách hàng',
                isNumber: 'Số điện thoại phải nhập số'
            },
            customerName: {
                required: 'Xin vui lòng nhập tên khách hàng',
            }
        },
        errorElement: 'label',
        errorClass: 'error',
        submitHandler: function (form) {
            var data = $(form).serialize();
            if (clickCount < 1) { //chống click nút confirm nhiều lần
                clickCount++;
                $.ajax({
                    type: "POST",
                    url: 'ajax/call/create-virtual-v2',
                    data: data,
                    beforeSend: function () {
                        turnOnOffLoadingBar(true);
                        var arrCusInfoInNote = [];
                        if ($(activeTab + ' #contractNum').data('contractnum') != null && $(activeTab + ' #contractNum').data('contractnum') != '') {
                            arrCusInfoInNote.push($(activeTab + ' #contractNum').data('contractnum'));
                        }
                        arrCusInfoInNote.push($('#virtual_customer_phone_1900').val());


                        if (typeof $(activeTab + ' #show_hd_name').html() != 'undefined' && $(activeTab + ' #show_hd_name').html().trim() != '') {
                            arrCusInfoInNote.push($(activeTab + ' #show_hd_name').html());
                        }
                        var strCusInfoInNote = arrCusInfoInNote.join(' - ');
                        if (strCusInfoInNote && strCusInfoInNote.length > 0) {
                            $(activeTab + ' #textarea_note').html(strCusInfoInNote + ':');
                        }
                        $(activeTab + ' #virtual_call').val($('#virtual_customer_phone_1900').val());

                    },
                    success: function (res) {
                        turnOnOffLoadingBar(false);
                        ++countTab;
                        $(activeTab + ' .edit-name-link-phone').show();
                        $(activeTab + ' #swap-content-table, #check-swap-content-table').html('');
                        $(activeTab + ' #box-check-sys p').hide();

                        $('#form-virtual-call input[name="_token"]').val(res.token);

                        if (res.constructor === String) {
                            res = $.parseJSON(res);
                        }

                        if (res.status == 1) {
                            //Khi nào chỉnh qua hubchat thì tắt đi
                            $(activeTab + ' #call_type').val('sa');
                            //End

                            hideMyModal(m);
                            if (res.data.callInfo) {
                                $(activeTab + ' #call_id').val(res.data.callInfo.call_id);
                                $(activeTab + ' #time_call').html(res.data.callInfo.call_start_call);
                                $(activeTab + ' #ip_phone').html(res.data.callInfo.call_CCallerID);
                                $(activeTab + ' #show_phone_call').html(res.data.callInfo.call_customer_phone);
                                $(activeTab + ' #point_fb').val(res.data.pointFb);
                                $(activeTab + ' #nick_fb').val(res.data.nickFb);
                                $(activeTab + ' #link_fb').val(res.data.linkFb);
                                copyInfoToDes(activeTab);
                            }
                        } else if (res.status == 2) {
                            // getCall('outbound', true);
                            getCall('sa', true, activeTab);
                            $(activeTab + ' #point_fb').val(res.data.pointFb);
                            $(activeTab + ' #link_fb').val(res.data.linkFb);
                            $(activeTab + ' #nick_fb').val(res.data.nickFb);

                            hideMyModal(m);
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
                        if ($(activeTab + ' #obj_id').val() != '' && $(activeTab + ' #call_id').val() != '') {
                            $(activeTab + ' #btn_sendMail').addClass("btn-email-click");
                        } else {
                            $(activeTab + ' #btn_sendMail').removeClass("btn-email-click");
                        }
                        disableUpdateButton(activeTab); // thay đổi màu sắc nút cập nhật luồng ( cho phép cập nhật vì đã tạo call ảo thành công )
                        location.reload();
                    }
                });
                return false;
            }
        }
    });
    return false;
}

function changeVirtualPoint(option, selectID) {
    if (option != 0) {
        $('#' + selectID).css('color', 'black');
    } else {
        $('#' + selectID).css('color', 'gray');
    }
}