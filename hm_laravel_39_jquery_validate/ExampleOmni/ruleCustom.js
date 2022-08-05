$(document).ready(function () {
    $.validator.addMethod("noSpace", function (value, element) {
        return value == '' || value.trim().length != 0;
    }, "No space please and don't leave it empty");

    $.validator.addMethod("isPhone", function (value, element) {
        return isPhone(value);
    }, 'Số điện thoại không hợp lệ');

    $.validator.addMethod("isNumber", function (value, element) {
        return isNumber(value);
    }, 'Giá trị nhập phải là số.');


    $.validator.addMethod("isUrlFacebook", function (value, element) {
        if ($(element).closest('form').length > 0 && $(element).closest('form').find('#virtual_point').length > 0) {
            return ($(element).closest('form').find('#virtual_point').val() == '6') ? isUrlWorkplace(value) : isUrlFacebook(value);
        } else {
            return isUrlFacebook(value);
        }
    }, 'Url facebook không đúng, xin vui lòng nhập lại.');

    $.validator.addMethod("isUrlFacebookDependType", function (value, element) {
        if (['2', '3', '4', '5'].indexOf($(element).closest('form').find('#virtual_point').val()) > -1) {
            return isUrlFacebook(value);
        }
        return true;
    }, 'Vui lòng nhập đúng đường dẫn facebook');
    $.validator.addMethod("isUrlFacebookOrWorkPlaceDependType", function (value, element) {
        if ($(element).closest('form').find('#virtual_point').val() == '6') {
            return isUrlWorkplace(value) || isUrlFacebook(value);
        }
        return true;
    }, 'Vui lòng nhập đúng đường dẫn facebook/ workplace');
    $.validator.addMethod("isValidUrlDependType", function (value, element) {
        if ($(element).closest('form').find('#virtual_point').val() == '7') {
            return isValidLink(value);
        }
        return true;
    }, 'Vui lòng nhập link profile Mạng xã hội.');

    $.validator.addMethod("isEmail", function (value, element) {
        return isEmail(value);
    }, 'Email không đúng, xin vui lòng nhập lại.');
    $.validator.addMethod("isFisHoChannel", function (value) {
        return ['02x73007300', '02x35626000', '02x73007373'].indexOf(value) > -1;
    }, "Chọn Kênh tiếp xúc");

});