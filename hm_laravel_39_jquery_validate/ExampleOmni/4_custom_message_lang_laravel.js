


//<script > var lang = {!! json_encode($lang) !!};</script>



function createVirtualCall(m) {
    var clickCount = 0;
    $('#form-virtual-call').validate({
        rules: {
            virtual_customer_phone: {
                required: true,
                isNumber: true,
                noSpace: true,
            },
            virtual_customer_name: {
                required: true,
                noSpace: true
            },
            virtual_link_fb: {
                isUrlFacebok: true
            },
        },
        messages: {
            virtual_customer_phone: {
                required: lang.require_customerphone,
                noSpace: lang.require_customerphone,
                isNumber: lang.invalid_number
            },
            virtual_customer_name: {
                required: lang.require_customername,
                noSpace: lang.require_customername,
            },
            virtual_link_fb: {
                isUrlFacebok: lang.mgs_error_url_facebook,
            },
        },
        errorElement: 'label',
        errorClass: 'error',
        submitHandler: function(form) {
            var data = $(form).serialize();
            if (clickCount < 1) { //chống click nút confirm nhiều lần
                if (!confirm(lang.confirm_create)) {
                    clickCount = 0;
                    return false;
                }
                clickCount++;
                $.ajax({
                    type: "POST",
                    url: baseUrl + "/ajax/call/create-virtual",
                    data: data,
                    beforeSend: function() {
                        showMask();
                    },
                    success: function(res) {
                        hideMask();
                        $('#form-virtual-call input[name="_token"]').val(res.token);

                        if (res.constructor === String) {
                            res = $.parseJSON(res);
                        }
                        $('#show_hd_phone').val('');

                        /*alert(res.description);*/
                        if (res.status === 1) {
                            $('#history-virtual-ccallerid').val($('#virtual_ccallerid').val());
                            /*$('#box-value input[name="history_fail_info"]').val(2);*/
                            $('#txt_nguoilienhe').val($('#virtual_customer_name').val());

                            hideMyModal(m);
                            /*if(res.data.customerInfo){
                                builValFormCustomerInfo(res.data.customerInfo);
                                callBackInfoCustomer(res.data.customerInfo);
                            }else{
                                $('#show_hd_phone').val('');
                            }*/

                            var customerInfo = res.data.customerInfo;

                            if (customerInfo.length == 1) {
                                builValFormCustomerInfo(res.data.customerInfo[0]);
                                callBackInfoCustomer(res.data.customerInfo[0]);
                            } else if (customerInfo.length > 1) {
                                popupContractListV2(res);
                            }


                            if (res.data.callInfo) {
                                $('#call_id').val(res.data.callInfo.call_id);
                                $('#time_call').html(res.data.callInfo.call_start_call);
                                $('#ip_phone').html(res.data.callInfo.call_CCallerID);
                                //$('#show_hd_phone').val(res.data.callInfo.call_customer_phone);
                                $('#show_phone_call').html(res.data.callInfo.call_customer_phone);
                                $('#point_fb').val(res.data.pointFb);
                                $('#nick_fb').val(res.data.nickFb);
                                $('#link_fb').val(res.data.linkFb);

                                var v = 'location_name:getSwitchboardName:' + res.data.callInfo.call_CCallerID;
                                globalVal(v, null);
                            }
                        } else {
                            if (res.description != '')
                                alert(res.description);
                            clickCount = 0;
                        }

                        return false;
                    },
                    error: function(data) {
                        clickCount = 0;
                        hideMask();
                    }
                });
                return false;
            }
        }
    });
    return false;
}
